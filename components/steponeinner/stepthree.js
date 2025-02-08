import { useEffect, useState } from "react";
import styles from "@/styles/latest.module.css";
import PhoneInput from "react-phone-input-2";

const StepThreeInner = ({
  email,
  phonenumber,
  setPhoneNumber,
  setCurrentStep,
  handleChange,
}) => {
  const [errors, setErrors] = useState({});
 
  const validateFields = () => {
    const newErrors = {};
    const safeTrim = (value) => (value && typeof value === "string" ? value.trim() : "");
  
    if (!safeTrim(email)) {
      newErrors.email = "Bitte geben Sie Ihre E-Mail-Adresse ein.";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      newErrors.email = "Bitte geben Sie eine gültige E-Mail-Adresse ein.";
    }
  
    if (!safeTrim(phonenumber)) {
      newErrors.phonenumber = "PhoneNumber is required.";
    }
  
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0; // Return true if no errors
  };
  setCurrentStep(2);

  return (
    <div className="flex justify-center">
    <div className="w-full max-w-lg">
      <div className="grid grid-cols-1 gap-4 mt-3 mb-3">
        <div>
        <p className={`${styles["main-heading"]} mt-10 mb-10 text-center font-bold`}>
        Wie bist du erreichbar?
        </p>      
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
            name="email"
            placeholder="Email address"
            value={email}
            onChange={handleChange}
          />
          <div>
          {/* Error Message */}
          {errors.email && (
            <p className="text-red-500 text-sm">{errors.email}</p>
          )}
          </div>
        </div>
         {/* Phone Number Input */}
        <div className="input-field mt-10">
          <PhoneInput
            country={'de'}
            name="phonenumber"
            value={phonenumber}
            onChange={setPhoneNumber}
            inputStyle={{ width: '100%', padding: '30px 50px', borderRadius: '6px', borderColor: 'rgb(176 176 176 / 51%)' }}
            placeholder="Phone number"
          />
          {errors.phonenumber && <p className="text-red-500 text-sm">{errors.phonenumber}</p>}
        </div>

        </div>
      </div>

      <div className="flex justify-between mt-10">
         <button type="button" className="bg-gray-300 text-gray-700 px-4 py-2 rounded-lg" onClick={() => {
              setCurrentStep(1); 
          }}> Zurück </button>
          <div className="col-span-2">
            <button type="button" className={`${styles["next-btn"]} text-white px-6 py-3 rounded-lg bg-blue-500 mx-auto block`}
              onClick={() => {
                if (validateFields()) {
                setCurrentStep(3); 
                }
            }}> Weiter </button>
        </div>
      </div>
    </div>
  </div>
  );
};

export default StepThreeInner;
