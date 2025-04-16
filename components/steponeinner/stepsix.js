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
  const [isTipModal, setisTipModal] = useState(false);

  // Set the default open index to 0 (first FAQ item)
  const [openIndex, setOpenIndex] = useState(0);
  // Toggle Accordion Item
  const toggleAccordion = (index) => {
    setOpenIndex(openIndex === index ? null : index); // Close if already open, else open
  };

  const { convertPdfToImages } = usePdfToImages(); // :white_check_mark: PDF Conversion Hook
  const [errors, setErrors] = useState({});
  const fileInputRef = useRef(null);
 // :white_check_mark: Separate loading states
 const [isConvertingEmploycontract, setIsConvertingEmploycontract] = useState(false);
 const [isConvertingSalarySlip, setIsConvertingSalarySlip] = useState(false);
 // :white_check_mark: Separate states for previews & file storage
 const [salarySlipPreview, setSalarySlipPreview] = useState([]);
 const [employcontractPreview, setEmploycontractPreview] = useState(null);
 const [employcontractupdatedFilesstate, setEmploycontractupdatedFilesstate] = useState([]);
 useEffect(() => {
  if (salarySlip && salarySlip.length > 0) {
    // Flatten nested salarySlip array and use first images as preview
    const previews = salarySlip.map(file => Array.isArray(file) ? file[0] : file);
    setSalarySlipPreview(previews);
  }
}, [salarySlip]);

useEffect(() => {
  if (employcontract && employcontract.length > 0) {
    const preview = Array.isArray(employcontract[0]) ? employcontract[0][0] : employcontract[0];
    setEmploycontractPreview(preview);
  }
}, [employcontract]);
let employcontractupdatedFiles = [];
 const handleFileChange = async (event, type) => {
  const files = Array.from(event.target.files);
  if (type === "employcontract") {
    setIsConvertingEmploycontract(true);
    const file = files[0];
    if (!file) return;
    if (file.type === "application/pdf") {
      // :white_check_mark: Convert PDF to images
      const fileURL = URL.createObjectURL(file);
      const images = await convertPdfToImages(fileURL);
      console.log("Converted Employcontract PDF to images:", images);
      if (images.length > 0) {
        employcontractupdatedFiles = images; // :white_check_mark: Store only images, not the PDF
        setEmploycontractPreview(employcontractupdatedFiles[0]); // :white_check_mark: Show PDF name as preview
        setEmploycontractupdatedFilesstate(employcontractupdatedFiles);
      }
    } else {
      setEmploycontractPreview(URL.createObjectURL(file)); // :white_check_mark: Show image preview
      employcontractupdatedFiles.push(file);
      setEmploycontractupdatedFilesstate(employcontractupdatedFiles);
    }
    setIsConvertingEmploycontract(false); // :white_check_mark: Hide loader for employcontract
  }
  else if (type === "salarySlip") {
    setIsConvertingSalarySlip(true); // :white_check_mark: Show loader
    let updatedPreviews = [...salarySlipPreview]; // :white_check_mark: Store first image previews
    let updatedFiles = [...salarySlip]; // :white_check_mark: Store all images in a nested array
    // :white_check_mark: Process each file asynchronously
    await Promise.all(files.map(async (file) => {
      let fileImages = []; // :white_check_mark: Store images for this file
      if (file.type === "application/pdf") {
        // :white_check_mark: Convert PDF to images
        const fileURL = URL.createObjectURL(file);
        const images = await convertPdfToImages(fileURL);
        console.log("Converted PDF to images:", images);
        if (images.length > 0) {
          fileImages.push(...images); // :white_check_mark: Store all images from PDF
          updatedPreviews.push(images[0]); // :white_check_mark: Use first image as preview
        }
      } else {
        // :white_check_mark: Handle Image Upload (Wait for FileReader to finish)
        const fileURL = URL.createObjectURL(file);
        const imageBase64 = await new Promise((resolve) => {
          const reader = new FileReader();
          reader.onloadend = () => resolve(reader.result);
          reader.readAsDataURL(file);
        });
        fileImages.push(imageBase64); // :white_check_mark: Store base64 image in array
        updatedPreviews.push(imageBase64); // :white_check_mark: Use image for preview
      }
      updatedFiles.push(fileImages); // :white_check_mark: Add images from this file to nested array
    }));
    // :white_check_mark: Ensure only 3 files are stored
    setSalarySlipPreview(updatedPreviews.slice(0, 3));
    setsalarySlip(updatedFiles.slice(0, 3));
    console.log("Updated Salary Slip Files:", updatedFiles);
    setIsConvertingSalarySlip(false); // :white_check_mark: Hide loader
  }
};
  const removeSalarySlip = (index) => {
    setSalarySlipPreview((prev) => prev.filter((_, i) => i !== index));
    setsalarySlip((prev) => prev.filter((_, i) => i !== index));
  };
  const removeEmployContract = () => {
    setEmploycontractPreview(null);
    setemploycontract(null);
    if (fileInputRef.current) fileInputRef.current.value = ""; // Reset input
  };
  const validateFields = () => {
    const newErrors = {};
    const totalFiles = salarySlip.length; // Count each uploaded file (PDF or image) as 1
    console.log("Total Salary Slip Files Uploaded:", totalFiles);
    if (totalFiles < 1 || totalFiles > 3) {
      newErrors.salarySlip = "Bitte laden Sie zwischen 1 und 3 Gehaltsnachweise hoch.";
    }
    if (employcontractPreview) {
      setemploycontract(employcontractupdatedFilesstate);
      console.log("Validation passed, updated images assigned to state:", employcontract);
    }
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
      <button type="button" className={`${styles["tips"]} mx-auto mb-10`}  id="tip_btn"
                    onClick={() => setisTipModal(true)}>
                    <img src="/images/tip.svg" alt="Tip Icon" /> <span>Tipps</span>
       </button>      
      <img src="/images/salary.png" alt="ID Front" className="w-[73%] lg:w-[23%] h-auto mx-auto" />
      {/* :white_check_mark: Upload Salary Slips */}
      <div className="flex flex-col items-center justify-center w-[100%] lg:w-[40%] mx-auto">
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
        {/* :white_check_mark: Show Loader only for Salary Slip */}
        {isConvertingSalarySlip && (
          <div className="flex justify-center mt-4">
            <div className="loader"></div>
          </div>
        )}
        {/* :white_check_mark: Salary Slips Preview */}
        <div className="mt-4 grid grid-cols-3 gap-4">
          {salarySlipPreview.map((preview, index) => (
            <div key={index} className="relative w-24 h-24">
              {preview.startsWith("data:image") || preview.startsWith("blob:") ? (
                <img src={preview} alt={`Gehaltsnachweis Preview ${index + 1}`} className="object-cover w-full h-full rounded-lg" />
              ) : (
                <div className="w-full h-full bg-gray-200 flex justify-center items-center text-sm text-gray-500">
                  <span>PDF</span>
                </div>
              )}
              <button
                type="button"
                className="absolute top-1 right-1 bg-red-500 text-white p-1 rounded-full text-xs"
                onClick={() => removeSalarySlip(index)}
              >
                ×
              </button>
            </div>
          ))}
        </div>
        {errors.salarySlip && <p className="text-red-500 text-sm">{errors.salarySlip}</p>}
      </div>
      {/* :white_check_mark: Upload Employment Contract */}
      {employment === "Nein" && (
        <div className="flex flex-col mt-5 lg:mt-10 items-center justify-center w-[100%] lg:w-[40%] mx-auto">
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
      {/* :white_check_mark: Navigation Buttons */}
      <div className="flex justify-between mt-10">
        <button
          type="button"
          className="bg-gray-300 text-gray-700 px-4 py-2 lg:py-3 rounded-lg"
          onClick={() => setCurrentStep(4)}
        >
          Zurück
        </button>
        <div className="col-span-2">
          <button
            type="button"
            className={`${styles["next-btn"]} text-white px-6 py-2 lg:py-3 rounded-lg bg-blue-500 mx-auto block`}
            onClick={() => {
              if (validateFields()) {
                setSalarySlip1(salarySlip[0]);
                setSalarySlip2(salarySlip[1]);
                setSalarySlip3(salarySlip[2]);
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
                        <span className={`${styles['faq-title']}`}>Tipp 1</span>
                        
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
                    {/* FAQ Item 2 */}
                    <div className={`${styles['faq-item']}  p-4`}>
                      <button
                        type="button"
                        onClick={() => toggleAccordion(3)}
                        className="w-full text-left font-semibold text-xl rounded-lg flex items-center gap-3"
                      >
                          <span className={`${styles['open_faq']}`}>
                          {openIndex === 3 ? '-' : '+'}
                        </span>
                        <span className={`${styles['faq-title']}`}>Tipp 2</span>
                        
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