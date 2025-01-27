import React, { useState } from "react";
import Link from "next/link";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import styles from '../styles/login.module.css'
import Signup from "@/components/Signup";

const Forgot = () => {
  const [isSignupModalOpen, setIsSignupModalOpen] = useState(false);
  const [email, setEmail] = useState('');

  const toggleSignupModal = () => {
    setIsSignupModalOpen(!isSignupModalOpen);
  };

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
              Forgot Password
            </h2>
          </div>
          <form onSubmit={handleSubmit} className="mt-8 space-y-6" action="#" method="POST">
            <input type="hidden" name="remember" value="true" />
            <div className="space-y-px rounded-md shadow-sm">
              <div className="mt-3 mb-3">
                <label htmlFor="email" className={`${styles['label-input']}`}>
                  Email address
                </label>
                <input
                  onChange={handleChange}
                  value={email}
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  className="relative block w-full mt-1 appearance-none rounded rounded-t-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-pink-500 focus:outline-none focus:ring-pink-500 sm:text-sm"
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
      {isSignupModalOpen && <Signup onClose={toggleSignupModal} />}
    </div>
  );
};

export default Forgot;
