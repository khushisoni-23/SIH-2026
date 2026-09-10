const express = require('express');
const { getRoutes } = require('../controllers/route.controller');
const router = express.Router();
router.get('/', getRoutes);
module.exports = router;
