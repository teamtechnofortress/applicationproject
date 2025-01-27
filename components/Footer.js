import React from 'react'
import styles from '../styles/new.module.css'

const Footer = () => {
  return (
    <footer className="footer-site py-8 pt-10 " >
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className={`${styles['footer-desktop']} flex flex-wrap -mx-4  md:p-0 p-4`}>
                <div className="w-full sm:w-1/2 md:w-1/3 lg:w-1/3 xl:w-1/5 mt-20  mb-8">
                    <h3 className={`${styles['footer-sec-h3']} mb-2`}>Company </h3>
                    <ul className={`${styles['footer-sec-p']}`}>
                        <li> <a href="#">About</a> </li>
                        <li> <a href="#">Affiliate</a></li>
                        <li><a href="#">Careers & Culture</a></li>
                        <li> <a href="#">Blog</a></li>
                        <li> <a href="#">Press</a></li>
                    </ul>
                </div>
                <div className="w-full sm:w-1/2 md:w-1/3 lg:w-1/3 xl:w-1/5 mt-20 mb-8">
                    <h3 className={`${styles['footer-sec-h3']} mb-2`}> About Us</h3>
                    <ul className={`${styles['footer-sec-p']} `}>
                        <li> <a href="#">Support Center</a> </li>
                        <li> <a href="#">Customer Support</a></li>
                        <li> <a href="#">About Us</a></li>
                    </ul>
                </div>
                <div className="w-full sm:w-1/2 md:w-1/3 lg:w-1/3 xl:w-1/5 mt-20 mb-8">
                    <h3 className={`${styles['footer-sec-h3']} mb-2`}> Our Information</h3>
                    <ul className={`${styles['footer-sec-p']} `}>
                        <li> <a href="#">Return Policy </a></li>
                        <li> <a href="#">Return Policy </a></li>
                        <li> <a href="#">Terms & Conditions</a></li>
                    </ul>
                </div>
                <div className={`${styles['footer-sec-nav']} w-full sm:w-1/2 md:w-2/3 lg:w-2/3 xl:w-2/5 mb-8 mt-10 flex justify-end`}>
                <img src="/images/whitelogo.png" width="80%" alt="" />
            
                </div>
                
                <div className="flex flex-col lg:flex-row justify-between items-center w-full mb-1 mt-4">
                    <div className="w-full sm:w-1/2 md:w-1/2 lg:w-1/3 xl:w-1/2">
                        <p className={`${styles['footer-sec-p']}`}>Copyright by eljot. 2024</p>
                    </div>
                    <div className="w-full sm:w-1/2 md:w-1/2 lg:w-1/3 xl:w-1/2">
                        <ul className={`${styles['footer-sec-nav']} flex flex-col md:flex-row md:space-x-8 rtl:space-x-reverse justify-end`}>
                            <li> <a href="#">Home</a></li>
                            <li><a href="#">Advertise</a></li>
                            <li><a href="#">Supports</a></li>
                            <li><a href="#">Marketing</a></li>
                            <li><a href="#">FAQ</a></li>
                        </ul>
                    </div>
                </div>

            </div>
            <div className={`${styles['footer-mobile']} flex flex-wrap -mx-4  md:p-0 p-4`}>
                <div className= "w-full sm:w-1/2 md:w-2/3 lg:w-2/3 xl:w-2/5 mb-8 flex justify-center">
                    <img src="/images/whitelogo.png" width="80%" alt="" />
                
                    </div>
                <div className="w-full sm:w-1/2 md:w-1/3 lg:w-1/3 xl:w-1/5 mb-8">
                    <h3 className={`${styles['footer-sec-h3']} mb-2`}>Company </h3>
                    <ul className={`${styles['footer-sec-p']}`}>
                        <li> <a href="#">About</a> </li>
                        <li><a href="#">Affiliate</a></li>
                        <li><a href="#">Careers & Culture</a></li>
                        <li><a href="#">Blog</a></li>
                        <li><a href="#">Press</a></li>
                    </ul>
                </div>
                <div className="w-full sm:w-1/2 md:w-1/3 lg:w-1/3 xl:w-1/5 mb-8">
                    <h3 className={`${styles['footer-sec-h3']} mb-2`}> About Us</h3>
                    <ul className={`${styles['footer-sec-p']} `}>
                        <li><a href="#">Support Center</a> </li>
                        <li><a href="#">Customer Support</a> </li>
                        <li><a href="#">About Us</a></li>
                    </ul>
                </div>
                <div className="w-full sm:w-1/2 md:w-1/3 lg:w-1/3 xl:w-1/5 mb-8">
                    <h3 className={`${styles['footer-sec-h3']} mb-2`}> Our Information</h3>
                    <ul className={`${styles['footer-sec-p']} `}>
                        <li><a href="#">Return Policy </a></li>
                        <li><a href="#">Privacy Policy </a></li>
                        <li><a href="#">Terms & Conditions</a></li>
                    </ul>
                </div>
                
                
                <div className="flex flex-col lg:flex-row justify-between items-center w-full mb-1 mt-4">
                    <div className="w-full sm:w-1/2 md:w-1/2 lg:w-1/3 xl:w-1/2">
                            <ul className={`${styles['footer-sec-nav']} flex flex-col md:flex-row md:space-x-8 sm:flex-row  justify-end`}>
                                <li><a href="#">Home</a></li>
                                <li><a href="#">Advertise</a></li>
                                <li><a href="#">Supports</a></li>
                                <li><a href="#">Marketing</a></li>
                                <li><a href="#">FAQ</a></li>
                            </ul>
                        </div>
                    <div className="w-full sm:w-1/2 md:w-1/2 lg:w-1/3 xl:w-1/2 text-center">
                        <p className={`${styles['footer-sec-p']}`}>Copyright by eljot. 2024</p>
                    </div>
                
                </div>

            </div>
        </div>
    </footer>
  )
}
export default Footer;
