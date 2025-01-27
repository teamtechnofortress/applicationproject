import React, { useEffect, useState,useRef } from 'react';
import dynamic from 'next/dynamic';
import axios from 'axios';
import MyDocument from '@/components/MyDocument';
import Image from 'next/image';
import UserNav from '@/components/UserNav';
import styles from '../../styles/applications.module.css'
import Link from 'next/link';
import Pdfpopup from '@/components/Pdfsettings';



const PDFDownloadLink = dynamic(
  () => import('@react-pdf/renderer').then(mod => mod.PDFDownloadLink),
  { ssr: false }
)

const allapplications = () => {
  const [cvdata, setCvdata] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isEmpty, setIsEmpty] = useState(false);
  const [user, setUser] = useState({ firstname: '', lastname: '', email: '' });
  const menuRef = useRef(null); 

  const [isMenuVisible, setIsMenuVisible] = useState(false);

  const toggleMenu = (event) => {
    event.preventDefault(); 
    setIsMenuVisible((prev) => !prev); 
  };

 
  const fetchProfileData = async () => {
    try {
      const response = await axios.get(`${process.env.NEXT_PUBLIC_HOST}/api/user/allapplications`);
      if (!response.data || response.data.length === 0) {
        setIsEmpty(true); // Set isEmpty to true if no data is available
      } else {
        setIsEmpty(false); // Set isEmpty to false if data is available
        setCvdata(response.data);
      }
    } catch (error) {
      console.error('Error fetching data:', error);
      setIsEmpty(true); // Consider empty if there's an error
    } finally {
      setLoading(false);
    }
  };

  // Rest of the code remains the same...
  const fetchUserData = async () => {
    try {
      const res = await fetch('/api/user/get', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json'
        }
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
    // Fetch the profile data    
    fetchProfileData();
    fetchUserData();
  }, []);
  
// Filter cvdata by unique familyid
const uniqueFamilyEntries = cvdata
? cvdata.filter(
    (entry, index, self) =>
      index === self.findIndex((e) => e.familyid === entry.familyid)
  )
: [];
  const documentRef = useRef(null);

  const captureImage = async () => {
    if (documentRef.current) {
      const canvas = await html2canvas(documentRef.current);
      const imgData = canvas.toDataURL('image/png');
      // You can now use the image data (imgData) as needed
      const img = new window.Image();  // Ensure we're using the browser's Image constructor
      img.src = imgData;
      // Append the image to the body
      document.body.appendChild(img);
    }
  };
return (
  <>
   
    <UserNav />
    <div className="py-8 p-12">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div>
          <h2 className={`${styles['application-h2']} mt-7`}>Hello {user.firstname}!</h2>
          <div className={`${styles['application-flex-div']}  flex items-center justify-between`}>
            <h2 className={`${styles['application-h4']}`}>Your documents</h2>
            {/* <Link href="/account/application" legacyBehavior>
              <button className={`${styles['or-button']}`}> New Application</button>
            </Link> */}
            <div className="flex items-center space-x-4">
                {/* Toggle Button */}
                <div ref={menuRef}>  {/* Reference added to the dropdown container */}
                  <button
                    onClick={toggleMenu}
                    type="button"
                    className={`${styles['or-button']}`}
                    id="user-menu-button"
                    aria-expanded={isMenuVisible}
                    aria-haspopup="true"
                  >
                    <span className="ml-3">New Application</span>
                    <i className="fa fa-chevron-down ml-3 text-xs"></i>
                  </button>
                   {/* Dropdown menu */}
                   {isMenuVisible && (
                     <div
                       className="absolute z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none"
                       role="menu"
                       aria-orientation="vertical"
                       aria-labelledby="user-menu-button"
                       tabIndex="-1"
                     >
                       <Link href="/account/application" legacyBehavior>
                         <a
                           href="#"
                           className="block px-4 py-2 text-sm text-gray-700"
                           role="menuitem"
                           tabIndex="-1"
                           id="user-menu-item-1"
                         >
                           For 1 person
                         </a>
                       </Link>
                       <Link href="/account/applicationtwo" legacyBehavior>
                         <a
                           href="#"
                           className="block px-4 py-2 text-sm text-gray-700"
                           role="menuitem"
                           tabIndex="-1"
                           id="user-menu-item-0"
                         >
                           For 2 persons
                         </a>
                       </Link>
                       <Link href="#" legacyBehavior>
                         <a
                           href="#"
                           className="block px-4 py-2 text-sm text-gray-700"
                           role="menuitem"
                           tabIndex="-1"
                           id="user-menu-item-1"
                         >
                           For 3 persons
                         </a>
                       </Link>
                     </div>
                   )}
                </div>
              </div>
          </div>
        </div>
        <div className="flex">
          {isEmpty ? (
            <div>No data available</div>
          ) : (
            // Array.isArray(cvdata) && cvdata.length > 0 ? (
            //   cvdata.map(profile => (
              Array.isArray(uniqueFamilyEntries) && uniqueFamilyEntries.length > 0 ? (
                uniqueFamilyEntries.map((profile) => (
                <div key={profile._id} className="profile">
                 <PDFDownloadLink document={<MyDocument profileData={profile} />} fileName="profile.pdf">
                  {({ loading }) => (
                    loading ? (
                      'Loading document...'
                    ) : (
                      <div className="m-5">
                        <Image src="/pdf.jpeg" alt="Download" width={50} height={50} />
                      </div>
                    )
                  )}
                </PDFDownloadLink>
                  <div className='flex items-center justify-between'>
                    <p className={`${styles['application-p']}`}>{loading ? 'Loading document...' : profile.title}</p>
                    <Pdfpopup pdfID={profile._id}  handleFormSubmit={fetchProfileData}  />
                   </div>
                  {/* <button onClick={() => renameApplication('title')}>{profile.title}</button> */}
                </div>

              ))
            ) : (
              <div></div>
            )
          )}
          <div>
          {/* <div ref={documentRef} style={{ padding: '20px', border: '1px solid black' }}>
            <h1>Capture this component</h1>
            <p>This is a paragraph that will be captured as an image.</p>
            <Stepone />
          </div>
          <button onClick={captureImage}>Capture Image</button> */}
        </div>
          {/* <button onClick={() => deleteApplication('665b11e9ddc7c4e620e757be')}>Delete</button> */}
        </div>
      </div>
    </div>
  </>
);


}

export default allapplications;
