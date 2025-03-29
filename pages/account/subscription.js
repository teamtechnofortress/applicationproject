import React, { useState, useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import SidebarHeader from "@/components/SidebarHeader";
import styles from "../../styles/profile.module.css";
import { DateTime } from "luxon";
import Link from "next/link";

const Subscription = () => {
  const [subscriptionData, setSubscriptionData] = useState(null);
  const [loading, setLoading] = useState(false);

  const planMap = {
    "3 Monate": "Wohnungmappe 3 Monate",
    "6 Monate": "Wohnungmappe 6 Monate",
    "12 Monate": "Wohnungmappe 12 Monate",
    "1 Monat" : "Wohnungmappe 1 Monat",
  };

  const fetchSubscription = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/user/subscription");
      const result = await res.json();

      if (res.ok && result.data) {
        setSubscriptionData(result.data);
      } else {
        setSubscriptionData(null);
      }
    } catch (err) {
      console.error("Subscription fetch error:", err);
      setSubscriptionData(null);
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
        await fetchSubscription();
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

  const renderStatusMessage = () => {
    if (!subscriptionData) return null;
    const { paymentType, status, createdAt } = subscriptionData;

    if (paymentType === "subscription") {
      if (status === "active") {
        return (
          <p className={styles["old-email"]}>
            Ihr Abonnement ist aktiv. Sie haben Zugriff auf Pro-Funktionen wie PDF-Download und volle Funktionalität.
          </p>
        );
      } else if (status === "canceled") {
        return (
          <p className={styles["old-email"]}>
            Ihr Abonnement ist abgelaufen oder wurde gekündigt. Um die Pro-Funktionen weiterhin nutzen zu können, abonnieren Sie es erneut.
          </p>
        );
      }
    }

    if (paymentType === "one-time") {
      const created = DateTime.fromISO(createdAt);
      const expiry = created.plus({ days: 4 });
      const now = DateTime.now();

      if (now <= expiry) {
        return (
          <p className={styles["old-email"]}>
            Sie haben eine Einmalzahlung getätigt. Sie können die Anwendung bis zum{" "}
            <strong>{expiry.toLocaleString(DateTime.DATE_MED)}</strong> weiterhin nutzen.
          </p>
        );
      } else {
        return (
          <p className={styles["old-email"]}>
            Ihr Zugang ist abgelaufen. Bitte kaufen Sie einen neuen Plan, um Zugriff zu erhalten.
          </p>
        );
      }
    }

    return (
      <p className={styles["old-email"]}>
        Kein aktives Abonnement gefunden. Bitte wählen Sie einen Plan aus.
      </p>
    );
  };

  return (
    <>
      <SidebarHeader />
      <ToastContainer />
      <div className="flex">
        <div className="flex-1 ml-0 md:ml-64">
          <div className="bg-gray-100 py-8 p-0 md:p-12">
            <div className="mx-auto px-4 sm:px-6 lg:px-8 p-4">
            <nav className="">
                <h1 className={`${styles['heading-dash']}`}>Einstellungen</h1>
                <div  id="navbar-default">
                  <ul className={`${styles['nav-form']} flex flex-wrap items-center`}>
                    <li className={`${styles['nav-form-li']} `}>
                      <Link href="/account/profile" legacyBehavior>
                        <a href="#" className="block py-2 px-1 md:px-3" aria-current="page">
                          Profil
                        </a>
                      </Link>
                    </li>
                    <li className={`${styles['nav-form-li']} `}>
                      <Link href="/account/settings" legacyBehavior>
                        <a href="#" className="block py-2 px-1 md:px-3">
                          Kontoeinstellungen
                        </a>
                      </Link>
                    </li>
                    <li className={`${styles['nav-form-li']} ${styles['active']}`}>
                      <Link href="/account/subscription" legacyBehavior>
                        <a href="#" className="block py-2 px-1 md:px-3">
                        Abonnement
                        </a>
                      </Link>
                    </li>
                  </ul>
                </div>
              </nav>

              <div className="mt-6">
                <form className={styles["form-spacing"]}>
                  <div className={`${styles["two-third"]} p-10`}>
                    <h3 className={styles["heading-personl"]}>Ihre Mitgliedschaft</h3>

                    <div className="grid grid-cols-1 gap-4 mt-6">
                      <div className="flex justify-between items-center">
                       <p className={styles["span-email"]}>
                          {subscriptionData?.paymentType === "subscription"
                            ? planMap[subscriptionData?.currentplan] || subscriptionData?.currentplan
                            : subscriptionData?.paymentType === "one-time"
                            ? "4 Tage voller Zugang"
                            : "Kein aktiver Plan"}
                        </p>

                        {subscriptionData?.paymentType === "subscription" &&
                          subscriptionData?.status === "active" &&
                          !subscriptionData?.cancelAtPeriodEnd && (
                            <button
                              type="button"
                              onClick={handleCancelSubscription}
                              className={`${styles["email-btn"]} bg-blue-500 text-white px-4 py-2 rounded`}
                            >
                              Stornieren
                            </button>
                          )}
                      </div>

                      <div className="mt-3">{renderStatusMessage()}</div>
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
