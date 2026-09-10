const MarketData = require('../models/MarketData');

// GET /api/market?route=Australia&vesselType=Panamax
const getMarketData = async (req, res, next) => {
  try {
    const { route, vesselType } = req.query;
    const doc = await MarketData.findOne({}).lean();

    if (!doc) {
      return res.json({ success: true, dataStatus: 'DEMO', trends: [], records: [] });
    }

    let records = doc.historicalRecords || [];
    if (route && route !== 'All') records = records.filter((r) => r.route && r.route.includes(route));
    if (vesselType && vesselType !== 'All') records = records.filter((r) => r.vesselType === vesselType);

    res.json({
      success: true,
      dataStatus: 'DEMO',
      dataNote: 'Market index data seeded from published Baltic Exchange benchmarks — DEMO data.',
      trends: doc.trendData || [],
      records,
    });
  } catch (err) {
    next(err);
  }
};

module.exports = { getMarketData };
