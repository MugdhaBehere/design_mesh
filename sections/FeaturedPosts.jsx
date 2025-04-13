import React, { useState, useEffect } from 'react';
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';

import { FeaturedPostCard } from '../components';
import { getFeaturedPosts } from '../services';

// Responsive breakpoints for carousel
const responsive = {
  superLargeDesktop: { breakpoint: { max: 4000, min: 1024 }, items: 5 },
  desktop: { breakpoint: { max: 1024, min: 768 }, items: 3 },
  tablet: { breakpoint: { max: 768, min: 640 }, items: 2 },
  mobile: { breakpoint: { max: 640, min: 0 }, items: 1 },
};

// Custom Left Arrow
const CustomLeftArrowComponent = ({ onClick }) => (
  <div
    className="absolute left-2 top-1/2 transform -translate-y-1/2 z-10 cursor-pointer"
    onClick={onClick}
  >
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className="h-5 w-5 text-pink-600"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
        d="M15 19l-7-7 7-7"
      />
    </svg>
  </div>
);

// Custom Right Arrow
const CustomRightArrowComponent = ({ onClick }) => (
  <div
    className="absolute right-2 top-1/2 transform -translate-y-1/2 z-10 cursor-pointer"
    onClick={onClick}
  >
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className="h-5 w-5 text-pink-600"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
        d="M9 5l7 7-7 7"
      />
    </svg>
  </div>
);

const FeaturedPosts = () => {
  const [featuredPosts, setFeaturedPosts] = useState([]);
  const [dataLoaded, setDataLoaded] = useState(false);

  useEffect(() => {
    getFeaturedPosts()
      .then((result) => {
        setFeaturedPosts(Array.isArray(result) ? result : []);
        setDataLoaded(true);
      })
      .catch((error) => {
        console.error('Error fetching featured posts:', error);
        setFeaturedPosts([]);
        setDataLoaded(true);
      });
  }, []);

  return (
    <div className="mb-8 relative">
      <Carousel
        infinite
        arrows={false}
        customLeftArrow={<CustomLeftArrowComponent />}
        customRightArrow={<CustomRightArrowComponent />}
        responsive={responsive}
        itemClass="px-4"
      >
        {dataLoaded && featuredPosts.length > 0 ? (
          featuredPosts.map((post, index) => (
            <FeaturedPostCard key={index} post={post} />
          ))
        ) : (
          <div className="text-center text-gray-400 py-5">
            {dataLoaded ? 'No featured posts available.' : 'Loading posts...'}
          </div>
        )}
      </Carousel>
    </div>
  );
};

export default FeaturedPosts;
