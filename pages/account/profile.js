import React, { useState, useEffect, useRef } from 'react';
import DashboardHeader from '@/components/DashboardHeader';
import Link from 'next/link';
import styles from '../../styles/profile.module.css';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import TooltipButton from '@/components/Tooltip';
import Image from 'next/image';

const Profile = () => {
  const [user, setUser] = useState({ firstname: '', lastname: '', email: '', profileimg: '' });
  const [photo, setPhoto] = useState(null);
  const [refresh, SetRefresh] = useState(false);

  useEffect(() => {
      fetchUserData();
  }, []);
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
  const deleteProfile = async () => {
    try {
      if (user.profileimg) {
        const existingImageUrl = user.profileimg;
        const response = await fetch(`${process.env.NEXT_PUBLIC_HOST}/api/user/deleteblobobject?url=${encodeURIComponent(existingImageUrl)}`, {
            method: "DELETE",
            headers: {
                'Accept': 'application/json',
            }
        });
        if (response.ok) {
            const responseData = await response.json(); // Parse the JSON response
            const res = await fetch(`${process.env.NEXT_PUBLIC_HOST}/api/user/profileimg`, {
              method: "GET",
              headers: {
                  'Accept': 'application/json',
              }
          });
            toast.success('Profile Deleted successfully', {
              position: "top-center",
              autoClose: 1500,
              hideProgressBar: true,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
              theme: "light",
              });
              SetRefresh(!refresh)
              fetchUserData();
            console.log(responseData.success); // Now you can access responseData.success
        } else {
            // Handle non-successful response
            console.error('Error deleting blob:', response.statusText);
        }
    }
    } catch (error) {
      toast.error('Failed to fetch user data');
    }
  }

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser((prevUser) => ({ ...prevUser, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch('/api/user/update', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          firstname: user.firstname,
          lastname: user.lastname
        })
      });
      const data = await res.json();

      if (res.ok) {
        toast.success('Profile updated successfully');
      } else {
        toast.error(data.message || 'Failed to update profile');
      }
    } catch (error) {
      toast.error('Failed to update profile');
    }
  };
  const fileInputRef = useRef(null);

  // Function to trigger click on file input
  const handleButtonClick = () => {
    fileInputRef.current.click();
  };

  
  // Function to handle file selection
  const handleFileChange = async (event) => {
    const { name, files } = event.target;

    if (name === 'photo') {
        const uploadedFile = files[0];
        if (name === 'photo' && uploadedFile && uploadedFile.type.startsWith('image/')) {
            setPhoto(files[0]);
        } else {
            // Display an error message or handle the case where the uploaded file is not an image
            toast.error("File type is incorect!", {
              position: "top-center",
              autoClose: 2000,
              hideProgressBar: true,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
              theme: "light",
          });
            return;
        }
    }

    const formData = new FormData();
    formData.append('photo', files[0]); // Use files[0] directly here

    const response = await fetch(`${process.env.NEXT_PUBLIC_HOST}/api/user/profileimg`, {
        method: "POST",
        body: formData,
        headers: {
            'Accept': 'application/json', // Ensure the server knows you expect JSON
        }
    });
    const data = await response.json();
    // setUser(prevUser => ({ ...prevUser, profileimg: data.profileimg }));
    // console.log(data.success);
    if (data.success) {
      // toast.success('Profile updated successfully');
      toast.success('Profile updated successfully', {
        position: "top-center",
        autoClose: 2000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
    });
    SetRefresh(!refresh)
    fetchUserData();

    } else {
        toast.error(data.message, {
            position: "top-center",
            autoClose: 2000,
            hideProgressBar: true,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
        });
    }

    // console.log('Selected file:', files[0]);
};

  
  return (
    <>
      <DashboardHeader key={refresh} />
      <ToastContainer />
      <div className="flex">
     
      <div className="flex-1 ml-64"></div>
      <div className="bg-gray-100 py-8 p-12">
        <div className="mx-auto px-4 sm:px-6 lg:px-8 p-4">
          <nav className="">
            <h1 className={`${styles['heading-dash']}`}>Einstellungen</h1>
            <div  id="navbar-default">
              <ul className={`${styles['nav-form']} flex flex-wrap items-center`}>
                <li className={`${styles['nav-form-li']} ${styles['active']}`}>
                  <Link href="/account/profile" legacyBehavior>
                    <a href="#" className="block py-2 px-3" aria-current="page">
                      Profil
                    </a>
                  </Link>
                </li>
                <li className={`${styles['nav-form-li']}`}>
                  <Link href="/account/settings" legacyBehavior>
                    <a href="#" className="block py-2 px-3">
                      Kontoeinstellungen
                    </a>
                  </Link>
                </li>
                <li className={`${styles['nav-form-li']}`}>
                  <Link href="/account/subscription" legacyBehavior>
                    <a href="#" className="block py-2 px-3">
                    Abonnement
                    </a>
                  </Link>
                </li>
              </ul>
            </div>
          </nav>
          <div className="flex gap-4 mt-4">
            <div className=" w-2/3">
              <div className={`${styles['two-third']} p-10`}>
              <h3 className={`${styles['heading-personl']}`}>Persönliche Daten</h3>
              <form className= "mt-4" onSubmit={handleSubmit}>
                <div className="grid grid-cols-2 gap-4 mt-3 mb-3">
                  <div>
                    <label className={`${styles['loginform-label']}`}>Vorname</label>
                    <div className={`${styles['input-field']} mt-1`}>
                      <input
                        type="text"
                        className={`${styles['form-input']} form-input`}
                        id="vorname"
                        name="firstname"
                        value={user.firstname}
                        onChange={handleChange}
                        placeholder="Vorname"
                      />
                    </div>
                  </div>
                  <div>
                    <label className={`${styles['loginform-label']}`}>Nachname</label>
                    <div className={`${styles['input-field']} mt-1`}>
                      <input
                        type="text"
                        className={`${styles['form-input']} form-input`}
                        id="nachname"
                        name="lastname"
                        value={user.lastname}
                        onChange={handleChange}
                        placeholder="Nachname"
                      />
                    </div>
                  </div>
                </div>
                <div className="grid grid-cols-1 gap-4 mt-5">
                  <div>
                  <label className={`${styles['loginform-label']} ${styles['email-label']} mt-1`}>
                                    E-Mail-Adresse  <TooltipButton />
                    </label>

                    <div className={`${styles['input-field']} read_only_field mt-1`}>
                      <input
                        type="email"
                        className={`${styles['form-input']} read_only_field form-control`}
                        id="email"
                        name="email"
                        value={user.email}
                        readOnly
                        placeholder="E-Mail"
                      />
                    </div>
                  </div>
                </div>
                <div className="grid grid-cols-1 gap-4 mt-5">
                  <div>
                  <label className={`${styles['loginform-label']} ${styles['email-label']} mt-1`}>
                     Telefonnummer 
                    </label>

                    <div className={`${styles['input-field']} read_only_field mt-1`}>
                      <input
                        type="tel"
                        className={`${styles['form-input']} read_only_field form-control`}
                        id="phone"
                        name="phone"
                        value={user.phone}
                        readOnly
                        placeholder="Telefonnummer"
                      />
                    </div>
                  </div>
                </div>
                <div className="text-end mt-3">
                  <button type="submit" className={`${styles['update-btn']} leading-6 shadow-sm px-3 py-1.5`}>
                    Update now
                  </button>
                </div>
              </form>
              </div>
              <div className={`${styles['two-third']} mt-6 p-10`}>
              <h3 className={`${styles['heading-personl']}`}>Adresse</h3>
              <form className= "mt-4" onSubmit={handleSubmit}>
                <div className="grid grid-cols-2 gap-4 mt-3 mb-3">
                  <div>
                    <label className={`${styles['loginform-label']}`}>Straße</label>
                    <div className={`${styles['input-field']} mt-1`}>
                      <input
                        type="text"
                        className={`${styles['form-input']} form-input`}
                        id="strabe"
                        name="strabe"
                        value={user.strabe}
                        onChange={handleChange}
                        placeholder="Straße"
                      />
                    </div>
                  </div>
                  <div>
                    <label className={`${styles['loginform-label']}`}>Stadt</label>
                    <div className={`${styles['input-field']} mt-1`}>
                      <input
                        type="text"
                        className={`${styles['form-input']} form-input`}
                        id="stadt"
                        name="stadt"
                        value={user.stadt}
                        onChange={handleChange}
                        placeholder="Stadt"
                      />
                    </div>
                  </div>
                </div>
                <div className="grid grid-cols-1 gap-4 mt-5">
                  <div>
                  <label className={`${styles['loginform-label']} ${styles['email-label']} mt-1`}>
                    Postleitzahl 
                  </label>

                    <div className={`${styles['input-field']} read_only_field mt-1`}>
                      <input
                        type="text"
                        className={`${styles['form-input']} read_only_field form-control`}
                        id="postleitzahl"
                        name="postleitzahl"
                        value={user.postleitzahl}
                        placeholder="Postleitzahl"
                      />
                    </div>
                  </div>
                </div>
                <div className="grid grid-cols-1 gap-4 mt-5">
                  <div>
                  <label className={`${styles['loginform-label']} ${styles['email-label']} mt-1`}>
                  Land 
                    </label>

                    <div className={`${styles['input-field']} read_only_field mt-1`}>
                      <input
                        type="text"
                        className={`${styles['form-input']} read_only_field form-control`}
                        id="land"
                        name="land"
                        value={user.land}
                        placeholder="Land"
                      />
                    </div>
                  </div>
                </div>
                <div className="text-end mt-3">
                  <button type="submit" className={`${styles['update-btn']} leading-6 shadow-sm px-3 py-1.5`}>
                    Update now
                  </button>
                </div>
              </form>
              </div>
            </div>
            <div className={`${styles['one-third']} w-1/3 p-10`}>
              <h3 className={`${styles['heading-personl']}`}>Profilbild</h3>
              <p className={`${styles['p-login']} mt-4`}>
                Für die besten Ergebnisse verwenden Sie ein Bild mit mindestens 600 x 600 Pixeln.
              </p>
              <div className="mt-5 flex flex-col justify-center items-center">
              {user !== null ? (
                  <img
                  className="w-72 rounded-full"
                  src={user && user.profileimg ? user.profileimg : "/avatar.png"}
                  alt=""
                />
                ) : (
                  <div>No user profile image available</div>
                )}
                
                {/* Hidden file input */}
                <input
                  type="file"
                  ref={fileInputRef}
                  onChange={handleFileChange}
                  style={{ display: 'none' }}
                  name='photo'
                />
                {/* Button to trigger file input */}
              </div>
              <div className='mt-5 flex justify-center items-center gap-10'>
                <button className={`${styles['update-btn']} leading-6 shadow-sm px-3 py-1.5`} onClick={handleButtonClick}>Ändern</button>
                <button className={`${styles['delete-btn']} leading-6 shadow-sm px-3 py-1.5`} onClick={deleteProfile}>Löschen</button>
              </div>
            </div>
          </div>
          
          
        </div>
      </div>
      </div>
    </>
  );
};

export default Profile;
