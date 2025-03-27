import { useEffect, useState, useRef } from "react";
import styles from "@/styles/latest.module.css";
import usePdfToImages from "@/hooks/usePdfToImages"; // ✅ Import the PDF conversion hook

const StepFourInner = ({
  schufa, 
  setSchufa, 
  setCurrentStep
}) => {
  const { convertPdfToImages } = usePdfToImages(); // ✅ Use the hook for PDF conversion
  const [errors, setErrors] = useState({});
  const [isTipModal, setisTipModal] = useState(false);
  const [isConverting, setIsConverting] = useState(false); // ✅ Track conversion status
  const fileInputRef = useRef(null);
  const [schufaImageShow, setSchufaImageShow] = useState(null); // ✅ For preview display
  const [openIndex, setOpenIndex] = useState(0); // ✅ For FAQ accordion
 // ✅ Ensure preview persists when navigating back to this step
 useEffect(() => {
  if (schufa && schufa.length > 0) {
    const first = schufa[0];

    if (typeof first === "string") {
      // Already a URL or base64 string
      setSchufaImageShow(first);
    } else if (first instanceof File) {
      // Convert File to base64 for consistent preview
      const reader = new FileReader();
      reader.onloadend = () => setSchufaImageShow(reader.result);
      reader.readAsDataURL(first);
    }
  }
}, [schufa]);

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
      setSchufaImageShow(file); // Show first page preview
    } else {
      // ✅ Directly add uploaded image
      updatedImages = [file];
      if (file) {
        const reader = new FileReader();
        reader.onloadend = () => {
          const result = reader.result;
          setSchufaImageShow(result);
        };
        reader.readAsDataURL(file);
      }
    }

    // ✅ Ensure schufa state is always an array (multiple PDF pages or single image)
    setSchufa(updatedImages);
    setIsConverting(false); // ✅ Stop loading state
  };

  const removeImage = () => {
    setSchufa([]);
    setSchufaImageShow(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = ""; // Reset input field
    }
  };

  const validateFields = () => {
    const newErrors = {};
    if (!schufa || schufa.length === 0) {
      newErrors.schufa = "Schufa ist erforderlich.";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0; // ✅ Return true if no errors
  };

  // ✅ Toggle Accordion Item
  const toggleAccordion = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="flex items-center justify-center">
      <div className="w-full bg-white shadow-lg rounded-lg p-6">
        <p className={`${styles["main-heading"]} mt-10 text-center font-bold`}>Schufa</p>
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
            <i className="fa fa-upload mr-2"></i> Uploads Schufa
          </label>
          <input
            type="file"
            id="image-upload"
            name="schufa"
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
          {schufaImageShow && !isConverting && (
            <div className="relative w-24 h-24 mt-4">
            {typeof schufaImageShow === "string" && schufaImageShow.startsWith('data:image') || /\.(png|jpe?g|gif|webp)$/i.test(schufaImageShow) ? (

                <img
                  src={(schufaImageShow)}
                  alt="Schufa Preview"
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
            <div class="mt-4 grid grid-cols-3 gap-4"></div>
            <a href="#" className={`${styles["next-btn"]} text-white px-6 py-3 rounded-lg text-center`}>
            Hier Schufaauskunft erhalten
          </a>
        </div>

       

        <div className="flex justify-between mt-10">
          <button type="button" className="bg-gray-300 text-gray-700 px-4 py-2 rounded-lg" onClick={() => setCurrentStep(16)}>
            Zurück
          </button>

          <button
            type="button"
            className={`bg-gray-500 text-white px-6 py-3 rounded-lg ${isConverting ? "opacity-50 cursor-not-allowed" : ""}`}
            onClick={() => setCurrentStep(18)}
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
                            Bite nutze ausschließlich die Schufa-Auskunft welche extra für den Vermieter gedacht ist und nutze dafür den unten zur verfügung stehend Link. Viele Vermieter akzeptieren die kostenlose Schufa-Auskunft nicht                              </p>
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
                        Achte auf die gültigkeit deiner Schufaauskunft. Diese ist nur 3 Monate gültig und wird danach nicht mehr von den Vermietern akzeptiert.                         </p>
                      </div>
                    )}
                  </div>
                  <hr/>
                  {/* FAQ Item 3 */}
                  <div className={`${styles['faq-item']}  p-4`}>
                    <button
                      type="button"
                      onClick={() => toggleAccordion(2)}
                      className="w-full text-left font-semibold text-xl rounded-lg flex items-center gap-3"
                    >
                        <span className={`${styles['open_faq']}`}>
                        {openIndex === 2 ? '-' : '+'}
                      </span>
                      <span className={`${styles['faq-title']}`}>Tipp 3</span>
                      
                    </button>
                    {openIndex === 2 && (
                      <div className={`${styles['faq-txt']}  mt-2 rounded-lg`}>
                        <p>
                        Solltest du die Schufa-Auskunft per post zugeschickt bekommen dich aber bereits vor eintrefffen auf eine Wohnung bewerden wollen, kannst du eine veraltete Schufaauskunft einreichen und den hinweis auf die getätigte bestellung der neuen geben.                        </p>
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

export default StepFourInner;
