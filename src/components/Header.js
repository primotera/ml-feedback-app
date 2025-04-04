import React, { useContext, useState } from 'react';
import { Link } from 'react-router-dom';
import AuthContext from '../context/AuthContext';

function Header() {
  const { currentUser, logout, isAuthenticated } = useContext(AuthContext);
  const [profileDropdown, setProfileDropdown] = useState(false);

  const toggleProfileDropdown = () => {
    setProfileDropdown(!profileDropdown);
  };

  return (
    <header className="bg-gradient-to-r from-blue-600 to-indigo-700 py-4 shadow-md">
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
                  <div className="w-8 h-8 rounded-full bg-indigo-300 flex items-center justify-center text-indigo-800 font-bold mr-2">
                    {currentUser.name ? currentUser.name.charAt(0).toUpperCase() : '?'}
                  </div>
                  <span className="mr-1">{currentUser.name || 'Utilisateur'}</span>
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>
                
                {profileDropdown && (
                  <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-10">
                    <Link
                      to="/profile"
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                      onClick={() => setProfileDropdown(false)}
                    >
                      Mon profil
                    </Link>
                    <Link
                      to="/my-feedbacks"
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                      onClick={() => setProfileDropdown(false)}
                    >
                      Mes contributions
                    </Link>
                    <button
                      onClick={() => {
                        logout();
                        setProfileDropdown(false);
                      }}
                      className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
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
                  className="px-4 py-2 text-sm font-medium text-white bg-indigo-500 rounded-md hover:bg-indigo-600 transition"
                >
                  Connexion
                </Link>
                <Link
                  to="/register"
                  className="px-4 py-2 text-sm font-medium text-indigo-700 bg-white rounded-md hover:bg-indigo-50 transition"
                >
                  Inscription
                </Link>
              </div>
            )}
          </div>
        </nav>
      </div>
    </header>
  );
}

export default Header;