import React from 'react';
import Image from 'next/image';
import moment from 'moment';
import Link from 'next/link';

import { grpahCMSImageLoader } from '../util';

const PostCard = ({ post }) => (
  <div className="bg-white shadow-lg rounded-lg p-0 lg:p-8 pb-12 mb-8">
    {/* Thumbnail Image */}
    <div className="relative overflow-hidden shadow-md pb-80 mb-6">
      <img
        src={post.featuredImage.url}
        alt={post.title}
        className="object-top absolute h-80 w-full object-cover shadow-lg rounded-t-lg lg:rounded-lg"
      />
    </div>

    {/* Title */}
    <h1 className="transition duration-700 text-center mb-4 cursor-pointer hover:text-pink-600 text-3xl font-semibold">
      <Link href={`/post/${post.slug}`}>{post.title}</Link>
    </h1>

    {/* Author + Date */}
    <div className="block lg:flex text-center items-center justify-center mb-4 w-full">
      <div className="flex items-center justify-center mb-2 lg:mb-0 w-full lg:w-auto mr-4">
        <Image
          unoptimized
          loader={grpahCMSImageLoader}
          alt={post.author.name}
          src={post.author.photo.url}
          width={30}
          height={30}
          className="rounded-full object-cover"
        />
        <p className="inline align-middle text-gray-700 ml-2 font-medium text-lg">
          {post.author.name}
        </p>
      </div>

      <p className="inline align-middle text-gray-600 text-sm">
        {moment(post.createdAt).format('MMM DD, YYYY')}
      </p>
    </div>

    {/* Excerpt */}
    <p className="text-gray-800 font-normal text-center px-4 mb-4">{post.excerpt}</p>

    {/* Continue Reading Button */}
    <div className="text-center">
      <Link href={`/post/${post.slug}`}>
        <span className="transition duration-500 ease transform hover:-translate-y-1 inline-block bg-pink-600 text-lg font-medium rounded-full text-white px-8 py-3 cursor-pointer">
          Continue Reading
        </span>
      </Link>
    </div>
  </div>
);

export default PostCard;
