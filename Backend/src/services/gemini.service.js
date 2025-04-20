const { GoogleGenerativeAI } = require('@google/generative-ai');
const config = require('../config/config');

class GeminiService {
  constructor() {
    // Initialize the Gemini client
    this.client = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
    this.model = this.client.getGenerativeModel({ model: 'gemini-1.5-flash' });
  }

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