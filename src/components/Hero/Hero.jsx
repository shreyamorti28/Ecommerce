import React, { useState, useEffect } from 'react';
import './Hero.css';
import hero_image1 from '../Assets/shirt.jpg';
import hero_image2 from '../Assets/dark_blue_jeans.png';
import hero_image3 from '../Assets/shoes.jpg';

const slides = [
    {
        image: hero_image1,
        heading: "Shirt Collection",
        description: "Stylish comfort in an elegant T-shirt.",
        buttonText: "Explore Now",
    },
    {
        image: hero_image2,
        heading: "Summer Sale",
        description: "Step up in style with our elegant shoes.",
        buttonText: "Shop Now",
    },
    {
        image: hero_image3,
        heading: "New Arrivals",
        description: "Sleek, comfortable jeans with a touch of elegance.",
        buttonText: "See More",
    }
];

const Hero = () => {
    const [currentIndex, setCurrentIndex] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentIndex((prevIndex) => (prevIndex + 1) % slides.length);
        }, 3000); // Change slide every 3 seconds

        return () => clearInterval(interval);
    }, []);

    const { image, heading, description, buttonText } = slides[currentIndex];

    return (
        <div className='hero' style={{ backgroundImage: `url(${image})` }}>
            <div className='hero-content'>
                <h2>{heading}</h2>
                <p>{description}</p>
                <div className="hero-latest-btn">
                    <div>{buttonText}</div>
                </div>
            </div>
        </div>
    );
};

export default Hero;
