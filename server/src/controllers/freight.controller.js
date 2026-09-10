const FreightData = require('../models/FreightData');

// GET /api/freight/summary
const getSummary = async (req, res, next) => {
  try {
    const records = await FreightData.find({}).lean();
    res.json({
      success: true,
      dataStatus: 'DEMO',
      dataNote: 'Sample freight rate data seeded from industry benchmarks. Not a live data feed.',
      data: records,
    });
  } catch (err) {
    next(err);
  }
};

// GET /api/freight/timeseries?routeCode=AUS_PARADIP_PANAMAX
const getTimeSeries = async (req, res, next) => {
  try {
    const { routeCode } = req.query;
    const query = routeCode ? { routeCode } : {};
    const records = await FreightData.find(query).lean();
    res.json({
      success: true,
      dataStatus: 'DEMO',
      dataNote: 'Timeseries data from seeded DEMO records.',
      data: records,
    });
  } catch (err) {
    next(err);
  }
};

module.exports = { getSummary, getTimeSeries };
