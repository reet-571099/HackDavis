class Deed {
    constructor(data = {}) {
      this.id = data.id || null;
      this.category = data.category || '';
      this.deed = data.deed || '';
      this.explanation = data.explanation || '';
      this.funFact = data.funFact || '';
      this.difficultyLevel = data.difficultyLevel || 1;
      this.createdAt = data.createdAt || new Date();
    }
  
    // Method to validate the deed
    validate() {
      if (!this.category || !this.deed || !this.explanation) {
        return false;
      }
      return true;
    }
  
    // Convert to JSON representation
    toJSON() {
      return {
        id: this.id,
        category: this.category,
        deed: this.deed,
        explanation: this.explanation,
        funFact: this.funFact,
        difficultyLevel: this.difficultyLevel
      };
    }
  }
  
  module.exports = Deed;
  