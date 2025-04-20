const { db } = require('../config/firebase');
const { v4: uuidv4 } = require('uuid');
const admin = require('firebase-admin');
const sharp = require('sharp');
const { generateDeed } = require('../services/deed.service');
const geminiService = require('../services/gemini.service');
const multer = require('multer');
const path = require('path');

// Configure multer for file uploads
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

// Temporary debug endpoint to list all deeds
const listAllDeeds = async (req, res) => {
  try {
    const snapshot = await db.collection('deeds').get();
    const deeds = [];
    snapshot.forEach(doc => {
      deeds.push({
        id: doc.id,
        ...doc.data()
      });
    });
    res.json(deeds);
  } catch (error) {
    console.error('Error listing deeds:', error);
    res.status(500).json({ error: 'Failed to list deeds' });
  }
};

// Upload photo as base64
const uploadPhoto = async (req, res) => {
  try {
    const { deedId } = req.body;
    const file = req.file;

    if (!file) {
      return res.status(400).json({ error: 'No file uploaded' });
    }

    if (!deedId) {
      return res.status(400).json({ error: 'Deed ID is required' });
    }

    // Get deed details from Firestore
    const deedDoc = await db.collection('deeds').doc(deedId).get();
    if (!deedDoc.exists) {
      return res.status(404).json({ error: 'Deed not found' });
    }

    const deed = deedDoc.data();

    // Process image with sharp
    const processedImage = await sharp(file.buffer)
      .resize(800, 800, {
        fit: 'inside',
        withoutEnlargement: true
      })
      .jpeg({ quality: 60 })
      .toBuffer();

    // Convert to base64
    const base64Image = processedImage.toString('base64');

    // Analyze image with Gemini AI
    const analysis = await geminiService.analyzeImage(base64Image, deed.category);

    // Create entry in Firestore
    const entryId = uuidv4();
    const entryRef = db.collection('showTell').doc(entryId);
    
    const entryData = {
      id: entryId,
      deedId,
      type: 'photo',
      content: base64Image,
      createdAt: new Date(),
      approved: false,
      verifiedByAI: analysis.matches,
      verificationDetails: {
        confidence: analysis.confidence,
        explanation: analysis.explanation,
        category: deed.category,
        requiredCategory: deed.category
      }
    };

    await entryRef.set(entryData);

    res.status(201).json({
      message: analysis.matches ? 'Photo uploaded and verified successfully' : 'Photo uploaded but does not match the deed category',
      entryId,
      verification: {
        matches: analysis.matches,
        confidence: analysis.confidence,
        explanation: analysis.explanation,
        category: deed.category
      }
    });
  } catch (error) {
    console.error('Error uploading photo:', error);
    res.status(500).json({ error: 'Failed to upload photo' });
  }
};

// Save doodle
const saveDoodle = async (req, res) => {
  try {
    const { deedId, doodleData } = req.body;

    if (!deedId || !doodleData) {
      return res.status(400).json({ error: 'Deed ID and doodle data are required' });
    }

    const entryId = uuidv4();
    const entryRef = db.collection('showTell').doc(entryId);
    
    await entryRef.set({
      id: entryId,
      deedId,
      type: 'doodle',
      content: doodleData,
      createdAt: new Date(),
      approved: false
    });

    res.status(201).json({
      message: 'Doodle saved successfully',
      entryId
    });
  } catch (error) {
    console.error('Error saving doodle:', error);
    res.status(500).json({ error: 'Failed to save doodle' });
  }
};

// Save journal entry
const saveJournalEntry = async (req, res) => {
  try {
    const { deedId, content, type } = req.body;

    if (!deedId || !content || !type) {
      return res.status(400).json({ error: 'Deed ID, content, and type are required' });
    }

    const entryId = uuidv4();
    const entryRef = db.collection('showTell').doc(entryId);
    
    await entryRef.set({
      id: entryId,
      deedId,
      type: 'journal',
      content,
      journalType: type,
      createdAt: new Date(),
      approved: false
    });

    res.status(201).json({
      message: 'Journal entry saved successfully',
      entryId
    });
  } catch (error) {
    console.error('Error saving journal entry:', error);
    res.status(500).json({ error: 'Failed to save journal entry' });
  }
};

// Get all entries for a deed
const getDeedEntries = async (req, res) => {
  try {
    const { deedId } = req.params;

    const snapshot = await db.collection('showTell')
      .where('deedId', '==', deedId)
      .orderBy('createdAt', 'desc')
      .get();

    const entries = [];
    snapshot.forEach(doc => {
      entries.push(doc.data());
    });

    res.json(entries);
  } catch (error) {
    console.error('Error fetching entries:', error);
    res.status(500).json({ error: 'Failed to fetch entries' });
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
      createdAt: new Date(),
      points: 10
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

// Create multiple test deeds
const createTestDeeds = async (req, res) => {
  try {
    const testDeeds = [
      {
        title: 'Help a Friend',
        description: 'Help your friend with their homework',
        category: 'helping',
        points: 10
      },
      {
        title: 'Clean Up',
        description: 'Pick up trash in your neighborhood',
        category: 'environment',
        points: 15
      },
      {
        title: 'Share a Smile',
        description: 'Compliment three people today',
        category: 'kindness',
        points: 5
      },
      {
        title: 'Donate Books',
        description: 'Donate books you no longer need',
        category: 'sharing',
        points: 20
      }
    ];

    const createdDeeds = [];
    for (const deed of testDeeds) {
      const deedId = 'test-deed-' + Date.now() + '-' + Math.random().toString(36).substr(2, 5);
      const deedData = {
        ...deed,
        createdAt: new Date()
      };

      await db.collection('deeds').doc(deedId).set(deedData);
      createdDeeds.push({ deedId, ...deedData });
    }
    
    res.status(201).json({
      message: 'Test deeds created successfully',
      deeds: createdDeeds
    });
  } catch (error) {
    console.error('Error creating test deeds:', error);
    res.status(500).json({ error: 'Failed to create test deeds' });
  }
};

// Add this new test function
const testImageVerification = async (req, res) => {
  try {
    const { category } = req.body;
    const file = req.file;

    if (!file) {
      return res.status(400).json({ error: 'No file uploaded' });
    }

    if (!category) {
      return res.status(400).json({ error: 'Category is required' });
    }

    // Process image with sharp
    const processedImage = await sharp(file.buffer)
      .resize(800, 800, {
        fit: 'inside',
        withoutEnlargement: true
      })
      .jpeg({ quality: 60 })
      .toBuffer();

    // Convert to base64
    const base64Image = processedImage.toString('base64');

    console.log('Testing image verification...', {
      category,
      imageSize: base64Image.length
    });

    // Analyze image with Gemini AI
    const analysis = await geminiService.analyzeImage(base64Image, category);

    res.json({
      success: true,
      message: 'Image verification test successful',
      verification: {
        matches: analysis.matches,
        confidence: analysis.confidence,
        explanation: analysis.explanation,
        category
      }
    });
  } catch (error) {
    console.error('Error testing image verification:', error);
    res.status(500).json({
      success: false,
      message: 'Image verification test failed',
      error: error.message
    });
  }
};

// Save voice entry
const saveVoiceEntry = async (req, res) => {
  try {
    const { deedId } = req.body;
    const file = req.file;

    if (!file) {
      return res.status(400).json({ error: 'No audio file uploaded' });
    }

    if (!deedId) {
      return res.status(400).json({ error: 'Deed ID is required' });
    }

    // Get deed details from Firestore
    const deedDoc = await db.collection('deeds').doc(deedId).get();
    if (!deedDoc.exists) {
      return res.status(404).json({ error: 'Deed not found' });
    }

    const deed = deedDoc.data();

    // Convert audio to base64
    const base64Audio = file.buffer.toString('base64');

    // Analyze audio with Gemini AI
    const analysis = await geminiService.analyzeAudio(base64Audio, deed.category);

    // Create entry in Firestore
    const entryId = uuidv4();
    const entryRef = db.collection('showTell').doc(entryId);
    
    const entryData = {
      id: entryId,
      deedId,
      type: 'voice',
      content: base64Audio,
      mimeType: file.mimetype,
      duration: req.body.duration || 0,
      createdAt: new Date(),
      approved: false,
      verifiedByAI: analysis.matches,
      verificationDetails: {
        confidence: analysis.confidence,
        explanation: analysis.explanation,
        transcript: analysis.transcript,
        category: deed.category,
        requiredCategory: deed.category
      }
    };

    await entryRef.set(entryData);

    res.status(201).json({
      message: analysis.matches ? 'Voice entry uploaded and verified successfully' : 'Voice entry uploaded but does not match the deed category',
      entryId,
      verification: {
        matches: analysis.matches,
        confidence: analysis.confidence,
        explanation: analysis.explanation,
        transcript: analysis.transcript,
        category: deed.category
      }
    });
  } catch (error) {
    console.error('Error saving voice entry:', error);
    res.status(500).json({ error: 'Failed to save voice entry' });
  }
};

module.exports = {
  uploadPhoto,
  saveDoodle,
  saveJournalEntry,
  getDeedEntries,
  listAllDeeds,
  createTestDeed,
  createTestDeeds,
  testImageVerification,
  saveVoiceEntry
}; 