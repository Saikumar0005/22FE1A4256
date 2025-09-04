import React, { useState } from 'react';
import { Container, Box, Snackbar, Alert } from '@mui/material';
import Header from '../components/Header';
import UrlForm from '../components/UrlForm';
import UrlList from '../components/UrlList';
import useLocalStorage from '../hooks/useLocalStorage';
import { validateUrl } from '../utils/validation.js';
import { logger } from '../utils/logger.js';
import { nanoid } from 'nanoid';

const HomePage = () => {
  const [urls, setUrls] = useLocalStorage('urls', []);
  const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'info' });

  const handleShorten = ({ longUrl, customCode }) => {
    if (!validateUrl(longUrl)) {
      logger.log('Invalid URL entered', { url: longUrl });
      setSnackbar({ open: true, message: 'Please enter a valid URL.', severity: 'error' });
      return;
    }

    const shortCode = customCode || nanoid(7);
    const existingUrl = urls.find(url => url.shortCode === shortCode);

    if (existingUrl) {
      logger.log('Custom code collision', { shortCode });
      setSnackbar({ open: true, message: 'This shortcode is already in use. Please choose another one.', severity: 'error' });
      return;
    }

    const newUrl = {
      id: nanoid(),
      originalUrl: longUrl,
      shortCode,
      createdAt: new Date().toISOString(),
      clickCount: 0,
      clickHistory: [],
    };

    setUrls([...urls, newUrl]);
    logger.log('New URL shortened', newUrl);
    setSnackbar({ open: true, message: 'URL shortened successfully!', severity: 'success' });
  };
  
  const handleCloseSnackbar = () => {
    setSnackbar({ ...snackbar, open: false });
  };

  return (
    <Box sx={{ bgcolor: '#f0f2f5', minHeight: '100vh' }}>
      <Header />
      <Container sx={{ py: 4 }}>
        <UrlForm onShorten={handleShorten} />
        <UrlList urls={urls} />
        <Snackbar open={snackbar.open} autoHideDuration={6000} onClose={handleCloseSnackbar}>
          <Alert onClose={handleCloseSnackbar} severity={snackbar.severity} sx={{ width: '100%' }}>
            {snackbar.message}
          </Alert>
        </Snackbar>
      </Container>
    </Box>
  );
};

export default HomePage;