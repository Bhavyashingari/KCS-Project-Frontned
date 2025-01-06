import React from "react";
import { useRoutes, Navigate } from "react-router-dom";
import Home from "../components/Home/Home"; // Ensure the path is correct based on your project structure.
import Signup from "../components/Signup/Signup";
import Dashboard from '../components/Dashboard/Dashboard'

function getCookie(name) {
  const match = document.cookie.match(new RegExp('(^| )' + name + '=([^;]+)'));
  return match ? match[2] : null;
}

export default function AppRoutes() {
  const accessToken = getCookie('access_token');
  return useRoutes([
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
      element: <Signup />
    },
    {
      path: '/dashboard',
      element: accessToken ? <Dashboard /> : <Navigate to="/home" replace />
    }
  ]);
}