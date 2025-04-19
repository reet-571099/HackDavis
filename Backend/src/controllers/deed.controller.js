const deedService = require('../services/deed.service');

class DeedController {
  // Get all categories
  async getCategories(req, res) {
    try {
      const categories = deedService.getCategories();
      res.json(categories);
    } catch (error) {
      res.status(500).json({ 
        error: 'Failed to retrieve categories',
        details: error.message 
      });
    }
  }

  // Generate a deed
  async generateDeed(req, res) {
    try {
      const { category } = req.body;
      
      if (!category) {
        return res.status(400).json({ 
          error: 'Category is required',
          validCategories: deedService.getCategories().map(cat => cat.id)
        });
      }
      
      const deed = await deedService.generateDeed(category);
      res.json(deed.toJSON());
    } catch (error) {
      if (error.message === 'Invalid category') {
        return res.status(400).json({ 
          error: 'Invalid category',
          validCategories: deedService.getCategories().map(cat => cat.id)
        });
      }
      
      res.status(500).json({ 
        error: 'Failed to generate deed',
        details: error.message 
      });
    }
  }

  // Get deed by ID (for future use)
  async getDeedById(req, res) {
    try {
      const { id } = req.params;
      const deed = deedService.getDeedById(id);
      
      if (!deed) {
        return res.status(404).json({ error: 'Deed not found' });
      }
      
      res.json(deed.toJSON());
    } catch (error) {
      res.status(500).json({ 
        error: 'Failed to retrieve deed',
        details: error.message 
      });
    }
  }
}

module.exports = new DeedController();
