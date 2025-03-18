import Subscription from "@/models/Subscription";
import Stripe from "stripe";
import jwt from "jsonwebtoken";
import User from "@/models/User";
import { connectDb } from "@/helper/db";
import { parse } from "cookie";

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
         const { paymentMethodId, priceId, oneTime } = req.body;
       
      
        // Create a Stripe PaymentIntent for one-time payment
        if (oneTime) {
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
            const paymentIntent = await stripe.paymentIntents.create({
                amount: 3099, // Amount in cents (e.g., €30.99)
                currency: "eur",
                customer: customer.id,
                payment_method: paymentMethodId,
                confirm: true,
                automatic_payment_methods: {
                    enabled: true,
                    allow_redirects: "never", // ✅ This disables redirect-based payment methods
                },
                // receipt_email: customerEmail,
            });
            console.log(paymentIntent);

            if (paymentIntent.status !== "succeeded") {
                return res.status(400).json({ error: "Payment failed." });
            }

            // Save One-Time Payment in Subscription DB
            await Subscription.create({
                userId: user._id,
                customerId: paymentIntent.customer,
                paymentId: paymentIntent.id,
                paymentType: "one-time",
                status: paymentIntent.status,
                amount: 30.99,
            });

            res.status(200).json({
                success: true,
                message: "Payment successfully.",
             
            });
        }



    } catch (error) {
        res.status(400).json({ error: error.message });
    }
}
