import { api } from './api';

export const userApi = {
  async getUsers() {
    const response = await api.get('/admin/users');
    return response.data;
  },

  async createUser(userData) {
    const response = await api.post('/admin/users', userData);
    return response.data;
  },

  async updateUser(id, userData) {
    const response = await api.put(`/admin/users/${id}`, userData);
    return response.data;
  },

  async deleteUser(id) {
    await api.delete(`/admin/users/${id}`);
  },
};

export const statisticsApi = {
  async getOverview() {
    const response = await api.get('/admin/statistics/overview');
    return response.data;
  },

  async getVisitorStats(period) {
    const response = await api.get('/admin/statistics/visitors', {
      params: { period },
    });
    return response.data;
  },

  async getOrderStats(period) {
    const response = await api.get('/admin/statistics/orders', {
      params: { period },
    });
    return response.data;
  },
};

export const settingsApi = {
  async getSettings() {
    const response = await api.get('/admin/settings');
    return response.data;
  },

  async updateSettings(settings) {
    const response = await api.put('/admin/settings', settings);
    return response.data;
  },
};

export const uploadApi = {
  async uploadFile(file, type = 'image') {
    const formData = new FormData();
    formData.append('file', file);
    formData.append('type', type);

    const response = await api.post('/admin/upload', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data;
  },
}; 