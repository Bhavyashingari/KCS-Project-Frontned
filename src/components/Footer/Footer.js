import React from "react";
import kcs_logo from '../../assets/kcs_logo.jpg';
import "./Footer.css";
import { Link } from "react-router-dom";
import { Tooltip } from "@mui/material";

const footerLinks = [
    { text: "Home", path: "/" },
    { text: "About", path: "/about" },
    { text: "Services", path: "/services" },
    { text: "Contact", path: "/contact" },
    { text: "FAQ", path: "/faq" },
    { text: "Support", path: "/support" },
];

const Footer = () => {
    return (
        <div className="outer">
            <div className="kcs-footer-outer">
                <div className="kcs-footer-content">
                    {/* Left section: Logo */}
                    <div className="footer-logo">
                        <img
                            src={kcs_logo}
                            alt="KCS Logo"
                            title="Click to go to homepage"
                        />
                        <div className="footer-logo-text">
                            <p>Krishna Consciousness Society.</p>
                            <p>Ghar Aangan Flats, nearby muhana Mandi, Kiron Ki Dhani, Jaipur 302029, Rajasthan, India.</p>
                        </div>
                    </div>

                    {/* Right section: Contact and Links */}
                    <div className="footer-contact">
                        <div className="contact" title="Company Address">
                            Contact Us
                        </div>
                        <div className="contact-info" title="Phone and Email">
                            <p>Phone - +91 7077054958</p>
                            <p>Email - support@krishnaconsciousnesssociety.com</p>
                        </div>

                        <div className="footer-links">
                            <ul>
                                {footerLinks.map((link) => (
                                    <li key={link.text}>
                                        <Tooltip title={`Go to ${link.text}`}
                                        placement="right"
                                        arrow
                                        classes={{tooltip: "custom-tooltip"}}>
                                            <Link to={link.path}>
                                                {link.text}
                                            </Link>
                                        </Tooltip>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
            <div className="footer-copyright">
                © {new Date().getFullYear()} All Rights reserved and secured by <a href="https://www.krishnaconsciousnesssociety.com/" target="_blank">Krishna Consciousness Society.</a>
            </div>
        </div>
    );
};

export default Footer;
