import React, { createContext, useState, useContext } from 'react';


export const AuthContext = createContext();
export const useAuth = () => useContext(AuthContext);
export const AuthProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(true);
  window.addEventListener('storage', () => {
    // console.log("Change to local storage!");
    if ( !localStorage.getItem("authToken")) {
      setIsLoggedIn(false)
    return 
    }
    if (localStorage.getItem("authToken")) {
      setIsLoggedIn(true)
      return
    }

    // ...
  })
  const login = () => {
    // Thực hiện logic đăng nhập, có thể là gọi API, xác thực v.v.
    setIsLoggedIn(true);
  };

  const logout = () => {
    setIsLoggedIn(false);
  };

  return (
    <AuthContext.Provider value={{ isLoggedIn, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};