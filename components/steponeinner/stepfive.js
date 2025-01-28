import { useState } from "react";
import styles from "@/styles/latest.module.css";

const StepFiveInner = ({
  employment,
  images,
  setImages,
  setCurrentStep,
  handleChange,
}) => {
  const [errors, setErrors] = useState({});



  const removeImage = (index) => {
    setImages((prevImages) => prevImages.filter((_, i) => i !== index));
  };

  const validateFields = () => {
    const newErrors = {};
    if (employment === "Ja" && images.length < 3) {
      newErrors.images = "Bitte laden Sie mindestens 3 Gehaltsnachweise hoch.";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };
  setCurrentStep(4);

  return (
    <div>
      <p className={`${styles["main-heading"]} mt-10 mb-10 text-center font-bold`}>
      {employment === "Ja"
            ? "Dein Beschäftigungsverhältnis besteht länger als 6 Monate."
            : "Dein Beschäftigungsverhältnis besteht kürzer als 6 Monate."}
        
      </p>

      <div className="flex flex-col items-center justify-center w-[40%] mx-auto">
        <label
          htmlFor="image-upload"
          className={`${styles["upload-btn"]} ${styles["form-input"]} w-full px-4 py-2 text-center text-black rounded-lg cursor-pointer`}
        >
           <i className="fa fa-upload mr-2"></i>
          {employment === "Ja"
            ? "Upload letzte 3 Gehaltnachweise."
            : "Upload letzte 3 Gehaltnachweise (wenn möglich)."}
        </label>
        <input
          name="images"
          type="file"
          id="image-upload"
          className="hidden"
          multiple
          accept="image/*"
          onChange={handleChange}
        />
        <div className="mt-4 grid grid-cols-3 gap-4">
          {images.map((src, index) => (
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
        {errors.images && <p className="text-red-500 text-sm">{errors.images}</p>}
      </div>

      <div className="flex justify-between mt-10">
        <button
          type="button"
          className="bg-gray-300 text-gray-700 px-4 py-2 rounded-lg"
          onClick={() => {
            setCurrentStep(3);
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
                setCurrentStep(5);
              }
            }}
          >
            Weiter
          </button>
        </div>
      </div>
    </div>
  );
};

export default StepFiveInner;
