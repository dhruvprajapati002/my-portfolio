import { motion, AnimatePresence } from "framer-motion";
import { 
  X, 
  Clock, 
  Sparkles, 
  Rocket, 
  Calendar, 
  Bell, 
  Code,
  Coffee,
  Star,
  Zap,
  Heart,
  Globe
} from "lucide-react";
import { useEffect } from "react";
import { useTheme } from "../contexts/ThemeContext";

export default function ComingSoonModal({ 
  isOpen = false, 
  onClose, 
  projectName = "Project" 
}) {
  const { isDark } = useTheme();

  // ✅ ENHANCED: Close modal on Escape key
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    document.body.style.overflow = 'hidden'; // Prevent background scroll

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'unset';
    };
  }, [isOpen, onClose]);

  // ✅ PROFESSIONAL: Animation variants
  const backdropVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { duration: 0.3 }
    },
    exit: { 
      opacity: 0,
      transition: { duration: 0.2 }
    }
  };

  const modalVariants = {
    hidden: {
      opacity: 0,
      scale: 0.8,
      y: 50,
      rotateX: -15
    },
    visible: {
      opacity: 1,
      scale: 1,
      y: 0,
      rotateX: 0,
      transition: {
        duration: 0.4,
        ease: [0.22, 1, 0.36, 1],
        staggerChildren: 0.1,
        delayChildren: 0.1
      }
    },
    exit: {
      opacity: 0,
      scale: 0.8,
      y: 50,
      transition: {
        duration: 0.3,
        ease: [0.22, 1, 0.36, 1]
      }
    }
  };

  const contentVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.4, ease: "easeOut" }
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* ✅ ENHANCED: Theme-aware backdrop */}
          <motion.div
            variants={backdropVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            className={`fixed inset-0 z-50 flex items-center justify-center p-4 ${
              isDark 
                ? "bg-black/70 backdrop-blur-md" 
                : "bg-black/50 backdrop-blur-sm"
            }`}
            onClick={onClose}
            role="dialog"
            aria-modal="true"
            aria-labelledby="modal-title"
          >
            {/* ✅ ENHANCED: Theme-aware modal container */}
            <motion.div
              variants={modalVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              onClick={(e) => e.stopPropagation()}
              className={`relative w-full max-w-md mx-auto rounded-3xl shadow-2xl overflow-hidden border ${
                isDark
                  ? "bg-gray-900/95 border-gray-700/60 shadow-black/50"
                  : "bg-white/95 border-gray-200/60 shadow-black/20"
              } backdrop-blur-xl`}
              style={{ transformStyle: "preserve-3d" }}
            >
              {/* ✅ ENHANCED: Animated background pattern */}
              <div className="absolute inset-0 opacity-5">
                <motion.div
                  animate={{
                    background: [
                      "radial-gradient(circle at 20% 80%, rgba(99, 102, 241, 0.1) 0%, rgba(0, 0, 0, 0) 50%)",
                      "radial-gradient(circle at 80% 20%, rgba(139, 92, 246, 0.1) 0%, rgba(0, 0, 0, 0) 50%)",
                      "radial-gradient(circle at 40% 40%, rgba(236, 72, 153, 0.1) 0%, rgba(0, 0, 0, 0) 50%)"
                    ]
                  }}
                  transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
                  className="absolute inset-0"
                />
              </div>

              {/* ✅ ENHANCED: Floating particles */}
              <div className="absolute inset-0 overflow-hidden pointer-events-none">
                {[...Array(6)].map((_, i) => (
                  <motion.div
                    key={i}
                    className="absolute w-2 h-2 rounded-full bg-gradient-to-r from-indigo-400 to-purple-400 opacity-30"
                    style={{
                      left: `${20 + i * 15}%`,
                      top: `${10 + (i % 3) * 30}%`
                    }}
                    animate={{
                      y: [0, -30, 0],
                      x: [0, Math.sin(i) * 20, 0],
                      opacity: [0.3, 0.8, 0.3],
                      scale: [0.5, 1.2, 0.5]
                    }}
                    transition={{
                      duration: 4 + i * 0.5,
                      repeat: Infinity,
                      delay: i * 0.3,
                      ease: "easeInOut"
                    }}
                  />
                ))}
              </div>

              {/* ✅ ENHANCED: Close button */}
              <motion.button
                onClick={onClose}
                whileHover={{ scale: 1.1, rotate: 90 }}
                whileTap={{ scale: 0.9 }}
                className={`absolute top-4 right-4 z-10 p-2 rounded-full transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-indigo-500 ${
                  isDark
                    ? "hover:bg-gray-800 text-gray-400 hover:text-white"
                    : "hover:bg-gray-100 text-gray-500 hover:text-gray-700"
                }`}
                aria-label="Close modal"
              >
                <X className="w-5 h-5" />
              </motion.button>

              {/* ✅ ENHANCED: Modal content */}
              <div className="relative p-8 text-center">
                {/* Animated main icon */}
                <motion.div
                  variants={contentVariants}
                  className="mb-6 relative"
                >
                  <motion.div
                    initial={{ scale: 0, rotate: -180 }}
                    animate={{ scale: 1, rotate: 0 }}
                    transition={{ 
                      delay: 0.2, 
                      duration: 0.6, 
                      type: "spring",
                      stiffness: 200
                    }}
                    className="relative mx-auto w-20 h-20 rounded-2xl bg-gradient-to-r from-amber-500 to-orange-500 flex items-center justify-center shadow-xl"
                  >
                    <Clock className="w-10 h-10 text-white relative z-10" />
                    
                    {/* ✅ ENHANCED: Orbiting sparkles */}
                    {[...Array(4)].map((_, i) => (
                      <motion.div
                        key={i}
                        className="absolute w-2 h-2 bg-white rounded-full opacity-80"
                        animate={{ rotate: 360 }}
                        transition={{
                          duration: 3 + i * 0.5,
                          repeat: Infinity,
                          delay: i * 0.3,
                          ease: "linear"
                        }}
                        style={{
                          transformOrigin: `${30 + i * 8}px 0px`,
                          x: -4,
                          y: -4
                        }}
                      />
                    ))}
                  </motion.div>
                </motion.div>

                {/* Title */}
                <motion.h2
                  id="modal-title"
                  variants={contentVariants}
                  className={`text-2xl md:text-3xl font-bold mb-4 ${
                    isDark ? "text-white" : "text-gray-900"
                  }`}
                >
                  Coming Soon! 🚀
                </motion.h2>

                {/* Project name highlight */}
                <motion.div
                  variants={contentVariants}
                  className="mb-6"
                >
                  <p className={`text-lg md:text-xl mb-2 ${
                    isDark ? "text-gray-300" : "text-gray-600"
                  }`}>
                    <span className="font-semibold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
                      {projectName}
                    </span> is still in development
                  </p>
                  
                  <p className={`text-sm leading-relaxed ${
                    isDark ? "text-gray-400" : "text-gray-500"
                  }`}>
                    I'm putting the finishing touches on this project to ensure it meets the highest standards. 
                    The live demo will be available soon!
                  </p>
                </motion.div>

                {/* ✅ ENHANCED: Feature preview with icons */}
                <motion.div
                  variants={contentVariants}
                  className="mb-8"
                >
                  <h3 className={`text-sm font-semibold uppercase tracking-wide mb-4 ${
                    isDark ? "text-gray-400" : "text-gray-500"
                  }`}>
                    What to expect:
                  </h3>
                  
                  <div className="grid grid-cols-2 gap-3">
                    {[
                      { icon: Sparkles, text: "Modern UI/UX", delay: 0.1 },
                      { icon: Zap, text: "Lightning Fast", delay: 0.2 }, 
                      { icon: Globe, text: "Fully Responsive", delay: 0.3 },
                      { icon: Code, text: "Clean Code", delay: 0.4 }
                    ].map((feature, i) => (
                      <motion.div
                        key={i}
                        initial={{ opacity: 0, x: -10, scale: 0.9 }}
                        animate={{ opacity: 1, x: 0, scale: 1 }}
                        transition={{ delay: 0.5 + feature.delay, duration: 0.4 }}
                        className={`flex items-center gap-2 text-sm p-3 rounded-xl ${
                          isDark 
                            ? "bg-gray-800/50 text-gray-300" 
                            : "bg-gray-50 text-gray-600"
                        }`}
                      >
                        <feature.icon className="w-4 h-4 text-indigo-500 flex-shrink-0" />
                        <span className="font-medium">{feature.text}</span>
                      </motion.div>
                    ))}
                  </div>
                </motion.div>

                {/* ✅ ENHANCED: Development status */}
                <motion.div
                  variants={contentVariants}
                  className={`mb-8 p-4 rounded-2xl border ${
                    isDark
                      ? "bg-indigo-900/20 border-indigo-700/30"
                      : "bg-indigo-50 border-indigo-200/50"
                  }`}
                >
                  <div className="flex items-center justify-center gap-2 mb-2">
                    <Coffee className="w-4 h-4 text-indigo-500" />
                    <span className={`text-sm font-semibold ${
                      isDark ? "text-indigo-400" : "text-indigo-600"
                    }`}>
                      Development Progress
                    </span>
                  </div>
                  
                  <div className={`w-full rounded-full h-2 mb-2 ${
                    isDark ? "bg-gray-700" : "bg-gray-200"
                  }`}>
                    <motion.div
                      className="h-2 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-full"
                      initial={{ width: 0 }}
                      animate={{ width: "85%" }}
                      transition={{ delay: 0.8, duration: 1.5, ease: "easeOut" }}
                    />
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <span className={`text-xs ${
                      isDark ? "text-gray-400" : "text-gray-500"
                    }`}>
                      85% Complete
                    </span>
                    <div className="flex items-center gap-1">
                      <Heart className="w-3 h-3 text-red-500 fill-current" />
                      <span className={`text-xs ${
                        isDark ? "text-gray-400" : "text-gray-500"
                      }`}>
                        Crafted with love
                      </span>
                    </div>
                  </div>
                </motion.div>

                {/* ✅ ENHANCED: Action buttons */}
                <motion.div
                  variants={contentVariants}
                  className="flex flex-col sm:flex-row gap-3"
                >
                  <motion.button
                    onClick={onClose}
                    whileHover={{ scale: 1.02, y: -1 }}
                    whileTap={{ scale: 0.98 }}
                    className="flex-1 group relative px-6 py-3 bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 overflow-hidden"
                  >
                    {/* Button background animation */}
                    <motion.div
                      className="absolute inset-0 bg-gradient-to-r from-purple-600 to-pink-600"
                      initial={{ x: "-100%" }}
                      whileHover={{ x: 0 }}
                      transition={{ duration: 0.3 }}
                    />
                    
                    <span className="relative flex items-center justify-center gap-2">
                      <Rocket className="w-4 h-4 group-hover:translate-y-[-2px] transition-transform duration-200" />
                      Got it!
                    </span>
                  </motion.button>
                  
                  <motion.button
                    onClick={onClose}
                    whileHover={{ scale: 1.02, y: -1 }}
                    whileTap={{ scale: 0.98 }}
                    className={`px-6 py-3 border-2 font-semibold rounded-xl transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 ${
                      isDark
                        ? "border-gray-600 text-gray-300 hover:border-indigo-500 hover:text-indigo-400 hover:bg-indigo-950/20"
                        : "border-gray-300 text-gray-700 hover:border-indigo-500 hover:text-indigo-600 hover:bg-indigo-50"
                    }`}
                  >
                    <span className="flex items-center justify-center gap-2">
                      <Bell className="w-4 h-4" />
                      <span className="hidden sm:inline">Notify Me</span>
                      <span className="sm:hidden">Notify</span>
                    </span>
                  </motion.button>
                </motion.div>

                {/* ✅ ENHANCED: Footer note */}
                <motion.div
                  variants={contentVariants}
                  className="mt-6 pt-4 border-t border-gray-200 dark:border-gray-700"
                >
                  <p className={`text-xs ${
                    isDark ? "text-gray-500" : "text-gray-400"
                  }`}>
                    Thank you for your patience! Follow me for updates.
                  </p>
                </motion.div>
              </div>
            </motion.div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
