import { motion } from "framer-motion";
import { useAuth0 } from "@auth0/auth0-react";
import { Icon } from "../components/Icon";
import { BadgeIconName, UIIconName, PrizeIconName } from "../types/icon";
import { useNavigate } from "react-router-dom";

// Hardcoded data for now
const user = {
  id: "1",
  name: "Super Hero",
  avatar: "boy-0",
  streak: 5,
  stars: 42,
};

const recentBadges = [
  {
    name: "Kindness Champion",
    icon: "kindness" as BadgeIconName,
    earned: true,
  },
  {
    name: "Earth Protector",
    icon: "generosity" as BadgeIconName,
    earned: true,
  },
  { name: "Justice Warrior", icon: "empathy" as BadgeIconName, earned: false },
  { name: "Friendship Master", icon: "courage" as BadgeIconName, earned: true },
];

const funFacts = [
  "Kindness makes your brain release happy chemicals!",
  "Girls can be astronauts, coders, or superheroes too!",
  "Helping others makes you stronger and happier!",
  "Every small act of kindness makes the world better!",
];

const Home = () => {
  const { loginWithRedirect, isAuthenticated } = useAuth0();
  const navigate = useNavigate();

  const handleLogin = () => {
    loginWithRedirect();
  };

  const handleDashboard = () => {
    navigate("/dashboard");
  };

  const hasSpunToday = false; // This would come from state/API
  const currentFunFact = funFacts[0]; // This would rotate

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-100 via-pink-100 to-purple-100">
      {/* Background Elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        {[...Array(10)].map((_, i) => (
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
              className="text-purple-400"
            />
          </motion.div>
        ))}
      </div>

      <div className="max-w-4xl mx-auto px-4 py-12">
        {/* Hero Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-16"
        >
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: "spring", stiffness: 200 }}
            className="mb-6"
          >
            <Icon
              name="diamond"
              type="prize"
              size="xl"
              className="text-purple-400"
            />
          </motion.div>
          <h1 className="text-5xl font-bold text-purple-800 mb-4">
            Welcome to Kindness Quest!
          </h1>
          <p className="text-xl text-gray-700 mb-8">
            Where every act of kindness makes you a superhero! ��‍♀️
          </p>
          <div className="flex justify-center gap-4">
            {!isAuthenticated ? (
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="inline-block"
              >
                <button
                  onClick={handleLogin}
                  className="bg-purple-600 text-white px-8 py-3 rounded-full text-lg font-semibold shadow-lg hover:bg-purple-700 transition-colors"
                >
                  Start Your Adventure!
                </button>
              </motion.div>
            ) : (
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="inline-block"
              >
                <button
                  onClick={handleDashboard}
                  className="bg-purple-600 text-white px-8 py-3 rounded-full text-lg font-semibold shadow-lg hover:bg-purple-700 transition-colors"
                >
                  Go to Dashboard
                </button>
              </motion.div>
            )}
          </div>
        </motion.div>

        {/* Features Section */}
        <div className="grid md:grid-cols-3 gap-8 mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-white rounded-3xl p-6 shadow-xl text-center"
          >
            <div className="mb-4">
              <Icon
                name="time-planning"
                type="prize"
                size="lg"
                className="text-purple-600"
              />
            </div>
            <h2 className="text-xl font-bold text-purple-800 mb-2">
              Daily Missions
            </h2>
            <p className="text-gray-600">
              Spin the wheel to get your daily kindness mission!
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="bg-white rounded-3xl p-6 shadow-xl text-center"
          >
            <div className="mb-4">
              <Icon
                name="trophy-0"
                type="badge"
                size="lg"
                className="text-purple-600"
              />
            </div>
            <h2 className="text-xl font-bold text-purple-800 mb-2">
              Earn Badges
            </h2>
            <p className="text-gray-600">
              Collect awesome badges for your kind deeds!
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="bg-white rounded-3xl p-6 shadow-xl text-center"
          >
            <div className="mb-4">
              <Icon
                name="board-games"
                type="prize"
                size="lg"
                className="text-purple-600"
              />
            </div>
            <h2 className="text-xl font-bold text-purple-800 mb-2">
              Join the Fun
            </h2>
            <p className="text-gray-600">
              See how your kindness compares with other heroes!
            </p>
          </motion.div>
        </div>

        {/* How It Works */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
          className="bg-white rounded-3xl p-8 shadow-xl mb-16"
        >
          <h2 className="text-3xl font-bold text-purple-800 mb-6 text-center">
            How It Works
          </h2>
          <div className="grid md:grid-cols-4 gap-6">
            <div className="text-center">
              <div className="mb-2">
                <Icon
                  name="star"
                  type="ui"
                  size="lg"
                  className="text-purple-600"
                />
              </div>
              <p className="text-gray-700">Sign up</p>
            </div>
            <div className="text-center">
              <div className="mb-2">
                <Icon
                  name="time-planning"
                  type="prize"
                  size="lg"
                  className="text-purple-600"
                />
              </div>
              <p className="text-gray-700">Spin the wheel</p>
            </div>
            <div className="text-center">
              <div className="mb-2">
                <Icon
                  name="heart"
                  type="ui"
                  size="lg"
                  className="text-purple-600"
                />
              </div>
              <p className="text-gray-700">Do kind deeds</p>
            </div>
            <div className="text-center">
              <div className="mb-2">
                <Icon
                  name="trophy-0"
                  type="badge"
                  size="lg"
                  className="text-purple-600"
                />
              </div>
              <p className="text-gray-700">Earn rewards!</p>
            </div>
          </div>
        </motion.div>

        {/* For Parents Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1 }}
          className="bg-white rounded-3xl p-8 shadow-xl mb-16"
        >
          <h2 className="text-3xl font-bold text-purple-800 mb-6 text-center">
            For Parents
          </h2>
          <div className="grid md:grid-cols-2 gap-8">
            <div className="text-center">
              <div className="mb-4">
                <Icon
                  name="park"
                  type="prize"
                  size="lg"
                  className="text-purple-600"
                />
              </div>
              <h3 className="text-xl font-bold text-purple-800 mb-2">
                Safe & Educational
              </h3>
              <p className="text-gray-600">
                A fun way to teach kindness and empathy
              </p>
            </div>
            <div className="text-center">
              <div className="mb-4">
                <Icon
                  name="settings"
                  type="ui"
                  size="lg"
                  className="text-purple-600"
                />
              </div>
              <h3 className="text-xl font-bold text-purple-800 mb-2">
                Parent Dashboard
              </h3>
              <p className="text-gray-600">
                Track your child's progress and achievements
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Home;
