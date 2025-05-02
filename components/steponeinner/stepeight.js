import {useEffect, useState, useRef } from "react";
import styles from "@/styles/latest.module.css";
import usePdfToImages from "@/hooks/usePdfToImages";

const StepEightInner = ({
  einkommensbescheinigungimg,
  seteinkommensbescheinigungimg,
  setCurrentStep,
}) => {
  const { convertPdfToImages } = usePdfToImages();
  const [errors, setErrors] = useState({});
  const fileInputRef = useRef(null);
  const [einkommensbescheinigungimgshow, seteinkommensbescheinigungimgshow] = useState(null);
  const [isConverting, setIsConverting] = useState(false);
 // ✅ Ensure preview persists when navigating back to this step
 useEffect(() => {
  if (einkommensbescheinigungimg && einkommensbescheinigungimg.length > 0) {
    seteinkommensbescheinigungimgshow(einkommensbescheinigungimg[0]); // Show the first image or file
  }
}, [einkommensbescheinigungimg]);
  const handleFileChange = async (event) => {
    setIsConverting(true); // Show loading state

    const file = event.target.files[0];
    if (!file) return;

    let updatedImages = [];

    if (file.type === "application/pdf") {
      // Convert PDF to images
      const fileURL = URL.createObjectURL(file);
      const images = await convertPdfToImages(fileURL);
      console.log("Converted PDF to images:", images);

      updatedImages = images;
      seteinkommensbescheinigungimgshow(updatedImages[0]); // Show first page preview
    } else {
      updatedImages = [file];
      if (file) {
        const reader = new FileReader();
        reader.onloadend = () => {
          const result = reader.result;
          seteinkommensbescheinigungimgshow(result);
        };
        reader.readAsDataURL(file);
      }
    }

    seteinkommensbescheinigungimg(updatedImages);
    setIsConverting(false); // Hide loading state
  };

  const removeImage = () => {
    seteinkommensbescheinigungimg([]);
    seteinkommensbescheinigungimgshow(null);
    if (fileInputRef.current) fileInputRef.current.value = ""; // Reset file input field
  };

  const validateFields = () => {
    const newErrors = {};
    // if (!einkommensbescheinigungimg || einkommensbescheinigungimg.length === 0) {
    //   newErrors.einkommensbescheinigungimg = "Einkommensbescheinigung ist erforderlich.";
    // }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

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
                ref={fileInputRef}
                onChange={handleFileChange}
              />

              {/* ✅ Show Loader When Converting PDF */}
              {isConverting && (
                <div className="flex justify-center mt-4">
                  <div className="loader"></div>
                </div>
              )}

              {/* ✅ Show Image or PDF Preview */}
              {einkommensbescheinigungimgshow && !isConverting && (
                <div className="relative w-24 h-24">
                 
                 {typeof einkommensbescheinigungimgshow === "string" && einkommensbescheinigungimgshow.startsWith('data:image') || /\.(png|jpe?g|gif|webp)$/i.test(einkommensbescheinigungimgshow) ? (
                    <img
                      src={(einkommensbescheinigungimgshow)}
                      alt="Einkommensbescheinigung Preview"
                      className="object-cover w-full h-full rounded-lg"
                    />
                  ) : (
                    <div className="w-full h-full bg-gray-200 flex justify-center items-center text-sm text-gray-500">
                      <span>PDF</span>
                    </div>
                  )}
                  <button
                    type="button"
                    className="absolute top-1 right-1 bg-red-500 text-white p-1 rounded-full text-xs"
                    onClick={removeImage}
                  >
                    ×
                  </button>
                </div>
              )}

              {/* ✅ Error Message */}
              {errors.einkommensbescheinigungimg && (
                <p className="text-red-500 text-sm">{errors.einkommensbescheinigungimg}</p>
              )}
            </div>

            {/* ✅ Navigation Buttons */}
            <div className="flex justify-between mt-10">
              <button
                type="button"
                className="bg-gray-300 text-gray-700 px-4 py-2 rounded-lg"
                onClick={() => setCurrentStep(6)}
              >
                Zurück
              </button>

              <div className="col-span-2">
              <button
                type="button"
                className={`${styles["next-btn"]} bg-gray-500 text-white px-6 py-3 rounded-lg`}
                onClick={() => {
                  if (validateFields()) {
                    setCurrentStep(8);
                  }
                }}
                disabled={isConverting} // ✅ Disable Next Button Until Conversion Finishes
              >
                Weiter
              </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StepEightInner;
