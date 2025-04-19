import React, { useState } from "react";
import Link from "next/link";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import styles from '../styles/newlogin.module.css'

const Forgot = () => {

  const [email, setEmail] = useState('');
  const handleChange = (e) => {
    setEmail(e.target.value);
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Call your API to handle forgot password request
    const res = await fetch(`${process.env.NEXT_PUBLIC_HOST}/api/forgot`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email }),
    });
    const response = await res.json();
    console.log(response.success)
    if (response.success) {
      toast.success(response.message, {
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
      toast.error(response.error, {
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
  };

  return (
    <div>
      <ToastContainer
        position="top-center"
        autoClose={2000}
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
                      href=""
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
                      placeholder="Enter your email"
                    />
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

export default Forgot;
