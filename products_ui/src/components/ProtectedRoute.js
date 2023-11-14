import React from 'react'
import { useSelector } from "react-redux"
import { Navigate, useLocation } from "react-router-dom"

const ProtectedRoute = ({ children }) => {
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  const token = localStorage.getItem('token');
  let location = useLocation();

  if (!token && !isAuthenticated) {
    return <Navigate to="/login" state={{ from: location }} replace />
  }
  return children

};

export default ProtectedRoute;