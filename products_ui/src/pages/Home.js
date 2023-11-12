import React from 'react';
import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center">
      <h1 className="text-3xl font-bold mb-4">Welcome to Product App</h1>
      <div className="flex space-x-4">
        {/* <Link to="/login" className="text-blue-500 hover:underline">
          Login
        </Link>
        <Link to="/logout" className="text-blue-500 hover:underline">
          Logout
        </Link>
        <Link to="/products" className="text-blue-500 hover:underline">
          Products
        </Link>
        <Link to="/cards" className="text-blue-500 hover:underline">
          Cards
        </Link>
        <Link to="/brands" className="text-blue-500 hover:underline">
          Brands
        </Link>
        <Link to="/request-card" className="text-blue-500 hover:underline">
          Request Card
        </Link>
        <Link to="/report" className="text-blue-500 hover:underline">
          Report
        </Link> */}
      </div>
    </div>
  );
};

export default Home;