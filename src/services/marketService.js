import { historicalIndexTrends, historicalRecordsTable, marketMetadata } from '../data/mockMarketData';

export const marketService = {
  getHistoricalData: async (filters = {}) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        let records = [...historicalRecordsTable];
        if (filters.route && filters.route !== 'All') {
          records = records.filter(r => r.route.includes(filters.route));
        }
        if (filters.vesselType && filters.vesselType !== 'All') {
          records = records.filter(r => r.vesselType === filters.vesselType);
        }
        resolve({
          trends: historicalIndexTrends,
          records,
          metadata: marketMetadata
        });
      }, 200);
    });
  }
};
