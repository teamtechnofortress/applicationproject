import React from "react";
import styles from "../styles/pdf.module.css";
import Header from "./PdfDesignHeader"


const PdfDesignPage4 = () => {
  return (
    <>
      {/* page 4*/}
      <div className={`${styles["pagepdf"]}`}>
        {/* header */}
        <Header 
          vorname={vorname}
          nachname={nachname}
          selectedImg={selectedImg}
          email={email}
          tel={tel}
          />
        {/* header */}

        <div className={`${styles["section"]}`}>
          <p className={`${styles["titleBlue"]}`}>EINKOMMENSNACHWEISE (2/3)</p>
          <img className={`${styles["pdfimg"]}`} src="/images/img.png" />
        </div>
        {/* Page Number */}
        <p
          className={`${styles["pageNumber"]}`}
          render={({ pageNumber }) => `${pageNumber}`}
          fixed
        />
      </div>
      {/* page 4 end*/}
    </>
  );
};

export default PdfDesignPage4;
