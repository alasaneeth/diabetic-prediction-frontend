// components/LoadingSpinner.jsx
import React from 'react';

const LoadingSpinner = ({ message = 'Analyzing patient data...' }) => {
  return (
    <div className="text-center py-8">
      <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
      <p className="text-gray-600 mt-2">{message}</p>
    </div>
  );
};

export default LoadingSpinner;