import { useEffect, useState } from "react";
import styles from "../styles/latest.module.css";
import StepOneInner from "@/components/steponeinner/stepone";
import StepTwoInner from "@/components/steponeinner/steptwo";
import StepThreeInner from "@/components/steponeinner/stepthree";
import StepFourInner from "@/components/steponeinner/stepfour";
import StepFiveInner from "@/components/steponeinner/stepfive";
import StepSixInner from "@/components/steponeinner/stepsix";
import StepSevenInner from "@/components/steponeinner/stepseven";
import StepEightInner from "@/components/steponeinner/stepeight";
import StepNineInner from "@/components/steponeinner/stepnine";
import StepTenInner from "@/components/steponeinner/stepten";
import StepElevenInner from "@/components/steponeinner/stepeleven";
import StepTwelveInner from "@/components/steponeinner/steptwelve";



const FirstStep = ({  
  vorname,
  nachname,
  strabe,
  postleitzahl,
  hausnummer,
  ort,
  email,
  phonenumber,
  setPhoneNumber,
  geburtsdatum,
  ausgeubterBeruf,
  arbeitgeber,
  income,
  employment,
  profession,
  bwaimages,
  setBwaimages,
  incomeimages,
  setincomeimages,
  pets,
  rentarea,
  proceedings,
  apartment,
  images,
  arbeitsvertrag,
  setarbeitsvertrag,
  setImages,
  setComponents,
  handleChange,
  setCurrentStep,
  currentStep

}) => {
  // const [currentStep, setCurrentStep] = useState(0);
  const [errors, setErrors] = useState({});
  const totalSteps = 12;
 
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

  const validateStep = (step) => {
    const newErrors = {};
    const safeTrim = (value) => (value && typeof value === "string" ? value.trim() : "");
    if (step === 0) {
      if (!safeTrim(vorname)) newErrors.vorname = "Vorname is required.";
      if (!safeTrim(nachname)) newErrors.nachname = "Nachname is required.";
      if (!safeTrim(geburtsdatum)) newErrors.geburtsdatum = "Geburtsdatum is required.";
    }
    if (step === 1) {
      if (!safeTrim(strabe)) newErrors.strabe = "Address is required.";
      if (!safeTrim(postleitzahl)) newErrors.postleitzahl = "Postleitzahl is required.";
      if (!safeTrim(hausnummer)) newErrors.hausnummer = "Hausnummer is required.";
      if (!safeTrim(ort)) newErrors.ort = "Ort is required.";
    }
    if (step === 2) {
      if (!safeTrim(email)) newErrors.email = "Bitte geben Sie Ihre E-Mail-Adresse ein.";
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
        newErrors.email = "Bitte geben Sie eine gültige E-Mail-Adresse ein.";
      }
      if (!safeTrim(phonenumber)) newErrors.phonenumber = "PhoneNumber is required.";
    }
    if (step === 4) {
      if (!safeTrim(ausgeubterBeruf)) newErrors.ausgeubterBeruf = "Ausgeübter Beruf is required.";
      if (!safeTrim(arbeitgeber)) newErrors.arbeitgeber = "Arbeitgeber is required.";
      if (!safeTrim(income)) newErrors.income = "Monatliches is required.";
    }
    if (step === 8) {
      if (!pets) newErrors.pets = "Pets status is required.";  
    }
    if (step === 9) {
      if (!rentarea) newErrors.rentarea = "Rent Area status is required.";  
    }
    if (step === 10) {
      if (!proceedings) newErrors.proceedings = "Proceedings status is required.";  
    }
    if (step === 11) {
      if (!apartment) newErrors.apartment = "Apartment status is required.";  
    }

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };
  return (
    <div className="flex items-center justify-center">
      <div className="w-full bg-white shadow-lg rounded-lg p-6">
        {/* Progress Bar */}
        <div className="mb-6">
          <div className="w-full bg-gray-200 rounded-full h-2.5">
            <div
              className={`bg-blue-500 h-2.5 rounded-full ${styles["prgress-bar"]}`}
              style={{
                width: `${((currentStep + 1) / totalSteps) * 100}%`,
              }}
            ></div>
          </div>
         
        </div>

        {/* Step 1 */}
         {currentStep === 0 && (
           <StepOneInner                 
           vorname={vorname}
           nachname={nachname}
           geburtsdatum={geburtsdatum}
           setComponents={setComponents}
           currentStep={currentStep}
           setCurrentStep={setCurrentStep}
           handleChange={handleChange}
         />
         
        )}

        {/* Step 2 */}
         {currentStep === 1 && (
            <StepTwoInner  
            vorname={vorname}
            nachname={nachname}               
            strabe={strabe}
            postleitzahl={postleitzahl}
            hausnummer={hausnummer}
            ort={ort}
            setComponents={setComponents}
            currentStep={currentStep}
            setCurrentStep={setCurrentStep}
            handleChange={handleChange}
          />
        )}
        {/* Step 3 */}
         {currentStep === 2 && (
            <StepThreeInner                 
            email={email}
            phonenumber={phonenumber}
            setPhoneNumber={setPhoneNumber}
            setComponents={setComponents}
            currentStep={currentStep}
            setCurrentStep={setCurrentStep}
            handleChange={handleChange}
          />
        )}

        {/* Step 4 */}
        {currentStep === 3 && (
            <StepFourInner                 
            profession={profession}
            currentStep={currentStep}
            setCurrentStep={setCurrentStep}
            handleChange={handleChange}
          />
        )}

        {/* Step 5 */}
         {currentStep === 4 && (
           <StepFiveInner        
           profession={profession}         
           ausgeubterBeruf={ausgeubterBeruf}
           arbeitgeber={arbeitgeber}
           employment={employment}
           income={income}
           setComponents={setComponents}
           currentStep={currentStep}
           setCurrentStep={setCurrentStep}
           handleChange={handleChange}
         />
        )}
        {/* Step 6 */}
        {currentStep === 5 && (
           <StepSixInner            
           employment={employment}
           images={images}
           arbeitsvertrag={arbeitsvertrag}
           setarbeitsvertrag={setarbeitsvertrag}
           setImages={setImages}
           setComponents={setComponents}
           currentStep={currentStep}
           setCurrentStep={setCurrentStep}
           handleChange={handleChange}
         />
        )}

          {/* Step 7 */}
          {currentStep === 6 && (
           <StepSevenInner            
           bwaimages={bwaimages}
           setBwaimages={setBwaimages}
           currentStep={currentStep}
           setCurrentStep={setCurrentStep}
           handleChange={handleChange}
         />
        )}
         {/* Step 8 */}
         {currentStep === 7 && (
           <StepEightInner            
           incomeimages={incomeimages}
           setincomeimages={setincomeimages}
           currentStep={currentStep}
           setCurrentStep={setCurrentStep}
           handleChange={handleChange}
         />
        )}
        

        {/* Step 9 */}
         {currentStep === 8 && (
            <StepNineInner            
            pets={pets}
            setComponents={setComponents}
            currentStep={currentStep}
            setCurrentStep={setCurrentStep}
            handleChange={handleChange}
          />
        )}
         {/* Step 10 */}
         {currentStep === 9 && (
            <StepTenInner            
            rentarea={rentarea}
            setComponents={setComponents}
            currentStep={currentStep}
            setCurrentStep={setCurrentStep}
            handleChange={handleChange}
          />
      
        )}

         {/* Step 11 */}
         {currentStep === 10 && (
            <StepElevenInner            
            proceedings={proceedings}
            setComponents={setComponents}
            currentStep={currentStep}
            setCurrentStep={setCurrentStep}
            handleChange={handleChange}
          />
        )}

        {/* Step 12 */}
        {currentStep === 11 && (
            <StepTwelveInner            
            apartment={apartment}
            setComponents={setComponents}
            currentStep={currentStep}
            setCurrentStep={setCurrentStep}
            handleChange={handleChange}
          />
        )}

      </div>
    </div>
  );
};

export default FirstStep;
