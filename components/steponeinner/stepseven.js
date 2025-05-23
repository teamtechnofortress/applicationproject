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
  const [isTipModal, setisTipModal] = useState(false);
   // Set the default open index to 0 (first FAQ item)
   const [openIndex, setOpenIndex] = useState(0);
   // Toggle Accordion Item
   const toggleAccordion = (index) => {
     setOpenIndex(openIndex === index ? null : index); // Close if already open, else open
   };

 // ✅ Ensure preview persists when navigating back to this step
 useEffect(() => {
  if (bwaimages && bwaimages.length > 0) {
    setBwaImageShow(bwaimages[0]); // Show the first image or file
  }
}, [bwaimages]);
  const handleFileChange = async (event) => {
    const file = event.target.files[0];
    if (!file) return;
    const maxSize = Number(process.env.NEXT_PUBLIC_SIZE_IN_MB || 2);
    const allowedTypes = (process.env.NEXT_PUBLIC_ALLOWED_TYPES || "")
      .split(",")
      .map((type) => type.trim());
    const readableTypes = allowedTypes
      .map(type => {
        if (type.includes("jpeg") || type.includes("jpg")) return "JPG";
        if (type.includes("png")) return "PNG";
        if (type.includes("pdf")) return "PDF";
        return "";
      })
      .filter(Boolean)
      .join(", ");

    const newErrors = {};
    if (file) {
      if (!allowedTypes.includes(file.type)) {
          newErrors.bwaimages = `Nur ${readableTypes} Dateien sind erlaubt.`;
      } else if (file.size / (1024 * 1024) > maxSize) {
          newErrors.bwaimages = `Datei ist zu groß. Maximal erlaubt sind ${maxSize} MB.`;
      }
      setErrors((prevErrors) => ({
        ...prevErrors,
        ...newErrors,
      }));
      
      if (Object.keys(newErrors).length > 0) {
        return;
      }
    }

    setIsConverting(true); // ✅ Start loading state
    let imagesArray = []; // :white_check_mark: Store processed images
    if (file.type === "application/pdf") {
      // ✅ Convert PDF to images
      const fileURL = URL.createObjectURL(file);
      const images = await convertPdfToImages(fileURL);
      console.log("Converted PDF to images:", images);

      imagesArray = images; // Store all images from the PDF
      setBwaImageShow(imagesArray[0]); // Show first page preview
    } else {
      imagesArray = [file];
      if (file) {
        const reader = new FileReader();
        reader.onloadend = () => {
          const result = reader.result;
          setBwaImageShow(result);
        };
        reader.readAsDataURL(file);
      }
    }

    // ✅ Ensure bwaimages state is always an array (multiple PDF pages or single image)
    setBwaimages(imagesArray);
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
    // if (!bwaimages || bwaimages.length === 0) {
    //   newErrors.bwaimages = "BWA ist erforderlich.";
    // }

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
                      src={(bwaImageShow)}
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
              <div className="col-span-2">
              <button
                type="button"
                className={`${styles["next-btn"]} bg-gray-500 text-white px-6 py-3 rounded-lg ${isConverting ? " opacity-50 cursor-not-allowed" : ""}`}
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
