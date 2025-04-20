const axios = require('axios');
const config = require('../config/config');

class CerebrasService {
  constructor() {
    this.apiKey = process.env.CEREBRAS_API_KEY;
    this.baseUrl = 'https://api.cerebras.ai/v1/chat/completions';
  }

  async analyzeImage(imageBase64, prompt) {
    try {
      console.log('Making request to Cerebras API...', {
        endpoint: this.baseUrl,
        hasApiKey: !!this.apiKey,
        promptLength: prompt.length,
        imageSize: imageBase64.length
      });

      const requestBody = {
        model: "cerebras-llm",
        messages: [
          {
            role: "user",
            content: prompt + "\n\nImage data: " + `data:image/jpeg;base64,${imageBase64}`
          }
        ],
        max_tokens: 500
      };

      const response = await axios.post(
        this.baseUrl,
        requestBody,
        {
          headers: {
            'Authorization': `Bearer ${this.apiKey}`,
            'Content-Type': 'application/json'
          }
        }
      );

      console.log('Cerebras API response:', response.data);
      
      // Parse the response to extract the JSON object
      try {
        const content = response.data.choices[0].message.content;
        const jsonMatch = content.match(/\{[\s\S]*\}/);
        if (jsonMatch) {
          return JSON.parse(jsonMatch[0]);
        }
      } catch (e) {
        console.error('Error parsing JSON from response:', e);
      }
      
      throw new Error('Invalid response format from Cerebras API');
    } catch (error) {
      console.error('Cerebras API error details:', {
        status: error.response?.status,
        statusText: error.response?.statusText,
        data: error.response?.data,
        message: error.message,
        config: {
          url: error.config?.url,
          method: error.config?.method,
          headers: error.config?.headers
        }
      });
      
      throw new Error(`Cerebras API error: ${error.message}`);
    }
  }

  async verifyDeedMatch(imageBase64, deedDescription, category) {
    // Create a more detailed prompt based on the category
    let categoryPrompt = '';
    
    if (category === 'helping') {
      categoryPrompt = `Analyze this image and determine if it shows someone helping another person.
      
      Examples of helping actions include:
      - Helping someone walk or move
      - Assisting someone with a task
      - Supporting someone physically or emotionally
      - Guiding or teaching someone
      - Providing aid or assistance
      
      The image should show:
      1. At least two people
      2. One person actively assisting or supporting another
      3. Clear physical or emotional support being provided
      
      Return a JSON object with:
      {
        "matches": boolean (true if the image shows someone helping another person),
        "confidence": number (0-1, must be > 0.7 to be considered a match),
        "explanation": string (detailed explanation of the helping action shown)
      }`;
    } else {
      categoryPrompt = `Analyze this image and determine if it matches the category "${category}". 
      The specific deed is: "${deedDescription}".
      
      Categories and their meanings:
      - helping: Shows someone actively helping or assisting another person
      - environment: Shows environmental conservation or cleanup activities
      - kindness: Shows acts of kindness, compassion, or positive social interaction
      - sharing: Shows sharing of resources, knowledge, or time
      
      Requirements:
      1. The image MUST clearly show an act matching the specified category
      2. The action must be the main focus of the image
      3. The context must be appropriate for the category
      
      Return a JSON object with:
      {
        "matches": boolean (true only if the image clearly matches the category),
        "confidence": number (0-1, must be > 0.8 to be considered a match),
        "explanation": string (detailed explanation of why it matches or doesn't match the category)
      }`;
    }

    try {
      console.log('Verifying deed match...', { 
        category, 
        deedDescription,
        promptLength: categoryPrompt.length 
      });
      
      const result = await this.analyzeImage(imageBase64, categoryPrompt);
      
      // Log the verification result for debugging
      console.log('Cerebras verification result:', {
        category,
        matches: result.matches,
        confidence: result.confidence,
        explanation: result.explanation
      });

      return result;
    } catch (error) {
      console.error('Error verifying deed match:', error);
      throw error; // Propagate the error to be handled by the controller
    }
  }
}

module.exports = new CerebrasService(); 