import React, { useEffect, useState } from 'react';
import './Popular.css';

const Popular = () => {
  const [popularProducts, setPopularProducts] = useState([]);

  useEffect(() => {
    fetch('http://localhost:4000/summer-collection')
      .then((response) => response.json())
      .then((data) => {
        console.log('Fetched data:', data); 
        if (data.success && Array.isArray(data.data) && data.data.length > 0) {
          setPopularProducts(data.data);
        } else {
          console.error('Data format is incorrect or empty');
          setPopularProducts([]);
        }
      })
      .catch((error) => {
        console.error('Error fetching products:', error);
        setPopularProducts([]);
      });
  }, []);

  return (
    <div className="popular">
      <h1>Summer Collection</h1>
      <hr />
      <div className="popular-item">
        {popularProducts.length > 0 ? (
          popularProducts.map((item) => (
            <div key={item.id} className="item">
              <div className="image-container">
                <img
                  src={`${item.image}?t=${new Date().getTime()}`}
                  alt={item.name}
                  className="item-image"
                />
              </div>
              <h2>{item.name}</h2>
              <p className="price">
                <span className="new-price">${item.new_price}</span>
                <span className="old-price">${item.old_price}</span>
              </p>
              <p className="description">{item.description}</p> {/* Always show the description */}
            </div>
          ))
        ) : (
          <p>No products available.</p> 
        )}
      </div>
    </div>
  );
};

export default Popular;
