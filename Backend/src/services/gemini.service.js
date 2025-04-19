const { GoogleGenerativeAI } = require('@google/generative-ai');
const config = require('../config/config');
const Deed = require('../models/deed.model');

class GeminiService {
  constructor() {
    this.genAI = new GoogleGenerativeAI(config.geminiApiKey);
  }

  // Generate a deed based on category
  async generateDeed(category) {
    try {
      // Validate category
      if (!config.categories[category]) {
        throw new Error('Invalid category');
      }

      // Get category description
      const categoryDesc = config.categories[category];
      
      // Create model and generate deed
      const model = this.genAI.getGenerativeModel({ model: "gemini-1.5-pro" });
      
      const prompt = `Generate a fun, engaging, and meaningful task/deed for children aged 6-13 years old related to ${categoryDesc}.

The deed should:
- Be simple enough for a child to complete in under 30 minutes
- Teach a valuable lesson or build good character
- Be fun and engaging
- Be safe and appropriate for children
- Include a brief explanation of why this deed matters (1-2 sentences)
- Optionally include a fun fact related to the theme

Please format the response as a JSON object with fields:
- deed: The main task description (25 words max)
- explanation: Why this deed matters (1-2 short sentences)
- funFact: A relevant fun fact (optional)
- difficultyLevel: A number from 1-3 (1=easy, 2=medium, 3=challenging)

Don't include any other text outside the JSON object.`;

      const result = await model.generateContent(prompt);
      const response = result.response;
      const text = response.text();
      
      // Clean the response text by removing markdown formatting
      const cleanText = text.replace(/```json\n?|\n?```/g, '').trim();
      
      // Parse the JSON from the cleaned response
      const deedData = JSON.parse(cleanText);
      
      // Create a new Deed object
      const deed = new Deed({
        category: category,
        deed: deedData.deed,
        explanation: deedData.explanation,
        funFact: deedData.funFact,
        difficultyLevel: deedData.difficultyLevel,
        id: Date.now().toString() // Simple ID generation
      });
      
      return deed;
    } catch (error) {
      console.error('Error generating deed:', error);
      throw error;
    }
  }
}

module.exports = new GeminiService();