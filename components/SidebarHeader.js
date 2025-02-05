import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import router from 'next/router';
import styles from '../styles/login.module.css';

export const DashboardHeader = () => {
  const [isMenuVisible, setMenuVisible] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);
  const menuRef = useRef(null); // Reference for the dropdown menu

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

    fetchUserData();
  }, []);

  // Close menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setMenuVisible(false);
      }
    };

    if (isMenuVisible) {
      document.addEventListener('mousedown', handleClickOutside);
    } else {
      document.removeEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isMenuVisible]);

  return (
    <div className="flex">
      <div className="bg-white shadow-md w-64 p-5 h-full fixed">
        <div className="mb-6">
          <a href="/">
          <img src="/images/logo.png" alt="Logo" className="h-12" />
          </a>
          <h1 className={`${styles['sidebar-h1']} mt-10`}>Invite + recommend friends</h1>
          <div className={`${styles['progress-circle']} relative`}>
            <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
              <circle strokeWidth="8" cx="50" cy="50" r="40" fill="none"></circle>
              <circle
                className="text-gray-900 progress-ring__circle stroke-current"
                strokeWidth="8"
                strokeLinecap="round"
                cx="50"
                cy="50"
                r="40"
                fill="transparent"
                strokeDasharray="251.2"
                strokeDashoffset="calc(251.2px - (251.2px * 70) / 100)"
              ></circle>
            </svg>
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="text-xl font-bold mb-10 text-gray-700 progress-text">70%</span>
            </div>
            <p className={`${styles['progress-p']} font-bold text-gray-700 text-center`}>Applicant folder</p>
          </div>
          <button className={`${styles['btn-tip']}`}>Tipps</button>
        </div>
      </div>

      <div className="flex-1 ml-64">
        <nav className="bg-gray-100">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex h-16 items-center justify-between">
              <div className="flex items-center"></div>
              <div className="flex items-center gap-4 relative ml-3">
                <div className="relative">
                  <img className="h-6 rounded-full" src="/images/Shape.png" alt="" />
                  <span className={`${styles['bell-dot']} absolute top-0 right-0 h-2 w-2 rounded-full`}></span>
                </div>
                <button className={`${styles['btn-plan']}`}>Mein Plan</button>

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
                    <img className="h-9 rounded-full" src="/images/icon.png" alt="" />
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
                          All Applications
                        </a>
                      </Link>
                      <Link href="/account/profile" legacyBehavior>
                        <a className="block px-4 py-2 text-sm text-gray-700" role="menuitem">
                          Profile
                        </a>
                      </Link>
                      <Link href="/account/settings" legacyBehavior>
                        <a className="block px-4 py-2 text-sm text-gray-700" role="menuitem">
                          Account Settings
                        </a>
                      </Link>
                      <a
                        href="#"
                        onClick={logOut}
                        className="block px-4 py-2 text-sm text-gray-700"
                        role="menuitem"
                      >
                        Sign out
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
