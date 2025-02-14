import { useEffect, useState } from "react";
import styles from "@/styles/latest.module.css";

const StepEightInner = ({
  incomeimages,
  setincomeimages,
  setCurrentStep,
  handleChange,
}) => {
  const [errors, setErrors] = useState({});
  const handleFileChange = (event, type) => {
    const files = Array.from(event.target.files).map((file) =>
      URL.createObjectURL(file)
    );
    if (type === "incomeimages") {
      setincomeimages((prev) => [...prev, ...files]);
    } 
  };
  const removeImage = (index, type) => {
    if (type === "incomeimages") {
      setincomeimages((prev) => prev.filter((_, i) => i !== index));
    } 
  };
  const validateFields = () => {
    const newErrors = {};
    if (incomeimages.length < 3) {
      newErrors.incomeimages = "Bitte laden Sie mindestens 3 Gehaltsnachweise hoch.";
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
   
                    <div className="flex flex-col items-center justify-center w-[80%] mx-auto">
                      <label
                        htmlFor="image-upload"
                        className={`${styles["upload-btn"]} ${styles["form-input"]} w-full px-4 py-2 text-center text-black rounded-lg cursor-pointer`}
                      >
                        <i className="fa fa-upload mr-2"></i> Upload Einkommensbescheinigung
                      </label>
                      <input
                        type="file"
                        name="incomeimages"
                        id="image-upload"
                        className="hidden"
                        multiple
                        accept="image/*"
                        onChange={(e) => handleFileChange(e, "incomeimages")}
                      />
                      {/* Salary Proofs Preview */}
                      <div className="mt-4 grid grid-cols-3 gap-4">
                        {incomeimages.map((src, index) => (
                          <div key={index} className="relative w-24 h-24">
                            <img
                              src={src}
                              alt={`Gehaltsnachweis Preview ${index + 1}`}
                              className="object-cover w-full h-full rounded-lg"
                            />
                            <button
                              type="button"
                              className="absolute top-1 right-1 bg-red-500 text-white p-1 rounded-full text-xs"
                              onClick={() => removeImage(index, "incomeimages")}
                            >
                              ×
                            </button>
                          </div>
                        ))}
                      </div>
                      {errors.incomeimages && <p className="text-red-500 text-sm">{errors.incomeimages}</p>}
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
