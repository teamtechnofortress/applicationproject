import { useEffect, useState } from "react";
import styles from "@/styles/latest.module.css";

const StepSevenInner = ({
  bwaimages,
  setBwaimages,
  setCurrentStep,
  handleChange,
}) => {
  const [errors, setErrors] = useState({});
  const removeImage = (index) => {
    setBwaimages((prevImages) => (prevImages || []).filter((_, i) => i !== index));
  };
  const validateFields = () => {
    const newErrors = {};

    if (bwaimages.length < 3) {
      newErrors.bwaimages = "Bitte laden Sie mindestens 3 BWS.";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0; // Return true if no errors
  };
  setCurrentStep(6);

  return ( 
    <div className="flex justify-center">
            <div className="max-w-lg">
              <div className="grid grid-cols-1 gap-4 mt-3 mb-3">
                <div>
                    <p className={`${styles["main-heading"]} mt-10 mb-10 text-center font-bold`}>
                      Liegt eine betriebswirtschaftliche Auswertung (BWA) des vergangenen Jahres vor?
                    </p>   
                    <p className={`${styles["p-address"]} mb-10 text-center`}>
                     (Solltest du noch keine Vorliegen haben gehe zum nächsten Schritt)
                    </p> 
   
                    <div className="flex flex-col mt-10 items-center justify-center w-[60%] mx-auto">
                        <label
                          htmlFor="image-upload"
                          className={`${styles["upload-btn"]} ${styles["form-input"]} w-full px-4 py-2 text-center text-black rounded-lg cursor-pointer`}
                        >
                          <i className="fa fa-upload mr-2"></i>
                          Upload BWA
                        </label>
                        <input
                          name="bwaimages"
                          type="file"
                          id="image-upload"
                          className="hidden"
                          multiple
                          accept="image/*, application/pdf"
                          onChange={handleChange}
                        />
                        <div className="mt-4 grid grid-cols-3 gap-4">
                          {bwaimages.map((src, index) => (
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
                        {errors.bwaimages && <p className="text-red-500 text-sm">{errors.bwaimages}</p>}
                    </div>
                    <div className="flex justify-between mt-10">
                    <button type="button" className="bg-gray-300 text-gray-700 px-4 py-2 rounded-lg"
                          onClick={() => {
                            setCurrentStep(4); 
                          }}
                            > Zurück 
                    </button>
                    <button type="button" className="bg-gray-300 text-gray-700 px-4 py-2 rounded-lg"
                          onClick={() => {
                            if (validateFields()) {
                            setCurrentStep(7); // Correctly update the step state
                            }}}> Next
                    </button>
                        
                    </div>
                </div>
              </div>
            </div>
          </div>
  );
};

export default StepSevenInner;
