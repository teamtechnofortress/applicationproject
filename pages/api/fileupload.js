import { IncomingForm } from 'formidable';
import fs from 'fs';
import path from 'path';
import Application from '@/models/Application';
import jwt from 'jsonwebtoken';
import { parseCookies } from 'nookies';
import { connectDb } from '@/helper/db';
import User from '@/models/User'; // Ensure you have the User model
import { v4 as uuidv4 } from 'uuid';
import { put } from '@vercel/blob';

export const config = {
  api: {
    bodyParser: false,
  },
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
      const PLZ = Array.isArray(fields.PLZ) ? fields.PLZ[0] : fields.PLZ;
      const Ort = Array.isArray(fields.Ort) ? fields.Ort[0] : fields.Ort;
      const email = Array.isArray(fields.email) ? fields.email[0] : fields.email;
      const tel = Array.isArray(fields.tel) ? fields.tel[0] : fields.tel;
      const geburtsdatum = Array.isArray(fields.geburtsdatum) ? fields.geburtsdatum[0] : fields.geburtsdatum;
      const ausgeübterBeruf = Array.isArray(fields.ausgeübterBeruf) ? fields.ausgeübterBeruf[0] : fields.ausgeübterBeruf;
      const arbeitgeber = Array.isArray(fields.arbeitgeber) ? fields.arbeitgeber[0] : fields.arbeitgeber;
      const income = Array.isArray(fields.income) ? fields.income[0] : fields.income;
      const textarea1 = Array.isArray(fields.textarea1) ? fields.textarea1[0] : fields.textarea1;
      const textarea2 = Array.isArray(fields.textarea2) ? fields.textarea2[0] : fields.textarea2;
      const textarea3 = Array.isArray(fields.textarea3) ? fields.textarea3[0] : fields.textarea3;
      const textarea4 = Array.isArray(fields.textarea4) ? fields.textarea4[0] : fields.textarea4;
      const textarea5 = Array.isArray(fields.textarea5) ? fields.textarea5[0] : fields.textarea5;
      const photo = files.photo;

      // If photo is an array, get the first item
      const photoFile = Array.isArray(photo) ? photo[0] : photo;

      if (!photoFile || !photoFile.filepath || !photoFile.originalFilename) {
        console.error('Filepath or originalFilename missing:', photoFile);
        return res.status(400).json({ success: false, error: 'Filepath or originalFilename missing' });
      }

      try {
        const fileContent = fs.readFileSync(photoFile.filepath);
        const uniqueFileName = `${uuidv4()}_${photoFile.originalFilename}`;
        const blob = await put(uniqueFileName, fileContent, {
          access: 'public',
        });

        const newForm = new Application({
          userId: user._id,
          vorname,
          nachname,
          strabe,
          hausnummer,
          PLZ,
          Ort,
          email,
          tel,
          geburtsdatum,
          ausgeübterBeruf,
          arbeitgeber,
          income,
          textarea1,
          textarea2,
          textarea3,
          textarea4,
          textarea5,
          inputfoto: blob.url, // Save the URL of the uploaded file
        });
        await newForm.save();

        return res.status(200).json({ success: true, message: 'Form submitted successfully', url: blob.url });
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
