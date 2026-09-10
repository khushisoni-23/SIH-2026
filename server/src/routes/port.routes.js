const express = require('express');
const { getAllPorts, getPortById } = require('../controllers/port.controller');
const router = express.Router();
router.get('/', getAllPorts);
router.get('/:id', getPortById);
module.exports = router;
