import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import router from 'next/router';
import styles from '../styles/login.module.css';

const Sidebar = () => {
    <div className="bg-white shadow-md w-64 p-5 h-full fixed">
    <div className="mb-6">
      <a href="/">
      <img src="/images/logo.png" alt="Logo" className="h-12" />
      </a>
      <h1 className={`${styles['sidebar-h1']} mt-10`}>Invite + recommend friends</h1>
      <div className={`${styles['progress-circle']} relative`}>
        <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
          <circle strokeWidth="8" cx="50" cy="50" r="40" fill="none"></circle>
          <circle
            className="text-gray-900 progress-ring__circle stroke-current"
            strokeWidth="8"
            strokeLinecap="round"
            cx="50"
            cy="50"
            r="40"
            fill="transparent"
            strokeDasharray="251.2"
            strokeDashoffset="calc(251.2px - (251.2px * 70) / 100)"
          ></circle>
        </svg>
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="text-xl font-bold mb-10 text-gray-700 progress-text">70%</span>
        </div>
        <p className={`${styles['progress-p']} font-bold text-gray-700 text-center`}>Applicant folder</p>
      </div>
      <button className={`${styles['btn-tip']}`}>Tipps</button>
    </div>
  </div>
};

export default Sidebar;