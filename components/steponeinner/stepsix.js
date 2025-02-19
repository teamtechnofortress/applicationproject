import { useEffect, useState, useRef } from "react";
import styles from "@/styles/latest.module.css";

const StepSixInner = ({
  employment,
  salarySlip,
  employcontract,
  setemploycontract,
  setsalarySlip,
  setCurrentStep,
}) => {
  const [errors, setErrors] = useState({});
  const fileInputRef = useRef(null);

  // Handle File Upload for Salary Slips & Employment Contract
  // const handleFileChange = (event, type) => {
  //   const files = Array.from(event.target.files);


  //   if (type === "employcontract") {
  //     // Only set employcontract if it's the correct input
  //     setemploycontract(files[0]);
  //   } else if (type === "salarySlip") {
  //     // Append salary slip files without affecting employcontract
  //     const fileURLs = files.map((file) => URL.createObjectURL(file));
  //     // setsalarySlip((prev) => [...prev, ...fileURLs]);
  //     setsalarySlip(Array.from(files));
  //   }
  // };
  const handleFileChange = (event, type) => {
    const files = Array.from(event.target.files);
  
    if (type === "employcontract") {
      // Only set employcontract if it's the correct input
      setemploycontract(files[0]);
    } else if (type === "salarySlip") {
      // Create Object URLs for images and use them for preview
      const fileURLs = files.map((file) =>
        file.type.startsWith('image/') ? URL.createObjectURL(file) : file.name
      );
      // setsalarySlip(Array.from(files));
      setsalarySlip(prev => [...prev, ...Array.from(files)]);
      // setsalarySlip((prev) => [...prev, ...fileURLs]);
    }
  };

  // Remove individual salary slip image
  const removeImage = (index) => {
    setsalarySlip((prev) => prev.filter((_, i) => i !== index));
  };

  // Delete employment contract & reset file input
  const delImage = () => {
    setemploycontract(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = ""; // Reset file input field
    }
  };

  // Validation before proceeding
  const validateFields = () => {
    const newErrors = {};
    if (salarySlip.length < 1 || salarySlip.length > 3) {
      newErrors.salarySlip = "Bitte laden Sie zwischen 1 und 3 Gehaltsnachweise hoch.";
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
          htmlFor="salarySlip-upload"
          className={`${styles["upload-btn"]} ${styles["form-input"]} w-full px-4 py-2 text-center text-black rounded-lg cursor-pointer`}
        >
          <i className="fa fa-upload mr-2"></i>
          {employment === "Ja"
            ? "Upload letzte 3 Gehaltsnachweise."
            : "Upload deiner letzten vorliegenden Gehaltsnachweise (max. 3 letzte)"}
        </label>
        <input
          type="file"
          name="salarySlip"
          id="salarySlip-upload"
          className="hidden"
          multiple
          accept="image/*, application/pdf"
          onChange={(e) => handleFileChange(e, "salarySlip")}
        />

        {/* Salary Proofs Preview */}
        <div className="mt-4 grid grid-cols-3 gap-4">
  {salarySlip.map((file, index) => (
    <div key={index} className="relative w-24 h-24">
      {/* Check if the file is an image or not */}
      {file instanceof File && file.type.startsWith('image/') ? (
        // Render Image for Image files
        <img
          src={URL.createObjectURL(file)} // Use the object URL created for images
          alt={`Gehaltsnachweis Preview ${index + 1}`}
          className="object-cover w-full h-full rounded-lg"
        />
      ) : (
        // Render PDF icon or text for PDFs
        <div className="w-full h-full bg-gray-200 flex justify-center items-center text-sm text-gray-500">
          <span>PDF</span>
        </div>
      )}
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
        {errors.salarySlip && <p className="text-red-500 text-sm">{errors.salarySlip}</p>}

          </div>

      {/* Upload Section for Employment Contract */}
      <div className="flex flex-col mt-10 items-center justify-center w-[40%] mx-auto">
        <label
          htmlFor="employcontract-upload"
          className={`${styles["upload-btn"]} ${styles["form-input"]} w-full px-4 py-2 text-center text-black rounded-lg cursor-pointer`}
        >
          <i className="fa fa-upload mr-2"></i>
          Upload Arbeitsvertrag
        </label>
        <input
          type="file"
          id="employcontract-upload"
          name="employcontract"
          className="hidden"
          accept="image/*"
          ref={fileInputRef}
          onChange={(e) => handleFileChange(e, "employcontract")}
        />

        {/* Employment Contract Preview */}
        {employcontract && (
          <div className="relative w-24 h-24 mt-4">
            <img src={URL.createObjectURL(employcontract)} alt="Preview" className="w-full h-full object-cover rounded-lg" />
            <button
              type="button"
              className="absolute top-0 right-0 bg-red-500 text-white p-1 rounded-full text-xs"
              onClick={delImage}
            >
              ×
            </button>
          </div>
        )}
      </div>

      {/* Navigation Buttons */}
      <div className="flex justify-between mt-10">
        <button
          type="button"
          className="bg-gray-300 text-gray-700 px-4 py-2 rounded-lg"
          onClick={() => setCurrentStep(4)}
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
