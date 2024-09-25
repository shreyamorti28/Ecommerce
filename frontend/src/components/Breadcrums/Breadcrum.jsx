import React from 'react';
import './Breadcrum.css';
import arrow_icon from '../Assets/Arrow.png';

const Breadcrum = ({ product }) => {
  return (
    <div className='breadcrum'>
      HOME <img src={arrow_icon} alt="arrow" /> SHOP <img src={arrow_icon} alt="arrow" /> 
      {product && product.category ? product.category : 'Category not available'} 
      <img src={arrow_icon} alt="arrow" /> 
      {product && product.name ? product.name : 'Product not available'}
    </div>
  );
}

export default Breadcrum;
