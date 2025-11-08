// components/PredictionResult.jsx
import React from 'react';
import Alert from './Alert';

const PredictionResult = ({ prediction, message, loading, error }) => {
  if (error) {
    return <Alert type="error" message={error} />;
  }

  if (loading) {
    return <LoadingSpinner />;
  }

  if (!message) {
    return (
      <div className="text-center py-12 text-gray-500">
        <p>Enter patient data and click "Predict Diabetes Risk" to see results</p>
      </div>
    );
  }

  const isDiabetic = prediction === 'diabetic';
  const resultConfig = {
    diabetic: {
      icon: '⚠️',
      title: 'Diabetic Patient',
      color: 'text-red-600',
      bgColor: 'text-red-500'
    },
    nonDiabetic: {
      icon: '✅',
      title: 'Non-Diabetic Patient',
      color: 'text-green-600',
      bgColor: 'text-green-500'
    }
  };

  const config = isDiabetic ? resultConfig.diabetic : resultConfig.nonDiabetic;

  return (
    <div className="text-center py-6">
      <div className={`text-4xl mb-4 ${config.bgColor}`}>
        {config.icon}
      </div>
      
      <h3 className={`text-2xl font-bold mb-2 ${config.color}`}>
        {config.title}
      </h3>
      
      <p className="text-lg text-gray-700 mb-4">{message}</p>
      
      <Alert type="warning">
        <p className="text-sm">
          <strong>Note:</strong> This prediction is based on machine learning and should be used for reference only. Please consult with a healthcare professional for accurate diagnosis and treatment.
        </p>
      </Alert>
    </div>
  );
};

export default PredictionResult;