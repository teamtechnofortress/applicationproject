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
  const [isTipModal, setisTipModal] = useState(false);
  // Set the default open index to 0 (first FAQ item)
  const [openIndex, setOpenIndex] = useState(0);
  // Toggle Accordion Item
  const toggleAccordion = (index) => {
    setOpenIndex(openIndex === index ? null : index); // Close if already open, else open
  };
  const validateFields = () => {
    const newErrors = {};
    const safeTrim = (value) => (value && typeof value === "string" ? value.trim() : "");

    if (!safeTrim(mietschuldenfreiheit)) newErrors.pets = "Mietschuldenfreiheit is required.";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0; // Return true if no errors
  };

  setCurrentStep(18);

  return (
    <div className="flex items-center justify-center">
      <div className="w-full bg-white shadow-lg rounded-lg p-6">
        <p className={`${styles["main-heading"]} mt-10 text-center font-bold`}>
        Mietschuldenfreiheitsbescheinigung
        </p>

        <button
              type="button" 
              className={`${styles["tips"]} mx-auto`}
              id="tip_btn"
              onClick={() => setisTipModal(true)}>
              <img src="/images/tip.svg" alt="Tip Icon" /> <span>Tipps</span>
            </button>
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
                          onClick={() => setCurrentStep((prevStep) => prevStep + 2)}
                        />
                        <label
                          className={`${styles["form-check-label"]} ${styles["radio-btn"]} ${
                            mietschuldenfreiheit === "Nein" ? styles["black"] : ""
                          }`}
                          htmlFor="mietschuldenfreiheit2"
                        >
                          Nein
                        </label>
                        {errors.mietschuldenfreiheit && <p className="text-red-500 text-sm">{errors.mietschuldenfreiheit}</p>}
                    </div>
              </div>
                  

        <div className="flex justify-between mt-10">
          <button
            type="button"
            className="bg-gray-300 text-gray-700 px-4 py-2 rounded-lg"
            onClick={() => setCurrentStep(17)}
          >
            Zurück
          </button>

          <div className="col-span-2">
            <button
              type="button"
              className={`${styles["next-btn"]} text-white px-6 py-3 rounded-lg`}
              onClick={() => {
                if (validateFields()) {
                  if (mietschuldenfreiheit === "Nein") {
                    setCurrentStep((prevStep) => prevStep + 2);
                  } else {
                    setCurrentStep((prevStep) => prevStep + 1);
                  }
                }
              }}
            >
              Weiter
            </button>
          </div>
        </div>
      </div>
       {/* Modal - Conditional Rendering */}
       {isTipModal && (
         <div
         id="tip-modal"
         className="fixed inset-0 bg-gray-600 bg-opacity-50 flex justify-center items-center z-50 text-gray-900 dark:text-white"
         onClick={() => setisTipModal(false)} 
       >
         
         <div
           className={`${styles["tip_bg"]} relative p-4 w-full max-w-2xl max-h-full bg-white rounded-lg shadow text-gray-900`}
           onClick={(e) => e.stopPropagation()}
         >
           <div className="p-4 md:p-5 rounded-t justify-between items-center relative">
           <button
               type="button"
               className="text-gray-700 hover:text-gray-900 text-lg font-bold absolute top-0 right-0"
               onClick={() => setisTipModal(false)}
             >
               ✖
             </button>
             <h3 className={`${styles["modal-h3"]}`}>
               <div className="flex gap-4 justify-center">
               <img className="" src="/images/tip.svg" alt="Tip Icon" /> Tipps zur Bewerbung
               </div>
           
             </h3>
           
           </div>
              <div className="p-4 md:p-5 space-y-4">
                 {/* FAQ Item 1 */}
                 <div className={`${styles['faq-item']} p-4`}>
                        <button
                         type="button" 
                          onClick={() => toggleAccordion(0)}
                          className="w-full text-left font-semibold text-xl rounded-lg flex items-center gap-3"
                        >
                           <span className={`${styles['open_faq']}`}>
                            {openIndex === 0 ? '-' : '+'}
                          </span>
                          <span className={`${styles['faq-title']}`}>Tipp 1</span>
                         
                        </button>
                        {openIndex === 0 && (
                          <div className={`${styles['faq-txt']}  mt-2 rounded-lg`}>
                            <p>
                            Die Mietschuldenfreiheitsbescheinigung ist essenziell für deine Bewerbung! Falls du keine von deiner Hausverwaltung bekommst oder noch auf eine Antwort wartest, kannst du vorübergehend deine letzten Mietzahlungen aus dem Onlinebanking beifügen. Beachte aber, dass dies keine offizielle Bescheinigung ersetzt und nur ungern akzeptiert wird.</p>
                          </div>
                        )}
                  </div>
                    <hr/>
                  {/* FAQ Item 2 */}
                  <div className={`${styles['faq-item']}  p-4`}>
                    <button
                      type="button"
                      onClick={() => toggleAccordion(1)}
                      className="w-full text-left font-semibold text-xl rounded-lg flex items-center gap-3"
                    >
                        <span className={`${styles['open_faq']}`}>
                        {openIndex === 1 ? '-' : '+'}
                      </span>
                      <span className={`${styles['faq-title']}`}>Tipp 2</span>
                      
                    </button>
                    {openIndex === 1 && (
                      <div className={`${styles['faq-txt']}  mt-2 rounded-lg`}>
                        <p>
                        Viele Mieter zögern, ihren aktuellen Vermieter nach einer Mietschuldenfreiheitsbescheinigung zu fragen – aus Sorge vor Nachteilen. Doch oft profitieren Vermieter von einem Auszug, da sie die Wohnung teurer neu vermieten können. Scheue dich also nicht, danach zu fragen!</p>
                      </div>
                    )}
                  </div>
                  <hr/>
                  {/* FAQ Item 3 */}
                  <div className={`${styles['faq-item']}  p-4`}>
                    <button
                      type="button"
                      onClick={() => toggleAccordion(2)}
                      className="w-full text-left font-semibold text-xl rounded-lg flex items-center gap-3"
                    >
                        <span className={`${styles['open_faq']}`}>
                        {openIndex === 2 ? '-' : '+'}
                      </span>
                      <span className={`${styles['faq-title']}`}>Tipp 3</span>
                      
                    </button>
                    {openIndex === 2 && (
                      <div className={`${styles['faq-txt']}  mt-2 rounded-lg`}>
                        <p>
                        Achte auf die Gültigkeit deiner Mietschuldenfreiheitsbescheinigung – sie sollte nicht älter als 3 Monate sein und die gleiche Adresse enthalten wie dein Ausweis und deine Gehaltsnachweise.</p>
                      </div>
                    )}
                  </div>
              </div>
            </div>
          </div>
        )}
    </div>
  );
};

export default StepFiveInner;
