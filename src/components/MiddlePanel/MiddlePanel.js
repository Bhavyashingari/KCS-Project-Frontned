import React from "react";
import "./MiddlePanel.css";
import { useState } from "react";
import AddIcon from '@mui/icons-material/Add';
import { ListSubheader, ListItemText, ListItem, List, IconButton } from "@mui/material";
import AddNewModal from "../AddNewModal/AddNewModal";

const MiddlePanel = () => {
    const [openDialog, setOpenDialog] = useState(false);  // State to control the dialog visibility
  
    const handleAddNew = () => {
      setOpenDialog(true);  // Open dialog when "Add New" is clicked
    };
  
    const handleCloseDialog = () => {
      setOpenDialog(false);  // Close dialog
    };
  
    return (
      <div className="middle-pane">
        <List className="add-upper-list">
          <ListItem className="add-to-list" sx={{ display: 'flex', justifyContent: 'flex-end', fontWeight: 'bold', fontSize: 18 }}>
            <IconButton className="add-button" onClick={handleAddNew}>
              <span style={{ fontSize: 15 }}>Add New</span>
              <AddIcon />
            </IconButton>
          </ListItem>
        </List>
        <List>
        </List>
  
        {/* AddNewModal dialog */}
        <AddNewModal open={openDialog} handleClose={handleCloseDialog} />
      </div>
    );
  };
  
  export default MiddlePanel;