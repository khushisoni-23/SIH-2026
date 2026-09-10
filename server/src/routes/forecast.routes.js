const express = require('express');
const { body } = require('express-validator');
const { generateForecast, getMyForecasts } = require('../controllers/forecast.controller');
const { protect } = require('../middleware/auth');
const router = express.Router();

router.post(
  '/generate',
  protect,
  [
    body('cargoType').notEmpty().withMessage('Cargo type is required'),
    body('cargoQuantity').isNumeric().withMessage('Cargo quantity must be a number'),
    body('origin').notEmpty().withMessage('Origin is required'),
    body('destination').notEmpty().withMessage('Destination is required'),
  ],
  generateForecast
);

router.get('/my', protect, getMyForecasts);

module.exports = router;
