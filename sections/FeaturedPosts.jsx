import React, { useState, useEffect } from 'react';
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';

// Make sure these paths are correct
import { FeaturedPostCard } from '../components';
import { getFeaturedPosts } from '../services';

// Responsive configuration
const responsive = {
  superLargeDesktop: { breakpoint: { max: 4000, min: 1024 }, items: 5 },
  desktop: { breakpoint: { max: 1024, min: 768 }, items: 3 },
  tablet: { breakpoint: { max: 768, min: 640 }, items: 2 },
  mobile: { breakpoint: { max: 640, min: 0 }, items: 1 },
};

// Arrow Components (Corrected Structure and Styling)
const CustomLeftArrowComponent = ({ onClick }) => (
  <div
    // Added: w-10 h-10, p-2, flex, justify-center, items-center, top-1/2, transform, -translate-y-1/2
    // Using left-0 as requested in previous steps
    className="absolute left-0 top-1/2 transform -translate-y-1/2 z-10 p-2 cursor-pointer bg-pink-600 rounded-full shadow-lg w-10 h-10 flex justify-center items-center"
    onClick={onClick} // onClick passed correctly
  >
    <svg
      xmlns="http://www.w3.org/2000/svg"
      // Using h-6 w-6 as per your last code attempt. Removed w-full.
      className="h-6 w-6 text-white"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
        d="M10 19l-7-7m0 0l7-7m-7 7h18"
      />
    </svg>
  </div>
);

const CustomRightArrowComponent = ({ onClick }) => (
  <div
    // Added: w-10 h-10, p-2, flex, justify-center, items-center, top-1/2, transform, -translate-y-1/2
    // Using right-0 as requested in previous steps
    className="absolute right-0 top-1/2 transform -translate-y-1/2 z-10 p-2 cursor-pointer bg-pink-600 rounded-full shadow-lg w-10 h-10 flex justify-center items-center"
    onClick={onClick} // onClick passed correctly
  >
    <svg
      xmlns="http://www.w3.org/2000/svg"
       // Using h-6 w-6 as per your last code attempt. Removed w-full.
       className="h-6 w-6 text-white"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
        d="M14 5l7 7m0 0l-7 7m7-7H3"
      />
    </svg>
  </div>
);
// --- End Arrow Components ---

const FeaturedPosts = () => {
  // State and Effect hooks
  const [featuredPosts, setFeaturedPosts] = useState([]);
  const [dataLoaded, setDataLoaded] = useState(false);

  useEffect(() => {
    getFeaturedPosts().then((result) => {
      setFeaturedPosts(Array.isArray(result) ? result : []);
      setDataLoaded(true);
    }).catch(error => {
      console.error('FeaturedPosts: Error fetching data:', error);
      setFeaturedPosts([]);
      setDataLoaded(true);
    });
  }, []);

  return (
    // Added `relative` class to the parent div
    <div className="mb-8 relative">
       <Carousel
        infinite
        // SWAP the components passed to the props
        customLeftArrow={<CustomRightArrowComponent />} // Right component passed to Left prop
        customRightArrow={<CustomLeftArrowComponent />} // Left component passed to Right prop
        responsive={responsive}
        itemClass="px-4"
      >
        {/* Conditional rendering of posts */}
        {dataLoaded && featuredPosts && featuredPosts.length > 0 ? (
             featuredPosts.map((post, index) => (
              <FeaturedPostCard key={index} post={post} />
            ))
        ) : (
           <div style={{ textAlign: 'center', padding: '20px', color: '#888' }}>
             {dataLoaded ? 'No featured posts available.' : 'Loading posts...'}
           </div>
        )}
      </Carousel>
    </div>
  );
};

export default FeaturedPosts;