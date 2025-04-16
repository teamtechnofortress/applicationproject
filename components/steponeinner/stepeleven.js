import { useState } from "react";
import styles from "@/styles/latest.module.css";

const StepElevenInner = ({
  proceedings,
  setCurrentStep,
  handleChange,
}) => {
  const [errors, setErrors] = useState({});

  const validateFields = () => {
    const newErrors = {};
    const safeTrim = (value) => (value && typeof value === "string" ? value.trim() : "");

    if (!safeTrim(proceedings)) newErrors.proceedings = "Proceedings Sie eine Option aus.";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0; // Return true if no errors
  };
  setCurrentStep(10);

  return (
    <div>
          <p className={`${styles["main-heading"]} mt-10 mb-10 text-center font-bold`}>
            Nur noch ein paar Fragen.
          </p>
          <p className={`${styles["p-address"]} mt-10 lg:mt-20 mb-10 text-center   w-[80%] lg:w-[40%] mx-auto`}>
          Wurde in den letzten 5 Jahren Insolvenzverfahren gegen dich eröffnet? 
          </p>
          <div className="grid grid-cols-2 mt-5 gap-10  w-[80%] lg:w-[40%] mx-auto">
              <div className="col-span-1 flex items-center">
                <input
                  className={`${styles["form-check-input"]} mr-2`}
                  type="radio"
                  name="proceedings"
                  id="proceedings1"
                  value="Ja"
                  onChange={handleChange}
                  checked={proceedings === "Ja"}
                />
                <label
                  className={`${styles["form-check-label"]} ${styles["radio-btn"]} ${
                    proceedings === "Ja" ? styles["black"] : ""
                  }`}
                  htmlFor="proceedings1"
                >
                  Ja
                </label>
              </div>
              <div className="col-span-1 flex items-center">
                <input
                  className={`${styles["form-check-input"]} mr-2`}
                  type="radio"
                  name="proceedings"
                  id="proceedings2"
                  value="Nein"
                  onChange={handleChange}
                  checked={proceedings === "Nein"}
                />
                <label
                  className={`${styles["form-check-label"]} ${styles["radio-btn"]} ${
                    proceedings === "Nein" ? styles["black"] : ""
                  }`}
                  htmlFor="proceedings2"
                >
                  Nein
                </label>
              </div>
              {errors.proceedings && (
                <p className="text-red-500 text-sm col-span-2 text-center">{errors.proceedings}</p>
              )}
          </div>
   
       <div className="flex justify-between mt-10">
       <button
          type="button"
          className="bg-gray-300 text-gray-700 px-4 py-2 lg:py-3  rounded-lg"
          onClick={() => {
            setCurrentStep(9);
          }}
        >
          Zurück
        </button>
        <div className="col-span-2">
          <button
              type="button"
              className={`${styles["next-btn"]} text-white px-6 py-2 lg:py-3 rounded-lg bg-blue-500 mx-auto block`}
              onClick={() => {
                if (validateFields()) {
                  setCurrentStep(11);
                }
              }}
            >
              Weiter
            </button>
          </div>
        </div>
  </div>
  );
};

export default StepElevenInner;
