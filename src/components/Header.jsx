import { useState, useEffect, useCallback, useRef, useMemo } from "react";
import { motion, AnimatePresence, useScroll, useSpring } from "framer-motion";
import { 
  Menu, 
  X, 
  Sparkles, 
  ChevronDown,
  ExternalLink,
  Download,
  Zap,
  Home,
  User,
  Code,
  Briefcase,
  Mail,
  Sun,
  Moon
} from "lucide-react";
import { useTheme } from "../contexts/ThemeContext"; // ✅ Import theme context
import { site } from "../data/site";

// ✅ ENHANCED: Navigation links with icons and better structure
const getNavigationLinks = () => [
  { name: "About", href: "#about", icon: User, description: "Learn about my journey" },
  { name: "Skills", href: "#skills", icon: Zap, description: "Technical expertise" },
  { name: "Projects", href: "#projects", icon: Code, description: "My latest work" },
  { name: "Experience", href: "#experience", icon: Briefcase, description: "Professional background" },
  { name: "Contact", href: "#contact", icon: Mail, description: "Let's connect" }
];

// ✅ ENHANCED: Theme-aware logo with better accessibility
const Logo = ({ className = "" }) => {
  const { isDark } = useTheme();
  
  return (
    <motion.div
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      className={`relative ${className}`}
    >
      <motion.a 
        href="#hero"
        className="relative flex items-center gap-3 text-xl font-black focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 rounded-lg p-2 group"
        aria-label={`${site.name || "Home"} - Go to top`}
      >
        <motion.div
          className="relative w-10 h-10 rounded-2xl bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 flex items-center justify-center shadow-xl"
          whileHover={{ 
            rotate: [0, -5, 5, 0],
            scale: 1.05
          }}
          transition={{ duration: 0.5 }}
        >
          <Sparkles className="w-5 h-5 text-white relative z-10" />
          
          {/* ✅ ENHANCED: Theme-aware glow effect */}
          <motion.div
            className="absolute inset-0 rounded-2xl blur-lg"
            style={{ 
              background: isDark 
                ? "linear-gradient(135deg, rgba(99, 102, 241, 0.4), rgba(139, 92, 246, 0.4))"
                : "linear-gradient(135deg, rgba(99, 102, 241, 0.6), rgba(139, 92, 246, 0.6))"
            }}
            animate={{ 
              opacity: isDark ? [0.3, 0.6, 0.3] : [0.4, 0.7, 0.4] 
            }}
            whileHover={{ 
              opacity: isDark ? 0.8 : 0.9 
            }}
            transition={{ duration: 0.3 }}
          />
        </motion.div>
        
        <div className="flex flex-col">
          <span className="bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 bg-clip-text text-transparent leading-none group-hover:from-purple-600 group-hover:via-pink-600 group-hover:to-indigo-600 transition-all duration-300">
            {site.name || "Your Name"}
          </span>
          <span className={`text-xs font-medium leading-none transition-colors duration-300 ${
            isDark 
              ? "text-gray-400 group-hover:text-gray-300" 
              : "text-gray-500 group-hover:text-gray-600"
          }`}>
            {site.role || "Developer"}
          </span>
        </div>
        
        <motion.div
          className="w-2 h-2 rounded-full bg-gradient-to-r from-indigo-600 to-purple-600"
          animate={{
            scale: [1, 1.3, 1],
            opacity: [1, 0.6, 1]
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
      </motion.a>
    </motion.div>
  );
};

// ✅ ENHANCED: Theme-aware desktop nav item with better accessibility
const DesktopNavItem = ({ link, hover, setHover, activeSection }) => {
  const { isDark } = useTheme();
  const isActive = activeSection === link.name.toLowerCase();
  
  return (
    <li className="relative">
      <motion.a
        href={link.href}
        onMouseEnter={() => setHover(link.name)}
        onMouseLeave={() => setHover("")}
        whileHover={{ y: -1 }}
        whileTap={{ scale: 0.98 }}
        className={`relative px-5 py-3 text-sm font-bold rounded-xl transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 flex items-center gap-2 ${
          isActive 
            ? 'text-white bg-gradient-to-r from-indigo-600 to-purple-600 shadow-lg shadow-indigo-500/25' 
            : isDark
              ? 'text-gray-300 hover:text-indigo-400 hover:bg-gray-800/80'
              : 'text-gray-700 hover:text-indigo-600 hover:bg-white/80'
        }`}
        aria-current={isActive ? "page" : undefined}
        title={link.description}
      >
        <link.icon className="w-4 h-4" />
        <span>{link.name}</span>
        
        {/* ✅ ENHANCED: Theme-aware hover background */}
        {!isActive && hover === link.name && (
          <motion.div
            layoutId="nav-hover-bg"
            className="absolute inset-0 rounded-xl"
            style={{ 
              background: isDark
                ? "linear-gradient(135deg, rgba(99, 102, 241, 0.06), rgba(139, 92, 246, 0.06))"
                : "linear-gradient(135deg, rgba(99, 102, 241, 0.08), rgba(139, 92, 246, 0.08))"
            }}
            transition={{ type: "spring", stiffness: 500, damping: 30 }}
          />
        )}
        
        {/* ✅ ENHANCED: Theme-aware active glow */}
        {isActive && (
          <motion.div
            className="absolute inset-0 rounded-xl blur-lg"
            style={{ 
              background: isDark
                ? "linear-gradient(135deg, rgba(99, 102, 241, 0.3), rgba(139, 92, 246, 0.3))"
                : "linear-gradient(135deg, rgba(99, 102, 241, 0.4), rgba(139, 92, 246, 0.4))"
            }}
            animate={{ 
              opacity: isDark ? [0.2, 0.3, 0.2] : [0.2, 0.4, 0.2] 
            }}
            transition={{ duration: 2, repeat: Infinity }}
          />
        )}
      </motion.a>
    </li>
  );
};

// ✅ ENHANCED: Theme-aware mobile menu with better UX
const MobileMenu = ({ open, setOpen, activeSection }) => {
  const { isDark } = useTheme();
  const links = getNavigationLinks();

  // Enhanced menu management
  useEffect(() => {
    if (!open) return;

    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        setOpen(false);
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    document.body.style.overflow = 'hidden';

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'unset';
    };
  }, [open, setOpen]);

  const menuVariants = {
    hidden: { 
      opacity: 0, 
      height: 0,
      y: -20 
    },
    visible: { 
      opacity: 1, 
      height: "auto",
      y: 0,
      transition: {
        duration: 0.4,
        ease: [0.22, 1, 0.36, 1],
        staggerChildren: 0.08,
        delayChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, x: -20, scale: 0.95 },
    visible: { 
      opacity: 1, 
      x: 0, 
      scale: 1,
      transition: {
        duration: 0.4,
        ease: [0.22, 1, 0.36, 1]
      }
    }
  };

  return (
    <AnimatePresence>
      {open && (
        <>
          {/* ✅ ENHANCED: Theme-aware backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className={`fixed inset-0 backdrop-blur-sm z-40 lg:hidden ${
              isDark 
                ? "bg-black/40" 
                : "bg-black/20"
            }`}
            onClick={() => setOpen(false)}
          />

          {/* ✅ ENHANCED: Theme-aware menu */}
          <motion.nav
            variants={menuVariants}
            initial="hidden"
            animate="visible"
            exit="hidden"
            className={`md:hidden relative z-50 overflow-hidden backdrop-blur-xl border-t shadow-2xl ${
              isDark
                ? "bg-gray-900/95 border-gray-700/60"
                : "bg-white/95 border-gray-200/60"
            }`}
            role="navigation"
            aria-label="Mobile navigation"
          >
            <div className="px-6 py-8 space-y-4">
              {/* Navigation Links */}
              <div className="space-y-3">
                {links.map((link) => {
                  const isActive = activeSection === link.name.toLowerCase();
                  
                  return (
                    <motion.div key={link.name} variants={itemVariants}>
                      <motion.a
                        href={link.href}
                        onClick={() => setOpen(false)}
                        whileHover={{ x: 8, scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        className={`group flex items-center justify-between px-6 py-4 rounded-2xl transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 ${
                          isActive
                            ? 'bg-gradient-to-r from-indigo-600 to-purple-600 text-white shadow-lg shadow-indigo-500/25'
                            : isDark
                              ? 'text-gray-300 hover:bg-gray-800/80 hover:text-indigo-400'
                              : 'text-gray-700 hover:bg-gray-100 hover:text-indigo-600'
                        }`}
                        aria-current={isActive ? "page" : undefined}
                      >
                        <div className="flex items-center gap-4">
                          <motion.div
                            className={`p-2 rounded-lg transition-all duration-300 ${
                              isActive 
                                ? 'bg-white/20' 
                                : isDark
                                  ? 'bg-gray-700 group-hover:bg-indigo-900/30'
                                  : 'bg-gray-200 group-hover:bg-indigo-50'
                            }`}
                            whileHover={{ rotate: [0, -5, 5, 0] }}
                            transition={{ duration: 0.5 }}
                          >
                            <link.icon className={`w-4 h-4 ${
                              isActive 
                                ? 'text-white' 
                                : isDark
                                  ? 'text-gray-400 group-hover:text-indigo-400'
                                  : 'text-gray-500 group-hover:text-indigo-600'
                            }`} />
                          </motion.div>
                          <div>
                            <div className="font-bold">{link.name}</div>
                            <div className={`text-xs ${
                              isActive 
                                ? 'text-white/80' 
                                : isDark
                                  ? 'text-gray-500'
                                  : 'text-gray-500'
                            }`}>
                              {link.description}
                            </div>
                          </div>
                        </div>
                        
                        <motion.div
                          animate={{ rotate: isActive ? 90 : 0 }}
                          transition={{ duration: 0.3 }}
                        >
                          <ChevronDown 
                            className={`w-4 h-4 transition-colors duration-300 ${
                              isActive 
                                ? 'text-white' 
                                : isDark
                                  ? 'text-gray-400 group-hover:text-indigo-400'
                                  : 'text-gray-400 group-hover:text-indigo-500'
                            }`}
                          />
                        </motion.div>
                      </motion.a>
                    </motion.div>
                  );
                })}
              </div>
              
              {/* ✅ ENHANCED: CTAs with theme awareness */}
              <motion.div 
                variants={itemVariants}
                className={`pt-6 border-t space-y-3 ${
                  isDark ? "border-gray-700" : "border-gray-200"
                }`}
              >
                <motion.a
                  href="#contact"
                  onClick={() => setOpen(false)}
                  whileHover={{ scale: 1.02, y: -2 }}
                  whileTap={{ scale: 0.98 }}
                  className="flex items-center justify-center gap-3 w-full px-6 py-4 bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-bold rounded-2xl shadow-xl shadow-indigo-500/25 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 group overflow-hidden relative"
                >
                  <Zap className="w-5 h-5 relative z-10" />
                  <span className="relative z-10">Get In Touch</span>
                  <ExternalLink className="w-4 h-4 relative z-10 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform duration-200" />
                  
                  {/* Hover effect */}
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-r from-purple-600 to-pink-600"
                    initial={{ x: "-100%" }}
                    whileHover={{ x: 0 }}
                    transition={{ duration: 0.3 }}
                  />
                </motion.a>
                
                {site.links?.resume && (
                  <motion.a
                    href={site.links.resume}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={() => setOpen(false)}
                    whileHover={{ scale: 1.02, y: -2 }}
                    whileTap={{ scale: 0.98 }}
                    className={`flex items-center justify-center gap-3 w-full px-6 py-4 border-2 font-bold rounded-2xl transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 ${
                      isDark
                        ? "border-gray-600 text-gray-300 hover:border-indigo-500 hover:text-indigo-400"
                        : "border-gray-300 text-gray-700 hover:border-indigo-500 hover:text-indigo-600"
                    }`}
                  >
                    <Download className="w-4 h-4" />
                    <span>Download CV</span>
                  </motion.a>
                )}
              </motion.div>
            </div>
          </motion.nav>
        </>
      )}
    </AnimatePresence>
  );
};

// ✅ ENHANCED: Scroll progress with theme awareness
const ScrollProgress = ({ scrollYProgress }) => {
  const { isDark } = useTheme();
  
  return (
    <>
      <motion.div
        className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 origin-left"
        style={{ scaleX: scrollYProgress }}
      />
      <motion.div
        className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-indigo-600/50 via-purple-600/50 to-pink-600/50 origin-left blur-sm"
        style={{ 
          scaleX: scrollYProgress,
          opacity: isDark ? 0.8 : 0.6
        }}
      />
    </>
  );
};

// ✅ ENHANCED: Section observer with better performance
const useSectionObserver = () => {
  const [activeSection, setActiveSection] = useState("");

  useEffect(() => {
    const observerOptions = {
      root: null,
      rootMargin: '-20% 0px -60% 0px',
      threshold: [0, 0.25, 0.5, 0.75, 1]
    };

    const observerCallback = (entries) => {
      let mostVisible = null;
      let maxRatio = 0;

      entries.forEach((entry) => {
        if (entry.intersectionRatio > maxRatio) {
          maxRatio = entry.intersectionRatio;
          mostVisible = entry.target.id;
        }
      });

      if (mostVisible) {
        setActiveSection(mostVisible);
      }
    };

    const observer = new IntersectionObserver(observerCallback, observerOptions);

    // Observe all sections
    const links = getNavigationLinks();
    links.forEach(link => {
      const sectionId = link.href.replace('#', '');
      const element = document.getElementById(sectionId);
      if (element) {
        observer.observe(element);
      }
    });

    // Also observe hero section
    const heroElement = document.getElementById('hero');
    if (heroElement) {
      observer.observe(heroElement);
    }

    return () => observer.disconnect();
  }, []);

  return activeSection;
};

// ✅ ENHANCED: Theme-aware theme toggle button (simplified for header)
const HeaderThemeToggle = () => {
  const { isDark, toggleTheme } = useTheme();

  return (
    <motion.button
      onClick={toggleTheme}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      className={`p-3 rounded-2xl backdrop-blur-sm border transition-all duration-300 shadow-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 ${
        isDark
          ? "bg-gray-800/80 border-gray-700/60 hover:bg-gray-800"
          : "bg-white/80 border-gray-200/60 hover:bg-white"
      }`}
      aria-label={`Switch to ${isDark ? 'light' : 'dark'} mode`}
    >
      <AnimatePresence mode="wait">
        {isDark ? (
          <motion.div
            key="sun"
            initial={{ rotate: -90, opacity: 0, scale: 0.5 }}
            animate={{ rotate: 0, opacity: 1, scale: 1 }}
            exit={{ rotate: 90, opacity: 0, scale: 0.5 }}
            transition={{ duration: 0.3 }}
          >
            <Sun className="w-5 h-5 text-amber-500" />
          </motion.div>
        ) : (
          <motion.div
            key="moon"
            initial={{ rotate: 90, opacity: 0, scale: 0.5 }}
            animate={{ rotate: 0, opacity: 1, scale: 1 }}
            exit={{ rotate: -90, opacity: 0, scale: 0.5 }}
            transition={{ duration: 0.3 }}
          >
            <Moon className="w-5 h-5 text-indigo-600" />
          </motion.div>
        )}
      </AnimatePresence>
    </motion.button>
  );
};

// ✅ MAIN: Enhanced Header component with full theme integration
export default function Header() {
  const { isDark } = useTheme(); // ✅ Use theme context
  const [open, setOpen] = useState(false);
  const [hover, setHover] = useState("");
  const [scrolled, setScrolled] = useState(false);
  const timeoutRef = useRef(null);

  const { scrollYProgress } = useScroll();
  const scrollYSpring = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  const activeSection = useSectionObserver();
  const links = useMemo(() => getNavigationLinks(), []);

  // ✅ ENHANCED: Optimized scroll handler with theme awareness
  const handleScroll = useCallback(() => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }

    timeoutRef.current = setTimeout(() => {
      const scrollPosition = window.scrollY;
      setScrolled(scrollPosition > 50);
    }, 10);
  }, []);

  useEffect(() => {
    const scrollHandler = () => handleScroll();
    window.addEventListener('scroll', scrollHandler, { passive: true });
    handleScroll(); // Set initial state
    
    return () => {
      window.removeEventListener('scroll', scrollHandler);
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, [handleScroll]);

  // ✅ ENHANCED: Better mobile menu management
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (open && !e.target.closest('[data-mobile-menu]') && !e.target.closest('nav')) {
        setOpen(false);
      }
    };

    const handleResize = () => {
      if (window.innerWidth >= 1024 && open) {
        setOpen(false);
      }
    };

    if (open) {
      document.addEventListener('mousedown', handleClickOutside);
      window.addEventListener('resize', handleResize);
      return () => {
        document.removeEventListener('mousedown', handleClickOutside);
        window.removeEventListener('resize', handleResize);
      };
    }
  }, [open]);

  return (
    <motion.header
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
      className={`fixed top-0 w-full z-50 transition-all duration-500 ${
        scrolled 
          ? isDark
            ? 'bg-gray-900/90 backdrop-blur-xl border-b border-gray-700/60 shadow-lg shadow-black/20'
            : 'bg-white/90 backdrop-blur-xl border-b border-gray-200/60 shadow-lg shadow-black/5'
          : 'bg-transparent border-b border-transparent'
      }`}
      role="banner"
    >
      <ScrollProgress scrollYProgress={scrollYSpring} />

      <div className="mx-auto max-w-7xl px-6 h-20 flex items-center justify-between">
        <Logo />

        {/* ✅ ENHANCED: Desktop Navigation with theme integration */}
        <motion.nav
          className="hidden lg:flex"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.6 }}
          role="navigation"
          aria-label="Main navigation"
        >
          <ul className="flex items-center gap-2">
            {links.map((link) => (
              <DesktopNavItem
                key={link.name}
                link={link}
                hover={hover}
                setHover={setHover}
                activeSection={activeSection}
              />
            ))}
          </ul>
        </motion.nav>

        {/* ✅ ENHANCED: Right side controls with theme integration */}
        <motion.div
          className="flex items-center gap-4"
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.3, duration: 0.6 }}
        >
          {/* ✅ ENHANCED: Desktop CTA with theme awareness */}
          <motion.a
            href="#contact"
            whileHover={{ scale: 1.05, y: -2 }}
            whileTap={{ scale: 0.95 }}
            className="hidden lg:flex items-center gap-3 px-6 py-3 bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-bold rounded-2xl shadow-xl shadow-indigo-500/25 hover:shadow-2xl hover:shadow-indigo-500/40 transition-all duration-300 overflow-hidden group focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 relative"
          >
            <span className="relative z-10">Hire Me</span>
            <ExternalLink className="w-4 h-4 relative z-10 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform duration-200" />
            
            {/* ✅ ENHANCED: Hover background animation */}
            <motion.div
              className="absolute inset-0 bg-gradient-to-r from-purple-600 to-pink-600"
              initial={{ x: "-100%" }}
              whileHover={{ x: 0 }}
              transition={{ duration: 0.3 }}
            />
          </motion.a>

          <HeaderThemeToggle />

          {/* ✅ ENHANCED: Mobile menu button with theme awareness */}
          <motion.button
            onClick={() => setOpen(!open)}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className={`lg:hidden p-3 rounded-2xl backdrop-blur-sm border transition-all duration-300 shadow-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 ${
              isDark
                ? "bg-gray-800/80 border-gray-700/60 hover:bg-gray-800"
                : "bg-white/80 border-gray-200/60 hover:bg-white"
            }`}
            aria-label="Toggle mobile menu"
            aria-expanded={open}
            data-mobile-menu
          >
            <AnimatePresence mode="wait">
              {open ? (
                <motion.div
                  key="close"
                  initial={{ rotate: -90, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: 90, opacity: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <X className={`w-6 h-6 ${
                    isDark ? "text-gray-300" : "text-gray-700"
                  }`} />
                </motion.div>
              ) : (
                <motion.div
                  key="menu"
                  initial={{ rotate: 90, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: -90, opacity: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <Menu className={`w-6 h-6 ${
                    isDark ? "text-gray-300" : "text-gray-700"
                  }`} />
                </motion.div>
              )}
            </AnimatePresence>
          </motion.button>
        </motion.div>
      </div>

      <MobileMenu open={open} setOpen={setOpen} activeSection={activeSection} />
    </motion.header>
  );
}
