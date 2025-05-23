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
  const [isConverting, setIsConverting] = useState(false); 
  const fileInputRef = useRef(null);
  const [previewImage, setPreviewImage] = useState(null); 
  const [updatedImages, setUpdatedImages] = useState([]);

 // ✅ Ensure preview persists when navigating back to this step

//  useEffect(() => {
//   if (mietschuldenfreiheitimg && mietschuldenfreiheitimg.length > 0) {
//     setPreviewImage(mietschuldenfreiheitimg[0]); // Show the first image or file
//   }
// }, [mietschuldenfreiheitimg]);


useEffect(() => {
  if (mietschuldenfreiheitimg && Array.isArray(mietschuldenfreiheitimg) && mietschuldenfreiheitimg.length > 0) {
    // Check if the first item is a File object
    if (mietschuldenfreiheitimg[0] instanceof File) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewImage(reader.result); // ✅ Show file preview
      };
      reader.readAsDataURL(mietschuldenfreiheitimg[0]);
    } else {
      setPreviewImage(mietschuldenfreiheitimg[0]); // ✅ Show URL if stored images exist
    }
  }
}, [mietschuldenfreiheitimg]);

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
          newErrors.mietschuldenfreiheitimg = `Nur ${readableTypes} Dateien sind erlaubt.`;
      } else if (file.size / (1024 * 1024) > maxSize) {
          newErrors.mietschuldenfreiheitimg = `Datei ist zu groß. Maximal erlaubt sind ${maxSize} MB.`;
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
    let imagesArray = []; 

    if (file.type === "application/pdf") {
      // ✅ Convert PDF to images
      const fileURL = URL.createObjectURL(file);
      const images = await convertPdfToImages(fileURL);
      console.log("Converted PDF to images:", images);

      imagesArray = images; // Store all images from the PDF
      setPreviewImage(imagesArray[0]); // Show first page preview
    } else {
      // ✅ Directly add uploaded image
      imagesArray = [file];
      if (file) {
        const reader = new FileReader();
        reader.onloadend = () => {
          const result = reader.result;
          setPreviewImage(result);
        };
        reader.readAsDataURL(file);
      }
      // setPreviewImage(file); // Show image preview
    }
    setUpdatedImages(imagesArray);
    // ✅ Ensure mietschuldenfreiheitimg state is always an array (multiple PDF pages or single image)
    setIsConverting(false); // ✅ Stop loading state
  };

  const removeImage = () => {
    setMietschuldenfreiheitimg([]);
    setUpdatedImages([]);
    setPreviewImage(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = ""; 
    }
  };

  const validateFields = () => {
    const newErrors = {};

    if (updatedImages.length !== 0) {
      console.log("Updating imageswbs with new images from updatedImages");
      setMietschuldenfreiheitimg(updatedImages);
      // return true;
    }
    // If imageswbs already contains images, no need to update
    // if (mietschuldenfreiheitimg && mietschuldenfreiheitimg.length > 0) {
    //   console.log("Validation passed, images already assigned:", mietschuldenfreiheitimg);
    //   return true;
    // } 
    // newErrors.mietschuldenfreiheitimg = "Mietschuldenfreiheitsbescheinigung ist erforderlich.";
  
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;



    // console.log(mietschuldenfreiheitimg)
    // const newErrors = {};
    // if (!mietschuldenfreiheitimg) {
    //   newErrors.mietschuldenfreiheitimg = "Mietschuldenfreiheitsbescheinigung ist erforderlich.";
    // }
    // setMietschuldenfreiheitimg(updatedImages);


    // setErrors(newErrors);
    // return Object.keys(newErrors).length === 0; // ✅ Return true if no errors
  };

  return (
    <div className="flex items-center justify-center">
      <div className="w-full bg-white shadow-lg rounded-lg p-6">
        <p className={`${styles["main-heading"]} mt-10 text-center font-bold`}>Mietschuldenfreiheit</p>
        {/* <p className={`${styles["p-address"]} mb-10 text-center w-[90%] lg:w-[60%] mx-auto`}>
          Diese kannst du auch später hochladen, solltest du sie gerade nicht zur Hand haben.
        </p> */}

        <button type="button" className={`${styles["tips"]} mx-auto`} onClick={() => setisTipModal(true)}>
          <img src="/images/tip.svg" alt="Tip Icon" /> <span>Tipps</span>
        </button>

        <div className="flex flex-col mt-10 items-center justify-center w-[80%] lg:w-[40%] mx-auto">
          <label
            htmlFor="image-upload"
            className={`${styles["upload-btn"]} ${styles["form-input"]} w-full px-4 py-2 text-center text-black rounded-lg cursor-pointer`}
          >
            <i className="fa fa-upload mr-2"></i> Upload der Mitschuldenfreiheit
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
              {typeof previewImage === "string" && previewImage.startsWith('data:image') || /\.(png|jpe?g|gif|webp)$/i.test(previewImage) ? (
                <img
                  src={previewImage}
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
          {errors.mietschuldenfreiheitimg && (
            <p className="text-red-500 text-sm mt-2">{errors.mietschuldenfreiheitimg}</p>
          )}

        </div>

        <div className="flex justify-between mt-10">
          <button type="button" className="bg-gray-300 text-gray-700 px-4 py-2 rounded-lg" onClick={() => setCurrentStep(18)}>
            Zurück
          </button>
          <div className="col-span-2">
          <button
           type="submit"
            className={`${styles["next-btn"]} bg-gray-500 text-white px-6 py-3 rounded-lg ${isConverting ? "opacity-50 cursor-not-allowed" : ""}`}
            // onClick={() => {
            //   if (validateFields()) {
            //     setCurrentStep(20);
            //   }
            // }}
            disabled={isConverting} // ✅ Disable while converting PDF
          >
            {isConverting ? "Verarbeiten..." : "Weiter"}
          </button>
          </div>
        </div>
      </div>

      {/* ✅ Modal - Conditional Rendering */}
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
            <div className="p-4 space-y-4">
              <p>Achte auch hier auf die Gültigkeit der Mietschuldenfreiheitsbescheinigung, diese sollte in der Regel nicht älter als 3 Monate sein und die gleiche Adresse aufweisen die auch auf deinem Ausweis und den Gehaltsnachweisen zu finden ist.</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default StepSixInner;
