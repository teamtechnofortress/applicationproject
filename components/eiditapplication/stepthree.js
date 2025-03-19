import { useEffect,useState } from "react";
import styles from "../../styles/latest.module.css";
import StepOneInner from "@/components/eiditapplication/stepthreeinner/stepone";
import StepTwoInner from "@/components/eiditapplication/stepthreeinner/steptwo";
import StepThreeInner from "@/components/eiditapplication/stepthreeinner/stepthree";
import StepFourInner from "@/components/eiditapplication/stepthreeinner/stepfour";
import StepFiveInner from "@/components/eiditapplication/stepthreeinner/stepfive";
import StepSixInner from "@/components/eiditapplication/stepthreeinner/stepsix";
import StepSevenInner from "@/components/eiditapplication/stepthreeinner/stepseven";
import StepEightInner from "@/components/eiditapplication/stepthreeinner/stepeight";
import StepNineInner from "@/components/eiditapplication/stepthreeinner/stepnine";
import StepTenInner from "@/components/eiditapplication/stepthreeinner/stepten";

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
  useEffect(() => {
    if (currentStep === 14) {
      setThirdStepComponent(null);
    } else if (currentStep === 15) {
      setThirdStepComponent(0);
    } else if (currentStep === 16) {
      setThirdStepComponent(1); 
    } else if (currentStep === 17) {
      setThirdStepComponent(2); 
    }else if (currentStep === 18) {
      setThirdStepComponent(3); 
    }else if (currentStep === 19) {
      setThirdStepComponent(4); 
    }else if (currentStep === 20) {
      setThirdStepComponent(5); 
    }else if (currentStep === 21) {
      setThirdStepComponent(6); 
    }else if (currentStep === 22) {
      setThirdStepComponent(7); 
    }else if (currentStep === 23) {
      setThirdStepComponent(8); 
    }
  }, [currentStep]);


  const handleNextClick = () => {
    setComponents(2);
    setCurrentStep(14);
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
      {currentStep === 14 && (
         <StepOneInner               
           setComponents={setComponents}
           currentStep={currentStep}
           setCurrentStep={setCurrentStep}
           handleChange={handleChange}
         />
        
      )}

      {/* Step 2 */}
      {currentStep === 15 && (
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
        {currentStep === 16 && (
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
    {currentStep === 17 && (
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
      {currentStep === 18 && (
            <StepFiveInner          
            mietschuldenfreiheit ={mietschuldenfreiheit}
            setComponents={setComponents}
            currentStep={currentStep}
            setCurrentStep={setCurrentStep}
            handleChange={handleChange}
          />
      )}
       {/* Step 6 */}
       {currentStep === 19 && (
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
       {currentStep === 20 && (
            <StepSevenInner          
            mietverhaltnis={mietverhaltnis}
            setComponents={setComponents}
            currentStep={currentStep}
            setCurrentStep={setCurrentStep}
            handleChange={handleChange}
          />
      )}
        {/* Step 8 */}
        {currentStep === 21 && (
            <StepEightInner          
            setComponents={setComponents}
            currentStep={currentStep}
            setCurrentStep={setCurrentStep}
            handleChange={handleChange}
          />
      )}
       {currentStep === 22 && (
            <StepNineInner          
            setComponents={setComponents}
            currentStep={currentStep}
            setCurrentStep={setCurrentStep}
            handleChange={handleChange}
          />
      )}
       {currentStep === 23 && (
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
