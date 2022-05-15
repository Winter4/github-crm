import React, { useState, useContext } from 'react';

const AuthContext = React.createContext();

export function useAuth() {
  return useContext(AuthContext);
}

export function AuthProvider({ children }) {

  const [user, setUser] = useState(localStorage.getItem('user'));

  const login = (email, pwd) => {
    console.log(email, pwd);
  };

  const register = (name, email, pwd) => {
    console.log(name, email, pwd);
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