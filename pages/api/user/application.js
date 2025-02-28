import { IncomingForm } from 'formidable';
import fs from 'fs';
import path from 'path';
import Application from '@/models/Application';
import ApplicationFile from '@/models/ApplicationFile';
import jwt from 'jsonwebtoken';
import { parseCookies } from 'nookies';
import { connectDb } from '@/helper/db';
import User from '@/models/User';
import { v4 as uuidv4 } from 'uuid';
import { put } from '@vercel/blob';
import { pdf } from "@react-pdf/renderer";
import MyDocument from "@/components/MyDocument";

export const config = {
  api: {
    bodyParser: false,
  },
};
// After successfully saving the form, generate a PDF

const generateAndUploadPDF = async (profileData) => {
  try {
    console.log("PDF t1");
    const pdfBlob = await pdf(<MyDocument profileData={profileData} />).toBlob();
    // Generate PDF as a Buffer
    console.log("PDF t2");
    // Define unique filename
    const pdfFileName = `${profileData.vorname}_${profileData.nachname}_${Date.now()}.pdf`;
    console.log("PDF t3");
    const blob = await put(pdfFileName, pdfBlob, {
      access: "public",
      token: 'vercel_blob_rw_ni5RpxtViTZSvQtJ_767ABnC8d5HabjllEBLq0H5jSuIFn6',
    });

    console.log("PDF uploaded successfully:", blob.url);
    return blob.url; // Return the uploaded PDF URL
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

      const vorname = Array.isArray(fields.vorname) ? fields.vorname[0] : fields.vorname;
      const nachname = Array.isArray(fields.nachname) ? fields.nachname[0] : fields.nachname;
      const strabe = Array.isArray(fields.strabe) ? fields.strabe[0] : fields.strabe;
      const hausnummer = Array.isArray(fields.hausnummer) ? fields.hausnummer[0] : fields.hausnummer;
      const postleitzahl = Array.isArray(fields.postleitzahl) ? fields.postleitzahl[0] : fields.postleitzahl;
      const PLZ = Array.isArray(fields.PLZ) ? fields.PLZ[0] : fields.PLZ;
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
      // const salaryslip = Array.isArray(fields.salaryslip) ? fields.salaryslip[0] : fields.salaryslip;
      // const salaryslip = Array.isArray(fields.salarySlip) ? fields.salarySlip : [fields.salarySlip];
      // console.log('heretest', salaryslip);
      const employcontract = Array.isArray(fields.employcontract) ? fields.employcontract[0] : fields.employcontract;
      const pets = Array.isArray(fields.pets) ? fields.pets[0] : fields.pets;
      const rentarea = Array.isArray(fields.rentarea) ? fields.rentarea[0] : fields.rentarea;
      const proceedings = Array.isArray(fields.proceedings) ? fields.proceedings[0] : fields.proceedings;
      const apartment = Array.isArray(fields.apartment) ? fields.apartment[0] : fields.apartment;
      const coverletter = Array.isArray(fields.coverletter) ? fields.coverletter[0] : fields.coverletter;
      const zimerzahl = Array.isArray(fields.zimerzahl) ? fields.zimerzahl[0] : fields.zimerzahl;
      // const imageswbs = Array.isArray(fields.imageswbs) ? fields.imageswbs[0] : fields.imageswbs;
      const personal = Array.isArray(fields.personal) ? fields.personal[0] : fields.personal;
      const schufa = Array.isArray(fields.schufa) ? fields.schufa[0] : fields.schufa;
      const mietschuldenfreiheit = Array.isArray(fields.mietschuldenfreiheit) ? fields.mietschuldenfreiheit[0] : fields.mietschuldenfreiheit;
      const mietschuldenfreiheitimg = Array.isArray(fields.mietschuldenfreiheitimg) ? fields.mietschuldenfreiheitimg[0] : fields.mietschuldenfreiheitimg;
      const mietverhaltnis = Array.isArray(fields.mietverhaltnis) ? fields.mietverhaltnis[0] : fields.mietverhaltnis;
      const firstname = Array.isArray(fields.firstname) ? fields.firstname[0] : fields.firstname;
      const lastname = Array.isArray(fields.lastname) ? fields.lastname[0] : fields.lastname;
      const email2 = Array.isArray(fields.email2) ? fields.email2[0] : fields.email2;
      
      const status = Array.isArray(fields.status) ? fields.status[0] : fields.status;
      const currentactivity = Array.isArray(fields.currentactivity) ? fields.currentactivity[0] : fields.currentactivity;
      const currentemployer = Array.isArray(fields.currentemployer) ? fields.currentemployer[0] : fields.currentemployer;
      const incomee = Array.isArray(fields.incomee) ? fields.incomee[0] : fields.incomee;
      const fläche = Array.isArray(fields.fläche) ? fields.fläche[0] : fields.fläche;
      const anzahlderzimmer = Array.isArray(fields.anzahlderzimmer) ? fields.anzahlderzimmer[0] : fields.anzahlderzimmer;
      const familyid = Array.isArray(fields.familyid) ? fields.familyid[0] : fields.familyid;
//////////first photo
     
      const photo = files.photo;
      let fullfilename = null

      if(photo){
        // If photo is an array, get the first item
        const photoFile = Array.isArray(photo) ? photo[0] : photo;

        if (!photoFile || !photoFile.filepath || !photoFile.originalFilename) {
          console.error('Filepath or originalFilename missing:', photoFile);
          return res.status(400).json({ success: false, error: 'Filepath or originalFilename missing' });
        }

        const fileContent = fs.readFileSync(photoFile.filepath);
        const uniqueFileName = `${uuidv4()}_${photoFile.originalFilename}`;
        const blob = await put(uniqueFileName, fileContent, {
          access: 'public',
        });

        fullfilename = blob.url
      }

//////////salarystatementlast photo

      const salarystatementlast = files.salarystatementlast;
      let fullfilenamesalarystatementlast = null

      if(salarystatementlast){
        // If photo is an array, get the first item
        const photoFile = Array.isArray(salarystatementlast) ? salarystatementlast[0] : salarystatementlast;

        if (!photoFile || !photoFile.filepath || !photoFile.originalFilename) {
          console.error('Filepath or originalFilename missing:', photoFile);
          return res.status(400).json({ success: false, error: 'Filepath or originalFilename missing' });
        }

        const fileContent = fs.readFileSync(photoFile.filepath);
        const uniqueFileName = `${uuidv4()}_${photoFile.originalFilename}`;
        const blob = await put(uniqueFileName, fileContent, {
          access: 'public',
        });

        fullfilenamesalarystatementlast = blob.url
      }
//////////salarystatementbefore photo

      const salarystatementbefore = files.salarystatementbefore;
      let fullfilenamesalarystatementbefore = null

      if(salarystatementbefore){
        // If photo is an array, get the first item
        const photoFile = Array.isArray(salarystatementbefore) ? salarystatementbefore[0] : salarystatementbefore;

        if (!photoFile || !photoFile.filepath || !photoFile.originalFilename) {
          console.error('Filepath or originalFilename missing:', photoFile);
          return res.status(400).json({ success: false, error: 'Filepath or originalFilename missing' });
        }

        const fileContent = fs.readFileSync(photoFile.filepath);
        const uniqueFileName = `${uuidv4()}_${photoFile.originalFilename}`;
        const blob = await put(uniqueFileName, fileContent, {
          access: 'public',
        });

        fullfilenamesalarystatementbefore = blob.url
      }
//////////salarystatementago photo

      const salarystatementago = files.salarystatementago;
      let fullfilenamesalarystatementago = null

      if(salarystatementago){
        // If photo is an array, get the first item
        const photoFile = Array.isArray(salarystatementago) ? salarystatementago[0] : salarystatementago;

        if (!photoFile || !photoFile.filepath || !photoFile.originalFilename) {
          console.error('Filepath or originalFilename missing:', photoFile);
          return res.status(400).json({ success: false, error: 'Filepath or originalFilename missing' });
        }

        const fileContent = fs.readFileSync(photoFile.filepath);
        const uniqueFileName = `${uuidv4()}_${photoFile.originalFilename}`;
        const blob = await put(uniqueFileName, fileContent, {
          access: 'public',
        });

        fullfilenamesalarystatementago = blob.url
      }
//////////residencepermit photo

      const residencepermit = files.residencepermit;
      let fullfilenameresidencepermit = null

      if(residencepermit){
        // If photo is an array, get the first item
        const photoFile = Array.isArray(residencepermit) ? residencepermit[0] : residencepermits;

        if (!photoFile || !photoFile.filepath || !photoFile.originalFilename) {
          console.error('Filepath or originalFilename missing:', photoFile);
          return res.status(400).json({ success: false, error: 'Filepath or originalFilename missing' });
        }

        const fileContent = fs.readFileSync(photoFile.filepath);
        const uniqueFileName = `${uuidv4()}_${photoFile.originalFilename}`;
        const blob = await put(uniqueFileName, fileContent, {
          access: 'public',
        });

        fullfilenameresidencepermit = blob.url
      }
//////////identificationdocument photo

      const identificationdocument = files.identificationdocument;
      let fullfilenameidentificationdocument = null

      if(residencepermit){
        // If photo is an array, get the first item
        const photoFile = Array.isArray(identificationdocument) ? identificationdocument[0] : identificationdocument;

        if (!photoFile || !photoFile.filepath || !photoFile.originalFilename) {
          console.error('Filepath or originalFilename missing:', photoFile);
          return res.status(400).json({ success: false, error: 'Filepath or originalFilename missing' });
        }

        const fileContent = fs.readFileSync(photoFile.filepath);
        const uniqueFileName = `${uuidv4()}_${photoFile.originalFilename}`;
        const blob = await put(uniqueFileName, fileContent, {
          access: 'public',
        });

        fullfilenameidentificationdocument = blob.url
      }
//////////shortvideo photo

      const shortvideo = files.shortvideo;
      let fullfilenameshortvideo = null

      if(residencepermit){
        // If photo is an array, get the first item
        const photoFile = Array.isArray(shortvideo) ? shortvideo[0] : shortvideo;

        if (!photoFile || !photoFile.filepath || !photoFile.originalFilename) {
          console.error('Filepath or originalFilename missing:', photoFile);
          return res.status(400).json({ success: false, error: 'Filepath or originalFilename missing' });
        }

        const fileContent = fs.readFileSync(photoFile.filepath);
        const uniqueFileName = `${uuidv4()}_${photoFile.originalFilename}`;
        const blob = await put(uniqueFileName, fileContent, {
          access: 'public',
        });

        fullfilenameshortvideo = blob.url
      }
//////////currentSchufareport photo

      const currentSchufareport = files.currentSchufareport;
      let fullfilenamecurrentSchufareport = null

      if(currentSchufareport){
        // If photo is an array, get the first item
        const photoFile = Array.isArray(currentSchufareport) ? currentSchufareport[0] : currentSchufareport;

        if (!photoFile || !photoFile.filepath || !photoFile.originalFilename) {
          console.error('Filepath or originalFilename missing:', photoFile);
          return res.status(400).json({ success: false, error: 'Filepath or originalFilename missing' });
        }

        const fileContent = fs.readFileSync(photoFile.filepath);
        const uniqueFileName = `${uuidv4()}_${photoFile.originalFilename}`;
        const blob = await put(uniqueFileName, fileContent, {
          access: 'public',
        });

        fullfilenamecurrentSchufareport = blob.url
      }
//////////currentSchufareport photo

      const rentalschoolfree = files.rentalschoolfree;
      let fullfilenamerentalschoolfree = null

      if(rentalschoolfree){
        // If photo is an array, get the first item
        const photoFile = Array.isArray(rentalschoolfree) ? rentalschoolfree[0] : rentalschoolfree;

        if (!photoFile || !photoFile.filepath || !photoFile.originalFilename) {
          console.error('Filepath or originalFilename missing:', photoFile);
          return res.status(400).json({ success: false, error: 'Filepath or originalFilename missing' });
        }

        const fileContent = fs.readFileSync(photoFile.filepath);
        const uniqueFileName = `${uuidv4()}_${photoFile.originalFilename}`;
        const blob = await put(uniqueFileName, fileContent, {
          access: 'public',
        });

        fullfilenamerentalschoolfree = blob.url
      }
    
//////////signatureData photo

      const signatureData = files.signatureData;
      let fullfilenamesignatureData = null

      if(signatureData){
        // If photo is an array, get the first item
        const photoFile = Array.isArray(signatureData) ? signatureData[0] : signatureData;

        if (!photoFile || !photoFile.filepath || !photoFile.originalFilename) {
          console.error('Filepath or originalFilename missing:', photoFile);
          return res.status(400).json({ success: false, error: 'Filepath or originalFilename missing' });
        }

        const fileContent = fs.readFileSync(photoFile.filepath);
        const uniqueFileName = `${uuidv4()}_${photoFile.originalFilename}`;
        const blob = await put(uniqueFileName, fileContent, {
          access: 'public',
        });

        fullfilenamesignatureData = blob.url
      }
//////////applicationIMG photo

      const componentImage = files.componentImage;
      let fullfilenamecomponentImage = null

      if(componentImage){
        // If photo is an array, get the first item
        const photoFile = Array.isArray(componentImage) ? componentImage[0] : componentImage;

        if (!photoFile || !photoFile.filepath || !photoFile.originalFilename) {
          console.error('Filepath or originalFilename missing:', photoFile);
          return res.status(400).json({ success: false, error: 'Filepath or originalFilename missing' });
        }

        const fileContent = fs.readFileSync(photoFile.filepath);
        const uniqueFileName = `${uuidv4()}_${photoFile.originalFilename}`;
        const blob = await put(uniqueFileName, fileContent, {
          access: 'public',
        });

        fullfilenamecomponentImage = blob.url
      }


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
        // console.log(fullfilenameinputfoto)
      }

       // employcontract image
      //  const employcontractImage = files.employcontract;
      //  let fullfilenameemploycontract = null

      //  if(employcontractImage){
      //    console.log('',employcontractImage)
      //    // If photo is an array, get the first item
      //    const photoFile = Array.isArray(employcontractImage) ? employcontractImage[0] : employcontractImage;
 
      //    if (!photoFile || !photoFile.filepath || !photoFile.originalFilename) {
      //      console.error('Filepath or originalFilename missing:', photoFile);
      //      return res.status(400).json({ success: false, error: 'Filepath or originalFilename missing' });
      //    }
 
      //    const fileContent = fs.readFileSync(photoFile.filepath);
      //    const uniqueFileName = `${uuidv4()}_${photoFile.originalFilename}`;
      //    const blob = await put(uniqueFileName, fileContent, {
      //      access: 'public',
      //    });
 
      //    fullfilenameemploycontract = blob.url
      //    console.log(fullfilenameemploycontract)
      //  }

        // bwa image
        // const bwaimagesImage = files.bwaimages;
        // let fullfilenamebwaimages = null
 
        // if(bwaimagesImage){
        //   console.log('contract')
        //   console.log(bwaimagesImage)
        //   // If photo is an array, get the first item
        //   const photoFile = Array.isArray(bwaimagesImage) ? bwaimagesImage[0] : bwaimagesImage;
  
        //   if (!photoFile || !photoFile.filepath || !photoFile.originalFilename) {
        //     console.error('Filepath or originalFilename missing:', photoFile);
        //     return res.status(400).json({ success: false, error: 'Filepath or originalFilename missing' });
        //   }
  
        //   const fileContent = fs.readFileSync(photoFile.filepath);
        //   const uniqueFileName = `${uuidv4()}_${photoFile.originalFilename}`;
        //   const blob = await put(uniqueFileName, fileContent, {
        //     access: 'public',
        //   });
  
        //   fullfilenamebwaimages = blob.url
        //   console.log(fullfilenamebwaimages)
        // }
         // einkommensbescheinigungimg image
        const einkommensbescheinigungimgArray = [];

        const einkommensbescheinigungimgFiles = files.einkommensbescheinigungimg;
        console.log("einkommensbescheinigungimgFiles", einkommensbescheinigungimgFiles);

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
                console.log("Uploaded einkommensbescheinigungimg:", blob.url);
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
          const einkommensbescheinigungimgData =
            einkommensbescheinigungimgArray.length === 1
              ? einkommensbescheinigungimgArray
              : einkommensbescheinigungimgArray;

        //  // imageswbs image
        //  const imageswbsImage = files.imageswbs;
        //  let fullfilenameimageswbs = null
  
        //  if(imageswbsImage){
        //    console.log('contract')
        //    console.log(imageswbsImage)
        //    // If photo is an array, get the first item
        //    const photoFile = Array.isArray(imageswbsImage) ? imageswbsImage[0] : imageswbsImage;
   
        //    if (!photoFile || !photoFile.filepath || !photoFile.originalFilename) {
        //      console.error('Filepath or originalFilename missing:', photoFile);
        //      return res.status(400).json({ success: false, error: 'Filepath or originalFilename missing' });
        //    }
   
        //    const fileContent = fs.readFileSync(photoFile.filepath);
        //    const uniqueFileName = `${uuidv4()}_${photoFile.originalFilename}`;
        //    const blob = await put(uniqueFileName, fileContent, {
        //      access: 'public',
        //    });
   
        //    fullfilenameimageswbs = blob.url
        //    console.log(fullfilenameimageswbs)
        //  }

         //id card imag
        //  const personalImage = files.personal;
        //  let fullfilenamepersonal = null
  
        //  if(personalImage){
        //    console.log('contract')
        //    console.log(personalImage)
        //    // If photo is an array, get the first item
        //    const photoFile = Array.isArray(personalImage) ? personalImage[0] : personalImage;
   
        //    if (!photoFile || !photoFile.filepath || !photoFile.originalFilename) {
        //      console.error('Filepath or originalFilename missing:', photoFile);
        //      return res.status(400).json({ success: false, error: 'Filepath or originalFilename missing' });
        //    }
   
        //    const fileContent = fs.readFileSync(photoFile.filepath);
        //    const uniqueFileName = `${uuidv4()}_${photoFile.originalFilename}`;
        //    const blob = await put(uniqueFileName, fileContent, {
        //      access: 'public',
        //    });
   
        //    fullfilenamepersonal = blob.url
        //    console.log(fullfilenamepersonal)
        //  }

        // schufa img
        //  const schufaImage = files.schufa;
        //  let fullfilenameschufa = null
  
        //  if(schufaImage){
        //    console.log('contract')
        //    console.log(schufaImage)
        //    // If photo is an array, get the first item
        //    const photoFile = Array.isArray(schufaImage) ? schufaImage[0] : schufaImage;
   
        //    if (!photoFile || !photoFile.filepath || !photoFile.originalFilename) {
        //      console.error('Filepath or originalFilename missing:', photoFile);
        //      return res.status(400).json({ success: false, error: 'Filepath or originalFilename missing' });
        //    }
   
        //    const fileContent = fs.readFileSync(photoFile.filepath);
        //    const uniqueFileName = `${uuidv4()}_${photoFile.originalFilename}`;
        //    const blob = await put(uniqueFileName, fileContent, {
        //      access: 'public',
        //    });
   
        //    fullfilenameschufa = blob.url
        //    console.log(fullfilenameschufa)
        //  }

         //mietschuldenfreiheitimg

        //  const mietschuldenfreiheitimgImage = files.mietschuldenfreiheitimg;
        //  let fullfilenamemietschuldenfreiheitimg = null
  
        //  if(mietschuldenfreiheitimgImage){
        //    console.log('contract')
        //    console.log(mietschuldenfreiheitimgImage)
        //    // If photo is an array, get the first item
        //    const photoFile = Array.isArray(mietschuldenfreiheitimgImage) ? mietschuldenfreiheitimgImage[0] : mietschuldenfreiheitimgImage;
   
        //    if (!photoFile || !photoFile.filepath || !photoFile.originalFilename) {
        //      console.error('Filepath or originalFilename missing:', photoFile);
        //      return res.status(400).json({ success: false, error: 'Filepath or originalFilename missing' });
        //    }
   
        //    const fileContent = fs.readFileSync(photoFile.filepath);
        //    const uniqueFileName = `${uuidv4()}_${photoFile.originalFilename}`;
        //    const blob = await put(uniqueFileName, fileContent, {
        //      access: 'public',
        //    });
   
        //    fullfilenamemietschuldenfreiheitimg = blob.url
        //    console.log(fullfilenamemietschuldenfreiheitimg)
        //  }

        //  const salarySlipImage = files.salarySlip;
        //  let fullfilenamesalarySlipImageimg = null
  
        //  if(salarySlipImage){
        //    console.log('contract')
        //    console.log(salarySlipImage)
        //    // If photo is an array, get the first item
        //    const photoFile = Array.isArray(salarySlipImage) ? salarySlipImage[0] : salarySlipImage;
   
        //    if (!photoFile || !photoFile.filepath || !photoFile.originalFilename) {
        //      console.error('Filepath or originalFilename missing:', photoFile);
        //      return res.status(400).json({ success: false, error: 'Filepath or originalFilename missing' });
        //    }
   
        //    const fileContent = fs.readFileSync(photoFile.filepath);
        //    const uniqueFileName = `${uuidv4()}_${photoFile.originalFilename}`;
        //    const blob = await put(uniqueFileName, fileContent, {
        //      access: 'public',
        //    });
   
        //    fullfilenamesalarySlipImageimg = blob.url
        //    console.log(fullfilenamesalarySlipImageimg)
        //  }
        const salarySlipImagesArray = [];

      const salaryslipImages = files.salarySlip;
      console.log('files', files);
         console.log('salaryslipImages', salaryslipImages);
      if (salaryslipImages) {
        const salaryslipFiles = Array.isArray(salaryslipImages) ? salaryslipImages : [salaryslipImages];

        for (const file of salaryslipFiles) {
          if (file && file.filepath && file.originalFilename) {
            try {
              const fileContent = fs.readFileSync(file.filepath);
              const uniqueFileName = `${uuidv4()}_${file.originalFilename}`;
              const blob = await put(uniqueFileName, fileContent, {
                access: 'public',
              });

              salarySlipImagesArray.push(blob.url);
              console.log("Uploaded Salary Slip:", blob.url);
            } catch (error) {
              console.error("Error uploading salary slip:", error);
            }
          } else {
            console.warn("Invalid file structure:", file);
          }
        }
      } else {
        console.warn("No salary slips uploaded or incorrect format");
      }


      // // wbs
      // // const imageswbsImage = files.imageswbs;
      // const imageswbsImagesArray = [];

      // const imageswbsImages = files.imageswbs;
      //    console.log('imageswbsImages', imageswbsImages);
      // if (imageswbsImages) {
      //   const imageswbsFiles = Array.isArray(imageswbsImages) ? imageswbsImages : [imageswbsImages];

      //   for (const file of imageswbsFiles) {
      //     if (file && file.filepath && file.originalFilename) {
      //       try {
      //         const fileContent = fs.readFileSync(file.filepath);
      //         const uniqueFileName = `${uuidv4()}_${file.originalFilename}`;
      //         const blob = await put(uniqueFileName, fileContent, {
      //           access: 'public',
      //         });

      //         imageswbsImagesArray.push(blob.url);
      //         console.log("Uploaded imageswbs:", blob.url);
      //       } catch (error) {
      //         console.error("Error uploading imageswbs:", error);
      //       }
      //     } else {
      //       console.warn("Invalid file structure:", file);
      //     }
      //   }
      // } else {
      //   console.warn("No imageswbs uploaded or incorrect format");
      // }

      const imageswbsImagesArray = [];

      const imageswbsImages = files.imageswbs;
      console.log("imageswbsImages", imageswbsImages);
      
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
              console.log("Uploaded imageswbs:", blob.url);
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
      const imageswbsData = imageswbsImagesArray.length === 1 ? imageswbsImagesArray : imageswbsImagesArray;
      
      // BWA Images
const bwaImagesArray = [];
const bwaImages = files.bwaimages;
console.log("bwaImages", bwaImages);

if (bwaImages) {
  const bwaFiles = Array.isArray(bwaImages) ? bwaImages : [bwaImages];

  for (const file of bwaFiles) {
    if (file && file.filepath && file.originalFilename) {
      try {
        const fileContent = fs.readFileSync(file.filepath);
        const uniqueFileName = `${uuidv4()}_${file.originalFilename}`;
        const blob = await put(uniqueFileName, fileContent, { access: "public" });

        bwaImagesArray.push(blob.url);
        console.log("Uploaded bwaImages:", blob.url);
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
const bwaImagesData = bwaImagesArray.length === 1 ? bwaImagesArray : bwaImagesArray;


// Personal Images
const personalImagesArray = [];
const personalImages = files.personal;
console.log("personalImages", personalImages);

if (personalImages) {
  const personalFiles = Array.isArray(personalImages) ? personalImages : [personalImages];

  for (const file of personalFiles) {
    if (file && file.filepath && file.originalFilename) {
      try {
        const fileContent = fs.readFileSync(file.filepath);
        const uniqueFileName = `${uuidv4()}_${file.originalFilename}`;
        const blob = await put(uniqueFileName, fileContent, { access: "public" });

        personalImagesArray.push(blob.url);
        console.log("Uploaded personalImages:", blob.url);
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
const personalImagesData = personalImagesArray.length === 1 ? personalImagesArray : personalImagesArray;


// Mietschuldenfreiheit Images
const mietschuldenfreiheitImagesArray = [];
const mietschuldenfreiheitImages = files.mietschuldenfreiheitimg;
console.log("mietschuldenfreiheitImages", mietschuldenfreiheitImages);

if (mietschuldenfreiheitImages) {
  const mietschuldenfreiheitFiles = Array.isArray(mietschuldenfreiheitImages) ? mietschuldenfreiheitImages : [mietschuldenfreiheitImages];

  for (const file of mietschuldenfreiheitFiles) {
    if (file && file.filepath && file.originalFilename) {
      try {
        const fileContent = fs.readFileSync(file.filepath);
        const uniqueFileName = `${uuidv4()}_${file.originalFilename}`;
        const blob = await put(uniqueFileName, fileContent, { access: "public" });

        mietschuldenfreiheitImagesArray.push(blob.url);
        console.log("Uploaded mietschuldenfreiheitImages:", blob.url);
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
const mietschuldenfreiheitImagesData = mietschuldenfreiheitImagesArray.length === 1 ? mietschuldenfreiheitImagesArray : mietschuldenfreiheitImagesArray;


// Employ Contract Images
const employContractImagesArray = [];
const employContractImages = files.employcontract;
console.log("employContractImages", employContractImages);

if (employContractImages) {
  const employContractFiles = Array.isArray(employContractImages) ? employContractImages : [employContractImages];

  for (const file of employContractFiles) {
    if (file && file.filepath && file.originalFilename) {
      try {
        const fileContent = fs.readFileSync(file.filepath);
        const uniqueFileName = `${uuidv4()}_${file.originalFilename}`;
        const blob = await put(uniqueFileName, fileContent, { access: "public" });

        employContractImagesArray.push(blob.url);
        console.log("Uploaded employContractImages:", blob.url);
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
const employContractImagesData = employContractImagesArray.length === 1 ? employContractImagesArray : employContractImagesArray;

// **Schufa Images**
const schufaImagesArray = [];
const schufaImages = files.schufa;
console.log("schufaImages", schufaImages);

if (schufaImages) {
  const schufaFiles = Array.isArray(schufaImages) ? schufaImages : [schufaImages];

  for (const file of schufaFiles) {
    if (file && file.filepath && file.originalFilename) {
      try {
        const fileContent = fs.readFileSync(file.filepath);
        const uniqueFileName = `${uuidv4()}_${file.originalFilename}`;
        const blob = await put(uniqueFileName, fileContent, { access: "public" });

        schufaImagesArray.push(blob.url);
        console.log("Uploaded schufaImages:", blob.url);
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
const schufaImagesData = schufaImagesArray.length === 1 ? schufaImagesArray : schufaImagesArray;
        

const salarySlip1ImagesArray = [];
const salarySlip1Images = files.salarySlip1;
console.log("salarySlip1Images", salarySlip1Images);

if (salarySlip1Images) {
  const salarySlip1Files = Array.isArray(salarySlip1Images) ? salarySlip1Images : [salarySlip1Images];

  for (const file of salarySlip1Files) {
    if (file && file.filepath && file.originalFilename) {
      try {
        const fileContent = fs.readFileSync(file.filepath);
        const uniqueFileName = `${uuidv4()}_${file.originalFilename}`;
        const blob = await put(uniqueFileName, fileContent, { access: "public" });

        salarySlip1ImagesArray.push(blob.url);
        console.log("Uploaded salarySlip1Images:", blob.url);
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
const salarySlip1ImagesData = salarySlip1ImagesArray.length === 1 ? salarySlip1ImagesArray : salarySlip1ImagesArray;

const salarySlip2ImagesArray = [];
const salarySlip2Images = files.salarySlip2;
console.log("salarySlip2Images", salarySlip2Images);

if (salarySlip2Images) {
  const salarySlip2Files = Array.isArray(salarySlip2Images) ? salarySlip2Images : [salarySlip2Images];

  for (const file of salarySlip2Files) {
    if (file && file.filepath && file.originalFilename) {
      try {
        const fileContent = fs.readFileSync(file.filepath);
        const uniqueFileName = `${uuidv4()}_${file.originalFilename}`;
        const blob = await put(uniqueFileName, fileContent, { access: "public" });

        salarySlip2ImagesArray.push(blob.url);
        console.log("Uploaded salarySlip2Images:", blob.url);
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
const salarySlip2ImagesData = salarySlip2ImagesArray.length === 1 ? salarySlip2ImagesArray : salarySlip2ImagesArray;
const salarySlip3ImagesArray = [];
const salarySlip3Images = files.salarySlip3;
console.log("salarySlip3Images", salarySlip3Images);

if (salarySlip3Images) {
  const salarySlip3Files = Array.isArray(salarySlip3Images) ? salarySlip3Images : [salarySlip3Images];

  for (const file of salarySlip3Files) {
    if (file && file.filepath && file.originalFilename) {
      try {
        const fileContent = fs.readFileSync(file.filepath);
        const uniqueFileName = `${uuidv4()}_${file.originalFilename}`;
        const blob = await put(uniqueFileName, fileContent, { access: "public" });

        salarySlip3ImagesArray.push(blob.url);
        console.log("Uploaded salarySlip3Images:", blob.url);
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
const salarySlip3ImagesData = salarySlip3ImagesArray.length === 1 ? salarySlip3ImagesArray : salarySlip3ImagesArray;


      // new code for new images end
      try {
  
        // const newForm = new Application({
        //   userId: user._id,
        //   vorname,
        //   nachname,
        //   strabe,
        //   hausnummer,
        //   PLZ,
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
        const newForm = new ApplicationFile({
          userId: user._id,
          vorname,
          nachname,
          geburtsdatum,
          strabe,
          postleitzahl,
          hausnummer,
          Ort,
          email,
          phonenumber: phonenumber,
          inputfoto:fullfilenameinputfoto,
          profession,
          ausgeubterBeruf,
          arbeitgeber,
          income,
          bwaimages:bwaImagesData,
          employment,
          salaryslip: salarySlipImagesArray,
          salarySlip1: salarySlip1ImagesData,
          salarySlip2: salarySlip2ImagesData,
          salarySlip3: salarySlip3ImagesData,
          employcontract:employContractImagesData,
          pets,
          einkommensbescheinigungimg:einkommensbescheinigungimgData,
          rentarea,
          proceedings,
          apartment,
          coverletter,
          fläche,
          zimerzahl,
          imageswbs:imageswbsData,
          personal: personalImagesData,
          schufa: schufaImagesData,
          mietschuldenfreiheit,
          mietschuldenfreiheitimg: mietschuldenfreiheitImagesData,
          mietverhaltnis,
          firstname,
          lastname,
          email2,      
        });
        await newForm.save();

            // Generate and upload PDF
          // const pdfUrl = await generateAndUploadPDF(newForm);
          const pdfUrl = await generateAndUploadPDF(newForm);

          if (pdfUrl) {
            newForm.pdfPath = pdfUrl;
            await newForm.save();
          }
         // salarystatementago,
          // residencepermit,
          // identificationdocument,
          // shortvideo,
          // currentSchufareport,
          // rentalschoolfree,

        return res.status(200).json({ success: true, message: 'Form submitted successfully'});
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
