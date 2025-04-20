const express = require('express');
const router = express.Router();
const healthRoutes = require('./health.routes');
const showTellRoutes = require('./showTell.routes');

// Health check route
router.use('/deeds', deedRoutes);
router.use('/health', healthRoutes);
router.use('/show-tell', showTellRoutes);

module.exports = router