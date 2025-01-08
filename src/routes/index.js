import React, { useEffect, useState } from 'react';
import { useRoutes, Navigate } from 'react-router-dom';
import authService from '../services/authService';
import Home from '../components/Home/Home';
import Signup from '../components/Signup/Signup';
import Dashboard from '../components/Dashboard/Dashboard';

export default function AppRoutes() {

  // Define routes
  const routes = useRoutes([
    {
      path: "/home",
      element: <Home />,
    },
    {
      path: "/",
      element: <Navigate to="/home" replace />,
    },
    {
      path: "/signup",
      element: <Signup />,
    },
    {
      path: '/dashboard',
      element: <Dashboard/>
    },
  ]);

  return routes;  // Render the routes after loading user details
}
