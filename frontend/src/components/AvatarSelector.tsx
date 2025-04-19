import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Icon } from "./Icon";
import { AvatarIconName } from "../types/icon";
import AvatarCarousel from "./AvatarCarousel";

interface AvatarSelectorProps {
  isOpen: boolean;
  onClose: () => void;
  onSelect: (avatar: AvatarIconName) => void;
  currentAvatar: AvatarIconName;
}

const AvatarSelector: React.FC<AvatarSelectorProps> = ({
  isOpen,
  onClose,
  onSelect,
  currentAvatar,
}) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40"
          />

          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            className="fixed inset-x-4 top-[10%] md:inset-auto md:top-[10%] md:left-1/2 md:-translate-x-1/2 
                     max-w-lg w-full bg-white rounded-3xl p-6 shadow-2xl z-50 border-4 border-purple-200"
          >
            {/* Header */}
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-purple-800">
                Choose Your Avatar!
              </h2>
              <motion.button
                whileHover={{ scale: 1.1, rotate: 10 }}
                whileTap={{ scale: 0.9 }}
                onClick={onClose}
                className="text-gray-400 hover:text-gray-600"
              >
                <Icon name="close" type="ui" size="md" />
              </motion.button>
            </div>

            {/* Avatar Carousel */}
            <AvatarCarousel onSelect={onSelect} currentAvatar={currentAvatar} />

            {/* Fun decorative elements */}
            <div className="absolute -z-10">
              <motion.div
                animate={{
                  scale: [1, 1.2, 1],
                  rotate: [0, 10, -10, 0],
                }}
                transition={{
                  duration: 4,
                  repeat: Infinity,
                  repeatType: "reverse",
                }}
                className="absolute -top-10 -left-10 w-20 h-20 bg-gradient-to-br from-purple-400/20 to-pink-400/20 rounded-full blur-xl"
              />
              <motion.div
                animate={{
                  scale: [1, 1.2, 1],
                  rotate: [0, -10, 10, 0],
                }}
                transition={{
                  duration: 5,
                  repeat: Infinity,
                  repeatType: "reverse",
                }}
                className="absolute -bottom-10 -right-10 w-20 h-20 bg-gradient-to-br from-blue-400/20 to-purple-400/20 rounded-full blur-xl"
              />
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default AvatarSelector;
