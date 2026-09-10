const Route = require('../models/Route');

// GET /api/routes?search=australia
const getRoutes = async (req, res, next) => {
  try {
    const { search } = req.query;
    const filter = search
      ? {
          $or: [
            { origin: new RegExp(search, 'i') },
            { destination: new RegExp(search, 'i') },
            { commodity: new RegExp(search, 'i') },
          ],
        }
      : {};

    const routes = await Route.find(filter).lean();

    res.json({
      success: true,
      dataStatus: 'DEMO',
      dataNote: 'Sample shipping routes seeded from industry data — DEMO data.',
      data: routes,
      primaryRoute: routes[0] || null,
    });
  } catch (err) {
    next(err);
  }
};

module.exports = { getRoutes };
