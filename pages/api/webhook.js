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
  const secret = process.env.STRIPE_WEBHOOK_SECRET;

  let event;
  try {
    event = stripe.webhooks.constructEvent(buf.toString(), sig, secret);
  } catch (err) {
    return res.status(400).send(`Webhook Error: ${err.message}`);
  }

  const sub = event.data.object;

  switch (event.type) {
    case "invoice.payment_succeeded":
      if (!sub.subscription) break;
      const subscription = await stripe.subscriptions.retrieve(sub.subscription);
      const dbSub = await Subscription.findOne({ subId: subscription.id });
      if (!dbSub) break;

      const now = DateTime.now().toSeconds();
      const initialEnd = new Date(dbSub.initialTermEnd).getTime() / 1000;
      const duration = parseInt(subscription.metadata.durationMonths || "4");
      console.log(now)
      console.log(initialEnd)

      if (duration === 4 && now >= initialEnd && !dbSub.cancelAtPeriodEnd) {
        const newPlanId = process.env.PRICE_3_MONTH;

        await stripe.subscriptions.update(subscription.id, {
          items: [{
            id: subscription.items.data[0].id,
            price: newPlanId,
          }],
          metadata: {
            durationMonths: "3",
          },
        });

        dbSub.initialTermEnd = DateTime.now().plus({ months: 3 }).toJSDate();
        dbSub.currentplan = "3 Monate";
        await dbSub.save();
      }

      if (duration === 12 && now >= initialEnd && !dbSub.cancelAtPeriodEnd) {
        await stripe.subscriptions.update(subscription.id, {
          metadata: { durationMonths: "1" },
        });

        dbSub.initialTermEnd = DateTime.now().plus({ months: 1 }).toJSDate();
        dbSub.currentplan = "1 Monat";
        await dbSub.save();
      }

      break;

    case "customer.subscription.deleted":
      await Subscription.findOneAndUpdate(
        { subId: sub.id },
        { status: "canceled" }
      );
      break;
  }

  res.status(200).json({ received: true });
}
