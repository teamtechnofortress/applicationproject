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
    // console.log("PDF t1");
    const pdfBlob = await pdf(<MyDocument profileData={profileData} />).toBlob();
    // Generate PDF as a Buffer
    // console.log("PDF t2");
    // Define unique filename
    const pdfFileName = `${profileData.vorname}_${profileData.nachname}_${Date.now()}.pdf`;
    // console.log("PDF t3");
    const blob = await put(pdfFileName, pdfBlob, {
      access: "public",
      token: 'vercel_blob_rw_ni5RpxtViTZSvQtJ_767ABnC8d5HabjllEBLq0H5jSuIFn6',
    });

    // console.log("PDF uploaded successfully:", blob.url);
    return blob.url; // Return the uploaded PDF URL
  } catch (error) {
    console.error("Error generating/uploading PDF:", error);
    return null;
  }
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
      // const extractField = (field) => (Array.isArray(field) ? field[0] : field);

      // const parsedData = {
      //   formid: extractField(fields.formid),
      //   vorname: extractField(fields.vorname),
      //   nachname: extractField(fields.nachname),
      //   strabe: extractField(fields.strabe),
      //   hausnummer: extractField(fields.hausnummer),
      //   postleitzahl: extractField(fields.postleitzahl),
      //   Ort: extractField(fields.Ort),
      //   email: extractField(fields.email),
      //   phonenumber: extractField(fields.phonenumber),
      //   profession: extractField(fields.profession),
      //   geburtsdatum: extractField(fields.geburtsdatum),
      //   ausgeubterBeruf: extractField(fields.ausgeubterBeruf),
      //   arbeitgeber: extractField(fields.arbeitgeber),
      //   income: extractField(fields.income),
      //   employment: extractField(fields.employment),
      //   pets: extractField(fields.pets),
      //   rentarea: extractField(fields.rentarea),
      //   proceedings: extractField(fields.proceedings),
      //   apartment: extractField(fields.apartment),
      //   coverletter: extractField(fields.coverletter),
      //   zimerzahl: extractField(fields.zimerzahl),
      //   mietschuldenfreiheit: extractField(fields.mietschuldenfreiheit),
      //   fläche: extractField(fields.fläche),
      // };

      // console.log("Parsed Form Data:", parsedData);

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
      // const salaryslip = Array.isArray(fields.salaryslip) ? fields.salaryslip[0] : fields.salaryslip;
      // const salaryslip = Array.isArray(fields.salarySlip) ? fields.salarySlip : [fields.salarySlip];
      // console.log('heretest', salaryslip);
      // const employcontract = Array.isArray(fields.employcontract) ? fields.employcontract[0] : fields.employcontract;
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

        const einkommensbescheinigungimgFiles = files.einkommensbescheinigungimg;
        // console.log("einkommensbescheinigungimgFiles", einkommensbescheinigungimgFiles);

        if (einkommensbescheinigungimgFiles) {
          const fileList = Array.isArray(einkommensbescheinigungimgFiles)
            ? einkommensbescheinigungimgFiles
            : [einkommensbescheinigungimgFiles];

            if (Array.isArray(Applicationforblob.einkommensbescheinigungimg) && Applicationforblob.einkommensbescheinigungimg.length > 0) {
                // Run the loop to delete all files in the array
                Applicationforblob.einkommensbescheinigungimg.forEach((fileUrl) => {
                    deletefile(fileUrl);
                });
            }
          

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
        const einkommensbescheinigungimgData = einkommensbescheinigungimgArray.length === 1 ? einkommensbescheinigungimgArray : einkommensbescheinigungimgArray;

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
        // Declare at the top to ensure it is always available
        // ✅ Ensure salarySlip exists in files before using it
        // ✅ Extract salary slip files while maintaining the nested structure

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
      // console.log("imageswbsImages", imageswbsImages);
      
      if (imageswbsImages) {
        const imageswbsFiles = Array.isArray(imageswbsImages) ? imageswbsImages : [imageswbsImages];
      
        if (Array.isArray(Applicationforblob.imageswbs) && Applicationforblob.imageswbs.length > 0) {
            // Run the loop to delete all files in the array
            Applicationforblob.imageswbs.forEach((fileUrl) => {
                deletefile(fileUrl);
            });
        }


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
      const imageswbsData = imageswbsImagesArray.length === 1 ? imageswbsImagesArray : imageswbsImagesArray;
      
      // BWA Images
      const bwaImagesArray = [];
      const bwaImages = files.bwaimages;
      // console.log("bwaImages", bwaImages);

      if (bwaImages) {
        const bwaFiles = Array.isArray(bwaImages) ? bwaImages : [bwaImages];

        if (Array.isArray(Applicationforblob.bwaimages) && Applicationforblob.bwaimages.length > 0) {
            // Run the loop to delete all files in the array
            Applicationforblob.bwaimages.forEach((fileUrl) => {
                deletefile(fileUrl);
            });
        }


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
      const bwaImagesData = bwaImagesArray.length === 1 ? bwaImagesArray : bwaImagesArray;


      // Personal Images
      const personalImagesArray = [];
      const personalImages = files.personal;
      // console.log("personalImages", personalImages);

      if (personalImages) {
        const personalFiles = Array.isArray(personalImages) ? personalImages : [personalImages];


        if (Array.isArray(Applicationforblob.personal) && Applicationforblob.personal.length > 0) {
            // Run the loop to delete all files in the array
            Applicationforblob.personal.forEach((fileUrl) => {
                deletefile(fileUrl);
            });
        }

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
      const personalImagesData = personalImagesArray.length === 1 ? personalImagesArray : personalImagesArray;


      // Mietschuldenfreiheit Images
      const mietschuldenfreiheitImagesArray = [];
      const mietschuldenfreiheitImages = files.mietschuldenfreiheitimg;
      // console.log("mietschuldenfreiheitImages", mietschuldenfreiheitImages);

      if (mietschuldenfreiheitImages) {
        const mietschuldenfreiheitFiles = Array.isArray(mietschuldenfreiheitImages) ? mietschuldenfreiheitImages : [mietschuldenfreiheitImages];

        if (Array.isArray(Applicationforblob.mietschuldenfreiheitimg) && Applicationforblob.mietschuldenfreiheitimg.length > 0) {
            // Run the loop to delete all files in the array
            Applicationforblob.mietschuldenfreiheitimg.forEach((fileUrl) => {
                deletefile(fileUrl);
            });
        }

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
      const mietschuldenfreiheitImagesData = mietschuldenfreiheitImagesArray.length === 1 ? mietschuldenfreiheitImagesArray : mietschuldenfreiheitImagesArray;


      // Employ Contract Images
      const employContractImagesArray = [];
      const employContractImages = files.employcontract;
      // console.log("employContractImages", employContractImages);

      if (employContractImages) {
        const employContractFiles = Array.isArray(employContractImages) ? employContractImages : [employContractImages];
        if (Array.isArray(Applicationforblob.employcontract) && Applicationforblob.employcontract.length > 0) {
            // Run the loop to delete all files in the array
            Applicationforblob.employcontract.forEach((fileUrl) => {
                deletefile(fileUrl);
            });
        }
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
      const employContractImagesData = employContractImagesArray.length === 1 ? employContractImagesArray : employContractImagesArray;

      // **Schufa Images**
      const schufaImagesArray = [];
      const schufaImages = files.schufa;
      // console.log("schufaImages", schufaImages);

      if (schufaImages) {
        const schufaFiles = Array.isArray(schufaImages) ? schufaImages : [schufaImages];

        if (Array.isArray(Applicationforblob.schufa) && Applicationforblob.schufa.length > 0) {
            // Run the loop to delete all files in the array
            Applicationforblob.schufa.forEach((fileUrl) => {
                deletefile(fileUrl);
            });
        }

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
      const schufaImagesData = schufaImagesArray.length === 1 ? schufaImagesArray : schufaImagesArray;
              

      const salarySlip1ImagesArray = [];
      const salarySlip1Images = files.salarySlip1;
      console.log("salarySlip1Images", salarySlip1Images);

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
      const salarySlip1ImagesData = salarySlip1ImagesArray.length === 1 ? salarySlip1ImagesArray : salarySlip1ImagesArray;

      const salarySlip2ImagesArray = [];
      const salarySlip2Images = files.salarySlip2;
      console.log("salarySlip2Images", salarySlip2Images);

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
      const salarySlip2ImagesData = salarySlip2ImagesArray.length === 1 ? salarySlip2ImagesArray : salarySlip2ImagesArray;
     
      const salarySlip3ImagesArray = [];
      const salarySlip3Images = files.salarySlip3;
      console.log("salarySlip3Images", salarySlip3Images);

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
      const salarySlip3ImagesData = salarySlip3ImagesArray.length === 1 ? salarySlip3ImagesArray : salarySlip3ImagesArray;


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
        if (salarySlip1Images) {
          updateData.salarySlip1 = salarySlip1ImagesData;
        }
        if (salarySlip2Images) {
          updateData.salarySlip2 = salarySlip2ImagesData;
        }else{
          updateData.salarySlip2 = [];
          if (Array.isArray(Applicationforblob.salarySlip2) && Applicationforblob.salarySlip2.length > 0) {
              // Run the loop to delete all files in the array
              Applicationforblob.salarySlip2.forEach((fileUrl) => {
                  deletefile(fileUrl);
              });
          }
        }
        if (salarySlip3Images) {
          updateData.salarySlip3 = salarySlip3ImagesData;
        }else{
          updateData.salarySlip3ImagesData = [];
          if (Array.isArray(Applicationforblob.salarySlip3) && Applicationforblob.salarySlip3.length > 0) {
              // Run the loop to delete all files in the array
              Applicationforblob.salarySlip3.forEach((fileUrl) => {
                  deletefile(fileUrl);
              });
          }
        }
        if (bwaImages) {
          updateData.bwaimages = bwaImagesData;
        }
        if (employContractImages) {
          updateData.employcontract = employContractImagesData;
        }
        if (einkommensbescheinigungimgFiles) {
          updateData.einkommensbescheinigungimg = einkommensbescheinigungimgData;
        }
        if (imageswbsImages) {
          updateData.imageswbs = imageswbsData;
        }
        if (personalImages) {
          updateData.personal = personalImagesData;
        }
        if (schufaImages) {
          updateData.schufa = schufaImagesData;
        }
        if (mietschuldenfreiheitImages) {
          updateData.mietschuldenfreiheitimg = mietschuldenfreiheitImagesData;
        }
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
          if (Array.isArray(Applicationforblob.employcontract) && Applicationforblob.employcontract.length > 0) {
            // Run the loop to delete all files in the array
            Applicationforblob.employcontract.forEach((fileUrl) => {
                deletefile(fileUrl);
            });
          }
          updateData.employment = "";
          updateData.employContractImagesData = [];
          updateData.salarySlip1ImagesData = [];
          updateData.salarySlip2ImagesData = [];
          updateData.salarySlip3ImagesData = [];

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

        // console.log("Update Data start from here and go------------");

        // console.log("Updated Document:", updateData);

        // console.log("Update Data end here and go------------");

        const updatedForm = await ApplicationFile.findByIdAndUpdate(
          formid, 
          { $set: updateData },  // Use `$set` to update only these fields
          { new: true, runValidators: true } // Return the updated document and run schema validation
        );
        
        // console.log("Updated Document:", updatedForm);

            // Generate and upload PDF
          // const pdfUrl = await generateAndUploadPDF(newForm);
          // const pdfUrl = await generateAndUploadPDF(updatedForm);

          // if (pdfUrl) {
          //   newForm.pdfPath = pdfUrl;
          //   await newForm.save();
          // }
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
