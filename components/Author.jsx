import React from 'react';
import Image from 'next/image';

import { grpahCMSImageLoader } from '../util';

const Author = ({ author }) => (
  <div className="text-center mt-20 mb-8 p-12 relative rounded-lg bg-black bg-opacity-20">
    {/* Centered Author Image */}
    <div className="absolute left-1/2 -top-14 transform -translate-x-1/2">
      <Image
        unoptimized
        loader={grpahCMSImageLoader}
        alt={author.name}
        height={60}
        width={60}
        className="align-middle rounded-full object-cover shadow-lg"
        src={author.photo.url}
      />
    </div>
    <h3 className="text-white mt-8 mb-4 text-xl font-bold">{author.name}</h3>
    <p className="text-white text-ls">{author.bio}</p>
  </div>
);

export default Author;
