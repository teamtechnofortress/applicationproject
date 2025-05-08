import React, { useState, useEffect } from 'react';
import SidebarHeader from '@/components/SidebarHeader';
import styles from '../../styles/subscription.module.css';
import { useRouter } from "next/router";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import CheckoutForm from "@/components/CheckoutForm";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import {  PLAN_DURATIONS, PLAN_IDS, PLAN_LABELS, PLAN_PRICES  } from "@/lib/stripePlans";



const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISH_KEY);

const Checkout = () => {
  const router = useRouter();
  let { selectedPlan } = router.query;
  const [hasActiveSubscription, setHasActiveSubscription] = useState(false);
  const [checkingStatus, setCheckingStatus] = useState(true);


  // Default to 6-month plan if no plan is selected
  if (!selectedPlan || !["price_one_time","price_3_month", "price_6_month", "price_12_month"].includes(selectedPlan)) {
      selectedPlan = "price_6_month";
  }


  const priceId = PLAN_IDS[selectedPlan];
  const duration = PLAN_DURATIONS[priceId];
  const label = PLAN_LABELS[priceId];
  const price = PLAN_PRICES[priceId];
 


  useEffect(() => {
    // Check subscription status
    const checkSubscription = async () => {
      try {
        const res = await fetch("/api/user/subscription");
        const data = await res.json();
        if (res.ok && data?.data?.status === "active" && !data?.data?.cancelAtPeriodEnd) {
          setHasActiveSubscription(true);
        }
      } catch (err) {
        console.error("Failed to check subscription status", err);
      } finally {
        setCheckingStatus(false);
      }
    };

    checkSubscription();
  }, []);
  
  return (
    <>
      <SidebarHeader />
      <ToastContainer />
      {console.log('s', )}
      <div className="flex">
        <div className="flex-1 ml-0 md:ml-64">
        <div className="bg-gray-100 py-8 p-5 lg:p-12">
          {checkingStatus ? (
            <p>Lade...</p>
            ) : hasActiveSubscription ? (
            <div className="mx-auto px-4 sm:px-6 lg:px-8 p-4">
              <h1 className={`${styles['subscription-h1']}`}>
                Du hast bereits ein aktives Abonnement.
              </h1>
            </div>
            ) : (
            <div className="mx-auto px-4 sm:px-6 lg:px-8 p-4">
              <h1 className={`${styles['subscription-h1']}`}>
                Schneller in dein Traumzuhause mit Wohnungsmappe
              </h1>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-6 mt-10 lg:mt-20 pt-2 lg:pt-20">
                {/* Card 1 */}
                <div className={`${styles['payment-card']} bg-white p-4`}>
                  <div className="bg-gray-100 p-6 mt-4 flex flex-col sm:flex-row gap-4">
                    <div className={`${styles['circle-sec']}`}>
                      <p className={`${styles['deine']}`}>Deine Bestellung: </p>
                      <p className={`${styles['wohnungmappe']}`}>
                        {label || ""}
                      </p>
                    </div>
                    <div className={`${styles['text-sec']}`}>
                    <h3 className={`${styles['price']}`}>
                      {price} <span>/ Monat</span>
                    </h3>
                    </div>
                  </div>
                    {/* Section Content */}
                  <div className="p-4 mt-4 rounded">
                    <Elements stripe={stripePromise}>
                        <div className="container mx-auto">
                          {console.log('as',priceId)}
                          <CheckoutForm priceId={priceId} />
                        </div>
                    </Elements>
                  </div>
                </div>

                {/* Card 2 */}
                <div className={`${styles['section-text']} p-2 lg:p-8`}>
                  <div className='block lg:flex items-center justify-between mt-6'>
                    <h2 className={`${styles['p-vorteile']}`}>Vorteile von</h2>
                    <img src="/images/logo.png" alt="Logo" className="h-12" />
                  </div>
                  <div className='flex items-center gap-4 mt-6'>
                    <img src="/images/tick.svg"  />
                    <p className={`${styles['p-text']}`}>Erstelle unbegrenzt Wohnungbewerbungen</p>
                  </div>
                  <div className='flex items-center gap-4 mt-3'>
                    <img src="/images/tick.svg"  />
                    <p className={`${styles['p-text']}`}>Exklusive Zusatzinformationen erfahren und Chancen massiv erhöhen</p>
                  </div>
                  <div className='flex items-start gap-4 mt-3'>
                    <img src="/images/tick.svg" className='mt-1' />
                    <div className={`${styles['p-text']}`}>
                      <p>Professionelle Bewerbermappe in digitaler Form, inkl.:</p>
                      <ul className="list-disc pl-5">
                        <li>Mietzahlungsbestätigung</li>
                        <li>Einkommensnachweis</li>
                        <li>Eigene Dokumente</li>
                      </ul>
                    </div>
                  </div>
                  <div className='flex items-center gap-4 mt-3'>
                    <img src="/images/tick.svg"  />
                    <p className={`${styles['p-text']}`}>Immer aktuelle Bonitätsauskunft</p>
                  </div>
                  <div className='flex items-center gap-4 mt-3'>
                    <img src="/images/tick.svg"  />
                    <p className={`${styles['p-text']}`}>QR Code zum digitalen Abruf ihrer Bewerbung bei der Besichtiung</p>
                  </div>
                  

                  <div className='block lg:flex items-center justify-between mt-10 lg:mt-20'>
                    <img src="/images/norton.svg" alt="Logo" className='mx-auto lg:mx-0'/>
                    <img src="/images/review.svg" alt="Logo"/>
                  </div>
                </div>
                

              </div>
            </div>
          )}
        </div>

        </div>
      </div>
    </>
  );
};

export default Checkout;
