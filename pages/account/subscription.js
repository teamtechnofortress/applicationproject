import React, { useState, useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import SidebarHeader from "@/components/SidebarHeader";
import styles from "../../styles/profile.module.css";
import Link from "next/link";

const Subscription = () => {

  const [currentUser, setCurrentUser] = useState(null);
  const [subscriptionData, setSubscriptionData] = useState(null);
  const [loading, setLoading] = useState(false);

  const planMap = {
    "3 Monate": "Wohnungmappe 3 Monate",
    "6 Monate": "Wohnungmappe 6 Monate",
    "12 Monate": "Wohnungmappe 12 Monate"
  };

  const fetchSubscription = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/user/subscription");
      const data = await res.json();

      if (res.ok) {
        console.log(data)
        setSubscriptionData(data);
      } else {
        toast.error(data.message || "Fehler beim Abrufen des Abonnements.");
      }
    } catch (err) {
      console.error("Subscription fetch error:", err);
      toast.error("Fehler beim Abrufen des Abonnements.");
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
        await fetchSubscription(); // Refresh UI
      } else {
        toast.error(data.error || "Fehler beim Kündigen des Abonnements.");
      }
    } catch (err) {
      toast.error("Serverfehler beim Kündigen.");
    }
  };

  useEffect(() => {
    fetchSubscription();
  }, []);

  const planLabel = planMap[subscriptionData?.currentplan] || "Kein aktiver Plan";

  return (
    <>
      <SidebarHeader />
      <ToastContainer />

      <div className="flex">
        <div className="flex-1 ml-64">
          <div className="bg-gray-100 py-8 p-12">
            <div className="mx-auto px-4 sm:px-6 lg:px-8 p-4">
              <h1 className={`${styles["heading-dash"]}`}>Einstellungen</h1>

              <div className="mt-6">
                <form className={`${styles["form-spacing"]}`}>
                  <div className={`${styles["two-third"]} p-10`}>
                    <h3 className={`${styles["heading-personl"]}`}>Ihre Mitgliedschaft</h3>

                    <div className="grid grid-cols-1 gap-4 mt-6">
                      <div className="flex justify-between items-center">
                        <p className={`${styles["span-email"]}`}>{planLabel}</p>

                        {subscriptionData?.status === "active" && !subscriptionData?.cancelAtPeriodEnd && (
                          <button
                            type="button"
                            onClick={handleCancelSubscription}
                            className={`${styles["email-btn"]} bg-blue-500 text-white px-4 py-2 rounded`}
                          >
                            Stornieren
                          </button>
                        )}
                      </div>

                      <div className="flex justify-between items-center mt-2">
                        <div className="w-[60%]">
                          {subscriptionData?.status === "active" ? (
                            <p className={`${styles["old-email"]}`}>
                              Ihr Abonnement ist aktiv. Sie haben Zugriff auf Pro-Funktionen wie PDF-Download und volle Funktionalität.
                            </p>
                          ) : (
                            <p className={`${styles["old-email"]}`}>
                            Ihr Abonnement ist abgelaufen oder wurde gekündigt. Um die Pro-Funktionen weiterhin nutzen zu können, abonnieren Sie es erneut.                            </p>
                          )}
                        </div>

                       
                      </div>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Subscription;
