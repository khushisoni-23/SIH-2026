import { mockAlerts, alertMetadata } from '../data/mockAlertData';

export const alertService = {
  getAlerts: async (filters = {}) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        let filtered = [...mockAlerts];
        if (filters.severity && filters.severity !== 'All') {
          filtered = filtered.filter(a => a.severity.toLowerCase() === filters.severity.toLowerCase());
        }
        if (filters.category && filters.category !== 'All') {
          filtered = filtered.filter(a => a.category === filters.category);
        }
        resolve({
          data: filtered,
          unreadCount: mockAlerts.filter(a => a.isUnread).length,
          metadata: alertMetadata
        });
      }, 150);
    });
  }
};
