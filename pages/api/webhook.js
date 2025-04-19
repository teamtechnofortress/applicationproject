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
    
    case 'subscription_schedule.updated':
      const schedule = event.data.object;
    
      if (schedule.status === "active" && schedule.subscription && schedule.id) {
        const oldSub = await Subscription.findOne({ scheduleId: schedule.id });
    
        if (oldSub) {
          // 🔴 Cancel the 4-day subscription in Stripe
          try {
            await stripe.subscriptions.cancel(oldSub.subId);
          } catch (err) {
            console.error("⚠️ Failed to cancel 4-day subscription in Stripe:", err.message);
          }
    
          // 1️⃣ Mark the 4-day subscription as canceled in DB
          oldSub.status = "canceled";
          oldSub.cancelAtPeriodEnd = true;
          oldSub.scheduleId = null;
          await oldSub.save();
    
          // 2️⃣ Create a new subscription entry for the 3-month plan
          await Subscription.create({
            userId: oldSub.userId,
            userEmail: oldSub.userEmail,
            customerId: oldSub.customerId,
            subId: schedule.subscription,
            currentplan: "3 Monate",
            paymentType: "subscription",
            status: "active",
            current_period_start: new Date(),
            current_period_end: DateTime.now().plus({ months: 3 }).toJSDate(),
            initialTermEnd: DateTime.now().plus({ months: 3 }).toJSDate(),
            cancelAtPeriodEnd: false,
            scheduleId: null,
          });
    
          // 🟢 Update metadata on the new Stripe subscription
          await stripe.subscriptions.update(schedule.subscription, {
            metadata: {
              userId: oldSub.userId.toString(),
              durationMonths: "3",
            },
          });
    
          console.log(`✅ Stripe: 3-month subscription started, 4-day subscription canceled.`);
        }
      }
      break;

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
            
            dbSub.currentplan = "1 Monat";
          }

          // ✅ Extend initialTermEnd only if renewal happens
          newInitialTermEnd = DateTime.now().plus({ months: newDuration });

          dbSub.initialTermEnd = newInitialTermEnd.toJSDate();

          
          await dbSub.save();

          console.log(`📅 New initialTermEnd set for subscription ${subscription.id}: ${newInitialTermEnd.toISO()}`);
        }
        // ✅ Send email notification for payment success / renewal
        //  await transporter.sendMail({
        //   from: `"Wohnungsmappe" <info@wohnungsmappe.com>`,
        //   to: dbSub.userEmail,
        //   subject: "🔁 Dein Abonnement wurde verlängert",
        //   html: `
        //     <p>Hallo,</p>
        //     <p>Ihr ${initialEnd}Abonnement wurde erfolgreich ${now} verlängert ${dbSub.cancelAtPeriodEnd}.</p>
        //   `,
        // });
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
