/**
 * alertService — fetches from Express backend (GET /api/alerts)
 * Mock data imports have been removed.
 */
import api from './api';

export const alertService = {
  getAlerts: async (filters = {}) => {
    const res = await api.get('/alerts', { params: filters });
    return {
      data: res.data.data,
      unreadCount: res.data.unreadCount,
      dataStatus: res.data.dataStatus,
      dataNote: res.data.dataNote,
    };
  },
};
