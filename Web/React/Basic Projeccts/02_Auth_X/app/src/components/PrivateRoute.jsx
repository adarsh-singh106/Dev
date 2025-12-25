import React from 'react';
import { Navigate } from 'react-router-dom';

const PrivateRoute = ({ children }) => {
  // 1. Check for the user/token in storage
  const user = JSON.parse(localStorage.getItem("user"));

  // 2. If no user, kick them to Login
  if (!user || !user.token) {
    return <Navigate to="/login" replace />;
  }

  // 3. If user exists, allow access to the protected page
  return children;
};

export default PrivateRoute;