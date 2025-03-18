import Stripe from "stripe";
import jwt from "jsonwebtoken";
import User from "@/models/User";
import { connectDb } from "@/helper/db";
import Subscription from "@/models/Subscription";
import { parse } from "cookie";
import { DateTime } from "luxon"; // Install via `npm install luxon`


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

        // Define plan durations in months
        const planDurations = {
            "price_1R2oilIBEl0UnhG5tD4M6hb7": 3,  // 3 months
            "price_1R2oilIBEl0UnhG5qLbyj6Qc": 6, // 6 months
            "price_1R2oilIBEl0UnhG5NqQwt5GU": 12 // 12 months
        };

        // Validate selected plan
        const durationMonths = planDurations[priceId];
        console.log(priceId)
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

        // Calculate `cancel_at` date (end of subscription)
        const cancelAt = Math.floor(DateTime.now().plus({ months: durationMonths }).toSeconds());

        // Create subscription with auto-cancel
        const subscription = await stripe.subscriptions.create({
            customer: customer.id,
            items: [{ price: priceId }],
            expand: ["latest_invoice.payment_intent"],
            cancel_at: cancelAt,
        });

        // Determine current plan from priceId
        const planMap = {
            "price_1R2oilIBEl0UnhG5tD4M6hb7": "3 Monate",
            "price_1R2oilIBEl0UnhG5qLbyj6Qc": "6 Monate",
            "price_1R2oilIBEl0UnhG5NqQwt5GU": "12 Monate",
        };
        const currentPlan = planMap[priceId] || "Unknown";

        console.log("Subscription Created:", subscription);

        // Save subscription details to database
        const newSubscription = await Subscription.create({
            userId: user._id,
            customerId: customer.id,
            subId: subscription.id,
            status: subscription.status,
            currentplan: currentPlan,
            paymentType: "subscription",
            current_period_start: new Date(subscription.current_period_start * 1000),
            current_period_end: new Date(subscription.current_period_end * 1000),
            nextInvoiceDate: new Date(subscription.current_period_end * 1000),
            cancelAt: new Date(subscription.cancel_at * 1000),
        });

        res.status(200).json({
            success: true,
            subscriptionId: subscription.id,
            message: "Subscription successfully created and saved.",
            nextInvoiceDate: new Date(subscription.current_period_end * 1000).toISOString(),
            cancelAt: new Date(cancelAt * 1000).toISOString(),
            status: subscription.status,
        });
    } catch (error) {
        console.error("Error creating subscription:", error);
        res.status(400).json({ error: error.message });
    }
}
