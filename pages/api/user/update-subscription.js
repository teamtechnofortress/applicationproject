import Stripe from "stripe";
import { connectDb } from "@/helper/db";
import Subscription from "@/models/Subscription";
import jwt from "jsonwebtoken";
import { parse } from "cookie";
import { PLAN_DURATIONS, PLAN_IDS } from "@/lib/stripePlans";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

export default async function handler(req, res) {
  if (req.method !== "POST") return res.status(405).json({ error: "Method Not Allowed" });

  await connectDb();

  try {
    const { token } = parse(req.headers.cookie || "");
    if (!token) return res.status(401).json({ error: "Unauthorized" });

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const userId = decoded.id;

    const { newPriceId } = req.body;
    const newDuration = PLAN_DURATIONS[newPriceId];
    if (!newDuration) return res.status(400).json({ error: "Invalid new plan." });

    const currentSub = await Subscription.findOne({ userId }).sort({ createdAt: -1 });
    if (!currentSub) return res.status(404).json({ error: "No active subscription found." });

    const currentDuration = parseInt(currentSub?.currentplan) || 0;
    if (currentDuration >= newDuration) {
      return res.status(400).json({ error: "You can only upgrade to a longer plan." });
    }

    const stripeSub = await stripe.subscriptions.retrieve(currentSub.subId);
    const subscriptionItemId = stripeSub.items.data[0].id;

    // Cancel scheduled 3-month if upgrading from 4-day
    if (currentDuration === 4 && currentSub.scheduleId) {
      try {
        await stripe.subscriptionSchedules.cancel(currentSub.scheduleId);
        console.log("🛑 Scheduled 3-month plan canceled.");
      } catch (err) {
        console.error("⚠️ Failed to cancel schedule:", err.message);
      }
    }

    // Update the subscription on Stripe
    await stripe.subscriptions.update(currentSub.subId, {
      items: [{
        id: subscriptionItemId,
        price: newPriceId,
      }],
      proration_behavior: "create_prorations",
      metadata: {
        userId: currentSub.userId.toString(),
        durationMonths: newDuration.toString(),
        scheduleId: "",

      },
    });

    // Update database
    const newEndDate = new Date();
    newEndDate.setMonth(newEndDate.getMonth() + newDuration);

    currentSub.currentplan = `${newDuration} Monate`;
    currentSub.initialTermEnd = newEndDate;
    currentSub.scheduleId = null;
    await currentSub.save();

    return res.status(200).json({
      success: true,
      message: `Subscription upgraded to ${newDuration} months.`,
    });

  } catch (err) {
    console.error("Upgrade Error:", err);
    return res.status(400).json({ error: err.message });
  }
}
