import React from 'react'
import './DescriptionBox.css'

const DescriptionBox = () => {
  return (
    <div className='descriptionbox'>
        <div className='descriptionbox-navigator'>
            <div className='descriptionbox-nav-box'>Description</div>
            <div className='descriptionbox-nav-box fade'>Reviews(122)</div>

        </div>
        <div className='descriptionbox-description'>
            <p>Discover an extensive collection of products across various categories, including fashion, electronics, home essentials, beauty, and more. Our user-friendly interface, secure payment options, and fast delivery services ensure a seamless shopping experience. Whether you're looking for the latest trends, top brands, or everyday essentials, [Website Name] offers unbeatable prices and exclusive deals. Enjoy personalized recommendations, customer reviews, and 24/7 support to make your shopping journey easy and enjoyable.</p>
            <p>Our intuitive design makes finding what you need a breeze, and our secure checkout process gives you peace of mind with every purchase. With regular sales, new arrivals, and personalized recommendations, there's always something exciting waiting for you. Experience convenience like never before and let us bring the best deals right to your door.</p>
        </div>


    </div>
  )
}

export default DescriptionBox