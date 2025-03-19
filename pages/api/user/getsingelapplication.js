import User from '@/models/User';
import ApplicationFile from '@/models/ApplicationFile'; // Corrected import
const { connectDb } = require("@/helper/db");
import { parseCookies } from 'nookies';
import jwt from 'jsonwebtoken';


export const config = {
    api: {
        bodyParser: true,
    },
};

const handler = async (req, res) => {

// console.log('out side hi');
    await connectDb();

    if (req.method === "POST") {
// console.log('in side hi');


        const { id } = req.body; 
// console.log('out id',id);

        const IDToGet = id;
// console.log('IDToGet',IDToGet);

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

        const userid = decoded.id;
        const user = await User.findOne({ _id: userid });
        if (!user) {
            return res.status(404).json({ success: false, message: 'User not found' });
        }

        const Applicationdata = await ApplicationFile.findOne({ _id: IDToGet });
        // console.log('Application',Applicationdata);


        if (!Applicationdata) {
            return res.status(404).json({ success: false, message: 'Application not found' });
        }

        // If application deleted successfully, return success response
          res.status(200).json(Applicationdata);
        // return res.status(200).json({ success: true, message: 'Application deleted successfully' });

    } else {
        res.status(405).json({ success: false, message: 'Method not allowed' });
    }
};

export default handler;
