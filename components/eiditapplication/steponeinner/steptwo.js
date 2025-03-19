import { useEffect, useState } from "react";
import styles from "@/styles/latest.module.css";

const StepTwoInner = ({
  vorname,
  nachname,
  strabe,
  postleitzahl,
  hausnummer,
  ort,
  setCurrentStep,
  handleChange,
}) => {
  const [errors, setErrors] = useState({});
  const [isTipModal, setisTipModal] = useState(false);

  const validateFields = () => {
    const newErrors = {};
    const safeTrim = (value) => (value && typeof value === "string" ? value.trim() : "");

    if (!safeTrim(strabe)) newErrors.strabe = "Address is required.";
    if (!safeTrim(postleitzahl)) newErrors.postleitzahl = "Postleitzahl is required.";
    if (!safeTrim(hausnummer)) newErrors.hausnummer = "Hausnummer is required.";
    if (!safeTrim(ort)) newErrors.ort = "Ort is required.";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0; // Return true if no errors
  };
  setCurrentStep(1);

  return (
    <div className="flex justify-center">
    <div className="w-full max-w-lg">
      <div className="grid grid-cols-1 gap-4 mt-3 mb-3">
        <div>
        <p className={`${styles["main-heading"]} mt-10 mb-4 text-center`}>
         
        Hallo {vorname} {nachname}, schön dich kennenzulernen
        </p>   
        <p className={`${styles["p-address"]} mb-10 text-center`}>
          Wie lautet deine aktuelle Adresse?
        </p> 
        <button
          type="button"
          className={`${styles["tips"]} mx-auto`}
          id="tip_btn"
          onClick={() => setisTipModal(true)}>
          <img src="/images/tip.svg" alt="Tip Icon" /> <span>Tipps</span>
        </button>    
          <div className="input-field mt-2">
            <input
              type="text"
              className={`${styles["form-input"]} form-control `}
              id="strabe"
              name="strabe"
              placeholder="Straße"
              value={strabe}
              onChange={handleChange}
            />
            {errors.strabe && <p className="text-red-500 text-sm">{errors.strabe}</p>}
          </div>
          <div className="input-field mt-10">
            <input
              type="text"
              className={`${styles["form-input"]} form-control `}
              id="postleitzahl"
              name="postleitzahl"
              placeholder="postleitzahl"
              value={postleitzahl}
              onChange={handleChange}
            />
            {errors.postleitzahl && <p className="text-red-500 text-sm">{errors.postleitzahl}</p>}
          </div>
          <div className="input-field mt-10">
            <input
                type="text"
                className={`${styles["form-input"]} form-control `}
                id="hausnummer"
                name="hausnummer"
                placeholder="Hausnummer"
                value={hausnummer}
                onChange={handleChange}
              />
            {errors.hausnummer && <p className="text-red-500 text-sm">{errors.hausnummer}</p>}
          </div>
          <div className="input-field mt-10">
          <input
                type="text"
                className={`${styles["form-input"]} form-control `}
                id="ort"
                name="ort"
                placeholder="Ort"
                value={ort}
                onChange={handleChange}
              />
               {errors.ort && <p className="text-red-500 text-sm">{errors.ort}</p>}
          </div>
        </div>
      </div>

      <div className="flex justify-between mt-10">
          <button
            type="button"
            className="bg-gray-300 text-gray-700 px-4 py-2 rounded-lg"
            onClick={() => {
              setCurrentStep(0); 
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
                setCurrentStep(2); 
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
                  <img className="" src="/images/tip.svg" alt="Tip Icon" /> Tipp
                  </div>
                </h3>
              </div>
              <div className="p-4 md:p-5 space-y-4">
                <div>Achte darauf, dass die Adresse die du hier angibst die selbe ist wie auf deinem Ausweis und deiner Schufa sowie auf deinen Gehaltsnachweisen. Sollten es bei den Adressen Abweichungen geben erkläre diese Unbedingt in deinem Anschreiben !!!</div>
              </div>
            </div>
          </div>
        )}
  </div>
  );
};

export default StepTwoInner;
