const mongoose = require('mongoose');

const vesselSchema = new mongoose.Schema(
  {
    id: { type: String, required: true, unique: true },
    class: String,
    capacityDWT: Number,
    cargoCapacityRange: String,
    draftMeters: Number,
    loaMeters: Number,
    beamMeters: Number,
    dailyCharterRateUSD: Number,
    estimatedFreightUSDMT: Number,
    fuelConsumptionMTDay: Number,
    speedKnots: Number,
    portCompatibility: String,
    idleTimeRisk: String,
    suitabilityScore: Number,
    isRecommended: { type: Boolean, default: false },
    recommendationTag: String,
    reasons: [String],
    dataStatus: { type: String, enum: ['DEMO', 'USER', 'LIVE'], default: 'DEMO' },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Vessel', vesselSchema);
