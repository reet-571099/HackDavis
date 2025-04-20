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
    const deedDoc = await db.collection('deeds').doc(id).get();
    
    if (!deedDoc.exists) {
      return res.status(404).json({ error: 'Deed not found' });
    }
    
    res.json(deedDoc.data());
  } catch (error) {
    console.error('Error getting deed by ID:', error);
    res.status(500).json({ error: 'Failed to get deed' });
  }
};

// Get deed statistics
const getDeedStats = async (req, res) => {
  try {
    // Get all showTell entries
    const showTellSnapshot = await db.collection('showTell').get();
    
    if (showTellSnapshot.empty) {
      return res.json({ deeds: [] });
    }
    
    // Process each showTell entry
    const deedPromises = showTellSnapshot.docs.map(async (doc) => {
      const showTellData = doc.data();
      
      // Get the deed details using the deedId
      let deedData = null;
      if (showTellData.deedId) {
        const deedDoc = await db.collection('deeds').doc(showTellData.deedId).get();
        if (deedDoc.exists) {
          deedData = deedDoc.data();
        }
      }
      
      // Format createdAt as date only (YYYY-MM-DD)
      let formattedDate = null;
      if (showTellData.createdAt) {
        const date = showTellData.createdAt.toDate ? 
          showTellData.createdAt.toDate() : 
          new Date(showTellData.createdAt);
        
        formattedDate = date.toISOString().split('T')[0]; // YYYY-MM-DD format
      }
      
      // Safely access nested explanation from verificationDetails
      let explanation = '';
      if (showTellData.verificationDetails && showTellData.verificationDetails.explanation) {
        explanation = showTellData.verificationDetails.explanation;
      }
      
      // Return the combined data with deedId as the id
      return {
        id: showTellData.deedId || null, // Use deedId instead of showTell doc ID
        explanation: explanation,
        approved: showTellData.verifiedByAI,
        createdAt: formattedDate, // Formatted date
        deed: deedData ? {
          id: deedData.id,
          category: deedData.category,
          deed: deedData.deed
        } : null
      };
    });
    
    // Wait for all promises to resolve
    const deeds = await Promise.all(deedPromises);
    
    // Return the results
    res.json({ deeds });
  } catch (error) {
    console.error('Error getting deed statistics:', error);
    res.status(500).json({ error: 'Failed to get deed statistics' });
  }
};

// Create a test deed
const createTestDeed = async (req, res) => {
  try {
    const { category, deed } = req.body;
    
    if (!category || !deed) {
      return res.status(400).json({ error: 'Category and deed are required' });
    }
    
    const id = `test-${Date.now()}`;
    const deedData = {
      id,
      category,
      deed,
      createdAt: new Date()
    };
    
    await db.collection('deeds').doc(id).set(deedData);
    
    res.json({
      ...deedData,
      message: 'Test deed created successfully'
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
  createTestDeed,
  getDeedStats
};
