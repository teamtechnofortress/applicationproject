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

    const subscription = await Subscription.findOne({ userId }).sort({ createdAt: -1 });
    if (!subscription) return res.status(404).json({ error: "No active subscription found." });
    if (subscription.status === "canceled") {
      return res.status(400).json({ error: "Subscription already canceled." });
    }

    const stripeSub = await stripe.subscriptions.retrieve(subscription.subId);
    const metadata = stripeSub.metadata || {};
    const durationMonths = parseInt(metadata.durationMonths || "3");

    const now = DateTime.now().toSeconds();
    const initialTermEnd = Math.floor(new Date(subscription.initialTermEnd).getTime() / 1000);

    // 1️⃣ Handle 4-day trial plan
    if (durationMonths === 4) {
      try {
        await stripe.subscriptions.update(subscription.subId, {
          cancel_at_period_end: true, // let Stripe auto-cancel
        });
        console.log("🔁 4-day subscription set to cancel at period end:", initialTermEnd);
      } catch (err) {
        console.error("❌ Stripe update failed for 4-day cancel:", err.message);
      }

      if (subscription.scheduleId) {
        try {
          await stripe.subscriptionSchedules.cancel(subscription.scheduleId);
          console.log("🛑 Canceled scheduled 3-month plan:", subscription.scheduleId);
        } catch (err) {
          console.error("⚠️ Schedule cancel failed:", err.message);
        }
        subscription.scheduleId = null;
      }

      subscription.cancelAtPeriodEnd = true;
      await subscription.save();

      return res.status(200).json({
        success: true,
        message: "4-day plan set to cancel at period end. Future schedule canceled.",
        cancelAt: new Date(initialTermEnd * 1000).toISOString(),
      });
    }

    // 2️⃣ Handle rolling 12-month renewal → downgrade to 1-month cycle
    if (durationMonths === 12 && now >= initialTermEnd) {
      try {
        await stripe.subscriptions.update(subscription.subId, {
          cancel_at_period_end: true,
        });
        console.log("📅 12-month rolling subscription set to cancel at next billing cycle.");
      } catch (err) {
        console.error("❌ Stripe update failed for 12-month rolling cancel:", err.message);
      }

      subscription.cancelAtPeriodEnd = true;
      await subscription.save();

      return res.status(200).json({
        success: true,
        message: "12-month rolling plan will cancel at next billing cycle.",
      });
    }

    // 3️⃣ Handle 3- or 6-month plans
    try {
      await stripe.subscriptions.update(subscription.subId, {
        cancel_at: initialTermEnd,
      });
      console.log("📅 Subscription set to cancel at end of term:", initialTermEnd);
    } catch (err) {
      console.error("❌ Stripe update failed for fixed-term cancel:", err.message);
    }

    subscription.cancelAtPeriodEnd = true;
    await subscription.save();

    return res.status(200).json({
      success: true,
      message: "Subscription set to cancel at end of term.",
      cancelAt: new Date(initialTermEnd * 1000).toISOString(),
    });
  } catch (err) {
    console.error("❌ Cancel API Error:", err);
    res.status(400).json({ error: err.message });
  }
}
