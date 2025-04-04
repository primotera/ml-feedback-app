import React from 'react';

function Header() {
  return (
    <header className="bg-gradient-to-r from-blue-600 to-indigo-700 py-4 shadow-md">
      <div className="container mx-auto px-4 flex items-center justify-between">
        <div className="flex items-center">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-white mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2zM9 9h6v6H9V9z" />
          </svg>
          <h1 className="text-xl font-bold text-white">ML Feedback Platform</h1>
        </div>
        <nav>
          <ul className="flex space-x-4">
            <li>
              <a href="#" className="text-white hover:text-indigo-200 transition">Accueil</a>
            </li>
            <li>
              <a href="#" className="text-white hover:text-indigo-200 transition">À propos</a>
            </li>
            <li>
              <a href="#" className="text-white hover:text-indigo-200 transition">Contact</a>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
}

export default Header;