import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import router from 'next/router';
import styles from '../styles/login.module.css';
import { fetchSubscriptionStatus } from '@/utils/user_sub_data.js';
import LoadingSpinner from "@/components/loading";

export const DashboardHeader = () => {
  const [isMenuVisible, setMenuVisible] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);
  const menuRefDesktop = useRef(null);
  const menuRefMobile = useRef(null);
  const menuRef = useRef(null); 
  const [isSubscriptionLoading, setIsSubscriptionLoading] = useState(true);
  const [subscriptionData, setSubscriptionData] = useState(null);
  

  const toggleMenu = () => {
    setMenuVisible(!isMenuVisible);
  };

  const logOut = async () => {
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_HOST}/api/logout`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      if (res.ok) {
        router.push(`${process.env.NEXT_PUBLIC_HOST}/login`);
        console.log('Logout successful');
      } else {
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
          console.error(data.message || 'Failed to fetch user data');
        }
      } catch (error) {
        console.error('Failed to fetch user data');
      }
    };

    const init = async () => {
      const data = await fetchSubscriptionStatus();
      if (data) {
        setSubscriptionData(data);
      }
      setIsSubscriptionLoading(false);
    };
      
    fetchUserData();
    init();
  }, []);

  useEffect(() => {

  }, [subscriptionData]);
  // Close menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        (menuRefDesktop.current && !menuRefDesktop.current.contains(event.target)) &&
        (menuRefMobile.current && !menuRefMobile.current.contains(event.target))
      ) {
        setMenuVisible(false);
      }
    };
  
    if (isMenuVisible) {
      document.addEventListener('mousedown', handleClickOutside);
    }
  
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isMenuVisible]);


  if (isSubscriptionLoading) {
    return (
      <div>
       <LoadingSpinner/>
      </div>
    );
  }
  return (
    <div className="flex">
      <div className="hidden lg:block mt-2 px-4 sm:px-6 lg:px-8">
          <img src="/images/logo.png" alt="Logo" className="h-12" />
      </div>

      <div className="hidden lg:block flex-1">
        <nav className="bg-gray-100">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex h-16 items-center justify-between">
              <div className="flex items-center"></div>
              <div className="flex items-center gap-4 relative ml-3">
                {/* <div className="relative">
                  <img className="h-6 rounded-full" src="/images/Shape.png" alt="" />
                  <span className={`${styles['bell-dot']} absolute top-0 right-0 h-2 w-2 rounded-full`}></span>
                </div> */}
                {subscriptionData !== null ? (
                 <Link href="/account/subscriptiondetail" legacyBehavior>
                   <button className={`${styles['btn-plan']}`}>Mein Plan</button>
                 </Link>
               ) : (
                 <Link href="/account/checkout?selectedPlan=price_one_time" legacyBehavior>
                   <button className={`${styles['btn-plan']}`}>Mein Plan</button>
                 </Link>
               )} 

                <div ref={menuRef}>
                  <button
                    onClick={toggleMenu}
                    type="button"
                    className="relative flex max-w-xs items-center px-2 py-1 rounded-full text-sm hover:bg-gray-100 focus:outline-none focus:ring-offset-2 focus:ring-offset-gray-800"
                    id="user-menu-button"
                    aria-expanded={isMenuVisible}
                    aria-haspopup="true"
                  >
                    <span className="absolute -inset-1.5"></span>
                    <span className="sr-only">Open user menu</span>
                    <img className="h-9 rounded-full" src="/images/profileicon.svg" alt="" />
                    <span className="ml-3 font-bold">{currentUser ? currentUser.firstname : ''}</span>
                    <i className="fa fa-chevron-down ml-3 text-xs"></i>
                  </button>
                  {isMenuVisible && (
                    <div
                      className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none"
                      role="menu"
                      aria-orientation="vertical"
                      aria-labelledby="user-menu-button"
                      tabIndex="-1"
                    >
                      <Link href="/account/allapplications" legacyBehavior>
                        <a className="block px-4 py-2 text-sm text-gray-700" role="menuitem">
                         Deine Bewerbungen
                        </a>
                      </Link>
                      <Link href="/account/profile" legacyBehavior>
                        <a className="block px-4 py-2 text-sm text-gray-700" role="menuitem">
                         Profil
                        </a>
                      </Link>
                      <Link href="/account/settings" legacyBehavior>
                        <a className="block px-4 py-2 text-sm text-gray-700" role="menuitem">
                          Kontoeinstellungen
                        </a>
                      </Link>
                      <a
                        href="#"
                        onClick={logOut}
                        className="block px-4 py-2 text-sm text-gray-700"
                        role="menuitem"
                      >
                        Abmelden
                      </a>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </nav>
      </div>
      <div className="block lg:hidden flex-1">
        <nav className="bg-gray-100">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div>
              <div className="flex h-16 items-center gap-4 relative ml-3 justify-between">
              {subscriptionData !== null ? (
                 <Link href="/account/subscriptiondetail" legacyBehavior>
                   <button className={`${styles['btn-plan']}`}>Mein Plan</button>
                 </Link>
               ) : (
                 <Link href="/account/checkout?selectedPlan=price_one_time" legacyBehavior>
                   <button className={`${styles['btn-plan']}`}>Mein Plan</button>
                 </Link>
               )}           
                

                <div ref={menuRef}>
                  <button
                    onClick={toggleMenu}
                    type="button"
                    className="relative flex max-w-xs items-center px-2 py-1 rounded-full text-sm hover:bg-gray-100 focus:outline-none focus:ring-offset-2 focus:ring-offset-gray-800"
                    id="user-menu-button"
                    aria-expanded={isMenuVisible}
                    aria-haspopup="true"
                  >
                    <span className="absolute -inset-1.5"></span>
                    <span className="sr-only">Open user menu</span>
                    <img className="h-9 rounded-full" src="/images/profileicon.svg" alt="" />
                    <span className="ml-3 font-bold">{currentUser ? currentUser.firstname : ''}</span>
                    <i className="fa fa-chevron-down ml-3 text-xs"></i>
                  </button>
                  {isMenuVisible && (
                    <div
                      className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none"
                      role="menu"
                      aria-orientation="vertical"
                      aria-labelledby="user-menu-button"
                      tabIndex="-1"
                    >
                      <Link href="/account/allapplications" legacyBehavior>
                        <a className="block px-4 py-2 text-sm text-gray-700" role="menuitem">
                         Deine Bewerbungen
                        </a>
                      </Link>
                      <Link href="/account/profile" legacyBehavior>
                        <a className="block px-4 py-2 text-sm text-gray-700" role="menuitem">
                         Profil
                        </a>
                      </Link>
                      <Link href="/account/settings" legacyBehavior>
                        <a className="block px-4 py-2 text-sm text-gray-700" role="menuitem">
                          Kontoeinstellungen
                        </a>
                      </Link>
                      <a
                        href="#"
                        onClick={logOut}
                        className="block px-4 py-2 text-sm text-gray-700"
                        role="menuitem"
                      >
                        Abmelden
                      </a>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </nav>
      </div>
    </div>
  );
};

export default DashboardHeader;
