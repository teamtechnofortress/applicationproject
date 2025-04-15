import React, { useState , useEffect} from 'react';
import Signup from "@/components/Signup";
import Link from "next/link";
import styles from '../styles/new.module.css';

const Nav = () => {
    const [currentUser, setCurrentUser] = useState(null);
   
   const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

   

   const toggleMobileMenu = () => {
       setIsMobileMenuOpen(!isMobileMenuOpen);
   };
   useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await fetch("/api/user/get"); // Adjust your API endpoint
        const data = await res.json();
        if (res.ok && data.user) {
          setCurrentUser(data.user);
        }
      } catch (error) {
        console.error("Failed to fetch user:", error);
      }
    };

    fetchUser();
  }, []);


   return (
       <section className="container mx-auto">
           <nav className="bg-white border-gray-200 pt-8 relative">
               <div className="flex flex-wrap items-center justify-between mx-auto p-4">
                   <a href="#" className={`${styles['a-tag']} flex items-center space-x-3 rtl:space-x-reverse`}>
                       <img src="/images/logo.png" className={`${styles['logo']}`} alt="Flowbite Logo" />
                   </a>
                   <button
                       data-collapse-toggle="navbar-default"
                       type="button"
                       className={`${styles['nav-toggle-btn']} ${isMobileMenuOpen ? styles['active'] : ''} inline-flex items-center p-2 w-10 h-10 justify-center text-sm rounded-lg md:hidden`}
                       aria-controls="navbar-default"
                       aria-expanded={isMobileMenuOpen}
                       onClick={toggleMobileMenu}
                   >
                       <span className="sr-only">Open main menu</span>
                       <svg className="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 17 14">
                           <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 1h15M1 7h15M1 13h15"/>
                       </svg>
                   </button>
                   <div className={`absolute top-full left-0 w-full md:static md:w-auto ${isMobileMenuOpen ? 'block' : 'hidden'}`} id="navbar-default">
                       <ul className={`${styles['header-nav-list']} font-medium flex m-2 flex-col p-4 md:p-0 mt-4 border border-gray-100 rounded-lg md:flex-row md:space-x-8 rtl:space-x-reverse`}>
                           <li className="p-2 border-b-2 border-white">
                               <a href="#" className={`${styles['nav-item']} block`}>Preise</a>
                           </li>
                           <li className="p-2 border-b-2 border-white">
                               <a href="#" className={`${styles['nav-item']} block`}>Layouts</a>
                           </li>
                           <li className={`${styles['btn-login']} p-2 border-b-2 border-white`}>
                               <Link href="/login" legacyBehavior>
                                   <div>
                                       <a className={`${styles['nav-item']} block`}>Login</a>
                                       <img src="/images/loginbg.png"/>
                                   </div>
                               </Link>
                           </li>
                       </ul>
                   </div>
                   <div className="hidden w-full md:block md:w-auto" id="navbar-default">
                       <ul className="font-medium flex flex-col p-4 md:p-0 mt-4 border border-gray-100 rounded-lg bg-gray-50 md:flex-row md:space-x-8 rtl:space-x-reverse md:mt-0 md:border-0 md:bg-white">
                           <li className="p-2 border-b-2 border-white">
                               <a href="#" className={`${styles['nav-item']} block text-center`}>Preise</a>
                           </li>
                           <li className="p-2 border-b-2 border-white">
                               <a href="#" className={`${styles['nav-item']} block text-center`}>Layouts</a>
                           </li>
                           {currentUser ? (
                           <li className={`${styles['btn-login']} p-2 border-b-2 border-white`}>
                               <Link href="/account/allapplications" legacyBehavior>
                                   <div>
                                       <a className={`${styles['nav-item']} block text-center`}>Mein Konto</a>
                                       <img src="/images/loginbg.png"/>
                                   </div>
                               </Link>
                           </li>
                           ) : (
                            <li className={`${styles['btn-login']} p-2 border-b-2 border-white`}>
                                    <Link href="/login" legacyBehavior>
                                        <div>
                                            <a className={`${styles['nav-item']} block text-center`}>Login</a>
                                            <img src="/images/loginbg.png"/>
                                        </div>
                                    </Link>
                                </li>
                           )}
                           
                       </ul>
                   </div>
               </div>
           </nav>
       </section>
   );
}

export default Nav;
