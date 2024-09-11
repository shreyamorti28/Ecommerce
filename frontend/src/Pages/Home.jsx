import React from 'react';
import Hero from '../components/Hero/Hero';
import Popular from '../components/Popular/Popular';
import Offers from '../components/Offers/Offers';
import NewCollection from '../components/New_Collection/New_Collection'; // Updated import
import NewsLetter from '../components/NewsLetter/NewsLetter';
import Navbar from '../components/Navbar/Navbar';


const Home = () => {
  return (
    <div>
      <Hero />
      <Navbar/>
      <NewCollection />
      
      <Offers />
      <Popular />
       
      <NewsLetter />
      
    </div>
  );
}

export default Home;
