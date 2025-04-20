import React from "react";
import { Icon } from "./Icon";
import { motion } from "framer-motion";
import {
  AvatarIconName,
  MissionIconName,
  BadgeIconName,
  PrizeIconName,
} from "../types/icon";

export const IconDemo: React.FC = () => {
  const avatars: AvatarIconName[] = [
    "boy-0",
    "boy-1",
    "boy-2",
    "boy-3",
    "boy-4",
    "girl-0",
    "girl-1",
    "girl-2",
    "girl-3",
    "girl-4",
    "cat-0",
    "cat-1",
    "cat-2",
    "cat-3",
    "cat-4",
    "dog-0",
    "dog-1",
    "dog-2",
    "dog-3",
    "dog-4",
  ];

  const missions: PrizeIconName[] = [
    "movie",
    "park",
    "pizza",
    "shopping",
    "sofa",
    "tea",
    "woods",
    "ticket",
  ];

  const badges: BadgeIconName[] = [
    "medal-0",
    "medal-1",
    "medal-2",
    "trophy-0",
    "trophy-1",
    "trophy-2",
    "crown",
    "diploma",
  ];

  const prizes: PrizeIconName[] = [
    "diamond",
    "emerald",
    "ruby",
    "star",
    "crown",
    "gift",
  ];

  return (
    <div className="p-8 space-y-12 bg-gradient-to-br from-purple-50 to-pink-50 min-h-screen">
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h2 className="text-3xl font-bold mb-6 text-purple-800">
          Choose Your Avatar!
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-8 gap-6">
          {avatars.map((avatar) => (
            <Icon
              key={avatar}
              type="avatar"
              name={avatar}
              size="xl"
              className="transform hover:scale-110 transition-transform"
            />
          ))}
        </div>
      </motion.section>

      <motion.section
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        <h2 className="text-3xl font-bold mb-6 text-purple-800">
          Daily Missions
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-8 gap-6">
          {missions.map((mission) => (
            <Icon
              key={mission}
              type="mission"
              name={mission}
              size="lg"
              className="transform hover:-translate-y-2 transition-transform"
            />
          ))}
        </div>
      </motion.section>

      <motion.section
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.4 }}
      >
        <h2 className="text-3xl font-bold mb-6 text-purple-800">Earn Badges</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-8 gap-6">
          {badges.map((badge) => (
            <Icon
              key={badge}
              type="badge"
              name={badge}
              size="lg"
              className="transform hover:scale-110 transition-transform"
            />
          ))}
        </div>
      </motion.section>

      <motion.section
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.6 }}
      >
        <h2 className="text-3xl font-bold mb-6 text-purple-800">Win Prizes</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-8 gap-6">
          {prizes.map((prize) => (
            <Icon
              key={prize}
              type="prize"
              name={prize}
              size="lg"
              className="transform hover:scale-110 transition-transform"
            />
          ))}
        </div>
      </motion.section>
    </div>
  );
};
