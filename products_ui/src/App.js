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
import { Routes, Route, BrowserRouter } from "react-router-dom";
import Header from './components/Header';
import Footer from './components/Footer';
import './App.css';
import { isLoggedIn, logOut } from './store/reducer/userSlice';

function App() {
  const dispatch = useDispatch();
  const user = useSelector((state) => {
    return state.user;
  });
  const [title, setTitle] = useState();
  useEffect(() => {
    // dispatch(isLoggedIn());
  }, []);
  return (
    <div className="App container mx-auto my-8">
      <BrowserRouter>
        <Header />
        <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/registration" element={<Registration />} />
            <Route path="/login" element={<Login />} />
            <Route path="/me" element={<Me />} />
            <Route path="/products" element={<ProductList />} />
            <Route path="/brands" element={<BrandList />} />
            <Route path="/register" element={<Register />} />
        </Routes>
        <Footer />
      </BrowserRouter>
    </div>
  );
}

export default App;