import { useEffect, useState } from "react";
import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css";
import styles from "@/styles/latest.module.css";

const StepOneInner = ({
 setComponents, handleChange,currentStep,setCurrentStep
}) => {
  const [errors, setErrors] = useState({});



  const handleNextClick = () => {
    setComponents(2);
    setCurrentStep(10);
  };


  return (
    <div className={`${styles["bg-second"]} flex flex-col items-center`}>
       <div className={`${styles["bg-heading"]} w-full text-center`}>
         <p className={`${styles["main-heading-2"]} mt-10 mb-10 font-bold`}>Schritt 3</p>
       </div>
     
       <p className={`${styles["second-heading"]} mt-10 mb-10 font-bold`}>Uploads</p>
     
       <div className="flex justify-between w-[70%] mx-auto mt-10 px-4">
         <button
           type="button"
           className="bg-gray-300 text-gray-700 px-4 py-2 rounded-lg w-[8%] mx-auto"
           
           onClick={handleNextClick}
         >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 25 25"
            className="h-8 w-8" // Increased size
            aria-label="Back Arrow"
          >
            <path
              style={{ fill: "#232326" }}
              d="M24 12.001H2.914l5.294-5.295-.707-.707L1 12.501l6.5 6.5.707-.707-5.293-5.293H24v-1z"
              data-name="Left"
            />
          </svg>
         </button>
         <button
           type="button"
           onClick={() => (setCurrentStep(12))} 
           className={`${styles["next-btn"]} bg-blue-500 text-white px-6 py-3 rounded-lg`}
           style={{ width: '90%' }} // Assign 90% width
         >
           Weiter
         </button>
       </div>
     </div>
  );
};

export default StepOneInner;
