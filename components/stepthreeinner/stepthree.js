import { useEffect, useState } from "react";
import styles from "@/styles/latest.module.css";

const StepThreeInner = ({
  personal, 
  setPersonal, 
  setComponents,
  handleChange,
  currentStep,
  setCurrentStep,
}) => {
  const [errors, setErrors] = useState({});

  const removeImage = (index) => {
    setPersonal((prevImages) => (prevImages || []).filter((_, i) => i !== index)); // Safeguard against undefined
  };

  setCurrentStep(13);
  if(setCurrentStep(13)){
    thirdStepComponent=1;
  }

  return (
    <div className="flex items-center justify-center">
      <div className="w-full bg-white shadow-lg rounded-lg p-6">
        <p className={`${styles["main-heading"]} mt-10 text-center font-bold`}>
           Personalausweis
        </p>
        <p className={`${styles["p-address"]} mb-10 text-center w-[60%] mx-auto`}>
        Bitte lade nun einen Kopie deines Personalausweises hoch. In dem Beispiel siehst du, welche Stellen du schwärzen darfst.
        </p>
        <div className="grid grid-cols-2 mt-5 gap-10 mt-3 mb-3">
            <div className="col-span-1 flex items-center justify-end">
               <img src="/idfront.png" alt="ID Front" className="w-[53%] h-auto" />
            </div>
            <div className="col-span-1 flex items-center">
              <img src="/idback.png" alt="ID Front" className="w-[55%] h-auto" />
            </div>
         </div>

        <div className="flex flex-col mt-10 items-center justify-center w-[40%] mx-auto">
        <label
          htmlFor="image-upload"
          className={`${styles["upload-btn"]} ${styles["form-input"]} w-full px-4 py-2 text-center text-black rounded-lg cursor-pointer`}
        >
          <i className="fa fa-upload mr-2"></i>
          Uploads Personalausweis
        </label>
        <input
          name="personal"
          type="file"
          id="image-upload"
          className="hidden"
          multiple
          accept="image/*"
          onChange={handleChange}
        />
        <div className="mt-4 grid grid-cols-3 gap-4">
          {personal.map((src, index) => (
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
            onClick={() => setCurrentStep(12)}
          >
            Zurück
          </button>

          <div className="col-span-2">
            <button
              type="button"
              className={`${styles["next-btn"]} text-white px-6 py-3 rounded-lg`}
              onClick={() => setCurrentStep(14)}
            >
              Weiter
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StepThreeInner;
