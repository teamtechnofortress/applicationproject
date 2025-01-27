import React, { useRef } from 'react';
import Slider from 'react-slick';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import styles from '../styles/new.module.css';

const ImageSlider = () => {
  const imageSliderRef = useRef(null);

  const sliderSettings = {
    infinite: true,
    speed: 500,
    slidesToShow: 3, // Show one full-width image at a time
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,  // 3-second interval between slides
    arrows: false,  // No arrows for simplicity
    dots: false, 
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,  // Show 2 slides at a time for medium screens
          slidesToScroll: 1,
        }
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 1,  // Show 1 slide at a time for small screens
          slidesToScroll: 1,
        }
      }
    ]
  };

  return (
    <div className="w-full overflow-hidden slider-container">
      <Slider ref={imageSliderRef} {...sliderSettings}>
        {[...Array(5).keys()].map((i) => (
          <div key={i} className="slide">
            <img className="slider-image" src={`/images/Rectangle 1660.png`} alt={`Slide ${i + 1}`} />
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default ImageSlider;
