import jwt from 'jsonwebtoken';
import { parse } from 'cookie';
import User from '@/models/User';
import { connectDb } from '@/helper/db';

var CryptoJS = require("crypto-js");
export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  const cookies = parse(req.headers.cookie || '');
  const token = cookies.token;

  if (!token) {
    return res.status(401).json({ message: 'Not authenticated' });
  }

  let decodedToken;
  try {
    decodedToken = jwt.verify(token, process.env.JWT_SECRET);
  } catch (error) {
    return res.status(401).json({ message: 'Not authenticated' });
  }

  const { newPassword } = req.body;

  try {
    await connectDb();

    const user = await User.findOne({ _id: decodedToken.id });
    user.password = await  CryptoJS.AES.encrypt(newPassword, process.env.AES_SECRET).toString();
   
    await user.save();

    res.status(200).json({ message: 'Password updated successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Internal Server Error', error });
  }
}
