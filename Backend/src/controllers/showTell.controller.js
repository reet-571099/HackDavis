const { db } = require('../config/firebase');
const { v4: uuidv4 } = require('uuid');
const admin = require('firebase-admin');
const sharp = require('sharp');
const { generateDeed } = require('../services/deed.service');
const geminiService = require('../services/gemini.service');
const multer = require('multer');
const path = require('path');

// Helper function to generate child-friendly feedback messages
function generateFeedbackMessage(explanation, deed) {
  const lowerExplanation = explanation.toLowerCase();
  
  if (lowerExplanation.includes('not specific') || lowerExplanation.includes('vague')) {
    return "Try to tell us exactly what you did! For example, instead of saying 'I helped', say 'I helped my friend pick up their toys'.";
  }
  
  if (lowerExplanation.includes('different activity') || lowerExplanation.includes('not matching')) {
    return `Remember, we're looking for: "${deed}". Try again with that specific activity!`;
  }
  
  if (lowerExplanation.includes('not clear') || lowerExplanation.includes('unclear')) {
    return "Speak a little louder and clearer next time so we can understand your awesome deed!";
  }
  
  if (lowerExplanation.includes('incomplete') || lowerExplanation.includes('partial')) {
    return "Tell us the whole story! What happened from start to finish?";
  }
  
  if (lowerExplanation.includes('not related') || lowerExplanation.includes('unrelated')) {
    return `Let's focus on "${deed}". You can do it!`;
  }
  
  // Default message if none of the above match
  return "Nice try! Let's try again with more details about what you did. You can do it!";
}

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
    const analysis = await geminiService.analyzeImage(base64Image, {
      deed: deed.deed,
      category: deed.category
    });

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
        deed: deed.deed,
        category: deed.category,
        requiredCategory: deed.category
      }
    };

    await entryRef.set(entryData);

    // Update category counts based on verification
    const categoryRef = db.collection('categoryStats').doc(deed.category);
    const categoryDoc = await categoryRef.get();
    
    if (analysis.matches) {
      // Increment true count
      await categoryRef.set({
        trueCount: (categoryDoc.exists ? (categoryDoc.data().trueCount || 0) : 0) + 1,
        falseCount: categoryDoc.exists ? (categoryDoc.data().falseCount || 0) : 0
      }, { merge: true });

      res.status(201).json({
        message: 'Great job! Your photo matches the deed perfectly!',
        entryId,
        verification: {
          matches: true,
          confidence: analysis.confidence,
          explanation: analysis.explanation,
          deed: deed.deed,
          category: deed.category
        }
      });
    } else {
      // Increment false count
      await categoryRef.set({
        trueCount: categoryDoc.exists ? (categoryDoc.data().trueCount || 0) : 0,
        falseCount: (categoryDoc.exists ? (categoryDoc.data().falseCount || 0) : 0) + 1
      }, { merge: true });

      // Generate a child-friendly feedback message based on the explanation
      const feedbackMessage = generateFeedbackMessage(analysis.explanation, deed.deed);

      res.status(201).json({
        message: feedbackMessage,
        entryId,
        verification: {
          matches: false,
          confidence: analysis.confidence,
          explanation: analysis.explanation,
          deed: deed.deed,
          category: deed.category,
          suggestion: 'Try to take a photo that clearly shows you doing the deed. Make sure the main action is visible!'
        }
      });
    }
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

    // Get deed details from Firestore
    const deedDoc = await db.collection('deeds').doc(deedId).get();
    if (!deedDoc.exists) {
      return res.status(404).json({ error: 'Deed not found' });
    }

    const deed = deedDoc.data();

    // Analyze journal entry with Gemini AI
    const analysis = await geminiService.analyzeText(content, {
      deed: deed.deed,
      category: deed.category
    });

    const entryId = uuidv4();
    const entryRef = db.collection('showTell').doc(entryId);
    
    const entryData = {
      id: entryId,
      deedId,
      type: 'journal',
      content,
      journalType: type,
      createdAt: new Date(),
      approved: false,
      verifiedByAI: analysis.matches,
      verificationDetails: {
        confidence: analysis.confidence,
        explanation: analysis.explanation,
        deed: deed.deed,
        category: deed.category,
        requiredCategory: deed.category
      }
    };

    await entryRef.set(entryData);

    // Update category counts based on verification
    const categoryRef = db.collection('categoryStats').doc(deed.category);
    const categoryDoc = await categoryRef.get();
    
    if (analysis.matches) {
      // Increment true count
      await categoryRef.set({
        trueCount: (categoryDoc.exists ? (categoryDoc.data().trueCount || 0) : 0) + 1,
        falseCount: categoryDoc.exists ? (categoryDoc.data().falseCount || 0) : 0
      }, { merge: true });

      res.status(201).json({
        message: 'Great job! Your journal entry matches the deed perfectly!',
        entryId,
        verification: {
          matches: true,
          confidence: analysis.confidence,
          explanation: analysis.explanation,
          deed: deed.deed,
          category: deed.category
        }
      });
    } else {
      // Increment false count
      await categoryRef.set({
        trueCount: categoryDoc.exists ? (categoryDoc.data().trueCount || 0) : 0,
        falseCount: (categoryDoc.exists ? (categoryDoc.data().falseCount || 0) : 0) + 1
      }, { merge: true });

      // Generate a child-friendly feedback message based on the explanation
      const feedbackMessage = generateFeedbackMessage(analysis.explanation, deed.deed);

      res.status(201).json({
        message: feedbackMessage,
        entryId,
        verification: {
          matches: false,
          confidence: analysis.confidence,
          explanation: analysis.explanation,
          deed: deed.deed,
          category: deed.category,
          suggestion: 'Try to be more specific about how you completed the deed. For example, if the deed is about helping someone, describe exactly how you helped them.'
        }
      });
    }
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
    const analysis = await geminiService.analyzeImage(base64Image, {
      deed: deed.deed,
      category: deed.category
    });

    // Update category counts based on verification
    const categoryRef = db.collection('categoryStats').doc(deed.category);
    const categoryDoc = await categoryRef.get();
    
    if (analysis.matches) {
      // Increment true count
      await categoryRef.set({
        trueCount: (categoryDoc.exists ? (categoryDoc.data().trueCount || 0) : 0) + 1,
        falseCount: categoryDoc.exists ? (categoryDoc.data().falseCount || 0) : 0
      }, { merge: true });

      res.status(201).json({
        message: 'Great job! Your photo matches the deed perfectly!',
        verification: {
          matches: true,
          confidence: analysis.confidence,
          explanation: analysis.explanation,
          deed: deed.deed,
          category: deed.category
        }
      });
    } else {
      // Increment false count
      await categoryRef.set({
        trueCount: categoryDoc.exists ? (categoryDoc.data().trueCount || 0) : 0,
        falseCount: (categoryDoc.exists ? (categoryDoc.data().falseCount || 0) : 0) + 1
      }, { merge: true });

      // Generate a child-friendly feedback message based on the explanation
      const feedbackMessage = generateFeedbackMessage(analysis.explanation, deed.deed);

      res.status(201).json({
        message: feedbackMessage,
        verification: {
          matches: false,
          confidence: analysis.confidence,
          explanation: analysis.explanation,
          deed: deed.deed,
          category: deed.category,
          suggestion: 'Try to take a photo that clearly shows you doing the deed. Make sure the main action is visible!'
        }
      });
    }
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

    // Analyze audio with Gemini AI, passing both the deed content and category
    const analysis = await geminiService.analyzeAudio(base64Audio, {
      deed: deed.deed,  // The actual deed content
      category: deed.category
    });

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
        deed: deed.deed,  // Store the original deed
        category: deed.category,
        requiredCategory: deed.category
      }
    };

    await entryRef.set(entryData);

    // Update category counts based on verification
    const categoryRef = db.collection('categoryStats').doc(deed.category);
    const categoryDoc = await categoryRef.get();
    
    if (analysis.matches) {
      // Increment true count
      await categoryRef.set({
        trueCount: (categoryDoc.exists ? (categoryDoc.data().trueCount || 0) : 0) + 1,
        falseCount: categoryDoc.exists ? (categoryDoc.data().falseCount || 0) : 0
      }, { merge: true });

      res.status(201).json({
        message: 'Great job! Your submission matches the deed perfectly!',
        entryId,
        verification: {
          matches: true,
          confidence: analysis.confidence,
          explanation: analysis.explanation,
          transcript: analysis.transcript,
          deed: deed.deed,
          category: deed.category
        }
      });
    } else {
      // Increment false count
      await categoryRef.set({
        trueCount: categoryDoc.exists ? (categoryDoc.data().trueCount || 0) : 0,
        falseCount: (categoryDoc.exists ? (categoryDoc.data().falseCount || 0) : 0) + 1
      }, { merge: true });

      res.status(201).json({
        message: 'Nice try! Your submission doesn\'t quite match the deed. Here\'s a suggestion: ' + 
                'Try to focus more on the specific action mentioned in the deed. You can do it!',
        entryId,
        verification: {
          matches: false,
          confidence: analysis.confidence,
          explanation: analysis.explanation,
          transcript: analysis.transcript,
          deed: deed.deed,
          category: deed.category,
          suggestion: 'Try to be more specific about how you completed the deed. For example, if the deed is about helping someone, describe exactly how you helped them.'
        }
      });
    }
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