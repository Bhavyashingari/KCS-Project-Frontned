import React, { useState, useEffect } from "react";
import { Dialog, DialogActions, DialogContent, DialogTitle, Button, TextField, Checkbox, FormControlLabel } from "@mui/material";
import authService from "../../services/authService";
import middlePanelService from "../../services/middlePanelService";
import { useToast } from "../Toast/ToastContext";

const AddNewModal = ({ open, handleClose }) => {
  const { showToast } = useToast();
  const [formData, setFormData] = useState({
    room_name: '',
    description: '',
    admin_user: '',  // Initially empty
    is_broadcast: false,  // Default to false
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
              admin_user: userDetails.user_name,  // Pre-populate admin field
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
      is_broadcast: e.target.checked,
    });
  };

  const validateForm = () => {
    if (formData.room_name.trim() === '') {
      setError('Room Name cannot be empty.');
      return false;
    }
    if (formData.room_name.trim().toLowerCase() === 'no room') {
      setError(`Room Cannot have a name "${formData.room_name}"`)
      return false;
    }
    setError('');
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validateForm()) {
      try {
        const response = await middlePanelService.createNewRoom(formData);
        console.log(response)
        handleClose();  // Close the dialog after submission
        window.location.reload();
      } catch (error) {
        showToast(`Err...${error.room_name}`, 'error');
      }
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
          id="room_name"
          label="Room Name"
          type="text"
          fullWidth
          variant="outlined"
          name="room_name"
          value={formData.room_name}
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
          id="admin_user"
          label="Admin"
          type="text"
          fullWidth
          variant="outlined"
          name="admin_user"
          value={formData.admin_user}
          disabled
        />

        {/* Checkbox for Broadcast Channel */}
        <FormControlLabel
          control={
            <Checkbox
              checked={formData.is_broadcast}
              onChange={handleCheckboxChange}
              name="is_broadcast"
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
