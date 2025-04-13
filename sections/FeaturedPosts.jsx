import React, { useState, useEffect } from 'react';
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';

import { FeaturedPostCard } from '../components';
import { getFeaturedPosts } from '../services';

// --- Keep your responsive config and Custom Arrow components as they were in the last code ---
const responsive = {
  superLargeDesktop: { breakpoint: { max: 4000, min: 1024 }, items: 5 },
  desktop: { breakpoint: { max: 1024, min: 768 }, items: 3 },
  tablet: { breakpoint: { max: 768, min: 640 }, items: 2 },
  mobile: { breakpoint: { max: 640, min: 0 }, items: 1 },
};

const CustomLeftArrowComponent = ({ onClick }) => (
  <div
    className="absolute left-4 top-1/2 transform -translate-y-1/2 z-10 p-2 cursor-pointer bg-pink-600 rounded-full shadow-lg w-12 h-12 flex justify-center items-center" // Using w-12/h-8 from previous step
    onClick={() => onClick()}
  >
    <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18"/>
    </svg>
  </div>
);

const CustomRightArrowComponent = ({ onClick }) => (
  <div
    className="absolute right-4 top-1/2 transform -translate-y-1/2 z-10 p-2 cursor-pointer bg-pink-600 rounded-full shadow-lg w-12 h-12 flex justify-center items-center" // Using w-12/h-8 from previous step
    onClick={() => onClick()}
  >
    <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3"/>
    </svg>
  </div>
);
// --- End definitions ---


const FeaturedPosts = () => {
  const [featuredPosts, setFeaturedPosts] = useState([]);
  const [dataLoaded, setDataLoaded] = useState(false);

  useEffect(() => {
    console.log('FeaturedPosts: useEffect triggered'); // Log effect trigger
    getFeaturedPosts().then((result) => {
      console.log('FeaturedPosts: Data fetched successfully. Result:', result); // Log fetched data
      setFeaturedPosts(result);
      setDataLoaded(true);
    }).catch(error => {
      console.error('FeaturedPosts: Error fetching data:', error); // Log errors during fetch
      // Optionally set dataLoaded to true even on error, or handle differently
      // setDataLoaded(true); 
    });
  }, []);

  // Log state right before rendering
  console.log('FeaturedPosts: Rendering component. Data Loaded:', dataLoaded, 'Posts Array:', featuredPosts);

  // *** Temporary Test: Check if default arrows render ***
  // If the console logs look okay but arrows still don't appear,
  // try commenting out the custom arrows and uncommenting the line below
  // const showDefaultControls = true; 
  const showDefaultControls = false; // Set to true to test default controls

  return (
    <div className="mb-8 relative">
      <Carousel
        infinite
        customLeftArrow={!showDefaultControls ? <CustomLeftArrowComponent /> : undefined}
        customRightArrow={!showDefaultControls ? <CustomRightArrowComponent /> : undefined}
        responsive={responsive}
        itemClass="px-4"
        showDots={showDefaultControls} // Show dots if testing default controls
      >
        {dataLoaded && featuredPosts && featuredPosts.length > 0 ? ( // Added check for non-empty array
             featuredPosts.map((post, index) => (
              <FeaturedPostCard key={index} post={post} />
            ))
        ) : (
          // Optional: Render a loading message or placeholder if needed
          dataLoaded ? <p>No featured posts available.</p> : <p>Loading posts...</p> 
        )}
      </Carousel>
    </div>
  );
};

export default FeaturedPosts;