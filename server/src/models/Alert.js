const mongoose = require('mongoose');

const alertSchema = new mongoose.Schema(
  {
    severity: { type: String, enum: ['High', 'Medium', 'Low'], required: true },
    severityBadge: String,
    category: String,
    title: String,
    description: String,
    affectedRoutePort: String,
    timestamp: String,
    date: String,
    actionRecommended: String,
    isUnread: { type: Boolean, default: true },
    dataStatus: { type: String, enum: ['DEMO', 'USER', 'LIVE'], default: 'DEMO' },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Alert', alertSchema);
