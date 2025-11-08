// components/Alert.jsx
import React from 'react';

const Alert = ({ 
  type = 'info', 
  message, 
  children 
}) => {
  const styles = {
    error: 'bg-red-50 border border-red-200 text-red-700',
    warning: 'bg-yellow-50 border border-yellow-200 text-yellow-700',
    info: 'bg-blue-50 border border-blue-200 text-blue-700',
    success: 'bg-green-50 border border-green-200 text-green-700'
  };

  return (
    <div className={`rounded-md p-4 ${styles[type]}`}>
      {message && <p>{message}</p>}
      {children}
    </div>
  );
};

export default Alert;