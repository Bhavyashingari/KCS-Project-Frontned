import React from 'react';
import { Navigate } from 'react-router-dom';

// Utility to get cookies
function getCookie(name) {
  const match = document.cookie.match(new RegExp('(^| )' + name + '=([^;]+)'));
  return match ? match[2] : null;
}

const ProtectedRoute = ({ element }) => {
  const accessToken = getCookie('access_token'); // Check if access token exists

  // If no access token, redirect to login page
  if (!accessToken) {
    return <Navigate to="/login" replace />;
  }

  // If token exists, allow access to the requested route
  return element;
};

export default ProtectedRoute;
