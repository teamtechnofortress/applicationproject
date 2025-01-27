import React from 'react';
// import { UserProvider } from '../contexts/UserContext'; // Adjust the path as necessary
import '../styles/globals.css';

function MyApp({ Component, pageProps }) {
  return (
    <Component {...pageProps} />
  );
}

export default MyApp;
