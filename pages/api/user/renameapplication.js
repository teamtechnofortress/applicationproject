import User from '@/models/User';
import Application from '@/models/Application'; // Corrected import
const { connectDb } = require("@/helper/db");
import { parseCookies } from 'nookies';
import jwt from 'jsonwebtoken';
import { IncomingForm } from 'formidable';



export const config = {
    api: {
        bodyParser: false,
    },
};

const handler = async (req, res) => {
    await connectDb();

    if (req.method === "POST") {
      
        const cookies = parseCookies({ req });
        const token = cookies.token;

        if (!token) {
            return res.status(401).json({ success: false, message: 'Not authenticated' });
        }

        let decoded;
        try {
            decoded = jwt.verify(token, process.env.JWT_SECRET);
        } catch (err) {
            return res.status(401).json({ success: false, message: 'Invalid token' });
        }

        const id = decoded.id;
        const user = await User.findOne({ _id: id });
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

        const IDToRename = Array.isArray(fields.id) ? fields.id[0] : fields.id;
        const pdftitle = Array.isArray(fields.title) ? fields.title[0] : fields.title;
        
        const application = await Application.findOne({ _id: IDToRename });
        application.title = pdftitle;
        await application.save();
        if (!application) {
            return res.status(404).json({ success: false, message: 'Application not found' });
        }
        });

        

        return res.status(200).json({ success: true, message: 'Application Updated successfully' });

    } else {
        res.status(405).json({ success: false, message: 'Method not allowed' });
    }
};

export default handler;
