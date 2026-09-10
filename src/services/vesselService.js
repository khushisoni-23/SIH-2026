/**
 * vesselService — fetches from Express backend (GET /api/vessels)
 * Mock data imports have been removed. Data is served from MongoDB (DEMO-tagged records).
 */
import api from './api';

export const vesselService = {
  getVessels: async (params = {}) => {
    const res = await api.get('/vessels', { params });
    return {
      data: res.data.data,
      recommendedVessel: res.data.recommendedVessel,
      dataStatus: res.data.dataStatus,
      dataNote: res.data.dataNote,
    };
  },
};
