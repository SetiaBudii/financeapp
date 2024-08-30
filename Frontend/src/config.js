// src/config.js
const config = {
    apiUrl: process.env.REACT_APP_API_URL || 'http://192.168.59.102:5005', // Fallback to localhost for development
  };
  
export default config;