import React, { useEffect, useState } from "react";
import { Page, Text, View, Document, StyleSheet, Image, Font } from '@react-pdf/renderer';

// Register the Poppins font
Font.register({
  family: 'Poppins',
  fonts: [
    {
      src: '/Font/Poppins/Poppins-Regular.ttf',
      fontWeight: 'regular',
    },
    {
      src: '/Font/Poppins/Poppins-Bold.ttf',
      fontWeight: 'bold',
    },
    {
      src: '/Font/Poppins/Poppins-Medium.ttf',
      fontWeight: 'medium',
    },
  ],
});

// Create styles
const styles = StyleSheet.create({
  page: {
    padding: 0,
    backgroundColor: '#f6f6f6',
  },
  banner: {
    width: "100%",
    height: "auto",
  },
  logo: {
    width: "35%",
    height: "auto",
    marginTop: -40,
    marginLeft:4,
  },
  headerLogo: {
    width: "30%",
    height: "auto",
    alignSelf: 'center',
    marginRight: 40,
  },
  footerlogo: {
    width: "40%",
    height: "auto",
    marginTop: -40,
    alignSelf: 'center',
  },
  section: {
    margin: 10,
    padding: 40,
    fontSize: 12,
  },
  secondPagesection: {
    margin: 10,
    paddingLeft: 30,
    paddingRight: 30,
  },
  title: {
    fontFamily: 'Poppins',
    fontWeight: 'bold',
    fontSize: 18,
    marginBottom: 10,
  },
  bannertitle: {
    fontFamily: 'Poppins',
    fontWeight: 'bold',
    fontSize: 40,
    marginBottom: 10,
    textAlign: 'center',
  },
  bannersmall: {
    fontFamily: 'Poppins',
    fontWeight: 'medium',
    fontSize: 18,
    textAlign: 'center',
  },
  titleBlue: {
    fontFamily: 'Poppins',
    fontWeight: 'bold',
    fontSize: 18,
    marginBottom: 10,
    color: '#276aa4',
  },
  titleBorder:{
    fontFamily: 'Poppins',
    fontWeight: 'medium',
    letterSpacing: -1,
    fontSize: 24,
    marginTop: 50,
    marginBottom: 10,
    marginLeft:20,
    paddingLeft: 10, 
    borderLeft: '5px solid #E7FC41',
  },
  titleCapital: {
    fontFamily: 'Poppins',
    fontWeight: 'medium',
    fontSize: 24,
    marginBottom: 10,
    textTransform: 'uppercase',
  },
  titleCenter: {
    marginTop: 50,
    marginBottom: 10,
    fontFamily: 'Poppins',
    fontSize: 13,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  titlePdf: {
    fontFamily: 'Poppins',
    fontWeight: 'bold',
    marginTop: 20,
    marginBottom: 10,
  },
  titlePdfbody: {
    fontFamily: 'Poppins',
    fontWeight: 'bold',
    marginTop: 40,
    marginBottom: 15,
  },
  para: {
    fontSize: 16,
    textAlign: 'center',
    color: '#333333',
    marginTop: 10,
  },
  paraBlue: {
    color: '#276aa4',
    marginTop: 10,
    lineHeight: 1.6,
  },
  parapdf: {
    fontFamily: 'Poppins',
    fontWeight: '300',
  },
  image: {
    margin: 'auto',
    marginBottom: 20,
    marginTop: 20,
    width: 50,
    height: 50,
    borderRadius: 50,
  },
  pdfImage: {
    marginTop: 20,
    padding: 20,
    maxHeight:700,
    objectFit: "contain",
    // borderWidth: 1,
    // borderStyle: 'solid',
    // borderColor: '#e2e2e2',
  },
  salarySlipFullPage: {
    marginTop: 20,
    padding: 20,
    maxHeight:700,
    objectFit: "contain",
  },
  idImage: {
    width: '50%',
    height: 'auto',
  },
  table: {
    display: 'table',
    width: 'auto',
    marginBottom: 10,
    fontFamily: 'Poppins',
    fontWeight: 'medium',
  },
  tableRow: {
    flexDirection: 'row',
  },
  tableCol: {
    width: '50%',
  },
  tableColOne: {
    width: '80%',
  },
  tableColTwo: {
    width: '20%',
  },
  tableCell: {
    marginTop: 5,
    fontSize: 12,
    textAlign: 'left',
    fontFamily: 'Poppins',
    fontWeight: 'medium',
  },
  tableCellTwo: {
    marginTop: 5,
    fontSize: 12,
    textAlign: 'right',
    fontFamily: 'Poppins',
    fontWeight: 'medium',
  },
 
  header: {
    width: '100%',
    padding: 10,
    backgroundColor: '#ffff',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  headerImage: {
    width: 70,
    height: 70,
    borderRadius: 50,
    border: '1px solid black',
    marginLeft: 20,
  },
  headerText: {
    width:"30%",
    textAlign: 'left',
    color: '#000',
    paddingBottom: 10,
    paddingTop: 10,
    paddingLeft:10,
  },
  headerName: {
    textAlign: 'left',
    fontFamily: 'Poppins',
    fontSize: 10,
  },
  headerPhone: {
    textAlign: 'left',
    fontFamily: 'Poppins',
    fontSize: 10,
  },
  headerEmail: {
    textAlign: 'left',
    fontFamily: 'Poppins',
    fontSize: 10,
  },
  tableHeading: {
    fontFamily: 'Poppins',
    fontWeight:'medium',
    fontSize:12,
    letterSpacing:2,
  },
  pageNumber: {
    paddingLeft:8,
    paddingRight:8,
    paddingTop:4,
    paddingBottom:4,
    position: 'absolute',
    fontSize: 12,
    bottom: 10,
    right: 40,
    backgroundColor:'#E7FC41',
  },
  footer: {
    width: "100%",
    padding: 10,
    position: "absolute",
    bottom: 0,
    left: 0,
  },
  footerRow: {
    flexDirection: "row",
    justifyContent: "space-between",  // Ensures columns are evenly spaced
    alignItems: "center",
    width: "100%",
  },
  footerColOne: {
    width: "27%",
  },
  footerCol: {
    width: "35%",  
  },
  footerText: {
    fontFamily: 'Poppins',
    fontSize: 11,
    paddingLeft: 20,
  },
  footerTextOne: {
    fontFamily: 'Poppins',
    fontSize: 11,
    paddingLeft: 20,
  },
  footerColCenter: {
    width: "42%", 
    justifyContent: "center",
    alignItems: "center",
  },
  secondPageBody:{
    backgroundColor: '#f6f6f6',
    borderTopLeftRadius: 50,
  },
  pdfSection: {
    padding: 20,
    borderStyle: 'solid',
    borderWidth: 2,
    borderColor: '#e2e2e2',
  },
  pdfFooter: {
    paddingTop: 40,
    paddingBottom: 60,
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  pfdLeft: {
    flex: 1,
    textAlign: 'left',
    color: '#000',
    paddingBottom: 10,
    paddingTop: 10,
  },
  pfdRight: {
    flex: 1,
    textAlign: 'right',
    color: '#000',
    paddingBottom: 10,
    paddingTop: 10,
  },
  datePlace: {
    fontFamily: 'Poppins',
    fontWeight: '300',
    paddingRight: 20,
    paddingBottom: 10,
    borderBottomWidth: 1,
    borderStyle: 'solid',
    borderColor: '#000',
    marginRight: 60,
  },
  imagePlace: {
    position: 'relative',
    paddingRight: 20,
    borderBottomWidth: 1,
    borderStyle: 'solid',
    borderColor: '#000',
  },
  signImage: {
    position: 'absolute',
    width: '80%',
  },
  signatureContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderStyle: 'solid',
    borderColor: '#000',
    paddingBottom: 24,
    marginRight: 40,
  },
  signHeader: {
    fontFamily: 'Poppins',
    fontWeight: '300',
    textAlign:'left',
  },
  dateHeader: {
    fontFamily: 'Poppins',
    fontWeight: '300',
    textAlign:'left',
  },
  greenTable: {
    backgroundColor: '#E7FC41',
    borderTopLeftRadius: 50,
    borderBottomLeftRadius: 50,
    padding: 30,
  },
  greyCardBg: {
    backgroundColor: '#fff',
    borderTopLeftRadius: 50,
    borderBottomLeftRadius: 50,
    padding: 30,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop:20,
    marginBottom:20,
  },
  descriptionText:{
    fontFamily: 'Poppins',
    fontSize:12,
  },
  bodyWhite: {
    backgroundColor: '#fff',
  },
});

// Helper function to check if a file is a PDF
const isPdf = (file) => file && typeof file === "string" && file.toLowerCase().endsWith(".pdf");

// PDF.js Loader
const loadPdfJs = async () => {
  if (!window.pdfjsLib) {
    return new Promise((resolve, reject) => {
      const script = document.createElement("script");
      script.type = "module";
      script.src = "/pdfjs/pdf.mjs";
      script.onload = () => resolve();
      script.onerror = () => reject(new Error("Failed to load PDF.js"));
      document.body.appendChild(script);
    });
  }
};

// Convert PDF to Images
const convertPdfToImages = async (pdfUrl) => {
  await loadPdfJs();
  const pdfjsLib = window.pdfjsLib;
  pdfjsLib.GlobalWorkerOptions.workerSrc = "/pdfjs/pdf.worker.mjs";

  try {
    const loadingTask = pdfjsLib.getDocument(pdfUrl);
    const pdf = await loadingTask.promise;
    const numPages = pdf.numPages;
    const images = [];

    for (let i = 1; i <= numPages; i++) {
      const page = await pdf.getPage(i);
      const scale = 2;
      const viewport = page.getViewport({ scale });

      const canvas = document.createElement("canvas");
      const context = canvas.getContext("2d");

      canvas.width = viewport.width;
      canvas.height = viewport.height;

      const renderContext = { canvasContext: context, viewport: viewport };
      await page.render(renderContext).promise;

      images.push(canvas.toDataURL("image/png"));
    }

    return images;
  } catch (error) {
    console.error("Error converting PDF to images:", error);
    return [];
  }
};


// Create Document Component
const MyDocument = ({ profileData }) => {
  
  const [convertedImages, setConvertedImages] = useState({});

  useEffect(() => {
    const loadConvertedImages = async () => {
      if (!profileData) return;
  
      const fields = [
        "salaryslip",  // ✅ Multiple files (PDFs or Images)
        "employcontract",
        "einkommensbescheinigungimg",
        "imageswbs",
        "personal",
        "schufa",
        "mietschuldenfreiheitimg",
        "bwaimages"
      ];
  
      const newImages = {};
  
      for (const field of fields) {
        const files = profileData[field];
  
        if (!files || files.length === 0) {
          newImages[field] = [];
          continue;
        }
  
        if (Array.isArray(files)) {
          try {
            const processedFiles = await Promise.all(
              files.map(async (file) => {
                if (isPdf(file)) {
                  return await convertPdfToImages(file); // ✅ Convert PDFs to images
                } else {
                  return [file]; // ✅ Store image URLs directly
                }
              })
            );
  
            newImages[field] = processedFiles.flat();
          } catch (error) {
            console.error(`Error processing ${field}:`, error);
            newImages[field] = [];
          }
        } else {
          if (isPdf(files)) {
            try {
              newImages[field] = await convertPdfToImages(files);
            } catch (error) {
              console.error(`Error processing single ${field}:`, error);
              newImages[field] = [];
            }
          } else {
            newImages[field] = [files];
          }
        }
      }
  
      // console.log("Updated convertedImages:", newImages);
      setConvertedImages(newImages);
    };
  
    loadConvertedImages();
  }, [profileData]);
  
  

  // Function to render document sections dynamically
  const renderSection = (key, title) => {
    // console.log("Rendering section for:", key, convertedImages[key]);
  
    if (!convertedImages[key] || convertedImages[key].length === 0) {
      console.warn(`No images found for ${key}`);
      return null;
    }
  
    return convertedImages[key].map((img, index) => (
      <Page key={`${key}-${index}`} style={styles.page}>
        <View style={styles.header}>
          <View style={styles.headerText}>
            <Text style={styles.headerName}>{profileData.vorname} {profileData.nachname}</Text>
            <Text style={styles.headerPhone}>{profileData.tel}</Text>
            <Text style={styles.headerEmail}>{profileData.email}</Text>
          </View>
          <Image style={styles.headerLogo} src={`${window.location.origin}/images/logo.png`} alt="Logo" />
          <Image style={styles.headerImage} src={profileData.inputfoto} />
        </View>
  
        <View style={styles.bodyWhite}>
          <View style={styles.secondPageBody}>
            <Text style={styles.titleBorder}>{title}</Text>
            <View style={styles.greyCardBg}>
              <Image 
                style={{ maxHeight: "500px", objectFit: "contain" }} 
                src={img} 
              />
            </View>
          </View> 
        </View>
  
        <Text style={styles.pageNumber} render={({ pageNumber, totalPages }) => `${pageNumber}/${totalPages}`} fixed />
      </Page>
    ));
  };
  
  
 
  return (
    <Document>
      {/* page 1*/}
      <Page style={styles.page}>
      <Image style={styles.banner} src={`${window.location.origin}/images/pdfbanner.png`} alt="Description of the image" />
      <Image style={styles.logo} src={`${window.location.origin}/images/logo.png`} alt="Description of the image" />
      <View style={styles.section}>
         
          <Text style={styles.bannersmall}>Die</Text>
          <Text style={styles.bannertitle}>Bewerbermappe</Text>
          <Text style={styles.para}>Von</Text>
          <Text style={styles.para}>{profileData.vorname} {profileData.nachname}</Text>
        </View>
        <View style={styles.footer}>
            {/* Parent Row */}
            <View style={styles.footerRow}>
              {/* Left Column */}
              <View style={styles.footerColOne}>
                <Text style={styles.footerTextOne}>{profileData.strabe} {profileData.hausnummer}{"\n"} {profileData.postleitzahl}, {profileData.Ort}
                </Text>
              </View>

              {/* Center Column (Logo) */}
              <View style={styles.footerColCenter}>
                <Image style={styles.footerlogo} src={`${window.location.origin}/images/barcode.png`} alt="Description of the image" />
              </View>

              {/* Right Column */}
              <View style={styles.footerCol}>
                <Text style={styles.footerText}>+{profileData.phonenumber}</Text>
                <Text style={styles.footerText}>{profileData.email}</Text>
              </View>
            </View>
          </View>
      </Page>
      {/* page 1 end*/}

      {/* page 2*/}
      <Page style={styles.page}>
      {/* header */}
      <View style={styles.header}>
        <View style={styles.headerText}>
          <Text style={styles.headerName}>{profileData.vorname} {profileData.nachname}</Text>
          <Text style={styles.headerPhone}>{profileData.tel}</Text>
          <Text style={styles.headerEmail}>{profileData.email}</Text>
        </View>
        <Image style={styles.headerLogo} src={`${window.location.origin}/images/logo.png`} alt="Description of the image" />
        <Image style={styles.headerImage} src={profileData.inputfoto}/>
      </View>
       {/* header */}
       <View style={styles.bodyWhite}>
        <View style={styles.secondPageBody}>
          <Text style={styles.titleBorder}>Mieterselbstauskunft</Text>
          <View style={styles.secondPagesection}>
            <Text style={styles.titleCapital}>{profileData.vorname} {profileData.nachname}</Text>
            <View style={styles.table}>
               <Text style={styles.tableHeading}>KONTAKT</Text>
                  {/* Table Rows */}
                  <View style={styles.tableRow}>
                    <View style={styles.tableCol}>
                      <Text style={styles.tableCell}>Name, Vorname: </Text>
                    </View>
                    <View style={styles.tableCol}>
                      <Text style={styles.tableCellTwo}>{profileData.vorname} {profileData.nachname}</Text>
                    </View>
                  </View>

                  <View style={styles.tableRow}>
                    <View style={styles.tableCol}>
                      <Text style={styles.tableCell}>Straße, Nr.</Text>
                    </View>
                    <View style={styles.tableCol}>
                      <Text style={styles.tableCellTwo}>{profileData.strabe} {profileData.hausnummer}</Text>
                    </View>
                  </View>

                  <View style={styles.tableRow}>
                    <View style={styles.tableCol}>
                      <Text style={styles.tableCell}>PLZ, Ort</Text>
                    </View>
                    <View style={styles.tableCol}>
                      <Text style={styles.tableCellTwo}>{profileData.postleitzahl}, {profileData.Ort}</Text>
                    </View>
                  </View>

                  <View style={styles.tableRow}>
                    <View style={styles.tableCol}>
                      <Text style={styles.tableCell}>E-Mail</Text>
                    </View>
                    <View style={styles.tableCol}>
                      <Text style={styles.tableCellTwo}>{profileData.email}</Text>
                    </View>
                  </View>

                  <View style={styles.tableRow}>
                    <View style={styles.tableCol}>
                      <Text style={styles.tableCell}>Tel. Mobil</Text>
                    </View>
                    <View style={styles.tableCol}>
                      <Text style={styles.tableCellTwo}>+{profileData.phonenumber}</Text>
                    </View>
                  </View>
            </View>
          </View>
          <View style={[styles.table, styles.greenTable]}>
               <Text style={styles.tableHeading}>PERSÖNLICHES</Text>
                  {/* Table Rows */}
                  <View style={styles.tableRow}>
                    <View style={styles.tableCol}>
                      <Text style={styles.tableCell}>Geburtsdatum: </Text>
                    </View>
                    <View style={styles.tableCol}>
                      <Text style={styles.tableCellTwo}>{profileData.geburtsdatum}</Text>
                    </View>
                  </View>
                  <Text style={styles.tableHeading}>ÜBER MICH</Text>
                  <View style={styles.tableRow}>
                    <View style={styles.tableCol}>
                      <Text style={styles.tableCell}>Ausgeübter Beruf:</Text>
                    </View>
                    <View style={styles.tableCol}>
                      <Text style={styles.tableCellTwo}>{profileData.ausgeubterBeruf}</Text>
                    </View>
                  </View>

                  <View style={styles.tableRow}>
                    <View style={styles.tableCol}>
                      <Text style={styles.tableCell}>Arbeitgeber:</Text>
                    </View>
                    <View style={styles.tableCol}>
                      <Text style={styles.tableCellTwo}>{profileData.arbeitgeber}</Text>
                    </View>
                  </View>

                  <View style={styles.tableRow}>
                    <View style={styles.tableCol}>
                      <Text style={styles.tableCell}>Haushaltsnettoeinkommen:</Text>
                    </View>
                    <View style={styles.tableCol}>
                      <Text style={styles.tableCellTwo}>{profileData.income}€</Text>
                    </View>
                 </View>
          </View>
          <View style={[styles.secondPagesection, styles.lastSection]}>
            <View style={styles.table}>

                  <View style={styles.tableRow}>
                    <View style={styles.tableColOne}>
                      <Text style={styles.tableCell}>Haben Sie Haustiere?</Text>
                    </View>
                    <View style={styles.tableColTwo}>
                      <Text style={styles.tableCellTwo}>{profileData.pets === 'Ja' ? 'Ja' : 'Nein'}</Text>
                    </View>
                  </View>

                  <View style={styles.tableRow}>
                    <View style={styles.tableColOne}>
                      <Text style={styles.tableCell}>Bestehen Mietrückstände aus bisherigen Mietverhältnissen?</Text>
                    </View>
                    <View style={styles.tableColTwo}>
                      <Text style={styles.tableCellTwo}>{profileData.rentarea === 'Ja' ? 'Ja' : 'Nein'}</Text>
                    </View>
                  </View>

                  <View style={styles.tableRow}>
                    <View style={styles.tableColOne}>
                      <Text style={styles.tableCell}>Wurde in den letzten 5 Jahren Insolvenzverfahren gegen Sie eröffnet?</Text>
                    </View>
                    <View style={styles.tableColTwo}>
                      <Text style={styles.tableCellTwo}>{profileData.proceedings === 'Ja' ? 'Ja' : 'Nein'}</Text>
                    </View>
                  </View>

                  <View style={styles.tableRow}>
                    <View style={styles.tableColOne}>
                      <Text style={styles.tableCell}>Ist eine gewerbliche Nutzung der Wohnung beabsichtigt?</Text>
                    </View>
                    <View style={styles.tableColTwo}>
                      <Text style={styles.tableCellTwo}>{profileData.apartment === 'Ja' ? 'Ja' : 'Nein'}</Text>
                    </View>
                  </View>
            </View>
          </View>
        </View> 
        </View>
          {/* Page Number */}
        <Text style={styles.pageNumber} render={({ pageNumber ,totalPages }) => `${pageNumber}/${totalPages}`} fixed />
      </Page>
      {/* page 2 end*/}

      {/* page 3*/}
      <Page style={styles.page}>
      {/* header */}
      <View style={styles.header}>
        <View style={styles.headerText}>
          <Text style={styles.headerName}>{profileData.vorname} {profileData.nachname}</Text>
          <Text style={styles.headerPhone}>{profileData.tel}</Text>
          <Text style={styles.headerEmail}>{profileData.email}</Text>
        </View>
        <Image style={styles.headerLogo} src={`${window.location.origin}/images/logo.png`} alt="Description of the image" />
        <Image style={styles.headerImage} src={profileData.inputfoto}/>
      </View>
       {/* header */}
       <View style={styles.bodyWhite}>
        <View style={styles.secondPageBody}>
          <Text style={styles.titleBorder}>Über mich</Text>
          <View style={styles.secondPagesection}>
            <Text style={styles.titleCapital}>{profileData.vorname} {profileData.nachname}</Text>
            <Text style={styles.descriptionText}>{profileData.coverletter}  </Text>
           
          </View>
        </View> 
        </View>
          {/* Page Number */}
          <Text style={styles.pageNumber} render={({ pageNumber ,totalPages }) => `${pageNumber}/${totalPages}`} fixed />
      </Page>
      {/* page 3 end*/}

      {/* Salary Slips Pages */}
      {renderSection("salaryslip", "Einkommensnachweis")}
      {/* Arbeitsvertrag */}
      {renderSection("employcontract", " Arbeitsvertrag")}
      {/* einkommensbescheinigungimg */}
      {renderSection("einkommensbescheinigungimg", "Einkommensbescheinigung")}
      {/* BWA */}
      {renderSection("bwaimages", "BWA")}
    
      {/* WBS*/}
      {renderSection("imageswbs", "WBS")}
      {/* Ausweiskopie */}
      {renderSection("personal", "Ausweiskopie")}
      {/* schufa */}
      {renderSection("schufa", "Schufa - Bonität")}
      {/* mietschuldenfreiheitimg */}
      {renderSection("mietschuldenfreiheitimg", "Mietschuldenfreiheitsbescheinigung")}

    </Document>
  );
};

export default MyDocument;
