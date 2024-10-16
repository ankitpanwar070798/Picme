'use client';
import React, { useState } from 'react';
import { ReactCompareSlider, ReactCompareSliderImage } from 'react-compare-slider';

interface Images {
  before: string;
  after: string;
}

interface ImagesMap {
  [key: string]: Images;
}

const imagesMap: ImagesMap = {
  People: {
    before: '/boy-bg.jpg', 
    after: '/boy.png', 
  },
  Products: {
    before: '/headphone-bg.jpg',
    after: '/headphone.png',
  },
  Animals: {
    before: '/wolf-bg.jpg',
    after: '/wolf.png',
  },
  Cars: {
    before: '/car-bg.jpg',
    after: '/car.png',
  },

};

const ImageComparision: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState<string>('People');
  const [currentImages, setCurrentImages] = useState<Images>(imagesMap[activeCategory]);

  const handleCategoryChange = (category: string) => {
    setActiveCategory(category);
    setCurrentImages(imagesMap[category]);
  };

  return (
    <div className="max-w-4xl mx-auto p-4">
      <h1 className="text-4xl font-semibold text-center mb-8 mt-8 family-helvetica" style={{ textDecoration: 'underline', textDecorationColor: '#9CA986' }}>Pre and Post Images Comparison</h1>

      <div className="flex justify-center space-x-4 mb-8">
        {Object.keys(imagesMap).map((category) => (
          <button
            key={category}
            className={`px-4 py-2 rounded-full ${
              activeCategory === category
                ? 'bg-[#9CA986] text-white'
                : 'bg-white text-[#9CA986] border border-[#9CA986]'
            }`}
            onClick={() => handleCategoryChange(category)}
          >
            {category}
          </button>
        ))}
      </div>

      <div className="relative bg-white rounded-lg shadow-lg overflow-hidden w-full h-96 ">
        <ReactCompareSlider
        className='h-96'
          itemOne={
            <ReactCompareSliderImage
              src={currentImages.after}
              alt="Before"
              style={{ width: '100%', height: '100%', objectFit: 'cover' }}
            />
          }
          itemTwo={
            <ReactCompareSliderImage
              src={currentImages.before}
              alt="After"
              style={{ width: '100%', height: '100%', objectFit: 'cover' }}
            />
          }
        />
      </div>
    </div>
  );
};

export default ImageComparision;
