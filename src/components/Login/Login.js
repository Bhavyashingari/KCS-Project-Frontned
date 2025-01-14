import React, { useState } from "react";
import { useNavigate } from 'react-router-dom';
import { TextField, Button, Typography, Box } from "@mui/material";
import { useMsal } from '@azure/msal-react';  // Import MSAL hooks
import { useToast } from "../Toast/ToastContext";
import "./Login.css";


const Login = () => {
  const { showToast } = useToast();
  const navigate = useNavigate();
  const { instance } = useMsal();  // Get the MSAL instance
  const [errorMessage, setErrorMessage] = useState('');

  // Handle Azure AD login
  const handleLogin = async () => {
    try {
      // Trigger the Azure AD login flow using the popup
      const loginResponse = await instance.loginPopup({
        scopes: ["User.Read"],  // Permissions you need (can be adjusted based on your needs)
      });

      console.log("Login Successful:", loginResponse);
      
      // Save the access token or ID token to local storage
      localStorage.setItem("accessToken", loginResponse.accessToken);

      // Redirect to the dashboard after successful login
      navigate(`/dashboard?user_id=${loginResponse.account.homeAccountId}`);
    } catch (error) {
      console.error("Login error:", error);
      setErrorMessage('Login failed. Please try again.');
      showToast('Error during login', 'error');
    }
  };

  return (
    <div className="login-container">
      <div className="login-card">
        <Typography variant="h5" gutterBottom align="center">
          Login to Your Account
        </Typography>
        <Box component="form" noValidate onSubmit={(e) => e.preventDefault()} className="login-form">
          <Button
            type="button"
            variant="contained"
            color="primary"
            className="login-button"
            onClick={handleLogin}  // Trigger MSAL login
          >
            Login with Azure AD
          </Button>
          {errorMessage && (
            <span style={{ color: 'red', display: 'block', marginBottom: '10px', fontSize: '12px' }}>
              {errorMessage}
            </span>
          )}
          <Typography variant="body2" align="center">
            Don't have an account? <a href="/signup">Sign up</a>
          </Typography>
        </Box>
      </div>
    </div>
  );
};

export default Login;
