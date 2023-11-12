import React from 'react';
import { useDispatch } from 'react-redux';
import { logoutUser } from '../store/reducer/authSlice';

const LogoutButton = () => {
  const dispatch = useDispatch();

  const handleLogout = () => {
    // Delete the token from localStorage
    localStorage.removeItem('token');

    // Dispatch the logout success action
    dispatch(logoutUser());

    // Redirect to the login page or handle as needed
    // You may use React Router to redirect
  };

  return (
    <button onClick={handleLogout}>Logout</button>
  );
};

export default LogoutButton;





