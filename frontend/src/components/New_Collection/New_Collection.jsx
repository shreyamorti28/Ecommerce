import React, { useEffect, useState } from 'react';
import Item from '../Item/Item';
import './New_Collection.css';

const NewCollection = () => {
  const [new_collection, setNew_collection] = useState([]);

  useEffect(() => {
    fetch('http://localhost:4000/newcollections')
      .then((response) => response.json())
      .then((data) => setNew_collection(data));
  }, []);

  // Duplicate items for seamless looping
  const items = [...new_collection, ...new_collection];

  return (
    <div className="new_collections">
      <h1>New Collections</h1>
      <div className="slider">
        <div className="slider-wrapper">
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
    </div>
  );
};

export default NewCollection;
