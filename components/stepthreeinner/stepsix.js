import { useEffect, useState, useRef } from "react";
import styles from "@/styles/latest.module.css";
import usePdfToImages from "@/hooks/usePdfToImages"; // ✅ Import the PDF conversion hook

const StepSixInner = ({
  mietschuldenfreiheitimg, 
  setMietschuldenfreiheitimg, 
  setCurrentStep,
}) => {
  const { convertPdfToImages } = usePdfToImages(); // ✅ Use the hook for PDF conversion
  const [errors, setErrors] = useState({});
  const [isTipModal, setisTipModal] = useState(false);
  const [isConverting, setIsConverting] = useState(false); // ✅ Track conversion status
  const fileInputRef = useRef(null);
  const [previewImage, setPreviewImage] = useState(null); // ✅ For preview display

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
      setPreviewImage(file); // Show first page preview
    } else {
      // ✅ Directly add uploaded image
      updatedImages = [file];
      setPreviewImage(file); // Show image preview
    }

    // ✅ Ensure mietschuldenfreiheitimg state is always an array (multiple PDF pages or single image)
    setMietschuldenfreiheitimg(updatedImages);
    setIsConverting(false); // ✅ Stop loading state
  };

  const removeImage = () => {
    setMietschuldenfreiheitimg([]);
    setPreviewImage(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = ""; // Reset input field
    }
  };

  const validateFields = () => {
    const newErrors = {};
    if (!mietschuldenfreiheitimg || mietschuldenfreiheitimg.length === 0) {
      newErrors.mietschuldenfreiheitimg = "Mietschuldenfreiheitsbescheinigung ist erforderlich.";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0; // ✅ Return true if no errors
  };

  return (
    <div className="flex items-center justify-center">
      <div className="w-full bg-white shadow-lg rounded-lg p-6">
        <p className={`${styles["main-heading"]} mt-10 text-center font-bold`}>Mietschuldenfreiheit</p>
        <p className={`${styles["p-address"]} mb-10 text-center w-[60%] mx-auto`}>
          Diese kannst du auch später hochladen, solltest du sie gerade nicht zur Hand haben.
        </p>

        <button type="button" className={`${styles["tips"]} mx-auto`} onClick={() => setisTipModal(true)}>
          <img src="/images/tip.svg" alt="Tip Icon" /> <span>Tipps</span>
        </button>

        <div className="flex flex-col mt-10 items-center justify-center w-[40%] mx-auto">
          <label
            htmlFor="image-upload"
            className={`${styles["upload-btn"]} ${styles["form-input"]} w-full px-4 py-2 text-center text-black rounded-lg cursor-pointer`}
          >
            <i className="fa fa-upload mr-2"></i> Upload Mietschuldenfreiheit
          </label>
          <input
            type="file"
            id="image-upload"
            name="mietschuldenfreiheitimg"
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
          {previewImage && !isConverting && (
            <div className="relative w-24 h-24 mt-4">
              {previewImage instanceof File && previewImage.type.startsWith("image/") ? (
                <img
                  src={URL.createObjectURL(previewImage)}
                  alt="Mietschuldenfreiheit Preview"
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
        </div>

        <div className="flex justify-between mt-10">
          <button type="button" className="bg-gray-300 text-gray-700 px-4 py-2 rounded-lg" onClick={() => setCurrentStep(18)}>
            Zurück
          </button>

          <button
            type="button"
            className={`bg-gray-500 text-white px-6 py-3 rounded-lg ${isConverting ? "opacity-50 cursor-not-allowed" : ""}`}
            onClick={() => {
              if (validateFields()) {
                setCurrentStep(20);
              }
            }}
            disabled={isConverting} // ✅ Disable while converting PDF
          >
            {isConverting ? "Verarbeiten..." : "Weiter"}
          </button>
        </div>
      </div>

      {/* ✅ Modal - Conditional Rendering */}
      {isTipModal && (
        <div id="tip-modal" className="fixed inset-0 bg-gray-600 bg-opacity-50 flex justify-center items-center z-50 text-gray-900">
          <div className={`${styles["tip_bg"]} relative p-4 w-full max-w-2xl max-h-full bg-white rounded-lg shadow text-gray-900`}>
            <button type="button" className="absolute top-0 right-0 text-lg font-bold text-gray-700 hover:text-gray-900" onClick={() => setisTipModal(false)}>
              ✖
            </button>
            <h3 className={`${styles["modal-h3"]} flex gap-4 justify-center`}>
              <img src="/images/tip.svg" alt="Tip Icon" /> Tipps zur Bewerbung
            </h3>

            <div className="p-4 space-y-4">
              <p>Achte darauf, dass deine Mietschuldenfreiheitsbescheinigung nicht älter als 3 Monate ist und dass die Adresse mit deiner aktuellen Adresse übereinstimmt.</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default StepSixInner;
