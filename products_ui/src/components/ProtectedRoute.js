import React from 'react';
import { useRoutes, useNavigate,Route, Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

const ProtectedRoute = ({ element, ...rest }) => {
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  const navigate = useNavigate();

  const routeElement = isAuthenticated ? element : <Navigate to="/login" />;

  return <Route {...rest} element={routeElement} />;
};

export default ProtectedRoute;