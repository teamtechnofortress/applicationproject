import { useEffect, useState, useRef } from "react";
import styles from "@/styles/latest.module.css";

const StepTwoInner = ({
  fläche,
  zimerzahl,
  imageswbs, 
  setImageswbs, 
  setComponents,
  handleChange,
  currentStep,
  setCurrentStep,
}) => {
  const [errors, setErrors] = useState({});
  const [isTipModal, setisTipModal] = useState(false);
  const fileInputRef = useRef(null); // Add a ref for file input

  const handleFileChange = (event) => {
    const file = event.target.files[0]; 
    if (file) {
      setImageswbs(file); 
    }
  };

  const removeImage = () => {
    setImageswbs(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = ""; // Reset file input field
    }
  };

  setCurrentStep(15);
  if(setCurrentStep(15)){
    thirdStepComponent=0;
  }

  return (
    <div className="flex items-center justify-center">
      <div className="w-full bg-white shadow-lg rounded-lg p-6">
        <p className={`${styles["main-heading"]} mt-10 text-center font-bold`}>
          Wohnberechtigungsschein
        </p>
        <p className={`${styles["p-address"]} mb-10 text-center w-[60%] mx-auto`}>
          falls erforderlich
        </p>
        <button
        type="button" 
        className={`${styles["tips"]} mx-auto`}
        id="tip_btn"
        onClick={() => setisTipModal(true)}>
        <img src="/images/tip.svg" alt="Tip Icon" /> <span>Tipps</span>
      </button>
        <div className="grid grid-cols-1 gap-4 mt-3 mb-3 w-[40%] mx-auto">
          <div>
            <p className={`${styles["p-address"]} mt-10 mb-10 text-center`}>
              Hast du einen Wohnberechtigungsschein?
            </p>
            <div className="grid grid-cols-2 gap-4 mt-5">
              <div className="...">
                <div className="input-field">
                  <input
                    type="text"
                    className={`${styles["form-input"]} form-input`}
                    id="fläche"
                    name="fläche"
                    placeholder="Fläche (qm)"
                    value={fläche}
                    onChange={handleChange}
                  />
                </div>
              </div>
              <div className="...">
                <div className="input-field">
                  <input
                    type="text"
                    className={`${styles["form-input"]} form-input`}
                    id="zimerzahl"
                    name="zimerzahl"
                    placeholder="Zimerzahl"
                    value={zimerzahl}
                    onChange={handleChange}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

       <div className="flex flex-col  w-[40%] justify-center mx-auto">
            <label
              htmlFor="image-upload"
              className={`${styles["upload-btn"]} ${styles["form-input"]} w-full px-4 py-2 text-center text-black rounded-lg cursor-pointer`}
            >
              <i className="fa fa-upload mr-2"></i> Upload WBS
            </label>
            <input
              type="file"
              id="image-upload"
              name="imageswbs"
              className="hidden"
              accept="image/*"
              ref={fileInputRef} // Attach ref here
              onChange={handleFileChange}
            />

            {/* Image Preview */}
            {imageswbs && (
              <div className="relative w-24 h-24 mt-4">
                <img src={URL.createObjectURL(imageswbs)} alt="Preview" className="w-full h-full object-cover rounded-lg" />
                <button
                  type="button"
                  className="absolute top-0 right-0 bg-red-500 text-white p-1 rounded-full text-xs"
                  onClick={removeImage}
                >
                  ×
                </button>
              </div>
            )}

        </div>

        <div className="flex justify-between mt-10">
          <button
            type="button"
            className="bg-gray-300 text-gray-700 px-4 py-2 rounded-lg"
            onClick={() => setCurrentStep(14)}
          >
            Zurück
          </button>

          <div className="col-span-2">
            <button
              type="button"
              className={`${styles["next-btn"]} text-white px-6 py-3 rounded-lg`}
              onClick={() => setCurrentStep(16)}
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
                <div>Achte darauf, dass die Adresse die du hier angibst die selbe ist wie auf deinem Ausweis und deiner Schufa sowie auf deinen Gehaltsnachweisen. Sollten es bei den Adressen Abweichungen geben erkläre diese Unbedingt in deinem Anschreiben !!!</div>
              </div>
            </div>
          </div>
        )}
    </div>
  );
};

export default StepTwoInner;
