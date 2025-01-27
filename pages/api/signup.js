import User from "@/models/User";
const { connectDb } = require("@/helper/db");
const nodemailer = require("nodemailer");


var CryptoJS = require("crypto-js");

const generateRandomPassword = () => {
    // Generate a random password (you can customize this logic as needed)
    const length = 10;
    const charset = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
    let password = "";
    for (let i = 0; i < length; i++) {
        password += charset.charAt(Math.floor(Math.random() * charset.length));
    }
    return password;
};

const sendWelcomeEmail = async (firstname, lastname, email, password) => {
    try {
        const transporter = nodemailer.createTransport({
          host: process.env.SMTP_HOST,
          port: process.env.SMTP_PORT,
          auth: {
              user: process.env.SMTP_USERNAME,
              pass: process.env.SMTP_PASSWORD
          }
      });

        const info = await transporter.sendMail({
            from: '"Wohnungs Guru" <maddison53@ethereal.email>',
            to: email,
            subject: "Welcome to Wohnungs Guru",
            text: `Hello ${firstname}, Welcome to Wohnungs Guru!`,
            html: `
            <table cellspacing="0" cellpadding="0" role="presentation" style="background:#e0e0e0;min-width:320px" width="100%">
                <tbody>
                <tr>
                    <td>
                        <table align="center" cellpadding="0" cellspacing="0" role="presentation" style="margin:0 auto" width="600">
                            <tbody>
                            <tr>
                                <td align="center" style="background-color:#000000;padding-top:35px">
                                    <a href="#" target="_blank" ><img src="https://www.cvmaker.com/assets/images/email/logo_@2x.png" alt="CV MAKER" style="color:#fff;font:700 20px/14px sans-serif" width="160"></a>
                                </td>
                            </tr>
                            <tr>
                                <td height="260" style="background:#000000 url(https://www.cvmaker.com/assets/images/email/header_bg.png) no-repeat bottom left;background-size:100%">
                                    <table align="center" cellpadding="0" cellspacing="0" role="presentation" width="90%" style="margin:0 auto">
                                        <tbody>
                                        <tr>
                                            <td align="center" style="padding:30px">
                                                <h1 style="color:#ffffff;font:600 44px/54px 'Open Sans',sans-serif;letter-spacing:-1.25px;text-align:center">Wir freuen uns, Sie bei uns begrüßen zu dürfen!</h1>
                                            </td>
                                        </tr>
                                        </tbody>
                                    </table>
                                </td>
                            </tr>
                            <tr>
                                <td style="background:#ffffff">
                                    <table align="center" cellpadding="0" cellspacing="0" role="presentation" style="margin:0 auto;max-width:560px;width:100%" width="580">
                                        <tbody>
                                        <tr>
                                            <td style="color:#000000;font:400 16px/22px 'Open Sans',sans-serif;padding:65px 20px 40px;text-align:left">
                                                Hallo ${firstname},
                                                <br><br>
                                                Willkommen auf Wohnungs Guru, der größten Online-Karriereplattform, aktiv in über 40 Ländern. Mit den folgenden Daten können Sie sich immer und überall einfach einloggen.
                                                <br><br>
                                                <b>Anmeldedaten</b><br>
                                                E-Mail Adresse: <a href="mailto:${email}" target="_blank">${email}</a><br>
                                                Passwort: ${password}<br>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td style="padding-bottom:40px">
                                                <table align="center" cellpadding="0" cellspacing="0" role="presentation" style="margin:0 auto">
                                                    <tbody>
                                                    <tr>
                                                        <td style="background:#f2614c;border-radius:50px;color:#ffffff;font:400 18px 'Open Sans',sans-serif;text-align:left">
                                                            <a href="#" style="color:#ffffff;display:block;padding:18px 55px;text-decoration:none" target="_blank" >Klicken Sie hier, um sich einzuloggen</a>
                                                        </td>
                                                    </tr>
                                                    </tbody>
                                                </table>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td style="padding:0px 20px 30px">
                                                <table cellpadding="0" cellspacing="0" role="presentation" width="100%">
                                                    <tbody>
                                                    <tr>
                                                        <td style="border-bottom:2px solid #000000"></td>
                                                    </tr>
                                                    </tbody>
                                                </table>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td style="padding:0px 20px 40px;text-align:left">
                                                <h2 style="color:#000000;font:600 36px/46px 'Open Sans',sans-serif;letter-spacing:-1px">Eine umfassende Karriere-Plattform</h2>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td style="padding:0px 20px 30px">
                                                <table cellpadding="0" cellspacing="0" role="presentation" width="100%">
                                                    <tbody>
                                                    <tr style="vertical-align:top">
                                                        <th align="left">
                                                            <img src="https://www.cvmaker.com/assets/images/email/icon_templates_@2x.png" alt="" width="100" style="color:#000;font:400 16px/20px sans-serif">
                                                        </th>
                                                        <th height="10" width="20"></th>
                                                        <th align="left">
                                                            <table cellpadding="0" cellspacing="0" role="presentation" width="100%">
                                                                <tbody>
                                                                <tr>
                                                                    <td style="color:#000000;font:400 16px/22px 'Open Sans',sans-serif;padding:0px;text-align:left">
                                                                        <h3 style="font:400 24px/32px 'Open Sans',sans-serif;margin-bottom:10px">20+ professionelle Vorlagen</h3>
                                                                        Wählen Sie aus zahlreichen Vorlagen für Lebenslauf und Anschreiben. So fallen Sie garantiert auf.
                                                                    </td>
                                                                </tr>
                                                                </tbody>
                                                            </table>
                                                        </th>
                                                    </tr>
                                                    <tr>
                                                        <td height="20"></td>
                                                    </tr>
                                                    <tr style="vertical-align:top">
                                                        <th align="left">
                                                            <img src="https://www.cvmaker.com/assets/images/email/icon_jobs_@2x.png" alt="" width="100" style="color:#000;font:400 16px/20px sans-serif" >
                                                        </th>
                                                        <th height="10" width="20"></th>
                                                        <th align="left">
                                                            <table cellpadding="0" cellspacing="0" role="presentation" width="100%">
                                                                <tbody>
                                                                <tr>
                                                                    <td style="color:#000000;font:400 16px/22px 'Open Sans',sans-serif;padding:0px;text-align:left">
                                                                        <h3 style="font:400 24px/32px 'Open Sans',sans-serif;margin-bottom:10px">Relevante Jobs</h3>
                                                                        Seien Sie unter den Ersten, die passende Jobangebote erhalten. Diese sind auf Ihr Profil und Ihre Erfahrung zugeschnitten.
                                                                    </td>
                                                                </tr>
                                                                </tbody>
                                                            </table>
                                                        </th>
                                                    </tr>
                                                    <tr>
                                                        <td height="20"></td>
                                                    </tr>
                                                    <tr style="vertical-align:top">
                                                        <th align="left">
                                                            <img src="https://www.cvmaker.com/assets/images/email/icon_support_@2x.png" alt="" width="100" style="color:#000;font:400 16px/20px sans-serif">
                                                        </th>
                                                        <th height="10" width="20"></th>
                                                        <th align="left">
                                                            <table cellpadding="0" cellspacing="0" role="presentation" width="100%">
                                                                <tbody>
                                                                <tr>
                                                                    <td style="color:#000000;font:400 16px/22px 'Open Sans',sans-serif;padding:0px;text-align:left">
                                                                        <h3 style="font:400 24px/32px 'Open Sans',sans-serif;margin-bottom:10px">Ein zuverlässiger und schneller Kundensupport</h3>
                                                                        Wir sind leicht für Sie erreichbar und bieten Ihnen schnelle und zuversichtliche Hilfe, wann auch immer Sie uns brauchen.
                                                                    </td>
                                                                </tr>
                                                                </tbody>
                                                            </table>
                                                        </th>
                                                    </tr>
                                                    <tr>
                                                        <td height="20"></td>
                                                    </tr>
                                                    <tr style="vertical-align:top">
                                                        <th align="left">
                                                            <img src="https://www.cvmaker.com/assets/images/email/icon_grammar-check_@2x.png" alt="" width="100" style="color:#000;font:400 16px/20px sans-serif">
                                                        </th>
                                                        <th height="10" width="20"></th>
                                                        <th align="left">
                                                            <table cellpadding="0" cellspacing="0" role="presentation" width="100%">
                                                                <tbody>
                                                                <tr>
                                                                    <td style="color:#000000;font:400 16px/22px 'Open Sans',sans-serif;padding:0px;text-align:left">
                                                                        <h3 style="font:400 24px/32px 'Open Sans',sans-serif;margin-bottom:10px">Wir sprechen Ihre Sprache</h3>
                                                                        Erstellen Sie Ihre vollständigen Bewerbungsunterlagen, einschließlich Anschreiben und Lebenslauf, in über 20 Sprachen.
                                                                    </td>
                                                                </tr>
                                                                </tbody>
                                                            </table>
                                                        </th>
                                                    </tr>
                                                    </tbody>
                                                </table>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td style="color:#000000;font:400 16px/22px 'Open Sans',sans-serif;padding:0px 20px 20px;text-align:left">
                                                Wenn Sie irgendwelche Fragen haben, antworten Sie einfach auf diese E-Mail. Wir helfen gerne weiter.
                                                <br><br>
                                                Viel Erfolg,
                                            </td>
                                        </tr>
                                        <tr>
                                            <td style="padding:0px 20px 60px">
                                                <table cellpadding="0" cellspacing="0" role="presentation">
                                                    <tbody>
                                                    <tr style="vertical-align:top">
                                                        <th align="left">
                                                            <img src="https://www.cvmaker.com/assets/images/email/icon-logo-red_@2x.png" alt="" width="60" style="color:#000;font:400 16px/20px sans-serif">
                                                        </th>
                                                        <th height="30" width="20"></th>
                                                        <th align="left">
                                                            <table cellpadding="0" cellspacing="0" role="presentation" width="100%">
                                                                <tbody>
                                                                <tr>
                                                                    <td style="color:#000000;font:400 16px/22px 'Open Sans',sans-serif;padding:0px;text-align:left">
                                                                        Team <a href="#" style="color:#000000;text-decoration:none" target="_blank">Wohnungs Guru</a>
                                                                        <br>
                                                                        —
                                                                        <br>
                                                                        <a href="#" target="_blank">support@wohnungsguru.de</a>
                                                                    </td>
                                                                </tr>
                                                                </tbody>
                                                            </table>
                                                        </th>
                                                    </tr>
                                                    </tbody>
                                                </table>
                                            </td>
                                        </tr>
                                        </tbody>
                                    </table>
                                </td>
                            </tr>
                            <tr>
                                <td style="background:#f0f0f0;padding:40px 20px">
                                    <table align="center" cellpadding="0" cellspacing="0" role="presentation" style="margin:0 auto;max-width:560px;width:100%">
                                        <tbody>
                                        <tr>
                                            <td style="padding-bottom:30px">
                                                <table align="center" cellpadding="0" cellspacing="0" role="presentation" style="margin:0 auto">
                                                    <tbody>
                                                    <tr style="vertical-align:top">
                                                        <td align="center">
                                                            <a href="#" target="_blank">
                                                            <img src="https://www.cvmaker.com/assets/images/email/linkedin_@2x.png" alt="im" width="48" style="color:#000;font:400 10px sans-serif">
                                                            </a>
                                                        </td>
                                                        <td width="10"></td>
                                                        <td align="center">
                                                            <a href="#" target="_blank">
                                                            <img src="https://www.cvmaker.com/assets/images/email/facebook_@2x.png" alt="fb" width="48" style="color:#000;font:400 10px sans-serif">
                                                            </a>
                                                        </td>
                                                        <td width="10"></td>
                                                        <td align="center">
                                                            <a href="#" target="_blank">
                                                            <img src="https://www.cvmaker.com/assets/images/email/twitter_@2x.png" alt="tw" width="48" style="color:#000;font:400 10px sans-serif">
                                                            </a>
                                                        </td>
                                                    </tr>
                                                    </tbody>
                                                </table>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td style="color:#000000;font:400 14px/20px 'Open Sans',sans-serif;padding-bottom:40px;text-align:center">
                                                © Copyright 2024 - Wohnungs Guru B.V.<br>
                                                Piet Heinkade 221, 1017 CA Amsterdam, Netherlands
                                                <br><br>
                                                Wenn Sie diese E-Mails nicht mehr erhalten möchten, können Sie <a href="#" style="color:#000000;text-decoration:underline" target="_blank" >diese hier abbestellen</a>.
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>
                                                <table align="center" cellpadding="0" cellspacing="0" role="presentation" style="margin:0 auto">
                                                    <tbody>
                                                    <tr style="vertical-align:top">
                                                        <td align="center" style="font:400 14px/20px 'Open Sans',sans-serif">
                                                            <a href="#" style="color:#000000;text-decoration:none" target="_blank">
                                                            Allgemeine Geschäftsbedingungen
                                                            </a>
                                                            <span>&nbsp;|&nbsp;</span>
                                                        </td>
                                                        <td align="center" style="font:400 14px/20px 'Open Sans',sans-serif">
                                                            <a href="#" style="color:#000000;text-decoration:none" target="_blank">
                                                            Datenschutzvereinbarung
                                                            </a>
                                                            <span>&nbsp;|&nbsp;</span>
                                                        </td>
                                                        <td align="center" style="font:400 14px/20px 'Open Sans',sans-serif">
                                                            <a href="#" style="color:#000000;text-decoration:none" target="_blank">
                                                            Kontakt
                                                            </a>
                                                        </td>
                                                    </tr>
                                                    </tbody>
                                                </table>
                                            </td>
                                        </tr>
                                        </tbody>
                                    </table>
                                </td>
                            </tr>
                            </tbody>
                        </table>
                    </td>
                </tr>
                </tbody>
            </table>
            `
        });

        console.log("Message sent: %s", info.messageId);
    } catch (error) {
        console.error("Error sending email:", error);
    }
};

const handler = async (req, res) => {
    try {
        await connectDb();
        if (req.method == "POST") {
            const { firstname, lastname, email } = req.body;
           // Check if email is empty
            if (!email) {
                return res.status(400).json({status: 'error' , msg: "Email is required" });
            }

            // Check if email already exists
            const existingUser = await User.findOne({ email });
            if (existingUser) {
                return res.status(400).json({ status: 'error', msg: "Email already exists" });
            }

            // Check if name is empty
            if (!firstname) {
                return res.status(400).json({ status: 'error', msg: "First Name is required" });
            }
            if (!lastname) {
                return res.status(400).json({ status: 'error', msg: "Last Name is required" });
            }

            // Generate a random password
            const generatedPassword = generateRandomPassword();
            // Send welcome email
            await sendWelcomeEmail(firstname, lastname, email, generatedPassword);
            
            const u = new User({firstname, lastname, email, password: CryptoJS.AES.encrypt(generatedPassword, process.env.AES_SECRET).toString()});
            await u.save();

            res.status(200).json({ status:"success", msg: "Your Account has been created!" });

        } else {
          res.status(400).json({ status: 'error', msg: "error! This method is not allowed." });
        }
      } catch (error) {
        console.error(error);
        res.status(500).json({ status: 'error', msg: "Server Error" });
      }
}

export default handler