import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import useLocalStorage from '../hooks/useLocalStorage';
import { logger } from '../utils/logger';

const RedirectPage = () => {
  const { shortCode } = useParams();
  const [urls, setUrls] = useLocalStorage('urls', []);

  useEffect(() => {
    const urlEntry = urls.find(url => url.shortCode === shortCode);

    if (urlEntry) {
      // Update analytics
      const updatedUrls = urls.map(url =>
        url.shortCode === shortCode
          ? {
              ...url,
              clickCount: url.clickCount + 1,
              clickHistory: [...url.clickHistory, { timestamp: new Date().toISOString() }],
            }
          : url
      );
      setUrls(updatedUrls);
      logger.log('Redirecting to URL', { shortCode, originalUrl: urlEntry.originalUrl });
      window.location.replace(urlEntry.originalUrl);
    } else {
      logger.log('Shortcode not found', { shortCode });
      alert('The URL you are looking for does not exist.');
      // You could also navigate to a 404 page
    }
  }, [shortCode, urls, setUrls]);

  return (
    <div>
      <p>Redirecting...</p>
    </div>
  );
};

export default RedirectPage;