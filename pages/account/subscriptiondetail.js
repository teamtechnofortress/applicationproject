import React, { useState } from 'react';
import SidebarHeader from '@/components/SidebarHeader';
import styles from '../../styles/subscription.module.css';
import Link from 'next/link';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const SubscriptionDetail = () => {
    const [buttonOne, setbuttonOne] = useState(false);
    const [buttonTwo, setbuttonTwo] = useState(false);
    const [buttonThree, setbuttonThree] = useState(false);
  return (
    <>
      <SidebarHeader />
      <ToastContainer />
      <div className="flex">
        <div className="flex-1 ml-64">
          <div className="bg-gray-100 py-8 p-20">
            <div className="mx-auto px-4 sm:px-6 lg:px-8 p-20">
              <h1 className={`${styles['subscription-h1']}`}>
                Schneller in dein Traumzuhause mit Wohnungsmappe
              </h1>
              <h2 className={`${styles['subscription-h2']}`}>
                Wähle deine Option:
              </h2>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-20 pt-20">
                {/* Card 1 */}
                <div className={`${styles['card-1']}`}>
                  <div className="flex gap-4 mt-4">
                    <div className={`${styles['circle-sec']} mt-4`}>
                      <img src="/images/circle.svg" alt="icon" />
                    </div>
                    <div className={`${styles['text-sec']}`}>
                      <h3 className={`${styles['monate']}`}>3 Monate</h3>
                      <p className={`${styles['grey-text']}`}>Mindestlaufzeit</p>
                      <h3 className={`${styles['price']}`}>29,99€</h3>
                      <p className={`${styles['grey-text']} mt-2`}>/ Monat</p>
                    </div>
                  </div>
                  {buttonOne && (
                        <div className="mt-4 text-gray-700">
                        <p>Hier sind weitere Details zu deinem Abonnement. Genieße exklusive Vorteile und Funktionen.</p>
                        </div>
                    )}
                    <button
                        className={`${styles['btn-mehr']} mt-4 flex items-center gap-2 rounded-lg`}
                        onClick={() => setbuttonOne(!buttonOne)}
                    >
                        {buttonOne ? "Weniger anzeigen" : "Mehr anzeigen"}
                        <svg width="10" height="10" viewBox="0 0 4 5" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M0.244688 0.0499997H1.39469L3.81469 2.34L1.39469 4.64H0.244688L2.66469 2.34L0.244688 0.0499997Z" fill="#333333"/>
                        </svg>
                    </button>

                   
                </div>

                {/* Card 2 */}
                <div className={`${styles['card-2']} relative`}>
                    <div className={`${styles['beliebt']} absolute top-0`}>
                    Beliebt
                    </div>
                  <div className="flex gap-4 mt-4">
                    <div className={`${styles['circle-sec']} mt-4`}>
                      <img src="/images/greencircle.svg" alt="icon" />
                    </div>
                    <div className={`${styles['text-sec']}`}>
                      <h3 className={`${styles['monate']}`}>6 Monate</h3>
                      <p className={`${styles['grey-text']}`}>Mindestlaufzeit</p>
                      <h3 className={`${styles['price']}`}>19,99€</h3>
                      <p className={`${styles['grey-text']} mt-2`}>/ Monat</p>
                    </div>
                  </div>

                  {buttonTwo && (
                        <div className="mt-4 text-gray-700">
                        <p>Hier sind weitere Details zu deinem Abonnement. Genieße exklusive Vorteile und Funktionen.</p>
                        </div>
                    )}
                    <button
                        className={`${styles['btn-mehr']} mt-4 flex items-center gap-2 rounded-lg`}
                        onClick={() => setbuttonTwo(!buttonTwo)}
                    >
                        {buttonTwo ? "Weniger anzeigen" : "Mehr anzeigen"}
                        <svg width="10" height="10" viewBox="0 0 4 5" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M0.244688 0.0499997H1.39469L3.81469 2.34L1.39469 4.64H0.244688L2.66469 2.34L0.244688 0.0499997Z" fill="#333333"/>
                        </svg>
                    </button>

                </div>

                {/* Card 3 */}
                <div className={`${styles['card-1']} relative`}>
                  <div className={`${styles['beliebt']} absolute top-0`}>
                    Bester Preis
                  </div>
                  <div className="flex gap-4 mt-4">
                    <div className={`${styles['circle-sec']} mt-4`}>
                      <img src="/images/circle.svg" alt="icon" />
                    </div>
                    <div className={`${styles['text-sec']}`}>
                      <h3 className={`${styles['monate']}`}>12 Monate</h3>
                      <p className={`${styles['grey-text']}`}>Mindestlaufzeit</p>
                      <h3 className={`${styles['price']}`}>12,99€</h3>
                      <p className={`${styles['grey-text']} mt-2`}>/ Monat</p>
                    </div>
                  </div>

                  {buttonThree && (
                        <div className="mt-4 text-gray-700">
                        <p>Hier sind weitere Details zu deinem Abonnement. Genieße exklusive Vorteile und Funktionen.</p>
                        </div>
                    )}
                    <button
                        className={`${styles['btn-mehr']} mt-4 flex items-center gap-2 rounded-lg`}
                        onClick={() => setbuttonThree(!buttonThree)}
                    >
                        {buttonThree ? "Weniger anzeigen" : "Mehr anzeigen"}
                        <svg width="10" height="10" viewBox="0 0 4 5" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M0.244688 0.0499997H1.39469L3.81469 2.34L1.39469 4.64H0.244688L2.66469 2.34L0.244688 0.0499997Z" fill="#333333"/>
                        </svg>
                    </button>
                </div>
              </div>
            </div>
          </div>
          <div className='bg-white p-20 mb-20'>
            <p className={`${styles['subscription-p']}`}>Das sagen Abonnenten in unseren Bewertungen</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-20">
                {/* Card 1 */}
                <div className={`${styles['review']} p-4`}>
                  <div className="flex gap-4 mt-4 justify-between">
                    <div className={`${styles['circle-sec']}`}>
                     <p className={`${styles['review-p']}`}>Enrico</p>
                    </div>
                    <div className={`flex`}>
                       <img src="/images/Star.svg" alt="icon" className="w-1/5" />
                       <img src="/images/Star.svg" alt="icon" className="w-1/5" />
                       <img src="/images/Star.svg" alt="icon" className="w-1/5" />
                       <img src="/images/Star.svg" alt="icon" className="w-1/5" />
                       <img src="/images/Star.svg" alt="icon" className="w-1/5" />
                    </div>
                  </div>
                  <p className={`${styles['review-p']} mt-2`}>Super Tipps und wirklich Hilfreich etwas von den Experten aus erster Hand zu Erfahren </p>

                  <button className={`${styles['btn-mehr']} mt-4 flex items-center gap-2 rounded-lg`}>
                    Mehr anzeigen  
                    <svg width="10" height="10" viewBox="0 0 4 5" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M0.244688 0.0499997H1.39469L3.81469 2.34L1.39469 4.64H0.244688L2.66469 2.34L0.244688 0.0499997Z" fill="#333333"/>
                    </svg>
                  </button>
                </div>

                {/* Card 2 */}
                <div className={`${styles['review']} p-4`}>
                  <div className="flex gap-4 mt-4 justify-between">
                    <div className={`${styles['circle-sec']}`}>
                     <p className={`${styles['review-p']}`}>Enrico</p>
                    </div>
                    <div className={`flex`}>
                       <img src="/images/Star.svg" alt="icon" className="w-1/5" />
                       <img src="/images/Star.svg" alt="icon" className="w-1/5" />
                       <img src="/images/Star.svg" alt="icon" className="w-1/5" />
                       <img src="/images/Star.svg" alt="icon" className="w-1/5" />
                       <img src="/images/Star.svg" alt="icon" className="w-1/5" />
                    </div>
                  </div>
                  <p className={`${styles['review-p']} mt-2`}>Super Tipps und wirklich Hilfreich etwas von den Experten aus erster Hand zu Erfahren </p>

                  <button className={`${styles['btn-mehr']} mt-4 flex items-center gap-2 rounded-lg`}>
                    Mehr anzeigen  
                    <svg width="10" height="10" viewBox="0 0 4 5" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M0.244688 0.0499997H1.39469L3.81469 2.34L1.39469 4.64H0.244688L2.66469 2.34L0.244688 0.0499997Z" fill="#333333"/>
                    </svg>
                  </button>
                </div>
                {/* Card 3 */}
                <div className={`${styles['review']} p-4`}>
                  <div className="flex gap-4 mt-4 justify-between">
                    <div className={`${styles['circle-sec']}`}>
                     <p className={`${styles['review-p']}`}>Enrico</p>
                    </div>
                    <div className={`flex`}>
                       <img src="/images/Star.svg" alt="icon" className="w-1/5" />
                       <img src="/images/Star.svg" alt="icon" className="w-1/5" />
                       <img src="/images/Star.svg" alt="icon" className="w-1/5" />
                       <img src="/images/Star.svg" alt="icon" className="w-1/5" />
                       <img src="/images/Star.svg" alt="icon" className="w-1/5" />
                    </div>
                  </div>
                  <p className={`${styles['review-p']} mt-2`}>Super Tipps und wirklich Hilfreich etwas von den Experten aus erster Hand zu Erfahren </p>

                  <button className={`${styles['btn-mehr']} mt-4 flex items-center gap-2 rounded-lg`}>
                    Mehr anzeigen  
                    <svg width="10" height="10" viewBox="0 0 4 5" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M0.244688 0.0499997H1.39469L3.81469 2.34L1.39469 4.64H0.244688L2.66469 2.34L0.244688 0.0499997Z" fill="#333333"/>
                    </svg>
                  </button>
                </div>
              </div>
          </div>

          <div className='text-center mb-20'>
             <Link href="/account/checkout" legacyBehavior>
                <button className={`${styles['btn-tip']}`}>Weiter zur Bezahlung</button>
             </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default SubscriptionDetail;
