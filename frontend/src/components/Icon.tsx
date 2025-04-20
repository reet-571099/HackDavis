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

// Import all SVG files
import robot1 from "../assets/avatars/robot-1.png";
import robot2 from "../assets/avatars/robot-2.png";
import astronaut from "../assets/avatars/astronaut.png";
import alien1 from "../assets/avatars/alien-1.png";
import alien2 from "../assets/avatars/alien-2.png";
import alien3 from "../assets/avatars/alien-3.png";
import lion from "../assets/avatars/lion.png";
import bear from "../assets/avatars/bear.png";
import fox from "../assets/avatars/fox.png";
import girl1 from "../assets/avatars/girl-1.png";
import girl2 from "../assets/avatars/girl-2.png";
import girl3 from "../assets/avatars/girl-3.png";
import girl4 from "../assets/avatars/girl-4.png";
import girl5 from "../assets/avatars/girl-5.png";
import girl6 from "../assets/avatars/girl-6.png";
import boy1 from "../assets/avatars/boy-1.png";
import boy2 from "../assets/avatars/boy-2.png";
import boy3 from "../assets/avatars/boy-3.png";
import boy4 from "../assets/avatars/boy-4.png";
import boy5 from "../assets/avatars/boy-5.png";
import kid1 from "../assets/avatars/kid-1.png";
import kid2 from "../assets/avatars/kid-2.png";
import defaultAvatar from "../assets/icons/default.svg";

// Import mission icons
import defaultIcon from "../assets/icons/default.svg";
import giftIcon from "../assets/icons/gift.svg";
import woodsIcon from "../assets/icons/woods.svg";
import parkIcon from "../assets/icons/park.svg";
import backpackIcon from "../assets/icons/backpack.svg";
import walkingIcon from "../assets/icons/walking.svg";
import timePlanningIcon from "../assets/icons/time-planning.svg";
import boardGamesIcon from "../assets/icons/board-games.svg";
import pizzaIcon from "../assets/icons/pizza.svg";
import foodIcon from "../assets/icons/food.svg";
import basketballIcon from "../assets/icons/basketball.svg";
import ticketIcon from "../assets/icons/ticket.svg";
import cookingIcon from "../assets/icons/cooking.svg";
import shoppingIcon from "../assets/icons/shopping.svg";
import discoIcon from "../assets/icons/disco.svg";
import movieIcon from "../assets/icons/movie.svg";
import starIcon from "../assets/icons/star.svg";

// Import badge icons
import trophy0 from "../assets/badges/trophy-0.svg";
import trophy1 from "../assets/badges/trophy-1.svg";
import trophy2 from "../assets/badges/trophy-2.svg";
import trophy3 from "../assets/badges/trophy-3.svg";
import trophy4 from "../assets/badges/trophy-4.svg";
import trophy5 from "../assets/badges/trophy-5.svg";
import trophy6 from "../assets/badges/trophy-6.svg";
import trophy7 from "../assets/badges/trophy-7.svg";
import trophy8 from "../assets/badges/trophy-8.svg";
import medal0 from "../assets/badges/medal-0.svg";
import medal1 from "../assets/badges/medal-1.svg";
import medal2 from "../assets/badges/medal-2.svg";
import medal3 from "../assets/badges/medal-3.svg";
import medal4 from "../assets/badges/medal-4.svg";
import medal5 from "../assets/badges/medal-5.svg";
import medal6 from "../assets/badges/medal-6.svg";
import medal7 from "../assets/badges/medal-7.svg";
import crownIcon from "../assets/badges/crown.svg";
import diplomaIcon from "../assets/badges/diploma.svg";
import thumbsUpIcon from "../assets/badges/thumbs-up.svg";
import defaultBadge from "../assets/badges/default.svg";

// Import prize icons
import diamondIcon from "../assets/icons/diamond.svg";
import emeraldIcon from "../assets/icons/emerald.svg";
import rubyIcon from "../assets/icons/ruby.svg";
import amethystIcon from "../assets/icons/amethyst.svg";
import iceCreamIcon from "../assets/icons/ice-cream.svg";
import joystickIcon from "../assets/icons/joystick.svg";
import sofaIcon from "../assets/icons/sofa.svg";
import teaIcon from "../assets/icons/tea.svg";

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
      // Robots and Aliens
      "robot-1": robot1,
      "robot-2": robot2,
      astronaut: astronaut,
      "alien-1": alien1,
      "alien-2": alien2,
      "alien-3": alien3,
      // Animals
      lion: lion,
      bear: bear,
      fox: fox,
      // Girls
      "girl-1": girl1,
      "girl-2": girl2,
      "girl-3": girl3,
      "girl-4": girl4,
      "girl-5": girl5,
      "girl-6": girl6,
      // Boys
      "boy-1": boy1,
      "boy-2": boy2,
      "boy-3": boy3,
      "boy-4": boy4,
      "boy-5": boy5,
      // Kids
      "kid-1": kid1,
      "kid-2": kid2,
      // Default
      default: defaultAvatar,
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
      help: defaultIcon,
      share: defaultIcon,
      clean: defaultIcon,
      learn: defaultIcon,
      create: defaultIcon,
      nature: defaultIcon,
      recycle: defaultIcon,
      plant: defaultIcon,
      smile: defaultIcon,
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
      "trophy-0": trophy0,
      "trophy-1": trophy1,
      "trophy-2": trophy2,
      "trophy-3": trophy3,
      "trophy-4": trophy4,
      "trophy-5": trophy5,
      "trophy-6": trophy6,
      "trophy-7": trophy7,
      "trophy-8": trophy8,
      "medal-0": medal0,
      "medal-1": medal1,
      "medal-2": medal2,
      "medal-3": medal3,
      "medal-4": medal4,
      "medal-5": medal5,
      "medal-6": medal6,
      "medal-7": medal7,
      crown: crownIcon,
      diploma: diplomaIcon,
      "thumbs-up": thumbsUpIcon,
      // New icons from the icons directory
      gift: giftIcon,
      heart: defaultIcon,
      woods: woodsIcon,
      park: parkIcon,
      backpack: backpackIcon,
      walking: walkingIcon,
      "time-planning": timePlanningIcon,
      "board-games": boardGamesIcon,
      pizza: pizzaIcon,
      food: foodIcon,
      basketball: basketballIcon,
      ticket: ticketIcon,
      cooking: cookingIcon,
      shopping: shoppingIcon,
      disco: discoIcon,
      movie: movieIcon,
      default: defaultBadge,
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
      diamond: diamondIcon,
      emerald: emeraldIcon,
      ruby: rubyIcon,
      star: starIcon,
      amethyst: amethystIcon,
      // Special items
      gift: giftIcon,
      ticket: ticketIcon,
      crown: crownIcon,
      // Activities
      backpack: backpackIcon,
      basketball: basketballIcon,
      "board-games": boardGamesIcon,
      bowling: defaultIcon,
      cooking: cookingIcon,
      disco: discoIcon,
      food: foodIcon,
      "ice-cream": iceCreamIcon,
      joystick: joystickIcon,
      movie: movieIcon,
      park: parkIcon,
      pizza: pizzaIcon,
      shopping: shoppingIcon,
      sofa: sofaIcon,
      tea: teaIcon,
      "time-planning": timePlanningIcon,
      walking: walkingIcon,
      woods: woodsIcon,
      default: defaultIcon,
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

  // UI icons with emojis
  if (type === "ui") {
    return (
      <span
        className={clsx(baseClasses, "text-current")}
        onClick={onClick}
        role="img"
        aria-label={`UI icon: ${name}`}
      >
        {uiIconSymbols[name as UIIconName]}
      </span>
    );
  }

  // Default case - mission icons with emojis
  return (
    <span
      className={clsx(baseClasses, "text-current")}
      onClick={onClick}
      role="img"
      aria-label={`Mission icon: ${name}`}
    >
      {missionIconEmojis[name as MissionIconName]}
    </span>
  );
};
