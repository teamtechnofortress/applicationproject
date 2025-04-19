import React, {useState} from "react";
import Link from "next/link";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import styles from '../styles/newlogin.module.css'
import {Icon} from 'react-icons-kit';
import {eyeOff} from 'react-icons-kit/feather/eyeOff';
import {eye} from 'react-icons-kit/feather/eye'


const Signup = () => {
   

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [type, setType] = useState('password');
  const [icon, setIcon] = useState(eyeOff);

    const handleToggle = () => {
        if (type==='password'){
        setIcon(eye);
        setType('text')
        } else {
        setIcon(eyeOff)
        setType('password')
        }
    }
 
  const handleChange = (e) => {
      if(e.target.name == 'email') {
        setEmail(e.target.value)
      }
      else if(e.target.name == 'password') {
        setPassword(e.target.value)
      }
  }

  const handleSubmit = async (e)=>{
    e.preventDefault();
    const data = {email, password}
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
    setEmail('')
    setPassword('')
    
}
  return (
    <div>
      <ToastContainer
        position="top-center"
        autoClose={1500}
        limit={5}
        hideProgressBar
        newestOnTop
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colors"
       />
      <div className={`${styles['body-background']} flex min-h-full items-center justify-center`}>
      <div className="absolute top-0 left-0 p-4">
          <img src="/images/logo.png" alt="Logo" className="h-12" />
        </div>
        <div className={`${styles['login-form']} w-full max-w-md space-y-8`}>
          <div>
            <h2 className={`${styles['heading-login']} mt-3`}>
            Erstelle ein kostenloses Konto und sichere dir deine Traumwohnung
            </h2>
            <div className="flex gap-3 mt-3">
                <div className={`${styles['heading-left']}`}>Hast du bereits ein Konto?</div>
                <div>
                    <Link
                      href="/login"
                      className={`${styles['jetzt-btn']}`}>
                      Login
                    </Link>
                </div>
            </div>
            <div className="flex gap-3 mt-3 hidden">
                <div className={`${styles['google-btn']} flex g-6`}><img src="/images/google.svg" />Sign in with Google</div>
                <div className={`${styles['linkdin-btn']}`}>
                    <Link href="">
                       <img src="/images/linkdin.svg" />
                    </Link>
                </div>
                <div className={`${styles['apple-btn']}`}>
                    <Link href="">
                       <img src="/images/apple.svg" />
                    </Link>
                </div>
            </div>
          </div>
          <form onSubmit={handleSubmit} className="mt-8 mb-6 space-y-6" method="POST">
            <input type="hidden" name="remember" value="true" />
            <div>
              <div className="mt-3 mb-3">
                <input
                  onChange={handleChange}
                  value={email}
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  className={`${styles['input-field']}`}
                  placeholder="E-Mail-Adresse"
                />
              </div>
              <div>

              <div className="flex mt-8">
                <input
                  onChange={handleChange}
                  value={password}
                  id="password"
                  name="password"
                  type={type}
                  autoComplete="current-password"
                  required
                  className={`${styles['input-field']}`}
                  placeholder="Passwort"
                />
                <span className="flex justify-around items-center" onClick={handleToggle}>
                  <Icon className="absolute mr-10" icon={icon} size={25}/>
              </span>
              </div>
              <div className={`${styles['forgot-link']} mt-6`}>
                    <Link
                      href="/forgot"
                      className="font-medium">
                      Forgot Passwort
                    </Link>
                  </div>
                </div>
            </div>


            <div className="mt-3 mb-6">
               <button type="submit" className={`${styles['signIn-btn']} flex w-full leading-6 shadow-sm px-3 py-1.5 justify-center`} >REGISTRIERE DICH KOSTENLOS</button>
               <p className={`${styles['p-login']} mt-5`}>Indem du auf “Kostenlos registrieren” klickst, erklärst du, dass du die <a href="https://www.wohnungsmappe.de/contact/datenschutzerklarung"><span>Datenschutzerklärung</span></a>  und <a href="https://www.wohnungsmappe.de/contact/agb"><span>Allgemeinen Geschäftsbedingungen</span></a>  gelesen hast und akzeptierst.</p>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Signup