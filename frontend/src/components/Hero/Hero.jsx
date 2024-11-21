import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
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
        productId: 42,
    },
    {
        image: hero_image2,
        heading: "Summer Sale",
        description: "Step up in style with our elegant shoes.",
        buttonText: "Shop Now",
        productId: 43,
    },
    {
        image: hero_image3,
        heading: "New Arrivals",
        description: "Sleek, comfortable jeans with a touch of elegance.",
        buttonText: "See More",
        productId: 41,
    }
];

const Hero = () => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const navigate = useNavigate();

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentIndex((prevIndex) => (prevIndex + 1) % slides.length);
        }, 3000); // Change slide every 3 seconds

        return () => clearInterval(interval);
    }, []);

    const { image, heading, description, buttonText, productId } = slides[currentIndex];

    // Handle button click to navigate to the product page
    const handleButtonClick = () => {
        navigate(`/product/${productId}`);
    };

    return (
        <div className='hero' style={{ backgroundImage: `url(${image})` }}>
            <div className='hero-content'>
                <h2>{heading}</h2>
                <p>{description}</p>
                <button className="hero-button" onClick={handleButtonClick}>{buttonText}</button>
            </div>
        </div>
    );
};

export default Hero;
