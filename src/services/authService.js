import axios from 'axios';
import { jwtDecode } from "jwt-decode";

const API_URL = "http://127.0.0.1:8000/api/"; // Django API URL

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

// Login method
const login = async (credentials) => {
  try {
    const response = await axios.post(`${API_URL}login/`, credentials);
    storeUserData(response.data.access_token, response.data.refresh_token);
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};

// Store user details and tokens
const storeUserData = (accessToken, refreshToken) => {
  console.log(accessToken)
  document.cookie = `access_token=${accessToken}; path=/; Secure; SameSite=None; max-age=3600;`; // 1 hour
  document.cookie = `refresh_token=${refreshToken}; path=/; Secure; SameSite=None; max-age=604800;`; // 1 week
};

// Logout method
const logout = (navigate, from) => {
  removeToken();
  if (from && from === 'new') {
    navigate("/signup")
  }
  else {
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
