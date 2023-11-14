import React, { useState, useEffect } from 'react';
import { Counter } from './pages/Counter';
import { useDispatch, useSelector } from "react-redux";
import Home from './pages/Home';
import Dashboard from './pages/Dashboard';
import Registration from './pages/Registration';
import Login from './pages/Login';
import Me from './pages/Me';
import Register from './pages/Register';
import ProductList from './pages/ProductList';
import BrandList from './pages/BrandList';
import { Routes, Route, BrowserRouter, useNavigate , Navigate} from "react-router-dom";
import Header from './components/Header';
import Footer from './components/Footer';
import ProtectedRoute from './components/ProtectedRoute';
import './App.css';
import { isLoggedIn, logOut } from './store/reducer/userSlice';

function App() {
  const dispatch = useDispatch();
  const token = localStorage.getItem('token');
  const user = useSelector((state) => {
    return state.user;
  });

  return (
    <div className="App container mx-auto my-8">
      <BrowserRouter>
        <Header />
        <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/register" element={<Register />} />
            <Route path="/login" element={<Login />} />
            <Route path="/me" element={<ProtectedRoute><Me/></ProtectedRoute>}/>
            <Route path="/products" element={<ProtectedRoute><ProductList/></ProtectedRoute>}/>
            <Route path="/brands" element={<ProtectedRoute><BrandList/></ProtectedRoute>}/>
        </Routes>
        <Footer />
      </BrowserRouter>
    </div>
  );
}

export default App;