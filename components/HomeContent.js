import React, { useEffect, useState } from 'react';
import styles from '../styles/new.module.css';
import ImageSlider from "@/components/ImageSlider";
import TestemonialSlider from "@/components/TestemonialSlider";
import EightSection from "@/components/EightSection";

const HomeContent = () => {
  const [visibleVideo, setVisibleVideo] = useState(null);
  const [loadingVideo, setLoadingVideo] = useState(false);

  // Video data for separate videos and images
  const videos = [
    {
      id: "video1",
      thumbnail: "/images/iframe-bg.png",
      videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ?autoplay=1",
    },
    {
      id: "video2",
      thumbnail: "/images/iframe-bg.png",
      videoUrl: "https://www.youtube.com/embed/3JZ_D3ELwOQ?autoplay=1",
    },
    {
      id: "video3",
      thumbnail: "/images/iframe-bg.png",
      videoUrl: "https://www.youtube.com/embed/3JZ_D3ELwOQ?autoplay=1",
    },
  ];

  // Handle thumbnail click
  const handleThumbnailClick = (videoId) => {
    setVisibleVideo(videoId);
    setLoadingVideo(true); // Start loading spinner
  };

  // Hide the loading spinner once the iframe is fully loaded
  const handleIframeLoad = () => {
    setLoadingVideo(false);
  };

  
  return (
    <>
      {/* Banner section */}
      <div className={`${styles['banner-sec']} mt-10 mb-20 container-fluid`}>
        <div className={`${styles['padding-baner']} mx-auto p-8 sm:p-4 container`}>
          <h1 className={`${styles['banner-sec-h1']} mt-20`}>
            Deine professionelle <br />{' '}
            <span className={`${styles['bg-color']}`}>Wohnungsbewerbung</span> in Sekunden
          </h1>
          <p className={`${styles['banner-sec-p']} mt-10`}>
            Mach Schluss mit der stressigen Wohnungssuche. Erstelle eine überzeugende,
            digitale Bewerbungsmappe und steche aus der Masse hervor.
          </p>
          <button   onClick={() => window.location.href = '#'} className={`${styles['banner-btn']} mt-10`}>Jetzt loslegen</button>
          <div className={`${styles['star-section']} mg:pl-5 pl-0 lg:mt-10 mt-3 md:space-x-1 space-x-0 lg:flex md:block items-center mt-20`}>
            <span className={`${styles['checked']} fa fa-star`}></span>
            <span className={`${styles['checked']} fa fa-star`}></span>
            <span className={`${styles['checked']} fa fa-star`}></span>
            <span className={`${styles['checked']} fa fa-star`}></span>
            <span className={`${styles['checked']} fa fa-star`}></span>
            <p className={`${styles['first-star-p']} lg:pl-4`}>
              Ausgezeichnet, <strong className={`${styles['color-strng']}`}>4.5</strong> auf{' '}
              <strong>
                <span className={`${styles['black-star']} fa fa-star`}></span> Trustpilot
              </strong>
            </p>
          </div>
        </div>
      </div>
      
      {/* Apartment section */}
      <div className={`${styles['appartment-section']} mx-auto mt-10 mb-20 container`}>
        <h1 className={`${styles['heading-sub']} mt-20`}>
          Schwierige Wohnungssuche? <br /> Wir haben die Lösung.
        </h1>
        <p className={`${styles['appartment-sec-p']} mt-10`}>
          Mit Wohnungsmappe erstellst du in wenigen Minuten eine perfekte Bewerbungsmappe, die Vermieter überzeugt. So sparst du Zeit, reduzierst Stress und erhöhst deine Chancen auf die Traumwohnung – alles digital und unkompliziert.
        </p>
        <button className={`${styles['appartment-btn']} mt-10`}>Jetzt loslegen</button>
        <h1 className={`${styles['heading-sub']} mt-20 pt-20`}>Warum Wohnungsmappe?</h1>
      </div>

      {/* Third section */}
      <div className={`${styles['third-section-desktop']} mt-10 mb-20 mx-auto container-fluid`}>
        <div className={`${styles['gird-section']} grid grid-cols-1 md:grid-cols-2 gap-4 p-10 mb-10`}>
          <div className="p-4">
            <h1 className={`${styles['thirdsec-h1']} mt-20`}>Zeitersparnis und weniger Stress.</h1>
            <p className={`${styles['third-sec-p']} mt-10`}>
              Wir machen den Bewerbungsprozess für dich einfach: Alle Dokumente an einem Ort, automatisch zusammengeführt und jederzeit griffbereit. So hebst du dich von anderen Bewerbern ab – ohne Aufwand.
            </p>
          </div>
          <div className="p-4">
            <img src="/images/bild1.png" width="100%" alt="" />
          </div>
        </div>
        <div className={`${styles['gird-section']} grid grid-cols-1 md:grid-cols-2 gap-4 p-8 mt-10`}>
          <div className="p-4">
            <img src="/images/bild2.png" width="100%" alt="" />
          </div>
          <div className="p-4">
            <h1 className={`${styles['thirdsec-h1']} mt-20`}>Einfach. Schnell. Sicher.</h1>
            <p className={`${styles['third-sec-p']} mt-10`}>
              Unser System macht den Bewerbungsprozess kinderleicht: Du sammelst deine Dokumente, wir erstellen automatisch deine Bewerbungsmappe – professionell, aktuell und verschlüsselt, damit deine Daten sicher bleiben.
            </p>
          </div>
        </div>
        <button className={`${styles['appartment-btn']} mt-10`}>Jetzt starten und deine Chancen erhöhen!!</button>
      </div>
      <div className={`${styles['third-section-mobile']} mb-20 container-fluid`}>
        <div className={`${styles['gird-section']} grid grid-cols-1 md:grid-cols-2 gap-4 mb-10`}>
          <div className="p-4">
            <h1 className={`${styles['thirdsec-h1']} mt-20`}>Zeitersparnis und weniger Stress.</h1>
            <p className={`${styles['third-sec-p']} mt-10`}>
              Wir machen den Bewerbungsprozess für dich einfach: Alle Dokumente an einem Ort, automatisch zusammengeführt und jederzeit griffbereit. So hebst du dich von anderen Bewerbern ab – ohne Aufwand.
            </p>
          </div>
          <div className="p-4">
            <img src="/images/bild1.png" width="100%" alt="" />
          </div>
        </div>
        <div className={`${styles['gird-section']} grid grid-cols-1 md:grid-cols-2 gap-4 mt-10`}>
        <div className="p-4">
            <h1 className={`${styles['thirdsec-h1']} mt-20`}>Einfach. Schnell. Sicher.</h1>
            <p className={`${styles['third-sec-p']} mt-10`}>
              Unser System macht den Bewerbungsprozess kinderleicht: Du sammelst deine Dokumente, wir erstellen automatisch deine Bewerbungsmappe – professionell, aktuell und verschlüsselt, damit deine Daten sicher bleiben.
            </p>
          </div>
          <div className="p-4">
            <img src="/images/bild2.png" width="100%" alt="" />
          </div>
         
        </div>
        <button className={`${styles['appartment-btn']} mt-10`}>Jetzt starten und deine Chancen erhöhen!!</button>
      </div>

        {/* seven section */}
         <div className={`${styles['fifth-section']} mx-auto mb-10 pb-10 container-fluid`}>
        <h1 className={`${styles['heading-sub']} pt-20`}>Kundenerfahrungen</h1>
        <TestemonialSlider />
      </div>

      {/* Fourth section */}
      <div className={`${styles['forth-section']} mt-10 container-fluid`}>
        <img src="/images/Mockupviele.png" width="100%" alt="" />
      </div>

      {/* Fifth section */}
      <div className={`${styles['fifth-section']} mx-auto mb-10 container-fluid`}>
        <h1 className={`${styles['heading-sub']} pt-20`}>Alles was du brauchst</h1>
        <p className={`${styles['appartment-sec-p']} mt-10`}>
          In deiner Wohnungsmappe findest du alles, was für eine erfolgreiche Wohnungsbewerbung nötig ist und was dein Vermieter sehen will. Einfach, vollständig und in wenigen Klicks erstellt.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 p-8 mt-10 container mx-auto">
          <div className={`${styles['w-bg']}`}>            
            <h1 className={`${styles['fifth-sec-h1']}`}>Mieterselbstauskunft</h1>
          </div>
          <div className={`${styles['w-bg']}`}>
            <h1 className={`${styles['fifth-sec-h1']}`}>Identitätsnachweis</h1>
          </div>
          <div className={`${styles['w-bg']}`}>
            <h1 className={`${styles['fifth-sec-h1']}`}>Mietschuldenfreiheit</h1>
          </div>
        </div>

        <div className={`${styles['second-grid']} grid grid-cols-1 md:grid-cols-2 gap-4 mt-10 container mx-auto`}>
          <div className={`${styles['w-bg']}`}>            
            <h1 className={`${styles['fifth-sec-h1']}`}>Schufaauskunft</h1>
          </div>
          <div className={`${styles['w-bg']}`}>
            <h1 className={`${styles['fifth-sec-h1']}`}>Einkommensnachweis</h1>
          </div>
        </div>
      </div>
         {/* sixth section */}
      <div className={`${styles['sixth-section']} mx-auto container-fluid`}>
        <h1 className={`${styles['heading-sub']} pt-20`}>Die besten Vorlagen</h1>
        <p className={`${styles['appartment-sec-p']} mt-10`}>
        Wähle aus verschiedenen professionellen Designs, die deine Bewerbungsmappe hervorstechen lassen. Jede Vorlage ist speziell dafür entworfen, dich von der Masse abzuheben. Klicke auf eine Vorlage und starte deinen Bewerbungsprozess.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-10">
          <div>            
             <img src="/images/appletower.png" width="100%" alt="" />
          </div>
          <div className={`${styles['slider-section']} md:col-span-2 p-4`}>
              <div className="mt-10 md:pt-8 md:pb-10 slider-div slider-img">
                  <ImageSlider />
            </div>
          </div>
        </div>
      </div>
    
      {/* eight section */}
      <EightSection />
      {/* Ninth section */}
      <div className={`${styles['ninth-section']} mx-auto mb-10 pb-10 container-fluid`}>
        <h1 className={`${styles['ninth-heading']} pt-20`}>Tipps & Tricks</h1>
        <p className={`${styles['ninth-sec-p']} mt-10`}>
          Noch mehr hilfreiche Inhalte findest du in deinem Dashboard.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 p-8 mt-10 mb-20 container mx-auto">
          {videos.map((video) => (
            <div key={video.id} className="relative group w-full h-auto">
              {!visibleVideo || visibleVideo !== video.id ? (
                <div className="cursor-pointer" onClick={() => handleThumbnailClick(video.id)}>
                  <img
                    src={video.thumbnail}
                    alt="Custom Thumbnail"
                    className="w-full h-auto"
                  />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <img src="/images/Subtract.png" alt="Play Button" className="h-12 w-12" />
                  </div>
                </div>
              ) : (
                <>
                  {loadingVideo && (
                    <div className="absolute inset-0 flex items-center justify-center bg-gray-100 bg-opacity-75">
                      <div className="spinner-border animate-spin inline-block w-8 h-8 border-4 rounded-full text-gray-500"></div>
                    </div>
                  )}
                  <iframe
                    className="w-full h-full"
                    src={video.videoUrl}
                    title="YouTube video"
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                    onLoad={handleIframeLoad} // Hide spinner when iframe loads
                  ></iframe>
                </>
              )}
            </div>
          ))}
    </div>

      </div>
       {/* Ten section */}
       <div className={`${styles['last-section']} mx-auto container-fluid`}>
          <div className="container mx-auto">
            <h1 className={`${styles['heading-sub']}`}>Deine Chance auf die Traumwohnung.</h1>
            <div className={`${styles['text-section']} `}>
              <p className={`${styles['appartment-sec-p']} mt-10`}>
                Warte nicht länger – sichere dir jetzt deinen Platz im Wohnungsmarkt mit einer digitalen Mietermappe, die Vermieter überzeugt.
              </p>
              <button className={`${styles['appartment-btn']} mt-10`}>Jetzt loslegen</button>
            </div>
          </div>
      </div>
    </>
  );
};

export default HomeContent;
