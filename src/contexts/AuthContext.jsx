import React, { createContext, useState, useContext, useEffect } from 'react';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [isUserLoggedIn, setIsUserLoggedIn] = useState(false);
  const [isAdminLoggedIn, setAdminLoggedIn] = useState(false);

  const logoutUser = () => {
    setIsUserLoggedIn(false);
    localStorage.removeItem('user');
  };

  const logoutAdmin = () => {
    setAdminLoggedIn(false);
    localStorage.removeItem('admin');
  };

  useEffect(() => {
    const savedUser = localStorage.getItem('user');
    const savedAdmin = localStorage.getItem('admin');

    if (savedUser !== null) {
      setIsUserLoggedIn(true);
    }

    if (savedAdmin !== null) {
      setAdminLoggedIn(true);
    }
  }, []);

  return (
    <AuthContext.Provider
      value={{
        isUserLoggedIn,
        isAdminLoggedIn,
        setIsUserLoggedIn,
        setAdminLoggedIn,
        logoutUser,
        logoutAdmin,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
