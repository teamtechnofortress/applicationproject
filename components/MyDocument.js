import React from "react";
import { Page, Text, View, Document, StyleSheet, Image, Font } from '@react-pdf/renderer';
import fs from 'fs';
import path from 'path';



// Load Poppins font files
const poppinsRegularPath = path.join(process.cwd(), 'public/Font/Poppins/Poppins-Regular.ttf');
const poppinsMediumPath = path.join(process.cwd(), 'public/Font/Poppins/Poppins-Medium.ttf');
const poppinsBoldPath = path.join(process.cwd(), 'public/Font/Poppins/Poppins-Bold.ttf');

const getFontDataUrl = (filePath) => {
  if (!fs.existsSync(filePath)) {
    console.warn(`Font file not found: ${filePath}`);
    return null;
  }

  const buffer = fs.readFileSync(filePath);
  const base64 = buffer.toString('base64');
  return `data:font/ttf;base64,${base64}`;
};

const poppinsRegularUrl = getFontDataUrl(poppinsRegularPath);
const poppinsMediumUrl = getFontDataUrl(poppinsMediumPath);
const poppinsBoldUrl = getFontDataUrl(poppinsBoldPath);

Font.register({
  family: 'Poppins',
  fonts: [
    { src: poppinsRegularUrl || '', fontWeight: 'normal' },
    { src: poppinsMediumUrl || '', fontWeight: 500 },
    { src: poppinsBoldUrl || '', fontWeight: 'bold' },
  ],
});


// console.log('Regular Font URL:', poppinsRegularUrl);
// console.log('Medium Font URL:', poppinsMediumUrl);
// console.log('Bold Font URL:', poppinsBoldUrl);




// Create styles
const styles = StyleSheet.create({
  page: {
    padding: 0,
    backgroundColor: '#f6f6f6',
  },
  pageid: {
    padding: 0,
    backgroundColor: '#fff',
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
    width: "30%",
  },
  footerCol: {
    width: "30%",  
    paddingLeft:10,
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
    paddingRight:10,
  },
  secondPageBody:{
    backgroundColor: '#f6f6f6',
    borderTopLeftRadius: 50,
  },
  secondPageBodyid:{
    backgroundColor: '#f6f6f6',
    borderTopLeftRadius: 50,
    borderBottomLeftRadius: 50,
    padding: 10,
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
  barcodeSec: {
    backgroundColor: '#E7FC41',
    borderRadius: 10,
    padding: 10,
  },
  scanMe: {
    fontFamily: 'Poppins',
    fontWeight: '600',
    fontSize: 11,
    textTransform: 'uppercase', // Capitalizes the first letter of each word
    marginTop: 3,
  }
});


// Create Document Component
const MyDocument = ({ profileData }) => {
  const logoPath = path.join(process.cwd(), 'public/images/logo.png');
  const bannerPath = path.join(process.cwd(), 'public/images/pdfbanner.png');
  const avatarPath = path.join(process.cwd(), 'public/images/sample-avatar.png');

  const logoBuf = fs.readFileSync(logoPath);
  const bannerBuf = fs.readFileSync(bannerPath);
  const avatarBuf = fs.readFileSync(avatarPath);

  
 
  return (
    <Document>
      {/* page 1*/}
      <Page style={styles.page}>
      <Image style={styles.banner} src={bannerBuf} alt="Description of the image" />
      <Image style={styles.logo} src={logoBuf} alt="Description of the image" />
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

             
              {/* Center Column (QR) */}
              <View style={styles.footerColCenter}>
                <View style={styles.barcodeSec}>
                <Image
                  source={{ uri: profileData.qrCode }} 
                  style={{ width: 50, height: 50 }}
                />
                <Text style={styles.scanMe}>Scan Me</Text>
                </View>
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
        <Image style={styles.headerLogo} src={logoBuf} alt="Description of the image" />
        <Image 
          style={styles.headerImage} 
          src={profileData.inputfoto ? profileData.inputfoto : avatarBuf} 
        />

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
                      <Text style={styles.tableCellTwo}>{profileData.income ? `${profileData.income}€` : ""}</Text>
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
        <Image style={styles.headerLogo} src={logoBuf} alt="Description of the image" />
        <Image 
          style={styles.headerImage} 
          src={profileData.inputfoto ? profileData.inputfoto : avatarBuf} 
        />


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
      {profileData.salarySlip1 && profileData.salarySlip1.length > 0 &&
        profileData.salarySlip1.map((image, index) => (
          <Page key={index} style={styles.page}>
            {/* Header */}
            <View style={styles.header}>
              <View style={styles.headerText}>
                <Text style={styles.headerName}>{profileData.vorname} {profileData.nachname}</Text>
                <Text style={styles.headerPhone}>{profileData.tel}</Text>
                <Text style={styles.headerEmail}>{profileData.email}</Text>
              </View>
              <Image style={styles.headerLogo} src={logoBuf} alt="Logo" />
              <Image 
                style={styles.headerImage} 
                src={profileData.inputfoto ? profileData.inputfoto : avatarBuf} 
              />

            </View>

            {/* Body */}
            <View style={styles.bodyWhite}>
              <View style={styles.secondPageBody}>
                <Text style={styles.titleBorder}>Einkommensnachweis</Text>
                <View style={styles.secondPagesection}>
                  <View style={styles.greyCardBg}>
                    <Image style={{ maxHeight: "500px", objectFit: "contain" }} src={image} />
                  </View>
                </View>
              </View>
            </View>

            {/* Page Number */}
            <Text style={styles.pageNumber} render={({ pageNumber, totalPages }) => `${pageNumber}/${totalPages}`} fixed />
          </Page>
        ))
      }
      {profileData.salarySlip2 && profileData.salarySlip2.length > 0 &&
        profileData.salarySlip2.map((image, index) => (
          <Page key={index} style={styles.page}>
            {/* Header */}
            <View style={styles.header}>
              <View style={styles.headerText}>
                <Text style={styles.headerName}>{profileData.vorname} {profileData.nachname}</Text>
                <Text style={styles.headerPhone}>{profileData.tel}</Text>
                <Text style={styles.headerEmail}>{profileData.email}</Text>
              </View>
              <Image style={styles.headerLogo} src={logoBuf} alt="Logo" />
              <Image 
                style={styles.headerImage} 
                src={profileData.inputfoto ? profileData.inputfoto : avatarBuf} 
              />

            </View>

            {/* Body */}
            <View style={styles.bodyWhite}>
              <View style={styles.secondPageBody}>
                <Text style={styles.titleBorder}>Einkommensnachweis</Text>
                <View style={styles.secondPagesection}>
                  <View style={styles.greyCardBg}>
                    <Image style={{ maxHeight: "500px", objectFit: "contain" }} src={image} />
                  </View>
                </View>
              </View>
            </View>

            {/* Page Number */}
            <Text style={styles.pageNumber} render={({ pageNumber, totalPages }) => `${pageNumber}/${totalPages}`} fixed />
          </Page>
        ))
      }
      {profileData.salarySlip3 && profileData.salarySlip3.length > 0 &&
        profileData.salarySlip3.map((image, index) => (
          <Page key={index} style={styles.page}>
            {/* Header */}
            <View style={styles.header}>
              <View style={styles.headerText}>
                <Text style={styles.headerName}>{profileData.vorname} {profileData.nachname}</Text>
                <Text style={styles.headerPhone}>{profileData.tel}</Text>
                <Text style={styles.headerEmail}>{profileData.email}</Text>
              </View>
              <Image style={styles.headerLogo} src={logoBuf} alt="Logo" />
              <Image 
                style={styles.headerImage} 
                src={profileData.inputfoto ? profileData.inputfoto : avatarBuf} 
              />

            </View>

            {/* Body */}
            <View style={styles.bodyWhite}>
              <View style={styles.secondPageBody}>
                <Text style={styles.titleBorder}>Einkommensnachweis</Text>
                <View style={styles.secondPagesection}>
                  <View style={styles.greyCardBg}>
                    <Image style={{ maxHeight: "500px", objectFit: "contain" }} src={image} />
                  </View>
                </View>
              </View>
            </View>

            {/* Page Number */}
            <Text style={styles.pageNumber} render={({ pageNumber, totalPages }) => `${pageNumber}/${totalPages}`} fixed />
          </Page>
        ))
      }
      {profileData.einkommensbescheinigungimg && profileData.einkommensbescheinigungimg.length > 0 &&
        profileData.einkommensbescheinigungimg.map((image, index) => (
          <Page key={index} style={styles.page}>
            {/* Header */}
            <View style={styles.header}>
              <View style={styles.headerText}>
                <Text style={styles.headerName}>{profileData.vorname} {profileData.nachname}</Text>
                <Text style={styles.headerPhone}>{profileData.tel}</Text>
                <Text style={styles.headerEmail}>{profileData.email}</Text>
              </View>
              <Image style={styles.headerLogo} src={logoBuf} alt="Logo" />
              <Image 
                style={styles.headerImage} 
                src={profileData.inputfoto ? profileData.inputfoto : avatarBuf} 
              />

            </View>

            {/* Body */}
            <View style={styles.bodyWhite}>
              <View style={styles.secondPageBody}>
                <Text style={styles.titleBorder}>Einkommensnachweis</Text>
                <View style={styles.secondPagesection}>
                  <View style={styles.greyCardBg}>
                    <Image style={{ maxHeight: "500px", objectFit: "contain" }} src={image} />
                  </View>
                </View>
              </View>
            </View>

            {/* Page Number */}
            <Text style={styles.pageNumber} render={({ pageNumber, totalPages }) => `${pageNumber}/${totalPages}`} fixed />
          </Page>
        ))
      }
      {profileData.employcontract && profileData.employcontract.length > 0 &&
        profileData.employcontract.map((image, index) => (
          <Page key={index} style={styles.page}>
            {/* Header */}
            <View style={styles.header}>
              <View style={styles.headerText}>
                <Text style={styles.headerName}>{profileData.vorname} {profileData.nachname}</Text>
                <Text style={styles.headerPhone}>{profileData.tel}</Text>
                <Text style={styles.headerEmail}>{profileData.email}</Text>
              </View>
              <Image style={styles.headerLogo} src={logoBuf} alt="Logo" />
              <Image 
                style={styles.headerImage} 
                src={profileData.inputfoto ? profileData.inputfoto : avatarBuf} 
              />

            </View>

            {/* Body */}
            <View style={styles.bodyWhite}>
              <View style={styles.secondPageBody}>
                <Text style={styles.titleBorder}>Arbeitsvertrag</Text>
                <View style={styles.secondPagesection}>
                  <View style={styles.greyCardBg}>
                    <Image style={{ maxHeight: "500px", objectFit: "contain" }} src={image} />
                  </View>
                </View>
              </View>
            </View>

            {/* Page Number */}
            <Text style={styles.pageNumber} render={({ pageNumber, totalPages }) => `${pageNumber}/${totalPages}`} fixed />
          </Page>
        ))
      }
      
      {profileData.bwaimages && profileData.bwaimages.length > 0 &&
        profileData.bwaimages.map((image, index) => (
          <Page key={index} style={styles.page}>
            {/* Header */}
            <View style={styles.header}>
              <View style={styles.headerText}>
                <Text style={styles.headerName}>{profileData.vorname} {profileData.nachname}</Text>
                <Text style={styles.headerPhone}>{profileData.tel}</Text>
                <Text style={styles.headerEmail}>{profileData.email}</Text>
              </View>
              <Image style={styles.headerLogo} src={logoBuf} alt="Logo" />
              <Image 
                style={styles.headerImage} 
                src={profileData.inputfoto ? profileData.inputfoto : avatarBuf} 
              />

            </View>

            {/* Body */}
            <View style={styles.bodyWhite}>
              <View style={styles.secondPageBody}>
                <Text style={styles.titleBorder}>BWA</Text>
                <View style={styles.secondPagesection}>
                  <View style={styles.greyCardBg}>
                    <Image style={{ maxHeight: "500px", objectFit: "contain" }} src={image} />
                  </View>
                </View>
              </View>
            </View>

            {/* Page Number */}
            <Text style={styles.pageNumber} render={({ pageNumber, totalPages }) => `${pageNumber}/${totalPages}`} fixed />
          </Page>
        ))
      }
      {profileData.imageswbs && profileData.imageswbs.length > 0 &&
        profileData.imageswbs.map((image, index) => (
          <Page key={index} style={styles.page}>
            {/* Header */}
            <View style={styles.header}>
              <View style={styles.headerText}>
                <Text style={styles.headerName}>{profileData.vorname} {profileData.nachname}</Text>
                <Text style={styles.headerPhone}>{profileData.tel}</Text>
                <Text style={styles.headerEmail}>{profileData.email}</Text>
              </View>
              <Image style={styles.headerLogo} src={logoBuf} alt="Logo" />
              <Image 
                style={styles.headerImage} 
                src={profileData.inputfoto ? profileData.inputfoto : avatarBuf} 
              />

            </View>

            {/* Body */}
            <View style={styles.bodyWhite}>
              <View style={styles.secondPageBody}>
                <Text style={styles.titleBorder}>WBS</Text>
                <View style={styles.secondPagesection}>
                  <View style={styles.greyCardBg}>
                    <Image style={{ maxHeight: "500px", objectFit: "contain" }} src={image} />
                  </View>
                </View>
              </View>
            </View>

            {/* Page Number */}
            <Text style={styles.pageNumber} render={({ pageNumber, totalPages }) => `${pageNumber}/${totalPages}`} fixed />
          </Page>
        ))
      }
      {(
        (Array.isArray(profileData.personal) && profileData.personal.length > 0) ||
        (Array.isArray(profileData.idback) && profileData.idback.length > 0)
        ) && (
        <Page style={styles.pageid}>
          <View style={styles.header}>
            <View style={styles.headerText}>
              <Text style={styles.headerName}>{profileData.vorname} {profileData.nachname}</Text>
              <Text style={styles.headerPhone}>{profileData.tel}</Text>
              <Text style={styles.headerEmail}>{profileData.email}</Text>
            </View>
            <Image
              style={styles.headerLogo}
              src={logoBuf}
            />
            <Image
              style={styles.headerImage}
              src={profileData.inputfoto || avatarBuf}
            />
          </View>

          <View style={styles.bodyWhite}>
            <Text style={styles.titleBorder}>Ausweiskopie</Text>

            {Array.isArray(profileData.personal) && profileData.personal.length > 0 && (
              <View style={{ ...styles.secondPageBodyid, marginTop: 20 }}>
                <Image
                  style={{ maxHeight: 240, objectFit: "contain" }}
                  src={profileData.personal[0]}
                />
              </View>
            )}

            {Array.isArray(profileData.idback) && profileData.idback.length > 0 && (
              <View style={{ ...styles.secondPageBodyid, marginTop: 20 }}>
                <Image
                  style={{ maxHeight: 240, objectFit: "contain" }}
                  src={profileData.idback[0]}
                />
              </View>
            )}
          </View>

          <Text
            style={styles.pageNumber}
            render={({ pageNumber, totalPages }) => `${pageNumber}/${totalPages}`}
            fixed
          />
        </Page>
      )}



      
      {profileData.mietschuldenfreiheitimg && profileData.mietschuldenfreiheitimg.length > 0 &&
        profileData.mietschuldenfreiheitimg.map((image, index) => (
          <Page key={index} style={styles.page}>
            {/* Header */}
            <View style={styles.header}>
              <View style={styles.headerText}>
                <Text style={styles.headerName}>{profileData.vorname} {profileData.nachname}</Text>
                <Text style={styles.headerPhone}>{profileData.tel}</Text>
                <Text style={styles.headerEmail}>{profileData.email}</Text>
              </View>
              <Image style={styles.headerLogo} src={logoBuf} alt="Logo" />
              <Image 
                style={styles.headerImage} 
                src={profileData.inputfoto ? profileData.inputfoto : avatarBuf} 
              />

            </View>

            {/* Body */}
            <View style={styles.bodyWhite}>
              <View style={styles.secondPageBody}>
                <Text style={styles.titleBorder}>Mietschuldenfreiheitsbescheinigung</Text>
                <View style={styles.secondPagesection}>
                  <View style={styles.greyCardBg}>
                    <Image style={{ maxHeight: "500px", objectFit: "contain" }} src={image} />
                  </View>
                </View>
              </View>
            </View>

            {/* Page Number */}
            <Text style={styles.pageNumber} render={({ pageNumber, totalPages }) => `${pageNumber}/${totalPages}`} fixed />
          </Page>
        ))
      }
      {profileData.schufa && profileData.schufa.length > 0 &&
        profileData.schufa.map((image, index) => (
          <Page key={index} style={styles.page}>
            {/* Header */}
            <View style={styles.header}>
              <View style={styles.headerText}>
                <Text style={styles.headerName}>{profileData.vorname} {profileData.nachname}</Text>
                <Text style={styles.headerPhone}>{profileData.tel}</Text>
                <Text style={styles.headerEmail}>{profileData.email}</Text>
              </View>
              <Image style={styles.headerLogo} src={logoBuf} alt="Logo" />
              <Image 
                style={styles.headerImage} 
                src={profileData.inputfoto ? profileData.inputfoto : avatarBuf} 
              />

            </View>

            {/* Body */}
            <View style={styles.bodyWhite}>
              <View style={styles.secondPageBody}>
                <Text style={styles.titleBorder}>Schufa - Bonität</Text>
                <View style={styles.secondPagesection}>
                  <View style={styles.greyCardBg}>
                    <Image style={{ maxHeight: "500px", objectFit: "contain" }} src={image} />
                  </View>
                </View>
              </View>
            </View>

            {/* Page Number */}
            <Text style={styles.pageNumber} render={({ pageNumber, totalPages }) => `${pageNumber}/${totalPages}`} fixed />
          </Page>
        ))
      }
      


    </Document>
  );
};

export default MyDocument;