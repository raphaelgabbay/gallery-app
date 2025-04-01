'use client';

import React from 'react';

// Import dynamic registry of components
import { componentRegistry } from './componentRegistry';

const ComponentGallery = () => {
  return (
    <div className="container mx-auto py-8">
      <h1 className="text-3xl font-bold text-center mb-10">Galerie de Composants React</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {Object.entries(componentRegistry).map(([name, { Component, author, description }]) => (
          <div key={name} className="border rounded-lg overflow-hidden shadow-lg">
            <div className="p-4 bg-gray-50">
              <h2 className="text-xl font-semibold">{name}</h2>
              <p className="text-sm text-gray-500">Par: {author || 'Anonyme'}</p>
            </div>
            
            <div className="p-4 bg-white">
              <div className="mb-4 p-4 border rounded bg-gray-50 min-h-[200px] flex items-center justify-center">
                <Component />
              </div>
              
              <p className="text-sm text-gray-700">{description || 'Aucune description'}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ComponentGallery; 