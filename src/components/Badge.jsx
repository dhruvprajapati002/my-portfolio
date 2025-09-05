import { motion, AnimatePresence } from "framer-motion";
import { X, Check, AlertCircle, Info, Star, Zap, Shield, Award } from "lucide-react";
import { useState, useCallback, useMemo } from "react";
import { useTheme } from "../contexts/ThemeContext"; // ✅ Import theme context

// ✅ ENHANCED: Theme-aware badge variants
const getBadgeVariants = (isDark) => ({
  primary: {
    bg: "bg-gradient-to-r from-indigo-500 to-purple-600",
    text: "text-white",
    border: isDark ? "border-indigo-800" : "border-indigo-200",
    glow: "shadow-indigo-500/25",
    hoverGlow: "shadow-indigo-500/40",
    shimmerColor: "rgba(255, 255, 255, 0.3)"
  },
  secondary: {
    bg: isDark 
      ? "bg-gradient-to-r from-gray-800 to-gray-700" 
      : "bg-gradient-to-r from-gray-100 to-gray-200",
    text: isDark ? "text-gray-300" : "text-gray-700",
    border: isDark ? "border-gray-600" : "border-gray-200",
    glow: isDark ? "shadow-gray-500/20" : "shadow-gray-400/20",
    hoverGlow: isDark ? "shadow-gray-500/30" : "shadow-gray-400/30",
    shimmerColor: isDark ? "rgba(255, 255, 255, 0.15)" : "rgba(0, 0, 0, 0.1)"
  },
  success: {
    bg: "bg-gradient-to-r from-emerald-500 to-green-600",
    text: "text-white",
    border: isDark ? "border-emerald-800" : "border-emerald-200",
    glow: "shadow-emerald-500/25",
    hoverGlow: "shadow-emerald-500/40",
    shimmerColor: "rgba(255, 255, 255, 0.3)"
  },
  warning: {
    bg: "bg-gradient-to-r from-amber-500 to-orange-600",
    text: "text-white",
    border: isDark ? "border-amber-800" : "border-amber-200",
    glow: "shadow-amber-500/25",
    hoverGlow: "shadow-amber-500/40",
    shimmerColor: "rgba(255, 255, 255, 0.3)"
  },
  error: {
    bg: "bg-gradient-to-r from-red-500 to-pink-600",
    text: "text-white",
    border: isDark ? "border-red-800" : "border-red-200",
    glow: "shadow-red-500/25",
    hoverGlow: "shadow-red-500/40",
    shimmerColor: "rgba(255, 255, 255, 0.3)"
  },
  info: {
    bg: "bg-gradient-to-r from-cyan-500 to-blue-600",
    text: "text-white",
    border: isDark ? "border-cyan-800" : "border-cyan-200",
    glow: "shadow-cyan-500/25",
    hoverGlow: "shadow-cyan-500/40",
    shimmerColor: "rgba(255, 255, 255, 0.3)"
  },
  premium: {
    bg: "bg-gradient-to-r from-yellow-400 via-yellow-500 to-amber-500",
    text: "text-gray-900",
    border: isDark ? "border-yellow-700" : "border-yellow-200",
    glow: "shadow-yellow-500/25",
    hoverGlow: "shadow-yellow-500/40",
    shimmerColor: "rgba(255, 255, 255, 0.4)"
  },
  glass: {
    bg: isDark 
      ? "bg-black/20 backdrop-blur-sm" 
      : "bg-white/20 backdrop-blur-sm",
    text: isDark ? "text-white" : "text-gray-900",
    border: isDark ? "border-gray-700/50" : "border-white/30",
    glow: isDark ? "shadow-black/20" : "shadow-black/10",
    hoverGlow: isDark ? "shadow-black/30" : "shadow-black/20",
    shimmerColor: isDark ? "rgba(255, 255, 255, 0.2)" : "rgba(255, 255, 255, 0.3)"
  },
  outline: {
    bg: "bg-transparent",
    text: isDark ? "text-gray-300" : "text-gray-700",
    border: isDark 
      ? "border-gray-600 hover:border-indigo-500" 
      : "border-gray-300 hover:border-indigo-400",
    glow: "shadow-none",
    hoverGlow: isDark ? "shadow-indigo-500/20" : "shadow-indigo-400/20",
    shimmerColor: isDark ? "rgba(99, 102, 241, 0.1)" : "rgba(99, 102, 241, 0.05)"
  }
});

const sizeVariants = {
  xs: "text-xs px-2 py-0.5 min-h-[1.25rem]",
  sm: "text-xs px-2.5 py-1 min-h-[1.5rem]",
  md: "text-sm px-3 py-1.5 min-h-[2rem]",
  lg: "text-base px-4 py-2 min-h-[2.5rem]",
  xl: "text-lg px-5 py-2.5 min-h-[3rem]"
};

// ✅ ENHANCED: Main Badge component with theme integration
export default function Badge({ 
  children,
  variant = "secondary",
  size = "sm",
  icon: Icon,
  closable = false,
  onClose,
  animated = true,
  pulse = false,
  shimmer = false,
  glow = false,
  rounded = "full", // full, lg, md, sm
  className = "",
  onClick,
  disabled = false,
  loading = false,
  badge, // For notification badges
  ...props 
}) {
  const { isDark } = useTheme(); // ✅ Use theme context
  const [isVisible, setIsVisible] = useState(true);
  const [isHovered, setIsHovered] = useState(false);

  // ✅ ENHANCED: Memoized badge styles for performance
  const badgeVariants = useMemo(() => getBadgeVariants(isDark), [isDark]);
  const badgeStyle = badgeVariants[variant] || badgeVariants.secondary;

  // ✅ ENHANCED: Better close handler with callback support
  const handleClose = useCallback((e) => {
    e?.stopPropagation();
    setIsVisible(false);
    onClose && onClose();
  }, [onClose]);

  // ✅ ENHANCED: Click handler with disabled state
  const handleClick = useCallback((e) => {
    if (disabled || loading) return;
    onClick && onClick(e);
  }, [onClick, disabled, loading]);

  // ✅ ENHANCED: Animation variants with better performance
  const motionVariants = {
    initial: { 
      opacity: 0, 
      scale: 0.8,
      y: -5
    },
    animate: { 
      opacity: 1, 
      scale: 1,
      y: 0,
      transition: {
        duration: 0.3,
        ease: [0.22, 1, 0.36, 1]
      }
    },
    exit: { 
      opacity: 0, 
      scale: 0.8,
      y: -5,
      x: closable ? 100 : 0,
      transition: {
        duration: 0.2,
        ease: [0.22, 1, 0.36, 1]
      }
    },
    hover: {
      scale: disabled ? 1 : 1.05,
      y: disabled ? 0 : -2,
      transition: {
        duration: 0.2,
        ease: "easeOut"
      }
    },
    tap: {
      scale: disabled ? 1 : 0.95,
      transition: {
        duration: 0.1
      }
    }
  };

  // ✅ ENHANCED: Rounded variants
  const roundedClasses = {
    full: "rounded-full",
    lg: "rounded-lg",
    md: "rounded-md",
    sm: "rounded-sm"
  };

  return (
    <AnimatePresence mode="wait">
      {isVisible && (
        <motion.span
          variants={animated ? motionVariants : {}}
          initial={animated ? "initial" : false}
          animate="animate"
          exit={animated ? "exit" : false}
          whileHover={animated && !disabled ? "hover" : false}
          whileTap={animated && !disabled && onClick ? "tap" : false}
          onHoverStart={() => !disabled && setIsHovered(true)}
          onHoverEnd={() => !disabled && setIsHovered(false)}
          onClick={handleClick}
          className={`
            inline-flex items-center justify-center gap-1.5 font-semibold
            border transition-all duration-300 relative overflow-hidden select-none
            ${sizeVariants[size]}
            ${roundedClasses[rounded]}
            ${badgeStyle.bg}
            ${badgeStyle.text}
            ${badgeStyle.border}
            shadow-lg ${badgeStyle.glow}
            hover:shadow-xl hover:${badgeStyle.hoverGlow}
            ${onClick && !disabled ? 'cursor-pointer' : 'cursor-default'}
            ${disabled ? 'opacity-60 cursor-not-allowed' : ''}
            ${loading ? 'cursor-wait' : ''}
            ${className}
          `}
          role={onClick ? "button" : "status"}
          tabIndex={onClick && !disabled ? 0 : -1}
          aria-label={typeof children === 'string' ? children : undefined}
          aria-disabled={disabled}
          {...props}
        >
          {/* ✅ ENHANCED: Shimmer effect with theme awareness */}
          {shimmer && !disabled && (
            <motion.div
              className="absolute inset-0 -skew-x-12"
              style={{
                background: `linear-gradient(90deg, rgba(0,0,0,0) 0%, ${badgeStyle.shimmerColor} 50%, rgba(0,0,0,0) 100%)`
              }}
              animate={{
                x: ['-100%', '200%']
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                repeatDelay: 3,
                ease: "easeInOut"
              }}
            />
          )}

          {/* ✅ ENHANCED: Pulse effect with conditional rendering */}
          {pulse && !disabled && (
            <motion.div
              className={`absolute inset-0 ${roundedClasses[rounded]}`}
              style={{
                backgroundColor: badgeStyle.shimmerColor
              }}
              animate={{
                scale: [1, 1.2, 1],
                opacity: [0.5, 0.2, 0.5]
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            />
          )}

          {/* ✅ ENHANCED: Glow effect with theme awareness */}
          {glow && !disabled && (
            <motion.div
              className={`absolute inset-0 ${roundedClasses[rounded]} blur-md`}
              style={{
                backgroundColor: badgeStyle.shimmerColor
              }}
              animate={{
                opacity: isHovered ? 0.6 : 0.3,
                scale: isHovered ? 1.1 : 1
              }}
              transition={{ duration: 0.3 }}
            />
          )}

          {/* ✅ ENHANCED: Hover background with smooth transitions */}
          <motion.div
            className={`absolute inset-0 ${roundedClasses[rounded]}`}
            animate={{
              backgroundColor: isHovered && !disabled ? badgeStyle.shimmerColor : "rgba(0,0,0,0)",
              scale: isHovered && !disabled ? 1 : 0.95
            }}
            transition={{ duration: 0.2 }}
          />

          <div className="relative z-10 flex items-center justify-center gap-1.5 min-w-0">
            {/* ✅ ENHANCED: Loading spinner */}
            {loading ? (
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                className="w-3 h-3 border border-current border-t-transparent rounded-full"
              />
            ) : (
              /* ✅ ENHANCED: Icon with better animations */
              Icon && (
                <motion.div
                  animate={{ 
                    rotate: isHovered && !disabled ? [0, 10, -10, 0] : 0,
                    scale: isHovered && !disabled ? 1.1 : 1
                  }}
                  transition={{ duration: 0.4 }}
                >
                  <Icon className="w-3 h-3 flex-shrink-0" />
                </motion.div>
              )
            )}

            {/* ✅ ENHANCED: Content with better text handling */}
            <span className="leading-none truncate">
              {children}
            </span>

            {/* ✅ ENHANCED: Notification badge */}
            {badge && (
              <motion.span
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 text-white text-xs rounded-full flex items-center justify-center font-bold"
              >
                {badge > 99 ? '99+' : badge}
              </motion.span>
            )}

            {/* ✅ ENHANCED: Close button with accessibility */}
            {closable && !disabled && (
              <motion.button
                onClick={handleClose}
                whileHover={{ scale: 1.2, rotate: 90 }}
                whileTap={{ scale: 0.8 }}
                className="ml-1 hover:bg-white/20 dark:hover:bg-black/20 rounded-full p-0.5 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-white/50 flex-shrink-0"
                aria-label="Remove badge"
                tabIndex={0}
              >
                <X className="w-3 h-3" />
              </motion.button>
            )}
          </div>

          {/* ✅ ENHANCED: Premium particles with physics */}
          {variant === 'premium' && !disabled && (
            <div className="absolute inset-0 pointer-events-none">
              {[...Array(4)].map((_, i) => (
                <motion.div
                  key={i}
                  className="absolute w-1 h-1 bg-white/60 rounded-full"
                  style={{
                    left: `${15 + i * 20}%`,
                    top: `${20 + (i % 2) * 40}%`
                  }}
                  animate={{
                    y: [-3, -12, -3],
                    x: [0, Math.sin(i) * 3, 0],
                    opacity: [0.6, 1, 0.6],
                    scale: [1, 1.5, 1]
                  }}
                  transition={{
                    duration: 2 + i * 0.3,
                    repeat: Infinity,
                    delay: i * 0.2,
                    ease: "easeInOut"
                  }}
                />
              ))}
            </div>
          )}
        </motion.span>
      )}
    </AnimatePresence>
  );
}

// ✅ ENHANCED: Predefined badge components with theme integration
export const StatusBadge = ({ status, animated = true, ...props }) => {
  const statusConfig = {
    online: { variant: "success", icon: Check, children: "Online", pulse: true, glow: true },
    offline: { variant: "error", icon: X, children: "Offline" },
    active: { variant: "success", icon: Zap, children: "Active", shimmer: true },
    inactive: { variant: "secondary", icon: AlertCircle, children: "Inactive" },
    pending: { variant: "warning", icon: Info, children: "Pending", pulse: true },
    loading: { variant: "info", children: "Loading", loading: true },
    error: { variant: "error", icon: X, children: "Error", pulse: true },
    verified: { variant: "success", icon: Shield, children: "Verified", glow: true },
    premium: { variant: "premium", icon: Star, children: "Premium", pulse: true, glow: true, shimmer: true }
  };

  const config = statusConfig[status] || statusConfig.inactive;
  return <Badge animated={animated} {...config} {...props} />;
};

export const TechBadge = ({ tech, level, animated = true, ...props }) => {
  const { isDark } = useTheme();
  
  const levelConfig = {
    beginner: { variant: "secondary" },
    intermediate: { variant: "info" },
    advanced: { variant: "success", glow: true },
    expert: { variant: "premium", glow: true, pulse: true, shimmer: true }
  };

  const config = level ? levelConfig[level] : { variant: "outline" };
  
  return (
    <Badge 
      size="sm" 
      animated={animated}
      className="font-mono backdrop-blur-md"
      {...config}
      {...props}
    >
      {tech}
    </Badge>
  );
};

export const PremiumBadge = ({ animated = true, ...props }) => (
  <Badge 
    variant="premium" 
    icon={Star} 
    pulse 
    glow
    shimmer
    animated={animated}
    {...props}
  >
    Premium
  </Badge>
);

export const NotificationBadge = ({ count, max = 99, animated = true, ...props }) => {
  const displayCount = count > max ? `${max}+` : count;
  
  return (
    <Badge 
      variant="error" 
      size="xs"
      pulse={count > 0}
      glow={count > 0}
      animated={animated}
      rounded="full"
      className="min-w-[1.5rem] h-6 flex items-center justify-center font-bold"
      {...props}
    >
      {displayCount}
    </Badge>
  );
};

export const CategoryBadge = ({ category, color, animated = true, ...props }) => {
  const categoryColors = {
    frontend: "info",
    backend: "success", 
    fullstack: "premium",
    mobile: "warning",
    design: "error",
    devops: "secondary",
    ai: "info",
    blockchain: "premium"
  };

  const variant = color || categoryColors[category?.toLowerCase()] || "outline";

  return (
    <Badge 
      variant={variant}
      size="sm"
      animated={animated}
      shimmer={variant === "premium"}
      glow={variant === "premium"}
      {...props}
    >
      {category}
    </Badge>
  );
};

// ✅ ENHANCED: Badge Group with better UX
export const BadgeGroup = ({ 
  badges = [], 
  max = 5, 
  animated = true, 
  className = "", 
  showMoreText = "Show more",
  showLessText = "Show less",
  ...props 
}) => {
  const [showAll, setShowAll] = useState(false);
  const visibleBadges = showAll ? badges : badges.slice(0, max);
  const remainingCount = badges.length - max;

  const toggleShowAll = useCallback(() => {
    setShowAll(prev => !prev);
  }, []);

  return (
    <div className={`flex flex-wrap items-center gap-2 ${className}`} {...props}>
      <AnimatePresence mode="popLayout">
        {visibleBadges.map((badge, index) => (
          <motion.div
            key={badge.key || badge.children || index}
            layout
            initial={animated ? { opacity: 0, scale: 0.8 } : false}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8, y: -20 }}
            transition={{ 
              layout: { duration: 0.3 },
              opacity: { duration: 0.2, delay: index * 0.03 }
            }}
          >
            {typeof badge === 'string' ? (
              <Badge animated={animated} size="sm">{badge}</Badge>
            ) : (
              <Badge animated={animated} size="sm" {...badge} />
            )}
          </motion.div>
        ))}
      </AnimatePresence>
      
      {remainingCount > 0 && (
        <motion.button
          onClick={toggleShowAll}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="text-sm text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300 font-medium transition-colors duration-200 px-2 py-1 rounded-md hover:bg-gray-100 dark:hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
        >
          {showAll ? showLessText : `+${remainingCount} ${showMoreText}`}
        </motion.button>
      )}
    </div>
  );
};

// ✅ NEW: Interactive Badge for clickable actions
export const ActionBadge = ({ 
  children, 
  onClick, 
  icon: Icon, 
  variant = "outline", 
  loading = false,
  disabled = false,
  animated = true,
  ...props 
}) => {
  const { isDark } = useTheme();
  
  return (
    <Badge
      variant={variant}
      icon={Icon}
      onClick={onClick}
      loading={loading}
      disabled={disabled}
      animated={animated}
      shimmer={!disabled && !loading}
      className="transition-all duration-200 hover:shadow-lg focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
      {...props}
    >
      {children}
    </Badge>
  );
};

/* ✅ ENHANCED Usage Examples:

// Basic usage with theme integration
<Badge>Auto Theme Badge</Badge>

// Status indicators
<StatusBadge status="online" />
<StatusBadge status="premium" />

// Technology badges with levels
<TechBadge tech="React" level="expert" />
<TechBadge tech="Node.js" level="advanced" />

// Interactive badges
<ActionBadge 
  variant="primary" 
  icon={Star} 
  onClick={() => alert('Clicked!')}
>
  Click Me
</ActionBadge>

// Notification badges
<NotificationBadge count={42} />

// Category badges
<CategoryBadge category="fullstack" />

// Badge groups with show more functionality
<BadgeGroup 
  badges={[
    { children: "React", variant: "info" },
    { children: "Node.js", variant: "success" },
    "TypeScript",
    "MongoDB",
    "Express",
    "Tailwind"
  ]} 
  max={3} 
/>

// Custom themed badge
<Badge 
  variant="glass" 
  glow 
  shimmer
  rounded="lg"
  className="backdrop-blur-xl"
>
  Glass Morphism
</Badge>

*/
