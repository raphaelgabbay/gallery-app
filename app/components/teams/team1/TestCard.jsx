/* Author: Team 1 - Test Group */
/* Description: A test card component demonstrating the component registry system */

import React from 'react';

const TestCard = () => {
  return (
    <div className="max-w-sm rounded overflow-hidden shadow-lg bg-white p-4">
      <div className="font-bold text-xl mb-2">Test Card Component</div>
      <p className="text-gray-700 text-base">
        This is a test component to verify the component registry system is working correctly.
      </p>
      <div className="mt-4 flex justify-center">
        <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
          Test Button
        </button>
      </div>
    </div>
  );
};

export default TestCard; 