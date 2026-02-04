
import React from 'react';

const Gallery: React.FC = () => {
  const categories = [
    "Robotics Lab Installations",
    "Student Projects",
    "CoE Research Activities",
    "Workshops & Bootcamps",
    "Innovation Events"
  ];

  return (
    <div className="bg-white">
       <div className="bg-red-600 py-20">
        <div className="container mx-auto px-6 text-center">
          <h1 className="text-4xl font-bold text-white mb-4">Gallery</h1>
          <p className="text-red-100 font-medium">Capturing the spirit of innovation across our centers</p>
        </div>
      </div>

      <div className="container mx-auto px-6 py-20">
        <div className="flex flex-wrap gap-4 mb-12 justify-center">
          {categories.map((cat, i) => (
            <button key={i} className="px-6 py-2 rounded-full border border-gray-200 hover:border-red-600 hover:text-red-600 transition-all text-sm font-bold">
              {cat}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {[...Array(12)].map((_, i) => (
            <div key={i} className="relative group aspect-square overflow-hidden rounded-2xl bg-gray-100">
              <img 
                src={`https://picsum.photos/id/${i + 100}/800/800`} 
                alt="Gallery Item" 
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity p-6 flex items-end">
                 <p className="text-white font-bold text-sm">Event / Project Placeholder #{i+1}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Gallery;
