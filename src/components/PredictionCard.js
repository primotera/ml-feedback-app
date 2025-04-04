import React, { useState } from 'react';
import FeedbackForm from './FeedbackForm';

function PredictionCard({ prediction, onFeedback }) {
  const [showForm, setShowForm] = useState(false);
  const [feedbackSubmitted, setFeedbackSubmitted] = useState(prediction.feedback !== null);

  const getConfidenceColor = (confidence) => {
    if (confidence > 0.9) return 'bg-green-100 text-green-800 dark:bg-green-800 dark:text-green-100';
    if (confidence > 0.7) return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-800 dark:text-yellow-100';
    return 'bg-red-100 text-red-800 dark:bg-red-800 dark:text-red-100';
  };

  const handleFeedbackSubmit = (isCorrect, correction) => {
    onFeedback(prediction.id, isCorrect, correction);
    setFeedbackSubmitted(true);
    setShowForm(false);
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 hover:shadow-lg transition duration-200">
      <div className="mb-4">
        <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200 mb-2">Question:</h3>
        <p className="text-gray-700 dark:text-gray-300">{prediction.question}</p>
      </div>
      
      <div className="mb-4">
        <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200 mb-2">Prédiction du modèle:</h3>
        <div className="flex items-center">
          <p className="text-gray-700 dark:text-gray-300 font-medium">{prediction.prediction}</p>
          <span className={`ml-3 text-xs font-medium px-2.5 py-0.5 rounded-full ${getConfidenceColor(prediction.confidence)}`}>
            Confiance: {(prediction.confidence * 100).toFixed(0)}%
          </span>
        </div>
      </div>

      {prediction.feedback === true && (
        <div className="mb-4 p-3 bg-green-50 dark:bg-green-900 rounded-md">
          <p className="text-green-700 dark:text-green-300">
            <span className="font-bold">✓</span> Vous avez marqué cette prédiction comme correcte
          </p>
        </div>
      )}

      {prediction.feedback === false && (
        <div className="mb-4 p-3 bg-red-50 dark:bg-red-900 rounded-md">
          <p className="text-red-700 dark:text-red-300">
            <span className="font-bold">✗</span> Vous avez marqué cette prédiction comme incorrecte
          </p>
          {prediction.correction && (
            <div className="mt-2">
              <p className="text-gray-700 dark:text-gray-300 font-medium">Votre correction:</p>
              <p className="text-gray-800 dark:text-gray-200">{prediction.correction}</p>
            </div>
          )}
        </div>
      )}

      {!feedbackSubmitted && (
        <div className="mt-4">
          {showForm ? (
            <FeedbackForm 
              onSubmit={handleFeedbackSubmit} 
              onCancel={() => setShowForm(false)} 
            />
          ) : (
            <button 
              onClick={() => setShowForm(true)} 
              className="px-4 py-2 bg-blue-600 dark:bg-blue-700 text-white rounded hover:bg-blue-700 dark:hover:bg-blue-600 transition"
            >
              Donner mon feedback
            </button>
          )}
        </div>
      )}
    </div>
  );
}

export default PredictionCard;