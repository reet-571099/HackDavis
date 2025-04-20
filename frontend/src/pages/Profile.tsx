import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Icon } from "../components/Icon";
import {
  AvatarIconName,
  MissionIconName,
  PrizeIconName,
  BadgeIconName,
} from "../types/icon";
import { useAuth0 } from "@auth0/auth0-react";
import axios from "axios";
import diamondIcon from "../assets/icons/diamond.svg";

// Mock data (replace with actual data from your backend)
const mockUser = {
  id: "user-123",
  name: "Maya the Brave",
  avatarUrl: "girl-1",
  streak: 6,
  totalStars: 43,
};

const mockCategoryProgress = {
  kindness: 70,
  environment: 40,
  justice: 30,
  animalLove: 60,
  womenEmpowerment: 50,
  culturalAwareness: 45,
};

const mockBadges = {
  earned: [
    {
      id: "kindness-1",
      name: "Kindness Cadet",
      category: "kindness",
      icon: "heart" as BadgeIconName,
      description: "Completed 5 kindness missions",
      color: "bg-pink-400",
    },
    {
      id: "environment-1",
      name: "Earth Explorer",
      category: "environment",
      icon: "woods" as BadgeIconName,
      description: "Completed 3 environment missions",
      color: "bg-green-400",
    },
    {
      id: "learning-1",
      name: "Knowledge Seeker",
      category: "learning",
      icon: "backpack" as BadgeIconName,
      description: "Completed 5 learning missions",
      color: "bg-blue-400",
    },
    {
      id: "activity-1",
      name: "Active Adventurer",
      category: "activity",
      icon: "walking" as BadgeIconName,
      description: "Completed 3 outdoor activities",
      color: "bg-yellow-400",
    },
    {
      id: "social-1",
      name: "Social Butterfly",
      category: "social",
      icon: "board-games" as BadgeIconName,
      description: "Completed 5 social missions",
      color: "bg-purple-400",
    },
    {
      id: "creativity-1",
      name: "Creative Genius",
      category: "creativity",
      icon: "cooking" as BadgeIconName,
      description: "Completed 3 creative missions",
      color: "bg-orange-400",
    },
  ],
  locked: [
    {
      id: "kindness-2",
      name: "Kindness Captain",
      category: "kindness",
      icon: "crown" as BadgeIconName,
      description: "Complete 10 kindness missions",
      color: "bg-pink-400",
    },
    {
      id: "environment-2",
      name: "Nature Guardian",
      category: "environment",
      icon: "park" as BadgeIconName,
      description: "Complete 5 environment missions",
      color: "bg-green-400",
    },
    {
      id: "learning-2",
      name: "Master Learner",
      category: "learning",
      icon: "diploma" as BadgeIconName,
      description: "Complete 10 learning missions",
      color: "bg-blue-400",
    },
    {
      id: "activity-2",
      name: "Outdoor Champion",
      category: "activity",
      icon: "basketball" as BadgeIconName,
      description: "Complete 5 outdoor activities",
      color: "bg-yellow-400",
    },
    {
      id: "social-2",
      name: "Community Leader",
      category: "social",
      icon: "thumbs-up" as BadgeIconName,
      description: "Complete 10 social missions",
      color: "bg-purple-400",
    },
    {
      id: "creativity-2",
      name: "Artistic Master",
      category: "creativity",
      icon: "gift" as BadgeIconName,
      description: "Complete 5 creative missions",
      color: "bg-orange-400",
    },
  ],
};

const categoryIcons: Record<string, BadgeIconName[]> = {
  kindness: ["gift", "default"],
  earth: ["woods", "park"],
  inclusivity: ["backpack", "walking"],
  learn: ["time-planning", "board-games"],
  animals: ["pizza", "food"],
  justice: ["basketball", "ticket"],
  women: ["cooking", "shopping"],
  culture: ["disco", "movie"],
};

// Function to get a random icon for a category
const getRandomIcon = (category: string): BadgeIconName => {
  const icons = categoryIcons[category] || ["default"];
  const randomIndex = Math.floor(Math.random() * icons.length);
  return icons[randomIndex];
};

interface Deed {
  id: string;
  explanation: string;
  approved: boolean;
  createdAt: string;
  deed: {
    deed: string;
    category: string;
  };
}

const Profile = () => {
  const [selectedAvatar, setSelectedAvatar] = useState<AvatarIconName>("boy-1");
  const [isEditingName, setIsEditingName] = useState(false);
  const [name, setName] = useState(
    localStorage.getItem("userName") || "Little Hero"
  );
  const streak = 4; // TODO: Get from state management
  const [showParentSettings, setShowParentSettings] = useState(false);
  const [selectedBadge, setSelectedBadge] = useState<
    (typeof mockBadges.earned)[0] | null
  >(null);
  const [selectedDeed, setSelectedDeed] = useState<Deed | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [weeklyReportEnabled, setWeeklyReportEnabled] = useState(false);
  const [age, setAge] = useState<number>(8);
  const [parentEmail, setParentEmail] = useState<string>("");
  const { user, getAccessTokenSilently } = useAuth0();
  const [deeds, setDeeds] = useState<Deed[]>([]);
  const [showAllDeeds, setShowAllDeeds] = useState(false);

  // Filter badges based on selected category
  const filteredEarnedBadges =
    selectedCategory === "all"
      ? mockBadges.earned
      : mockBadges.earned.filter(
          (badge) => badge.category === selectedCategory
        );

  const filteredLockedBadges =
    selectedCategory === "all"
      ? mockBadges.locked
      : mockBadges.locked.filter(
          (badge) => badge.category === selectedCategory
        );

  // Calculate displayed deeds based on showAllDeeds state and sort by date
  const displayedDeeds = (showAllDeeds ? deeds : deeds.slice(0, 5)).sort(
    (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
  );

  const handleNameSave = (newName: string) => {
    setName(newName);
    localStorage.setItem("userName", newName);
    setIsEditingName(false);
  };

  const handleWeeklyReportToggle = async (enabled: boolean) => {
    setWeeklyReportEnabled(enabled);
    if (enabled) {
      try {
        const response = await fetch("http://localhost:4000/api/email/test", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email: parentEmail || user?.email || "parent@example.com",
          }),
        });

        if (!response.ok) {
          throw new Error("Failed to send email");
        }

        console.log("Email sent successfully");
      } catch (error) {
        console.error("Error sending email:", error);
        // Revert the toggle if email sending fails
        setWeeklyReportEnabled(false);
        // Show error to user
        alert("Failed to send email. Please try again later.");
      }
    }
  };

  useEffect(() => {
    const fetchDeeds = async () => {
      try {
        const response = await axios.get(
          "http://localhost:4000/api/deeds/deedstats"
        );
        setDeeds(response.data.deeds);
      } catch (error) {
        console.error("Error fetching deeds:", error);
      }
    };

    fetchDeeds();
  }, []);

  // Floating elements effect
  const FloatingElements = () => {
    const elements = Array.from({ length: 10 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      delay: Math.random() * 2,
      duration: 2 + Math.random() * 2,
      type: i % 2 === 0 ? "⭐" : "❤️",
    }));

    return (
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        {elements.map((element) => (
          <motion.div
            key={element.id}
            className="absolute text-2xl"
            style={{
              left: `${element.x}%`,
              top: `${element.y}%`,
            }}
            animate={{
              y: [0, -20, 0],
              opacity: [0.3, 0.8, 0.3],
              rotate: [0, 180, 360],
            }}
            transition={{
              duration: element.duration,
              repeat: Infinity,
              delay: element.delay,
              ease: "easeInOut",
            }}
          >
            {element.type}
          </motion.div>
        ))}
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 via-purple-100 to-pink-100 py-8 px-4 relative overflow-hidden">
      <FloatingElements />
      <div className="max-w-4xl mx-auto relative">
        {/* Profile Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center"
        >
          {/* Avatar Section */}
          <div className="relative inline-block">
            <motion.div
              whileHover={{ scale: 1.05 }}
              className="w-40 h-40 rounded-full bg-white p-2 border-4 border-purple-400 shadow-xl relative overflow-hidden"
            >
              <Icon
                name={mockUser.avatarUrl as AvatarIconName}
                type="avatar"
                size="xl"
                className="w-full h-full"
              />
              <motion.div
                className="absolute inset-0 bg-gradient-to-t from-purple-500/20 to-transparent"
                animate={{ opacity: [0.2, 0.4, 0.2] }}
                transition={{ duration: 2, repeat: Infinity }}
              />
            </motion.div>
            <motion.button
              onClick={() => {
                /* TODO: Open avatar selection modal */
              }}
              className="absolute bottom-0 right-0 bg-purple-500 text-white p-2 rounded-full shadow-lg hover:bg-purple-600 transition-colors"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
            >
              <img
                src="https://imgproxy.attic.sh/insecure/f:png/plain/https://attic.sh/yxiupo64zwmzaf3v92pq47tehl0v"
                alt="settings"
                className="w-6 h-6"
              />
            </motion.button>
          </div>

          {/* Name Section */}
          <div className="mt-4">
            {isEditingName ? (
              <motion.input
                initial={{ scale: 0.95 }}
                animate={{ scale: 1 }}
                type="text"
                defaultValue={name}
                onBlur={(e) => handleNameSave(e.target.value)}
                className="text-2xl font-bold text-center bg-white/50 border-2 border-purple-300 rounded-full px-4 py-2 focus:outline-none focus:border-purple-500"
                autoFocus
              />
            ) : (
              <motion.h1
                className="text-3xl font-bold text-purple-800 cursor-pointer hover:text-purple-600"
                onClick={() => setIsEditingName(true)}
                whileHover={{ scale: 1.05 }}
              >
                {name}
              </motion.h1>
            )}
          </div>
        </motion.div>

        {/* Streak Status */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 border-4 border-purple-200 shadow-xl mb-8 mt-8"
        >
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-bold text-purple-800 mb-2">
                Your Kindness Streak
              </h2>
              <p className="text-lg text-purple-600">
                {streak} days of spreading joy!
                <img
                  src={diamondIcon}
                  alt="diamond"
                  className="w-6 h-6 inline-block ml-2"
                />
              </p>
            </div>
            <motion.div
              animate={{ scale: [1, 1.1, 1], rotate: [0, 5, -5, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="text-5xl"
            >
              <img src={diamondIcon} alt="diamond" className="w-12 h-12" />
            </motion.div>
          </div>
          <motion.div
            className="mt-4 bg-purple-100 rounded-full h-4 overflow-hidden"
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ delay: 0.5 }}
          >
            <div
              className="h-full bg-gradient-to-r from-purple-500 to-pink-500"
              style={{ width: `${(streak / 7) * 100}%` }}
            />
          </motion.div>
        </motion.div>

        {/* Category Progress Trackers */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-3xl p-6 shadow-xl mb-8"
        >
          <h2 className="text-2xl font-bold text-purple-800 mb-4">
            Your Hero Levels
          </h2>
          <div className="space-y-4">
            {Object.entries(mockCategoryProgress).map(
              ([category, progress]) => (
                <div key={category} className="space-y-2">
                  <div className="flex justify-between items-center">
                    <div className="flex items-center gap-2">
                      <span className="text-2xl">
                        {category === "kindness" && "💞"}
                        {category === "environment" && "🌱"}
                        {category === "justice" && "✊🏽"}
                        {category === "animalLove" && "🐾"}
                        {category === "womenEmpowerment" && "🚺"}
                        {category === "culturalAwareness" && "🌎"}
                      </span>
                      <span className="font-semibold text-gray-700 capitalize">
                        {category.replace(/([A-Z])/g, " $1")}
                      </span>
                    </div>
                    <span className="text-sm text-gray-500">{progress}%</span>
                  </div>
                  <div className="h-4 bg-gray-200 rounded-full overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${progress}%` }}
                      transition={{ duration: 1, ease: "easeOut" }}
                      className={`h-full ${
                        category === "kindness"
                          ? "bg-pink-400"
                          : category === "environment"
                          ? "bg-green-400"
                          : category === "justice"
                          ? "bg-purple-400"
                          : category === "animalLove"
                          ? "bg-yellow-400"
                          : category === "womenEmpowerment"
                          ? "bg-blue-400"
                          : "bg-indigo-400"
                      }`}
                    />
                  </div>
                </div>
              )
            )}
          </div>
        </motion.div>

        {/* Badges Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-3xl p-6 shadow-xl mb-8"
        >
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-2xl font-bold text-purple-800">Your Badges</h2>
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="rounded-full border-gray-300 text-gray-700 px-4 py-2 bg-gray-50"
            >
              <option value="all">All Categories</option>
              <option value="kindness">Kindness</option>
              <option value="environment">Environment</option>
              <option value="learning">Learning</option>
              <option value="activity">Activity</option>
              <option value="social">Social</option>
              <option value="creativity">Creativity</option>
            </select>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {filteredEarnedBadges.map((badge) => (
              <motion.div
                key={badge.id}
                whileHover={{ scale: 1.05 }}
                onClick={() => setSelectedBadge(badge)}
                className={`${badge.color} rounded-2xl p-4 text-center cursor-pointer`}
              >
                <div className="text-4xl mb-2">
                  <Icon
                    name={badge.icon}
                    type="badge"
                    size="xl"
                    className="mx-auto"
                  />
                </div>
                <h3 className="font-bold text-white">{badge.name}</h3>
              </motion.div>
            ))}
            {filteredLockedBadges.map((badge) => (
              <motion.div
                key={badge.id}
                className="bg-gray-200 rounded-2xl p-4 text-center relative"
              >
                <div className="absolute inset-0 flex items-center justify-center">
                  <Icon name="default" type="badge" size="md" />
                </div>
                <div className="text-4xl mb-2 opacity-20">
                  <Icon
                    name={badge.icon}
                    type="badge"
                    size="xl"
                    className="mx-auto"
                  />
                </div>
                <h3 className="font-bold text-gray-400">{badge.name}</h3>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Mission History */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-3xl p-6 shadow-xl mb-8"
        >
          <h2 className="text-2xl font-bold text-purple-800 mb-4">
            Your Mission Logbook
          </h2>
          <div className="space-y-4">
            {displayedDeeds.map((deed) => (
              <motion.div
                key={deed?.id}
                whileHover={{ scale: 1.02 }}
                onClick={() => setSelectedDeed(deed)}
                className="flex items-center gap-4 p-4 bg-gray-50 rounded-xl cursor-pointer"
              >
                <div className="text-3xl">
                  <Icon
                    name={getRandomIcon(deed?.deed?.category)}
                    type="badge"
                    size="lg"
                  />
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold text-gray-800">
                    {deed?.deed?.deed}
                  </h3>
                  <p className="text-sm text-gray-500">
                    {new Date(deed?.createdAt).toLocaleDateString()}
                  </p>
                </div>
                <span className="text-2xl">
                  {deed?.approved ? (
                    <img
                      src="https://imgproxy.attic.sh/insecure/f:png/plain/https://imgproxy.attic.sh/h-fkQ3UMKb3FRWhTrVKbY_8q3GU32RWa4SXAq3ryQ8A/rs:fit:768:768:1:1/t:1:FF00FF:false:false/aHR0cHM6Ly9hdHRp/Yy5zaC9qNzFhODRp/ODVpbnBkZ2V0MnV5/Z3lkNTQ4OG0w"
                      alt="Approved"
                      className="w-10 h-10"
                    />
                  ) : (
                    <img
                      src="https://imgproxy.attic.sh/insecure/f:png/plain/https://imgproxy.attic.sh/3N3wYAhPAS1ga8zNUl1pOX9PhLrT7M4tcX095VQ_sfw/rs:fit:768:768:1:1/t:1:FF00FF:false:false/aHR0cHM6Ly9hdHRp/Yy5zaC9ydW5wb2Qv/ZGNmY2ZjOTQtM2Q2/ZC00YTExLTk5OTct/MDZhMGNiNTIzODg0/LnBuZw"
                      alt="Not Approved"
                      className="w-10 h-10"
                    />
                  )}
                </span>
              </motion.div>
            ))}
          </div>
          {deeds.length > 5 && (
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setShowAllDeeds(!showAllDeeds)}
              className="mt-4 w-full bg-purple-100 text-purple-800 py-2 rounded-full hover:bg-purple-200 font-medium"
            >
              {showAllDeeds ? "Show Less" : "Show All"}
            </motion.button>
          )}
        </motion.div>

        {/* Parent Settings Button */}
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => setShowParentSettings(true)}
          className="fixed bottom-4 right-4 bg-purple-600 text-white p-4 rounded-full shadow-lg z-30"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4"
            />
          </svg>
        </motion.button>

        {/* Parent Settings Modal */}
        <AnimatePresence>
          {showParentSettings && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/50 flex items-center justify-center z-40"
            >
              <motion.div
                initial={{ scale: 0.5 }}
                animate={{ scale: 1 }}
                className="bg-white rounded-3xl p-8 max-w-md w-full relative mx-4"
              >
                <button
                  onClick={() => setShowParentSettings(false)}
                  className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </button>

                <h2 className="text-2xl font-bold text-purple-800 mb-6 text-center">
                  Parent Settings
                </h2>
                <div className="space-y-6">
                  {/* Name Input */}
                  <div className="space-y-2">
                    <label className="text-gray-700 font-medium">
                      Child's Name
                    </label>
                    <input
                      type="text"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="w-full px-4 py-2 rounded-lg border-2 border-purple-200 focus:border-purple-500 focus:ring-2 focus:ring-purple-200 outline-none"
                      placeholder="Enter child's name"
                    />
                  </div>

                  {/* Age Input */}
                  <div className="space-y-2">
                    <label className="text-gray-700 font-medium">
                      Child's Age
                    </label>
                    <input
                      type="number"
                      min="5"
                      max="12"
                      value={age}
                      onChange={(e) => setAge(Number(e.target.value))}
                      className="w-full px-4 py-2 rounded-lg border-2 border-purple-200 focus:border-purple-500 focus:ring-2 focus:ring-purple-200 outline-none"
                      placeholder="Enter child's age"
                    />
                  </div>

                  {/* Avatar Selection */}
                  <div className="space-y-2">
                    <label className="text-gray-700 font-medium">
                      Select Avatar
                    </label>
                    <div className="grid grid-cols-4 gap-2">
                      {["boy-1", "girl-1", "robot-1", "astronaut"].map(
                        (avatar) => (
                          <button
                            key={avatar}
                            onClick={() =>
                              setSelectedAvatar(avatar as AvatarIconName)
                            }
                            className={`p-2 rounded-lg border-2 transition-all ${
                              selectedAvatar === avatar
                                ? "border-purple-500 bg-purple-100 scale-105"
                                : "border-gray-200 hover:border-purple-300"
                            }`}
                          >
                            <Icon
                              name={avatar as AvatarIconName}
                              type="avatar"
                              size="sm"
                              className="w-8 h-8"
                            />
                          </button>
                        )
                      )}
                    </div>
                  </div>

                  {/* Parent Email */}
                  <div className="space-y-2">
                    <label className="text-gray-700 font-medium">
                      Parent's Email
                    </label>
                    <input
                      type="email"
                      value={parentEmail}
                      onChange={(e) => setParentEmail(e.target.value)}
                      placeholder="Enter parent's email"
                      className="w-full px-4 py-2 rounded-lg border-2 border-purple-200 focus:border-purple-500 focus:ring-2 focus:ring-purple-200 outline-none"
                    />
                  </div>

                  {/* Weekly Report Toggle */}
                  <div className="flex items-center justify-between bg-purple-50 p-4 rounded-xl">
                    <div className="space-y-1">
                      <span className="text-gray-700 font-medium">
                        Weekly Kindness Reports
                      </span>
                      <p className="text-sm text-gray-500">
                        Receive weekly updates about your child's progress
                      </p>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input
                        type="checkbox"
                        className="sr-only peer"
                        checked={weeklyReportEnabled}
                        onChange={(e) =>
                          handleWeeklyReportToggle(e.target.checked)
                        }
                      />
                      <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-purple-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-purple-600"></div>
                    </label>
                  </div>

                  <button
                    onClick={() => setShowParentSettings(false)}
                    className="w-full bg-purple-600 text-white py-3 rounded-full hover:bg-purple-700 font-medium"
                  >
                    Save Settings
                  </button>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Badge Detail Modal */}
        <AnimatePresence>
          {selectedBadge && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/50 flex items-center justify-center p-4"
            >
              <motion.div
                initial={{ scale: 0.5 }}
                animate={{ scale: 1 }}
                className={`${selectedBadge.color} rounded-3xl p-8 max-w-md w-full text-center text-white`}
              >
                <div className="text-6xl mb-4">
                  <Icon
                    name={selectedBadge.icon}
                    type="badge"
                    size="xl"
                    className="mx-auto"
                  />
                </div>
                <h2 className="text-2xl font-bold mb-2">
                  {selectedBadge.name}
                </h2>
                <p className="mb-4">{selectedBadge.description}</p>
                <button
                  onClick={() => setSelectedBadge(null)}
                  className="bg-white/20 px-6 py-2 rounded-full hover:bg-white/30"
                >
                  Close
                </button>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Deed Detail Modal */}
        <AnimatePresence>
          {selectedDeed && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/50 flex items-center justify-center p-4"
            >
              <motion.div
                initial={{ scale: 0.5 }}
                animate={{ scale: 1 }}
                className="bg-white rounded-3xl p-8 max-w-md w-full"
              >
                <div className="flex items-center gap-4 mb-4">
                  <div className="text-4xl">
                    <Icon
                      name={getRandomIcon(selectedDeed?.deed?.category)}
                      type="badge"
                      size="lg"
                    />
                  </div>
                  <div>
                    <h2 className="text-xl font-bold text-gray-800">
                      {selectedDeed?.deed?.deed}
                    </h2>
                    <p className="text-gray-500">
                      {new Date(selectedDeed?.createdAt).toLocaleDateString()}
                    </p>
                  </div>
                </div>
                <div className="mb-6">
                  <h3 className="font-semibold text-gray-700 mb-2">
                    Explanation:
                  </h3>
                  <p className="text-gray-700">{selectedDeed?.explanation}</p>
                </div>
                <div className="flex items-center gap-2 mb-6">
                  <span className="text-gray-700 font-semibold">Status:</span>
                  {selectedDeed?.approved ? (
                    <span className="text-green-600">Approved</span>
                  ) : (
                    <span className="text-red-600">Not Approved</span>
                  )}
                </div>
                <button
                  onClick={() => setSelectedDeed(null)}
                  className="w-full bg-purple-600 text-white py-2 rounded-full hover:bg-purple-700"
                >
                  Close
                </button>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default Profile;
