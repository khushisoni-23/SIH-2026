/**
 * freightService — fetches from Express backend (GET /api/freight/*)
 * Mock data imports have been removed. All data comes from MongoDB via the backend.
 */
import api from './api';

export const freightService = {
  getCurrentSummary: async () => {
    const res = await api.get('/freight/summary');
    return {
      data: res.data.data,
      dataStatus: res.data.dataStatus,
      dataNote: res.data.dataNote,
    };
  },

  getTimeSeries: async (routeCode = 'AUS_PARADIP_PANAMAX') => {
    const res = await api.get('/freight/timeseries', { params: { routeCode } });
    return {
      data: res.data.data,
      dataStatus: res.data.dataStatus,
      dataNote: res.data.dataNote,
    };
  },

  getMarketIntelligence: async () => {
    const res = await api.get('/freight/summary');
    return {
      data: res.data.data,
      dataStatus: res.data.dataStatus,
      dataNote: res.data.dataNote,
    };
  },
};
