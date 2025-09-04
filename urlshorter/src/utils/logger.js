
export const logger = {
  log: (message, data = {}) => {
    const timestamp = new Date().toISOString();
    const logEntry = {
      timestamp,
      message,
      data,
    };
    console.log('[App Log]', JSON.stringify(logEntry, null, 2));
  },
};