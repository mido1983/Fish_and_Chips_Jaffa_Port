import { api } from './api';

export const authApi = {
  async login(email, password) {
    try {
      const response = await api.post('/auth/login', { email, password });
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Login failed');
    }
  },

  async refreshToken() {
    try {
      const response = await api.post('/auth/refresh-token');
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Token refresh failed');
    }
  },

  async logout() {
    try {
      await api.post('/auth/logout');
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Logout failed');
    }
  },

  async getCurrentUser() {
    try {
      const response = await api.get('/auth/me');
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Failed to get user data');
    }
  },

  async forgotPassword(email) {
    try {
      await api.post('/auth/forgot-password', { email });
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Failed to send reset email');
    }
  },

  async resetPassword(token, password) {
    try {
      await api.post('/auth/reset-password', { token, password });
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Failed to reset password');
    }
  },
}; 