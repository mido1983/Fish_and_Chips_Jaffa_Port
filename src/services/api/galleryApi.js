import { api } from './api';

export const galleryApi = {
  async getAlbums() {
    const response = await api.get('/admin/gallery/albums');
    return response.data;
  },

  async createAlbum(albumData) {
    const response = await api.post('/admin/gallery/albums', albumData);
    return response.data;
  },

  async updateAlbum(id, albumData) {
    const response = await api.put(`/admin/gallery/albums/${id}`, albumData);
    return response.data;
  },

  async deleteAlbum(id) {
    await api.delete(`/admin/gallery/albums/${id}`);
  },

  async getImages(albumId = null) {
    const response = await api.get('/admin/gallery/images', {
      params: { albumId },
    });
    return response.data;
  },

  async uploadImages(albumId, files) {
    const formData = new FormData();
    files.forEach(file => {
      formData.append('images', file);
    });
    formData.append('albumId', albumId);

    const response = await api.post('/admin/gallery/images', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data;
  },

  async updateImage(id, imageData) {
    const response = await api.put(`/admin/gallery/images/${id}`, imageData);
    return response.data;
  },

  async deleteImage(id) {
    await api.delete(`/admin/gallery/images/${id}`);
  },

  async updateImageOrder(images) {
    const response = await api.put('/admin/gallery/images/order', { images });
    return response.data;
  },
}; 