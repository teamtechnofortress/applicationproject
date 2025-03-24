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
  const [updatedImages, setUpdatedImages] = useState([]);
  const [isTipModal, setisTipModal] = useState(false);
  // Set the default open index to 0 (first FAQ item)
  const [openIndex, setOpenIndex] = useState(0);
  // Toggle Accordion Item
  const toggleAccordion = (index) => {
    setOpenIndex(openIndex === index ? null : index); // Close if already open, else open
  };
  
 // ✅ Ensure preview persists when navigating back to this step


//  useEffect(() => {
//   if (bwaimages && bwaimages.length > 0) {
//     setBwaImageShow(bwaimages[0]); // Show the first image or file
//   }
// }, [bwaimages]);

useEffect(() => {
  if (bwaimages && Array.isArray(bwaimages) && bwaimages.length > 0) {
    // Check if the first item is a File object
    if (bwaimages[0] instanceof File) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setBwaImageShow(reader.result); // ✅ Show file preview
      };
      reader.readAsDataURL(bwaimages[0]);
    } else {
      setBwaImageShow(bwaimages[0]); // ✅ Show URL if stored images exist
    }
  }
}, [bwaimages]);




  const handleFileChange = async (event) => {
    setIsConverting(true); // ✅ Start loading state
    const file = event.target.files[0];

    if (!file) return;
    let imagesArray = []; // ✅ Store processed images



    if (file.type === "application/pdf") {
      // ✅ Convert PDF to images
      const fileURL = URL.createObjectURL(file);
      const images = await convertPdfToImages(fileURL);
      console.log("Converted PDF to images:", images);

      imagesArray = images; // Store all images from the PDF
      setBwaImageShow(imagesArray[0]); // Show first page preview
    } else {
      // ✅ Directly add uploaded image
      imagesArray = [file];
      if (file) {
        const reader = new FileReader();
        reader.onloadend = () => {
          const result = reader.result;
          setBwaImageShow(result);
        };
        reader.readAsDataURL(file);
      }
      // setBwaImageShow(file); // Show image preview
    }
    setUpdatedImages(imagesArray);

    // ✅ Ensure bwaimages state is always an array (multiple PDF pages or single image)
    setIsConverting(false); // ✅ Stop loading state
  };

  const removeImage = () => {
    setBwaimages([]);
    setUpdatedImages([]);
    setBwaImageShow(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = ""; // Reset input field
    }
  };

  const validateFields = () => {
    const newErrors = {};
    // setBwaimages(updatedImages);

    // if (!bwaimages || bwaimages.length === 0) {
    //   newErrors.bwaimages = "BWA ist erforderlich.";
    // }

    // setErrors(newErrors);
    // return Object.keys(newErrors).length === 0; // ✅ Return true if no errors

     // If updatedImages has new images, update imageswbs
     if (updatedImages.length !== 0) {
      console.log("Updating imageswbs with new images from updatedImages");
      setBwaimages(updatedImages);
      // return true;
    }
    // If imageswbs already contains images, no need to update
    // if (bwaimages && bwaimages.length > 0) {
    //   console.log("Validation passed, images already assigned:", bwaimages);
    //   return true;
    // } 
    // newErrors.bwaimages = "BWA ist erforderlich.";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
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
            <button
                    type="button"
                    className={`${styles["tips"]} mx-auto mb-10`}
                    id="tip_btn"
                    onClick={() => setisTipModal(true)}>
                    <img src="/images/tip.svg" alt="Tip Icon" /> <span>Tipps</span>
                  </button>

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
                  {typeof bwaImageShow === "string" && bwaImageShow.startsWith('data:image') || /\.(png|jpe?g|gif|webp)$/i.test(bwaImageShow) ? (
                    <img
                      src={bwaImageShow}
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
      { isTipModal && (
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
                    {/* FAQ Item 1 */}
                    <div className={`${styles['faq-item']} p-4`}>
                          <button
                            type="button" 
                            onClick={() => toggleAccordion(0)}
                            className="w-full text-left font-semibold text-xl rounded-lg flex items-center gap-3"
                          >
                              <span className={`${styles['open_faq']}`}>
                              {openIndex === 0 ? '-' : '+'}
                            </span>
                            <span className={`${styles['faq-title']}`}>Tipp 1</span>
                            
                          </button>
                          {openIndex === 0 && (
                            <div className={`${styles['faq-txt']}  mt-2 rounded-lg`}>
                              <p>
                              Bist du selbstständig? Lade die aktuellste BWA und ein Schreiben deines Steuerberaters hoch, aus dem dein monatlicher Überschuss hervorgeht – so sieht der Vermieter schnell, über welche finanziellen Mittel du verfügst
                          </p>
                            </div>
                          )}
                    </div>
                      <hr/>
                    {/* FAQ Item 2 */}
                    <div className={`${styles['faq-item']}  p-4`}>
                      <button
                        type="button"
                        onClick={() => toggleAccordion(1)}
                        className="w-full text-left font-semibold text-xl rounded-lg flex items-center gap-3"
                      >
                          <span className={`${styles['open_faq']}`}>
                          {openIndex === 1 ? '-' : '+'}
                        </span>
                        <span className={`${styles['faq-title']}`}>Tipp 2</span>
                        
                      </button>
                      {openIndex === 1 && (
                        <div className={`${styles['faq-txt']}  mt-2 rounded-lg`}>
                          <p>
                          Rahme den Überschuss-Betrag auf deiner BWA rot ein – so sieht der Vermieter sofort die entscheidende Zahl, ohne die gesamte BWA durchgehen zu müssen                          </p>
                        </div>
                      )}
                    </div>
                   
                </div>
              </div>
              </div>
            )}
    </div>
  );
};

export default StepSevenInner;
