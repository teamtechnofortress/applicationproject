import { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import styles from '../styles/profile.module.css';


const TooltipButton = () => {
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
  
  

  const toggleTooltip = (event) => {
    setShowTooltip((prev) => !prev);
    clickedPositionRef.current = { x: event.clientX, y: event.clientY };
  };

  const closeTooltip = () => {
    setShowTooltip(false);
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

  return (
    <div>
      <button type="button" ref={buttonRef} onClick={toggleTooltip} className={`${styles['tooltip-btn']}`}>
      <i className="fa fa-question"></i>
      </button>
      {showTooltip && (
        <div className={styles.tooltipOverlay}>
          <div
            ref={tooltipRef}
            className={styles.tooltipModal}
            style={tooltipPosition}
            onClick={(e) => e.stopPropagation()}
          >
            <div className={styles.tooltipContent}>
              <p>Um Ihre E-Mail-Adresse zu aktualisieren, navigieren Sie bitte zur Registerkarte    <Link href="/account/settings" legacyBehavior><a href='#'>Kontoeinstellungen</a></Link></p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
  
};

export default TooltipButton;
