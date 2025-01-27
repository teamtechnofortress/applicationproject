import Head from "next/head";
import Footer from "@/components/Footer";
import Header from "@/components/header";

import React, { useState } from 'react';
import HomeContent from "@/components/HomeContent";






const Home = () => {
  return (
   <>
      <Head>
      <title>CV Maker</title>
      <meta name="description" content="cvmaker.com - CV  Maker"/>
      </Head>

      <Header/>
      <HomeContent/>
      <Footer />
   </>
  );
}
export default Home