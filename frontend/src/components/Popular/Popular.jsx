import React, { useEffect, useState } from 'react';
import './Popular.css';
import Item from '../Item/Item';

const Popular = () => {
  const [popularProducts, setPopularProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`https://ecommerce-tc7k.onrender.com/summer-collection`)
      .then((response) => response.json())
      .then((data) => {
        console.log('Fetched data:', data);
        if (data.success && Array.isArray(data.data) && data.data.length > 0) {
          setPopularProducts(data.data);
        } else {
          console.error('Data format is incorrect or empty');
          setPopularProducts([]);
        }
        setLoading(false); // Stop loading after data is fetched
      })
      .catch((error) => {
        console.error('Error fetching products:', error);
        setPopularProducts([]);
        setLoading(false); // Stop loading even on error
      });
  }, []);

  return (
    <div className="popular">
      <h1>Summer Collection</h1>
      <hr />
      {loading ? (
        // Loading Message
        <div className="loading-message">
          <p className="loading-text">Fetching items... Please wait!</p>
        </div>
      ) : (
        <div className="popular-item">
          {popularProducts.map((item, i) => (
            <div className="new_collection-item" key={i}>
              <Item
                id={item.id}
                name={item.name}
                image={item.image}
                new_price={item.new_price}
                old_price={item.old_price}
              />
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Popular;
