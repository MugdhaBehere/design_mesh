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

const CustomLeftArrowComponent = ({ onClick }) => (
  <div
    className="absolute left-2 top-1/2 transform -translate-y-1/2 z-10 p-1 cursor-pointer bg-pink-600 rounded-full shadow-md w-8 h-8 flex justify-center items-center"
    onClick={onClick}
  >
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className="h-4 w-4 text-white"
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
    className="absolute right-2 top-1/2 transform -translate-y-1/2 z-10 p-1 cursor-pointer bg-pink-600 rounded-full shadow-md w-8 h-8 flex justify-center items-center"
    onClick={onClick}
  >
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className="h-4 w-4 text-white"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
    >
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
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
        console.error('FeaturedPosts: Error fetching data:', error);
        setFeaturedPosts([]);
        setDataLoaded(true);
      });
  }, []);

  return (
    <div className="mb-8 relative">
      <Carousel
        infinite
        customLeftArrow={<CustomLeftArrowComponent />}
        customRightArrow={<CustomRightArrowComponent />}
        responsive={responsive}
        itemClass="px-4"
      >
        {dataLoaded && featuredPosts.length > 0 ? (
          featuredPosts.map((post, index) => <FeaturedPostCard key={index} post={post} />)
        ) : (
          <div className="text-center py-5 text-gray-500">
            {dataLoaded ? 'No featured posts available.' : 'Loading posts...'}
          </div>
        )}
      </Carousel>
    </div>
  );
};

export default FeaturedPosts;
