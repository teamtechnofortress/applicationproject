import React, { useState } from 'react';
import styles from '../styles/signup.module.css'
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Link from 'next/link';
import { useRouter } from 'next/router';


const Signup = ({ onClose }) => {
    const router = useRouter();
    const [firstname, setFirstName] = useState('')
    const [lastname, setLastName] = useState('')
    const [email, setEmail] = useState('')
   
    const handleChange = (e) => {
        if (e.target.name === 'firstname') {
            setFirstName(e.target.value);
        } 
        else if (e.target.name === 'lastname') {
            setLastName(e.target.value);
        }
        else if (e.target.name === 'email') {
            setEmail(e.target.value);
        }
    }

    const handleSubmit = async (e)=>{
        e.preventDefault();
        const data = {firstname, lastname, email}
        console.log(data)
        const res =  await fetch(`${process.env.NEXT_PUBLIC_HOST}/api/signup`, {
           method: "POST",
           headers: {
           "Content-Type": "application/json",
           },
           body: JSON.stringify(data),
        });
          let response = await res.json()
          console.log(response)
          
        if (response.status === 'success') {
            // Show success message
            toast.success(response.msg, {
                position: "top-center",
                autoClose: 2000,
                hideProgressBar: true,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
            });
            setTimeout(() => {
                onClose();
            }, 2000);
        } else {
            // Show error message from response
            toast.error(response.msg, {
                position: "top-center",
                autoClose: 2000,
                hideProgressBar: true,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
            });
        }
        setFirstName('')
        setLastName('')
        setEmail('')
        
    }
    const handleLinkClick = () => {
        if (router.pathname === '/login') {
            onClose();
        }
    }
  return (
      <>
       <ToastContainer
         position="top-center"
         autoClose={2000}
         newestOnTop
         closeOnClick
         rtl={false}
         pauseOnFocusLoss
         draggable
         pauseOnHover
         theme="colors"
      />
    <div id="signup-modal" aria-hidden="true" className="fixed inset-0 bg-gray-600 bg-opacity-50 flex justify-center items-center z-50 text-gray-900 dark:text-white">
    <div className="relative p-4 w-full max-w-2xl max-h-full">
      <div className="relative bg-white rounded-lg shadow bg-white-700 text-gray-900">
        <div className="p-4 md:p-5 rounded-t bg-white-700">
          <button onClick={onClose} type="button" className={`${styles['btn-zuruck']}`}>
            <i className="fa fa-angle-left"></i> <span className={`${styles['btn-text']}`}>Zurück</span>
          </button>
        </div>
        <div className="p-4 md:p-5 space-y-4">
          <h3 className={`${styles['modal-h3']}`}>Personalisieren Sie Ihren Lebenslauf, um loszulegen</h3>

          <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4" noValidate>
            <div className="col-span-2">
              <p className={`${styles['modal-p']}`}>Geben Sie Ihre Daten ein, um ein personalisiertes Erlebnis zu erhalten und Ihren Lebenslauf in Ihrem eigenen Dashboard zu speichern.</p>
            </div>
            <div className="col-span-2 md:col-span-1">
              <label htmlFor="firstname" className={`${styles['form-label']} form-label`}>Vorname</label>
              <input onChange={handleChange} value={firstname} id="firstname" name="firstname" type="text" className={`${styles['modalform-input']} mt-2`} placeholder='Max' required />
            </div>
            <div className="col-span-2 md:col-span-1">
              <label htmlFor="lastname" className={`${styles['form-label']} form-label`}>Nachname</label>
              <input onChange={handleChange} value={lastname} id="lastname" name="lastname" type="text" className={`${styles['modalform-input']} mt-2`} placeholder='Mustermann' required />
            </div>
            <div className="col-span-2">
              <label htmlFor="email" className={`${styles['form-label']} form-label`}>E-Mail</label>
              <input onChange={handleChange} value={email} id="email" name="email" type="email" className={`${styles['modalform-input']} mt-2`} required />
            </div>
            <div className="col-span-2">
              <p className={`${styles['modal-p']}`}>Indem Sie auf „Zur Lebenslauf-App" klicken, erstellen Sie ein Konto und stimmen unseren <strong>allgemeinen Geschäftsbedingungen</strong> und der <strong>Datenschutzerklärung</strong> zu.</p>
              <p className={`${styles['modal-p']}`}><strong>Sie haben bereits ein Konto? <span className="text-red-500">
                <Link href="/login" onClick={handleLinkClick}>Jetzt einloggen</Link>
                </span></strong>
              </p>


            </div>
            <div className="col-span-2 flex justify-end">
              <button className={`${styles['modal-submit-button']} btn`} type="submit">Zur Bewerbermappe</button>
            </div>
          </form>
        </div>
      </div>
    </div>
    </div>
    </>
  )
}

export default Signup