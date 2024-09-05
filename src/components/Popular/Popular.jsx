import React, { useState } from 'react';
import './Popular.css';
import data_product from '../Assets/data';

const Popular = () => {
  const [hoveredItemId, setHoveredItemId] = useState(null);

  const handleMouseEnter = (id) => {
    setHoveredItemId(id);
  };

  const handleMouseLeave = () => {
    setHoveredItemId(null);
  };

  return (
    <div className='popular'>
      <h1>Summer Collection</h1>
      <hr />
      <div className="popular-item">
        {data_product.map((item) => (
          <div
            key={item.id}
            className="item"
            onMouseEnter={() => handleMouseEnter(item.id)}
            onMouseLeave={handleMouseLeave}
          >
            <div className="image-container">
            <img
                  src={`${hoveredItemId === item.id ? item.hoverImage : item.image}?t=${new Date().getTime()}`}
                  alt={item.name}
                  className="item-image"
            />
            </div>
            <h2>{item.name}</h2>
            <p className="price">
              <span className="new-price">${item.new_price}</span>
              <span className="old-price">${item.old_price}</span>
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Popular;
