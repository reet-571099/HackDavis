const express = require('express');
const deedController = require('../controllers/deed.controller');

const router = express.Router();

// Get all categories
router.get('/categories', deedController.getCategories);

// Generate a deed
router.post('/generate', deedController.generateDeed);

// Get deed by ID (for future use)
router.get('/:id', deedController.getDeedById);

// Create a test deed
router.post('/test', deedController.createTestDeed);

module.exports = router;