import React, { useState } from 'react';
import SidebarHeader from '@/components/SidebarHeader';
import styles from '../../styles/subscription.module.css';
import { useRouter } from "next/router";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import CheckoutForm from "@/components/CheckoutForm";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";



const stripePromise = loadStripe('pk_test_51KMSOYIBEl0UnhG5zx0cMrm2fvQiMWEhRYaJ58UsniuBX7XRct7CDA5qD3FrGOXJZhf61MhZIYtXO5j2WSrU0Fg200jpLbCMCg');

const Checkout = () => {
  const router = useRouter();
  let { selectedPlan } = router.query;

  // Default to 6-month plan if no plan is selected
  if (!selectedPlan || !["price_one_time","price_3_month", "price_6_month", "price_12_month"].includes(selectedPlan)) {
      selectedPlan = "price_6_month";
  }

  // Mapping selected plan to the correct Stripe Price ID
  const priceIdMap = {
      price_3_month: "price_1R2oilIBEl0UnhG5tD4M6hb7",
      price_6_month: "price_1R2oilIBEl0UnhG5qLbyj6Qc",
      price_12_month: "price_1R2oilIBEl0UnhG5NqQwt5GU",
      price_one_time: "price_1R3x3mIBEl0UnhG5T8lqLHvW",
  };

  const priceId = priceIdMap[selectedPlan];
  
  return (
    <>
      <SidebarHeader />
      <ToastContainer />
      <div className="flex">
        <div className="flex-1 ml-64">
        <div className="bg-gray-100 py-8 p-12">
            <div className="mx-auto px-4 sm:px-6 lg:px-8 p-4">
              <h1 className={`${styles['subscription-h1']}`}>
                 Schneller in dein Traumzuhause mit Wohnungsmappe
              </h1>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-6 mt-20 pt-20">
                {/* Card 1 */}
                <div className={`${styles['payment-card']} bg-white p-4`}>
                  <div className="bg-gray-100 p-6 mt-4 flex flex-col sm:flex-row gap-4">
                    <div className={`${styles['circle-sec']}`}>
                      <p className={`${styles['deine']}`}>Deine Bestellung: </p>
                      <p className={`${styles['wohnungmappe']}`}>Wohnungmappe {
                                  selectedPlan === "price_3_month"
                                    ? "3 Monate"
                                    : selectedPlan === "price_6_month"
                                    ? "6 Monate"
                                    : selectedPlan === "price_one_time"
                                    ? "One Time"
                                    : "12 Monate"}{" "}</p>
                    </div>
                    <div className={`${styles['text-sec']}`}>
                      <h3 className={`${styles['price']}`}> {selectedPlan === "price_3_month"
                                    ? "29,99€"
                                    : selectedPlan === "price_6_month"
                                    ? "19,99€"
                                    : selectedPlan === "price_one_time"
                                    ? "30,99€"
                                    : "12,99€"}{" "} <span>/ Monat</span></h3>
                    </div>
                  </div>
                    {/* Section Content */}
                  <div className="p-4 mt-4 rounded">
                    <Elements stripe={stripePromise}>
                        <div className="container mx-auto">

                          <CheckoutForm priceId={priceId} />
                        </div>
                    </Elements>
                  </div>
                </div>

                {/* Card 2 */}
                <div className={`${styles['section-text']} p-8`}>
                  <div className='flex items-center justify-between mt-6'>
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
                  <div className='flex items-center gap-4 mt-3'>
                    <img src="/images/tick.svg"  />
                    <p className={`${styles['p-text']}`}>4+ Vorlagen</p>
                  </div>

                  <div className='flex items-center justify-between mt-20'>
                    <img src="/images/norton.svg" alt="Logo"/>
                    <img src="/images/review.svg" alt="Logo"/>
                  </div>
                </div>
                

              </div>
            </div>
          </div>

        </div>
      </div>
    </>
  );
};

export default Checkout;
