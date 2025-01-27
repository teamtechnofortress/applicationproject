import { parse } from 'cookie';
import jwt from 'jsonwebtoken';
import User from '@/models/User';
import { connectDb } from '@/helper/db';
import nodemailer from 'nodemailer';
import crypto from 'crypto';

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
    console.error('Token verification failed:', error);
    return res.status(401).json({ message: 'Not authenticated' });
  }

  const { newEmail } = req.body;

  try {
    await connectDb();

    const existingUser = await User.findOne({ email: newEmail });
    if (existingUser) {
      return res.status(400).json({ message: 'Email is already in use.' });
    }

    const otp = crypto.randomInt(100000, 999999).toString();

    // Configure nodemailer transporter
    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: process.env.SMTP_PORT,
      auth: {
        user: process.env.SMTP_USERNAME,
        pass: process.env.SMTP_PASSWORD,
      },
    });

    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: newEmail,
      subject: 'Verify your new email address',
      html: `<p>Your OTP for verifying your new email address is: <b>${otp}</b></p>`,
    };

    await transporter.sendMail(mailOptions);

    const user1 = await User.findOne({ _id: decodedToken.id });
    console.log('as',user1)
    user1.newEmail = newEmail;
    user1.emailOtp = otp;
    await user1.save();

    res.status(200).json({ message: 'OTP sent to your new email address. Please verify it.' });
  } catch (error) {
    console.error('Error occurred:', error);
    res.status(500).json({ message: 'Internal Server Error', error: error.message });
  }
}
