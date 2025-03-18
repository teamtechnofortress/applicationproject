import React, { useState, useEffect } from "react";
import SidebarHeader from "@/components/SidebarHeader";
import styles from "../../styles/subscription.module.css";
import Link from "next/link";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const SubscriptionDetail = () => {
    const [selectedPlan, setSelectedPlan] = useState("price_6_month");
    const [expanded, setExpanded] = useState({});
    const [hasSubscription, setHasSubscription] = useState(false); // ✅ Track if user has an active subscription
    useEffect(() => {
      const fetchSubscriptionStatus = async () => {
          try {
              const res = await fetch("/api/user/subscription", {
                  method: "GET",
                  headers: { "Content-Type": "application/json" },
              });

              const data = await res.json();
              console.log(data)
              
              if (res.ok && data.status === "active") {
                  setHasSubscription(true);
              }
          } catch (error) {
              console.error("Error fetching subscription:", error);
              toast.error("Fehler beim Abrufen des Abonnements.");
          }
      };

      fetchSubscriptionStatus();
  }, []);


    const toggleExpand = (planId) => {
        setExpanded((prev) => ({
            ...prev,
            [planId]: !prev[planId],
        }));
    };

    const plans = [
        {
            id: "price_one_time",
            name: "Einmal",
            price: "30,00€",
            duration: "Einmal",
            details: "Mit dem „One Time“-Plan haben Sie vollen Zugriff auf exklusive Tools für vier Personen.",
            label: null,

        },
        {
          id: "price_3_month",
          name: "3 Monate",
          price: "29,99€",
          duration: "Mindestlaufzeit",
          details: "Mit dem 3-Monats-Plan erhalten Sie vollen Zugang zu exklusiven Tools für einen begrenzten Zeitraum.",
          label: null,

      },
        {
            id: "price_6_month",
            name: "6 Monate",
            price: "19,99€",
            duration: "Mindestlaufzeit",
            details: "Unser beliebtester Plan! Profitieren Sie von erweiterten Funktionen und einem günstigeren Monatspreis.",
            label: "Beliebt", 
        },
        {
            id: "price_12_month",
            name: "12 Monate",
            price: "12,99€",
            duration: "Mindestlaufzeit",
            details: "Unser bestes Angebot! Sparen Sie am meisten mit einem langfristigen Zugriff auf alle Premium-Funktionen.",
            label: "Bester Preis", 
        },
    ];

    return (
        <>
            <SidebarHeader />
            <ToastContainer />
            <div className="flex">
                <div className="flex-1 ml-64">
                    <div className="bg-gray-100 py-8 p-20">
                        <div className="mx-auto px-4 sm:px-6 lg:px-8 p-20">
                            <h1 className={`${styles["subscription-h1"]}`}>
                                Schneller in dein Traumzuhause mit Wohnungsmappe
                            </h1>
                            
                            <h2 className={`${styles["subscription-h2"]}`}>Wähle deine Option:</h2>

                            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mt-20 pt-20">
                                {plans.map((plan) => (
                                    <div
                                        key={plan.id}
                                        className={`${styles["card-1"]} ${
                                            selectedPlan === plan.id ? styles["selected-plan"] : ""
                                        } cursor-pointer border-2 ${
                                            selectedPlan === plan.id ? "border-green-500" : "border-gray-300"
                                        } relative`}
                                        onClick={() => setSelectedPlan(plan.id)}
                                    >
 
                                    {plan.label && (
                                            <div className={`${styles["beliebt"]} absolute top-0`}>{plan.label}</div>
                                        )}
                                        <div className="flex gap-4 mt-4">
                                            <div className={`${styles["circle-sec"]} mt-4`}>
                                                <img src={selectedPlan === plan.id ? "/images/greencircle.svg" : "/images/circle.svg"} />
                                            </div>
                                            <div className={`${styles["text-sec"]}`}>
                                                <h3 className={`${styles["monate"]}`}>{plan.name}</h3>
                                                <p className={`${styles["grey-text"]}`}>{plan.duration}</p>
                                                <h3 className={`${styles["price"]}`}>{plan.price}</h3>
                                                <p className={`${styles["grey-text"]} mt-2`}>/ Monat</p>
                                            </div>
                                        </div>

                                        {/* Expandable Section */}
                                        {expanded[plan.id] && (
                                            <div className="mt-4 text-gray-700">
                                                <p>{plan.details}</p>
                                            </div>
                                        )}

                                        {/* Toggle Button */}
                                        <button
                                            className={`${styles["btn-mehr"]} mt-4 flex items-center gap-2 rounded-lg`}
                                            onClick={(e) => {
                                                e.stopPropagation(); // Prevent selecting the plan when clicking this button
                                                toggleExpand(plan.id);
                                            }}
                                        >
                                            {expanded[plan.id] ? "Weniger anzeigen" : "Mehr anzeigen"}
                                            <svg width="10" height="10" viewBox="0 0 4 5" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <path
                                                    d="M0.244688 0.0499997H1.39469L3.81469 2.34L1.39469 4.64H0.244688L2.66469 2.34L0.244688 0.0499997Z"
                                                    fill="#333333"
                                                />
                                            </svg>
                                        </button>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                <div className='bg-white p-20 mb-20'>
                  <p className={`${styles['subscription-p']}`}>Das sagen Abonnenten in unseren Bewertungen</p>
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-20">
                      {/* Card 1 */}
                      <div className={`${styles['review']} p-4`}>
                        <div className="flex gap-4 mt-4 justify-between">
                          <div className={`${styles['circle-sec']}`}>
                          <p className={`${styles['review-p']}`}>Enrico</p>
                          </div>
                          <div className={`flex`}>
                            <img src="/images/Star.svg" alt="icon" className="w-1/5" />
                            <img src="/images/Star.svg" alt="icon" className="w-1/5" />
                            <img src="/images/Star.svg" alt="icon" className="w-1/5" />
                            <img src="/images/Star.svg" alt="icon" className="w-1/5" />
                            <img src="/images/Star.svg" alt="icon" className="w-1/5" />
                          </div>
                        </div>
                        <p className={`${styles['review-p']} mt-2`}>Super Tipps und wirklich Hilfreich etwas von den Experten aus erster Hand zu Erfahren </p>

                        <button className={`${styles['btn-mehr']} mt-4 flex items-center gap-2 rounded-lg`}>
                          Mehr anzeigen  
                          <svg width="10" height="10" viewBox="0 0 4 5" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M0.244688 0.0499997H1.39469L3.81469 2.34L1.39469 4.64H0.244688L2.66469 2.34L0.244688 0.0499997Z" fill="#333333"/>
                          </svg>
                        </button>
                      </div>

                      {/* Card 2 */}
                      <div className={`${styles['review']} p-4`}>
                        <div className="flex gap-4 mt-4 justify-between">
                          <div className={`${styles['circle-sec']}`}>
                          <p className={`${styles['review-p']}`}>Enrico</p>
                          </div>
                          <div className={`flex`}>
                            <img src="/images/Star.svg" alt="icon" className="w-1/5" />
                            <img src="/images/Star.svg" alt="icon" className="w-1/5" />
                            <img src="/images/Star.svg" alt="icon" className="w-1/5" />
                            <img src="/images/Star.svg" alt="icon" className="w-1/5" />
                            <img src="/images/Star.svg" alt="icon" className="w-1/5" />
                          </div>
                        </div>
                        <p className={`${styles['review-p']} mt-2`}>Super Tipps und wirklich Hilfreich etwas von den Experten aus erster Hand zu Erfahren </p>

                        <button className={`${styles['btn-mehr']} mt-4 flex items-center gap-2 rounded-lg`}>
                          Mehr anzeigen  
                          <svg width="10" height="10" viewBox="0 0 4 5" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M0.244688 0.0499997H1.39469L3.81469 2.34L1.39469 4.64H0.244688L2.66469 2.34L0.244688 0.0499997Z" fill="#333333"/>
                          </svg>
                        </button>
                      </div>
                      {/* Card 3 */}
                      <div className={`${styles['review']} p-4`}>
                        <div className="flex gap-4 mt-4 justify-between">
                          <div className={`${styles['circle-sec']}`}>
                          <p className={`${styles['review-p']}`}>Enrico</p>
                          </div>
                          <div className={`flex`}>
                            <img src="/images/Star.svg" alt="icon" className="w-1/5" />
                            <img src="/images/Star.svg" alt="icon" className="w-1/5" />
                            <img src="/images/Star.svg" alt="icon" className="w-1/5" />
                            <img src="/images/Star.svg" alt="icon" className="w-1/5" />
                            <img src="/images/Star.svg" alt="icon" className="w-1/5" />
                          </div>
                        </div>
                        <p className={`${styles['review-p']} mt-2`}>Super Tipps und wirklich Hilfreich etwas von den Experten aus erster Hand zu Erfahren </p>

                        <button className={`${styles['btn-mehr']} mt-4 flex items-center gap-2 rounded-lg`}>
                          Mehr anzeigen  
                          <svg width="10" height="10" viewBox="0 0 4 5" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M0.244688 0.0499997H1.39469L3.81469 2.34L1.39469 4.64H0.244688L2.66469 2.34L0.244688 0.0499997Z" fill="#333333"/>
                          </svg>
                        </button>
                      </div>
                  </div>
                </div>

                    {/* Checkout Button */}
                    {!hasSubscription && (
                                <div className="text-center mb-20">
                                    <Link
                                        href={{
                                            pathname: "/account/checkout",
                                            query: { selectedPlan },
                                        }}
                                        legacyBehavior
                                    >
                                        <button className={`${styles["btn-tip"]}`} disabled={!selectedPlan}>
                                            Weiter zur Bezahlung
                                        </button>
                                    </Link>
                                </div>
                            )}
                </div>
            </div>
        </>
    );
};

export default SubscriptionDetail;
