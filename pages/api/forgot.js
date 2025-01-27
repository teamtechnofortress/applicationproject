import User from "@/models/User";
const { connectDb } = require("@/helper/db");
var jwt = require('jsonwebtoken');
import nodemailer from 'nodemailer';

const handler = async (req, res) => {
  try {
    await connectDb();

    if (req.method === "POST") {
      const { email } = req.body;

      // Find user by email
      const user = await User.findOne({ email });

      if (!user) {
        return res.status(404).json({ success: false, error: "No user found with this email." });
      }

      // Generate a password reset token
      const resetToken = jwt.sign({ email }, process.env.JWT_SECRET, { expiresIn: "1h" });

      // Create a transporter for sending emails
      const transporter = nodemailer.createTransport({
          host: process.env.SMTP_HOST,
          port: process.env.SMTP_PORT,
          auth: {
              user: process.env.SMTP_USERNAME,
              pass: process.env.SMTP_PASSWORD
          }
      });

      // Create the email options
      const mailOptions = {
        from: '"Wohnungs Guru" <maddison53@ethereal.email>',
        to: email,
        subject: 'Password Reset Request',
        html: `
          <p>You requested a password reset.</p>
          <p>Click the link below to reset your password:</p>
          <a href="${process.env.NEXT_PUBLIC_HOST}/reset-password?token=${resetToken}" target="_blank">Reset Password</a>
        `,
      };

      // Send the email
      try {
        await transporter.sendMail(mailOptions);
        return res.status(200).json({ success: true, message: "Password reset email sent successfully." });
      } catch (error) {
        console.error('Error sending email:', error);
        return res.status(500).json({ error: "Error sending password reset email." });
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
