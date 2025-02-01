import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import styles from '@/styles/profile.module.css';

const ProfileComponent = () => {
    const [user, setUser] = useState({ firstname: '', lastname: '', email: '', profileimg: '' });
    const [photo, setPhoto] = useState(null);
    const [refresh, setRefresh] = useState(false);
    const fileInputRef = useRef(null);

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
                    toast.success('Profile Deleted successfully');
                    setRefresh(!refresh);
                    fetchUserData();
                } else {
                    console.error('Error deleting blob:', response.statusText);
                }
            }
        } catch (error) {
            toast.error('Failed to fetch user data');
        }
    };

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

    const handleButtonClick = () => {
        fileInputRef.current.click();
    };

    const handleFileChange = (e) => {
        setPhoto(e.target.files[0]);
    };

    return (
        <div className="py-8 p-12">
            <div className="mx-auto px-4 sm:px-6 lg:px-8 p-4">
                <nav className="bg-white">
                    <div className="w-full md:block md:w-auto">
                        <ul className={`${styles['nav-form']} flex flex-wrap items-center`}>
                            <li className={`${styles['nav-form-li']} ${styles['active']}`}>
                                <Link href="/account/profile" legacyBehavior>
                                    <a className="block py-2 px-3">Profil</a>
                                </Link>
                            </li>
                            <li className={styles['nav-form-li']}>
                                <Link href="/account/settings" legacyBehavior>
                                    <a className="block py-2 px-3">Kontoeinstellungen</a>
                                </Link>
                            </li>
                        </ul>
                    </div>
                </nav>
                <div className="flex gap-4 mt-4">
                    <div className={`${styles['two-third']} w-2/3 p-10`}>
                        <h3 className={styles['heading-personl']}>Persönliche Daten</h3>
                        <form className="mt-4" onSubmit={handleSubmit}>
                            <div className="grid grid-cols-2 gap-4 mt-3 mb-3">
                                <div>
                                    <label className={styles['loginform-label']}>Vorname</label>
                                    <div className={`${styles['input-field']} mt-1`}>
                                        <input
                                            type="text"
                                            className={styles['form-input']}
                                            name="firstname"
                                            value={user.firstname}
                                            onChange={handleChange}
                                            placeholder="Vorname"
                                        />
                                    </div>
                                </div>
                                <div>
                                    <label className={styles['loginform-label']}>Nachname</label>
                                    <div className={`${styles['input-field']} mt-1`}>
                                        <input
                                            type="text"
                                            className={styles['form-input']}
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
                                        E-Mail-Adresse
                                    </label>
                                    <div className={`${styles['input-field']} read_only_field mt-1`}>
                                        <input
                                            type="email"
                                            className={`${styles['form-input']} read_only_field`}
                                            name="email"
                                            value={user.email}
                                            readOnly
                                            placeholder="E-Mail"
                                        />
                                    </div>
                                </div>
                            </div>
                            <div className="text-end mt-3">
                                <button type="submit" className={`${styles['update-btn']} px-3 py-1.5`}>
                                    Update now
                                </button>
                            </div>
                        </form>
                    </div>
                    <div className={`${styles['one-third']} w-1/3 p-10`}>
                        <h3 className={styles['heading-personl']}>Profilbild</h3>
                        <p className={`${styles['p-login']} mt-4`}>
                            Für die besten Ergebnisse verwenden Sie ein Bild mit mindestens 600 x 600 Pixeln.
                        </p>
                        <div className="mt-5 flex flex-col justify-center items-center">
                            {user.profileimg ? (
                                <img className="h-72 w-72 rounded-full" src={user.profileimg} alt="Profile" />
                            ) : (
                                <div>No user profile image available</div>
                            )}
                            <input
                                type="file"
                                ref={fileInputRef}
                                onChange={handleFileChange}
                                style={{ display: 'none' }}
                            />
                        </div>
                        <div className="mt-5 flex justify-center items-center gap-x-24">
                            <button className={`${styles['update-btn']} px-3 py-1.5`} onClick={handleButtonClick}>
                                Change
                            </button>
                            <button className={`${styles['update-btn']} px-3 py-1.5`} onClick={deleteProfile}>
                                Delete
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProfileComponent;
