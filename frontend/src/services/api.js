import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:3001/api';

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add token to requests
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('authToken');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Handle errors
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('authToken');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

// Auth endpoints
export const authService = {
  signup: (email, username, password, fullName) =>
    api.post('/auth/signup', { email, username, password, full_name: fullName }),
  login: (email, password) =>
    api.post('/auth/login', { email, password }),
};

// Catches endpoints
export const catchesService = {
  getAll: (filters = {}) =>
    api.get('/catches', { params: filters }),
  getById: (id) =>
    api.get(`/catches/${id}`),
  getMyCatches: () =>
    api.get('/catches/my-catches'),
  create: (catchData) =>
    api.post('/catches', catchData),
  update: (id, updates) =>
    api.patch(`/catches/${id}`, updates),
  delete: (id) =>
    api.delete(`/catches/${id}`),
};

// Locations endpoints
export const locationsService = {
  getAll: (filters = {}) =>
    api.get('/locations', { params: filters }),
  getById: (id) =>
    api.get(`/locations/${id}`),
  create: (locationData) =>
    api.post('/locations', locationData),
  update: (id, updates) =>
    api.patch(`/locations/${id}`, updates),
};

export default api;
