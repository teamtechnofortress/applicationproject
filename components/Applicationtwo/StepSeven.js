import React from "react";
import styles from "../../styles/form.module.css";
import { useState,useEffect } from "react";



const StepSeven = ({
  handleChange, 
  setComponents,
  rentalschoolfree, 
  showrentalschoolfree,
  vorname,
  nachname,
  email,
  tel,
  rentalschoolfree2, 
  showrentalschoolfree2,
  selectedImg 
  }) => {

    const [selectedRadio9, setSelectedRadio9] = useState("Ja");

    const [selectedRadio11, setSelectedRadio11] = useState("Ja");

    const [selectedRadio9_2, setSelectedRadio9_2] = useState("Ja");

    const [selectedRadio11_2, setSelectedRadio11_2] = useState("Ja");


    const radiohandle = (value, id) => {
      if (id === "r9") {
        setSelectedRadio9(value);
      }
     
      if (id === "r11") {
        setSelectedRadio11(value);
      }
      if (id === "r9_2") {
        setSelectedRadio9_2(value);
      }
      
      if (id === "r11_2") {
        setSelectedRadio11_2(value);
      }
    }
   


  const validation = () => {
    const newErrors = {};
    setComponents(8);

  };
  return (
    <>
   
    <div> 
      <div className="ten1">
        <h1 className={`${styles["form1-heading"]} mt-4 mb-7`}>Mietschuld.freih. : Mieter 1</h1>
              <div className="grid grid-cols-8 gap-4 mt-9">
                <div className="col-span-8 text-center ...">
                  <p className={`${styles["form-control"]} form-control mb-9 `}>
                    Haben Sie eine Mietschulfrei. vorliegen?{" "}
                  </p>
                </div>
                <div className="col-span-4 flex items-center justify-end">
                    <label
                    className={` ${
                      styles["radio-btn-2"]
                    } ${selectedRadio9 === "Ja" ? styles["black"] : ""}`}
                    onClick={() => radiohandle("Ja", "r9")}
                    htmlFor="Mieter1Ja"
                    for="Mieter1Ja"
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
                    htmlFor="Mieter1Nein"
                    for="Mieter1Nein"
                  >
                    Nein
                  </label>
                </div>
              </div>

              <div className={`grid grid-cols-8 gap-4 mt-9 ${selectedRadio9 === "Ja" ? "block" : "hidden" }`}>
                <div className="col-span-8 text-center ...">
                  <div className={`${styles["file-upload"]}`}>
                    <label
                      className={`${styles["file_up"]} control-label `}
                      for="attach"
                    >
                      <img src={showrentalschoolfree || 'data:image/gif;base64,R0lGODlhAQABAAD/ACwAAAAAAQABAAACADs='} className="mt-4" alt="" />
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
              <div className={`grid grid-cols-8 gap-4 mt-9`}>
                <div className="col-span-8 text-center ...">
                  <p className={`${styles["form-control"]} form-control mb-9 `}>
                    Haben Sie die Mietschuld. Freih. bereits beantrag?
                  </p>
                </div>
                <div className="col-span-4 flex items-center justify-end">
                  
                  <label
                    className={` ${styles["form-check-label"]} ${
                      styles["radio-btn-2"]
                    } ${selectedRadio11 === "Ja" ? styles["black"] : ""}`}
                    onClick={() => radiohandle("Ja", "r11")}
                    htmlFor="Mieter3Ja"
                    for="Mieter3Ja"
                  >
                    Ja
                  </label>
                </div>
                <div className="col-span-4 flex items-center">
                  <label
                    className={` ${styles["form-check-label"]} ${
                      styles["radio-btn-2"]
                    } ${selectedRadio11 === "Nein" ? styles["black"] : ""}`}
                    onClick={() => radiohandle("Nein", "r11")}
                    htmlFor="Mieter3Nein"
                    for="Mieter3Nein"
                  >
                    Nein
                  </label>
                </div>
              </div>

              <div className={`grid grid-cols-8 gap-4 mt-9 ${selectedRadio11 === "Ja" ? "block" : "hidden" }`}>
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
             
      </div>
      <div className="ten2">
        <h1 className={`${styles["form1-heading"]} mt-4 mb-7`}>Mietschuld.freih. : Mieter 1</h1>
              <div className="grid grid-cols-8 gap-4 mt-9">
                <div className="col-span-8 text-center ...">
                  <p className={`${styles["form-control"]} form-control mb-9 `}>
                    Haben Sie eine Mietschulfrei. vorliegen?{" "}
                  </p>
                </div>
                <div className="col-span-4 flex items-center justify-end">
                    <label
                    className={` ${
                      styles["radio-btn-2"]
                    } ${selectedRadio9_2 === "Ja" ? styles["black"] : ""}`}
                    onClick={() => radiohandle("Ja", "r9_2")}
                    htmlFor="Mieter1Ja"
                    for="Mieter1Ja"
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
                    htmlFor="Mieter1Nein"
                    for="Mieter1Nein"
                  >
                    Nein
                  </label>
                </div>
              </div>

              <div className={`grid grid-cols-8 gap-4 mt-9 ${selectedRadio9_2 === "Ja" ? "block" : "hidden" }`}>
                <div className="col-span-8 text-center ...">
                  <div className={`${styles["file-upload"]}`}>
                    <label
                      className={`${styles["file_up"]} control-label `}
                      for="attach"
                    >
                      <img src={showrentalschoolfree2 || 'data:image/gif;base64,R0lGODlhAQABAAD/ACwAAAAAAQABAAACADs='} className="mt-4" alt="" />
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
                        name="rentalschoolfree2"
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
              <div className={`grid grid-cols-8 gap-4 mt-9`}>
                <div className="col-span-8 text-center ...">
                  <p className={`${styles["form-control"]} form-control mb-9 `}>
                    Haben Sie die Mietschuld. Freih. bereits beantrag?
                  </p>
                </div>
                <div className="col-span-4 flex items-center justify-end">
                  
                  <label
                    className={` ${styles["form-check-label"]} ${
                      styles["radio-btn-2"]
                    } ${selectedRadio11_2 === "Ja" ? styles["black"] : ""}`}
                    onClick={() => radiohandle("Ja", "r11_2")}
                    htmlFor="Mieter3Ja"
                    for="Mieter3Ja"
                  >
                    Ja
                  </label>
                </div>
                <div className="col-span-4 flex items-center">
                  <label
                    className={` ${styles["form-check-label"]} ${
                      styles["radio-btn-2"]
                    } ${selectedRadio11_2 === "Nein" ? styles["black"] : ""}`}
                    onClick={() => radiohandle("Nein", "r11_2")}
                    htmlFor="Mieter3Nein"
                    for="Mieter3Nein"
                  >
                    Nein
                  </label>
                </div>
              </div>

              <div className={`grid grid-cols-8 gap-4 mt-9 ${selectedRadio11_2 === "Ja" ? "block" : "hidden" }`}>
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
          />
        </div>
      </div>
      </div>

    </div>
      
      

    </>
  );
};

export default StepSeven;
