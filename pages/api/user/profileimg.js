import { IncomingForm } from 'formidable';
import User from '@/models/User'; // Ensure you have the User model
const { connectDb } = require("@/helper/db");
import { parseCookies } from 'nookies';
import jwt from 'jsonwebtoken';
import { v4 as uuidv4 } from 'uuid';
import fs from 'fs';
import { put } from '@vercel/blob'; // Import the delete method



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
        form.parse(req, async (err, fields, files) => {
            if (err) {
                console.error('Error parsing the form:', err);
                return res.status(500).json({ success: false, error: 'Error parsing the form' });
            }

            const photo = files.photo;
            const photoFile = Array.isArray(photo) ? photo[0] : photo;

            if (!photoFile || !photoFile.filepath || !photoFile.originalFilename) {
                console.error('Filepath or originalFilename missing:', photoFile);
                return res.status(400).json({ success: false, error: 'Filepath or originalFilename missing' });
            }


             // Delete the existing profile image from Vercel Blob storage if it exists
             if (user.profileimg) {
                const existingImageUrl = user.profileimg;
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
            const fileContent = fs.readFileSync(photoFile.filepath);
            const uniqueFileName = `${uuidv4()}_${photoFile.originalFilename}`;
            const blob = await put(uniqueFileName, fileContent, {
            access: 'public',
            });

            user.profileimg = blob.url;
            await user.save();

            return res.status(200).json({ success: true, message: 'Profile image updated successfully', profileimg: user.profileimg });
        });
    } 
    else if (req.method === "GET") {
        console.log();
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
        try{
            user.profileimg = null;
            await user.save();
            return res.status(200).json({ success: true, message: 'Profile image deleted successfully', profileimg: user.profileimg });
        }
        catch(e){
            return res.status(401).json({ success: false, message: 'Profile image not deleted successfully' });
        }
    } 
    else {
        res.status(405).json({ success: false, message: 'Method not allowed' });
    }
};

export default handler;