import { useEffect, useState } from "react";
import styles from "@/styles/latest.module.css";

const StepNineInner = ({
  setComponents,
  handleChange,
  currentStep,
  setCurrentStep,
}) => {
  const [isTipModal, setisTipModal] = useState(false);
  const [openIndex, setOpenIndex] = useState(0); // ✅ For FAQ accordion
  setCurrentStep(22);
   // Function to copy text
   const handleCopy = () => {
    const textToCopy = `
      Hallo [Name des Hauptmieters], 
      
      ich benötige für meinen neuen Vermieter eine Mietschuldfreiheitsbescheinigung.
      
      Könntest du mir bitte bestätigen, dass ich während meiner Zeit als Untermieter immer pünktlich und vollständig meine Miete gezahlt habe?
      
      Vielen Dank im Voraus für deine Hilfe!
    `;

    navigator.clipboard.writeText(textToCopy).then(() => {
      alert("Text wurde kopiert!");
    }).catch(err => {
      console.error("Fehler beim Kopieren des Textes: ", err);
    });
  };

   // ✅ Toggle Accordion Item
 const toggleAccordion = (index) => {
  setOpenIndex(openIndex === index ? null : index);
};
  return (
    <div className="flex items-center justify-center">
      <div className="w-full bg-white shadow-lg rounded-lg">
        <p className={`${styles["main-heading"]} mt-10 text-center font-bold`}>
          Mietschuldenfreiheit
        </p>
        <p className={`${styles["p-address"]} mb-10 text-center w-[90%] lg:w-[60%] mx-auto`}>
          Untermieter
        </p>


        <button type="button" className={`${styles["tips"]} mx-auto`} onClick={() => setisTipModal(true)}>
          <img src="/images/tip.svg" alt="Tip Icon" /> <span>Tipps zur Bewerbung</span>
        </button>

        <p className={`${styles["p-address"]} mt-10 mb-10 text-center w-[80%] lg:w-[60%] mx-auto`}>
        Kopiere diesen Text und sende ihn an deine Hauptmieter.
        </p>
        <div className={`${styles["static-section"]} w-[90%] lg:w-[70%] mx-auto`}>
              <p className={`${styles["p-address"]}`}>
              Hallo [Name des Hauptmieters], 
              </p>
              <p className={`${styles["p-address"]} mt-2 w-[80%]`}>
              ich benötige für meinen neuen Vermieter eine Mietschuldfreiheitsbescheinigung.
              </p>
              <p className={`${styles["p-address"]} mt-2 w-[80%]`}>
              Könntest du mir bitte bestätigen, dass ich während meiner Zeit als Untermieter immer pünktlich und vollständig meine Miete gezahlt habe?
              </p>
              <p className={`${styles["p-address"]} mt-2`}>
              Vielen Dank im Voraus für deine Hilfe!
              </p>

              <button className={`${styles["p-copy"]} text-end mt-2`} type="button"
               onClick={handleCopy}>
              <img src="/images/copy-right.svg" alt="Tip Icon" />
              Text kopieren
            </button>
        </div>
     
        <div className="w-full flex justify-center">
        <a href="/mietschuldenfreiheitsbescheinigung_wohnungsmappe.pdf" className={`${styles["download-btn"]}  w-[80%] lg:w-[30%] mt-8 text-center`} download>
            <button type="button">
                Hier Vorlage downloaden
            </button>
        </a>
        </div>
                  

        <div className="flex justify-between mt-10 p-6">
          <button
            type="button"
            className="bg-gray-300 text-gray-700 px-4 py-2 lg:py-3 rounded-lg"
            onClick={() => setCurrentStep(20)}
          >
            Zurück
          </button>

          <div className="col-span-2">
            <button
             type="submit"
              className={`${styles["next-btn"]} text-white px-6 py-2 lg:py-3 rounded-lg`}
              // onClick={() => setCurrentStep(23)}
            >
             Weiter
            </button>
          </div>
        </div>
      </div>
      {/* ✅ Modal - Conditional Rendering */}
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
                            Solltest du noch bei deinen Eltern wohnen können diese dir ganz einfach mit der unten zum Download verfügbaren vorlage deine Mietschuldenfreiheit bescheinigen.</p>
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
                        Gleiches gilt für Untermieter die in einer WG oder als Pärchen gewohnt haben, hier kann der jeweilige im Hauptmietvertrag verankerte Mieter dir ganz einfach deine Mietschuldenfreiheit bescheinigen. Nutze auch hier unsere vorlage um schenller zu deiner perfekten Bewerbung zu kommen.</p>
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

export default StepNineInner;
