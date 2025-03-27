import Stripe from "stripe";
import jwt from "jsonwebtoken";
import User from "@/models/User";
import { connectDb } from "@/helper/db";
import Subscription from "@/models/Subscription";
import { parse } from "cookie";
import { DateTime } from "luxon"; // Install via `npm install luxon`
import nodemailer from "nodemailer";
import { PLAN_DURATIONS } from "@/lib/stripePlans";




const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

export default async function handler(req, res) {
    if (req.method !== "POST") return res.status(405).json({ error: "Method Not Allowed" });

    await connectDb(); // Ensure database connection

    try {
        // Parse token from cookies
        const { token } = parse(req.headers.cookie || "");
        if (!token) return res.status(401).json({ error: "Unauthorized" });

        // Decode user info from JWT
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const user = await User.findById(decoded.id);
        if (!user) return res.status(404).json({ error: "User not found" });

        const customerEmail = user.email;
        const { paymentMethodId, priceId } = req.body;
        
        // Validate selected plan
        const durationMonths = PLAN_DURATIONS[priceId];
        if (!durationMonths) return res.status(400).json({ error: "Invalid plan selected." });

        // Check if customer already exists
        let customer = await stripe.customers.search({
            query: `email:'${customerEmail}'`
        });

        if (customer.data.length === 0) {
            customer = await stripe.customers.create({
                email: customerEmail,
                name: `${user.firstname} ${user.lastname}`,
            });
        } else {
            customer = customer.data[0]; // Use existing customer
        }

        // Attach payment method to customer
        try {
            await stripe.paymentMethods.attach(paymentMethodId, { customer: customer.id });
        } catch (error) {
            if (error.code !== "resource_already_exists") {
                return res.status(400).json({ error: "Error attaching payment method" });
            }
        }

        // Set default payment method for future subscriptions
        await stripe.customers.update(customer.id, {
            invoice_settings: { default_payment_method: paymentMethodId },
        });
        const initialTermEnd = DateTime.now().plus({ months: durationMonths });
        // Create subscription with auto-cancel
        const subscription = await stripe.subscriptions.create({
            customer: customer.id,
            items: [{ price: priceId }],
            metadata: {
                userId: user._id.toString(),
                durationMonths: durationMonths.toString(),

            },
            expand: ["latest_invoice.payment_intent"],
        });

            // Configure nodemailer transporter
        const transporter = nodemailer.createTransport({
            host:  process.env.SMTP_HOST,
            port:  process.env.SMTP_PORT,
            secure: true,
            auth: {
            user:  process.env.SMTP_USERNAME, // Your Gmail
            pass:  process.env.SMTP_PASSWORD, // Use App Password
            },
        });;
  
      const mailOptions = {
        from: `"Wohnungsmappe" <info@wohnungsmappe.com>`,
        to: customerEmail,
        subject: "🎉 Deine Mitgliedschaft ist aktiv",
        html: `
          <p>Hallo ${user.firstname},</p>
          <p>Dein Abonnement über ${durationMonths} Monate wurde erfolgreich aktiviert.</p>
          <p>Vielen Dank für dein Vertrauen!</p>
        `,
      };
  
    //   await transporter.sendMail(mailOptions);

        // const initialTermEnd = Math.floor(DateTime.now().plus({ months: durationMonths }).toSeconds());


        await Subscription.create({
            userId: user._id,
            userEmail: user.userEmail,
            customerId: customer.id,
            subId: subscription.id,
            currentplan: durationMonths + " Monate",
            paymentType : "subscription",
            status: subscription.status,
            current_period_start: new Date(subscription.current_period_start * 1000),
            current_period_end: new Date(subscription.current_period_end * 1000),
            initialTermEnd: initialTermEnd.toJSDate(),
            cancelAtPeriodEnd: false,
        });
        res.status(200).json({ success: true, message: "Subscription successfully created and saved.", subscriptionId: subscription.id });
    } catch (error) {
        console.error("Error creating subscription:", error);
        res.status(400).json({ error: error.message });
    }
}
