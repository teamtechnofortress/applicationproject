import { connectDb } from "@/helper/db";
import Subscription from "@/models/Subscription";
import Stripe from "stripe";
import jwt from "jsonwebtoken";
import { parse } from "cookie";
import { DateTime } from "luxon";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

export default async function handler(req, res) {
  if (req.method !== "POST") return res.status(405).json({ error: "Method Not Allowed" });

  await connectDb();

  try {
    const { token } = parse(req.headers.cookie || "");
    if (!token) return res.status(401).json({ error: "Unauthorized" });

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const userId = decoded.id;

    const subscription = await Subscription.findOne({ userId, status: "active" });

    if (!subscription) return res.status(404).json({ error: "Active subscription not found" });

    // Get the latest subscription details from Stripe
    const stripeSub = await stripe.subscriptions.retrieve(subscription.subId);
    const metadata = stripeSub.metadata || {};
    const durationMonths = parseInt(metadata.durationMonths || "3");

    const now = DateTime.now().toSeconds();
    const initialTermEndDB = new Date(subscription.initialTermEnd);
    const initialTermEnd = initialTermEndDB.getTime() / 1000; // to seconds

    let cancelAt = null;

    if (durationMonths === 12 && now >= initialTermEnd) {
      // ✅ If 12-month plan but now in monthly cycle → cancel next billing cycle
      cancelAt = null; // Let Stripe cancel at period end
      await stripe.subscriptions.update(subscription.subId, {
        cancel_at_period_end: true,
      });

      subscription.cancelAtPeriodEnd = true;
      await subscription.save();

      return res.status(200).json({
        success: true,
        message: "12-month plan now monthly. Subscription will cancel at next billing cycle.",
      });
    }

    // ✅ For 3-, 6-, or still-in-12-months plan → cancel at initialTermEnd
    cancelAt = Math.floor(initialTermEnd);

    await stripe.subscriptions.update(subscription.subId, {
      cancel_at: cancelAt,
    });

    subscription.cancelAtPeriodEnd = true;
    await subscription.save();

    res.status(200).json({
      success: true,
      message: "Subscription marked to cancel at initial term end.",
      cancelAt: new Date(cancelAt * 1000).toISOString(),
    });
  } catch (err) {
    console.error("Cancel Error:", err);
    res.status(400).json({ error: err.message });
  }
}
