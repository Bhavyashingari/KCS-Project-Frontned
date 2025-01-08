import React from "react";
import "./LeftPanel.css";
import { IconButton } from "@mui/material";
import NotificationsIcon from '@mui/icons-material/Notifications';
import GroupsIcon from '@mui/icons-material/Groups';
import ChatIcon from '@mui/icons-material/Chat';
import CallIcon from '@mui/icons-material/Call';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';

const LeftPanel = () => {
    return (
        <div className="left-pane">
            <IconButton sx={{
                display: 'flex', flexDirection: 'column', color: 'white', '&:hover': {
                    color: '#90A4AE', // Light gray for hover effect
                },
            }}>
                <NotificationsIcon sx={{ fontSize: 24 }} />
                <span style={{ fontSize: 10 }}>Alerts</span>
            </IconButton>
            <IconButton sx={{
                display: 'flex', flexDirection: 'column', color: 'white', '&:hover': {
                    color: '#90A4AE', // Light gray for hover effect
                },
            }}>
                <ChatIcon sx={{ fontSize: 24 }} />
                <span style={{ fontSize: 10 }}>Chats</span>
            </IconButton>
            <IconButton sx={{
                display: 'flex', flexDirection: 'column', color: 'white', '&:hover': {
                    color: '#90A4AE', // Light gray for hover effect
                },
            }}>
                <GroupsIcon sx={{ fontSize: 24 }} />
                <span style={{ fontSize: 10 }}>Groups</span>
            </IconButton>
            <IconButton sx={{
                display: 'flex', flexDirection: 'column', color: 'white', '&:hover': {
                    color: '#90A4AE', // Light gray for hover effect
                },
            }}>
                <CalendarMonthIcon sx={{ fontSize: 24 }} />
                <span style={{ fontSize: 10 }}>Calendar</span>
            </IconButton>
            <IconButton sx={{
                display: 'flex', flexDirection: 'column', color: 'white', '&:hover': {
                    color: '#90A4AE', // Light gray for hover effect
                },
            }}>
                <CallIcon sx={{ fontSize: 24 }} />
                <span style={{ fontSize: 10 }}>Calls</span>
            </IconButton>
        </div>
    );
}

export default LeftPanel;