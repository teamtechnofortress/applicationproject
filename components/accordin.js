import React, { useState } from 'react';
import styles from '../styles/new.module.css';

const Accordion = () => {
  const [openIndex, setOpenIndex] = useState(null);

  const toggleAccordion = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  const accordionItems = [
    { title: 'Accordion Item 1', content: 'This is the content of Accordion Item 1.' },
    { title: 'Accordion Item 2', content: 'This is the content of Accordion Item 2.' },
    { title: 'Accordion Item 3', content: 'This is the content of Accordion Item 3.' },
  ];

  return (
    <div className={`${styles.accordionContainer} w-full max-w-lg mx-auto bg-white rounded-lg shadow-md`}>
      {accordionItems.map((item, index) => (
        <div key={index} className="border-b border-gray-200">
          <button
            onClick={() => toggleAccordion(index)}
            className="flex justify-between w-full p-4 text-left text-lg font-semibold text-gray-700 hover:bg-gray-100 focus:outline-none"
          >
              <span className={`transform transition-transform duration-200 ${openIndex === index ? 'rotate-180' : ''}`}>
              {openIndex === index ? '-' : '+'}
            </span>
            <span>{item.title}</span>
          
          </button>
          {openIndex === index && (
            <div className="p-4 text-gray-600">
              {item.content}
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default Accordion;
