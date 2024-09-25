import React, { useContext } from 'react';
import './ProductDisplay.css';
import { ShopContext } from '../../context/ShopContext';

const ProductDisplay = (props) => {
  const { product } = props;
  const { addToCart } = useContext(ShopContext);

  if (!product) {
    return <p>Loading product details...</p>;
  }

  return (
    <div className='productdisplay'>
      <div className='productdisplay-left'>
        <div className='productdisplay-img-list'>
          <img src={product.image || 'default-image.png'} alt={product.name || 'Product'} />
        </div>
        <div className='productdisplay-img'>
          <img className='productdisplay-main-img' src={product.image || 'default-image.png'} alt={product.name || 'Product'} />
        </div>
      </div>
      <div className='productdisplay-right'>
        <h1>{product.name}</h1>
        <div className='productdisplay-right-prices'>
          <div className='productdisplay-right-price-old'>${product.old_price}</div>
          <div className='productdisplay-right-price-new'>${product.new_price}</div>
        </div>
        <div className='productdisplay-right-description'>
          Crafted from soft, breathable cotton, this classic crewneck T-shirt offers a perfect blend of comfort and style. With a relaxed fit and durable stitching, it's designed for everyday wear. Whether layered under a jacket or worn solo, this versatile tee is a wardrobe essential that pairs effortlessly with jeans, shorts, or joggers. Available in multiple colors to suit any mood or occasion.
        </div>
        <button onClick={() => addToCart(product.id)}>ADD TO CART</button>
        <p className='productdisplay-right-category'><span>Category:</span> T-shirt</p>
        <p className='productdisplay-right-category'><span>Category:</span> Modern, latest</p>
      </div>
    </div>
  );
};

export default ProductDisplay;
