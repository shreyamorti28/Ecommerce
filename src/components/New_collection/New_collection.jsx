import React from 'react';
import new_collection from '../Assets/new_collection';
import Item from '../Item/Item';
import './New_Collection.css'; // Updated CSS import

const NewCollection = () => {
  return (
    <div className='new_collections'>
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

export default NewCollection;
