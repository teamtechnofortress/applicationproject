// components/UserNav.js

import React, { useState, useEffect  } from 'react';
import Link from 'next/link';
import router from 'next/router';
import styles from '../styles/login.module.css';
export const UserNav = () => {
  const [isMenuVisible, setMenuVisible] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);

  const toggleMenu = () => {
    setMenuVisible(!isMenuVisible);
  };

  const logOut = async () => {
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_HOST}/api/logout`, {
        method: 'POST', // Change method to POST
        headers: {
          'Content-Type': 'application/json',
        },
      });
      if (res.ok) {
        // Logout successful, redirect or perform any other action
        router.push(`${process.env.NEXT_PUBLIC_HOST}/login`);
        console.log('Logout successful');
      } else {
        // Handle error response
        console.error('Logout failed');
      }
    } catch (error) {
      console.error('Logout failed:', error);
    }
   
  };

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

  return (
    <nav className="bg-white p-4 mx-auto">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          <div className="flex items-center">
            <div className="flex-shrink-0">
                 <a href="" className={`${styles['a-tag']} flex items-center space-x-3 rtl:space-x-reverse`}>
                       <img src="/images/logo.png" className={`${styles['logo']}`}  alt="Flowbite Logo" />
                 </a>
              {/* <Link href="/" legacyBehavior>
                <a className="flex items-center space-x-3 rtl:space-x-reverse">
                  <img src="/images/logo.svg" className="h-8" alt="Flowbite Logo" />
                  <img src="/images/OHNUNGSGURU.svg" className="h-8" alt="Flowbite Logo" />
                </a>
              </Link> */}
            </div>
          </div>
          <div className="md:block">
            <div className="ml-4 flex items-center md:ml-6">
              <div className="relative ml-3">
                <div>
                  <button
                    onClick={toggleMenu}
                    type="button"
                    className="relative flex max-w-xs items-center px-2 py-1 rounded-full text-sm hover:bg-gray-100 focus:outline-none focus:ring-offset-2 focus:ring-offset-gray-800"
                    id="user-menu-button"
                    aria-expanded="false"
                    aria-haspopup="true"
                  >
                    <span className="absolute -inset-1.5"></span>
                    <span className="sr-only">Open user menu</span>
              
                    <img
                    className="h-8 w-8 rounded-full"
                      src={currentUser && currentUser.profileimg ? currentUser.profileimg : "/avatar.png"}
                      alt=""
                    />
                    <span className="ml-3 font-bold">{currentUser ? currentUser.firstname : ''}</span>
                    <i className="fa fa-chevron-down ml-3 text-xs"></i>
                  </button>
                </div>

                {isMenuVisible && (
                  <div
                    className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none"
                    role="menu"
                    aria-orientation="vertical"
                    aria-labelledby="user-menu-button"
                    tabIndex="-1"
                  >
                    <Link href="/account/allapplications" legacyBehavior>
                      <a
                        href="#"
                        className="block px-4 py-2 text-sm text-gray-700"
                        role="menuitem"
                        tabIndex="-1"
                        id="user-menu-item-1"
                      >
                        All Applications
                      </a>
                    </Link>
                    <Link href="/account/profile" legacyBehavior>
                      <a
                        href="#"
                        className="block px-4 py-2 text-sm text-gray-700"
                        role="menuitem"
                        tabIndex="-1"
                        id="user-menu-item-0"
                      >
                        Profile
                      </a>
                    </Link>
                    <Link href="/account/settings" legacyBehavior>
                      <a
                        href="#"
                        className="block px-4 py-2 text-sm text-gray-700"
                        role="menuitem"
                        tabIndex="-1"
                        id="user-menu-item-1"
                      >
                        Account Settings
                      </a>
                    </Link>
                   
                    <a
                      href="#"
                      onClick={logOut}
                      className="block px-4 py-2 text-sm text-gray-700"
                      role="menuitem"
                      tabIndex="-1"
                      id="user-menu-item-2"
                    >
                      Sign out
                    </a>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default UserNav;
