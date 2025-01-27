import User from "@/models/User";
const { connectDb } = require("@/helper/db");
var CryptoJS = require("crypto-js");
var jwt = require('jsonwebtoken');

const handler = async (req, res) => {
  try {
    await connectDb();

    if (req.method === "POST") {
      const { token, newPassword } = req.body;

      if (!token || !newPassword) {
        return res.status(400).json({ success: false, error: "Invalid request." });
      }

      try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        const user = await User.findOne({ email: decoded.email });

        if (!user) {
          return res.status(404).json({ success: false, error: "User not found." });
        }

        const hashedPassword = CryptoJS.AES.encrypt(newPassword, process.env.AES_SECRET).toString();
        user.password = hashedPassword;
        await user.save();

        return res.status(200).json({ success: true, message: "Password has been reset successfully." });
      } catch (error) {
        return res.status(400).json({ success: false, error: "Invalid or expired token." });
      }
    } else {
      res.status(400).json({ error: "This method is not allowed." });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server Error" });
  }
};

export default handler;
