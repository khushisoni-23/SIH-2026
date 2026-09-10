/**
 * marketService — fetches from Express backend (GET /api/market)
 * Mock data imports have been removed.
 */
import api from './api';

export const marketService = {
  getHistoricalData: async (filters = {}) => {
    const res = await api.get('/market', { params: filters });
    return {
      trends: res.data.trends,
      records: res.data.records,
      dataStatus: res.data.dataStatus,
      dataNote: res.data.dataNote,
    };
  },
};
