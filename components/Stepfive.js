import React from "react";
import styles from "../styles/form.module.css";
import { useState } from "react";

const Stepfive = ({shortvideo,identificationdocument,showidentificationdocument,showshortvideo,handleChange,setComponents,}) => {
  // const [showidentificationdocument, setShowidentificationdocument] = useState(false);
  // const [showshortvideo, setShowshortvideo] = useState(false);

  // if (identificationdocument) {
  //   const reader = new FileReader();
  //   reader.onloadend = () => {
  //     const result = reader.result;
  //     setShowidentificationdocument(result); // Assuming setSelectedImg updates the state to show the image
  //   };
  //   reader.readAsDataURL(identificationdocument);
  // }
  // if (shortvideo) {
  //   const reader = new FileReader();
  //   reader.onloadend = () => {
  //     const result = reader.result;
  //     setShowshortvideo(result); // Assuming setSelectedImg updates the state to show the image
  //   };
  //   reader.readAsDataURL(shortvideo);
  // }



    const validation = () =>{
        const newErrors = {};
        setComponents(6);


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
    } 
    
  return (
    <>
      <h1 className={`${styles["form1-heading"]} mt-9 mb-7 `}>
        Personalausweiß: Mieter 1
      </h1>
      <p className={`${styles["step5-p"]}`}>
        Bitte laden Sie hier ihr Ausweisdokument hoch. <br />
        Hier ist ein kurzes Video wie du dies innerhalb von wenigen Minuten
        <br />
        hinbekommst ohne technische Kenntnisse. <br />
        Wichtig! Bitte kleben Sie oder legen sie beim Fotografieren ihres
        Ausweises etwas über die angegebenen stellen ℹ️
      </p>

      <div className="grid grid-cols-1 gap-4 mt-7 mb-3">
        <div className="flex justify-center ...">
          <img src="/front.png" alt="" className="card-img" />
        </div>
      </div>
      <div className="grid grid-cols-8 gap-4 mt-9">
        <div className="col-span-8 text-center ...">
          <div className={`${styles["file-upload"]}`}>
            <label
              className={`${styles["file_up"]} control-label `}
              for="attach"
            >
              <img src={showidentificationdocument || 'data:image/gif;base64,R0lGODlhAQABAAD/ACwAAAAAAQABAAACADs='} className="mt-4" alt="" />
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
                name="identificationdocument"
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
      <div className="grid grid-cols-1 gap-4 mt-7 mb-3">
        <div className="flex justify-center ...">
          <img src="/back.png" alt="" className="card-img" />
        </div>
      </div>
      <div className="grid grid-cols-8 gap-4 mt-9">
        <div className="col-span-8 text-center ...">
          <div className={`${styles["file-upload"]}`}>
            <label
              className={`${styles["file_up"]} control-label `}
              for="attach"
            >
              <img src={showshortvideo || 'data:image/gif;base64,R0lGODlhAQABAAD/ACwAAAAAAQABAAACADs='} className="mt-4" alt="" />
              <h4 className={`${styles["file-h4"]} mt-4`}>
                Wählen Sie ihre Datei aus oder ziehen Sie diese hier hinein
              </h4>
              <p className={`${styles["file-p"]} mt-4`}>
                JPG, PNG or PDF, file size no more than 10MB
              </p>
              <input
                type="file"
                id="attach6"
                className={`${styles["inputfile"]}`}
                name="shortvideo"
                onChange={handleChange}
              />
              <label
                for="attach6"
                name="salary-statemnent"
                className={`${styles["custom-file-upload"]} mt-3`}
              >
                Select file
              </label>
            </label>
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
    </>
  );
};

export default Stepfive;
