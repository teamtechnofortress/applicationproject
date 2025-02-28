import { useEffect, useState } from "react";
import styles from "@/styles/latest.module.css";

const StepEightInner = ({
  setComponents,
  handleChange,
  currentStep,
  setCurrentStep,
}) => {
  const [errors, setErrors] = useState({});

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
        <p className={`${styles["p-address"]} mb-10 text-center w-[60%] mx-auto`}>
          Hauptmieter
        </p>

        <p className={`${styles["p-address"]} mt-20 mb-10 text-center w-[60%] mx-auto`}>
        Als Mieter kannst du einfach diesen Text kopieren und an deine Hausverwaltung senden. In der Regel erhältst du innerhalb von drei Tagen einen Brief mit deiner Mietschuldenfreiheitsbescheinigung.
        </p>
        <div className={`${styles["static-section"]} w-[70%] mx-auto`}>
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
     
        <p className={`${styles["p-address"]} mb-10 mt-20 text-center w-[60%] mx-auto`}>
          Lade diese bitte anschließend hier hoch!
        </p>
        <p className={`${styles["p-address"]} mb-10 text-center w-[60%] mx-auto`}>
          Tipp: Plane ein, dass dieser Service bei deiner Hausverwaltung 5–25 € kosten kann, etwa 3–6 Werktage dauert und meist per Post verschickt wird. Manchmal wird die Bescheinigung auch als Vermieterbescheinigung bezeichnet.
        </p>
                  

        <div className="flex justify-between mt-10 p-6">
          <button
            type="button"
            className="bg-gray-300 text-gray-700 px-4 py-2 rounded-lg"
            onClick={() => setCurrentStep(19)}
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

export default StepEightInner;
