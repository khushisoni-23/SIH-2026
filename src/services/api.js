import axios from 'axios';

/**
 * Axios base client for FreightSense backend.
 * All service files import this instead of using mock data.
 *
 * During development: Vite proxies /api → http://localhost:5001
 * In production: set VITE_API_BASE_URL env var
 */
const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || 'http://localhost:5001/api',
  timeout: 15000,
  headers: { 'Content-Type': 'application/json' },
});

// Attach JWT token to every request if present
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('freightsense_token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Handle 401 globally — clear token and redirect to login
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('freightsense_token');
      localStorage.removeItem('freightsense_user');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

export default api;
