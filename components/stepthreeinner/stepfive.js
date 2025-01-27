import { useEffect, useState } from "react";
import styles from "@/styles/latest.module.css";

const StepFiveInner = ({
  mietschuldenfreiheit, 
  setComponents,
  handleChange,
  currentStep,
  setCurrentStep,
}) => {
  const [errors, setErrors] = useState({});

  setCurrentStep(15);

  return (
    <div className="flex items-center justify-center">
      <div className="w-full bg-white shadow-lg rounded-lg p-6">
        <p className={`${styles["main-heading"]} mt-10 text-center font-bold`}>
        Mietschuldenfreiheit
        </p>
        <p className={`${styles["p-address"]} mb-10 text-center w-[60%] mx-auto`}>
          Diese kannst du auch später hochladen, solltest du sie gerade nicht zur Hand haben. 
        </p>
        <p className={`${styles["p-address"]} mb-10 text-center w-[60%] mx-auto`}>
           Optional: Kannst du auch deine deine letzte Mietzahlung hochladen
        </p>


        <p className={`${styles["p-address"]} mt-20 mb-10 text-center w-[40%] mx-auto`}>
          Bestehen Mietrückstände aus bisherigen Mietverhältnissen?
        </p>
        <div className="grid grid-cols-2 mt-5 gap-10 w-[60%] mx-auto">
            <div className="col-span-1 flex items-center">
                    <input
                          className={`${styles["form-check-input"]} mr-2`}
                          type="radio"
                          name="mietschuldenfreiheit"
                          id="mietschuldenfreiheit1"
                          value="Ja"
                          onChange={handleChange}
                          checked={mietschuldenfreiheit === "Ja"}
                          onClick={() => setCurrentStep((prevStep) => prevStep + 1)}
                        />
                        <label
                          className={`${styles["form-check-label"]} ${styles["radio-btn"]} ${
                            mietschuldenfreiheit === "Ja" ? styles["black"] : ""
                          }`}
                          htmlFor="mietschuldenfreiheit1"
                        >
                          Ja
                        </label>
                      </div>
                      <div className="col-span-1 flex items-center">
                        <input
                          className={`${styles["form-check-input"]} mr-2`}
                          type="radio"
                          name="mietschuldenfreiheit"
                          id="mietschuldenfreiheit2"
                          value="Nein"
                          onChange={handleChange}
                          checked={mietschuldenfreiheit === "Nein"}
                          onClick={() => setCurrentStep((prevStep) => prevStep + 1)}
                        />
                        <label
                          className={`${styles["form-check-label"]} ${styles["radio-btn"]} ${
                            mietschuldenfreiheit === "Nein" ? styles["black"] : ""
                          }`}
                          htmlFor="mietschuldenfreiheit2"
                        >
                          Nein
                        </label>
                    </div>
              </div>
                  

        <div className="flex justify-between mt-10">
          <button
            type="button"
            className="bg-gray-300 text-gray-700 px-4 py-2 rounded-lg"
            onClick={() => setCurrentStep(14)}
          >
            Zurück
          </button>

          <div className="col-span-2">
            <button
              type="button"
              className={`${styles["next-btn"]} text-white px-6 py-3 rounded-lg`}
              onClick={() => setCurrentStep(16)}
            >
              Weiter
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StepFiveInner;
