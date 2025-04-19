import { useState } from "react";
import { motion } from "framer-motion";
import { Icon } from "../components/Icon";
import AvatarCarousel from "../components/AvatarCarousel";
import {
  AvatarIconName,
  MissionIconName,
  BadgeIconName,
  PrizeIconName,
  UIIconName,
} from "../types/icon";

const IconDemo = () => {
  const [selectedAvatar, setSelectedAvatar] =
    useState<AvatarIconName>("default");

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-100 to-purple-100 p-8">
      <div className="max-w-4xl mx-auto space-y-12">
        <h1 className="text-4xl font-bold text-center text-purple-800 mb-8">
          Icon Demo
        </h1>

        {/* Avatar Carousel Section */}
        <section className="space-y-4">
          <h2 className="text-2xl font-semibold text-purple-700">Avatars</h2>
          <AvatarCarousel
            onSelect={setSelectedAvatar}
            currentAvatar={selectedAvatar}
          />
        </section>

        {/* Mission Icons Section */}
        <section className="space-y-4">
          <h2 className="text-2xl font-semibold text-purple-700">
            Mission Icons
          </h2>
          <div className="grid grid-cols-4 gap-4">
            {["help", "share", "care", "respect"].map((mission) => (
              <motion.div
                key={mission}
                whileHover={{ scale: 1.1 }}
                className="flex flex-col items-center space-y-2"
              >
                <Icon
                  name={mission as MissionIconName}
                  type="mission"
                  size="xl"
                />
                <span className="text-sm font-medium text-purple-600">
                  {mission}
                </span>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Badge Icons Section */}
        <section className="space-y-4">
          <h2 className="text-2xl font-semibold text-purple-700">
            Badge Icons
          </h2>
          <div className="grid grid-cols-4 gap-4">
            {["kindness", "generosity", "empathy", "courage"].map((badge) => (
              <motion.div
                key={badge}
                whileHover={{ scale: 1.1 }}
                className="flex flex-col items-center space-y-2"
              >
                <Icon name={badge as BadgeIconName} type="badge" size="xl" />
                <span className="text-sm font-medium text-purple-600">
                  {badge}
                </span>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Prize Icons Section */}
        <section className="space-y-4">
          <h2 className="text-2xl font-semibold text-purple-700">
            Prize Icons
          </h2>
          <div className="grid grid-cols-4 gap-4">
            {["amethyst", "ticket", "backpack", "crown"].map((prize) => (
              <motion.div
                key={prize}
                whileHover={{ scale: 1.1 }}
                className="flex flex-col items-center space-y-2"
              >
                <Icon name={prize as PrizeIconName} type="prize" size="xl" />
                <span className="text-sm font-medium text-purple-600">
                  {prize}
                </span>
              </motion.div>
            ))}
          </div>
        </section>

        {/* UI Icons Section */}
        <section className="space-y-4">
          <h2 className="text-2xl font-semibold text-purple-700">UI Icons</h2>
          <div className="grid grid-cols-4 gap-4">
            {["star", "heart", "back", "next"].map((ui) => (
              <motion.div
                key={ui}
                whileHover={{ scale: 1.1 }}
                className="flex flex-col items-center space-y-2"
              >
                <Icon name={ui as UIIconName} type="ui" size="xl" />
                <span className="text-sm font-medium text-purple-600">
                  {ui}
                </span>
              </motion.div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
};

export default IconDemo;
