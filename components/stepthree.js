import { useEffect,useState } from "react";
import styles from "../styles/latest.module.css";
import StepOneInner from "@/components/stepthreeinner/stepone";
import StepTwoInner from "@/components/stepthreeinner/steptwo";
import StepThreeInner from "@/components/stepthreeinner/stepthree";
import StepFourInner from "@/components/stepthreeinner/stepfour";
import StepFiveInner from "@/components/stepthreeinner/stepfive";
import StepSixInner from "@/components/stepthreeinner/stepsix";
import StepSevenInner from "@/components/stepthreeinner/stepseven";
import StepEightInner from "@/components/stepthreeinner/stepeight";
import StepNineInner from "@/components/stepthreeinner/stepnine";
import StepTenInner from "@/components/stepthreeinner/stepten";

const ThirdStep = ({ 
  fläche,
  zimerzahl, 
  mietverhaltnis,
  firstname,
  lastname,
  email2,
  mietschuldenfreiheit,
  mietschuldenfreiheitimg,
  setMietschuldenfreiheitimg,
  setComponents,
  setImageswbs,
  imageswbs,
  setSchufa,
  schufa,
  personal,
  setPersonal,
  handleChange,
  currentStep,setCurrentStep }) => {
  // const [currentStep, setCurrentStep] = useState(0);
  const [thirdStepComponent, setThirdStepComponent] = useState(currentStep);
  const [errors, setErrors] = useState({});
  const totalSteps = 9;
  const showStep = (stepIndex) => {
    if (validateStep(currentStep)) {
      setCurrentStep(stepIndex);
    }
  };
  useEffect(() => {
    if (currentStep === 11) {
      setThirdStepComponent(null);
    } else if (currentStep === 12) {
      setThirdStepComponent(0);
    } else if (currentStep === 13) {
      setThirdStepComponent(1); 
    } else if (currentStep === 14) {
      setThirdStepComponent(2); 
    }else if (currentStep === 15) {
      setThirdStepComponent(3); 
    }else if (currentStep === 16) {
      setThirdStepComponent(4); 
    }else if (currentStep === 17) {
      setThirdStepComponent(5); 
    }else if (currentStep === 18) {
      setThirdStepComponent(6); 
    }else if (currentStep === 19) {
      setThirdStepComponent(7); 
    }else if (currentStep === 20) {
      setThirdStepComponent(8); 
    }
  }, [currentStep]);

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
    setComponents(2);
    setCurrentStep(10);
  };

  

  return (
    <>
      {thirdStepComponent !== null && (
        <div className="mb-6">
          <div className="w-full bg-gray-200 rounded-full h-2.5">
            <div
              className={`bg-blue-500 h-2.5 rounded-full ${styles["prgress-bar"]}`}
              style={{
                width: `${((thirdStepComponent + 1) / totalSteps) * 100}%`,
              }}
            ></div>
          </div>
        </div>
      )}
            {/* Step 1 */}
      {currentStep === 11 && (
         <StepOneInner               
           setComponents={setComponents}
           currentStep={currentStep}
           setCurrentStep={setCurrentStep}
           handleChange={handleChange}
         />
        
      )}

      {/* Step 2 */}
      {currentStep === 12 && (
        <StepTwoInner                 
        fläche={fläche}
        zimerzahl={zimerzahl}
        setComponents={setComponents}
        currentStep={currentStep}
        imageswbs= {imageswbs}
        setImageswbs ={setImageswbs}
        setCurrentStep={setCurrentStep}
        handleChange={handleChange}
      />
      )}

        {/* Step 3 */}
        {currentStep === 13 && (
        <StepThreeInner                 
        personal={personal}
        setComponents={setComponents}
        currentStep={currentStep}
        setPersonal ={setPersonal}
        setCurrentStep={setCurrentStep}
        handleChange={handleChange}
      />
      )}
   
    {/* Step 4 */}
    {currentStep === 14 && (
          <StepFourInner                 
          setSchufa ={setSchufa}
          schufa ={schufa}
          setComponents={setComponents}
          currentStep={currentStep}
          setCurrentStep={setCurrentStep}
          handleChange={handleChange}
        />
     )}
      {/* Step 5 */}
      {currentStep === 15 && (
            <StepFiveInner          
            mietschuldenfreiheit ={mietschuldenfreiheit}
            setComponents={setComponents}
            currentStep={currentStep}
            setCurrentStep={setCurrentStep}
            handleChange={handleChange}
          />
      )}
       {/* Step 6 */}
       {currentStep === 16 && (
            <StepSixInner          
            mietschuldenfreiheitimg ={mietschuldenfreiheitimg}
            setMietschuldenfreiheitimg ={setMietschuldenfreiheitimg}
            setComponents={setComponents}
            currentStep={currentStep}
            setCurrentStep={setCurrentStep}
            handleChange={handleChange}
          />
      )}
       {/* Step 7 */}
       {currentStep === 17 && (
            <StepSevenInner          
            mietverhaltnis={mietverhaltnis}
            setComponents={setComponents}
            currentStep={currentStep}
            setCurrentStep={setCurrentStep}
            handleChange={handleChange}
          />
      )}
        {/* Step 8 */}
        {currentStep === 18 && (
            <StepEightInner          
            setComponents={setComponents}
            currentStep={currentStep}
            setCurrentStep={setCurrentStep}
            handleChange={handleChange}
          />
      )}
       {currentStep === 19 && (
            <StepNineInner          
            setComponents={setComponents}
            currentStep={currentStep}
            setCurrentStep={setCurrentStep}
            handleChange={handleChange}
          />
      )}
       {currentStep === 20 && (
            <StepTenInner     
            firstname={firstname}
            lastname={lastname}     
            email2={email2}     
            setComponents={setComponents}
            currentStep={currentStep}
            setCurrentStep={setCurrentStep}
            handleChange={handleChange}
          />
      )}
  
    </>
  );
};

export default ThirdStep;
