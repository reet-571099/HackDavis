const { ImageAnnotatorClient } = require('@google-cloud/vision');
const config = require('../config/config');

class VisionService {
  constructor() {
    // Initialize the Vision client
    this.client = new ImageAnnotatorClient({
      credentials: {
        client_email: process.env.GOOGLE_CLOUD_CLIENT_EMAIL,
        private_key: process.env.GOOGLE_CLOUD_PRIVATE_KEY.replace(/\\n/g, '\n')
      },
      projectId: process.env.GOOGLE_CLOUD_PROJECT_ID
    });
  }

  async analyzeImage(imageBase64, category) {
    try {
      console.log('Analyzing image with Google Cloud Vision...');

      // Convert base64 to buffer
      const imageBuffer = Buffer.from(imageBase64, 'base64');

      // Perform label detection
      const [result] = await this.client.labelDetection({
        image: { content: imageBuffer }
      });

      // Perform object detection
      const [objectResult] = await this.client.objectLocalization({
        image: { content: imageBuffer }
      });

      // Get labels and objects
      const labels = result.labelAnnotations.map(label => ({
        description: label.description,
        score: label.score
      }));

      const objects = objectResult.localizedObjectAnnotations.map(obj => ({
        name: obj.name,
        score: obj.score
      }));

      // Analyze based on category
      const analysis = this.analyzeForCategory(labels, objects, category);

      return {
        matches: analysis.matches,
        confidence: analysis.confidence,
        explanation: analysis.explanation,
        details: {
          labels,
          objects
        }
      };
    } catch (error) {
      console.error('Google Cloud Vision error:', error);
      throw new Error(`Vision analysis error: ${error.message}`);
    }
  }

  analyzeForCategory(labels, objects, category) {
    // Define category-specific keywords and their weights
    const categoryKeywords = {
      helping: [
        { term: 'person', weight: 0.3 },
        { term: 'people', weight: 0.3 },
        { term: 'helping', weight: 0.4 },
        { term: 'assistance', weight: 0.4 },
        { term: 'support', weight: 0.3 },
        { term: 'care', weight: 0.3 }
      ],
      environment: [
        { term: 'nature', weight: 0.3 },
        { term: 'environment', weight: 0.4 },
        { term: 'cleanup', weight: 0.4 },
        { term: 'conservation', weight: 0.4 },
        { term: 'recycling', weight: 0.3 }
      ],
      kindness: [
        { term: 'smile', weight: 0.3 },
        { term: 'happiness', weight: 0.3 },
        { term: 'kindness', weight: 0.4 },
        { term: 'compassion', weight: 0.4 },
        { term: 'care', weight: 0.3 }
      ],
      sharing: [
        { term: 'sharing', weight: 0.4 },
        { term: 'giving', weight: 0.4 },
        { term: 'donation', weight: 0.3 },
        { term: 'exchange', weight: 0.3 }
      ]
    };

    // Combine labels and objects for analysis
    const allTerms = [
      ...labels.map(label => label.description.toLowerCase()),
      ...objects.map(obj => obj.name.toLowerCase())
    ];

    // Calculate confidence score
    let confidence = 0;
    let matchedTerms = [];

    if (categoryKeywords[category]) {
      categoryKeywords[category].forEach(({ term, weight }) => {
        if (allTerms.some(t => t.includes(term))) {
          confidence += weight;
          matchedTerms.push(term);
        }
      });
    }

    // Determine if it's a match (threshold of 0.6)
    const matches = confidence >= 0.6;

    // Generate explanation
    const explanation = matches
      ? `Image matches ${category} category with ${(confidence * 100).toFixed(1)}% confidence. Matched terms: ${matchedTerms.join(', ')}`
      : `Image does not match ${category} category. Confidence: ${(confidence * 100).toFixed(1)}%`;

    return {
      matches,
      confidence,
      explanation
    };
  }
}

module.exports = new VisionService(); 