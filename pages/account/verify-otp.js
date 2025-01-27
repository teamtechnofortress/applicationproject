import React, { useState, useEffect } from 'react';
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import UserNav from '@/components/UserNav';
import styles from '../../styles/profile.module.css';
import Link from "next/link";
import { useRouter } from 'next/router';

const VerifyOtp = () => {
  const [otp, setOtp] = useState('');
  const router = useRouter();
  const { newEmail } = router.query;

  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await fetch('/api/user/verify-otp', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ otp }),
    });
    const data = await res.json();
    console.log(res.status)

    if (res.status === 200) {
      toast.success(data.message);
      setTimeout(() => {
        router.push('/account/settings');
      }, 2000); // 2 seconds delay
      
    } else {
      toast.error(data.message);
    }
  };

  return (
    <div>
      <UserNav />
      <ToastContainer />
        <div className="py-8 p-10">
        <div className="mx-auto px-4 sm:px-6 lg:px-8 p-4">
          
          <div className="gap-4 mt-4">
            <form className={`${styles['form-spacing']} mt-4`} onSubmit={handleSubmit}>
              <div className={`${styles['two-third']} p-10`}>
                <h3 className={`${styles['heading-personl']}`}>Verify OTP</h3>
                <div className="grid grid-cols-1 gap-4 mt-5">
                  <div className="...">
                    <label className={`${styles['loginform-label']}`}>OTP</label>
                    <div className={`${styles['input-field']} mt-1`}>
                      <input
                        type="text"
                        className={`${styles['form-input']}  form-control`}
                        value={otp}
                        onChange={(e) => setOtp(e.target.value)}
                        required
                        placeholder="Enter OTP"
                      />
                    </div>
                  </div>
                 
                </div>
                <div className="text-end mt-3">
                  <button type="submit" className={`${styles['update-btn']} leading-6 shadow-sm px-3 py-1.5`}>Verify OTP</button>
                </div>
              </div>
            </form>

            
          </div>
        </div>
      </div>
    </div>
  );
};

export default VerifyOtp;
