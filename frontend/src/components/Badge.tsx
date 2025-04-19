import { motion } from "framer-motion";
import { Icon } from "./Icon";
import { BadgeIconName } from "../types/icon";

interface BadgeProps {
  name: BadgeIconName;
  title: string;
  description: string;
  size?: "sm" | "md" | "lg";
}

const Badge: React.FC<BadgeProps> = ({
  name,
  title,
  description,
  size = "md",
}) => {
  const sizeClasses = {
    sm: "p-3",
    md: "p-4",
    lg: "p-6",
  };

  const iconSizeMap: Record<"sm" | "md" | "lg", "sm" | "md" | "lg" | "xl"> = {
    sm: "sm",
    md: "md",
    lg: "lg",
  };

  return (
    <motion.div
      whileHover={{ scale: 1.05 }}
      className={`card bg-gradient-to-br from-purple-50 to-pink-50 border-2 border-purple-200 ${sizeClasses[size]} text-center`}
    >
      <div className="flex flex-col items-center space-y-2">
        <Icon
          name={name}
          type="badge"
          size={iconSizeMap[size]}
          className="mb-2"
        />
        <h3 className="font-bold text-purple-800">{title}</h3>
        <p className="text-sm text-gray-600">{description}</p>
      </div>
    </motion.div>
  );
};

export default Badge;
