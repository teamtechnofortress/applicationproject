import { IncomingForm } from 'formidable';
import fs from 'fs';
import ApplicationFile from '@/models/ApplicationFile';
import jwt from 'jsonwebtoken';
import { parseCookies } from 'nookies';
import { connectDb } from '@/helper/db';
import User from '@/models/User';
import { v4 as uuidv4 } from 'uuid';
import { pdf } from "@react-pdf/renderer";
import MyDocumentTwo from "@/components/MyDocumentTwo";
import QRCode from "qrcode";
import { S3Client, PutObjectCommand,DeleteObjectCommand } from '@aws-sdk/client-s3';
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

  const generateAndUploadQRCode = async (pdfUrl) => {
    try {
      const qrCodeBuffer = await QRCode.toBuffer(pdfUrl);
      const qrFileName = `qr_${uuidv4()}.png`;
      return await uploadToHetzner(qrCodeBuffer, qrFileName, 'image/png');
    } catch (error) {
      console.error("Error generating QR Code:", error);
      return null;
    }
  };

  const generateAndUploadPDF = async (parentData, childData, predefinedPdfUrl) => {
    try {
        const pdfFileURL = predefinedPdfUrl.split('/').pop();
        if (!parentData || !childData) {
            console.error("Missing parent or child data for PDF generation.");
            return null;
        }
      const combinedProfiles = { parent: parentData, child: childData };
      const pdfBlob = await pdf(<MyDocumentTwo profileData={combinedProfiles} />).toBlob();
      const arrayBuffer = await pdfBlob.arrayBuffer();
      const buffer = Buffer.from(arrayBuffer);
      const as = await uploadToHetzner(buffer, pdfFileURL, 'application/pdf');
      console.log('as', as)
      console.log('predefinedPdfUrl', predefinedPdfUrl)
      return predefinedPdfUrl;
    } catch (error) {
      console.error("Error generating/uploading PDF:", error);
      return null;
    }
  };
  const deletefile = async (id) => {
    if (!id) return;
  
    const params = {
      Bucket: process.env.HETZNER_BUCKET,
      Key: `uploads/${id}`,
    };
  
    try {
      await s3.send(new DeleteObjectCommand(params));
      return { success: true, key: id };
    } catch (error) {
      console.error('Delete error:', error);
      throw new Error('Failed to delete file: ' + error.message);
    }
  };


const handler = async (req, res) => {
    try {
        await connectDb()
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
            if (!parentId) {
                return res.status(400).json({ success: false, error: 'Parent ID is required' });
            }
            // ✅ Ensure Parent Exists
            let updatedParent = await ApplicationFile.findById(parentId);
            if (!updatedParent) {
                return res.status(404).json({ success: false, message: "Parent application not found" });
            }
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
                parent: "1",
                });
                await newForm.save();
                const updatedApplication = await ApplicationFile.findOneAndUpdate(
                  { _id: parentId },
                  { $set: { childId: newForm._id } },
                  { new: true }
                );
                if (updatedApplication) {
                  console.log("Updated Application:", updatedApplication);
                  const pdfPathtodel = updatedApplication.pdfPath?.split("/uploads/")[1];
                  const qrCodetodel = updatedApplication.qrCode?.split("/uploads/")[1];
                  try {
                    if (pdfPathtodel) await deletefile(pdfPathtodel);
                    if (qrCodetodel) await deletefile(qrCodetodel);
                  } catch (e) {
                    console.warn("Error deleting old files:", e.message);
                  }
                } else {
                  console.log("Application not found or no changes made");
                }
            // ✅ Generate New PDF Name
            const pdfFileName = `${newForm.vorname}_${newForm.nachname}_${Date.now()}.pdf`;
            const predefinedPdfUrl = `${process.env.HETZNER_ENDPOINT}/${process.env.HETZNER_BUCKET}/uploads/${pdfFileName}`;

            // ✅ Generate QR Code for the PDF
            const qrCodeUrl = await generateAndUploadQRCode(predefinedPdfUrl);
            if (!qrCodeUrl) return res.status(500).json({ success: false, error: "QR Code generation failed" });

            // ✅ Generate & Upload Combined PDF for Parent & Child
            const pdfUrl = await generateAndUploadPDF(updatedApplication, newForm, predefinedPdfUrl);
            if (!pdfUrl) return res.status(500).json({ success: false, error: "PDF generation failed" });

            // ✅ Update Parent & Child with New PDF & QR Code
            const updateParent = await ApplicationFile.findByIdAndUpdate(
              parentId,
              { pdfPath: pdfUrl, qrCode: qrCodeUrl },
              { new: true } // this returns the updated document
            );
            const pdfPath = updateParent?.pdfPath;
            await ApplicationFile.findByIdAndUpdate(newForm._id, { pdfPath: pdfUrl, qrCode: qrCodeUrl });
                return res.status(200).json({
                    success: true,
                    message: "Form submitted successfully",
                    qrCode: newForm.qrCode,
                    pdfUrl: pdfPath,
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
