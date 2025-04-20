const admin = require('firebase-admin');
const config = require('./config');

try {
  // Check if Firebase app is already initialized
  if (admin.apps.length === 0) {
    // Initialize Firebase Admin
    admin.initializeApp({
      credential: admin.credential.cert({
        projectId: config.firebase.projectId,
        clientEmail: config.firebase.clientEmail,
        privateKey: config.firebase.privateKey.replace(/\\n/g, '\n')
      })
    });
  }

  // Get Firestore instance
  const db = admin.firestore();
  
  // Enable offline persistence
  db.settings({
    ignoreUndefinedProperties: true,
    timestampsInSnapshots: true
  });

  // Test Firestore connection by creating a test collection if it doesn't exist
  const testRef = db.collection('test');
  testRef.doc('test').set({ test: true })
    .then(() => {
      console.log('Firestore connection successful');
      // Clean up test document
      return testRef.doc('test').delete();
    })
    .catch(err => {
      console.error('Firestore connection failed:', err);
      if (err.code === 5) {
        console.error('Please make sure you have created a Firestore database in your Firebase Console');
      }
    });

  // Get Storage instance
  const storage = admin.storage();

  module.exports = { db, storage };
} catch (error) {
  console.error('Firebase initialization error:', error);
  process.exit(1);
} 