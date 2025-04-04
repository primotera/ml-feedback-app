import React, { useState, useEffect } from 'react';
import FeedbackForm from './components/FeedbackForm';
import PredictionCard from './components/PredictionCard';
import Header from './components/Header';
import axios from 'axios';

function App() {
  const [predictions, setPredictions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Simulation de chargement des prédictions depuis une API
  useEffect(() => {
    const fetchPredictions = async () => {
      try {
        // Simuler un délai d'API
        setTimeout(() => {
          // Exemple de données, à remplacer par un appel API réel
          const samplePredictions = [
            {
              id: 1,
              question: "Quelle est la capitale de la France?",
              prediction: "Paris",
              confidence: 0.98,
              feedback: null,
              correction: null
            },
            {
              id: 2,
              question: "Qui a peint la Joconde?",
              prediction: "Leonardo da Vinci",
              confidence: 0.95,
              feedback: null,
              correction: null
            },
            {
              id: 3,
              question: "Quel est le plus grand océan du monde?",
              prediction: "L'océan Atlantique",
              confidence: 0.75,
              feedback: null,
              correction: null
            }
          ];
          
          setPredictions(samplePredictions);
          setLoading(false);
        }, 1000);
      } catch (err) {
        setError("Erreur lors du chargement des prédictions");
        setLoading(false);
      }
    };

    fetchPredictions();
  }, []);

  // Fonction pour soumettre un feedback
  const handleFeedback = (id, isCorrect, correction) => {
    setPredictions(prevPredictions => 
      prevPredictions.map(pred => 
        pred.id === id 
          ? { ...pred, feedback: isCorrect, correction: correction } 
          : pred
      )
    );

    // Ici, vous pourriez envoyer les données à votre API
    console.log(`Feedback soumis pour l'ID ${id}: Correct: ${isCorrect}, Correction: ${correction}`);
    
    // Exemple de code pour envoyer les données à une API (commenté pour la simulation)
    /*
    axios.post('https://votre-api.com/feedback', {
      predictionId: id,
      isCorrect,
      correction
    })
    .then(response => {
      console.log('Feedback enregistré avec succès', response.data);
    })
    .catch(error => {
      console.error('Erreur lors de l\'enregistrement du feedback', error);
    });
    */
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <main className="container mx-auto px-4 py-8">
        <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">
          Évaluation des prédictions du modèle
        </h2>
        
        {loading ? (
          <div className="text-center py-10">
            <div className="inline-block animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-blue-500"></div>
            <p className="mt-2 text-gray-600">Chargement des prédictions...</p>
          </div>
        ) : error ? (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
            {error}
          </div>
        ) : (
          <div className="grid md:grid-cols-1 gap-6">
            {predictions.map(prediction => (
              <PredictionCard 
                key={prediction.id}
                prediction={prediction}
                onFeedback={handleFeedback}
              />
            ))}
          </div>
        )}
      </main>
    </div>
  );
}

export default App;