import { useEffect, useState } from "react";
import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css";
import styles from "@/styles/latest.module.css";

const StepTwoInner = ({
  coverletter, setComponents, handleChange,currentStep,setCurrentStep
}) => {
  const [errors, setErrors] = useState({});

  const validateFields = () => {
    const newErrors = {};
    const safeTrim = (value) => (value && typeof value === "string" ? value.trim() : "");

    if (!safeTrim(coverletter)) newErrors.coverletter = "CoverLetter is required.";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0; // Return true if no errors
  };

  const handleNextClick = () => {
    console.log("Current Step before:", currentStep);
    setComponents(3);
    setCurrentStep(11);
    console.log("Current Step after:", 11);
  };

  return (
    <div className="flex items-center justify-center">
          <div className="w-full bg-white shadow-lg rounded-lg p-6">
            <p className={`${styles["main-heading"]} mt-10 mb-10 text-center font-bold`}>
               Anschreiben
            </p>
            <p className={`${styles["p-address"]} mt-20 mb-10 text-center w-[60%] mx-auto`}>
            Ein kurzes Anschreiben hilft dir, einen guten ersten Eindruck bei deinem Vermieter zu hinterlassen. Stell dich kurz vor – wer du bist, was du machst und warum du an der Wohnung interessiert bist. Zeige, dass du zuverlässig bist und die Wohnung zu schätzen weißt. Ein freundlicher Abschluss mit der Bereitschaft für Rückfragen oder eine Besichtigung rundet dein Schreiben ab.
            </p>
            <div className="grid grid-cols-1 gap-4 mt-5 w-[60%] mx-auto">
              <label>Dein Anschreiben</label>
              <textarea
                id="textarea-field"
                className={`${styles["form-input"]} h-40`}
                onChange={handleChange}
                name="coverletter"
                value={coverletter}
                placeholder="Sehr geehrte Hausverwaltung…"
              />
              {errors.coverletter && (
                <p className="text-red-500 text-sm">{errors.coverletter}</p>
              )}
            </div>

            <div className="flex justify-between mt-10  w-[60%] mx-auto">
                <button
                    type="button"
                    className="bg-gray-300 text-gray-700 px-4 py-2 rounded-lg"
                    onClick={() => {
                      setCurrentStep(9);
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
        </div>
  );
};

export default StepTwoInner;
