import { Routes, Route } from 'react-router-dom'; 

import { AuthProvider } from './contexts/AuthContext';
import { CRUDProvider } from './contexts/CRUDContext';

import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';

function App() {
  return (
    <AuthProvider>
      <CRUDProvider>
        <Routes>
          <Route path='/' element={<HomePage />} />
          <Route path='/login' element={<LoginPage />} />
          <Route path='/register' element={<RegisterPage />} />
        </Routes>
      </CRUDProvider>
    </AuthProvider>
  );
}

export default App;
