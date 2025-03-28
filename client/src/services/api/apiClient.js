// src/services/api/apiClient.js
import axios from 'axios';

const apiClient = axios.create({
  baseURL: 'http://localhost:4000/api', // Altere para sua URL
  timeout: 5000,
});

export default apiClient;