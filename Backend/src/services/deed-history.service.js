// This is a new file to track deed history and prevent repetition

class DeedHistoryService {
    constructor() {
      // In-memory storage for recent deeds
      // In a production environment, this could be replaced with a database
      this.recentDeeds = {
        // category: [array of recent deed descriptions]
      };
      
      // Maximum number of deeds to track per category
      this.maxHistorySize = 10;
    }
    
    // Store a new deed in history
    addDeed(category, deedDescription) {
      if (!this.recentDeeds[category]) {
        this.recentDeeds[category] = [];
      }
      
      // Add to the beginning of the array (most recent first)
      this.recentDeeds[category].unshift(deedDescription);
      
      // Trim the array if it exceeds the maximum size
      if (this.recentDeeds[category].length > this.maxHistorySize) {
        this.recentDeeds[category] = this.recentDeeds[category].slice(0, this.maxHistorySize);
      }
    }
    
    // Get recent deeds for a category
    getRecentDeeds(category) {
      return this.recentDeeds[category] || [];
    }
    
    // Get all recent deeds across categories
    getAllRecentDeeds() {
      const allDeeds = [];
      for (const category in this.recentDeeds) {
        allDeeds.push(...this.recentDeeds[category]);
      }
      return allDeeds;
    }
  }
  
  module.exports = new DeedHistoryService();