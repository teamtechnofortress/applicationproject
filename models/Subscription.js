import mongoose from 'mongoose';
const { Schema } = mongoose;

const SubscriptionSchema = new Schema({
    userId: {type: String},
    userEmail: {type: String},
    customerId: {type: String},
    subId: {type: String},
    paymentId: { type: String }, // paymentIntentId (for one-time)
    amount: { type: Number },
    paymentType: { type: String, enum: ["subscription", "one-time"], required: true },
    status: {type: String},
    currentplan: {type: String},
    current_period_start: { type: Date},
    current_period_end: { type: Date},
    cancelAtPeriodEnd: { type: Boolean },
    initialTermEnd: { type: Date },
    nextInvoiceDate: { type: Date},
    cancelAt: { type: Date},

},{timestamps: true});

export default mongoose.models.Subscription || mongoose.model('Subscription', SubscriptionSchema);