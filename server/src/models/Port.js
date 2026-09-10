const mongoose = require('mongoose');

const portSchema = new mongoose.Schema(
  {
    id: { type: String, required: true, unique: true },
    name: String,
    state: String,
    code: String,
    maxDraft: Number,
    maxLOA: Number,
    maxBeam: Number,
    handlingCapacityTPD: Number,
    currentCongestion: { type: String, enum: ['Low', 'Medium', 'High'] },
    avgWaitTimeDays: Number,
    avgTurnaroundHrs: Number,
    status: { type: String, enum: ['Operational', 'Delayed', 'Restricted'] },
    operationalBerths: Number,
    activeVesselsAtAnchorage: Number,
    demurrageRatePerDayUSD: Number,
    cargoTypes: [String],
    dataNote: String,
    dataStatus: { type: String, enum: ['DEMO', 'USER', 'LIVE'], default: 'DEMO' },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Port', portSchema);
