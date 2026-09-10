// Mock Predictive Machine Learning Forecast Engine Data
// Simulates LightGBM + Prophet + LSTM Ensemble Freight Rate Forecast

export const forecastMetadata = {
  modelType: "Ensemble Hybrid (Prophet + XGBoost + LSTM)",
  accuracyMetric: "MAPE: 3.2% | RMSE: $0.78/MT",
  lastTrained: "09 Sep 2026",
  dataSource: "Baltic Freight Index, Platts Commodity Data, AIS Vessel Tracking"
};

export const defaultForecastResult = {
  cargoType: "Coking Coal",
  cargoQuantity: 100000,
  origin: "Australia (Hay Point)",
  destination: "Paradip",
  contractDuration: "3 Months",
  currentRate: 24.80,
  predictedRate30D: 27.20,
  predictedRate60D: 29.10,
  predictedRate90D: 26.40,
  rateChangePct30D: 9.68,
  confidenceScore: 86,
  marketStance: "Bullish",
  recommendation: "Consider entering the charter market early within 7 days. Spot rate escalation is predicted to peak in late October before moderating in December.",
  forecastFactors: [
    { name: "Seasonal Steel & Energy Restocking", impact: "+35%", weight: 0.35, category: "Demand", polarity: "positive", description: "Post-monsoon industrial output surge in Indian steel plants (SAIL, Tata Steel)." },
    { name: "Vessel Tonnage Tightness", impact: "-22%", weight: 0.22, category: "Supply", polarity: "positive", description: "Pacific Basin Panamax ballast vessel availability is 18% below 5-year average." },
    { name: "Bunker VLSFO Fuel Cost Rise", impact: "+18%", weight: 0.18, category: "Macro", polarity: "positive", description: "Singapore VLSFO fuel price increased to $524.50/MT due to crude oil futures." },
    { name: "East Coast Port Anchorage Queue", impact: "+15%", weight: 0.15, category: "Port Ops", polarity: "positive", description: "Average East Coast waiting time elevated at 3.2 days (Paradip) & 4.8 days (Gangavaram)." },
    { name: "Historical Seasonal Trend", impact: "+10%", weight: 0.10, category: "Historical", polarity: "positive", description: "Q4 freight rates historically appreciate by 8-14% on Indo-Pacific bulk trade lanes." }
  ],
  chartData: [
    { period: "Current (Sep)", actual: 24.80, predictedML: 24.80, baselineLinear: 24.80, upperCI: 24.80, lowerCI: 24.80 },
    { period: "Week 1", actual: null, predictedML: 25.40, baselineLinear: 25.00, upperCI: 25.90, lowerCI: 24.90 },
    { period: "Week 2", actual: null, predictedML: 25.95, baselineLinear: 25.20, upperCI: 26.60, lowerCI: 25.30 },
    { period: "Week 3", actual: null, predictedML: 26.60, baselineLinear: 25.40, upperCI: 27.40, lowerCI: 25.80 },
    { period: "Month 1 (30D)", actual: null, predictedML: 27.20, baselineLinear: 25.60, upperCI: 28.10, lowerCI: 26.30 },
    { period: "Month 1.5", actual: null, predictedML: 28.30, baselineLinear: 25.80, upperCI: 29.40, lowerCI: 27.20 },
    { period: "Month 2 (60D)", actual: null, predictedML: 29.10, baselineLinear: 26.00, upperCI: 30.50, lowerCI: 27.70 },
    { period: "Month 2.5", actual: null, predictedML: 27.80, baselineLinear: 26.20, upperCI: 29.20, lowerCI: 26.40 },
    { period: "Month 3 (90D)", actual: null, predictedML: 26.40, baselineLinear: 26.40, upperCI: 28.00, lowerCI: 24.80 }
  ]
};
