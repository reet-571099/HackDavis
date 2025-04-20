import { Link, useLocation } from "react-router-dom";
import { motion } from "framer-motion";
import {
  HomeIcon,
  SparklesIcon,
  TrophyIcon,
  UserIcon,
} from "@heroicons/react/24/outline";

const Header = () => {
  const location = useLocation();

  const navItems = [
    { path: "/", icon: HomeIcon, label: "Home" },
    { path: "/spin", icon: SparklesIcon, label: "Spin" },
    { path: "/leaderboard", icon: TrophyIcon, label: "Leaderboard" },
    { path: "/profile", icon: UserIcon, label: "Profile" },
  ];

  return (
    <header className="bg-white shadow-sm">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <Link to="/" className="flex items-center space-x-2">
            <span className="text-2xl">🧠</span>
            <h1 className="text-xl font-bold text-indigo-600">
              Kindness Quest
            </h1>
          </Link>

          <nav className="flex space-x-4">
            {navItems.map((item) => {
              const isActive = location.pathname === item.path;
              return (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`flex items-center space-x-1 px-3 py-2 rounded-lg transition-colors ${
                    isActive
                      ? "bg-indigo-100 text-indigo-600"
                      : "text-gray-600 hover:bg-gray-100"
                  }`}
                >
                  <item.icon className="w-5 h-5" />
                  <span className="hidden sm:inline">{item.label}</span>
                </Link>
              );
            })}
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Header;
