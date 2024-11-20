import { api } from './api';

export const reviewsApi = {
  async getReviews(params = {}) {
    const response = await api.get('/admin/reviews', { params });
    return response.data;
  },

  async approveReview(id) {
    const response = await api.put(`/admin/reviews/${id}/approve`);
    return response.data;
  },

  async rejectReview(id) {
    const response = await api.put(`/admin/reviews/${id}/reject`);
    return response.data;
  },

  async deleteReview(id) {
    await api.delete(`/admin/reviews/${id}`);
  },

  async respondToReview(id, response) {
    const apiResponse = await api.post(`/admin/reviews/${id}/respond`, { response });
    return apiResponse.data;
  },

  async getReviewStats() {
    const response = await api.get('/admin/reviews/stats');
    return response.data;
  },
}; 