const dotenv = require('dotenv');

// Load environment variables
dotenv.config();

module.exports = {
  port: process.env.PORT || 3000,
  geminiApiKey: process.env.GEMINI_API_KEY,
  environment: process.env.NODE_ENV || 'development',
  
  // Firebase Configuration
  firebase: {
    projectId: process.env.FIREBASE_PROJECT_ID,
    clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
    privateKey: process.env.FIREBASE_PRIVATE_KEY
  },

  // Add more configuration options as needed
  categories: {
    'kindness': '💞 Acts of kindness towards others',
    'earth': '🌱 Environmental awareness and protection',
    'inclusivity': '🚀 Including others and celebrating differences',
    'learn': '🧠 Learning and sharing knowledge',
    'animals': '🐾 Caring for animals and wildlife',
    'justice': '󰜫 Understanding fairness and helping others',
    'women': '🚺 Women empowerment and appreciation',
    'culture': '🌎 Cultural awareness and diversity'
  }
};