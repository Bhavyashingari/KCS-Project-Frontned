import React, { useState } from "react";
import { Box, IconButton, Menu, MenuItem, Tooltip } from "@mui/material";
import AccountBoxIcon from "@mui/icons-material/AccountBox";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import SettingsIcon from '@mui/icons-material/Settings';
import SupportAgentIcon from "@mui/icons-material/SupportAgent";
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import PolicyIcon from '@mui/icons-material/Policy';
import LaunchIcon from '@mui/icons-material/Launch';
import HelpIcon from '@mui/icons-material/Help';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import "./DashboardNavbar.css";
import authService from "../../services/authService";
import { useNavigate } from "react-router-dom";
import toTitleCase from "../../_utils_/commonFunctions";

const DashboardNavbar = ({ userDetails }) => {
  const navigate = useNavigate();

  // States for each menu
  const [accountMenuAnchorEl, setAccountMenuAnchorEl] = useState(null);
  const [moreMenuAnchorEl, setMoreMenuAnchorEl] = useState(null);

  // Handlers for account menu
  const handleAccountMenuOpen = (event) => {
    setAccountMenuAnchorEl(event.currentTarget);
  };

  const handleAccountMenuClose = () => {
    setAccountMenuAnchorEl(null);
  };

  // Handlers for more actions menu
  const handleMoreMenuOpen = (event) => {
    setMoreMenuAnchorEl(event.currentTarget);
  };

  const handleMoreMenuClose = () => {
    setMoreMenuAnchorEl(null);
  };

  // Action handlers
  const handleLogoutClick = () => {
    authService.logout(navigate);
    setAccountMenuAnchorEl(null);
  };

  const handleSettingsClick = () => {
    setAccountMenuAnchorEl(null);
  };

  const handlePassChangeClick = () => {
    setAccountMenuAnchorEl(null);
  };

  const handleProfileClick = () => {
    setAccountMenuAnchorEl(null);
  };

  const handlePolicyView = () => {

  }

  const handleViewAccount = () => {

  }

  const handleCreateOtherAccount = () => {
    authService.logout(navigate, 'new');
  }

  return (
    <div className="main-dashboard-nav">
      <div className="dash-left-logo">
        <p>KCS</p>
      </div>
      <div className="account-settings">
        {/* More Actions Icon with dropdown */}
        <Tooltip title="More Actions">
          <IconButton
            onClick={handleMoreMenuOpen}
            sx={{
              color: "white", '&:hover': {
                color: '#90A4AE', // Light gray for hover effect
              },
            }}
          >
            <MoreHorizIcon />
          </IconButton>
        </Tooltip>
        <Menu
          anchorEl={moreMenuAnchorEl}
          open={Boolean(moreMenuAnchorEl)}
          onClose={handleMoreMenuClose}
          PaperProps={{
            sx: { padding: 0, margin: 0 },
          }}
        >
          <MenuItem onClick={handleSettingsClick} sx={{ maxHeight: 40 }}>
            <SettingsIcon sx={{ marginRight: 2 }} />
            Settings
          </MenuItem>
          <MenuItem onClick={handlePassChangeClick} sx={{ maxHeight: 40 }}>
            <SupportAgentIcon sx={{ marginRight: 2 }} />
            Contact Support
          </MenuItem>
          <MenuItem onClick={handlePolicyView} sx={{ maxHeight: 40 }}>
            <PolicyIcon sx={{ marginRight: 2 }} />
            Usage Policy
          </MenuItem>
        </Menu>

        {/* Account Box Icon with dropdown */}
        <Tooltip title="Account Settings">
          <IconButton
            onClick={handleAccountMenuOpen}
            sx={{
              color: "white", '&:hover': {
                color: '#90A4AE', // Light gray for hover effect
              },
            }}
          >
            <AccountBoxIcon />
          </IconButton>
        </Tooltip>
        <Menu
          anchorEl={accountMenuAnchorEl}
          open={Boolean(accountMenuAnchorEl)}
          onClose={handleAccountMenuClose}
          PaperProps={{
            sx: { minWidth: 300 }, // Set minimum width for the menu
          }}
        >
          {/* First group of menu items */}
          <Box sx={{ padding: 1, borderBottom: "1px solid #ccc" }}>
            <div className="box-flex">
              <div className="box-flex-upper">
                <span id="org-name">{"kcs".toUpperCase()}</span>
                <span onClick={handleLogoutClick} id="logout">Sign Out</span>
              </div>
              <div className="account-info-flex">
                <div className="profile-logo">
                  <AccountCircleIcon sx={{ fontSize: 80 }}></AccountCircleIcon>
                </div>
                <div className="profile-info">
                  <p style={{ fontWeight: 'bold', fontSize: 16 }}>{toTitleCase(userDetails.first_name)}{" "}{toTitleCase(userDetails.last_name)}</p>
                  <p style={{ fontSize: 12 }}>{userDetails.email}</p>
                  <p id="view-account" onClick={handleViewAccount} style={{ fontSize: 12, display: 'flex', alignItems: 'center', gap: 4 }}>View Account
                    <LaunchIcon sx={{ fontSize: 12 }} />
                  </p>
                </div>
              </div>
            </div>
            <MenuItem disabled></MenuItem>
          </Box>

          {/* Second group of menu items */}
          <MenuItem onClick={handleCreateOtherAccount}>
            <PersonAddIcon sx={{ marginRight: 2, padding: 1 }} />
            Create Other Account
          </MenuItem>
          <MenuItem onClick={handleLogoutClick} sx={{}}>
            <HelpIcon sx={{ marginRight: 2, padding: 1 }} />
            Help
          </MenuItem>
        </Menu>
      </div>
    </div>
  );
};

export default DashboardNavbar;
