import { currentFreightSummary, freightTimeSeriesData, marketIntelligenceSummary, freightMetadata } from '../data/mockFreightData';

export const freightService = {
  getCurrentSummary: async () => {
    // Simulates an async API call e.g. GET /api/v1/freight/summary
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({
          data: currentFreightSummary,
          metadata: freightMetadata
        });
      }, 150);
    });
  },

  getTimeSeries: async (timeframe = '30D') => {
    // GET /api/v1/freight/timeseries?range=30D
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({
          timeframe,
          data: freightTimeSeriesData[timeframe] || freightTimeSeriesData['30D'],
          metadata: freightMetadata
        });
      }, 200);
    });
  },

  getMarketIntelligence: async () => {
    // GET /api/v1/market/intelligence
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({
          data: marketIntelligenceSummary,
          metadata: freightMetadata
        });
      }, 150);
    });
  }
};
