import React from "react";
import styles from "../../styles/form.module.css";
import { useState } from "react";

const step = ({
  residencepermit,
  fläche,
  anzahlderzimmer,
  showresidencepermit,
  residencepermit2,
  fläche2,
  anzahlderzimmer2,
  showresidencepermit2,
  handleChange,
  setComponents,
  }) => {
  const [selectedRadio8, setSelectedRadio8] = useState('Ja');
  const [selectedRadio8_2, setSelectedRadio8_2] = useState('Ja');
  const radiohandle = (value, id) => {
    if (id === "r8") {
      setSelectedRadio8(value);
    }
    if (id === "r8_2") {
      setSelectedRadio8_2(value);
    }
    
  };
 
  const validation = () =>{
    const newErrors = {};
    setComponents(5);
} 
  return (
    <>
      {/* step 4 */}
      <div className="ten1">
        <h1 className={`${styles["form1-heading"]} mt-4 mb-7`}>
          Wohnberechtigungsschein: Mieter 1
        </h1>

        <div className="grid grid-cols-8 gap-4 mt-9">
          <div className="col-span-8 text-center ...">
            <p className={`${styles["form-control"]} form-control mb-9 `}>
              Haben Sie einen Wohnberechtigungsschein?
            </p>
          </div>
          <div className="col-span-4 flex items-center justify-end">
            <input
              className={`${styles["form-check-input"]} mr-2  `}
              type="radio"
              name="subsidizedhousing"
              id="subsidized1"
              value="option1"
              checked
            />
            <label
              className={` ${
                styles["radio-btn-2"]
              } ${selectedRadio8 === "Ja" ? styles["black"] : ""}`}
              onClick={() => radiohandle("Ja", "r8")}
              htmlFor="employee1"
              for="subsidized1"
            >
              Ja
            </label>
          </div>
          <div className="col-span-4 flex items-center">
            <input
              className={`${styles["form-check-input"]} mr-2  `}
              type="radio"
              name="subsidizedhousing"
              id="subsidized2"
              value="option2"
            />
            <label
              className={` ${
                styles["radio-btn-2"]
              } ${selectedRadio8 === "Nein" ? styles["black"] : ""}`}
              onClick={() => radiohandle("Nein", "r8")}
              htmlFor="employee2"
              for="subsidized2"
            >
              Nein
            </label>
          </div>
        </div>

        <div className={`grid grid-cols-2 gap-4 mt-7 mb-3 ${selectedRadio8 === "Ja" ? "block" : "hidden" }`}>
          <div className="...">
            <div className="input-field">
              <input
                type="text"
                className={`${styles["form-input"]} form-input`}
                id="fläche"
                name="fläche"
                value={fläche}
                onChange={handleChange}
                placeholder="Fläche m^2"
              />
            </div>
          </div>
          <div className="...">
            <div className="input-field">
              <input
                type="text"
                className={`${styles["form-input"]} form-input `}
                id="anzahl-der-zimmer"
                name="anzahlderzimmer"
                value={anzahlderzimmer}
                onChange={handleChange}
                placeholder="Anzahl der Zimmer"
              />
            </div>
          </div>
        </div>

        <div className={`grid grid-cols-8 gap-4 mt-9 ${selectedRadio8 === "Ja" ? "block" : "hidden" }`}>
          <div className="col-span-8 text-center ...">
            <p className={`${styles["form-control"]} form-control mb-5 `}>
              Laden Sie bitte ihren Wohnberechtigungsschein hier hoch
            </p>
          </div>
          <div className="col-span-8 text-center ...">
            <div className="col-span-8 text-center ...">
              <div className={`${styles["file-upload"]}`}>
                <label
                  className={`${styles["file_up"]} control-label `}
                  for="attach"
                >
                  <img src={showresidencepermit || 'data:image/gif;base64,R0lGODlhAQABAAD/ACwAAAAAAQABAAACADs='} className="mt-4" alt="" />
                  <h4 className={`${styles["file-h4"]} mt-4`}>
                    Wählen Sie ihre Datei aus oder ziehen Sie diese hier hinein
                  </h4>
                  <p className={`${styles["file-p"]} mt-4`}>
                    JPG, PNG or PDF, file size no more than 10MB
                  </p>
                  <input
                    type="file"
                    id="attach4"
                    className={`${styles["inputfile"]}`}
                    name="residencepermit"
                    onChange={handleChange}
                  />
                  <label
                    for="attach4"
                    name="salary-statemnent"
                    className={`${styles["custom-file-upload"]} mt-3`}
                  >
                    Select file
                  </label>
                </label>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="ten2">
        <h1 className={`${styles["form1-heading"]} mt-4 mb-7`}>
          Wohnberechtigungsschein: Mieter 2
        </h1>

        <div className="grid grid-cols-8 gap-4 mt-9">
          <div className="col-span-8 text-center ...">
            <p className={`${styles["form-control"]} form-control mb-9 `}>
              Haben Sie einen Wohnberechtigungsschein?
            </p>
          </div>
          <div className="col-span-4 flex items-center justify-end">
            <input
              className={`${styles["form-check-input"]} mr-2  `}
              type="radio"
              name="subsidizedhousing2"
              id="subsidized1_2"
              value="option1_2"
              checked
            />
            <label
              className={` ${
                styles["radio-btn-2"]
              } ${selectedRadio8_2 === "Ja" ? styles["black"] : ""}`}
              onClick={() => radiohandle("Ja", "r8_2")}
              htmlFor="employee1_2"
              for="subsidized1_2"
            >
              Ja
            </label>
          </div>
          <div className="col-span-4 flex items-center">
            <input
              className={`${styles["form-check-input"]} mr-2  `}
              type="radio"
              name="subsidizedhousing_2"
              id="subsidized2_2"
              value="option2_2"
            />
            <label
              className={` ${
                styles["radio-btn-2"]
              } ${selectedRadio8_2 === "Nein" ? styles["black"] : ""}`}
              onClick={() => radiohandle("Nein", "r8_2")}
              htmlFor="employee2_2"
              for="subsidized2_2"
            >
              Nein
            </label>
          </div>
        </div>

        <div className={`grid grid-cols-2 gap-4 mt-7 mb-3 ${selectedRadio8_2 === "Ja" ? "block" : "hidden" }`}>
          <div className="...">
            <div className="input-field">
              <input
                type="text"
                className={`${styles["form-input"]} form-input`}
                id="fläche2"
                name="fläche2"
                value={fläche2}
                onChange={handleChange}
                placeholder="Fläche m^2"
              />
            </div>
          </div>
          <div className="...">
            <div className="input-field">
              <input
                type="text"
                className={`${styles["form-input"]} form-input `}
                id="anzahl-der-zimmer2"
                name="anzahlderzimmer2"
                value={anzahlderzimmer2}
                onChange={handleChange}
                placeholder="Anzahl der Zimmer"
              />
            </div>
          </div>
        </div>

        <div className={`grid grid-cols-8 gap-4 mt-9 ${selectedRadio8_2 === "Ja" ? "block" : "hidden" }`}>
          <div className="col-span-8 text-center ...">
            <p className={`${styles["form-control"]} form-control mb-5 `}>
              Laden Sie bitte ihren Wohnberechtigungsschein hier hoch
            </p>
          </div>
          <div className="col-span-8 text-center ...">
            <div className="col-span-8 text-center ...">
              <div className={`${styles["file-upload"]}`}>
                <label
                  className={`${styles["file_up"]} control-label `}
                  for="attach"
                >
                  <img src={showresidencepermit2 || 'data:image/gif;base64,R0lGODlhAQABAAD/ACwAAAAAAQABAAACADs='} className="mt-4" alt="" />
                  <h4 className={`${styles["file-h4"]} mt-4`}>
                    Wählen Sie ihre Datei aus oder ziehen Sie diese hier hinein
                  </h4>
                  <p className={`${styles["file-p"]} mt-4`}>
                    JPG, PNG or PDF, file size no more than 10MB
                  </p>
                  <input
                    type="file"
                    id="attach4_2"
                    className={`${styles["inputfile"]}`}
                    name="residencepermit2"
                    onChange={handleChange}
                  />
                  <label
                    for="attach4_2"
                    name="salary-statemnent_2"
                    className={`${styles["custom-file-upload"]} mt-3`}
                  >
                    Select file
                  </label>
                </label>
              </div>
            </div>
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

export default step;
