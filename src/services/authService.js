import axios from 'axios';
import { jwtDecode } from "jwt-decode";
import { DEV_API_URL } from '../_utils_/stringConstants';
import msalInstance from './msalConfig'; // Import msalInstance from msalConfig.js

const API_URL = DEV_API_URL; // Django API URL

// Helper to get the token from cookies
const getToken = () => {
  return document.cookie.match(/access_token=([^;]+)/)?.[1];
};

// Helper to remove tokens from cookies
const removeToken = () => {
  document.cookie = 'access_token=; path=/; Secure; SameSite=None; max-age=0;';
  document.cookie = 'refresh_token=; path=/; Secure; SameSite=None; max-age=0;';
};

// Signup method
const signup = async (userData) => {
  try {
    const response = await axios.post(`${API_URL}signup/`, userData);
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};

// Azure AD login method
const azureADLogin = async () => {
  try {
    // Trigger Azure AD login using MSAL
    const loginResponse = await msalInstance.loginPopup({
      scopes: ["User.Read"], // Add other necessary scopes
    });

    // Store the access token in cookies
    storeUserData(loginResponse.accessToken, "");

    return loginResponse; // You can return the login response or just the token if needed
  } catch (error) {
    throw error;  // Handle login error
  }
};

// Login method (now calls azureADLogin)
const login = async (credentials) => {
  // Call the Azure AD login flow
  return azureADLogin();
};

// Store user details and tokens
const storeUserData = (accessToken, refreshToken) => {
  document.cookie = `access_token=${accessToken}; path=/; Secure; SameSite=None; max-age=3600;`; // 1 hour
  document.cookie = `refresh_token=${refreshToken}; path=/; Secure; SameSite=None; max-age=604800;`; // 1 week
};

// Logout method
const logout = (navigate, from) => {
  removeToken();
  if (from && from === 'new') {
    navigate("/signup");
  } else {
    navigate("/home");
  }
};

// To check if the user is authenticated
const isAuthenticated = () => {
  const token = getToken();
  if (token) {
    const decodedToken = jwtDecode(token);
    return decodedToken.exp * 1000 > Date.now();
  }
  return false;
};

// Get user details from token
const getUserDetails = () => {
  const token = getToken();
  if (token) {
    const decodedToken = jwtDecode(token);
    if (decodedToken.exp * 1000 < Date.now()) {
      removeToken();
      return null;
    }
    return {
      user_id: decodedToken.user_id,
      email: decodedToken.email,
      first_name: decodedToken.first_name,
      last_name: decodedToken.last_name,
      user_name: decodedToken.username,
    };
  }
  return null;
};

export default {
  signup,
  login,
  logout,
  isAuthenticated,
  getUserDetails,
  getToken,
};
