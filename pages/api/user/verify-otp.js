import { parse } from 'cookie';
import jwt from 'jsonwebtoken';
import User from '@/models/User';
import { connectDb } from '@/helper/db';
import { serialize } from 'cookie';

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

  const { otp } = req.body;

  try {
    await connectDb();

    const user = await User.findOne({ _id: decodedToken.id });
    

    if (!user || user.emailOtp !== otp) {
      return res.status(400).json({ message: 'Invalid OTP' });
    }

    user.email = user.newEmail;
    user.newEmail = null;
    user.emailOtp = null;
    console.log(user)
    await user.save();

    res.status(200).json({ message: 'Email updated successfully.'});
  } catch (error) {
    res.status(500).json({ message: 'Internal Server Error', error });
  }
}
