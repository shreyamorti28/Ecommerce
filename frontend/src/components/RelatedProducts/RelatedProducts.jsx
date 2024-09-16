import React, { useEffect, useState } from 'react';
import Slider from 'react-slick'; // Import Slider component from react-slick
import './RelatedProduct.css';
import Item from '../Item/Item';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const RelatedProducts = () => {
  const [products, setProducts] = useState([]); // State to hold the products

  // Fetch related products from the backend
  useEffect(() => {
    fetch('http://localhost:4000/relatedproducts')
      .then((response) => response.json())
      .then((data) => {
        if (data.success) {
          setProducts(data.data); // Set the fetched products to the state
        } else {
          console.error("Failed to fetch related products");
        }
      })
      .catch((error) => {
        console.error("Error fetching related products:", error);
      });
  }, []); // Empty dependency array to run this effect only once on mount

  // Slider settings
  const settings = {
    infinite: true,  // Enables continuous looping
    speed: 200,  // Transition speed
    slidesToShow: 3, // Number of products to show at once
    slidesToScroll: 1, // Number of slides to scroll at a time
    autoplay: true, // Auto slide
    autoplaySpeed: 500, // Slide transition delay
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
          {products.length > 0 ? (
            products.map((item) => (
              <Item
                key={item.id}
                id={item.id}
                name={item.name}
                image={item.image}
                new_price={item.new_price}
                old_price={item.old_price}
              />
            ))
          ) : (
            <p>Loading related products...</p>
          )}
        </Slider>
      </div>
    </div>
  );
};

export default RelatedProducts;
