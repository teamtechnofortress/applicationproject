import React, { useState } from 'react';
import styles from '../styles/signup.module.css'
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Link from 'next/link';
import { useRouter } from 'next/router';


const Rename = ({ onClose, pdfid,handleFormSubmit }) => {
    const [Pdfid, setPdfid] = useState(pdfid); // Initialize state with pdfid
    const [pdftitle, setPdftitle] = useState(''); // Initialize state with pdfid

    const router = useRouter();
    const [title, settitle] = useState('')

    const formData = new FormData();
          formData.append('id', Pdfid);
          formData.append('title',pdftitle);
   
    const handleChange = (e) => {
        if (e.target.name === 'title' ) {
          setPdftitle(e.target.value);
        } 
    }

    const handleSubmit = async (e)=>{
        e.preventDefault();
       try {
          const res = await fetch(`/api/user/renameapplication`, {
              method: "POST",
              headers: {
                  'Accept': 'application/json',
              },
              body: formData,
          });
          const response = await res.json();
          if(response.success) {
            toast.success('Form submitted successfully', {
              position: "top-center",
              autoClose: 1500,
              hideProgressBar: true,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
              theme: "light",
              });
                // const router = useRouter();
                // window.location.reload();
                onClose();
                handleFormSubmit();
            }else{
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
          console.error('Error deleting application:', error);
      }
       
    }
  //   const renameApplication = async (name) => {
  //     try {
  //         const response = await fetch(`/api/user/renameapplication?id=${id}`, {
  //             method: "GET",
  //             headers: {
  //                 'Accept': 'application/json',
  //             }
  //         });
  
  //         if (!response.ok) {
  //             const error = await response.json();
  //             console.error('Failed to delete application:', error);
  //             // Handle error message display or any other actions
  //         } else {
  //             // If successful, you may want to update the UI
  //             console.log('Application deleted successfully');
  //         }
  //     } catch (error) {
  //         console.error('Error deleting application:', error);
  //     }
  // }
    
  return (
      <>
       <ToastContainer />
    <div id="signup-modal" aria-hidden="true" className="fixed inset-0 bg-gray-600 bg-opacity-50 flex justify-center items-center z-50 text-gray-900 dark:text-white">
    <div className="relative p-4 w-full max-w-2xl max-h-full">
      <div className="relative bg-white rounded-lg shadow bg-white-700 text-gray-900">
        <div className="px-4 pt-2 rounded-t bg-white-700 text-end">
          <button onClick={onClose} type="button" className={`${styles['btn-zuruck']}`}>
            <span className={`${styles['btn-text']}`}>&times;</span>
          </button>
        </div>
        <div className="px-4 pt-2 pb-4 space-y-4">
          <h3 className={`${styles['modal-h3']}`}>Change document title</h3>
          <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4" noValidate>
            <div className="col-span-2">
              <p className={`${styles['modal-p']}`}>Enter a new title for the document below. Tip: Choose a title that reflects the content of the document</p>
            </div>
            <div className="col-span-2 md:col-span-2">
              <label htmlFor="title" className={`${styles['form-label']} form-label`}>Title</label>
              <input onChange={handleChange} value={pdftitle} id="title" name="title" type="text"  className={`${styles['modalform-input']} mt-2`} required />
            </div>
            <div className="col-span-2 flex justify-end">
              <button className={`${styles['modal-submit-button']} btn`} type="submit">Rename</button>
            </div>
          </form>
        </div>
      </div>
    </div>
    </div>
    </>
  )
}

export default Rename