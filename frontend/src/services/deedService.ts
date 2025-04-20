import axios from "axios";

interface GeneratedDeed {
  id: string;
  category: string;
  deed: string;
  explanation: string;
  funFact: string;
  difficultyLevel: string;
}

export const generateDeed = async (
  category: string
): Promise<GeneratedDeed> => {
  try {
    const response = await axios.post(
      "http://localhost:4000/api/deeds/generate",
      {
        category,
      }
    );
    return response.data;
  } catch (error) {
    console.error("Error generating deed:", error);
    throw error;
  }
};
