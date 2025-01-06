import React, { useState } from "react";
import { TextField, Button, Typography, Box } from "@mui/material";
import "./Signup.css";
import Navbar from "../Navbar/Navbar";
import authService from "../services/authService";
import { useNavigate } from 'react-router-dom';
import { useToast } from "../Toast/ToastContext";

const Signup = () => {
    const { showToast } = useToast();
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        first_name: "",
        last_name: "",
        email: "",
        password: "",
        confirmPassword: "",
    });

    const [errors, setErrors] = useState({
        first_name: "",
        last_name: "",
        email: "",
        password: "",
        confirmPassword: "",
    });

    const validateForm = () => {
        let isValid = true;
        const newErrors = { ...errors };

        if (!formData.first_name.trim()) {
            newErrors.first_name = "First name is required";
            isValid = false;
        }

        if (!formData.last_name.trim()) {
            newErrors.last_name = "Last name is required";
            isValid = false;
        }

        if (!formData.email) {
            newErrors.email = "Email is required";
            isValid = false;
        } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
            newErrors.email = "Invalid email address";
            isValid = false;
        }

        if (!formData.password) {
            newErrors.password = "Password is required";
            isValid = false;
        } else if (formData.password.length < 6) {
            newErrors.password = "Password must be at least 6 characters long";
            isValid = false;
        }

        if (!formData.confirmPassword) {
            newErrors.confirmPassword = "Confirm password is required";
            isValid = false;
        } else if (formData.password !== formData.confirmPassword) {
            newErrors.confirmPassword = "Passwords do not match";
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
            try {
                const response = await authService.signup(formData);
                showToast('User created successfully!', 'success');
                setTimeout(() => {
                    navigate('/home');
                }, 2000);
            } catch (error) {
                console.error(error);
            }
            // console.log("Signup successful:", formData);
        }
    };

    return (
        <div className="outer">
            <Navbar />
            <div className="signup-container">
                <div className="signup-card">
                    <Typography variant="h5" gutterBottom align="center">
                        Register To KCS
                    </Typography>
                    <Box
                        component="form"
                        noValidate
                        onSubmit={handleSubmit}
                        className="signup-form"
                    >
                        <TextField
                            label="First Name"
                            name="first_name"
                            variant="outlined"
                            fullWidth
                            value={formData.first_name}
                            onChange={handleChange}
                            error={Boolean(errors.first_name)}
                            helperText={errors.first_name}
                        />
                        <TextField
                            label="Last Name"
                            name="last_name"
                            variant="outlined"
                            fullWidth
                            value={formData.last_name}
                            onChange={handleChange}
                            error={Boolean(errors.last_name)}
                            helperText={errors.last_name}
                        />
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
                        <TextField
                            label="Confirm Password"
                            name="confirmPassword"
                            type="password"
                            variant="outlined"
                            fullWidth
                            value={formData.confirmPassword}
                            onChange={handleChange}
                            error={Boolean(errors.confirmPassword)}
                            helperText={errors.confirmPassword}
                        />
                        <Button
                            type="submit"
                            variant="contained"
                            color="primary"
                            className="signup-button"
                        >
                            Sign Up
                        </Button>
                        <Typography variant="body2" align="center">
                            Already have an account? <a href="/">Login</a>
                        </Typography>
                    </Box>
                </div>
            </div>
        </div>
    );
};

export default Signup;
