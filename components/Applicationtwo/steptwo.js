import React, { useState } from "react";
import styles from "../../styles/form.module.css";
import PdfDesignPage2 from "../PdfDesignPage2";

const testcomponent = ({ vorname,nachname,email,tel,selectedImg, handleChange, people, setComponents }) => {


  const validation = () => {
    const newErrors = {};
    setComponents(3);
  };

  return (
    <div className="grid grid-cols-2 gap-4">
      <div>
        <h1 className={`${styles["form1-heading"]} mt-4 mb-9`}>Anschreiben Mieter 1 & 2</h1>
        <p className={`${styles["form1-p"]} mt-4 mb-7`}>
          Ein kurzer Abschnitt am Anfang ihrer Bewerbermappe, gehen Sie in 4 – 6
          Zeilen auf ihren Beruf, Lebenssituation und ggf. auf Schufa Einträge
          ein.ℹ️
        </p>

        {/* Short Description */}
        <div className="grid grid-cols-1 gap-4 mt-5">
          <div className="...">
            <textarea
              id="textarea-field"
              className={`${styles["form-input"]}`}
              onChange={handleChange}
              name="people"
              value={people}
              rows="12"
              cols="118"
            ></textarea>
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
      <div>
        <PdfDesignPage2
        vorname={vorname}
        nachname={nachname}
        email={email}
        tel={tel}
        selectedImg={selectedImg}
        people={people}
         />
      </div>
    </div>
  );
};

export default testcomponent;
