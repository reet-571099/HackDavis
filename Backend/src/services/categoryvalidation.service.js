// Category-specific validation and requirements

const categoryRequirements = {
    'kindness': {
      mustInclude: 'The kindness deed should:\n' +
        '- Directly benefit or positively impact another person or group\n' +
        '- Include words like give, share, help, thank, appreciate, comfort, or support\n' +
        '- Result in someone feeling appreciated, helped, or cared for\n' +
        '- Create a genuine moment of connection between people',
      keywordCheck: ['give', 'share', 'help', 'thank', 'appreciate', 'comfort', 'support', 'cheer', 'gift', 'surprise']
    },
    
    'inclusivity': {
      mustInclude: 'The inclusivity deed should:\n' +
        '- Bring people together or celebrate differences\n' +
        '- Create positive interactions between different groups\n' +
        '- Help someone feel included and valued\n' +
        '- Build understanding and friendship',
      keywordCheck: ['together', 'friend', 'share', 'join', 'play', 'meet', 'team', 'group', 'include', 'invite', 'welcome', 'everyone'],
      examples: [
        'Organize a "Languages of Our Community" event where kids teach each other words from their home languages',
        'Create an accessible games day where everyone can participate regardless of ability',
        'Start a "Lunch Buddy" program to include students who usually eat alone',
        'Organize a cultural show-and-tell where everyone shares something unique about their family traditions'
      ],
      antiExamples: [
        'Just observing differences without interaction',
        'Activities that only focus on limitations rather than abilities',
        'Surface-level awareness without meaningful connection',
        'One-time activities without lasting impact'
      ]
    },
    
    'earth': {
      mustInclude: 'The environmental deed should:\n' +
        '- Directly benefit the planet, reduce waste, or protect natural resources\n' +
        '- Include hands-on interaction with nature or environmental systems\n' +
        '- Result in a tangible positive impact on the environment\n' +
        '- Connect the child to the natural world in a meaningful way',
      keywordCheck: ['save', 'reduce', 'reuse', 'recycle', 'conserve', 'protect', 'plant', 'grow', 'clean', 'nature']
    },
    
    'learn': {
      mustInclude: 'The learning deed should:\n' +
        '- Involve acquiring new knowledge AND sharing it with others\n' +
        '- Include discovery, research, or experimentation\n' +
        '- Result in both the child and someone else learning something valuable\n' +
        '- Create enthusiasm for knowledge and discovery',
      keywordCheck: ['discover', 'learn', 'teach', 'share', 'research', 'experiment', 'explore', 'question', 'explain', 'demonstrate']
    },
    
    'animals': {
      mustInclude: 'The animal care deed should:\n' +
        '- Directly benefit animals or wildlife in some way\n' +
        '- Include interaction with or support for animals\n' +
        '- Result in improved welfare or understanding of animals\n' +
        '- Create compassion toward living creatures',
      keywordCheck: ['care', 'protect', 'help', 'observe', 'support', 'feed', 'shelter', 'habitat', 'wildlife', 'pets']
    },
    
    'justice': {
      mustInclude: 'The justice deed should:\n' +
        '- Address fairness, equality, or helping those in need\n' +
        '- Include standing up for what\'s right or supporting others\n' +
        '- Result in creating more fairness or equality in some way\n' +
        '- Develop understanding of different perspectives',
      keywordCheck: ['fair', 'equal', 'right', 'help', 'stand', 'voice', 'support', 'need', 'change', 'share']
    },
    
    'women': {
      mustInclude: 'The women empowerment deed should:\n' +
        '- Recognize, celebrate, or support women and girls\n' +
        '- Include learning about women\'s achievements or challenges\n' +
        '- Result in increased appreciation for women\'s contributions\n' +
        '- Create awareness of gender equality issues',
      keywordCheck: ['celebrate', 'support', 'recognize', 'learn', 'achievement', 'equality', 'inspire', 'empower', 'highlight', 'appreciate']
    },
    
    'culture': {
      mustInclude: 'The cultural awareness deed should:\n' +
        '- Explore, celebrate, or share cultural traditions or expressions\n' +
        '- Include learning about different cultural perspectives\n' +
        '- Result in appreciation for cultural diversity\n' +
        '- Create connections between different cultural experiences',
      keywordCheck: ['tradition', 'language', 'celebrate', 'culture', 'diverse', 'heritage', 'custom', 'food', 'art', 'story']
    }
  };
  
  module.exports = { categoryRequirements };