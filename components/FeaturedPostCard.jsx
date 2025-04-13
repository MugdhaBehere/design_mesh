import React from 'react';
import moment from 'moment';
import Image from 'next/image';
import Link from 'next/link';

const FeaturedPostCard = ({ post }) => (
  <div className="relative h-96">
    {/* Background Image */}
    <div
      className="absolute z-0 rounded-lg bg-center bg-no-repeat bg-cover shadow-md inline-block w-full h-96"
      style={{ backgroundImage: `url('${post.featuredImage.url}')` }}
    />

    {/* Gradient Overlay */}
    <div className="absolute z-10 rounded-lg bg-gradient-to-b from-gray-400 via-gray-700 to-black opacity-60 w-full h-96" />

    {/* Content */}
    <div className="absolute z-20 flex flex-col p-4 items-center justify-center w-full h-full rounded-lg">
      <p className="text-white mb-2 text-shadow font-semibold text-xs">
        {moment(post.createdAt).format('MMM DD, YYYY')}
      </p>

      <p className="text-white mb-2 text-shadow font-semibold text-2xl text-center">
        {post.title}
      </p>

      {/* Excerpt with white background */}
      <div className="bg-white bg-opacity-80 px-4 py-2 rounded-md mt-2 max-w-md">
        <p className="text-gray-800 text-center text-sm">{post.excerpt}</p>
      </div>

      <div className="flex items-center gap-2 absolute bottom-5 justify-center">
        <Image
          unoptimized
          alt={post.author.name}
          height={30}
          width={30}
          className="rounded-full object-cover"
          src={post.author.photo.url}
        />
        <p className="text-white text-shadow font-medium">{post.author.name}</p>
      </div>
    </div>

    {/* Clickable Overlay */}
    <Link href={`/post/${post.slug}`}>
      <span className="cursor-pointer absolute w-full h-full z-30" />
    </Link>
  </div>
);

export default FeaturedPostCard;
