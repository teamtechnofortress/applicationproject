// models/Application.js
import mongoose from 'mongoose';

const ApplicationSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  title: { type: String, default: "Untitled" },
  vorname: { type: String, required: true },
  nachname: { type: String, required: true },
  strabe: { type: String, required: true },
  hausnummer: { type: String, required: true },
  PLZ: { type: String, required: true },
  Ort: { type: String, required: true },
  email: { type: String, required: true },
  tel: { type: String, required: true },
  geburtsdatum: { type: String, required: true },
  ausgeübterBeruf: { type: String, required: true },
  arbeitgeber: { type: String, required: true },
  income: { type: String, required: true },
  inputfoto: { type: String },
  textarea1: { type: String },
  textarea2: { type: String },
  textarea3: { type: String },
  textarea4: { type: String },
  textarea5: { type: String },
  noofpeople: { type: String },
  status: { type: String },
  currentactivity: { type: String },
  currentemployer: { type: String },
  incomee: { type: String },
  salarystatementlast : { type: String, default: "step3m1" },
  salarystatementbefore : { type: String, default: "step3m2" },
  salarystatementago : { type: String, default: "step3m3" },
  
  fläche : { type: String },
  anzahlderzimmer : { type: String },
  residencepermit  : { type: String, default: "step4m1" },
  identificationdocument  : { type: String, default: "step5m1" },
  shortvideo  : { type: String, default: "step5m2" },
  currentSchufareport  : { type: String, default: "step6m1" },
  rentalschoolfree  : { type: String, default: "step7m1" },
  signatureData  : { type: String, default: "signature" },
  familyid: { type: String, default: "id"},
  applicationImg :{type:String}
  

  // Add other fields as needed
},{timestamps: true});

export default mongoose.models.Application || mongoose.model('Application', ApplicationSchema);
