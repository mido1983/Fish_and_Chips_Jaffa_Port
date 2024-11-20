import { toast } from 'react-toastify';
import { authApi } from './authApi';

export const setupInterceptors = (api, navigate) => {
  // Request Interceptor
  api.interceptors.request.use(
    (config) => {
      // Add token to headers
      const token = localStorage.getItem('token');
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }

      return config;
    },
    (error) => {
      return Promise.reject(error);
    }
  );

  // Response Interceptor
  api.interceptors.response.use(
    (response) => {
      return response;
    },
    async (error) => {
      const originalRequest = error.config;

      // Handle 401 Unauthorized
      if (error.response?.status === 401 && !originalRequest._retry) {
        originalRequest._retry = true;

        try {
          // Use authApi instead of refreshToken
          const { token } = await authApi.refreshToken();
          localStorage.setItem('token', token);
          
          originalRequest.headers.Authorization = `Bearer ${token}`;
          return api(originalRequest);
        } catch (refreshError) {
          localStorage.removeItem('token');
          navigate('/login');
          toast.error('Your session has expired. Please log in again.');
          return Promise.reject(refreshError);
        }
      }

      // Handle other errors...
      return Promise.reject(error);
    }
  );
}; 