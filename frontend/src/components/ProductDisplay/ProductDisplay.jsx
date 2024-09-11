import React, { useContext } from 'react'
import './ProductDisplay.css'
import star_icon from "../Assets/star.png"
import star_dull_icon from "../Assets/start_dull.png"
import { ShopContext } from '../../context/ShopContext'
const ProductDisplay = (props) => {
    const {product}=props;
    const {addToCart}=useContext(ShopContext);
  return (
    <div className='productdisplay'>
        <div className='productdisplay-left'>
            <div className='productdisplay-img-list'>
                <img src={product.image} alt=""/>
            </div>
            <div className='productdisplay-img'>
                <img className='productdisplay-main-img' src={product.image} alt=""/>
            </div>

        </div>
        <div className='productdisplay-right'>
            <h1>{product.name}</h1>
            <div className='productdisplay-right-star'>
               <img src={star_icon} alt=""/>                    
               <img src={star_icon} alt=""/>            
               <img src={star_icon} alt=""/>            
               <img src={star_icon} alt=""/>            
               <img src={star_dull_icon} alt=""/>    
               <p>(122)</p>        
            </div>
            <div className='productdisplay-right-prices'>
                <div className='productdisplay-right-price-old'>${product.old_price}</div>
                <div className='productdisplay-right-price-new'>${product.new_price}</div>

            </div>
            <div className='productdisplay-right-description'>
            Crafted from soft, breathable cotton, this classic crewneck T-shirt offers a perfect blend of comfort and style. With a relaxed fit and durable stitching, it's designed for everyday wear. Whether layered under a jacket or worn solo, this versatile tee is a wardrobe essential that pairs effortlessly with jeans, shorts, or joggers. Available in multiple colors to suit any mood or occasion.

            </div>
            <div className='productdisplay-right-size'>
                <h1>Select Size</h1>
                <div className='productdisplay-right-size'>
                    <div>S</div>
                    <div>M</div>
                    <div>L</div>
                    <div>XL</div>
                    <div>XXL</div>
                
                </div>

            </div>
            <button onClick={()=>{addToCart(product.id)}}>ADD TO CART</button>
            <p className='productdisplay-right-category'><span>Category:</span>T-shirt</p>
            <p className='productdisplay-right-category'><span>Category:</span>Modern, latest</p>
        </div>

    </div>
  )
}

export default ProductDisplay