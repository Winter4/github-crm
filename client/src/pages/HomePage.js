import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export default function HomePage() {

  const nav = useNavigate(); 

  useEffect(() => {
    const user = localStorage.getItem('userId');
    if (!user) nav('/login');
  });

  return (
    <div>Current user: {localStorage.getItem('userName')} {localStorage.getItem('userEmail')}</div>
  );
}
