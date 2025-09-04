import React, { useState } from 'react';
import { TextField, Button, Box, Paper, Typography } from '@mui/material';

const UrlForm = ({ onShorten }) => {
  const [longUrl, setLongUrl] = useState('');
  const [customCode, setCustomCode] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!longUrl) {
      setError('Please enter a URL.');
      return;
    }
    // Call the parent function to handle the shortening logic
    onShorten({ longUrl, customCode });
    setLongUrl('');
    setCustomCode('');
    setError('');
  };

  return (
    <Paper elevation={3} sx={{ p: 4, mb: 4 }}>
      <Typography variant="h5" component="h2" gutterBottom>
        Shorten a URL
      </Typography>
      <Box component="form" onSubmit={handleSubmit} sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
        <TextField
          label="Enter your long URL"
          variant="outlined"
          fullWidth
          value={longUrl}
          onChange={(e) => setLongUrl(e.target.value)}
          error={!!error}
          helperText={error}
        />
        <TextField
          label="Custom shortcode (optional)"
          variant="outlined"
          fullWidth
          value={customCode}
          onChange={(e) => setCustomCode(e.target.value)}
        />
        <Button type="submit" variant="contained" size="large">
          Shorten
        </Button>
      </Box>
    </Paper>
  );
};

export default UrlForm;