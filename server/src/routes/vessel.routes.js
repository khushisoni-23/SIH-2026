const express = require('express');
const { getVessels } = require('../controllers/vessel.controller');
const router = express.Router();
router.get('/', getVessels);
module.exports = router;
