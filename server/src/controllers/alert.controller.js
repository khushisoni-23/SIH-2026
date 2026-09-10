const Alert = require('../models/Alert');

// GET /api/alerts?severity=High&category=Port+Congestion
const getAlerts = async (req, res, next) => {
  try {
    const { severity, category } = req.query;
    const filter = {};
    if (severity && severity !== 'All') filter.severity = severity;
    if (category && category !== 'All') filter.category = category;

    const alerts = await Alert.find(filter).sort({ createdAt: -1 }).lean();
    const unreadCount = await Alert.countDocuments({ isUnread: true });

    res.json({
      success: true,
      dataStatus: 'DEMO',
      dataNote: 'Sample risk alerts seeded as DEMO data. Not a live disruption feed.',
      data: alerts,
      unreadCount,
    });
  } catch (err) {
    next(err);
  }
};

module.exports = { getAlerts };
