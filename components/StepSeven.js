import React from "react";
import styles from "../styles/form.module.css";
import { useState } from "react";

const StepSeven = ({rentalschoolfree, handleChange, setComponents }) => {

    const [selectedRadio1, setSelectedRadio1] = useState(false);
    const [selectedRadio10, setSelectedRadio10] = useState(false);
    const [selectedRadio9, setSelectedRadio9] = useState(false);
    const [showrentalschoolfree, setShowrentalschoolfree] = useState(false);


    const radiohandle = (value, id) => {
      if (id === "r1") {
        setSelectedRadio9(value);
      }
      if (id === "r10") {
        setSelectedRadio10(value);
      }
    }
    if (rentalschoolfree) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const result = reader.result;
        setShowrentalschoolfree(result); // Assuming setSelectedImg updates the state to show the image
      };
      reader.readAsDataURL(rentalschoolfree);
    }


  const validation = () => {
    const newErrors = {};
    setComponents(8);

    // if (!vorname) newErrors.vorname = 'Vorname is required';
    // if (!nachname) newErrors.nachname = 'Nachname is required';
    // if (!strabe) newErrors.strabe = 'Straße is required';
    // if (!hausnummer) newErrors.hausnummer = 'Hausnummer is required';
    // if (!PLZ) newErrors.PLZ = 'PLZ is required';
    // if (!Ort) newErrors.Ort = 'Ort is required';
    // if (!email) newErrors.email = 'E-Mail is required';
    // if (!tel) newErrors.tel = 'Tel. Mobil is required';
    // if (!geburtsdatum) newErrors.geburtsdatum = 'Geburtsdatum is required';
    // if (!ausgeübterBeruf) newErrors.ausgeübterBeruf = 'Ausgeübter Beruf is required';
    // if (!arbeitgeber) newErrors.arbeitgeber = 'Arbeitgeber is required';
    // if (!income) newErrors.income = 'Höhe des monatlichen verfügbaren Nettoeinkommens (€) is required';

    // setErrors(newErrors);

    // if (Object.keys(newErrors).length === 0) {
    //   setComponents(2);
    // }
  };
  return (
    <>
      <h1 className="mt-9 mb-7 form1-heading">Mietschuld.freih. : Mieter 1</h1>

      <div className="grid grid-cols-8 gap-4 mt-9">
        <div className="col-span-8 text-center ...">
          <p className={`${styles["form-control"]} form-control mb-9 `}>
            Haben Sie eine Mietschulfrei. vorliegen?{" "}
          </p>
        </div>
        <div className="col-span-4 flex items-center justify-end">
          <input
            className={`${styles["form-check-input"]} mr-2  `}
            type="radio"
            name="rentalfee"
            id="rentalfee1"
            value="option1"
            checked
          />
          <label
            className={` ${styles["form-check-label"]} ${
              styles["radio-btn-2"]
            } ${selectedRadio1 === "Ja" ? styles["black"] : ""}`}
            onClick={() => radiohandle("Ja", "r1")}
            htmlFor="employee1"
            for="rentalfee1"
          >
            Ja
          </label>
        </div>
        <div className="col-span-4 flex items-center">
          <input
            className={`${styles["form-check-input"]} mr-2  `}
            type="radio"
            name="rentalfee"
            id="rentalfee2"
            value="option2"
          />
          <label
            className={` ${styles["form-check-label"]} ${
              styles["radio-btn-2"]
            } ${selectedRadio1 === "Ja" ? styles["black"] : ""}`}
            onClick={() => radiohandle("Ja", "r1")}
            htmlFor="employee1"
            for="rentalfee2"
          >
            Nein
          </label>
        </div>
      </div>

      <div className="grid grid-cols-8 gap-4 mt-9">
        <div className="col-span-8 text-center ...">
          <div className={`${styles["file-upload"]}`}>
            <label
              className={`${styles["file_up"]} control-label `}
              for="attach"
            >
              <img src={showrentalschoolfree} className="mt-4" alt="" />
              <h4 className={`${styles["file-h4"]} mt-4`}>
                Wählen Sie ihre Datei aus oder ziehen Sie diese hier hinein
              </h4>
              <p className={`${styles["file-p"]} mt-4`}>
                JPG, PNG or PDF, file size no more than 10MB
              </p>
              <input
                type="file"
                id="attach8"
                className={`${styles["inputfile"]}`}
                name="rentalschoolfree"
                onChange={handleChange}
              />
              <label
                for="attach8"
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
          <p className={`${styles["form-control"]} form-control mb-9 `}>
            Haben Sie die Mietschuld. Freih. bereits beantrag?
          </p>
        </div>
        <div className="col-span-4 flex items-center justify-end">
          <input
            className={`${styles["form-check-input"]} mr-2  `}
            type="radio"
            name="owerent"
            id="owerent1"
            value="option1"
            checked
          />
          <label
            className={` ${styles["form-check-label"]} ${
              styles["radio-btn-2"]
            } ${selectedRadio1 === "Ja" ? styles["black"] : ""}`}
            onClick={() => radiohandle("Ja", "r1")}
            htmlFor="employee1"
            for="owerent1"
          >
            Ja
          </label>
        </div>
        <div className="col-span-4 flex items-center">
          <input
            className={`${styles["form-check-input"]} mr-2  `}
            type="radio"
            name="owerent"
            id="owerent2"
            value="option2"
          />
          <label
            className={` ${styles["form-check-label"]} ${
              styles["radio-btn-2"]
            } ${selectedRadio1 === "Ja" ? styles["black"] : ""}`}
            onClick={() => radiohandle("Ja", "r1")}
            htmlFor="employee1"
            for="owerent2"
          >
            Nein
          </label>
        </div>
      </div>

      <div className="grid grid-cols-8 gap-4 mt-9">
        <div className="col-span-8 flex items-center justify-center ...">
          <a className={`${styles["applied-btn"]} `} href="#">
            Wurde beantrag am
          </a>
        </div>
        <div className="col-span-8 flex items-center justify-center  mt-5 ...">
          <a href="" className={`${styles["alternativ-btn"]} `}>
            Mietschulfrei. liegt nun vor
          </a>
        </div>
      </div>
      <div className="grid grid-cols-8 mt-9">
        <div className="col-span-6 ..."></div>
        <div className="col-span-2 mt-9 ...">
          <input
            type="submit"
            className={`${styles["form-input"]} form-control cursor-pointer `}
            id={`${styles["submit"]}`}
            value="Weiter"
            // onClick={validation}
          />
        </div>
      </div>
    </>
  );
};

export default StepSeven;
