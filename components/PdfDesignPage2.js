import React from "react";
import styles from "../styles/pdf.module.css";
import Header from "./PdfDesignHeader"


const PdfDesignPage2 = ({
  nachname,
  vorname,
  selectedImg,
  tel,
  email,
  people,
}) => {
  return (
    <>
      {/* page 2*/}
      <div className={`${styles["pagepdf"]}`}>
        <Header 
          vorname={vorname}
          nachname={nachname}
          selectedImg={selectedImg}
          email={email}
          tel={tel}
        />
        {/* header */}

        <div className={`${styles["section"]}`}>
          <p className={`${styles["titleBlue"]}`}>ÜBER MICH</p>
          <p className={`${styles["paraBlue"]}`}>Hallo!</p>
          <p className={`${styles["paraBlue"]}`}>
           {people}
          </p>
          {/* <p className={`${styles["paraBlue"]}`}>
            Dank meines stabilen Einkommens von mehr als 3000 € Netto pro Monat
            (+Bonus) und Ersparnisse von mehr als 22.000 € bin ich in der Lage,
            mir diese Wohnung leisten zu können und biete damit ausreichende
            Sicherheit und Stabilität für zukünftige Mietzahlungen.
          </p>
          <p className={`${styles["paraBlue"]}`}>
            Der Grund für meine Wohnungssuche liegt darin, dass meine derzeitige
            Wohnung langsam zu klein für meine Bedürfnisse wird. Dank meiner
            stabilen und komfortablen beruflichen Situation bin ich in der Lage,
            nach einer neuen größeren Wohnung zu suchen, wo ich langfristig
            leben kann.
          </p>
          <p className={`${styles["paraBlue"]}`}>
            Ich lege auch höchsten Wert darauf, die Wohnung gut zu pflegen,
            nicht nur, weil dies entscheidend für die Qualität der Wohnung ist,
            sondern auch, weil sie ein Raum ist, der mein tägliches Leben prägt.
          </p>
          <p className={`${styles["paraBlue"]}`}>
            Für meine Bewerbung füge ich anbei meine Einkommensnachweise, meinen
            Arbeitsvertrag, meinen Kontosaldo, den Nachweis meiner
            Mietzahlungen, den Schufa- Bonitätscheck,
            Haftpflichtversicherungsschein und den Personalausweis. Für weitere
            Fragen oder Informationen stehe ich immer gerne zur Verfügung.
          </p>
          <p className={`${styles["paraBlue"]}`}>
            Ich freue mich auf Ihre Rückmeldung.
          </p>
          <p className={`${styles["paraBlue"]}`}>Viele Grüße,</p>
          <p className={`${styles["paraBlue"]}`}>Ivan Gutierrez</p> */}
        </div>
        {/* Page Number */}
        <p
          className={`${styles["pageNumber"]}`}
          render={({ pageNumber }) => `${pageNumber}`}
          fixed
        />
      </div>
      {/* page 2 end*/}
    </>
  );
};

export default PdfDesignPage2;
