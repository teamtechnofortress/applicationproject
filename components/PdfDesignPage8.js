import React from 'react'
import styles from "../styles/pdf.module.css";
import Header from "./PdfDesignHeader"

const PdfDesignPage8 = () => {
  return (
    <div>
        {/* page 8*/}
      <div className={`${styles['pagepdf']}`}>
        {/* header */}
        <Header 
            vorname={vorname}
            nachname={nachname}
            selectedImg={selectedImg}
            email={email}
            tel={tel}
            />
        {/* header */}

          <div className={`${styles['section']}`}>
            <p className={`${styles['titleBlue']}`}>ARBEITSVERTRAG (3/3)</p>
            <img className={`${styles['pdfimg']}`}  src="/images/img.png" />
          </div>
          {/* Page Number */}
        <p className={`${styles['pageNumber']}`} render={({ pageNumber }) => `${pageNumber}`} fixed />
     </div>
      {/* page 8 end*/}

      {/* page 9 */}
      <div className={`${styles['pagepdf']}`}>
        {/* header */}
        <div className={`${styles['header']}`}>
          <img className={`${styles['headerImage']}`} src="/images/img.png" />
          <div className={`${styles['headerp}']}`}>
            <p className={`${styles['headerName']}`}>Ivan Gutierrez Otero</p>
            <p className={`${styles['headerPhone']}`}>0987654313</p>
            <p className={`${styles['headerEmail}']}`}>Ivan.gutierrez.otero@gmail.com</p>
          </div>
        </div>
        {/* header */}

          <div className={`${styles['section']}`}>
            <p className={`${styles['titleBlue']}`}>SCHUFA - BONITÄTSCHECK</p>
            <img className={`${styles['pdfimg']}`} src="/images/img.png" />
          </div>
          {/* Page Number */}
        <p className={`${styles['pageNumber']}`} render={({ pageNumber }) => `${pageNumber}`} fixed />
     </div>
      {/* page 9 end*/}

      {/* page 10 */}
      <div className={`${styles['pagepdf']}`}>
        {/* header */}
        <div className={`${styles['header']}`}>
          <img className={`${styles['headerImage']}`} src="/images/img.png" />
          <div className={`${styles['headerp}']}`}>
            <p className={`${styles['headerName']}`}>Ivan Gutierrez Otero</p>
            <p className={`${styles['headerPhone']}`}>0987654313</p>
            <p className={`${styles['headerEmail}']}`}>Ivan.gutierrez.otero@gmail.com</p>
          </div>
        </div>
        {/* header */}

          <div className={`${styles['section']}`}>
            <p className={`${styles['title']}`}>Untermieter</p>
            <div className={`${styles['pdfSection']}`}>
              <p className={`${styles['titleCenter']}`}>Mietschuldenfreiheitsbescheinigung</p>
              <p className={`${styles['titlePdf']}`}>Vermieter/Eigentümer</p>
              <p className={`${styles['parapdf']}`}>Nurten Güler</p>
              <p className={`${styles['parapdf']}`}>Gontermannstraße 55</p>
              <p className={`${styles['parapdf']}`}>12101 Berlin</p>
              <p className={`${styles['titlePdf']}`}>Mieter</p>
              <p className={`${styles['parapdf']}`}>Nurten Güler</p>
              <p className={`${styles['parapdf']}`}>Gontermannstraße 55</p>
              <p className={`${styles['parapdf']}`}>12101 Berlin</p>
              <p className={`${styles['titlePdfbody']}`}>Der Vermieter/Eigentümer bestätigt folgendes:</p>
              <p className={`${styles['parapdf']}`}>Während der Zeit des Mietverhältnisses ist der Mieter den vertraglichen Zahlungsverpflichtungen regelmäßig, fristgerecht und vollständig nachgekommen. Aus diesen Verpflichtungen bestehen keine Mietschulden oder auszugleichenden Beträge.</p>
              <div className={`${styles['pdfFooter']}`}>
                <div className={`${styles['pfdLeft']}`}>
                  <p className={`${styles['datePlace']}`}>Berlin, 22.04.2024</p>
                  <p className={`${styles['dateHeader']}`}>Ort, Datum</p>
                </div>
                <div className={`${styles['pfdRight']}`}>
                  <div className={`${styles['signatureContainer']}`}>
                    <img className={`${styles['signImage']}`} src="/images/sign1.png" />
                  </div>
                  <p className={`${styles['signHeader']}`}>Unterschrift Vermieter</p>
                </div>
              </div>
            </div>
          </div>
         
          {/* Page Number */}
        <p className={`${styles['pageNumber']}`} render={({ pageNumber }) => `${pageNumber}`} fixed />
     </div>
      {/* page 10 end */}
      
    </div>
  )
}

export default PdfDesignPage8
