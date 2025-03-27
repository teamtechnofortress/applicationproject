import User from "@/models/User";
const {connectDb}  = require("@/helper/db");
var CryptoJS = require("crypto-js");
import { serialize } from 'cookie';
var jwt = require('jsonwebtoken');


const handler = async (req, res) => {
  try {
      await connectDb();
      if (req.method == "POST") {
        let user = await User.findOne({ "email": req.body.email })

        // Check if user exists
        if (!user) {
          return res.status(404).json({ success: false, error: "No User Found!" });
        }

        const bytes  = CryptoJS.AES.decrypt(user.password, process.env.AES_SECRET);
        let decryptedPass = bytes.toString(CryptoJS.enc.Utf8);
        if (user) {
            if (req.body.email == user.email && req.body.password == decryptedPass) {
            var token = jwt.sign({id: user._id , firstname: user.firstname, lastname: user.lastname}, process.env.JWT_SECRET, {expiresIn:"1d"});
            res.setHeader('Set-Cookie', serialize('token', token, { path: '/', httpOnly: true, sameSite: 'strict', maxAge: 60 * 60 * 24 }))
            res.status(200).json({success: true, token});
            }
            else{
                res.status(200).json({ success: false, error: "Invalid email or password." });
            }   
        }
      } 
      else {
          res.status(400).json({ error: "error! This method is not allowed." });
        }
  } 
  catch (error) {
      console.error(error);
      res.status(500).json({ error: "Server Error" });
    }
};

export default handler