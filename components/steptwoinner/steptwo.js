import { useEffect, useState } from "react";
import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css";
import styles from "@/styles/latest.module.css";

const StepTwoInner = ({
  coverletter, setComponents, handleChange,currentStep,setCurrentStep
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
            <button
              type="button" 
              className={`${styles["tips"]} mx-auto`}
              id="tip_btn"
              onClick={() => setisTipModal(true)}>
              <img src="/images/tip.svg" alt="Tip Icon" /> <span>Tipps</span>
            </button>
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
                            Solltest du in deinen Unterlagen irgendwelche unstimmigkeiten haben erkläre diese zwingend in dem Anschreiben. Beispiele hierfür könnten zum Beispiel verschwiedene Adressen auf der Schufa, dem Ausweis und den Gehaltsnachweisen sein.
                            </p>
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
                        Gehe in dem Anschreiben auch auf deine Berufliche Situation ein, schildere deinen aktuellen stand und beschreibe deine position in dem Unternehmen sofern diese qualifikationen benötigt die für einen Vermiter interessant sein könnten                             </p>
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
                        Sage in dem Anschreiben auch, das die die Gegend sehr zusagt und dich hier wohlfühlen würdest. Dies kannst du auch gerne verallgemeinern und für mehrere Wohnung benutzten für die du dich bewirbst.                        </p>
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

export default StepTwoInner;
