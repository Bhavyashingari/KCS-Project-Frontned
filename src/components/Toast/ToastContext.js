import React, { createContext, useState, useContext } from 'react';
import { Snackbar, Alert } from '@mui/material';

// Create a context for the toast
const ToastContext = createContext();

// Create a provider component
export const ToastProvider = ({ children }) => {
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState('');
  const [severity, setSeverity] = useState('success'); // 'success', 'error', 'info', 'warning'

  const showToast = (msg, sev = 'success') => {
    setMessage(msg);
    setSeverity(sev);
    setOpen(true);
  };

  const hideToast = (event, reason) => {
    if (reason === 'clickaway') {
      return; // Prevent closing on clickaway if desired
    }
    setOpen(false); // Close the toast
  };

  return (
    <ToastContext.Provider value={{ showToast, hideToast }}>
      {children}
      <Snackbar
        open={open}
        autoHideDuration={5000} // 5 seconds
        onClose={hideToast}
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
      >
        <Alert onClose={hideToast} severity={severity} sx={{ width: '100%' }}>
          {message}
        </Alert>
      </Snackbar>
    </ToastContext.Provider>
  );
};

// Custom hook to use the toast context
export const useToast = () => {
  return useContext(ToastContext);
};
