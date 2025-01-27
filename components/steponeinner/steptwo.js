import { useEffect, useState } from "react";
import styles from "@/styles/latest.module.css";

const StepTwoInner = ({
  strabe,
  postleitzahl,
  hausnummer,
  ort,
  setCurrentStep,
  handleChange,
}) => {
  const [errors, setErrors] = useState({});
  const validateFields = () => {
    const newErrors = {};
    const safeTrim = (value) => (value && typeof value === "string" ? value.trim() : "");

    if (!safeTrim(strabe)) newErrors.strabe = "Address is required.";
    if (!safeTrim(postleitzahl)) newErrors.postleitzahl = "Postleitzahl is required.";
    if (!safeTrim(hausnummer)) newErrors.hausnummer = "Hausnummer is required.";
    if (!safeTrim(ort)) newErrors.ort = "Ort is required.";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0; // Return true if no errors
  };
  setCurrentStep(1);

  return (
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
            onClick={() => {
              setCurrentStep(0); 
          }}
          >
            Zurück
          </button>
          <div className="col-span-2">
            <button
              type="button"
              className={`${styles["next-btn"]} text-white px-6 py-3 rounded-lg bg-blue-500 mx-auto block`}
              onClick={() => {
                if (validateFields()) {
                setCurrentStep(2); 
                }
            }}
            >
              Weiter
            </button>
          </div>
      </div>
    </div>
  </div>
  );
};

export default StepTwoInner;
