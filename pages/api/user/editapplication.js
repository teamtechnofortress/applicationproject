import { IncomingForm } from 'formidable';
import ApplicationFile from '@/models/ApplicationFile';
import jwt from 'jsonwebtoken';
import { parseCookies } from 'nookies';
import { connectDb } from '@/helper/db';
import User from '@/models/User';
import { v4 as uuidv4 } from 'uuid';
import { pdf } from "@react-pdf/renderer";
import MyDocument from "@/components/MyDocument";
import MyDocumentTwo from "@/components/MyDocumentTwo";
import QRCode from "qrcode";
import { handleFileUpload, uploadToHetzner, deletefile } from '@/utils/blob_storage_util';



export const config = {
  api: {
    bodyParser: false,
  },
};
const hetznerBaseUrl = `${process.env.HETZNER_ENDPOINT}`;

// ✅ Function to generate and upload QR Code image
const generateAndUploadQRCode = async (pdfUrl) => {
  try {
    // ✅ Generate QR Code as PNG buffer
    const qrCodeBuffer = await QRCode.toBuffer(pdfUrl);

    // ✅ Define a unique file name for QR Code
    const qrFileName = `qr_${uuidv4()}.png`;

    // ✅ Upload the QR Code image to Vercel Blob Storage
    return await uploadToHetzner(qrCodeBuffer, qrFileName, 'image/png');
  } catch (error) {
    console.error("Error generating QR Code:", error);
    return null;
  }
};

const generateAndUploadPDF = async (profileData, predefinedPdfUrl) => {
  try {
    let pdfBlob;
    const pdfFileURL= predefinedPdfUrl.split('/').pop();
    // ✅ Fetch saved QR Code from DB (already generated in previous step)
    let savedForm = await ApplicationFile.findById(profileData._id);
    let qrCodeUrl = savedForm?.qrCode;

   
      // ✅ Delete old PDF before generating a new one
      if (savedForm.pdfPath) {
        const filename = savedForm.pdfPath.split("/uploads/")[1];
        await deletefile(filename);
        // await deletefile(savedForm.pdfPath);
      }
      if (savedForm.qrCode) {
        const filename = savedForm.qrCode.split("/uploads/")[1];
        await deletefile(filename);
        // await deletefile(savedForm.qrCode);
      }

      const newQrCodeUrl = await generateAndUploadQRCode(predefinedPdfUrl);
      
      if (!newQrCodeUrl) {
        console.error("Failed to generate new QR Code");
        return null;
      }
      // ✅ Update parent profile with new PDF URL & QR Code
      await ApplicationFile.findByIdAndUpdate(profileData._id, {
        qrCode: newQrCodeUrl,
      });


    if (profileData.childId) {

      const childprofile = await ApplicationFile.findById(profileData.childId);
      if (!childprofile) {
        console.error("Child form not found");
        return null;
      }
      const parentProfile = await ApplicationFile.findById(profileData._id);
      if (!parentProfile) {
        console.error("Parent form not found");
        return null;
      }
      // ✅ Generate a combined PDF for parent and child
      const combinedProfiles = { parent: parentProfile, child: childprofile };


      // const pdfFileURL = predefinedPdfUrl.split('/').pop();
      // ✅ Generate PDF document
      const pdfBlob = await pdf(<MyDocumentTwo profileData={combinedProfiles} />).toBlob();
      const arrayBuffer = await pdfBlob.arrayBuffer();
      const buffer = Buffer.from(arrayBuffer);
      
      // ✅ Upload PDF with predefined name (so URL remains unchanged)
      await uploadToHetzner(buffer, pdfFileURL, 'application/pdf');

    }else if(profileData.parent === "1"){

      // console.log("Enter to find parent.")

      const updatedParent = await ApplicationFile.findOneAndUpdate(
        { childId: profileData._id },
        {
          qrCode: newQrCodeUrl,
          pdfPath: predefinedPdfUrl,
        },
        { new: true }
      );

      const childprofile = await ApplicationFile.findById(profileData._id);
      if (!childprofile) {
        console.error("Child form not found");
        return null;
      }
      const parentProfile = await ApplicationFile.findOne({ childId: profileData._id });
      if (!parentProfile) {
        console.error("Parent form not found");
        return null;
      }
   
      
      // ✅ Generate a combined PDF for parent and child
      const combinedProfiles = { parent: parentProfile, child: childprofile };


      const pdfBlob = await pdf(<MyDocumentTwo profileData={combinedProfiles} />).toBlob();
      const arrayBuffer = await pdfBlob.arrayBuffer();
      const buffer = Buffer.from(arrayBuffer);
      
      // ✅ Upload PDF with predefined name (so URL remains unchanged)
      await uploadToHetzner(buffer, pdfFileURL, 'application/pdf');

    
    } else {
      const parentProfile = await ApplicationFile.findById(profileData._id);
      if (!parentProfile) {
        console.error("Parent form not found");
        return null;
      }

      const pdfBlob = await pdf(<MyDocument profileData={parentProfile} />).toBlob();
      const arrayBuffer = await pdfBlob.arrayBuffer();
      const buffer = Buffer.from(arrayBuffer);
      
      // ✅ Upload PDF with predefined name (so URL remains unchanged)
      await uploadToHetzner(buffer, pdfFileURL, 'application/pdf');

     

    }
    return predefinedPdfUrl;
  } catch (error) {
    console.error("Error generating/uploading in editapplication:", error);
    return null;
  }
};

const handler = async (req, res) => {
  await connectDb();

  if (req.method === 'POST') {
    const cookies = parseCookies({ req });
    const token = cookies.token;

    if (!token) {
      return res.status(401).json({ success: false, message: 'Not authenticated' });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const userEmail = decoded.id; // Assuming your token payload has the user email

    // Fetch the user from the database using the email
    const user = await User.findOne({ _id: userEmail });

    if (!user) {
      return res.status(404).json({ success: false, message: 'User not found' });
    }

    const form = new IncomingForm();
    
    form.keepExtensions = true;

    form.parse(req, async (err, fields, files) => {
      if (err) {
        console.error('Error parsing the form:', err);
        return res.status(500).json({ success: false, error: 'Error parsing the form' });
      }
      const formid = Array.isArray(fields.formid) ? fields.formid[0] : fields.formid;
      const Applicationforblob = await ApplicationFile.findOne({ _id: formid });
      if (!Applicationforblob) {
          return res.status(404).json({ success: false, message: 'Application not found' });
      }

      const vorname = Array.isArray(fields.vorname) ? fields.vorname[0] : fields.vorname;
      const nachname = Array.isArray(fields.nachname) ? fields.nachname[0] : fields.nachname;
      const strabe = Array.isArray(fields.strabe) ? fields.strabe[0] : fields.strabe;
      const hausnummer = Array.isArray(fields.hausnummer) ? fields.hausnummer[0] : fields.hausnummer;
      const postleitzahl = Array.isArray(fields.postleitzahl) ? fields.postleitzahl[0] : fields.postleitzahl;
      const Ort = Array.isArray(fields.Ort) ? fields.Ort[0] : fields.Ort;
      const email = Array.isArray(fields.email) ? fields.email[0] : fields.email;
      const phonenumber = Array.isArray(fields.phonenumber) ? fields.phonenumber[0] : fields.phonenumber;
      const profession = Array.isArray(fields.profession) ? fields.profession[0] : fields.profession;
      const geburtsdatum = Array.isArray(fields.geburtsdatum) ? fields.geburtsdatum[0] : fields.geburtsdatum;
      const ausgeubterBeruf = Array.isArray(fields.ausgeubterBeruf) ? fields.ausgeubterBeruf[0] : fields.ausgeubterBeruf;
      const arbeitgeber = Array.isArray(fields.arbeitgeber) ? fields.arbeitgeber[0] : fields.arbeitgeber;
      const income = Array.isArray(fields.income) ? fields.income[0] : fields.income;
      const bwaimages = Array.isArray(fields.bwaimages) ? fields.bwaimages[0] : fields.bwaimages;
      const employment = Array.isArray(fields.employment) ? fields.employment[0] : fields.employment;
     
      const pets = Array.isArray(fields.pets) ? fields.pets[0] : fields.pets;
      const rentarea = Array.isArray(fields.rentarea) ? fields.rentarea[0] : fields.rentarea;
      const proceedings = Array.isArray(fields.proceedings) ? fields.proceedings[0] : fields.proceedings;
      const apartment = Array.isArray(fields.apartment) ? fields.apartment[0] : fields.apartment;
      const coverletter = Array.isArray(fields.coverletter) ? fields.coverletter[0] : fields.coverletter;
      const zimerzahl = Array.isArray(fields.zimerzahl) ? fields.zimerzahl[0] : fields.zimerzahl;
      const personal = Array.isArray(fields.personal) ? fields.personal[0] : fields.personal;
      const idback = Array.isArray(fields.idback) ? fields.idback[0] : fields.idback;
      const schufa = Array.isArray(fields.schufa) ? fields.schufa[0] : fields.schufa;
      const mietschuldenfreiheit = Array.isArray(fields.mietschuldenfreiheit) ? fields.mietschuldenfreiheit[0] : fields.mietschuldenfreiheit;
      const mietverhaltnis = Array.isArray(fields.mietverhaltnis) ? fields.mietverhaltnis[0] : fields.mietverhaltnis;
      
      const status = Array.isArray(fields.status) ? fields.status[0] : fields.status;
      const currentactivity = Array.isArray(fields.currentactivity) ? fields.currentactivity[0] : fields.currentactivity;
      const currentemployer = Array.isArray(fields.currentemployer) ? fields.currentemployer[0] : fields.currentemployer;
      const incomee = Array.isArray(fields.incomee) ? fields.incomee[0] : fields.incomee;
      const fläche = Array.isArray(fields.fläche) ? fields.fläche[0] : fields.fläche;
      const anzahlderzimmer = Array.isArray(fields.anzahlderzimmer) ? fields.anzahlderzimmer[0] : fields.anzahlderzimmer;
      const familyid = Array.isArray(fields.familyid) ? fields.familyid[0] : fields.familyid;

      // new code for new images
    
        // profile image
      const inputfotoImage = files.inputfoto;
      let inputfotoImagarray = [];
      let inputfotoImag;

      if(inputfotoImage){
        // inputfotoImag = await deletefile(files.inputfoto);
        if (Applicationforblob.inputfoto?.length > 0) {
          const filename = Applicationforblob.inputfoto.split("/uploads/")[1];
          await deletefile(filename);
        }        
        inputfotoImagarray = await handleFileUpload(files.inputfoto);
        inputfotoImag = inputfotoImagarray[0] || null;

        // console.log(fullfilenameinputfoto)
      }
         // einkommensbescheinigungimg image

        let einkommensbescheinigungimgData = [];
        const einkommensbescheinigungimgFiles = files.einkommensbescheinigungimg;

       

        if(Array.isArray(fields.einkommensbescheinigungimg) && fields.einkommensbescheinigungimg[0] && fields.einkommensbescheinigungimg[0].startsWith(hetznerBaseUrl)){
          // console.log("skip fields.einkommensbescheinigungimg", fields.einkommensbescheinigungimg);
        }else{
          if (einkommensbescheinigungimgFiles) {
            einkommensbescheinigungimgData = await handleFileUpload(files.einkommensbescheinigungimg);
          } else {
            console.warn("No einkommensbescheinigungimg uploaded or incorrect format");
          }
        }

      let imageswbsData = [];

      const imageswbsImages = files.imageswbs;


      if(Array.isArray(fields.imageswbs) && fields.imageswbs[0] && fields.imageswbs[0].startsWith(hetznerBaseUrl)){
        // console.log("skip fields.imageswbs", fields.imageswbs);
      }else{
        if (imageswbsImages) {
          imageswbsData = await handleFileUpload(files.imageswbs);
        } else {
          console.warn("No imageswbs uploaded or incorrect format");
        }
       
      }
      
      // BWA Images

      let bwaImagesData = [];
      const bwaImages = files.bwaimages;
    

      if(Array.isArray(fields.bwaimages) && fields.bwaimages[0] && fields.bwaimages[0].startsWith(hetznerBaseUrl)){
        // console.log("skip fields.bwaimages", fields.bwaimages);
      }else{
        if (bwaImages) {
          bwaImagesData = await handleFileUpload(files.bwaimages);
        } else {
          console.warn("No bwaImages uploaded or incorrect format");
        }
      }


      // Personal Images
      let personalImagesData = [];
      const personalImages = files.personal;
      

      if(Array.isArray(fields.personal) && fields.personal[0] && fields.personal[0].startsWith(hetznerBaseUrl)){
        // console.log("skip fields.personal", fields.personal);
      }else{
        if (personalImages) {
          personalImagesData = await handleFileUpload(files.personal);
        } else {
          console.warn("No personalImages uploaded or incorrect format");
        }
      }
      // idback Images
      let idbackImagesData = [];
      const idbackImages = files.idback;
      

      if(Array.isArray(fields.idback) && fields.idback[0] && fields.idback[0].startsWith(hetznerBaseUrl)){
        // console.log("skip fields.idback", fields.idback);
      }else{
        if (idbackImages) {
          idbackImagesData = await handleFileUpload(files.idback);
        } else {
          console.warn("No idbackImages uploaded or incorrect format");
        }
      }


      // Mietschuldenfreiheit Images
      const mietschuldenfreiheitImagesArray = [];
      let mietschuldenfreiheitImagesData = [];
      const mietschuldenfreiheitImages = files.mietschuldenfreiheitimg;
      // console.log("mietschuldenfreiheitImages", mietschuldenfreiheitImages);
      if(Array.isArray(fields.mietschuldenfreiheitimg) && fields.mietschuldenfreiheitimg[0] && fields.mietschuldenfreiheitimg[0].startsWith(hetznerBaseUrl)){
        // console.log("skip fields.mietschuldenfreiheitimg", fields.mietschuldenfreiheitimg);
      }else{
        if (mietschuldenfreiheitImages) {
          mietschuldenfreiheitImagesData = await handleFileUpload(files.mietschuldenfreiheitimg);
        } else {
          console.warn("No mietschuldenfreiheitImages uploaded or incorrect format");
        }
        // mietschuldenfreiheitImagesData = mietschuldenfreiheitImagesArray.length === 1 ? mietschuldenfreiheitImagesArray : mietschuldenfreiheitImagesArray;
      }

      // Employ Contract Images
      let employContractImagesData = [];
      const employContractImages = files.employcontract;
  

      if(Array.isArray(fields.employcontract) && fields.employcontract[0] && fields.employcontract[0].startsWith(hetznerBaseUrl)){
        // console.log("skip fields.employcontract", fields.employcontract);
      }else{
        if (employContractImages) {
          employContractImagesData = await handleFileUpload(files.employcontract);
        } else {
          console.warn("No employContractImages uploaded or incorrect format");
        }      }
      // return;

      // **Schufa Images**
      let schufaImagesData = [];
      const schufaImages = files.schufa;
     

      if(Array.isArray(fields.schufa) && fields.schufa[0] && fields.schufa[0].startsWith(hetznerBaseUrl)){
        // console.log("skip fields.schufa", fields.schufa);
      }else{
        if (schufaImages) {
          schufaImagesData = await handleFileUpload(files.schufa);
        } else {
          console.warn("No schufaImages uploaded or incorrect format");
        }
      }

      const salarySlip1Images = files.salarySlip1;
      let salarySlip1ImagesData = [];
     

      let salarySlip1firstFile = fields.salarySlip1 && fields.salarySlip1.length > 0 ? fields.salarySlip1[0] : null;
      if (typeof salarySlip1firstFile === "string" && (salarySlip1firstFile.startsWith(hetznerBaseUrl))) {
      }else{
          if (salarySlip1Images) {
           
            salarySlip1ImagesData = await handleFileUpload(files.salarySlip1);
            
          } else {
            console.warn("No salarySlip1Images uploaded or incorrect format");
          }
         
      }
      const salarySlip2Images = files.salarySlip2;
      let salarySlip2ImagesData = [];
     

      let salarySlip2firstFile = fields.salarySlip2 && fields.salarySlip2.length > 0 ? fields.salarySlip2[0] : null;
      if (typeof salarySlip2firstFile === "string" && (salarySlip2firstFile.startsWith(hetznerBaseUrl))) {
          // console.log(`Skipping file: ${fields.salarySlip2[0]}`);
      }else{
        // console.log('Enter in else salarySlip2firstFile');
          if (salarySlip2Images) {
            const salarySlip2Files = Array.isArray(salarySlip2Images) ? salarySlip2Images : [salarySlip2Images];

            
            salarySlip2ImagesData = await handleFileUpload(files.salarySlip2);

          } else {
            console.warn("No salarySlip2Images uploaded or incorrect format");
          }
         
      }

      const salarySlip3Images = files.salarySlip3;
      let salarySlip3ImagesData = [];
     

      let salarySlip3firstFile = fields.salarySlip3 && fields.salarySlip3.length > 0 ? fields.salarySlip3[0] : null;

      if (typeof salarySlip3firstFile === "string" && (salarySlip3firstFile.startsWith(hetznerBaseUrl))) {
      }else{
        if (salarySlip3Images) {
          const salarySlip3Files = Array.isArray(salarySlip3Images) ? salarySlip3Images : [salarySlip3Images];
  
         
          salarySlip3ImagesData = await handleFileUpload(files.salarySlip3);

        } else {
          console.warn("No salarySlip3Images uploaded or incorrect format");
        }
       
      }

      // new code for new images end
      try {
        const updateData = {
          vorname,
          nachname,
          geburtsdatum,
          strabe,
          postleitzahl,
          hausnummer,
          Ort,
          email,
          phonenumber,
          profession,
          ausgeubterBeruf,
          arbeitgeber,
          income,
          employment,
          pets,
          rentarea,
          proceedings,
          apartment,
          coverletter,
          fläche,
          zimerzahl,
          mietschuldenfreiheit,
          mietverhaltnis,
        };

        // **Only include `inputfoto` if `fullfilenameinputfoto` is NOT null/undefined**
        if (inputfotoImage) {
          updateData.inputfoto = inputfotoImag;
        }
        if (files.salarySlip1 && files.salarySlip1.length > 0  && salarySlip1Images !== undefined ) {
            if (Array.isArray(Applicationforblob.salarySlip1) && Applicationforblob.salarySlip1.length > 0) {
                // Run the loop to delete all files in the array
                Applicationforblob.salarySlip1.forEach((fileUrl) => {
                  const filename = fileUrl.split("/uploads/")[1];
                  deletefile(filename);
                });
            }
            updateData.salarySlip1 = salarySlip1ImagesData;
        }else{
          if(!fields.salarySlip1 || (Array.isArray(fields.salarySlip1) && fields.salarySlip1.every(value => value === 'null')) && !salarySlip1Images){
            updateData.salarySlip1 = [];
            if (Array.isArray(Applicationforblob.salarySlip1) && Applicationforblob.salarySlip1.length > 0) {
                // Run the loop to delete all files in the array
                Applicationforblob.salarySlip1.forEach((fileUrl) => {
                  const filename = fileUrl.split("/uploads/")[1];
                  deletefile(filename);
                });
            }
          }
        }
        if (files.salarySlip2 && files.salarySlip2.length > 0  && salarySlip2Images !== undefined) {
          // console.log("enter salarySlip2 if in updated db and blobb");
            if (Array.isArray(Applicationforblob.salarySlip2) && Applicationforblob.salarySlip2.length > 0) {
                // Run the loop to delete all files in the array
                Applicationforblob.salarySlip2.forEach((fileUrl) => {
                  const filename = fileUrl.split("/uploads/")[1];
                  deletefile(filename);
                });
            }
           updateData.salarySlip2 = salarySlip2ImagesData;
        }else{
          // console.log("enter salarySlip2 else in updated db and blobb");
          if(!fields.salarySlip2 || (Array.isArray(fields.salarySlip2) && fields.salarySlip2.length === 1 && fields.salarySlip2[0] === 'null') && !files.salarySlip2 && !salarySlip2Images){
            // console.log("enter salarySlip2 if in updated db and delete bolob");
            updateData.salarySlip2 = [];
            if (Array.isArray(Applicationforblob.salarySlip2) && Applicationforblob.salarySlip2.length > 0) {
                // Run the loop to delete all files in the array
                Applicationforblob.salarySlip2.forEach((fileUrl) => {
                  const filename = fileUrl.split("/uploads/")[1];
                  deletefile(filename);
                });
            }
          }
        }
        if (files.salarySlip3 && files.salarySlip3.length > 0  && salarySlip3Images !== undefined) {
          // console.log("enter salarySlip3 if in updated db and blobb");
          if (Array.isArray(Applicationforblob.salarySlip3) && Applicationforblob.salarySlip3.length > 0) {
                // Run the loop to delete all files in the array
                Applicationforblob.salarySlip3.forEach((fileUrl) => {
                  const filename = fileUrl.split("/uploads/")[1];
                  deletefile(filename);
                });
            }
            updateData.salarySlip3 = salarySlip3ImagesData;
        }else{
          // console.log("enter salarySlip3 else in updated db and blobb");
          if(!fields.salarySlip3 || (Array.isArray(fields.salarySlip3) && fields.salarySlip3.length === 1 && fields.salarySlip3[0] === 'null') && !files.salarySlip3 && !salarySlip3Images){
            // console.log("enter salarySlip3 if in updated db and delete bolob");
            updateData.salarySlip3 = [];
            if (Array.isArray(Applicationforblob.salarySlip3) && Applicationforblob.salarySlip3.length > 0) {
                // Run the loop to delete all files in the array
                Applicationforblob.salarySlip3.forEach((fileUrl) => {
                  const filename = fileUrl.split("/uploads/")[1];
                  deletefile(filename);
                });
            }
          }
        }
        if (Array.isArray(employContractImagesData) && employContractImagesData.length > 0) {
          if (Array.isArray(Applicationforblob.employcontract) && Applicationforblob.employcontract.length > 0) {
              // console.log('Enter to deete bolb and updated from db');
              // Run the loop to delete all files in the array
              Applicationforblob.employcontract.forEach((fileUrl) => {
                const filename = fileUrl.split("/uploads/")[1];
                deletefile(filename);
              });
          }
          updateData.employcontract = employContractImagesData;
        }else{
          const isEmployContractInvalid =
            !Array.isArray(fields.employcontract) ||
            !fields.employcontract[0] ||
            fields.employcontract[0] === 'null';

          if (isEmployContractInvalid && !employContractImages) {
              // console.log('Enter to deete bolb and from db');
            if (Array.isArray(Applicationforblob.employcontract) && Applicationforblob.employcontract.length > 0) {
                // Run the loop to delete all files in the array
                Applicationforblob.employcontract.forEach((fileUrl) => {
                  const filename = fileUrl.split("/uploads/")[1];
                  deletefile(filename);
                });
            }
            updateData.employcontract = [];
          }
        }
        if (Array.isArray(einkommensbescheinigungimgData) && einkommensbescheinigungimgData.length > 0) {
          if (Array.isArray(Applicationforblob.einkommensbescheinigungimg) && Applicationforblob.einkommensbescheinigungimg.length > 0) {
              Applicationforblob.einkommensbescheinigungimg.forEach((fileUrl) => {
                const filename = fileUrl.split("/uploads/")[1];
                deletefile(filename);
              });
          }
            updateData.einkommensbescheinigungimg = einkommensbescheinigungimgData;
        }else{
          const iseinkommensbescheinigungimgInvalid =
            !Array.isArray(fields.einkommensbescheinigungimg) ||
            !fields.einkommensbescheinigungimg[0] ||
            fields.einkommensbescheinigungimg[0] === 'null';

          if (iseinkommensbescheinigungimgInvalid && !einkommensbescheinigungimgFiles) {
              // console.log('Enter to deete bolb and from db');
            if (Array.isArray(Applicationforblob.einkommensbescheinigungimg) && Applicationforblob.einkommensbescheinigungimg.length > 0) {
                // Run the loop to delete all files in the array
                Applicationforblob.einkommensbescheinigungimg.forEach((fileUrl) => {
                  const filename = fileUrl.split("/uploads/")[1];
                  deletefile(filename);
                });
            }
            updateData.einkommensbescheinigungimg = [];
          }
        }
        // if (einkommensbescheinigungimgFiles) {
        //   updateData.einkommensbescheinigungimg = einkommensbescheinigungimgData;
        // }

        if (Array.isArray(imageswbsData) && imageswbsData.length > 0) {
          if (Array.isArray(Applicationforblob.imageswbs) && Applicationforblob.imageswbs.length > 0) {
              Applicationforblob.imageswbs.forEach((fileUrl) => {
                const filename = fileUrl.split("/uploads/")[1];
                deletefile(filename);
              });
          }
            updateData.imageswbs = imageswbsData;
        }else{
          const isimageswbsInvalid =
            !Array.isArray(fields.imageswbs) ||
            !fields.imageswbs[0] ||
            fields.imageswbs[0] === 'null';

          if (isimageswbsInvalid && !imageswbsImages) {
              // console.log('Enter to deete bolb and from db');
            if (Array.isArray(Applicationforblob.imageswbs) && Applicationforblob.imageswbs.length > 0) {
                // Run the loop to delete all files in the array
                Applicationforblob.imageswbs.forEach((fileUrl) => {
                  const filename = fileUrl.split("/uploads/")[1];
                  deletefile(filename);
                });
            }
            updateData.imageswbs = [];
          }
        }

        if (Array.isArray(bwaImagesData) && bwaImagesData.length > 0) {
          if (Array.isArray(Applicationforblob.bwaimages) && Applicationforblob.bwaimages.length > 0) {
              Applicationforblob.bwaimages.forEach((fileUrl) => {
                const filename = fileUrl.split("/uploads/")[1];
                deletefile(filename);
              });
          }
            updateData.bwaimages = bwaImagesData;
        }else{
          const isbwaimagesInvalid =
            !Array.isArray(fields.bwaimages) ||
            !fields.bwaimages[0] ||
            fields.bwaimages[0] === 'null';

          if (isbwaimagesInvalid && !bwaImages) {
              // console.log('Enter to deete bolb and from db');
            if (Array.isArray(Applicationforblob.bwaimages) && Applicationforblob.bwaimages.length > 0) {
                // Run the loop to delete all files in the array
                Applicationforblob.bwaimages.forEach((fileUrl) => {
                  const filename = fileUrl.split("/uploads/")[1];
                  deletefile(filename);
                });
            }
            updateData.bwaimages = [];
          }
        }
        // if (bwaImages) {
        //   updateData.bwaimages = bwaImagesData;
        // }
        if (Array.isArray(personalImagesData) && personalImagesData.length > 0) {
          if (Array.isArray(Applicationforblob.personal) && Applicationforblob.personal.length > 0) {
              Applicationforblob.personal.forEach((fileUrl) => {
                const filename = fileUrl.split("/uploads/")[1];
                deletefile(filename);
              });
          }
            updateData.personal = personalImagesData;
        }else{
          const ispersonalImagesInvalid =
            !Array.isArray(fields.personal) ||
            !fields.personal[0] ||
            fields.personal[0] === 'null';

          if (ispersonalImagesInvalid && !personalImages) {
              // console.log('Enter to deete bolb and from db');
            if (Array.isArray(Applicationforblob.personal) && Applicationforblob.personal.length > 0) {
                // Run the loop to delete all files in the array
                Applicationforblob.personal.forEach((fileUrl) => {
                  const filename = fileUrl.split("/uploads/")[1];
                  deletefile(filename);
                });
            }
            updateData.personal = [];
          }
        }
        if (Array.isArray(idbackImagesData) && idbackImagesData.length > 0) {
          if (Array.isArray(Applicationforblob.idback) && Applicationforblob.idback.length > 0) {
              Applicationforblob.idback.forEach((fileUrl) => {
                const filename = fileUrl.split("/uploads/")[1];
                deletefile(filename);
              });
          }
            updateData.idback = idbackImagesData;
        }else{
          const isidbackImagesInvalid =
            !Array.isArray(fields.idback) ||
            !fields.idback[0] ||
            fields.idback[0] === 'null';

          if (isidbackImagesInvalid && !idbackImages) {
              // console.log('Enter to deete bolb and from db');
            if (Array.isArray(Applicationforblob.idback) && Applicationforblob.idback.length > 0) {
                // Run the loop to delete all files in the array
                Applicationforblob.idback.forEach((fileUrl) => {
                  const filename = fileUrl.split("/uploads/")[1];
                  deletefile(filename);
                });
            }
            updateData.idback = [];
          }
        }
        if (Array.isArray(schufaImagesData) && schufaImagesData.length > 0) {
          if (Array.isArray(Applicationforblob.schufa) && Applicationforblob.schufa.length > 0) {
              Applicationforblob.schufa.forEach((fileUrl) => {
                const filename = fileUrl.split("/uploads/")[1];
                deletefile(filename);
              });
          }
            updateData.schufa = schufaImagesData;
        }else{
          const isschufaImagesInvalid =
            !Array.isArray(fields.schufa) ||
            !fields.schufa[0] ||
            fields.schufa[0] === 'null';

          if (isschufaImagesInvalid && !schufaImages) {
              // console.log('Enter to deete bolb and from db');
            if (Array.isArray(Applicationforblob.schufa) && Applicationforblob.schufa.length > 0) {
                // Run the loop to delete all files in the array
                Applicationforblob.schufa.forEach((fileUrl) => {
                  const filename = fileUrl.split("/uploads/")[1];
                  deletefile(filename);
                });
            }
            updateData.schufa = [];
          }
        }
      // if (schufaImages) {
      //   updateData.schufa = schufaImagesData;
      // }
        if (Array.isArray(mietschuldenfreiheitImagesData) && mietschuldenfreiheitImagesData.length > 0) {
          if (Array.isArray(Applicationforblob.mietschuldenfreiheitimg) && Applicationforblob.mietschuldenfreiheitimg.length > 0) {
              Applicationforblob.mietschuldenfreiheitimg.forEach((fileUrl) => {
                const filename = fileUrl.split("/uploads/")[1];
                deletefile(filename);
              });
          }
            updateData.mietschuldenfreiheitimg = mietschuldenfreiheitImagesData;
        }else{
          const ismietschuldenfreiheitImagesInvalid =
            !Array.isArray(fields.mietschuldenfreiheitimg) ||
            !fields.mietschuldenfreiheitimg[0] ||
            fields.mietschuldenfreiheitimg[0] === 'null';

          if (ismietschuldenfreiheitImagesInvalid && !mietschuldenfreiheitImages) {
              // console.log('Enter to deete bolb and from db');
            if (Array.isArray(Applicationforblob.mietschuldenfreiheitimg) && Applicationforblob.mietschuldenfreiheitimg.length > 0) {
                // Run the loop to delete all files in the array
                Applicationforblob.mietschuldenfreiheitimg.forEach((fileUrl) => {
                  const filename = fileUrl.split("/uploads/")[1];
                  deletefile(filename);
                });
            }
            updateData.mietschuldenfreiheitimg = [];
          }
        }
        // if (mietschuldenfreiheitImages) {
        //   updateData.mietschuldenfreiheitimg = mietschuldenfreiheitImagesData;
        // }
        if(profession === 'Nein'){
         
          if (Array.isArray(Applicationforblob.salarySlip1) && Applicationforblob.salarySlip1.length > 0) {
            // Run the loop to delete all files in the array
            Applicationforblob.salarySlip1.forEach((fileUrl) => {
              const filename = fileUrl.split("/uploads/")[1];
              deletefile(filename);
            });
          }
          if (Array.isArray(Applicationforblob.salarySlip2) && Applicationforblob.salarySlip2.length > 0) {
            // Run the loop to delete all files in the array
            Applicationforblob.salarySlip2.forEach((fileUrl) => {
              const filename = fileUrl.split("/uploads/")[1];
              deletefile(filename);
            });
          }
          if (Array.isArray(Applicationforblob.salarySlip2) && Applicationforblob.salarySlip2.length > 0) {
            // Run the loop to delete all files in the array
            Applicationforblob.salarySlip2.forEach((fileUrl) => {
              const filename = fileUrl.split("/uploads/")[1];
              deletefile(filename);
            });
          }
          // console.log('Enter to deete bolb only');
          if (Array.isArray(Applicationforblob.employcontract) && Applicationforblob.employcontract.length > 0) {
            // Run the loop to delete all files in the array
            Applicationforblob.employcontract.forEach((fileUrl) => {
              const filename = fileUrl.split("/uploads/")[1];
              deletefile(filename);
            });
          }
          updateData.employment = "";
          updateData.employcontract = [];
          updateData.salarySlip1 = [];
          updateData.salarySlip2 = [];
          updateData.salarySlip3 = [];

        }
        if(profession === 'Ja'){
          if (Array.isArray(Applicationforblob.bwaImages) && Applicationforblob.bwaImages.length > 0) {
            // Run the loop to delete all files in the array
            Applicationforblob.bwaImages.forEach((fileUrl) => {
              const filename = fileUrl.split("/uploads/")[1];
              deletefile(filename);
            });
          }
          if (Array.isArray(Applicationforblob.einkommensbescheinigungimg) && Applicationforblob.einkommensbescheinigungimg.length > 0) {
            // Run the loop to delete all files in the array
            Applicationforblob.einkommensbescheinigungimg.forEach((fileUrl) => {
              const filename = fileUrl.split("/uploads/")[1];
              deletefile(filename);
            });
          }
          updateData.bwaImages = [];
          updateData.einkommensbescheinigungimg = [];

        }
        if(mietschuldenfreiheit === 'Nein'){

          if (Array.isArray(Applicationforblob.mietschuldenfreiheitimg) && Applicationforblob.mietschuldenfreiheitimg.length > 0) {
            Applicationforblob.mietschuldenfreiheitimg.forEach((fileUrl) => {
              const filename = fileUrl.split("/uploads/")[1];
              deletefile(filename);
            });
          }
          updateData.mietschuldenfreiheitimg = [];

        }

        const updatedForm = await ApplicationFile.findByIdAndUpdate(
          formid, 
          { $set: updateData },  // Use `$set` to update only these fields
          { new: true, runValidators: true } // Return the updated document and run schema validation
        );
        
         // ✅ Step 2: Define a Predefined PDF URL (Before PDF is Generated)
         const pdfFileName = `${vorname}_${nachname}_${Date.now()}.pdf`;
         const predefinedPdfUrl = `${process.env.HETZNER_ENDPOINT}/${process.env.HETZNER_BUCKET}/uploads/${pdfFileName}`;
       

        

         // ✅ Step 5: Generate and Upload the PDF (Using the predefined URL)
         const PdfUrl = await generateAndUploadPDF(updatedForm, predefinedPdfUrl);

        if (PdfUrl) {
          updatedForm.pdfPath = PdfUrl;
          await updatedForm.save();
        }
        
        return res.status(200).json({ success: true, message: 'Form submitted successfully', pdfUrl: predefinedPdfUrl});
      } catch (error) {
        console.error('Error saving data:', error);
        return res.status(500).json({ success: false, error: 'Error saving data' });
      }
    });
  } else {
    res.status(405).json({ success: false, error: 'Method not allowed' });
  }
};

export default handler;
