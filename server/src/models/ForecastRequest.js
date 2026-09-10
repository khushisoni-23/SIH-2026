const mongoose = require('mongoose');

const chartPointSchema = new mongoose.Schema({
  period: String,
  actual: mongoose.Schema.Types.Mixed,
  predictedML: Number,
  baselineLinear: Number,
  upperCI: Number,
  lowerCI: Number,
}, { _id: false });

const forecastRequestSchema = new mongoose.Schema(
  {
    submittedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    // User inputs
    cargoType: { type: String, required: true },
    cargoQuantity: { type: Number, required: true },
    origin: { type: String, required: true },
    destination: { type: String, required: true },
    contractDuration: String,
    // Computed results (backend logic — placeholder until ML model is connected)
    currentRate: Number,
    predictedRate30D: Number,
    predictedRate60D: Number,
    predictedRate90D: Number,
    rateChangePct30D: Number,
    chartData: [chartPointSchema],
    dataStatus: { type: String, enum: ['DEMO', 'USER'], default: 'USER' },
    // Label shown in UI — do NOT claim real-time until verified source is connected
    computationNote: {
      type: String,
      default: 'Estimated using rule-based heuristics. Not a real-time or ML-generated forecast.',
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model('ForecastRequest', forecastRequestSchema);
