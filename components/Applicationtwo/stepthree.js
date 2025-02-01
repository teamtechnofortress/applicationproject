import React from "react";
import styles from "../../styles/form.module.css";
import PdfDesignPage3 from "../PdfDesignPage3";
import { useState } from "react";


const stepthree = ({
  vorname,
  nachname,
  email,
  tel,
  selectedImg,
  status,
  showsalarystatementlast,
  showsalarystatementbefore,
  showsalarystatementago,
  salarystatementlast,
  salarystatementbefore,
  salarystatementago,
  handleChange,
  currentactivity,
  currentemployer,
  incomee,

  status2,
  showsalarystatementlast2,
  showsalarystatementbefore2,
  showsalarystatementago2,
  salarystatementlast2,
  salarystatementbefore2,
  salarystatementago2,
  currentactivity2,
  currentemployer2,
  incomee2,
  setComponents
}) => {
  const [selectedRadio6, setSelectedRadio6] = useState('Ja'); // Initialize with empty string
  const [selectedRadio7, setSelectedRadio7] = useState('Ja'); // Initialize with empty string
  
  const radiohandle = (value, id) => {
    if (id === "r6") {
      setSelectedRadio6(value); // Set the value for Radio 6
    }
    if (id === "r7") {
      setSelectedRadio7(value); // Set the value for Radio 7
    }
  };

  
  const validation = () =>{

    const newErrors = {};
    setComponents(4);


    
} 

  return (
    <div className="grid grid-cols-2 gap-4">
      <div>
      <div className="ten1">
        {/* step 3 */}
        <h1 className={`${styles["form1-heading"]} mt-4 mb-7`}>
          Beschäftigungsverhältnis: Mieter 1
        </h1>
        <div className="grid grid-cols-2 gap-4 mt-3 mb-3">
          <div className="...">
            <div className="input-field">
            <select
                  id="status"
                  name="status"
                  onChange={handleChange}
                  value={status} 
                  className={`${styles["form-input"]} form-input`}
              >
                  <option value="Beschäftigungsstatus">Beschäftigungsstatus</option>
                  <option value="US">United States</option>
                  <option value="CA">Canada</option>
                  <option value="FR">France</option>
                  <option value="DE">Germany</option>
              </select>
            </div>
          </div>
          <div className="...">
            <div className="input-field">
              <input
                type="text"
                className={`${styles["form-input"]} form-input `}
                id="current-activity"
                name="currentactivity"
                onChange={handleChange}
                value={currentactivity} 
                placeholder="Welche Tätigkeit üben Sie gerade aus?  "
              />
            </div>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4 mt-3">
          <div className="...">
            <div className="input-field">
              <input
                type="text"
                className={`${styles["form-input"]} form-input `}
                id="current-employer"
                name="currentemployer"
                onChange={handleChange}
                value={currentemployer} 
                placeholder="Aktueller Arbeitgeber"
              />
            </div>
          </div>
          <div className="...">
            <div className="input-field">
              <input
                type="text"
                className={`${styles["form-input"]} form-input `}
                id="monthly-income"
                name="incomee"
                onChange={handleChange}
                value={incomee}
                placeholder="Monatlichen Nettoeinkommen"
              />
            </div>
          </div>
        </div>

        <div className="grid grid-cols-8 gap-4 mt-9">
          <div className="col-span-8 text-center">
            <p className={`${styles["form-control"]} form-control mb-9`}>
              Besteht ihr Beschäftigungsverhältnis länger als 6 Monate?
            </p>
          </div>

          {/* "Ja" Option */}
          <div className="col-span-4 flex items-center justify-end">
            <input
              className={`${styles["form-check-input"]} mr-2`}
              type="radio"
              name="timeperiod"  // Ensure both radio buttons share the same name
              id="timeperiod1"
              value="Ja"
              checked={selectedRadio6 === "Ja"}  // Use one state variable for both options
              onChange={() => radiohandle("Ja", "r6")}
            />
            <label
              className={`${styles["form-check-label"]} ${
                styles["radio-btn-2"]
              } ${selectedRadio6 === "Ja" ? styles["black"] : ""}`}
              htmlFor="timeperiod1"
            >
              Ja
            </label>
          </div>

          {/* "Nein" Option */}
          <div className="col-span-4 flex items-center">
            <input
              className={`${styles["form-check-input"]} mr-2`}
              type="radio"
              name="timeperiod"  // Ensure both radio buttons share the same name
              id="timeperiod2"
              value="Nein"
              checked={selectedRadio6 === "Nein"}  // Same state variable as above
              onChange={() => radiohandle("Nein", "r6")}
            />
            <label
              className={`${styles["form-check-label"]} ${
                styles["radio-btn-2"]
              } ${selectedRadio6 === "Nein" ? styles["black"] : ""}`}
              htmlFor="timeperiod2"
            >
              Nein
            </label>
          </div>
        </div>


        <div className="grid grid-cols-8 gap-4 mt-9">
          <div className="col-span-8 text-center ...">
            <p className={`${styles["form-control"]} form-control mb-5 `}>
              Laden Sie bitte ihren Gehaltsnachweis aus dem letzten Monat hoch ℹ
            </p>
          </div>
          <div className="col-span-8 text-center ...">
            <div className={`${styles["file-upload"]}`}>
              <label
                className={`${styles["file_up"]} control-label `}
                for="attach"
              >
                <img src={showsalarystatementlast || 'data:image/gif;base64,R0lGODlhAQABAAD/ACwAAAAAAQABAAACADs='} className="mt-4" alt="" />
                <h4 className={`${styles["file-h4"]} mt-4`}>
                  Wählen Sie ihre Datei aus oder ziehen Sie diese hier hinein
                </h4>
                <p className={`${styles["file-p"]} mt-4`}>
                  JPG, PNG or PDF, file size no more than 10MB
                </p>
                <input
                  type="file"
                  id="attach1"
                  className={`${styles["inputfile"]}`}
                  name="salarystatementlast"
                  onChange={handleChange}
                />
                <label
                  for="attach1"
                  name="salary-slip"
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
              Laden Sie bitte ihren Gehaltsnachweis aus dem vorletzten Monat hoch
            </p>
          </div>
          <div className="col-span-8 text-center ...">
            <div className={`${styles["file-upload"]}`}>
              <label
                className={`${styles["file_up"]} control-label `}
                for="attach"
              >
                <img src={showsalarystatementbefore || 'data:image/gif;base64,R0lGODlhAQABAAD/ACwAAAAAAQABAAACADs='} className="mt-4" alt="" />
                <h4 className={`${styles["file-h4"]} mt-4`}>
                  Wählen Sie ihre Datei aus oder ziehen Sie diese hier hinein
                </h4>
                <p className={`${styles["file-p"]} mt-4`}>
                  JPG, PNG or PDF, file size no more than 10MB
                </p>
                <input
                  type="file"
                  id="attach2"
                  className={`${styles["inputfile"]}`}
                  name="salarystatementbefore"
                  onChange={handleChange}
                />
                <label
                  for="attach2"
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
              Laden Sie bitte ihren Gehaltsnachweis von vor 3 Monaten hoch
            </p>
          </div>
          <div className="col-span-8 text-center ...">
            <div className={`${styles["file-upload"]}`}>
              <label
                className={`${styles["file_up"]} control-label `}
                for="attach"
              >
                <img src={showsalarystatementago || 'data:image/gif;base64,R0lGODlhAQABAAD/ACwAAAAAAQABAAACADs='} className="mt-4" alt="" />
                <h4 className={`${styles["file-h4"]} mt-4`}>
                  Wählen Sie ihre Datei aus oder ziehen Sie diese hier hinein
                </h4>
                <p className={`${styles["file-p"]} mt-4`}>
                  JPG, PNG or PDF, file size no more than 10MB
                </p>
                <input
                  type="file"
                  id="attach3"
                  className={`${styles["inputfile"]}`}
                  name="salarystatementago"
                  onChange={handleChange}
                />
                <label
                  for="attach3"
                  name="salary-statemnent"
                  className={`${styles["custom-file-upload"]} mt-3`}
                >
                  Select file
                </label>
              </label>
            </div>
          </div>
        </div>
        {/* step 3 end */}
        
      </div>
      <div className="ten2">
        {/* step 3 */}
        <h1 className={`${styles["form1-heading"]} mt-4 mb-7`}>
          Beschäftigungsverhältnis: Mieter 2
        </h1>
        <div className="grid grid-cols-2 gap-4 mt-3 mb-3">
          <div className="...">
            <div className="input-field">
            <select
                  id="status2"
                  name="status2"
                  onChange={handleChange}
                  value={status2} 
                  className={`${styles["form-input"]} form-input`}
              >
                  <option value="Beschäftigungsstatus">Beschäftigungsstatus</option>
                  <option value="US">United States</option>
                  <option value="CA">Canada</option>
                  <option value="FR">France</option>
                  <option value="DE">Germany</option>
              </select>
            </div>
          </div>
          <div className="...">
            <div className="input-field">
              <input
                type="text"
                className={`${styles["form-input"]} form-input `}
                id="current-activity2"
                name="currentactivity2"
                onChange={handleChange}
                value={currentactivity2} 
                placeholder="Welche Tätigkeit üben Sie gerade aus?  "
              />
            </div>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4 mt-3">
          <div className="...">
            <div className="input-field">
              <input
                type="text"
                className={`${styles["form-input"]} form-input `}
                id="current-employer2"
                name="currentemployer2"
                onChange={handleChange}
                value={currentemployer2} 
                placeholder="Aktueller Arbeitgeber"
              />
            </div>
          </div>
          <div className="...">
            <div className="input-field">
              <input
                type="text"
                className={`${styles["form-input"]} form-input `}
                id="monthly-income2"
                name="incomee2"
                onChange={handleChange}
                value={incomee2}
                placeholder="Monatlichen Nettoeinkommen"
              />
            </div>
          </div>
        </div>

        <div className="grid grid-cols-8 gap-4 mt-9">
          <div className="col-span-8 text-center">
            <p className={`${styles["form-control"]} form-control mb-9`}>
              Besteht ihr Beschäftigungsverhältnis länger als 6 Monate?
            </p>
          </div>

          {/* "Ja" Option */}
          <div className="col-span-4 flex items-center justify-end">
            <input
              className={`${styles["form-check-input"]} mr-2`}
              type="radio"
              name="timeperiod2"  // Ensure both radio buttons share the same name
              id="timeperiod1_2"
              value="Ja"
              checked={selectedRadio7 === "Ja"}  // Use one state variable for both options
              onChange={() => radiohandle("Ja", "r7")}
            />
            <label
              className={`${styles["form-check-label"]} ${
                styles["radio-btn-2"]
              } ${selectedRadio7 === "Ja" ? styles["black"] : ""}`}
              htmlFor="timeperiod1_2"
            >
              Ja
            </label>
          </div>

          {/* "Nein" Option */}
          <div className="col-span-4 flex items-center">
            <input
              className={`${styles["form-check-input"]} mr-2`}
              type="radio"
              name="timeperiod2"  // Ensure both radio buttons share the same name
              id="timeperiod2_2"
              value="Nein"
              checked={selectedRadio7 === "Nein"}  // Same state variable as above
              onChange={() => radiohandle("Nein", "r7")}
            />
            <label
              className={`${styles["form-check-label"]} ${
                styles["radio-btn-2"]
              } ${selectedRadio7 === "Nein" ? styles["black"] : ""}`}
              htmlFor="timeperiod2_2"
            >
              Nein
            </label>
          </div>
        </div>


        <div className="grid grid-cols-8 gap-4 mt-9">
          <div className="col-span-8 text-center ...">
            <p className={`${styles["form-control"]} form-control mb-5 `}>
              Laden Sie bitte ihren Gehaltsnachweis aus dem letzten Monat hoch ℹ
            </p>
          </div>
          <div className="col-span-8 text-center ...">
            <div className={`${styles["file-upload"]}`}>
              <label
                className={`${styles["file_up"]} control-label `}
                for="attach"
              >
                <img src={showsalarystatementlast2 || 'data:image/gif;base64,R0lGODlhAQABAAD/ACwAAAAAAQABAAACADs='} className="mt-4" alt="" />
                <h4 className={`${styles["file-h4"]} mt-4`}>
                  Wählen Sie ihre Datei aus oder ziehen Sie diese hier hinein
                </h4>
                <p className={`${styles["file-p"]} mt-4`}>
                  JPG, PNG or PDF, file size no more than 10MB
                </p>
                <input
                  type="file"
                  id="attach1"
                  className={`${styles["inputfile"]}`}
                  name="salarystatementlast2"
                  onChange={handleChange}
                />
                <label
                  for="attach1"
                  name="salary-slip"
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
              Laden Sie bitte ihren Gehaltsnachweis aus dem vorletzten Monat hoch
            </p>
          </div>
          <div className="col-span-8 text-center ...">
            <div className={`${styles["file-upload"]}`}>
              <label
                className={`${styles["file_up"]} control-label `}
                for="attach"
              >
                <img src={showsalarystatementbefore2 || 'data:image/gif;base64,R0lGODlhAQABAAD/ACwAAAAAAQABAAACADs='} className="mt-4" alt="" />
                <h4 className={`${styles["file-h4"]} mt-4`}>
                  Wählen Sie ihre Datei aus oder ziehen Sie diese hier hinein
                </h4>
                <p className={`${styles["file-p"]} mt-4`}>
                  JPG, PNG or PDF, file size no more than 10MB
                </p>
                <input
                  type="file"
                  id="attach2"
                  className={`${styles["inputfile"]}`}
                  name="salarystatementbefore2"
                  onChange={handleChange}
                />
                <label
                  for="attach2"
                  name="salary-statemnent2"
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
              Laden Sie bitte ihren Gehaltsnachweis von vor 3 Monaten hoch
            </p>
          </div>
          <div className="col-span-8 text-center ...">
            <div className={`${styles["file-upload"]}`}>
              <label
                className={`${styles["file_up"]} control-label `}
                for="attach"
              >
                <img src={showsalarystatementago2 || 'data:image/gif;base64,R0lGODlhAQABAAD/ACwAAAAAAQABAAACADs='} className="mt-4" alt="" />
                <h4 className={`${styles["file-h4"]} mt-4`}>
                  Wählen Sie ihre Datei aus oder ziehen Sie diese hier hinein
                </h4>
                <p className={`${styles["file-p"]} mt-4`}>
                  JPG, PNG or PDF, file size no more than 10MB
                </p>
                <input
                  type="file"
                  id="attach3"
                  className={`${styles["inputfile"]}`}
                  name="salarystatementago2"
                  onChange={handleChange}
                />
                <label
                  for="attach3"
                  name="salary-statemnent"
                  className={`${styles["custom-file-upload"]} mt-3`}
                >
                  Select file
                </label>
              </label>
            </div>
          </div>
        </div>
        {/* step 3 end */}
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
      </div>
      <div>
       <PdfDesignPage3 
          vorname={vorname}
          nachname={nachname}
          email={email}
          tel={tel}
          selectedImg={selectedImg}
          status={status}
          currentactivity={currentactivity}
          currentemployer={currentemployer}
          incomee={incomee}
          salarystatementlast={salarystatementlast}
          salarystatementbefore={salarystatementbefore}
          salarystatementago={salarystatementago}
       
       />
      </div>

    </div>
  );
};

export default stepthree;
