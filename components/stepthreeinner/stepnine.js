import { useEffect, useState } from "react";
import styles from "@/styles/latest.module.css";

const StepNineInner = ({
  setComponents,
  handleChange,
  currentStep,
  setCurrentStep,
}) => {
  const [errors, setErrors] = useState({});

  setCurrentStep(19);

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
        Als Untermieter kannst du eine Mietschuldfreiheit nicht direkt vom Hauptvermieter beantragen, da dein Mietverhältnis mit dem Hauptmieter besteht. Stattdessen musst du dich an deinen Hauptmieter wenden.
        </p>
        <div className={`${styles["static-section"]} `}>
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
        </div>
     
        <p className={`${styles["p-address"]} mb-10 mt-20 text-center w-[60%] mx-auto`}>
        Der Hauptmieter sollte dir schriftlich bestätigen, dass du alle Mietzahlungen ordnungsgemäß geleistet hast. Eine formlose Bescheinigung reicht oft aus. Lade diese bitte hier hoch!
        </p>
                  

        <div className="flex justify-between mt-10 p-6">
          <button
            type="button"
            className="bg-gray-300 text-gray-700 px-4 py-2 rounded-lg"
            onClick={() => setCurrentStep(16)}
          >
            Zurück
          </button>

          <div className="col-span-2">
            <button
              type="button"
              className={`${styles["next-btn"]} text-white px-6 py-3 rounded-lg`}
              onClick={() => setCurrentStep(20)}
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
