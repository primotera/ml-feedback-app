import React, { useContext, useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import AuthContext from '../context/AuthContext';

function Header() {
  const { currentUser, logout, isAuthenticated } = useContext(AuthContext);
  const [profileDropdown, setProfileDropdown] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(
    window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches
  );

  // Écouter les changements de préférence de thème du système
  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    const handleChange = (e) => {
      setIsDarkMode(e.matches);
    };

    mediaQuery.addEventListener('change', handleChange);
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, []);

  const toggleProfileDropdown = () => {
    setProfileDropdown(!profileDropdown);
  };

  return (
    <header className="bg-gradient-to-r from-blue-600 to-indigo-700 dark:from-blue-800 dark:to-indigo-900 py-4 shadow-md">
      <div className="container mx-auto px-4 flex items-center justify-between">
        <div className="flex items-center">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-white mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2zM9 9h6v6H9V9z" />
          </svg>
          <Link to="/" className="text-xl font-bold text-white">ML Feedback Platform</Link>
        </div>
        
        <nav className="flex items-center">
          <ul className="flex space-x-6">
            <li>
              <Link to="/" className="text-white hover:text-indigo-200 transition">Accueil</Link>
            </li>
            <li>
              <Link to="/dashboard" className="text-white hover:text-indigo-200 transition">Tableau de bord</Link>
            </li>
            <li>
              <Link to="/about" className="text-white hover:text-indigo-200 transition">À propos</Link>
            </li>
          </ul>
          
          <div className="ml-6 relative">
            {isAuthenticated ? (
              <div>
                <button
                  onClick={toggleProfileDropdown}
                  className="flex items-center text-white focus:outline-none"
                >
                  <div className="w-8 h-8 rounded-full bg-indigo-300 dark:bg-indigo-400 flex items-center justify-center text-indigo-800 font-bold mr-2">
                    {currentUser.name ? currentUser.name.charAt(0).toUpperCase() : '?'}
                  </div>
                  <span className="mr-1">{currentUser.name || 'Utilisateur'}</span>
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>
                
                {profileDropdown && (
                  <div className="absolute right-0 mt-2 w-48 bg-white dark:bg-gray-800 rounded-md shadow-lg py-1 z-10">
                    <Link
                      to="/profile"
                      className="block px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700"
                      onClick={() => setProfileDropdown(false)}
                    >
                      Mon profil
                    </Link>
                    <Link
                      to="/my-feedbacks"
                      className="block px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700"
                      onClick={() => setProfileDropdown(false)}
                    >
                      Mes contributions
                    </Link>
                    <button
                      onClick={() => {
                        logout();
                        setProfileDropdown(false);
                      }}
                      className="block w-full text-left px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700"
                    >
                      Déconnexion
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <div className="flex space-x-3">
                <Link
                  to="/login"
                  className="px-4 py-2 text-sm font-medium text-white bg-indigo-500 dark:bg-indigo-600 rounded-md hover:bg-indigo-600 dark:hover:bg-indigo-700 transition"
                >
                  Connexion
                </Link>
                <Link
                  to="/register"
                  className="px-4 py-2 text-sm font-medium text-indigo-700 dark:text-indigo-200 bg-white dark:bg-gray-800 rounded-md hover:bg-indigo-50 dark:hover:bg-gray-700 transition"
                >
                  Inscription
                </Link>
              </div>
            )}
          </div>
          
          <div className="ml-4 flex items-center">
            <div className="text-white text-sm ml-2">
              {isDarkMode ? (
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                  <path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z" />
                </svg>
              ) : (
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM4 11a1 1 0 100-2H3a1 1 0 000 2h1z" clipRule="evenodd" />
                </svg>
              )}
            </div>
          </div>
        </nav>
      </div>
    </header>
  );
}

export default Header;