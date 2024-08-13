import React from 'react'
import Hero from '../Hero/Hero'
import Popular from '../Popular/Popular'
import Offers from '../Offers/Offers'
import New_collection from '../New_collection/New_collection'
import NewsLetter from '../NewsLetter/NewsLetter'


const Home = () => {
  return (
    <div>
      <Hero/>
      <Popular/>
      <Offers/>
      <New_collection/>
    </div>
  )
}

export default Home