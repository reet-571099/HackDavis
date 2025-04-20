const express = require('express');
const router = express.Router();
const healthRoutes = require('./health.routes');
const deedRoutes = require('./deed.routes');
const showTellRoutes = require('./showTell.routes');

// Health check route
router.use('/health', healthRoutes);

// Deed routes
router.use('/deed', deedRoutes);

// Show & Tell routes
router.use('/show-tell', showTellRoutes);

module.exports = router;