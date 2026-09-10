const Port = require('../models/Port');

// GET /api/ports
const getAllPorts = async (req, res, next) => {
  try {
    const { status, congestion, minDraft, searchQuery } = req.query;
    const filter = {};

    if (status && status !== 'All') filter.status = status;
    if (congestion && congestion !== 'All') filter.currentCongestion = congestion;
    if (minDraft) filter.maxDraft = { $gte: parseFloat(minDraft) };
    if (searchQuery) {
      const q = new RegExp(searchQuery, 'i');
      filter.$or = [{ name: q }, { state: q }, { code: q }];
    }

    const ports = await Port.find(filter).lean();
    const total = await Port.countDocuments({});

    res.json({
      success: true,
      dataStatus: 'DEMO',
      dataNote: 'Port infrastructure data from IPA & Port Authority open reports — DEMO data.',
      data: ports,
      totalCount: total,
    });
  } catch (err) {
    next(err);
  }
};

// GET /api/ports/:id
const getPortById = async (req, res, next) => {
  try {
    const port = await Port.findOne({ id: req.params.id }).lean();
    if (!port) return res.status(404).json({ success: false, message: 'Port not found' });
    res.json({ success: true, dataStatus: 'DEMO', data: port });
  } catch (err) {
    next(err);
  }
};

module.exports = { getAllPorts, getPortById };
