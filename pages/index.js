import Head from "next/head";
import Footer from "@/components/Footer";
import Header from "@/components/header";

import React, { useState,useEffect } from 'react';
import HomeContent from "@/components/HomeContent";


const Home = () => {
  useEffect(() => {
    document.body.classList.add('custom-body-class');

    return () => {
      document.body.classList.remove('custom-body-class');
    };
  }, []);
  return (
   <>
      <Head>
      <title>Application Maker</title>
      <meta name="description" content="cvmaker.com - CV  Maker"/>
      </Head>

      <Header/>
      <HomeContent/>
      <Footer />
   </>
  );
}
export default Home