import { motion, useSpring, useTransform, useMotionValue } from "framer-motion";
import {
  Github,
  ExternalLink,
  ArrowUpRight,
  Sparkles,
  Eye,
  Star,
  Calendar,
  Layers,
  Zap,
  Award,
  Play,
  Heart,
  Share,
  Bookmark,
  Code,
  Palette,
  Globe,
  Users,
  Clock,
} from "lucide-react";
import { useState, useRef } from "react";
import { useTheme } from "../contexts/ThemeContext"; // ✅ Import theme context

// ✅ ENHANCED: Professional ProjectCard with theme integration
export default function ProjectCard({
  name = "Untitled Project",
  description = "No description available",
  tech = [],
  links = {},
  image,
  category = "Web Development",
  date = "2024",
  status = "Completed",
  features = [],
  role = "Full Stack Developer",
  featured = false,
  demoAvailable = true, // ✅ NEW: Flag to control demo availability
  onDemoUnavailable, // ✅ NEW: Callback when demo is not available
  index = 0,
}) {
  const { isDark } = useTheme(); // ✅ Use theme context
  const [isHovered, setIsHovered] = useState(false);
  const [isLiked, setIsLiked] = useState(false);
  const [isBookmarked, setIsBookmarked] = useState(false);

  const cardRef = useRef(null);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  // ✅ REFINED: Subtle 3D tilt for professional look
  const rotateX = useTransform(mouseY, [-200, 200], [5, -5]);
  const rotateY = useTransform(mouseX, [-200, 200], [-5, 5]);

  // ✅ PROFESSIONAL: Smooth spring animations
  const springConfig = { stiffness: 200, damping: 25 };
  const x = useSpring(0, springConfig);
  const y = useSpring(0, springConfig);

  const techArray = Array.isArray(tech) ? tech : [];
  const featuresList = Array.isArray(features) ? features : [];

  const handleMouseMove = (e) => {
    if (!cardRef.current) return;

    const rect = cardRef.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;

    mouseX.set(e.clientX - centerX);
    mouseY.set(e.clientY - centerY);

    x.set((e.clientX - centerX) * 0.05);
    y.set((e.clientY - centerY) * 0.05);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    mouseX.set(0);
    mouseY.set(0);
    x.set(0);
    y.set(0);
  };

  // ✅ ENHANCED: Handle demo click with availability check
  const handleDemoClick = (e) => {
    if (!demoAvailable) {
      e.preventDefault();
      onDemoUnavailable && onDemoUnavailable(name);
    }
  };

  // ✅ ENHANCED: Theme-aware status configuration
  const statusConfig = {
    Completed: {
      color: isDark
        ? "bg-emerald-900/20 text-emerald-400 border-emerald-800"
        : "bg-emerald-100 text-emerald-700 border-emerald-200",
      dot: "bg-emerald-500",
    },
    "In Progress": {
      color: isDark
        ? "bg-amber-900/20 text-amber-400 border-amber-800"
        : "bg-amber-100 text-amber-700 border-amber-200",
      dot: "bg-amber-500",
    },
    Planning: {
      color: isDark
        ? "bg-blue-900/20 text-blue-400 border-blue-800"
        : "bg-blue-100 text-blue-700 border-blue-200",
      dot: "bg-blue-500",
    },
  };

  const currentStatus = statusConfig[status] || statusConfig["Completed"];

  return (
    <motion.div
      ref={cardRef}
      initial={{ opacity: 0, y: 50, scale: 0.95 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{
        duration: 0.6,
        delay: index * 0.1,
        ease: [0.22, 1, 0.36, 1],
      }}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={handleMouseLeave}
      style={{
        rotateX,
        rotateY,
        transformStyle: "preserve-3d",
      }}
      className="group relative w-full max-w-sm mx-auto perspective-1000"
    >
      {/* ✅ ENHANCED: Theme-aware main card container */}
      <motion.article
        animate={{
          y: isHovered ? -8 : 0,
          scale: isHovered ? 1.02 : 1,
        }}
        transition={{ duration: 0.4, ease: "easeOut" }}
        className={`relative backdrop-blur-xl rounded-3xl border shadow-xl overflow-hidden hover:shadow-2xl transition-all duration-500 ${
          isDark
            ? "bg-gray-900/95 border-gray-700/60 shadow-black/25 hover:shadow-indigo-500/20"
            : "bg-white/95 border-gray-200/60 shadow-black/5 hover:shadow-indigo-500/10"
        }`}
        role="article"
        aria-labelledby={`project-${index}-title`}
      >
        {/* ✅ ENHANCED: Theme-aware background gradient */}
        <motion.div
          className="absolute inset-0"
          animate={{
            backgroundColor: isHovered
              ? isDark
                ? "rgba(99, 102, 241, 0.02)"
                : "rgba(99, 102, 241, 0.03)"
              : "rgba(0, 0, 0, 0)",
          }}
          transition={{ duration: 0.5 }}
        />

        {/* ✅ ENHANCED: Header section with theme integration */}
        <div className="relative p-6 pb-4">
          <div className="flex items-start justify-between mb-4">
            {/* Project category and featured badge */}
            <div className="flex items-center gap-2">
              <motion.span
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.2 }}
                className={`px-3 py-1.5 text-xs font-semibold rounded-full border ${
                  isDark
                    ? "bg-gradient-to-r from-indigo-900/30 to-purple-900/30 text-indigo-300 border-indigo-700/50"
                    : "bg-gradient-to-r from-indigo-50 to-purple-50 text-indigo-700 border-indigo-200/50"
                }`}
              >
                {category}
              </motion.span>

              {featured && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.3 }}
                  className="flex items-center gap-1 px-2 py-1 bg-gradient-to-r from-amber-400 to-orange-500 text-white text-xs font-bold rounded-lg shadow-lg"
                >
                  <Award className="w-3 h-3" />
                  <span>Featured</span>
                </motion.div>
              )}
            </div>

            {/* Status and bookmark */}
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-2">
                <motion.div
                  animate={{
                    scale: [1, 1.1, 1],
                    opacity: [1, 0.7, 1],
                  }}
                  transition={{ duration: 2, repeat: Infinity }}
                  className={`w-2.5 h-2.5 rounded-full ${currentStatus.dot}`}
                />
              </div>

              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={() => setIsBookmarked(!isBookmarked)}
                className={`p-2 backdrop-blur-sm rounded-xl shadow-md hover:shadow-lg transition-all duration-200 border focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 ${
                  isDark
                    ? "bg-gray-800/80 border-gray-700/60"
                    : "bg-white/80 border-gray-200/60"
                }`}
                aria-label={isBookmarked ? "Remove bookmark" : "Add bookmark"}
              >
                <Bookmark
                  className={`w-4 h-4 ${
                    isBookmarked
                      ? "fill-indigo-600 text-indigo-600"
                      : isDark
                      ? "text-gray-400"
                      : "text-gray-500"
                  }`}
                />
              </motion.button>
            </div>
          </div>

          {/* ✅ ENHANCED: Project title and description with theme */}
          <div className="space-y-3">
            <motion.h3
              id={`project-${index}-title`}
              className={`text-xl font-bold leading-tight ${
                isDark ? "text-white" : "text-gray-900"
              }`}
              animate={{
                backgroundImage: isHovered
                  ? "linear-gradient(135deg, rgb(99, 102, 241), rgb(139, 92, 246))"
                  : "none",
                backgroundClip: isHovered ? "text" : "unset",
                WebkitBackgroundClip: isHovered ? "text" : "unset",
                color: isHovered ? "transparent" : undefined,
              }}
              transition={{ duration: 0.3 }}
            >
              {name}
            </motion.h3>

            <p
              className={`leading-relaxed text-sm line-clamp-3 ${
                isDark ? "text-gray-300" : "text-gray-600"
              }`}
            >
              {description}
            </p>
          </div>

          {/* ✅ ENHANCED: Project metadata with theme */}
          <div
            className={`flex items-center justify-between mt-4 text-sm ${
              isDark ? "text-gray-400" : "text-gray-500"
            }`}
          >
            <div className="flex items-center gap-4">
              <span className="flex items-center gap-1.5">
                <Calendar className="w-4 h-4" />
                {date}
              </span>
              <span className="flex items-center gap-1.5">
                <Users className="w-4 h-4" />
                {role}
              </span>
            </div>

            <motion.span
              whileHover={{ scale: 1.05 }}
              className={`px-3 py-1.5 rounded-full text-xs font-semibold border ${currentStatus.color}`}
            >
              {status}
            </motion.span>
          </div>
        </div>

        {/* ✅ ENHANCED: Project image section with theme */}
        <div
          className={`relative mx-6 mb-6 h-48 overflow-hidden rounded-2xl border ${
            isDark ? "border-gray-700/60" : "border-gray-200/60"
          }`}
        >
          <motion.div
            style={{ x, y }}
            animate={{
              scale: isHovered ? 1.05 : 1,
              filter: isHovered ? "brightness(1.05)" : "brightness(1)",
            }}
            transition={{ duration: 0.6 }}
            className="relative w-full h-full"
          >
            {image ? (
              <img
                src={image}
                alt={`${name} project screenshot`}
                className="w-full h-full object-cover"
                loading="lazy"
              />
            ) : (
              <div
                className={`w-full h-full flex items-center justify-center ${
                  isDark
                    ? "bg-gradient-to-br from-indigo-900/20 via-purple-900/20 to-pink-900/20"
                    : "bg-gradient-to-br from-indigo-100 via-purple-100 to-pink-100"
                }`}
              >
                <Code className="w-16 h-16 text-indigo-400 opacity-40" />
              </div>
            )}

            {/* Subtle overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent" />
          </motion.div>

          {/* ✅ ENHANCED: Hover play button with theme */}
          <motion.div
            className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300"
            initial={{ scale: 0 }}
            animate={{ scale: isHovered ? 1 : 0 }}
            transition={{ delay: 0.1 }}
          >
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              className={`p-3 backdrop-blur-sm rounded-full border text-indigo-600 transition-colors duration-200 shadow-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 ${
                isDark
                  ? "bg-gray-900/90 border-white/30 hover:bg-gray-900"
                  : "bg-white/90 border-white/30 hover:bg-white"
              }`}
              aria-label="Preview project"
            >
              <Play className="w-6 h-6 ml-0.5" fill="currentColor" />
            </motion.button>
          </motion.div>
        </div>

        {/* ✅ ENHANCED: Tech stack section with theme */}
        <div className="px-6 mb-6">
          <div className="space-y-3">
            <h4
              className={`text-sm font-semibold flex items-center gap-2 ${
                isDark ? "text-white" : "text-gray-900"
              }`}
            >
              <Palette className="w-4 h-4 text-indigo-500" />
              Technologies
            </h4>
            <div className="flex flex-wrap gap-2">
              {techArray.slice(0, 5).map((tech, i) => (
                <motion.span
                  key={i}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.3 + i * 0.05 }}
                  whileHover={{ scale: 1.05, y: -1 }}
                  className={`px-3 py-1.5 text-xs font-medium rounded-lg transition-all duration-200 cursor-default border ${
                    isDark
                      ? "bg-gray-800 text-gray-300 border-gray-600 hover:bg-indigo-900/30 hover:text-indigo-300"
                      : "bg-gray-100 text-gray-700 border-gray-200 hover:bg-indigo-100 hover:text-indigo-700"
                  }`}
                >
                  {tech}
                </motion.span>
              ))}
              {techArray.length > 5 && (
                <span
                  className={`px-3 py-1.5 text-xs font-medium rounded-lg border ${
                    isDark
                      ? "bg-gray-800 text-gray-400 border-gray-600"
                      : "bg-gray-100 text-gray-500 border-gray-200"
                  }`}
                >
                  +{techArray.length - 5}
                </span>
              )}
            </div>
          </div>
        </div>

        {/* ✅ ENHANCED: Key features with theme */}
        {featuresList.length > 0 && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{
              opacity: isHovered ? 1 : 0,
              height: isHovered ? "auto" : 0,
            }}
            transition={{ duration: 0.3 }}
            className="px-6 mb-6 overflow-hidden"
          >
            <div className="space-y-3">
              <h4
                className={`text-sm font-semibold flex items-center gap-2 ${
                  isDark ? "text-white" : "text-gray-900"
                }`}
              >
                <Sparkles className="w-4 h-4 text-purple-500" />
                Key Features
              </h4>
              <div className="space-y-2">
                {featuresList.slice(0, 3).map((feature, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.1 }}
                    className={`flex items-center gap-2 text-sm ${
                      isDark ? "text-gray-300" : "text-gray-600"
                    }`}
                  >
                    <Zap className="w-3 h-3 text-indigo-500 flex-shrink-0" />
                    <span>{feature}</span>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>
        )}

        {/* ✅ ENHANCED: Action buttons with demo availability logic */}
        <div className="px-6 pb-6">
          <div className="flex gap-3 mb-4">
          
            {(links?.demo || !demoAvailable) && (
              <motion.button
                onClick={(e) => {
                  if (!demoAvailable) {
                    e.preventDefault();
                    onDemoUnavailable && onDemoUnavailable(name);
                  } else {
                    // For available demos, open in new tab
                    window.open(links.demo, "_blank");
                  }
                }}
                whileHover={{ scale: 1.02, y: -1 }}
                whileTap={{ scale: 0.98 }}
                className={`flex-1 group/btn relative flex items-center justify-center gap-2 px-4 py-3 font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 ${
                  demoAvailable
                    ? "bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 text-white"
                    : "bg-gradient-to-r from-amber-600 to-orange-600 text-white"
                }`}
              >
                {/* Enhanced hover animation */}
                <motion.div
                  className={`absolute inset-0 ${
                    demoAvailable
                      ? "bg-gradient-to-r from-purple-600 to-pink-600"
                      : "bg-gradient-to-r from-orange-600 to-red-600"
                  }`}
                  initial={{ x: "-100%" }}
                  whileHover={{ x: 0 }}
                  transition={{ duration: 0.3 }}
                />

                <Globe className="w-4 h-4 relative z-10" />
                <span className="relative z-10">
                  {demoAvailable ? "Live Demo" : "Coming Soon"}
                </span>
                <ArrowUpRight className="w-4 h-4 relative z-10 group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5 transition-transform duration-200" />
              </motion.button>
            )}
            {/* ✅ ENHANCED: Code button with theme */}
            {links?.code && (
              <motion.a
                href={links.code}
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.02, y: -1 }}
                whileTap={{ scale: 0.98 }}
                className={`flex items-center justify-center gap-2 px-4 py-3 border-2 font-semibold rounded-xl transition-all duration-300 group/btn focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 ${
                  isDark
                    ? "border-gray-600 text-gray-300 hover:border-indigo-500 hover:text-indigo-400 hover:bg-indigo-950/30"
                    : "border-gray-300 text-gray-700 hover:border-indigo-500 hover:text-indigo-600 hover:bg-indigo-50"
                }`}
              >
                <Github className="w-4 h-4" />
                <span className="hidden sm:inline">Code</span>
                <ArrowUpRight className="w-4 h-4 group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5 transition-transform duration-200" />
              </motion.a>
            )}
          </div>

          {/* ✅ ENHANCED: Social actions with theme */}
          <div
            className={`flex items-center justify-between pt-4 border-t ${
              isDark ? "border-gray-700" : "border-gray-200"
            }`}
          >
            <div className="flex items-center gap-4">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setIsLiked(!isLiked)}
                className={`flex items-center gap-2 text-sm hover:text-red-500 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 rounded-lg p-1 ${
                  isDark ? "text-gray-400" : "text-gray-600"
                }`}
                aria-label={isLiked ? "Unlike project" : "Like project"}
              >
                <motion.div
                  animate={{ scale: isLiked ? [1, 1.3, 1] : 1 }}
                  transition={{ duration: 0.3 }}
                >
                  <Heart
                    className={`w-4 h-4 ${
                      isLiked ? "fill-red-500 text-red-500" : ""
                    }`}
                  />
                </motion.div>
                <span>
                  {Math.floor(Math.random() * 50) + 10 + (isLiked ? 1 : 0)}
                </span>
              </motion.button>

              <div
                className={`flex items-center gap-2 text-sm ${
                  isDark ? "text-gray-400" : "text-gray-600"
                }`}
              >
                <Eye className="w-4 h-4" />
                <span>{Math.floor(Math.random() * 500) + 100}</span>
              </div>

              <div className="flex items-center gap-1">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className="w-3 h-3 text-amber-400 fill-current"
                  />
                ))}
              </div>
            </div>

            <motion.button
              whileHover={{ scale: 1.1, rotate: 5 }}
              whileTap={{ scale: 0.9 }}
              className={`p-2 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors duration-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 ${
                isDark ? "text-gray-400" : "text-gray-600"
              }`}
              aria-label="Share project"
            >
              <Share className="w-4 h-4" />
            </motion.button>
          </div>
        </div>

        {/* ✅ ENHANCED: Theme-aware border effect */}
        <motion.div
          className="absolute inset-0 rounded-3xl pointer-events-none"
          animate={{
            boxShadow: isHovered
              ? isDark
                ? "inset 0 0 0 1px rgba(99, 102, 241, 0.15)"
                : "inset 0 0 0 1px rgba(99, 102, 241, 0.2)"
              : "inset 0 0 0 1px rgba(0, 0, 0, 0)",
          }}
          transition={{ duration: 0.4 }}
        />
      </motion.article>

      {/* ✅ ENHANCED: Theme-aware floating shadow */}
      <motion.div
        animate={{
          opacity: isHovered ? (isDark ? 0.3 : 0.4) : isDark ? 0.1 : 0.2,
          scale: isHovered ? 1.05 : 1,
          y: isHovered ? 6 : 3,
        }}
        transition={{ duration: 0.4 }}
        className="absolute inset-0 bg-gradient-to-br from-indigo-500/10 to-purple-500/10 rounded-3xl blur-2xl -z-10"
      />
    </motion.div>
  );
}
