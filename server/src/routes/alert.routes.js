const express = require('express');
const { getAlerts } = require('../controllers/alert.controller');
const router = express.Router();
router.get('/', getAlerts);
module.exports = router;
