import React, { useContext, useState, useEffect } from 'react';
import './CSS/ShopCategory.css';
import { ShopContext } from '../context/ShopContext';
import Item from '../components/Item/Item';

const ShopCategory = (props) => {
  const { all_products } = useContext(ShopContext);
  const [loading, setLoading] = useState(true);

  // Simulate fetching delay (useful if data comes from context asynchronously)
  useEffect(() => {
    if (all_products.length > 0) {
      setLoading(false);
    }
  }, [all_products]);

  return (
    <div className="shop-category">
      {/* Category Banner */}
      <img className="banner" src={props.banner} alt={`${props.category} banner`} />
      
      {loading ? (
        // Loading Message
        <div className="loading-message">
          <p className="loading-text">Please wait while items are being fetched...</p>
        </div>
      ) : (
        // Products Section
        <div className="shopcategory-products">
          {all_products.map((item, i) => {
            if (props.category === item.category) {
              return (
                <Item
                  key={i}
                  id={item.id}
                  name={item.name}
                  image={item.image}
                  new_price={item.new_price}
                  old_price={item.old_price}
                />
              );
            }
            return null;
          })}
        </div>
      )}
    </div>
  );
};

export default ShopCategory;
