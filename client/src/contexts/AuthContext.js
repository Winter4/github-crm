import React, { useState, useContext } from 'react';
import useHttp from '../hooks/httpHook';

const AuthContext = React.createContext();

export function useAuth() {
  return useContext(AuthContext);
}

export function AuthProvider({ children }) {

  const [user, setUser] = useState(localStorage.getItem('userId'));
  const { request, loading } = useHttp();

  const rememberLogin = (id, name, email) => {
    localStorage.setItem('userId', id);
    localStorage.setItem('userName', name);
    localStorage.setItem('userEmail', email);
  };

  const logout = () => {
    setUser(null);
    localStorage.clear();
  };

  const login = async (email, password) => {
    try {
      let response;
      
      try {
        response = await request('/auth/login', 'post', { email, password });
      } catch (e) {
        throw e;
      }

      rememberLogin(response.id, response.name, response.email);
      setUser(response.id);

      return true;

    } catch (e) {
      throw e;
    }
  };

  const register = async (name, email, password) => {
    try {
      let response;

      try {
        response = await request('/auth/register', 'post', { name, email, password });
      } catch (e) {
        throw e;
      }
    
      rememberLogin(response.id, response.name, response.email);
      setUser(response.id);

      return true;

    } catch (e) {
      throw e;
    }
  };

  const value = {
    loading,
    user,
    logout,
    login,
    register
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  )
}