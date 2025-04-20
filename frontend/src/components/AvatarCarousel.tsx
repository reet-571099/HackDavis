import { motion } from "framer-motion";
import { Icon } from "./Icon";
import { AvatarIconName } from "../types/icon";
import { useRef } from "react";

interface AvatarCarouselProps {
  onSelect: (avatar: AvatarIconName) => void;
  currentAvatar: AvatarIconName;
}

const avatars: AvatarIconName[] = [
  // Robots and Aliens
  "robot-1",
  "robot-2",
  "astronaut",
  "alien-1",
  "alien-2",
  "alien-3",
  // Animals
  "lion",
  "bear",
  "fox",
  // Girls
  "girl-1",
  "girl-2",
  "girl-3",
  "girl-4",
  "girl-5",
  "girl-6",
  // Boys
  "boy-1",
  "boy-2",
  "boy-3",
  "boy-4",
  "boy-5",
  // Kids
  "kid-1",
  "kid-2",
  // Default
  "default",
];

const AvatarCarousel: React.FC<AvatarCarouselProps> = ({
  onSelect,
  currentAvatar,
}) => {
  const carouselRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: "left" | "right") => {
    if (carouselRef.current) {
      const scrollAmount = 200; // Reduced scroll amount for smoother scrolling
      carouselRef.current.scrollBy({
        left: direction === "left" ? -scrollAmount : scrollAmount,
        behavior: "smooth",
      });
    }
  };

  return (
    <div className="avatar-carousel-container">
      <div className="relative">
        <button
          onClick={() => scroll("left")}
          className="avatar-carousel-scroll-indicator left"
          aria-label="Scroll left"
        >
          <Icon name="back" type="ui" size="md" />
        </button>
        <div ref={carouselRef} className="avatar-carousel">
          {avatars.map((avatar) => (
            <motion.button
              key={avatar}
              onClick={() => onSelect(avatar)}
              className={`avatar-carousel-item ${
                avatar === currentAvatar ? "selected" : ""
              }`}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
            >
              <Icon
                name={avatar}
                type="avatar"
                size="xl"
                className="icon-avatar"
              />
              {avatar === currentAvatar && (
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className="absolute -top-2 -right-2 bg-purple-500 text-white rounded-full p-1"
                >
                  <Icon name="star" type="ui" size="sm" />
                </motion.div>
              )}
            </motion.button>
          ))}
        </div>
        <button
          onClick={() => scroll("right")}
          className="avatar-carousel-scroll-indicator right"
          aria-label="Scroll right"
        >
          <Icon name="next" type="ui" size="md" />
        </button>
      </div>
    </div>
  );
};

export default AvatarCarousel;
