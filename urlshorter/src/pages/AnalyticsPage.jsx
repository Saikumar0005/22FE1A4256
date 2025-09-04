import React from 'react';
import { useParams } from 'react-router-dom';
import { Container, Box, Typography } from '@mui/material';
import Header from '../components/Header';
import AnalyticsCard from '../components/AnalyticsCard';
import useLocalStorage from '../hooks/useLocalStorage';

const AnalyticsPage = () => {
  const { shortCode } = useParams();
  const [urls] = useLocalStorage('urls', []);
  const urlData = urls.find(url => url.shortCode === shortCode);

  return (
    <Box sx={{ bgcolor: '#f0f2f5', minHeight: '100vh' }}>
      <Header />
      <Container sx={{ py: 4 }}>
        {urlData ? (
          <AnalyticsCard urlData={urlData} />
        ) : (
          <Typography variant="h6" align="center">
            Analytics for this URL could not be found.
          </Typography>
        )}
      </Container>
    </Box>
  );
};

export default AnalyticsPage;