import { useEffect, useState, useRef } from "react";
import styles from "@/styles/latest.module.css";
import usePdfToImages from "@/hooks/usePdfToImages"; // ✅ Import the PDF conversion hook

const StepThreeInner = ({
  personal, 
  setPersonal, 
  idback,
  setIdback,
  setCurrentStep,
}) => {
  const { convertPdfToImages } = usePdfToImages(); // ✅ Use the hook for PDF conversion
  const [errors, setErrors] = useState({});
  const [isTipModal, setisTipModal] = useState(false);
  const [openIndex, setOpenIndex] = useState(0);
  const [isConverting, setIsConverting] = useState(false); // ✅ Track conversion status
  const [isidbackConverting, setIdbackIsConverting] = useState(false); // ✅ Track conversion status
  const fileInputRef = useRef(null);
  const idbackRef = useRef(null);
  const [previewImage, setPreviewImage] = useState(null); // ✅ For preview display
  const [updatedImages, setUpdatedImages] = useState([]);
  const [updatedidbackImages, setUpdatedIdbackImages] = useState([]);
  const [idbackpreviewImage, setIdbackPreviewImage] = useState(null); // ✅ For preview display




   // Toggle Accordion Item
   const toggleAccordion = (index) => {
    setOpenIndex(openIndex === index ? null : index); // Close if already open, else open
  };

   // ✅ Ensure preview persists when navigating back to this step
//  useEffect(() => {
//   if (personal && personal.length > 0) {
//     setPreviewImage(personal[0]); // Show the first image or file
//   }
// }, [personal]);


useEffect(() => {
  if (personal && Array.isArray(personal) && personal.length > 0) {
    // Check if the first item is a File object
    if (personal[0] instanceof File) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewImage(reader.result); // ✅ Show file preview
      };
      reader.readAsDataURL(personal[0]);
    } else {
      setPreviewImage(personal[0]); // ✅ Show URL if stored images exist
    }
  }
  
  if (idback && Array.isArray(idback) && idback.length > 0) {
    // Check if the first item is a File object
    if (idback[0] instanceof File) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setIdbackPreviewImage(reader.result); // ✅ Show file preview
      };
      reader.readAsDataURL(idback[0]);
    } else {
      setIdbackPreviewImage(idback[0]); // ✅ Show URL if stored images exist
    }
  }
}, [personal,idback]);


  const handleFileChange = async (event) => {
    const file = event.target.files[0];
    const fieldName = event.target.name;

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
        if(fieldName === "personal"){
          newErrors.personal = `Nur ${readableTypes} Dateien sind erlaubt.`;
        }else{
          newErrors.idback = `Nur ${readableTypes} Dateien sind erlaubt.`;
        }
      } else if (file.size / (1024 * 1024) > maxSize) {
        if(fieldName === "personal"){
          newErrors.personal = `Datei ist zu groß. Maximal erlaubt sind ${maxSize} MB.`;
        }else{
          newErrors.idback = `Datei ist zu groß. Maximal erlaubt sind ${maxSize} MB.`;
        }
      }
      setErrors((prevErrors) => ({
        ...prevErrors,
        ...newErrors,
      }));
      
      if (Object.keys(newErrors).length > 0) {
        return;
      }
    }

    if (fieldName === "personal") {
      setIsConverting(true); // ✅ Set conversion status
    }
    if (fieldName === "idback") {
      setIdbackIsConverting(true); // ✅ Set conversion status 
    }

    if (!file) return;
    let imagesArray = []; // ✅ Store processed images


    if (file.type === "application/pdf") {
      // ✅ Convert PDF to images
      const fileURL = URL.createObjectURL(file);
      const images = await convertPdfToImages(fileURL);
      console.log("Converted PDF to images:", images);

      imagesArray = images; // Store all images from the PDF

      if (fieldName === "personal") {
          setPreviewImage(imagesArray[0]); // Show first page preview
      }else if (fieldName === "idback") {
        setIdbackPreviewImage(imagesArray[0]); 
      }

    } else {
      // ✅ Directly add uploaded image
      imagesArray = [file];
      if (file) {
        if (fieldName === "personal") {
          const reader = new FileReader();
          reader.onloadend = () => {
            const result = reader.result;
            setPreviewImage(result);
          };
          reader.readAsDataURL(file);

        }else if (fieldName === "idback") {
          const reader = new FileReader();
          reader.onloadend = () => {
            const result = reader.result;
            setIdbackPreviewImage(result);
          };
          reader.readAsDataURL(file);
        }

      }
      // setPreviewImage(file); // Show image preview
    }
    if (fieldName === "personal") {
      setUpdatedImages(imagesArray);
      // ✅ Ensure `personal` state is always an array (multiple PDF pages or single image)
      setIsConverting(false); // ✅ Stop loading state

    }else if (fieldName === "idback") {
      setUpdatedIdbackImages(imagesArray);
      setIdbackIsConverting(false);
    }
  };

  const removeImage = () => {
    setUpdatedImages([]);
    setPersonal([]);
    setPreviewImage(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = ""; // Reset input field
    }
  };
  const removeidbackImage = () => {
    setUpdatedIdbackImages([]);
    setIdback([]);
    setIdbackPreviewImage(null);
    if (idbackRef.current) {
      idbackRef.current.value = ""; // Reset input field
    }
  };

  const validateFields = () => {
    const newErrors = {};

    if (updatedImages.length !== 0) {
      console.log("Updating imageswbs with new images from updatedImages");
      setPersonal(updatedImages);
      // return true;
    }
    if (updatedidbackImages.length !== 0) {
      console.log("Updating idback with new images from updatedidbackImages");
      setIdback(updatedidbackImages);
      // return true;
    }
    // If imageswbs already contains images, no need to update
    // if (personal && personal.length > 0) {
    //   console.log("Validation passed, images already assigned:", personal);
    //   return true;
    // } 
      // newErrors.personal = "Personalausweis ist erforderlich.";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0; // ✅ Return true if no errors
  };

  return (
    <div className="flex items-center justify-center">
      <div className="w-full bg-white shadow-lg rounded-lg p-6">
        <p className={`${styles["main-heading"]} mt-10 text-center font-bold`}>Personalausweis</p>
        <p className={`${styles["p-address"]} mb-10 text-center w-[80%] lg:w-[60%] mx-auto`}>
          Bitte lade nun eine Kopie deines Personalausweises hoch. In dem Beispiel siehst du, welche Stellen du schwärzen darfst.
        </p>

        <button type="button" className={`${styles["tips"]} mx-auto`} onClick={() => setisTipModal(true)}>
          <img src="/images/tip.svg" alt="Tip Icon" /> <span>Tipps</span>
        </button>

        <div className="grid grid-cols-2 mt-5 gap-10 mt-3 mb-3">
          <div className="col-span-1 flex items-center justify-end">
            <img src="/idfront.jpeg" alt="ID Front" className="w-[73%] lg:w-[53%] h-auto" />
          </div>
          <div className="col-span-1 flex items-center">
            <img src="/idback.jpeg" alt="ID Back" className="w-[75%] lg:w-[55%] h-auto" />
          </div>
        </div>

        <div className="flex flex-col mt-10 items-center justify-center w-[80%] lg:w-[40%] mx-auto">
          <label
            htmlFor="image-upload"
            className={`${styles["upload-btn"]} ${styles["form-input"]} w-full px-4 py-2 text-center text-black rounded-lg cursor-pointer`}
          >
            <i className="fa fa-upload mr-2"></i> Upload Vorderseite
          </label>
          <input
            type="file"
            id="image-upload"
            name="personal"
            className="hidden"
            accept="image/*, application/pdf"
            ref={fileInputRef}
            onChange={handleFileChange}
          />
          {errors.personal && (
            <p className="text-red-500 text-sm">{errors.personal}</p>
          )}
          {/* ✅ Show Spinner when Converting PDF */}
          {isConverting && (
            <div className="flex justify-center mt-4">
              <div className="loader"></div>
            </div>
          )}

          {/* ✅ Image Preview */}
          {previewImage && !isConverting && (
            <div className="relative w-24 h-24 mt-4">
              {typeof previewImage === "string" && previewImage.startsWith('data:image') || /\.(png|jpe?g|gif|webp)$/i.test(previewImage) ? (
                <img
                  src={previewImage}
                  alt="Personalausweis Preview"
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

        <div className="flex flex-col mt-10 items-center justify-center w-[80%] lg:w-[40%] mx-auto">
        <label
            htmlFor="idback-upload"
            className={`${styles["upload-btn"]} ${styles["form-input"]} w-full px-4 py-2 text-center text-black rounded-lg cursor-pointer`}
          >
            <i className="fa fa-upload mr-2"></i> Upload Rückseite
          </label>
          <input
            type="file"
            id="idback-upload"
            name="idback"
            className="hidden"
            accept="image/*, application/pdf"
            ref={idbackRef}
            onChange={handleFileChange}
          />

          {/* ✅ Show Spinner when Converting PDF */}
          {isidbackConverting && (
            <div className="flex justify-center mt-4">
              <div className="loader"></div>
            </div>
          )}

          {/* ✅ Image Preview */}
          {idbackpreviewImage && !isidbackConverting && (
            <div className="relative w-24 h-24 mt-4">

            {typeof idbackpreviewImage === "string" && idbackpreviewImage.startsWith('data:image') || /\.(png|jpe?g|gif|webp)$/i.test(idbackpreviewImage) ? (

                <img
                  src={(idbackpreviewImage)}
                  alt="Personalausweis Preview"
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
                onClick={removeidbackImage}
              >
                ×
              </button>
            </div>
          )}
          {errors.idback && <p className="text-red-500 text-sm">{errors.idback}</p>}

        </div>

        <div className="flex justify-between mt-10">
        <button type="button" className="bg-gray-300 text-gray-700 px-4 py-2 lg:py-3 rounded-lg" onClick={() => {setCurrentStep(15)} }>
            Zurück
          </button>
          <div className="col-span-2">
          <button
            type="button"
            className={`${styles["next-btn"]} bg-gray-500 text-white px-6 py-3 rounded-lg ${isConverting ? "opacity-50 cursor-not-allowed" : ""}`}
            onClick={() => {
              if(validateFields()){
                setCurrentStep(17)}}
              }
            disabled={isConverting}
          >
            {isConverting ? "Verarbeiten..." : "Weiter"}
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
                            Achte auf die Gültigkeit deines Ausweisdokuments. Sollte dieser Abgelaufen sein, oder noch eine alte Meldeadresse aufweisen, erkläre dies in deinem Anschreiben</p>
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
                        Lädst du statt deines Ausweises einen Reisepass oder Aufenthaltstitel hoch? Dann füge unbedingt eine Meldebescheinigung vom Bürgeramt hinzu.</p>
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
                        Schwärze sensible Daten wie Seriennummer und Zugangsnummer, die der Vermieter nicht einsehen muss (siehe Beispielbild). Du kannst auch einen großen "KOPIE"-Schriftzug über dein Dokument legen.</p>
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

export default StepThreeInner;
