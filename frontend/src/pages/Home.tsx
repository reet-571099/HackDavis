import { motion } from "framer-motion";
import { useAuth0 } from "@auth0/auth0-react";
import { Icon } from "../components/Icon";
import {
  BadgeIconName,
  UIIconName,
  PrizeIconName,
  AvatarIconName,
} from "../types/icon";
import { useNavigate, Link } from "react-router-dom";
import AvatarCarousel from "../components/AvatarCarousel";
import { useState } from "react";

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

const testimonials = [
  {
    quote:
      "My daughter loves doing kind deeds now! She's always excited to spin the wheel.",
    author: "Sarah M.",
    avatar: "girl-0",
  },
  {
    quote:
      "The badges and stories keep my son motivated to help others. Great app!",
    author: "Michael T.",
    avatar: "boy-0",
  },
  {
    quote: "We do the missions together as a family. It's brought us closer!",
    author: "Lisa K.",
    avatar: "girl-1",
  },
];

const Home = () => {
  const { loginWithRedirect, isAuthenticated } = useAuth0();
  const navigate = useNavigate();
  const [selectedAvatar, setSelectedAvatar] =
    useState<AvatarIconName>("default");

  const handleLogin = async () => {
    try {
      await loginWithRedirect({
        appState: {
          returnTo: "/dashboard",
        },
      });
    } catch (error) {
      console.error("Login error:", error);
    }
  };

  const handleDashboard = () => {
    navigate("/dashboard");
  };

  const hasSpunToday = false; // This would come from state/API
  const currentFunFact = funFacts[0]; // This would rotate

  // Floating elements effect
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

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 via-purple-100 to-pink-100 py-8 px-4 relative overflow-hidden">
      <FloatingElements />

      {/* Original Home Page Hero Section */}
      <div className="max-w-4xl mx-auto px-4 py-12 pt-32">
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
            Where every act of kindness makes you a superhero! 🦸‍♀️
          </p>

          {/* Landing Page Hero Section */}
          <section className="py-16 px-4">
            <div className="max-w-7xl mx-auto text-center">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex justify-center mb-8"
              >
                <div className="grid grid-cols-6 gap-2">
                  {[
                    "boy-0",
                    "girl-0",
                    "boy-1",
                    "girl-1",
                    "boy-2",
                    "girl-2",
                  ].map((avatar, index) => (
                    <motion.div
                      key={index}
                      initial={{ scale: 0, rotate: -180 }}
                      animate={{ scale: 1, rotate: 0 }}
                      transition={{ delay: index * 0.1 }}
                      className="w-16 h-16"
                    >
                      <Icon name={avatar as any} type="avatar" size="xl" />
                    </motion.div>
                  ))}
                </div>
              </motion.div>

              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-6xl font-bold text-purple-800 mb-8 rainbow-text"
              >
                Spin. Do. Learn. Grow!
              </motion.h1>
            </div>
          </section>

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

        {/* Original Home Page Features */}
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

        {/* How It Works Section */}
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

      {/* Avatar Selection Section */}
      <section className="py-16 px-4 bg-white/50 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto text-center">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl font-bold text-purple-800 mb-8"
          >
            Choose Your Avatar
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-gray-600 mb-8 max-w-2xl mx-auto"
          >
            Pick your favorite avatar to represent you on your kindness journey!
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
          >
            <AvatarCarousel
              currentAvatar={selectedAvatar}
              onSelect={setSelectedAvatar}
            />
          </motion.div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-16 px-4">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold text-center text-purple-800 mb-12">
            What Families Say
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.2 }}
                className="bg-white/80 backdrop-blur-sm rounded-3xl p-8 shadow-xl"
              >
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 rounded-full bg-purple-100 flex items-center justify-center mr-4">
                    <Icon
                      name={testimonial.avatar as any}
                      type="avatar"
                      size="md"
                    />
                  </div>
                  <span className="font-semibold text-purple-700">
                    {testimonial.author}
                  </span>
                </div>
                <p className="text-gray-600 italic">"{testimonial.quote}"</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 px-4 text-center">
        <motion.p
          animate={{ scale: [1, 1.1, 1] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="text-purple-600 text-lg"
        >
          Made with ❤️ for young heroes
        </motion.p>
      </footer>
    </div>
  );
};

export default Home;
