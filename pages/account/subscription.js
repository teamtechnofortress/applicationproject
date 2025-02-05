import React, { useState, useEffect } from 'react';
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import SidebarHeader from '@/components/SidebarHeader';
import styles from '../../styles/profile.module.css';
import Link from "next/link";
import { useRouter } from 'next/router';


const Account = () => {
  const [isOpen, setIsOpen] = useState(false);
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
    if (newPassword !== confirmPassword) {
      toast.error('New password and confirm password do not match.');
      return;
    }
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
     
     <div className="flex-1 ml-64">
     <div className="bg-gray-100 py-8 p-12">
       <div className="mx-auto px-4 sm:px-6 lg:px-8 p-4">
         <nav className="">
           <h1 className={`${styles['heading-dash']}`}>Einstellungen</h1>
           <div  id="navbar-default">
             <ul className={`${styles['nav-form']} flex flex-wrap items-center`}>
               <li className={`${styles['nav-form-li']} `}>
                 <Link href="/account/profile" legacyBehavior>
                   <a href="#" className="block py-2 px-3" aria-current="page">
                     Profil
                   </a>
                 </Link>
               </li>
               <li className={`${styles['nav-form-li']}`}>
                 <Link href="/account/settings" legacyBehavior>
                   <a href="#" className="block py-2 px-3">
                     Kontoeinstellungen
                   </a>
                 </Link>
               </li>
               <li className={`${styles['nav-form-li']} ${styles['active']}`}>
                 <Link href="/account/subscription" legacyBehavior>
                   <a href="#" className="block py-2 px-3">
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
                <h3 className={`${styles['heading-personl']}`}>Ihre Mitgliedschaft</h3>
                <div className="grid grid-cols-1 gap-4 mt-5">
                  <div className="flex justify-between items-center">
                    <div className='w-[60%]'>
                      <p className={`${styles['span-email']}`}>Wohnungmappe 6 Monate</p>
                      <p className={`${styles['old-email']} mt-3`}>Ihr CVMaker-Abonnement ist abgelaufen. Der Zugriff auf Pro-Funktionen wie
                        PDF-Download und volle Funktionalität ist nicht mehr verfügbar. Aktivieren Sie 
                        Ihr Konto erneut, um die Pro-Funktionen weiterhin nutzen zu können.
                       </p>
                    </div>
                    <button
                      onClick={() => setIsOpen(true)}
                      className={`${styles['email-btn']} bg-blue-500 text-white px-4 py-2 rounded`}
                    >
                      Verlängern
                    </button>
                    {/* Popup Overlay */}
                    {isOpen && (
                        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
                          <div className="bg-white p-6 rounded-lg shadow-lg w-96 relative">
                            {/* Close Button (X) */}
                            <button 
                              onClick={() => setIsOpen(false)} 
                              className={`absolute top-2 right-2 text-gray-600 hover:text-gray-900 text-xl`}
                            >
                              &times;
                            </button>

                            <h2 className="text-lg font-bold mb-4">Verlängern</h2>
                            <input
                              type="email"
                              placeholder="Verlängern E-Mail-Adresse"
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
          </div>
        </div>
        </div>
      </div>
      </div>
      
    </>
  );
}
export default Account;
