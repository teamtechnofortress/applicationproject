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
import { DateTime } from 'luxon';

const PDFDownloadLink = dynamic(
  () => import('@react-pdf/renderer').then(mod => mod.PDFDownloadLink),
  { ssr: false }
);

const AllApplications = () => {
  const [cvdata, setCvdata] = useState([]);
  const [applicationCount, setApplicationCount] = useState(0);
  const [loading, setLoading] = useState(true);
  const [isEmpty, setIsEmpty] = useState(false);
  const [user, setUser] = useState({ firstname: '', lastname: '' });
  const [subscriptionData, setSubscriptionData] = useState(null);
  const [selectedApplication, setSelectedApplication] = useState([]);
  const [showPopup, setShowPopup] = useState(false);

  const router = useRouter();
  /** Fetches all apartment applications */
  const fetchProfileData = async () => {
  try {
    const response = await axios.get(`${process.env.NEXT_PUBLIC_HOST}/api/user/allapplications`);
    // Assuming response.data contains the actual array of applications
    const data = response.data; // This should be the array of profiles
    if (Array.isArray(data)) {
      data.forEach(profile => {
        // Accessing childId fields (firstname and lastname)
        if (profile.childId) {
          // console.log('Child ID Firstname:', profile.childId.vorname);
          // console.log('Child ID Lastname:', profile.childId.nachname);
        }
      });
      // console.log('Response:', data);
     }

    if (response.data && Array.isArray(response.data)) {
      setApplicationCount(response.data.length); 
      setCvdata(response.data)
     
    } else {
      setCvdata([]);
      setApplicationCount(0);
      setIsEmpty(true);
    }
  } catch (error) {
    console.error('Error fetching data:', error);
    setCvdata([]);
    setApplicationCount(0);
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

  const fetchSubscriptionStatus = async () => {
    try {
      const res = await fetch("/api/user/subscription");
      const data = await res.json();
      if (res.ok) setSubscriptionData(data.data);
    } catch (err) {
      console.error("Subscription fetch error:", err);
    }
  };


  useEffect(() => {
    fetchProfileData();
    fetchUserData();
    fetchSubscriptionStatus();
  }, []);

  const isOneTimeValid = () => {
    if (subscriptionData?.paymentType === "one-time") {
      const created = DateTime.fromISO(subscriptionData.createdAt);
      return DateTime.now() < created.plus({ days: 4 });
    }
    return false;
  };

  const canAddApplication = () => {
    if (!subscriptionData) return applicationCount === 0;
    if (subscriptionData.paymentType === "subscription") {
      return subscriptionData.status === "active";
    }
    if (subscriptionData.paymentType === "one-time") {
      return applicationCount === 0 && isOneTimeValid();
    }
    return false;
  };

  const canEdit = () => {
    if (!subscriptionData) return false;
    if (subscriptionData.paymentType === "subscription" &&  subscriptionData.status === "active") {
      return true;
    }
    if (subscriptionData.paymentType === "one-time") {
      return isOneTimeValid();
    }
    return false;
  };

  const canView = () => {
    if (!subscriptionData) return false;
    return subscriptionData.status === "active" || subscriptionData.paymentType === "one-time";
  };

  const canAddChild = () => {
    if (!subscriptionData) return false;
    return subscriptionData.paymentType === "subscription" && subscriptionData.status === "active";
  };

  const showQrCode = () => {
    return canEdit();
  };

  return (
    <>
      <SidebarHeader />
      <ToastContainer />
      <div className="flex">
        <div className="flex-1 ml-0 md:ml-64">
          <div className="bg-gray-100 py-8 sm:p-4 lg:p-12 p-4">
            <div className="mx-auto px-4">
              <h2 className={`${styles['application-h2']} mt-7`}>
                Hallo {user.firstname} {user.lastname}
              </h2>
              <div className={`${styles['application-flex-div']}`}>
                <h2 className={`${styles['application-h4']}`}>Deine Wohnungsbewerbungen</h2>
                {/* Get applications where parent === 0 and check if there are 2 */}
                {canAddApplication() && (
                  <Link href="/account/application" legacyBehavior>
                    <button className={`${styles['or-button']} mt-10`}>
                      New <img className={`${styles['img-button']}`} src="/images/plus.svg" />
                    </button>
                  </Link>
                )}
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
                          {!profile.childId && canAddChild() && (
                            <button
                              type="button"
                              onClick={() => router.push(`/account/application?parentId=${profile._id}`)}
                              className={`${styles['pdf-person']}`}
                            >
                              Person hinzufügen <img className={`${styles['img-button']}`} src="/images/plus.svg" />
                            </button>
                          )}

                         
                          {/* Edit */}
                          {canEdit() && (
                            <button
                              className={`${styles['pdf-btn']}`}
                              onClick={(event) => {
                                event.preventDefault();
                                event.stopPropagation();
                                if (profile.childId) {
                                  // setSelectedApplication({ childId: profile.childId, parentId: profile._id });
                                  setSelectedApplication({
                                    parentId: profile._id,
                                    childId: profile.childId._id,
                                    parentName: `${profile.vorname} ${profile.nachname}`,
                                    childName: `${profile.childId.vorname} ${profile.childId.nachname}`,
                                    
                                  });
                                  setShowPopup(true);
                                } else {
                                  router.push(`/account/editapplication?id=${profile._id}`);
                                }
                              }}
                              
                            >
                              <img src="/images/write.svg" />
                            </button>
                          )}

                        {/* View PDF */}
                        {/* {canView() && (
                            <a href={profile.pdfPath} download target="_blank" rel="noopener noreferrer">
                              <button className={`${styles['pdf-btn']}`}>
                                <img src="/images/view.svg" className={`${styles['img-pdf']}`} />
                              </button>
                            </a>
                          )} */}

                            {subscriptionData?.paymentType === "subscription" && subscriptionData?.status === "active" || 
                            isOneTimeValid() ? (
                              <a href={profile.pdfPath} download target="_blank" rel="noopener noreferrer">
                                <button className={`${styles['pdf-btn']}`}>
                                  <img src="/images/view.svg" className={`${styles['img-pdf']}`} />
                                </button>
                              </a>
                            ) : (
                              <button
                                className={`${styles['pdf-btn']}`}
                                onClick={() => router.push('/account/subscriptiondetail')}
                                title="Plan erforderlich"
                              >
                                <img src="/images/view.svg" className={`${styles['img-pdf']}`} />
                              </button>
                            )}
                          
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
                              {showQrCode() && (
                                  <div className={`${styles['footerlogo']}`}>
                                    <img src={profile.qrCode} alt="Barcode" />
                                    <p className={`${styles['scanMe']}`}>Scan Me</p>
                                  </div>
                                )}
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
                router.push(`/account/editapplication?id=${selectedApplication.parentId}`);
                setShowPopup(false);
              }}
            >
    
            Bewerbermappe von {selectedApplication.parentName} bearbeiten
            </button>
              {/* Edit Child */}
              <button
              className={styles['popup-btn']}
              onClick={() => {
               
                  router.push(`/account/editapplication?id=${selectedApplication.childId}`);
                  setShowPopup(false);
              
              }}
            >
      
              Bewerbermappe von {selectedApplication.childName} bearbeiten
            </button>
          </div>
        </div>
      </div>
      )}
    </>
  );
};

export default AllApplications;
