import { useEffect, useState } from "react";
import styles from "@/styles/latest.module.css";

const StepFourInner = ({
  ausgeubterBeruf,
  arbeitgeber,
  employment,
  income,
  setCurrentStep,
  handleChange,
}) => {
  const [errors, setErrors] = useState({});
  const validateFields = () => {
    const newErrors = {};
    const safeTrim = (value) => (value && typeof value === "string" ? value.trim() : "");

    if (!safeTrim(ausgeubterBeruf)) newErrors.ausgeubterBeruf = "Ausgeübter Beruf is required.";
    if (!safeTrim(arbeitgeber)) newErrors.arbeitgeber = "Arbeitgeber is required.";
    if (!safeTrim(income)) newErrors.income = "Monatliches is required.";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0; // Return true if no errors
  };
  setCurrentStep(3);

  return (
    <div className="flex justify-center">
            <div className="w-full max-w-lg">
              <div className="grid grid-cols-1 gap-4 mt-3 mb-3">
                <div>
                    <p className={`${styles["main-heading"]} mt-10 mb-10 text-center font-bold`}>
                      Wo arbeitest du?
                    </p>      
                    <div className="grid grid-cols-2 gap-4 mt-5">
                      <div className="...">
                        <div className="input-field">
                          <input
                            type="text"
                            className={`${styles["form-input"]} form-input `}
                            id="ausgeubterBeruf"
                            name="ausgeubterBeruf"
                            placeholder="Ausgeübter Beruf"
                            value={ausgeubterBeruf}
                            onChange={handleChange}
                          />
                          {/* Error Message */}
                          {errors.ausgeubterBeruf && <p className="text-red-500 text-sm">{errors.ausgeubterBeruf}</p>}
                        </div>
                      </div>
                      <div className="...">
                        <div className="input-field">
                          <input
                            type="text"
                            className={`${styles["form-input"]} form-input `}
                            id="arbeitgeber"
                            name="arbeitgeber"
                            placeholder="Arbeitgeber"
                            value={arbeitgeber}
                            onChange={handleChange}
                          />
                          {/* Error Message */}
                          {errors.arbeitgeber && <p className="text-red-500 text-sm">{errors.arbeitgeber}</p>}
                        </div>
                      </div>
                    </div>
                    <div className="input-field mt-10">
                      <input
                            type="text"
                            className={`${styles["form-input"]} form-control `}
                            id="income"
                            name="income"
                            placeholder="monatliches Nettogehalt (€)"
                            value={income}
                            onChange={handleChange}
                          />
                           {errors.income && <p className="text-red-500 text-sm">{errors.income}</p>}
                    </div>

                    <p className={`${styles["p-address"]} mt-20 mb-10 text-center`}>
                    Besteht das Beschäftigungsverhältnis länger, als 6 Monate?
                    </p> 
                    <div className="grid grid-cols-2 mt-5 gap-10 w-[60%] mx-auto">
                        <div className="col-span-1 flex items-center">
                        <input
                              className={`${styles["form-check-input"]} mr-2`}
                              type="radio"
                              name="employment"
                              id="employment1"
                              value="Ja"
                              onChange={handleChange}
                              checked={employment === "Ja"}
                              onClick={() => setCurrentStep((prevStep) => prevStep + 1)}
                            />
                            <label
                              className={`${styles["form-check-label"]} ${styles["radio-btn"]} ${
                                employment === "Ja" ? styles["black"] : ""
                              }`}
                              htmlFor="employment1"
                            >
                              Ja
                            </label>
                          </div>
                          <div className="col-span-1 flex items-center">
                            <input
                              className={`${styles["form-check-input"]} mr-2`}
                              type="radio"
                              name="employment"
                              id="employment2"
                              value="Nein"
                              onChange={handleChange}
                              checked={employment === "Nein"}
                              onClick={() => setCurrentStep((prevStep) => prevStep + 1)}
                            />
                            <label
                              className={`${styles["form-check-label"]} ${styles["radio-btn"]} ${
                                employment === "Nein" ? styles["black"] : ""
                              }`}
                              htmlFor="employment2"
                            >
                              Nein
                            </label>

                          {errors.employment && <p className="text-red-500 text-sm">{errors.employment}</p>}
                        </div>
                    </div>
                  

                    <div className="flex justify-between mt-10">
                    <button type="button" className="bg-gray-300 text-gray-700 px-4 py-2 rounded-lg"
                          onClick={() => {
                            if (validateFields()) {
                            setCurrentStep(2); // Correctly update the step state
                            }}}> Zurück 
                    </button>
                    <button type="button" className="bg-gray-300 text-gray-700 px-4 py-2 rounded-lg"
                          onClick={() => {
                            if (validateFields()) {
                            setCurrentStep(5); // Correctly update the step state
                            }}}> Überspringen 
                    </button>
                        
                    </div>
                         
                </div>
              </div>
            </div>
          </div>
  );
};

export default StepFourInner;
