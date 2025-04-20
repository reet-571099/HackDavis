const express = require("express");
const router = express.Router();
const showTellController = require("../controllers/showTell.controller");
const upload = require("../middleware/upload");
const multer = require("multer");
const path = require("path");

// Configure multer for photo uploads
const photoStorage = multer.memoryStorage();
const uploadPhoto = multer({
  storage: photoStorage,
  fileFilter: (req, file, cb) => {
    const allowedMimeTypes = [
      "image/jpeg",
      "image/png",
      "image/gif",
      "image/webp",
    ];

    if (allowedMimeTypes.includes(file.mimetype)) {
      cb(null, true);
    } else {
      cb(
        new Error(
          "Invalid file type. Only image files (jpg, png, gif, webp) are allowed!"
        ),
        false
      );
    }
  },
  limits: {
    fileSize: 5 * 1024 * 1024, // 5MB limit for photos
  },
});

// Configure multer for audio uploads
const audioStorage = multer.memoryStorage();
const uploadAudio = multer({
  storage: audioStorage,
  fileFilter: (req, file, cb) => {
    console.log("Received audio file:", {
      originalname: file.originalname,
      mimetype: file.mimetype,
      size: file.size,
      fieldname: file.fieldname,
    });

    const allowedMimeTypes = [
      "audio/mpeg", // mp3
      "audio/wav", // wav
      "audio/ogg", // ogg
      "audio/mp4", // m4a
      "audio/x-m4a", // m4a
      "audio/webm", // webm
      "audio/x-wav", // wav
      "audio/wave", // wav
      "audio/x-pn-wav", // wav
      "audio/3gpp", // 3gp
      "audio/3gpp2", // 3g2
      "audio/aac", // aac
      "audio/x-aac", // aac
      "audio/x-caf", // caf
      "audio/x-m4r", // m4r
      "audio/midi", // midi
      "audio/x-midi", // midi
      "audio/mp3", // mp3
      "audio/mpeg3", // mp3
      "audio/x-mpeg3", // mp3
      "audio/mpg", // mpg
      "audio/x-mpg", // mpg
      "audio/x-mpegaudio", // mp3
      "audio/m4a", // m4a - added specifically for your case
      "audio/x-m4a", // m4a - alternative mime type
      "audio/aac", // aac - sometimes used for m4a
      "audio/x-aac", // aac - alternative mime type
    ];

    if (allowedMimeTypes.includes(file.mimetype)) {
      console.log("File accepted with MIME type:", file.mimetype);
      cb(null, true);
    } else {
      console.log("Invalid MIME type received:", file.mimetype);
      console.log("Allowed MIME types:", allowedMimeTypes);
      cb(
        new Error(
          `Invalid file type. Only audio files are allowed! Received type: ${file.mimetype}`
        ),
        false
      );
    }
  },
  limits: {
    fileSize: 10 * 1024 * 1024, // 10MB limit for audio
  },
});

// Photo routes
router.post(
  "/photo",
  uploadPhoto.single("file"),
  showTellController.uploadPhoto
);
router.post(
  "/photo/test",
  uploadPhoto.single("file"),
  showTellController.testImageVerification
);

// Voice routes
router.post(
  "/voice",
  uploadAudio.single("audio"),
  showTellController.saveVoiceEntry
);

// Journal routes
router.post("/journal", showTellController.saveJournalEntry);

// Doodle routes
router.post("/doodle", showTellController.saveDoodle);

// Get entries for a deed
router.get("/entries/:deedId", showTellController.getDeedEntries);

// Test routes
router.get("/deeds", showTellController.listAllDeeds);
router.post("/test-deed", showTellController.createTestDeed);
router.post("/test-deeds", showTellController.createTestDeeds);

module.exports = router;
