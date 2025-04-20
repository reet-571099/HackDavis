import { useState, useEffect } from "react";
import { motion } from "framer-motion";

const quotes = [
  "Every deed you do is a step to change the world!",
  "Small acts of kindness create big waves of change!",
  "You're making the world a better place, one deed at a time!",
  "Your kindness is like a ripple that spreads far and wide!",
];

const QuoteDisplay = () => {
  const [currentQuote, setCurrentQuote] = useState(quotes[0]);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentQuote((prev) => {
        const currentIndex = quotes.indexOf(prev);
        return quotes[(currentIndex + 1) % quotes.length];
      });
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="bg-white/80 backdrop-blur-sm rounded-3xl p-6 shadow-xl"
    >
      <p className="text-purple-800 text-xl text-center font-semibold">
        {currentQuote}
      </p>
    </motion.div>
  );
};

export default QuoteDisplay;
