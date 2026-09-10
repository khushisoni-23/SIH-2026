const mongoose = require('mongoose');

const marketDataSchema = new mongoose.Schema(
  {
    indexName: String, // e.g. "Baltic Panamax Index (BPI)"
    currentValue: Number,
    changePercent: Number,
    trend: { type: String, enum: ['up', 'down', 'stable'] },
    trendData: [
      {
        month: String,
        bpi: Number,
        bci: Number,
        bsi: Number,
        _id: false,
      },
    ],
    historicalRecords: [
      {
        date: String,
        route: String,
        vesselType: String,
        rateUSDMT: Number,
        voyageDays: Number,
        _id: false,
      },
    ],
    dataStatus: { type: String, enum: ['DEMO', 'USER', 'LIVE'], default: 'DEMO' },
  },
  { timestamps: true }
);

module.exports = mongoose.model('MarketData', marketDataSchema);
