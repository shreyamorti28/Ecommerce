import React from 'react'
import './Hero.css'
import hero_image from '../Assets/printed_tshirt3.png'
import arrow_icon from '../Assets/Arrow.png'

const Hero = () => {
    return (
        <div className='hero'>
            <div className='hero-left'>
                <h2>Men Collection</h2>
                <div>
                    <p>Elevate your style with timeless elegance.</p>
                </div>
                <div className="hero-latest-btn">
                    <div>Check Out</div>
                    <img src={arrow_icon} alt=""/>

                </div>

            </div>
            <div className='hero-right'>
                <img src={hero_image} alt=""/>

            </div>
        </div>
    )
}

export default Hero