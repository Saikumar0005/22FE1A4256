import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';

// Import the page components
import HomePage from './pages/HomePage.jsx';
import RedirectPage from './pages/RedirectPage.jsx';
import AnalyticsPage from './pages/AnalyticsPage.jsx';

// Create a custom Material UI theme
const theme = createTheme({
  palette: {
    primary: {
      main: '#1976d2',
    },
    secondary: {
      main: '#dc004e',
    },
    background: {
      default: '#f4f6f8',
    },
  },
  typography: {
    fontFamily: [
      'Inter',
      '-apple-system',
      'BlinkMacSystemFont',
      '"Segoe UI"',
      'Roboto',
      '"Helvetica Neue"',
      'Arial',
      'sans-serif',
      '"Apple Color Emoji"',
      '"Segoe UI Emoji"',
      '"Segoe UI Symbol"',
    ].join(','),
  },
});

const App = () => {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/:shortCode" element={<RedirectPage />} />
        <Route path="/analytics/:shortCode" element={<AnalyticsPage />} />
        {/* Add a catch-all route for 404 pages */}
        <Route path="*" element={<div><h1>404: Page Not Found</h1></div>} />
      </Routes>
    </ThemeProvider>
  );
};

export default App;
