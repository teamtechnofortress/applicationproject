import { useState, useRef, useEffect } from "react";
import styles from "@/styles/latest.module.css";
import usePdfToImages from "@/hooks/usePdfToImages";

const StepSixInner = ({
  employment,
  salarySlip,
  employcontract,
  setemploycontract,
  setsalarySlip,
  setCurrentStep,
  salarySlip1,
  salarySlip2,
  salarySlip3,
  setSalarySlip1,
  setSalarySlip2,
  setSalarySlip3,
}) => {
  const { convertPdfToImages } = usePdfToImages(); // ✅ PDF Conversion Hook
  const [errors, setErrors] = useState({});
  const fileInputRef = useRef(null);
  const [isTipModal, setisTipModal] = useState(false);
  // Set the default open index to 0 (first FAQ item)
  const [openIndex, setOpenIndex] = useState(0);
  // Toggle Accordion Item
  const toggleAccordion = (index) => {
    setOpenIndex(openIndex === index ? null : index); // Close if already open, else open
  };

 // ✅ Separate loading states
 const [isConvertingEmploycontract, setIsConvertingEmploycontract] = useState(false);
 const [isConvertingSalarySlip, setIsConvertingSalarySlip] = useState(false);

 // ✅ Separate states for previews & file storage
 const [salarySlipPreview, setSalarySlipPreview] = useState([]);
 const [employcontractPreview, setEmploycontractPreview] = useState(null);
 const [employcontractupdatedFilesstate, setEmploycontractupdatedFilesstate] = useState([]);
 const [updatedImages, setUpdatedImages] = useState([]);
 const [filledSlots, setFilledSlots] = useState([]);
 let coutremoveimg = 1; 


//  useEffect(() => {
//   if (employcontract && employcontract.length > 0) {
//     setEmploycontractPreview(employcontract[0]); 
//   }
// }, [employcontract]);

useEffect(() => {
  if (employcontract && Array.isArray(employcontract) && employcontract.length > 0) {
    // Check if the first item is a File object
    if (employcontract[0] instanceof File) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setEmploycontractPreview(reader.result); // ✅ Show file preview
      };
      reader.readAsDataURL(employcontract[0]);
    } else {
      setEmploycontractPreview(employcontract[0]); // ✅ Show URL if stored images exist
    }
  }
}, [employcontract]);


useEffect(() => {
  // Get the first element of each array if it exists
  const updatedPreview = [
    salarySlip1?.[0] || null, 
    salarySlip2?.[0] || null, 
    salarySlip3?.[0] || null
  ].filter(Boolean); // Remove null values


  const filledArray = [
    salarySlip1 && salarySlip1.length > 0 ? 1 : 0,
    salarySlip2 && salarySlip2.length > 0 ? 1 : 0,
    salarySlip3 && salarySlip3.length > 0 ? 1 : 0,
  ];

  setFilledSlots(filledArray);
  setSalarySlipPreview(updatedPreview);

  // console.log("Updated Salary Slip salarySlip1:", salarySlip1);
  // console.log("Updated Salary Slip salarySlip2:", salarySlip2);
  // console.log("Updated Salary Slip salarySlip3:", salarySlip3);

}, [salarySlip1, salarySlip2, salarySlip3]);


// Separate useEffect to log the latest updated state
useEffect(() => {
  // console.log("Updated filledSlots:", filledSlots);
}, [filledSlots]);

useEffect(() => {
  // console.log("Updated salarySlipPreview:", salarySlipPreview);
}, [salarySlipPreview]);

useEffect(() => {
  // console.log("Updated zunu test salarySlip:", salarySlip);
}, [salarySlip]);

useEffect(() => {
  // console.log("latest Updated salarySlip1:", salarySlip1);
}, [salarySlip1]);

useEffect(() => {
  // console.log("latest Updated salarySlip2:", salarySlip2);
}, [salarySlip2]);

useEffect(() => {
  // console.log("latest Updated salarySlip3:", salarySlip3);
}, [salarySlip3]);

useEffect(() => {
  console.log("latest Updated employcontract:", employcontract);
}, [employcontract]);


 const handleFileChange = async (event, type) => {
  const files = Array.from(event.target.files);
  let imagesArray = []; // ✅ Store processed images


  if (type === "employcontract") {
    setIsConvertingEmploycontract(true); 
    const file = files[0]; 
    if (!file) return;


    if (file.type === "application/pdf") {
      // ✅ Convert PDF to images
      const fileURL = URL.createObjectURL(file);
      const images = await convertPdfToImages(fileURL);
      // console.log("Converted Employcontract PDF to images:", images);

      if (images.length > 0) {
        imagesArray = images; // ✅ Store only images, not the PDF
        setEmploycontractPreview(imagesArray[0]); // ✅ Show PDF name as preview
      }
    } else {
      setEmploycontractPreview(URL.createObjectURL(file)); // ✅ Show image preview
      imagesArray.push(file);

    }
    setEmploycontractupdatedFilesstate(imagesArray);
    setIsConvertingEmploycontract(false); // ✅ Hide loader for employcontract
  } 
  
  else if (type === "salarySlip") {
    setIsConvertingSalarySlip(true); // ✅ Show loader

    let updatedPreviews = [...salarySlipPreview]; // ✅ Store first image previews
    let updatedFiles = [...salarySlip]; // ✅ Store all images in a nested array

    // ✅ Process each file asynchronously
    await Promise.all(files.map(async (file) => {
      let fileImages = []; // ✅ Store images for this file

      if (file.type === "application/pdf") {
        // ✅ Convert PDF to images
        const fileURL = URL.createObjectURL(file);
        const images = await convertPdfToImages(fileURL);
        // console.log("Converted PDF to images:", images);

        if (images.length > 0) {
          fileImages.push(...images); // ✅ Store all images from PDF
          updatedPreviews.push(images[0]); // ✅ Use first image as preview
        }
      } else {
        // ✅ Handle Image Upload (Wait for FileReader to finish)
        const fileURL = URL.createObjectURL(file);

        const imageBase64 = await new Promise((resolve) => {
          const reader = new FileReader();
          reader.onloadend = () => resolve(reader.result);
          reader.readAsDataURL(file);
        });

        fileImages.push(imageBase64); // ✅ Store base64 image in array
        updatedPreviews.push(imageBase64); // ✅ Use image for preview
      }

      updatedFiles.push(fileImages); // ✅ Add images from this file to nested array
    }));

    // ✅ Ensure only 3 files are stored
    setSalarySlipPreview(updatedPreviews.slice(0, 3));
    setsalarySlip(updatedFiles.slice(0, 3));

    // console.log("Updated Salary Slip Files:", updatedFiles);

    setIsConvertingSalarySlip(false); // ✅ Hide loader
  }
};

  const removeSalarySlip = (index,preview) => {

    console.log("Removed index Slip Files:", preview);

    // console.log("salarySlip3",salarySlip3[0]);


    let updatedFilledSlots = [...filledSlots]; // Copy of filled slots array

  // Ensure correct index is cleared
  if (salarySlip1 && salarySlip1[0] && preview === salarySlip1[0]) {
    setSalarySlip1(null);
    updatedFilledSlots[0] = 0; // Mark slot as empty
  } else if (salarySlip2 && salarySlip2[0] && preview === salarySlip2[0]) {
    setSalarySlip2(null);
    updatedFilledSlots[1] = 0; // Mark slot as empty
  } else if (salarySlip3 && salarySlip3[0] && preview === salarySlip3[0]) {
    setSalarySlip3(null);
    updatedFilledSlots[2] = 0; // Mark slot as empty
  }

  setFilledSlots(updatedFilledSlots); // ✅ Update filled slots array
    
    setSalarySlipPreview((prev) => prev.filter((_, i) => i !== index));

    setsalarySlip((prev) => {
      let newArray = [...prev];
      newArray[index] = null; // Set the removed index to null
      return newArray.filter(Boolean); // Remove null values
    });

  };


  const removeEmployContract = () => {
    setEmploycontractPreview(null);
    setemploycontract(null);
    setEmploycontractupdatedFilesstate([]);
    if (fileInputRef.current) fileInputRef.current.value = ""; // Reset input
  };

  const validateFields = () => {
    const newErrors = {};
  
    // Merge stored and newly uploaded salary slips into one array
    let mergedFiles = [salarySlip1, salarySlip2, salarySlip3];
  
    // Fill empty slots with uploaded salarySlip values in the correct order
    salarySlip.forEach((file) => {
      const emptyIndex = mergedFiles.findIndex(
        (item) => !item || (Array.isArray(item) && item.length === 0)
      );
      if (emptyIndex !== -1) {
        mergedFiles[emptyIndex] = file;
      }
    });
  
    // Ensure empty slots are explicitly set to null
    mergedFiles = mergedFiles.map((item) =>
      Array.isArray(item) && item.length === 0 ? null : item
    );
  
    console.log("Final Merged Salary Slips:", mergedFiles);
  
    // ✅ Ensure at least 1 file is uploaded
    const validFiles = mergedFiles.filter((file) => file !== null);
    if (validFiles.length < 1) {
      newErrors.salarySlip = "Bitte laden Sie mindestens einen Gehaltsnachweis hoch.";
    }
  
    // ✅ Ensure no more than 3 files are uploaded
    if (validFiles.length > 3) {
      newErrors.salarySlip = "Sie können maximal 3 Gehaltsnachweise hochladen.";
    }

    if (employcontractupdatedFilesstate.length !== 0) {
      // console.log("Updating imageswbs with new images from updatedImages");
      setemploycontract(employcontractupdatedFilesstate);
    }
  
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };
  
  const validateFieldsemploy = () => {
    const newErrors = {};
  
    if (employcontractupdatedFilesstate.length !== 0) {
      // console.log("Updating imageswbs with new images from updatedImages");
      setemploycontract(employcontractupdatedFilesstate);
      return true;
    }
    // If imageswbs already contains images, no need to update
    if (employcontract && employcontract.length > 0) {
      // console.log("Validation passed, images already assigned:", employcontract);
      return true;
    } 
    // newErrors.employcontract = "employcontract vorhanden sind.";
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
      <button
        type="button"
        className={`${styles["tips"]} mx-auto mb-10`}
        id="tip_btn"
        onClick={() => setisTipModal(true)}>
        <img src="/images/tip.svg" alt="Tip Icon" /> <span>Tipps</span>
      </button>

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
             {/* {typeof employcontractPreview === "string" && (employcontractPreview.startsWith("data:image") || employcontractPreview.startsWith("blob:") || /\.(png|jpe?g|gif|webp)$/i.test(employcontractPreview) ) ? ( */}

              {preview.startsWith("data:image") || preview.startsWith("blob:") || /\.(png|jpe?g|gif|webp)$/i.test(preview) ? (
                <img src={preview} alt={`Gehaltsnachweis Preview ${index + 1}`} className="object-cover w-full h-full rounded-lg" />
              ) : (
                <div className="w-full h-full bg-gray-200 flex justify-center items-center text-sm text-gray-500">
                  <span>PDF</span>
                </div>
              )}
              <button
                type="button"
                className="absolute top-1 right-1 bg-red-500 text-white p-1 rounded-full text-xs"
                onClick={() => removeSalarySlip(index,preview)}
              >
                ×
              </button>
            </div>
          ))}
        </div>
        {errors.salarySlip && <p className="text-red-500 text-sm">{errors.salarySlip}</p>}
      </div>

      {/* ✅ Upload Employment Contract */}
      {employment === "Nein" && (
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
        {/* :white_check_mark: Show Loader only for Employ Contract */}
        {isConvertingEmploycontract && (
            <div className="flex justify-center mt-4">
              <div className="loader"></div>
            </div>
          )}
          {/* :white_check_mark: Employment Contract Preview */}
          {employcontractPreview && !isConvertingEmploycontract && (
            <div className="relative w-24 h-24 mt-4">
              {typeof employcontractPreview === "string" && (employcontractPreview.startsWith("data:image") || employcontractPreview.startsWith("blob:") || /\.(png|jpe?g|gif|webp)$/i.test(employcontractPreview) ) ? (
                <img
                  src={employcontractPreview}
                  alt="Employment Contract Preview"
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
                onClick={removeEmployContract}
              >
                ×
              </button>
            </div>
          )}
        </div>
      )}

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
                if (salarySlip.length !== 0) {
                  let updatedFilledSlots = [...filledSlots]; // Copy current filled slots array
            
                  salarySlip.forEach((file) => {
                    if ((!salarySlip1 || salarySlip1.length === 0) && updatedFilledSlots[0] === 0) {
                      setSalarySlip1(file);
                      updatedFilledSlots[0] = 1; // Mark slot as filled
                    } else if ((!salarySlip2 || salarySlip2.length === 0) && updatedFilledSlots[1] === 0) { 
                      setSalarySlip2(file);
                      updatedFilledSlots[1] = 1;
                    } else if ((!salarySlip3 || salarySlip3.length === 0) && updatedFilledSlots[2] === 0) {
                      setSalarySlip3(file);
                      updatedFilledSlots[2] = 1;
                    }
                  });
            
                  // console.log("end Updated salarySlip1:", salarySlip1);
                  // console.log("end Updated salarySlip2:", salarySlip2);
                  // console.log("end Updated salarySlip3:", salarySlip3);
                  console.log("end Updated employcontract:", employcontract);
            
                  setFilledSlots(updatedFilledSlots); // ✅ Update the filledSlots array
                }
                setCurrentStep(8);
              }
            }}
            
          >
            Weiter
          </button>
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
                              Bist du noch in der Probezeit? Lade die relevanten Seiten deines Arbeitsvertrags hoch (Anschrift & Firma, Gehalt, Befristung) – der Vermieter braucht diese Infos
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
                          Dein Job startet erst in Zukunft? Lass dir eine Arbeitgeberbescheinigung ausstellen, die Startdatum, Position und monatliches Einkommen enthält.
                          </p>
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
                          Ist dein Arbeitsvertrag befristet? Erkläre im Anschreiben kurz warum und füge Nachweise für deine neue Stelle oder Beschäftigung bei – so beugst du Rückfragen vor.
                            </p>
                        </div>
                      )}
                    </div>
                    <hr/>
                    {/* FAQ Item 4 */}
                    <div className={`${styles['faq-item']}  p-4`}>
                      <button
                        type="button"
                        onClick={() => toggleAccordion(3)}
                        className="w-full text-left font-semibold text-xl rounded-lg flex items-center gap-3"
                      >
                          <span className={`${styles['open_faq']}`}>
                          {openIndex === 3 ? '-' : '+'}
                        </span>
                        <span className={`${styles['faq-title']}`}>Tipp 4</span>
                        
                      </button>
                      {openIndex === 3 && (
                        <div className={`${styles['faq-txt']}  mt-2 rounded-lg`}>
                          <p>
                          Ein Elternteil kann als Bürge einspringen. Halte dafür alle relevanten Dokumente bereit. Oft tritt der Bürge als Hauptmieter in den Mietvertrag ein und sollte deshalb als zusätzliche Person in der Bewerbermappe aufgeführt werden.</p>
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

export default StepSixInner;