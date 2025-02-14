import React, { useRef, useState } from 'react';
import Slider from 'react-slick';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import styles from '../styles/new.module.css';

const TestimonialSlider = () => {
  const sliderRef = useRef(null);
  const [currentSlide, setCurrentSlide] = useState(0);

  const testimonialSettings = {
    dots: true,
    arrows:false,
    infinite: true,
    speed: 500,
    slidesToShow: 3,  // Show 3 slides at a time
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000, 
    centerMode: false,  // Disable centerMode so that slides don't appear cut off
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
    <div className="mt-10 md:pt-8 container mx-auto md:pb-10 slider-div">
      <Slider ref={sliderRef} {...testimonialSettings}>

        {/* Slide 1 */}
        <div className="p-4">
          <div className={`${styles['slide-box']} bg-white rounded-md p-6 shadow-lg border border-gray-200 text-left`}>
            <p className={`${styles['slide-p']} mt-2 text-gray-600`}>“Wohnungsmappe hat mir wirklich geholfen, mich schnell und professionell zu bewerben. Ich war super beeindruckt, wie einfach alles funktioniert hat!“.”</p>
         
           <div className={`${styles['slide-flex']} flex flex-row items-center justify-center`}>
            <div className="basis-1/5">
               <img src="/images/Testimonials-img-1.png" alt="" />
            </div> 
            <div className="basis-4/5">
                <h4>Cristina Durgan</h4>
                <p>Founder & CEO</p>
            </div>  
          </div>
          </div>
        </div>

        {/* Slide 2 */}
        <div className="p-4">
          <div className={`${styles['slide-box']} bg-white rounded-md p-6 shadow-lg border border-gray-200 text-left`}>
            <p className={`${styles['slide-p']} mt-2 text-gray-600`}>“Dank der digitalen Mappe hatte ich meine neue Wohnung im Handumdrehen – klare Empfehlung!”</p>
         
           <div className={`${styles['slide-flex']} flex flex-row items-center justify-center`}>
            <div className="basis-1/5">
               <img src="/images/Testimonials-img-1.png" alt="" />
            </div> 
            <div className="basis-4/5">
                <h4>Cristina Durgan</h4>
                <p>Founder & CEO</p>
            </div>  
          </div>
          </div>
        </div>

        {/* Slide 3 */}
        <div className="p-4">
          <div className={`${styles['slide-box']} bg-white rounded-md p-6 shadow-lg border border-gray-200 text-left`}>
            <p className={`${styles['slide-p']} mt-2 text-gray-600`}>“Super einfach und effizient! Ich hatte innerhalb weniger Minuten meine Bewerbungsmappe fertig und konnte sie direkt an mehrere Vermieter senden. Wohnungsmappe hat mir wirklich viel Stress erspart.”</p>
         
           <div className={`${styles['slide-flex']} flex flex-row items-center justify-center`}>
            <div className="basis-1/5">
               <img src="/images/Testimonials-img-1.png" alt="" />
            </div> 
            <div className="basis-4/5">
                <h4>Cristina Durgan</h4>
                <p>Founder & CEO</p>
            </div>  
          </div>
          </div>
        </div>

        {/* Add more slides as needed */}
        
      </Slider>
    </div>
  );
};

export default TestimonialSlider;
