import { useState } from "react";
import styles from "@/styles/latest.module.css";

const StepTwelveInner = ({
  apartment,
  setCurrentStep,
  handleChange,
  setComponents,
}) => {
  const [errors, setErrors] = useState({});

  const validateFields = () => {
    const newErrors = {};
    const safeTrim = (value) => (value && typeof value === "string" ? value.trim() : "");

    if (!safeTrim(apartment)) newErrors.apartment = "Apartment Sie eine Option aus.";

    setErrors(newErrors);
    if (Object.keys(newErrors).length === 0) {
      setComponents(2);
    }
  };
  const handleNextClick = () => {
    setComponents(2);
    setCurrentStep(12);
  };

  return (
    <div>
           <p className={`${styles["main-heading"]} mt-10 mb-10 text-center font-bold`}>
            Nur noch ein paar Fragen.
          </p>
          <p className={`${styles["p-address"]} mt-20 mb-10 text-center  w-[40%] mx-auto`}>
           Ist eine gewerbliche Nutzung der Wohnung beabsichtigt?
          </p>
          <div className="grid grid-cols-2 mt-5 gap-10 w-[30%] mx-auto">
            <div className="col-span-1 flex items-center">
              <input
                className={`${styles["form-check-input"]} mr-2`}
                type="radio"
                name="apartment"
                id="apartment1"
                value="Ja"
                onChange={handleChange}
                checked={apartment === "Ja"}
              />
              <label
                className={`${styles["form-check-label"]} ${styles["radio-btn"]} ${
                  apartment === "Ja" ? styles["black"] : ""
                }`}
                htmlFor="apartment1"
              >
                Ja
              </label>
            </div>
            <div className="col-span-1 flex items-center">
              <input
                className={`${styles["form-check-input"]} mr-2`}
                type="radio"
                name="apartment"
                id="apartment2"
                value="Nein"
                onChange={handleChange}
                checked={apartment === "Nein"}
              />
              <label
                className={`${styles["form-check-label"]} ${styles["radio-btn"]} ${
                  apartment === "Nein" ? styles["black"] : ""
                }`}
                htmlFor="apartment2"
              >
                Nein
              </label>
            </div>
            {errors.apartment && (
              <p className="text-red-500 text-sm col-span-2">{errors.apartment}</p>
            )}
          </div>
   
       <div className="flex justify-between mt-10">
       <button
          type="button"
          className="bg-gray-300 text-gray-700 px-4 py-2 rounded-lg"
          onClick={() => {
            setCurrentStep(10);
          }}
        >
          Zurück
        </button>
        <div className="col-span-2">
          <button
              type="button"
              className={`${styles["next-btn"]} text-white px-6 py-3 rounded-lg bg-blue-500 mx-auto block`}
              onClick={handleNextClick}
            >
              Weiter
            </button>
          </div>
        </div>
  </div>
  );
};

export default StepTwelveInner;
