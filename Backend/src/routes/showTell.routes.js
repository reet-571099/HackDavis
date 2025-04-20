const express = require('express');
const router = express.Router();
const showTellController = require('../controllers/showTell.controller');
const upload = require('../middleware/upload');
const multer = require('multer');
const path = require('path');

// Configure multer for photo uploads
const photoStorage = multer.memoryStorage();
const uploadPhoto = multer({ 
  storage: photoStorage,
  fileFilter: (req, file, cb) => {
    const allowedMimeTypes = [
      'image/jpeg',
      'image/png',
      'image/gif',
      'image/webp'
    ];
    
    if (allowedMimeTypes.includes(file.mimetype)) {
      cb(null, true);
    } else {
      cb(new Error('Invalid file type. Only image files (jpg, png, gif, webp) are allowed!'), false);
    }
  },
  limits: {
    fileSize: 5 * 1024 * 1024 // 5MB limit for photos
  }
});

// Configure multer for audio uploads
const audioStorage = multer.memoryStorage();
const uploadAudio = multer({ 
  storage: audioStorage,
  fileFilter: (req, file, cb) => {
    const allowedMimeTypes = [
      'audio/mpeg',    // mp3
      'audio/wav',     // wav
      'audio/ogg',     // ogg
      'audio/mp4',     // m4a
      'audio/x-m4a',   // m4a
      'audio/webm'     // webm
    ];
    
    if (allowedMimeTypes.includes(file.mimetype)) {
      cb(null, true);
    } else {
      cb(new Error('Invalid file type. Only audio files (mp3, wav, ogg, m4a, webm) are allowed!'), false);
    }
  },
  limits: {
    fileSize: 10 * 1024 * 1024 // 10MB limit for audio
  }
});

// Upload photo
router.post('/photo', uploadPhoto.single('photo'), showTellController.uploadPhoto);

// Save doodle
router.post('/doodle', showTellController.saveDoodle);

// Save journal entry
router.post('/journal', showTellController.saveJournalEntry);

// Save voice entry
router.post('/voice', uploadAudio.single('audio'), showTellController.saveVoiceEntry);

// Get all show & tell entries for a deed
router.get('/deed/:deedId', showTellController.getDeedEntries);

// Debug route to list all deeds
router.get('/deeds', showTellController.listAllDeeds);

// Create a test deed
router.post('/test-deed', showTellController.createTestDeed);

// Create multiple test deeds
router.post('/test-deeds', showTellController.createTestDeeds);

// Add the test route
router.post('/test-verification', upload.single('image'), showTellController.testImageVerification);

module.exports = router; 