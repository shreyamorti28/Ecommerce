import React from 'react';
import { useNavigate } from 'react-router-dom';
import exclusive_image from '../Assets/exclusive.png';
import './Offers.css';

const Offers = () => {
    const navigate = useNavigate(); // Use the navigate hook

    const handleRedirect = () => {
        navigate('/product/29'); // Redirect to the specific product page
    };

    return (
        <div className='offers'>
            <div className="offers-left">
                <h1>Exclusive</h1>
                <h1>Offers For You</h1>
                <p>ONLY ON BESTSELLER PRODUCTS</p>
                <button onClick={handleRedirect}>Check Now</button> {/* Add onClick handler */}
            </div>
            <div className="offers-right">
                <img src={exclusive_image} alt="Exclusive Offers"/>
            </div>
        </div>
    );
};

export default Offers;
