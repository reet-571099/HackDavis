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
    'kindness': 'Acts of kindness towards others',
    'earth': 'Environmental awareness and protection',
    'inclusivity': 'Including others and celebrating differences',
    'learn': 'Learning and sharing knowledge',
    'animals': 'Caring for animals and wildlife',
    'justice': 'Understanding fairness and helping others',
    'women': 'Women empowerment and appreciation',
    'culture': 'Cultural awareness and diversity'
  },
  // Detailed category information for more variety
  categoryDetails: {
    'kindness': {
      description: 'Acts of kindness towards others',
      aspects: ['surprise gifts', 'helping hands', 'emotional support', 'appreciation', 'inclusion gestures', 'community service', 'intergenerational connections', 'unexpected kindness', 'gratitude expressions']
    },
    'earth': {
      description: 'Environmental awareness and protection',
      aspects: ['waste reduction', 'biodiversity', 'conservation', 'natural observation', 'sustainable habits', 'renewable energy', 'water conservation', 'ecological relationships', 'climate awareness']
    },
    'inclusivity': {
      description: 'Including others and celebrating differences',
      aspects: ['diverse perspectives', 'accessibility awareness', 'cultural appreciation', 'communication bridges', 'team building', 'empathy building', 'breaking stereotypes', 'community inclusion', 'ability awareness']
    },
    'learn': {
      description: 'Learning and sharing knowledge',
      aspects: ['curiosity experiments', 'skill sharing', 'historical exploration', 'scientific discovery', 'question development', 'creative learning', 'knowledge transfer', 'research mini-projects', 'wonder cultivation']
    },
    'animals': {
      description: 'Caring for animals and wildlife',
      aspects: ['habitat awareness', 'animal behavior', 'species protection', 'pet care', 'wildlife observation', 'ecosystem understanding', 'animal communication', 'ethical treatment', 'biodiversity appreciation']
    },
    'justice': {
      description: 'Understanding fairness and helping others',
      aspects: ['rule creation', 'fairness experiments', 'community needs', 'resource allocation', 'conflict resolution', 'advocacy basics', 'equal voice', 'helping disadvantaged', 'community improvement']
    },
    'women': {
      description: 'Women empowerment and appreciation',
      aspects: ['female leadership', 'gender equality', 'women in history', 'breaking barriers', 'supportive allyship', 'women in STEM', 'empowerment stories', 'confidence building', 'achievement recognition']
    },
    'culture': {
      description: 'Cultural awareness and diversity',
      aspects: ['language exploration', 'traditions & customs', 'food heritage', 'artistic expressions', 'global connections', 'multicultural stories', 'cultural symbols', 'heritage appreciation', 'cultural exchanges']
    }
  }
};