const express = require('express');
const { body } = require('express-validator');
const { createCharterPlan, getMyPlans } = require('../controllers/charter.controller');
const { protect } = require('../middleware/auth');
const router = express.Router();

router.post(
  '/plan',
  protect,
  [
    body('cargoRequirementMT').isNumeric().withMessage('Cargo requirement must be a number'),
    body('origin').notEmpty().withMessage('Origin is required'),
    body('destination').notEmpty().withMessage('Destination is required'),
  ],
  createCharterPlan
);

router.get('/plans', protect, getMyPlans);

module.exports = router;
