import { useEffect, useState } from "react";
import styles from "@/styles/latest.module.css";
import { useRouter } from "next/router";
import { fetchSubscriptionStatus,canViewTipps } from '@/utils/user_sub_data.js';
import UpgradePopup from '@/components/UpgradePopup';


const StepTenInner = ({
  firstname,
  lastname,
  email2,
  setComponents,
  handleChange,
  currentStep,
  pdfurltodownloud,
  setCurrentStep,
}) => {
  const router = useRouter();
  const [errors, setErrors] = useState({});
  const [subscriptionData, setSubscriptionData] = useState(null);
  const [showPriceingPopup, setShowPriceingPopup] = useState(false);

  useEffect(()=>{
    // console.log('pdfurltodownloud',pdfurltodownloud);
  },[pdfurltodownloud]);

  const validateFields = () => {
    const newErrors = {};
    const safeTrim = (value) => (value && typeof value === "string" ? value.trim() : "");
  
    if (!safeTrim(email2)) {
      newErrors.email = "Bitte geben Sie Ihre E-Mail-Adresse ein.";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      newErrors.email = "Bitte geben Sie eine gültige E-Mail-Adresse ein.";
    }
  
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0; // Return true if no errors
  };

  setCurrentStep(23);

  return (
    <div className="flex items-center justify-center">
    <div className="w-full max-w-lg ">
      <p className={`${styles["main-heading"]} mt-10 text-center font-bold`}>
      Geschafft
      </p>
      <p className={`${styles["p-address"]} mb-10 text-center mx-auto`}>
      Wir haben alle Daten von dir erhalten.
      </p>
     
      
      {canViewTipps(subscriptionData) ? (
        <button
          type="button"
          className={`${styles["mappe-btn"]} mt-10 px-6 py-3 rounded-lg mx-auto block`}
          onClick={() => {
            const link = document.createElement("a");
            link.href = pdfurltodownloud;
            link.download = "mappe.pdf"; // Optional: custom file name
            link.target = "_blank"; // Optional: open in new tab
            link.click();
          }}
        >
          Download Mappe
        </button>
      ) : (
        <button 
          type="button"
          className={`${styles["mappe-btn"]} mt-10 px-6 py-3 rounded-lg mx-auto block`}
          onClick={() => setShowPriceingPopup(true)}
          >
          Download Mappe
        </button>
      )}


      <button type="button" className={`${styles["zum-btn"]} mt-10  px-6 py-3 rounded-lg mx-auto block`} onClick={() => router.push("/account/allapplications")} >
          Zum Dashboard
      </button>
      </div>
      <UpgradePopup show={showPriceingPopup} setShow={setShowPriceingPopup} />
    </div>
  );
};

export default StepTenInner;