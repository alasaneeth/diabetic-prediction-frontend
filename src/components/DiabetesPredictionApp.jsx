// DiabetesPredictionApp.jsx
import React, { useState } from 'react';
import axios from 'axios';
import FormInput from './FormInput';
import Button from './Button';
import PredictionResult from './PredictionResult';

const DiabetesPredictionApp = () => {
  const [formData, setFormData] = useState({
    pregnancies: '',
    glucose: '',
    bloodPressure: '',
    skinThickness: '',
    insulin: '',
    bmi: '',
    diabetesPedigree: '',
    age: ''
  });
  
  const [prediction, setPrediction] = useState('');
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const formFields = [
    { label: 'Pregnancies', name: 'pregnancies' },
    { label: 'Glucose Level', name: 'glucose' },
    { label: 'Blood Pressure', name: 'bloodPressure' },
    { label: 'Skin Thickness', name: 'skinThickness' },
    { label: 'Insulin Level', name: 'insulin' },
    { label: 'BMI', name: 'bmi', step: '0.1' },
    { label: 'Diabetes Pedigree Function', name: 'diabetesPedigree', step: '0.001' },
    { label: 'Age', name: 'age' }
  ];

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setPrediction('');
    setMessage('');

    try {
      const response = await axios.post('http://localhost:5000/predict', formData);
      setPrediction(response.data.prediction);
      setMessage(response.data.message);
    } catch (err) {
      setError('Error making prediction. Please try again.');
      console.error('Prediction error:', err);
    } finally {
      setLoading(false);
    }
  };

  const resetForm = () => {
    setFormData({
      pregnancies: '',
      glucose: '',
      bloodPressure: '',
      skinThickness: '',
      insulin: '',
      bmi: '',
      diabetesPedigree: '',
      age: ''
    });
    setPrediction('');
    setMessage('');
    setError('');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-green-50 py-8 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-800 mb-2">
            Diabetes Prediction System
          </h1>
          <p className="text-lg text-gray-600">
            Enter patient data to predict diabetes risk
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {/* Input Form */}
          <div className="bg-white rounded-lg shadow-lg p-6">
            <h2 className="text-2xl font-semibold text-gray-800 mb-6">
              Patient Information
            </h2>
            
            <form onSubmit={handleSubmit} className="space-y-4">
              {formFields.map((field) => (
                <FormInput
                  key={field.name}
                  label={field.label}
                  name={field.name}
                  value={formData[field.name]}
                  onChange={handleInputChange}
                  step={field.step}
                />
              ))}

              <div className="flex space-x-4 pt-4">
                <Button
                  type="submit"
                  disabled={loading}
                  variant="primary"
                >
                  {loading ? 'Predicting...' : 'Predict Diabetes Risk'}
                </Button>
                
                <Button
                  type="button"
                  onClick={resetForm}
                  variant="secondary"
                >
                  Reset
                </Button>
              </div>
            </form>
          </div>

          {/* Results Section */}
          <div className="bg-white rounded-lg shadow-lg p-6">
            <h2 className="text-2xl font-semibold text-gray-800 mb-6">
              Prediction Result
            </h2>
            
            <PredictionResult 
              prediction={prediction}
              message={message}
              loading={loading}
              error={error}
            />
          </div>
        </div>

        {/* Footer */}
        <div className="text-center mt-8 text-gray-600">
          <p>Diabetes Prediction System - Machine Learning Powered</p>
        </div>
      </div>
    </div>
  );
};

export default DiabetesPredictionApp;