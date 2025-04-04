import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Header from './components/Header';
import PredictionCard from './components/PredictionCard';
import Login from './components/auth/Login';
import Register from './components/auth/Register';
import PrivateRoute from './components/auth/PrivateRoute';
import UserProfile from './components/profile/UserProfile';
import UserFeedbacks from './components/profile/UserFeedbacks';
import Dashboard from './components/dashboard/Dashboard';
import { AuthProvider } from './context/AuthContext';
import axios from 'axios';

// Page d'accueil avec les prédictions à évaluer
function Home() {
  const [predictions, setPredictions] = React.useState([]);
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState(null);

  // Simulation de chargement des prédictions depuis une API
  React.useEffect(() => {
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
  );
}

// Composant About pour la page À propos
function About() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <h2 className="text-2xl font-bold mb-6 text-gray-800">À propos</h2>
      <div className="bg-white shadow-md rounded-lg p-6">
        <p className="text-gray-700 mb-4">
          Cette application permet aux utilisateurs d'évaluer les prédictions d'un modèle de langage et de fournir des corrections lorsque nécessaire.
        </p>
        <p className="text-gray-700 mb-4">
          En collectant ces retours, nous pouvons améliorer continuellement les performances du modèle et sa précision dans différents domaines.
        </p>
        <h3 className="text-xl font-semibold mt-6 mb-3 text-gray-800">Comment ça marche ?</h3>
        <ol className="list-decimal pl-6 space-y-2 text-gray-700">
          <li>Consultez les prédictions disponibles sur la page d'accueil</li>
          <li>Pour chaque prédiction, indiquez si elle est correcte ou non</li>
          <li>Si la prédiction est incorrecte, fournissez la réponse correcte</li>
          <li>Vos contributions sont automatiquement enregistrées et utilisées pour améliorer le modèle</li>
        </ol>
      </div>
    </div>
  );
}

function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="min-h-screen bg-gray-50">
          <Header />
          <Routes>
            {/* Routes publiques */}
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/about" element={<About />} />
            
            {/* Routes protégées */}
            <Route element={<PrivateRoute />}>
              <Route path="/profile" element={<UserProfile />} />
              <Route path="/my-feedbacks" element={<UserFeedbacks />} />
              <Route path="/dashboard" element={<Dashboard />} />
            </Route>
            
            {/* Route par défaut */}
            <Route path="/" element={<Home />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;