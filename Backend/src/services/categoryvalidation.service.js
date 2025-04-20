// Category-specific validation and requirements

const categoryRequirements = {
  'kindness': {
    mustInclude: 'The kindness deed should:\n' +
      '- Be super simple and quick to do\n' +
      '- Directly benefit or positively impact another person\n' +
      '- Include words like give, share, help, thank, smile, or hug\n' +
      '- Make someone feel happy or appreciated\n' +
      '- Be something a 5-year-old can easily do',
    keywordCheck: ['give', 'share', 'help', 'thank', 'smile', 'hug', 'friend', 'card', 'nice', 'kind'],
    examples: [
      'Help someone who is struggling to do something',
      'Give someone a high-five and tell them they\'re awesome',
      'Draw a happy face for someone who looks sad',
      'Share your favorite toy with a friend',
      'Help clean up after snack time',
      'Say thank you to three people today'
    ]
  },
  
  'inclusivity': {
    mustInclude: 'The inclusivity deed should:\n' +
      '- Be extremely simple and quick to do\n' +
      '- Help kids play together or make friends\n' +
      '- Make someone feel welcome and included\n' +
      '- Use words like friend, play, share, or invite\n' +
      '- Be something a 5-year-old can easily understand',
    keywordCheck: ['friend', 'play', 'share', 'join', 'together', 'invite', 'welcome', 'everyone', 'team', 'group'],
    examples: [
       'Notice who might be feeling left out and include them',
      'Invite someone new to play with you today',
      'Learn to say hello in a different language',
      'Notice and say something nice about what makes a friend unique',
      'Ask a friend to teach you a word from their language',
      'Make a sign that says "Everyone Belongs Here"'
    ]
  },
  
  'earth': {
    mustInclude: 'The environmental deed should:\n' +
      '- Be very simple and quick to complete\n' +
      '- Help nature or reduce waste in a small way\n' +
      '- Use words like plant, water, clean, reuse, or save\n' +
      '- Connect the child to nature in a simple way\n' +
      '- Be something a 5-year-old can do with minimal help',
    keywordCheck: ['plant', 'water', 'clean', 'reuse', 'save', 'pick up', 'trash', 'recycle', 'nature', 'earth'],
    examples: [
      'Pick up three pieces of trash outside',
      'Turn off lights when you leave a room',
      'Water a plant and say thank you to it',
      'Reuse a paper bag to make a simple puppet',
      'Sort recyclables into the right bins'
    ]
  },
  
  'learn': {
    mustInclude: 'The learning deed should:\n' +
      '- Be super simple and quick to do\n' +
      '- Involve learning one simple fact or skill\n' +
      '- Include sharing what was learned with someone\n' +
      '- Use words like learn, teach, show, or tell\n' +
      '- Be something a 5-year-old can easily do',
    keywordCheck: ['learn', 'teach', 'show', 'tell', 'count', 'read', 'write', 'draw', 'find', 'discover'],
    examples: [
      'Ask your grandpa to tell you a story',
      'Teach someone how to draw a star',
      'Ask your friend to show you how to do a cartwheel',
      'Read a new book and tell someone about it'

    ]
  },
  
  'animals': {
    mustInclude: 'The animal care deed should:\n' +
      '- Be extremely simple and quick to complete\n' +
      '- Help or appreciate animals in a small way\n' +
      '- Use words like watch, feed, water, or thank\n' +
      '- Create a moment of connection with animals\n' +
      '- Be something a 5-year-old can do safely',
    keywordCheck: ['watch', 'feed', 'water', 'thank', 'pet', 'bird', 'bug', 'draw', 'count', 'observe'],
    examples: [
      'Put out water for birds on a hot day',
      'Draw pictures of five different animals',
      'Watch ants for five minutes to see what they do',
      'Count how many different birds you see today',
      'Answer this - why is it important to protect animals?'
    ]
  },
  
  'justice': {
    mustInclude: 'The justice deed should:\n' +
      '- Be super simple and quick to do\n' +
      '- Focus on fairness in a child-friendly way\n' +
      '- Use words like fair, share, equal, or turn\n' +
      '- Help children understand simple fairness\n' +
      '- Be something a 5-year-old can easily understand',
    keywordCheck: ['fair', 'share', 'equal', 'turn', 'same', 'help', 'right', 'kind', 'stand', 'friend'],
    examples: [
      'Share treats equally with everyone',
      'Take turns choosing games with friends',
      'Stand next to someone who feels left out',
      'Make sure everyone gets a turn to speak',
      'Let someone else go first in line',
      'Stand beside someone who is being treated unfairly'
    ]
  },
  
  'women': {
    mustInclude: 'The women empowerment deed should:\n' +
      '- Be very simple and quick to complete\n' +
      '- Appreciate or learn about women in a simple way\n' +
      '- Use words like thank, learn, draw, or help\n' +
      '- Create a moment of connection or appreciation\n' +
      '- Be something a 5-year-old can easily do',
    keywordCheck: ['thank', 'learn', 'draw', 'help', 'mom', 'grandma', 'sister', 'teacher', 'woman', 'girl'],
    examples: [
      'Thank a woman who helps you every day',
      'Draw a picture of a woman you admire',
      'Ask a woman about her favorite childhood game',
      'Learn the name of one woman scientist',
      'Make a card for an important woman in your life',
      'Tell me about a woman who inspires you'
    ]
  },
  
  'culture': {
    mustInclude: 'The cultural awareness deed should:\n' +
      '- Be extremely simple and quick to do\n' +
      '- Explore cultures in a child-friendly way\n' +
      '- Use words like learn, try, listen, or share\n' +
      '- Create curiosity about different ways of life\n' +
      '- Be something a 5-year-old can easily understand',
    keywordCheck: ['learn', 'try', 'listen', 'share', 'food', 'music', 'hello', 'game', 'story', 'dance'],
    examples: [
      'Learn to say thank you in a new language',
      'Try eating with chopsticks for one meal',
      'Listen to music from another country',
      'Draw your family\'s favorite food',
      'Share a special family story with a friend'
    ]
  }
};

module.exports = { categoryRequirements };