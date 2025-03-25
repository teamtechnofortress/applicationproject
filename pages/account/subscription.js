import React, { useState, useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import SidebarHeader from "@/components/SidebarHeader";
import styles from "../../styles/profile.module.css";
import Link from "next/link";

const Subscription = () => {
  const [isTipModal, setIsTipModal] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);
  const [customerId, setCustomerId] = useState(null);
  const [currentPriceId, setCurrentPriceId] = useState(null);
  const [subscriptionStatus, setSubscriptionStatus] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const planNames = {
    "price_1R2oilIBEl0UnhG5tD4M6hb7": "Wohnungmappe 3 Monate",
    "price_1R2oilIBEl0UnhG5qLbyj6Qc": "Wohnungmappe 6 Monate",
    "price_1R2oilIBEl0UnhG5NqQwt5GU": "Wohnungmappe 12 Monate",
  };
  const currentPlanName = planNames[currentPriceId] || "Kein aktiver Plan";

  /** ✅ Fetch Subscription Customer ID */
  const fetchCustomerId = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/user/subscription", {
        method: "GET",
        headers: { "Content-Type": "application/json" },
      });

      const data = await res.json();
      console.log("Customer ID Data:", data);
      // if (res.ok && data.currentplan) {
      //   setCurrentPriceId(data.currentplan);
      // }
      // else {
      //   toast.error(data.message || "Kein aktiver Plan");
      // }

      if (res.ok) {
        setCustomerId(data.customerId);
        setCurrentPriceId(data.currentplan);
        setSubscriptionStatus(data.status); // ✅ Store subscription status
      } else {
        toast.error(data.message || "Fehler beim Abrufen des Abonnements.");
      }
    } catch (error) {
      console.error("Customer Fetch Error:", error);
      toast.error("Fehler beim Abrufen des Abonnements.");
    } finally {
      setLoading(false);
    }
  };

  /** ✅ Handles Plan Switch **/
  const handlePlanSwitch = async (newPriceId) => {
    if (!customerId) {
      toast.error("Fehler: Kunde nicht gefunden.");
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const response = await fetch("/api/user/switch-plan", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ customerId, newPriceId }),
      });

      const data = await response.json();
      console.log("Switch Plan Response:", data);

      if (data.error) {
        setError(data.error);
        toast.error(data.error);
      } else {
        toast.success("Plan erfolgreich gewechselt!");
        setIsTipModal(false);
      }
    } catch (err) {
      console.error("Plan Switch Error:", err);
      toast.error("Fehler beim Wechseln des Plans.");
    } finally {
      setLoading(false);
    }
  };
  const handleCancelSubscription = async () => {
    try {
      const res = await fetch("/api/user/cancel-subscription", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
      });
  
      const data = await res.json();
  
      if (res.ok) {
        toast.success("Dein Abonnement wird zum Ende des Zeitraums gekündigt.");
        // Optionally refresh UI or update local state
      } else {
        toast.error(data.error || "Fehler beim Kündigen des Abonnements.");
      }
    } catch (err) {
      toast.error("Serverfehler beim Kündigen.");
    }
  };

  /** ✅ Fetch User Data */
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const res = await fetch("/api/user/get", {
          method: "GET",
          headers: { "Content-Type": "application/json" },
        });

        const data = await res.json();
        if (res.ok) {
          setCurrentUser(data.user);
        } else {
          toast.error(data.message || "Fehler beim Laden der Benutzerdaten.");
        }
      } catch (error) {
        console.error("User Fetch Error:", error);
        toast.error("Fehler beim Abrufen der Benutzerdaten.");
      }
    };

    fetchUserData();
    fetchCustomerId();
  }, []);

  return (
    <>
      <SidebarHeader />
      <ToastContainer />

      <div className="flex">
        <div className="flex-1 ml-64">
          <div className="bg-gray-100 py-8 p-12">
            <div className="mx-auto px-4 sm:px-6 lg:px-8 p-4">
              <nav>
                <h1 className={`${styles["heading-dash"]}`}>Einstellungen</h1>
                <div id="navbar-default">
                  <ul className={`${styles["nav-form"]} flex flex-wrap items-center`}>
                    <li className={`${styles["nav-form-li"]}`}>
                      <Link href="/account/profile" legacyBehavior>
                        <a className="block py-2 px-3">Profil</a>
                      </Link>
                    </li>
                    <li className={`${styles["nav-form-li"]}`}>
                      <Link href="/account/settings" legacyBehavior>
                        <a className="block py-2 px-3">Kontoeinstellungen</a>
                      </Link>
                    </li>
                    <li className={`${styles["nav-form-li"]} ${styles["active"]}`}>
                      <Link href="/account/subscription" legacyBehavior>
                        <a className="block py-2 px-3">Abonnement</a>
                      </Link>
                    </li>
                  </ul>
                </div>
              </nav>

              <div className="gap-4 mt-4">
                <form className={`${styles["form-spacing"]} mt-4`}>
                  <div className={`${styles["two-third"]} p-10`}>
                    <h3 className={`${styles["heading-personl"]}`}>Ihre Mitgliedschaft</h3>
                    
                    <div className="grid grid-cols-1 gap-1 mt-5">
                   
                      <div className="flex justify-between items-center">
                        <div className="w-[60%]">
                        <p className={`${styles["span-email"]}`}>{currentPlanName}</p>
                        </div>

                        <button
                          type="button"
                          onClick= {handleCancelSubscription}
                          className={`${styles["email-btn"]} bg-blue-500 text-white px-4 py-2 rounded`}
                        >
                          Stornieren

                        </button>
                      </div>
                      <div className="flex justify-between items-center">
                        <div className="w-[60%]">
                        {subscriptionStatus === "active" ? (
                            <p className={`${styles["old-email"]} mt-3`}>
                              Ihr CVMaker-Abonnement ist aktiv. Sie haben Zugriff auf Pro-Funktionen wie PDF-Downloads und den vollen Funktionsumfang.
                            </p>
                          ) : (
                            <p className={`${styles["old-email"]} mt-3 `}>
                              Ihr CVMaker-Abonnement ist abgelaufen. Der Zugriff auf Pro-Funktionen wie PDF-Download und volle Funktionalität ist nicht mehr verfügbar. Aktivieren Sie Ihr Konto erneut, um die Pro-Funktionen weiterhin nutzen zu können.
                            </p>
                          )}
                        </div>

                        <button
                          type="button"
                          onClick={() => setIsTipModal(true)}
                          className={`${styles["email-btn"]} bg-blue-500 text-white px-4 py-2 rounded`}
                        >
                          Verlängern
                        </button>
                      </div>
                      
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ✅ Modal - Conditional Rendering */}
      {isTipModal && customerId && (
        <div
          id="tip-modal"
          className="fixed inset-0 bg-gray-600 bg-opacity-50 flex justify-center items-center z-50 text-gray-900"
          onClick={() => setIsTipModal(false)}
        >
          <div
            className={`${styles["tip_bg"]} relative p-4 w-full max-w-2xl max-h-full bg-white rounded-lg shadow`}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="p-4 md:p-5 rounded-t relative">
              <button
                type="button"
                className="text-gray-700 hover:text-gray-900 text-lg font-bold absolute top-0 right-0"
                onClick={() => setIsTipModal(false)}
              >
                ✖
              </button>
              <h3 className={`${styles["modal-h3"]}`}>
                <div className="flex gap-4 justify-center">
                  <img src="/images/tip.svg" alt="Tip Icon" /> Abo wechseln
                </div>
              </h3>
            </div>

            {/* ✅ Plan Selection Buttons */}
            <div className="p-4 md:p-5 space-y-4">
              {[
                { id: "price_1R2oilIBEl0UnhG5tD4M6hb7", label: "3 Monate 29,99€ / Monat" },
                { id: "price_1R2oilIBEl0UnhG5qLbyj6Qc", label: "6 Monate 19,99€ / Monat" },
                { id: "price_1R2oilIBEl0UnhG5NqQwt5GU", label: "12 Monate 12,99€ / Monat" }
              ].map(plan => (
                <button key={plan.id} className={`${styles["sub-popup-btn"]}`} onClick={() => handlePlanSwitch(plan.id)}>
                  {plan.label}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Subscription;
