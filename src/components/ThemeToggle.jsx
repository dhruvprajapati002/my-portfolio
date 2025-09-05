// src/components/ThemeToggle.jsx
import { motion } from "framer-motion";
import { Sun, Moon, Monitor } from "lucide-react";
import { useTheme } from "../contexts/ThemeContext";
import { useState } from "react";

const ThemeToggle = () => {
  const { isDark, toggleTheme } = useTheme();
  const [showOptions, setShowOptions] = useState(false);

  return (
    <div className="relative">
      {/* Main toggle button */}
      <motion.button
        onClick={toggleTheme}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className="relative p-3 rounded-xl bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border border-gray-200/60 dark:border-gray-700/60 hover:bg-white dark:hover:bg-gray-800 transition-all duration-300 shadow-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
        aria-label={`Switch to ${isDark ? 'light' : 'dark'} mode`}
      >
        <motion.div
          animate={{ 
            rotate: isDark ? 360 : 0,
            scale: [1, 1.1, 1]
          }}
          transition={{ 
            rotate: { duration: 0.5 },
            scale: { duration: 0.3 }
          }}
        >
          {isDark ? (
            <Moon className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />
          ) : (
            <Sun className="w-5 h-5 text-amber-500" />
          )}
        </motion.div>

        {/* Glow effect */}
        <motion.div
          className="absolute inset-0 rounded-xl"
          animate={{
            boxShadow: isDark 
              ? "0 0 20px rgba(99, 102, 241, 0.3)"
              : "0 0 20px rgba(245, 158, 11, 0.3)"
          }}
          transition={{ duration: 0.3 }}
        />
      </motion.button>

      {/* Theme indicator tooltip */}
      <motion.div
        initial={{ opacity: 0, y: 10, scale: 0.8 }}
        whileHover={{ opacity: 1, y: -5, scale: 1 }}
        className="absolute top-full left-1/2 transform -translate-x-1/2 mt-2 px-3 py-2 bg-gray-900 dark:bg-gray-100 text-white dark:text-gray-900 text-xs rounded-lg whitespace-nowrap font-medium shadow-lg opacity-0 group-hover:opacity-100 pointer-events-none"
      >
        {isDark ? 'Dark Mode' : 'Light Mode'}
        <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-b-4 border-transparent border-b-gray-900 dark:border-b-gray-100" />
      </motion.div>
    </div>
  );
};

export default ThemeToggle;
