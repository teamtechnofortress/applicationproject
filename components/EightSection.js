import React, { useState } from 'react';
import styles from '../styles/new.module.css';

const EightSection = () => {
  const [openIndex, setOpenIndex] = useState(2); // Default to index 2

  const toggleAccordion = (index) => {
    setOpenIndex(openIndex === index ? null : index); // Toggle open/close
  };

  const faqs = [
    {
      question: 'Wie funktioniert Wohnungsmappe?',
      answer: 'Wohnungsmappe erstellt digitale Bewerbungen, die Vermieter überzeugen.',
    },
    {
      question: 'Ist meine Bewerbung sicher?',
      answer: 'Ja, alle Daten werden verschlüsselt und sicher gespeichert.',
    },
    {
      question: 'Welche Vorlagen gibt es?',
      answer: 'Es gibt eine Vielzahl an professionellen Designs zur Auswahl.',
    },
  ];

  return (
    <div className={`${styles['eight-section']} mx-auto container-fluid`}>
      <h1 className={`${styles['heading-sub']} pt-20`}>Noch Fragen?</h1>
      <div className="container mx-auto lg:mt-24 mt-12 mb-8">
        <div className="grid grid-cols-1 lg:grid-cols-9 gap-2 mt-5 pt-2">
          <div className="lg:col-span-2"></div>
          <div className="lg:col-span-5">
            <div className="accordion">
              {faqs.map((faq, index) => (
                <div key={index} className={`${styles['accordion-item']}`}>
                  <button
                    className={`${styles['accordion-button']} ${
                      openIndex === index ? styles['open'] : ''
                    }`}
                    onClick={() => toggleAccordion(index)}
                  >
                    {faq.question}
                  </button>
                  {openIndex === index && (
                    <div className={`${styles['accordion-content']}`}>
                      <p>{faq.answer}</p>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EightSection;
