import { IncomingForm } from 'formidable';
import fs from 'fs';
import ApplicationFile from '@/models/ApplicationFile';
import jwt from 'jsonwebtoken';
import { parseCookies } from 'nookies';
import { connectDb } from '@/helper/db';
import User from '@/models/User';
import { v4 as uuidv4 } from 'uuid';
import { pdf } from "@react-pdf/renderer";
import MyDocument from "@/components/MyDocument";
import QRCode from "qrcode";
import { S3Client, PutObjectCommand } from '@aws-sdk/client-s3';
import path from 'path';


export const config = {
  api: {
    bodyParser: false,
  },
};
const s3 = new S3Client({
  region: process.env.HETZNER_REGION,
  endpoint: process.env.HETZNER_ENDPOINT.startsWith('http')
    ? process.env.HETZNER_ENDPOINT
    : `https://${process.env.HETZNER_ENDPOINT}`,
  credentials: {
    accessKeyId: process.env.HETZNER_ACCESS_KEY,
    secretAccessKey: process.env.HETZNER_SECRET_KEY,
  },
  forcePathStyle: false, // required by Hetzner
});

// ✅ Upload to Hetzner S3
const uploadToHetzner = async (buffer, key, contentType) => {
  const command = new PutObjectCommand({
    Bucket: process.env.HETZNER_BUCKET,
    Key: `uploads/${key}`,
    Body: buffer,
    ACL: 'public-read',
    ContentType: contentType,
  });

  await s3.send(command);
  return `${process.env.HETZNER_ENDPOINT}/${process.env.HETZNER_BUCKET}/uploads/${key}`;
};

const handleFileUpload = async (fileInput) => {
  if (!fileInput) return [];

  const fileList = Array.isArray(fileInput) ? fileInput : [fileInput];
  const urls = [];

  for (const file of fileList) {
    if (file && file.filepath && file.originalFilename) {
      const ext = path.extname(file.originalFilename).toLowerCase();

      // ✅ Only allow .jpg, .jpeg, .png
      let contentType;
      if (ext === '.jpg' || ext === '.jpeg') {
        contentType = 'image/jpeg';
      } else if (ext === '.png') {
        contentType = 'image/png';
      } else {
        console.warn(`❌ Skipping unsupported file type: ${file.originalFilename}`);
        continue; // skip unsupported files
      }

      try {
        const fileContent = fs.readFileSync(file.filepath);
        const uniqueName = `${uuidv4()}_${file.originalFilename}`;

        const fileUrl = await uploadToHetzner(fileContent, uniqueName, contentType);
        urls.push(fileUrl);
      } catch (error) {
        console.error(`❌ Error uploading file: ${file.originalFilename}`, error);
      }
    } else {
      console.warn('⚠️ Invalid file structure:', file);
    }
  }

  return urls;
};



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
    const pdfFileURL = predefinedPdfUrl.split('/').pop();

    // ✅ Generate PDF document
    const pdfBlob = await pdf(<MyDocument profileData={profileData} />).toBlob();
    const arrayBuffer = await pdfBlob.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    // ✅ Upload PDF with predefined name (so URL remains unchanged)
    await uploadToHetzner(buffer, pdfFileURL, 'application/pdf');
    return predefinedPdfUrl;
  } catch (error) {
    console.error("Error generating/uploading PDF:", error);
    return null;
  }
};


const handler = async (req, res) => {
  try {
     
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


        const inputfotoImage = await handleFileUpload(files.inputfoto);
        const inputfotoImg = inputfotoImage[0] || null;
        const salarySlipImages1 = await handleFileUpload(files.salarySlip1);
        const salarySlipImages2 = await handleFileUpload(files.salarySlip2);
        const salarySlipImages3 = await handleFileUpload(files.salarySlip3);
        const employcontractImages = await handleFileUpload(files.employcontract);
        const einkommensbescheinigungImages = await handleFileUpload(files.einkommensbescheinigungimg);
        const schufaImages = await handleFileUpload(files.schufa);
        const wbsImages = await handleFileUpload(files.imageswbs);
        const bwaImages = await handleFileUpload(files.bwaimages);
        const personalImages = await handleFileUpload(files.personal);
        const mietschuldenfreiheitImages = await handleFileUpload(files.mietschuldenfreiheitimg);
       

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
            inputfoto:inputfotoImg,
            profession,
            ausgeubterBeruf,
            arbeitgeber,
            income,
            bwaimages:bwaImages,
            employment,
            salarySlip1: salarySlipImages1,
            salarySlip2: salarySlipImages2,
            salarySlip3: salarySlipImages3,
            employcontract:employcontractImages,
            pets,
            einkommensbescheinigungimg:einkommensbescheinigungImages,
            rentarea,
            proceedings,
            apartment,
            coverletter,
            fläche,
            zimerzahl,
            imageswbs:wbsImages,
            personal: personalImages,
            schufa: schufaImages,
            mietschuldenfreiheit,
            mietschuldenfreiheitimg: mietschuldenfreiheitImages,
            mietverhaltnis,
            firstname,
            lastname,
            email2,
            parent: "0",
          });
          
            // ✅ Step 2: Define Predefined PDF URL
      const pdfFileName = `${vorname}_${nachname}_${Date.now()}.pdf`;
      const predefinedPdfUrl = `${process.env.HETZNER_ENDPOINT}/${process.env.HETZNER_BUCKET}/uploads/${pdfFileName}`;

      // ✅ Step 3: Generate & Upload QR Code
      const qrCodeUrl = await generateAndUploadQRCode(predefinedPdfUrl);
      if (!qrCodeUrl) {
        return res.status(500).json({ success: false, error: "QR Code generation failed" });
      }

      newForm.qrCode = qrCodeUrl;
      await newForm.save();

      // ✅ Step 4: Generate & Upload PDF
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
  } catch (error) {
    console.error("Server Error:", error);
    return res.status(500).json({ success: false, error: "Internal Server Error" });
  }
};

export default handler;
