import React, { useState, useEffect } from "react";
import "./RightPanelNavbar.css";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { IconButton, Menu, MenuItem } from "@mui/material";
import authService from "../../services/authService";
import { Tooltip } from "@mui/material";


const RightPanelNavbar = ({ data }) => {
    const [anchorEl, setAnchorEl] = useState(null); // State to control menu visibility
    const open = Boolean(anchorEl);
    const [currentUser, setCurrentUser] = useState(null);

    // Fetch current user details from auth service
    const fetchCurrentUser = async () => {
        try {
            const userDetails = await authService.getUserDetails();
            console.log("userDetails", userDetails); // Log to check the user details
            setCurrentUser(userDetails);
        } catch (error) {
            console.error("Error fetching user details", error);
        }
    };

    // Run the effect only once when the component mounts
    useEffect(() => {
        fetchCurrentUser();
    }, []);  // Empty dependency array to trigger only once on mount

    // Handle menu open
    const handleMenuOpen = (event) => {
        setAnchorEl(event.currentTarget);
    };

    // Handle menu close
    const handleMenuClose = () => {
        setAnchorEl(null);
    };

    // Check if user is the admin
    const isUserAdmin = currentUser?.user_id === data?.admin_user;

    console.log("currentUser?.user_id:", currentUser?.user_id); // Log user_id
    console.log("data?.admin_user:", data?.admin_user); // Log admin_user

    return (
        <div className="right-panel-nav-main">
            <div className="room-name">
                {data && data.room_name !== "No Room" && (
                    <p>{data.room_name}</p>
                )}
            </div>

            {/* Show button only if room_name is not "No Room" */}
            {data && data.room_name !== "No Room" && (
                <div className="button">
                    <Tooltip title={data.room_name + " settings"}>
                        <IconButton onClick={handleMenuOpen}>
                            <MoreVertIcon />
                        </IconButton>
                    </Tooltip>
                    {/* Menu Component */}
                    <Menu
                        anchorEl={anchorEl}
                        open={open}
                        onClose={handleMenuClose}
                        PaperProps={{
                            sx: { minWidth: 150 }, // Set minimum width for the menu
                          }}
                        anchorOrigin={{
                            vertical: "bottom",
                            horizontal: "right",
                        }}
                        transformOrigin={{
                            vertical: "top",
                            horizontal: "right",
                        }}
                    >
                        <Tooltip title={!isUserAdmin ? "Only Admin Access" : "Settings"}>
                            <MenuItem
                                onClick={handleMenuClose}
                                disabled={!isUserAdmin}  // Disable if currentUser is the admin
                            >
                                Settings
                            </MenuItem>
                        </Tooltip>
                        <MenuItem onClick={handleMenuClose}>Option 2</MenuItem>
                        <MenuItem onClick={handleMenuClose}>Option 3</MenuItem>
                    </Menu>
                </div>
            )}
        </div>
    );
};

export default RightPanelNavbar;
