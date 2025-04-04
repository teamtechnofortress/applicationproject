import React, { useState, useEffect } from 'react';
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import SidebarHeader from '@/components/SidebarHeader';
import styles from '../../styles/profile.module.css';
import Link from "next/link";
import { useRouter } from 'next/router';


const Account = () => {
  const [isMailOpen, setisMailOpen] = useState(false);
  const [isPasswordOpen, setisPasswordOpen] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);
  const [newEmail, setNewEmail] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const router = useRouter();

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const res = await fetch('/api/user/get', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        });
        const data = await res.json();
        if (res.ok) {
          setCurrentUser(data.user);
        } else {
          toast.error(data.message || 'Failed to fetch user data');
        }
      } catch (error) {
        toast.error('Failed to fetch user data');
      }
    };

    fetchUserData();
  }, []);

  const handleEmailUpdate = async (e) => {
    e.preventDefault();
    const res = await fetch('/api/user/send-otp', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ newEmail }),
    });
    const data = await res.json();

    if (res.status === 200) {
      toast.success(data.message);
      setTimeout(() => {
        router.push('/account/verify-otp');
      }, 2000); // 2 seconds delay
    } else {
      toast.error(data.message);
    }
  };

  const handlePasswordUpdate = async (e) => {
    e.preventDefault();
    // if (newPassword !== confirmPassword) {
    //   toast.error('New password and confirm password do not match.');
    //   return;
    // }
    try {
      const res = await fetch('/api/user/update-password', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ newPassword }),
      });
      const data = await res.json();
      if (res.ok) {
        toast.success('Your password has been updated successfully.');
        setNewPassword('');
        setConfirmPassword('');
      } else {
        toast.error(data.message || 'Failed to update password.');
      }
    } catch (error) {
      toast.error('Failed to update password. Please try again later.');
    }
  };

  return (
    <>
      <SidebarHeader />
      <ToastContainer />
      <div className="flex">
     
     <div className="flex-1 ml-0 md:ml-64">
     <div className="bg-gray-100 py-8 p-0 md:p-12">
       <div className="mx-auto px-4 sm:px-6 lg:px-8 p-4">
         <nav className="">
           <h1 className={`${styles['heading-dash']}`}>Einstellungen</h1>
           <div  id="navbar-default">
             <ul className={`${styles['nav-form']} flex flex-wrap items-center`}>
               <li className={`${styles['nav-form-li']} `}>
                 <Link href="/account/profile" legacyBehavior>
                   <a href="#" className="block py-2 px-1 md:px-3" aria-current="page">
                     Profil
                   </a>
                 </Link>
               </li>
               <li className={`${styles['nav-form-li']} ${styles['active']}`}>
                 <Link href="/account/settings" legacyBehavior>
                   <a href="#" className="block py-2 px-1 md:px-3">
                     Kontoeinstellungen
                   </a>
                 </Link>
               </li>
               <li className={`${styles['nav-form-li']}`}>
                 <Link href="/account/subscription" legacyBehavior>
                   <a href="#" className="block py-2 px-1 md:px-3">
                   Abonnement
                   </a>
                 </Link>
               </li>
             </ul>
           </div>
         </nav>

          <div className="gap-4 mt-4">
            <form className={`${styles['form-spacing']} mt-4`} onSubmit={handleEmailUpdate}>
              <div className={`${styles['two-third']} p-10`}>
                <h3 className={`${styles['heading-personl']}`}>E-Mail-Adresse</h3>
                <div className="grid grid-cols-1 gap-4 mt-5">
                  <div className="block md:flex justify-between items-center">
                    <p className={`${styles['old-email']}`}>Ihre E-Mail-Adresse lautet <span className={`${styles['span-email']}`}>{currentUser ? currentUser.email : ''}</span></p>
                    <button
                      type="button"
                      onClick={() => setisMailOpen(true)}
                      className={`${styles['email-btn']} mt-2 md:mt-0 bg-blue-500 text-white px-4 py-2 p-4 rounded`}
                    >
                      E-Mail-Adresse ändern
                    </button>
                    {/* Popup Overlay */}
                    {isMailOpen && (
                        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
                          <div className="bg-white p-6 rounded-lg shadow-lg w-96 relative">
                            {/* Close Button (X) */}
                            <button 
                              onClick={() => setisMailOpen(false)} 
                              className={`absolute top-2 right-2 text-gray-600 hover:text-gray-900 text-xl`}
                            >
                              &times;
                            </button>

                            <h2 className="text-lg font-bold mb-4">E-Mail-Adresse ändern</h2>
                            <input
                              type="email"
                              placeholder="Neue E-Mail-Adresse"
                              value={newEmail}
                              onChange={(e) => setNewEmail(e.target.value)}
                              className="w-full p-2 border border-gray-300 rounded mb-4"
                              required
                            />
                            <div className="flex justify-end space-x-2">
                              <button type="submit" className={`${styles['email-btn']} bg-blue-500 text-white px-4 py-2 rounded`}>
                                Speichern
                              </button>
                            </div>
                          </div>
                        </div>
                      )}
                    
                  </div>
                </div>
              </div>
            </form>

            <form className={`${styles['form-spacing']} mt-4`} onSubmit={handlePasswordUpdate}>
              
              <div className={`${styles['two-third']} p-10 mt-9`}>
               
                <div className="grid grid-cols-1 gap-4 mt-5">
                <div className="block md:flex justify-between items-center">
                    <h3 className={`${styles['heading-personl']}`}>Passwort</h3>
                    <button
                     type="button"
                      onClick={() => setisPasswordOpen(true)}
                      className={`${styles['email-btn']} bg-blue-500 mt-2 md:mt-0 text-white px-4 py-2 rounded`}
                    >
                      Passwort ändern
                    </button>
                    {/* Popup Overlay */}
                    {isPasswordOpen && (
                        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
                          <div className="bg-white p-6 rounded-lg shadow-lg w-96 relative">
                            {/* Close Button (X) */}
                            <button 
                              onClick={() => setisPasswordOpen(false)} 
                              className={`absolute top-2 right-2 text-gray-600 hover:text-gray-900 text-xl`}
                            >
                              &times;
                            </button>

                            <h2 className="text-lg font-bold mb-4">Passwort ändern</h2>
                            <input
                              type="password"
                              placeholder="Neue Passwort"
                              value={newPassword}
                              onChange={(e) => setNewPassword(e.target.value)}
                              className="w-full p-2 border border-gray-300 rounded mb-4"
                              required
                            />
                            <div className="flex justify-end space-x-2">
                              <button type="submit" className={`${styles['email-btn']} bg-blue-500 text-white px-4 py-2 rounded`}>
                                Speichern
                              </button>
                            </div>
                          </div>
                        </div>
                      )}
                    
                  </div>
                </div>
              </div>
            </form>

            <div className={`${styles['two-third']} p-10 mt-9`}>
            <h3 className={`${styles['heading-personl']}`}>Benachrichtigungen</h3>
                <div className="flex justify-between items-center pb-10">
                  <div className='mt-4'>
                  <h3 className={`${styles['heading-news']}`}>Newsletter</h3>
                  <p className={`${styles['p-news']}`}>Erhalten Sie unseren wöchentlichen Newsletter in Ihrer Mailbox</p>
                  </div>
                  <label className="switch relative inline-block w-12 h-6">
                    <input type="checkbox" className="opacity-0 w-0 h-0 peer" />
                    <span className="slider absolute inset-0 bg-gray-400 rounded-full transition-all duration-300 peer-checked:bg-[var(--active-color)]"
                    style={{ "--active-color": "#e7fc41" }}></span>
                    {/* <span className="slider absolute inset-0 bg-gray-400 rounded-full transition-all duration-300 peer-checked:bg-blue-500"></span> */}
                    <span className="dot absolute left-1 top-1 w-4 h-4 bg-white rounded-full transition-all duration-300 peer-checked:translate-x-6"></span>
                  </label>
                </div>
              </div>
          </div>
        </div>
        </div>
      </div>
      </div>
      
    </>
  );
}
export default Account;
