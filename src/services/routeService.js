/**
 * routeService — fetches from Express backend (GET /api/routes)
 * Mock data imports have been removed.
 */
import api from './api';

export const routeService = {
  getRoutes: async (search = '') => {
    const res = await api.get('/routes', { params: search ? { search } : {} });
    return {
      data: res.data.data,
      primaryRoute: res.data.primaryRoute,
      dataStatus: res.data.dataStatus,
      dataNote: res.data.dataNote,
    };
  },
};
