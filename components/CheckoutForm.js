import { useState } from "react";
import { useStripe, useElements, CardNumberElement, CardExpiryElement, CardCvcElement } from "@stripe/react-stripe-js";
import styles from '@/styles/subscription.module.css';
import { useRouter } from "next/router";
import { toast } from 'react-toastify';
import { PLAN_IDS  } from "@/lib/stripePlans";

const CheckoutForm = ({ priceId, customerEmail }) => {
    const stripe = useStripe();
    const elements = useElements();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const router = useRouter();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError(null);

        if (!stripe || !elements) {
            setError("Stripe is not initialized");
            setLoading(false);
            return;
        }

        const cardNumberElement = elements.getElement(CardNumberElement);
        const cardExpiryElement = elements.getElement(CardExpiryElement);
        const cardCvcElement = elements.getElement(CardCvcElement);

        if (!cardNumberElement || !cardExpiryElement || !cardCvcElement) {
            setError("Card input fields are missing.");
            
            setLoading(false);
            return;
        }

        const { error, paymentMethod } = await stripe.createPaymentMethod({
            type: "card",
            card: cardNumberElement,
        });

        if (error) {
            setError(error.message);
            setLoading(false);
            return;
        }
        // const isOneTime = priceId === "price_1R3x3mIBEl0UnhG5T8lqLHvW";
        // const isOneTime = priceId === PLAN_IDS.price_one_time;


        // const endpoint = isOneTime 
        // ? "/api/user/one-time-payment" // One-Time Payment API
        // : "/api/user/create-subscription"; // Subscription API
        try {
            console.log('price id', priceId)
        const response = await fetch('/api/user/create-subscription', {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                paymentMethodId: paymentMethod.id,
                customerEmail,
                priceId, // ✅ Always include priceId
                // oneTime: isOneTime, // ✅ Explicitly pass oneTime flag
            }),
        });

        const data = await response.json();

        if (data.error) {
            setError(data.error);
            toast.error(data.error);
        } else {
            toast.success("Zahlung erfolgreich!");
             // redirect after short delay
            // setTimeout(() => {
            //     router.push("/account/allapplications");
            // }, 1500);
        }

        } catch (err) {
            console.error("Network error:", err);
            toast.error("Ein Fehler ist aufgetreten. Bitte versuche es erneut.");
        }

        setLoading(false);
    };

    return (
        <form onSubmit={handleSubmit} className="grid grid-cols-1 gap-4 mt-3 mb-3">
            {/* Styled Credit Card Input */}
            <div className="grid grid-cols-1 gap-4 mt-3 mb-3">
                <div className="input-field mt-2">
                    <label className={`${styles["label"]}`}>Kartennummer</label>
                    <div className={`${styles["form-input"]} form-input w-full p-2 border border-gray-300 rounded`}>
                        <CardNumberElement
                            options={{
                                style: {
                                    base: {
                                        fontSize: "16px",
                                        color: "#424770",
                                        "::placeholder": { color: "#aab7c4" },
                                    },
                                    invalid: { color: "#9e2146" },
                                },
                            }}
                        />
                    </div>
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                    {/* Expiry Date */}
                    <div className="input-field mt-2">
                        <label className={`${styles["label"]}`}>Ablaufdatum</label>
                        <div className={`${styles["form-input"]} form-input w-full p-2 border border-gray-300 rounded`}>
                            <CardExpiryElement
                                options={{
                                    style: {
                                        base: {
                                            fontSize: "16px",
                                            color: "#424770",
                                            "::placeholder": { color: "#aab7c4" },
                                        },
                                        invalid: { color: "#9e2146" },
                                    },
                                }}
                            />
                        </div>
                    </div>

                    {/* CVC Security Code */}
                    <div className="input-field mt-2">
                        <label className={`${styles["label"]}`}>Sicherheitdscode</label>
                        <div className={`${styles["form-input"]} form-input w-full p-2 border border-gray-300 rounded`}>
                            <CardCvcElement
                                options={{
                                    style: {
                                        base: {
                                            fontSize: "16px",
                                            color: "#424770",
                                            "::placeholder": { color: "#aab7c4" },
                                        },
                                        invalid: { color: "#9e2146" },
                                    },
                                }}
                            />
                        </div>
                    </div>
                </div>
            </div>

            {error && <p className="text-red-500">{error}</p>}

            <div className="text-center mb-20">
                <button type="submit" disabled={!stripe || loading} className={`${styles['jetzt-tip']}`}>
                    {loading ? "Processing..." : "Jetzt Kaufen"}
                </button>
            </div>
        </form>
    );
};

export default CheckoutForm;
