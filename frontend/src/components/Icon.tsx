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
import boy0 from "../assets/avatars/boy-0.svg";
import boy1 from "../assets/avatars/boy-1.svg";
import boy2 from "../assets/avatars/boy-2.svg";
import boy3 from "../assets/avatars/boy-3.svg";
import boy4 from "../assets/avatars/boy-4.svg";
import boy5 from "../assets/avatars/boy-5.svg";
import boy6 from "../assets/avatars/boy-6.svg";
import boy7 from "../assets/avatars/boy-7.svg";
import boy8 from "../assets/avatars/boy-8.svg";
import boy9 from "../assets/avatars/boy-9.svg";
import boy10 from "../assets/avatars/boy-10.svg";
import boy11 from "../assets/avatars/boy-11.svg";
import boy12 from "../assets/avatars/boy-12.svg";
import boy13 from "../assets/avatars/boy-13.svg";
import boy14 from "../assets/avatars/boy-14.svg";
import girl0 from "../assets/avatars/girl-0.svg";
import girl1 from "../assets/avatars/girl-1.svg";
import girl2 from "../assets/avatars/girl-2.svg";
import girl3 from "../assets/avatars/girl-3.svg";
import girl4 from "../assets/avatars/girl-4.svg";
import girl5 from "../assets/avatars/girl-5.svg";
import girl6 from "../assets/avatars/girl-6.svg";
import girl7 from "../assets/avatars/girl-7.svg";
import girl8 from "../assets/avatars/girl-8.svg";
import girl9 from "../assets/avatars/girl-9.svg";
import girl10 from "../assets/avatars/girl-10.svg";
import girl11 from "../assets/avatars/girl-11.svg";
import girl12 from "../assets/avatars/girl-12.svg";
import girl13 from "../assets/avatars/girl-13.svg";
import girl14 from "../assets/avatars/girl-14.svg";
import defaultAvatar from "../assets/avatars/default.svg";

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
      // Boys
      "boy-0": boy0,
      "boy-1": boy1,
      "boy-2": boy2,
      "boy-3": boy3,
      "boy-4": boy4,
      "boy-5": boy5,
      "boy-6": boy6,
      "boy-7": boy7,
      "boy-8": boy8,
      "boy-9": boy9,
      "boy-10": boy10,
      "boy-11": boy11,
      "boy-12": boy12,
      "boy-13": boy13,
      "boy-14": boy14,
      // Girls
      "girl-0": girl0,
      "girl-1": girl1,
      "girl-2": girl2,
      "girl-3": girl3,
      "girl-4": girl4,
      "girl-5": girl5,
      "girl-6": girl6,
      "girl-7": girl7,
      "girl-8": girl8,
      "girl-9": girl9,
      "girl-10": girl10,
      "girl-11": girl11,
      "girl-12": girl12,
      "girl-13": girl13,
      "girl-14": girl14,
      // Cats (using default for now)
      "cat-0": defaultAvatar,
      "cat-1": defaultAvatar,
      "cat-2": defaultAvatar,
      "cat-3": defaultAvatar,
      "cat-4": defaultAvatar,
      // Dogs (using default for now)
      "dog-0": defaultAvatar,
      "dog-1": defaultAvatar,
      "dog-2": defaultAvatar,
      "dog-3": defaultAvatar,
      "dog-4": defaultAvatar,
      // Dragons (using default for now)
      "dragon-0": defaultAvatar,
      "dragon-1": defaultAvatar,
      "dragon-2": defaultAvatar,
      "dragon-3": defaultAvatar,
      "dragon-4": defaultAvatar,
      // Unicorns (using default for now)
      "unicorn-0": defaultAvatar,
      "unicorn-1": defaultAvatar,
      "unicorn-2": defaultAvatar,
      "unicorn-3": defaultAvatar,
      "unicorn-4": defaultAvatar,
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
