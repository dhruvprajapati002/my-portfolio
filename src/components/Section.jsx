import { motion, useInView, useAnimation, AnimatePresence } from "framer-motion";
import { useState, useRef, useEffect, useCallback } from "react";
import { useTheme } from "../contexts/ThemeContext"; // ✅ Import theme context
import { 
  Hash, 
  ArrowRight, 
  Sparkles, 
  Circle,
  ChevronDown,
  Share2,
  BookOpen,
  Target,
  Check,
  Sun,
  Moon
} from "lucide-react";

// ✅ ENHANCED: Theme-aware floating decorative elements
const FloatingElement = ({ delay = 0, duration = 8, className = "" }) => {
  const { isDark } = useTheme();
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <motion.div
      ref={ref}
      className={`absolute pointer-events-none ${className} ${
        isDark ? "opacity-10" : "opacity-20"
      }`}
      initial={{ opacity: 0, scale: 0.8 }}
      animate={isInView ? {
        opacity: isDark ? 0.1 : 0.2,
        scale: 1,
        y: [0, -25, 0],
        x: [0, 15, 0],
        rotate: [0, 8, -8, 0]
      } : {}}
      transition={{
        duration,
        delay,
        repeat: Infinity,
        ease: "easeInOut"
      }}
      aria-hidden="true"
    />
  );
};

// ✅ ENHANCED: Theme-aware section progress indicator
const SectionProgress = ({ progress, sections = [] }) => {
  const { isDark } = useTheme();
  
  return (
    <div className="fixed right-8 top-1/2 transform -translate-y-1/2 z-40 hidden lg:block">
      <div className="flex flex-col gap-3">
        {sections.map((section, index) => (
          <motion.div
            key={section.id || index}
            className={`group relative w-2 h-8 rounded-full transition-all duration-300 cursor-pointer ${
              index < progress 
                ? 'bg-gradient-to-b from-indigo-500 to-purple-500' 
                : isDark ? 'bg-gray-700' : 'bg-gray-200'
            }`}
            whileHover={{ scale: 1.2, width: 8 }}
            onClick={() => {
              const element = document.getElementById(section.id);
              if (element) {
                element.scrollIntoView({ behavior: 'smooth' });
              }
            }}
          >
            {/* ✅ ENHANCED: Theme-aware tooltip */}
            <div className="absolute right-full mr-3 top-1/2 transform -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none">
              <div className={`px-3 py-2 text-xs rounded-lg whitespace-nowrap shadow-lg border ${
                isDark
                  ? "bg-gray-800 text-gray-200 border-gray-700"
                  : "bg-white text-gray-800 border-gray-200"
              }`}>
                {section.title}
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

// ✅ ENHANCED: Theme-aware animated section number
const SectionNumber = ({ number, inView }) => {
  const { isDark } = useTheme();
  
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0, x: -20 }}
      animate={{ 
        opacity: inView ? 1 : 0, 
        scale: inView ? 1 : 0,
        x: inView ? 0 : -20
      }}
      transition={{ duration: 0.6, delay: 0.2, type: "spring", stiffness: 200 }}
      className="absolute -left-20 top-0 hidden xl:flex items-center justify-center w-14 h-14 rounded-2xl bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 text-white font-bold shadow-xl"
    >
      <span className="text-lg relative z-10">{String(number).padStart(2, '0')}</span>
      <motion.div
        className="absolute inset-0 rounded-2xl"
        style={{ 
          background: isDark
            ? "linear-gradient(135deg, rgba(255, 255, 255, 0.15), rgba(255, 255, 255, 0))"
            : "linear-gradient(135deg, rgba(255, 255, 255, 0.2), rgba(255, 255, 255, 0))"
        }}
        animate={{ 
          opacity: [0.3, 0.7, 0.3],
          scale: [1, 1.05, 1] 
        }}
        transition={{ duration: 3, repeat: Infinity }}
      />
    </motion.div>
  );
};

// ✅ ENHANCED: Theme-aware share button
const ShareButton = ({ id, title }) => {
  const { isDark } = useTheme();
  const [copied, setCopied] = useState(false);

  const handleShare = useCallback(async () => {
    const url = `${window.location.origin}${window.location.pathname}#${id}`;
    
    try {
      if (navigator.share && navigator.canShare?.({ url, title })) {
        await navigator.share({ url, title });
      } else {
        await navigator.clipboard.writeText(url);
        setCopied(true);
        setTimeout(() => setCopied(false), 2500);
      }
    } catch (err) {
      // Fallback: just navigate to the section
      window.location.hash = id;
    }
  }, [id, title]);

  return (
    <motion.button
      onClick={handleShare}
      whileHover={{ scale: 1.1, rotate: 5 }}
      whileTap={{ scale: 0.9 }}
      className={`opacity-0 group-hover:opacity-100 ml-3 p-2.5 rounded-xl backdrop-blur-sm transition-all duration-300 shadow-lg border focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 ${
        isDark
          ? "bg-gray-800/80 hover:bg-gray-800 border-gray-700/60"
          : "bg-white/80 hover:bg-white border-gray-200/60"
      }`}
      title={copied ? "Link copied!" : "Share section"}
      aria-label={copied ? "Link copied to clipboard" : "Share this section"}
    >
      <AnimatePresence mode="wait">
        {copied ? (
          <motion.div
            key="check"
            initial={{ scale: 0, rotate: -90 }}
            animate={{ scale: 1, rotate: 0 }}
            exit={{ scale: 0, rotate: 90 }}
            className="w-4 h-4 text-green-600"
          >
            <Check className="w-4 h-4" />
          </motion.div>
        ) : (
          <motion.div
            key="share"
            initial={{ scale: 0, rotate: 90 }}
            animate={{ scale: 1, rotate: 0 }}
            exit={{ scale: 0, rotate: -90 }}
          >
            <Share2 className={`w-4 h-4 ${
              isDark ? "text-indigo-400" : "text-indigo-600"
            }`} />
          </motion.div>
        )}
      </AnimatePresence>
    </motion.button>
  );
};

// ✅ MAIN: Enhanced Section component with full theme integration
export default function Section({ 
  id, 
  title, 
  children, 
  subtitle,
  number,
  className = "",
  background = "default",
  titleAlign = "left",
  showDecorations = true,
  compact = false,
  maxWidth = "6xl"
}) {
  const { isDark } = useTheme(); // ✅ Use theme context
  const ref = useRef(null);
  const titleRef = useRef(null);
  const isInView = useInView(ref, { once: false, margin: "-20%" });
  const titleInView = useInView(titleRef, { once: true, margin: "-10%" });
  const [hasAnimated, setHasAnimated] = useState(false);

  useEffect(() => {
    if (isInView && !hasAnimated) {
      setHasAnimated(true);
    }
  }, [isInView, hasAnimated]);

  // ✅ ENHANCED: Theme-aware background variants
  const backgroundVariants = {
    default: "bg-transparent",
    subtle: isDark 
      ? "bg-gradient-to-br from-gray-900/50 via-gray-900 to-gray-800/50"
      : "bg-gradient-to-br from-gray-50/50 via-white to-gray-50/30",
    accent: isDark
      ? "bg-gradient-to-br from-indigo-950/30 via-purple-950/20 to-pink-950/20"
      : "bg-gradient-to-br from-indigo-50/40 via-purple-50/20 to-pink-50/30",
    contrast: isDark
      ? "bg-gradient-to-br from-gray-900 to-gray-800"
      : "bg-gradient-to-br from-gray-100 to-white",
    glass: isDark
      ? "bg-gray-900/30 backdrop-blur-xl border-t border-gray-700/20"
      : "bg-white/30 backdrop-blur-xl border-t border-white/20"
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.8,
        staggerChildren: 0.08,
        delayChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30, scale: 0.98 },
    visible: { 
      opacity: 1, 
      y: 0,
      scale: 1,
      transition: {
        duration: 0.7,
        ease: [0.22, 1, 0.36, 1]
      }
    }
  };

  const titleVariants = {
    hidden: { opacity: 0, y: 40, scale: 0.95 },
    visible: { 
      opacity: 1, 
      y: 0, 
      scale: 1,
      transition: {
        duration: 1,
        ease: [0.22, 1, 0.36, 1]
      }
    }
  };

  return (
    <motion.section
      ref={ref}
      id={id}
      className={`relative py-16 lg:py-28 scroll-mt-20 overflow-hidden ${backgroundVariants[background]} ${className}`}
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-80px" }}
      role="region"
      aria-labelledby={title ? `${id}-heading` : undefined}
    >
      {/* ✅ ENHANCED: Theme-aware background decorations */}
      {showDecorations && (
        <>
          <FloatingElement 
            delay={0} 
            className="top-16 left-16 w-40 h-40 rounded-full blur-3xl"
            style={{ 
              background: isDark
                ? "radial-gradient(circle, rgba(99, 102, 241, 0.08) 0%, rgba(0, 0, 0, 0) 70%)"
                : "radial-gradient(circle, rgba(99, 102, 241, 0.1) 0%, rgba(0, 0, 0, 0) 70%)"
            }}
          />
          <FloatingElement 
            delay={2} 
            duration={12}
            className="bottom-24 right-24 w-32 h-32 rounded-full blur-2xl"
            style={{ 
              background: isDark
                ? "radial-gradient(circle, rgba(139, 92, 246, 0.08) 0%, rgba(0, 0, 0, 0) 70%)"
                : "radial-gradient(circle, rgba(139, 92, 246, 0.1) 0%, rgba(0, 0, 0, 0) 70%)"
            }}
          />
          
          {/* ✅ ENHANCED: Theme-aware geometric shapes */}
          <div className={`absolute top-1/4 right-10 ${
            isDark ? "opacity-10" : "opacity-5"
          }`}>
            <motion.div
              animate={{ rotate: [0, 360] }}
              transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
              className={`w-20 h-20 border-2 rounded-lg ${
                isDark ? "border-indigo-700" : "border-indigo-300"
              }`}
            />
          </div>
          
          <div className={`absolute bottom-1/3 left-20 ${
            isDark ? "opacity-10" : "opacity-5"
          }`}>
            <motion.div
              animate={{ 
                rotate: [0, 180, 360],
                scale: [1, 1.1, 1]
              }}
              transition={{ duration: 18, repeat: Infinity, ease: "easeInOut" }}
            >
              <Target className={`w-16 h-16 ${
                isDark ? "text-purple-600" : "text-purple-400"
              }`} />
            </motion.div>
          </div>

          {/* ✅ ENHANCED: Theme-aware grid pattern overlay */}
          <div 
            className={`absolute inset-0 ${
              isDark ? "opacity-[0.025]" : "opacity-[0.015]"
            }`}
            style={{
              backgroundImage: `
                linear-gradient(rgba(99, 102, 241, ${isDark ? '0.08' : '0.1'}) 1px, transparent 1px),
                linear-gradient(90deg, rgba(99, 102, 241, ${isDark ? '0.08' : '0.1'}) 1px, transparent 1px)
              `,
              backgroundSize: '50px 50px'
            }}
          />
        </>
      )}

      <div className={`relative max-w-${maxWidth} mx-auto px-6 lg:px-8`}>
        {/* ✅ ENHANCED: Theme-aware section header */}
        {title && (
          <motion.header 
            ref={titleRef}
            variants={titleVariants}
            className={`relative mb-12 lg:mb-20 group ${
              titleAlign === 'center' ? 'text-center' : ''
            }`}
          >
            {/* Section number */}
            {number && <SectionNumber number={number} inView={titleInView} />}

            {/* ✅ ENHANCED: Theme-aware breadcrumb indicator */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2, duration: 0.6 }}
              viewport={{ once: true }}
              className={`flex items-center gap-3 mb-6 ${titleAlign === 'center' ? 'justify-center' : ''}`}
            >
              <motion.div 
                className="h-0.5 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-full"
                initial={{ width: 0 }}
                whileInView={{ width: 40 }}
                transition={{ delay: 0.3, duration: 0.8 }}
              />
              <motion.span 
                className={`px-4 py-2 text-sm font-semibold rounded-full border uppercase tracking-wider ${
                  isDark
                    ? "bg-gradient-to-r from-indigo-900/30 to-purple-900/30 text-indigo-300 border-indigo-700/50"
                    : "bg-gradient-to-r from-indigo-50 to-purple-50 text-indigo-700 border-indigo-200/50"
                }`}
                whileHover={{ scale: 1.05, y: -1 }}
              >
                {id?.replace(/[-_]/g, ' ') || 'Section'}
              </motion.span>
            </motion.div>

            {/* ✅ ENHANCED: Theme-aware main title */}
            <div className={`flex items-center gap-4 ${titleAlign === 'center' ? 'justify-center' : ''}`}>
              <motion.h2 
                id={title ? `${id}-heading` : undefined}
                className={`text-3xl md:text-5xl lg:text-6xl font-bold tracking-tight ${
                  isDark ? "text-white" : "text-gray-900"
                }`}
                whileHover={{ scale: 1.01 }}
                transition={{ duration: 0.3 }}
              >
                <span className="bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
                  {title}
                </span>
                
                {/* ✅ ENHANCED: Animated underline */}
                <motion.div
                  className="h-1 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 rounded-full mt-3"
                  initial={{ width: 0, opacity: 0 }}
                  whileInView={{ 
                    width: titleAlign === 'center' ? '60%' : '100%',
                    opacity: 1
                  }}
                  transition={{ delay: 0.6, duration: 1.2, ease: "easeOut" }}
                  style={{ margin: titleAlign === 'center' ? '12px auto 0' : '12px 0 0' }}
                />
              </motion.h2>

              {/* ✅ ENHANCED: Theme-aware interactive elements */}
              {id && (
                <div className="flex items-center opacity-0 group-hover:opacity-100 transition-all duration-300">
                  <motion.a
                    href={`#${id}`}
                    whileHover={{ scale: 1.1, rotate: -5 }}
                    whileTap={{ scale: 0.9 }}
                    className={`p-2.5 rounded-xl backdrop-blur-sm transition-all duration-300 shadow-lg border focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 ${
                      isDark
                        ? "bg-gray-800/80 hover:bg-gray-800 border-gray-700/60"
                        : "bg-white/80 hover:bg-white border-gray-200/60"
                    }`}
                    aria-label={`Link to ${title} section`}
                  >
                    <Hash className={`w-4 h-4 ${
                      isDark ? "text-indigo-400" : "text-indigo-600"
                    }`} />
                  </motion.a>
                  
                  <ShareButton id={id} title={title} />
                </div>
              )}
            </div>

            {/* ✅ ENHANCED: Theme-aware subtitle */}
            {subtitle && (
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5, duration: 0.8 }}
                viewport={{ once: true }}
                className={`text-lg md:text-xl mt-6 max-w-4xl leading-relaxed ${
                  isDark ? "text-gray-300" : "text-gray-600"
                } ${titleAlign === 'center' ? 'mx-auto text-center' : ''}`}
              >
                {subtitle}
              </motion.p>
            )}

            {/* ✅ ENHANCED: Theme-aware decorative elements */}
            <motion.div
              className={`absolute -top-6 -right-6 ${
                isDark ? "opacity-15" : "opacity-20"
              }`}
              animate={{ 
                rotate: [0, 12, -12, 0],
                scale: [1, 1.1, 1],
                y: [0, -5, 0]
              }}
              transition={{ duration: 6, repeat: Infinity }}
            >
              <Sparkles className="w-10 h-10 text-indigo-400" />
            </motion.div>
          </motion.header>
        )}

        {/* ✅ ENHANCED: Content wrapper */}
        <motion.div 
          variants={itemVariants}
          className="relative z-10"
        >
          {children}
        </motion.div>

        {/* ✅ ENHANCED: Theme-aware navigation hint */}
        {!compact && (
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8, duration: 0.8 }}
            viewport={{ once: true }}
            className={`flex items-center justify-center mt-20 ${
              isDark ? "text-gray-400" : "text-gray-500"
            }`}
          >
            <motion.div
              animate={{ y: [0, 8, 0] }}
              transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
              className="flex flex-col items-center gap-3 cursor-pointer group"
              onClick={() => {
                window.scrollBy({ top: window.innerHeight, behavior: 'smooth' });
              }}
            >
              <span className={`text-sm font-medium transition-colors duration-200 ${
                isDark
                  ? "group-hover:text-indigo-400"
                  : "group-hover:text-indigo-600"
              }`}>
                Continue exploring
              </span>
              <div className={`p-2 rounded-full backdrop-blur-sm border transition-all duration-200 ${
                isDark
                  ? "bg-gray-800/80 border-gray-700/60 group-hover:border-indigo-600"
                  : "bg-white/80 border-gray-200/60 group-hover:border-indigo-300"
              }`}>
                <ChevronDown className={`w-5 h-5 transition-colors duration-200 ${
                  isDark
                    ? "group-hover:text-indigo-400"
                    : "group-hover:text-indigo-600"
                }`} />
              </div>
            </motion.div>
          </motion.div>
        )}
      </div>

      {/* ✅ ENHANCED: Reading progress bar */}
      <motion.div
        className="absolute bottom-0 left-0 h-1"
        style={{
          background: "linear-gradient(90deg, rgba(99, 102, 241, 1) 0%, rgba(139, 92, 246, 1) 50%, rgba(236, 72, 153, 1) 100%)"
        }}
        initial={{ width: 0, opacity: 0 }}
        animate={{ 
          width: isInView ? '100%' : 0,
          opacity: isInView ? 1 : 0
        }}
        transition={{ duration: 1.2, delay: 0.3 }}
      />
    </motion.section>
  );
}

// ✅ ENHANCED: Theme-aware section variants
export const CompactSection = (props) => (
  <Section {...props} compact={true} showDecorations={false} />
);

export const FeatureSection = (props) => (
  <Section {...props} background="accent" titleAlign="center" />
);

export const ContrastSection = (props) => (
  <Section {...props} background="contrast" />
);

export const GlassSection = (props) => (
  <Section {...props} background="glass" />
);

export const HeroSection = (props) => (
  <Section {...props} background="subtle" maxWidth="7xl" />
);
