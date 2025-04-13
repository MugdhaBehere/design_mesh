import React from 'react';
import Image from 'next/image';

import { grpahCMSImageLoader } from '../util';

const Author = ({ author }) => (
  <div className="text-center mt-20 mb-8 p-12 relative rounded-lg bg-white bg-opacity-90 shadow-md">
    <div className="absolute left-1/2 transform -translate-x-1/2 -top-10">
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
    <h3 className="text-gray-800 mt-8 mb-4 text-xl font-bold">{author.name}</h3>
    <p className="text-gray-700 text-md">{author.bio}</p>
  </div>
);

export default Author;
