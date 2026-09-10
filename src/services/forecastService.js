/**
 * forecastService — fetches from Express backend (POST /api/forecast/generate)
 * Mock data imports have been removed. Results are computed server-side and saved to MongoDB.
 * NOTE: The backend computation is a rule-based heuristic — NOT an ML model.
 *       The ML teammate will replace the server-side logic without changing this API contract.
 */
import api from './api';

export const forecastService = {
  generateForecast: async (formData) => {
    const res = await api.post('/forecast/generate', {
      cargoType: formData.cargoType || formData.commodity || 'Coking Coal',
      cargoQuantity: parseFloat(formData.cargoQuantity) || 100000,
      origin: formData.origin || 'Australia (Hay Point)',
      destination: formData.destination || 'Paradip',
      contractDuration: formData.contractDuration || '3 Months',
    });
    return {
      data: res.data.data,
      dataStatus: res.data.dataStatus,
      computationNote: res.data.computationNote,
    };
  },

  getMyForecasts: async () => {
    const res = await api.get('/forecast/my');
    return { data: res.data.data };
  },
};
