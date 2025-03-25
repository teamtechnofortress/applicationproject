import { buffer } from "micro";
import Stripe from "stripe";
import Subscription from "@/models/Subscription";
import { connectDb } from "@/helper/db";
import { DateTime } from "luxon";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);
export const config = { api: { bodyParser: false } };

const transporter = nodemailer.createTransport({
  host:  process.env.SMTP_HOST,
  port:  process.env.SMTP_PORT,
  secure: true,
  auth: {
  user:  process.env.SMTP_USERNAME, // Your Gmail
  pass:  process.env.SMTP_PASSWORD, // Use App Password
  },
});;

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
        const initialEndDB = new Date(dbSub.initialTermEnd);
        const initialEnd = initialEndDB.getTime() / 1000; // to seconds
        const duration = parseInt(subscription.metadata.durationMonths || "3");
        console.log('web now', now)
        console.log('web initialEnd', initialEnd)
        if (now >= initialEnd && !dbSub.cancelAtPeriodEnd) {
          let newDuration = duration;
          let newInitialTermEnd = DateTime.now();

          // ✅ After 12 months passed, switch to 1-month rolling logic
          if (duration === 12) {
            newDuration = 1;

            // Update subscription metadata in Stripe
            await stripe.subscriptions.update(subscription.id, {
              metadata: {
                ...subscription.metadata,
                durationMonths: "1",
              },
            });
          }

          // ✅ Extend initialTermEnd only if renewal happens
          newInitialTermEnd = DateTime.now().plus({ months: newDuration });

          dbSub.initialTermEnd = newInitialTermEnd.toJSDate();
          await dbSub.save();

          console.log(`📅 New initialTermEnd set for subscription ${subscription.id}: ${newInitialTermEnd.toISO()}`);
        }
         // ✅ Send email notification for payment success / renewal
         await transporter.sendMail({
          from: `"Wohnungsmappe" <info@wohnungsmappe.com>`,
          to: dbSub.userEmail,
          subject: "🔁 Dein Abonnement wurde verlängert",
          html: `
            <p>Hallo,</p>
            <p>Ihr Abonnement wurde erfolgreich verlängert.</p>
          `,
        });
      }
      break;

    case "customer.subscription.deleted":
      const canceledSub = await Subscription.findOneAndUpdate(
        { subId: sub.id },
        { status: "canceled" }
      );
      if (canceledSub) {
        await transporter.sendMail({
          from: `"Wohnungsmappe" <info@wohnungsmappe.com>`,
          to: canceledSub.userEmail,
          subject: "Abo gekündigt",
          text: `Ihr Abonnement wurde erfolgreich gekündigt.`,
        });
      }
      break;

    default:
      break;
  }

  res.status(200).json({ received: true, s: sub.subscription });
}
