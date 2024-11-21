import React from 'react';
import footer_logo from '../Assets/footer_logo.png';
import instagram from '../Assets/instagram_icon.jpg';
import pinterest from '../Assets/pinterest_icon.png';
import whatsapp from '../Assets/whatsapp_icon.jpg';
import './Footer.css';

const Footer = () => {
  return (
    <div className='footer'>
      <div className='footer_logo'>
        <img src={footer_logo} alt="Shopper Logo"/>
      </div>
      <ul className='footer-links'>
        <li>Company</li>
        <li>Products</li>
        <li>About</li>
        <li>Contact</li>
      </ul>
      <div className='footer-social-icon'>
        <div className='footer-icons-container'>
          <img src={instagram} alt="Instagram"/>
        </div>
        <div className='footer-icons-container'>
          <img src={pinterest} alt="Pinterest"/>
        </div>
        <div className='footer-icons-container'>
          <img src={whatsapp} alt="WhatsApp"/>
        </div>
      </div>

      <hr className="footer-divider" /> {/* Line between icons and copyright */}

      <div className='footer-copyright'>
        <p>Copyright © 2023 - All Rights Reserved.</p>
      </div>
    </div>
  );
}

export default Footer;
