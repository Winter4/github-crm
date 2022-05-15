import React, { useState, useContext } from 'react';

const AuthContext = React.createContext();

export function useAuth() {
  return useContext(AuthContext);
}

export function AuthProvider({ children }) {

  const [user, setUser] = useState(localStorage.getItem('user'));

  const login = (email, password) => {

  };

  const register = (email, password, name) => {

  };

  const value = {
    user,
    login,
    register
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  )
}