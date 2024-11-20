import { api } from './api';

export const analyticsApi = {
  async getDashboardStats() {
    const response = await api.get('/admin/analytics/dashboard');
    return response.data;
  },

  async getVisitorStats(params = {}) {
    const response = await api.get('/admin/analytics/visitors', { params });
    return response.data;
  },

  async getPageViews(params = {}) {
    const response = await api.get('/admin/analytics/pageviews', { params });
    return response.data;
  },

  async getReferrers(params = {}) {
    const response = await api.get('/admin/analytics/referrers', { params });
    return response.data;
  },

  async getDeviceStats(params = {}) {
    const response = await api.get('/admin/analytics/devices', { params });
    return response.data;
  },

  async getLocationStats(params = {}) {
    const response = await api.get('/admin/analytics/locations', { params });
    return response.data;
  },

  async exportAnalytics(params = {}) {
    const response = await api.get('/admin/analytics/export', { 
      params,
      responseType: 'blob',
    });
    return response.data;
  },
}; 