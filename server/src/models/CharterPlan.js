const mongoose = require('mongoose');

const charterPlanSchema = new mongoose.Schema(
  {
    submittedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    cargoRequirementMT: { type: Number, required: true },
    numberOfVoyages: Number,
    origin: { type: String, required: true },
    destination: { type: String, required: true },
    contractDuration: String,
    preferredVessel: String,
    commodity: String,
    // Computed recommendation saved alongside input
    recommendation: {
      recommendedVoyages: Number,
      recommendedVesselClass: String,
      spotRateAvgForecastUSD: Number,
      contractRateAgreedUSD: Number,
      totalContractCostUSD: Number,
      estimatedSavingVsSpotUSD: Number,
      savingPercentage: Number,
    },
    dataStatus: { type: String, enum: ['DEMO', 'USER'], default: 'USER' },
  },
  { timestamps: true }
);

module.exports = mongoose.model('CharterPlan', charterPlanSchema);
