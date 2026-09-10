const express = require('express');
const { getSummary, getTimeSeries } = require('../controllers/freight.controller');
const router = express.Router();
router.get('/summary', getSummary);
router.get('/timeseries', getTimeSeries);
module.exports = router;
