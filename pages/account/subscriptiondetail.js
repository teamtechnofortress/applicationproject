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
              
              if (res.ok && data.status === "active" && !data.cancelAtPeriodEnd) {
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
    setSelectedPlan(planId); // ✅ Ensure plan is selected
  };

    const plans = [
        {
            id: "price_one_time",
            name: "Einmal",
            price: "2,95€",
            duration: "4 Tage voller Zugang",
            details: "Mit dem „One Time“-Plan haben Sie vollen Zugriff auf exklusive Tools für vier Personen.",
            label: null,
            label_month: "", 

        },
        {
          id: "price_3_month",
          name: "3 Monate",
          price: "29,99€",
          duration: "Mindestlaufzeit",
          details: `✅ Professionelle & ansprechende Wohnungsmappe – Sofort bereit für deine Bewerbungen!<br><br>
          ✅ Erhöhe deine Chancen mit einem strukturierten, überzeugenden Mieterprofil<br><br>
          ✅ Schneller Bewerbungsprozess – Kein mühsames Zusammenstellen von Dokumenten mehr<br><br>
          ✅ 100 % DSGVO-konform – Deine Daten sind bei uns sicher<br><br>
          📌 Ideal für alle, die in den nächsten Wochen eine Wohnung brauchen und sich von der Masse abheben wollen.`,
          label: null,
          label_month: "/ Monat", 

      },
        {
            id: "price_6_month",
            name: "6 Monate",
            price: "19,99€",
            duration: "Mindestlaufzeit",
            details: `✅ Alle Vorteile des 3-Monats-Abos + mehr Zeit für die perfekte Wohnung<br><br>
            ✅ Unbegrenzte Anpassungen deiner Wohnungsmappe – optimiere dein Profil jederzeit<br><br>
            ✅ Exklusive Tipps & Tricks, um bei Vermietern den besten Eindruck zu hinterlassen<br><br>
            ✅ Mehr Zeit = bessere Chancen – Stressfrei die beste Wohnung finden<br><br>
            🎯 Die perfekte Wahl für alle, die gezielt suchen, aber sich nicht unter Druck setzen lassen wollen.`,
            label: "Beliebt", 
            label_month: "/ Monat", 
        },
        {
            id: "price_12_month",
            name: "12 Monate",
            price: "12,99€",
            duration: "Mindestlaufzeit",
            details: `✅ Maximale Flexibilität – Nutze deine Wohnungsmappe jederzeit für neue Bewerbungen<br><br>
            ✅ Premium-Optimierung – Erhalte regelmäßige Empfehlungen, um dein Profil zu verbessern<br><br>
            ✅ Persönlicher Support – Wir helfen dir, dein Mietprofil perfekt zu gestalten<br><br>
            ✅ Bester Preisvorteil – Spare langfristig und sei immer vorbereitet<br><br>
            💡 Ideal für alle, die regelmäßig umziehen, langfristig vorbereitet sein wollen oder einfach das beste Angebot sichern möchten!`,
            label: "Bester Preis", 
            label_month: "/ Monat", 
        },
    ];

    return (
        <>
            <SidebarHeader />
            <ToastContainer />
            <div className="flex">
                <div className="flex-1 ml-0 md:ml-64">
                    <div className="bg-gray-100 py-8 p-10 md:p-0">
                        <div className="mx-auto px-4 sm:px-6 lg:px-8 p-10 md:p-10 lg:p-20">
                            <h1 className={`${styles["subscription-h1"]}`}>
                                Schneller in dein Traumzuhause mit Wohnungsmappe
                            </h1>
                            
                            <h2 className={`${styles["subscription-h2"]} mt-2`}>Wähle deine Option:</h2>

                            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-6 mt-0 md:mt-10 lg:pt-0 pt-20">
                                {plans.map((plan) => (
                                  <div
                                  key={plan.id}
                                  className={`${styles["card-1"]} ${
                                    selectedPlan === plan.id ? styles["selected-plan"] : ""
                                  } ${expanded[plan.id] ? styles["expanded-card"] : ""} cursor-pointer border-2 ${
                                    selectedPlan === plan.id ? "border-green-500" : "border-gray-300"
                                  } relative`}
                                  onClick={() => toggleExpand(plan.id)} // ✅ Toggle and select
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
                                                <p className={`${styles["grey-text"]} mt-2`}>{plan.label_month}</p>
                                            </div>
                                        </div>

                                        {/* Expandable Section */}
                                        {expanded[plan.id] && (
                                            <div className="mt-4 text-gray-700">
                                                <p className={`${styles["p-detail"]}`}><div dangerouslySetInnerHTML={{ __html: plan.details }} /></p>
                                            </div>
                                        )}

                                        <button
                                        className={`${styles["btn-mehr"]} mt-4 flex items-center gap-2 rounded-lg`}
                                        onClick={(e) => {
                                            e.stopPropagation(); // Prevent card click duplication
                                            toggleExpand(plan.id); // ✅ Toggle & Select
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

                             {/* Checkout Button */}
                    {!hasSubscription && (
                                <div className="text-center mb-10 mt-10">
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
                <div className='bg-white p-20 mb-20'>
                  <p className={`${styles['subscription-p']}`}>Das sagen Abonnenten in unseren Bewertungen</p>
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-20">
                      {/* Card 1 */}
                      <div className={`${styles['review']} p-4`}>
                        <div className="flex gap-4 mt-4 justify-between">
                          <div className={`${styles['circle-sec']}`}>
                          <p className={`${styles['review-p']}`}>Lena (28, Berlin)</p>
                          </div>
                          <div className={`flex`}>
                            <img src="/images/Star.svg" alt="icon" className="w-1/5" />
                            <img src="/images/Star.svg" alt="icon" className="w-1/5" />
                            <img src="/images/Star.svg" alt="icon" className="w-1/5" />
                            <img src="/images/Star.svg" alt="icon" className="w-1/5" />
                            <img src="/images/Star.svg" alt="icon" className="w-1/5" />
                          </div>
                        </div>
                        <p className={`${styles['review-p']} mt-2`}>„Mein Makler meinte wörtlich: “So eine strukturierte Bewerbung sieht man selten.”
Mit dem QR-Code konnte ich vor Ort einfach alles zeigen er hat gescannt, hatte direkt alle Unterlagen und ich bin im Kopf geblieben. Genau diese Wohnung hab ich dann auch bekommen.“ </p>

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
                          <p className={`${styles['review-p']}`}>Marc (30, München)</p>
                          </div>
                          <div className={`flex`}>
                            <img src="/images/Star.svg" alt="icon" className="w-1/5" />
                            <img src="/images/Star.svg" alt="icon" className="w-1/5" />
                            <img src="/images/Star.svg" alt="icon" className="w-1/5" />
                            <img src="/images/Star.svg" alt="icon" className="w-1/5" />
                            <img src="/images/Star.svg" alt="icon" className="w-1/5" />
                          </div>
                        </div>
                        <p className={`${styles['review-p']} mt-2`}>„Ehrlich gesagt war ich unsicher, ob Vermieter sich sowas wirklich anschauen. Aber ich wurde mit genau dieser Mappe zu mehreren Besichtigungen eingeladen. Alles war sauber gegliedert und direkt online abrufbar kein Stress mit PDFs oder Ausdruck-Chaos. Das kam richtig gut an.“ </p>

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
                          <p className={`${styles['review-p']}`}>Jonas (31, Hamburg)</p>
                          </div>
                          <div className={`flex`}>
                            <img src="/images/Star.svg" alt="icon" className="w-1/5" />
                            <img src="/images/Star.svg" alt="icon" className="w-1/5" />
                            <img src="/images/Star.svg" alt="icon" className="w-1/5" />
                            <img src="/images/Star.svg" alt="icon" className="w-1/5" />
                            <img src="/images/Star.svg" alt="icon" className="w-1/5" />
                          </div>
                        </div>
                        <p className={`${styles['review-p']} mt-2`}>„Ich habe zuerst gezögert, ob sich die Ausgabe lohnt im Nachhinein war es definitiv die richtige Entscheidung. Die Vorlage ist professionell aufgebaut und besonders die Bewerbungstipps haben mir enorm geholfen. Man merkt, dass da echte Erfahrung dahintersteckt.“ </p>

                        <button className={`${styles['btn-mehr']} mt-4 flex items-center gap-2 rounded-lg`}>
                          Mehr anzeigen  
                          <svg width="10" height="10" viewBox="0 0 4 5" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M0.244688 0.0499997H1.39469L3.81469 2.34L1.39469 4.64H0.244688L2.66469 2.34L0.244688 0.0499997Z" fill="#333333"/>
                          </svg>
                        </button>
                      </div>
                  </div>
                </div>

                   
                </div>
            </div>
        </>
    );
};

export default SubscriptionDetail;
