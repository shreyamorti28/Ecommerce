import React from 'react';
import Slider from 'react-slick'; // Import Slider component from react-slick
import './RelatedProduct.css';
import data_product from '../Assets/all_products';
import Item from '../Item/Item';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const RelatedProducts = () => {
  // Slider settings
  const settings = {
    infinite: true,  // Enables continuous looping
    speed: 200,  // Transition speed
    slidesToShow: 3, // Number of products to show at once
    slidesToScroll: 1, // Number of slides to scroll at a time
    autoplay: true, // Auto slide
    autoplaySpeed: 1000, // Slide transition delay
    arrows: false, // Disable navigation arrows
    dots: false, // Disable dots (you can enable if you prefer)
    responsive: [
      {
        breakpoint: 768, // For mobile devices
        settings: {
          slidesToShow: 1, // Show 1 slide for small screens
        }
      },
      {
        breakpoint: 1024, // For tablets
        settings: {
          slidesToShow: 2, // Show 2 slides for medium screens
        }
      }
    ]
  };

  return (
    <div className='relatedproducts'>
      <h1>Related Products</h1>
      <hr />
      <div className='relatedproducts-slider'>
        <Slider {...settings}>
          {data_product.map((item) => (
            <Item
              key={item.id}
              id={item.id}
              name={item.name}
              image={item.image}
              new_price={item.new_price}
              old_price={item.old_price}
            />
          ))}
        </Slider>
      </div>
    </div>
  );
};

export default RelatedProducts;
