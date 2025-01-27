// /pages/reset-password.js
import React, { useState } from "react";
import { useRouter } from "next/router";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import styles from '../styles/login.module.css';
import Link from "next/link";

const ResetPassword = () => {

const [isSignupModalOpen, setIsSignupModalOpen] = useState(false);

  const toggleSignupModal = () => {
    setIsSignupModalOpen(!isSignupModalOpen);
  };

  const [newPassword, setNewPassword] = useState('');
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
       <section className="p-4 mx-auto">
        <nav className="bg-white border-gray-200">
          <div className="flex flex-wrap items-center justify-between mx-auto p-4">
            <Link href="/" legacyBehavior>
              <a className="flex items-center space-x-3 rtl:space-x-reverse">
                <img src="/images/logo.svg" className="h-8" alt="Flowbite Logo" />
                <img src="/images/OHNUNGSGURU.svg" className="h-8" alt="Flowbite Logo" />
              </a>
            </Link>
            <div className="hidden w-full md:block md:w-auto" id="navbar-default">
              <ul className="font-medium flex flex-col p-4 md:p-0 mt-4 border border-gray-100 rounded-lg bg-gray-50 md:flex-row md:space-x-8 rtl:space-x-reverse md:mt-0 md:border-0 md:bg-white">
                <li>
                  <button className={`${styles['register-btn']} nav-link`} onClick={toggleSignupModal}>Lebenslauf erstellen</button>
                </li>
              </ul>
            </div>
          </div>
        </nav>
      </section>
      <div className="flex min-h-full items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
        <div className="w-full max-w-md space-y-8">
          <div>
           
            <h2 className="mt-6 text-3xl font-bold tracking-tight text-gray-900">
            Reset Password
            </h2>
          </div>
          <form onSubmit={handleSubmit} className="mt-8 space-y-6" method="POST">
            {/* <input type="hidden" name="remember" value="true" /> */}
            <div className="space-y-px rounded-md shadow-sm">
            
              <div className="mt-3 mb-3">
                <label htmlFor="new-password" className={`${styles['label-input']}`}>
                    New Password
                </label>
                <input
                  onChange={handleChange}
                  value={newPassword}
                  id="new-password"
                  name="newPassword"
                  type="password"
                  required
                  className="relative block w-full mt-1 appearance-none rounded rounded-t-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-pink-500 focus:outline-none focus:ring-pink-500 sm:text-sm"
                  placeholder=""
                />
              </div>
             
            </div>


            <div>
            <button type="submit" className={`${styles['signIn-btn']} flex w-full leading-6 shadow-sm px-3 py-1.5 justify-center`} >Login with new password</button>

            </div>
          </form>
        </div>
      </div>
      {isSignupModalOpen && <Signup onClose={toggleSignupModal} />}
    </div>
  );
};

export default ResetPassword;
