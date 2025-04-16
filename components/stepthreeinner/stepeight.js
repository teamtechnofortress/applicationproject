import { useEffect, useState } from "react";
import styles from "@/styles/latest.module.css";

const StepEightInner = ({
  setComponents,
  handleChange,
  currentStep,
  setCurrentStep,
}) => {
  const [errors, setErrors] = useState({});
  const [isTipModal, setisTipModal] = useState(false);

  setCurrentStep(21);
  // Function to copy text
  const handleCopy = () => {
    const textToCopy = `
    Sehr Geehrte Hausverwaltung XY,

    hiermit bitte ich um eine aktuelle Mietschuldenfreiheitsbescheinigung aus dem bestehenden Mietverhältnis der folgenden Adresse: Name, Straße, PLZ, Lage der Wohnung( zB: 4 OG links und Mieternummer). Bitte nehmen Sie folgende Stichpunkte mit auf: Daten des Vermieters, Daten des Mieters, Dauer des Mietverhältnis, Bestätigung der Pünktlichen Mietzahlung oder eventuelle Rückstände, Ort Datum Unterschrift und Stempel der Vermieter/Verwaltung.
    
    Mit freundlichen Grüßen
    
    Name
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
        <p className={`${styles["p-address"]} mb-10 text-center w-[90%] lg:w-[60%] mx-auto`}>
          Hauptmieter
        </p>

        <button type="button" className={`${styles["tips"]} mx-auto`} onClick={() => setisTipModal(true)}>
          <img src="/images/tip.svg" alt="Tip Icon" /> <span>Tipps zur Bewerbung</span>
        </button>

        <p className={`${styles["p-address"]} mt-10 mb-10 text-center w-[80%] lg:w-[60%] mx-auto`}>
        Kopiere diesen Text und sende ihn an deine Hausverwaltung .
        </p>
        <div className={`${styles["static-section"]} w-[90%] lg:w-[70%] mx-auto`}>
            <p className={`${styles["p-address"]}`}>
              Sehr Geehrte Hausverwaltung XY, 
            </p>
            <p className={`${styles["p-address"]} mt-2 w-[80%]`}>
            hiermit bitte ich um eine aktuelle Mietschuldenfreiheitsbescheinigung aus dem bestehenden Mietverhältnis der folgenden Adresse: Name, Straße, PLZ, Lage der Wohnung( zB: 4 OG links und Mieternummer). Bitte nehmen Sie folgende Stichpunkte mit auf: Daten des Vermieters, Daten des Mieters, Dauer des Mietverhältnis, Bestätigung der Pünktlichen Mietzahlung oder eventuelle Rückstände, Ort Datum Unterschrift und Stempel der Vermieter/Verwaltung.
            </p>
            <p className={`${styles["p-address"]} mt-2`}>
               Mit freundlichen Grüßen 
            </p>
            <p className={`${styles["p-address"]} mt-2`}>
              Name
            </p>
            <button className={`${styles["p-copy"]} text-end mt-2`} type="button"
               onClick={handleCopy}>
              <img src="/images/copy-right.svg" alt="Tip Icon" />
              Text kopieren
            </button>
        </div>
        <div className="w-full flex justify-center">
        <a href="/mietschuldenfreiheitsbescheinigung_wohnungsmappe.pdf" className={`${styles["download-btn"]} w-[80%] lg:w-[30%] mt-8 text-center`} download>
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

            <div className="p-4 space-y-4">
              <p>Plane ein, dass dieser Service bei deiner Hausverwaltung oder deinem aktuellen Vermieter ca. 5–25 € kosten kann. Die Erstellung dauert in der Regel 3–6 Werktage und wird per Post verschickt. Manchmal wird dieses Schreiben auch als Vermieterbescheinigung bezeichnet.</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default StepEightInner;
