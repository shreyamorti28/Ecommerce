import React from 'react'
import Hero from '../components/Hero/Hero'
import Popular from '../components/Popular/Popular'
import Offers from '../components/Offers/Offers'
import New_collection from '../components/New_collection/New_collection'
import NewsLetter from '../components/NewsLetter/NewsLetter'


const Home = () => {
  return (
    <div>
      <Hero />
      <Popular/>
      <Offers/>
      <New_collection/>
      <NewsLetter/>
      
    </div>
  )
}

export default Home