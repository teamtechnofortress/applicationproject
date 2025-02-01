import User from '@/models/User';
import Application from '@/models/Application'; // Corrected import
const { connectDb } = require("@/helper/db");
import { parseCookies } from 'nookies';
import jwt from 'jsonwebtoken';


export const config = {
    api: {
        bodyParser: false,
    },
};

const handler = async (req, res) => {


    await connectDb();

    if (req.method === "GET") {

        const IDToDelete = req.query.id;
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

        const Applicationforblob = await Application.findOne({ _id: IDToDelete });
        if (!Applicationforblob) {
            return res.status(404).json({ success: false, message: 'Application not found' });
        }
        if (Applicationforblob.inputfoto) {
            const existingImageUrl = Applicationforblob.inputfoto;
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

        const deletedApplication = await Application.findOneAndDelete({ _id: IDToDelete });
        if (!deletedApplication) {
            return res.status(404).json({ success: false, message: 'Application not found' });
        }

        // If application deleted successfully, return success response
        return res.status(200).json({ success: true, message: 'Application deleted successfully' });

    } else {
        res.status(405).json({ success: false, message: 'Method not allowed' });
    }
};

export default handler;
