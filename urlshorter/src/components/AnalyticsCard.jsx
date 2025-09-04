import React from 'react';
import { Card, CardContent, Typography, Box } from '@mui/material';

const AnalyticsCard = ({ urlData }) => {
  if (!urlData) {
    return (
      <Typography variant="body1" align="center" sx={{ mt: 4 }}>
        Select a URL to view analytics.
      </Typography>
    );
  }

  return (
    <Card sx={{ mt: 4 }}>
      <CardContent>
        <Typography variant="h5" component="h3" gutterBottom>
          Analytics for: /{urlData.shortCode}
        </Typography>
        <Typography color="text.secondary">
          Original URL: {urlData.originalUrl}
        </Typography>
        <Box sx={{ mt: 2 }}>
          <Typography variant="body1">
            <strong>Clicks:</strong> {urlData.clickCount}
          </Typography>
          <Typography variant="body1">
            <strong>Created:</strong> {new Date(urlData.createdAt).toLocaleString()}
          </Typography>
          <Typography variant="body1">
            <strong>Expires:</strong> {urlData.expiresAt ? new Date(urlData.expiresAt).toLocaleString() : 'Never'}
          </Typography>
        </Box>
        {/* You will list detailed click history here */}
      </CardContent>
    </Card>
  );
};

export default AnalyticsCard;