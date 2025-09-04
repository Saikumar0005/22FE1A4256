/**
 * Validates a given URL.
 * @param {string} url The URL string to validate.
 * @returns {boolean} True if the URL is valid, false otherwise.
 */
export const validateUrl = (url) => {
  try {
    new URL(url);
    return true;
  } catch (e) {
    return false;
  }
};

/**
 * Validates a custom shortcode.
 * Checks if it's alphanumeric and meets length requirements.
 * @param {string} code The shortcode to validate.
 * @returns {boolean} True if the code is valid, false otherwise.
 */
export const validateShortcode = (code) => {
  // Regex to check for alphanumeric characters (letters and numbers)
  const alphanumeric = /^[a-zA-Z0-9]+$/;
  return alphanumeric.test(code) && code.length > 3 && code.length < 15;
};
