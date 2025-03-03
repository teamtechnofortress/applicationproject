import { useEffect, useState, useRef } from "react";
import styles from "@/styles/latest.module.css";
import usePdfToImages from "@/hooks/usePdfToImages";

const StepTwoInner = ({
  fläche,
  zimerzahl,
  imageswbs, 
  setImageswbs, 
  setComponents,
  handleChange,
  currentStep,
  setCurrentStep,
}) => {
  const { convertPdfToImages } = usePdfToImages();
  const [errors, setErrors] = useState({});
  const [isTipModal, setisTipModal] = useState(false);
  const [wbsiImageShow, setwbsiImageShow] = useState(false);
  const fileInputRef = useRef(null); // Add a ref for file input
  const [isConverting, setIsConverting] = useState(false);

   // ✅ Ensure preview persists when navigating back to this step
   useEffect(() => {
    if (imageswbs && imageswbs.length > 0) {
      setwbsiImageShow(imageswbs[0]); // Show the first image or file
    }
  }, [imageswbs]);
  const handleFileChange = async (event) => {
    setIsConverting(true);  // Show loading state

    const file = event.target.files[0];
    if (!file) return; // Exit if no file is selected
  
    let updatedImages = []; // To store processed images
  
    if (file.type === "application/pdf") {
      // Convert PDF to images
      const fileURL = URL.createObjectURL(file);
      const images = await convertPdfToImages(fileURL);
      console.log("Converted PDF to images:", images);
  
      updatedImages = images; // Store all images from the PDF
      setwbsiImageShow(file); // Show first page preview if available
    } else {
      // Directly add uploaded image
      updatedImages = [file];
      setwbsiImageShow(file); // Show image preview
    }
  
    // Ensure imageswbs state is always an array (either multiple images from PDF or single image)
    setImageswbs(updatedImages);
    setIsConverting(false);  // Hide loading state
  };
  
  
  const removeImage = () => {
    setImageswbs(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = ""; // Reset file input field
    }
  };

  setCurrentStep(15);
  if(setCurrentStep(15)){
    thirdStepComponent=0;
  }

  return (
    <div className="flex items-center justify-center">
      <div className="w-full bg-white shadow-lg rounded-lg p-6">
        <p className={`${styles["main-heading"]} mt-10 text-center font-bold`}>
          Wohnberechtigungsschein
        </p>
        <p className={`${styles["p-address"]} mb-10 text-center w-[60%] mx-auto`}>
          falls erforderlich
        </p>
        <button
        type="button" 
        className={`${styles["tips"]} mx-auto`}
        id="tip_btn"
        onClick={() => setisTipModal(true)}>
        <img src="/images/tip.svg" alt="Tip Icon" /> <span>Tipps</span>
      </button>
        <div className="grid grid-cols-1 gap-4 mt-3 mb-3 w-[40%] mx-auto">
          <div>
            <p className={`${styles["p-address"]} mt-10 mb-10 text-center`}>
              Hast du einen Wohnberechtigungsschein?
            </p>
            <div className="grid grid-cols-2 gap-4 mt-5">
              <div className="...">
                <div className="input-field">
                  <input
                    type="text"
                    className={`${styles["form-input"]} form-input`}
                    id="fläche"
                    name="fläche"
                    placeholder="Fläche (qm)"
                    value={fläche}
                    onChange={handleChange}
                  />
                </div>
              </div>
              <div className="...">
                <div className="input-field">
                  <input
                    type="text"
                    className={`${styles["form-input"]} form-input`}
                    id="zimerzahl"
                    name="zimerzahl"
                    placeholder="Zimerzahl"
                    value={zimerzahl}
                    onChange={handleChange}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

       <div className="flex flex-col  w-[40%] justify-center mx-auto">
            <label
              htmlFor="image-upload"
              className={`${styles["upload-btn"]} ${styles["form-input"]} w-full px-4 py-2 text-center text-black rounded-lg cursor-pointer`}
            >
              <i className="fa fa-upload mr-2"></i> Upload WBS
            </label>
            <input
              type="file"
              id="image-upload"
              name="imageswbs"
              className="hidden"
              accept="image/*, application/pdf"
              ref={fileInputRef} // Attach ref here
              onChange={(e) => handleFileChange(e, "imageswbs")}
            />
          {/* ✅ Show Spinner when Converting PDF */}
            {isConverting && (
                <div className="flex justify-center mt-4">
                  <div className="loader"></div>
                </div>
              )}
            {/* Image Preview */}
            {wbsiImageShow && !isConverting && (
              <div className="relative w-24 h-24">
                {/* Check if the file is an image or PDF */}
                {wbsiImageShow instanceof File && wbsiImageShow.type.startsWith('image/') ? (
                  // Render Image for Image files
                  <img
                    src={URL.createObjectURL(wbsiImageShow)}
                    alt="Gehaltsnachweis Preview"
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
                  onClick={() => {
                    setImageswbs([]);      // Clear the images array
                    setwbsiImageShow(null); // Clear the preview state
                  }}
                >
                  ×
                </button>
              </div>
            )}


        </div>

        <div className="flex justify-between mt-10">
          <button
            type="button"
            className="bg-gray-300 text-gray-700 px-4 py-2 rounded-lg"
            onClick={() => setCurrentStep(14)}
          >
            Zurück
          </button>

          <div className="col-span-2">
            <button
              type="button"
              className={`${styles["next-btn"]} text-white px-6 py-3 rounded-lg`}
              onClick={() => setCurrentStep(16)}
              disabled={isConverting}
            >
              Weiter
            </button>
          </div>
        </div>
      </div>
      {/* Modal - Conditional Rendering */}
      {isTipModal && (
          <div
            id="tip-modal"
            className="fixed inset-0 bg-gray-600 bg-opacity-50 flex justify-center items-center z-50 text-gray-900 dark:text-white"
            onClick={() => setisTipModal(false)} 
          >
            
            <div
              className={`${styles["tip_bg"]} relative p-4 w-full max-w-2xl max-h-full bg-white rounded-lg shadow text-gray-900`}
              onClick={(e) => e.stopPropagation()}
            >
              <div className="p-4 md:p-5 rounded-t justify-between items-center relative">
              <button
                  type="button"
                  className="text-gray-700 hover:text-gray-900 text-lg font-bold absolute top-0 right-0"
                  onClick={() => setisTipModal(false)}
                >
                  ✖
                </button>
                <h3 className={`${styles["modal-h3"]}`}>
                  <div className="flex gap-4 justify-center">
                  <img className="" src="/images/tip.svg" alt="Tip Icon" /> Tipps zur Bewerbung
                  </div>
              
                </h3>
              
              </div>

              <div className="p-4 md:p-5 space-y-4">
                <div>Achte darauf, dass die Adresse die du hier angibst die selbe ist wie auf deinem Ausweis und deiner Schufa sowie auf deinen Gehaltsnachweisen. Sollten es bei den Adressen Abweichungen geben erkläre diese Unbedingt in deinem Anschreiben !!!</div>
              </div>
            </div>
          </div>
        )}
    </div>
  );
};

export default StepTwoInner;
