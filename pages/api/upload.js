import { IncomingForm } from 'formidable';
import fs from 'fs';
import path from 'path';
import Form from '@/models/Form';
import { connectDb } from '@/helper/db';

export const config = {
  api: {
    bodyParser: false,
  },
};

const handler = async (req, res) => {
  await connectDb();

  if (req.method === 'POST') {
    const form = new IncomingForm();
    const uploadDir = path.join(process.cwd(), 'public', 'uploads');
    
    if (!fs.existsSync(uploadDir)) {
      fs.mkdirSync(uploadDir, { recursive: true });
    }
    
    form.uploadDir = uploadDir;
    form.keepExtensions = true;

    form.parse(req, async (err, fields, files) => {
      if (err) {
        console.error('Error parsing the form:', err);
        return res.status(500).json({ success: false, error: 'Error parsing the form' });
      }

      console.log('Fields:', fields);
      console.log('Files:', files);

     
      const name = Array.isArray(fields.name) ? fields.name[0] : fields.name;
      const email = Array.isArray(fields.email) ? fields.email[0] : fields.email;
      const photo = files.photo;

      // If photo is an array, get the first item
      const photoFile = Array.isArray(photo) ? photo[0] : photo;

      if (!photoFile || !photoFile.filepath || !photoFile.originalFilename) {
        console.error('Filepath or originalFilename missing:', photoFile);
        return res.status(400).json({ success: false, error: 'Filepath or originalFilename missing' });
      }

      const newPath = path.join(uploadDir, photoFile.originalFilename);

      fs.rename(photoFile.filepath, newPath, async (err) => {
        if (err) {
          console.error('Error moving file:', err);
          return res.status(500).json({ success: false, error: 'Error moving file' });
        }

        try {
          const newForm = new Form({
            name,
            email,
            photoUrl: `/uploads/${photoFile.originalFilename}`,
          });

          await newForm.save();

          return res.status(200).json({ success: true, message: 'Form submitted successfully' });
        } catch (error) {
          console.error('Error saving data:', error);
          return res.status(500).json({ success: false, error: 'Error saving data' });
        }
      });
    });
  } else {
    res.status(405).json({ success: false, error: 'Method not allowed' });
  }
};

export default handler;
