/**
 * portService — fetches from Express backend (GET /api/ports)
 * Mock data imports have been removed. Data is served from MongoDB (DEMO-tagged records).
 */
import api from './api';

export const portService = {
  getAllPorts: async (filters = {}) => {
    const res = await api.get('/ports', { params: filters });
    return {
      data: res.data.data,
      totalCount: res.data.totalCount,
      dataStatus: res.data.dataStatus,
      dataNote: res.data.dataNote,
    };
  },

  getPortById: async (portId) => {
    const res = await api.get(`/ports/${portId}`);
    return {
      data: res.data.data,
      dataStatus: res.data.dataStatus,
    };
  },
};
