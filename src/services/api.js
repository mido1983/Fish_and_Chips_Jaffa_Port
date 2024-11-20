import axios from 'axios';

const api = axios.create({
  baseURL: process.env.REACT_APP_API_URL || 'http://localhost:8000/api',
  headers: {
    'Content-Type': 'application/json',
  },
});

export const menuService = {
  getMenuItems: () => api.get('/menu'),
  getMenuItem: (id) => api.get(`/menu/${id}`),
};

export const reviewsService = {
  getReviews: () => api.get('/reviews'),
  submitReview: (review) => api.post('/reviews', review),
};

export const contactService = {
  submitContact: (formData) => api.post('/contact', formData),
};

export default api; 