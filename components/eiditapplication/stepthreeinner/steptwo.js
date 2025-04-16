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
  const [updatedImages, setUpdatedImages] = useState([]);

   // ✅ Ensure preview persists when navigating back to this step
  //  useEffect(() => {
  //   if (imageswbs && imageswbs.length > 0) {
  //     setwbsiImageShow(imageswbs[0]); 
  //   }
  // }, [imageswbs]);



  useEffect(() => {
    if (imageswbs && Array.isArray(imageswbs) && imageswbs.length > 0) {
      // Check if the first item is a File object
      if (imageswbs[0] instanceof File) {
        const reader = new FileReader();
        reader.onloadend = () => {
          setwbsiImageShow(reader.result); // ✅ Show file preview
        };
        reader.readAsDataURL(imageswbs[0]);
      } else {
        setwbsiImageShow(imageswbs[0]); // ✅ Show URL if stored images exist
      }
    }
  }, [imageswbs]);
  

  // let updatedImages = []; // To store processed images
  useEffect(() => {
    console.log("updatedImages zunu", updatedImages);
  }, [updatedImages]);

  useEffect(() => {
    console.log("imageswbs zunu", imageswbs);
  }, [imageswbs]);

  const handleFileChange = async (event) => {
    setIsConverting(true);  // Show loading state
    const file = event.target.files[0];
    if (!file) return; // Exit if no file is selected
  
    let imagesArray = [];
    if (file.type === "application/pdf") {
      // Convert PDF to images
      const fileURL = URL.createObjectURL(file);
      const images = await convertPdfToImages(fileURL);
      console.log("Converted PDF to images:", images);
  
      imagesArray  = images; // Store all images from the PDF
      setwbsiImageShow(imagesArray[0]); // Show first page preview if available
    } else {
      // Directly add uploaded image
      imagesArray  = [file];
      // setwbsiImageShow(file); // Show image preview
      if (file) {
        const reader = new FileReader();
        reader.onloadend = () => {
          const result = reader.result;
          setwbsiImageShow(result);
        };
        reader.readAsDataURL(file);
      }

    }
    setUpdatedImages(imagesArray);
    // Ensure imageswbs state is always an array (either multiple images from PDF or single image)
    setIsConverting(false);  // Hide loading state
  };
  
  
  const removeImage = () => {
    setImageswbs(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = ""; // Reset file input field
    }
  };

  const validateFields = () => {
    const newErrors = {};

    console.log("validateFields called");
    console.log("imageswbs before setting state:", imageswbs);
    console.log("updatedImages before setting state:", updatedImages);
    console.log("wbsiImageShow before setting state:", wbsiImageShow);
  

    // if(fläche === ""){
    //   newErrors.fläche = "Fläche is required.";
    // }
    // if(zimerzahl === ""){
    //   newErrors.zimerzahl = "Zimerzahl is required.";
    // }
    // If updatedImages has new images, update imageswbs
    if (updatedImages.length !== 0) {
      console.log("Updating imageswbs with new images from updatedImages");
      setImageswbs(updatedImages);
      // return true;
    }
    // If imageswbs already contains images, no need to update
    // if (imageswbs && imageswbs.length > 0) {
    //   console.log("Validation passed, images already assigned:", imageswbs);
    //   return true;
    // } 
    // newErrors.imageswbs = "imageswbs is required.";
  
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };
  


  setCurrentStep(15);
  if(setCurrentStep(15)){
    thirdStepComponent=0;
  }

  return (
    <div className="flex items-center justify-center">
      <div className="w-full bg-white shadow-lg rounded-lg p-6">
        <p className={`${styles["main-heading-sec"]} mt-10 text-center font-bold`}>
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
        <div className="grid grid-cols-1 gap-4 mt-3 mb-3 w-[90%] lg:w-[40%] mx-auto">
          <div>
            <p className={`${styles["p-address"]} mt-10 mb-10 text-center`}>
              Hast du einen Wohnberechtigungsschein?
            </p>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mt-5">
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
                  {errors.fläche && (
                    <p className="text-red-500 text-sm">{errors.fläche}</p>
                  )}
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
                  {errors.zimerzahl && (
                    <p className="text-red-500 text-sm">{errors.zimerzahl}</p>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>

       <div className="flex flex-col w-[90%] lg:w-[40%] justify-center mx-auto">
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
            {errors.imageswbs && (
              <p className="text-red-500 text-sm">{errors.imageswbs}</p>
            )}
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
                {typeof wbsiImageShow === "string" && wbsiImageShow.startsWith('data:image') || /\.(png|jpe?g|gif|webp)$/i.test(wbsiImageShow) ? (
                  // Render Image for Image files
                  <img
                    src={wbsiImageShow}
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
                    setUpdatedImages([]);      // Clear the images array
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
            className="bg-gray-300 text-gray-700 px-4 py-2 lg:py-3 rounded-lg"
            onClick={() => {
              setCurrentStep(14);
            }}
            
          >
            Zurück
          </button>

          <div className="col-span-2">
            <button
              type="button"
              className={`${styles["next-btn"]} text-white px-6 py-2 lg:py-3 rounded-lg`}
              onClick={() => {
                if (validateFields()) {
                  setCurrentStep(16)
                }
              }}
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
                <div>Erfordert die Wohnung einen Wohnberechtigungsschein (WBS)? Bewirb dich nur mit dem richtigen! Achtung: Es gibt verschiedene Arten – prüfe vorher, ob deiner passt, und lade ihn hier hoch.</div>
              </div>
            </div>
          </div>
        )}
    </div>
  );
};

export default StepTwoInner;
