import { motion } from "framer-motion";

interface QuoteDisplayProps {
  funFact?: string;
}

const QuoteDisplay = ({ funFact }: QuoteDisplayProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white rounded-3xl p-6 shadow-xl"
    >
      <h3 className="text-xl font-bold text-purple-800 mb-2">
        💡 Did You Know?
      </h3>
      <p className="text-gray-700">
        {funFact ||
          "Every small act of kindness makes the world a better place!"}
      </p>
    </motion.div>
  );
};

export default QuoteDisplay;
