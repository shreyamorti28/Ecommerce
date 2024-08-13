import React from 'react';
import new_collection from '../Assets/new_collection';
import Item from '../Item/Item';
import './New_collection.css'; // Assuming you have some styles for the new collection

const New_collection = () => {
  return (
    <div className='new_collections'>
      <h1>New Collection</h1>
      <div className="collections">
        {new_collection.map((item, i) => (
          <Item 
            key={i} 
            id={item.id} 
            name={item.name} 
            image={item.image} 
            new_price={item.new_price} 
            old_price={item.old_price} 
          />
        ))}
      </div>
    </div>
  );
}

export default New_collection;
