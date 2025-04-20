import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Icon } from "../components/Icon";
import {
  BadgeIconName,
  UIIconName,
  PrizeIconName,
  AvatarIconName,
} from "../types/icon";

// Hardcoded data for now
const user = {
  id: "1",
  name: "Super Hero",
  avatar: "boy-0" as AvatarIconName,
  streak: 5,
  stars: 42,
};

const recentBadges = [
  {
    name: "Kindness Champion",
    icon: "heart" as BadgeIconName,
    earned: true,
    color: "bg-gradient-to-br from-pink-400 to-pink-600",
  },
  {
    name: "Nature Guardian",
    icon: "woods" as BadgeIconName,
    earned: true,
    color: "bg-gradient-to-br from-green-400 to-green-600",
  },
  {
    name: "Knowledge Seeker",
    icon: "backpack" as BadgeIconName,
    earned: false,
    color: "bg-gradient-to-br from-blue-400 to-blue-600",
  },
  {
    name: "Social Butterfly",
    icon: "board-games" as BadgeIconName,
    earned: true,
    color: "bg-gradient-to-br from-purple-400 to-purple-600",
  },
];

const funFacts = [
  "Kindness makes your brain release happy chemicals!",
  "Girls can be astronauts, coders, or superheroes too!",
  "Helping others makes you stronger and happier!",
  "Every small act of kindness makes the world better!",
];

const Dashboard = () => {
  const hasSpunToday = false; // This would come from state/API
  const currentFunFact = funFacts[0]; // This would rotate

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-100 via-pink-100 to-purple-100">
      {/* Background Elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        {[...Array(5)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [0, -20, 0],
              rotate: [0, 360],
            }}
            transition={{
              duration: 3 + Math.random() * 2,
              repeat: Infinity,
              ease: "easeInOut",
              delay: Math.random() * 2,
            }}
          >
            <Icon
              name="diamond"
              type="prize"
              size="md"
              className="text-yellow-400"
            />
          </motion.div>
        ))}
      </div>

      {/* Top Section: Welcome Bar */}
      <section className="pt-8 px-4">
        <div className="max-w-2xl mx-auto text-center">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: "spring", stiffness: 200 }}
            className="w-32 h-32 mx-auto mb-4"
          >
            <Icon name={user.avatar} type="avatar" size="xl" />
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl font-bold text-purple-800 mb-2"
          >
            Hi {user.name}!
          </motion.h1>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="flex items-center justify-center space-x-2 mb-4"
          >
            <Icon
              name="diamond"
              type="prize"
              size="lg"
              className="text-purple-400"
            />
            <span className="text-xl font-bold text-purple-700">
              {user.stars} Stars
            </span>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="bg-gradient-to-r from-purple-400 to-pink-400 rounded-full px-6 py-2 inline-flex items-center space-x-2"
          >
            <Icon
              name="diamond"
              type="prize"
              size="lg"
              className="text-white"
            />
            <span className="text-white font-bold">
              {user.streak}-day Kindness Streak!
            </span>
          </motion.div>
        </div>
      </section>

      {/* Main CTA Section: Let's Spin! */}
      <section className="py-8 px-4">
        <div className="max-w-2xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="bg-white/80 backdrop-blur-sm rounded-3xl p-8 shadow-xl"
          >
            <h2 className="text-3xl font-bold text-purple-800 mb-6">
              Ready for today's mission?
            </h2>
            <div className="w-48 h-48 mx-auto mb-8 relative">
              <div className="absolute inset-0 bg-gradient-to-br from-purple-400 to-pink-400 rounded-full blur-xl opacity-50" />
              <motion.div
                animate={{
                  rotate: [0, 360],
                  scale: [1, 1.1, 1],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
                className="relative z-10"
              >
                <Icon name="time-planning" type="prize" size="xl" />
              </motion.div>
            </div>
            <Link
              to={hasSpunToday ? "#" : "/spin"}
              className={`inline-block ${
                hasSpunToday ? "opacity-50 cursor-not-allowed" : ""
              }`}
            >
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className={`bg-gradient-to-r from-purple-600 to-pink-600 text-white px-8 py-4 rounded-full text-xl font-semibold shadow-lg ${
                  !hasSpunToday && "animate-pulse"
                }`}
                disabled={hasSpunToday}
              >
                {hasSpunToday ? (
                  <div className="flex items-center justify-center space-x-3">
                    <Icon name="trophy-0" type="badge" size="lg" />
                    <span>You've already spun today. Amazing work!</span>
                  </div>
                ) : (
                  <div className="flex items-center justify-center space-x-3">
                    <Icon name="time-planning" type="prize" size="lg" />
                    <span>Spin the Kindness Wheel</span>
                  </div>
                )}
              </motion.button>
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Recent Badges Preview */}
      <section className="py-8 px-4">
        <div className="max-w-2xl mx-auto">
          <h2 className="text-2xl font-bold text-purple-800 mb-4 flex items-center">
            Your Coolest Badges{" "}
            <span className="ml-2">
              <Icon name="crown" type="badge" size="lg" />
            </span>
          </h2>
          <div className="flex space-x-4 overflow-x-auto pb-4">
            {recentBadges.map((badge, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                className={`flex-shrink-0 w-24 h-24 rounded-2xl p-4 ${
                  badge.color
                } ${!badge.earned ? "opacity-50" : ""}`}
              >
                <Icon
                  name={badge.icon}
                  type="badge"
                  size="xl"
                  className="text-white"
                />
              </motion.div>
            ))}
          </div>
          <div className="text-center mt-4">
            <Link
              to="/profile#badges"
              className="text-purple-600 hover:text-purple-800 font-bold flex items-center justify-center space-x-2"
            >
              <Icon name="amethyst" type="prize" size="lg" />
              <span>See All Badges</span>
            </Link>
          </div>
        </div>
      </section>

      {/* Fun Fact Card */}
      <section className="py-8 px-4">
        <div className="max-w-2xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8 }}
            className="bg-gradient-to-br from-green-400 to-teal-400 rounded-3xl p-6 shadow-xl"
          >
            <div className="flex items-center space-x-2 mb-2">
              <Icon
                name="gift"
                type="prize"
                size="lg"
                className="text-yellow-400"
              />
              <h3 className="text-xl font-bold text-white">Did You Know?</h3>
            </div>
            <p className="text-white text-lg">{currentFunFact}</p>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default Dashboard;
