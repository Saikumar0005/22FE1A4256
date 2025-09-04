import React from 'react';
import { List, ListItem, ListItemText, Typography, Paper, IconButton, Tooltip, Box } from '@mui/material';
import AnalyticsIcon from '@mui/icons-material/Analytics';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import { logger } from '../utils/logger.js';
import { useNavigate } from 'react-router-dom';

const UrlList = ({ urls }) => {
  const navigate = useNavigate();

  if (urls.length === 0) {
    return (
      <Typography variant="body1" align="center" sx={{ mt: 4 }}>
        No shortened URLs yet.
      </Typography>
    );
  }
  
  const handleUrlClick = (shortCode) => {
    navigate(`/analytics/${shortCode}`);
  };

  const handleCopy = (shortCode) => {
    const urlToCopy = `${window.location.origin}/${shortCode}`;
    navigator.clipboard.writeText(urlToCopy).then(() => {
      logger.log('URL copied to clipboard', { shortCode });
      alert('URL copied to clipboard!');
    }).catch(err => {
      logger.log('Failed to copy URL to clipboard', { error: err });
      alert('Failed to copy URL.');
    });
  };

  return (
    <Paper elevation={3} sx={{ p: 4 }}>
      <Typography variant="h5" component="h2" gutterBottom>
        Your Shortened URLs
      </Typography>
      <List>
        {urls.map((url) => (
          <ListItem 
            key={url.id} 
            divider 
            secondaryAction={
              <Box sx={{ display: 'flex', gap: 1 }}>
                <Tooltip title="View Analytics">
                  <IconButton edge="end" aria-label="analytics" onClick={() => handleUrlClick(url.shortCode)}>
                    <AnalyticsIcon />
                  </IconButton>
                </Tooltip>
                <Tooltip title="Copy URL">
                  <IconButton edge="end" aria-label="copy" onClick={() => handleCopy(url.shortCode)}>
                    <ContentCopyIcon />
                  </IconButton>
                </Tooltip>
              </Box>
            }
          >
            <ListItemText
              primary={`/${url.shortCode}`}
              secondary={`Original: ${url.originalUrl}`}
            />
          </ListItem>
        ))}
      </List>
    </Paper>
  );
};

export default UrlList;
