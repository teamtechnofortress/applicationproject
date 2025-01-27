import React from 'react'
import styles from "../styles/pdf.module.css";


const PdfDesignHeader = ({vorname,nachname,email,tel,selectedImg}) => {
  return (
    <>
         {/* header */}
         <div className={`${styles["header"]}`}>
          <img className={`${styles["headerImage"]}`} src={`\ ${selectedImg}`} />
          <div className={`${styles["headerp"]}`}>
          <p className={`${styles["headerName"]}`}>
            {(vorname !== "" ? `${vorname} ${nachname}` : "")}
          </p>
            <p className={`${styles["headerPhone"]}`}>{tel!== "" && ( tel)}</p>
            <p className={`${styles["headerEmail"]}`}>
              {email!== "" && (email)}
            </p>
          </div>
        </div>
        {/* header */}
      
    </>
  )
}

export default PdfDesignHeader
