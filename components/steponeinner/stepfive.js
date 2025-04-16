import { useEffect, useState } from "react";
import styles from "@/styles/latest.module.css";

const StepFiveInner = ({
  profession,
  ausgeubterBeruf,
  arbeitgeber,
  employment,
  income,
  setCurrentStep,
  handleChange,
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

    // if (!safeTrim(ausgeubterBeruf)) newErrors.ausgeubterBeruf = "Ausgeübter Beruf is required.";
    // if (!safeTrim(arbeitgeber)) newErrors.arbeitgeber = "Arbeitgeber is required.";
    // if (!safeTrim(income)) newErrors.income = "Monatliches is required.";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0; // Return true if no errors
  };
  setCurrentStep(4);

  return (
    <div className="flex justify-center">
            <div className="w-full max-w-lg">
              <div className="grid grid-cols-1 gap-4 mt-3 mb-3">
                <div>
                    <p className={`${styles["main-heading"]} mt-10 mb-10 text-center font-bold`}>
                      Wo arbeitest du?
                    </p>  
                    <button
                    type="button" 
                    className={`${styles["tips"]} mx-auto mb-10`}
                    id="tip_btn"
                    onClick={() => setisTipModal(true)}>
                    <img src="/images/tip.svg" alt="Tip Icon" /> <span>Tipps</span>
                  </button>      
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mt-5">
                      <div className="...">
                        <div className="input-field">
                          <input
                            type="text"
                            className={`${styles["ausgeubterBeruf"]} form-input `}
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
                    <div className="input-field mt-5 lg:mt-10">
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
                    {profession === "Ja" && (
                       <>
                        <p className={`${styles["p-address"]} mt-10 lg:mt-20 mb-10 text-center`}>
                        Besteht das Beschäftigungsverhältnis länger, als 6 Monate?
                        </p> 
                        <div className="grid grid-cols-2 mt-5 gap-10 w-[90%] lg:w-[60%] mx-auto">
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
                        </>
                      )}
                  
                  {profession === "Ja" && (
                    <>
                    <div className="flex justify-between mt-10">
                    <button type="button" className="bg-gray-300 text-gray-700 px-4 py-2 lg:py-3 rounded-lg"
                          onClick={() => {
                            setCurrentStep(3); 
                          }}
                            > Zurück 
                    </button>
                    <button type="button" className="bg-gray-300 text-gray-700 px-4 py-2 lg:py-3 rounded-lg"
                          onClick={() => {
                            if (validateFields()) {
                            setCurrentStep(8); // Correctly update the step state
                            }}}> Überspringen 
                    </button>
                        
                    </div>
                    </>
                   )}   
                   {profession === "Nein" && (
                    <>
                    <div className="flex justify-between mt-10">
                    <button type="button" className="bg-gray-300 text-gray-700 px-4 py-2 lg:py-3 rounded-lg"
                          onClick={() => {
                            setCurrentStep(3); 
                          }}
                            > Zurück 
                    </button>
                    <button type="button" className="bg-gray-300 text-gray-700 px-4 py-2 lg:py-3 rounded-lg"
                          onClick={() => {
                            if (validateFields()) {
                            setCurrentStep(6); // Correctly update the step state
                            }}}> Next
                    </button>
                        
                    </div>
                    </>
                   )}   
                </div>
              </div>
            </div>
            {profession === "Ja"  && isTipModal && (
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
                              Achte darauf, die drei aktuellsten Gehaltsnachweise hochzuladen. Bist du verbeamtet? Dann reicht die letzte Änderungsbescheinigung mit einem entsprechenden Hinweis                             </p>
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
                          Hast du neben dem Grundgehalt noch Provisionen oder Zuschläge? Erkläre diese im Anschreiben kurz – so vermeidest du Rückfragen
                          </p>
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
                          Schwärze persönliche Daten auf deinen Gehaltsnachweisen (z. B. Personalnummer, Urlaubstage, Kontonummer) – so schützt du deine Privatsphäre. Sieh dir das Beispielfoto an.
                            </p>
                        </div>
                      )}
                    </div>
                    <hr/>
                    {/* FAQ Item 4 */}
                    <div className={`${styles['faq-item']}  p-4`}>
                      <button
                        type="button"
                        onClick={() => toggleAccordion(3)}
                        className="w-full text-left font-semibold text-xl rounded-lg flex items-center gap-3"
                      >
                          <span className={`${styles['open_faq']}`}>
                          {openIndex === 3 ? '-' : '+'}
                        </span>
                        <span className={`${styles['faq-title']}`}>Tipp 4</span>
                        
                      </button>
                      {openIndex === 3 && (
                        <div className={`${styles['faq-txt']}  mt-2 rounded-lg`}>
                          <p>
                          Lade, wenn möglich, die Original-PDFs deiner Gehaltsnachweise hoch – so bleibt die Qualität erhalten. Fotografierst du sie ab, achte auf eine gerade und saubere Aufnahme, damit alles gut lesbar ist.</p>
                        </div>
                      )}
                    </div>
                </div>
              </div>
              </div>
            )}
            {profession === "Nein"  && isTipModal && (
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
                      <img className="" src="/images/tip.svg" alt="Tip Icon" /> Tipp
                      </div>
                  
                    </h3>
                  
                  </div>

                  <div className="p-4 md:p-5 space-y-4">
                    <div>Trage hier den Namen deiner Firma oder Personengesellschaft ein, mit der du selbstständig tätig bist</div>
                  </div>
                </div>
              </div>
            )}
          </div>
  );
};

export default StepFiveInner;
