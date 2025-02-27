import { useState, useRef } from "react";
import styles from "@/styles/latest.module.css";
import usePdfToImages from "@/hooks/usePdfToImages";

const StepSixInner = ({
  employment,
  salarySlip,
  employcontract,
  setemploycontract,
  setsalarySlip,
  setCurrentStep,
}) => {
  const { convertPdfToImages } = usePdfToImages(); // ✅ PDF Conversion Hook
  const [errors, setErrors] = useState({});
  const fileInputRef = useRef(null);

 // ✅ Separate loading states
 const [isConvertingEmploycontract, setIsConvertingEmploycontract] = useState(false);
 const [isConvertingSalarySlip, setIsConvertingSalarySlip] = useState(false);

 // ✅ Separate states for previews & file storage
 const [employcontractPreview, setEmploycontractPreview] = useState(null);
 const [salarySlipPreview, setSalarySlipPreview] = useState([]);

 const handleFileChange = async (event, type) => {
  const files = Array.from(event.target.files);

  if (type === "employcontract") {
    setIsConvertingEmploycontract(true); // ✅ Show loader for employcontract
    const file = files[0]; 
    if (!file) return;

    let updatedFiles = [];

    if (file.type === "application/pdf") {
      // ✅ Convert PDF to images
      const fileURL = URL.createObjectURL(file);
      const images = await convertPdfToImages(fileURL);
      console.log("Converted Employcontract PDF to images:", images);

      if (images.length > 0) {
        setEmploycontractPreview(file.name); // ✅ Show PDF name as preview
        updatedFiles = images; // ✅ Store only images, not the PDF
      }
    } else {
      setEmploycontractPreview(URL.createObjectURL(file)); // ✅ Show image preview
      updatedFiles.push(file);
    }

    setemploycontract(updatedFiles); // ✅ Store images instead of the PDF
    setIsConvertingEmploycontract(false); // ✅ Hide loader for employcontract
  } 
  
  else if (type === "salarySlip") {
    setIsConvertingSalarySlip(true); // ✅ Show loader for salarySlip
    let updatedPreviews = [];
    let updatedFiles = [];

    for (const file of files) {
      if (file.type === "application/pdf") {
        // ✅ Convert PDF to images
        const fileURL = URL.createObjectURL(file);
        const images = await convertPdfToImages(fileURL);
        console.log("Converted PDF to images:", images);

        if (images.length > 0) {
          updatedPreviews.push(file.name); // ✅ PDF preview
          updatedFiles.push(...images); // ✅ Save only the images, not the PDF
        }
      } else {
        // ✅ Directly add image previews
        updatedPreviews.push(URL.createObjectURL(file));
        updatedFiles.push(file);
      }
    }

    setSalarySlipPreview((prev) => [...prev, ...updatedPreviews]);
    setsalarySlip((prev) => [...prev, ...updatedFiles]); // ✅ Only store images here
    setIsConvertingSalarySlip(false); // ✅ Hide loader for salarySlip
  }
};

  const removeSalarySlip = (index) => {
    setSalarySlipPreview((prev) => prev.filter((_, i) => i !== index));
    setsalarySlip((prev) => prev.filter((_, i) => i !== index));
  };

  const removeEmployContract = () => {
    setEmploycontractPreview(null);
    setemploycontract(null);
    if (fileInputRef.current) fileInputRef.current.value = ""; // Reset input
  };

  const validateFields = () => {
    const newErrors = {};
    
    // ✅ Count PDF files separately
    const pdfFiles = salarySlip.filter(file => file instanceof File && file.type === "application/pdf");
    
    // ✅ Count image files separately
    const imageFiles = salarySlip.filter(file => file instanceof File && file.type.startsWith("image/"));
  
    const totalFiles = pdfFiles.length + imageFiles.length; // ✅ PDFs count as one file
  
    if (totalFiles < 1 || totalFiles > 3) {
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

      {/* ✅ Upload Salary Slips */}
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

        {/* ✅ Show Loader only for Salary Slip */}
        {isConvertingSalarySlip && (
          <div className="flex justify-center mt-4">
            <div className="loader"></div>
          </div>
        )}


        {/* ✅ Salary Slips Preview */}
        <div className="mt-4 grid grid-cols-3 gap-4">
          {salarySlipPreview.map((preview, index) => (
            <div key={index} className="relative w-24 h-24">
              {preview.startsWith("data:image") || preview.startsWith("blob:") ? (
                <img src={preview} alt={`Gehaltsnachweis Preview ${index + 1}`} className="object-cover w-full h-full rounded-lg" />
              ) : (
                <div className="w-full h-full bg-gray-200 flex justify-center items-center text-sm text-gray-500">
                  <span>PDF</span>
                </div>
              )}
              <button
                type="button"
                className="absolute top-1 right-1 bg-red-500 text-white p-1 rounded-full text-xs"
                onClick={() => removeSalarySlip(index)}
              >
                ×
              </button>
            </div>
          ))}
        </div>
        {errors.salarySlip && <p className="text-red-500 text-sm">{errors.salarySlip}</p>}
      </div>

      {/* ✅ Upload Employment Contract */}
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
          accept="image/*, application/pdf"
          ref={fileInputRef}
          onChange={(e) => handleFileChange(e, "employcontract")}
        />
       {/* ✅ Show Loader only for Employ Contract */}
       {isConvertingEmploycontract && (
          <div className="flex justify-center mt-4">
            <div className="loader"></div>
          </div>
        )}
        {/* ✅ Employment Contract Preview */}
        {employcontractPreview && (
          <div className="relative w-24 h-24 mt-4">
            {typeof employcontractPreview === "string" ? (
              <div className="w-full h-full bg-gray-200 flex justify-center items-center text-sm text-gray-500">
                <span>PDF</span>
              </div>
            ) : (
              <img src={employcontractPreview} alt="Preview" className="w-full h-full object-cover rounded-lg" />
            )}
            <button
              type="button"
              className="absolute top-0 right-0 bg-red-500 text-white p-1 rounded-full text-xs"
              onClick={removeEmployContract}
            >
              ×
            </button>
          </div>
        )}
      </div>

      {/* ✅ Navigation Buttons */}
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
