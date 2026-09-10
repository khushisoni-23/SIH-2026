const mongoose = require('mongoose');

const routeSchema = new mongoose.Schema(
  {
    id: { type: String, required: true, unique: true },
    origin: String,
    originCode: String,
    destination: String,
    destinationCode: String,
    commodity: String,
    distanceNM: Number,
    transitTimeDays: Number,
    transitDays: Number,
    currentFreightUSD: Number,
    currentRateUSDMT: Number,
    forecastFreightUSD: Number,
    portCongestion: String,
    recommendedVessel: String,
    recommendedVesselClass: String,
    riskScore: Number,
    riskLevel: { type: String },
    weatherDelayRiskPct: Number,
    bunkerFuelCostUSD: Number,
    totalVoyageCostUSD: Number,
    chokepoints: [String],
    isPrimaryRoute: Boolean,
    notes: String,
    dataStatus: { type: String, enum: ['DEMO', 'USER', 'LIVE'], default: 'DEMO' },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Route', routeSchema);
