import { clsx } from "clsx";
import {
  IconSize,
  IconType,
  AvatarIconName,
  MissionIconName,
  UIIconName,
  BadgeIconName,
  PrizeIconName,
  missionIconEmojis,
  uiIconSymbols,
  sizeClasses,
} from "../types/icon";

interface IconProps {
  type: IconType;
  name:
    | AvatarIconName
    | MissionIconName
    | UIIconName
    | BadgeIconName
    | PrizeIconName;
  size?: IconSize;
  className?: string;
  onClick?: () => void;
  animate?: boolean;
}

export const Icon = ({
  type,
  name,
  size = "md",
  className,
  onClick,
  animate = false,
}: IconProps) => {
  const baseClasses = clsx(
    "inline-flex items-center justify-center transition-all duration-200",
    sizeClasses[size],
    animate && "hover:scale-110 active:scale-95",
    className
  );

  // Avatar icons with SVGs
  if (type === "avatar") {
    const avatarIcons: Record<AvatarIconName, string> = {
      // Boys
      "boy-0": "/src/assets/avatars/boy-0.svg",
      "boy-1": "/src/assets/avatars/boy-1.svg",
      "boy-2": "/src/assets/avatars/boy-2.svg",
      "boy-3": "/src/assets/avatars/boy-3.svg",
      "boy-4": "/src/assets/avatars/boy-4.svg",
      "boy-5": "/src/assets/avatars/boy-5.svg",
      "boy-6": "/src/assets/avatars/boy-6.svg",
      "boy-7": "/src/assets/avatars/boy-7.svg",
      "boy-8": "/src/assets/avatars/boy-8.svg",
      "boy-9": "/src/assets/avatars/boy-9.svg",
      "boy-10": "/src/assets/avatars/boy-10.svg",
      "boy-11": "/src/assets/avatars/boy-11.svg",
      "boy-12": "/src/assets/avatars/boy-12.svg",
      "boy-13": "/src/assets/avatars/boy-13.svg",
      "boy-14": "/src/assets/avatars/boy-14.svg",
      // Girls
      "girl-0": "/src/assets/avatars/girl-0.svg",
      "girl-1": "/src/assets/avatars/girl-1.svg",
      "girl-2": "/src/assets/avatars/girl-2.svg",
      "girl-3": "/src/assets/avatars/girl-3.svg",
      "girl-4": "/src/assets/avatars/girl-4.svg",
      "girl-5": "/src/assets/avatars/girl-5.svg",
      "girl-6": "/src/assets/avatars/girl-6.svg",
      "girl-7": "/src/assets/avatars/girl-7.svg",
      "girl-8": "/src/assets/avatars/girl-8.svg",
      "girl-9": "/src/assets/avatars/girl-9.svg",
      "girl-10": "/src/assets/avatars/girl-10.svg",
      "girl-11": "/src/assets/avatars/girl-11.svg",
      "girl-12": "/src/assets/avatars/girl-12.svg",
      "girl-13": "/src/assets/avatars/girl-13.svg",
      "girl-14": "/src/assets/avatars/girl-14.svg",
      // Default
      default: "/src/assets/avatars/default.svg",
    };

    return (
      <div
        className={clsx(
          baseClasses,
          "relative rounded-full overflow-hidden border-4 border-purple-300 bg-white",
          "hover:border-purple-400 hover:shadow-lg",
          animate && "hover:rotate-6"
        )}
        onClick={onClick}
      >
        <img
          src={avatarIcons[name as AvatarIconName]}
          alt={name}
          className="w-full h-full object-contain"
        />
      </div>
    );
  }

  // Mission icons with SVGs
  if (type === "mission") {
    const missionIcons: Record<MissionIconName, string> = {
      help: "/src/assets/icons/default.svg",
      share: "/src/assets/icons/default.svg",
      clean: "/src/assets/icons/default.svg",
      learn: "/src/assets/icons/default.svg",
      create: "/src/assets/icons/default.svg",
      nature: "/src/assets/icons/default.svg",
      recycle: "/src/assets/icons/default.svg",
      plant: "/src/assets/icons/default.svg",
      smile: "/src/assets/icons/default.svg",
    };

    return (
      <div
        className={clsx(
          baseClasses,
          "rounded-2xl bg-gradient-to-br from-purple-100 to-pink-100",
          "hover:from-purple-200 hover:to-pink-200",
          "shadow-md hover:shadow-lg",
          animate && "hover:-translate-y-1"
        )}
        onClick={onClick}
        role="img"
        aria-label={`Mission icon: ${name}`}
      >
        <img
          src={missionIcons[name as MissionIconName]}
          alt={name}
          className="w-full h-full object-contain"
        />
      </div>
    );
  }

  // Badge icons with SVGs
  if (type === "badge") {
    const badgeIcons: Record<BadgeIconName, string> = {
      "trophy-0": "/src/assets/badges/trophy-0.svg",
      "trophy-1": "/src/assets/badges/trophy-1.svg",
      "trophy-2": "/src/assets/badges/trophy-2.svg",
      "trophy-3": "/src/assets/badges/trophy-3.svg",
      "trophy-4": "/src/assets/badges/trophy-4.svg",
      "trophy-5": "/src/assets/badges/trophy-5.svg",
      "trophy-6": "/src/assets/badges/trophy-6.svg",
      "trophy-7": "/src/assets/badges/trophy-7.svg",
      "trophy-8": "/src/assets/badges/trophy-8.svg",
      "medal-0": "/src/assets/badges/medal-0.svg",
      "medal-1": "/src/assets/badges/medal-1.svg",
      "medal-2": "/src/assets/badges/medal-2.svg",
      "medal-3": "/src/assets/badges/medal-3.svg",
      "medal-4": "/src/assets/badges/medal-4.svg",
      "medal-5": "/src/assets/badges/medal-5.svg",
      "medal-6": "/src/assets/badges/medal-6.svg",
      "medal-7": "/src/assets/badges/medal-7.svg",
      crown: "/src/assets/badges/crown.svg",
      diploma: "/src/assets/badges/diploma.svg",
      "thumbs-up": "/src/assets/badges/thumbs-up.svg",
      // New icons from the icons directory
      gift: "/src/assets/icons/gift.svg",
      heart: "/src/assets/icons/default.svg",
      woods: "/src/assets/icons/woods.svg",
      park: "/src/assets/icons/park.svg",
      backpack: "/src/assets/icons/backpack.svg",
      walking: "/src/assets/icons/walking.svg",
      "time-planning": "/src/assets/icons/time-planning.svg",
      "board-games": "/src/assets/icons/board-games.svg",
      pizza: "/src/assets/icons/pizza.svg",
      food: "/src/assets/icons/food.svg",
      basketball: "/src/assets/icons/basketball.svg",
      ticket: "/src/assets/icons/ticket.svg",
      cooking: "/src/assets/icons/cooking.svg",
      shopping: "/src/assets/icons/shopping.svg",
      disco: "/src/assets/icons/disco.svg",
      movie: "/src/assets/icons/movie.svg",
      default: "/src/assets/badges/default.svg",
    };

    return (
      <div
        className={clsx(
          baseClasses,
          "relative",
          animate && "hover:-translate-y-1 hover:rotate-6"
        )}
        onClick={onClick}
      >
        <img
          src={badgeIcons[name as BadgeIconName]}
          alt={name}
          className="w-full h-full object-contain"
        />
      </div>
    );
  }

  // Prize icons with SVGs
  if (type === "prize") {
    const prizeIcons: Record<PrizeIconName, string> = {
      // Gems
      diamond: "/src/assets/icons/diamond.svg",
      emerald: "/src/assets/icons/emerald.svg",
      ruby: "/src/assets/icons/ruby.svg",
      star: "/src/assets/icons/star.svg",
      amethyst: "/src/assets/icons/amethyst.svg",
      // Special items
      gift: "/src/assets/icons/gift.svg",
      ticket: "/src/assets/icons/ticket.svg",
      crown: "/src/assets/icons/crown.svg",
      // Activities
      backpack: "/src/assets/icons/backpack.svg",
      basketball: "/src/assets/icons/basketball.svg",
      "board-games": "/src/assets/icons/board-games.svg",
      bowling: "/src/assets/icons/bowling.svg",
      cooking: "/src/assets/icons/cooking.svg",
      disco: "/src/assets/icons/disco.svg",
      food: "/src/assets/icons/food.svg",
      "ice-cream": "/src/assets/icons/ice-cream.svg",
      joystick: "/src/assets/icons/joystick.svg",
      movie: "/src/assets/icons/movie.svg",
      park: "/src/assets/icons/park.svg",
      pizza: "/src/assets/icons/pizza.svg",
      shopping: "/src/assets/icons/shopping.svg",
      sofa: "/src/assets/icons/sofa.svg",
      tea: "/src/assets/icons/tea.svg",
      "time-planning": "/src/assets/icons/time-planning.svg",
      walking: "/src/assets/icons/walking.svg",
      woods: "/src/assets/icons/woods.svg",
      default: "/src/assets/icons/default.svg",
    };

    return (
      <div
        className={clsx(
          baseClasses,
          "relative",
          animate && "hover:-translate-y-1 hover:rotate-6"
        )}
        onClick={onClick}
      >
        <img
          src={prizeIcons[name as PrizeIconName]}
          alt={name}
          className="w-full h-full object-contain"
        />
      </div>
    );
  }

  // UI icons with symbols
  if (type === "ui") {
    const symbol = uiIconSymbols[name as UIIconName] || "•";
    return (
      <button
        className={clsx(
          baseClasses,
          "rounded-lg bg-white/90 text-gray-700",
          "hover:bg-white hover:text-gray-900",
          "shadow-sm hover:shadow-md",
          animate && "hover:scale-110"
        )}
        onClick={onClick}
      >
        <span className="text-lg">{symbol}</span>
      </button>
    );
  }

  return null;
};
