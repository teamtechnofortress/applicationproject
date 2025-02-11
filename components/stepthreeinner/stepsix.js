import { useEffect, useState } from "react";
import styles from "@/styles/latest.module.css";

const StepSixInner = ({
  mietschuldenfreiheitimg, 
  setMietschuldenfreiheitimg, 
  setComponents,
  handleChange,
  currentStep,
  setCurrentStep,
}) => {
  const [errors, setErrors] = useState({});
  const [isTipModal, setisTipModal] = useState(false);

  const removeImage = (index) => {
    setMietschuldenfreiheitimg((prevImages) => (prevImages || []).filter((_, i) => i !== index)); // Safeguard against undefined
  };

  setCurrentStep(19);

  return (
    <div className="flex items-center justify-center">
      <div className="w-full bg-white shadow-lg rounded-lg p-6">
        <p className={`${styles["main-heading"]} mt-10 text-center font-bold`}>
          Mietschuldenfreiheit
        </p>
        <p className={`${styles["p-address"]} mb-10 text-center w-[60%] mx-auto`}>
          Diese kannst du auch später hochladen, solltest du sie gerade nicht zur Hand haben.
        </p>
        <button
        type="button" 
        className={`${styles["tips"]} mx-auto`}
        id="tip_btn"
        onClick={() => setisTipModal(true)}>
        <img src="/images/tip.svg" alt="Tip Icon" /> <span>Tipps</span>
      </button>

        <div className="flex flex-col mt-10 items-center justify-center w-[40%] mx-auto">
        <label
          htmlFor="image-upload"
          className={`${styles["upload-btn"]} ${styles["form-input"]} w-full px-4 py-2 text-center text-black rounded-lg cursor-pointer`}
        >
          <i className="fa fa-upload mr-2"></i>
          Upload der Mitschuldenfreiheit
        </label>
        <input
          name="mietschuldenfreiheitimg"
          type="file"
          id="image-upload"
          className="hidden"
          multiple
          accept="image/*, application/pdf"
          onChange={handleChange}
        />
        <div className="mt-4 grid grid-cols-3 gap-4">
          {mietschuldenfreiheitimg.map((src, index) => (
            <div key={index} className="relative w-24 h-24">
              <img
                src={src}
                alt={`Uploaded Preview ${index + 1}`}
                className="object-cover w-full h-full rounded-lg"
              />
              <button
                type="button"
                className="absolute top-1 right-1 bg-red-500 text-white p-1 rounded-full text-xs"
                onClick={() => removeImage(index)}
              >
                ×
              </button>
            </div>
          ))}
        </div>
      </div>

        <div className="flex justify-between mt-10">
          <button
            type="button"
            className="bg-gray-300 text-gray-700 px-4 py-2 rounded-lg"
            onClick={() => setCurrentStep(18)}
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
                <div> Achte auch hier auf die Gültigkeit der Mietschuldenfreiheitsbescheinigung, diese sollte in der Regel nicht älter als 3 Monate sein und die gleiche Adresse aufweisen die auch auf deinem Ausweis und den Gehaltsnachweisen zu finden ist.</div>
              </div>
            </div>
          </div>
        )}
    </div>
  );
};

export default StepSixInner;
