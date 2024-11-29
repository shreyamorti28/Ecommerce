import React, { useEffect, useState, useRef } from 'react';
import Item from '../Item/Item';
import './New_Collection.css';

const NewCollection = () => {
  const [new_collection, setNew_collection] = useState([]);
  const [loading, setLoading] = useState(true); // Loading state
  const sliderRef = useRef(null);

  useEffect(() => {
    // Fetch the items from the API
    fetch(`https://ecommerce-tc7k.onrender.com/newcollections`)
      .then((response) => response.json())
      .then((data) => {
        setNew_collection(data);
        setLoading(false); // Stop loading when data is fetched
      });
  }, []);

  useEffect(() => {
    const slider = sliderRef.current;
    let offset = 0;

    const startScroll = () => {
      offset -= 1; // Move 1px left
      slider.style.transform = `translateX(${offset}px)`;
      slider.style.transition = 'transform 0.01s linear';

      // Reset the position for seamless scrolling
      if (Math.abs(offset) >= slider.offsetWidth / 2) {
        offset = 0;
        slider.style.transition = 'none'; // Remove transition for smooth reset
        slider.style.transform = `translateX(0px)`;
      }

      requestAnimationFrame(startScroll);
    };

    if (new_collection.length) {
      startScroll();
    }

    return () => {
      cancelAnimationFrame(startScroll);
    };
  }, [new_collection]);

  // Duplicate items for seamless looping
  const items = [...new_collection, ...new_collection];

  return (
    <div className="new_collections">
      <h1>New Collections</h1>
      {loading ? (
        <div className="loading-message">
          <p className="loading-text">Please wait to see beautiful items...</p>
        </div>
      ) : (
        <div className="slider">
          <div className="slider-wrapper" ref={sliderRef}>
            {items.map((item, i) => (
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
        </div>
      )}
    </div>
  );
};

export default NewCollection;
