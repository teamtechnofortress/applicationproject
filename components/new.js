import { useEffect, useState } from "react";
import PhoneInput from "react-phone-input-2";
import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css";
import "react-phone-input-2/lib/style.css";
import styles from "../styles/latest.module.css";



const FirstStep = ({
  vorname,
  nachname,
  strabe,
  postleitzahl,
  hausnummer,
  Ort,
  email,
  phonenumber,
  geburtsdatum: initialGeburtsdatum,
  ausgeubterBeruf,
  arbeitgeber,
  income,
  employment,
  pets,
  rentarea,
  proceedings,
  apartment,
  images,
  setComponents,
}) => {
  const [geburtsdatum, setGeburtsdatum] = useState(initialGeburtsdatum || ""); 
  const [currentStep, setCurrentStep] = useState(0);
  const [selectedRadio2, setSelectedRadio2] = useState(false);
  const [errors, setErrors] = useState({}); // To store validation errors
  const totalSteps = 9;
  const radiohandle = (value, id) => {
    if (id === "emp") {
      setEmployment(value); 
    }
    if (id === "pet") {
      setPets(value); 
    }
    if (id === "rentarea") {
      setRentarea(value); 
    }
    if (id === "proceedings") {
      setProceedings(value);  
    }
    if (id === "apartment") {
      setApartment(value);  
    }
  };
  const showStep = (stepIndex) => {
    if (validateStep(currentStep)) {
      setCurrentStep(stepIndex);
    }
  };
  useEffect(() => {
    const element = document.querySelector("#geburtsdatum");
    if (!element) return;

    // Initialize flatpickr
    const flatpickrInstance = flatpickr(element, {
      dateFormat: "Y-m-d", // Customize the date format as needed
      defaultDate: geburtsdatum, // Use the state for the default date
      onChange: (selectedDates, dateStr) => {
        setGeburtsdatum(dateStr); // Update the state with the selected date
      },
    });

    return () => {
      // Destroy the flatpickr instance safely
      if (flatpickrInstance && typeof flatpickrInstance.destroy === "function") {
        flatpickrInstance.destroy();
      }
    };
  }, [geburtsdatum]);
  const handleFileChange = (e) => {
    const files = Array.from(e.target.files);
    const imagePreviews = files.map((file) => URL.createObjectURL(file));
    setImages(imagePreviews);
  };
  const removeImage = (index) => {
    setImages(images.filter((_, i) => i !== index));
  };

  // Handle form input changes
  const handleChange = (e) => {
    console.log(e.target.value)
  
    const newErrors = {};

    if (!vorname) newErrors.vorname = "Vorname is required";
    if (!nachname) newErrors.nachname = "Nachname is required";
    if (!strabe) newErrors.strabe = "Straße is required";
    if (!postleitzahl) newErrors.postleitzahl = "Postleitzahl is required";
    if (!hausnummer) newErrors.hausnummer = "Hausnummer is required";
    if (!geburtsdatum) newErrors.geburtsdatum = "Geburtsdatum is required";
    if (!Ort) newErrors.Ort = "Ort is required";
    if (!income)
    newErrors.income =
      "Höhe des monatlichen verfügbaren Nettoeinkommens (€) is required";
      if (!email) newErrors.email = "E-Mail is required";
    if (!phonenumber) newErrors.geburtsdatum = "phonenumber is required";;
    if (!ausgeubterBeruf)
        newErrors.ausgeubterBeruf = "Ausgeübter Beruf is required";
    if (!arbeitgeber) newErrors.arbeitgeber = "Arbeitgeber is required";
    if (!employment) newErrors.employment = "Employment is required";
    if (!pets) newErrors.pets = "Pets is required";
    if (!rentarea) newErrors.Ort = "Rent Area is required";
    if (!proceedings) newErrors.proceedings = "Proceedings is required";
    if (!apartment) newErrors.apartment = "Apartment is required";
  
  };
  
  const validateStep = (step) => {
    const newErrors = {};
    if (step === 0) {
      if (!vorname.trim()) newErrors.vorname = "Vorname is required.";
      if (!nachname.trim()) newErrors.nachname = "Nachname is required.";
      if (!geburtsdatum.trim()) newErrors.geburtsdatum = "Geburtsdatum is required.";
    }
    if (step === 1) {
      if (!strabe.trim()) newErrors.strabe = "Address is required.";
      if (!postleitzahl.trim()) newErrors.postleitzahl = "Postleitzahl is required.";
      if (!hausnummer.trim()) newErrors.hausnummer = "Hausnummer is required.";
      if (!ort.trim()) newErrors.ort = "Ort is required.";
    }
    if (step === 2) {
      if (!email.trim()) newErrors.email = "Bitte geben Sie Ihre E-Mail-Adresse ein.";
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
        newErrors.email = "Bitte geben Sie eine gültige E-Mail-Adresse ein.";
      }
      if (!phonenumber.trim()) newErrors.phonenumber = "PhoneNumber is required.";
    }
    if (step === 3) {
      if (!ausgeubterBeruf.trim()) newErrors.ausgeubterBeruf = "Ausgeübter Beruf is required.";
      if (!arbeitgeber.trim()) newErrors.arbeitgeber = "Arbeitgeber is required.";
      if (!income.trim()) newErrors.income = "Monatliches is required.";
      if (!employment) newErrors.employment = "Employment status is required.";  
    }
    if (step === 5) {
      if (!pets) newErrors.pets = "Pets status is required.";  
    }
    if (step === 6) {
      if (!rentarea) newErrors.rentarea = "Rent Area status is required.";  
    }
    if (step === 7) {
      if (!proceedings) newErrors.proceedings = "proceedings status is required.";  
    }
    if (step === 8) {
      if (!apartment) newErrors.apartment = "Apartment status is required.";  
    }

    
    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  return (
    <div className="flex items-center justify-center">
      <div className="w-full bg-white shadow-lg rounded-lg p-6">
        {/* Progress Bar */}
        <div className="mb-6">
          <div className="w-full bg-gray-200 rounded-full h-2.5">
            <div
              className={`bg-blue-500 h-2.5 rounded-full ${styles["prgress-bar"]}`}
              style={{
                width: `${((currentStep + 1) / totalSteps) * 100}%`,
              }}
            ></div>
          </div>
         
        </div>

        {/* Step 1 */}
         {currentStep === 0 && (
          <div className="flex justify-center">
            <div className="w-full max-w-lg">
            <p className={`${styles["main-heading"]} mt-10 mb-10 text-center font-bold`}>
              Hey, wer bist du?
            </p>
              <div className="grid grid-cols-1 gap-4 mt-3 mb-3">
                <div>
                  <div className="input-field mt-2">
                    <input
                      type="text"
                      className={`${styles["form-input"]} form-input`}
                      id="vorname"
                      name="vorname"
                      placeholder="Vorname"
                      value={vorname}
                      onChange={handleChange}
                    />
                   
                  </div>
                  {errors.vorname && <p className="text-red-500 text-sm">{errors.vorname}</p>}

                  <div className="input-field mt-10">
                   
                    <input
                      type="text"
                      className={`${styles["form-input"]} form-input`}
                      id="nachname"
                      name="nachname"
                      placeholder="Nachname"
                      value={nachname}
                      onChange={handleChange}
                    />
                   
                  </div>
                  {errors.nachname && <p className="text-red-500 text-sm">{errors.nachname}</p>}

                  <p className="mt-10">geboren am</p>
                  <div className="input-field relative">
                    {/* Calendar Icon */}
                    <div className={`${styles["calender-svg"]} absolute inset-y-0 left-3 flex items-center pointer-events-none`}>
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-gray-500" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M8 2a1 1 0 1 1 2 0v2h4V2a1 1 0 1 1 2 0v2h2a3 3 0 0 1 3 3v12a3 3 0 0 1-3 3H6a3 3 0 0 1-3-3V7a3 3 0 0 1 3-3h2V2Zm8 4V2h-4v4h4ZM4 9v10a1 1 0 0 0 1 1h14a1 1 0 0 0 1-1V9H4Zm2 2h2a1 1 0 1 1 0 2H6a1 1 0 1 1 0-2Zm5 0h6a1 1 0 1 1 0 2h-6a1 1 0 1 1 0-2Zm-5 4h2a1 1 0 1 1 0 2H6a1 1 0 1 1 0-2Zm5 0h6a1 1 0 1 1 0 2h-6a1 1 0 1 1 0-2Z" />
                      </svg>
                    </div>
                    
                    <input
                      type="text"
                      className={`pl-10 ${styles["form-input"]} form-control w-full border border-gray-300 rounded-lg py-2`}
                      id="geburtsdatum"
                      name="geburtsdatum" // Ensure this is correct
                      placeholder="Geburtsdatum"
                      value={geburtsdatum}
                      onChange={handleChange}
                    />
                  
                  </div>
                  {errors.geburtsdatum && <p className="text-red-500 text-sm">{errors.geburtsdatum}</p>}

                </div>
              </div>

              <button
                type="button"
                className={`${styles["next-btn"]} text-white px-6 py-3 rounded-lg bg-blue-500 mx-auto block`}
                onClick={() => showStep(currentStep + 1)}
              >
                Weiter
              </button>
            </div>
          </div>
        )}

        {/* Step 2 */}
         {currentStep === 1 && (
         <div className="flex justify-center">
            <div className="w-full max-w-lg">
              <div className="grid grid-cols-1 gap-4 mt-3 mb-3">
                <div>
                <p className={`${styles["main-heading"]} mt-10 mb-4 text-center`}>
                Hallo..., schön dich kennenzulernen
                </p>   
                <p className={`${styles["p-address"]} mb-10 text-center`}>
                  Wie lautet deine aktuelle Adresse?
                </p>     
                  <div className="input-field mt-2">
                    <input
                      type="text"
                      className={`${styles["form-input"]} form-control `}
                      id="strabe"
                      name="strabe"
                      placeholder="Straße"
                      value={strabe}
                      onChange={handleChange}
                    />
                    {errors.strabe && <p className="text-red-500 text-sm">{errors.strabe}</p>}
                  </div>
                  <div className="input-field mt-10">
                    <input
                      type="text"
                      className={`${styles["form-input"]} form-control `}
                      id="postleitzahl"
                      name="postleitzahl"
                      placeholder="postleitzahl"
                      value={postleitzahl}
                      onChange={handleChange}
                    />
                    {errors.postleitzahl && <p className="text-red-500 text-sm">{errors.postleitzahl}</p>}
                  </div>
                  <div className="input-field mt-10">
                    <input
                        type="text"
                        className={`${styles["form-input"]} form-control `}
                        id="hausnummer"
                        name="hausnummer"
                        placeholder="Hausnummer"
                        value={hausnummer}
                        onChange={handleChange}
                      />
                    {errors.hausnummer && <p className="text-red-500 text-sm">{errors.hausnummer}</p>}
                  </div>
                  <div className="input-field mt-10">
                  <input
                        type="text"
                        className={`${styles["form-input"]} form-control `}
                        id="ort"
                        name="ort"
                        placeholder="Ort"
                        value={ort}
                        onChange={handleChange}
                      />
                       {errors.ort && <p className="text-red-500 text-sm">{errors.ort}</p>}
                  </div>
                </div>
              </div>

              <div className="flex justify-between mt-10">
                  <button
                    type="button"
                    className="bg-gray-300 text-gray-700 px-4 py-2 rounded-lg"
                    onClick={() => showStep(currentStep - 1)} // Move to previous step
                  >
                    Back
                  </button>
                  <div className="col-span-2">
                    <button
                      type="button"
                      className={`${styles["next-btn"]} text-white px-6 py-3 rounded-lg bg-blue-500 mx-auto block`}
                      onClick={() => showStep(currentStep + 1)} // Move to next step
                    >
                      Weiter
                    </button>
                  </div>
              </div>
            </div>
          </div>
        )}
        {/* Step 3 */}
         {currentStep === 2 && (
         <div className="flex justify-center">
            <div className="w-full max-w-lg">
              <div className="grid grid-cols-1 gap-4 mt-3 mb-3">
                <div>
                <p className={`${styles["main-heading"]} mt-10 mb-10 text-center font-bold`}>
                Wie bist du erreichbar?
                </p>      
                <div className="input-field mt-10 relative">
                      {/* Email Icon */}
                      <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-6 w-6 text-gray-500"
                          fill="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path d="M20 4H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2ZM4 18V8l8 5 8-5v10H4Zm8-7L4 6h16l-8 5Z" />
                        </svg>
                      </div>
                      {/* Email Input */}
                      <input
                        type="email"
                        className={`pl-10 ${styles["form-input"]} form-control w-full border border-gray-300 rounded-lg py-2`}
                        id="email"
                        name="email"
                        placeholder="Email address"
                        value={email}
                        onChange={handleChange}
                      />
                      <div>
                      {/* Error Message */}
                      {errors.email && (
                        <p className="text-red-500 text-sm">{errors.email}</p>
                      )}
                      </div>
                </div>
                 {/* Phone Number Input */}
                <div className="input-field mt-10">
                  <PhoneInput
                    country={'de'}
                    value={phonenumber}
                    onChange={setPhoneNumber}
                    inputStyle={{ width: '100%', padding: '30px 50px', borderRadius: '6px', borderColor: 'rgb(176 176 176 / 51%)' }}
                    placeholder="Phone number"
                  />
                  {errors.phonenumber && <p className="text-red-500 text-sm">{errors.phonenumber}</p>}
                </div>

                </div>
              </div>

              <div className="flex justify-between mt-10">
                  <button
                    type="button"
                    className="bg-gray-300 text-gray-700 px-4 py-2 rounded-lg"
                    onClick={() => showStep(currentStep - 1)} // Move to previous step
                  >
                    Back
                  </button>
                  <div className="col-span-2">
                    <button
                      type="button"
                      className={`${styles["next-btn"]} text-white px-6 py-3 rounded-lg bg-blue-500 mx-auto block`}
                      onClick={() => showStep(currentStep + 1)} // Move to next step
                    >
                      Weiter
                    </button>
                  </div>
              </div>
            </div>
          </div>
        )}

        {/* Step 4 */}
         {currentStep === 3 && (
         <div className="flex justify-center">
            <div className="w-full max-w-lg">
              <div className="grid grid-cols-1 gap-4 mt-3 mb-3">
                <div>
                    <p className={`${styles["main-heading"]} mt-10 mb-10 text-center font-bold`}>
                      Wo arbeitest du?
                    </p>      
                    <div className="grid grid-cols-2 gap-4 mt-5">
                      <div className="...">
                        <div className="input-field">
                          <input
                            type="text"
                            className={`${styles["form-input"]} form-input `}
                            id="ausgeubterBeruf"
                            name="ausgeubterBeruf"
                            placeholder="Ausgeübter Beruf"
                            value={ausgeubterBeruf}
                            onChange={handleChange}
                          />
                          {/* Error Message */}
                          {errors.ausgeubterBeruf && <p className="text-red-500 text-sm">{errors.ausgeubterBeruf}</p>}
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
                          {/* Error Message */}
                          {errors.arbeitgeber && <p className="text-red-500 text-sm">{errors.arbeitgeber}</p>}
                        </div>
                      </div>
                    </div>
                    <div className="input-field mt-10">
                      <input
                            type="text"
                            className={`${styles["form-input"]} form-control `}
                            id="income"
                            name="income"
                            placeholder="monatliches Nettogehalt (€)"
                            value={income}
                            onChange={handleChange}
                          />
                           {errors.income && <p className="text-red-500 text-sm">{errors.income}</p>}
                    </div>

                    <p className={`${styles["p-address"]} mt-20 mb-10 text-center`}>
                    Besteht das Beschäftigungsverhältnis länger, als 6 Monate?
                    </p> 
                    <div className="grid grid-cols-2 mt-5 gap-10 w-[60%] mx-auto">
                        <div className="col-span-1 flex items-center">
                          <input
                            className={`${styles["form-check-input"]} mr-2  `}
                            type="radio"
                            name="employment"
                            id="employment1"
                            value="Ja"
                            onChange={() => radiohandle("Ja", "emp")}
                            checked={employment === "Ja"}
                          />
                           <label
                            className={`${styles["form-check-label"]} ${
                              styles["radio-btn"]
                            } ${selectedRadio2=== "Ja" ? styles["black"] : ""}`}
                            onClick={() => radiohandle("Ja", "emp")}
                            htmlFor="employment1"
                          >
                            Ja
                          </label>
                        </div>
                        <div className="col-span-1 flex items-center">
                          <input
                            className={`${styles["form-check-input"]} mr-2  `}
                            type="radio"
                            name="employment"
                            id="employment2"
                            value="Nein"
                            onChange={() => radiohandle("Nein", "emp")}
                            checked={employment === "Nein"}
                          />
                          <label
                            className={`${styles["form-check-label"]} ${
                              styles["radio-btn"]
                            } ${selectedRadio2 === "Nein" ? styles["black"] : ""}`}
                            onClick={() => radiohandle("Nein", "emp")}
                            htmlFor="employment2"
                          >
                            Nein
                          </label>
                          {errors.employment && <p className="text-red-500 text-sm">{errors.employment}</p>}
                        </div>
                      </div>
                  

                    <div className="flex justify-between mt-10">
                        <button
                          type="button"
                          className="bg-gray-300 text-gray-700 px-4 py-2 rounded-lg"
                          onClick={() => showStep(currentStep - 1)} // Move to previous step
                        >
                          Back
                        </button>
                        <div className="col-span-2">
                          <button
                            type="button"
                            className={`${styles["next-btn"]} text-white px-6 py-3 rounded-lg bg-blue-500 mx-auto block`}
                            onClick={() => showStep(currentStep + 1)} // Move to next step
                          >
                            Weiter
                          </button>
                        </div>
                    </div>
                         
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Step 5 */}
         {currentStep === 4 && (
          <div>
             <p className={`${styles["main-heading"]} mt-10 mb-10 text-center font-bold`}>
             Dein Beschäftigungsverhältnis besteht länger, als 6 Monate.
              </p>   

              <div className="flex flex-col items-center justify-center w-full">
                  <label
                    htmlFor="image-upload"
                    className={`${styles["upload-btn"]} w-full px-4 py-2 text-center text-black rounded-lg cursor-pointer`}
                  >
                    Upload letzte 3 Gehaltnachweise.
                  </label>
                  <input
                    type="file"
                    id="image-upload"
                    className="hidden"
                    multiple
                    accept="image/*"
                    onChange={handleFileChange}
                  />
                  <div className="mt-4 grid grid-cols-3 gap-4">
                    {images.map((src, index) => (
                      <div key={index} className="relative w-24 h-24">
                        <img src={src} alt={`Uploaded Preview ${index + 1}`} className="object-cover w-full h-full rounded-lg" />
                        <button type="button" className="absolute top-1 right-1 bg-red-500 text-white p-1 rounded-full text-xs" onClick={() => removeImage(index)}>
                          ×
                        </button>
                      </div>
                    ))}
                  </div>
              </div>
              <div className="flex justify-between mt-10">
                        <button
                          type="button"
                          className="bg-gray-300 text-gray-700 px-4 py-2 rounded-lg"
                          onClick={() => showStep(currentStep - 1)} // Move to previous step
                        >
                          Back
                        </button>
                        <div className="col-span-2">
                          <button
                            type="button"
                            className={`${styles["next-btn"]} text-white px-6 py-3 rounded-lg bg-blue-500 mx-auto block`}
                            onClick={() => showStep(currentStep + 1)} // Move to next step
                          >
                            Weiter
                          </button>
                        </div>
                    </div>

              
          </div>
        )}

        {/* Step 6 */}
         {currentStep === 5 && (
          <div>
            <p className={`${styles["main-heading"]} mt-10 mb-10 text-center font-bold`}>
               Nur noch ein paar Fragen.
            </p>   
            <p className={`${styles["p-address"]} mt-20 mb-10 text-center`}>
                Besitzt du ein oder mehrere Haustiere?
            </p> 
            <div className="grid grid-cols-2 mt-5 gap-10 w-[60%] mx-auto">
                        <div className="col-span-1 flex items-center">
                          <input
                            className={`${styles["form-check-input"]} mr-2  `}
                            type="radio"
                            name="pets"
                            id="pet1"
                            value="Ja"
                            onChange={() => radiohandle("Ja", "pet")}
                            checked={pets === "Ja"}
                          />
                           <label
                            className={`${styles["form-check-label"]} ${
                              styles["radio-btn"]
                            } ${selectedRadio2=== "Ja" ? styles["black"] : ""}`}
                            onClick={() => radiohandle("Ja", "pet")}
                            htmlFor="pet1"
                          >
                            Ja
                          </label>
                        </div>
                        <div className="col-span-1 flex items-center">
                          <input
                            className={`${styles["form-check-input"]} mr-2  `}
                            type="radio"
                            name="pets"
                            id="pet2"
                            value="Nein"
                            onChange={() => radiohandle("Nein", "pet")}
                            checked={pets === "Nein"}
                          />
                          <label
                            className={`${styles["form-check-label"]} ${
                              styles["radio-btn"]
                            } ${selectedRadio2 === "Nein" ? styles["black"] : ""}`}
                            onClick={() => radiohandle("Nein", "pet")}
                            htmlFor="pet2"
                          >
                            Nein
                          </label>
                          {errors.pets && <p className="text-red-500 text-sm">{errors.pets}</p>}
                        </div>
            </div>
                  
                    <div className="flex justify-between mt-10">
                        <button
                          type="button"
                          className="bg-gray-300 text-gray-700 px-4 py-2 rounded-lg"
                          onClick={() => showStep(currentStep - 1)} // Move to previous step
                        >
                          Back
                        </button>
                        <div className="col-span-2">
                          <button
                            type="button"
                            className={`${styles["next-btn"]} text-white px-6 py-3 rounded-lg bg-blue-500 mx-auto block`}
                            onClick={() => showStep(currentStep + 1)} // Move to next step
                          >
                            Weiter
                          </button>
                        </div>
                    </div>
          </div>
        )}
         {/* Step 7 */}
         {currentStep === 6 && (
          <div>
          <p className={`${styles["main-heading"]} mt-10 mb-10 text-center font-bold`}>
            Nur noch ein paar Fragen.
          </p>
          <p className={`${styles["p-address"]} mt-20 mb-10 text-center`}>
            Bestehen Mietrückstände aus bisherigen Mietverhältnissen?
          </p>
          <div className="grid grid-cols-2 mt-5 gap-10 w-[60%] mx-auto">
                    <div className="col-span-1 flex items-center">
                      <input
                            className={`${styles["form-check-input"]} mr-2  `}
                            type="radio"
                            name="rentarea"
                            id="rentarea1"
                            value="Ja"
                            onChange={() => radiohandle("Ja", "rentarea")}
                            checked={rentarea === "Ja"}
                          />
                           <label
                            className={`${styles["form-check-label"]} ${
                              styles["radio-btn"]
                            } ${selectedRadio2=== "Ja" ? styles["black"] : ""}`}
                            onClick={() => radiohandle("Ja", "rentarea")}
                            htmlFor="rentarea1"
                          >
                            Ja
                          </label>
                        </div>
                        <div className="col-span-1 flex items-center">
                          <input
                            className={`${styles["form-check-input"]} mr-2  `}
                            type="radio"
                            name="rentarea"
                            id="rentarea2"
                            value="Nein"
                            onChange={() => radiohandle("Nein", "rentarea")}
                            checked={rentarea === "Nein"}
                          />
                          <label
                            className={`${styles["form-check-label"]} ${
                              styles["radio-btn"]
                            } ${selectedRadio2 === "Nein" ? styles["black"] : ""}`}
                            onClick={() => radiohandle("Nein", "rentarea")}
                            htmlFor="rentarea2"
                          >
                            Nein
                          </label>
                          {errors.rentarea && <p className="text-red-500 text-sm">{errors.rentarea}</p>}
                    </div>
            </div>
         
       <div className="flex justify-between mt-10">
                  <button
                    type="button"
                    className="bg-gray-300 text-gray-700 px-4 py-2 rounded-lg"
                    onClick={() => showStep(currentStep - 1)} // Move to previous step
                  >
                    Back
                  </button>
                  <div className="col-span-2">
                    <button
                      type="button"
                      className={`${styles["next-btn"]} text-white px-6 py-3 rounded-lg bg-blue-500 mx-auto block`}
                      onClick={() => showStep(currentStep + 1)} // Move to next step
                    >
                      Weiter
                    </button>
                  </div>
              </div>
        </div>
        )}

         {/* Step 8 */}
         {currentStep === 7 && (
          <div>
          <p className={`${styles["main-heading"]} mt-10 mb-10 text-center font-bold`}>
            Nur noch ein paar Fragen.
          </p>
          <p className={`${styles["p-address"]} mt-20 mb-10 text-center`}>
          Wurde in den letzten 5 Jahren Insolvenzverfahren gegen dich eröffnet? 
          </p>
          <div className="grid grid-cols-2 mt-5 gap-10 w-[60%] mx-auto">
                    <div className="col-span-1 flex items-center">
                      <input
                            className={`${styles["form-check-input"]} mr-2  `}
                            type="radio"
                            name="proceedings"
                            id="proceedings1"
                            value="Ja"
                            onChange={() => radiohandle("Ja", "proceedings")}
                            checked={proceedings === "Ja"}
                          />
                           <label
                            className={`${styles["form-check-label"]} ${
                              styles["radio-btn"]
                            } ${selectedRadio2=== "Ja" ? styles["black"] : ""}`}
                            onClick={() => radiohandle("Ja", "proceedings")}
                            htmlFor="proceedings1"
                          >
                            Ja
                          </label>
                        </div>
                        <div className="col-span-1 flex items-center">
                          <input
                            className={`${styles["form-check-input"]} mr-2  `}
                            type="radio"
                            name="proceedings"
                            id="proceedings2"
                            value="Nein"
                            onChange={() => radiohandle("Nein", "proceedings")}
                            checked={proceedings === "Nein"}
                          />
                          <label
                            className={`${styles["form-check-label"]} ${
                              styles["radio-btn"]
                            } ${selectedRadio2 === "Nein" ? styles["black"] : ""}`}
                            onClick={() => radiohandle("Nein", "proceedings")}
                            htmlFor="proceedings2"
                          >
                            Nein
                          </label>
                          {errors.proceedings && <p className="text-red-500 text-sm">{errors.proceedings}</p>}
                    </div>
            </div>
         
        <div className="flex justify-between mt-10">
            <button
              type="button"
              className="bg-gray-300 text-gray-700 px-4 py-2 rounded-lg"
              onClick={() => showStep(currentStep - 1)} // Move to previous step
            >
              Back
            </button>
            <div className="col-span-2">
              <button
                type="button"
                className={`${styles["next-btn"]} text-white px-6 py-3 rounded-lg bg-blue-500 mx-auto block`}
                onClick={() => showStep(currentStep + 1)} // Move to next step
              >
                Weiter
              </button>
            </div>
          </div>
        </div>
        )}

        {/* Step 9 */}
        {currentStep === 8 && (
          <div>
          <p className={`${styles["main-heading"]} mt-10 mb-10 text-center font-bold`}>
            Nur noch ein paar Fragen.
          </p>
          <p className={`${styles["p-address"]} mt-20 mb-10 text-center`}>
           Ist eine gewerbliche Nutzung der Wohnung beabsichtigt?
          </p>
          <div className="grid grid-cols-2 mt-5 gap-10 w-[60%] mx-auto">
                    <div className="col-span-1 flex items-center">
                      <input
                            className={`${styles["form-check-input"]} mr-2  `}
                            type="radio"
                            name="apartment"
                            id="apartment1"
                            value="Ja"
                            onChange={() => radiohandle("Ja", "apartment")}
                            checked={apartment === "Ja"}
                          />
                           <label
                            className={`${styles["form-check-label"]} ${
                              styles["radio-btn"]
                            } ${selectedRadio2=== "Ja" ? styles["black"] : ""}`}
                            onClick={() => radiohandle("Ja", "apartment")}
                            htmlFor="apartment1"
                          >
                            Ja
                          </label>
                        </div>
                        <div className="col-span-1 flex items-center">
                          <input
                            className={`${styles["form-check-input"]} mr-2  `}
                            type="radio"
                            name="apartment"
                            id="apartment2"
                            value="Nein"
                            onChange={() => radiohandle("Nein", "apartment")}
                            checked={apartment === "Nein"}
                          />
                          <label
                            className={`${styles["form-check-label"]} ${
                              styles["radio-btn"]
                            } ${selectedRadio2 === "Nein" ? styles["black"] : ""}`}
                            onClick={() => radiohandle("Nein", "apartment")}
                            htmlFor="apartment2"
                          >
                            Nein
                          </label>
                          {errors.apartment && <p className="text-red-500 text-sm">{errors.apartment}</p>}
                    </div>
            </div>
         
        <div className="flex justify-between mt-10">
            <button
              type="button"
              className="bg-gray-300 text-gray-700 px-4 py-2 rounded-lg"
              onClick={() => showStep(currentStep - 1)} // Move to previous step
            >
              Back
            </button>
            <div className="col-span-2">
            <button type="button" onClick={() => setComponents(2)}>
        Next
      </button>
            </div>
          </div>
        </div>
        )}


      </div>
    </div>
  );
};

export default FirstStep;
