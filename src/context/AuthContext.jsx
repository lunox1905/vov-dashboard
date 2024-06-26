import React, { createContext, useState, useContext } from 'react';

export const AuthContext = createContext();
export const useAuth = () => useContext(AuthContext);
export const AuthProvider = ({ children }) => {
const [isLoggedIn, setIsLoggedIn] = useState(true);
const login = () => {
    if (localStorage.getItem("authToken")) {
      setIsLoggedIn(true);
    }
  }
  const logout = () => {
    const token = localStorage.getItem('authToken');
    if (token) {
      localStorage.removeItem('authToken');
    }
    setIsLoggedIn(false);
  }
  return (
    <AuthContext.Provider value={{ isLoggedIn, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};