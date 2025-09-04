import { logger } from './logger';

const STORAGE_KEY = 'urlShortenerData';

/**
 * Retrieves all data from localStorage.
 * @returns {Array} The array of URL objects or an empty array if none exist.
 */
export const getAllUrls = () => {
  try {
    const data = localStorage.getItem(STORAGE_KEY);
    return data ? JSON.parse(data) : [];
  } catch (error) {
    logger.log('Error getting data from localStorage', error);
    return [];
  }
};

/**
 * Saves a new array of URL objects to localStorage.
 * @param {Array} urls The array of URL objects to save.
 */
export const saveUrls = (urls) => {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(urls));
    logger.log('Data saved to localStorage', { urls });
  } catch (error) {
    logger.log('Error saving data to localStorage', error);
  }
};