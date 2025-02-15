import { useEffect, useState, useRef } from "react";
import styles from "@/styles/latest.module.css";

const StepSevenInner = ({
  bwaimages,
  setBwaimages,
  setCurrentStep,
  handleChange,
}) => {
  const [errors, setErrors] = useState({});
  const fileInputRef = useRef(null); // Add a ref for file input

  const handleFileChange = (event) => {
    const file = event.target.files[0]; 
    if (file) {
      setBwaimages(file); 
    }
  };

  const removeImage = () => {
    setBwaimages(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = ""; // Reset file input field
    }
  };

  const validateFields = () => {
    const newErrors = {};
    if (!bwaimages) {
      newErrors.bwaimages = "BWA ist erforderlich.";
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
   
                    <div className="flex flex-col w-full justify-center mx-auto">
                      <label
                        htmlFor="image-upload"
                        className={`${styles["upload-btn"]} ${styles["form-input"]} w-full px-4 py-2 text-center text-black rounded-lg cursor-pointer`}
                      >
                        <i className="fa fa-upload mr-2"></i> Upload BWA
                      </label>
                      <input
                        type="file"
                        id="image-upload"
                        name="bwaimages"
                        className="hidden"
                        accept="image/*"
                        ref={fileInputRef} // Attach ref here
                        onChange={handleFileChange}
                      />

                      {/* Image Preview */}
                      {bwaimages && (
                        <div className="relative w-24 h-24 mt-4">
                          <img src={URL.createObjectURL(bwaimages)} alt="Preview" className="w-full h-full object-cover rounded-lg" />
                          <button
                            type="button"
                            className="absolute top-0 right-0 bg-red-500 text-white p-1 rounded-full text-xs"
                            onClick={removeImage}
                          >
                            ×
                          </button>
                        </div>
                      )}

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
