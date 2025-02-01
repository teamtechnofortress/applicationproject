import { useEffect,useState } from "react";
import styles from "../styles/latest.module.css";
import StepOneInner from "@/components/steptwoinner/stepone";
import StepTwoInner from "@/components/steptwoinner/steptwo";

const SecondStep = ({ coverletter, setComponents, handleChange,currentStep,setCurrentStep }) => {
  // const [currentStep, setCurrentStep] = useState(0);
  const [errors, setErrors] = useState({});
  const totalSteps = 2;
  useEffect(() => {
    // Push the current step into the browser history
    history.pushState({ step: currentStep }, "", window.location.href);

    // Listen for the back button (popstate event)
    const handlePopState = (event) => {
      const step = event.state?.step;
      if (step !== undefined && step !== currentStep) {
        setCurrentStep(step); // Go to the last valid step
      }
    };

    window.addEventListener("popstate", handlePopState);

    return () => {
      // Clean up the event listener when the component unmounts
      window.removeEventListener("popstate", handlePopState);
    };
  }, [currentStep]);
 
  const showStep = (stepIndex) => {
    if (validateStep(currentStep)) {
      setCurrentStep(stepIndex);
    }
  };

  const validateStep = () => {
    const newErrors = {};
    const safeTrim = (value) => (value && typeof value === "string" ? value.trim() : "");

    // Check cover letter on step 1
    if (currentStep === 1 && !safeTrim(coverletter)) {
      newErrors.coverletter = "Cover letter is required.";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNextClick = () => {
    setComponents(1);
    setCurrentStep(8);
  };

  

  return (
    <>
      {/* Step 1 */}
      {currentStep === 9 && (
         <StepOneInner               
           setComponents={setComponents}
           currentStep={currentStep}
           setCurrentStep={setCurrentStep}
           handleChange={handleChange}
         />
        
      )}

      {/* Step 2 */}
      {currentStep === 10 && (
        <StepTwoInner                 
        coverletter={coverletter}
        setComponents={setComponents}
        currentStep={currentStep}
        setCurrentStep={setCurrentStep}
        handleChange={handleChange}
      />
      )}
    </>
  );
};

export default SecondStep;
