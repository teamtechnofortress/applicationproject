import { useEffect, useState } from "react";
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

  const removeImage = (index) => {
    setImageswbs((prevImages) => (prevImages || []).filter((_, i) => i !== index)); // Safeguard against undefined
  };

  setCurrentStep(12);
  if(setCurrentStep(12)){
    thirdStepComponent=0;
  }

  return (
    <div className="flex items-center justify-center">
      <div className="w-full bg-white shadow-lg rounded-lg p-6">
        <p className={`${styles["main-heading"]} mt-10 text-center font-bold`}>
          Wohnberechtigungsschein
        </p>
        <p className={`${styles["p-address"]} mb-10 text-center w-[60%] mx-auto`}>
          Subheadline
        </p>
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
                    placeholder="fläche"
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

        <div className="flex flex-col mt-10 items-center justify-center w-[40%] mx-auto">
        <label
          htmlFor="image-upload"
          className={`${styles["upload-btn"]} ${styles["form-input"]}  w-full px-4 py-2 text-center text-black rounded-lg cursor-pointer`}
        >
          <i className="fa fa-upload mr-2"></i>
          Uploads WBS
        </label>
        <input
          name="imageswbs"
          type="file"
          id="image-upload"
          className="hidden"
          multiple
          accept="image/*"
          onChange={handleChange}
        />
        <div className="mt-4 grid grid-cols-3 gap-4">
          {imageswbs.map((src, index) => (
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
            onClick={() => setCurrentStep(11)}
          >
            Zurück
          </button>

          <div className="col-span-2">
            <button
              type="button"
              className={`${styles["next-btn"]} text-white px-6 py-3 rounded-lg`}
              onClick={() => setCurrentStep(13)}
            >
              Weiter
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StepTwoInner;
