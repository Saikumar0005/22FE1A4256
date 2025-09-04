import { useState, useEffect } from 'react';
import { logger } from '../utils/logger'; // Import the custom logger

/**
 * A custom hook to persist state in localStorage.
 * @param {string} key The key to use for localStorage.
 * @param {any} initialValue The initial value for the state.
 * @returns {[any, Function]} A tuple with the current state and a function to update it.
 */
function useLocalStorage(key, initialValue) {
  // Use a function to get the initial value from localStorage
  const [storedValue, setStoredValue] = useState(() => {
    try {
      const item = window.localStorage.getItem(key);
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      logger.log('Error reading from localStorage', { key, error });
      return initialValue;
    }
  });

  // useEffect to update localStorage whenever the state changes
  useEffect(() => {
    try {
      window.localStorage.setItem(key, JSON.stringify(storedValue));
      logger.log('State updated in localStorage', { key, value: storedValue });
    } catch (error) {
      logger.log('Error writing to localStorage', { key, error });
    }
  }, [key, storedValue]);

  return [storedValue, setStoredValue];
}

export default useLocalStorage;