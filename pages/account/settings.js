import React, { useState, useEffect } from 'react';
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import UserNav from '@/components/UserNav';
import styles from '../../styles/profile.module.css';
import Link from "next/link";
import { useRouter } from 'next/router';


const Account = () => {
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
      <UserNav />
      <ToastContainer />
      <div className="py-8 p-10">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <nav className="bg-white">
            <div className="w-full md:block md:w-auto" id="navbar-default">
              <ul className={`${styles['nav-form']} flex flex-wrap items-center`}>
                <li className={`${styles['nav-form-li']}`}>
                  <Link href="/account/profile" legacyBehavior>
                    <a href="#" className="block py-2 px-3" aria-current="page">Profil</a>
                  </Link>
                </li>
                <li className={`${styles['nav-form-li']} ${styles['active']}`}>
                  <Link href="/account/settings" legacyBehavior>
                    <a href="#" className="block py-2 px-3">Kontoeinstellungen</a>
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
                  <div className="...">
                    <label className={`${styles['loginform-label']}`}>Current Email Address</label>
                    <div className={`${styles['input-field']} read_only_field mt-1`}>
                      <input
                        type="email"
                        className={`${styles['form-input']} read_only_field form-control`}
                        value={currentUser ? currentUser.email : ''}
                        readOnly
                      />
                    </div>
                  </div>
                  <div className="...">
                    <label className={`${styles['loginform-label']}`}>New E-Mail-Adresse</label>
                    <div className={`${styles['input-field']} mt-1`}>
                      <input
                        type="email"
                        className={`${styles['form-input']} form-control`}
                        value={newEmail}
                        onChange={(e) => setNewEmail(e.target.value)}
                        placeholder="E-Mail"
                        required
                      />
                    </div>
                  </div>
                </div>
                <div className="text-end mt-3">
                  <button type="submit" className={`${styles['update-btn']} leading-6 shadow-sm px-3 py-1.5`}>Update now</button>
                </div>
              </div>
            </form>

            <form className={`${styles['form-spacing']} mt-4`} onSubmit={handlePasswordUpdate}>
              <div className={`${styles['two-third']} p-10 mt-9`}>
                <h3 className={`${styles['heading-personl']} mt-9`}>Passwort</h3>
                <div className="grid grid-cols-1 gap-4 mt-5">
                  <div className="...">
                    <label className={`${styles['loginform-label']}`}>New Passwort</label>
                    <div className={`${styles['input-field']} mt-1`}>
                      <input
                        type="password"
                        className={`${styles['form-input']} form-control`}
                        value={newPassword}
                        onChange={(e) => setNewPassword(e.target.value)}
                        placeholder="New Password"
                        required
                      />
                    </div>
                  </div>
                  <div className="...">
                    <label className={`${styles['loginform-label']}`}>Confirm Passwort</label>
                    <div className={`${styles['input-field']} mt-1`}>
                      <input
                        type="password"
                        className={`${styles['form-input']} form-control`}
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        placeholder="Confirm Password"
                        required
                      />
                    </div>
                  </div>
                </div>
                <div className="text-end mt-3">
                  <button type="submit" className={`${styles['update-btn']} leading-6 shadow-sm px-3 py-1.5`}>Update now</button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}
export default Account;
