// components/Button.jsx
import React from 'react';

const Button = ({ 
  children, 
  type = 'button', 
  onClick, 
  disabled = false,
  variant = 'primary',
  className = '' 
}) => {
  const baseClasses = 'flex-1 py-2 px-4 rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 transition duration-200';
  
  const variants = {
    primary: 'bg-blue-600 text-white hover:bg-blue-700 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed',
    secondary: 'bg-gray-500 text-white hover:bg-gray-600 focus:ring-gray-500'
  };

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`${baseClasses} ${variants[variant]} ${className}`}
    >
      {children}
    </button>
  );
};

export default Button;