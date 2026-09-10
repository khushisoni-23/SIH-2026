import { mockPorts, portMetadata } from '../data/mockPortData';

export const portService = {
  getAllPorts: async (filters = {}) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        let filtered = [...mockPorts];
        if (filters.status && filters.status !== 'All') {
          filtered = filtered.filter(p => p.status === filters.status);
        }
        if (filters.congestion && filters.congestion !== 'All') {
          filtered = filtered.filter(p => p.currentCongestion === filters.congestion);
        }
        if (filters.minDraft) {
          filtered = filtered.filter(p => p.maxDraft >= parseFloat(filters.minDraft));
        }
        if (filters.searchQuery) {
          const q = filters.searchQuery.toLowerCase();
          filtered = filtered.filter(p => p.name.toLowerCase().includes(q) || p.state.toLowerCase().includes(q) || p.code.toLowerCase().includes(q));
        }
        resolve({
          data: filtered,
          totalCount: mockPorts.length,
          metadata: portMetadata
        });
      }, 150);
    });
  },

  getPortById: async (portId) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        const found = mockPorts.find(p => p.id === portId) || mockPorts[0];
        resolve({
          data: found,
          metadata: portMetadata
        });
      }, 100);
    });
  }
};
