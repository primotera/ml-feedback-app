import React, { useContext } from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import AuthContext from '../../context/AuthContext';

function PrivateRoute() {
  const { isAuthenticated, loading } = useContext(AuthContext);

  // Si en cours de chargement, afficher un indicateur de chargement
  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  // Si non authentifié, rediriger vers la page de connexion
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  // Si authentifié, rendre le composant enfant
  return <Outlet />;
}

export default PrivateRoute;