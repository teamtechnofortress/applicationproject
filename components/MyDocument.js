import React from 'react';
import { Page, Text, View, Document, StyleSheet, Image, Font } from '@react-pdf/renderer';
// Register the Montserrat font
Font.register({
  family: 'Montserrat',
  fonts: [
    {
      src: '/Font/Montserrat/static/Montserrat-Medium.ttf',
      fontWeight: 'medium',
    },
    {
      src: '/Font/Montserrat/static/Montserrat-Bold.ttf',
      fontWeight: 'bold',
    },
  ],
});

// Create styles
const styles = StyleSheet.create({
  page: {
    padding: 0,
  },
  section: {
    margin: 10,
    padding: 40,
    fontSize: 12,
  },
  title: {
    fontFamily: 'Montserrat',
    fontWeight: 'bold',
    fontSize: 18,
    marginBottom: 10,
  },
  titleBlue: {
    fontFamily: 'Montserrat',
    fontWeight: 'bold',
    fontSize: 18,
    marginBottom: 10,
    color: '#276aa4',
  },
  titleCenter: {
    marginTop: 50,
    marginBottom: 10,
    fontFamily: 'Montserrat',
    fontSize: 13,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  titlePdf: {
    fontFamily: 'Montserrat',
    fontWeight: 'bold',
    marginTop: 20,
    marginBottom: 10,
  },
  titlePdfbody: {
    fontFamily: 'Montserrat',
    fontWeight: 'bold',
    marginTop: 40,
    marginBottom: 15,
  },
  para: {
    color: '#9d9d9d',
    marginTop: 10,
  },
  paraBlue: {
    color: '#276aa4',
    marginTop: 10,
    lineHeight: 1.6,
  },
  parapdf: {
    fontFamily: 'Montserrat',
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
    width: '100%',
    height: 'auto',
    borderWidth: 1,
    borderStyle: 'solid',
    borderColor: '#e2e2e2',
  },
  table: {
    display: 'table',
    width: 'auto',
    borderStyle: 'solid',
    borderWidth: 1,
    borderColor: '#e2e2e2',
    marginBottom: 10,
    fontFamily: 'Montserrat',
    fontWeight: 'medium',
  },
  tableRow: {
    flexDirection: 'row',
  },
  tableCol: {
    width: '50%',
    borderBottomWidth: 1,
    borderRightWidth: 1,
    borderStyle: 'solid',
    borderColor: '#e2e2e2',
  },
  tableCell: {
    marginLeft: 5,
    marginTop: 5,
    marginBottom: 5,
    fontSize: 10,
    textAlign: 'left',
    color: '#5d4e40',
  },
  evenTableCell: {
    backgroundColor: '#f6f6f6',
  },
  header: {
    width: '100%',
    padding: 10,
    backgroundColor: '#276aa4',
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
    flex: 1,
    textAlign: 'right',
    color: '#ffff',
    paddingBottom: 10,
    paddingTop: 10,
  },
  headerName: {
    textAlign: 'right',
    fontFamily: 'Montserrat',
    fontWeight: 'bold',
    fontSize: 14,
  },
  headerPhone: {
    textAlign: 'right',
    fontFamily: 'Montserrat',
    fontWeight: 'medium',
    fontSize: 13,
  },
  headerEmail: {
    textAlign: 'right',
    fontFamily: 'Montserrat',
    fontWeight: 'medium',
    fontSize: 13,
  },
  evenTableCol: {
    backgroundColor: '#f6f6f6',
  },
  oddTableCol: {
    backgroundColor: '#ffffff',
  },
  pageNumber: {
    position: 'absolute',
    fontSize: 12,
    bottom: 10,
    left: 40,
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
    fontFamily: 'Montserrat',
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
    fontFamily: 'Montserrat',
    fontWeight: '300',
    textAlign:'left',
  },
  dateHeader: {
    fontFamily: 'Montserrat',
    fontWeight: '300',
    textAlign:'left',
  },
});


// Create Document Component
const MyDocument = ({ profileData }) => {
  // console.log(profileData);
  const rows = [
    { field: "Vorname", value: profileData.vorname },
    { field: "Nachname", value: profileData.nachname},
    { field: "Straße", value: profileData.strabe },
    { field: "hausnummer", value: profileData.hausnummer },
    { field: "PLZ", value: profileData.PLZ },
    { field: "Ort", value: profileData.Ort },
    { field: "E-Mail", value: profileData.email },
    { field: "Tel. Mobil", value: profileData.tel },
    { field: "Geburtsdatum", value: profileData.geburtsdatum },
    { field: "Ausgeübter Beruf", value: profileData.ausgeübterBeruf },
    { field: "Arbeitgeber", value: profileData.arbeitgeber },
    { field: "Nettoeinkommen (€)", value: profileData.income },
    { field: "textarea1", value: profileData.textarea1 },
    { field: "textarea2", value: profileData.textarea2 },
    { field: "textarea3", value: profileData.textarea3 },
    { field: "textarea4", value: profileData.textarea4 },
    { field: "textarea5", value: profileData.textarea5 }
  ];
 
  return (
    <Document>
      {/* page 1*/}
      <Page style={styles.page}>

      {/* header */}
      <View style={styles.header}>
        <Image style={styles.headerImage} src={`${profileData.inputfoto}`}/>
        <View style={styles.headerText}>
          <Text style={styles.headerName}>{profileData.vorname} {profileData.nachname}</Text>
          <Text style={styles.headerPhone}>{profileData.tel}</Text>
          <Text style={styles.headerEmail}>{profileData.email}</Text>
        </View>
      </View>
       {/* header */}

        <View style={styles.section}>
          <Text style={styles.title}>MIETER- SELBSTAUSKUNFT</Text>
          <Text style={styles.para}>Ich bin/Wir sind an der Anmietung folgender Räumlichkeiten interessiert:</Text>
          <Text style={styles.para}>3 ZKB | Sommerallee 23, 1025 Berlin 2. Stock, rechts</Text>
          <Text style={styles.para}>Mietbeginn:</Text>
          <Text style={styles.para}>Im Rahmen der freiwilligen Selbstauskunft erteile/n ich/wir dem Vermieter nachfolgende Informationen zum Zweck einer möglichen Anmietung des o.g. Mietobjektes:</Text>
          <Image
            style={styles.image}
            src={`${profileData.inputfoto}`}
            // src="/uploads/abCapture.PNG"
            alt="Description of the image"
          />
          <View style={styles.table}>
            {/* Table Headers */}
            <View style={styles.tableRow}>
              <View style={styles.tableCol}>
                <Text style={styles.tableCell}></Text>
              </View>
              <View style={styles.tableCol}>
                <Text style={styles.tableCell}>Value1</Text>
              </View>
            </View>
            {/* Table Rows */}
            {rows.map((row, index) => (
              <View style={[styles.tableRow]} key={index}>
                <View style={[styles.tableCol, index % 2 === 0 ? styles.evenTableCol : styles.oddTableCol]}>
                  <Text style={styles.tableCell}>{row.field}</Text>
                </View>
                <View style={[styles.tableCol, index % 2 === 0 ? styles.evenTableCol : styles.oddTableCol]}>
                  <Text style={styles.tableCell}>{row.value}</Text>
                </View>
              </View>
            ))}
          </View>
        </View>
        <Text style={styles.pageNumber} render={({ pageNumber }) => `${pageNumber}`} fixed />
      </Page>
      {/* page 1 end*/}

      {/* page 2*/}
      <Page style={styles.page}>
       {/* header */}
      <View style={styles.header}>
        <Image style={styles.headerImage} src={`${profileData.inputfoto}`}/>
        <View style={styles.headerText}>
          <Text style={styles.headerName}>{profileData.vorname} {profileData.nachname}</Text>
          <Text style={styles.headerPhone}>{profileData.tel}</Text>
          <Text style={styles.headerEmail}>{profileData.email}</Text>
        </View>
      </View>
       {/* header */}

          <View style={styles.section}>
            <Text style={styles.titleBlue}>ÜBER MICH</Text>
            <Text style={styles.paraBlue}>Hallo!</Text>
            <Text style={styles.paraBlue}>{profileData.noofpeople}</Text>
            
          
          </View>
          {/* Page Number */}
        <Text style={styles.pageNumber} render={({ pageNumber }) => `${pageNumber}`} fixed />
      </Page>
      {/* page 2 end*/}

      {/* page 3*/}
      <Page style={styles.page}>
        {/* header */}
      <View style={styles.header}>
        <Image style={styles.headerImage} src={`${profileData.inputfoto}`}/>
        <View style={styles.headerText}>
          <Text style={styles.headerName}>{profileData.vorname} {profileData.nachname}</Text>
          <Text style={styles.headerPhone}>{profileData.tel}</Text>
          <Text style={styles.headerEmail}>{profileData.email}</Text>
        </View>
      </View>
       {/* header */}

          <View style={styles.section}>
            <Text style={styles.titleBlue}>EINKOMMENSNACHWEISE (1/3)</Text>
            <Image style={styles.pdfImage}  src={`${profileData.salarystatementago}`}/>
          </View>
          {/* Page Number */}
        <Text style={styles.pageNumber} render={({ pageNumber }) => `${pageNumber}`} fixed />
      </Page>
      {/* page 3 end*/}

      {/* page 4*/}
      <Page style={styles.page}>
        {/* header */}
          <View style={styles.header}>
            <Image style={styles.headerImage} src={`${profileData.inputfoto}`}/>
            <View style={styles.headerText}>
              <Text style={styles.headerName}>{profileData.vorname} {profileData.nachname}</Text>
              <Text style={styles.headerPhone}>{profileData.tel}</Text>
              <Text style={styles.headerEmail}>{profileData.email}</Text>
            </View>
          </View>
          {/* header */}

          <View style={styles.section}>
            <Text style={styles.titleBlue}>EINKOMMENSNACHWEISE (2/3)</Text>
            <Image style={styles.pdfImage}  src={`${profileData.salarystatementbefore}`} />
          </View>
          {/* Page Number */}
        <Text style={styles.pageNumber} render={({ pageNumber }) => `${pageNumber}`} fixed />
      </Page>
      {/* page 4 end*/}

      {/* page 5*/}
      <Page style={styles.page}>
        {/* header */}
          <View style={styles.header}>
            <Image style={styles.headerImage} src={`${profileData.inputfoto}`}/>
            <View style={styles.headerText}>
              <Text style={styles.headerName}>{profileData.vorname} {profileData.nachname}</Text>
              <Text style={styles.headerPhone}>{profileData.tel}</Text>
              <Text style={styles.headerEmail}>{profileData.email}</Text>
            </View>
          </View>
          {/* header */}

          <View style={styles.section}>
            <Text style={styles.titleBlue}>EINKOMMENSNACHWEISE (3/3)</Text>
            <Image style={styles.pdfImage}  src={`${profileData.salarystatementlast}`}  />
          </View>
          {/* Page Number */}
        <Text style={styles.pageNumber} render={({ pageNumber }) => `${pageNumber}`} fixed />
      </Page>
      {/* page 5 end*/}

       {/* page 6*/}
      <Page style={styles.page}>
      {/* header */}
          <View style={styles.header}>
            <Image style={styles.headerImage} src={`${profileData.inputfoto}`}/>
            <View style={styles.headerText}>
              <Text style={styles.headerName}>{profileData.vorname} {profileData.nachname}</Text>
              <Text style={styles.headerPhone}>{profileData.tel}</Text>
              <Text style={styles.headerEmail}>{profileData.email}</Text>
            </View>
          </View>
          {/* header */}

          <View style={styles.section}>
            <Text style={styles.titleBlue}>ARBEITSVERTRAG (1/3)</Text>
            <Image style={styles.pdfImage}  src={`${profileData.residencepermit}`} />
          </View>
          {/* Page Number */}
        <Text style={styles.pageNumber} render={({ pageNumber }) => `${pageNumber}`} fixed />
      </Page>
      {/* page 6 end*/}

       {/* page 7*/}
      <Page style={styles.page}>
       {/* header */}
          <View style={styles.header}>
            <Image style={styles.headerImage} src={`${profileData.inputfoto}`}/>
            <View style={styles.headerText}>
              <Text style={styles.headerName}>{profileData.vorname} {profileData.nachname}</Text>
              <Text style={styles.headerPhone}>{profileData.tel}</Text>
              <Text style={styles.headerEmail}>{profileData.email}</Text>
            </View>
          </View>
          {/* header */}

          <View style={styles.section}>
            <Text style={styles.titleBlue}>ARBEITSVERTRAG (2/3)</Text>
            <Image style={styles.pdfImage}  src={`${profileData.residencepermit}`}/>
          </View>
          {/* Page Number */}
        <Text style={styles.pageNumber} render={({ pageNumber }) => `${pageNumber}`} fixed />
      </Page>
      {/* page 7 end*/}

      {/* page 8*/}
      <Page style={styles.page}>
        {/* header */}
          <View style={styles.header}>
            <Image style={styles.headerImage} src={`${profileData.inputfoto}`}/>
            <View style={styles.headerText}>
              <Text style={styles.headerName}>{profileData.vorname} {profileData.nachname}</Text>
              <Text style={styles.headerPhone}>{profileData.tel}</Text>
              <Text style={styles.headerEmail}>{profileData.email}</Text>
            </View>
          </View>
          {/* header */}

          <View style={styles.section}>
            <Text style={styles.titleBlue}>ARBEITSVERTRAG (3/3)</Text>
            <Image style={styles.pdfImage}  src={`${profileData.residencepermit}`} />
          </View>
          {/* Page Number */}
        <Text style={styles.pageNumber} render={({ pageNumber }) => `${pageNumber}`} fixed />
      </Page>
      {/* page 8 end*/}

      {/* page 9 */}
      <Page style={styles.page}>
        {/* header */}
          <View style={styles.header}>
            <Image style={styles.headerImage} src={`${profileData.inputfoto}`}/>
            <View style={styles.headerText}>
              <Text style={styles.headerName}>{profileData.vorname} {profileData.nachname}</Text>
              <Text style={styles.headerPhone}>{profileData.tel}</Text>
              <Text style={styles.headerEmail}>{profileData.email}</Text>
            </View>
          </View>
          {/* header */}

          <View style={styles.section}>
            <Text style={styles.titleBlue}>SCHUFA - BONITÄTSCHECK</Text>
            <Image style={styles.pdfImage}  src={`${profileData.currentSchufareport}`} />
          </View>
          {/* Page Number */}
        <Text style={styles.pageNumber} render={({ pageNumber }) => `${pageNumber}`} fixed />
      </Page>
      {/* page 9 end*/}

      {/* page 10 */}
      <Page style={styles.page}>
        {/* header */}
          <View style={styles.header}>
            <Image style={styles.headerImage} src={`${profileData.inputfoto}`}/>
            <View style={styles.headerText}>
              <Text style={styles.headerName}>{profileData.vorname} {profileData.nachname}</Text>
              <Text style={styles.headerPhone}>{profileData.tel}</Text>
              <Text style={styles.headerEmail}>{profileData.email}</Text>
            </View>
          </View>
          {/* header */}

          <View style={styles.section}>
            <Text style={styles.title}>Untermieter</Text>
            <View style={styles.pdfSection}>
              <Text style={styles.titleCenter}>Mietschuldenfreiheitsbescheinigung</Text>
              <Text style={styles.titlePdf}>Vermieter/Eigentümer</Text>
              <Text style={styles.parapdf}>Nurten Güler</Text>
              <Text style={styles.parapdf}>Gontermannstraße 55</Text>
              <Text style={styles.parapdf}>12101 Berlin</Text>
              <Text style={styles.titlePdf}>Mieter</Text>
              <Text style={styles.parapdf}>Nurten Güler</Text>
              <Text style={styles.parapdf}>Gontermannstraße 55</Text>
              <Text style={styles.parapdf}>12101 Berlin</Text>
              <Text style={styles.titlePdfbody}>Der Vermieter/Eigentümer bestätigt folgendes:</Text>
              <Text style={styles.parapdf}>Während der Zeit des Mietverhältnisses ist der Mieter den vertraglichen Zahlungsverpflichtungen regelmäßig, fristgerecht und vollständig nachgekommen. Aus diesen Verpflichtungen bestehen keine Mietschulden oder auszugleichenden Beträge.</Text>
              <View style={styles.pdfFooter}>
                <View style={styles.pfdLeft}>
                  <Text style={styles.datePlace}>{profileData.Ort}, {profileData.geburtsdatum}</Text>
                  <Text style={styles.dateHeader}>Ort, Datum</Text>
                </View>
                <View style={styles.pfdRight}>
                  <View style={styles.signatureContainer}>
                    <Image style={styles.signImage} src={`${profileData.signatureData}`} />
                  </View>
                  <Text style={styles.signHeader}>Unterschrift Vermieter</Text>
                </View>
              </View>
            </View>
          </View>
         
          {/* Page Number */}
        <Text style={styles.pageNumber} render={({ pageNumber }) => `${pageNumber}`} fixed />
      </Page>
      {/* page 10 end*/}
    </Document>
  );
};

export default MyDocument;
