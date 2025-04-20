const express = require('express');
const emailController = require('../controllers/email.controller');

const router = express.Router();

// Test email endpoint
router.post('/test', emailController.sendLearningStatsEmail);

module.exports = router; 