import React from 'react';
import Image from 'next/image';
import { grpahCMSImageLoader } from '../util';

const Author = ({ author }) => (
  <div className="text-center mt-16 mb-8 p-12 rounded-lg bg-black bg-opacity-20">
    {/* Safe-centered Author Image */}
    <div className="flex justify-center mb-4">
      <Image
        unoptimized
        loader={grpahCMSImageLoader}
        alt={author.name}
        height={60}
        width={60}
        className="rounded-full object-cover shadow-lg"
        src={author.photo.url}
      />
    </div>
    <h3 className="text-white mb-4 text-xl font-bold">{author.name}</h3>
    <p className="text-white text-ls">{author.bio}</p>
  </div>
);

export default Author;
