import { useEffect, useState } from "react";
import styles from "@/styles/latest.module.css";

const StepSixInner = ({
  pets,
  setCurrentStep,
  handleChange,
}) => {
  const [errors, setErrors] = useState({});
  const validateFields = () => {
    const newErrors = {};
    const safeTrim = (value) => (value && typeof value === "string" ? value.trim() : "");

    if (!safeTrim(pets)) newErrors.pets = "Pets is required.";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0; // Return true if no errors
  };
  setCurrentStep(5);


  return (
    <div>
    <p className={`${styles["main-heading"]} mt-10 mb-10 text-center font-bold`}>
       Nur noch ein paar Fragen.
    </p>   
    <p className={`${styles["p-address"]} mt-20 mb-10 text-center w-[40%] mx-auto`}>
        Besitzt du ein oder mehrere Haustiere?
    </p> 
    <div className="grid grid-cols-2 mt-5 gap-10 w-[40%] mx-auto">
         <div className="col-span-1 flex items-center">
            <input
              className={`${styles["form-check-input"]} mr-2  `}
              type="radio"
              name="pets"
              id="pet1"
              value="Ja"
              onChange={handleChange}
              checked={pets === "Ja"}
            />
              <label
              className={`${styles["form-check-label"]} ${
                styles["radio-btn"]
              } ${
                pets === "Ja" ? styles["black"] : ""
              }`}
              htmlFor="pet1"
            >
              Ja
            </label>
          </div>
          <div className="col-span-1 flex items-center">
            <input
              className={`${styles["form-check-input"]} mr-2  `}
              type="radio"
              name="pets"
              id="pet2"
              value="Nein"
              onChange={handleChange}
              checked={pets === "Nein"}
            />
            <label
              className={`${styles["form-check-label"]} ${
                styles["radio-btn"]
              } ${
                pets === "Nein" ? styles["black"] : ""
              }`}
              htmlFor="pet2"
            >
              Nein
            </label>
            {errors.pets && <p className="text-red-500 text-sm">{errors.pets}</p>}
      </div>
    </div>
          
    <div className="flex justify-between mt-10">
        <button
          type="button"
          className="bg-gray-300 text-gray-700 px-4 py-2 rounded-lg"
          onClick={() => {
            setCurrentStep(3);
          }}
        >
          Zurück
        </button>
        <div className="col-span-2">
        <button
            type="button"
            className={`${styles["next-btn"]} text-white px-6 py-3 rounded-lg bg-blue-500 mx-auto block`}
            onClick={() => {
              if (validateFields()) {
                setCurrentStep(6);
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

export default StepSixInner;
