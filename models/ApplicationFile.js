// models/ApplicationFileFile.js
import mongoose from 'mongoose';

const ApplicationFileSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  title: { type: String, default: "Untitled" },
  vorname: { type: String },
  nachname: { type: String },
  geburtsdatum: { type: String },
  strabe: { type: String },
  postleitzahl: { type: String },
  hausnummer: { type: String},
  Ort: { type: String },
  email: { type: String },
  phonenumber: { type: String },
  inputfoto: { type: String },
  profession: { type: String },
  ausgeubterBeruf: { type: String },
  arbeitgeber: { type: String},
  income: { type: String},
  bwaimages: {  type: [String], default: [] },
  employment: { type: String },
  salaryslip: { type: [String],
    default: []
            },
  employcontract: { type: [String], default: [] },
  pets: { type: String },
  einkommensbescheinigungimg:{  type: [String], default: [] },
  rentarea: { type: String },
  proceedings: { type: String },
  apartment: { type: String },
  coverletter: { type: String },
  fläche: { type: String },
  zimerzahl: { type: String },
  imageswbs: { type: [String], default: [] },
  personal: {  type: [String], default: [] },
  schufa: {  type: [String], default: [] },
  mietschuldenfreiheit: {  type: [String], default: [] },
  mietschuldenfreiheitimg: {  type: [String], default: [] },
  mietverhaltnis: { type: String },
  firstname: { type: String },
  lastname: { type: String },
  email2: { type: String },
  profilephoto: { type: String },
  pdfPath: { type: String },
  // textarea1: { type: String },
  // textarea2: { type: String },
  // textarea3: { type: String },
  // textarea4: { type: String },
  // textarea5: { type: String },
  // noofpeople: { type: String },
  // status: { type: String },
  // currentactivity: { type: String },
  // currentemployer: { type: String },
  // incomee: { type: String },
  // salarystatementlast : { type: String, default: "step3m1" },
  // salarystatementbefore : { type: String, default: "step3m2" },
  // salarystatementago : { type: String, default: "step3m3" },
  // fläche : { type: String },
  // anzahlderzimmer : { type: String },
  // residencepermit  : { type: String, default: "step4m1" },
  // identificationdocument  : { type: String, default: "step5m1" },
  // shortvideo  : { type: String, default: "step5m2" },
  // currentSchufareport  : { type: String, default: "step6m1" },
  // rentalschoolfree  : { type: String, default: "step7m1" },
  // signatureData  : { type: String, default: "signature" },
  // familyid: { type: String, default: "id"},
  ApplicationImg :{type:String}
  

  // Add other fields as needed
},{timestamps: true});

export default mongoose.models.ApplicationFile || mongoose.model('ApplicationFile', ApplicationFileSchema);
