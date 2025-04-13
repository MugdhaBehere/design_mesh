import React, { useState, useEffect } from 'react';
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';

import { FeaturedPostCard } from '../components';
import { getFeaturedPosts } from '../services';

const responsive = {
  superLargeDesktop: { breakpoint: { max: 4000, min: 1024 }, items: 5 },
  desktop: { breakpoint: { max: 1024, min: 768 }, items: 3 },
  tablet: { breakpoint: { max: 768, min: 640 }, items: 2 },
  mobile: { breakpoint: { max: 640, min: 0 }, items: 1 },
};

// Arrow Components (Using w-12 / h-8 Size Again)
const CustomLeftArrowComponent = ({ onClick }) => (
  <div
    // Reverted to w-12 h-12 container and p-2 padding
    className="absolute left-0 top-1/2 transform -translate-y-1/2 z-10 p-2 cursor-pointer bg-pink-600 rounded-full shadow-lg w-12 h-12 flex justify-center items-center"
    onClick={onClick}
  >
    <svg
      xmlns="http://www.w3.org/2000/svg"
      // Reverted to h-8 w-8 SVG size
      className="h-8 w-8 text-white"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
    >
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
    </svg>
  </div>
);

const CustomRightArrowComponent = ({ onClick }) => (
  <div
    // Reverted to w-12 h-12 container and p-2 padding
    className="absolute right-0 top-1/2 transform -translate-y-1/2 z-10 p-2 cursor-pointer bg-pink-600 rounded-full shadow-lg w-12 h-12 flex justify-center items-center"
    onClick={onClick}
  >
    <svg
      xmlns="http://www.w3.org/2000/svg"
      // Reverted to h-8 w-8 SVG size
      className="h-8 w-8 text-white"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
    >
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
    </svg>
  </div>
);
// --- End Arrow Components ---

const FeaturedPosts = () => {
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

  // const showDefaultControls = false; // Not needed if passing custom arrows

  return (
    <div className="mb-8 relative">
      <Carousel
        infinite
        // Arrows passed normally
        customLeftArrow={<CustomLeftArrowComponent />}
        customRightArrow={<CustomRightArrowComponent />}
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