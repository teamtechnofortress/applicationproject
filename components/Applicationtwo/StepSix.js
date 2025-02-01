import React from "react";
import styles from "../../styles/form.module.css";
import { useState } from "react";

const StepSix = ({
  currentSchufareport,
  currentSchufareport2,
  handleChange,
  setComponents,}) => {
  const [selectedRadio9, setSelectedRadio9] = useState('Ja');

  const [selectedRadio9_2, setSelectedRadio9_2] = useState('Ja');

  const [showcurrentSchufareport, setShowcurrentSchufareport] = useState(false);
  const [showcurrentSchufareport2, setShowcurrentSchufareport2] = useState(false);

  const radiohandle = (value, id) => {
    if (id === "r9") {
      setSelectedRadio9(value);
    }
  
    if (id === "r9_2") {
      setSelectedRadio9_2(value);
    }
    
    
  };

  if (currentSchufareport) {
    const reader = new FileReader();
    reader.onloadend = () => {
      const result = reader.result;
      setShowcurrentSchufareport(result); // Assuming setSelectedImg updates the state to show the image
    };
    reader.readAsDataURL(currentSchufareport);
  }
  if (currentSchufareport2) {
    const reader = new FileReader();
    reader.onloadend = () => {
      const result = reader.result;
      setShowcurrentSchufareport2(result); // Assuming setSelectedImg updates the state to show the image
    };
    reader.readAsDataURL(currentSchufareport2);
  }
  const validation = () =>{
    const newErrors = {};
    setComponents(7);
} 
  return (
    <>
    <div className="ten1">
      <h1 className={`${styles["form1-heading"]} mt-4 mb-7`}>
        Schufa : Mieter 1
      </h1>

      <div className="grid grid-cols-8 gap-4 mt-9">
        <div className="col-span-8 text-center ...">
          <p className={`${styles["form-control"]} form-control mb-9 `}>
            Haben Sie eine aktuelle Schufaauskunft?{" "}
          </p>
        </div>
        <div className="col-span-8 mt-3 mb-8 text-center m-auto ...">
          <img src="/Bewerbungsunterlagen.svg" alt="" />
        </div>
        <div className="col-span-4 flex items-center justify-end">
         
          <label
            className={` ${styles["form-check-label"]} ${
              styles["radio-btn-2"]
            } ${selectedRadio9 === "Ja" ? styles["black"] : ""}`}
            onClick={() => radiohandle("Ja", "r9")}
            htmlFor="employee1"
            for="schufa-report1"
          >
            Ja
          </label>
        </div>
        <div className="col-span-4 flex items-center">
         
          <label
            className={` ${styles["form-check-label"]} ${
              styles["radio-btn-2"]
            } ${selectedRadio9 === "Nein" ? styles["black"] : ""}`}
            onClick={() => radiohandle("Nein", "r9")}
            htmlFor="employee1"
            for="schufa-report2"
          >
            Nein
          </label>
        </div>
      </div>

      <div className="grid grid-cols-8 gap-4 mt-9">
        <div className="col-span-8 text-center ...">
          <p className={`${styles["form-control"]} form-control mb-9 `}>
            Laden Sie ihre aktuelle Schufaauskunft bitte hier hoch
          </p>
        </div>
        <div className="col-span-8 text-center ...">
          <div className={`${styles["file-upload"]}`}>
            <label
              className={`${styles["file_up"]} control-label `}
              for="attach"
            >
              <img src={showcurrentSchufareport} className="mt-4" alt="" />
              <h4 className={`${styles["file-h4"]} mt-4`}>
                Wählen Sie ihre Datei aus oder ziehen Sie diese hier hinein
              </h4>
              <p className={`${styles["file-p"]} mt-4`}>
                JPG, PNG or PDF, file size no more than 10MB
              </p>
              <input
                type="file"
                id="attach7"
                className={`${styles["inputfile"]}`}
                name="currentSchufareport"
                onChange={handleChange}
              />
              <label
                for="attach7"
                name="salary-statemnent"
                className={`${styles["custom-file-upload"]} mt-3`}
              >
                Select file
              </label>
            </label>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-8 gap-4 mt-9">
        <div className="col-span-8 text-center ...">
          <p className={`${styles["form-control"]} form-control mb-5 `}>
            Klicken Sie auf den Link und erhalten Sie ihre
            <br /> aktuelle Schufaauskunft ℹ️
          </p>
        </div>
        <div className="col-span-8 flex items-center justify-center ...">
          <a className={`${styles["schufa-info-btn"]} `} href="#">
            Hier Schufaauskunft erhalten
          </a>
        </div>
        <div className="col-span-8 flex items-center justify-center  mt-5 ...">
          <a href="" className={`${styles["alternativ-btn"]}`}>
            Alternativ
          </a>
        </div>
      </div>
    </div>
    <div className="ten2">
      <h1 className={`${styles["form1-heading"]} mt-4 mb-7`}>
        Schufa : Mieter 2
      </h1>

      <div className="grid grid-cols-8 gap-4 mt-9">
        <div className="col-span-8 text-center ...">
          <p className={`${styles["form-control"]} form-control mb-9 `}>
            Haben Sie eine aktuelle Schufaauskunft?{" "}
          </p>
        </div>
        <div className="col-span-8 mt-3 mb-8 text-center m-auto ...">
          <img src="/Bewerbungsunterlagen.svg" alt="" />
        </div>
        <div className="col-span-4 flex items-center justify-end">
         
          <label
            className={` ${styles["form-check-label"]} ${
              styles["radio-btn-2"]
            } ${selectedRadio9_2 === "Ja" ? styles["black"] : ""}`}
            onClick={() => radiohandle("Ja", "r9_2")}
            htmlFor="employee1_2"
            for="schufa-report1_2"
          >
            Ja
          </label>
        </div>
        <div className="col-span-4 flex items-center">
        
          <label
            className={` ${styles["form-check-label"]} ${
              styles["radio-btn-2"]
            } ${selectedRadio9_2 === "Nein" ? styles["black"] : ""}`}
            onClick={() => radiohandle("Nein", "r9_2")}
            htmlFor="employee1_2"
            for="schufa-report2_2"
          >
            Nein
          </label>
        </div>
      </div>

      <div className="grid grid-cols-8 gap-4 mt-9">
        <div className="col-span-8 text-center ...">
          <p className={`${styles["form-control"]} form-control mb-9 `}>
            Laden Sie ihre aktuelle Schufaauskunft bitte hier hoch
          </p>
        </div>
        <div className="col-span-8 text-center ...">
          <div className={`${styles["file-upload"]}`}>
            <label
              className={`${styles["file_up"]} control-label `}
              for="attach"
            >
              <img src={showcurrentSchufareport2} className="mt-4" alt="" />
              <h4 className={`${styles["file-h4"]} mt-4`}>
                Wählen Sie ihre Datei aus oder ziehen Sie diese hier hinein
              </h4>
              <p className={`${styles["file-p"]} mt-4`}>
                JPG, PNG or PDF, file size no more than 10MB
              </p>
              <input
                type="file"
                id="attach7_2"
                className={`${styles["inputfile"]}`}
                name="currentSchufareport_2"
                onChange={handleChange}
              />
              <label
                for="attach7_2"
                name="salary-statemnent_2"
                className={`${styles["custom-file-upload"]} mt-3`}
              >
                Select file
              </label>
            </label>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-8 gap-4 mt-9">
        <div className="col-span-8 text-center ...">
          <p className={`${styles["form-control"]} form-control mb-5 `}>
            Klicken Sie auf den Link und erhalten Sie ihre
            <br /> aktuelle Schufaauskunft ℹ️
          </p>
        </div>
        <div className="col-span-8 flex items-center justify-center ...">
          <a className={`${styles["schufa-info-btn"]} `} href="#">
            Hier Schufaauskunft erhalten
          </a>
        </div>
        <div className="col-span-8 flex items-center justify-center  mt-5 ...">
          <a href="" className={`${styles["alternativ-btn"]}`}>
            Alternativ
          </a>
        </div>
      </div>
      <div className="grid grid-cols-8 mt-9">
        <div className="col-span-6 ..."></div>
        <div className="col-span-2 mt-9 ...">
          <input
            type="button"
            className={`${styles["form-input"]} form-control cursor-pointer `}
            id={`${styles["submit"]}`}
            value="Weiter"
            onClick={validation}
          />
        </div>
      </div>
    </div>
      
    </>
  );
};

export default StepSix;
