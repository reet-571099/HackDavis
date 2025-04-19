# Kindness Quest (HeroSpin Jr. / MiniMissions)

A fun, colorful mobile app for kids that gives them small, meaningful daily missions to make the world a better place — and rewards them with badges, stars, and powers.

## 🎯 Project Overview

### Target Audience

- Age Group: 6–13 years old

### Core Concept

Kids "spin the wheel" each day to get a fun deed that:

- Builds empathy
- Teaches responsibility
- Sparks social awareness (in a light way)
- Encourages offline action
- Unlocks a fun fact, quiz, or story tied to the theme of the deed

### 🧩 Mission Categories

| Category              | Icon         | Sample Deed                                                      |
| --------------------- | ------------ | ---------------------------------------------------------------- |
| 💞 Kindness           | Pink Heart   | Make a thank-you card for your school janitor                    |
| 🌱 Earth Hero         | Green Leaf   | Pick up 5 pieces of litter                                       |
| 🚀 Inclusivity        | Rainbow Star | Play with someone who's sitting alone                            |
| 🧠 Learn & Share      | Lightbulb    | Ask your grandparents what school was like for them              |
| 🐾 Animal Love        | Paw Print    | Fill a bowl of water for birds or stray animals                  |
| ✊🏽 Social Justice     | Fist         | Draw a picture of fairness or helping someone different from you |
| 🚺 Women Empowerment  | Venus Symbol | Thank a woman in your life and learn what she does               |
| 🌎 Cultural Awareness | Globe        | Learn to say 'hello' in 3 different languages                    |

### 🏆 Key Features

1. **🎡 Spin the Wheel Animation**

   - Bright, engaging, confetti-filled
   - Option to re-spin if the deed is too hard

2. **📸 Show & Tell Mode**

   - Upload a photo (parent-approved)
   - Draw a doodle in-app
   - Write or voice-record a journal entry

3. **🎖️ Badge & Level System**

   - Titles like "Kindness Cadet" → "Earth Explorer" → "Super Helper"
   - Earned for completing 5, 10, 20 deeds per category
   - Custom badges per theme (e.g., Justice Junior, Eco Warrior)

4. **📊 Leaderboard of Friends**

   - Friendly leaderboard showing top good-deed doers in the friend circle

5. **🎯 Mini Quizzes & Trivia**

   - A fun one-question quiz after each deed
   - Example: "Why is it important not to litter?"

6. **📚 Micro-Lessons / Wisdom Nuggets**

   - Every deed unlocks a simple, relatable lesson
   - Example: "Throwing litter harms animals and makes Earth sick. Let's keep it clean!"

7. **👕 Avatar Customization** (Stretch Feature)
   - Stars/coins can be earned and used to buy costumes, capes, or pets for an in-game avatar

## 🎓 Learning Goals

- Empathy, kindness, and inclusion
- Awareness of different communities
- Respect for women and underrepresented groups
- Environmental responsibility
- Communication and emotional growth

## 🛠️ Technical Stack

| Component                           | Technology                          |
| ----------------------------------- | ----------------------------------- |
| Frontend                            | Expo + React Native                 |
| Backend                             | Firebase (Firestore, Auth, Storage) |
| ML/AI                               | Gemini API                          |
| NLP/Quiz Generation                 | Cerebras API                        |
| Natural Language & Story Generation | Claude API                          |
| Authentication                      | Auth0                               |
| Animations                          | Lottie                              |
| Image Upload                        | Expo Image Picker                   |
| Notifications                       | Expo Push Notifications             |
| Gamification                        | Firestore-based tracking & stars    |

## 🎁 Bonus Features

- Weekly Deed Packs curated by real-life community heroes
- Mystery Box Mode unlocked after completing 3 deeds in a row
- Friend Code System for teaming up
- Story Unlock Mode for themed bedtime stories
- Parent Summary Mode showing child's weekly good deeds

## 🚀 Getting Started

## Prerequisites

- Node.js (v16 or higher)
- npm (v7 or higher)

## Project Structure

- `frontend/` - React application built with Vite
- `Backend/` - Node.js Express server

## Setup Instructions

1. Clone the repository:

```bash
git clone <repository-url>
cd <project-directory>
```

2. Install dependencies for both frontend and backend:

```bash
# Install backend dependencies
cd Backend
npm install

# Install frontend dependencies
cd ../frontend
npm install
```

## Running the Application

The application consists of two parts that need to be run simultaneously:

### Backend Server

1. Navigate to the backend directory:

```bash
cd Backend
```

2. Start the backend server:

```bash
npm run dev
```

The backend server will start in development mode with hot-reloading enabled.

### Frontend Application

1. Open a new terminal window/tab
2. Navigate to the frontend directory:

```bash
cd frontend
```

3. Start the frontend development server:

```bash
npm run dev
```

The application should now be running with:

- Frontend accessible at: `http://localhost:5173`
- Backend API running at: `http://localhost:3000` (or your configured backend port)

## Development

- Frontend uses Vite for fast development and hot module replacement
- Backend uses nodemon for automatic server restarts during development
- Both services can be run in development mode with hot-reloading enabled

## Building for Production

### Frontend

```bash
cd frontend
npm run build
```

### Backend

```bash
cd Backend
npm start
```

## Environment Variables

Make sure to set up the necessary environment variables for both frontend and backend services. Check the respective `.env.example` files (if available) for required variables.
