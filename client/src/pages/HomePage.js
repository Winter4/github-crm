import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export default function HomePage() {

  const nav = useNavigate(); 

  useEffect(() => {
    const user = localStorage.getItem('user');
    if (!user) nav('/login');
  });

  return (
    <div>HomePage</div>
  );
}
