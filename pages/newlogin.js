import React, {useState} from "react";
import Link from "next/link";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import router from "next/router";
import styles from '../styles/newlogin.module.css'
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
      <div className={`${styles['body-background']} flex min-h-full items-center justify-center`}>
        <div className={`${styles['login-form']} w-full max-w-md space-y-8`}>
          <div>
            <h2 className={`${styles['heading-login']} mt-3 text-gray-900`}>
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
                  placeholder="Username or email address"
                />
              </div>
              <div>

              <div className="mt-8">
                <input
                  onChange={handleChange}
                  value={password}
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="current-password"
                  required
                  className={`${styles['input-field']}`}
                  placeholder="Password"
                />
              </div>
              <div className={`${styles['forgot-link']} mt-6`}>
                    <Link
                      href="/forgot"
                      className="font-medium">
                      Forgot password
                    </Link>
                  </div>
                </div>
            </div>


            <div className="mt-3 mb-6">
               <button type="submit" className={`${styles['signIn-btn']} flex w-full leading-6 shadow-sm px-3 py-1.5 justify-center`} >REGISTRIERE DICH KOSTENLOS</button>
               <p className={`${styles['p-login']} mt-5`}>Indem du auf “Kostenlos registrieren” klickst, erklärst du, dass du die <span>Datenschutzerklärung</span>  und <span>Allgemeinen Geschäftsbedingungen</span>  gelesen hast und akzeptierst.</p>
            </div>
          </form>
        </div>
      </div>
      {isSignupModalOpen && <Signup onClose={toggleSignupModal} />}
    </div>
  );
};

export default Login