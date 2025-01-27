import { useEffect, useState } from "react";
import styles from "@/styles/latest.module.css";

const StepNineInner = ({
  firstname,
  lastname,
  email2,
  setComponents,
  handleChange,
  currentStep,
  setCurrentStep,
}) => {
  const [errors, setErrors] = useState({});
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

  setCurrentStep(20);

  return (
    <div className="flex items-center justify-center bg-white shadow-lg rounded-lg">
    <div className="w-full max-w-lg ">
      <p className={`${styles["main-heading"]} mt-10 text-center font-bold`}>
      Geschafft
      </p>
      <p className={`${styles["p-address"]} mb-10 text-center mx-auto`}>
      Wir haben alle Daten von dir erhalten.
      </p>
      <button type="button" className={`${styles["next-btn"]} mt-10 text-white px-6 py-3 rounded-lg bg-blue-500 mx-auto block`}>
           Download Mappe
      </button>

      <button type="button" className={`${styles["next-btn"]} mt-10 text-white px-6 py-3 rounded-lg bg-blue-500 mx-auto block`}>
          Zum Dashboard
      </button>

      <p className={`${styles["p-address"]} mt-20 mb-10 text-center`}>
         Besteht das Beschäftigungsverhältnis länger, als 6 Monate?
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


        <div className="flex justify-between mt-10 mb-20">
          <button
            type="button"
            className="bg-gray-300 text-gray-700 px-4 py-2 rounded-lg"
            onClick={() => setCurrentStep(19)}
          >
           Die Bescheinigung liegt nun vor.
          </button>

          <div className="col-span-2">
            <button
              type="button"
              className={`${styles["next-btn"]} text-white px-6 py-3 rounded-lg`}
              onClick={() => setCurrentStep(20)}
            >
              Überspringen
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StepNineInner;
