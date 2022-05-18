import React, { useState, useContext } from 'react';
import useHttp from '../hooks/httpHook';

const CRUDContext = React.createContext();

export function useCRUD() {
  return useContext(CRUDContext);
}

export function CRUDProvider({ children }) {

  const { request } = useHttp();

  const [loading, setLoading] = useState(false);

  const addRepo = async (user, path) => {
    try {
      setLoading(true);
      await request('/data/repo', 'post', { user, path });
      setLoading(false);
    } catch (e) {
      setLoading(false);
      throw e;
    }

    return true;
  };

  const getRepos = async user => {
    let response;

    try {
      setLoading(true);
      response = await request('/data/repos/' + user.toString());
      setLoading(false);
    } catch (e) {
      setLoading(false);
      throw e;
    }

    return response;
  };

  const refreshRepo = async id => {
    try {
      setLoading(true);
      await request('/data/repo/' + id, 'put');
      setLoading(false);
    } catch (e) {
      setLoading(false);
      throw e;
    }

    return true;
  };

  const deleteRepo = async id => {
    try {
      setLoading(true);
      await request('/data/repo/' + id, 'delete');
      setLoading(false);
    } catch (e) {
      setLoading(false);
      throw e;
    }

    return true;
  }

  const value = {
    loading,
    addRepo,
    getRepos,
    refreshRepo,
    deleteRepo,
  };

  return (
    <CRUDContext.Provider value={value}>
      {children}
    </CRUDContext.Provider>
  )
}