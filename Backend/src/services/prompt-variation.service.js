// This is a simplified file to help with prompt variation for young children

class PromptVariationService {
  // Activity elements to add variety - simplified for young children
  getRandomActivityElement() {
    const elements = [
      "a simple counting element",
      "a mini coloring activity",
      "something they can show to others",
      "a simple observation task",
      "a quick sharing moment",
      "a simple thank you gesture",
      "a quick outdoor observation",
      "a simple hands-on activity",
      "a tiny act of kindness",
      "a moment of simple curiosity",
      "a quick listening activity",
      "a simple movement activity"
    ];
    
    return elements[Math.floor(Math.random() * elements.length)];
  }

  // Simplified constraints for 5-10 year olds
  getRandomConstraint() {
    const constraints = [
      "must take less than 5 minutes to complete",
      "should use only paper and crayons",
      "should be done with just household items",
      "should be something they can do by themselves",
      "should involve simple counting or colors",
      "should be something they can show to friends",
      "should make them smile or laugh",
      "should be doable indoors",
      "should use their imagination",
      "should be something they can explain to others",
      "should involve simple observation",
      "should include a small element of fun"
    ];
    
    return constraints[Math.floor(Math.random() * constraints.length)];
  }

  // Simplified strategies focused on quick, easy activities
  getRandomStrategy() {
    const promptStrategies = [
      "Focus on a tiny, quick activity",
      "Focus on a simple sharing moment",
      "Focus on using basic materials",
      "Focus on learning one small fact",
      "Focus on a quick observation activity",
      "Focus on a simple kind gesture",
      "Focus on a tiny discovery moment",
      "Focus on a quick game",
      "Focus on a small moment of wonder",
      "Focus on noticing something simple",
      "Focus on a small act of helping",
      "Focus on saying something nice"
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
      "Create thinking-of-you cards",
      "Create a World Soundscape jar",
      "Make a kindness rock"
    ];
  }

  // Examples of simple deeds appropriate for young children
  getSimpleExamples() {
    return `
Examples of appropriately simple activities for 5-10 year olds:
- "Draw a happy face and give it to someone"
- "Count three birds outside your window"
- "Say thank you to someone who helped you"
- "Look at clouds and find funny shapes"
- "Share your favorite toy for 5 minutes"
- "Learn how to say 'hello' in a new language"
- "Pick up three pieces of trash outside"
- "Water a plant and talk to it"
- "Draw your favorite animal"
`;
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
    return `The deed should NOT be similar to these examples: "${deedsToMention.join('", "')}"`;
  }
}

module.exports = new PromptVariationService();