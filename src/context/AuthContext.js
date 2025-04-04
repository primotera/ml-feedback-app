import React, { createContext, useState, useEffect } from 'react';
import axios from 'axios';
import { jwtDecode } from 'jwt-decode';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Initialisation - vérifier si l'utilisateur est déjà connecté
  useEffect(() => {
    const token = localStorage.getItem('authToken');
    if (token) {
      try {
        // Vérifier si le token est valide
        const decodedToken = jwtDecode(token);
        const currentTime = Date.now() / 1000;
        
        if (decodedToken.exp < currentTime) {
          // Token expiré
          localStorage.removeItem('authToken');
          setCurrentUser(null);
        } else {
          // Token valide, définir l'utilisateur
          setCurrentUser(decodedToken);
          // Configurer axios pour inclure le token dans toutes les requêtes
          axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
        }
      } catch (err) {
        // Token invalide
        localStorage.removeItem('authToken');
        setCurrentUser(null);
      }
    }
    setLoading(false);
  }, []);

  // Fonction de connexion
  const login = async (email, password) => {
    try {
      setLoading(true);
      setError(null);
      
      // Simuler un appel API (à remplacer par un vrai appel)
      // const response = await axios.post('https://votre-api.com/auth/login', { email, password });
      
      // SIMULATION: Remplacer ceci par un vrai appel d'API
      const response = {
        data: {
          token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IlV0aWxpc2F0ZXVyIFRlc3QiLCJlbWFpbCI6InRlc3RAdGVzdC5jb20iLCJpYXQiOjE2MTY5NTQ4MDAsImV4cCI6MTk0ODU0NDQwMH0.Q7Ij5azCIG1JaCUxyGzVDEKUxTYUUWsVnvEN-PXCpF4',
          user: {
            id: '123',
            name: 'Utilisateur Test',
            email: email
          }
        }
      };
      
      const { token } = response.data;
      
      // Stocker le token
      localStorage.setItem('authToken', token);
      
      // Décoder pour obtenir les infos utilisateur
      const decodedToken = jwtDecode(token);
      setCurrentUser(decodedToken);
      
      // Configurer axios
      axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
      
      setLoading(false);
      return true;
    } catch (err) {
      setError(err.response?.data?.message || 'Erreur lors de la connexion');
      setLoading(false);
      return false;
    }
  };

  // Fonction d'inscription
  const register = async (name, email, password) => {
    try {
      setLoading(true);
      setError(null);
      
      // Simuler un appel API (à remplacer par un vrai appel)
      // const response = await axios.post('https://votre-api.com/auth/register', { name, email, password });
      
      // SIMULATION: Remplacer ceci par un vrai appel d'API
      const response = {
        data: {
          message: 'Utilisateur créé avec succès'
        }
      };
      
      setLoading(false);
      return true;
    } catch (err) {
      setError(err.response?.data?.message || 'Erreur lors de l\'inscription');
      setLoading(false);
      return false;
    }
  };

  // Fonction de déconnexion
  const logout = () => {
    localStorage.removeItem('authToken');
    delete axios.defaults.headers.common['Authorization'];
    setCurrentUser(null);
  };

  return (
    <AuthContext.Provider
      value={{
        currentUser,
        loading,
        error,
        login,
        register,
        logout,
        isAuthenticated: !!currentUser
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;