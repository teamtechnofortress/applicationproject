import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import dynamic from 'next/dynamic';
import axios from 'axios';
import Image from 'next/image';
import SidebarHeader from '@/components/SidebarHeader';
import styles from '../../styles/applications.module.css';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Link from 'next/link';

const PDFDownloadLink = dynamic(
  () => import('@react-pdf/renderer').then(mod => mod.PDFDownloadLink),
  { ssr: false }
);

const AllApplications = () => {
  const [cvdata, setCvdata] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isEmpty, setIsEmpty] = useState(false);
  const [user, setUser] = useState({ firstname: '', lastname: '' });
  const router = useRouter();
  const [selectedApplication, setSelectedApplication] = useState(null);
  const [showPopup, setShowPopup] = useState(false);


  /** Fetches all apartment applications */
  const fetchProfileData = async () => {
    try {
      const response = await axios.get(`${process.env.NEXT_PUBLIC_HOST}/api/user/allapplications`);
      if (response.data && Array.isArray(response.data)) {
        // Get only parent applications (no parentId)
        const parentApplications = response.data.filter(app => !app.parentId);
        
        // Create a map to check if an application is a parent
        const childParentMap = new Set(response.data.map(app => app.parentId).filter(Boolean));

        // Update state
        setCvdata(parentApplications.map(app => ({
          ...app,
          hasChild: childParentMap.has(app._id) // Check if this application has a child
        })));
        setIsEmpty(parentApplications.length === 0);
      } else {
        setCvdata([]);
        setIsEmpty(true);
      }
    } catch (error) {
      console.error('Error fetching data:', error);
      setCvdata([]);
      setIsEmpty(true);
    } finally {
      setLoading(false);
    }
  };

  /** Fetches logged-in user details */
  const fetchUserData = async () => {
    try {
      const res = await fetch('/api/user/get', {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' },
      });
      const data = await res.json();
      if (res.ok) {
        setUser(data.user);
      } else {
        toast.error(data.message || 'Failed to fetch user data');
      }
    } catch (error) {
      toast.error('Failed to fetch user data');
    }
  };

  useEffect(() => {
    fetchProfileData();
    fetchUserData();
  }, []);

  return (
    <>
      <SidebarHeader />
      <ToastContainer />
      <div className="flex">
        <div className="flex-1 ml-64">
          <div className="bg-gray-100 py-8 sm:p-4 lg:p-12 p-4">
            <div className="mx-auto px-4">
              <h2 className={`${styles['application-h2']} mt-7`}>
                Hello {user.firstname} {user.lastname}
              </h2>
              <div className={`${styles['application-flex-div']}`}>
                <h2 className={`${styles['application-h4']}`}>Your apartment applications</h2>
                <Link href="/account/application" legacyBehavior>
                  <button className={`${styles['or-button']} mt-10`}>
                    New <img className={`${styles['img-button']}`} src="/images/plus.svg" />
                  </button>
                </Link>
              </div>

              <div className={`${styles['flex-sec']} gap-8`}>
                {loading ? (
                  <div>Loading...</div>
                ) : isEmpty ? (
                  <div>No data available</div>
                ) : (
                  cvdata.map((profile) => {
                    return (
                      <div key={profile._id} className={`${styles['pdf-sec']} relative`}>
                        <div className={`${styles['pdf-btn-grp']}`}>
                          
                          {/* Hide "Person hinzufügen" if this application already has a child */}
                          {!profile.hasChild && (
                            <button
                              type="button"
                              onClick={() => router.push(`/account/application?parentId=${profile._id}`)}
                              className={`${styles['pdf-person']}`}
                            >
                              Person hinzufügen <img className={`${styles['img-button']}`} src="/images/plus.svg" />
                            </button>
                          )}

                         
                          <button
                            className={`${styles['pdf-btn']}`}
                            onClick={(event) => {
                              event.preventDefault();
                              event.stopPropagation();

                              if (profile.hasChild) {
                                setSelectedApplication(profile);
                                setShowPopup(true);
                              } else {
                                router.push(`/account/editapplication?id=${profile._id}`);
                              }
                            }}
                          >
                            <img src="/images/write.svg" />
                          </button>


                       


                          <a href={profile.pdfPath} download target="_blank" rel="noopener noreferrer">
                            <button className={`${styles['pdf-btn']}`}>
                              <img src="/images/view.svg" className={`${styles['img-pdf']}`} />
                            </button>
                          </a>
                        </div>

                        {/* Dynamic PDF Banner */}
                        <div className={`${styles['pdf-layout']}`}>
                          <div className={`${styles['pdf-body']}`}>
                            <img src="/images/pdfbanner.png" alt="PDF Banner" />
                            <img src="/images/logo.png" className={`${styles['logoimage']}`} alt="Logo" />
                            <p className={`${styles['bannersmall']}`}>Die</p>
                            <p className={`${styles['bannertitle']}`}>Bewerbermappe</p>
                            <p className={`${styles['para']}`}>Von</p>
                            <p className={`${styles['para']}`}>{profile.vorname} {profile.nachname}</p>
                          </div>

                          {/* Footer Section */}
                          <div className={`${styles['footer-pdf']}`}>
                            <div className={`${styles['footerRow']}`}>
                              <div className={`${styles['footerColOne']}`}>
                                <p className={`${styles['footerTextOne']}`}>
                                  {profile.strabe} {profile.hausnummer}
                                  <br />
                                  {profile.postleitzahl}, {profile.Ort}
                                </p>
                              </div>
                              <div className={`${styles['footerColCenter']}`}>
                                <img className={`${styles['footerlogo']}`} src="/images/barcode.png" alt="Barcode" />
                              </div>
                              <div className={`${styles['footerCol']}`}>
                                <p className={`${styles['footerText']}`}>{profile.phonenumber}</p>
                                <p className={`${styles['footerText']}`}>{profile.email}</p>
                              </div>
                            </div>
                          </div>
                        </div>

                        {/* PDF Settings */}
                        {/* <Pdfpopup pdfID={profile._id} handleFormSubmit={fetchProfileData} /> */}
                      </div>
                    );
                  })
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
      {showPopup && selectedApplication && (
        <div
        id="tip-modal"
        className="fixed inset-0 bg-gray-600 bg-opacity-50 flex justify-center items-center z-50 text-gray-900 dark:text-white"
        onClick={() => setisTipModal(false)} 
        >
        
        <div
          className={`${styles["tip_bg"]} relative p-4 w-full max-w-2xl max-h-full bg-white rounded-lg shadow text-gray-900`}
          onClick={(e) => e.stopPropagation()}
        >
          <div className="p-4 md:p-5 rounded-t justify-between items-center relative">
          <button
              type="button"
              className="text-gray-700 hover:text-gray-900 text-lg font-bold absolute top-0 right-0"
              onClick={() => setShowPopup(false)}
            >
              ✖
            </button>
            <h3 className={`${styles["modal-h3"]}`}>
              <div className="flex gap-4 justify-center">
              <img className="" src="/images/tip.svg" alt="Tip Icon" />  Select which application to edit
              </div>
            </h3>
          </div>
          <div className="p-4 md:p-5 space-y-4">
           {/* Edit Parent */}
           <button
              className={styles['popup-btn']}
              onClick={() => {
                router.push(`/account/editapplication?id=${selectedApplication._id}`);
                setShowPopup(false);
              }}
            >
              Edit Parent Application
            </button>
              {/* Edit Child */}
              <button
              className={styles['popup-btn']}
              onClick={() => {
                const childId = cvdata.find(app => app.parentId === selectedApplication._id)?._id;
                console.log(selectedApplication.parentId)
                if (selectedApplication.parentId) {
                  router.push(`/account/editapplication?id=${selectedApplication.parentId}`);
                  setShowPopup(false);
                }
              }}
            >
              Edit Child Application
            </button>
          </div>
        </div>
      </div>
      )}
    </>
  );
};

export default AllApplications;
