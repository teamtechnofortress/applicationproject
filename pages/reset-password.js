// /pages/reset-password.js
import React, { useState } from "react";
import { useRouter } from "next/router";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import styles from '../styles/newlogin.module.css'
import Link from "next/link";
import {Icon} from 'react-icons-kit';
import {eyeOff} from 'react-icons-kit/feather/eyeOff';
import {eye} from 'react-icons-kit/feather/eye'

const ResetPassword = () => {



  const [newPassword, setNewPassword] = useState('');
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
  const router = useRouter();
  const { token } = router.query;

  const handleChange = (e) => {
    setNewPassword(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const data = { token, newPassword };

    let res = await fetch(`${process.env.NEXT_PUBLIC_HOST}/api/reset-password`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    let response = await res.json();

    if (response.success) {
      toast.success('Password has been reset successfully!', {
        position: "top-center",
        autoClose: 1500,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });

      setTimeout(() => {
        router.push('/login');
      }, 1500);
    } else {
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
  };

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
        <div className="flex min-h-full items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
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
                      Jetzt anmelden
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
           
            
              <form onSubmit={handleSubmit}  className="mt-8 mb-6 space-y-6" action="#" method="POST">
                <input type="hidden" name="remember" value="true" />
                <div className="space-y-px rounded-md shadow-sm">
                  <div className="flex mt-8">
                    <input
                      onChange={handleChange}
                      value={newPassword}
                      id="email"
                      name="newPassword"
                      type={type}
                      required
                      className={`${styles['input-field']}`}
                      placeholder="Enter New Password"
                    />
                    <span className="flex justify-around items-center" onClick={handleToggle}>
                      <Icon className="absolute mr-10" icon={icon} size={25}/>
                  </span>
                  </div>
                </div>
                <div>
                  <button type="submit" className={`${styles['signIn-btn']} flex w-full leading-6 shadow-sm px-3 py-1.5 justify-center`}>Continue</button>
                </div>
              </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResetPassword;
