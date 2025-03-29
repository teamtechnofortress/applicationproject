import React, { useState } from 'react';
import SidebarHeader from '@/components/SidebarHeader';
import Link from 'next/link';
import styles from '../../styles/tipps.module.css';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Tip = () => {
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
             <iframe
                width="100%"
                className="h-[300px] md:h-[500px]"
                src="https://www.youtube.com/embed/YOUR_VIDEO_ID"
                title="YouTube Video"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              ></iframe>
              <div className="flex justify-between">
               <p className="font-bold mt-2">Applicant folder</p>
               <button className={`${styles['nachstes-tip']}`}>Nächstes Video</button>
              </div>

              <div className="block md:flex gap-6 mt-10">
                {/* Video 1 */}
                <div className="w-full md:w-1/3">
                  <iframe 
                    className="w-full h-56" 
                    src="https://www.youtube.com/embed/VIDEO_ID_1" 
                    title="Video 1" 
                    allowFullScreen
                  ></iframe>
                  <p className="font-bold mt-2">Applicant folder</p>
                </div>

                {/* Video 2 */}
                <div className="w-full md:w-1/3">
                  <iframe 
                    className="w-full h-56" 
                    src="https://www.youtube.com/embed/VIDEO_ID_2" 
                    title="Video 2" 
                    allowFullScreen
                  ></iframe>
                  <p className="font-bold mt-2">Applicant folder</p>
                </div>

                {/* Video 3 */}
                <div className="w-full md:w-1/3">
                  <iframe 
                    className="w-full h-56" 
                    src="https://www.youtube.com/embed/VIDEO_ID_3" 
                    title="Video 3" 
                    allowFullScreen
                  ></iframe>
                  <p className="font-bold mt-2">Applicant folder</p>
                </div>
              </div>

            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Tip;