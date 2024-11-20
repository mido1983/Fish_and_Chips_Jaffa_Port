import { api } from './api';

export const bookingsApi = {
  async getBookings(params = {}) {
    const response = await api.get('/admin/bookings', { params });
    return response.data;
  },

  async createBooking(bookingData) {
    const response = await api.post('/admin/bookings', bookingData);
    return response.data;
  },

  async updateBooking(id, bookingData) {
    const response = await api.put(`/admin/bookings/${id}`, bookingData);
    return response.data;
  },

  async deleteBooking(id) {
    await api.delete(`/admin/bookings/${id}`);
  },

  async confirmBooking(id) {
    const response = await api.put(`/admin/bookings/${id}/confirm`);
    return response.data;
  },

  async cancelBooking(id, reason) {
    const response = await api.put(`/admin/bookings/${id}/cancel`, { reason });
    return response.data;
  },

  async getAvailableSlots(date) {
    const response = await api.get('/admin/bookings/available-slots', {
      params: { date },
    });
    return response.data;
  },

  async getBookingStats(period) {
    const response = await api.get('/admin/bookings/stats', {
      params: { period },
    });
    return response.data;
  },
}; 