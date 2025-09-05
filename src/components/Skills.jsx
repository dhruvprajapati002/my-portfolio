import { motion, useInView, useAnimation } from "framer-motion";
import * as Lucide from "lucide-react";
import { useMemo, useRef, useState, useEffect, useCallback } from "react";
import { useTheme } from "../contexts/ThemeContext"; // ✅ Import theme context
import { site } from "../data/site";

// ✅ ENHANCED: Comprehensive skill icons mapping with better organization
const skillIcons = {
  // Frontend Technologies
  "React": Lucide.Atom,
  "JavaScript": Lucide.FileCode,
  "TypeScript": Lucide.FileType,
  "HTML/CSS": Lucide.Code,
  "Tailwind CSS": Lucide.Palette,
  "Vite": Lucide.Zap,
  "Redux/Context": Lucide.Layers,
  "React Router": Lucide.Route,
  "Next.js": Lucide.FramerLogo,
  
  // Backend Technologies
  "Node.js": Lucide.Server,
  "Express.js": Lucide.Workflow,
  "PHP": Lucide.FileCode2,
  "Python": Lucide.Bot,
  "REST APIs": Lucide.Globe,
  "GraphQL": Lucide.Network,
  "JWT": Lucide.Key,
  "RBAC": Lucide.Shield,
  
  // Database & DevOps
  "MongoDB": Lucide.Database,
  "MySQL": Lucide.HardDrive,
  "PostgreSQL": Lucide.Cylinder,
  "Git": Lucide.GitBranch,
  "GitHub": Lucide.Github,
  "Docker": Lucide.Package,
  "AWS": Lucide.Cloud,
  "Vercel": Lucide.CloudLightning,
  "Postman": Lucide.Send,
  "Mongoose": Lucide.Database,
  
  // Tools & Others
  "VS Code": Lucide.Code2,
  "Figma": Lucide.PenTool,
  "Linux": Lucide.Terminal,
  "Testing": Lucide.TestTube,
};

const getIconByName = (name) => {
  const Icon = Lucide[name];
  return Icon || Lucide.BadgeInfo;
};

// ✅ ENHANCED: Theme-aware floating particles
const FloatingParticles = () => {
  const { isDark } = useTheme();
  
  const particles = useMemo(() => 
    Array.from({ length: 8 }, (_, i) => ({
      id: i,
      size: Math.floor(Math.random() * 2) + 1,
      x: Math.random() * 100,
      y: Math.random() * 100,
      delay: i * 0.5,
      duration: 8 + Math.random() * 4
    })), []
  );

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {particles.map((particle) => (
        <motion.div
          key={particle.id}
          className="absolute"
          style={{
            left: `${particle.x}%`,
            top: `${particle.y}%`,
          }}
          animate={{
            y: [0, -40, 0],
            x: [0, Math.sin(particle.id) * 30, 0],
            opacity: isDark ? [0.05, 0.4, 0.05] : [0.1, 0.6, 0.1],
            scale: [0.5, 1.3, 0.5],
            rotate: [0, 180, 360],
          }}
          transition={{
            duration: particle.duration,
            repeat: Infinity,
            delay: particle.delay,
            ease: "easeInOut"
          }}
        >
          <div 
            className={`w-${particle.size} h-${particle.size} rounded-full blur-sm`}
            style={{
              background: isDark
                ? "linear-gradient(135deg, rgba(99, 102, 241, 0.4), rgba(139, 92, 246, 0.4))"
                : "linear-gradient(135deg, rgba(99, 102, 241, 0.6), rgba(139, 92, 246, 0.6))"
            }}
          />
        </motion.div>
      ))}
    </div>
  );
};

// ✅ ENHANCED: Theme-aware section header
const SectionHeader = () => {
  const { isDark } = useTheme();
  
  return (
    <motion.header 
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
      className="text-center mb-20"
    >
      {/* ✅ ENHANCED: Theme-aware badge */}
      <motion.div 
        initial={{ opacity: 0, scale: 0.8 }}
        whileInView={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.2, duration: 0.6 }}
        viewport={{ once: true }}
        className={`inline-flex items-center gap-3 px-6 py-3 backdrop-blur-sm rounded-full mb-8 border ${
          isDark
            ? "bg-gradient-to-r from-indigo-500/10 to-purple-500/10 border-indigo-700/30"
            : "bg-gradient-to-r from-indigo-500/10 to-purple-500/10 border-indigo-200/30"
        }`}
      >
        <motion.div
          animate={{ rotate: [0, 360] }}
          transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
        >
          <Lucide.Zap className={`w-5 h-5 ${
            isDark ? "text-indigo-400" : "text-indigo-600"
          }`} />
        </motion.div>
        <span className={`text-sm font-bold tracking-wider uppercase ${
          isDark ? "text-indigo-300" : "text-indigo-700"
        }`}>
          Technical Expertise
        </span>
        <motion.div
          animate={{ 
            scale: [1, 1.2, 1],
            rotate: [0, 10, -10, 0]
          }}
          transition={{ duration: 3, repeat: Infinity }}
        >
          <Lucide.Sparkles className="w-4 h-4 text-purple-500" />
        </motion.div>
      </motion.div>
      
      {/* Enhanced title */}
      <motion.h2 
        className="text-4xl md:text-6xl lg:text-7xl font-black mb-8 leading-tight"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ delay: 0.4 }}
        viewport={{ once: true }}
      >
        <span className="inline-block bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
          Skills &
        </span>
        <br />
        <motion.span 
          className="inline-block bg-gradient-to-r from-pink-600 via-purple-600 to-indigo-600 bg-clip-text text-transparent"
          initial={{ x: -50, opacity: 0 }}
          whileInView={{ x: 0, opacity: 1 }}
          transition={{ delay: 0.6, duration: 0.8 }}
          viewport={{ once: true }}
        >
          Technologies
        </motion.span>
      </motion.h2>
      
      {/* ✅ ENHANCED: Theme-aware description */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.8, duration: 0.8 }}
        viewport={{ once: true }}
        className="max-w-4xl mx-auto"
      >
        <p className={`text-lg md:text-xl leading-relaxed mb-6 ${
          isDark ? "text-gray-300" : "text-gray-600"
        }`}>
          Mastering modern technologies to craft exceptional digital experiences. 
          From frontend interfaces to backend systems, I deliver production-ready solutions.
        </p>
        <div className={`flex flex-wrap justify-center gap-6 text-sm ${
          isDark ? "text-gray-400" : "text-gray-500"
        }`}>
          <span className="flex items-center gap-2">
            <motion.div 
              className="w-2 h-2 bg-green-500 rounded-full"
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
            />
            Production Ready
          </span>
          <span className="flex items-center gap-2">
            <motion.div 
              className="w-2 h-2 bg-blue-500 rounded-full"
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ duration: 2, repeat: Infinity, delay: 0.5 }}
            />
            Best Practices
          </span>
          <span className="flex items-center gap-2">
            <motion.div 
              className="w-2 h-2 bg-purple-500 rounded-full"
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ duration: 2, repeat: Infinity, delay: 1 }}
            />
            Always Learning
          </span>
        </div>
      </motion.div>
    </motion.header>
  );
};

// ✅ ENHANCED: Theme-aware floating skill icons
const FloatingSkillIcon = ({ skill, delay, index, totalIcons }) => {
  const { isDark } = useTheme();
  const SkillIcon = skillIcons[skill] || Lucide.Code;
  const [isHovered, setIsHovered] = useState(false);
  
  // Better positioning algorithm
  const angle = (index / totalIcons) * 2 * Math.PI;
  const radius = 40;
  const x = 50 + radius * Math.cos(angle);
  const y = 50 + radius * Math.sin(angle) * 0.6;
  
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0, rotate: -180 }}
      whileInView={{ opacity: isDark ? 0.5 : 0.7, scale: 1, rotate: 0 }}
      viewport={{ once: true }}
      transition={{ 
        duration: 0.8, 
        delay: delay,
        ease: [0.22, 1, 0.36, 1]
      }}
      animate={{
        y: [0, -12, 0],
        rotate: [0, 8, -8, 0],
        scale: [1, 1.1, 1]
      }}
      whileHover={{
        scale: 1.5,
        rotate: [0, 15, -15, 0],
        y: -8,
        transition: { duration: 0.4 }
      }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      className="absolute pointer-events-auto cursor-pointer z-20"
      style={{
        left: `${Math.max(5, Math.min(95, x))}%`,
        top: `${Math.max(10, Math.min(90, y))}%`,
      }}
    >
      <motion.div 
        className={`w-10 h-10 rounded-2xl flex items-center justify-center backdrop-blur-lg border shadow-lg hover:shadow-xl transition-all duration-300 ${
          isDark
            ? "bg-gray-800/95 border-gray-600/60"
            : "bg-white/95 border-gray-200/60"
        }`}
        animate={{
          boxShadow: isHovered 
            ? "0 20px 40px -10px rgba(99, 102, 241, 0.4)"
            : isDark
              ? "0 4px 20px -2px rgba(0, 0, 0, 0.3)"
              : "0 4px 20px -2px rgba(0, 0, 0, 0.1)"
        }}
      >
        <SkillIcon className={`w-5 h-5 ${
          isDark ? "text-indigo-400" : "text-indigo-600"
        }`} />
      </motion.div>
      
      {/* ✅ ENHANCED: Theme-aware tooltip */}
      <motion.div
        initial={{ opacity: 0, y: 10, scale: 0.8 }}
        animate={{ 
          opacity: isHovered ? 1 : 0, 
          y: isHovered ? -15 : 10, 
          scale: isHovered ? 1 : 0.8 
        }}
        className={`absolute top-full left-1/2 transform -translate-x-1/2 mt-2 px-3 py-2 text-xs rounded-lg whitespace-nowrap font-medium shadow-lg border ${
          isDark
            ? "bg-gray-800 text-gray-200 border-gray-700"
            : "bg-white text-gray-800 border-gray-300"
        }`}
        style={{ zIndex: 1000 }}
      >
        {skill}
        <div className={`absolute bottom-full left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-b-4 border-transparent ${
          isDark ? "border-b-gray-800" : "border-b-white"
        }`} />
      </motion.div>
    </motion.div>
  );
};

// ✅ ENHANCED: Theme-aware skill pill
const SkillPill = ({ label, delay = 0, index }) => {
  const { isDark } = useTheme();
  const SkillIcon = skillIcons[label] || Lucide.Code;
  const [isClicked, setIsClicked] = useState(false);
  
  const handleClick = useCallback(() => {
    setIsClicked(true);
    setTimeout(() => setIsClicked(false), 600);
  }, []);
  
  return (
    <motion.button
      initial={{ opacity: 0, scale: 0.8, y: 20 }}
      whileInView={{ opacity: 1, scale: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4, delay, ease: [0.22, 1, 0.36, 1] }}
      whileHover={{ 
        scale: 1.08, 
        y: -4,
        transition: { duration: 0.2 }
      }}
      whileTap={{ scale: 0.95 }}
      onClick={handleClick}
      className={`group relative px-4 py-2.5 rounded-2xl cursor-pointer backdrop-blur-sm border transition-all duration-300 flex items-center gap-3 overflow-hidden focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 ${
        isDark
          ? "bg-gray-800/90 border-gray-700/60 hover:border-indigo-500 hover:shadow-lg hover:shadow-indigo-500/20"
          : "bg-white/90 border-gray-200/60 hover:border-indigo-300 hover:shadow-lg hover:shadow-indigo-500/20"
      }`}
      aria-label={`${label} skill`}
    >
      {/* ✅ ENHANCED: Icon with theme-aware animations */}
      <motion.div
        animate={isClicked ? {
          rotate: [0, 360],
          scale: [1, 1.3, 1]
        } : {
          rotate: [0, 5, -5, 0],
          scale: [1, 1.05, 1]
        }}
        transition={{
          duration: isClicked ? 0.6 : 4,
          repeat: isClicked ? 0 : Infinity,
          ease: isClicked ? "easeOut" : "easeInOut"
        }}
        className={`w-4 h-4 relative z-10 ${
          isDark ? "text-indigo-400" : "text-indigo-600"
        }`}
      >
        <SkillIcon className="w-full h-full" />
      </motion.div>
      
      <span className={`relative z-10 font-semibold text-sm ${
        isDark ? "text-gray-200" : "text-gray-800"
      }`}>
        {label}
      </span>
      
      {/* ✅ ENHANCED: Theme-aware click ripple */}
      {isClicked && (
        <motion.div
          className="absolute inset-0 rounded-2xl"
          style={{ 
            backgroundColor: isDark 
              ? "rgba(99, 102, 241, 0.15)" 
              : "rgba(99, 102, 241, 0.2)" 
          }}
          initial={{ scale: 0, opacity: 1 }}
          animate={{ scale: 2, opacity: 0 }}
          transition={{ duration: 0.6 }}
        />
      )}
      
      {/* ✅ ENHANCED: Theme-aware shimmer effect */}
      <motion.div
        className="absolute inset-0 -skew-x-12 opacity-0 group-hover:opacity-100"
        style={{
          background: isDark
            ? "linear-gradient(90deg, rgba(0,0,0,0) 0%, rgba(255,255,255,0.2) 50%, rgba(0,0,0,0) 100%)"
            : "linear-gradient(90deg, rgba(0,0,0,0) 0%, rgba(255,255,255,0.3) 50%, rgba(0,0,0,0) 100%)"
        }}
        initial={{ x: -200 }}
        whileHover={{ x: 200 }}
        transition={{ duration: 0.8 }}
      />
      
      {/* ✅ ENHANCED: Theme-aware hover background */}
      <motion.div
        className="absolute inset-0 rounded-2xl"
        style={{ 
          backgroundColor: isDark 
            ? "rgba(99, 102, 241, 0.06)" 
            : "rgba(99, 102, 241, 0.08)" 
        }}
        initial={{ opacity: 0 }}
        whileHover={{ opacity: 1 }}
        transition={{ duration: 0.3 }}
      />
    </motion.button>
  );
};

// ✅ ENHANCED: Theme-aware skill card with optimized 3D effects
const SkillCard = ({ title, iconName, color, bgColor, items, index }) => {
  const { isDark } = useTheme();
  const Icon = useMemo(() => getIconByName(iconName), [iconName]);
  const [isHovered, setIsHovered] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  const handleMouseMove = useCallback((e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = (e.clientX - rect.left - rect.width / 2) / rect.width;
    const y = (e.clientY - rect.top - rect.height / 2) / rect.height;
    setMousePosition({ x: x * 8, y: y * 8 });
  }, []);

  const handleMouseLeave = useCallback(() => {
    setIsHovered(false);
    setMousePosition({ x: 0, y: 0 });
  }, []);

  return (
    <motion.article
      initial={{ opacity: 0, y: 60, rotateX: 15 }}
      whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.8, delay: index * 0.1, ease: [0.22, 1, 0.36, 1] }}
      whileHover={{ 
        y: -12, 
        rotateX: -3,
        transition: { duration: 0.4 }
      }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={handleMouseLeave}
      onMouseMove={handleMouseMove}
      className="group relative h-full perspective-1000"
      style={{
        transform: `rotateX(${mousePosition.y}deg) rotateY(${mousePosition.x}deg)`
      }}
      role="article"
      aria-labelledby={`skill-${index}-title`}
    >
      {/* ✅ ENHANCED: Theme-aware glass morphism card */}
      <div className={`absolute inset-0 rounded-3xl backdrop-blur-xl shadow-xl group-hover:shadow-2xl transition-all duration-500 border ${
        isDark
          ? "bg-gray-800/90 border-gray-700/60"
          : "bg-white/90 border-gray-200/60"
      }`} />
      
      {/* ✅ ENHANCED: Theme-aware dynamic gradient overlay */}
      <motion.div 
        className="absolute inset-0 rounded-3xl"
        animate={{
          backgroundColor: isHovered 
            ? (isDark ? "rgba(99, 102, 241, 0.08)" : "rgba(99, 102, 241, 0.12)")
            : "rgba(0, 0, 0, 0)"
        }}
        transition={{ duration: 0.5 }}
      />
      
      {/* ✅ ENHANCED: Theme-aware animated border */}
      <motion.div
        className="absolute inset-0 rounded-3xl"
        animate={{
          boxShadow: isHovered 
            ? (isDark 
                ? "inset 0 0 0 2px rgba(99, 102, 241, 0.25)" 
                : "inset 0 0 0 2px rgba(99, 102, 241, 0.3)")
            : "inset 0 0 0 0px rgba(0, 0, 0, 0)"
        }}
        transition={{ duration: 0.4 }}
      />

      {/* Floating skill icons background */}
      <div className="absolute inset-0 overflow-hidden rounded-3xl pointer-events-none">
        {items.slice(0, 6).map((skill, i) => (
          <FloatingSkillIcon 
            key={skill} 
            skill={skill} 
            delay={i * 0.1} 
            index={i}
            totalIcons={Math.min(items.length, 6)}
          />
        ))}
      </div>

      <div className="relative z-30 p-8 lg:p-10 h-full flex flex-col">
        {/* ✅ ENHANCED: Theme-aware header */}
        <div className="flex items-center gap-6 mb-8">
          <motion.div
            whileHover={{ 
              rotate: [0, -12, 12, 0], 
              scale: 1.1,
              transition: { duration: 0.6 }
            }}
            className={`relative p-4 rounded-3xl bg-gradient-to-r ${color} shadow-xl overflow-hidden`}
          >
            <Icon className="w-8 h-8 text-white relative z-10" />
            
            {/* ✅ ENHANCED: Theme-aware animated background pattern */}
            <motion.div
              className="absolute inset-0"
              style={{
                background: isDark
                  ? "linear-gradient(90deg, rgba(255,255,255,0) 0%, rgba(255,255,255,0.15) 50%, rgba(255,255,255,0) 100%)"
                  : "linear-gradient(90deg, rgba(255,255,255,0) 0%, rgba(255,255,255,0.2) 50%, rgba(255,255,255,0) 100%)"
              }}
              animate={{ 
                x: isHovered ? ['-100%', '100%'] : '-100%'
              }}
              transition={{ 
                duration: 1.5, 
                repeat: isHovered ? Infinity : 0,
                ease: "linear"
              }}
            />
          </motion.div>
          
          <div className="flex-1 min-w-0">
            <motion.h3 
              id={`skill-${index}-title`}
              className={`text-2xl lg:text-3xl font-black mb-2 truncate ${
                isDark ? "text-white" : "text-gray-900"
              }`}
              animate={{ 
                backgroundImage: isHovered ? 
                  `linear-gradient(135deg, ${color.replace('from-', '').replace(' to-', ', ')})` : 
                  'none'
              }}
              style={{
                backgroundClip: isHovered ? 'text' : 'unset',
                WebkitBackgroundClip: isHovered ? 'text' : 'unset',
                color: isHovered ? 'transparent' : undefined
              }}
              transition={{ duration: 0.3 }}
            >
              {title}
            </motion.h3>
            <p className={`font-medium text-sm ${
              isDark ? "text-gray-400" : "text-gray-600"
            }`}>
              {items.length} technologies • Expert level
            </p>
          </div>
        </div>

        {/* Skills grid */}
        <div className="flex flex-wrap gap-2 lg:gap-3 mb-8">
          {items.map((skill, i) => (
            <SkillPill 
              key={skill} 
              label={skill} 
              delay={0.03 * i} 
              index={i}
            />
          ))}
        </div>

        {/* ✅ ENHANCED: Theme-aware progress section */}
        <motion.div 
          className={`mt-auto pt-6 border-t ${
            isDark ? "border-gray-700/60" : "border-gray-200/60"
          }`}
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: index * 0.1 + 0.5 }}
          viewport={{ once: true }}
        >
          <div className="flex justify-between items-center mb-3">
            <span className={`text-sm font-bold ${
              isDark ? "text-gray-300" : "text-gray-700"
            }`}>
              Proficiency Level
            </span>
            <span className={`text-sm font-bold ${
              isDark ? "text-indigo-400" : "text-indigo-600"
            }`}>
              {Math.floor(85 + Math.random() * 10)}%
            </span>
          </div>
          
          <div className={`relative w-full h-3 rounded-full overflow-hidden ${
            isDark ? "bg-gray-700" : "bg-gray-200"
          }`}>
            <motion.div
              initial={{ width: 0 }}
              whileInView={{ width: `${85 + Math.random() * 10}%` }}
              transition={{ duration: 1.5, delay: index * 0.1 + 0.8, ease: "easeOut" }}
              viewport={{ once: true }}
              className={`h-full bg-gradient-to-r ${color} rounded-full relative overflow-hidden`}
            >
              {/* ✅ ENHANCED: Theme-aware shine effect */}
              <motion.div
                animate={{ x: ['-100%', '200%'] }}
                transition={{ 
                  duration: 2, 
                  repeat: Infinity, 
                  ease: "linear",
                  repeatDelay: 3
                }}
                className="absolute inset-0 skew-x-12"
                style={{
                  background: isDark
                    ? "linear-gradient(90deg, rgba(0,0,0,0) 0%, rgba(255,255,255,0.3) 50%, rgba(0,0,0,0) 100%)"
                    : "linear-gradient(90deg, rgba(0,0,0,0) 0%, rgba(255,255,255,0.4) 50%, rgba(0,0,0,0) 100%)"
                }}
              />
            </motion.div>
            
            {/* ✅ ENHANCED: Theme-aware glow effect */}
            <motion.div
              className="absolute inset-0 rounded-full blur-md"
              style={{
                backgroundColor: color.includes('indigo') 
                  ? (isDark ? "rgba(99, 102, 241, 0.2)" : "rgba(99, 102, 241, 0.3)")
                  : (isDark ? "rgba(139, 92, 246, 0.2)" : "rgba(139, 92, 246, 0.3)")
              }}
              animate={{ opacity: isHovered ? (isDark ? 0.4 : 0.6) : 0 }}
              transition={{ duration: 0.3 }}
            />
          </div>
        </motion.div>
      </div>
    </motion.article>
  );
};

// ✅ MAIN: Enhanced Skills component with full theme integration
export default function Skills() {
  const { isDark } = useTheme(); // ✅ Use theme context
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-20%" });
  const controls = useAnimation();

  const groups = useMemo(() => {
    return Object.entries(site.skills || {}).map(([title, data]) => ({
      title,
      iconName: data.icon || "BadgeInfo",
      color: data.color || "from-indigo-500 to-purple-500",
      bgColor: data.bgColor || "from-indigo-500/10 to-purple-500/10",
      items: Array.isArray(data.skills) ? data.skills : []
    }));
  }, []);

  useEffect(() => {
    if (isInView) {
      controls.start("visible");
    }
  }, [isInView, controls]);

  // ✅ ENHANCED: Theme-aware empty state
  if (groups.length === 0) {
    return (
      <section 
        id="skills" 
        className={`py-20 ${
          isDark ? "bg-gray-900" : "bg-white"
        }`}
      >
        <div className="max-w-4xl mx-auto px-6 text-center">
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className={`w-24 h-24 mx-auto mb-6 rounded-2xl flex items-center justify-center ${
              isDark
                ? "bg-gradient-to-br from-indigo-900/30 to-purple-900/30"
                : "bg-gradient-to-br from-indigo-100 to-purple-100"
            }`}
          >
            <Lucide.Zap className="w-12 h-12 text-indigo-500" />
          </motion.div>
          <h2 className={`text-3xl font-bold mb-4 ${
            isDark ? "text-white" : "text-gray-900"
          }`}>
            Skills & Technologies
          </h2>
          <p className={isDark ? "text-gray-400" : "text-gray-600"}>
            Skills information will be available soon.
          </p>
        </div>
      </section>
    );
  }

  return (
    <section 
      id="skills" 
      className={`relative py-24 md:py-32 overflow-hidden ${
        isDark
          ? "bg-gradient-to-br from-gray-900 via-gray-800 to-indigo-950/30"
          : "bg-gradient-to-br from-gray-50 via-white to-indigo-50/30"
      }`}
      role="region"
      aria-labelledby="skills-heading"
    >
      {/* ✅ ENHANCED: Theme-aware background with better performance */}
      <div className="absolute inset-0">
        {/* ✅ ENHANCED: Theme-aware gradient orbs */}
        <motion.div 
          className="absolute top-20 -left-20 w-96 h-96 rounded-full blur-3xl opacity-30"
          style={{ 
            background: isDark
              ? "radial-gradient(circle, rgba(99, 102, 241, 0.1) 0%, rgba(0, 0, 0, 0) 70%)"
              : "radial-gradient(circle, rgba(99, 102, 241, 0.15) 0%, rgba(0, 0, 0, 0) 70%)"
          }}
          animate={{ 
            scale: [1, 1.1, 1],
            opacity: isDark ? [0.15, 0.3, 0.15] : [0.2, 0.4, 0.2]
          }}
          transition={{ duration: 8, repeat: Infinity }}
        />
        <motion.div 
          className="absolute bottom-20 -right-20 w-[500px] h-[500px] rounded-full blur-3xl opacity-30"
          style={{ 
            background: isDark
              ? "radial-gradient(circle, rgba(139, 92, 246, 0.1) 0%, rgba(0, 0, 0, 0) 70%)"
              : "radial-gradient(circle, rgba(139, 92, 246, 0.15) 0%, rgba(0, 0, 0, 0) 70%)"
          }}
          animate={{ 
            scale: [1, 1.2, 1],
            opacity: isDark ? [0.15, 0.25, 0.15] : [0.2, 0.3, 0.2]
          }}
          transition={{ duration: 10, repeat: Infinity, delay: 2 }}
        />
      </div>

      <FloatingParticles />

      <motion.div 
        ref={ref}
        className="relative max-w-7xl mx-auto px-6 lg:px-8"
        initial="hidden"
        animate={controls}
      >
        <SectionHeader />

        {/* Enhanced responsive grid */}
        <div className="grid lg:grid-cols-2 xl:grid-cols-3 gap-8 lg:gap-10 mb-20">
          {groups.map((group, idx) => (
            <SkillCard
              key={group.title}
              title={group.title}
              iconName={group.iconName}
              color={group.color}
              bgColor={group.bgColor}
              items={group.items}
              index={idx}
            />
          ))}
        </div>

        {/* ✅ ENHANCED: Theme-aware CTA */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5, duration: 0.8 }}
          className="text-center"
        >
          <motion.a
            href="#contact"
            whileHover={{ 
              scale: 1.05,
              y: -2,
              transition: { duration: 0.3 }
            }}
            whileTap={{ scale: 0.95 }}
            className="group inline-flex items-center gap-4 px-12 py-6 bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 text-white font-bold text-lg rounded-3xl shadow-2xl hover:shadow-4xl transition-all duration-500 relative overflow-hidden focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
          >
            <Lucide.Rocket className="w-6 h-6 relative z-10 group-hover:rotate-12 transition-transform duration-300" />
            <span className="relative z-10">Let's Build Something Amazing</span>
            <motion.div
              animate={{ rotate: [0, 360] }}
              transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
              className="relative z-10"
            >
              <Lucide.Sparkles className="w-6 h-6" />
            </motion.div>
            
            {/* ✅ ENHANCED: Hover background animation */}
            <motion.div
              className="absolute inset-0 bg-gradient-to-r from-purple-600 to-pink-600"
              initial={{ x: "-100%" }}
              whileHover={{ x: 0 }}
              transition={{ duration: 0.5 }}
            />
            
            {/* ✅ ENHANCED: Theme-aware shine effect */}
            <motion.div
              className="absolute inset-0"
              style={{
                background: isDark
                  ? "linear-gradient(90deg, rgba(0,0,0,0) 0%, rgba(255,255,255,0.15) 50%, rgba(0,0,0,0) 100%)"
                  : "linear-gradient(90deg, rgba(0,0,0,0) 0%, rgba(255,255,255,0.2) 50%, rgba(0,0,0,0) 100%)"
              }}
              animate={{ x: ['-200%', '200%'] }}
              transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
            />
          </motion.a>
        </motion.div>
      </motion.div>
    </section>
  );
}
