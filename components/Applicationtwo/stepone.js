import { useState, useRef, useEffect } from "react";
import React from "react";
import styles from "../../styles/form.module.css";
import SignatureCanvas from "react-signature-canvas";
import html2canvas from "html2canvas";
import PdfDesignPage1 from "../PdfDesignPage1";

const stepone = ({
  vorname,
  nachname,
  strabe,
  hausnummer,
  PLZ,
  Ort,
  email,
  tel,
  geburtsdatum,
  ausgeübterBeruf,
  arbeitgeber,
  income,
  photo,
  textarea1,
  textarea2,
  textarea3,
  textarea4,
  textarea5,
  setTextarea1,
  setTextarea2,
  setTextarea3,
  setTextarea4,
  setTextarea5,
  handleChange,
  selectedImg,
  setComponents,
  setSignatureData,
  setApplicationimg,

  vorname2,
  nachname2,
  strabe2,
  hausnummer2,
  PLZ2,
  Ort2,
  email2,
  tel2,
  geburtsdatum2,
  ausgeübterBeruf2,
  arbeitgeber2,
  income2,
  photo2,
  textarea1_t2,
  textarea2_t2,
  textarea3_t2,
  textarea4_t2,
  textarea5_t2,
  setTextarea1_2,
  setTextarea2_2,
  setTextarea3_2,
  setTextarea4_2,
  setTextarea5_2,
  selectedImg2,
  setSignatureData2,
 
}) => {
  const sigCanvas = useRef(null);
  const sigCanvas2 = useRef(null);
  const [canvasWidth, setCanvasWidth] = useState(800); // Default width, could be any reasonable value
  
  const [selectedRadio1, setSelectedRadio1] = useState(false);
  const [selectedRadio2, setSelectedRadio2] = useState(false);
  const [selectedRadio3, setSelectedRadio3] = useState(false);
  const [selectedRadio4, setSelectedRadio4] = useState(false);
  const [selectedRadio5, setSelectedRadio5] = useState(false);

  const [selectedRadio1_2, setSelectedRadio1_2] = useState(false);
  const [selectedRadio2_2, setSelectedRadio2_2] = useState(false);
  const [selectedRadio3_2, setSelectedRadio3_2] = useState(false);
  const [selectedRadio4_2, setSelectedRadio4_2] = useState(false);
  const [selectedRadio5_2, setSelectedRadio5_2] = useState(false);

  const [errors, setErrors] = useState({});

  useEffect(() => {
    const updateCanvasWidth = () => {
      if (typeof window !== "undefined") {
        setCanvasWidth(window.innerWidth * 0.47);
      }
    };
    if(textarea1) setSelectedRadio1('Ja');
    if(textarea2) setSelectedRadio2('Ja');
    if(textarea3) setSelectedRadio3('Ja');
    if(textarea4) setSelectedRadio4('Ja');
    if(textarea5) setSelectedRadio5('Ja');
    if(textarea1_t2) setSelectedRadio1_2('Ja');
    if(textarea2_t2) setSelectedRadio2_2('Ja');
    if(textarea3_t2) setSelectedRadio3_2('Ja');
    if(textarea4_t2) setSelectedRadio4_2('Ja');
    if(textarea5_t2) setSelectedRadio5_2('Ja');
    

    updateCanvasWidth(); // Set initial width

    window.addEventListener("resize", updateCanvasWidth);
    return () => {
      window.removeEventListener("resize", updateCanvasWidth);
    };
  }, [textarea1,textarea2,textarea3,textarea4,textarea5, textarea1_t2, textarea2_t2, textarea3_t2, textarea4_t2, textarea5_t2]);

  const clearSignature = (e) => {
    e.preventDefault(); // Prevent form submission
    sigCanvas.current.clear();
  };

  const clearSignature2 = (e) => {
    e.preventDefault(); // Prevent form submission
    sigCanvas2.current.clear();
  };
  const handleBegin = () => {
    // Hide the placeholder when the user begins drawing
    document.getElementById("placeholder").style.display = "none";
  };

 

  const handleBegin2 = () => {
    // Hide the placeholder when the user begins drawing
    document.getElementById("placeholder2").style.display = "none";
  };



  const radiohandle = (value, id) => {
    if (id === "r1") {
      if (id === "r1" && value === "Ja") {
        setSelectedRadio1(value);
      } else {
        setSelectedRadio1(value);
        setTextarea1('');
      }
    }
    if (id === "r2") {
      if (id === "r2" && value === "Ja") {
        setSelectedRadio2(value);
      } else {
        setSelectedRadio2(value);
        setTextarea2('');
      }
    }
    if (id === "r3") {
      if (id === "r3" && value === "Ja") {
        setSelectedRadio3(value);
      } else {
        setSelectedRadio3(value);
        setTextarea3('');
      }
    }
    if (id === "r4") {
      if (id === "r4" && value === "Ja") {
        setSelectedRadio4(value);
      } else {
        setSelectedRadio4(value);
        setTextarea4('');
      }
    }
    if (id === "r5") {
      if (id === "r5" && value === "Ja") {
        setSelectedRadio5(value);
      } else {
        setSelectedRadio5(value);
        setTextarea5('');
      }
    }
    if (id === "r1_2") {
      if (id === "r1_2" && value === "Ja") {
        setSelectedRadio1_2(value);
      } else {
        setSelectedRadio1_2(value);
        setTextarea1_2('');
      }
    }
    if (id === "r2_2") {
      if (id === "r2_2" && value === "Ja") {
        setSelectedRadio2_2(value);
      } else {
        setSelectedRadio2_2(value);
        setTextarea2_2('');
      }
    }
    if (id === "r3_2") {
      if (id === "r3_2" && value === "Ja") {
        setSelectedRadio3_2(value);
      } else {
        setSelectedRadio3_2(value);
        setTextarea3_2('');
      }
    }
    if (id === "r4_2") {
      if (id === "r4_2" && value === "Ja") {
        setSelectedRadio4_2(value);
      } else {
        setSelectedRadio4_2(value);
        setTextarea4_2('');
      }
    }
    if (id === "r5_2") {
      if (id === "r5_2" && value === "Ja") {
        setSelectedRadio5_2(value);
      } else {
        setSelectedRadio5_2(value);
        setTextarea5_2('');
      }
    }
  };

  function dataURLtoFile(dataURL, filename) {
    const arr = dataURL.split(",");
    const mime = arr[0].match(/:(.*?);/)[1];
    const bstr = atob(arr[1]);
    let n = bstr.length;
    const u8arr = new Uint8Array(n);
    while (n--) {
      u8arr[n] = bstr.charCodeAt(n);
    }
    return new File([u8arr], filename, { type: mime });
  }


  const validation = async () => {
    await html2canvas(document.getElementById("captureComponent")).then(
      (canvas) => {
        // Convert canvas to data URL
        var data = canvas.toDataURL();

        // Convert data URL to File object
        const selectedFile = dataURLtoFile(data, "applicationInput.png");

        // Set the captured image file to state
        setApplicationimg(selectedFile);

        // Get the file input element
        const applicationInput = document.getElementById("applicationInput");

        // Create a new FileList object with the selected file
        const fileList = new DataTransfer();
        fileList.items.add(selectedFile);

        // Set the file input value to the selected file
        applicationInput.files = fileList.files;
      }
    );
    
 
    if (sigCanvas.current.isEmpty()) {
      // console.log("Signature pad is empty");
    } else {
      const data = sigCanvas.current.getTrimmedCanvas().toDataURL("image/png");
      const selectedFile = dataURLtoFile(data, "signature.png");
      const fileInput = document.getElementById("fileInput");
  
      // Create a new FileList object with the selected file
      const fileList = new DataTransfer();
      fileList.items.add(selectedFile);
      fileInput.files = fileList.files;
      setSignatureData(selectedFile);
      // console.log("Signature pad is not empty");
    }
     // Handle the second signature pad (fileInput_2)
  if (sigCanvas2.current && !sigCanvas2.current.isEmpty()) {
    const data2 = sigCanvas2.current
      .getTrimmedCanvas()
      .toDataURL("image/png");

    const selectedFile2 = dataURLtoFile(data2, "signature_2.png");

    const fileInput2 = document.getElementById("fileInput_2");

    // Create a new FileList object with the selected file
    const fileList2 = new DataTransfer();
    fileList2.items.add(selectedFile2);
    fileInput2.files = fileList2.files;

    setSignatureData2(selectedFile2);
    // console.log("Second signature pad is not empty");
  }

    setComponents(2);

    const newErrors = {};

    if (!vorname) newErrors.vorname = "Vorname is required";
    if (!nachname) newErrors.nachname = "Nachname is required";
    if (!strabe) newErrors.strabe = "Straße is required";
    if (!hausnummer) newErrors.hausnummer = "Hausnummer is required";
    if (!PLZ) newErrors.PLZ = "PLZ is required";
    if (!Ort) newErrors.Ort = "Ort is required";
    if (!email) newErrors.email = "E-Mail is required";
    if (!tel) newErrors.tel = "Tel. Mobil is required";
    if (!geburtsdatum) newErrors.geburtsdatum = "Geburtsdatum is required";
    if (!ausgeübterBeruf)
      newErrors.ausgeübterBeruf = "Ausgeübter Beruf is required";
    if (!arbeitgeber) newErrors.arbeitgeber = "Arbeitgeber is required";
    if (!income)
      newErrors.income =
        "Höhe des monatlichen verfügbaren Nettoeinkommens (€) is required";

    setErrors(newErrors);

    if (Object.keys(newErrors).length === 0) {
      setComponents(2);
    }
  };

  
  return (
    <div className="grid grid-cols-5 gap-4">
      <div className="col-span-3">
        <div className="ten1">
        <h1 className={`${styles["form1-heading"]} mt-4 mb-7`}>
          Persönliche Daten: Mieter 1
        </h1>
        <div className="grid grid-cols-2 gap-4 mt-3 mb-3">
          <div className="...">
            <div className="input-field">
              <input
                type="text"
                className={`${styles["form-input"]} form-input `}
                id="vorname"
                name="vorname"
                placeholder="Vorname"
                value={vorname}
                onChange={handleChange}
              />
              {errors.vorname && (
                <div className={` ${styles["error"]} color-red `}>
                  {errors.vorname}
                </div>
              )}
            </div>
          </div>
          <div className="...">
            <div className="input-field">
              <input
                type="text"
                className={`${styles["form-input"]} form-input `}
                id="nachname"
                name="nachname"
                placeholder="Nachname"
                value={nachname}
                onChange={handleChange}
              />
              {errors.nachname && (
                <div className={` ${styles["error"]} color-red `}>
                  {errors.nachname}
                </div>
              )}
            </div>
          </div>
        </div>
        <div className="grid grid-cols-1 gap-4 mt-5">
          <div className="...">
            <div className={`${styles["file-input-container"]} col-span-full`}>
              <label htmlFor="inputfoto" className={`${styles["file-label"]} `}>
                Foto
              </label>
              <div className={`${styles["file-input-wrapper"]}  `}>
                <input
                  type="file"
                  className={styles["file-input2"]}
                  id="photo"
                  name="photo"
                  onChange={handleChange}
                  placeholder="1234 Main St"
                />
                <img
                  src={`\ ${selectedImg}`}
                  alt="Description of the image"
                  width={37}
                  height={37}
                  className={styles["file-icon"]}
                />
              </div>
              <input
                type="text"
                className={`${styles["form-input"]}  `}
                readOnly
                placeholder="Wählen Sie eine Datei aus oder ziehen Sie sie hierher"
              />
            </div>
          </div>
        </div>
        <div className="grid grid-cols-6 gap-4 mt-7">
          <div className="col-span-5 ...">
            <input
              type="text"
              className={`${styles["form-input"]} form-control `}
              id="strabe"
              name="strabe"
              placeholder="Straße"
              value={strabe}
              onChange={handleChange}
            />
          </div>
          <div className="col-span-1 ...">
            <input
              type="text"
              className={`${styles["form-input"]} form-control `}
              id="hausnummer"
              name="hausnummer"
              placeholder="Hausnummer"
              value={hausnummer}
              onChange={handleChange}
            />
          </div>
        </div>
        <div className="grid grid-cols-6 gap-4 mt-7">
          <div className="col-span-1...">
            <input
              type="text"
              className={`${styles["form-input"]} form-control `}
              id="PLZ"
              name="PLZ"
              placeholder="PLZ"
              value={PLZ}
              onChange={handleChange}
            />
          </div>
          <div className="col-span-5 ...">
            <input
              type="text"
              className={`${styles["form-input"]} form-control `}
              id="Ort"
              name="Ort"
              placeholder="Ort"
              value={Ort}
              onChange={handleChange}
            />
          </div>
        </div>
        <div className="grid grid-cols-1 gap-4 mt-5">
          <div className="...">
            <input
              type="email"
              className={`${styles["form-input"]} form-control `}
              id="email"
              name="email"
              placeholder="E-Mail"
              value={email}
              onChange={handleChange}
            />
          </div>
        </div>
        <div className="grid grid-cols-1 gap-4 mt-5">
          <div className="...">
            <input
              type="tel"
              className={`${styles["form-input"]} form-control `}
              id="tel"
              name="tel"
              placeholder="Tel. Mobil"
              value={tel}
              onChange={handleChange}
            />
          </div>
        </div>
        <div className="grid grid-cols-1 gap-4 mt-5">
          <div className="...">
            <input
              type="date"
              className={`${styles["form-input"]} form-control `}
              id="geburtsdatum"
              name="geburtsdatum"
              placeholder="Geburtsdatum"
              value={geburtsdatum}
              onChange={handleChange}
            />
          </div>
        </div>
        <div className="grid grid-cols-2 gap-4 mt-5">
          <div className="...">
            <div className="input-field">
              <input
                type="text"
                className={`${styles["form-input"]} form-input `}
                id="ausgeübterBeruf"
                name="ausgeübterBeruf"
                placeholder="Ausgeübter Beruf"
                value={ausgeübterBeruf}
                onChange={handleChange}
              />
            </div>
          </div>
          <div className="...">
            <div className="input-field">
              <input
                type="text"
                className={`${styles["form-input"]} form-input `}
                id="arbeitgeber"
                name="arbeitgeber"
                placeholder="Arbeitgeber"
                value={arbeitgeber}
                onChange={handleChange}
              />
            </div>
          </div>
        </div>
        <div className="grid grid-cols-1 gap-4 mt-5">
          <div className="...">
            <input
              type="number"
              className={`${styles["form-input"]} form-control `}
              id="income"
              name="income"
              placeholder="Höhe des monatlichen verfügbaren Nettoeinkommens (€)"
              value={income}
              onChange={handleChange}
            />
          </div>
        </div>
        <div className="grid grid-cols-8 gap-4 mt-5">
          <div className="col-span-6 ...">
            <p className={`${styles["form-input"]} form-control label-text `}>
              Besteht dein Beschäftigungsverhältnis länger als 6 Monate?
            </p>
            <textarea
              id="textarea1"
              name="textarea1"
              value={textarea1}
              onChange={handleChange}
              rows="5"
              placeholder="Enter your text here"
              className={`${
                selectedRadio1 === "Ja" ? "block" : "hidden"
              } w-full mt-5 p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500`}
            />
          </div>
          <div className="col-span-1 flex items-baseline">
           
            <label
              className={` ${styles["form-check-label"]} ${
                styles["radio-btn"]
              } ${selectedRadio1 === "Ja" ? styles["black"] : ""}`}
              onClick={() => radiohandle("Ja", "r1")}
              htmlFor="employee1"
            >
              Ja
            </label>
          </div>
          <div className="col-span-1 flex items-baseline">
           
            <label
              className={`${styles["form-check-label"]} ${
                styles["radio-btn"]
              } ${selectedRadio1 === "Nein" ? styles["black"] : ""}`}
              onClick={() => radiohandle("Nein", "r1")}
              htmlFor="employee2"
            >
              Nein
            </label>
          </div>
        </div>
        <div className="grid grid-cols-8 gap-4 mt-5">
          <div className="col-span-6">
            <p className={`${styles["form-input"]} form-control label-text `}>
              Sollen außer ihnen noch weitere Personen die Wohnung beziehen?
            </p>
            <textarea
              id="textarea2"
              name="textarea2"
              value={textarea2}
              onChange={handleChange}
              rows="5"
              placeholder="Enter your text here"
              className={`${
                selectedRadio2 === "Ja" ? "block" : "hidden"
              } w-full mt-5 p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500`}
            />
          </div>
          <div className="col-span-1 flex items-baseline">
            
            <label
              className={`${styles["form-check-label"]} ${
                styles["radio-btn"]
              } ${styles["radio-btn"]} ${
                selectedRadio2 === "Ja" ? styles["black"] : ""
              }`}
              onClick={() => radiohandle("Ja", "r2")}
              htmlFor="moveappartment1"
            >
              Ja
            </label>
          </div>
          <div className="col-span-1 flex items-baseline">
           
            <label
              className={`${styles["form-check-label"]} ${
                styles["radio-btn"]
              } ${styles["radio-btn"]} ${
                selectedRadio2 === "Nein" ? styles["black"] : ""
              }`}
              onClick={() => radiohandle("Nein", "r2")}
              htmlFor="moveappartment2"
            >
              Nein
            </label>
          </div>
        </div>
        <div className="grid grid-cols-8 gap-4 mt-5">
          <div className="col-span-6 ...">
            <p className={`${styles["form-input"]} form-control label-text `}>
              Bestehen Mietrückstände aus bisherigen Mietverhältnissen?
            </p>
            <textarea
              id="textarea3"
              name="textarea3"
              value={textarea3}
              onChange={handleChange}
              rows="5"
              placeholder="Enter your text here"
              className={`${
                selectedRadio3 === "Ja" ? "block" : "hidden"
              } w-full mt-5 p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500`}
            />
          </div>
          <div className="col-span-1 flex items-baseline">
           
            <label
              className={`${styles["form-check-label"]} ${
                styles["radio-btn"]
              } ${selectedRadio3 === "Ja" ? styles["black"] : ""}`}
              onClick={() => radiohandle("Ja", "r3")}
              htmlFor="rentareas1"
            >
              Ja
            </label>
          </div>
          <div className="col-span-1 flex items-baseline">
           
            <label
              className={`${styles["form-check-label"]} ${
                styles["radio-btn"]
              } ${selectedRadio3 === "Nein" ? styles["black"] : ""}`}
              onClick={() => radiohandle("Nein", "r3")}
              htmlFor="rentareas2"
            >
              Nein
            </label>
          </div>
        </div>
        <div className="grid grid-cols-8 gap-4 mt-5">
          <div className="col-span-6 ...">
            <p className={`${styles["form-input"]} form-control label-text `}>
              Wurde in den letzten 5 Jahren Insolvenzverfahren gegen Sie
              eröffnet?
            </p>
            <textarea
              id="textarea4"
              name="textarea4"
              value={textarea4}
              onChange={handleChange}
              rows="5"
              placeholder="Enter your text here"
              className={`${
                selectedRadio4 === "Ja" ? "block" : "hidden"
              } w-full mt-5 p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500`}
            />
          </div>
          <div className="col-span-1 flex items-baseline">
          
            <label
              className={`${styles["form-check-label"]} ${
                styles["radio-btn"]
              } ${selectedRadio4 === "Ja" ? styles["black"] : ""}`}
              onClick={() => radiohandle("Ja", "r4")}
              htmlFor="proceedings1"
            >
              Ja
            </label>
          </div>
          <div className="col-span-1 flex items-baseline">
          
            <label
              className={`${styles["form-check-label"]} ${
                styles["radio-btn"]
              } ${selectedRadio4 === "Nein" ? styles["black"] : ""}`}
              onClick={() => radiohandle("Nein", "r4")}
              htmlFor="proceedings2"
            >
              Nein
            </label>
          </div>
        </div>
        <div className="grid grid-cols-8 gap-4 mt-5">
          <div className="col-span-6 ...">
            <p className={`${styles["form-input"]} form-control label-text `}>
              Ist eine gewerbliche Nutzung der Wohnung beabsichtigt?
            </p>
            <textarea
              id="textarea5"
              name="textarea5"
              value={textarea5}
              onChange={handleChange}
              rows="5"
              placeholder="Enter your text here"
              className={`${
                selectedRadio5 === "Ja" ? "block" : "hidden"
              } w-full mt-5 p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500`}
            />
          </div>
          <div className="col-span-1 flex items-baseline">
            
            <label
              className={`${styles["form-check-label"]} ${
                styles["radio-btn"]
              } ${selectedRadio5 === "Ja" ? styles["black"] : ""}`}
              onClick={() => radiohandle("Ja", "r5")}
              htmlFor="apartmentintended1"
            >
              Ja
            </label>
          </div>
          <div className="col-span-1 flex items-baseline">
           
            <label
              className={`${styles["form-check-label"]} ${
                styles["radio-btn"]
              } ${selectedRadio5 === "Nein" ? styles["black"] : ""}`}
              onClick={() => radiohandle("Nein", "r5")}
              htmlFor="apartmentintended2"
            >
              Nein
            </label>
          </div>
        </div>
        

        <div className={`${styles["sign-div"]} `}>
          <div
            className={`${styles["sign-canvas"]} `}
            style={{ position: "relative" }}
          >
            <div
              id="placeholder"
              className={styles["placeholder"]}
              style={{
                position: "absolute",
                top: 0,
                left: 0,
                width: "100%",
                height: "100%",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                pointerEvents: "none",
                color: "gray",
                fontSize: "20px",
                zIndex: 1,
              }}
            >
              Sign here
            </div>
            <SignatureCanvas
              ref={sigCanvas}
              penColor="black"
              minWidth={1}
              maxWidth={1}
              onBegin={handleBegin}
             
              canvasProps={{
                width: canvasWidth,
                height: 100,
                className: "sigCanvas",
                name: "signature",
              }}
            />
          </div>
          <button
            type="button"
            className={`${styles["sign-btn"]} `}
            onClick={clearSignature}
          >
            Clear
          </button>
          <input
            type="file"
            id="fileInput"
            onChange={handleChange}
            className="hidden"
            name="signature"
          />
          <input
            type="file"
            id="applicationInput"
            onChange={handleChange}
            className="hidden"
            name="application"
          />
        </div>
       
        </div>
        <div className="ten2">
        <h1 className={`${styles["form1-heading"]} mt-4 mb-7`}>
          Persönliche Daten: Mieter 2
        </h1>
        <div className="grid grid-cols-2 gap-4 mt-3 mb-3">
          <div className="...">
            <div className="input-field">
              <input
                type="text"
                className={`${styles["form-input"]} form-input `}
                id="vorname2"
                name="vorname2"
                placeholder="vorname"
                value={vorname2}
                onChange={handleChange}
              />
              {errors.vorname2 && (
                <div className={` ${styles["error"]} color-red `}>
                  {errors.vorname2}
                </div>
              )}
            </div>
          </div>
          <div className="...">
            <div className="input-field">
              <input
                type="text"
                className={`${styles["form-input"]} form-input `}
                id="nachname2"
                name="nachname2"
                placeholder="nachname"
                value={nachname2}
                onChange={handleChange}
              />
              {errors.nachname2 && (
                <div className={` ${styles["error"]} color-red `}>
                  {errors.nachname2}
                </div>
              )}
            </div>
          </div>
        </div>
        <div className="grid grid-cols-1 gap-4 mt-5">
          <div className="...">
            <div className={`${styles["file-input-container"]} col-span-full`}>
              <label htmlFor="inputfoto" className={`${styles["file-label"]} `}>
                Foto
              </label>
              <div className={`${styles["file-input-wrapper"]}  `}>
                <input
                  type="file"
                  className={styles["file-input2"]}
                  id="photo2"
                  name="photo2"
                  onChange={handleChange}
                  placeholder="1234 Main St"
                />
                <img
                  src={`\ ${selectedImg2}`}
                  alt="Description of the image"
                  width={37}
                  height={37}
                  className={styles["file-icon"]}
                />
              </div>
              <input
                type="text"
                className={`${styles["form-input"]}  `}
                readOnly
                placeholder="Wählen Sie eine Datei aus oder ziehen Sie sie hierher"
              />
            </div>
          </div>
        </div>
        <div className="grid grid-cols-6 gap-4 mt-7">
          <div className="col-span-5 ...">
            <input
              type="text"
              className={`${styles["form-input"]} form-control `}
              id="strabe2"
              name="strabe2"
              placeholder="Straße"
              value={strabe2}
              onChange={handleChange}
            />
          </div>
          <div className="col-span-1 ...">
            <input
              type="text"
              className={`${styles["form-input"]} form-control `}
              id="hausnummer2"
              name="hausnummer2"
              placeholder="hausnummer2"
              value={hausnummer2}
              onChange={handleChange}
            />
          </div>
        </div>
        <div className="grid grid-cols-6 gap-4 mt-7">
          <div className="col-span-1...">
            <input
              type="text"
              className={`${styles["form-input"]} form-control `}
              id="PLZ2"
              name="PLZ2"
              placeholder="PLZ"
              value={PLZ2}
              onChange={handleChange}
            />
          </div>
          <div className="col-span-5 ...">
            <input
              type="text"
              className={`${styles["form-input"]} form-control `}
              id="Ort2"
              name="Ort2"
              placeholder="Ort"
              value={Ort2}
              onChange={handleChange}
            />
          </div>
        </div>
        <div className="grid grid-cols-1 gap-4 mt-5">
          <div className="...">
            <input
              type="email2"
              className={`${styles["form-input"]} form-control `}
              id="email2"
              name="email2"
              placeholder="E-Mail"
              value={email2}
              onChange={handleChange}
            />
          </div>
        </div>
        <div className="grid grid-cols-1 gap-4 mt-5">
          <div className="...">
            <input
              type="tel2"
              className={`${styles["form-input"]} form-control `}
              id="tel2"
              name="tel2"
              placeholder="tel. Mobil"
              value={tel2}
              onChange={handleChange}
            />
          </div>
        </div>
        <div className="grid grid-cols-1 gap-4 mt-5">
          <div className="...">
            <input
              type="date"
              className={`${styles["form-input"]} form-control `}
              id="geburtsdatum2"
              name="geburtsdatum2"
              placeholder="geburtsdatum2"
              value={geburtsdatum2}
              onChange={handleChange}
            />
          </div>
        </div>
        <div className="grid grid-cols-2 gap-4 mt-5">
          <div className="...">
            <div className="input-field">
              <input
                type="text"
                className={`${styles["form-input"]} form-input `}
                id="ausgeübterBeruf2"
                name="ausgeübterBeruf2"
                placeholder="Ausgeübter Beruf"
                value={ausgeübterBeruf2}
                onChange={handleChange}
              />
            </div>
          </div>
          <div className="...">
            <div className="input-field">
              <input
                type="text"
                className={`${styles["form-input"]} form-input `}
                id="arbeitgeber2"
                name="arbeitgeber2"
                placeholder="arbeitgeber"
                value={arbeitgeber2}
                onChange={handleChange}
              />
            </div>
          </div>
        </div>
        <div className="grid grid-cols-1 gap-4 mt-5">
          <div className="...">
            <input
              type="number"
              className={`${styles["form-input"]} form-control `}
              id="income2"
              name="income2"
              placeholder="Höhe des monatlichen verfügbaren Nettoeinkommens (€)"
              value={income2}
              onChange={handleChange}
            />
          </div>
        </div>
        <div className="grid grid-cols-8 gap-4 mt-5">
          <div className="col-span-6 ...">
            <p className={`${styles["form-input"]} form-control label-text `}>
              Besteht dein Beschäftigungsverhältnis länger als 6 Monate?
            </p>
            <textarea
              id="textarea1_t2"
              name="textarea1_t2"
              value={textarea1_t2}
              onChange={handleChange}
              rows="5"
              placeholder="Enter your text here"
              className={`${
                selectedRadio1_2 === "Ja" ? "block" : "hidden"
              } w-full mt-5 p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500`}
            />
          </div>
          <div className="col-span-1 flex items-baseline">
           
            <label
              className={` ${styles["form-check-label"]} ${
                styles["radio-btn"]
              } ${selectedRadio1_2 === "Ja" ? styles["black"] : ""}`}
              onClick={() => radiohandle("Ja", "r1_2")}
              htmlFor="employee1_2"
            >
              Ja
            </label>
          </div>
          <div className="col-span-1 flex items-baseline">
           
            <label
              className={`${styles["form-check-label"]} ${
                styles["radio-btn"]
              } ${selectedRadio1_2 === "Nein" ? styles["black"] : ""}`}
              onClick={() => radiohandle("Nein", "r1_2")}
              htmlFor="employee2_2"
            >
              Nein
            </label>
          </div>
        </div>
        <div className="grid grid-cols-8 gap-4 mt-5">
          <div className="col-span-6">
            <p className={`${styles["form-input"]} form-control label-text `}>
              Sollen außer ihnen noch weitere Personen die Wohnung beziehen?
            </p>
            <textarea
              id="textarea2_t2"
              name="textarea2_t2"
              value={textarea2_t2}
              onChange={handleChange}
              rows="5"
              placeholder="Enter your text here"
              className={`${
                selectedRadio2_2 === "Ja" ? "block" : "hidden"
              } w-full mt-5 p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500`}
            />
          </div>
          <div className="col-span-1 flex items-baseline">
           
            <label
              className={`${styles["form-check-label"]} ${
                styles["radio-btn"]
              } ${styles["radio-btn"]} ${
                selectedRadio2_2 === "Ja" ? styles["black"] : ""
              }`}
              onClick={() => radiohandle("Ja", "r2_2")}
              htmlFor="moveappartment1_2"
            >
              Ja
            </label>
          </div>
          <div className="col-span-1 flex items-baseline">
           
            <label
              className={`${styles["form-check-label"]} ${
                styles["radio-btn"]
              } ${styles["radio-btn"]} ${
                selectedRadio2_2 === "Nein" ? styles["black"] : ""
              }`}
              onClick={() => radiohandle("Nein", "r2_2")}
              htmlFor="moveappartment2_2"
            >
              Nein
            </label>
          </div>
        </div>
        <div className="grid grid-cols-8 gap-4 mt-5">
          <div className="col-span-6 ...">
            <p className={`${styles["form-input"]} form-control label-text `}>
              Bestehen Mietrückstände aus bisherigen Mietverhältnissen?
            </p>
            <textarea
              id="textarea3_t2"
              name="textarea3_t2"
              value={textarea3_t2}
              onChange={handleChange}
              rows="5"
              placeholder="Enter your text here"
              className={`${
                selectedRadio3_2 === "Ja" ? "block" : "hidden"
              } w-full mt-5 p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500`}
            />
          </div>
          <div className="col-span-1 flex items-baseline">
          
            <label
              className={`${styles["form-check-label"]} ${
                styles["radio-btn"]
              } ${selectedRadio3_2 === "Ja" ? styles["black"] : ""}`}
              onClick={() => radiohandle("Ja", "r3_2")}
              htmlFor="rentareas1_2"
            >
              Ja
            </label>
          </div>
          <div className="col-span-1 flex items-baseline">
            
            <label
              className={`${styles["form-check-label"]} ${
                styles["radio-btn"]
              } ${selectedRadio3_2 === "Nein" ? styles["black"] : ""}`}
              onClick={() => radiohandle("Nein", "r3_2")}
              htmlFor="rentareas2_2"
            >
              Nein
            </label>
          </div>
        </div>
        <div className="grid grid-cols-8 gap-4 mt-5">
          <div className="col-span-6 ...">
            <p className={`${styles["form-input"]} form-control label-text `}>
              Wurde in den letzten 5 Jahren Insolvenzverfahren gegen Sie
              eröffnet?
            </p>
            <textarea
              id="textarea4_t2"
              name="textarea4_t2"
              value={textarea4_t2}
              onChange={handleChange}
              rows="5"
              placeholder="Enter your text here"
              className={`${
                selectedRadio4_2 === "Ja" ? "block" : "hidden"
              } w-full mt-5 p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500`}
            />
          </div>
          <div className="col-span-1 flex items-baseline">
           
            <label
              className={`${styles["form-check-label"]} ${
                styles["radio-btn"]
              } ${selectedRadio4_2 === "Ja" ? styles["black"] : ""}`}
              onClick={() => radiohandle("Ja", "r4_2")}
              htmlFor="proceedings1_2"
            >
              Ja
            </label>
          </div>
          <div className="col-span-1 flex items-baseline">
           
            <label
              className={`${styles["form-check-label"]} ${
                styles["radio-btn"]
              } ${selectedRadio4_2 === "Nein" ? styles["black"] : ""}`}
              onClick={() => radiohandle("Nein", "r4_2")}
              htmlFor="proceedings2_2"
            >
              Nein
            </label>
          </div>
        </div>
        <div className="grid grid-cols-8 gap-4 mt-5">
          <div className="col-span-6 ...">
            <p className={`${styles["form-input"]} form-control label-text `}>
              Ist eine gewerbliche Nutzung der Wohnung beabsichtigt?
            </p>
            <textarea
              id="textarea5_t2"
              name="textarea5_t2"
              value={textarea5_t2}
              onChange={handleChange}
              rows="5"
              placeholder="Enter your text here"
              className={`${
                selectedRadio5_2 === "Ja" ? "block" : "hidden"
              } w-full mt-5 p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500`}
            />
          </div>
          <div className="col-span-1 flex items-baseline">
            
            <label
              className={`${styles["form-check-label"]} ${
                styles["radio-btn"]
              } ${selectedRadio5_2 === "Ja" ? styles["black"] : ""}`}
              onClick={() => radiohandle("Ja", "r5_2")}
              htmlFor="apartmentintended1_2"
            >
              Ja
            </label>
          </div>
          <div className="col-span-1 flex items-baseline">
            
            <label
              className={`${styles["form-check-label"]} ${
                styles["radio-btn"]
              } ${selectedRadio5_2 === "Nein" ? styles["black"] : ""}`}
              onClick={() => radiohandle("Nein", "r5_2")}
              htmlFor="apartmentintended2_2"
            >
              Nein
            </label>
          </div>
        </div>
        

        <div className={`${styles["sign-div"]} `}>
          <div
            className={`${styles["sign-canvas"]} `}
            style={{ position: "relative" }}
          >
            <div
              id="placeholder2"
              className={styles["placeholder2"]}
              style={{
                position: "absolute",
                top: 0,
                left: 0,
                width: "100%",
                height: "100%",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                pointerEvents: "none",
                color: "gray",
                fontSize: "20px",
                zIndex: 1,
              }}
            >
              Sign here
            </div>
            <SignatureCanvas
              ref={sigCanvas2}
              penColor="black"
              minWidth={1}
              maxWidth={1}
              onBegin={handleBegin2}
              canvasProps={{
                width: canvasWidth,
                height: 100,
                className: "sigCanvas",
                name: "signature2",
              }}
            />
          </div>
          <button
            type="button"
            className={`${styles["sign-btn"]} `}
            onClick={clearSignature2}
          >
            Clear
          </button>
          <input
            type="file"
            id="fileInput_2"
            onChange={handleChange}
            className="hidden"
            name="signature_2"
          />
          <input
            type="file"
            id="applicationInput_2"
            onChange={handleChange}
            className="hidden"
            name="application_2"
          />
        </div>
        <div className="grid grid-cols-8 gap-4 mt-9">
          <div className="col-span-6 ..."></div>
          <div className="col-span-2 mt-9 ...">
            <input
              type="button"
              className={`${styles["form-input"]} form-control cursor-pointer `}
              id={`${styles["submit"]}`}
              value="Weiter"
              onClick={validation}
            />
          </div>
        </div>
        </div>
      </div>
      
      
      <div className="col-span-2">
        <PdfDesignPage1
          id="captureComponent"
          vorname={vorname}
          nachname={nachname}
          strabe={strabe}
          hausnummer={hausnummer}
          PLZ={PLZ}
          Ort={Ort}
          email={email}
          tel={tel}
          geburtsdatum={geburtsdatum}
          ausgeübterBeruf={ausgeübterBeruf}
          arbeitgeber={arbeitgeber}
          income={income}
          photo={photo}
          textarea1={textarea1}
          textarea2={textarea2}
          textarea3={textarea3}
          textarea4={textarea4}
          textarea5={textarea5}
          handleChange={handleChange}
          selectedImg={selectedImg}
          setComponents={setComponents}
          setSignatureData={setSignatureData}
          setApplicationimg={setApplicationimg}
          selectedRadio1={selectedRadio1}
          selectedRadio2={selectedRadio2}
          selectedRadio3={selectedRadio3}
          selectedRadio4={selectedRadio4}
          selectedRadio5={selectedRadio5}
        />
      </div>
    </div>
  );
};

export default stepone;
