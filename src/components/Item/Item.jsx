import React from 'react';
import './Item.css';

const Item = ({ id, name, image, new_price, old_price }) => {
  return (
    <div className="item">
      <div className="image-container">
        <img src={image} alt={name} className="item-image" />
      </div>
      <h2>{name}</h2>
      <p className="price">
        <span className="new-price">${new_price}</span>
        <span className="old-price">${old_price}</span>
      </p>
    </div>
  );
};

export default Item;
