import { useEffect, useState } from "react";
import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css";
import styles from "@/styles/latest.module.css";

const StepOneInner = ({
  vorname,
  nachname,
  geburtsdatum: initialGeburtsdatum,
  setCurrentStep,
  handleChange,
}) => {
  const [geburtsdatum, setGeburtsdatum] = useState(initialGeburtsdatum || "");
  const [errors, setErrors] = useState({});
  const [isTipModal, setisTipModal] = useState(false);

  const validateFields = () => {
    const newErrors = {};
    const safeTrim = (value) => (value && typeof value === "string" ? value.trim() : "");

    if (!safeTrim(vorname)) newErrors.vorname = "Vorname is required.";
    if (!safeTrim(nachname)) newErrors.nachname = "Nachname is required.";
    if (!safeTrim(geburtsdatum)) newErrors.geburtsdatum = "Geburtsdatum is required.";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0; // Return true if no errors
  };

  const handleNext = () => {
    if (validateFields()) {
      console.log("Validation passed. Proceeding to the next step...");
    } else {
      console.log("Validation failed.");
    }
  };

  useEffect(() => {
    const element = document.querySelector("#geburtsdatum");
    if (!element) return;

    // Initialize flatpickr
    const flatpickrInstance = flatpickr(element, {
      dateFormat: "Y-m-d", // Ensure format matches expected input
      defaultDate: geburtsdatum || null, // Set default date from state
      onChange: (selectedDates, dateStr) => {
        setGeburtsdatum(dateStr); // Update state on date selection
        handleChange({ target: { name: "geburtsdatum", value: dateStr } }); // Sync with parent
      },
    });

    return () => {
      if (flatpickrInstance) flatpickrInstance.destroy(); // Clean up instance
    };
  }, [geburtsdatum, handleChange]);

  return (
    <div className="flex justify-center">
      <div className="w-full max-w-lg">
        <p className={`${styles["main-heading"]}  mt-10 mb-10 text-center font-bold`}>
          Hey, wer bist du?
        </p>
        <button
        type="button" 
        className={`${styles["tips"]} mx-auto`}
        id="tip_btn"
        onClick={() => setisTipModal(true)}>
        <img src="/images/tip.svg" alt="Tip Icon" /> <span>Tipps</span>
      </button>
        <div className="grid grid-cols-1 gap-4 mt-3 mb-3">
          <div>
            <div className="input-field mt-2">
              <input
                type="text"
                className={`${styles["form-input"]} form-input`}
                id="vorname"
                name="vorname"
                placeholder="Vorname"
                value={vorname}
                onChange={handleChange}
              />
            </div>
            {errors.vorname && <p className="text-red-500 text-sm">{errors.vorname}</p>}

            <div className="input-field mt-10">
              <input
                type="text"
                className={`${styles["form-input"]} form-input`}
                id="nachname"
                name="nachname"
                placeholder="Nachname"
                value={nachname}
                onChange={handleChange}
              />
            </div>
            {errors.nachname && <p className="text-red-500 text-sm">{errors.nachname}</p>}

            <p className="mt-10">geboren am</p>
            <div className="input-field relative">
              <div
                className={`${styles["calender-svg"]} absolute inset-y-0 left-3 flex items-center pointer-events-none`}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6 text-gray-500"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M8 2a1 1 0 1 1 2 0v2h4V2a1 1 0 1 1 2 0v2h2a3 3 0 0 1 3 3v12a3 3 0 0 1-3 3H6a3 3 0 0 1-3-3V7a3 3 0 0 1 3-3h2V2Zm8 4V2h-4v4h4ZM4 9v10a1 1 0 0 0 1 1h14a1 1 0 0 0 1-1V9H4Zm2 2h2a1 1 0 1 1 0 2H6a1 1 0 1 1 0-2Zm5 0h6a1 1 0 1 1 0 2h-6a1 1 0 1 1 0-2Zm-5 4h2a1 1 0 1 1 0 2H6a1 1 0 1 1 0-2Zm5 0h6a1 1 0 1 1 0 2h-6a1 1 0 1 1 0-2Z" />
                </svg>
              </div>

              <input
                type="text"
                className={`pl-10 ${styles["form-input"]} form-control w-full border border-gray-300 rounded-lg py-2 z-20`}
                id="geburtsdatum"
                name="geburtsdatum"
                placeholder="Geburtsdatum"
                value={geburtsdatum}
                onChange={(e) => setGeburtsdatum(e.target.value)}
              />
            </div>
            {errors.geburtsdatum && (
              <p className="text-red-500 text-sm">{errors.geburtsdatum}</p>
            )}
          </div>
        </div>

        <button
          type="button"
          className={`${styles["next-btn"]} mt-10 px-6 py-3 rounded-lg bg-blue-500 mx-auto block flex items-center justify-between`}
          onClick={() => {
            if (validateFields()) {
              setCurrentStep(1);
            }
          }}
        >
          <span className="mr-4">Weiter</span>
          <span className="text-2xl font-bold">&rarr;</span>
        </button>


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
                <div>Achte darauf, dass die Adresse die du hier angibst die selbe ist wie auf deinem Ausweis und deiner Schufa sowie auf deinen Gehaltsnachweisen. Sollten es bei den Adressen Abweichungen geben erkläre diese Unbedingt in deinem Anschreiben !!!</div>
              </div>
            </div>
          </div>
        )}

    </div>
  );
};

export default StepOneInner;
