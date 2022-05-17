import React, { useContext } from 'react';
import useHttp from '../hooks/httpHook';

const CRUDContext = React.createContext();

export function useCRUD() {
  return useContext(CRUDContext);
}

export function CRUDProvider({ children }) {

  const { request } = useHttp();

  const addRepo = async (user, path) => {
    try {
      await request('/data/repo', 'post', { user, path });
    } catch (e) {
      throw e;
    }

    return true;
  };

  const getRepos = async user => {
    let response;

    try {
      response = await request('/data/repos/' + user.toString());
    } catch (e) {
      throw e;
    }

    return response;
  };

  const refreshRepo = async id => {
    try {
      await request('/data/repo/' + id, 'put');
    } catch (e) {
      throw e;
    }

    return true;
  };

  const value = {
    addRepo,
    getRepos,
    refreshRepo,
  };

  return (
    <CRUDContext.Provider value={value}>
      {children}
    </CRUDContext.Provider>
  )
}