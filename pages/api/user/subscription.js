import { connectDb } from "@/helper/db";
import Subscription from "@/models/Subscription";
import jwt from "jsonwebtoken";
import { parse } from "cookie";

export default async function handler(req, res) {
  if (req.method !== "GET") return res.status(405).end(); // Allow only GET requests

  await connectDb(); // Ensure DB connection

  try {
    // ✅ Extract JWT Token from Cookies
    const { token } = parse(req.headers.cookie || "");
    if (!token) return res.status(401).json({ message: "Unauthorized" });

    // ✅ Decode User ID from Token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const userId = decoded.id;

    // ✅ Find User's Active Subscription
    const subscription = await Subscription.findOne({ userId }).sort({ createdAt: -1 });

    if (!subscription) {
      return res.status(200).json({ message: "No active subscription found." });
    }

    // ✅ Return Customer ID
    res.status(200).json({ data: subscription });

  } catch (error) {
    console.error("Error fetching customerId:", error);
    res.status(500).json({ message: "Internal Server Error", error: error.message });
  }
}
