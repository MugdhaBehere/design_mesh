import React, { useState, useEffect } from 'react';
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';

// Make sure these paths are correct for your project structure
import { FeaturedPostCard } from '../components';
import { getFeaturedPosts } from '../services';

// Responsive configuration for the carousel
const responsive = {
  superLargeDesktop: { breakpoint: { max: 4000, min: 1024 }, items: 5 },
  desktop: { breakpoint: { max: 1024, min: 768 }, items: 3 },
  tablet: { breakpoint: { max: 768, min: 640 }, items: 2 },
  mobile: { breakpoint: { max: 640, min: 0 }, items: 1 },
};

// Restored Custom Arrow Components (w-12 / h-8 size)
const CustomLeftArrowComponent = ({ onClick }) => (
  <div
    // Apply all necessary Tailwind classes for styling and positioning
    // Using w-12 h-12 container and p-2 padding
    className="absolute left-4 top-1/2 transform -translate-y-1/2 z-10 p-2 cursor-pointer bg-pink-600 rounded-full shadow-lg w-12 h-12 flex justify-center items-center"
    onClick={onClick} // Ensure onClick is passed to the clickable element
  >
    <svg
      xmlns="http://www.w3.org/2000/svg"
      // Apply size (h-8 w-8) and color classes to the SVG
      className="h-8 w-8 text-white"
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
    // Apply all necessary Tailwind classes for styling and positioning
    // Using w-12 h-12 container and p-2 padding
    className="absolute right-4 top-1/2 transform -translate-y-1/2 z-10 p-2 cursor-pointer bg-pink-600 rounded-full shadow-lg w-12 h-12 flex justify-center items-center"
    onClick={onClick} // Ensure onClick is passed to the clickable element
  >
    <svg
      xmlns="http://www.w3.org/2000/svg"
      // Apply size (h-8 w-8) and color classes to the SVG
      className="h-8 w-8 text-white"
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
// --- End Custom Arrow Components ---

// Main FeaturedPosts Component
const FeaturedPosts = () => {
  // State hooks
  const [featuredPosts, setFeaturedPosts] = useState([]);
  const [dataLoaded, setDataLoaded] = useState(false);

  // Effect hook for data fetching
  useEffect(() => {
    // console.log('FeaturedPosts: useEffect triggered'); // Keep logs if needed
    getFeaturedPosts().then((result) => {
      // console.log('FeaturedPosts: Data fetched successfully. Result:', result);
      setFeaturedPosts(Array.isArray(result) ? result : []);
      setDataLoaded(true);
    }).catch(error => {
      console.error('FeaturedPosts: Error fetching data:', error);
      setFeaturedPosts([]);
      setDataLoaded(true);
    });
  }, []);

  // Keep this commented out to prevent potential build errors
  // console.log('FeaturedPosts: Rendering component. Data Loaded:', dataLoaded, 'Posts Array:', featuredPosts);

  // Use custom arrows
  const showDefaultControls = false;

  return (
    <div className="mb-8 relative">
      <Carousel
        infinite
        // Pass the RESTORED custom arrow components
        customLeftArrow={!showDefaultControls ? <CustomLeftArrowComponent /> : undefined}
        customRightArrow={!showDefaultControls ? <CustomRightArrowComponent /> : undefined}
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