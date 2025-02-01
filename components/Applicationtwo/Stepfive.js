import React from "react";
import styles from "../../styles/form.module.css";
import { useState } from "react";

const Stepfive = ({
  shortvideo,
  identificationdocument,
  showidentificationdocument,
  showshortvideo,

  shortvideo2,
  identificationdocument2,
  showidentificationdocument2,
  showshortvideo2,
  handleChange,
  setComponents,
  }) => {


  const validation = () =>{
    const newErrors = {};
    setComponents(6);
  } 
    
  return (
    <>
    <div className="ten1">
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
    </div>
    <div className="ten2">
      <h1 className={`${styles["form1-heading"]} mt-9 mb-7 `}>
        Personalausweiß: Mieter 2
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
              <img src={showidentificationdocument2 || 'data:image/gif;base64,R0lGODlhAQABAAD/ACwAAAAAAQABAAACADs='} className="mt-4" alt="" />
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
                name="identificationdocument_2"
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
              <img src={showshortvideo2 || 'data:image/gif;base64,R0lGODlhAQABAAD/ACwAAAAAAQABAAACADs='} className="mt-4" alt="" />
              <h4 className={`${styles["file-h4"]} mt-4`}>
                Wählen Sie ihre Datei aus oder ziehen Sie diese hier hinein
              </h4>
              <p className={`${styles["file-p"]} mt-4`}>
                JPG, PNG or PDF, file size no more than 10MB
              </p>
              <input
                type="file"
                id="attach6_2"
                className={`${styles["inputfile"]}`}
                name="shortvideo_2"
                onChange={handleChange}
              />
              <label
                for="attach6_2"
                name="salary-statemnent_2"
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
    </div>
      
    </>
  );
};

export default Stepfive;
