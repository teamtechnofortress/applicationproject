import { buffer } from "micro";
import Stripe from "stripe";
import Subscription from "@/models/Subscription";
import { connectDb } from "@/helper/db";
import { DateTime } from "luxon";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);
export const config = { api: { bodyParser: false } };

export default async function handler(req, res) {
  if (req.method !== "POST") return res.status(405).end();

  await connectDb();

  const buf = await buffer(req);
  const sig = req.headers["stripe-signature"];
  const endpointSecret = process.env.STRIPE_WEBHOOK_SECRET;

  let event;

  try {
    event = stripe.webhooks.constructEvent(buf.toString(), sig, endpointSecret);
  } catch (err) {
    return res.status(400).send(`Webhook Error: ${err.message}`);
  }

  const sub = event.data.object;

  switch (event.type) {
    case "invoice.payment_succeeded":
      // Auto-renew logic
      if (sub.subscription) {
        const subscription = await stripe.subscriptions.retrieve(sub.subscription);
        const dbSub = await Subscription.findOne({ subId: subscription.id });
        if (!dbSub) break;

        const now = DateTime.now().toSeconds();
        const currentInitialEnd = DateTime.fromJSDate(dbSub.initialTermEnd).toSeconds();

        if (now >= currentInitialEnd && !dbSub.cancelAtPeriodEnd) {
          const months = parseInt(subscription.metadata.durationMonths || "3");
          const newInitialTermEnd = Math.floor(DateTime.now().plus({ months }).toSeconds());
          dbSub.initialTermEnd = new Date(newInitialTermEnd * 1000);
          await dbSub.save();
        }
      }
      break;

    case "customer.subscription.deleted":
      await Subscription.findOneAndUpdate(
        { subId: sub.id },
        { status: "canceled" }
      );
      break;

    default:
      break;
  }

  res.status(200).json({ received: true });
}
