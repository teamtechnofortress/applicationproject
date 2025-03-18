import Stripe from "stripe";
import { connectDb } from "@/helper/db";
import Subscription from "@/models/Subscription";
import jwt from "jsonwebtoken";
import { parse } from "cookie";
import { DateTime } from "luxon"; // For precise date calculations

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

export default async function handler(req, res) {
    if (req.method !== "POST") return res.status(405).json({ error: "Method Not Allowed" });

    await connectDb(); // Ensure database connection

    try {
        // ✅ Extract JWT Token from Cookies
        const { token } = parse(req.headers.cookie || "");
        if (!token) return res.status(401).json({ error: "Unauthorized" });

        // ✅ Decode User Info from JWT
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const userId = decoded.id;

        // ✅ Extract Body Data
        const { customerId, newPriceId } = req.body;
        if (!customerId || !newPriceId) {
            return res.status(400).json({ error: "Customer ID and new Price ID are required." });
        }

        // ✅ Find Active Subscription
        const subscriptions = await stripe.subscriptions.list({
            customer: customerId,
            status: "active",
            limit: 1, // Get the most recent active subscription
        });

        if (subscriptions.data.length === 0) {
            return res.status(404).json({ error: "No active subscription found." });
        }

        const subscription = subscriptions.data[0];

        // ✅ Plan Durations in Months
        const planDurations = {
            "price_1R2oilIBEl0UnhG5tD4M6hb7": 3,  // 3 months
            "price_1R2oilIBEl0UnhG5qLbyj6Qc": 6, // 6 months
            "price_1R2oilIBEl0UnhG5NqQwt5GU": 12 // 12 months
        };

        // ✅ Validate Selected Plan
        const durationMonths = planDurations[newPriceId];
        if (!durationMonths) return res.status(400).json({ error: "Invalid plan selected." });

        // ✅ Calculate New `cancel_at` Date
        const newCancelAt = Math.floor(DateTime.now().plus({ months: durationMonths }).toSeconds());

        // ✅ Update Subscription with New Plan and Cancel Date
        const updatedSubscription = await stripe.subscriptions.update(subscription.id, {
            items: [
                {
                    id: subscription.items.data[0].id, // Keep existing subscription item ID
                    price: newPriceId, // Set new plan price
                },
            ],
            proration_behavior: "create_prorations", // Ensure proration
            cancel_at: newCancelAt, // Set automatic cancellation date
        });

        // ✅ Update Subscription in Database
        await Subscription.findOneAndUpdate(
            { userId, subId: subscription.id },
            {
                status: updatedSubscription.status,
                current_period_start: new Date(updatedSubscription.current_period_start * 1000),
                current_period_end: new Date(updatedSubscription.current_period_end * 1000),
                cancelAt: new Date(newCancelAt * 1000),
                currentplan: Object.keys(planDurations).find(key => key === newPriceId) || "Unknown",
            },
            { new: true, upsert: true }
        );

        res.status(200).json({
            success: true,
            message: "Subscription plan updated successfully.",
            subscriptionId: updatedSubscription.id,
            nextInvoiceDate: new Date(updatedSubscription.current_period_end * 1000).toISOString(),
            cancelAt: new Date(newCancelAt * 1000).toISOString(),
            status: updatedSubscription.status,
        });
    } catch (error) {
        console.error("Error updating subscription:", error);
        res.status(400).json({ error: error.message });
    }
}
