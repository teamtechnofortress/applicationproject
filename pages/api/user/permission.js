import { connectDb } from "@/helper/db";
import Subscription from "@/models/Subscription";
import Application from '@/models/ApplicationFile';
import jwt from "jsonwebtoken";
import { parse, serialize } from "cookie";
import axios from "axios";


export default async function handler(req, res) {
  if (req.method !== "GET") return res.status(405).end();

  await connectDb();

  try {
    // Extract JWT Token
    const { token } = parse(req.headers.cookie || '');
    if (!token) return res.status(401).json({ message: "Unauthorized" });

    // Decode User ID from Token
    const decoded = jwt.verify(token, process.env.JWT_SECRET)
  
    const userId = decoded.id;

    // Fetch User's Active Subscription
    const userApplications = await Application.countDocuments({ userId: userId });
    const subscription = await Subscription.findOne({ userId: userId }).sort({ createdAt: -1 });

    res.status(200).json({
      applicationcount: userApplications,
      substatus: subscription?.status || null,
      subpaymentcurrentplan: subscription?.currentplan || null,
    });
  } catch (error) {
    console.error("Error:", error.name);

    if (error.name === 'JsonWebTokenError') {
      return res.status(401).json({ error: 'Token invalid' });
    }

    if (error.name === 'TokenExpiredError') {
      return res.status(401).json({ error: 'Token expired' });
    }

    res.status(500).json({ message: "Internal Server Error", error: error.message });
  }
}