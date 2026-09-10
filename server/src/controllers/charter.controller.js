const { validationResult } = require('express-validator');
const CharterPlan = require('../models/CharterPlan');

const computeCharterRecommendation = (params) => {
  const qty = parseFloat(params.cargoRequirementMT) || 600000;
  const voyages = parseInt(params.numberOfVoyages) || Math.ceil(qty / 75000);
  const vessel = params.preferredVessel || 'Panamax (75,000 DWT)';
  const spotRateAvg = 27.20;
  const coaRate = 23.95;
  const spotTotal = qty * spotRateAvg;
  const coaTotal = qty * coaRate;
  const savings = spotTotal - coaTotal;

  return {
    recommendedVoyages: voyages,
    recommendedVesselClass: vessel.split(' ')[0],
    spotRateAvgForecastUSD: spotRateAvg,
    contractRateAgreedUSD: coaRate,
    totalContractCostUSD: coaTotal,
    estimatedSavingVsSpotUSD: savings,
    savingPercentage: Number(((savings / spotTotal) * 100).toFixed(2)),
  };
};

// POST /api/charter/plan  (protected)
const createCharterPlan = async (req, res, next) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ success: false, errors: errors.array() });
    }

    const { cargoRequirementMT, numberOfVoyages, origin, destination, contractDuration, preferredVessel, commodity } = req.body;

    const recommendation = computeCharterRecommendation({ cargoRequirementMT, numberOfVoyages, preferredVessel });

    const plan = await CharterPlan.create({
      submittedBy: req.user._id,
      cargoRequirementMT: parseFloat(cargoRequirementMT),
      numberOfVoyages: parseInt(numberOfVoyages),
      origin,
      destination,
      contractDuration,
      preferredVessel,
      commodity,
      recommendation,
      dataStatus: 'USER',
    });

    res.status(201).json({
      success: true,
      dataStatus: 'USER',
      message: 'Charter plan saved to database',
      data: plan,
    });
  } catch (err) {
    next(err);
  }
};

// GET /api/charter/plans  (protected) — my plans
const getMyPlans = async (req, res, next) => {
  try {
    const plans = await CharterPlan.find({ submittedBy: req.user._id })
      .sort({ createdAt: -1 })
      .lean();
    res.json({ success: true, data: plans });
  } catch (err) {
    next(err);
  }
};

module.exports = { createCharterPlan, getMyPlans };
