import React, { useState } from 'react';
import SidebarHeader from '@/components/SidebarHeader';
import styles from '../../styles/subscription.module.css';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const CheckoutOld = () => {
    const [buttonTwo, setbuttonTwo] = useState(false);
    const [visibleSection, setVisibleSection] = useState("section1");
  return (
    <>
      <SidebarHeader />
      <ToastContainer />
      <div className="flex">
        <div className="flex-1 ml-64">
        <div className="bg-gray-100 py-8 p-12">
            <div className="mx-auto px-4 sm:px-6 lg:px-8 p-4">
              <h1 className={`${styles['subscription-h1']}`}>
                 Schneller in dein Traumzuhause mit Wohnungsmappe
              </h1>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-6 mt-20 pt-20">
                {/* Card 1 */}
                <div className={`${styles['payment-card']} bg-white p-4`}>
                <div className="bg-gray-100 p-6 mt-4 flex flex-col sm:flex-row gap-4">

                    <div className={`${styles['circle-sec']}`}>
                      <p className={`${styles['deine']}`}>Deine Bestellung: </p>
                      <p className={`${styles['wohnungmappe']}`}>Wohnungmappe 6 Monate</p>
                    </div>
                    <div className={`${styles['text-sec']}`}>
                      <h3 className={`${styles['price']}`}>19,99€ <span>/ Monat</span></h3>
                    </div>
                  </div>
                  {/* Toggle Buttons */}
                  <h3 className={`${styles['deine']} mt-10`}>Zahlungsmethode:</h3>
                    <div className="flex gap-4 border-b border-gray-300">
                      <button
                        className={`w-1/5  ${
                          visibleSection === "section1" 
                        }`}
                        onClick={() => setVisibleSection("section1")}
                      >
                        <img src="/images/credit-card.png" alt="icon" className='p-2 sm:p-4'/>
                      </button>
                      <button
                        className={`w-1/5 ${
                          visibleSection === "section2" 
                        }`}
                        onClick={() => setVisibleSection("section2")}
                      >
                       <img src="/images/credit-card.png" alt="icon" className='p-2 sm:p-4' />
                      </button>
                      <button
                        className={`w-1/5  ${
                          visibleSection === "section3"
                        }`}
                        onClick={() => setVisibleSection("section3")}
                      >
                       <img src="/images/credit-card.png" alt="icon" className='p-2 sm:p-4' />
                      </button>
                      <button
                        className={`w-1/5 ${
                          visibleSection === "section4"
                        }`}
                        onClick={() => setVisibleSection("section4")}
                      >
                       <img src="/images/credit-card.png" alt="icon" className='p-2 sm:p-4' />
                      </button>
                    </div>

                    {/* Section Content */}
                    <div className="p-4 mt-4 rounded">
                      {visibleSection === "section1" && 
                      <div className="grid grid-cols-1 gap-4 mt-3 mb-3">
                      {/* Full-width Input */}
                      <div className="input-field mt-2">
                        <label className={`${styles["label"]}`}>Kartennummer</label>
                        <input
                          type="text"
                          className={`${styles["form-input"]} form-input w-full`}
                          id="kartennummer"
                          name="Kartennummer"
                          placeholder="121312313212"
                        />
                      </div>
                    
                      {/* Two Inputs Side by Side */}
                      <div className="grid grid-cols-2 gap-4">
                        <div className="input-field mt-2">
                        <label className={`${styles["label"]}`}>Ablaufdatum</label>
                          <input
                            type="text"
                            className={`${styles["form-input"]} form-input w-full`}
                            id="ablaufdatum"
                            name="ablaufdatum"
                            placeholder="Ablaufdatum"
                          />
                        </div>
                        <div className="input-field mt-2">
                        <label className={`${styles["label"]}`}>Sicherheitdscode</label>
                          <input
                            type="text"
                            className={`${styles["form-input"]} form-input w-full`}
                            id="sicherheitdscode"
                            name="sicherheitdscode"
                            placeholder="Sicherheitdscode"
                          />
                        </div>
                      </div>
                      <div className='text-center mb-20'>
                      <button className={`${styles['jetzt-tip']}`}>Jetzt Kaufen</button>
                    </div>
                    </div>
                    
                    
                      }
                      {visibleSection === "section2" && 
                      <div className="grid grid-cols-1 gap-4 mt-3 mb-3">
                      {/* Full-width Input */}
                      <div className="input-field mt-2">
                        <label className={`${styles["label"]}`}>Kartennummer</label>
                        <input
                          type="text"
                          className={`${styles["form-input"]} form-input w-full`}
                          id="kartennummer"
                          name="Kartennummer"
                          placeholder="121312313212"
                        />
                      </div>
                    
                      {/* Two Inputs Side by Side */}
                      <div className="grid grid-cols-2 gap-4">
                        <div className="input-field mt-2">
                        <label className={`${styles["label"]}`}>Ablaufdatum</label>
                          <input
                            type="text"
                            className={`${styles["form-input"]} form-input w-full`}
                            id="ablaufdatum"
                            name="ablaufdatum"
                            placeholder="Ablaufdatum"
                          />
                        </div>
                        <div className="input-field mt-2">
                        <label className={`${styles["label"]}`}>Sicherheitdscode</label>
                          <input
                            type="text"
                            className={`${styles["form-input"]} form-input w-full`}
                            id="sicherheitdscode"
                            name="sicherheitdscode"
                            placeholder="Sicherheitdscode"
                          />
                        </div>
                      </div>
                      <div className='text-center mb-20'>
                      <button className={`${styles['jetzt-tip']}`}>Jetzt Kaufen</button>
                    </div>
                    </div>
                      }
                      {visibleSection === "section3" && 
                      <div className="grid grid-cols-1 gap-4 mt-3 mb-3">
                      {/* Full-width Input */}
                      <div className="input-field mt-2">
                        <label className={`${styles["label"]}`}>Kartennummer</label>
                        <input
                          type="text"
                          className={`${styles["form-input"]} form-input w-full`}
                          id="kartennummer"
                          name="Kartennummer"
                          placeholder="121312313212"
                        />
                      </div>
                    
                      {/* Two Inputs Side by Side */}
                      <div className="grid grid-cols-2 gap-4">
                        <div className="input-field mt-2">
                        <label className={`${styles["label"]}`}>Ablaufdatum</label>
                          <input
                            type="text"
                            className={`${styles["form-input"]} form-input w-full`}
                            id="ablaufdatum"
                            name="ablaufdatum"
                            placeholder="Ablaufdatum"
                          />
                        </div>
                        <div className="input-field mt-2">
                        <label className={`${styles["label"]}`}>Sicherheitdscode</label>
                          <input
                            type="text"
                            className={`${styles["form-input"]} form-input w-full`}
                            id="sicherheitdscode"
                            name="sicherheitdscode"
                            placeholder="Sicherheitdscode"
                          />
                        </div>
                      </div>
                      <div className='text-center mb-20'>
                      <button className={`${styles['jetzt-tip']}`}>Jetzt Kaufen</button>
                    </div>
                    </div>
                      }
                      {visibleSection === "section4" && 
                      <div className="grid grid-cols-1 gap-4 mt-3 mb-3">
                      {/* Full-width Input */}
                      <div className="input-field mt-2">
                        <label className={`${styles["label"]}`}>Kartennummer</label>
                        <input
                          type="text"
                          className={`${styles["form-input"]} form-input w-full`}
                          id="kartennummer"
                          name="Kartennummer"
                          placeholder="121312313212"
                        />
                      </div>
                    
                      {/* Two Inputs Side by Side */}
                      <div className="grid grid-cols-2 gap-4">
                        <div className="input-field mt-2">
                        <label className={`${styles["label"]}`}>Ablaufdatum</label>
                          <input
                            type="text"
                            className={`${styles["form-input"]} form-input w-full`}
                            id="ablaufdatum"
                            name="ablaufdatum"
                            placeholder="Ablaufdatum"
                          />
                        </div>
                        <div className="input-field mt-2">
                        <label className={`${styles["label"]}`}>Sicherheitdscode</label>
                          <input
                            type="text"
                            className={`${styles["form-input"]} form-input w-full`}
                            id="sicherheitdscode"
                            name="sicherheitdscode"
                            placeholder="Sicherheitdscode"
                          />
                        </div>
                      </div>
                      <div className='text-center mb-20'>
                      <button className={`${styles['jetzt-tip']}`}>Jetzt Kaufen</button>
                    </div>
                    </div>
                      }
                    </div>
                   
                </div>

                {/* Card 2 */}
                <div className={`${styles['section-text']} p-8`}>
                  <div className='flex items-center justify-between mt-6'>
                    <h2 className={`${styles['p-vorteile']}`}>Vorteile von</h2>
                    <img src="/images/logo.png" alt="Logo" className="h-12" />
                  </div>
                  <div className='flex items-center gap-4 mt-6'>
                    <img src="/images/tick.svg"  />
                    <p className={`${styles['p-text']}`}>Erstelle unbegrenzt Wohnungbewerbungen</p>
                  </div>
                  <div className='flex items-center gap-4 mt-3'>
                    <img src="/images/tick.svg"  />
                    <p className={`${styles['p-text']}`}>Exklusive Zusatzinformationen erfahren und Chancen massiv erhöhen</p>
                  </div>
                  <div className='flex items-start gap-4 mt-3'>
                    <img src="/images/tick.svg" className='mt-1' />
                    <div className={`${styles['p-text']}`}>
                      <p>Professionelle Bewerbermappe in digitaler Form, inkl.:</p>
                      <ul className="list-disc pl-5">
                        <li>Mietzahlungsbestätigung</li>
                        <li>Einkommensnachweis</li>
                        <li>Eigene Dokumente</li>
                      </ul>
                    </div>
                  </div>
                  <div className='flex items-center gap-4 mt-3'>
                    <img src="/images/tick.svg"  />
                    <p className={`${styles['p-text']}`}>Immer aktuelle Bonitätsauskunft</p>
                  </div>
                  <div className='flex items-center gap-4 mt-3'>
                    <img src="/images/tick.svg"  />
                    <p className={`${styles['p-text']}`}>QR Code zum digitalen Abruf ihrer Bewerbung bei der Besichtiung</p>
                  </div>
                  <div className='flex items-center gap-4 mt-3'>
                    <img src="/images/tick.svg"  />
                    <p className={`${styles['p-text']}`}>4+ Vorlagen</p>
                  </div>

                  <div className='flex items-center justify-between mt-20'>
                    <img src="/images/norton.svg" alt="Logo"/>
                    <img src="/images/review.svg" alt="Logo"/>
                  </div>
                </div>
                

              </div>
            </div>
          </div>

        </div>
      </div>
    </>
  );
};

export default CheckoutOld;