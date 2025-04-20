export interface Badge {
  id: string;
  emoji: string;
  title: string;
  description: string;
  earned: boolean;
  dateEarned?: string;
}

export interface Mission {
  id: string;
  title: string;
  description: string;
  points: number;
  completed: boolean;
  dateCompleted?: string;
}

export interface User {
  id: string;
  name: string;
  avatar?: string;
  streak: number;
  totalPoints: number;
  badges: Badge[];
  missions: Mission[];
}

export interface Theme {
  primary: string;
  secondary: string;
  accent: string;
  background: string;
  text: string;
}
