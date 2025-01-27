import React, {useState} from "react";
import Link from "next/link";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import router from "next/router";
import styles from '../styles/login.module.css'
import Signup from "@/components/Signup";

const Login = () => {
  console.log('host url', process.env.NEXT_PUBLIC_HOST)
  const [isSignupModalOpen, setIsSignupModalOpen] = useState(false);

  const toggleSignupModal = () => {
    setIsSignupModalOpen(!isSignupModalOpen);
  };

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const handleChange = (e) => {
      if(e.target.name == 'email') {
        setEmail(e.target.value)
      }
      else if(e.target.name == 'password') {
        setPassword(e.target.value)
      }
  }

  const handleSubmit = async (e) => {
      e.preventDefault()
      const data = {email, password}
      console.log('NEXT_PUBLIC_HOST:', `${process.env.NEXT_PUBLIC_HOST}/api/login`);

      
      let res = await fetch(`${process.env.NEXT_PUBLIC_HOST}/api/login`, {
        method: "POST", // or 'PUT'
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      })
      let response = await res.json()

      setEmail('')
      setPassword('')
      if(response.success) {
      //   localStorage.setItem('token', response.token)
      toast.success('Successfully Login!', {
        position: "top-center",
        autoClose: 1500,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        });

        router.push(`${process.env.NEXT_PUBLIC_HOST}/account/allapplications`)
        
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
            <a href="" className={`${styles['a-tag']} flex items-center space-x-3 rtl:space-x-reverse`}>
                       <img src="/images/logo.png" className={`${styles['logo']}`}  alt="Flowbite Logo" />
                   </a>
            {/* <Link href="/" legacyBehavior>
              <a className="flex items-center space-x-3 rtl:space-x-reverse">
                <img src="/images/logo.svg" className="h-8" alt="Flowbite Logo" />
                <img src="/images/OHNUNGSGURU.svg" className="h-8" alt="Flowbite Logo" />
              </a>
            </Link> */}
               <button data-collapse-toggle="navbar-default" type="button" className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:footer-sec-p dark:hover:bg-gray-700 dark:focus:ring-gray-600" aria-controls="navbar-default" aria-expanded="false">
                  <span className="sr-only">Open main menu</span>
                  <svg className="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 17 14">
                     <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 1h15M1 7h15M1 13h15"/>
                  </svg>
               </button>
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
            Login
            </h2>
          </div>
          <form onSubmit={handleSubmit} className="mt-8 space-y-6" method="POST">
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
                  placeholder=""
                />
              </div>
              <div>

              <div className="flex items-center justify-between">
                  <div className="flex items-center">
                  <label htmlFor="password" className={`${styles['label-input']}`}>
                      Password
                    </label>
                  </div>

                  <div className={`${styles['forgot-link']}`}>
                    <Link
                      href="/forgot"
                      className="font-medium">
                      Forgot your password?
                    </Link>
                  </div>
                </div>
               
                <input
                  onChange={handleChange}
                  value={password}
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="current-password"
                  required
                  className="relative block mt-1 w-full appearance-none rounded rounded-b-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-pink-500 focus:outline-none focus:ring-pink-500 sm:text-sm"
                  placeholder=""
                />
              </div>
            </div>


            <div>
            <button type="submit" className={`${styles['signIn-btn']} flex w-full leading-6 shadow-sm px-3 py-1.5 justify-center`} >Sign in</button>

            </div>
          </form>
        </div>
      </div>
      {isSignupModalOpen && <Signup onClose={toggleSignupModal} />}
    </div>
  );
};

export default Login