import React, { useState } from "react";
import { useNavigate } from 'react-router-dom';
import { TextField, Button, Typography, Box } from "@mui/material";
import "./Login.css";
import authService from "../services/authService"

const Login = () => {
    const [formData, setFormData] = useState({ email: "", password: "" });
    const [errors, setErrors] = useState({ email: "", password: "" });
    const navigate = useNavigate();
    const validateForm = () => {
        let isValid = true;
        const newErrors = { email: "", password: "" };

        if (!formData.email) {
            newErrors.email = "Email is required";
            isValid = false;
        } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
            newErrors.email = "Invalid email format";
            isValid = false;
        }

        if (!formData.password) {
            newErrors.password = "Password is required";
            isValid = false;
        }

        setErrors(newErrors);
        return isValid;
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (validateForm()) {
            try{
                console.log(formData)
                const response=await authService.login(formData);
                navigate('/dashboard');
                console.log("Login Success", response.access_token);
            }catch(error){
                console.log("Error while Loggin In.")
            }
            // console.log("Login successful:", formData);
        }
    };

    return (
        <div className="login-container">
            <div className="login-card">
                <Typography variant="h5" gutterBottom align="center">
                    Login to Your Account
                </Typography>
                <Box
                    component="form"
                    noValidate
                    onSubmit={handleSubmit}
                    className="login-form"
                >
                    <TextField
                        label="Email"
                        name="email"
                        variant="outlined"
                        fullWidth
                        value={formData.email}
                        onChange={handleChange}
                        error={Boolean(errors.email)}
                        helperText={errors.email}
                    />
                    <TextField
                        label="Password"
                        name="password"
                        type="password"
                        variant="outlined"
                        fullWidth
                        value={formData.password}
                        onChange={handleChange}
                        error={Boolean(errors.password)}
                        helperText={errors.password}
                    />
                    <Button
                        type="submit"
                        variant="contained"
                        color="primary"
                        className="login-button"
                    >
                        Login
                    </Button>
                    <Typography variant="body2" align="center">
                        Don't have an account? <a href="/signup">Sign up</a>
                    </Typography>
                </Box>
            </div>
        </div>
    );
};

export default Login;
