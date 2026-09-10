/**
 * charterService — fetches from Express backend (POST /api/charter/plan)
 * Mock data imports have been removed. Charter plans are saved to MongoDB as USER data.
 */
import api from './api';

export const charterService = {
  getCharterPlan: async (inputParams = {}) => {
    const res = await api.post('/charter/plan', {
      cargoRequirementMT: parseFloat(inputParams.cargoRequirementMT) || 600000,
      numberOfVoyages: parseInt(inputParams.numberOfVoyages) || 8,
      origin: inputParams.origin || 'Australia (Hay Point)',
      destination: inputParams.destination || 'Paradip Port',
      contractDuration: inputParams.contractDuration || '6 Months',
      preferredVessel: inputParams.preferredVessel || 'Panamax (75,000 DWT)',
      commodity: inputParams.commodity || 'Coking Coal',
    });
    return {
      data: res.data.data,
      dataStatus: res.data.dataStatus,
    };
  },

  getMyPlans: async () => {
    const res = await api.get('/charter/plans');
    return { data: res.data.data };
  },
};
