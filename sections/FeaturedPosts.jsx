import React, { useState, useEffect } from 'react';
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';

import { FeaturedPostCard } from '../components';
import { getFeaturedPosts } from '../services';

const responsive = {
  superLargeDesktop: {
    breakpoint: { max: 4000, min: 1024 },
    items: 5,
  },
  desktop: {
    breakpoint: { max: 1024, min: 768 },
    items: 3,
  },
  tablet: {
    breakpoint: { max: 768, min: 640 },
    items: 2,
  },
  mobile: {
    breakpoint: { max: 640, min: 0 },
    items: 1,
  },
};

const FeaturedPosts = () => {
  const [featuredPosts, setFeaturedPosts] = useState([]);
  const [dataLoaded, setDataLoaded] = useState(false);

  useEffect(() => {
    getFeaturedPosts().then((result) => {
      setFeaturedPosts(result);
      setDataLoaded(true);
    });
  }, []);

  // Custom Arrow Components (Significantly Larger)
  const CustomLeftArrowComponent = ({ onClick }) => (
    <div
      // Increased container size to w-16 h-16, padding to p-3
      className="absolute left-4 top-1/2 transform -translate-y-1/2 z-10 p-3 cursor-pointer bg-pink-600 rounded-full shadow-lg w-16 h-16 flex justify-center items-center"
      onClick={() => onClick()}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        // Increased SVG size to h-10 w-10
        className="h-10 w-10 text-white"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18"/>
      </svg>
    </div>
  );

  const CustomRightArrowComponent = ({ onClick }) => (
    <div
      // Increased container size to w-16 h-16, padding to p-3
      className="absolute right-4 top-1/2 transform -translate-y-1/2 z-10 p-3 cursor-pointer bg-pink-600 rounded-full shadow-lg w-16 h-16 flex justify-center items-center"
      onClick={() => onClick()}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        // Increased SVG size to h-10 w-10
        className="h-10 w-10 text-white"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3"/>
      </svg>
    </div>
  );
  // --- End Custom Arrow Components ---


  return (
    <div className="mb-8 relative"> {/* This relative positioning is the parent for the absolute arrows */}
      <Carousel
        infinite
        customLeftArrow={<CustomLeftArrowComponent />}
        customRightArrow={<CustomRightArrowComponent />}
        responsive={responsive}
        itemClass="px-4"
      >
        {dataLoaded && featuredPosts.map((post, index) => (
          <FeaturedPostCard key={index} post={post} />
        ))}
      </Carousel>
    </div>
  );
};

export default FeaturedPosts;