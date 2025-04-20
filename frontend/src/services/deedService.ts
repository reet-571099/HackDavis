import axios from "axios";

interface GeneratedDeed {
  id: string;
  category: string;
  deed: string;
  explanation: string;
  funFact: string;
  difficultyLevel: string;
}

interface SubmissionResponse {
  message: string;
  entryId: string;
  verification: {
    matches: boolean;
    confidence: number;
    explanation: string;
    transcript?: string;
    deed?: string;
    category?: string;
    suggestion?: string;
  };
}

// Hardcoded deeds for each category
const hardcodedDeeds: Record<string, GeneratedDeed[]> = {
  kindness: [
    {
      id: "kindness-1",
      category: "kindness",
      deed: "Give someone a genuine compliment today",
      explanation:
        "A simple compliment can brighten someone's day and create a positive ripple effect.",
      funFact:
        "Studies show that giving compliments activates the same reward centers in the brain as receiving them!",
      difficultyLevel: "easy",
    },
    {
      id: "kindness-2",
      category: "kindness",
      deed: "Hold the door open for someone",
      explanation:
        "Small acts of courtesy show respect and consideration for others.",
      funFact:
        "The tradition of holding doors open dates back to medieval times when knights would hold doors for ladies.",
      difficultyLevel: "easy",
    },
  ],
  earth: [
    {
      id: "earth-1",
      category: "earth",
      deed: "Turn off lights when leaving a room",
      explanation:
        "Conserving energy helps reduce carbon emissions and protect our planet.",
      funFact:
        "If every American household replaced one light bulb with an LED, it would save enough energy to light 3 million homes for a year!",
      difficultyLevel: "easy",
    },
    {
      id: "earth-2",
      category: "earth",
      deed: "Use a reusable water bottle",
      explanation:
        "Reducing single-use plastics helps prevent ocean pollution and waste.",
      funFact:
        "It takes 450 years for a plastic bottle to decompose in the ocean.",
      difficultyLevel: "easy",
    },
  ],
  inclusivity: [
    {
      id: "inclusivity-1",
      category: "inclusivity",
      deed: "Include someone new in your activities",
      explanation:
        "Making others feel welcome creates a sense of belonging and community.",
      funFact:
        "Inclusive workplaces are 8 times more likely to achieve better business outcomes.",
      difficultyLevel: "medium",
    },
    {
      id: "inclusivity-2",
      category: "inclusivity",
      deed: "Learn to say hello in a new language",
      explanation:
        "Language learning promotes cultural understanding and connection.",
      funFact: "There are over 7,000 languages spoken in the world today!",
      difficultyLevel: "easy",
    },
  ],
  learn: [
    {
      id: "learn-1",
      category: "learn",
      deed: "Teach someone something new",
      explanation:
        "Sharing knowledge helps others grow and strengthens your own understanding.",
      funFact:
        "Teaching others can improve your own memory retention by up to 90%!",
      difficultyLevel: "medium",
    },
    {
      id: "learn-2",
      category: "learn",
      deed: "Read a book about a different culture",
      explanation:
        "Learning about other cultures broadens perspectives and promotes understanding.",
      funFact:
        "Reading fiction can increase empathy and emotional intelligence.",
      difficultyLevel: "medium",
    },
  ],
  animals: [
    {
      id: "animals-1",
      category: "animals",
      deed: "Help feed a pet or bird today",
      explanation: "Caring for animals teaches responsibility and compassion.",
      funFact:
        "Dogs can understand up to 250 words and gestures, similar to a 2-year-old child!",
      difficultyLevel: "easy",
    },
    {
      id: "animals-2",
      category: "animals",
      deed: "Learn about an endangered species",
      explanation:
        "Understanding endangered species helps us protect biodiversity.",
      funFact:
        "There are currently over 16,000 species listed as endangered worldwide.",
      difficultyLevel: "easy",
    },
  ],
  justice: [
    {
      id: "justice-1",
      category: "justice",
      deed: "Stand up for someone being treated unfairly",
      explanation:
        "Speaking up against injustice helps create a more equitable society.",
      funFact:
        "Bystander intervention can reduce bullying incidents by up to 50%.",
      difficultyLevel: "medium",
    },
    {
      id: "justice-2",
      category: "justice",
      deed: "Learn about a social justice movement",
      explanation:
        "Understanding social issues helps us become better advocates for change.",
      funFact:
        "The Civil Rights Movement led to the passage of over 40 anti-discrimination laws.",
      difficultyLevel: "easy",
    },
  ],
  women: [
    {
      id: "women-1",
      category: "women",
      deed: "Support a woman-owned business",
      explanation:
        "Supporting women entrepreneurs helps close the gender gap in business.",
      funFact:
        "Women-owned businesses generate $1.8 trillion in revenue annually in the US.",
      difficultyLevel: "easy",
    },
    {
      id: "women-2",
      category: "women",
      deed: "Learn about a pioneering woman in history",
      explanation:
        "Understanding women's contributions helps break gender stereotypes.",
      funFact:
        "Marie Curie was the first person to win Nobel Prizes in two different fields.",
      difficultyLevel: "easy",
    },
  ],
  culture: [
    {
      id: "culture-1",
      category: "culture",
      deed: "Learn about a new tradition or custom",
      explanation:
        "Cultural awareness promotes understanding and respect for diversity.",
      funFact: "There are over 4,000 religions practiced in the world today.",
      difficultyLevel: "easy",
    },
    {
      id: "culture-2",
      category: "culture",
      deed: "Try cooking a dish from another culture",
      explanation:
        "Food is a delicious way to experience and appreciate different cultures.",
      funFact:
        "The world's oldest known recipe is for beer, dating back to 3400 BCE!",
      difficultyLevel: "medium",
    },
  ],
};

export const generateDeed = async (
  category: string
): Promise<GeneratedDeed> => {
  try {
    // Commented out API call
    const response = await axios.post(
      "http://localhost:4000/api/deeds/generate",
      {
        category,
      }
    );
    return response.data;

    // Use hardcoded data instead
    // const deeds = hardcodedDeeds[category] || [];
    // const randomIndex = Math.floor(Math.random() * deeds.length);
    // return (
    //   deeds[randomIndex] || {
    //     id: `${category}-default`,
    //     category,
    //     deed: "Be kind to yourself and others",
    //     explanation:
    //       "Small acts of kindness can make a big difference in someone's day.",
    //     funFact:
    //       "Kindness is contagious - seeing someone else be kind makes us more likely to be kind ourselves!",
    //     difficultyLevel: "easy",
    //   }
    // );
  } catch (error) {
    console.error("Error generating deed:", error);
    throw error;
  }
};

export const submitPhoto = async (
  deedId: string,
  photo: File
): Promise<SubmissionResponse> => {
  const formData = new FormData();
  formData.append("photo", photo);
  formData.append("deedId", deedId);

  const response = await axios.post(
    "http://localhost:4000/api/show-tell/photo",
    formData,
    {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    }
  );
  return response.data;
};

export const submitJournal = async (
  deedId: string,
  content: string
): Promise<SubmissionResponse> => {
  const response = await axios.post(
    "http://localhost:4000/api/show-tell/journal",
    {
      deedId,
      content,
      type: "reflection",
    }
  );
  return response.data;
};

export const submitVoice = async (
  deedId: string,
  audio: File
): Promise<SubmissionResponse> => {
  const formData = new FormData();
  formData.append("audio", audio);
  formData.append("deedId", deedId);

  const response = await axios.post(
    "http://localhost:4000/api/show-tell/voice",
    formData,
    {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    }
  );
  return response.data;
};
