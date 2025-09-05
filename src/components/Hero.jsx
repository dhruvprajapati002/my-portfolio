import { motion, useScroll, useTransform, useMotionValue, useSpring, useInView } from "framer-motion";
import {
  Github,
  Linkedin,
  Mail,
  ArrowDown,
  Download,
  Play,
  Sparkles,
  Coffee,
  Code,
  Star,
  MapPin,
  Calendar,
  Award,
  Zap,
  Globe,
  Eye,
  Heart,
  Rocket,
  ChevronDown,
  ExternalLink,
  Send
} from "lucide-react";
import { useState, useEffect, useRef, useCallback, useMemo } from "react";
import { useTheme } from "../contexts/ThemeContext";
import { site } from "../data/site";

// ✅ ENHANCED: Theme-aware floating elements with better performance
const FloatingElement = ({ icon: Icon, delay = 0, duration = 8, className = "", index }) => {
  const { isDark } = useTheme();
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const animationConfig = useMemo(() => ({
    x: [0, Math.sin(index * 0.5) * 80, Math.cos(index * 0.3) * -60, 0],
    y: [0, Math.cos(index * 0.4) * -100, Math.sin(index * 0.6) * 50, 0],
    rotate: [0, 120 + index * 30, -60 + index * 20, 360],
    scale: [0.8, 1.2, 0.9, 1.0],
  }), [index]);

  return (
    <motion.div
      ref={ref}
      className={`absolute pointer-events-none ${className}`}
      animate={isInView ? animationConfig : {}}
      transition={{
        duration: duration + Math.random() * 3,
        delay,
        repeat: Infinity,
        ease: "easeInOut",
      }}
      aria-hidden="true"
    >
      <motion.div 
        className="relative"
        whileHover={{ scale: 1.15, rotate: 10 }}
      >
        <div 
          className="absolute inset-0 rounded-full blur-xl"
          style={{ 
            background: isDark
              ? "radial-gradient(circle, rgba(99, 102, 241, 0.15) 0%, rgba(139, 92, 246, 0.15) 50%, rgba(0, 0, 0, 0) 100%)"
              : "radial-gradient(circle, rgba(99, 102, 241, 0.2) 0%, rgba(139, 92, 246, 0.2) 50%, rgba(0, 0, 0, 0) 100%)"
          }}
        />
        <div className={`relative z-10 p-3 backdrop-blur-sm rounded-2xl border ${
          isDark
            ? "bg-gray-800/20 border-gray-700/30"
            : "bg-white/20 border-white/30"
        }`}>
          <Icon className={`w-6 h-6 ${
            isDark ? "text-indigo-400/70" : "text-indigo-500/70"
          }`} />
        </div>
      </motion.div>
    </motion.div>
  );
};

// ✅ ENHANCED: Theme-aware particle system
const ParticleSystem = () => {
  const { isDark } = useTheme();
  
  const particles = useMemo(() => 
    Array.from({ length: 8 }, (_, i) => ({
      id: i,
      size: Math.random() * 3 + 2,
      initialX: Math.random() * 100,
      initialY: Math.random() * 100,
      duration: Math.random() * 6 + 4,
      delay: Math.random() * 3
    })), []
  );

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {particles.map((particle) => (
        <motion.div
          key={particle.id}
          className="absolute rounded-full"
          style={{
            width: particle.size,
            height: particle.size,
            left: `${particle.initialX}%`,
            top: `${particle.initialY}%`,
            background: isDark
              ? "linear-gradient(135deg, rgba(99, 102, 241, 0.4), rgba(139, 92, 246, 0.4))"
              : "linear-gradient(135deg, rgba(99, 102, 241, 0.6), rgba(139, 92, 246, 0.6))"
          }}
          animate={{
            y: [-40, -160, -40],
            x: [0, Math.sin(particle.id) * 80, 0],
            opacity: isDark ? [0.15, 0.5, 0.15] : [0.2, 0.7, 0.2],
            scale: [0.5, 1.2, 0.5],
          }}
          transition={{
            duration: particle.duration,
            repeat: Infinity,
            delay: particle.delay,
            ease: "easeInOut",
          }}
        />
      ))}
    </div>
  );
};

// ✅ ENHANCED: Improved typewriter with better accessibility
const TypewriterText = ({ texts = [], className = "" }) => {
  const [displayText, setDisplayText] = useState("");
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isTyping, setIsTyping] = useState(true);
  
  useEffect(() => {
    if (!texts || texts.length === 0) return;
    
    let timer;
    const currentText = texts[currentIndex] || "";
    
    if (isTyping) {
      if (displayText.length < currentText.length) {
        timer = setTimeout(() => {
          setDisplayText(currentText.slice(0, displayText.length + 1));
        }, 80);
      } else {
        timer = setTimeout(() => {
          setIsTyping(false);
        }, 2000);
      }
    } else {
      if (displayText.length > 0) {
        timer = setTimeout(() => {
          setDisplayText(displayText.slice(0, -1));
        }, 40);
      } else {
        setCurrentIndex((prev) => (prev + 1) % texts.length);
        setIsTyping(true);
      }
    }
    
    return () => clearTimeout(timer);
  }, [displayText, currentIndex, isTyping, texts]);

  return (
    <span className={className} aria-label={`Current role: ${displayText}`}>
      {displayText}
      <motion.span
        animate={{ opacity: [1, 0, 1] }}
        transition={{ duration: 1, repeat: Infinity }}
        className="inline-block w-1 h-8 md:h-12 bg-gradient-to-b from-indigo-600 to-purple-600 ml-2 rounded-sm"
        aria-hidden="true"
      />
    </span>
  );
};

// ✅ ENHANCED: Theme-aware social button with accessibility
const SocialButton = ({ Icon, href, label, color, count, index }) => {
  const { isDark } = useTheme();
  const [isHovered, setIsHovered] = useState(false);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  
  const rotateX = useTransform(mouseY, [-100, 100], [8, -8]);
  const rotateY = useTransform(mouseX, [-100, 100], [-8, 8]);

  const safeHref = href || "#";
  const isExternal = href && typeof href === "string" && href.startsWith("http");
  const isEmail = href && typeof href === "string" && href.startsWith("mailto:");

  const handleMouseMove = useCallback((e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    mouseX.set(e.clientX - centerX);
    mouseY.set(e.clientY - centerY);
  }, [mouseX, mouseY]);

  return (
    <motion.div
      className="relative group"
      onMouseMove={handleMouseMove}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      style={{ perspective: 1000 }}
    >
      <motion.a
        href={safeHref}
        target={isExternal ? "_blank" : undefined}
        rel={isExternal ? "noopener noreferrer" : undefined}
        initial={{ opacity: 0, y: 30, rotateX: -15 }}
        animate={{ opacity: 1, y: 0, rotateX: 0 }}
        transition={{ delay: 1.2 + index * 0.1, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        style={{ rotateX, rotateY }}
        whileHover={{ z: 50 }}
        whileTap={{ scale: 0.95 }}
        className={`relative block p-6 backdrop-blur-xl rounded-3xl border shadow-2xl hover:shadow-4xl transition-all duration-500 overflow-hidden focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 ${
          isDark
            ? "bg-gray-800/90 border-gray-700/60"
            : "bg-white/90 border-gray-200/60"
        }`}
        aria-label={`${label}${count ? ` - ${count}` : ""}`}
      >
        <motion.div
          className="absolute inset-0"
          animate={{
            backgroundColor: isHovered 
              ? (isDark ? "rgba(99, 102, 241, 0.08)" : "rgba(99, 102, 241, 0.12)")
              : "rgba(0, 0, 0, 0)"
          }}
          transition={{ duration: 0.4 }}
        />

        {/* Icon */}
        <motion.div
          animate={{ 
            rotate: isHovered ? [0, -8, 8, 0] : 0,
            scale: isHovered ? 1.08 : 1
          }}
          transition={{ duration: 0.5 }}
          className="relative z-10 mb-4"
        >
          <div className={`p-4 rounded-2xl bg-gradient-to-r ${color} shadow-xl`}>
            <Icon className="w-7 h-7 text-white" />
          </div>
        </motion.div>

        {/* Content */}
        <div className="relative z-10 text-center">
          <h3 className={`text-lg font-bold mb-2 ${
            isDark ? "text-white" : "text-gray-900"
          }`}>
            {label}
          </h3>
          {count && (
            <p className={`text-sm font-medium ${
              isDark ? "text-gray-400" : "text-gray-600"
            }`}>
              {count}
            </p>
          )}
        </div>

        <motion.div
          className="absolute inset-0 rounded-3xl blur-lg"
          animate={{
            backgroundColor: isHovered 
              ? (isDark ? "rgba(99, 102, 241, 0.2)" : "rgba(99, 102, 241, 0.3)")
              : "rgba(0, 0, 0, 0)",
            scale: isHovered ? 1.05 : 1
          }}
          transition={{ duration: 0.3 }}
        />
      </motion.a>
    </motion.div>
  );
};

// ✅ ENHANCED: Theme-aware status badge
const StatusBadge = () => {
  const { isDark } = useTheme();
  
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8, y: 20 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      transition={{ delay: 0.6, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
      className={`relative inline-flex items-center gap-3 px-6 py-3 rounded-full shadow-lg border ${
        isDark
          ? "bg-gradient-to-r from-green-900/20 to-emerald-900/20 border-green-800"
          : "bg-gradient-to-r from-green-50 to-emerald-50 border-green-200"
      }`}
    >
      <div className="relative">
        <motion.div
          className="w-3 h-3 bg-green-500 rounded-full"
          animate={{
            scale: [1, 1.2, 1],
            opacity: [1, 0.8, 1],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
        <motion.div
          className="absolute inset-0 w-3 h-3 rounded-full"
          style={{ backgroundColor: "rgba(34, 197, 94, 0.4)" }}
          animate={{
            scale: [1, 2.2, 1],
            opacity: [0.6, 0, 0.6],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      </div>
      <span className={`text-sm font-bold ${
        isDark ? "text-green-400" : "text-green-700"
      }`}>
        Open to opportunities
      </span>
    </motion.div>
  );
};

// ✅ MAIN: Enhanced Hero component with updated details
export default function Hero() {
  const { isDark } = useTheme();
  const heroRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"]
  });

  const y = useTransform(scrollYProgress, [0, 1], [0, 200]);
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 1], [1, 0.98]);

  // ✅ UPDATED: Memoized socials with better error handling
  const socials = useMemo(() => [
    {
      Icon: Github,
      href: site.links?.github,
      label: "GitHub",
      color: isDark ? "from-gray-600 to-gray-800" : "from-gray-700 to-gray-900",
      count: "Open Source"
    },
    {
      Icon: Linkedin,
      href: site.links?.linkedin,
      label: "LinkedIn", 
      color: "from-blue-600 to-blue-700",
      count: "Connect"
    },
    {
      Icon: Mail,
      href: `mailto:${site.links?.email || "contact@example.com"}`,
      label: "Email",
      color: "from-red-500 to-red-600",
      count: "Let's talk"
    },
  ], [isDark, site.links]);

  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.12,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 50, rotateX: -10 },
    show: {
      opacity: 1,
      y: 0,
      rotateX: 0,
      transition: {
        duration: 0.8,
        ease: [0.22, 1, 0.36, 1],
      },
    },
  };

  // ✅ UPDATED: Realistic roles for an aspiring developer
  const roles = useMemo(() => [
    "Aspiring Full-Stack Developer",
    "MERN Stack Enthusiast", 
    "Problem Solver",
    "Tech Learner",
    "Code Creator"
  ], []);

  return (
    <section
      ref={heroRef}
      id="hero"
      className={`relative min-h-screen flex items-center justify-center overflow-hidden pt-20 ${
        isDark
          ? "bg-gradient-to-br from-gray-900 via-gray-900 to-indigo-950"
          : "bg-gradient-to-br from-indigo-50 via-white to-purple-50"
      }`}
      role="banner"
      aria-labelledby="hero-heading"
    >
      {/* ✅ ENHANCED: Theme-aware background */}
      <div className="absolute inset-0">
        <motion.div 
          className="absolute inset-0"
          animate={{
            background: isDark ? [
              "radial-gradient(circle at 20% 80%, rgba(99, 102, 241, 0.06) 0%, rgba(0, 0, 0, 0) 50%)",
              "radial-gradient(circle at 80% 20%, rgba(168, 85, 247, 0.06) 0%, rgba(0, 0, 0, 0) 50%)",
              "radial-gradient(circle at 40% 40%, rgba(236, 72, 153, 0.06) 0%, rgba(0, 0, 0, 0) 50%)"
            ] : [
              "radial-gradient(circle at 20% 80%, rgba(99, 102, 241, 0.08) 0%, rgba(0, 0, 0, 0) 50%)",
              "radial-gradient(circle at 80% 20%, rgba(168, 85, 247, 0.08) 0%, rgba(0, 0, 0, 0) 50%)",
              "radial-gradient(circle at 40% 40%, rgba(236, 72, 153, 0.08) 0%, rgba(0, 0, 0, 0) 50%)"
            ]
          }}
          transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
        />
        
        <div className={`absolute inset-0 ${isDark ? "opacity-40" : "opacity-60"}`}>
          <div 
            className="absolute top-0 left-0 w-full h-full"
            style={{
              background: isDark
                ? "radial-gradient(ellipse 80% 80% at 50% -20%, rgba(120,119,198,0.1), rgba(0,0,0,0))"
                : "radial-gradient(ellipse 80% 80% at 50% -20%, rgba(120,119,198,0.15), rgba(0,0,0,0))"
            }}
          />
        </div>
      </div>

      {/* Floating elements */}
      <div className="absolute inset-0">
        {[Code, Coffee, Sparkles, Globe, Star, Zap, Heart, Award].map((Icon, i) => (
          <FloatingElement
            key={i}
            icon={Icon}
            delay={i * 0.3}
            duration={10 + i * 1.5}
            index={i}
            className={`
              ${i === 0 ? 'top-20 left-[5%]' : ''}
              ${i === 1 ? 'top-32 right-[8%]' : ''}
              ${i === 2 ? 'bottom-40 left-[12%]' : ''}
              ${i === 3 ? 'bottom-32 right-[15%]' : ''}
              ${i === 4 ? 'top-1/4 left-[20%]' : ''}
              ${i === 5 ? 'top-2/3 right-[25%]' : ''}
              ${i === 6 ? 'bottom-1/4 left-[75%]' : ''}
              ${i === 7 ? 'top-1/2 right-[5%]' : ''}
            `}
          />
        ))}
      </div>

      <ParticleSystem />

      {/* ✅ ENHANCED: Main content with updated positioning */}
      <motion.div
        style={{ y, opacity, scale }}
        variants={containerVariants}
        initial="hidden"
        animate="show"
        className="relative z-10 text-center px-6 max-w-7xl mx-auto"
      >
        {/* Status badge */}
        <motion.div variants={itemVariants} className="mb-8">
          <StatusBadge />
        </motion.div>

        {/* ✅ UPDATED: Greeting reflecting student/aspiring developer status */}
        <motion.div variants={itemVariants} className="mb-8">
          <motion.div
            whileHover={{ scale: 1.05 }}
            className={`inline-flex items-center gap-3 px-6 py-3 backdrop-blur-sm rounded-full border ${
              isDark
                ? "bg-gradient-to-r from-indigo-900/30 to-purple-900/30 border-indigo-700/60"
                : "bg-gradient-to-r from-indigo-50 to-purple-50 border-indigo-200/60"
            }`}
          >
            <motion.div
              animate={{ rotate: [0, 360] }}
              transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
            >
              <Coffee className="w-5 h-5 text-indigo-600" />
            </motion.div>
            <span className={`font-semibold ${
              isDark ? "text-indigo-300" : "text-indigo-700"
            }`}>
              Hey there! Welcome to my coding journey
            </span>
            <Sparkles className="w-4 h-4 text-purple-500" />
          </motion.div>
        </motion.div>

        {/* Main heading */}
        <motion.div variants={itemVariants} className="mb-6">
          <motion.h1 
            id="hero-heading"
            className="text-4xl md:text-6xl lg:text-7xl font-black leading-tight mb-8"
          >
            <motion.span
              className="block mb-6"
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.8, duration: 1 }}
            >
              I'm{" "}
              <span className="relative">
                <span className="bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
                  {site.name || "Dhruv Prajapati"}
                </span>
                
                <motion.div
                  className="absolute -top-4 -right-4 md:-top-6 md:-right-6"
                  animate={{ 
                    rotate: [0, 12, -8, 12],
                    scale: [1, 1.1, 0.9, 1.1]
                  }}
                  transition={{ duration: 3, repeat: Infinity }}
                >
                  <Sparkles className="w-6 h-6 md:w-8 md:h-8 text-yellow-400" />
                </motion.div>
                
                <motion.div
                  className="absolute -bottom-2 -left-2 md:-bottom-3 md:-left-3"
                  animate={{ rotate: [0, -360] }}
                  transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                >
                  <Star className="w-4 h-4 md:w-6 md:h-6 text-indigo-400" />
                </motion.div>
              </span>
            </motion.span>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.5, duration: 0.8 }}
              className="text-2xl md:text-4xl lg:text-5xl font-bold leading-tight"
            >
              <span className={isDark ? "text-gray-300" : "text-gray-700"}>An </span>
              <TypewriterText 
                texts={roles}
                className="bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent"
              />
            </motion.div>
          </motion.h1>
        </motion.div>

        {/* ✅ UPDATED: Description reflecting aspiring developer status */}
        <motion.div variants={itemVariants} className="mb-12">
          <div className={`text-lg md:text-xl max-w-4xl mx-auto leading-relaxed ${
            isDark ? "text-gray-300" : "text-gray-600"
          }`}>
            {site.summary || "Aspiring full‑stack developer with 1+ year of hands-on experience in MERN stack. Built secure, responsive applications with authentication, CRUD operations, and modern deployments through personal projects and internship experience."} I'm passionate about creating{" "}
            <motion.span
              className={`relative font-bold ${
                isDark ? "text-indigo-400" : "text-indigo-600"
              }`}
              whileHover={{ scale: 1.05 }}
            >
              innovative and user-friendly
              <motion.div
                className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-indigo-600 to-purple-600"
                initial={{ scaleX: 0 }}
                whileInView={{ scaleX: 1 }}
                transition={{ delay: 2, duration: 0.8 }}
              />
            </motion.span>
            {" "}web solutions that solve real-world problems.
          </div>
        </motion.div>

        {/* ✅ UPDATED: Stats section with corrected values */}
        <motion.div variants={itemVariants} className="mb-12">
          <div className="grid grid-cols-3 gap-4 md:gap-8 max-w-2xl mx-auto">
            {[
              { 
                icon: Code, 
                label: "Projects", 
                value: `${site.stats?.projectsCompleted || "4"}`, 
                color: "text-blue-500",
                bgColor: isDark ? "bg-blue-900/30" : "bg-blue-50"
              },
              { 
                icon: Calendar, 
                label: "Learning", 
                value: `${site.stats?.yearsExperience || "1"}+ Year`, 
                color: "text-green-500",
                bgColor: isDark ? "bg-green-900/30" : "bg-green-50"
              },
              { 
                icon: Award, 
                label: "Technologies", 
                value: `${site.stats?.technologiesUsed || "20"}+`, 
                color: "text-purple-500",
                bgColor: isDark ? "bg-purple-900/30" : "bg-purple-50"
              }
            ].map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 30, scale: 0.8 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ delay: 1.8 + index * 0.15, duration: 0.6 }}
                whileHover={{ scale: 1.05, y: -4 }}
                className={`text-center p-4 md:p-6 backdrop-blur-xl rounded-2xl md:rounded-3xl border shadow-xl hover:shadow-2xl transition-all duration-300 ${
                  isDark
                    ? "bg-gray-800/70 border-gray-700/60"
                    : "bg-white/70 border-gray-200/60"
                }`}
              >
                <motion.div
                  className={`inline-flex items-center justify-center w-12 h-12 md:w-16 md:h-16 rounded-xl md:rounded-2xl ${stat.bgColor} ${stat.color} mb-3 md:mb-4 shadow-lg`}
                  whileHover={{ rotate: [0, -5, 5, 0] }}
                  transition={{ duration: 0.5 }}
                >
                  <stat.icon className="w-6 h-6 md:w-8 md:h-8" />
                </motion.div>
                <div className={`text-xl md:text-3xl font-black mb-1 md:mb-2 ${
                  isDark ? "text-white" : "text-gray-900"
                }`}>
                  {stat.value}
                </div>
                <div className={`text-xs md:text-sm font-semibold uppercase tracking-wider ${
                  isDark ? "text-gray-400" : "text-gray-600"
                }`}>
                  {stat.label}
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* CTA buttons */}
        <motion.div variants={itemVariants} className="mb-16">
          <div className="flex flex-col sm:flex-row gap-4 md:gap-6 justify-center items-center">
            <motion.a
              href="#projects"
              whileHover={{ 
                scale: 1.05, 
                y: -3,
                transition: { duration: 0.2 }
              }}
              whileTap={{ scale: 0.95 }}
              className="group relative px-8 md:px-10 py-4 md:py-5 bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 text-white font-bold text-base md:text-lg rounded-2xl shadow-2xl overflow-hidden focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
            >
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-purple-600 to-pink-600"
                initial={{ x: "-100%" }}
                whileHover={{ x: 0 }}
                transition={{ duration: 0.4 }}
              />
              <span className="relative flex items-center gap-3">
                <Rocket className="w-5 h-5 md:w-6 md:h-6" />
                <span>Explore My Projects</span>
                <motion.div
                  animate={{ x: [0, 4, 0] }}
                  transition={{ duration: 1.5, repeat: Infinity }}
                >
                  <ArrowDown className="w-4 h-4 md:w-5 md:h-5 rotate-[-90deg]" />
                </motion.div>
              </span>
            </motion.a>

            <motion.a
              href={site.links?.resume || "/resume.pdf"}
              download
              whileHover={{ scale: 1.05, y: -3 }}
              whileTap={{ scale: 0.95 }}
              className={`group flex items-center gap-3 px-8 md:px-10 py-4 md:py-5 backdrop-blur-xl font-bold text-base md:text-lg rounded-2xl shadow-xl border hover:shadow-2xl transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 ${
                isDark
                  ? "bg-gray-800/90 text-white border-gray-700"
                  : "bg-white/90 text-gray-900 border-gray-200"
              }`}
            >
              <Download className="w-5 h-5 md:w-6 md:h-6 group-hover:animate-bounce" />
              <span>Download Resume</span>
            </motion.a>
          </div>
        </motion.div>

        {/* Social links */}
        <motion.div variants={itemVariants} className="mb-20">
          <div className="grid grid-cols-3 gap-4 md:gap-6 max-w-2xl mx-auto">
            {socials.map((social, index) => (
              <SocialButton
                key={social.href || index}
                Icon={social.Icon}
                href={social.href}
                label={social.label}
                color={social.color}
                count={social.count}
                index={index}
              />
            ))}
          </div>
        </motion.div>

        {/* Scroll indicator */}
        <motion.div variants={itemVariants}>
          <div className="flex flex-col items-center gap-4">
            <span className={`text-sm font-semibold uppercase tracking-wider ${
              isDark ? "text-gray-400" : "text-gray-500"
            }`}>
              Discover My Journey
            </span>
            <motion.a
              href="#about"
              animate={{ y: [0, 10, 0] }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
              whileHover={{ scale: 1.15, rotate: 3 }}
              className={`group p-4 backdrop-blur-xl rounded-full border shadow-xl hover:shadow-2xl transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 ${
                isDark
                  ? "bg-gray-800/80 border-gray-700/60"
                  : "bg-white/80 border-gray-200/60"
              }`}
              aria-label="Scroll to about section"
            >
              <ChevronDown className={`w-6 h-6 md:w-8 md:h-8 transition-colors duration-300 ${
                isDark
                  ? "text-gray-400 group-hover:text-indigo-400"
                  : "text-gray-600 group-hover:text-indigo-600"
              }`} />
            </motion.a>
          </div>
        </motion.div>
      </motion.div>

      {/* Decorative code symbols */}
      <motion.div
        className={`absolute top-1/4 left-[5%] text-6xl md:text-8xl font-mono pointer-events-none select-none ${
          isDark ? "text-indigo-900/20" : "text-indigo-200/20"
        }`}
        animate={{
          rotate: [0, 8, -4, 0],
          y: [0, -15, 0],
          scale: [1, 1.05, 1]
        }}
        transition={{ duration: 6, repeat: Infinity }}
        aria-hidden="true"
      >
        {"</>"}
      </motion.div>

      <motion.div
        className={`absolute top-1/3 right-[8%] text-4xl md:text-6xl font-mono pointer-events-none select-none ${
          isDark ? "text-purple-900/20" : "text-purple-200/20"
        }`}
        animate={{
          rotate: [0, -6, 10, 0],
          y: [0, 12, 0],
          scale: [1, 0.95, 1]
        }}
        transition={{ duration: 7, repeat: Infinity, delay: 1 }}
        aria-hidden="true"
      >
        {"{}"}
      </motion.div>

      <motion.div
        className={`absolute bottom-1/4 left-[10%] text-3xl md:text-5xl font-mono pointer-events-none select-none ${
          isDark ? "text-pink-900/20" : "text-pink-200/20"
        }`}
        animate={{
          rotate: [0, 12, -8, 0],
          x: [0, 8, 0],
          scale: [1, 1.15, 1]
        }}
        transition={{ duration: 8, repeat: Infinity, delay: 2 }}
        aria-hidden="true"
      >
        {"()"}
      </motion.div>

      {/* Bottom gradient */}
      <div className={`absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t pointer-events-none ${
        isDark ? "from-gray-900" : "from-white"
      } to-transparent`} />
    </section>
  );
}
