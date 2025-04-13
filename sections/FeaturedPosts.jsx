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

// Simple Custom Arrow Components for Testing
const CustomLeftArrowComponent = ({ onClick }) => {
  // Log to ensure this component is attempted to be rendered by the library
  console.log("Rendering Simple CustomLeftArrowComponent");
  return (
    <button
      onClick={onClick}
      // Basic styling to make it visible and positioned
      style={{
        position: 'absolute',
        left: '10px',             // Position from left
        top: '50%',               // Roughly vertical center
        transform: 'translateY(-50%)', // More precise vertical center
        zIndex: 10,               // Ensure it's above other items
        background: 'red',      // Make it very visible
        color: 'white',
        padding: '10px',
        border: 'none',
        borderRadius: '5px',
        cursor: 'pointer'
      }}
    >
      LEFT TEST
    </button>
  );
};

const CustomRightArrowComponent = ({ onClick }) => {
  // Log to ensure this component is attempted to be rendered by the library
  console.log("Rendering Simple CustomRightArrowComponent");
  return (
    <button
      onClick={onClick}
      // Basic styling to make it visible and positioned
      style={{
        position: 'absolute',
        right: '10px',            // Position from right
        top: '50%',               // Roughly vertical center
        transform: 'translateY(-50%)', // More precise vertical center
        zIndex: 10,               // Ensure it's above other items
        background: 'blue',     // Make it very visible
        color: 'white',
        padding: '10px',
        border: 'none',
        borderRadius: '5px',
        cursor: 'pointer'
      }}
    >
      RIGHT TEST
    </button>
  );
};

// Main FeaturedPosts Component
const FeaturedPosts = () => {
  // State hooks MUST be called inside the component body
  const [featuredPosts, setFeaturedPosts] = useState([]);
  const [dataLoaded, setDataLoaded] = useState(false);

  // Effect hook MUST be called inside the component body
  useEffect(() => {
    console.log('FeaturedPosts: useEffect triggered');
    getFeaturedPosts().then((result) => {
      console.log('FeaturedPosts: Data fetched successfully. Result:', result);
      // Ensure result is always an array, even if API returns null/undefined
      setFeaturedPosts(Array.isArray(result) ? result : []);
      setDataLoaded(true);
    }).catch(error => {
      console.error('FeaturedPosts: Error fetching data:', error);
      setFeaturedPosts([]); // Set empty array on error
      setDataLoaded(true); // Still mark as loaded to potentially show "No posts" message
    });
  }, []); // Empty dependency array means this runs once on mount

  // This log caused build errors if placed before useState, keep commented for now
  // console.log('FeaturedPosts: Rendering component. Data Loaded:', dataLoaded, 'Posts Array:', featuredPosts);

  // Variable to easily switch between custom/default arrows if needed later
  const showDefaultControls = false;

  return (
    <div className="mb-8 relative"> {/* Ensure this div has relative positioning */}
      <Carousel
        infinite // Enable infinite looping
        // Pass the custom arrow components if not showing default
        customLeftArrow={!showDefaultControls ? <CustomLeftArrowComponent /> : undefined}
        customRightArrow={!showDefaultControls ? <CustomRightArrowComponent /> : undefined}
        responsive={responsive} // Apply responsive settings
        itemClass="px-4" // Add padding around each carousel item
      >
        {/* Conditionally render posts based on dataLoaded and if posts exist */}
        {dataLoaded && featuredPosts && featuredPosts.length > 0 ? (
             featuredPosts.map((post, index) => (
              // Ensure FeaturedPostCard component is correctly imported and used
              <FeaturedPostCard key={index} post={post} />
            ))
        ) : (
          // Display a message while loading or if no posts are available
          // Avoids layout shifts or errors if featuredPosts is initially null/undefined
          <div style={{ textAlign: 'center', padding: '20px', color: '#888' }}> {/* Basic styling for message */}
             {dataLoaded ? 'No featured posts available.' : 'Loading posts...'}
          </div>
        )}
      </Carousel>
    </div>
  );
};

export default FeaturedPosts;