import { api } from './api';

export const menuApi = {
  async getCategories() {
    const response = await api.get('/admin/menu/categories');
    return response.data;
  },

  async createCategory(categoryData) {
    const response = await api.post('/admin/menu/categories', categoryData);
    return response.data;
  },

  async updateCategory(id, categoryData) {
    const response = await api.put(`/admin/menu/categories/${id}`, categoryData);
    return response.data;
  },

  async deleteCategory(id) {
    await api.delete(`/admin/menu/categories/${id}`);
  },

  async getItems(categoryId = null) {
    const response = await api.get('/admin/menu/items', {
      params: { categoryId },
    });
    return response.data;
  },

  async createItem(itemData) {
    const response = await api.post('/admin/menu/items', itemData);
    return response.data;
  },

  async updateItem(id, itemData) {
    const response = await api.put(`/admin/menu/items/${id}`, itemData);
    return response.data;
  },

  async deleteItem(id) {
    await api.delete(`/admin/menu/items/${id}`);
  },

  async updateItemOrder(items) {
    const response = await api.put('/admin/menu/items/order', { items });
    return response.data;
  },
}; 