const mongoose = require('mongoose');

const freightDataSchema = new mongoose.Schema(
  {
    label: String, // e.g. "Australia→Paradip Panamax"
    currentRateUSDMT: Number,
    changePercent: Number,
    trend: { type: String, enum: ['up', 'down', 'stable'] },
    routeCode: String,
    vesselClass: String,
    timeseries: [
      {
        date: String,
        rate: Number,
        _id: false,
      },
    ],
    dataStatus: { type: String, enum: ['DEMO', 'USER', 'LIVE'], default: 'DEMO' },
  },
  { timestamps: true }
);

module.exports = mongoose.model('FreightData', freightDataSchema);
