import React, { createContext, useState, useContext,useEffect } from 'react';
import { useNavigate } from "react-router-dom"

export const AuthContext = createContext();
export const useAuth = () => useContext(AuthContext);
// const 
export const AuthProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(true);
  useEffect(() => {
    const token = localStorage.getItem('authToken');
    if (!token) {
      setIsLoggedIn(false);
    }
  }, [])
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