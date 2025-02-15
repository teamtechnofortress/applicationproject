import { IncomingForm } from 'formidable';
import fs from 'fs';
import path from 'path';
import Application from '@/models/Application';
import ApplicationFile from '@/models/ApplicationFile';
import jwt from 'jsonwebtoken';
import { parseCookies } from 'nookies';
import { connectDb } from '@/helper/db';
import User from '@/models/User';
import { v4 as uuidv4 } from 'uuid';
import { put } from '@vercel/blob';

export const config = {
  api: {
    bodyParser: false,
  },
};

const handler = async (req, res) => {
  await connectDb();

  if (req.method === 'POST') {
    const cookies = parseCookies({ req });
    const token = cookies.token;

    if (!token) {
      return res.status(401).json({ success: false, message: 'Not authenticated' });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const userEmail = decoded.id; // Assuming your token payload has the user email

    // Fetch the user from the database using the email
    const user = await User.findOne({ _id: userEmail });

    if (!user) {
      return res.status(404).json({ success: false, message: 'User not found' });
    }

    const form = new IncomingForm();
    
    form.keepExtensions = true;

    form.parse(req, async (err, fields, files) => {
      if (err) {
        console.error('Error parsing the form:', err);
        return res.status(500).json({ success: false, error: 'Error parsing the form' });
      }

      const vorname = Array.isArray(fields.vorname) ? fields.vorname[0] : fields.vorname;
      const nachname = Array.isArray(fields.nachname) ? fields.nachname[0] : fields.nachname;
      const strabe = Array.isArray(fields.strabe) ? fields.strabe[0] : fields.strabe;
      const hausnummer = Array.isArray(fields.hausnummer) ? fields.hausnummer[0] : fields.hausnummer;
      const postleitzahl = Array.isArray(fields.postleitzahl) ? fields.postleitzahl[0] : fields.postleitzahl;
      const PLZ = Array.isArray(fields.PLZ) ? fields.PLZ[0] : fields.PLZ;
      const Ort = Array.isArray(fields.Ort) ? fields.Ort[0] : fields.Ort;
      const email = Array.isArray(fields.email) ? fields.email[0] : fields.email;
      const tel = Array.isArray(fields.tel) ? fields.tel[0] : fields.tel;
      const profession = Array.isArray(fields.profession) ? fields.profession[0] : fields.profession;
      const geburtsdatum = Array.isArray(fields.geburtsdatum) ? fields.geburtsdatum[0] : fields.geburtsdatum;
      const ausgeubterBeruf = Array.isArray(fields.ausgeubterBeruf) ? fields.ausgeubterBeruf[0] : fields.ausgeubterBeruf;
      const arbeitgeber = Array.isArray(fields.arbeitgeber) ? fields.arbeitgeber[0] : fields.arbeitgeber;
      const income = Array.isArray(fields.income) ? fields.income[0] : fields.income;
      const bwaimages = Array.isArray(fields.bwaimages) ? fields.bwaimages[0] : fields.bwaimages;
      const employment = Array.isArray(fields.employment) ? fields.employment[0] : fields.employment;
      const salaryslip = Array.isArray(fields.salaryslip) ? fields.salaryslip[0] : fields.salaryslip;
      const employcontract = Array.isArray(fields.employcontract) ? fields.employcontract[0] : fields.employcontract;
      const pets = Array.isArray(fields.pets) ? fields.pets[0] : fields.pets;
      const rentarea = Array.isArray(fields.rentarea) ? fields.rentarea[0] : fields.rentarea;
      const proceedings = Array.isArray(fields.proceedings) ? fields.proceedings[0] : fields.proceedings;
      const apartment = Array.isArray(fields.apartment) ? fields.apartment[0] : fields.apartment;
      const coverletter = Array.isArray(fields.coverletter) ? fields.coverletter[0] : fields.coverletter;
      const zimerzahl = Array.isArray(fields.zimerzahl) ? fields.zimerzahl[0] : fields.zimerzahl;
      const imageswbs = Array.isArray(fields.imageswbs) ? fields.imageswbs[0] : fields.imageswbs;
      const personal = Array.isArray(fields.personal) ? fields.personal[0] : fields.personal;
      const schufa = Array.isArray(fields.schufa) ? fields.schufa[0] : fields.schufa;
      const mietschuldenfreiheit = Array.isArray(fields.mietschuldenfreiheit) ? fields.mietschuldenfreiheit[0] : fields.mietschuldenfreiheit;
      const mietschuldenfreiheitimg = Array.isArray(fields.mietschuldenfreiheitimg) ? fields.mietschuldenfreiheitimg[0] : fields.mietschuldenfreiheitimg;
      const mietverhaltnis = Array.isArray(fields.mietverhaltnis) ? fields.mietverhaltnis[0] : fields.mietverhaltnis;
      const firstname = Array.isArray(fields.firstname) ? fields.firstname[0] : fields.firstname;
      const lastname = Array.isArray(fields.lastname) ? fields.lastname[0] : fields.lastname;
      const email2 = Array.isArray(fields.email2) ? fields.email2[0] : fields.email2;
      
      const status = Array.isArray(fields.status) ? fields.status[0] : fields.status;
      const currentactivity = Array.isArray(fields.currentactivity) ? fields.currentactivity[0] : fields.currentactivity;
      const currentemployer = Array.isArray(fields.currentemployer) ? fields.currentemployer[0] : fields.currentemployer;
      const incomee = Array.isArray(fields.incomee) ? fields.incomee[0] : fields.incomee;
      const fläche = Array.isArray(fields.fläche) ? fields.fläche[0] : fields.fläche;
      const anzahlderzimmer = Array.isArray(fields.anzahlderzimmer) ? fields.anzahlderzimmer[0] : fields.anzahlderzimmer;
      const familyid = Array.isArray(fields.familyid) ? fields.familyid[0] : fields.familyid;
//////////first photo
     
      const photo = files.photo;
      let fullfilename = null

      if(photo){
        // If photo is an array, get the first item
        const photoFile = Array.isArray(photo) ? photo[0] : photo;

        if (!photoFile || !photoFile.filepath || !photoFile.originalFilename) {
          console.error('Filepath or originalFilename missing:', photoFile);
          return res.status(400).json({ success: false, error: 'Filepath or originalFilename missing' });
        }

        const fileContent = fs.readFileSync(photoFile.filepath);
        const uniqueFileName = `${uuidv4()}_${photoFile.originalFilename}`;
        const blob = await put(uniqueFileName, fileContent, {
          access: 'public',
        });

        fullfilename = blob.url
      }

//////////salarystatementlast photo

      const salarystatementlast = files.salarystatementlast;
      let fullfilenamesalarystatementlast = null

      if(salarystatementlast){
        // If photo is an array, get the first item
        const photoFile = Array.isArray(salarystatementlast) ? salarystatementlast[0] : salarystatementlast;

        if (!photoFile || !photoFile.filepath || !photoFile.originalFilename) {
          console.error('Filepath or originalFilename missing:', photoFile);
          return res.status(400).json({ success: false, error: 'Filepath or originalFilename missing' });
        }

        const fileContent = fs.readFileSync(photoFile.filepath);
        const uniqueFileName = `${uuidv4()}_${photoFile.originalFilename}`;
        const blob = await put(uniqueFileName, fileContent, {
          access: 'public',
        });

        fullfilenamesalarystatementlast = blob.url
      }
//////////salarystatementbefore photo

      const salarystatementbefore = files.salarystatementbefore;
      let fullfilenamesalarystatementbefore = null

      if(salarystatementbefore){
        // If photo is an array, get the first item
        const photoFile = Array.isArray(salarystatementbefore) ? salarystatementbefore[0] : salarystatementbefore;

        if (!photoFile || !photoFile.filepath || !photoFile.originalFilename) {
          console.error('Filepath or originalFilename missing:', photoFile);
          return res.status(400).json({ success: false, error: 'Filepath or originalFilename missing' });
        }

        const fileContent = fs.readFileSync(photoFile.filepath);
        const uniqueFileName = `${uuidv4()}_${photoFile.originalFilename}`;
        const blob = await put(uniqueFileName, fileContent, {
          access: 'public',
        });

        fullfilenamesalarystatementbefore = blob.url
      }
//////////salarystatementago photo

      const salarystatementago = files.salarystatementago;
      let fullfilenamesalarystatementago = null

      if(salarystatementago){
        // If photo is an array, get the first item
        const photoFile = Array.isArray(salarystatementago) ? salarystatementago[0] : salarystatementago;

        if (!photoFile || !photoFile.filepath || !photoFile.originalFilename) {
          console.error('Filepath or originalFilename missing:', photoFile);
          return res.status(400).json({ success: false, error: 'Filepath or originalFilename missing' });
        }

        const fileContent = fs.readFileSync(photoFile.filepath);
        const uniqueFileName = `${uuidv4()}_${photoFile.originalFilename}`;
        const blob = await put(uniqueFileName, fileContent, {
          access: 'public',
        });

        fullfilenamesalarystatementago = blob.url
      }
//////////residencepermit photo

      const residencepermit = files.residencepermit;
      let fullfilenameresidencepermit = null

      if(residencepermit){
        // If photo is an array, get the first item
        const photoFile = Array.isArray(residencepermit) ? residencepermit[0] : residencepermits;

        if (!photoFile || !photoFile.filepath || !photoFile.originalFilename) {
          console.error('Filepath or originalFilename missing:', photoFile);
          return res.status(400).json({ success: false, error: 'Filepath or originalFilename missing' });
        }

        const fileContent = fs.readFileSync(photoFile.filepath);
        const uniqueFileName = `${uuidv4()}_${photoFile.originalFilename}`;
        const blob = await put(uniqueFileName, fileContent, {
          access: 'public',
        });

        fullfilenameresidencepermit = blob.url
      }
//////////identificationdocument photo

      const identificationdocument = files.identificationdocument;
      let fullfilenameidentificationdocument = null

      if(residencepermit){
        // If photo is an array, get the first item
        const photoFile = Array.isArray(identificationdocument) ? identificationdocument[0] : identificationdocument;

        if (!photoFile || !photoFile.filepath || !photoFile.originalFilename) {
          console.error('Filepath or originalFilename missing:', photoFile);
          return res.status(400).json({ success: false, error: 'Filepath or originalFilename missing' });
        }

        const fileContent = fs.readFileSync(photoFile.filepath);
        const uniqueFileName = `${uuidv4()}_${photoFile.originalFilename}`;
        const blob = await put(uniqueFileName, fileContent, {
          access: 'public',
        });

        fullfilenameidentificationdocument = blob.url
      }
//////////shortvideo photo

      const shortvideo = files.shortvideo;
      let fullfilenameshortvideo = null

      if(residencepermit){
        // If photo is an array, get the first item
        const photoFile = Array.isArray(shortvideo) ? shortvideo[0] : shortvideo;

        if (!photoFile || !photoFile.filepath || !photoFile.originalFilename) {
          console.error('Filepath or originalFilename missing:', photoFile);
          return res.status(400).json({ success: false, error: 'Filepath or originalFilename missing' });
        }

        const fileContent = fs.readFileSync(photoFile.filepath);
        const uniqueFileName = `${uuidv4()}_${photoFile.originalFilename}`;
        const blob = await put(uniqueFileName, fileContent, {
          access: 'public',
        });

        fullfilenameshortvideo = blob.url
      }
//////////currentSchufareport photo

      const currentSchufareport = files.currentSchufareport;
      let fullfilenamecurrentSchufareport = null

      if(currentSchufareport){
        // If photo is an array, get the first item
        const photoFile = Array.isArray(currentSchufareport) ? currentSchufareport[0] : currentSchufareport;

        if (!photoFile || !photoFile.filepath || !photoFile.originalFilename) {
          console.error('Filepath or originalFilename missing:', photoFile);
          return res.status(400).json({ success: false, error: 'Filepath or originalFilename missing' });
        }

        const fileContent = fs.readFileSync(photoFile.filepath);
        const uniqueFileName = `${uuidv4()}_${photoFile.originalFilename}`;
        const blob = await put(uniqueFileName, fileContent, {
          access: 'public',
        });

        fullfilenamecurrentSchufareport = blob.url
      }
//////////currentSchufareport photo

      const rentalschoolfree = files.rentalschoolfree;
      let fullfilenamerentalschoolfree = null

      if(rentalschoolfree){
        // If photo is an array, get the first item
        const photoFile = Array.isArray(rentalschoolfree) ? rentalschoolfree[0] : rentalschoolfree;

        if (!photoFile || !photoFile.filepath || !photoFile.originalFilename) {
          console.error('Filepath or originalFilename missing:', photoFile);
          return res.status(400).json({ success: false, error: 'Filepath or originalFilename missing' });
        }

        const fileContent = fs.readFileSync(photoFile.filepath);
        const uniqueFileName = `${uuidv4()}_${photoFile.originalFilename}`;
        const blob = await put(uniqueFileName, fileContent, {
          access: 'public',
        });

        fullfilenamerentalschoolfree = blob.url
      }
    
//////////signatureData photo

      const signatureData = files.signatureData;
      let fullfilenamesignatureData = null

      if(signatureData){
        // If photo is an array, get the first item
        const photoFile = Array.isArray(signatureData) ? signatureData[0] : signatureData;

        if (!photoFile || !photoFile.filepath || !photoFile.originalFilename) {
          console.error('Filepath or originalFilename missing:', photoFile);
          return res.status(400).json({ success: false, error: 'Filepath or originalFilename missing' });
        }

        const fileContent = fs.readFileSync(photoFile.filepath);
        const uniqueFileName = `${uuidv4()}_${photoFile.originalFilename}`;
        const blob = await put(uniqueFileName, fileContent, {
          access: 'public',
        });

        fullfilenamesignatureData = blob.url
      }
//////////applicationIMG photo

      const componentImage = files.componentImage;
      let fullfilenamecomponentImage = null

      if(componentImage){
        // If photo is an array, get the first item
        const photoFile = Array.isArray(componentImage) ? componentImage[0] : componentImage;

        if (!photoFile || !photoFile.filepath || !photoFile.originalFilename) {
          console.error('Filepath or originalFilename missing:', photoFile);
          return res.status(400).json({ success: false, error: 'Filepath or originalFilename missing' });
        }

        const fileContent = fs.readFileSync(photoFile.filepath);
        const uniqueFileName = `${uuidv4()}_${photoFile.originalFilename}`;
        const blob = await put(uniqueFileName, fileContent, {
          access: 'public',
        });

        fullfilenamecomponentImage = blob.url
      }


      // new code for new images
    
        // profile image
        const inputfotoImage = files.inputfoto;
      let fullfilenameinputfoto = null
      if(inputfotoImage){

        // If photo is an array, get the first item
        const photoFile = Array.isArray(inputfotoImage) ? inputfotoImage[0] : inputfotoImage;

        if (!photoFile || !photoFile.filepath || !photoFile.originalFilename) {
          console.error('Filepath or originalFilename missing:', photoFile);
          return res.status(400).json({ success: false, error: 'Filepath or originalFilename missing' });
        }

        const fileContent = fs.readFileSync(photoFile.filepath);
        const uniqueFileName = `${uuidv4()}_${photoFile.originalFilename}`;
        const blob = await put(uniqueFileName, fileContent, {
          access: 'public',
        });

        fullfilenameinputfoto = blob.url
        console.log(fullfilenameinputfoto)
      }

       // profile image
       const employcontractImage = files.employcontract;
       let fullfilenameemploycontract = null

       if(employcontractImage){
         // If photo is an array, get the first item
         const photoFile = Array.isArray(employcontractImage) ? employcontractImage[0] : employcontractImage;
 
         if (!photoFile || !photoFile.filepath || !photoFile.originalFilename) {
           console.error('Filepath or originalFilename missing:', photoFile);
           return res.status(400).json({ success: false, error: 'Filepath or originalFilename missing' });
         }
 
         const fileContent = fs.readFileSync(photoFile.filepath);
         const uniqueFileName = `${uuidv4()}_${photoFile.originalFilename}`;
         const blob = await put(uniqueFileName, fileContent, {
           access: 'public',
         });
 
         fullfilenameemploycontract = blob.url
         console.log(fullfilenameemploycontract)
       }
 

      // new code for new images end
      try {
  
        // const newForm = new Application({
        //   userId: user._id,
        //   vorname,
        //   nachname,
        //   strabe,
        //   hausnummer,
        //   PLZ,
        //   Ort,
        //   email,
        //   tel,
        //   geburtsdatum,
        //   ausgeübterBeruf,
        //   arbeitgeber,
        //   income,
        //   textarea1,
        //   textarea2,
        //   textarea3,
        //   textarea4,
        //   textarea5,
        //   inputfoto: fullfilename, // Save the URL of the uploaded file
        //   noofpeople, // Save the URL of the uploaded file
        //   status, // Save the URL of the uploaded file
        //   currentactivity, // Save the URL of the uploaded file
        //   currentemployer, // Save the URL of the uploaded file
        //   incomee, // Save the URL of the uploaded file
        //   fläche,
        //   familyid,
        //   anzahlderzimmer,
        //   salarystatementlast: fullfilenamesalarystatementlast,  
        //   salarystatementbefore:fullfilenamesalarystatementbefore,       
        //   salarystatementago:fullfilenamesalarystatementago,       
        //   residencepermit:fullfilenameresidencepermit,       
        //   identificationdocument:fullfilenameidentificationdocument,       
        //   shortvideo:fullfilenameshortvideo,       
        //   currentSchufareport:fullfilenamecurrentSchufareport,       
        //   rentalschoolfree:fullfilenamerentalschoolfree,       
        //   signatureData:fullfilenamesignatureData,       
        //   applicationImg:fullfilenamecomponentImage,       
        // });
        console.log(user._id);
        const newForm = new ApplicationFile({
          userId: user._id,
          vorname,
          nachname,
          geburtsdatum,
          strabe,
          postleitzahl,
          hausnummer,
          Ort,
          email,
          tel,
          inputfoto:fullfilenameinputfoto,
          profession,
          ausgeubterBeruf,
          arbeitgeber,
          income,
          bwaimages,
          employment,
          salaryslip,
          employcontract:fullfilenameemploycontract,
          pets,
          rentarea,
          proceedings,
          apartment,
          coverletter,
          fläche,
          zimerzahl,
          imageswbs,
          personal,
          schufa,
          mietschuldenfreiheit,
          mietschuldenfreiheitimg,
          mietverhaltnis,
          firstname,
          lastname,
          email2,      
        });
        await newForm.save();
         // salarystatementago,
          // residencepermit,
          // identificationdocument,
          // shortvideo,
          // currentSchufareport,
          // rentalschoolfree,

        return res.status(200).json({ success: true, message: 'Form submitted successfully'});
      } catch (error) {
        console.error('Error saving data:', error);
        return res.status(500).json({ success: false, error: 'Error saving data' });
      }
    });
  } else {
    res.status(405).json({ success: false, error: 'Method not allowed' });
  }
};

export default handler;
