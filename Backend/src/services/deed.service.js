const geminiService = require('./gemini.service');
const config = require('../config/config');

class DeedService {
  constructor() {
    // This could be expanded to include a database repository
    this.deeds = [];
  }

  // Get all categories
  getCategories() {
    return Object.entries(config.categories).map(([key, value]) => ({
      id: key,
      description: value
    }));
  }

  // Generate a deed by category
  async generateDeed(category) {
    try {
      const deed = await geminiService.generateDeed(category.toLowerCase());
      
      // Save to memory (could be extended to save to database)
      this.deeds.push(deed);
      
      return deed;
    } catch (error) {
      throw error;
    }
  }

  // Get deed by ID (for future use)
  getDeedById(id) {
    return this.deeds.find(deed => deed.id === id);
  }

  // Get deeds by category (for future use)
  getDeedsByCategory(category) {
    return this.deeds.filter(deed => deed.category === category);
  }
}

module.exports = new DeedService();
