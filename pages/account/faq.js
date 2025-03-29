import React, { useState } from 'react';
import SidebarHeader from '@/components/SidebarHeader';
import Link from 'next/link';
import styles from '../../styles/faq.module.css';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const FAQ = () => {
  // Set the default open index to 0 (first FAQ item)
  const [openIndex, setOpenIndex] = useState(0);

  // Toggle Accordion Item
  const toggleAccordion = (index) => {
    setOpenIndex(openIndex === index ? null : index); // Close if already open, else open
  };

  return (
    <>
      <SidebarHeader />
      <ToastContainer />
      <div className="flex">
        <div className="flex-1 ml-0 md:ml-64">
          <div className="bg-gray-100 py-8 p-12">
            <div className="mx-auto px-4 sm:px-6 lg:px-8 p-4">
            <h1 className={`${styles['faq-h1']}`}>Frequently <br />asked questions</h1>
              <div className="block md:flex gap-4 mt-4">
                <div className="w-full md:w-2/3">
                  <div className={`${styles['faq-section']}`}>
                    

                    <div className="space-y-6">
                      {/* FAQ Item 1 */}
                      <div className={`${styles['faq-item']} p-4`}>
                        <button
                          onClick={() => toggleAccordion(0)}
                          className="w-full text-left font-semibold text-xl rounded-lg flex items-center justify-between"
                        >
                          <span>How do I sign up?</span>
                          <span className={`${styles['open']}`}>
                            {openIndex === 0 ? '-' : '+'}
                          </span>
                        </button>
                        {openIndex === 0 && (
                          <div className="mt-2 rounded-lg">
                            <p>
                              To sign up, click on the "Sign Up" button at the top of the page and fill in your details.
                            </p>
                          </div>
                        )}
                      </div>

                      {/* FAQ Item 2 */}
                      <div className={`${styles['faq-item']}  p-4`}>
                        <button
                          onClick={() => toggleAccordion(1)}
                          className="w-full text-left font-semibold text-xl rounded-lg flex items-center justify-between"
                        >
                          <span>How do I reset my password?</span>
                          <span className={`${styles['open']}`}>
                            {openIndex === 1 ? '-' : '+'}
                          </span>
                        </button>
                        {openIndex === 1 && (
                          <div className="mt-2 rounded-lg">
                            <p>
                              If you've forgotten your password, click on the "Forgot Password?" link on the login page and follow the instructions.
                            </p>
                          </div>
                        )}
                      </div>

                      {/* FAQ Item 3 */}
                      <div className={`${styles['faq-item']} p-4`}>
                        <button
                          onClick={() => toggleAccordion(2)}
                          className="w-full text-left font-semibold text-xl rounded-lg flex items-center justify-between"
                        >
                          <span>Can I update my account information?</span>
                          <span className={`${styles['open']}`}>
                            {openIndex === 2 ? '-' : '+'}
                          </span>
                        </button>
                        {openIndex === 2 && (
                          <div className="mt-2 rounded-lg">
                            <p>
                              Yes, you can update your account information by going to the "Profile" section of your account.
                            </p>
                          </div>
                        )}
                      </div>

                      {/* FAQ Item 4 */}
                      <div className={`${styles['faq-item']} p-4`}>
                        <button
                          onClick={() => toggleAccordion(3)}
                          className="w-full text-left font-semibold text-xl rounded-lg flex items-center justify-between"
                        >
                          <span>How do I contact support?</span>
                          <span className={`${styles['open']}`}>
                            {openIndex === 3 ? '-' : '+'}
                          </span>
                        </button>
                        {openIndex === 3 && (
                          <div className="mt-2 rounded-lg">
                            <p>
                              You can contact support by visiting the "Contact Us" page or sending us an email at support@example.com.
                            </p>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Profile Section */}
                <div className={`${styles['second-sec']} w-full md:w-1/3 p-10`}>
                  <img src="/images/message.svg" className='mx-auto mt-2 mb-10'/>
                  <h3 className={`${styles['heading-faq']}`}>Do you have more questions?</h3>
                  <p className={`${styles['p-faq']} mt-4`}>
                  End-to-end payments and financial management in a single solution. Meet the right platform to help realize.
                  </p>
                  <button className={`${styles['btn-tip']}`}>Wohnungsmappe fertigstellen</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default FAQ;
