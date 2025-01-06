import axios from "axios";

const API_URL = "http://127.0.0.1:8000/api/"; // Django API URL

// Helper to get the token from localStorage
const getToken = () => {
  return localStorage.getItem("token");
};



// Helper to remove the token from localStorage
const removeToken = () => {
  localStorage.removeItem("token");
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
    // setToken(token); // Save token in localStorage
    setTokensInCookies(response.data.access_token, response.data.refresh_token);
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};

const setTokensInCookies = (accessToken, refreshToken) => {
  console.log('inside', accessToken, refreshToken);
  document.cookie = `access_token=${accessToken}; path=/; Secure; SameSite=None; max-age=3600;`;  // 1 hour
  document.cookie = `refresh_token=${refreshToken}; path=/; Secure; SameSite=None; max-age=3600*24*7;`;  // 1 week
}

// Logout method
const logout = () => {
  removeToken(); // Remove token from localStorage
};

// To check if the user is authenticated (e.g., check token validity)
const isAuthenticated = () => {
  const token = getToken();
  return token != null; // You can add additional checks like token expiry here
};

// Helper to get axios instance with token attached in headers
const getAxiosInstance = () => {
  const token = getToken();
  return axios.create({
    baseURL: API_URL,
    headers: {
      Authorization: token ? `Bearer ${token}` : ""
    }
  });
};

export default {
  signup,
  login,
  logout,
  isAuthenticated,
  getAxiosInstance,
};