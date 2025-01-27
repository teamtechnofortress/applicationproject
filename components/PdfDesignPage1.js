import React from "react";
import styles from "../styles/pdf.module.css";
import Header from "./PdfDesignHeader"


const PdfPage = ({
  id,
  vorname,
  nachname,
  strabe,
  hausnummer,
  PLZ,
  Ort,
  email,
  tel,
  geburtsdatum,
  ausgeübterBeruf,
  arbeitgeber,
  income,
  photo,
  textarea1,
  textarea2,
  textarea3,
  textarea4,
  textarea5,
  handleChange,
  selectedImg,
  setComponents,
  setSignatureData,
  setApplicationimg,
  selectedRadio1,
  selectedRadio2,
  selectedRadio3,
  selectedRadio4,
  selectedRadio5,
}) => {
  return (
    <>
      {/* page 1*/}
      <div id={id} className={`${styles["pagepdf"]}`}>
        <Header 
        vorname={vorname}
        nachname={nachname}
        selectedImg={selectedImg}
        email={email}
        tel={tel}
        />
        <div className={`${styles["section"]}`}>
          <p className={`${styles["title"]}`}>MIETER- SELBSTAUSKUNFT</p>
          <p className={`${styles["para"]}`}>
            Ich bin/Wir sind an der Anmietung folgender Räumlichkeiten
            interessiert:
          </p>
          <p className={`${styles["para"]}`}>
            3 ZKB | Sommerallee 23, 1025 Berlin 2. Stock, rechts
          </p>
          <p className={`${styles["para"]}`}>Mietbeginn:</p>
          <p className={`${styles["para"]}`}>
            Im Rahmen der freiwilligen Selbstauskunft erteile/n ich/wir dem
            Vermieter nachfolgende Informationen zum Zweck einer möglichen
            Anmietung des o.g. Mietobjektes:
          </p>
          {/* <img
            className={`${styles["image"]}`}
            src="/images/img.png"
            alt="Description of the img"
          /> */}
          <div className={`${styles["table"]}`}>
            {/* Table Headers */}
            <div className={`${styles["tableRow"]}`}>
              <div className={`${styles["tableCol"]}`}>
                <p className={`${styles["tableCell"]}`}>heading</p>
              </div>
              <div className={`${styles["tableCol"]}`}>
                <p className={`${styles["tableCell"]}`}>Value1</p>
              </div>
            </div>
              {/* Table Rows */}
              {vorname !== "" && (
                <div className={`${styles["tableRow"]}`}>
                  <div className={`${styles["tableCol"]}`}>
                    <p className={`${styles["tableCell"]}`}>First Name</p>
                  </div>
                  <div className={`${styles["tableCol"]}`}>
                    <p className={`${styles["tableCell"]}`}>{vorname}</p>
                  </div>
                </div>
              )}
              {nachname!==""&&(
                <div className={`${styles["tableRow"]}`}>
                  <div className={`${styles["tableCol"]}`}>
                    <p className={`${styles["tableCell"]}`}>Last Name</p>
                  </div>
                  <div className={`${styles["tableCol"]}`}>
                    <p className={`${styles["tableCell"]}`}>{nachname}</p>
                  </div>
               </div>
              )}
              {strabe!=="" && (
                <div className={`${styles["tableRow"]}`}>
                  <div className={`${styles["tableCol"]}`}>
                    <p className={`${styles["tableCell"]}`}>strabe</p>
                  </div>
                  <div className={`${styles["tableCol"]}`}>
                    <p className={`${styles["tableCell"]}`}>{strabe}</p>
                  </div>
                </div>
              )}
              {hausnummer!=="" && (
                <div className={`${styles["tableRow"]}`}>
                  <div className={`${styles["tableCol"]}`}>
                    <p className={`${styles["tableCell"]}`}>hausnummer</p>
                  </div>
                  <div className={`${styles["tableCol"]}`}>
                    <p className={`${styles["tableCell"]}`}>{hausnummer}</p>
                  </div>
                </div>
              )}
              {PLZ!=="" && (
                <div className={`${styles["tableRow"]}`}>
                  <div className={`${styles["tableCol"]}`}>
                    <p className={`${styles["tableCell"]}`}>PLZ</p>
                  </div>
                  <div className={`${styles["tableCol"]}`}>
                    <p className={`${styles["tableCell"]}`}>{PLZ}</p>
                  </div>
                </div>
              )}
              {Ort!=="" && (
                <div className={`${styles["tableRow"]}`}>
                  <div className={`${styles["tableCol"]}`}>
                    <p className={`${styles["tableCell"]}`}>Ort</p>
                  </div>
                  <div className={`${styles["tableCol"]}`}>
                    <p className={`${styles["tableCell"]}`}>{Ort}</p>
                  </div>
                </div>
              )}
              {email!=="" && (
                <div className={`${styles["tableRow"]}`}>
                  <div className={`${styles["tableCol"]}`}>
                    <p className={`${styles["tableCell"]}`}>email</p>
                  </div>
                  <div className={`${styles["tableCol"]}`}>
                    <p className={`${styles["tableCell"]}`}>{email}</p>
                  </div>
                </div>
              )}
              {tel!=="" && (
                <div className={`${styles["tableRow"]}`}>
                  <div className={`${styles["tableCol"]}`}>
                    <p className={`${styles["tableCell"]}`}>tel</p>
                  </div>
                  <div className={`${styles["tableCol"]}`}>
                    <p className={`${styles["tableCell"]}`}>{tel}</p>
                  </div>
                </div>
              )}
              {geburtsdatum!=="" && (
                <div className={`${styles["tableRow"]}`}>
                  <div className={`${styles["tableCol"]}`}>
                    <p className={`${styles["tableCell"]}`}>geburtsdatum</p>
                  </div>
                  <div className={`${styles["tableCol"]}`}>
                    <p className={`${styles["tableCell"]}`}>{geburtsdatum}</p>
                  </div>
                </div>
              )}
              {ausgeübterBeruf!=="" && (
                <div className={`${styles["tableRow"]}`}>
                  <div className={`${styles["tableCol"]}`}>
                    <p className={`${styles["tableCell"]}`}>ausgeübterBeruf</p>
                  </div>
                  <div className={`${styles["tableCol"]}`}>
                    <p className={`${styles["tableCell"]}`}>{ausgeübterBeruf}</p>
                  </div>
                </div>
              )}
              {arbeitgeber!=="" && (
                <div className={`${styles["tableRow"]}`}>
                  <div className={`${styles["tableCol"]}`}>
                    <p className={`${styles["tableCell"]}`}>arbeitgeber</p>
                  </div>
                  <div className={`${styles["tableCol"]}`}>
                    <p className={`${styles["tableCell"]}`}>{arbeitgeber}</p>
                  </div>
                </div>
              )}
              {income!=="" && (
                <div className={`${styles["tableRow"]}`}>
                  <div className={`${styles["tableCol"]}`}>
                    <p className={`${styles["tableCell"]}`}>income</p>
                  </div>
                  <div className={`${styles["tableCol"]}`}>
                    <p className={`${styles["tableCell"]}`}>{income}</p>
                  </div>
                </div>
              )}
              {textarea1 !== "" && selectedRadio1 === "Ja" && (
                <div className={`${styles["tableRow"]}`}>
                  <div className={`${styles["tableCol"]}`}>
                    <p className={`${styles["tableCell"]}`}>textarea1</p>
                  </div>
                  <div className={`${styles["tableCol"]}`}>
                    <p className={`${styles["tableCell"]}`}>{textarea1}</p>
                  </div>
                </div>
              )}
              {textarea2!=="" && selectedRadio2 === "Ja"  && (
                <div className={`${styles["tableRow"]}`}>
                  <div className={`${styles["tableCol"]}`}>
                    <p className={`${styles["tableCell"]}`}>textarea2</p>
                  </div>
                  <div className={`${styles["tableCol"]}`}>
                    <p className={`${styles["tableCell"]}`}>{textarea2}</p>
                  </div>
                </div>
              )}
              {textarea3!=="" && selectedRadio3 === "Ja"  && (
                <div className={`${styles["tableRow"]}`}>
                  <div className={`${styles["tableCol"]}`}>
                    <p className={`${styles["tableCell"]}`}>textarea3</p>
                  </div>
                  <div className={`${styles["tableCol"]}`}>
                    <p className={`${styles["tableCell"]}`}>{textarea3}</p>
                  </div>
                </div>
              )}
               {textarea4!=="" && selectedRadio4 === "Ja"  && (
                <div className={`${styles["tableRow"]}`}>
                  <div className={`${styles["tableCol"]}`}>
                    <p className={`${styles["tableCell"]}`}>textarea4</p>
                  </div>
                  <div className={`${styles["tableCol"]}`}>
                    <p className={`${styles["tableCell"]}`}>{textarea4}</p>
                  </div>
                </div>
              )}
              {textarea5!=="" && selectedRadio5 === "Ja"  && (
                <div className={`${styles["tableRow"]}`}>
                  <div className={`${styles["tableCol"]}`}>
                    <p className={`${styles["tableCell"]}`}>textarea5</p>
                  </div>
                  <div className={`${styles["tableCol"]}`}>
                    <p className={`${styles["tableCell"]}`}>{textarea5}</p>
                  </div>
                </div>
              )}
            
          </div>
        </div>
        <p
          className={`${styles["pageNumber"]}`}
          render={({ pageNumber }) => `${pageNumber}`}
          fixed
        />
      </div>
      {/* page 1 end*/}
    </>
  );
};

export default PdfPage;
