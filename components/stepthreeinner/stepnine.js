import { useEffect, useState } from "react";
import styles from "@/styles/latest.module.css";

const StepNineInner = ({
  setComponents,
  handleChange,
  currentStep,
  setCurrentStep,
}) => {

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

  return (
    <div className="flex items-center justify-center">
      <div className="w-full bg-white shadow-lg rounded-lg">
        <p className={`${styles["main-heading"]} mt-10 text-center font-bold`}>
          Mietschuldenfreiheit
        </p>
        <p className={`${styles["p-address"]} mb-10 text-center w-[60%] mx-auto`}>
          Untermieter
        </p>

        <p className={`${styles["p-address"]} mt-20 mb-10 text-center w-[60%] mx-auto`}>
        Kopiere diesen Text und sende ihn an deine Hausverwaltung.
        </p>
        <div className={`${styles["static-section"]} w-[70%] mx-auto`}>
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
            <button type="button" className={`${styles["download-btn"]} w-[30%] mt-8`}>
                Hier Vorlage downloaden
            </button>
        </div>
                  

        <div className="flex justify-between mt-10 p-6">
          <button
            type="button"
            className="bg-gray-300 text-gray-700 px-4 py-2 rounded-lg"
            onClick={() => setCurrentStep(20)}
          >
            Zurück
          </button>

          <div className="col-span-2">
            <button
             type="submit"
              className={`${styles["next-btn"]} text-white px-6 py-3 rounded-lg`}
              // onClick={() => setCurrentStep(23)}
            >
             Weiter
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StepNineInner;
