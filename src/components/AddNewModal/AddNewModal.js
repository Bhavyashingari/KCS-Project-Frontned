import React, { useState, useEffect } from "react";
import { Dialog, DialogActions, DialogContent, DialogTitle, Button, TextField, Checkbox, FormControlLabel } from "@mui/material";
import authService from "../../services/authService";
import middlePanelService from "../../services/middlePanelService";

const AddNewModal = ({ open, handleClose }) => {
  const [formData, setFormData] = useState({
    roomName: '',
    description: '',
    adminId: '',  // Initially empty
    isBroadcast: false,  // Default to false
  });

  const [error, setError] = useState('');

  // Fetch user details when modal opens
  useEffect(() => {
    const fetchUserDetails = async () => {
      if (open) {
        try {
          const userDetails = await authService.getUserDetails();
          if (userDetails) {
            setFormData((prevData) => ({
              ...prevData,
              adminId: userDetails.user_name,  // Pre-populate admin field
            }));
          }
        } catch (error) {
          console.error("Error fetching user details:", error);
        }
      }
    };

    fetchUserDetails();
  }, [open]);  // Run only when the modal opens

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleCheckboxChange = (e) => {
    setFormData({
      ...formData,
      isBroadcast: e.target.checked,
    });
  };

  const validateForm = () => {
    if (formData.roomName.trim() === '') {
      setError('Room Name cannot be empty.');
      return false;
    }
    setError('');
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validateForm()) {
      const response=await middlePanelService.createNewRoom(formData);
      handleClose();  // Close the dialog after submission
    }
  };

  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle>Create New Room</DialogTitle>
      <DialogContent>
        {/* Room Name */}
        <TextField
          autoFocus
          margin="dense"
          id="roomName"
          label="Room Name"
          type="text"
          fullWidth
          variant="outlined"
          name="roomName"
          value={formData.roomName}
          onChange={handleInputChange}
          error={!!error}  // Show error if room name is empty
          helperText={error}  // Display error message
        />

        {/* Description */}
        <TextField
          margin="dense"
          id="description"
          label="Description"
          type="text"
          fullWidth
          variant="outlined"
          name="description"
          value={formData.description}
          onChange={handleInputChange}
        />

        {/* Admin (disabled, pre-filled with current user ID) */}
        <TextField
          margin="dense"
          id="adminId"
          label="Admin"
          type="text"
          fullWidth
          variant="outlined"
          name="adminId"
          value={formData.adminId}
          disabled
        />

        {/* Checkbox for Broadcast Channel */}
        <FormControlLabel
          control={
            <Checkbox
              checked={formData.isBroadcast}
              onChange={handleCheckboxChange}
              name="isBroadcast"
              color="primary"
            />
          }
          label="Make this a Broadcast Channel"
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} color="primary">
          Cancel
        </Button>
        <Button onClick={handleSubmit} color="primary">
          Submit
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default AddNewModal;
