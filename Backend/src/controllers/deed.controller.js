const deedService = require('../services/deed.service');
const { db } = require('../config/firebase');

// Get all categories
const getCategories = async (req, res) => {
  try {
    const categories = await deedService.getCategories();
    res.json(categories);
  } catch (error) {
    console.error('Error getting categories:', error);
    res.status(500).json({ error: 'Failed to get categories' });
  }
};

// Generate a deed
const generateDeed = async (req, res) => {
  try {
    const { category } = req.body;
    if (!category) {
      return res.status(400).json({ error: 'Category is required' });
    } 
       
    // Generate the deed using the service
    const generatedDeed = await deedService.generateDeed(category);
    
    // Store the deed in the database
    const deedData = {
      id: generatedDeed.id,
      category: generatedDeed.category,
      deed: generatedDeed.deed,
      createdAt: new Date()
    };

    await db.collection('deeds').doc(generatedDeed.id).set(deedData);
    
    // Return both the generated deed and confirmation of storage
    res.json({
      ...generatedDeed,
      stored: true,
      message: 'Deed generated and stored successfully'
    });
  } catch (error) {
    console.error('Error generating deed:', error);
    res.status(500).json({ error: 'Failed to generate deed' });
  }
};

// Get deed by ID
const getDeedById = async (req, res) => {
  try {
    const { id } = req.params;
    const deed = await deedService.getDeedById(id);
    if (!deed) {
      return res.status(404).json({ error: 'Deed not found' });
    }
    res.json(deed);
  } catch (error) {
    console.error('Error getting deed:', error);
    res.status(500).json({ error: 'Failed to get deed' });
  }
};

// Create a test deed
const createTestDeed = async (req, res) => {
  try {
    const deedId = 'test-deed-' + Date.now();
    const deedData = {
      title: 'Help a Friend',
      description: 'Help your friend with their homework',
      category: 'helping',
      points: 10,
      createdAt: new Date()
    };

    await db.collection('deeds').doc(deedId).set(deedData);
    
    res.status(201).json({
      message: 'Test deed created successfully',
      deedId,
      ...deedData
    });
  } catch (error) {
    console.error('Error creating test deed:', error);
    res.status(500).json({ error: 'Failed to create test deed' });
  }
};

module.exports = {
  getCategories,
  generateDeed,
  getDeedById,
  createTestDeed
};
