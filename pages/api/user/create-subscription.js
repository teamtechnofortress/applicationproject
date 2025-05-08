import Stripe from "stripe";
import jwt from "jsonwebtoken";
import User from "@/models/User";
import { connectDb } from "@/helper/db";
import Subscription from "@/models/Subscription";
import { parse } from "cookie";
import { DateTime } from "luxon";
import { PLAN_DURATIONS, PLAN_IDS } from "@/lib/stripePlans";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

export default async function handler(req, res) {
  if (req.method !== "POST") return res.status(405).json({ error: "Method Not Allowed" });

  await connectDb();

  try {
    const { token } = parse(req.headers.cookie || "");
    if (!token) return res.status(401).json({ error: "Unauthorized" });

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decoded.id);
    if (!user) return res.status(404).json({ error: "User not found" });

    const { paymentMethodId, priceId } = req.body;
    const duration = PLAN_DURATIONS[priceId];

    if (duration === undefined ) return res.status(400).json({ error: "Invalid plan selected." });

    const previousSub = await Subscription.findOne({ userId: user._id });

    // ✅ Enforce 4-day plan only once
    const isFirstTime = !previousSub;
    if (!isFirstTime && duration === 4) {
      return res.status(400).json({ error: "4-day plan is only allowed for new users." });
    }

    // Create or reuse Stripe customer
    let customer = await stripe.customers.search({ query: `email:'${user.email}'` });
    if (!customer.data.length) {
      customer = await stripe.customers.create({
        email: user.email,
        name: `${user.firstname} ${user.lastname}`,
      });
    } else {
      customer = customer.data[0];
    }

    await stripe.paymentMethods.attach(paymentMethodId, { customer: customer.id }).catch(e => {
      if (e.code !== "resource_already_exists") throw e;
    });

    await stripe.customers.update(customer.id, {
      invoice_settings: { default_payment_method: paymentMethodId },
    });
    const now = Math.floor(Date.now() / 1000);
  
    const subscription = await stripe.subscriptions.create({
      customer: customer.id,
      items: [{ price: priceId }],
      // cancel_at: cancelAt,
      metadata: {
        userId: user._id.toString(),
        durationMonths: duration.toString(),
      },
      expand: ["latest_invoice.payment_intent"],
    });
  
    let scheduleId = null;
    let initialTermEnd = DateTime.now();
    
    // Duration logic: for 4-day plan
    if (duration === 4) {
      initialTermEnd = initialTermEnd.plus({ days: 4 });
      const scheduleStartTimestamp = Math.floor(initialTermEnd.plus({ minutes: 5 }).toSeconds());
      const schedule = await stripe.subscriptionSchedules.create({
        customer: customer.id,
        start_date: scheduleStartTimestamp,
        // start_date: Math.floor(Date.now() / 1000) + 5 * 60,
        end_behavior: "release",
        phases: [
          {
            items: [{ price: PLAN_IDS.price_3_month }],
            iterations: 1,
          },
        ],
      });
      
  
      await stripe.subscriptions.update(subscription.id, {
        metadata: {
          ...subscription.metadata,
          scheduleId: schedule.id,
        },
      });


      scheduleId = schedule.id;
    } else {
      initialTermEnd = DateTime.now().plus({ months: duration });
    }


    await Subscription.create({
      userId: user._id,
      userEmail: user.email,
      customerId: customer.id,
      subId: subscription.id,
      currentplan: duration === 4 ? "4 Tage" : `${duration} Monate`,
      paymentType: "subscription",
      status: subscription.status,
      current_period_start: new Date(subscription.current_period_start * 1000),
      current_period_end: new Date(subscription.current_period_end * 1000),
      initialTermEnd: initialTermEnd.toJSDate(),
      cancelAtPeriodEnd: false,
      scheduleId,
    });

    return res.status(200).json({ success: true, subscriptionId: subscription.id });
  } catch (error) {
    console.error("Error creating subscription:", error);
    return res.status(400).json({ error: error.message });
  }
}
