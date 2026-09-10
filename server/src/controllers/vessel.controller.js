const Vessel = require('../models/Vessel');

// GET /api/vessels?cargoQuantity=75000
const getVessels = async (req, res, next) => {
  try {
    const { cargoQuantity } = req.query;
    let vessels = await Vessel.find({}).lean();

    // Re-score suitability based on cargo quantity if provided
    if (cargoQuantity) {
      const qty = parseFloat(cargoQuantity);
      vessels = vessels.map((v) => {
        let baseScore = v.suitabilityScore;
        let isRec = v.isRecommended;

        if (qty >= 70000 && qty <= 90000 && v.id === 'panamax') { baseScore = 96; isRec = true; }
        else if (qty > 100000 && v.id === 'capesize') { baseScore = 94; isRec = true; }
        else if (qty <= 40000 && v.id === 'handysize') { baseScore = 90; isRec = true; }
        else if (qty > 40000 && qty < 70000 && v.id === 'supramax') { baseScore = 92; isRec = true; }
        else if (v.id === 'panamax' && (qty < 70000 || qty > 90000)) { isRec = false; }

        return { ...v, suitabilityScore: baseScore, isRecommended: isRec };
      });
    }

    res.json({
      success: true,
      dataStatus: 'DEMO',
      dataNote: 'Vessel specifications from BIMCO/Clarksons industry benchmarks — DEMO data.',
      data: vessels,
      recommendedVessel: vessels.find((v) => v.isRecommended) || vessels[2] || null,
    });
  } catch (err) {
    next(err);
  }
};

module.exports = { getVessels };
