import React from 'react'
import exclusive_image from '../Assets/exclusive.png'
import './Offers.css'


const Offers = () => {
    return (
        <div className='offers'>
            <div className="offers-left">
                <h1>Exclusive</h1>
                <h1>Offers For You</h1>
                <p>ONLY ON BESTSELLER PRODUCTS</p>
                <button>Check Now</button>
            </div>
            <div className="offers-right">
                <img src={exclusive_image} alt="Exclusive Offers"/>
            </div>
        </div>
    )
}

export default Offers
