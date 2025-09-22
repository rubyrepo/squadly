import React, { createContext, useState, useContext, useEffect } from 'react';

const AuthContext = createContext(null);

// Admin credentials (in a real app, these would be stored securely)
const ADMIN_EMAIL = "admin@squadly.com";
const ADMIN_PASSWORD = "6ETIn2FiaHwS6CIF";

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    const savedUser = localStorage.getItem('user');
    return savedUser ? JSON.parse(savedUser) : null;
  });

  const [isAdmin, setIsAdmin] = useState(() => {
    const savedUser = localStorage.getItem('user');
    if (savedUser) {
      const userData = JSON.parse(savedUser);
      return userData.email === ADMIN_EMAIL;
    }
    return false;
  });

  const login = (userData) => {
    setUser(userData);
    setIsAdmin(userData.email === ADMIN_EMAIL);
    localStorage.setItem('user', JSON.stringify(userData));
  };

  const logout = () => {
    setUser(null);
    setIsAdmin(false);
    localStorage.removeItem('user');
  };

  const checkAdminCredentials = (email, password) => {
    return email === ADMIN_EMAIL && password === ADMIN_PASSWORD;
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, isAdmin, checkAdminCredentials }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);