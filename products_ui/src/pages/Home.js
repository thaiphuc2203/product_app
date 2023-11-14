import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
const Home = () => {
  const isAuthenticated = useSelector((state) => state.auth);
  console.log(isAuthenticated, 'isAuthenticated')

  const token = localStorage.getItem('token');
  const navigate = useNavigate();

  useEffect(() => {

  }, [token, navigate]);
  return (
    <div className="min-h-screen flex flex-col items-center justify-center">
      <h1 className="text-3xl font-bold mb-4">Welcome to Product App</h1>
      <div className="flex space-x-4">
      </div>
    </div>
  );
};

export default Home;