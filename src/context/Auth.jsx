// AuthContext.js
import React, { createContext, useContext, useState } from 'react';
import api from '../api';

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [sessionToken, setSessionToken] = useState(null);

  const login = async (email, password) => {
    try {
      const response = await api.login(email, password);
      
      // Assuming response contains the _id directly
      const { _id } = response;

      setSessionToken(_id);
      setIsLoggedIn(true);

      localStorage.setItem('userId', _id);
      console.log(_id);

      return true;
    } catch (error) {
      console.error('Login failed:', error);
      return false;
    }
  };

  const logout = () => {
    setIsLoggedIn(false);
    setSessionToken(null);

    
    localStorage.removeItem('userId');
  };

  return (
    <AuthContext.Provider value={{ isLoggedIn, login, logout, sessionToken }}>
      {children}
    </AuthContext.Provider>
  );
};
