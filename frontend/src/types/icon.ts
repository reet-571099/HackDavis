export type IconSize = "xs" | "sm" | "md" | "lg" | "xl";

export type IconType = "avatar" | "mission" | "ui" | "badge" | "prize";

// Avatar types based on the avatars folder
export type AvatarIconName =
  | "boy-0"
  | "boy-1"
  | "boy-2"
  | "boy-3"
  | "boy-4"
  | "boy-5"
  | "boy-6"
  | "boy-7"
  | "boy-8"
  | "boy-9"
  | "boy-10"
  | "boy-11"
  | "boy-12"
  | "boy-13"
  | "boy-14"
  | "girl-0"
  | "girl-1"
  | "girl-2"
  | "girl-3"
  | "girl-4"
  | "girl-5"
  | "girl-6"
  | "girl-7"
  | "girl-8"
  | "girl-9"
  | "girl-10"
  | "girl-11"
  | "girl-12"
  | "girl-13"
  | "girl-14"
  | "cat-0"
  | "cat-1"
  | "cat-2"
  | "cat-3"
  | "cat-4"
  | "dog-0"
  | "dog-1"
  | "dog-2"
  | "dog-3"
  | "dog-4"
  | "dragon-0"
  | "dragon-1"
  | "dragon-2"
  | "dragon-3"
  | "dragon-4"
  | "unicorn-0"
  | "unicorn-1"
  | "unicorn-2"
  | "unicorn-3"
  | "unicorn-4"
  | "default";

// Mission icons using emojis for kid-friendly appearance
export type MissionIconName =
  | "help"
  | "share"
  | "clean"
  | "learn"
  | "create"
  | "nature"
  | "recycle"
  | "plant"
  | "smile";

// Badge types from the badges folder
export type BadgeIconName =
  | "trophy-0"
  | "trophy-1"
  | "trophy-2"
  | "trophy-3"
  | "trophy-4"
  | "trophy-5"
  | "trophy-6"
  | "trophy-7"
  | "trophy-8"
  | "medal-0"
  | "medal-1"
  | "medal-2"
  | "medal-3"
  | "medal-4"
  | "medal-5"
  | "medal-6"
  | "medal-7"
  | "crown"
  | "diploma"
  | "thumbs-up"
  | "gift"
  | "heart"
  | "woods"
  | "park"
  | "backpack"
  | "walking"
  | "time-planning"
  | "board-games"
  | "pizza"
  | "food"
  | "basketball"
  | "ticket"
  | "cooking"
  | "shopping"
  | "disco"
  | "movie"
  | "default";

// Prize and activity icons from the icons folder
export type PrizeIconName =
  | "diamond"
  | "emerald"
  | "ruby"
  | "star"
  | "amethyst" // Gems
  | "gift"
  | "ticket"
  | "crown" // Special items
  | "backpack"
  | "basketball"
  | "board-games" // Activities
  | "bowling"
  | "cooking"
  | "disco"
  | "food"
  | "ice-cream"
  | "joystick"
  | "movie"
  | "park"
  | "pizza"
  | "shopping"
  | "sofa"
  | "tea"
  | "time-planning"
  | "walking"
  | "woods"
  | "default";

// UI icons using simple symbols
export type UIIconName =
  | "close"
  | "menu"
  | "back"
  | "next"
  | "settings"
  | "star"
  | "heart";

export interface IconProps {
  type: IconType;
  name: string;
  size?: IconSize;
  className?: string;
}

export const missionIconEmojis: Record<MissionIconName, string> = {
  help: "🤝",
  share: "🎁",
  clean: "🧹",
  learn: "📚",
  create: "🎨",
  nature: "🌱",
  recycle: "♻️",
  plant: "🌿",
  smile: "😊",
};

export const uiIconSymbols: Record<UIIconName, string> = {
  close: "✖",
  menu: "☰",
  back: "←",
  next: "→",
  settings: "⚙",
  star: "⭐",
  heart: "❤",
};

// Size classes with improved dimensions
export const sizeClasses: Record<IconSize, string> = {
  xs: "w-6 h-6",
  sm: "w-8 h-8",
  md: "w-12 h-12",
  lg: "w-16 h-16",
  xl: "w-24 h-24",
};
