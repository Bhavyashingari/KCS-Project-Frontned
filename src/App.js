// import logo from './logo.svg';
import './App.css';
// import Router from './routes'
import { BrowserRouter } from "react-router-dom";
import AppRoutes from "./routes"; // Update the path if needed
import { ThemeProvider, createTheme } from "@mui/material/styles";
import { ToastProvider } from './components/Toast/ToastContext';

const theme = createTheme({
  components: {
    MuiTooltip: {
      styleOverrides: {
        tooltip: {
          backgroundColor: "rgba(0, 0, 0, 0.9)", // Solid background color
          color: "white", // White text color
          fontWeight: "bold", // Bold text
          borderRadius: "4px", // Rounded corners
          padding: "8px 12px", // Padding for better visibility
        },
        arrow: {
          color: "rgba(0, 0, 0, 0.9)", // Match the arrow color with tooltip background
        },
      },
    },
  },
});

function App() {
  return (
    <ThemeProvider theme={theme}>
      <BrowserRouter>
        <ToastProvider>
          <AppRoutes />
        </ToastProvider>
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;
