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
            <h1 className={`${styles['faq-h1']}`}>Fragen + Antworten</h1>
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
                          <span>Warum sollte ich nicht einfach die Mappe von ImmoScout verwenden?</span>
                          <span className={`${styles['open']}`}>
                            {openIndex === 0 ? '-' : '+'}
                          </span>
                        </button>
                        {openIndex === 0 && (
                          <div className="mt-2 rounded-lg">
                            <p>
                            Weil Standardlösungen standardisierte Ergebnisse bringen.<br/>Unsere Wohnungsmappe wurde <strong>von echten Vermietern mitentwickelt</strong> mit dem Ziel, <strong>genau die Unterlagen zu liefern</strong>, die für eine Vertragsunterzeichnung wirklich benötigt werden. Im Gegensatz zu kostenlosen Tools bekommst du bei uns keine eigene &amp; halbe Schufa, oder generische PDF, sondern eine <strong>vollständige, rechtssichere und logisch aufgebaute Mappe</strong>. Inklusive <strong>richtiger Mietschuldenfreiheitsbescheinigung</strong>, <strong>aktueller Einkommensnachweise</strong> und einer Struktur, die Makler sofort verstehen.<br/><br/>Dazu kommt: Deine Unterlagen sehen nicht nur besser aus. Sie <strong>funktionieren besser</strong>. Modernes Design, klare Struktur, DSGVO-konformer <strong>Link &amp; QR-Code</strong> für den digitalen Versand – <strong>alles mit einem Klick versendbar.<br/>&zwj;</strong><br/><strong>Ergebnis:</strong> Du hebst dich im Posteingang des Maklers sofort ab – <strong>noch bevor du zur Besichtigung eingeladen wirst.</strong>                            </p>
                          </div>
                        )}
                      </div>

                      {/* FAQ Item 2 */}
                      <div className={`${styles['faq-item']}  p-4`}>
                        <button
                          onClick={() => toggleAccordion(1)}
                          className="w-full text-left font-semibold text-xl rounded-lg flex items-center justify-between"
                        >
                          <span>Wie kann ich meine Dokumente aktualisieren?</span>
                          <span className={`${styles['open']}`}>
                            {openIndex === 1 ? '-' : '+'}
                          </span>
                        </button>
                        {openIndex === 1 && (
                          <div className="mt-2 rounded-lg">
                            <p>
                            Du kannst <strong>jederzeit deine Dokumente mit wenigen Klicks aktualisieren</strong>, ohne alles neu anzufangen. <strong>Spare Zeit, bleib aktuell und immer bewerbungsbereit.</strong>
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
                          <span>Wie sende ich die Wohnungsmappe dem Makler oder Vermieter?</span>
                          <span className={`${styles['open']}`}>
                            {openIndex === 2 ? '-' : '+'}
                          </span>
                        </button>
                        {openIndex === 2 && (
                          <div className="mt-2 rounded-lg">
                            <p>
                            Du erhältst <strong>einen professionellen Link, eine PDF und </strong>sogar einen <strong>QR-Code</strong> die du <strong>direkt per E-Mail, WhatsApp oder in jedem Online-Formular einfügen kannst.<br/>&zwj;</strong>Kein Stress, kein ZIP-Chaos, kein Anhang-Wirrwarr.<br/>&zwj;<strong>Ein Klick. Alles drin. Perfekt aufbereitet.</strong>
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
                          <span>Was kostet die Wohnungsmappe?</span>
                          <span className={`${styles['open']}`}>
                            {openIndex === 3 ? '-' : '+'}
                          </span>
                        </button>
                        {openIndex === 3 && (
                          <div className="mt-2 rounded-lg">
                            <p>
                            Du kannst unsere Bewerbermappe <strong>einmalig für 2,95€ testen</strong>, oder direkt zur Premium-Version greifen. Da eine Wohnungssuche laut aktuellen Studien im Schnitt <strong>6 bis 12 Monate dauert</strong>, bieten wir dir flexible Modelle: 3, 6 oder 12 Monate Zugang – ab nur 12,99€. <strong><br/>Ein kleiner Betrag für eine große Chance auf deine neue Wohnung.</strong>
                            </p>
                          </div>
                        )}
                      </div>

                       {/* FAQ Item 5 */}
                       <div className={`${styles['faq-item']} p-4`}>
                        <button
                          onClick={() => toggleAccordion(4)}
                          className="w-full text-left font-semibold text-xl rounded-lg flex items-center justify-between"
                        >
                          <span>Kann ich eine Mappe mit meinem Partner oder einem Bürgen erstellen?</span>
                          <span className={`${styles['open']}`}>
                            {openIndex === 4 ? '-' : '+'}
                          </span>
                        </button>
                        {openIndex === 4 && (
                          <div className="mt-2 rounded-lg">
                            <p>
                            Ja, du kannst <strong>bis zu 4 Personen</strong> in deiner Mappe ergänzen. Ob du dich mit deinem Partner auf eure Traumwohnung bewerben willst, oder mit deinen Eltern als Bürgen: <strong>Einfach Personen hinzufügen, fertig.<br/>Ein gemeinsames Auftreten erhöht die Chancen und zeigt sofort Verbindlichkeit.</strong>
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
                  <h3 className={`${styles['heading-faq']}`}>Haben Sie noch weitere Fragen?</h3>
                  <p className={`${styles['p-faq']} mt-4`}>
                  End-to-End-Zahlungen und Finanzmanagement in einer einzigen Lösung. Lernen Sie die richtige Plattform kennen, die bei der Umsetzung hilft.
                  </p>
                  <Link href="/account/allapplications" legacyBehavior>
                  <button className={`${styles['btn-tip']}`}>Wohnungsmappe fertigstellen</button>
                  </Link>
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
