import { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import Signup from "@/components/PdfRename";
import styles from '../styles/profile.module.css';
import { useRouter } from 'next/router';
import { ToastContainer, toast } from "react-toastify";




const Pdfpopup = ({pdfID, handleFormSubmit }) => {
  const [pdfid, setPdfid] = useState(pdfID); // Initialize state with pdfid
  const router = useRouter();

  const [showTooltip, setShowTooltip] = useState(false);
  const [tooltipPosition, setTooltipPosition] = useState({});
  const buttonRef = useRef(null);
  const tooltipRef = useRef(null);
  const clickedPositionRef = useRef({ x: 0, y: 0 });

  const calculateTooltipPosition = () => {
    if (buttonRef.current && tooltipRef.current) {
      const buttonRect = buttonRef.current.getBoundingClientRect();
      const tooltipRect = tooltipRef.current.getBoundingClientRect();
  
      const spaceBelow = window.innerHeight - clickedPositionRef.current.y;
      const spaceAbove = clickedPositionRef.current.y - buttonRect.height;
      const offsetVertical = 20; // Adjust vertical offset as needed
      const offsetHorizontal = 90; // Adjust horizontal offset as needed
  
      let topPosition;
      let leftPosition;
  
      if (spaceBelow >= tooltipRect.height || spaceBelow > spaceAbove) {
        // Place tooltip below the button with vertical and horizontal offsets
        topPosition = `${clickedPositionRef.current.y + offsetVertical}px`;
        leftPosition = `${buttonRect.left - offsetHorizontal}px`;
      } else {
        // Place tooltip above the button with vertical and horizontal offsets
        topPosition = `${clickedPositionRef.current.y - tooltipRect.height - offsetVertical}px`;
        leftPosition = `${buttonRect.left - offsetHorizontal}px`;
      }
  
      setTooltipPosition({
        top: topPosition,
        left: leftPosition,
      });
    }
  };
  
  const [isRenameModalOpen, setIsRenameModalOpen] = useState(false);

  const toggleRenameModal = () => {
      setIsRenameModalOpen(!isRenameModalOpen);
      if(isRenameModalOpen){
        setShowTooltip(false)
    }
  };


  const toggleTooltip = (event) => {
    setShowTooltip((prev) => !prev);
    clickedPositionRef.current = { x: event.clientX, y: event.clientY };
  };

  useEffect(() => {
    if (showTooltip) {
      calculateTooltipPosition();
    }
  }, [showTooltip]);

  useEffect(() => {
    const handleClick = (event) => {
      if (!buttonRef.current.contains(event.target)) {
        setShowTooltip(false);
      }
    };

    window.addEventListener('click', handleClick);

    return () => {
      window.removeEventListener('click', handleClick);
    };
  }, []);

  const deleteApplication = async (id) => {
    try {
        const res = await fetch(`/api/user/deleteapplication?id=${id}`, {
            method: "GET",
            headers: {
                'Accept': 'application/json',
            }
        });

        const response = await res.json();
        console.log(response);
        if(response.success) {
          toast.success('Form submitted successfully', {
            position: "top-center",
            autoClose: 1500,
            hideProgressBar: true,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
            });
        console.log(response);

              // const router = useRouter();
              // window.location.reload();
              handleFormSubmit();
        console.log(response);

              //  router.push(`${process.env.NEXT_PUBLIC_HOST}/account/allapplications`)
            }else{
              toast.error(response.error, {
                position: "top-center",
                autoClose: 1500,
                hideProgressBar: true,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
                });
            }
    } catch (error) {
        console.error('Error deleting application:', error);
    }
}
  return (
    <>
    <ToastContainer />
      <div>
      <button type="button" ref={buttonRef} onClick={toggleTooltip} className={`${styles['popup-btn']}`}>
      <i className="fa fa-ellipsis-v"></i>
      </button>
      {showTooltip && (
        <div className={styles.PdfTooltip}>
          <div
            ref={tooltipRef}
            className={styles.tooltipModal}
            style={tooltipPosition}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="p-2">
             <ul>
                <li className='p-4 border-b border-gray-100'>
                <button onClick={toggleRenameModal}  type="button"  className={`${styles['jetzt-btn']}`}>
                 Rename
               </button>

               {isRenameModalOpen && <Signup onClose={toggleRenameModal} pdfid={pdfid} handleFormSubmit={handleFormSubmit} />} 
                {/* <Link href="/account/settings" legacyBehavior><a href='#'><i className="fa fa-edit"></i> Rename</a></Link> */}
                </li>
                <li className='p-4'>
                  <a onClick={() => deleteApplication(pdfid)}><i className="fa fa-trash"></i> Delete</a>
                </li>
             </ul>
            </div>
          </div>
        </div>
      )}
    </div>
    </>
    
  );
  
};

export default Pdfpopup;
