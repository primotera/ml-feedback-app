import React, { useState, useEffect, useContext } from 'react';
import AuthContext from '../../context/AuthContext';

function UserFeedbacks() {
  const { currentUser } = useContext(AuthContext);
  const [feedbacks, setFeedbacks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [stats, setStats] = useState({
    total: 0,
    correct: 0,
    incorrect: 0
  });

  // Chargement des feedbacks de l'utilisateur
  useEffect(() => {
    const fetchUserFeedbacks = async () => {
      try {
        setLoading(true);
        // Ici, faire un appel API pour récupérer les données
        // const response = await axios.get('/api/users/feedbacks');
        
        // Simulation de données
        setTimeout(() => {
          const sampleFeedbacks = [
            {
              id: 1,
              date: '2025-03-15T10:30:00Z',
              prediction: {
                question: "Quelle est la capitale du Canada?",
                answer: "Ottawa",
                confidence: 0.96
              },
              isCorrect: true,
              correction: null
            },
            {
              id: 2,
              date: '2025-03-14T14:20:00Z',
              prediction: {
                question: "Qui a écrit 'Les Misérables'?",
                answer: "Alexandre Dumas",
                confidence: 0.72
              },
              isCorrect: false,
              correction: "Victor Hugo"
            },
            {
              id: 3,
              date: '2025-03-12T09:15:00Z',
              prediction: {
                question: "Quelle est la formule chimique de l'eau?",
                answer: "H2O",
                confidence: 0.99
              },
              isCorrect: true,
              correction: null
            }
          ];
          
          setFeedbacks(sampleFeedbacks);
          
          // Calculer les statistiques
          const total = sampleFeedbacks.length;
          const correct = sampleFeedbacks.filter(f => f.isCorrect).length;
          
          setStats({
            total,
            correct,
            incorrect: total - correct
          });
          
          setLoading(false);
        }, 1000);
      } catch (err) {
        setError("Erreur lors du chargement des feedbacks");
        setLoading(false);
      }
    };

    fetchUserFeedbacks();
  }, []);

  // Formatage de la date
  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit' };
    return new Date(dateString).toLocaleDateString('fr-FR', options);
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="max-w-4xl mx-auto p-4 sm:p-6 lg:p-8">
        <div className="bg-red-50 border-l-4 border-red-500 p-4">
          <div className="flex">
            <div className="flex-shrink-0">
              <svg className="h-5 w-5 text-red-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
              </svg>
            </div>
            <div className="ml-3">
              <p className="text-sm text-red-700">{error}</p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto p-4 sm:p-6 lg:p-8">
      <div className="bg-white shadow rounded-lg overflow-hidden">
        <div className="px-4 py-5 sm:px-6 bg-gradient-to-r from-blue-500 to-indigo-600">
          <h3 className="text-lg leading-6 font-medium text-white">Vos contributions</h3>
          <p className="mt-1 max-w-2xl text-sm text-indigo-100">
            Historique de vos feedbacks sur les prédictions du modèle
          </p>
        </div>
        
        <div className="px-4 py-5 sm:p-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            <div className="bg-blue-50 p-4 rounded-lg shadow-sm">
              <p className="text-sm text-blue-600 font-medium">Total des contributions</p>
              <p className="text-3xl font-bold text-blue-800">{stats.total}</p>
            </div>
            <div className="bg-green-50 p-4 rounded-lg shadow-sm">
              <p className="text-sm text-green-600 font-medium">Prédictions correctes</p>
              <p className="text-3xl font-bold text-green-800">{stats.correct}</p>
            </div>
            <div className="bg-red-50 p-4 rounded-lg shadow-sm">
              <p className="text-sm text-red-600 font-medium">Prédictions corrigées</p>
              <p className="text-3xl font-bold text-red-800">{stats.incorrect}</p>
            </div>
          </div>
          
          {feedbacks.length === 0 ? (
            <div className="text-center py-10">
              <svg className="mx-auto h-12 w-12 text-gray-400" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
              </svg>
              <h3 className="mt-2 text-sm font-medium text-gray-900">Aucune contribution</h3>
              <p className="mt-1 text-sm text-gray-500">Vous n'avez pas encore évalué de prédictions.</p>
            </div>
          ) : (
            <div className="mt-4">
              <div className="flow-root">
                <ul className="divide-y divide-gray-200">
                  {feedbacks.map((feedback) => (
                    <li key={feedback.id} className="py-4">
                      <div className="flex flex-col sm:flex-row">
                        <div className="flex-1">
                          <p className="font-medium text-gray-900">{feedback.prediction.question}</p>
                          <div className="mt-2 flex">
                            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium mr-2 bg-gray-100 text-gray-800">
                              Prédiction: {feedback.prediction.answer}
                            </span>
                            <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                              feedback.prediction.confidence > 0.9 
                                ? 'bg-green-100 text-green-800' 
                                : feedback.prediction.confidence > 0.7 
                                  ? 'bg-yellow-100 text-yellow-800'
                                  : 'bg-red-100 text-red-800'
                            }`}>
                              Confiance: {Math.round(feedback.prediction.confidence * 100)}%
                            </span>
                          </div>
                          {feedback.isCorrect ? (
                            <div className="mt-2 inline-flex items-center px-2.5 py-0.5 rounded-md text-sm font-medium bg-green-100 text-green-800">
                              <svg className="-ml-0.5 mr-1.5 h-4 w-4 text-green-500" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                              </svg>
                              Prédiction correcte
                            </div>
                          ) : (
                            <div className="mt-2 space-y-2">
                              <div className="inline-flex items-center px-2.5 py-0.5 rounded-md text-sm font-medium bg-red-100 text-red-800">
                                <svg className="-ml-0.5 mr-1.5 h-4 w-4 text-red-500" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                                </svg>
                                Prédiction incorrecte
                              </div>
                              <p className="text-sm text-gray-600">
                                <span className="font-medium">Correction: </span>
                                {feedback.correction}
                              </p>
                            </div>
                          )}
                        </div>
                        <div className="mt-2 sm:mt-0 text-sm text-gray-500 sm:text-right">
                          {formatDate(feedback.date)}
                        </div>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default UserFeedbacks;