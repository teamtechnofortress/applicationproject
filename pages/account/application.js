import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import React, { useEffect, useRef, useState } from "react";
import Link from "next/link";
import router from "next/router";
import Image from "next/image";
import "react-toastify/dist/ReactToastify.css";
import "react-phone-input-2/lib/style.css";
import styles from "../../styles/latest.module.css";
import DashboardHeader from '@/components/DashboardHeader';
import Steptwo from "@/components/steptwo";
import StepOne from "@/components/stepone";
import Stepthree from "@/components/stepthree";
import LoadingSpinner from "@/components/loading";
import { useRouter } from 'next/router';



const application = () => {
  const router = useRouter();
  const { parentId } = router.query;

  const [vorname, setVorname] = useState("");
  const [nachname, setNachname] = useState("");
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [strabe, setStrabe] = useState("");
  const [postleitzahl, setPostleitzahl] = useState("");
  const [hausnummer, sethausnummer] = useState("");
  const [ort, setOrt] = useState("");
  const [geburtsdatum, setGeburtsdatum] = useState("");
  const [email, setEmail] = useState("");
  const [email2, setEmail2] = useState("");
  const [phonenumber, setPhoneNumber] = useState("");
  const [ausgeubterBeruf, setausgeubterBeruf] = useState("");
  const [arbeitgeber, setarbeitgeber] = useState("");
  const [income, setincome] = useState("");
  const [employment, setEmployment] = useState("");
  const [pets, setPets] = useState("");
  const [rentarea, setRentarea] = useState("");
  const [proceedings, setProceedings] = useState("");
  const [profession, setprofession] = useState("");
  const [apartment, setApartment] = useState("");
  const [inputfoto, setinputfoto] = useState("");
  const [showinputfoto, setshowinputfoto] = useState();
  const [mietschuldenfreiheit, setMietschuldenfreiheit] = useState("");
  const [mietverhaltnis, setMietverhaltnis] = useState("");
  const [salarySlip, setsalarySlip] = useState([]);
  const [salarySlip1, setSalarySlip1] = useState([]);
  const [salarySlip2, setSalarySlip2] = useState([]);
  const [salarySlip3, setSalarySlip3] = useState([]);
  
  const [bwaimages, setBwaimages] = useState("");
  const [showbwaimages, setshowbwaimages] = useState("");
  const [einkommensbescheinigungimg, seteinkommensbescheinigungimg] = useState("");
  const [showeinkommensbescheinigungimg, setshoweinkommensbescheinigungimg] = useState("");
  const [employcontract, setemploycontract] = useState(null);
  const [showemploycontract, setshowemploycontract] = useState("");
  const [personal, setPersonal] = useState("");
  const [showpersonal, setshowpersonal] = useState("");
  const [schufa, setSchufa] = useState("");
  const [showschufa, setshowschufa] = useState("");
  const [imageswbs, setImageswbs] = useState([]);
  const [showimageswbs, setshowimageswbs] = useState("");
  const [mietschuldenfreiheitimg, setMietschuldenfreiheitimg] = useState("");
  const [showmietschuldenfreiheitimg, setshowmietschuldenfreiheitimg] = useState("");
  const [coverletter, setCoverletter] = useState("");
  const [status, setStatus] = useState("");
  const [currentactivity, setCurrentactivity] = useState("");
  const [currentemployer, setCurrentemployer] = useState("");
  const [incomee, setIncomee] = useState("");
  const [fläche, setFläche] = useState("");
  const [zimerzahl, setZimerzahl] = useState("");
  const [anzahlderzimmer, setAnzahlderzimmer] = useState("");
  const [photo, setPhoto] = useState(null);
  
  const [salarystatementlast, setSalarystatementlast] = useState(null);
  const [salarystatementbefore, setSalarystatementbefore] = useState(null);
  const [salarystatementago, setSalarystatementago] = useState(null);
  const [residencepermit, setResidencepermit] = useState(null);
  const [identificationdocument, setIdentificationdocument] = useState(null);
  const [shortvideo, setShortvideo] = useState(null);
  const [currentSchufareport, setCurrentSchufareport] = useState(null);
  const [rentalschoolfree, setRentalschoolfree] = useState(null);
  const [signatureData, setSignatureData] = useState(null);
  const [applicationimg, setApplicationimg] = useState(null);
  const [selectedImg, setSelectedImg] = useState("../image.png");
  
  const [loading, setLoading] = useState(false);
  const [components, setComponents] = useState(1);

  const [isMenuVisible, setMenuVisible] = useState(false);
  ///////img show useState
  const [showsalarystatementlast, setShowsalarystatementlast] = useState(false);
  const [showsalarystatementbefore, setShowsalarystatementbefore] = useState(false);
  const [showsalarystatementago, setShowsalarystatementago] = useState(false);
  const [showresidencepermit, setShowresidencepermit] = useState(false);
  const [showidentificationdocument, setShowidentificationdocument] = useState(false);
  const [showshortvideo, setShowshortvideo] = useState(false);
  const [showcurrentSchufareport, setShowcurrentSchufareport] = useState(false);
  const [showrentalschoolfree, setShowrentalschoolfree] = useState(false);

  const [currentStep, setCurrentStep] = useState(0);



  const toggleMenu = () => {
    setMenuVisible(!isMenuVisible);
  };
  const handleChange = (e) => {
    const { name, value, files } = e.target;
    const newErrors = {};

    // if(name === "inputfoto"){
    //   setinputfoto(files[0])
    //   if (files[0]) {
    //     const reader = new FileReader();
    //     reader.onloadend = () => {
    //       const result = reader.result;
    //       setshowinputfoto(result);
    //       console.log(selectedImg);
    //     };
    //     reader.readAsDataURL(files[0]);
    //   }
    // }
    if(name === "bwaimages"){
      setBwaimages(files[0])
      if (files[0]) {
        const reader = new FileReader();
        reader.onloadend = () => {
          const result = reader.result;
          setshowbwaimages(result);
          console.log(selectedImg);
        };
        reader.readAsDataURL(files[0]);
      }
    }
    if(name === "einkommensbescheinigungimg"){
      seteinkommensbescheinigungimg(files[0])
      if (files[0]) {
        const reader = new FileReader();
        reader.onloadend = () => {
          const result = reader.result;
          setshoweinkommensbescheinigungimg(result);
          console.log(selectedImg);
        };
        reader.readAsDataURL(files[0]);
      }
    }
    if(name === "imageswbs"){
      setImageswbs(files[0])
      if (files[0]) {
        const reader = new FileReader();
        reader.onloadend = () => {
          const result = reader.result;
          setshowimageswbs(result);
          console.log(selectedImg);
        };
        reader.readAsDataURL(files[0]);
      }
    }
    if(name === "personal"){
      setPersonal(files[0])
      if (files[0]) {
        const reader = new FileReader();
        reader.onloadend = () => {
          const result = reader.result;
          setshowpersonal(result);
          console.log(selectedImg);
        };
        reader.readAsDataURL(files[0]);
      }
    }
    if(name === "schufa"){
      setSchufa(files[0])
      if (files[0]) {
        const reader = new FileReader();
        reader.onloadend = () => {
          const result = reader.result;
          setshowschufa(result);
          console.log(selectedImg);
        };
        reader.readAsDataURL(files[0]);
      }
    }
    if(name === "mietschuldenfreiheitimg"){
      setMietschuldenfreiheitimg(files[0])
      if (files[0]) {
        const reader = new FileReader();
        reader.onloadend = () => {
          const result = reader.result;
          setshowmietschuldenfreiheitimg(result);
          console.log(selectedImg);
        };
        reader.readAsDataURL(files[0]);
      }
    }
    if(name === "employcontract"){
      setemploycontract(files[0])
      if (files[0]) {
        const reader = new FileReader();
        reader.onloadend = () => {
          const result = reader.result;
          setshowemploycontract(result);
        };
        reader.readAsDataURL(files[0]);
      }
    }
    
  
    
    // if(name === "bwaimages"){
    //   const files = Array.from(e.target.files);
    //   const imageUrls = files.map((file) => URL.createObjectURL(file));
    //   setBwaimages((prevImages) => [...prevImages, ...imageUrls]);
    // }
    // if(name === "incomeimages"){
    //   const files = Array.from(e.target.files);
    //   const imageUrls = files.map((file) => URL.createObjectURL(file));
    //   setincomeimages((prevImages) => [...prevImages, ...imageUrls]);
    // }
    // if(name === "arbeitsvertrag"){
    //   const files = Array.from(e.target.files);
    //   const imageUrls = files.map((file) => URL.createObjectURL(file));
    //   setarbeitsvertrag((prevImages) => [...prevImages, ...imageUrls]);
    // }
    // if(name === "imageswbs"){
    //   const files = Array.from(e.target.files);
    //   const imageUrls = files.map((file) => URL.createObjectURL(file));
    //   setImageswbs((prevImages) => [...prevImages, ...imageUrls]);
    // }
    // if(name === "personal"){
    //   const files = Array.from(e.target.files);
    //   const imageUrls = files.map((file) => URL.createObjectURL(file));
    //   setPersonal((prevImages) => [...prevImages, ...imageUrls]);
    // }

    // if(name === "schufa"){
    //   const files = Array.from(e.target.files);
    //   const imageUrls = files.map((file) => URL.createObjectURL(file));
    //   setSchufa((prevImages) => [...prevImages, ...imageUrls]);
    // }
    // if(name === "mietschuldenfreiheitimg"){
    //   const files = Array.from(e.target.files);
    //   const imageUrls = files.map((file) => URL.createObjectURL(file));
    //   setMietschuldenfreiheitimg((prevImages) => [...prevImages, ...imageUrls]);
    // }


   
    // console.log('Event triggered:', name, value, files);
    if (files && files.length > 0) {
      // if(name === "salarySlip"){
      //   // const files = Array.from(e.target.files);
      //   // const imageUrls = files.map((file) => URL.createObjectURL(file));
      //   // setsalarySlip((prevImages) => [...prevImages, ...imageUrls]);
      //   setsalarySlip(Array.from(files));
      // }
      if (name === "photo") {
        setPhoto(files[0]);
        // console.log(photo);
        if (files[0]) {
          const reader = new FileReader();
          reader.onloadend = () => {
            const result = reader.result;
            setSelectedImg(result); // Assuming setSelectedImg updates the state to show the image
            // console.log(selectedImg);
          };
          reader.readAsDataURL(files[0]);
        }
      }
      if (name === "salarystatementlast") {
        // console.log(files[0]);
        setSalarystatementlast(files[0]);
        // console.log(salarystatementlast);
        if (files[0]) {
        const reader = new FileReader();
        reader.onloadend = () => {
            const result = reader.result;
            setShowsalarystatementlast(result);  // Assuming setSelectedImg updates the state to show the image
        };
        reader.readAsDataURL(files[0]);
        }
      }
      if (name === "salarystatementbefore") {
        // console.log(files[0]);
        setSalarystatementbefore(files[0]);
        // console.log(salarystatementlast);
        if (files[0]) {
        const reader = new FileReader();
        reader.onloadend = () => {
            const result = reader.result;
            setShowsalarystatementbefore(result);  // Assuming setSelectedImg updates the state to show the image
        };
        reader.readAsDataURL(files[0]);
        }
      }
      if (name === "salarystatementago") {
        // console.log(files[0]);
        setSalarystatementago(files[0]);
        // console.log(salarystatementlast);
        if (files[0]) {
        const reader = new FileReader();
        reader.onloadend = () => {
            const result = reader.result;
            setShowsalarystatementago(result);  // Assuming setSelectedImg updates the state to show the image
        };
        reader.readAsDataURL(files[0]);
        }
      }
      if (name === "residencepermit") {
        // console.log(files[0]);
        setResidencepermit(files[0]);
        // console.log(salarystatementlast);
        if (files[0]) {
        const reader = new FileReader();
        reader.onloadend = () => {
            const result = reader.result;
            setShowresidencepermit(result);  // Assuming setSelectedImg updates the state to show the image
        };
        reader.readAsDataURL(files[0]);
        }
      }
      if (name === "identificationdocument") {
        // console.log(files[0]);
        setIdentificationdocument(files[0]);
        // console.log(salarystatementlast);
        if (files[0]) {
        const reader = new FileReader();
        reader.onloadend = () => {
            const result = reader.result;
            setShowidentificationdocument(result);  // Assuming setSelectedImg updates the state to show the image
        };
        reader.readAsDataURL(files[0]);
        }
      }
      if (name === "shortvideo") {
        // console.log(files[0]);
        setShortvideo(files[0]);
        // console.log(salarystatementlast);
        if (files[0]) {
        const reader = new FileReader();
        reader.onloadend = () => {
            const result = reader.result;
            setShowshortvideo(result);  // Assuming setSelectedImg updates the state to show the image
        };
        reader.readAsDataURL(files[0]);
        }
      }
    
      if (name === "rentalschoolfree") {
        // console.log(files[0]);
        setRentalschoolfree(files[0]);
        // console.log(salarystatementlast);
        if (files[0]) {
        const reader = new FileReader();
        reader.onloadend = () => {
            const result = reader.result;
            setShowrentalschoolfree(result);  // Assuming setSelectedImg updates the state to show the image
        };
        reader.readAsDataURL(files[0]);
        }
      }
    } else {
      if (name === "vorname") setVorname(value);
      if (name === "nachname") setNachname(value);
      if (name === "firstname") setFirstname(value);
      if (name === "lastname") setLastname(value);
      if (name === "strabe") setStrabe(value);
      if (name === "postleitzahl") setPostleitzahl(value);
      if (name === "hausnummer") sethausnummer(value);
      if (name === "geburtsdatum") setGeburtsdatum(value);
      if (name === "ort") setOrt(value);
      if (name === "income") setincome(value);
      if (name === "email") setEmail(value);
      if (name === "inputfoto")setinputfoto(value);
      if (name === "email2") setEmail2(value);
      if (name === "phonenumber") setPhoneNumber(value);
      if (name === "ausgeubterBeruf") setausgeubterBeruf(value);
      if (name === "arbeitgeber") setarbeitgeber(value);
      if (name === "employment") setEmployment(value);
      // if (name === "salaryslip") setsalarySlip(value);
      if (name === "employcontract") setemploycontract(value);
      if (name === "pets") setPets(value);
      if (name === "rentarea") setRentarea(value);
      if (name === "proceedings") setProceedings(value);
      if (name === "profession") setprofession(value);
      if (name === "bwaimages") setBwaimages(value);
      if (name === "einkommensbescheinigungimg") seteinkommensbescheinigungimg(value);
      if (name === "imageswbs") setImageswbs(value);
      if (name === "mietverhaltnis") setMietverhaltnis(value);
      if (name === "mietschuldenfreiheitimg") setMietschuldenfreiheitimg(value);
      if (name === "personal") setPersonal(value);
      if (name === "schufa") setPersonal(value);
      if (name === "apartment") setApartment(value);
      if (name === "coverletter") setCoverletter(value);
      if (name === "testname") setTestname(value);
      if (name === "testage") setTestage(value);
      if (name === "status") setStatus(value);
      if (name === "currentactivity") setCurrentactivity(value);
      if (name === "currentemployer") setCurrentemployer(value);
      if (name === "incomee") setIncomee(value);
      if (name === "anzahlderzimmer") setAnzahlderzimmer(value);
      if (name === "fläche") setFläche(value);
      if (name === "zimerzahl") setZimerzahl(value);
      if (name === "mietschuldenfreiheit") setMietschuldenfreiheit(value);
    }
  };
 
  const base64ToFile = (base64String, filename) => {
    try {
      if (!base64String.includes(",")) {
        throw new Error("Invalid Base64 format");
      }
  
      const [header, content] = base64String.split(",");
      const mimeType = header.match(/:(.*?);/)[1] || "application/octet-stream";
  
      const byteCharacters = atob(content);
      const byteNumbers = new Array(byteCharacters.length);
      for (let i = 0; i < byteCharacters.length; i++) {
        byteNumbers[i] = byteCharacters.charCodeAt(i);
      }
  
      return new File([new Uint8Array(byteNumbers)], filename, { type: mimeType });
    } catch (error) {
      console.error("Error converting Base64 to file:", error);
      return null;
    }
  };
  async function blobToFile(blobUrl, fileName) {
    const response = await fetch(blobUrl);
    const blob = await response.blob();
    return new File([blob], fileName, { type: blob.type });
  }
  const processFilesForFormData = async (formData, fileList, fieldName) => {
    if (!fileList || fileList.length === 0) return;
  
    for (const [index, file] of fileList.entries()) {
      if (typeof file === "string") {
        if (file.startsWith("data:image")) {
          // Convert Base64 to File
          const convertedFile = base64ToFile(file, `${fieldName}_${index}.png`);
          formData.append(fieldName, convertedFile);
        } else if (file.startsWith("blob:")) {
          // Convert Blob URL to File
          const convertedFile = await blobToFile(file, `${fieldName}_${index}.png`);
          formData.append(fieldName, convertedFile);
          console.log(`${fieldName} blob:`, convertedFile);
        } else {
          console.warn(`Unexpected format for ${fieldName}:`, file);
        }
      } else if (file instanceof File) {
        // Append File object directly
        formData.append(fieldName, file);
        console.log(`Appending file to ${fieldName}:`, file);
      } else {
        console.warn(`Unknown format for ${fieldName}:`, file);
      }
    }
  };
  let salary1;
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
    const formData = new FormData();
    formData.append("vorname", vorname);
    formData.append("nachname", nachname);
    formData.append("firstname", firstname);
    formData.append("lastname", lastname);
    formData.append("strabe", strabe);
    formData.append("hausnummer", hausnummer);
    formData.append("postleitzahl", postleitzahl);
    formData.append("Ort", ort);
    formData.append("email", email);
    formData.append("inputfoto", inputfoto);
    // formData.append("bwaimages", bwaimages);
    // formData.append("einkommensbescheinigungimg", einkommensbescheinigungimg);
    // formData.append("imageswbs", imageswbs);
    // formData.append("personal", personal);
    // formData.append("mietschuldenfreiheitimg", mietschuldenfreiheitimg);
    formData.append("phonenumber", phonenumber);
    formData.append("geburtsdatum", geburtsdatum);
    formData.append("ausgeubterBeruf", ausgeubterBeruf);
    formData.append("arbeitgeber", arbeitgeber);
    formData.append("income", income);
    formData.append("employment", employment);
    formData.append("profession", profession);
    // formData.append("employcontract", employcontract);
    formData.append("pets", pets);
    formData.append("rentarea", rentarea);
    formData.append("proceedings", proceedings);
    formData.append("apartment", apartment);
    formData.append("coverletter", coverletter);
    // formData.append("salarySlip", salarySlip);
    // salarySlip.forEach((file) => formData.append("salarySlip", file));
    // formData.append("schufa", schufa);
    // console.log('schufa', schufa);
    // formData.append("noofpeople", people);
     // 🔹 Append Parent Form ID if available
     if (parentId) {
      formData.append("parentId", parentId); 
      console.log(parentId);
    }
    formData.append("status", status);
    formData.append("currentactivity", currentactivity);
    formData.append("currentemployer", currentemployer);
    formData.append("incomee", incomee);
    formData.append("fläche", fläche);
    formData.append("zimerzahl", zimerzahl);
    formData.append("anzahlderzimmer", anzahlderzimmer);
    formData.append("salarystatementlast", salarystatementlast);
    formData.append("salarystatementbefore", salarystatementbefore);
    formData.append("salarystatementago", salarystatementago);
    formData.append("residencepermit", residencepermit);
    formData.append("shortvideo", shortvideo);
    formData.append("identificationdocument", identificationdocument);
    formData.append("currentSchufareport", currentSchufareport);
    formData.append("rentalschoolfree", rentalschoolfree);
    formData.append("signatureData", signatureData);
    formData.append('componentImage', applicationimg);
    formData.append('componentImage', applicationimg);
    formData.append('salarySlip1', salarySlip1);
    formData.append("mietschuldenfreiheit", mietschuldenfreiheit);
    formData.append("mietverhaltnis", mietverhaltnis);
    
    // Convert Base64 images to File objects before appending
    if (imageswbs && imageswbs.length > 0) {
      for (const [index, image] of imageswbs.entries()) {
        if (typeof image === "string") {
          if (image.startsWith("data:image")) {
            // Convert Base64 to File
            const file = base64ToFile(image, `imageswbs_${index}.png`);
            formData.append("imageswbs", file);
          } else if (image.startsWith("blob:")) {
            // Convert Blob URL to File
            const file = await blobToFile(image, `imageswbs_${index}.png`);
            formData.append("imageswbs", file);
            console.log("imageswbs blob:", file);
          } else {
            // Handle other cases (if necessary)
            console.warn("Unexpected format for imageswbs:", image);
          }
        } else if (image instanceof File) {
          // Append File object directly
          formData.append("imageswbs", image);
          console.log("Appending file:", image);
        } else {
          console.warn("Unknown image format:", image);
        }
      }
    }
    if (einkommensbescheinigungimg && einkommensbescheinigungimg.length > 0) {
      for (const [index, image] of einkommensbescheinigungimg.entries()) {
        if (typeof image === "string") {
          if (image.startsWith("data:image")) {
            // Convert Base64 to File
            const file = base64ToFile(image, `einkommensbescheinigungimg_${index}.png`);
            formData.append("einkommensbescheinigungimg", file);
          } else if (image.startsWith("blob:")) {
            // Convert Blob URL to File
            const file = await blobToFile(image, `einkommensbescheinigungimg_${index}.png`);
            formData.append("einkommensbescheinigungimg", file);
            console.log("einkommensbescheinigungimg blob:", file);
          } else {
            // Handle other cases (if necessary)
            console.warn("Unexpected format for imageswbs:", image);
          }
        } else if (image instanceof File) {
          // Append File object directly
          formData.append("einkommensbescheinigungimg", image);
          console.log("Appending file:", image);
        } else {
          console.warn("Unknown image format:", image);
        }
      }
    }
    if (personal && personal.length > 0) {
      for (const [index, image] of personal.entries()) {
        if (typeof image === "string") {
          if (image.startsWith("data:image")) {
            // Convert Base64 to File
            const file = base64ToFile(image, `personal_${index}.png`);
            formData.append("personal", file);
          } else if (image.startsWith("blob:")) {
            // Convert Blob URL to File
            const file = await blobToFile(image, `personal_${index}.png`);
            formData.append("personal", file);
            console.log("personal blob:", file);
          } else {
            // Handle other cases (if necessary)
            console.warn("Unexpected format for imageswbs:", image);
          }
        } else if (image instanceof File) {
          // Append File object directly
          formData.append("personal", image);
          console.log("Appending file:", image);
        } else {
          console.warn("Unknown image format:", image);
        }
      }
    }
    if (mietschuldenfreiheitimg.length > 0) {
      for (const [index, image] of mietschuldenfreiheitimg.entries()) {
        if (typeof image === "string") {
          if (image.startsWith("data:image")) {
            // Convert Base64 to File
            const file = base64ToFile(image, `mietschuldenfreiheitimg_${index}.png`);
            formData.append("mietschuldenfreiheitimg", file);
          } else if (image.startsWith("blob:")) {
            // Convert Blob URL to File
            const file = await blobToFile(image, `mietschuldenfreiheitimg_${index}.png`);
            formData.append("mietschuldenfreiheitimg", file);
            console.log("mietschuldenfreiheitimg blob:", file);
          } else {
            // Handle other cases (if necessary)
            console.warn("Unexpected format for imageswbs:", image);
          }
        } else if (image instanceof File) {
          // Append File object directly
          formData.append("mietschuldenfreiheitimg", image);
          console.log("Appending file:", image);
        } else {
          console.warn("Unknown image format:", image);
        }
      }
    }
    if (employcontract && employcontract.length > 0) {
      for (const [index, image] of employcontract.entries()) {
        if (typeof image === "string") {
          if (image.startsWith("data:image")) {
            // Convert Base64 to File
            const file = base64ToFile(image, `employcontract_${index}.png`);
            formData.append("employcontract", file);
          } else if (image.startsWith("blob:")) {
            // Convert Blob URL to File
            const file = await blobToFile(image, `employcontract_${index}.png`);
            formData.append("employcontract", file);
            console.log("employcontract blob:", file);
          } else {
            // Handle other cases (if necessary)
            console.warn("Unexpected format for imageswbs:", image);
          }
        } else if (image instanceof File) {
          // Append File object directly
          formData.append("employcontract", image);
          console.log("Appending file:", image);
        } else {
          console.warn("Unknown image format:", image);
        }
      }
    }
    if (schufa && schufa.length > 0) {
      for (const [index, image] of schufa.entries()) {
        if (typeof image === "string") {
          if (image.startsWith("data:image")) {
            // Convert Base64 to File
            const file = base64ToFile(image, `schufa_${index}.png`);
            formData.append("schufa", file);
          } else if (image.startsWith("blob:")) {
            // Convert Blob URL to File
            const file = await blobToFile(image, `schufa_${index}.png`);
            formData.append("schufa", file);
            console.log("schufa blob:", file);
          } else {
            // Handle other cases (if necessary)
            console.warn("Unexpected format for imageswbs:", image);
          }
        } else if (image instanceof File) {
          // Append File object directly
          formData.append("schufa", image);
          console.log("Appending file:", image);
        } else {
          console.warn("Unknown image format:", image);
        }
      }
    }
    if (bwaimages && bwaimages.length > 0) {
      for (const [index, image] of bwaimages.entries()) {
        if (typeof image === "string") {
          if (image.startsWith("data:image")) {
            // Convert Base64 to File
            const file = base64ToFile(image, `bwaimages_${index}.png`);
            formData.append("bwaimages", file);
          } else if (image.startsWith("blob:")) {
            // Convert Blob URL to File
            const file = await blobToFile(image, `bwaimages_${index}.png`);
            formData.append("bwaimages", file);
            console.log("bwaimages blob:", file);
          } else {
            // Handle other cases (if necessary)
            console.warn("Unexpected format for imageswbs:", image);
          }
        } else if (image instanceof File) {
          // Append File object directly
          formData.append("bwaimages", image);
          console.log("Appending file:", image);
        } else {
          console.warn("Unknown image format:", image);
        }
      }
    }
    if (salarySlip && salarySlip.length > 0) {
      for (const [index, image] of salarySlip.entries()) {
        if (typeof image === "string") {
          if (image.startsWith("data:image")) {
            // Convert Base64 to File
            const file = base64ToFile(image, `salarySlip_${index}.png`);
            formData.append("salarySlip", file);
          } else if (image.startsWith("blob:")) {
            // Convert Blob URL to File
            const file = await blobToFile(image, `salarySlip_${index}.png`);
            formData.append("salarySlip", file);
            console.log("salarySlip blob:", file);
          } else {
            // Handle other cases (if necessary)
            console.warn("Unexpected format for salarySlip:", image);
          }
        } else if (image instanceof File) {
          // Append File object directly
          formData.append("salarySlip", image);
          console.log("Appending file:", image);
        } else {
          console.warn("Unknown image format:", image);
        }
      }
    }

    if (salarySlip1 && salarySlip1.length > 0) {
      for (const [index, image] of salarySlip1.entries()) {
        if (typeof image === "string") {
          if (image.startsWith("data:image")) {
            // Convert Base64 to File
            const file = base64ToFile(image, `salarySlip1_${index}.png`);
            formData.append("salarySlip1", file);
          } else if (image.startsWith("blob:")) {
            // Convert Blob URL to File
            const file = await blobToFile(image, `salarySlip1_${index}.png`);
            formData.append("salarySlip1", file);
          } else {
            // Handle other cases (if necessary)
            console.warn("Unexpected format for salarySlip1:", image);
          }
        } else if (image instanceof File) {
          // Append File object directly
          formData.append("salarySlip1", image);
        } else {
          console.warn("Unknown image format:", image);
        }
      }
    }
    if (salarySlip2 && salarySlip2.length > 0) {
      for (const [index, image] of salarySlip2.entries()) {
        if (typeof image === "string") {
          if (image.startsWith("data:image")) {
            // Convert Base64 to File
            const file = base64ToFile(image, `salarySlip2_${index}.png`);
            formData.append("salarySlip2", file);
          } else if (image.startsWith("blob:")) {
            // Convert Blob URL to File
            const file = await blobToFile(image, `salarySlip2_${index}.png`);
            formData.append("salarySlip2", file);
            console.log("salarySlip2 blob:", file);
          } else {
            // Handle other cases (if necessary)
            console.warn("Unexpected format for salarySlip2:", image);
          }
        } else if (image instanceof File) {
          // Append File object directly
          formData.append("salarySlip2", image);
          console.log("Appending file:", image);
        } else {
          console.warn("Unknown image format:", image);
        }
      }
    }
    if (salarySlip3 && salarySlip3.length > 0) {
      for (const [index, image] of salarySlip3.entries()) {
        if (typeof image === "string") {
          if (image.startsWith("data:image")) {
            // Convert Base64 to File
            const file = base64ToFile(image, `salarySlip3_${index}.png`);
            formData.append("salarySlip3", file);
          } else if (image.startsWith("blob:")) {
            // Convert Blob URL to File
            const file = await blobToFile(image, `salarySlip3_${index}.png`);
            formData.append("salarySlip3", file);
            console.log("salarySlip3 blob:", file);
          } else {
            // Handle other cases (if necessary)
            console.warn("Unexpected format for salarySlip3:", image);
          }
        } else if (image instanceof File) {
          // Append File object directly
          formData.append("salarySlip3", image);
          console.log("Appending file:", image);
        } else {
          console.warn("Unknown image format:", image);
        }
      }
    }

    let res;
    if (parentId) {
      res = await fetch("/api/user/childapplication", {
        method: "POST",
        body: formData,
      });
    } else {
      res = await fetch("/api/user/application", {
        method: "POST",
        body: formData,
      });
    }

      const response = await res.json();
      if (response.success) {
        setLoading(false);
        // 666c3ac22407a94457a9f6e6
        //   localStorage.setItem('token', response.token)
        toast.success("Form submitted successfully", {
          position: "top-center",
          autoClose: 1500,
          hideProgressBar: true,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
        
        // router.push(`${process.env.NEXT_PUBLIC_HOST}/account/success`);
      } else {
        setLoading(false);
        toast.error(response.error, {
          position: "top-center",
          autoClose: 1500,
          hideProgressBar: true,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
      }
    } catch (error) {
      console.log(error)
      setLoading(true);
      toast.error("Form submission failed: An error occurred");
    }
  };

  

  return (
    <>
   
      {loading && (
        <>
          <div className="fixed inset-0 bg-white bg-opacity-70 z-50"></div>
          <div className="fixed inset-0 flex items-center justify-center z-50">
            <LoadingSpinner />
          </div>
        </>
      )}
      <div className="min-h-full">
        <DashboardHeader />
        <ToastContainer />
     
   
          <div className="mt-7">
            <ul className="flex justify-around items-center max-w-7xl mx-auto p-10">
                {/* Step 1 */}
                <li className="flex flex-col items-center">
                  <div
                    className={`${styles["color-border"]} rounded-full w-10 h-10 flex items-center justify-center ${
                      components >= 1
                        ? "border-2 border-yellow-500 p-1"
                        : "bg-gray-300 border-2 border-gray-400 p-1"
                    }`}
                  >
                    <div className={`${styles["color-circle"]} flex items-center justify-center`}>
                      {components >= 1 ? (
                        <span className="text-white font-bold">&#10003;</span> // Checkmark icon
                      ) : (
                        <span className="text-gray-500 font-bold">1</span>
                      )}
                    </div>
                  </div>
                  <p
                  className={`mt-2 text-sm ${
                    components >= 1 ?  "text-color" : "text-gray-500"
                  }`}
                  >
                    Persönliches
                  </p>
                </li>

                {/* Line Between Steps */}
                <li className="flex-1">
                  <div
                    className={`h-[2px] mb-6 ${
                      components >= 2 ? "border-color" : "bg-gray-300"
                    }`}
                  ></div>
                </li>

                {/* Step 2 */}
                <li className="flex flex-col items-center">
                <div
                    className={`rounded-full w-10 h-10 flex items-center justify-center ${
                      components >= 2
                        ? "color-border border-2 border-yellow-500 p-1"
                        : "p-1"
                    }`}
                  >

                  <div
                    className={`${
                      components >= 2 ? "color-circle" : "color-circle-grey"
                    } flex items-center justify-center`}
                  >
                    {components >= 2 ? (
                      <span className="text-white font-bold">&#10003;</span> // Checkmark icon
                    ) : (
                      <span className="text-gray-500 font-bold"></span> // Fallback number
                    )}
                  </div>

                  
                  </div>
                  <p
                    className={`mt-2  text-sm ${
                      components >= 2 ? "text-color" : "text-gray-500"
                    }`}
                  >
                  Anschreiben
                  </p>
                </li>

                {/* Line Between Steps */}
                <li className="flex-1">
                  <div
                    className={`h-[2px] mb-6 ${
                      components >= 3 ? "border-color" : "bg-gray-300"
                    }`}
                  ></div>
                </li>

                {/* Step 3 */}
                <li className="flex flex-col items-center">
                <div
                    className={`rounded-full w-10 h-10 flex items-center justify-center ${
                      components >= 3
                        ? "color-border border-2 border-yellow-500 p-1"
                        : "p-1"
                    }`}
                  >

                  <div
                    className={`${
                      components >= 3 ? "color-circle" : "color-circle-grey"
                    } flex items-center justify-center`}
                  >
                    {components >= 3 ? (
                      <span className="text-white font-bold">&#10003;</span> // Checkmark icon
                    ) : (
                      <span className="text-gray-500 font-bold"></span> // Fallback number
                    )}
                  </div>

                  
                  </div>
                  <p
                    className={`mt-2  text-sm ${
                      components >= 3 ? "text-color" : "text-gray-500"
                    }`}
                  >
                    Uploads
                  </p>
                </li>
            </ul>

          </div>

        <div className="py-8">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <form
              className={`${styles["form-paddingt"]} `}
              onSubmit={handleSubmit}
              encType="multipart/form-data"
            >
              {components === 1 && (
                <StepOne                 
                  vorname={vorname}
                  nachname={nachname}
                  strabe={strabe}
                  postleitzahl={postleitzahl}
                  hausnummer={hausnummer}
                  ort={ort}
                  email={email}
                  inputfoto={inputfoto}
                  showinputfoto = {showinputfoto}
                  setinputfoto={setinputfoto}
                  phonenumber={phonenumber}
                  setPhoneNumber={setPhoneNumber}
                  geburtsdatum={geburtsdatum}
                  ausgeubterBeruf={ausgeubterBeruf}
                  arbeitgeber={arbeitgeber}
                  income={income}
                  employment={employment}
                  profession={profession}
                  bwaimages={bwaimages}
                  setBwaimages={setBwaimages}
                  einkommensbescheinigungimg={einkommensbescheinigungimg}
                  seteinkommensbescheinigungimg={seteinkommensbescheinigungimg}
                  pets={pets}
                  rentarea={rentarea}
                  proceedings={proceedings}
                  apartment={apartment}
                  salarySlip={salarySlip}
                  salarySlip1={salarySlip1}
                  salarySlip2={salarySlip2}
                  salarySlip3={salarySlip3}
                  employcontract={employcontract}
                  setemploycontract={setemploycontract}
                  setsalarySlip={setsalarySlip}
                  setSalarySlip1={setSalarySlip1}
                  setSalarySlip2={setSalarySlip2}
                  setSalarySlip3={setSalarySlip3}
                  setComponents={setComponents}
                  handleChange={handleChange}
                  currentStep={currentStep}
                  setCurrentStep={setCurrentStep}
                />
              )}
              {components === 2 && (
                <Steptwo
                  coverletter={coverletter}
                  handleChange={handleChange}
                  setComponents={setComponents}
                  currentStep={currentStep}
                  setCurrentStep={setCurrentStep}
                />
              )}
              {components === 3 && (
                <Stepthree
                  fläche={fläche}
                  imageswbs={imageswbs}
                  setImageswbs ={setImageswbs}
                  personal={personal}
                  setPersonal ={setPersonal}
                  schufa ={schufa}
                  setSchufa ={setSchufa}
                  zimerzahl={zimerzahl}
                  mietschuldenfreiheit={mietschuldenfreiheit}
                  mietverhaltnis={mietverhaltnis}
                  mietschuldenfreiheitimg ={mietschuldenfreiheitimg}
                  setMietschuldenfreiheitimg ={setMietschuldenfreiheitimg}
                  currentStep={currentStep}
                  firstname={firstname}
                  lastname={lastname}
                  email2={email2}
                  setCurrentStep={setCurrentStep}
                  handleChange={handleChange}
                  setComponents={setComponents}
                />
              )}
             
            </form>
          </div>
          </div>
          </div>
      
      
    </>
  );
};

export default application;
