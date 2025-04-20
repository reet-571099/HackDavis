export const THEME = {
  primary: "#8B5CF6", // purple-500
  secondary: "#EC4899", // pink-500
  accent: "#FCD34D", // amber-300
  background: "#FDF4FF", // purple-50
  text: "#1F2937", // gray-800
};

export const API_ENDPOINTS = {
  BASE_URL: import.meta.env.VITE_API_URL || "http://localhost:3000",
  USER: "/api/user",
  BADGES: "/api/badges",
  MISSIONS: "/api/missions",
};

export const STORAGE_KEYS = {
  USER: "kindness_quest_user",
  THEME: "kindness_quest_theme",
};

export const ACHIEVEMENTS = {
  STREAK_MILESTONES: [3, 7, 14, 30],
  POINTS_MILESTONES: [100, 500, 1000, 5000],
};
