import { useEffect, useState } from "react";
import styles from "@/styles/latest.module.css";

const StepSevenInner = ({
  mietverhaltnis, 
  setComponents,
  handleChange,
  currentStep,
  setCurrentStep,
}) => {
  const [errors, setErrors] = useState({});

  setCurrentStep(20);

  return (
    <div className="flex items-center justify-center">
      <div className="w-full bg-white shadow-lg rounded-lg p-6">
        <p className={`${styles["main-heading"]} mt-10 text-center font-bold`}>
        Mietschuldenfreiheit
        </p>
        <p className={`${styles["p-address"]} mb-10 text-center w-[90%] lg:w-[60%] mx-auto`}>
        Die Mietschuldfreiheitsbescheinigung dient als Nachweis für einen potenziellen Vermieter, dass du in der Vergangenheit zuverlässig deine Miete gezahlt hast und keine Mietrückstände bestehen.  
        </p>


        <p className={`${styles["p-address"]} mt-10 lg:mt-20 mb-10 text-center w-[80%] lg:w-[40%] mx-auto`}>
        In welchem Mietverhältnis stehst du aktuell?
        </p>
        <div className="grid grid-cols-1 lg:grid-cols-2 mt-5 gap-4 lg:gap-10 w-[60%] mx-auto">
            <div className="col-span-1 flex items-center">
                    <input
                          className={`${styles["form-check-input"]} mr-2`}
                          type="radio"
                          name="mietverhaltnis"
                          id="mietverhaltnis1"
                          value="Ja"
                          onChange={handleChange}
                          checked={mietverhaltnis === "Ja"}
                          onClick={() => setCurrentStep((prevStep) => prevStep + 1)}
                        />
                        <label
                          className={`${styles["form-check-label"]} ${styles["radio-btn"]} ${
                            mietverhaltnis === "Ja" ? styles["black"] : ""
                          }`}
                          htmlFor="mietverhaltnis1"
                        >
                          Hauptmieter
                        </label>
                      </div>
                      <div className="col-span-1 flex items-center">
                        <input
                          className={`${styles["form-check-input"]} mr-2`}
                          type="radio"
                          name="mietverhaltnis"
                          id="mietverhaltnis2"
                          value="Nein"
                          onChange={handleChange}
                          checked={mietverhaltnis === "Nein"}
                          onClick={() => setCurrentStep((prevStep) => prevStep + 2)}
                        />
                        <label
                          className={`${styles["form-check-label"]} ${styles["radio-btn"]} ${
                            mietverhaltnis === "Nein" ? styles["black"] : ""
                          }`}
                          htmlFor="mietverhaltnis2"
                        >
                          Untermieter
                        </label>
                    </div>
              </div>
                  

        <div className="flex justify-between mt-10">
          <button
            type="button"
            className="bg-gray-300 text-gray-700 px-4 py-2 lg:py-3 rounded-lg"
            onClick={() => setCurrentStep(18)}
          >
            Zurück
          </button>

          <div className="col-span-2">
            <button
              type="submit"
              className={`${styles["next-btn"]} text-white px-6 py-2 lg:py-3 rounded-lg`}
              // onClick={() => setCurrentStep(22)}
            >
              Überspringen
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StepSevenInner;
