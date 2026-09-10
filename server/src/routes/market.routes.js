const express = require('express');
const { getMarketData } = require('../controllers/market.controller');
const router = express.Router();
router.get('/', getMarketData);
module.exports = router;
