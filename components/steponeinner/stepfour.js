import { useEffect, useState } from "react";
import styles from "@/styles/latest.module.css";

const StepFourInner = ({
  profession,
  setCurrentStep,
  handleChange,
}) => {
  const [errors, setErrors] = useState({});
  const validateFields = () => {
    const newErrors = {};
    const safeTrim = (value) => (value && typeof value === "string" ? value.trim() : "");

    if (!safeTrim(profession)) newErrors.profession = "profession is required.";

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
                     Wie ist deine Berufliche Situation
                    </p>    
                    <p className={`${styles["p-address"]} mb-4 text-center`}>
                      Bitte walhle enie
                    </p> 

                    <div className="grid grid-cols-2 mt-5 gap-4 w-[80%] mx-auto">
                        <div className="col-span-1 flex items-center">
                        <input
                              className={`${styles["form-check-input"]}  mr-2`}
                              type="radio"
                              name="profession"
                              id="profession1"
                              value="Ja"
                              onChange={handleChange}
                              checked={profession === "Ja"}
                              // onClick={() => setCurrentStep((prevStep) => prevStep + 1)}
                            />
                            <label
                              className={`${styles["form-check-label"]} ${styles["profession-btn"]} ${styles["radio-btn"]} ${
                                profession === "Ja" ? styles["black"] : ""
                              } flex flex-col items-center justify-center text-center gap-2`}
                              htmlFor="profession1"
                            >
                             <img src="/images/emp.svg" alt="icon"/>
                              <p>Angestellt</p>
                            </label>
                          </div>
                          <div className="col-span-1 flex items-center">
                            <input
                              className={`${styles["form-check-input"]} ${styles["profession-btn"]} mr-2`}
                              type="radio"
                              name="profession"
                              id="profession2"
                              value="Nein"
                              onChange={handleChange}
                              checked={profession === "Nein"}
                              // onClick={() => setCurrentStep((prevStep) => prevStep + 1)}
                            />
                            <label
                              className={`${styles["form-check-label"]} ${styles["profession-btn"]} ${styles["radio-btn"]} ${
                                profession === "Nein" ? styles["black"] : ""
                              } flex flex-col items-center justify-center text-center gap-2`}
                              htmlFor="profession2"
                            >
                              <img src="/images/self-emp.svg" alt="icon" />
                              <p>Selbstsändig</p>
                              
                            </label>
                            
                        </div>
                        {errors.profession && <p className="text-red-500 text-sm">{errors.profession}</p>}
                    </div>
                  

  
                    <div className="flex justify-between mt-10">
                        <button
                          type="button"
                          className="bg-gray-300 text-gray-700 px-4 py-2 rounded-lg"
                          onClick={() => {
                            setCurrentStep(2); 
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
                                setCurrentStep((prevStep) => prevStep + 1);
                              }
                            }}
                          >
                            Weiter
                          </button>
                        </div>
                    </div> 
                         
                </div>
              </div>
            </div>
          </div>
  );
};

export default StepFourInner;
