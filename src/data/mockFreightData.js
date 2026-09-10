// Centralized Mock Freight Data for Maritime Logistics Platform
// Real open-dataset aligned parameters for East Coast Indian Bulk Imports (Coal/Steel)

export const freightMetadata = {
  dataSource: "Open Freight Index & Ministry of Shipping Ports Data",
  lastUpdated: "10 Sep 2026, 08:30 IST",
  dataStatus: "LIVE_FEEDS_SIMULATED",
  reliabilityScore: "98.4%"
};

export const currentFreightSummary = {
  route: "Australia (Hay Point/Gladstone) → Paradip",
  commodity: "Coking Coal",
  quantityMT: 100000,
  currentRateUSD: 24.80,
  forecastRate30D: 27.20,
  rateChangePct: +9.68,
  recommendedVessel: "Panamax (75,000 DWT)",
  marketVolatility: "High (BDI: 1,940)",
  portCongestion: "Paradip: 3.2 Days Avg Wait (Medium)",
  estimatedSavingsUSD: 182500,
  spotVsCharterDiffPct: -11.4
};

export const freightTimeSeriesData = {
  "7D": [
    { date: "04 Sep", historical: 23.90, forecast: null, lowerBound: null, upperBound: null, bdi: 1880 },
    { date: "05 Sep", historical: 24.10, forecast: null, lowerBound: null, upperBound: null, bdi: 1895 },
    { date: "06 Sep", historical: 24.35, forecast: null, lowerBound: null, upperBound: null, bdi: 1910 },
    { date: "07 Sep", historical: 24.40, forecast: null, lowerBound: null, upperBound: null, bdi: 1915 },
    { date: "08 Sep", historical: 24.60, forecast: null, lowerBound: null, upperBound: null, bdi: 1928 },
    { date: "09 Sep", historical: 24.75, forecast: null, lowerBound: null, upperBound: null, bdi: 1935 },
    { date: "10 Sep", historical: 24.80, forecast: 24.80, lowerBound: 24.50, upperBound: 25.10, bdi: 1940 },
    { date: "11 Sep", historical: null, forecast: 25.10, lowerBound: 24.70, upperBound: 25.50, bdi: 1955 },
    { date: "12 Sep", historical: null, forecast: 25.35, lowerBound: 24.90, upperBound: 25.80, bdi: 1970 },
    { date: "13 Sep", historical: null, forecast: 25.60, lowerBound: 25.10, upperBound: 26.10, bdi: 1985 },
    { date: "14 Sep", historical: null, forecast: 25.90, lowerBound: 25.35, upperBound: 26.45, bdi: 2005 },
    { date: "15 Sep", historical: null, forecast: 26.15, lowerBound: 25.55, upperBound: 26.75, bdi: 2020 },

  ],
  "30D": [
    { date: "15 Aug", historical: 22.40, forecast: null, lowerBound: null, upperBound: null, bdi: 1750 },
    { date: "22 Aug", historical: 23.10, forecast: null, lowerBound: null, upperBound: null, bdi: 1810 },
    { date: "29 Aug", historical: 23.85, forecast: null, lowerBound: null, upperBound: null, bdi: 1870 },
    { date: "05 Sep", historical: 24.20, forecast: null, lowerBound: null, upperBound: null, bdi: 1900 },
    { date: "10 Sep (Now)", historical: 24.80, forecast: 24.80, lowerBound: 24.80, upperBound: 24.80, bdi: 1940 },
    { date: "17 Sep", historical: null, forecast: 25.60, lowerBound: 25.00, upperBound: 26.20, bdi: 1985 },
    { date: "24 Sep", historical: null, forecast: 26.40, lowerBound: 25.70, upperBound: 27.10, bdi: 2040 },
    { date: "01 Oct", historical: null, forecast: 26.90, lowerBound: 26.10, upperBound: 27.70, bdi: 2080 },
    { date: "10 Oct", historical: null, forecast: 27.20, lowerBound: 26.30, upperBound: 28.10, bdi: 2100 }
  ],
  "90D": [
    { date: "Jun W2", historical: 21.10, forecast: null, lowerBound: null, upperBound: null, bdi: 1620 },
    { date: "Jul W1", historical: 21.80, forecast: null, lowerBound: null, upperBound: null, bdi: 1680 },
    { date: "Jul W3", historical: 22.50, forecast: null, lowerBound: null, upperBound: null, bdi: 1740 },
    { date: "Aug W2", historical: 23.20, forecast: null, lowerBound: null, upperBound: null, bdi: 1810 },
    { date: "Sep W1", historical: 24.40, forecast: null, lowerBound: null, upperBound: null, bdi: 1910 },
    { date: "Sep W2 (Now)", historical: 24.80, forecast: 24.80, lowerBound: 24.80, upperBound: 24.80, bdi: 1940 },
    { date: "Oct W1", historical: null, forecast: 26.80, lowerBound: 25.90, upperBound: 27.70, bdi: 2070 },
    { date: "Oct W3", historical: null, forecast: 27.90, lowerBound: 26.80, upperBound: 29.00, bdi: 2140 },
    { date: "Nov W2", historical: null, forecast: 26.50, lowerBound: 25.20, upperBound: 27.80, bdi: 2030 },
    { date: "Dec W1", historical: null, forecast: 25.80, lowerBound: 24.30, upperBound: 27.30, bdi: 1980 }
  ],
  "1Y": [
    { date: "Q4 2025", historical: 20.20, forecast: null, lowerBound: null, upperBound: null, bdi: 1540 },
    { date: "Q1 2026", historical: 21.50, forecast: null, lowerBound: null, upperBound: null, bdi: 1650 },
    { date: "Q2 2026", historical: 22.80, forecast: null, lowerBound: null, upperBound: null, bdi: 1760 },
    { date: "Q3 2026", historical: 24.80, forecast: 24.80, lowerBound: 24.80, upperBound: 24.80, bdi: 1940 },
    { date: "Q4 2026", historical: null, forecast: 27.50, lowerBound: 25.80, upperBound: 29.20, bdi: 2120 },
    { date: "Q1 2027", historical: null, forecast: 24.10, lowerBound: 22.40, upperBound: 25.80, bdi: 1850 },
    { date: "Q2 2027", historical: null, forecast: 23.40, lowerBound: 21.50, upperBound: 25.30, bdi: 1790 }
  ]
};

export const marketIntelligenceSummary = {
  overallTrend: "Bullish Trend Expected",
  headline: "Freight rates projected to rise by +9.7% over the next 30 days due to post-monsoon restocking demand in East Coast Indian steel plants.",
  demandLevel: "High",
  vesselSupply: "Moderate",
  marketVolatility: "High",
  bunkerFuelPriceUSD: 524.50, // $/MT VLSFO Singapore
  recommendation: "Secure medium-term charter capacity (Panamax/Supramax) before expected Q4 price escalation. Spot market exposure poses significant demurrage & rate spike risk."
};
