import { useEffect, useState } from "react";
import styles from "@/styles/latest.module.css";

const StepTenInner = ({
  firstname,
  lastname,
  email2,
  setComponents,
  handleChange,
  currentStep,
  setCurrentStep,
}) => {
  const [errors, setErrors] = useState({});
  const [isTipModal, setisTipModal] = useState(false);

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
    <div className="flex items-center justify-center bg-white shadow-lg rounded-lg">
    <div className="w-full max-w-lg ">
      <p className={`${styles["main-heading"]} mt-10 text-center font-bold`}>
      Geschafft
      </p>
      <p className={`${styles["p-address"]} mb-10 text-center mx-auto`}>
      Wir haben alle Daten von dir erhalten.
      </p>
      <button
        type="button" 
        className={`${styles["tips"]} mx-auto`}
        id="tip_btn"
        onClick={() => setisTipModal(true)}>
        <img src="/images/tip.svg" alt="Tip Icon" /> <span>Tipps</span>
      </button>
      <button type="button" className={`${styles["next-btn"]} mt-10 text-white px-6 py-3 rounded-lg bg-blue-500 mx-auto block`}>
           Download Mappe
      </button>

      <button type="button" className={`${styles["next-btn"]} mt-10 text-white px-6 py-3 rounded-lg bg-blue-500 mx-auto block`}>
          Zum Dashboard
      </button>

      <p className={`${styles["p-address"]} mt-20 mb-10 text-center`}>
        Möchtest du einen weiteren Mieter anlegen?
      </p> 
      <div className="grid grid-cols-2 mt-5 gap-10 mt-3 mb-3">
          <div className="col-span-1 flex items-center">
            <div className="input-field mt-2">
              <input
                type="text"
                className={`${styles["form-input"]} form-input`}
                id="firstname"
                name="firstname"
                placeholder="First Name"
                value={firstname}
                onChange={handleChange}
              />
            </div>
            {errors.firstname && <p className="text-red-500 text-sm">{errors.firstname}</p>}
            </div>

          <div className="col-span-1 flex items-center">
            <div className="input-field mt-2">
              <input
                type="text"
                className={`${styles["form-input"]} form-input`}
                id="lastname"
                name="lastname"
                placeholder="Last Name"
                value={lastname}
                onChange={handleChange}
              />
            </div>
            {errors.lastname && <p className="text-red-500 text-sm">{errors.lastname}</p>}

           
          </div>
      </div>
      <div className="input-field mt-10 relative">
          {/* Email Icon */}
          <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6 text-gray-500"
              fill="currentColor"
              viewBox="0 0 24 24"
            >
              <path d="M20 4H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2ZM4 18V8l8 5 8-5v10H4Zm8-7L4 6h16l-8 5Z" />
            </svg>
          </div>
          {/* Email Input */}
          <input
            type="email"
            className={`pl-10 ${styles["form-input"]} form-control w-full border border-gray-300 rounded-lg py-2`}
            id="email"
            name="email2"
            placeholder="Email address"
            value={email2}
            onChange={handleChange}
          />
          <div>
          {/* Error Message */}
          {errors.email && (
            <p className="text-red-500 text-sm">{errors.email}</p>
          )}
          </div>
        </div>

          <button type="button" className={`${styles["submit-btn"]} mt-10 mb-10 text-white px-6 py-3 rounded-lg bg-blue-500 mx-auto block`}  onClick={() => setCurrentStep(19)}>
            Einladungslink versenden.
            <svg
                fill="#ffffff"
                height="1.3em"
                width="1.3em"
                viewBox="0 0 512.001 512.001"
                xmlns="http://www.w3.org/2000/svg"
                stroke="#ffffff"
                strokeWidth="10"  // Added stroke-width for boldness
                style={{ display: "inline-block", verticalAlign: "middle" }}
              >
                <g>
                  <path d="M483.927,212.664L66.967,25.834C30.95,9.695-7.905,42.024,1.398,80.367l21.593,89.001 c3.063,12.622,11.283,23.562,22.554,30.014l83.685,47.915c6.723,3.85,6.738,13.546,0,17.405l-83.684,47.915 c-11.271,6.452-19.491,17.393-22.554,30.015L1.398,431.633c-9.283,38.257,29.507,70.691,65.569,54.534l416.961-186.83 C521.383,282.554,521.333,229.424,483.927,212.664z M468.609,265.151l-416.96,186.83c-7.618,3.417-15.814-3.398-13.845-11.516 l21.593-89.001c0.647-2.665,2.383-4.975,4.761-6.337l83.685-47.915c31.857-18.239,31.887-64.167,0-82.423l-83.685-47.916 c-2.379-1.362-4.115-3.672-4.761-6.337L37.804,71.535c-1.945-8.016,6.128-14.975,13.845-11.514L468.61,246.85 C476.522,250.396,476.542,261.596,468.609,265.151z"></path>
                  <path d="M359.268,238.907l-147.519-66.1c-9.444-4.231-20.523-0.005-24.752,9.435c-4.231,9.44-0.006,20.523,9.434,24.752 L305.802,256l-109.37,49.006c-9.44,4.231-13.664,15.313-9.434,24.752c4.231,9.443,15.312,13.663,24.752,9.435l147.519-66.101 C373.996,266.495,374.006,245.51,359.268,238.907z"></path>
                </g>
              </svg>
          </button>
      </div>
      {/* Modal - Conditional Rendering */}
      {isTipModal && (
          <div
            id="tip-modal"
            className="fixed inset-0 bg-gray-600 bg-opacity-50 flex justify-center items-center z-50 text-gray-900 dark:text-white"
            onClick={() => setisTipModal(false)} 
          >
            
            <div
              className={`${styles["tip_bg"]} relative p-4 w-full max-w-2xl max-h-full bg-white rounded-lg shadow text-gray-900`}
              onClick={(e) => e.stopPropagation()}
            >
              <div className="p-4 md:p-5 rounded-t justify-between items-center relative">
              <button
                  type="button"
                  className="text-gray-700 hover:text-gray-900 text-lg font-bold absolute top-0 right-0"
                  onClick={() => setisTipModal(false)}
                >
                  ✖
                </button>
                <h3 className={`${styles["modal-h3"]}`}>
                  <div className="flex gap-4 justify-center">
                  <img className="" src="/images/tip.svg" alt="Tip Icon" /> Tipps zur Bewerbung
                  </div>
              
                </h3>
              
              </div>

              <div className="p-4 md:p-5 space-y-4">
                <div>Solltest du dich als Pärchen für diese Wohnung bewerben wollen, füge nun die Daten deines Partners ein und beziehe dich in deinem Anschreiben auch auf euch beide zusammen.</div>
              </div>
            </div>
          </div>
        )}
    </div>
  );
};

export default StepTenInner;
