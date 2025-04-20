const { GoogleGenerativeAI } = require('@google/generative-ai');
const config = require('../config/config');
const Deed = require('../models/deed.model');
const promptVariationService = require('./prompt-variation.service');
const deedHistoryService = require('./deed-history.service');

// Import category requirements
const { categoryRequirements } = require('./categoryvalidation.service');

class GeminiService {
  constructor() {
    // Initialize Gemini client for both text and media analysis
    this.genAI = new GoogleGenerativeAI(config.geminiApiKey);
    this.client = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
    this.model = this.client.getGenerativeModel({ model: 'gemini-1.5-flash' });
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
      
      // Get category-specific requirements and examples
      const categoryRequirement = categoryRequirements[category].mustInclude;
      const categoryExamples = categoryRequirements[category].examples ? 
        `Some good examples are: "${categoryRequirements[category].examples.join('", "')}"` : '';
      
      // Get simple examples that apply to all categories
      const simpleExamplesString = promptVariationService.getSimpleExamples();
      
      // Create model
      const model = this.genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
      
      // Enhanced and simplified base prompt
      const basePrompt = `Generate a SUPER SIMPLE, fun, and quick ${category.toUpperCase()} activity for young children aged 5-10 years old related to ${categoryDesc}.

${antiExampleString}

${simpleExamplesString}

For this specific activity:
- Must be doable in under 5 minutes
- Require minimal or no materials (just common household items)
- Have clear, simple instructions (1-2 steps maximum)
- Be age-appropriate for 5-10 year olds
- Connect to the theme of ${category} in a direct, clear way
- Be safe with minimal adult supervision needed
- Be JOYFUL and playful

${randomStrategy}
The deed ${randomConstraint}.

${categoryRequirement}

${categoryExamples}

IMPORTANT: Keep the activity EXTREMELY SIMPLE. A 5-year-old should be able to understand and complete it. Use short, simple words.

Please format the response as a JSON object with fields:
- deed: The main task description (12 words max, using simple words a 6-year-old understands)
- explanation: One VERY SHORT, simple sentence explaining why this matters
- funFact: A simple, interesting fact about the topic (child-friendly)
- difficultyLevel: easy

Don't include any other text outside the JSON object.`;

      const result = await model.generateContent(basePrompt);
      const response = result.response;
      const text = response.text();
      
      // Clean the response text by removing markdown formatting
      const cleanText = text.replace(/```json\n?|\n?```/g, '').trim();
      
      // Parse the JSON from the cleaned response
      const deedData = JSON.parse(cleanText);
      
      // Validate that the deed meets basic requirements
      const validationResult = this.validateDeed(deedData.deed, category);
      
      // If not valid, try again (limited to 3 retries to avoid infinite loops)
      if (!validationResult.isValid) {
        console.log(`Generated deed did not meet requirements: ${validationResult.reason}. Trying again...`);
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
  
  // Enhanced validation method
  validateDeed(deedText, category) {
    const requirements = categoryRequirements[category];
    const keywords = requirements.keywordCheck;
    const lowerDeed = deedText.toLowerCase();
    
    // Check if at least one keyword is present
    const hasKeyword = keywords.some(keyword => 
      lowerDeed.includes(keyword.toLowerCase())
    );
    
    if (!hasKeyword) {
      return { isValid: false, reason: 'No relevant keywords found' };
    }
    
    // Check if deed is simple enough (word count)
    const wordCount = deedText.split(' ').length;
    if (wordCount > 15) {
      return { isValid: false, reason: 'Too many words (max 15)' };
    }
    
    // Check for complexity markers
    const complexityMarkers = ['create a', 'design a', 'build a', 'organize a', 'construct', 'develop a'];
    const hasComplexity = complexityMarkers.some(marker => 
      lowerDeed.includes(marker.toLowerCase())
    );
    
    if (hasComplexity) {
      return { isValid: false, reason: 'Task seems too complex' };
    }
    
    return { isValid: true, reason: 'Deed meets requirements' };
  }

  // Analyze image with Gemini AI
  async analyzeImage(imageBase64, category) {
    try {
      console.log('Analyzing image with Gemini AI...');

      // Create the prompt based on the category
      const prompt = this.createPrompt(category);

      // Generate content with the image
      const result = await this.model.generateContent([
        prompt,
        {
          inlineData: {
            mimeType: 'image/jpeg',
            data: imageBase64
          }
        }
      ]);

      const response = await result.response;
      const text = response.text();

      // Clean the response text by removing markdown formatting
      const cleanText = text.replace(/```json\n?|\n?```/g, '').trim();

      // Parse the response to extract the JSON object
      try {
        const analysis = JSON.parse(cleanText);
        return {
          matches: analysis.matches,
          confidence: analysis.confidence,
          explanation: analysis.explanation
        };
      } catch (parseError) {
        console.error('Error parsing Gemini response:', parseError);
        console.error('Raw response:', text);
        throw new Error('Failed to parse Gemini AI response');
      }
    } catch (error) {
      console.error('Gemini AI error:', error);
      throw new Error(`Gemini AI error: ${error.message}`);
    }
  }

  // Create a prompt for image analysis
  createPrompt(category) {
    return `Analyze this image and determine if it matches the category "${category}".
    
    Categories and their meanings:
    - helping: Shows someone actively helping or assisting another person
    - environment: Shows environmental conservation or cleanup activities
    - kindness: Shows acts of kindness, compassion, or positive social interaction
    - sharing: Shows sharing of resources, knowledge, or time
    
    Requirements:
    1. The image MUST clearly show an act matching the specified category
    2. The action must be the main focus of the image
    3. The context must be appropriate for the category
    
    Return ONLY a JSON object in this exact format, with no additional text or formatting:
    {
      "matches": boolean,
      "confidence": number between 0 and 1,
      "explanation": "detailed explanation"
    }`;
  }

  // Analyze audio with Gemini AI
  async analyzeAudio(audioBase64, category) {
    try {
      console.log('Analyzing audio with Gemini AI...');
      
      const prompt = this.createAudioPrompt(category);
      
      const result = await this.model.generateContent([
        prompt,
        {
          inlineData: {
            mimeType: 'audio/mp3',
            data: audioBase64
          }
        }
      ]);

      const response = await result.response;
      const text = response.text();
      
      // Clean the response text by removing markdown formatting
      const cleanText = text.replace(/```json\n?|\n?```/g, '').trim();
      
      try {
        const analysis = JSON.parse(cleanText);
        return {
          matches: analysis.matches,
          confidence: analysis.confidence,
          explanation: analysis.explanation,
          transcript: analysis.transcript
        };
      } catch (parseError) {
        console.error('Error parsing Gemini response:', parseError);
        console.error('Raw response:', text);
        throw new Error('Failed to parse Gemini AI response');
      }
    } catch (error) {
      console.error('Gemini AI error:', error);
      throw new Error(`Gemini AI error: ${error.message}`);
    }
  }

  // Create a prompt for audio analysis
  createAudioPrompt(category) {
    return `Analyze this audio recording and determine if it matches the category "${category}".
    
    Categories and their meanings:
    - helping: Describes someone helping or assisting another person
    - environment: Describes environmental conservation or cleanup activities
    - kindness: Describes acts of kindness, compassion, or positive social interaction
    - sharing: Describes sharing of resources, knowledge, or time
    
    Requirements:
    1. The audio MUST clearly describe an act matching the specified category
    2. The description must be the main focus of the audio
    3. The context must be appropriate for the category
    
    Return ONLY a JSON object in this exact format, with no additional text or formatting:
    {
      "matches": boolean,
      "confidence": number between 0 and 1,
      "explanation": "detailed explanation",
      "transcript": "transcription of the audio"
    }`;
  }
}

module.exports = new GeminiService();
