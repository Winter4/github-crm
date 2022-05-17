import React, { useContext } from 'react';
import useHttp from '../hooks/httpHook';

const CRUDContext = React.createContext();

export function useCRUD() {
  return useContext(CRUDContext);
}

export function CRUDProvider({ children }) {

  const { request } = useHttp();

  const getRepo = async (user, path) => {

    try {
      // accept header is described in GH api
      await request('/data/repo', 'post', { user, path });
    } catch (e) {
      throw e;
    }

    return true;
  }

  const value = {
    getRepo,
  };

  return (
    <CRUDContext.Provider value={value}>
      {children}
    </CRUDContext.Provider>
  )
}