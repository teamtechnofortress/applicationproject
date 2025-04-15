import Stripe from "stripe";
import jwt from "jsonwebtoken";
import User from "@/models/User";
import Subscription from "@/models/Subscription";
import { connectDb } from "@/helper/db";
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
    const user = await User.findById(decoded.id);
    if (!user) return res.status(404).json({ error: "User not found" });

    const { paymentMethodId } = req.body;
    const customerEmail = user.email;

    const price4Day = process.env.NEXT_PUBLIC_PRICE_ONE_TIME;
    const price3Month = process.env.NEXT_PUBLIC_PRICE_3_MONTH;

    let customer = await stripe.customers.search({
      query: `email:'${customerEmail}'`,
    });

    if (customer.data.length === 0) {
      customer = await stripe.customers.create({
        email: customerEmail,
        name: `${user.firstname} ${user.lastname}`,
      });
    } else {
      customer = customer.data[0];
    }

    try {
      await stripe.paymentMethods.attach(paymentMethodId, { customer: customer.id });
    } catch (error) {
      if (error.code !== "resource_already_exists") {
        return res.status(400).json({ error: "Error attaching payment method" });
      }
    }

    await stripe.customers.update(customer.id, {
      invoice_settings: { default_payment_method: paymentMethodId },
    });

    const initialTermEnd = DateTime.now().plus({ days: 4 });

    const schedule = await stripe.subscriptionSchedules.create({
      customer: customer.id,
      start_date: 'now',
      end_behavior: 'release',
      phases: [
        {
          items: [{ price: price4Day }],
          iterations: 1,
        },
        {
          items: [{ price: price3Month }],
          iterations: null,
        },
      ],
    });

    const subscription = await stripe.subscriptions.retrieve(schedule.subscription);

    await Subscription.create({
      userId: user._id,
      userEmail: user.email,
      customerId: customer.id,
      subId: subscription.id,
      scheduleId: schedule.id,
      currentplan: "4 Tage",
      paymentType: "subscription",
      status: subscription.status,
      current_period_start: new Date(subscription.current_period_start * 1000),
      current_period_end: new Date(subscription.current_period_end * 1000),
      initialTermEnd: initialTermEnd.toJSDate(),
      cancelAtPeriodEnd: false,
    });

    res.status(200).json({ success: true, message: "Subscription scheduled", subscriptionId: subscription.id });
  } catch (error) {
    console.error("Subscription Error:", error);
    res.status(500).json({ error: error.message });
  }
}
