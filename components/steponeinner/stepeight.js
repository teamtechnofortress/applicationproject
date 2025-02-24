import { useEffect, useState, useRef } from "react";
import styles from "@/styles/latest.module.css";

const StepEightInner = ({
  einkommensbescheinigungimg,
  seteinkommensbescheinigungimg,
  setCurrentStep,
  handleChange,
}) => {
  const [errors, setErrors] = useState({});
  const fileInputRef = useRef(null); // Add a ref for file input

  const handleFileChange = (event) => {
    const file = event.target.files[0]; 
    if (file) {
      seteinkommensbescheinigungimg(file); 
    }
  };

  const removeImage = () => {
    seteinkommensbescheinigungimg(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = ""; // Reset file input field
    }
  };

  const validateFields = () => {
    const newErrors = {};
    if (!einkommensbescheinigungimg) {
      newErrors.einkommensbescheinigungimg = "Einkommensbescheinigung ist erforderlich.";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0; // Return true if no errors
  };

  setCurrentStep(7);

  return (
    <div className="flex justify-center">
            <div className="max-w-lg">
              <div className="grid grid-cols-1 gap-4 mt-3 mb-3">
                <div>
                    <p className={`${styles["main-upload-heading"]} mt-10 mb-10 text-center font-bold`}>
                    Lade deine Einkommensbescheinigung des Steuerberaters hoch.
                    </p>   
   
                    <div className="flex flex-col w-full justify-center mx-auto">
                      <label
                        htmlFor="image-upload"
                        className={`${styles["upload-btn"]} ${styles["form-input"]} w-full px-4 py-2 text-center text-black rounded-lg cursor-pointer`}
                      >
                        <i className="fa fa-upload mr-2"></i> Upload Einkommensbescheinigung
                      </label>
                      <input
                        type="file"
                        id="image-upload"
                        name="einkommensbescheinigungimg"
                        className="hidden"
                        accept="image/*, application/pdf"
                        ref={fileInputRef} // Attach ref here
                        onChange={handleFileChange}
                      />

                      {/* Image Preview */}
                      {einkommensbescheinigungimg && (
                        <div className="relative w-24 h-24 mt-4">
                          <img src={URL.createObjectURL(einkommensbescheinigungimg)} alt="Preview" className="w-full h-full object-cover rounded-lg" />
                          <button
                            type="button"
                            className="absolute top-0 right-0 bg-red-500 text-white p-1 rounded-full text-xs"
                            onClick={removeImage}
                          >
                            ×
                          </button>
                        </div>
                      )}

                      {errors.einkommensbescheinigungimg && <p className="text-red-500 text-sm">{errors.einkommensbescheinigungimg}</p>}
                    </div>
                    <div className="flex justify-between mt-10">
                    <button type="button" className="bg-gray-300 text-gray-700 px-4 py-2 rounded-lg"
                          onClick={() => {
                            setCurrentStep(6); 
                          }}
                            > Zurück 
                    </button>
                    <button type="button" className="bg-gray-300 text-gray-700 px-4 py-2 rounded-lg"
                          onClick={() => {
                            if (validateFields()) {
                            setCurrentStep(8);
                            }}}> Next
                    </button>
                        
                    </div>
                </div>
              </div>
            </div>
          </div>
  );
};

export default StepEightInner;
