import React, { useEffect, useState } from 'react';
import dynamic from 'next/dynamic';
import axios from 'axios';
import Image from 'next/image';
import SidebarHeader from '@/components/SidebarHeader';
import styles from '../../styles/applications.module.css';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Link from 'next/link';
import Pdfpopup from '@/components/Pdfsettings';
import MyDocument from '@/components/MyDocument';

const PDFDownloadLink = dynamic(
  () => import('@react-pdf/renderer').then(mod => mod.PDFDownloadLink),
  { ssr: false }
);

const AllApplications = () => {
  const [cvdata, setCvdata] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isEmpty, setIsEmpty] = useState(false);
  const [user, setUser] = useState({ firstname: '', lastname: '' });

  const fetchProfileData = async () => {
    try {
      const response = await axios.get(`${process.env.NEXT_PUBLIC_HOST}/api/user/allapplications`);
      if (!response.data || response.data.length === 0) {
        setIsEmpty(true);
      } else {
        setIsEmpty(false);
        setCvdata(response.data);
      }
    } catch (error) {
      console.error('Error fetching data:', error);
      setIsEmpty(true);
    } finally {
      setLoading(false);
    }
  };

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
                {isEmpty ? (
                  <div>No data available</div>
                ) : (
                  cvdata.map((profile) => (
                    <div key={profile._id} className={`${styles['pdf-sec']} relative`}>
                      <div className={`${styles['pdf-btn-grp']}`}>
                        <Link href="/account/application" legacyBehavior>
                          <button className={`${styles['pdf-person']}`}>
                            Person hinzufügen <img className={`${styles['img-button']}`} src="/images/plus.svg" />
                          </button>
                        </Link>
                        <Link href="/account/application" legacyBehavior>
                          <button className={`${styles['pdf-btn']}`}>
                            <img src="/images/write.svg" />
                          </button>
                        </Link>
                        <PDFDownloadLink document={<MyDocument profileData={profile} />} fileName={`Application_${profile._id}.pdf`}>
                          {({ loading }) => (
                            <button className={`${styles['pdf-btn']}`} disabled={loading}>
                              {loading ? 'Loading...' : <img src="/images/view.svg" className={`${styles['img-pdf']}`} />}
                            </button>
                          )}
                        </PDFDownloadLink>
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
                              <p className={`${styles['footerTextOne']}`}>{profile.strabe} {profile.hausnummer}{"\n"} {profile.postleitzahl}, {profile.Ort}</p>
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
                  ))
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AllApplications;
