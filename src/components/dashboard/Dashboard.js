import React, { useState, useEffect } from 'react';

function Dashboard() {
  const [stats, setStats] = useState(null);
  const [recentFeedbacks, setRecentFeedbacks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        setLoading(true);
        // Simuler un appel à l'API
        setTimeout(() => {
          // Données simulées
          const dashboardStats = {
            totalPredictions: 1250,
            correctPredictions: 1075,
            incorrectPredictions: 175,
            accuracyRate: 86,
            userCount: 48,
            feedbackCount: 843,
            avgConfidenceScore: 0.87
          };

          const recentFeedbackData = [
            {
              id: 1,
              user: { id: 'user1', name: 'Sophie Martin' },
              date: '2025-04-02T10:30:00Z',
              question: "Quelle est la capitale de l'Australie?",
              prediction: "Sydney",
              isCorrect: false,
              correction: "Canberra"
            },
            {
              id: 2,
              user: { id: 'user2', name: 'Thomas Bernard' },
              date: '2025-04-01T14:45:00Z',
              question: "Qui a peint La Joconde?",
              prediction: "Leonardo da Vinci",
              isCorrect: true,
              correction: null
            },
            {
              id: 3,
              user: { id: 'user3', name: 'Emma Dupont' },
              date: '2025-03-31T09:15:00Z',
              question: "Quel est l'élément chimique ayant pour symbole 'Au'?",
              prediction: "Or",
              isCorrect: true,
              correction: null
            },
            {
              id: 4,
              user: { id: 'user4', name: 'Lucas Dubois' },
              date: '2025-03-30T16:20:00Z',
              question: "En quelle année a commencé la Première Guerre mondiale?",
              prediction: "1914",
              isCorrect: true,
              correction: null
            },
            {
              id: 5,
              user: { id: 'user5', name: 'Chloé Leroy' },
              date: '2025-03-29T11:05:00Z',
              question: "Quel est le plus grand océan du monde?",
              prediction: "Océan Atlantique",
              isCorrect: false,
              correction: "Océan Pacifique"
            }
          ];

          setStats(dashboardStats);
          setRecentFeedbacks(recentFeedbackData);
          setLoading(false);
        }, 1200);
      } catch (err) {
        setError("Erreur lors du chargement des données du tableau de bord");
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, []);

  const formatDate = (dateString) => {
    const options = { day: 'numeric', month: 'short', year: 'numeric' };
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
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
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
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <h1 className="text-2xl font-semibold text-gray-900 mb-6">Tableau de bord</h1>
      
      {/* Statistiques */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <div className="bg-white overflow-hidden shadow rounded-lg">
          <div className="px-4 py-5 sm:p-6">
            <div className="flex items-center">
              <div className="flex-shrink-0 bg-blue-500 rounded-md p-3">
                <svg className="h-6 w-6 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2" />
                </svg>
              </div>
              <div className="ml-5 w-0 flex-1">
                <dl>
                  <dt className="text-sm font-medium text-gray-500 truncate">Total des prédictions</dt>
                  <dd className="text-2xl font-semibold text-gray-900">{stats.totalPredictions}</dd>
                </dl>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white overflow-hidden shadow rounded-lg">
          <div className="px-4 py-5 sm:p-6">
            <div className="flex items-center">
              <div className="flex-shrink-0 bg-green-500 rounded-md p-3">
                <svg className="h-6 w-6 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <div className="ml-5 w-0 flex-1">
                <dl>
                  <dt className="text-sm font-medium text-gray-500 truncate">Taux de précision</dt>
                  <dd className="text-2xl font-semibold text-gray-900">{stats.accuracyRate}%</dd>
                </dl>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white overflow-hidden shadow rounded-lg">
          <div className="px-4 py-5 sm:p-6">
            <div className="flex items-center">
              <div className="flex-shrink-0 bg-yellow-500 rounded-md p-3">
                <svg className="h-6 w-6 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
              </div>
              <div className="ml-5 w-0 flex-1">
                <dl>
                  <dt className="text-sm font-medium text-gray-500 truncate">Utilisateurs actifs</dt>
                  <dd className="text-2xl font-semibold text-gray-900">{stats.userCount}</dd>
                </dl>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white overflow-hidden shadow rounded-lg">
          <div className="px-4 py-5 sm:p-6">
            <div className="flex items-center">
              <div className="flex-shrink-0 bg-indigo-500 rounded-md p-3">
                <svg className="h-6 w-6 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-3l-4 4z" />
                </svg>
              </div>
              <div className="ml-5 w-0 flex-1">
                <dl>
                  <dt className="text-sm font-medium text-gray-500 truncate">Feedbacks reçus</dt>
                  <dd className="text-2xl font-semibold text-gray-900">{stats.feedbackCount}</dd>
                </dl>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Résumé du modèle */}
      <div className="bg-white shadow overflow-hidden rounded-lg mb-8">
        <div className="px-4 py-5 border-b border-gray-200 sm:px-6">
          <h3 className="text-lg leading-6 font-medium text-gray-900">Performance du modèle</h3>
          <p className="mt-1 max-w-2xl text-sm text-gray-500">Résumé des statistiques du modèle.</p>
        </div>
        <div className="px-4 py-5 sm:p-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            <div>
              <div className="flex items-center justify-between">
                <h4 className="text-sm font-medium text-gray-500">Réponses correctes</h4>
                <span className="text-sm font-medium text-green-600">{stats.correctPredictions}</span>
              </div>
              <div className="mt-2 w-full bg-gray-200 rounded-full h-2.5">
                <div className="bg-green-600 h-2.5 rounded-full" style={{ width: `${stats.accuracyRate}%` }}></div>
              </div>
            </div>
            <div>
              <div className="flex items-center justify-between">
                <h4 className="text-sm font-medium text-gray-500">Réponses incorrectes</h4>
                <span className="text-sm font-medium text-red-600">{stats.incorrectPredictions}</span>
              </div>
              <div className="mt-2 w-full bg-gray-200 rounded-full h-2.5">
                <div className="bg-red-600 h-2.5 rounded-full" style={{ width: `${100 - stats.accuracyRate}%` }}></div>
              </div>
            </div>
            <div>
              <div className="flex items-center justify-between">
                <h4 className="text-sm font-medium text-gray-500">Score de confiance moyen</h4>
                <span className="text-sm font-medium text-blue-600">{Math.round(stats.avgConfidenceScore * 100)}%</span>
              </div>
              <div className="mt-2 w-full bg-gray-200 rounded-full h-2.5">
                <div className="bg-blue-600 h-2.5 rounded-full" style={{ width: `${stats.avgConfidenceScore * 100}%` }}></div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Feedbacks récents */}
      <div className="bg-white shadow overflow-hidden rounded-lg">
        <div className="px-4 py-5 border-b border-gray-200 sm:px-6">
          <h3 className="text-lg leading-6 font-medium text-gray-900">Feedbacks récents</h3>
          <p className="mt-1 max-w-2xl text-sm text-gray-500">Les dernières contributions des utilisateurs.</p>
        </div>
        <div className="divide-y divide-gray-200">
          {recentFeedbacks.map((feedback) => (
            <div key={feedback.id} className="p-4 sm:px-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <div className="flex-shrink-0">
                    <div className="h-10 w-10 rounded-full bg-indigo-100 flex items-center justify-center">
                      <span className="text-indigo-800 font-medium">{feedback.user.name.charAt(0)}</span>
                    </div>
                  </div>
                  <div className="ml-4">
                    <div className="text-sm font-medium text-gray-900">{feedback.user.name}</div>
                    <div className="text-sm text-gray-500">{formatDate(feedback.date)}</div>
                  </div>
                </div>
                <div>
                  {feedback.isCorrect ? (
                    <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                      Correcte
                    </span>
                  ) : (
                    <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-red-100 text-red-800">
                      Incorrecte
                    </span>
                  )}
                </div>
              </div>
              <div className="mt-2">
                <p className="text-sm text-gray-600">
                  <span className="font-medium">Question:</span> {feedback.question}
                </p>
                <p className="text-sm text-gray-600 mt-1">
                  <span className="font-medium">Prédiction:</span> {feedback.prediction}
                </p>
                {!feedback.isCorrect && (
                  <p className="text-sm text-gray-600 mt-1">
                    <span className="font-medium">Correction:</span> {feedback.correction}
                  </p>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Dashboard;