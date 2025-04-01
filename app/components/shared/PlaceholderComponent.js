'use client';

import React from 'react';

const PlaceholderComponent = () => {
  return (
    <div className="flex flex-col items-center justify-center p-4 text-center">
      <div className="w-16 h-16 bg-blue-500 rounded-full mb-4 flex items-center justify-center">
        <span className="text-white text-2xl">?</span>
      </div>
      <p className="text-gray-600">Composant à venir...</p>
    </div>
  );
};

export default PlaceholderComponent; 