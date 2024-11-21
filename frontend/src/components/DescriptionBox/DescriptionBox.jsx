import React, { useState } from 'react';
import './DescriptionBox.css';

const DescriptionBox = () => {
  const [activeTab, setActiveTab] = useState('description'); // Manage tab state
  const [review, setReview] = useState(''); // Manage review input
  const [rating, setRating] = useState(0);  // Manage rating input
  const [hover, setHover] = useState(0);    // Manage hover state for stars
  const [reviewsList, setReviewsList] = useState([]); // List of reviews

  // Handle form submission for review
  const handleReviewSubmit = (e) => {
    e.preventDefault();
    if (review && rating) {
      const newReview = { reviewText: review, rating: rating };
      setReviewsList([...reviewsList, newReview]); // Add review to list
      setReview(''); // Reset review input
      setRating(0);  // Reset rating input
    }
  };

  return (
    <div className='descriptionbox'>
      <div className='descriptionbox-navigator'>
        <div 
          className={`descriptionbox-nav-box ${activeTab === 'description' ? '' : 'fade'}`}
          onClick={() => setActiveTab('description')}
        >
          Description
        </div>
        <div 
          className={`descriptionbox-nav-box ${activeTab === 'reviews' ? '' : 'fade'}`} 
          onClick={() => setActiveTab('reviews')}
        >
          Reviews
        </div>
      </div>

      {activeTab === 'description' && (
        <div className='descriptionbox-description'>
          <p>Discover an extensive collection of products across various categories, including fashion, electronics, home essentials, beauty, and more. Our user-friendly interface, secure payment options, and fast delivery services ensure a seamless shopping experience. Whether you're looking for the latest trends, top brands, or everyday essentials, [Website Name] offers unbeatable prices and exclusive deals. Enjoy personalized recommendations, customer reviews, and 24/7 support to make your shopping journey easy and enjoyable.</p>
          <p>Our intuitive design makes finding what you need a breeze, and our secure checkout process gives you peace of mind with every purchase. With regular sales, new arrivals, and personalized recommendations, there's always something exciting waiting for you. Experience convenience like never before and let us bring the best deals right to your door.</p>
        </div>
      )}

      {activeTab === 'reviews' && (
        <div className='descriptionbox-reviews'>
          <h3>Customer Reviews</h3>
          {/* List of reviews */}
          {reviewsList.length > 0 ? (
            <div className='reviews-list'>
              {reviewsList.map((rev, index) => (
                <div key={index} className='review'>
                  <p><strong>Rating:</strong> {rev.rating}/5</p>
                  <p>{rev.reviewText}</p>
                </div>
              ))}
            </div>
          ) : (
            <p>No reviews yet. Be the first to write a review!</p>
          )}

          {/* Review Form */}
          <form onSubmit={handleReviewSubmit} className='review-form'>
            <div className='review-input'>
              <textarea
                value={review}
                onChange={(e) => setReview(e.target.value)}
                placeholder='Write your review here'
                required
              ></textarea>
            </div>
            <div className='rating-input'>
              <label htmlFor='rating'>Rating: </label>
              <div className='stars'>
                {[...Array(5)].map((star, index) => {
                  const starRating = index + 1;
                  return (
                    <span
                      key={starRating}
                      className={starRating <= (hover || rating) ? 'star filled' : 'star'}
                      onClick={() => setRating(starRating)}
                      onMouseEnter={() => setHover(starRating)}
                      onMouseLeave={() => setHover(rating)}
                    >
                      ★
                    </span>
                  );
                })}
              </div>
            </div>
            <button type='submit'>Submit Review</button>
          </form>
        </div>
      )}
    </div>
  );
};

export default DescriptionBox;
