import { useState, useEffect, useCallback, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { Icon } from "../components/Icon";
import SpinWheel from "../components/SpinWheel";
import QuoteDisplay from "../components/QuoteDisplay";
import { BadgeIconName } from "../types/icon";
import { generateDeed } from "../services/deedService";

interface GeneratedDeed {
  id: string;
  category: string;
  deed: string;
  explanation: string;
  funFact: string;
  difficultyLevel: string;
}

interface DeedCategory {
  id: string;
  name: string;
  icon: BadgeIconName;
  color: string;
  bgColor: string;
  title: string;
  description: string;
  deedId: string;
  generatedDeed?: GeneratedDeed;
}

// Map of categories to their possible icons
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
const getRandomIcon = (categoryId: string): BadgeIconName => {
  const icons = categoryIcons[categoryId] || ["default"];
  const randomIndex = Math.floor(Math.random() * icons.length);
  return icons[randomIndex];
};

// Single source of truth for categories and deeds
const deedCategories: DeedCategory[] = [
  {
    id: "kindness",
    name: "Kindness",
    icon: "thumbs-up" as BadgeIconName,
    color: "#EC4899",
    bgColor: "bg-pink-400",
    title: "Be a Kindness Champion!",
    description: "Give someone a genuine compliment today",
    deedId: "kindness-1",
  },
  {
    id: "earth",
    name: "Earth Hero",
    icon: "default" as BadgeIconName,
    color: "#10B981",
    bgColor: "bg-green-400",
    title: "Be a Planet Protector!",
    description: "Turn off lights when leaving a room",
    deedId: "env-1",
  },
  {
    id: "inclusivity",
    name: "Inclusivity",
    icon: "default" as BadgeIconName,
    color: "#3B82F6",
    bgColor: "bg-indigo-400",
    title: "Be an Inclusivity Champion!",
    description: "Include someone new in your activities",
    deedId: "inclusivity-1",
  },
  {
    id: "learn",
    name: "Learn & Share",
    icon: "diploma" as BadgeIconName,
    color: "#F59E0B",
    bgColor: "bg-amber-400",
    title: "Be a Knowledge Sharer!",
    description: "Teach someone something new",
    deedId: "learn-1",
  },
  {
    id: "animals",
    name: "Animal Love",
    icon: "default" as BadgeIconName,
    color: "#8B5CF6",
    bgColor: "bg-yellow-400",
    title: "Be an Animal Friend!",
    description: "Help feed a pet or bird today",
    deedId: "animal-1",
  },
  {
    id: "justice",
    name: "Social Justice",
    icon: "default" as BadgeIconName,
    color: "#EF4444",
    bgColor: "bg-purple-400",
    title: "Be a Justice Warrior!",
    description: "Stand up for someone being treated unfairly",
    deedId: "justice-1",
  },
  {
    id: "women",
    name: "Women Empowerment",
    icon: "default" as BadgeIconName,
    color: "#EC4899",
    bgColor: "bg-rose-400",
    title: "Be a Women's Advocate!",
    description: "Support a woman-owned business",
    deedId: "women-1",
  },
  {
    id: "culture",
    name: "Cultural Awareness",
    icon: "crown" as BadgeIconName,
    color: "#F59E0B",
    bgColor: "bg-blue-400",
    title: "Be a Culture Explorer!",
    description: "Learn about a new tradition or custom",
    deedId: "culture-1",
  },
];

const Spin = () => {
  const navigate = useNavigate();
  const [hasSpunToday, setHasSpunToday] = useState(false);
  const [showResult, setShowResult] = useState(false);
  const [spinResult, setSpinResult] = useState<
    (typeof deedCategories)[0] | null
  >(null);
  const [isLoading, setIsLoading] = useState(false);

  // Check if user has already spun today
  useEffect(() => {
    // Reset localStorage for testing
    // localStorage.removeItem("lastSpinDate"); // Uncomment to reset
    const lastSpinDate = localStorage.getItem("lastSpinDate");
    console.log("Last spin date:", lastSpinDate); // Debug log
    if (lastSpinDate) {
      const lastSpin = new Date(lastSpinDate);
      const today = new Date();
      if (
        lastSpin.getDate() === today.getDate() &&
        lastSpin.getMonth() === today.getMonth() &&
        lastSpin.getFullYear() === today.getFullYear()
      ) {
        setHasSpunToday(true);
      }
    }
  }, []);

  const handleSpinComplete = useCallback(async (categoryId: string) => {
    console.log("handleSpinComplete called with categoryId:", categoryId); // Debug log
    const selectedDeed = deedCategories.find((deed) => deed.id === categoryId);
    if (selectedDeed) {
      try {
        setIsLoading(true);
        const generatedDeed = await generateDeed(categoryId);
        // Get a random icon for this category
        const randomIcon = getRandomIcon(categoryId);
        setSpinResult({
          ...selectedDeed,
          icon: randomIcon, // Update the icon with a random one
          generatedDeed,
        });
        setShowResult(true);
        setHasSpunToday(true);

        localStorage.setItem("lastSpinDate", new Date().toISOString());

        requestAnimationFrame(() => {
          setTimeout(() => {
            const resultElement = document.getElementById("result-card");
            if (resultElement) {
              resultElement.scrollIntoView({
                behavior: "smooth",
                block: "center",
              });
            }
          }, 1500);
        });
      } catch (error) {
        console.error("Error generating deed:", error);
        // Handle error appropriately
      } finally {
        setIsLoading(false);
      }
    }
  }, []);

  const handleAcceptDeed = useCallback(
    (deedId: string) => {
      navigate(`/deed/${deedId}`, {
        state: { generatedDeed: spinResult?.generatedDeed },
      });
    },
    [navigate, spinResult]
  );

  // Memoize the categories to prevent unnecessary rerenders
  const wheelCategories = useMemo(
    () =>
      deedCategories.map((cat) => ({
        id: cat.id,
        name: cat.name,
        color: cat.color,
      })),
    []
  );

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-100 via-pink-100 to-purple-100 p-4">
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
              y: [0, -10, 0],
              opacity: [0.5, 1, 0.5],
            }}
            transition={{
              duration: 4 + Math.random() * 2,
              repeat: Infinity,
              ease: "easeInOut",
              delay: Math.random() * 2,
            }}
          >
            <Icon
              name="diamond"
              type="prize"
              size="sm"
              className="text-purple-400"
            />
          </motion.div>
        ))}
      </div>

      <div className="max-w-2xl mx-auto">
        {/* Title */}
        <motion.h1
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-4xl font-bold text-center text-purple-800 mb-8"
        >
          <div className="flex items-center justify-center space-x-2">
            <Icon
              name="diamond"
              type="prize"
              size="xl"
              className="text-purple-600"
            />
            <span>Spin the Kindness Wheel!</span>
            <Icon
              name="diamond"
              type="prize"
              size="xl"
              className="text-purple-600"
            />
          </div>
        </motion.h1>

        {/* Wheel Area */}
        <div className="relative mb-8 ml-2">
          <SpinWheel
            categories={wheelCategories}
            onSpinComplete={handleSpinComplete}
            disabled={false} // Temporarily disabled for testing
          />
        </div>

        {/* Result Card */}
        <AnimatePresence>
          {showResult && spinResult && (
            <motion.div
              id="result-card"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className={`${spinResult.bgColor} rounded-3xl p-6 shadow-xl mb-8 relative`}
            >
              {isLoading ? (
                <div className="flex flex-col items-center justify-center py-8">
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{
                      duration: 1,
                      repeat: Infinity,
                      ease: "linear",
                    }}
                    className="mb-4"
                  >
                    <Icon name="time-planning" type="prize" size="lg" />
                  </motion.div>
                  <p className="text-white text-lg">Generating your deed...</p>
                </div>
              ) : (
                <>
                  <div className="flex items-center justify-center mb-4">
                    <Icon
                      name={spinResult.icon}
                      type="badge"
                      size="xl"
                      className="text-white"
                    />
                  </div>
                  <h2 className="text-2xl font-bold text-white text-center mb-2">
                    {spinResult.generatedDeed?.deed || spinResult.title}
                  </h2>
                  <div className="bg-white/20 rounded-full px-4 py-1 mb-4 mx-auto text-center w-fit">
                    <span className="text-white font-semibold">
                      {spinResult.name} Hero
                    </span>
                  </div>
                  <p className="text-white text-lg text-center mb-6">
                    {spinResult.generatedDeed?.explanation ||
                      spinResult.description}
                  </p>
                  <button
                    onClick={() => handleAcceptDeed(spinResult.deedId)}
                    className="w-full bg-white text-purple-800 font-bold py-3 rounded-full text-xl hover:scale-105 transition-transform"
                  >
                    Let's Do This! 🚀
                  </button>
                </>
              )}
            </motion.div>
          )}
        </AnimatePresence>

        {/* Encouragement Quote */}
        <QuoteDisplay funFact={spinResult?.generatedDeed?.funFact} />
      </div>
    </div>
  );
};

export default Spin;
