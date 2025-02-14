import { useState } from "react";
import styles from "@/styles/latest.module.css";

const StepSixInner = ({
  employment,
  images,
  arbeitsvertrag,
  setarbeitsvertrag,
  setImages,
  setCurrentStep,
}) => {
  const [errors, setErrors] = useState({});
  const handleFileChange = (event, type) => {
    const files = Array.from(event.target.files).map((file) =>
      URL.createObjectURL(file)
    );
    if (type === "images") {
      setImages((prev) => [...prev, ...files]);
    } else if (type === "arbeitsvertrag") {
      setarbeitsvertrag((prev) => [...prev, ...files]);
    }
  };
  const removeImage = (index, type) => {
    if (type === "images") {
      setImages((prev) => prev.filter((_, i) => i !== index));
    } else if (type === "arbeitsvertrag") {
      setarbeitsvertrag((prev) => prev.filter((_, i) => i !== index));
    }
  };
  const validateFields = () => {
    const newErrors = {};
    if (employment === "Ja" && images.length < 3) {
      newErrors.images = "Bitte laden Sie mindestens 3 Gehaltsnachweise hoch.";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };
  return (
    <div>
      <p className={`${styles["main-heading"]} mt-10 mb-10 text-center font-bold`}>
        {employment === "Ja"
          ? "Dein Beschäftigungsverhältnis besteht länger als 6 Monate."
          : "Dein Beschäftigungsverhältnis besteht kürzer als 6 Monate."}
      </p>
      {/* Upload Section for Salary Proofs */}
      <div className="flex flex-col items-center justify-center w-[40%] mx-auto">
        <label
          htmlFor="image-upload"
          className={`${styles["upload-btn"]} ${styles["form-input"]} w-full px-4 py-2 text-center text-black rounded-lg cursor-pointer`}
        >
          <i className="fa fa-upload mr-2"></i>
          {employment === "Ja"
            ? "Upload letzte 3 Gehaltsnachweise."
            : "Upload deiner letzten vorliegenden Gehaltsnachweise (max. 3 letzte)"}
        </label>
        <input
          type="file"
          name="salaryslip"
          id="image-upload"
          className="hidden"
          multiple
          accept="image/*"
          onChange={(e) => handleFileChange(e, "images")}
        />
        {/* Salary Proofs Preview */}
        <div className="mt-4 grid grid-cols-3 gap-4">
          {images.map((src, index) => (
            <div key={index} className="relative w-24 h-24">
              <img
                src={src}
                alt={`Gehaltsnachweis Preview ${index + 1}`}
                className="object-cover w-full h-full rounded-lg"
              />
              <button
                type="button"
                className="absolute top-1 right-1 bg-red-500 text-white p-1 rounded-full text-xs"
                onClick={() => removeImage(index, "images")}
              >
                ×
              </button>
            </div>
          ))}
        </div>
        {errors.images && <p className="text-red-500 text-sm">{errors.images}</p>}
      </div>
      {/* Upload Section for Employment Contract */}
      <div className="flex flex-col mt-10 items-center justify-center w-[40%] mx-auto">
        <label
          htmlFor="arbeitsvertrag-upload"
          className={`${styles["upload-btn"]} ${styles["form-input"]} w-full px-4 py-2 text-center text-black rounded-lg cursor-pointer`}
        >
          <i className="fa fa-upload mr-2"></i>
          Upload Arbeitsvertrag
        </label>
        <input
          type="file"
          name="employcontract"
          id="arbeitsvertrag-upload"
          className="hidden"
          multiple
          accept="image/*"
          onChange={(e) => handleFileChange(e, "arbeitsvertrag")}
        />
        {/* Employment Contract Preview */}
        <div className="mt-4 grid grid-cols-3 gap-4">
          {arbeitsvertrag.map((src, index) => (
            <div key={index} className="relative w-24 h-24">
              <img
                src={src}
                alt={`Arbeitsvertrag Preview ${index + 1}`}
                className="object-cover w-full h-full rounded-lg"
              />
              <button
                type="button"
                className="absolute top-1 right-1 bg-red-500 text-white p-1 rounded-full text-xs"
                onClick={() => removeImage(index, "arbeitsvertrag")}
              >
                ×
              </button>
            </div>
          ))}
        </div>
      </div>
      {/* Navigation Buttons */}
      <div className="flex justify-between mt-10">
        
        <button
          type="button"
          className="bg-gray-300 text-gray-700 px-4 py-2 rounded-lg"
          onClick={() => {
            setCurrentStep(4);
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
                setCurrentStep(8);
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
export default StepSixInner;