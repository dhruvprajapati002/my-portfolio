import { motion, useSpring, useTransform, useMotionValue } from "framer-motion";
import {
  Github,
  ExternalLink,
  ArrowUpRight,
  Eye,
  Calendar,
  Layers,
  Play,
  Code,
  Globe,
  Sparkles,
  ChevronRight,
} from "lucide-react";
import { useState, useRef } from "react";
import { useTheme } from "../contexts/ThemeContext";

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
  featured = false,
  demoAvailable = true,
  onDemoUnavailable,
  index = 0,
}) {
  const { isDark } = useTheme();
  const [isHovered, setIsHovered] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);

  const cardRef = useRef(null);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  // Subtle 3D tilt effect
  const rotateX = useTransform(mouseY, [-150, 150], [4, -4]);
  const rotateY = useTransform(mouseX, [-150, 150], [-4, 4]);

  const springConfig = { stiffness: 300, damping: 30 };
  const smoothRotateX = useSpring(rotateX, springConfig);
  const smoothRotateY = useSpring(rotateY, springConfig);

  const techArray = Array.isArray(tech) ? tech : [];
  const featuresList = Array.isArray(features) ? features : [];

  const handleMouseMove = (e) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    mouseX.set(e.clientX - centerX);
    mouseY.set(e.clientY - centerY);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    mouseX.set(0);
    mouseY.set(0);
  };

  const handleDemoClick = (e) => {
    if (!demoAvailable) {
      e.preventDefault();
      onDemoUnavailable && onDemoUnavailable(name);
    } else if (links?.demo) {
      window.open(links.demo, "_blank");
    }
  };

  // Status configuration
  const statusConfig = {
    Completed: {
      bg: "from-emerald-500 to-teal-600",
      text: "text-emerald-400",
      glow: "shadow-emerald-500/20",
    },
    "In Progress": {
      bg: "from-amber-500 to-orange-600",
      text: "text-amber-400",
      glow: "shadow-amber-500/20",
    },
    Planning: {
      bg: "from-blue-500 to-indigo-600",
      text: "text-blue-400",
      glow: "shadow-blue-500/20",
    },
  };

  const currentStatus = statusConfig[status] || statusConfig["Completed"];

  // Category icons
  const getCategoryIcon = () => {
    switch (category?.toLowerCase()) {
      case "web development":
        return Globe;
      case "mobile app":
        return Layers;
      default:
        return Code;
    }
  };

  const CategoryIcon = getCategoryIcon();

  return (
    <motion.div
      ref={cardRef}
      initial={{ opacity: 0, y: 60 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{
        duration: 0.7,
        delay: index * 0.1,
        ease: [0.22, 1, 0.36, 1],
      }}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={handleMouseLeave}
      style={{
        rotateX: smoothRotateX,
        rotateY: smoothRotateY,
        transformStyle: "preserve-3d",
        perspective: "1000px",
      }}
      className="group relative w-full"
    >
      {/* Main Card */}
      <motion.article
        animate={{
          y: isHovered ? -12 : 0,
        }}
        transition={{ duration: 0.4, ease: "easeOut" }}
        className="relative overflow-hidden"
        style={{
          borderRadius: "28px",
          background: isDark
            ? "linear-gradient(145deg, rgba(30, 30, 50, 0.9) 0%, rgba(20, 20, 35, 0.95) 100%)"
            : "linear-gradient(145deg, rgba(255, 255, 255, 0.95) 0%, rgba(248, 250, 252, 0.98) 100%)",
          border: isDark
            ? "1px solid rgba(99, 102, 241, 0.15)"
            : "1px solid rgba(99, 102, 241, 0.1)",
          boxShadow: isHovered
            ? isDark
              ? "0 30px 60px -15px rgba(0, 0, 0, 0.5), 0 0 40px rgba(99, 102, 241, 0.15)"
              : "0 30px 60px -15px rgba(0, 0, 0, 0.15), 0 0 40px rgba(99, 102, 241, 0.1)"
            : isDark
            ? "0 15px 40px -10px rgba(0, 0, 0, 0.4)"
            : "0 15px 40px -10px rgba(0, 0, 0, 0.08)",
        }}
      >
        {/* Animated gradient border on hover */}
        <motion.div
          className="absolute inset-0 rounded-[28px] pointer-events-none"
          style={{
            background:
              "linear-gradient(135deg, rgba(99, 102, 241, 0.4) 0%, rgba(139, 92, 246, 0.4) 50%, rgba(236, 72, 153, 0.4) 100%)",
            padding: "1px",
            WebkitMask:
              "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
            WebkitMaskComposite: "xor",
            maskComposite: "exclude",
          }}
          animate={{
            opacity: isHovered ? 1 : 0,
          }}
          transition={{ duration: 0.3 }}
        />

        {/* Image Section */}
        <div className="relative h-52 sm:h-56 overflow-hidden">
          {/* Background gradient for image placeholder */}
          <div
            className="absolute inset-0"
            style={{
              background: isDark
                ? "linear-gradient(135deg, #1a1a2e 0%, #16213e 50%, #0f0f23 100%)"
                : "linear-gradient(135deg, #e0e7ff 0%, #c7d2fe 50%, #a5b4fc 100%)",
            }}
          />

          {/* Project image */}
          {image ? (
            <motion.img
              src={image}
              alt={`${name} preview`}
              className="absolute inset-0 w-full h-full object-cover"
              style={{
                opacity: imageLoaded ? 1 : 0,
              }}
              animate={{
                scale: isHovered ? 1.08 : 1,
              }}
              transition={{ duration: 0.6, ease: "easeOut" }}
              onLoad={() => setImageLoaded(true)}
              loading="lazy"
            />
          ) : (
            <div className="absolute inset-0 flex items-center justify-center">
              <motion.div
                animate={{
                  rotate: isHovered ? 360 : 0,
                  scale: isHovered ? 1.1 : 1,
                }}
                transition={{ duration: 0.8 }}
              >
                <Code
                  className={`w-20 h-20 ${
                    isDark ? "text-indigo-400/30" : "text-indigo-300/50"
                  }`}
                />
              </motion.div>
            </div>
          )}

          {/* Overlay gradient */}
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              background: isDark
                ? "linear-gradient(180deg, transparent 0%, transparent 50%, rgba(15, 15, 35, 0.95) 100%)"
                : "linear-gradient(180deg, transparent 0%, transparent 50%, rgba(255, 255, 255, 0.95) 100%)",
            }}
          />

          {/* Top badges */}
          <div className="absolute top-4 left-4 right-4 flex items-center justify-between z-10">
            {/* Category badge */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
              className="flex items-center gap-2 px-3 py-1.5 rounded-full backdrop-blur-xl"
              style={{
                background: isDark
                  ? "rgba(99, 102, 241, 0.2)"
                  : "rgba(99, 102, 241, 0.15)",
                border: "1px solid rgba(99, 102, 241, 0.3)",
              }}
            >
              <CategoryIcon className="w-3.5 h-3.5 text-indigo-400" />
              <span className="text-xs font-semibold text-indigo-300">
                {category}
              </span>
            </motion.div>

            {/* Status badge */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 }}
              className={`px-3 py-1.5 rounded-full bg-gradient-to-r ${currentStatus.bg} shadow-lg ${currentStatus.glow}`}
            >
              <span className="text-xs font-bold text-white">{status}</span>
            </motion.div>
          </div>

          {/* Featured badge */}
          {featured && (
            <motion.div
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.4, type: "spring" }}
              className="absolute top-4 left-1/2 -translate-x-1/2 z-10"
            >
              <div
                className="flex items-center gap-1.5 px-4 py-1.5 rounded-full"
                style={{
                  background:
                    "linear-gradient(135deg, #fbbf24 0%, #f59e0b 50%, #d97706 100%)",
                  boxShadow: "0 4px 20px rgba(251, 191, 36, 0.4)",
                }}
              >
                <Sparkles className="w-3.5 h-3.5 text-white" />
                <span className="text-xs font-bold text-white tracking-wide">
                  FEATURED
                </span>
              </div>
            </motion.div>
          )}

          {/* Play button overlay on hover */}
          <motion.div
            className="absolute inset-0 flex items-center justify-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: isHovered ? 1 : 0 }}
            transition={{ duration: 0.3 }}
          >
            <motion.button
              onClick={handleDemoClick}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              className="p-4 rounded-full backdrop-blur-xl"
              style={{
                background: "rgba(99, 102, 241, 0.9)",
                boxShadow: "0 8px 32px rgba(99, 102, 241, 0.4)",
              }}
              initial={{ scale: 0 }}
              animate={{ scale: isHovered ? 1 : 0 }}
              transition={{ duration: 0.3, delay: 0.1 }}
            >
              <Play className="w-6 h-6 text-white ml-0.5" fill="white" />
            </motion.button>
          </motion.div>
        </div>

        {/* Content Section */}
        <div className="relative p-5 sm:p-6">
          {/* Title and date */}
          <div className="mb-3">
            <div className="flex items-start justify-between gap-3 mb-2">
              <motion.h3
                className="text-xl sm:text-2xl font-bold leading-tight"
                style={{
                  color: isDark ? "#ffffff" : "#1e293b",
                }}
                animate={{
                  color: isHovered
                    ? isDark
                      ? "#a5b4fc"
                      : "#6366f1"
                    : isDark
                    ? "#ffffff"
                    : "#1e293b",
                }}
                transition={{ duration: 0.3 }}
              >
                {name}
              </motion.h3>
              <div
                className={`flex items-center gap-1.5 text-xs whitespace-nowrap ${
                  isDark ? "text-gray-400" : "text-gray-500"
                }`}
              >
                <Calendar className="w-3.5 h-3.5" />
                <span>{date}</span>
              </div>
            </div>

            {/* Description */}
            <p
              className={`text-sm leading-relaxed line-clamp-2 ${
                isDark ? "text-gray-400" : "text-gray-600"
              }`}
            >
              {description}
            </p>
          </div>

          {/* Tech stack */}
          <div className="mb-5">
            <div className="flex flex-wrap gap-2">
              {techArray.slice(0, 4).map((t, i) => (
                <motion.span
                  key={i}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.1 + i * 0.05 }}
                  whileHover={{ scale: 1.05, y: -2 }}
                  className="px-3 py-1.5 text-xs font-medium rounded-lg cursor-default transition-all duration-200"
                  style={{
                    background: isDark
                      ? "linear-gradient(135deg, rgba(99, 102, 241, 0.15) 0%, rgba(139, 92, 246, 0.15) 100%)"
                      : "linear-gradient(135deg, rgba(99, 102, 241, 0.1) 0%, rgba(139, 92, 246, 0.1) 100%)",
                    border: isDark
                      ? "1px solid rgba(99, 102, 241, 0.25)"
                      : "1px solid rgba(99, 102, 241, 0.2)",
                    color: isDark ? "#a5b4fc" : "#6366f1",
                  }}
                >
                  {t}
                </motion.span>
              ))}
              {techArray.length > 4 && (
                <span
                  className={`px-3 py-1.5 text-xs font-medium rounded-lg ${
                    isDark
                      ? "bg-gray-800 text-gray-400"
                      : "bg-gray-100 text-gray-500"
                  }`}
                >
                  +{techArray.length - 4}
                </span>
              )}
            </div>
          </div>

          {/* Features on hover */}
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{
              height: isHovered && featuresList.length > 0 ? "auto" : 0,
              opacity: isHovered && featuresList.length > 0 ? 1 : 0,
            }}
            transition={{ duration: 0.3 }}
            className="overflow-hidden mb-4"
          >
            <div className="space-y-2 pb-4">
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
                  <ChevronRight className="w-4 h-4 text-indigo-500 flex-shrink-0" />
                  <span>{feature}</span>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Action buttons */}
          <div className="flex gap-3">
            {/* Live Demo / Coming Soon button */}
            {(links?.demo || !demoAvailable) && (
              <motion.button
                onClick={handleDemoClick}
                whileHover={{ scale: 1.02, y: -2 }}
                whileTap={{ scale: 0.98 }}
                className="flex-1 relative group/btn flex items-center justify-center gap-2 px-5 py-3 text-sm font-semibold text-white rounded-xl overflow-hidden transition-all duration-300"
                style={{
                  background: demoAvailable
                    ? "linear-gradient(135deg, #6366f1 0%, #8b5cf6 50%, #a855f7 100%)"
                    : "linear-gradient(135deg, #f59e0b 0%, #d97706 100%)",
                  boxShadow: demoAvailable
                    ? "0 8px 24px rgba(99, 102, 241, 0.35)"
                    : "0 8px 24px rgba(245, 158, 11, 0.35)",
                }}
              >
                {/* Shine effect */}
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
                  initial={{ x: "-100%" }}
                  whileHover={{ x: "100%" }}
                  transition={{ duration: 0.6 }}
                />
                <Globe className="w-4 h-4 relative z-10" />
                <span className="relative z-10">
                  {demoAvailable ? "Live Demo" : "Coming Soon"}
                </span>
                <ArrowUpRight className="w-4 h-4 relative z-10 group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5 transition-transform" />
              </motion.button>
            )}

            {/* Code button */}
            {links?.code && (
              <motion.a
                href={links.code}
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.02, y: -2 }}
                whileTap={{ scale: 0.98 }}
                className="flex items-center justify-center gap-2 px-5 py-3 text-sm font-semibold rounded-xl transition-all duration-300 group/btn"
                style={{
                  background: isDark
                    ? "rgba(99, 102, 241, 0.1)"
                    : "rgba(99, 102, 241, 0.08)",
                  border: isDark
                    ? "1px solid rgba(99, 102, 241, 0.3)"
                    : "1px solid rgba(99, 102, 241, 0.2)",
                  color: isDark ? "#a5b4fc" : "#6366f1",
                }}
              >
                <Github className="w-4 h-4" />
                <span className="hidden sm:inline">Code</span>
                <ArrowUpRight className="w-4 h-4 group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5 transition-transform" />
              </motion.a>
            )}
          </div>

          {/* Bottom stats bar */}
          <motion.div
            className={`flex items-center justify-between mt-5 pt-4 text-xs ${
              isDark
                ? "border-t border-gray-800 text-gray-500"
                : "border-t border-gray-100 text-gray-400"
            }`}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
          >
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-1.5">
                <Eye className="w-3.5 h-3.5" />
                <span>{Math.floor(Math.random() * 500) + 100}</span>
              </div>
              <div className="flex items-center gap-1">
                {[...Array(5)].map((_, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, scale: 0 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.4 + i * 0.05 }}
                  >
                    <svg
                      className="w-3 h-3 text-amber-400 fill-current"
                      viewBox="0 0 20 20"
                    >
                      <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z" />
                    </svg>
                  </motion.div>
                ))}
              </div>
            </div>
            <motion.div
              className="flex items-center gap-1 cursor-pointer hover:text-indigo-400 transition-colors"
              whileHover={{ scale: 1.05 }}
            >
              <ExternalLink className="w-3.5 h-3.5" />
              <span>Details</span>
            </motion.div>
          </motion.div>
        </div>
      </motion.article>

      {/* Floating glow effect */}
      <motion.div
        className="absolute inset-0 -z-10 rounded-[28px] blur-3xl"
        style={{
          background:
            "linear-gradient(135deg, rgba(99, 102, 241, 0.15) 0%, rgba(139, 92, 246, 0.15) 100%)",
        }}
        animate={{
          opacity: isHovered ? 0.6 : 0.2,
          scale: isHovered ? 1.05 : 1,
          y: isHovered ? 10 : 5,
        }}
        transition={{ duration: 0.4 }}
      />
    </motion.div>
  );
}
