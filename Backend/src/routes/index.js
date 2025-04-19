const express = require('express');
const deedRoutes = require('./deed.routes');
const healthRoutes = require('./health.routes');

const router = express.Router();

// API routes
router.use('/deeds', deedRoutes);
router.use('/health', healthRoutes);

module.exports = router