import axios from 'axios';
import { setupInterceptors } from './interceptors';
import { handleApiError } from './errorHandler';

export const createApiInstance = (navigate) => {
  // Create axios instance with default config
  const api = axios.create({
    baseURL: process.env.REACT_APP_API_URL,
    timeout: 30000,
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
    },
  });

  // Setup interceptors
  setupInterceptors(api, navigate);

  // Add error handling wrapper
  const apiWithErrorHandling = {
    async get(url, config) {
      try {
        return await api.get(url, config);
      } catch (error) {
        throw handleApiError(error);
      }
    },

    async post(url, data, config) {
      try {
        return await api.post(url, data, config);
      } catch (error) {
        throw handleApiError(error);
      }
    },

    async put(url, data, config) {
      try {
        return await api.put(url, data, config);
      } catch (error) {
        throw handleApiError(error);
      }
    },

    async delete(url, config) {
      try {
        return await api.delete(url, config);
      } catch (error) {
        throw handleApiError(error);
      }
    },

    async patch(url, data, config) {
      try {
        return await api.patch(url, data, config);
      } catch (error) {
        throw handleApiError(error);
      }
    },
  };

  return apiWithErrorHandling;
}; 