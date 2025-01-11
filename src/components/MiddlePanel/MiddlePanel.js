import React, { useState, useEffect } from "react";
import "./MiddlePanel.css";
import AddIcon from "@mui/icons-material/Add";
import {
  ListItem,
  List,
  IconButton,
  ListItemText,
  ListItemButton,
  Typography,
  Tooltip,
} from "@mui/material";
import AddNewModal from "../AddNewModal/AddNewModal";
import middlePanelService from "../../services/middlePanelService";
import authService from "../../services/authService";
import { useToast } from "../Toast/ToastContext";


const MiddlePanel = ({ onSendData }) => {
  const { showToast } = useToast();
  const [openDialog, setOpenDialog] = useState(false); // State to control the dialog visibility
  const [rooms, setRooms] = useState([]); // Initialize rooms as an empty array
  const [selectedRoom, setSelectedRoom] = useState(null); // Track the selected room

  // Function to format timestamp
  const formatTimestamp = (timestamp) => {
    const date = new Date(timestamp);
    const options = {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit"
    };
    return date.toLocaleString("en-GB", options).replace(",", "");
  };

  // Function to fetch user rooms
  const fetchUserRooms = async () => {
    try {
      const fetchUserDetails = await authService.getUserDetails(); // Fetch user details
      const response = await middlePanelService.getUserRooms(
        fetchUserDetails.user_id
      ); // Fetch rooms based on user_id

      // Log the response to verify the structure
      console.log("API response:", response);

      // Directly use response if it's already an array
      if (Array.isArray(response)) {
        setRooms(response); // Set the fetched rooms to state
      } else {
        setRooms([]); // Set an empty array if the data is not valid
      }
    } catch (error) {
      console.error("Error fetching rooms:", error);
      setRooms([]); // Set an empty array in case of error
    }
  };

  // Call fetchUserRooms when the component mounts
  useEffect(() => {
    fetchUserRooms();
  }, []);

  const handleAddNew = () => {
    setOpenDialog(true); // Open dialog when "Add New" is clicked
  };

  const handleCloseDialog = () => {
    setOpenDialog(false); // Close dialog
  };

  // Handle click event on a room
  const handleRoomClick = (room) => {
    setSelectedRoom(room); // Set the selected room
    if (onSendData) {
      onSendData(room);
    }
  };

  return (
    <div className="middle-pane">
      <List className="add-upper-list">
        <ListItem
          className="add-to-list"
          sx={{
            display: "flex",
            justifyContent: "flex-end",
            fontWeight: "bold",
            fontSize: 18,
          }}
        >
          <IconButton
            className="add-button"
            onClick={handleAddNew}
            disableRipple="true"
            disableTouchRipple="true"
            disableFocusRipple="true"
          >
            <span style={{ fontSize: 15 }}>Add New</span>
            <AddIcon />
          </IconButton>
        </ListItem>
      </List>

      {/* Dynamically display rooms */}
      <List className="user-groups">
        {rooms.length > 0 ? (
          rooms.map((room, index) => (
            <Tooltip title={room.is_broadcast? `${room.room_name} (Only Admin)`: `${room.room_name}`} placement="right">
              <ListItemButton
                className={`group-item ${selectedRoom === room ? "selected" : ""
                  }`} // Add 'selected' class to the clicked room
                key={index}
                onClick={() => handleRoomClick(room)} // Handle click event
                selected={selectedRoom === room} // Apply 'selected' prop from ListItemButton
                sx={{
                  marginBottom: "10px",
                  height: "100px",
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "flex-start",
                  justifyContent: "space-between",
                  padding: "16px",
                  boxShadow:
                    selectedRoom === room
                      ? "0px 2px 6px rgba(0, 0, 0, 0.2)"
                      : "none",
                }}
              >
                <Typography variant="h6" sx={{ fontWeight: "bold", fontSize: '16px' }}>
                  {room.room_name}
                  {room.is_broadcast && (
                    <span style={{ fontSize: '11px', color: 'gray', marginLeft: '8px' }}>(Broadcast)</span>
                  )}
                </Typography>

                <Typography
                  variant="body2"
                  sx={{ color: "gray", fontSize: "11px" }}
                >
                  {room.created_at
                    ? formatTimestamp(room.created_at)
                    : "Unknown date"}
                </Typography>
              </ListItemButton>
            </Tooltip>
          ))
        ) : (
          <ListItem className="group-item">
            <ListItemText primary="No rooms available" />
          </ListItem>
        )}
      </List>

      {/* AddNewModal dialog */}
      <AddNewModal open={openDialog} handleClose={handleCloseDialog} />
    </div>
  );
};

export default MiddlePanel;
