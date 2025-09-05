import { useState, useEffect, Suspense, lazy, useCallback } from "react";
import { motion, AnimatePresence, useScroll, useSpring } from "framer-motion";
import { 
  ArrowUp, 
  Loader, 
  Wifi, 
  WifiOff, 
  Eye,
  EyeOff,
  Sparkles,
  Sun,
  Moon,
  Palette,
  Settings
} from "lucide-react";
import { useTheme } from "./contexts/ThemeContext";

// ✅ ENHANCED: Lazy load components for better performance (including Education)
const Header = lazy(() => import("./components/Header"));
const Hero = lazy(() => import("./components/Hero"));
const About = lazy(() => import("./components/About"));
const Education = lazy(() => import("./components/Education")); // ✅ NEW: Education component
const Skills = lazy(() => import("./components/Skills"));
const Projects = lazy(() => import("./components/Projects"));
const Experience = lazy(() => import("./components/Experience"));
const Contact = lazy(() => import("./components/Contact"));
const Footer = lazy(() => import("./components/Footer"));

// ✅ ENHANCED: Loading Screen with context theme
const LoadingScreen = ({ progress }) => {
  const { isDark } = useTheme();
  
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{ duration: 0.5 }}
      className={`fixed inset-0 z-50 flex items-center justify-center ${
        isDark
          ? "bg-gradient-to-br from-gray-900 via-gray-900 to-indigo-900"
          : "bg-gradient-to-br from-indigo-50 via-white to-purple-50"
      }`}
    >
      {/* Animated background pattern */}
      <div className="absolute inset-0 opacity-10 dark:opacity-5">
        <motion.div
          className="absolute inset-0"
          animate={{
            background: [
              "rgba(99, 102, 241, 0.05)",
              "rgba(139, 92, 246, 0.08)",
              "rgba(99, 102, 241, 0.05)"
            ]
          }}
          transition={{ duration: 4, repeat: Infinity }}
        />
        
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          className="absolute top-1/4 left-1/4 w-64 h-64 bg-gradient-to-r from-indigo-400/30 to-purple-400/30 rounded-full blur-3xl"
        />
        <motion.div
          animate={{ rotate: -360 }}
          transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
          className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-gradient-to-r from-purple-400/20 to-pink-400/20 rounded-full blur-3xl"
        />
      </div>

      <div className="relative z-10 text-center max-w-md mx-auto px-6">
        {/* Logo animation */}
        <motion.div
          initial={{ scale: 0, rotate: -180 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{ duration: 1, ease: "easeOut" }}
          className="relative mb-8"
        >
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
            className="w-20 h-20 mx-auto rounded-2xl bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-600 flex items-center justify-center shadow-2xl shadow-indigo-500/25"
          >
            <Sparkles className="w-10 h-10 text-white" />
          </motion.div>
          
          {/* Orbiting dots */}
          {[...Array(3)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute top-1/2 left-1/2 w-3 h-3 bg-indigo-500 rounded-full"
              animate={{ rotate: 360 }}
              transition={{
                duration: 2,
                repeat: Infinity,
                delay: i * 0.3,
                ease: "linear"
              }}
              style={{
                transformOrigin: `${30 + i * 10}px 0px`,
                x: -6,
                y: -6
              }}
            />
          ))}
        </motion.div>

        {/* Loading text */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.8 }}
          className="space-y-4"
        >
          <h2 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
            Dhruv Prajapati
          </h2>
          <p className={`text-lg ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
            MERN Stack Developer
          </p>
        </motion.div>

        {/* Progress bar */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
          className="mt-8 space-y-2"
        >
          <div className={`flex justify-between text-sm ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
            <span>Loading experience...</span>
            <span>{Math.round(progress)}%</span>
          </div>
          <div className={`w-full h-2 rounded-full overflow-hidden ${isDark ? 'bg-gray-700' : 'bg-gray-200'}`}>
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${progress}%` }}
              transition={{ duration: 0.5, ease: "easeOut" }}
              className="h-full bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 rounded-full relative overflow-hidden"
            >
              <motion.div
                animate={{ x: ['-100%', '100%'] }}
                transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent"
              />
            </motion.div>
          </div>
        </motion.div>

        {/* ✅ ENHANCED: Loading tips with Education reference */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5 }}
          className={`mt-6 text-sm ${isDark ? 'text-gray-400' : 'text-gray-500'}`}
        >
          <AnimatePresence mode="wait">
            <motion.p
              key={Math.floor(progress / 20)}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3 }}
            >
              {progress < 20 && "Setting up modern UI components..."}
              {progress >= 20 && progress < 40 && "Loading interactive animations..."}
              {progress >= 40 && progress < 60 && "Preparing portfolio content..."}
              {progress >= 60 && progress < 80 && "Loading education timeline..."}
              {progress >= 80 && "Almost ready! Finalizing details..."}
            </motion.p>
          </AnimatePresence>
        </motion.div>
      </div>
    </motion.div>
  );
};

// Enhanced Component Loader
const ComponentLoader = ({ name }) => {
  const { isDark } = useTheme();
  
  return (
    <div className="flex items-center justify-center py-20">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className={`flex items-center gap-3 ${isDark ? 'text-gray-400' : 'text-gray-600'}`}
      >
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
          className="relative"
        >
          <Loader className="w-6 h-6" />
          <motion.div
            className="absolute inset-0 w-6 h-6 border-2 border-transparent border-t-indigo-600 rounded-full"
            animate={{ rotate: 360 }}
            transition={{ duration: 0.8, repeat: Infinity, ease: "linear" }}
          />
        </motion.div>
        <span className="font-medium">Loading {name}...</span>
      </motion.div>
    </div>
  );
};

// ✅ ENHANCED: Theme Toggle using Context
const ThemeToggle = () => {
  const { isDark, toggleTheme } = useTheme();

  return (
    <motion.button
      onClick={toggleTheme}
      aria-label={`Switch to ${isDark ? 'light' : 'dark'} mode`}
      className="fixed top-6 right-6 z-40 inline-flex items-center gap-2 rounded-full bg-white/80 dark:bg-gray-900/80 backdrop-blur-md border border-gray-200/60 dark:border-gray-700/60 px-3 py-2 shadow-lg hover:shadow-xl transition-all duration-300"
      whileHover={{ scale: 1.03 }}
      whileTap={{ scale: 0.97 }}
    >
      <motion.div
        className="relative h-6 w-11 rounded-full"
        animate={{
          backgroundColor: isDark ? '#374151' : '#e5e7eb'
        }}
        transition={{ duration: 0.25 }}
      >
        <motion.div
          className="absolute top-0.5 h-5 w-5 rounded-full shadow-sm flex items-center justify-center bg-white dark:bg-gray-800"
          animate={{
            x: isDark ? 22 : 2
          }}
          transition={{ type: 'spring', stiffness: 500, damping: 30 }}
          whileTap={{ scale: 0.95 }}
        >
          <AnimatePresence mode="wait">
            {isDark ? (
              <motion.span
                key="sun"
                initial={{ rotate: -90, opacity: 0 }}
                animate={{ rotate: 0, opacity: 1 }}
                exit={{ rotate: 90, opacity: 0 }}
                transition={{ duration: 0.2 }}
              >
                <Sun className="w-3.5 h-3.5 text-yellow-500" />
              </motion.span>
            ) : (
              <motion.span
                key="moon"
                initial={{ rotate: 90, opacity: 0 }}
                animate={{ rotate: 0, opacity: 1 }}
                exit={{ rotate: -90, opacity: 0 }}
                transition={{ duration: 0.2 }}
              >
                <Moon className="w-3.5 h-3.5 text-indigo-600" />
              </motion.span>
            )}
          </AnimatePresence>
        </motion.div>
      </motion.div>

      <span className="hidden sm:inline text-sm font-medium text-gray-700 dark:text-gray-300">
        {isDark ? 'Dark' : 'Light'}
      </span>
    </motion.button>
  );
};

// Enhanced Scroll Progress
const ScrollProgress = () => {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  return (
    <>
      {/* Main progress bar */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-1 bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 transform-origin-left z-50"
        style={{ scaleX }}
      />
      
      {/* Secondary glow effect */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-1 bg-gradient-to-r from-indigo-600/50 via-purple-600/50 to-pink-600/50 transform-origin-left z-49 blur-sm"
        style={{ scaleX }}
      />
    </>
  );
};

// ✅ ENHANCED: Custom Cursor with theme awareness
const CustomCursor = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isPointer, setIsPointer] = useState(false);
  const [isHidden, setIsHidden] = useState(false);
  const { isDark } = useTheme();

  useEffect(() => {
    const updateMousePosition = (e) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    const handleMouseOver = (e) => {
      const target = e.target;
      const isInteractive = target.tagName === 'A' || 
        target.tagName === 'BUTTON' || 
        target.onclick !== null ||
        target.classList.contains('cursor-pointer') ||
        getComputedStyle(target).cursor === 'pointer';
      
      setIsPointer(isInteractive);
    };

    const handleMouseLeave = () => setIsHidden(true);
    const handleMouseEnter = () => setIsHidden(false);

    window.addEventListener('mousemove', updateMousePosition);
    window.addEventListener('mouseover', handleMouseOver);
    document.addEventListener('mouseleave', handleMouseLeave);
    document.addEventListener('mouseenter', handleMouseEnter);

    return () => {
      window.removeEventListener('mousemove', updateMousePosition);
      window.removeEventListener('mouseover', handleMouseOver);
      document.removeEventListener('mouseleave', handleMouseLeave);
      document.removeEventListener('mouseenter', handleMouseEnter);
    };
  }, []);

  // Only show custom cursor on desktop
  if (typeof window !== 'undefined' && window.innerWidth < 1024) return null;

  return (
    <>
      {/* Main cursor */}
      <motion.div
        className="fixed w-4 h-4 rounded-full pointer-events-none z-50 mix-blend-difference"
        animate={{
          x: mousePosition.x - 8,
          y: mousePosition.y - 8,
          scale: isPointer ? 1.5 : 1,
          opacity: isHidden ? 0 : 1,
          backgroundColor: isPointer 
            ? (isDark ? "rgba(139, 92, 246, 1)" : "rgba(99, 102, 241, 1)")
            : (isDark ? "rgba(139, 92, 246, 0.8)" : "rgba(99, 102, 241, 0.8)")
        }}
        transition={{ type: "spring", stiffness: 500, damping: 28 }}
      />
      
      {/* Cursor trail */}
      <motion.div
        className="fixed w-8 h-8 rounded-full pointer-events-none z-40"
        animate={{
          x: mousePosition.x - 16,
          y: mousePosition.y - 16,
          scale: isPointer ? 2 : 1,
          opacity: isHidden ? 0 : 0.2,
          backgroundColor: isDark ? "rgba(139, 92, 246, 0.3)" : "rgba(99, 102, 241, 0.3)"
        }}
        transition={{ type: "spring", stiffness: 150, damping: 15, delay: 0.02 }}
      />
    </>
  );
};

// ✅ ENHANCED: Background Effects with theme awareness
const BackgroundEffects = () => {
  const { isDark } = useTheme();
  
  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden">
      {/* Gradient orbs */}
      <motion.div
        animate={{ 
          rotate: [0, 360],
          scale: [1, 1.1, 1],
          x: [0, 50, 0],
          y: [0, -30, 0]
        }}
        transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
        className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full blur-3xl"
        style={{
          background: `radial-gradient(circle, ${
            isDark 
              ? "rgba(99, 102, 241, 0.05) 0%, rgba(139, 92, 246, 0.05) 50%, rgba(0, 0, 0, 0) 100%"
              : "rgba(99, 102, 241, 0.08) 0%, rgba(139, 92, 246, 0.08) 50%, rgba(0, 0, 0, 0) 100%"
          })`
        }}
      />
      
      <motion.div
        animate={{ 
          rotate: [360, 0],
          scale: [1, 1.2, 1],
          x: [0, -40, 0],
          y: [0, 40, 0]
        }}
        transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
        className="absolute bottom-1/4 right-1/4 w-96 h-96 rounded-full blur-3xl"
        style={{
          background: `radial-gradient(circle, ${
            isDark
              ? "rgba(139, 92, 246, 0.05) 0%, rgba(236, 72, 153, 0.05) 50%, rgba(0, 0, 0, 0) 100%"
              : "rgba(139, 92, 246, 0.08) 0%, rgba(236, 72, 153, 0.08) 50%, rgba(0, 0, 0, 0) 100%"
          })`
        }}
      />

      {/* Floating particles */}
      {[...Array(6)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-2 h-2 rounded-full"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
            backgroundColor: isDark ? "rgba(139, 92, 246, 0.3)" : "rgba(99, 102, 241, 0.3)"
          }}
          animate={{
            y: [0, -100, 0],
            x: [0, Math.random() * 50 - 25, 0],
            opacity: [0.3, 1, 0.3],
            scale: [1, 1.5, 1]
          }}
          transition={{
            duration: 10 + Math.random() * 10,
            repeat: Infinity,
            delay: i * 2,
            ease: "easeInOut"
          }}
        />
      ))}

      {/* Grid pattern overlay */}
      <div 
        className={`absolute inset-0 ${isDark ? 'opacity-10' : 'opacity-20'}`}
        style={{
          backgroundImage: `
            linear-gradient(rgba(99,102,241,0.03) 1px, rgba(0,0,0,0) 1px),
            linear-gradient(90deg, rgba(99,102,241,0.03) 1px, rgba(0,0,0,0) 1px)
          `,
          backgroundSize: '50px 50px'
        }} 
      />
    </div>
  );
};

// Back to Top Button
const BackToTop = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const toggleVisibility = () => {
      setIsVisible(window.pageYOffset > 300);
    };

    window.addEventListener('scroll', toggleVisibility);
    return () => window.removeEventListener('scroll', toggleVisibility);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.button
          initial={{ opacity: 0, scale: 0, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0, y: 20 }}
          onClick={scrollToTop}
          whileHover={{ scale: 1.1, y: -2 }}
          whileTap={{ scale: 0.9 }}
          className="fixed bottom-8 right-8 p-4 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-full shadow-lg hover:shadow-xl transition-all duration-300 z-40 group focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
          aria-label="Back to top"
        >
          <ArrowUp className="w-5 h-5 group-hover:-translate-y-0.5 transition-transform duration-200" />
        </motion.button>
      )}
    </AnimatePresence>
  );
};

// Network Status Indicator
const NetworkStatus = () => {
  const [isOnline, setIsOnline] = useState(navigator.onLine);

  useEffect(() => {
    const handleOnline = () => setIsOnline(true);
    const handleOffline = () => setIsOnline(false);

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  if (isOnline) return null;

  return (
    <motion.div
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      exit={{ y: -100 }}
      className="fixed top-20 left-1/2 transform -translate-x-1/2 z-50 flex items-center gap-2 px-4 py-2 bg-red-500 text-white rounded-full shadow-lg"
    >
      <WifiOff className="w-4 h-4" />
      <span className="text-sm font-medium">You're offline</span>
    </motion.div>
  );
};

// ✅ MAIN: App component with Education integration
export default function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [loadingProgress, setLoadingProgress] = useState(0);
  const { isDark } = useTheme();

  // Enhanced loading with realistic progress
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 3500);

    // Realistic loading progress simulation
    const progressTimer = setInterval(() => {
      setLoadingProgress(prev => {
        if (prev >= 100) {
          clearInterval(progressTimer);
          return 100;
        }
        
        // Simulate realistic loading phases
        let increment;
        if (prev < 20) increment = Math.random() * 8 + 5; // Initial load: 5-13%
        else if (prev < 50) increment = Math.random() * 6 + 3; // Asset loading: 3-9%
        else if (prev < 80) increment = Math.random() * 4 + 2; // Component setup: 2-6%
        else increment = Math.random() * 2 + 1; // Finalizing: 1-3%
        
        return Math.min(prev + increment, 100);
      });
    }, 180);

    return () => {
      clearTimeout(timer);
      clearInterval(progressTimer);
    };
  }, []);

  // Enhanced smooth scrolling with offset
  const handleSmoothScroll = useCallback((e) => {
    const target = e.target.closest('a[href^="#"]');
    if (target) {
      e.preventDefault();
      const id = target.getAttribute('href').slice(1);
      const element = document.getElementById(id);
      if (element) {
        const headerOffset = 80;
        const elementPosition = element.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

        window.scrollTo({
          top: offsetPosition,
          behavior: 'smooth'
        });
      }
    }
  }, []);

  useEffect(() => {
    document.addEventListener('click', handleSmoothScroll);
    return () => document.removeEventListener('click', handleSmoothScroll);
  }, [handleSmoothScroll]);

  return (
    <div className={`min-h-screen overflow-x-hidden selection:bg-indigo-200/60 dark:selection:bg-indigo-500/30 transition-colors duration-500 ${
      isDark
        ? "bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white"
        : "bg-gradient-to-br from-white via-gray-50 to-indigo-50 text-gray-900"
    }`}>
      {/* Enhanced Loading Screen */}
      <AnimatePresence>
        {isLoading && <LoadingScreen progress={loadingProgress} />}
      </AnimatePresence>

      {/* App Content */}
      <AnimatePresence>
        {!isLoading && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            {/* Enhanced UI Elements */}
            <ScrollProgress />
            <CustomCursor />
            <ThemeToggle />
            <BackgroundEffects />
            <NetworkStatus />
            <BackToTop />

            {/* Header */}
            <Suspense fallback={<ComponentLoader name="Navigation" />}>
              <Header />
            </Suspense>

            {/* ✅ ENHANCED: Main Content with Education section */}
            <motion.main
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <Suspense fallback={<ComponentLoader name="Hero" />}>
                <Hero />
              </Suspense>

              <Suspense fallback={<ComponentLoader name="About" />}>
                <About />
              </Suspense>

              {/* ✅ NEW: Education section added after About */}
              <Suspense fallback={<ComponentLoader name="Education" />}>
                <Education />
              </Suspense>

              <Suspense fallback={<ComponentLoader name="Skills" />}>
                <Skills />
              </Suspense>

              <Suspense fallback={<ComponentLoader name="Projects" />}>
                <Projects />
              </Suspense>

              <Suspense fallback={<ComponentLoader name="Experience" />}>
                <Experience />
              </Suspense>

              <Suspense fallback={<ComponentLoader name="Contact" />}>
                <Contact />
              </Suspense>
            </motion.main>

            {/* Footer */}
            <Suspense fallback={<ComponentLoader name="Footer" />}>
              <Footer />
            </Suspense>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

// Export performance utilities for other components
export const usePerformance = () => {
  const [performance, setPerformance] = useState({
    loadTime: 0,
    renderTime: 0
  });

  useEffect(() => {
    const loadTime = performance.now();
    setPerformance(prev => ({ ...prev, loadTime }));
  }, []);

  return performance;
};
