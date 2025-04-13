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

const CustomLeftArrowComponent = ({ onClick }) => {
  console.log("Rendering Basic Styled Div Left Arrow"); // New log message
  return (
    <div
      onClick={onClick}
      style={{
        // Positioning (same as Tailwind classes)
        position: 'absolute',
        left: '16px', // left-4
        top: '50%',
        transform: 'translateY(-50%)',
        zIndex: 10,
        cursor: 'pointer',

        // Basic Appearance (mimicking Tailwind)
        width: '48px',       // w-12
        height: '48px',      // h-12
        backgroundColor: '#DB2777', // bg-pink-600
        borderRadius: '50%',   // rounded-full
        boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)' // shadow-lg approx.
      }}
    >
      {/* No content inside yet */}
    </div>
  );
};

const CustomRightArrowComponent = ({ onClick }) => {
  console.log("Rendering Basic Styled Div Right Arrow"); // New log message
  return (
    <div
      onClick={onClick}
      style={{
        // Positioning (same as Tailwind classes)
        position: 'absolute',
        right: '16px', // right-4
        top: '50%',
        transform: 'translateY(-50%)',
        zIndex: 10,
        cursor: 'pointer',

        // Basic Appearance (mimicking Tailwind)
        width: '48px',       // w-12
        height: '48px',      // h-12
        backgroundColor: '#DB2777', // bg-pink-600
        borderRadius: '50%',   // rounded-full
        boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)' // shadow-lg approx.
      }}
    >
      {/* No content inside yet */}
    </div>
  );
};
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