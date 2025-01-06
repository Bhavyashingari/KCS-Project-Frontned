import React from "react";
import "./Navbar.css";
import header_logo from "../../assets/header_logo.avif"; 
import { Link, useNavigate } from "react-router-dom";
import { Tooltip } from "@mui/material";

const Navbar = () => {
    const navLinks = [
        { label: "Home", path: "/home", tooltip: "Navigate to KCS Home" },
        { label: "About", path: "/about", tooltip: "Learn About Us" },
        { label: "Contact", path: "/contact", tooltip: "Contact KCS Support" },
    ];

    const navigate = useNavigate();

    const handleLogoClick = () => {
        navigate("/home");
    };

    return (
        <div className="kcs-navbar-div">
            <div className="navbar-flex-div">
                <div className="left-logo">
                    <Tooltip title="Navigate to Home" placement="bottom" arrow>
                        <img
                            src={header_logo}
                            alt="KCS Logo"
                            onClick={handleLogoClick}
                        />
                    </Tooltip>
                </div>
            </div>
            <div className="navbar-links">
                <ul>
                    {navLinks.map((link, index) => (
                        <li key={index}>
                            <Tooltip
                                title={link.tooltip}
                                placement="bottom"
                                arrow
                                classes={{ tooltip: "custom-tooltip" }}
                            >
                                <Link to={link.path}>{link.label}</Link>
                            </Tooltip>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
};

export default Navbar;
