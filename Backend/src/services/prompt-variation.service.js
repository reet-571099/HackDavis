// This is a new file to help with prompt variation

class PromptVariationService {
    // Activity elements to add variety
    getRandomActivityElement() {
      const elements = [
        "a small social interaction component",
        "a mini-challenge with a specific goal",
        "a sensory or tactile element",
        "a connection to nature or outdoors",
        "a scientific concept or experiment",
        "a storytelling or imaginative aspect",
        "a digital or technology aspect (if appropriate)",
        "a musical or rhythmic component",
        "a physical movement or coordination element",
        "a problem-solving challenge",
        "an artistic or creative expression",
        "a memory-building exercise"
      ];
      
      return elements[Math.floor(Math.random() * elements.length)];
    }
  
    // Additional constraints to diversify activities
    getRandomConstraint() {
      const constraints = [
        "must involve movement or physical activity",
        "should involve observing something carefully",
        "should teach a surprising fact or concept",
        "should connect two seemingly unrelated ideas",
        "should have a small element of friendly competition",
        "should involve sensory exploration (touch, smell, sound)",
        "should involve a mini-scientific concept",
        "should be shareable with friends or family",
        "should create something that lasts beyond the activity",
        "should involve counting or simple math",
        "should involve color or visual patterns",
        "should involve mimicry or role-playing"
      ];
      
      return constraints[Math.floor(Math.random() * constraints.length)];
    }
  
    // Different prompt strategies for varied approaches
    getRandomStrategy() {
      const promptStrategies = [
        "Focus on creating something tangible",
        "Focus on an observation or discovery activity",
        "Focus on a social interaction",
        "Focus on documenting or journaling something",
        "Focus on a mini-challenge with specific goals",
        "Focus on exploring the local community",
        "Focus on using household items in unexpected ways",
        "Focus on connecting with nature",
        "Focus on developing a new habit",
        "Focus on expressing creativity",
        "Focus on asking interesting questions"
      ];
      
      return promptStrategies[Math.floor(Math.random() * promptStrategies.length)];
    }
  
    // List of commonly suggested deeds to avoid repetition
    getCommonDeedsToAvoid() {
      return [
        "Create compliment cards",
        "Make a recycling bin",
        "Teach someone a new word",
        "Clean up trash",
        "Plant seeds",
        "Water plants",
        "Write thank you notes",
        "Draw pictures for others",
        "Make bird feeders from recycled materials",
        "Create a wormery",
        "Make a compliment caterpillar",
        "Create thinking-of-you cards"
      ];
    }
  
    // Generate an anti-example string from recently used deeds
    getAntiExampleString(recentDeeds = []) {
      const commonDeeds = this.getCommonDeedsToAvoid();
      const allDeedsToAvoid = [...new Set([...commonDeeds, ...recentDeeds])];
      
      if (allDeedsToAvoid.length === 0) {
        return "";
      }
      
      // Take up to 5 most recent deeds to avoid
      const deedsToMention = allDeedsToAvoid.slice(0, 5);
      return `The deed should NOT be similar to these common examples: "${deedsToMention.join('", "')}"`;
    }
  }
  
  module.exports = new PromptVariationService();