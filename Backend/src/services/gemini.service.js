const { GoogleGenerativeAI } = require('@google/generative-ai');
const config = require('../config/config');
const Deed = require('../models/deed.model');
const promptVariationService = require('./prompt-variation.service');
const deedHistoryService = require('./deed-history.service');

// Import category requirements (you could also include this directly in this file)
const { categoryRequirements } = require('./categoryvalidation.service');

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

      // Get category description and details
      const categoryDesc = config.categories[category];
      const categoryDetails = config.categoryDetails[category];
      
      // Get random variation elements
      const randomAspect = categoryDetails.aspects[Math.floor(Math.random() * categoryDetails.aspects.length)];
      const randomElement = promptVariationService.getRandomActivityElement();
      const randomConstraint = promptVariationService.getRandomConstraint();
      const randomStrategy = promptVariationService.getRandomStrategy();
      
      // Get recent deeds to avoid repetition
      const recentDeeds = deedHistoryService.getRecentDeeds(category);
      const antiExampleString = promptVariationService.getAntiExampleString(recentDeeds);
      
      // Get category-specific requirements
      const categoryRequirement = categoryRequirements[category].mustInclude;
      
      // Enhanced prompt for inclusivity category
      let categorySpecificPrompt = '';
      if (category === 'inclusivity') {
        categorySpecificPrompt = `
IMPORTANT: Create an inclusivity deed that does ONE OR MORE of these:
1. Brings different groups of people together in a fun way
2. Helps celebrate and learn from our differences
3. Makes someone feel specially included and valued
4. Creates new friendships across different backgrounds
5. Helps break down barriers between groups

The deed should be:
- Fun and engaging for kids
- Easy to do in a school or community setting
- Focused on positive interactions
- Something that creates real connections

Examples of good deeds:
- Start a "friendship lunch table" where kids invite others who usually sit alone
- Create a game that everyone can play regardless of abilities
- Organize a mini cultural festival where everyone shares something special
- Start a buddy system that pairs kids with different interests or backgrounds
`;
      }

      // Create model
      const model = this.genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
      
      // Enhanced base prompt
      const basePrompt = `Generate a unique, fun, very simple and easy to do, and meaningful ${category.toUpperCase()} task/deed for children aged 6-13 years old related to ${categoryDesc}.

${antiExampleString}

For this specific deed, focus on the aspect of "${randomAspect}" within the ${category} category.
${randomStrategy}.
The deed ${randomConstraint}.

${categoryRequirement}

${categorySpecificPrompt}

Additional requirements:
- Be age-appropriate and achievable in under 30 minutes
- Connect to the theme of ${category} in a direct, clear way
- Create lasting positive impact, not just temporary awareness
- Include specific actions and measurable outcomes
- Be safe and appropriate for children to do with minimal adult supervision
- Avoid crafts that require specialized materials
- Be ORIGINAL and DIFFERENT from typical suggestions
- Use simple language and easy to understand

Please format the response as a JSON object with fields:
- deed: The main task description (25 words max, written in an exciting, action-oriented way)
- explanation: Why this deed matters (1-2 short sentences connecting to social impact)
- funFact: A surprising or interesting fact related to the theme
- difficultyLevel: easy and simple
- impactMetric: How to measure the success of this deed

Don't include any other text outside the JSON object.`;

      const result = await model.generateContent(basePrompt);
      const response = result.response;
      const text = response.text();
      
      // Simplified validation for inclusivity deeds
      if (category === 'inclusivity') {
        const deedData = JSON.parse(text.replace(/```json\n?|\n?```/g, '').trim());
        const deedText = deedData.deed.toLowerCase();
        
        // Check for at least one keyword
        const hasKeyword = this.validateDeed(deedText, category);
        
        // If basic validation fails, try once more
        if (!hasKeyword) {
          console.log('Retrying once for better inclusivity deed...');
          return this.generateDeed(category);
        }
      }

      // Clean the response text by removing markdown formatting
      const cleanText = text.replace(/```json\n?|\n?```/g, '').trim();
      
      // Parse the JSON from the cleaned response
      const deedData = JSON.parse(cleanText);
      
      // Validate that the deed meets the category requirements
      const isValid = this.validateDeed(deedData.deed, category);
      
      // If not valid, try again (in production, you might want to limit retries)
      if (!isValid) {
        console.log(`Generated deed did not meet ${category} requirements. Trying again...`);
        return this.generateDeed(category);
      }
      
      // Create a new Deed object
      const deed = new Deed({
        category: category,
        deed: deedData.deed,
        explanation: deedData.explanation,
        funFact: deedData.funFact,
        difficultyLevel: deedData.difficultyLevel,
        id: Date.now().toString() // Simple ID generation
      });
      
      // Store the deed in history to avoid repetition
      deedHistoryService.addDeed(category, deedData.deed);
      
      return deed;
    } catch (error) {
      if (error.message.includes('429') || error.message.includes('quota')) {
        throw new Error('Rate limit reached. Please try again in a minute.');
      }
      console.error('Error generating deed:', error);
      throw error;
    }
  }
  
  // Simplified validation method
  validateDeed(deedText, category) {
    const requirements = categoryRequirements[category];
    const keywords = requirements.keywordCheck;
    const lowerDeed = deedText.toLowerCase();
    
    // Check if at least one keyword is present
    return keywords.some(keyword => 
      lowerDeed.includes(keyword.toLowerCase())
    );
  }
}

module.exports = new GeminiService();