import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Icon } from "../components/Icon";
import { BadgeIconName } from "../types/icon";
import ReactConfetti from "react-confetti";

// Mock data (replace with actual data from your backend)
const mockLeaderboard = [
  {
    rank: 1,
    name: "SuperMaya",
    avatar: "👧",
    stars: 42,
    favoriteBadge: "heart" as BadgeIconName,
    badges: 8,
    favoriteCategory: "kindness",
    isRisingStar: true,
  },
  {
    rank: 2,
    name: "EcoEthan",
    avatar: "👦",
    stars: 38,
    favoriteBadge: "leaf" as BadgeIconName,
    badges: 7,
    favoriteCategory: "environment",
  },
  {
    rank: 3,
    name: "KindKai",
    avatar: "👦",
    stars: 35,
    favoriteBadge: "heart" as BadgeIconName,
    badges: 6,
    favoriteCategory: "kindness",
  },
  {
    rank: 4,
    name: "JusticeJade",
    avatar: "👧",
    stars: 32,
    favoriteBadge: "scale" as BadgeIconName,
    badges: 5,
    favoriteCategory: "justice",
  },
  {
    rank: 5,
    name: "AnimalAva",
    avatar: "👧",
    stars: 30,
    favoriteBadge: "paw" as BadgeIconName,
    badges: 5,
    favoriteCategory: "animalLove",
  },
];

const mockCurrentUser = {
  rank: 6,
  name: "BraveBen",
  stars: 28,
  badges: 4,
  favoriteCategory: "environment",
};

const mockPopularBadges = [
  {
    name: "Kindness Cadet",
    icon: "heart" as BadgeIconName,
    count: 12,
    color: "bg-pink-400",
  },
  {
    name: "Earth Explorer",
    icon: "leaf" as BadgeIconName,
    count: 10,
    color: "bg-green-400",
  },
  {
    name: "Justice Warrior",
    icon: "scale" as BadgeIconName,
    count: 8,
    color: "bg-purple-400",
  },
];

const FloatingElements = () => {
  const elements = Array.from({ length: 15 }, (_, i) => ({
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

const Leaderboard = () => {
  const [filter, setFilter] = useState<"weekly" | "allTime">("weekly");
  const [showConfetti, setShowConfetti] = useState(false);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 via-purple-100 to-pink-100 py-8 px-4 relative overflow-hidden">
      <FloatingElements />
      {/* Confetti */}
      <AnimatePresence>
        {showConfetti && (
          <ReactConfetti
            width={window.innerWidth}
            height={window.innerHeight}
            recycle={false}
            numberOfPieces={500}
            colors={["#FFD700", "#FF69B4", "#87CEEB", "#98FB98", "#DDA0DD"]}
          />
        )}
      </AnimatePresence>

      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-8"
        >
          <h1 className="text-4xl font-bold text-purple-800 mb-2">
            🏆 Top Kindness Heroes!
          </h1>
          <p className="text-xl text-gray-700 mb-4">
            Here are the kids doing amazing deeds this week!
          </p>
          <div className="flex justify-center gap-4">
            <button
              onClick={() => setFilter("weekly")}
              className={`px-6 py-2 rounded-full ${
                filter === "weekly"
                  ? "bg-purple-600 text-white"
                  : "bg-purple-100 text-purple-800"
              }`}
            >
              This Week
            </button>
            <button
              onClick={() => setFilter("allTime")}
              className={`px-6 py-2 rounded-full ${
                filter === "allTime"
                  ? "bg-purple-600 text-white"
                  : "bg-purple-100 text-purple-800"
              }`}
            >
              All Time
            </button>
          </div>
        </motion.div>

        {/* Podium */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="grid grid-cols-3 gap-4 mb-8"
        >
          {mockLeaderboard.slice(0, 3).map((user, index) => (
            <motion.div
              key={user.rank}
              initial={{ y: 50 }}
              animate={{ y: 0 }}
              transition={{ delay: index * 0.1 }}
              className={`${
                index === 1
                  ? "order-first"
                  : index === 0
                  ? "order-2"
                  : "order-3"
              }`}
            >
              <div
                className={`${
                  index === 0
                    ? "bg-yellow-400 h-48"
                    : index === 1
                    ? "bg-gray-300 h-40"
                    : "bg-amber-600 h-32"
                } rounded-t-2xl flex flex-col items-center justify-end p-4 relative`}
              >
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  className="text-6xl mb-2"
                >
                  {user.avatar}
                </motion.div>
                {index === 0 && (
                  <motion.div
                    animate={{
                      scale: [1, 1.2, 1],
                      rotate: [0, 10, -10, 0],
                    }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      repeatType: "reverse",
                    }}
                    className="absolute top-0 text-4xl"
                  >
                    👑
                  </motion.div>
                )}
                {user.isRisingStar && (
                  <motion.div
                    animate={{
                      scale: [1, 1.1, 1],
                      opacity: [0.5, 1, 0.5],
                    }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                    }}
                    className="absolute top-2 right-2 text-2xl"
                  >
                    ⭐
                  </motion.div>
                )}
                <div className="text-center">
                  <h3 className="font-bold text-white">{user.name}</h3>
                  <p className="text-white">
                    {user.stars} Stars
                    <br />
                    {user.badges} Badges
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Leaderboard List */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-3xl p-6 shadow-xl mb-8"
        >
          <h2 className="text-2xl font-bold text-purple-800 mb-4">
            Leaderboard
          </h2>
          <div className="space-y-4">
            {mockLeaderboard.map((user) => (
              <motion.div
                key={user.rank}
                whileHover={{ scale: 1.02 }}
                className={`flex items-center gap-4 p-4 rounded-xl ${
                  user.name === mockCurrentUser.name
                    ? "bg-purple-50 border-2 border-purple-300"
                    : "bg-gray-50"
                }`}
              >
                <div className="text-2xl font-bold text-purple-800 w-8">
                  #{user.rank}
                </div>
                <div className="text-4xl">{user.avatar}</div>
                <div className="flex-1">
                  <h3 className="font-semibold text-gray-800">{user.name}</h3>
                  <p className="text-sm text-gray-500">
                    {user.badges} Badges • Favorite: {user.favoriteCategory}
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-2xl">🌟</span>
                  <span className="font-bold text-gray-800">{user.stars}</span>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Encouragement Box */}
        {mockCurrentUser.rank && mockCurrentUser.rank > 10 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white rounded-3xl p-6 shadow-xl mb-8 text-center"
          >
            <h3 className="text-2xl font-bold text-purple-800 mb-2">
              You're doing great! 🌈
            </h3>
            <p className="text-gray-700 mb-4">
              Every deed counts. Let's keep spinning!
            </p>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-purple-600 text-white px-6 py-2 rounded-full"
            >
              Do Another Deed
            </motion.button>
          </motion.div>
        )}

        {/* Popular Badges */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-3xl p-6 shadow-xl"
        >
          <h2 className="text-2xl font-bold text-purple-800 mb-4">
            🌟 Badges Everyone's Earning!
          </h2>
          <div className="grid grid-cols-3 gap-4">
            {mockPopularBadges.map((badge) => (
              <motion.div
                key={badge.name}
                whileHover={{ scale: 1.05 }}
                className={`${badge.color} rounded-2xl p-4 text-center text-white`}
              >
                <div className="text-4xl mb-2">
                  <Icon name={badge.icon} type="badge" size="xl" />
                </div>
                <h3 className="font-bold">{badge.name}</h3>
                <p className="text-sm opacity-80">{badge.count} earned</p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Claude Insight Box */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-3xl p-6 shadow-xl mt-8"
        >
          <div className="flex items-center gap-4">
            <div className="text-4xl">🧠</div>
            <div>
              <h3 className="font-bold text-purple-800">Fun Fact!</h3>
              <p className="text-gray-700">
                The #1 kid completed the most Environment missions this week!
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Leaderboard;
