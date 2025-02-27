import { useEffect, useState, useRef } from "react";
import styles from "@/styles/latest.module.css";
import usePdfToImages from "@/hooks/usePdfToImages"; // ✅ Import the PDF conversion hook

const StepSevenInner = ({
  bwaimages,
  setBwaimages,
  setCurrentStep,
  handleChange,
}) => {
  const { convertPdfToImages } = usePdfToImages(); // ✅ Use the hook for PDF conversion
  const [errors, setErrors] = useState({});
  const [isConverting, setIsConverting] = useState(false); // ✅ Track conversion status
  const fileInputRef = useRef(null);
  const [bwaImageShow, setBwaImageShow] = useState(null); // ✅ For preview display

  const handleFileChange = async (event) => {
    setIsConverting(true); // ✅ Start loading state
    const file = event.target.files[0];

    if (!file) return;

    let updatedImages = []; // ✅ Store processed images

    if (file.type === "application/pdf") {
      // ✅ Convert PDF to images
      const fileURL = URL.createObjectURL(file);
      const images = await convertPdfToImages(fileURL);
      console.log("Converted PDF to images:", images);

      updatedImages = images; // Store all images from the PDF
      setBwaImageShow(file); // Show first page preview
    } else {
      // ✅ Directly add uploaded image
      updatedImages = [file];
      setBwaImageShow(file); // Show image preview
    }

    // ✅ Ensure bwaimages state is always an array (multiple PDF pages or single image)
    setBwaimages(updatedImages);
    setIsConverting(false); // ✅ Stop loading state
  };

  const removeImage = () => {
    setBwaimages([]);
    setBwaImageShow(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = ""; // Reset input field
    }
  };

  const validateFields = () => {
    const newErrors = {};
    if (!bwaimages || bwaimages.length === 0) {
      newErrors.bwaimages = "BWA ist erforderlich.";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0; // ✅ Return true if no errors
  };

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
                accept="image/*, application/pdf"
                ref={fileInputRef}
                onChange={handleFileChange}
              />

              {/* ✅ Show Spinner when Converting PDF */}
              {isConverting && (
                <div className="flex justify-center mt-4">
                  <div className="loader"></div>
                </div>
              )}

              {/* ✅ Image Preview */}
              {bwaImageShow && !isConverting && (
                <div className="relative w-24 h-24 mt-4">
                  {bwaImageShow instanceof File && bwaImageShow.type.startsWith("image/") ? (
                    <img
                      src={URL.createObjectURL(bwaImageShow)}
                      alt="BWA Preview"
                      className="w-full h-full object-cover rounded-lg"
                    />
                  ) : (
                    <div className="w-full h-full bg-gray-200 flex justify-center items-center text-sm text-gray-500">
                      <span>PDF</span>
                    </div>
                  )}
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
              <button type="button" className="bg-gray-300 text-gray-700 px-4 py-2 rounded-lg" onClick={() => setCurrentStep(4)}>
                Zurück
              </button>

              <button
                type="button"
                className={`bg-gray-500 text-white px-6 py-3 rounded-lg ${isConverting ? "opacity-50 cursor-not-allowed" : ""}`}
                onClick={() => {
                  if (validateFields()) {
                    setCurrentStep(7);
                  }
                }}
                disabled={isConverting} // ✅ Disable while converting PDF
              >
                {isConverting ? "Verarbeiten..." : "Weiter"}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StepSevenInner;
