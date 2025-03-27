import { IncomingForm } from 'formidable';
import fs from 'fs';
import ApplicationFile from '@/models/ApplicationFile';
import jwt from 'jsonwebtoken';
import { parseCookies } from 'nookies';
import { connectDb } from '@/helper/db';
import User from '@/models/User';
import { v4 as uuidv4 } from 'uuid';
import { put } from '@vercel/blob';
import { pdf } from "@react-pdf/renderer";
import MyDocument from "@/components/MyDocument";
import MyDocumentTwo from "@/components/MyDocumentTwo";
import QRCode from "qrcode";


export const config = {
  api: {
    bodyParser: false,
  },
};


const deletefile = async (id) => {
  if (id) {
      const existingImageUrl = id;
      // console.log(existingImageUrl);
      // return;
      const response = await fetch(`${process.env.NEXT_PUBLIC_HOST}/api/user/deleteblobobject?url=${encodeURIComponent(existingImageUrl)}`, {
          method: "DELETE",
          headers: {
              'Accept': 'application/json',
          }
      });

      if (!response.ok) {
          const error = await response.json();
          console.error('Failed to delete blob:', error);
      }
  }
}
// ✅ Function to generate and upload QR Code image
const generateAndUploadQRCode = async (pdfUrl) => {
  try {
    // ✅ Generate QR Code as PNG buffer
    const qrCodeBuffer = await QRCode.toBuffer(pdfUrl);

    // ✅ Define a unique file name for QR Code
    const qrFileName = `qr_${uuidv4()}.png`;

    // ✅ Upload the QR Code image to Vercel Blob Storage
    const blob = await put(qrFileName, qrCodeBuffer, {
      access: "public",
      contentType: "image/png",
    });

    return blob.url; // ✅ Return the URL of the uploaded QR Code image
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

    // if (!qrCodeUrl) {
    //   console.error("QR Code not found in DB");
    //   return null;
    // }
      // ✅ Delete old PDF before generating a new one
      if (savedForm.pdfPath) {
        await deletefile(savedForm.pdfPath);
      }
      if (savedForm.qrCode) {
        await deletefile(savedForm.qrCode);
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

      pdfBlob = await pdf(<MyDocumentTwo profileData={combinedProfiles} />).toBlob();

      // ✅ Upload new PDF using the predefined name (without modifying the URL)
      await put(pdfFileURL, pdfBlob, {
        access: "public",
        contentType: "application/pdf",
        addRandomSuffix: false,
      });
      //  // ✅ Update parent profile with new PDF URL & QR Code
      //  await ApplicationFile.findByIdAndUpdate(profileData._id, {
      //   pdfPath: predefinedPdfUrl,
      //   qrCode: newQrCodeUrl,
      // });

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

      pdfBlob = await pdf(<MyDocumentTwo profileData={combinedProfiles} />).toBlob();

      // ✅ Upload new PDF using the predefined name (without modifying the URL)
      await put(pdfFileURL, pdfBlob, {
        access: "public",
        contentType: "application/pdf",
        addRandomSuffix: false,
      });
    } else {
      const parentProfile = await ApplicationFile.findById(profileData._id);
      if (!parentProfile) {
        console.error("Parent form not found");
        return null;
      }
      // ✅ Generate PDF for a single person 
      pdfBlob = await pdf(<MyDocument profileData={parentProfile} />).toBlob();
      console.log('pdfBlob', pdfBlob);
      // ✅ Upload new PDF using the predefined name (without modifying the URL)
       await put(pdfFileURL, pdfBlob, {
        access: "public",
        contentType: "application/pdf",
        addRandomSuffix: false, // ✅ Prevents the URL from changing
      });

    }
    return predefinedPdfUrl;
  } catch (error) {
    console.error("Error generating/uploading PDF:", error);
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
      let fullfilenameinputfoto = null
      if(inputfotoImage){
        // If photo is an array, get the first item
        const photoFile = Array.isArray(inputfotoImage) ? inputfotoImage[0] : inputfotoImage;

        if (!photoFile || !photoFile.filepath || !photoFile.originalFilename) {
          console.error('Filepath or originalFilename missing:', photoFile);
          return res.status(400).json({ success: false, error: 'Filepath or originalFilename missing' });
        }
        const fileContent = fs.readFileSync(photoFile.filepath);
        const uniqueFileName = `${uuidv4()}_${photoFile.originalFilename}`;
        const blob = await put(uniqueFileName, fileContent, {
          access: 'public',
        });

        fullfilenameinputfoto = blob.url

        if(fullfilenameinputfoto){
          if (Applicationforblob.inputfoto) {
              deletefile(Applicationforblob.inputfoto);
            }
        }
        // console.log(fullfilenameinputfoto)
      }
         // einkommensbescheinigungimg image
        const einkommensbescheinigungimgArray = [];
        let einkommensbescheinigungimgData = [];
        const einkommensbescheinigungimgFiles = files.einkommensbescheinigungimg;

        // console.log("fields.einkommensbescheinigungimg", fields.einkommensbescheinigungimg);
        // console.log("files.einkommensbescheinigungimg", files.einkommensbescheinigungimg);
        // console.log("einkommensbescheinigungimgFiles", einkommensbescheinigungimgFiles);

        if(Array.isArray(fields.einkommensbescheinigungimg) && fields.einkommensbescheinigungimg[0] && fields.einkommensbescheinigungimg[0].startsWith('blob')){
          // console.log("skip fields.einkommensbescheinigungimg", fields.einkommensbescheinigungimg);
        }else{
          if (einkommensbescheinigungimgFiles) {
            const fileList = Array.isArray(einkommensbescheinigungimgFiles)
              ? einkommensbescheinigungimgFiles
              : [einkommensbescheinigungimgFiles];
            for (const file of fileList) {
              if (file && file.filepath && file.originalFilename) {
                try {
                  const fileContent = fs.readFileSync(file.filepath);
                  const uniqueFileName = `${uuidv4()}_${file.originalFilename}`;
                  const blob = await put(uniqueFileName, fileContent, {
                    access: "public",
                  });

                  einkommensbescheinigungimgArray.push(blob.url);
                  // console.log("Uploaded einkommensbescheinigungimg:", blob.url);
                } catch (error) {
                  console.error("Error uploading einkommensbescheinigungimg:", error);
                }
              } else {
                console.warn("Invalid file structure:", file);
              }
            }
          } else {
            console.warn("No einkommensbescheinigungimg uploaded or incorrect format");
          }
          // ✅ Save as an array; if only one image, still store it inside an array
          einkommensbescheinigungimgData = einkommensbescheinigungimgArray.length === 1 ? einkommensbescheinigungimgArray : einkommensbescheinigungimgArray;
        }
        // console.log("einkommensbescheinigungimgData", einkommensbescheinigungimgData);
      

      const imageswbsImagesArray = [];
      let imageswbsData = [];

      const imageswbsImages = files.imageswbs;
      // console.log("imageswbsImages", imageswbsImages);
      // console.log("fields.imageswbs", fields.imageswbs);
      // console.log("files.imageswbs", files.imageswbs);

      if(Array.isArray(fields.imageswbs) && fields.imageswbs[0] && fields.imageswbs[0].startsWith('blob')){
        // console.log("skip fields.imageswbs", fields.imageswbs);
      }else{
        if (imageswbsImages) {
          const imageswbsFiles = Array.isArray(imageswbsImages) ? imageswbsImages : [imageswbsImages];
          for (const file of imageswbsFiles) {
            if (file && file.filepath && file.originalFilename) {
              try {
                const fileContent = fs.readFileSync(file.filepath);
                const uniqueFileName = `${uuidv4()}_${file.originalFilename}`;
                const blob = await put(uniqueFileName, fileContent, {
                  access: "public",
                });
        
                imageswbsImagesArray.push(blob.url);
                // console.log("Uploaded imageswbs:", blob.url);
              } catch (error) {
                console.error("Error uploading imageswbs:", error);
              }
            } else {
              console.warn("Invalid file structure:", file);
            }
          }
        } else {
          console.warn("No imageswbs uploaded or incorrect format");
        }
        // Save as an array; if only one image, store it inside an array
        imageswbsData = imageswbsImagesArray.length === 1 ? imageswbsImagesArray : imageswbsImagesArray;
      }
      // console.log("imageswbsData", imageswbsData);
      
      // BWA Images
      const bwaImagesArray = [];
      let bwaImagesData = [];
      const bwaImages = files.bwaimages;
      // console.log("fields.bwaimages", fields.bwaimages);
      // console.log("files.bwaimages", files.bwaimages);
      // console.log("bwaImages", bwaImages);

      if(Array.isArray(fields.bwaimages) && fields.bwaimages[0] && fields.bwaimages[0].startsWith('blob')){
        // console.log("skip fields.bwaimages", fields.bwaimages);
      }else{
        if (bwaImages) {
          const bwaFiles = Array.isArray(bwaImages) ? bwaImages : [bwaImages];
          for (const file of bwaFiles) {
            if (file && file.filepath && file.originalFilename) {
              try {
                const fileContent = fs.readFileSync(file.filepath);
                const uniqueFileName = `${uuidv4()}_${file.originalFilename}`;
                const blob = await put(uniqueFileName, fileContent, { access: "public" });

                bwaImagesArray.push(blob.url);
                // console.log("Uploaded bwaImages:", blob.url);
              } catch (error) {
                console.error("Error uploading bwaImages:", error);
              }
            } else {
              console.warn("Invalid file structure:", file);
            }
          }
        } else {
          console.warn("No bwaImages uploaded or incorrect format");
        }
        bwaImagesData = bwaImagesArray.length === 1 ? bwaImagesArray : bwaImagesArray;
      }

      // console.log("bwaImagesData", bwaImagesData);

      // Personal Images
      const personalImagesArray = [];
      let personalImagesData = [];
      const personalImages = files.personal;
      // console.log("fields.personal", fields.personal);
      // console.log("files.personal", files.personal);
      // console.log("personalImages", personalImages);

      if(Array.isArray(fields.personal) && fields.personal[0] && fields.personal[0].startsWith('blob')){
        // console.log("skip fields.personal", fields.personal);
      }else{
        if (personalImages) {
          const personalFiles = Array.isArray(personalImages) ? personalImages : [personalImages];
          for (const file of personalFiles) {
            if (file && file.filepath && file.originalFilename) {
              try {
                const fileContent = fs.readFileSync(file.filepath);
                const uniqueFileName = `${uuidv4()}_${file.originalFilename}`;
                const blob = await put(uniqueFileName, fileContent, { access: "public" });

                personalImagesArray.push(blob.url);
                // console.log("Uploaded personalImages:", blob.url);
              } catch (error) {
                console.error("Error uploading personalImages:", error);
              }
            } else {
              console.warn("Invalid file structure:", file);
            }
          }
        } else {
          console.warn("No personalImages uploaded or incorrect format");
        }
        personalImagesData = personalImagesArray.length === 1 ? personalImagesArray : personalImagesArray;
      }
      // console.log("personalImagesData", personalImagesData);


      // Mietschuldenfreiheit Images
      const mietschuldenfreiheitImagesArray = [];
      let mietschuldenfreiheitImagesData = [];
      const mietschuldenfreiheitImages = files.mietschuldenfreiheitimg;
      // console.log("mietschuldenfreiheitImages", mietschuldenfreiheitImages);
      if(Array.isArray(fields.mietschuldenfreiheitimg) && fields.mietschuldenfreiheitimg[0] && fields.mietschuldenfreiheitimg[0].startsWith('blob')){
        // console.log("skip fields.mietschuldenfreiheitimg", fields.mietschuldenfreiheitimg);
      }else{
        if (mietschuldenfreiheitImages) {
          const mietschuldenfreiheitFiles = Array.isArray(mietschuldenfreiheitImages) ? mietschuldenfreiheitImages : [mietschuldenfreiheitImages];
          for (const file of mietschuldenfreiheitFiles) {
            if (file && file.filepath && file.originalFilename) {
              try {
                const fileContent = fs.readFileSync(file.filepath);
                const uniqueFileName = `${uuidv4()}_${file.originalFilename}`;
                const blob = await put(uniqueFileName, fileContent, { access: "public" });

                mietschuldenfreiheitImagesArray.push(blob.url);
                // console.log("Uploaded mietschuldenfreiheitImages:", blob.url);
              } catch (error) {
                console.error("Error uploading mietschuldenfreiheitImages:", error);
              }
            } else {
              console.warn("Invalid file structure:", file);
            }
          }
        } else {
          console.warn("No mietschuldenfreiheitImages uploaded or incorrect format");
        }
        mietschuldenfreiheitImagesData = mietschuldenfreiheitImagesArray.length === 1 ? mietschuldenfreiheitImagesArray : mietschuldenfreiheitImagesArray;
      }

      // Employ Contract Images
      const employContractImagesArray = [];
      let employContractImagesData = [];
      const employContractImages = files.employcontract;
      // console.log("fields.employcontract", fields.employcontract);
      // console.log("files.employcontract", files.employcontract);
      // console.log("employContractImages", employContractImages);

      if(Array.isArray(fields.employcontract) && fields.employcontract[0] && fields.employcontract[0].startsWith('blob')){
        // console.log("skip fields.employcontract", fields.employcontract);
      }else{
        if (employContractImages) {
          const employContractFiles = Array.isArray(employContractImages) ? employContractImages : [employContractImages];
          for (const file of employContractFiles) {
            if (file && file.filepath && file.originalFilename) {
              try {
                const fileContent = fs.readFileSync(file.filepath);
                const uniqueFileName = `${uuidv4()}_${file.originalFilename}`;
                const blob = await put(uniqueFileName, fileContent, { access: "public" });

                employContractImagesArray.push(blob.url);
                // console.log("Uploaded employContractImages:", blob.url);
              } catch (error) {
                console.error("Error uploading employContractImages:", error);
              }
            } else {
              console.warn("Invalid file structure:", file);
            }
          }
        } else {
          console.warn("No employContractImages uploaded or incorrect format");
        }
        employContractImagesData = employContractImagesArray.length === 1 ? employContractImagesArray : employContractImagesArray;
      }
      // console.log('employContractImagesData',employContractImagesData);
      // return;

      // **Schufa Images**
      const schufaImagesArray = [];
      let schufaImagesData = [];
      const schufaImages = files.schufa;
      // console.log("fields.schufa", fields.schufa);
      // console.log("files.schufa", files.schufa);
      // console.log("schufaImages", schufaImages);

      if(Array.isArray(fields.schufa) && fields.schufa[0] && fields.schufa[0].startsWith('blob')){
        // console.log("skip fields.schufa", fields.schufa);
      }else{
        if (schufaImages) {
          const schufaFiles = Array.isArray(schufaImages) ? schufaImages : [schufaImages];
          for (const file of schufaFiles) {
            if (file && file.filepath && file.originalFilename) {
              try {
                const fileContent = fs.readFileSync(file.filepath);
                const uniqueFileName = `${uuidv4()}_${file.originalFilename}`;
                const blob = await put(uniqueFileName, fileContent, { access: "public" });

                schufaImagesArray.push(blob.url);
                // console.log("Uploaded schufaImages:", blob.url);
              } catch (error) {
                console.error("Error uploading schufaImages:", error);
              }
            } else {
              console.warn("Invalid file structure:", file);
            }
          }
        } else {
          console.warn("No schufaImages uploaded or incorrect format");
        }
        schufaImagesData = schufaImagesArray.length === 1 ? schufaImagesArray : schufaImagesArray;
      }
      // console.log("schufaImagesData", schufaImagesData);

      const salarySlip1ImagesArray = [];
      const salarySlip1Images = files.salarySlip1;
      let salarySlip1ImagesData = [];
      // console.log("files.salarySlip1", files.salarySlip1);
      // console.log("fields.salarySlip1", fields.salarySlip1);
      // console.log("salarySlip1Images", salarySlip1Images);

      let salarySlip1firstFile = fields.salarySlip1 && fields.salarySlip1.length > 0 ? fields.salarySlip1[0] : null;
      if (typeof salarySlip1firstFile === "string" && (salarySlip1firstFile.startsWith("blob:") || salarySlip1firstFile.includes("vercel-storage.com"))) {
          // console.log(`Skipping file: ${fields.salarySlip1[0]}`);
      }else{
          if (salarySlip1Images) {
            const salarySlip1Files = Array.isArray(salarySlip1Images) ? salarySlip1Images : [salarySlip1Images];
            if (Array.isArray(Applicationforblob.salarySlip1) && Applicationforblob.salarySlip1.length > 0) {
                // Run the loop to delete all files in the array
                Applicationforblob.salarySlip1.forEach((fileUrl) => {
                    deletefile(fileUrl);
                });
            }
            for (const file of salarySlip1Files) {
              if (file && file.filepath && file.originalFilename) {
                try {
                  const fileContent = fs.readFileSync(file.filepath);
                  const uniqueFileName = `${uuidv4()}_${file.originalFilename}`;
                  const blob = await put(uniqueFileName, fileContent, { access: "public" });
    
                  salarySlip1ImagesArray.push(blob.url);
                  // console.log("Uploaded salarySlip1Images:", blob.url);
                } catch (error) {
                  console.error("Error uploading salarySlip1Images:", error);
                }
              } else {
                console.warn("Invalid file structure:", file);
              }
            }
          } else {
            console.warn("No salarySlip1Images uploaded or incorrect format");
          }
          salarySlip1ImagesData = salarySlip1ImagesArray.length === 1 ? salarySlip1ImagesArray : salarySlip1ImagesArray;
          // console.log("salarySlip1ImagesData", salarySlip1ImagesData);
      }
      const salarySlip2ImagesArray = [];
      const salarySlip2Images = files.salarySlip2;
      let salarySlip2ImagesData = [];
      // console.log("files.salarySlip2", files.salarySlip2);
      // console.log("fields.salarySlip2", fields.salarySlip2);
      // console.log("salarySlip2Images", salarySlip2Images);

      let salarySlip2firstFile = fields.salarySlip2 && fields.salarySlip2.length > 0 ? fields.salarySlip2[0] : null;
      if (typeof salarySlip2firstFile === "string" && (salarySlip2firstFile.startsWith("blob:") || salarySlip2firstFile.includes("vercel-storage.com"))) {
          // console.log(`Skipping file: ${fields.salarySlip2[0]}`);
      }else{
        // console.log('Enter in else salarySlip2firstFile');
          if (salarySlip2Images) {
            const salarySlip2Files = Array.isArray(salarySlip2Images) ? salarySlip2Images : [salarySlip2Images];

            if (Array.isArray(Applicationforblob.salarySlip2) && Applicationforblob.salarySlip2.length > 0) {
                // Run the loop to delete all files in the array
                Applicationforblob.salarySlip2.forEach((fileUrl) => {
                    deletefile(fileUrl);
                });
            }

            for (const file of salarySlip2Files) {
              if (file && file.filepath && file.originalFilename) {
                try {
                  const fileContent = fs.readFileSync(file.filepath);
                  const uniqueFileName = `${uuidv4()}_${file.originalFilename}`;
                  const blob = await put(uniqueFileName, fileContent, { access: "public" });

                  salarySlip2ImagesArray.push(blob.url);
                  // console.log("Uploaded salarySlip2Images:", blob.url);
                } catch (error) {
                  console.error("Error uploading salarySlip2Images:", error);
                }
              } else {
                console.warn("Invalid file structure:", file);
              }
            }
          } else {
            console.warn("No salarySlip2Images uploaded or incorrect format");
          }
          salarySlip2ImagesData = salarySlip2ImagesArray.length === 1 ? salarySlip2ImagesArray : salarySlip2ImagesArray;
          // console.log("salarySlip2ImagesData", salarySlip2ImagesData);
      }

      const salarySlip3ImagesArray = [];
      const salarySlip3Images = files.salarySlip3;
      let salarySlip3ImagesData = [];
      // console.log("files.salarySlip3", files.salarySlip3);
      // console.log("fields.salarySlip3", fields.salarySlip3);
      // console.log("salarySlip3Images", salarySlip3Images);

      let salarySlip3firstFile = fields.salarySlip3 && fields.salarySlip3.length > 0 ? fields.salarySlip3[0] : null;

      if (typeof salarySlip3firstFile === "string" && (salarySlip3firstFile.startsWith("blob:") || salarySlip3firstFile.includes("vercel-storage.com"))) {
          // console.log(`Skipping file: ${fields.salarySlip3[0]}`);
      }else{
        // console.log('Enter in else salarySlip3firstFile');
        if (salarySlip3Images) {
          const salarySlip3Files = Array.isArray(salarySlip3Images) ? salarySlip3Images : [salarySlip3Images];
  
          if (Array.isArray(Applicationforblob.salarySlip3) && Applicationforblob.salarySlip3.length > 0) {
              // Run the loop to delete all files in the array
              Applicationforblob.salarySlip3.forEach((fileUrl) => {
                  deletefile(fileUrl);
              });
          }
  
          for (const file of salarySlip3Files) {
            if (file && file.filepath && file.originalFilename) {
              try {
                const fileContent = fs.readFileSync(file.filepath);
                const uniqueFileName = `${uuidv4()}_${file.originalFilename}`;
                const blob = await put(uniqueFileName, fileContent, { access: "public" });
  
                salarySlip3ImagesArray.push(blob.url);
                // console.log("Uploaded salarySlip3Images:", blob.url);
              } catch (error) {
                console.error("Error uploading salarySlip3Images:", error);
              }
            } else {
              console.warn("Invalid file structure:", file);
            }
          }
        } else {
          console.warn("No salarySlip3Images uploaded or incorrect format");
        }
        salarySlip3ImagesData = salarySlip3ImagesArray.length === 1 ? salarySlip3ImagesArray : salarySlip3ImagesArray;
        // console.log("salarySlip3ImagesData", salarySlip3ImagesData);
      }

      // new code for new images end
      try {
  
        // const newForm = new Application({
        //   userId: user._id,
        //   vorname,
        //   nachname,
        //   strabe,
        //   hausnummer,
        //   Ort,
        //   email,
        //   tel,
        //   geburtsdatum,
        //   ausgeübterBeruf,
        //   arbeitgeber,
        //   income,
        //   textarea1,
        //   textarea2,
        //   textarea3,
        //   textarea4,
        //   textarea5,
        //   inputfoto: fullfilename, // Save the URL of the uploaded file
        //   noofpeople, // Save the URL of the uploaded file
        //   status, // Save the URL of the uploaded file
        //   currentactivity, // Save the URL of the uploaded file
        //   currentemployer, // Save the URL of the uploaded file
        //   incomee, // Save the URL of the uploaded file
        //   fläche,
        //   familyid,
        //   anzahlderzimmer,
        //   salarystatementlast: fullfilenamesalarystatementlast,  
        //   salarystatementbefore:fullfilenamesalarystatementbefore,       
        //   salarystatementago:fullfilenamesalarystatementago,       
        //   residencepermit:fullfilenameresidencepermit,       
        //   identificationdocument:fullfilenameidentificationdocument,       
        //   shortvideo:fullfilenameshortvideo,       
        //   currentSchufareport:fullfilenamecurrentSchufareport,       
        //   rentalschoolfree:fullfilenamerentalschoolfree,       
        //   signatureData:fullfilenamesignatureData,       
        //   applicationImg:fullfilenamecomponentImage,       
        // });

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
          updateData.inputfoto = fullfilenameinputfoto;
        }
        if (files.salarySlip1 && files.salarySlip1.length > 0 && salarySlip1Images !== undefined) {
            if (Array.isArray(Applicationforblob.salarySlip1) && Applicationforblob.salarySlip1.length > 0) {
                // Run the loop to delete all files in the array
                Applicationforblob.salarySlip1.forEach((fileUrl) => {
                    deletefile(fileUrl);
                });
            }
            updateData.salarySlip1 = salarySlip1ImagesData;
        }else{
          if(!fields.salarySlip1 || (Array.isArray(fields.salarySlip1) && fields.salarySlip1.every(value => value === 'null')) && !salarySlip1Images){
            updateData.salarySlip1 = [];
            if (Array.isArray(Applicationforblob.salarySlip1) && Applicationforblob.salarySlip1.length > 0) {
                // Run the loop to delete all files in the array
                Applicationforblob.salarySlip2.forEach((fileUrl) => {
                    deletefile(fileUrl);
                });
            }
          }
        }
        if (files.salarySlip2 && files.salarySlip2.length > 0 && salarySlip2Images !== undefined) {
          // console.log("enter salarySlip2 if in updated db and blobb");
            if (Array.isArray(Applicationforblob.salarySlip2) && Applicationforblob.salarySlip2.length > 0) {
                // Run the loop to delete all files in the array
                Applicationforblob.salarySlip2.forEach((fileUrl) => {
                    deletefile(fileUrl);
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
                    deletefile(fileUrl);
                });
            }
          }
        }
        if (files.salarySlip3 && files.salarySlip3.length > 0 && salarySlip3Images !== undefined) {
          // console.log("enter salarySlip3 if in updated db and blobb");
          if (Array.isArray(Applicationforblob.salarySlip3) && Applicationforblob.salarySlip3.length > 0) {
                // Run the loop to delete all files in the array
                Applicationforblob.salarySlip3.forEach((fileUrl) => {
                    deletefile(fileUrl);
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
                    deletefile(fileUrl);
                });
            }
          }
        }
        if (Array.isArray(employContractImagesData) && employContractImagesData.length > 0) {
          if (Array.isArray(Applicationforblob.employcontract) && Applicationforblob.employcontract.length > 0) {
              // console.log('Enter to deete bolb and updated from db');
              // Run the loop to delete all files in the array
              Applicationforblob.employcontract.forEach((fileUrl) => {
                  deletefile(fileUrl);
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
                    deletefile(fileUrl);
                });
            }
            updateData.employcontract = [];
          }
        }
        if (Array.isArray(einkommensbescheinigungimgData) && einkommensbescheinigungimgData.length > 0) {
          if (Array.isArray(Applicationforblob.einkommensbescheinigungimg) && Applicationforblob.einkommensbescheinigungimg.length > 0) {
              Applicationforblob.einkommensbescheinigungimg.forEach((fileUrl) => {
                  deletefile(fileUrl);
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
                    deletefile(fileUrl);
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
                  deletefile(fileUrl);
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
                    deletefile(fileUrl);
                });
            }
            updateData.imageswbs = [];
          }
        }

        if (Array.isArray(bwaImagesData) && bwaImagesData.length > 0) {
          if (Array.isArray(Applicationforblob.bwaimages) && Applicationforblob.bwaimages.length > 0) {
              Applicationforblob.bwaimages.forEach((fileUrl) => {
                  deletefile(fileUrl);
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
                    deletefile(fileUrl);
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
                  deletefile(fileUrl);
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
                    deletefile(fileUrl);
                });
            }
            updateData.personal = [];
          }
        }
        if (Array.isArray(schufaImagesData) && schufaImagesData.length > 0) {
          if (Array.isArray(Applicationforblob.schufa) && Applicationforblob.schufa.length > 0) {
              Applicationforblob.schufa.forEach((fileUrl) => {
                  deletefile(fileUrl);
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
                    deletefile(fileUrl);
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
                  deletefile(fileUrl);
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
                    deletefile(fileUrl);
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
                deletefile(fileUrl);
            });
          }
          if (Array.isArray(Applicationforblob.salarySlip2) && Applicationforblob.salarySlip2.length > 0) {
            // Run the loop to delete all files in the array
            Applicationforblob.salarySlip2.forEach((fileUrl) => {
                deletefile(fileUrl);
            });
          }
          if (Array.isArray(Applicationforblob.salarySlip2) && Applicationforblob.salarySlip2.length > 0) {
            // Run the loop to delete all files in the array
            Applicationforblob.salarySlip2.forEach((fileUrl) => {
                deletefile(fileUrl);
            });
          }
          // console.log('Enter to deete bolb only');
          if (Array.isArray(Applicationforblob.employcontract) && Applicationforblob.employcontract.length > 0) {
            // Run the loop to delete all files in the array
            Applicationforblob.employcontract.forEach((fileUrl) => {
                deletefile(fileUrl);
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
                deletefile(fileUrl);
            });
          }
          if (Array.isArray(Applicationforblob.einkommensbescheinigungimg) && Applicationforblob.einkommensbescheinigungimg.length > 0) {
            // Run the loop to delete all files in the array
            Applicationforblob.einkommensbescheinigungimg.forEach((fileUrl) => {
                deletefile(fileUrl);
            });
          }
          updateData.bwaImages = [];
          updateData.einkommensbescheinigungimg = [];

        }
        if(mietschuldenfreiheit === 'Nein'){

          if (Array.isArray(Applicationforblob.mietschuldenfreiheitimg) && Applicationforblob.mietschuldenfreiheitimg.length > 0) {
            Applicationforblob.mietschuldenfreiheitimg.forEach((fileUrl) => {
                deletefile(fileUrl);
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
         const pdfFileName = `${updatedForm.vorname}_${updatedForm.nachname}_${Date.now()}.pdf`;
         const predefinedPdfUrl = `${process.env.BLOB_UPLOAD_URL}/${pdfFileName}`;
       

         // ✅ Step 3: Generate QR Code using the predefined PDF URL
        //  const qrCodeUrl = await generateAndUploadQRCode(predefinedPdfUrl);
         
        //  if (!qrCodeUrl) {
        //    console.error("Failed to generate QR Code");
        //    return res.status(500).json({ success: false, error: "QR Code generation failed" });
        //  }

         // ✅ Step 4: Save QR Code URL to the database before generating PDF
        //  updatedForm.qrCode = qrCodeUrl;
        //  await updatedForm.save();

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
