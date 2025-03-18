import { IncomingForm } from 'formidable';
import fs from 'fs';
import ApplicationFile from '@/models/ApplicationFile';
import jwt from 'jsonwebtoken';
import { parseCookies } from 'nookies';
import { connectDb } from '@/helper/db';
import User from '@/models/User';
import { v4 as uuidv4 } from 'uuid';
import { put, del } from '@vercel/blob';
import { pdf } from "@react-pdf/renderer";
import MyDocument from "@/components/MyDocument";
import MyDocumentTwo from "@/components/MyDocumentTwo";
import QRCode from "qrcode";

export const config = {
  api: {
    bodyParser: false,
  },
};

// ✅ Function to delete a previous PDF from Vercel Blob Storage
const deletePreviousBlob = async (url) => {
  try {
    if (url) {
      await del(url);
      // console.log(`Deleted previous PDF: ${url}`);
    }
  } catch (error) {
    console.error('Error deleting previous Blob:', error);
  }
};
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

// ✅ Function to generate and upload PDF
const generateAndUploadPDF1212 = async (profileData) => {
  try {
    let pdfBlob;
    let pdfUrl = null;

    if (profileData.parentId) {
      // ✅ Fetch parent profile
      const parentProfile = await ApplicationFile.findById(profileData.parentId);
      if (!parentProfile) {
        console.error("Parent form not found");
        return null;
      }

      // ✅ Delete old PDF before generating a new one
      if (parentProfile.pdfPath) {
        await deletePreviousBlob(parentProfile.pdfPath);
      }
      if (parentProfile.qrCode) {
        await deletePreviousBlob(parentProfile.qrCode);
      }

      // ✅ Generate a combined PDF for parent and child
      const combinedProfiles = { parent: parentProfile, child: profileData };
      pdfBlob = await pdf(<MyDocumentTwo profileData={combinedProfiles} />).toBlob();

      // ✅ Upload new PDF and update the parent's profile
      const pdfFileName = `${parentProfile.vorname}_${parentProfile.nachname}_${Date.now()}.pdf`;
      const blob = await put(pdfFileName, pdfBlob, {
        access: "public",
        addRandomSuffix: false,
      });
      parentProfile.pdfPath = blob.url;
      const qrCodeUrl = await generateAndUploadQRCode(blob.url);
      parentProfile.qrCode = qrCodeUrl;
      await parentProfile.save();

      pdfUrl = blob.url;
    } else {
      // ✅ Generate PDF for a single person
      pdfBlob = await pdf(<MyDocument profileData={profileData} />).toBlob();
      const pdfFileName = `${profileData.vorname}_${profileData.nachname}_${Date.now()}.pdf`;

      // ✅ Upload new PDF
      const blob = await put(pdfFileName, pdfBlob, {
        access: "public",
        addRandomSuffix: false,
      });
      pdfUrl = blob.url;
    }

    return pdfUrl;
  } catch (error) {
    console.error("Error generating/uploading PDF:", error);
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

    if (!qrCodeUrl) {
      console.error("QR Code not found in DB");
      return null;
    }

    if (profileData.parentId) {
      // ✅ Fetch parent profile and convert to plain object
      const parentProfile = await ApplicationFile.findById(profileData.parentId);
      if (!parentProfile) {
        console.error("Parent form not found");
        return null;
      }

      // ✅ Delete old PDF before generating a new one
      if (parentProfile.pdfPath) {
        await deletePreviousBlob(parentProfile.pdfPath);
      }
      if (parentProfile.qrCode) {
        await deletePreviousBlob(parentProfile.qrCode);
      }

      const newQrCodeUrl = await generateAndUploadQRCode(predefinedPdfUrl);
      if (!newQrCodeUrl) {
        console.error("Failed to generate new QR Code");
        return null;
      }
      // ✅ Generate a combined PDF for parent and child
      const combinedProfiles = { parent: parentProfile, child: profileData };

      pdfBlob = await pdf(<MyDocumentTwo profileData={combinedProfiles} />).toBlob();

      // ✅ Upload new PDF using the predefined name (without modifying the URL)
      await put(pdfFileURL, pdfBlob, {
        access: "public",
        contentType: "application/pdf",
        addRandomSuffix: false,
      });
       // ✅ Update parent profile with new PDF URL & QR Code
       await ApplicationFile.findByIdAndUpdate(profileData.parentId, {
        pdfPath: predefinedPdfUrl,
        qrCode: qrCodeUrl,
      });

    } else {
      // ✅ Generate PDF for a single person 
      pdfBlob = await pdf(<MyDocument profileData={profileData} />).toBlob();
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
      const employment = Array.isArray(fields.employment) ? fields.employment[0] : fields.employment;
      const pets = Array.isArray(fields.pets) ? fields.pets[0] : fields.pets;
      const rentarea = Array.isArray(fields.rentarea) ? fields.rentarea[0] : fields.rentarea;
      const proceedings = Array.isArray(fields.proceedings) ? fields.proceedings[0] : fields.proceedings;
      const apartment = Array.isArray(fields.apartment) ? fields.apartment[0] : fields.apartment;
      const coverletter = Array.isArray(fields.coverletter) ? fields.coverletter[0] : fields.coverletter;
      const zimerzahl = Array.isArray(fields.zimerzahl) ? fields.zimerzahl[0] : fields.zimerzahl;
      const mietschuldenfreiheit = Array.isArray(fields.mietschuldenfreiheit) ? fields.mietschuldenfreiheit[0] : fields.mietschuldenfreiheit;
      const mietverhaltnis = Array.isArray(fields.mietverhaltnis) ? fields.mietverhaltnis[0] : fields.mietverhaltnis;
      const firstname = Array.isArray(fields.firstname) ? fields.firstname[0] : fields.firstname;
      const lastname = Array.isArray(fields.lastname) ? fields.lastname[0] : fields.lastname;
      const email2 = Array.isArray(fields.email2) ? fields.email2[0] : fields.email2;
      const fläche = Array.isArray(fields.fläche) ? fields.fläche[0] : fields.fläche;
      const parentId = Array.isArray(fields.parentId) ? fields.parentId[0] : fields.parentId;



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

      
         // einkommensbescheinigungimg image
        const einkommensbescheinigungimgArray = [];

        const einkommensbescheinigungimgFiles = files.einkommensbescheinigungimg;
        // console.log("einkommensbescheinigungimgFiles", einkommensbescheinigungimgFiles);

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

       
        const salarySlipImagesArray = [];

      const salaryslipImages = files.salarySlip;
    
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
              // console.log("Uploaded Salary Slip:", blob.url);
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


      

      const imageswbsImagesArray = [];

      const imageswbsImages = files.imageswbs;
      
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

      if (bwaImages) {
        const bwaFiles = Array.isArray(bwaImages) ? bwaImages : [bwaImages];

        for (const file of bwaFiles) {
          if (file && file.filepath && file.originalFilename) {
            try {
              const fileContent = fs.readFileSync(file.filepath);
              const uniqueFileName = `${uuidv4()}_${file.originalFilename}`;
              const blob = await put(uniqueFileName, fileContent, { access: "public" });

              bwaImagesArray.push(blob.url);
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

      if (personalImages) {
        const personalFiles = Array.isArray(personalImages) ? personalImages : [personalImages];

        for (const file of personalFiles) {
          if (file && file.filepath && file.originalFilename) {
            try {
              const fileContent = fs.readFileSync(file.filepath);
              const uniqueFileName = `${uuidv4()}_${file.originalFilename}`;
              const blob = await put(uniqueFileName, fileContent, { access: "public" });

              personalImagesArray.push(blob.url);
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

      if (mietschuldenfreiheitImages) {
        const mietschuldenfreiheitFiles = Array.isArray(mietschuldenfreiheitImages) ? mietschuldenfreiheitImages : [mietschuldenfreiheitImages];

        for (const file of mietschuldenfreiheitFiles) {
          if (file && file.filepath && file.originalFilename) {
            try {
              const fileContent = fs.readFileSync(file.filepath);
              const uniqueFileName = `${uuidv4()}_${file.originalFilename}`;
              const blob = await put(uniqueFileName, fileContent, { access: "public" });

              mietschuldenfreiheitImagesArray.push(blob.url);
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

      if (employContractImages) {
        const employContractFiles = Array.isArray(employContractImages) ? employContractImages : [employContractImages];

        for (const file of employContractFiles) {
          if (file && file.filepath && file.originalFilename) {
            try {
              const fileContent = fs.readFileSync(file.filepath);
              const uniqueFileName = `${uuidv4()}_${file.originalFilename}`;
              const blob = await put(uniqueFileName, fileContent, { access: "public" });

              employContractImagesArray.push(blob.url);
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

      if (schufaImages) {
        const schufaFiles = Array.isArray(schufaImages) ? schufaImages : [schufaImages];

        for (const file of schufaFiles) {
          if (file && file.filepath && file.originalFilename) {
            try {
              const fileContent = fs.readFileSync(file.filepath);
              const uniqueFileName = `${uuidv4()}_${file.originalFilename}`;
              const blob = await put(uniqueFileName, fileContent, { access: "public" });

              schufaImagesArray.push(blob.url);
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

      if (salarySlip1Images) {
        const salarySlip1Files = Array.isArray(salarySlip1Images) ? salarySlip1Images : [salarySlip1Images];

        for (const file of salarySlip1Files) {
          if (file && file.filepath && file.originalFilename) {
            try {
              const fileContent = fs.readFileSync(file.filepath);
              const uniqueFileName = `${uuidv4()}_${file.originalFilename}`;
              const blob = await put(uniqueFileName, fileContent, { access: "public" });

              salarySlip1ImagesArray.push(blob.url);
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

      if (salarySlip2Images) {
        const salarySlip2Files = Array.isArray(salarySlip2Images) ? salarySlip2Images : [salarySlip2Images];

        for (const file of salarySlip2Files) {
          if (file && file.filepath && file.originalFilename) {
            try {
              const fileContent = fs.readFileSync(file.filepath);
              const uniqueFileName = `${uuidv4()}_${file.originalFilename}`;
              const blob = await put(uniqueFileName, fileContent, { access: "public" });

              salarySlip2ImagesArray.push(blob.url);
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

      if (salarySlip3Images) {
        const salarySlip3Files = Array.isArray(salarySlip3Images) ? salarySlip3Images : [salarySlip3Images];

        for (const file of salarySlip3Files) {
          if (file && file.filepath && file.originalFilename) {
            try {
              const fileContent = fs.readFileSync(file.filepath);
              const uniqueFileName = `${uuidv4()}_${file.originalFilename}`;
              const blob = await put(uniqueFileName, fileContent, { access: "public" });

              salarySlip3ImagesArray.push(blob.url);
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
          parentId,    
        });
        await newForm.save();
          // ✅ Step 2: Define a Predefined PDF URL (Before PDF is Generated)
          const pdfFileName = `${newForm.vorname}_${newForm.nachname}_${Date.now()}.pdf`;
          const predefinedPdfUrl = `https://ni5rpxtvitzsvqtj.public.blob.vercel-storage.com/${pdfFileName}`;
        

          // ✅ Step 3: Generate QR Code using the predefined PDF URL
          const qrCodeUrl = await generateAndUploadQRCode(predefinedPdfUrl);
          
          if (!qrCodeUrl) {
            console.error("Failed to generate QR Code");
            return res.status(500).json({ success: false, error: "QR Code generation failed" });
          }

          // ✅ Step 4: Save QR Code URL to the database before generating PDF
          newForm.qrCode = qrCodeUrl;
          await newForm.save();

          // ✅ Step 5: Generate and Upload the PDF (Using the predefined URL)
          const pdfUrl = await generateAndUploadPDF(newForm, predefinedPdfUrl);

  if (pdfUrl) {
    newForm.pdfPath = pdfUrl;
    await newForm.save();
  }

  return res.status(200).json({
    success: true,
    message: "Form submitted successfully",
    qrCode: newForm.qrCode,
    pdfUrl: newForm.pdfPath,
  });
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
