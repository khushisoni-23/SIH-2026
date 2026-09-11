import axios from 'axios';
import { currentFreightSummary, freightTimeSeriesData, marketIntelligenceSummary } from '../data/mockFreightData';
import { mockPorts } from '../data/mockPortData';
import { mockRoutes } from '../data/mockRouteData';
import { mockAlerts } from '../data/mockAlertData';
import { mockVessels } from '../data/mockVesselData';
import { historicalIndexTrends, historicalRecordsTable } from '../data/mockMarketData';

/**
 * Axios base client for FreightSense backend.
 * All service files import this instead of using mock data.
 *
 * During development: Vite proxies /api → http://localhost:5001
 * In production: set VITE_API_BASE_URL env var
 */
const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || 'http://localhost:5001/api',
  timeout: 15000,
  headers: { 'Content-Type': 'application/json' },
});

const getDemoUser = (payload = {}) => ({
  _id: 'demo-user-1',
  fullName: payload.fullName || 'Demo Logistics Officer',
  organization: payload.organization || 'SAIL Maritime Logistics',
  designation: payload.designation || 'Logistics Manager',
  email: payload.email || 'demo@freightsense.local',
  phone: payload.phone || '+91 9876543210',
});

const getFallbackData = (config = {}) => {
  const url = config.url || '';
  const params = config.params || {};
  const body = config.data ? JSON.parse(config.data) : {};

  if (url.endsWith('/auth/login')) {
    return {
      data: {
        success: true,
        message: 'Demo login successful',
        token: 'demo-token',
        user: getDemoUser({ email: body.email }),
      },
    };
  }

  if (url.endsWith('/auth/signup')) {
    return {
      data: {
        success: true,
        message: 'Demo signup successful',
        token: 'demo-token',
        user: getDemoUser(body),
      },
    };
  }

  if (url.endsWith('/freight/summary')) {
    return {
      data: {
        success: true,
        dataStatus: 'DEMO',
        dataNote: 'Backend unavailable. Showing local demo data.',
        data: currentFreightSummary,
      },
    };
  }

  if (url.endsWith('/freight/timeseries')) {
    const routeCode = params.routeCode;
    const data = routeCode && freightTimeSeriesData[routeCode]
      ? freightTimeSeriesData[routeCode]
      : freightTimeSeriesData['30D'];

    return {
      data: {
        success: true,
        dataStatus: 'DEMO',
        dataNote: 'Backend unavailable. Showing local demo data.',
        data,
      },
    };
  }

  if (url.endsWith('/ports') && !url.includes('/ports/')) {
    return {
      data: {
        success: true,
        dataStatus: 'DEMO',
        dataNote: 'Backend unavailable. Showing local demo data.',
        data: mockPorts,
        totalCount: mockPorts.length,
      },
    };
  }

  if (url.includes('/ports/')) {
    const portId = url.split('/ports/')[1];
    const port = mockPorts.find((item) => item.id === portId) || mockPorts[0];

    return {
      data: {
        success: true,
        dataStatus: 'DEMO',
        dataNote: 'Backend unavailable. Showing local demo data.',
        data: port,
      },
    };
  }

  if (url.endsWith('/routes')) {
    return {
      data: {
        success: true,
        dataStatus: 'DEMO',
        dataNote: 'Backend unavailable. Showing local demo data.',
        data: mockRoutes,
        primaryRoute: mockRoutes[0],
      },
    };
  }

  if (url.endsWith('/alerts')) {
    return {
      data: {
        success: true,
        dataStatus: 'DEMO',
        dataNote: 'Backend unavailable. Showing local demo data.',
        data: mockAlerts,
        unreadCount: mockAlerts.filter((alert) => alert.isUnread).length,
      },
    };
  }

  if (url.endsWith('/vessels')) {
    return {
      data: {
        success: true,
        dataStatus: 'DEMO',
        dataNote: 'Backend unavailable. Showing local demo data.',
        data: mockVessels,
        recommendedVessel: mockVessels.find((vessel) => vessel.isRecommended) || mockVessels[0],
      },
    };
  }

  if (url.endsWith('/market')) {
    return {
      data: {
        success: true,
        dataStatus: 'DEMO',
        dataNote: 'Backend unavailable. Showing local demo data.',
        trends: historicalIndexTrends,
        records: historicalRecordsTable,
      },
    };
  }

  if (url.endsWith('/charter/plan')) {
    return {
      data: {
        success: true,
        dataStatus: 'DEMO',
        message: 'Demo charter plan created',
        data: {
          id: 'demo-charter-plan',
          ...body,
          recommendation: {
            recommendedVoyages: body.numberOfVoyages || 8,
            recommendedVesselClass: body.preferredVessel?.split(' ')[0] || 'Panamax',
            spotRateAvgForecastUSD: 27.2,
            contractRateAgreedUSD: 23.95,
            totalContractCostUSD: 14370000,
            estimatedSavingVsSpotUSD: 1987000,
            savingPercentage: 13.8,
          },
        },
      },
    };
  }

  if (url.endsWith('/forecast/generate')) {
    return {
      data: {
        success: true,
        dataStatus: 'DEMO',
        computationNote: 'Demo forecast generated locally while backend is unavailable.',
        data: {
          id: 'demo-forecast',
          cargoType: body.cargoType || 'Coking Coal',
          cargoQuantity: Number(body.cargoQuantity) || 100000,
          origin: body.origin || 'Australia (Hay Point)',
          destination: body.destination || 'Paradip',
          contractDuration: body.contractDuration || '3 Months',
          currentRate: 24.8,
          predictedRate30D: 27.2,
          predictedRate60D: 29.1,
          predictedRate90D: 30.4,
          rateChangePct30D: 9.68,
          chartData: [
            { period: 'Current', actual: 24.8, predictedML: 24.8, baselineLinear: 24.8, upperCI: 24.8, lowerCI: 24.8 },
            { period: 'Week 1', actual: null, predictedML: 25.0, baselineLinear: 24.9, upperCI: 25.2, lowerCI: 24.8 },
            { period: 'Month 1 (30D)', actual: null, predictedML: 27.2, baselineLinear: 25.7, upperCI: 28.1, lowerCI: 26.4 },
          ],
        },
      },
    };
  }

  return {
    data: {
      success: true,
      dataStatus: 'DEMO',
      dataNote: 'Backend unavailable. Showing local demo data.',
      data: [],
    },
  };
};

// Attach JWT token to every request if present
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('freightsense_token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Handle 401 globally — clear token and redirect to login
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('freightsense_token');
      localStorage.removeItem('freightsense_user');
      window.location.href = '/login';
      return Promise.reject(error);
    }

    if (!error.response || error.response.status >= 500 || error.code === 'ERR_NETWORK') {
      return Promise.resolve(getFallbackData(error.config));
    }

    return Promise.reject(error);
  }
);

export default api;
