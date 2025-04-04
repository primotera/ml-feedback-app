import React, { useState } from 'react';

function FeedbackForm({ onSubmit, onCancel }) {
  const [isCorrect, setIsCorrect] = useState(null);
  const [correction, setCorrection] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (isCorrect === null) {
      setError('Veuillez indiquer si la prédiction est correcte ou non');
      return;
    }
    
    if (isCorrect === false && !correction.trim()) {
      setError('Veuillez fournir une correction');
      return;
    }
    
    onSubmit(isCorrect, isCorrect ? null : correction);
  };

  return (
    <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-md">
      <h3 className="text-lg font-medium text-gray-800 dark:text-gray-200 mb-3">Évaluer cette prédiction</h3>
      
      {error && (
        <div className="mb-4 p-2 bg-red-50 dark:bg-red-900 border border-red-300 dark:border-red-700 rounded text-red-700 dark:text-red-300 text-sm">
          {error}
        </div>
      )}
      
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <p className="mb-2 text-gray-700 dark:text-gray-300 font-medium">La prédiction est-elle correcte ?</p>
          <div className="flex space-x-4">
            <label className="inline-flex items-center">
              <input
                type="radio"
                name="isCorrect"
                checked={isCorrect === true}
                onChange={() => setIsCorrect(true)}
                className="h-4 w-4 text-blue-600 dark:text-blue-500 border-gray-300 dark:border-gray-600 focus:ring-blue-500 dark:focus:ring-blue-400"
              />
              <span className="ml-2 text-gray-700 dark:text-gray-300">Oui</span>
            </label>
            <label className="inline-flex items-center">
              <input
                type="radio"
                name="isCorrect"
                checked={isCorrect === false}
                onChange={() => setIsCorrect(false)}
                className="h-4 w-4 text-blue-600 dark:text-blue-500 border-gray-300 dark:border-gray-600 focus:ring-blue-500 dark:focus:ring-blue-400"
              />
              <span className="ml-2 text-gray-700 dark:text-gray-300">Non</span>
            </label>
          </div>
        </div>
        
        {isCorrect === false && (
          <div className="mb-4">
            <label htmlFor="correction" className="block mb-2 text-gray-700 dark:text-gray-300 font-medium">
              Quelle serait la réponse correcte ?
            </label>
            <textarea
              id="correction"
              rows="3"
              className="w-full px-3 py-2 text-gray-700 dark:text-gray-200 border dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 bg-white dark:bg-gray-800"
              value={correction}
              onChange={(e) => setCorrection(e.target.value)}
              placeholder="Entrez la correction ici..."
            ></textarea>
          </div>
        )}
        
        <div className="flex justify-end space-x-2">
          <button
            type="button"
            onClick={onCancel}
            className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700"
          >
            Annuler
          </button>
          <button
            type="submit"
            className="px-4 py-2 bg-blue-600 dark:bg-blue-700 text-white rounded-md hover:bg-blue-700 dark:hover:bg-blue-600"
          >
            Soumettre
          </button>
        </div>
      </form>
    </div>
  );
}

export default FeedbackForm;