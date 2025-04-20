import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Icon } from "../components/Icon";
import {
  AvatarIconName,
  MissionIconName,
  PrizeIconName,
  BadgeIconName,
} from "../types/icon";

// Mock data (replace with actual data from your backend)
const mockUser = {
  id: "user-123",
  name: "Maya the Brave",
  avatarUrl: "girl-0",
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
      icon: "trophy-0" as BadgeIconName,
      description: "Completed 5 kindness missions",
      color: "bg-pink-400",
    },
    {
      id: "environment-1",
      name: "Earth Explorer",
      category: "environment",
      icon: "trophy-1" as BadgeIconName,
      description: "Completed 3 environment missions",
      color: "bg-green-400",
    },
  ],
  locked: [
    {
      id: "kindness-2",
      name: "Kindness Captain",
      category: "kindness",
      icon: "trophy-2" as BadgeIconName,
      description: "Complete 10 kindness missions",
      color: "bg-pink-400",
    },
    {
      id: "justice-1",
      name: "Justice Warrior",
      category: "justice",
      icon: "trophy-3" as BadgeIconName,
      description: "Complete 5 justice missions",
      color: "bg-purple-400",
    },
  ],
};

const mockDeedHistory = [
  {
    id: "deed-1",
    title: "Helped a friend tie their shoes",
    status: "completed" as const,
    date: "2 days ago",
    type: "text" as const,
    category: "kindness",
    icon: "medal-0" as BadgeIconName,
  },
  {
    id: "deed-2",
    title: "Picked up trash at the park",
    status: "completed" as const,
    date: "3 days ago",
    type: "photo" as const,
    category: "environment",
    icon: "medal-1" as BadgeIconName,
  },
];

const Profile = () => {
  const [selectedAvatar, setSelectedAvatar] = useState<AvatarIconName>("boy-0");
  const [isEditingName, setIsEditingName] = useState(false);
  const [name, setName] = useState(
    localStorage.getItem("userName") || "Little Hero"
  );
  const streak = 4; // TODO: Get from state management
  const [showParentSettings, setShowParentSettings] = useState(false);
  const [selectedBadge, setSelectedBadge] = useState<
    (typeof mockBadges.earned)[0] | null
  >(null);
  const [selectedDeed, setSelectedDeed] = useState<
    (typeof mockDeedHistory)[0] | null
  >(null);

  // Mock completed missions
  const completedMissions = [
    {
      icon: "help",
      title: "Helped with Homework",
      date: "2024-03-10",
      theme: "friendship",
    },
    {
      icon: "clean",
      title: "Cleaned the Park",
      date: "2024-03-09",
      theme: "earth",
    },
    {
      icon: "share",
      title: "Shared Snacks",
      date: "2024-03-08",
      theme: "friendship",
    },
  ];

  const handleNameSave = (newName: string) => {
    setName(newName);
    localStorage.setItem("userName", newName);
    setIsEditingName(false);
  };

  // Floating diamonds effect
  const FloatingDiamonds = () => {
    const diamonds = Array.from({ length: 5 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      delay: Math.random() * 2,
      duration: 2 + Math.random() * 2,
    }));

    return (
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        {diamonds.map((diamond) => (
          <motion.div
            key={diamond.id}
            className="absolute w-8 h-8"
            style={{
              left: `${diamond.x}%`,
              top: `${diamond.y}%`,
            }}
            animate={{
              y: [0, -20, 0],
              opacity: [0.3, 0.8, 0.3],
              rotate: [0, 180, 360],
            }}
            transition={{
              duration: diamond.duration,
              repeat: Infinity,
              delay: diamond.delay,
              ease: "easeInOut",
            }}
          >
            <img
              src="/src/assets/icons/diamond.svg"
              alt="diamond"
              className="w-full h-full"
            />
          </motion.div>
        ))}
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 via-purple-100 to-pink-100 py-8 px-4 relative overflow-hidden">
      <FloatingDiamonds />
      <div className="max-w-4xl mx-auto space-y-8 relative">
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
              <Icon name="settings" type="ui" size="sm" />
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
          className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 border-4 border-purple-200 shadow-xl"
        >
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-bold text-purple-800 mb-2">
                Your Kindness Streak
              </h2>
              <p className="text-lg text-purple-600">
                {streak} days of spreading joy!
                <img
                  src="/src/assets/icons/diamond.svg"
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
              <img
                src="/src/assets/icons/diamond.svg"
                alt="diamond"
                className="w-12 h-12"
              />
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

        {/* Completed Missions */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="space-y-4"
        >
          <h2 className="text-2xl font-bold text-purple-800">
            Your Kind Deeds
          </h2>
          <div className="grid gap-4">
            {completedMissions.map((mission, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.6 + index * 0.1 }}
                className={`bg-white/80 backdrop-blur-sm rounded-xl p-4 border-2 border-white shadow-lg hover:shadow-xl transition-shadow
                          ${
                            mission.theme === "earth"
                              ? "bg-green-50"
                              : "bg-purple-50"
                          }`}
              >
                <div className="flex items-center gap-4">
                  <div
                    className={`p-3 rounded-full ${
                      mission.theme === "earth"
                        ? "bg-green-100"
                        : "bg-purple-100"
                    }`}
                  >
                    <Icon
                      name={mission.icon as MissionIconName}
                      type="mission"
                      size="lg"
                      className={
                        mission.theme === "earth"
                          ? "text-green-600"
                          : "text-purple-600"
                      }
                    />
                  </div>
                  <div>
                    <h3 className="font-bold text-lg text-gray-800">
                      {mission.title}
                    </h3>
                    <p className="text-sm text-gray-600">
                      {new Date(mission.date).toLocaleDateString("en-US", {
                        month: "long",
                        day: "numeric",
                      })}
                    </p>
                  </div>
                  <motion.div
                    className="ml-auto"
                    whileHover={{ scale: 1.1, rotate: 10 }}
                  >
                    <img
                      src={
                        mission.theme === "earth"
                          ? "/src/assets/icons/emerald.svg"
                          : "/src/assets/icons/ruby.svg"
                      }
                      alt="prize"
                      className="w-8 h-8 animate-shine"
                    />
                  </motion.div>
                </div>
              </motion.div>
            ))}
          </div>
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
            <select className="rounded-full border-gray-300 text-gray-700">
              <option value="all">All Categories</option>
              <option value="kindness">Kindness</option>
              <option value="environment">Environment</option>
              <option value="justice">Justice</option>
              <option value="animalLove">Animal Love</option>
              <option value="womenEmpowerment">Women Empowerment</option>
              <option value="culturalAwareness">Cultural Awareness</option>
            </select>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {mockBadges.earned.map((badge) => (
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
            {mockBadges.locked.map((badge) => (
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
            {mockDeedHistory.map((deed) => (
              <motion.div
                key={deed.id}
                whileHover={{ scale: 1.02 }}
                onClick={() => setSelectedDeed(deed)}
                className="flex items-center gap-4 p-4 bg-gray-50 rounded-xl cursor-pointer"
              >
                <div className="text-3xl">
                  <Icon name={deed.icon} type="badge" size="lg" />
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold text-gray-800">{deed.title}</h3>
                  <p className="text-sm text-gray-500">{deed.date}</p>
                </div>
                <span className="text-2xl">
                  {deed.status === "completed" ? (
                    <Icon name="thumbs-up" type="badge" size="md" />
                  ) : (
                    <Icon name="default" type="badge" size="md" />
                  )}
                </span>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Parent Settings Button */}
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => setShowParentSettings(true)}
          className="fixed bottom-4 right-4 bg-purple-600 text-white p-4 rounded-full shadow-lg"
        >
          <img
            src="/src/assets/icons/lock.svg"
            alt="parent"
            className="w-6 h-6"
          />
        </motion.button>

        {/* Parent Settings Modal */}
        <AnimatePresence>
          {showParentSettings && (
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
                <h2 className="text-2xl font-bold text-purple-800 mb-4">
                  Parent Settings
                </h2>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-gray-700">
                      Send weekly kindness reports
                    </span>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input type="checkbox" className="sr-only peer" />
                      <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-purple-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-purple-600"></div>
                    </label>
                  </div>
                  <div className="p-4 bg-purple-50 rounded-xl">
                    <p className="text-purple-800">
                      Hi Parent! {mockUser.name}'s doing great. Her favorite
                      category is{" "}
                      <img
                        src="/src/assets/icons/heart.svg"
                        alt="kindness"
                        className="w-4 h-4 inline-block"
                      />{" "}
                      Kindness!
                    </p>
                  </div>
                  <button className="w-full bg-purple-600 text-white py-2 rounded-full hover:bg-purple-700">
                    Give Feedback
                  </button>
                </div>
                <button
                  onClick={() => setShowParentSettings(false)}
                  className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
                >
                  <img
                    src="/src/assets/icons/cross.svg"
                    alt="close"
                    className="w-6 h-6"
                  />
                </button>
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
                    <Icon name={selectedDeed.icon} type="badge" size="lg" />
                  </div>
                  <div>
                    <h2 className="text-xl font-bold text-gray-800">
                      {selectedDeed.title}
                    </h2>
                    <p className="text-gray-500">{selectedDeed.date}</p>
                  </div>
                </div>
                {selectedDeed.type === "text" && (
                  <p className="text-gray-700 mb-4">
                    "I helped my friend tie their shoes during recess. They were
                    really happy!"
                  </p>
                )}
                {selectedDeed.type === "photo" && (
                  <div className="mb-4">
                    <img
                      src="https://via.placeholder.com/300"
                      alt="Mission submission"
                      className="rounded-lg w-full"
                    />
                  </div>
                )}
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
