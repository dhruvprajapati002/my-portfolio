import { motion, useInView } from "framer-motion";
import { useRef, useState, useEffect, useMemo } from "react";
import { useTheme } from "../contexts/ThemeContext";
import Section from "./Section";
import { site } from "../data/site";
import { 
  User, 
  Code, 
  Sparkles, 
  ArrowRight, 
  Star, 
  Zap, 
  Heart,
  MapPin,
  Calendar,
  Trophy,
  Target,
  BookOpen,
  Award,
  Coffee,
  GraduationCap,
  Lightbulb
} from "lucide-react";

// ✅ UPDATED: Features reflecting aspiring developer journey
const getFeatures = (isDark) => [
  {
    icon: User,
    title: "Who I Am",
    description: `${site.summary || "Aspiring full‑stack developer with 1+ year of hands-on experience in MERN stack. Built secure, responsive applications through personal projects and internship experience."} I'm based in ${site.location || "Mahesana, India"} and passionate about turning ideas into digital reality.`,
    accent: "from-blue-500 to-cyan-500",
    bgAccent: isDark ? "rgba(59, 130, 246, 0.08)" : "rgba(59, 130, 246, 0.12)",
    hoverColor: "group-hover:text-blue-500"
  },
  {
    icon: Code,
    title: "Learning Journey",
    description: "Self-taught MERN stack developer with 1+ year of hands-on experience. Completed a professional internship and built multiple full-stack applications. Continuously learning and staying updated with modern development practices.",
    accent: "from-purple-500 to-pink-500", 
    bgAccent: isDark ? "rgba(139, 92, 246, 0.08)" : "rgba(139, 92, 246, 0.12)",
    hoverColor: "group-hover:text-purple-500"
  },
  {
    icon: Lightbulb,
    title: "My Approach",
    description: "Focus on writing clean, maintainable code with modern UI design principles. I believe in continuous learning, best practices, and building user-centric applications that solve real problems through innovative solutions.",
    accent: "from-orange-500 to-red-500",
    bgAccent: isDark ? "rgba(249, 115, 22, 0.08)" : "rgba(249, 115, 22, 0.12)",
    hoverColor: "group-hover:text-orange-500"
  },
];

// ✅ ENHANCED: Optimized floating icon with theme awareness
const FloatingIcon = ({ icon: Icon, delay = 0, className = "", isDark }) => (
  <motion.div
    initial={{ y: 0, opacity: 0.2 }}
    animate={{ 
      y: [-15, 15, -15],
      opacity: [0.2, 0.6, 0.2],
      rotate: [0, 8, -8, 0]
    }}
    transition={{
      duration: 6,
      delay,
      repeat: Infinity,
      ease: "easeInOut"
    }}
    className={`absolute pointer-events-none ${className}`}
    aria-hidden="true"
  >
    <Icon 
      className={`w-6 h-6 ${
        isDark 
          ? "text-indigo-400/40" 
          : "text-indigo-500/30"
      }`} 
    />
  </motion.div>
);

// ✅ ENHANCED: Stats counter with better accessibility
const StatsCounter = ({ value, label, suffix = "", delay = 0 }) => {
  const [count, setCount] = useState(0);
  const [hasAnimated, setHasAnimated] = useState(false);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  
  useEffect(() => {
    if (isInView && !hasAnimated && value > 0) {
      setHasAnimated(true);
      let startTime = null;
      const duration = 2000;
      
      const animate = (timestamp) => {
        if (!startTime) startTime = timestamp;
        const progress = Math.min((timestamp - startTime) / duration, 1);
        
        const easeOut = 1 - Math.pow(1 - progress, 3);
        setCount(Math.floor(easeOut * value));
        
        if (progress < 1) {
          requestAnimationFrame(animate);
        }
      };
      
      requestAnimationFrame(animate);
    }
  }, [isInView, hasAnimated, value]);
  
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay }}
      whileHover={{ scale: 1.05, y: -2 }}
      className="text-center group cursor-default"
      role="img"
      aria-label={`${value}${suffix} ${label}`}
    >
      <motion.div 
        className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent mb-2"
        animate={{ 
          backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"] 
        }}
        transition={{ 
          duration: 3, 
          repeat: Infinity, 
          ease: "linear" 
        }}
      >
        {count}{suffix}
      </motion.div>
      <div className="text-sm text-gray-600 dark:text-gray-400 font-medium">
        {label}
      </div>
    </motion.div>
  );
};

// ✅ UPDATED: Personal info reflecting current status
const PersonalInfo = () => {
  const { isDark } = useTheme();
  
  const infoItems = useMemo(() => [
    { 
      icon: MapPin, 
      text: site.location || "Mahesana, India", 
      color: "text-indigo-600 dark:text-indigo-400" 
    },
    { 
      icon: GraduationCap, 
      text: "Computer Science Student", 
      color: "text-purple-600 dark:text-purple-400" 
    },
    { 
      icon: Calendar, 
      text: "Open to Opportunities", 
      color: "text-green-600 dark:text-green-400" 
    }
  ], []);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.3 }}
      viewport={{ once: true }}
      className="flex flex-wrap justify-center gap-4 mb-12"
      role="list"
      aria-label="Personal information"
    >
      {infoItems.map((item, index) => (
        <motion.div
          key={item.text}
          initial={{ opacity: 0, scale: 0.8 }}
          whileInView={{ opacity: 1, scale: 1 }}
          whileHover={{ scale: 1.05, y: -2 }}
          transition={{ delay: index * 0.1, duration: 0.3 }}
          className={`flex items-center gap-2 px-4 py-2 rounded-full border transition-all duration-200 ${
            isDark
              ? "bg-gray-800/80 border-gray-700/60 hover:border-indigo-700"
              : "bg-white/80 border-gray-200/60 hover:border-indigo-200"
          } backdrop-blur-sm hover:shadow-lg`}
          role="listitem"
        >
          <item.icon className={`w-4 h-4 ${item.color}`} />
          <span className={`font-medium text-sm ${
            isDark ? "text-gray-300" : "text-gray-700"
          }`}>
            {item.text}
          </span>
        </motion.div>
      ))}
    </motion.div>
  );
};

// ✅ MAIN: Enhanced About component with updated positioning
export default function About() {
  const { isDark } = useTheme();
  const [hoveredCard, setHoveredCard] = useState(null);

  // ✅ UPDATED: Realistic stats reflecting actual experience
  const stats = useMemo(() => ({
    projects: site.stats?.projectsCompleted || 4, // ✅ Based on actual projects
    learning: site.stats?.yearsExperience || 1, // ✅ Changed from "experience" to "learning"
    technologies: site.stats?.technologiesUsed || 
      Object.values(site.skills || {}).reduce((total, group) => 
        total + (group.skills?.length || 0), 0
      ) || 20
  }), []);

  const features = useMemo(() => getFeatures(isDark), [isDark]);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.12,
        delayChildren: 0.1
      }
    }
  };

  const cardVariants = {
    hidden: { 
      opacity: 0, 
      y: 50,
      scale: 0.95,
      rotateX: 10
    },
    visible: { 
      opacity: 1, 
      y: 0,
      scale: 1,
      rotateX: 0,
      transition: {
        duration: 0.7,
        ease: [0.22, 1, 0.36, 1]
      }
    }
  };

  return (
    <Section 
      id="about" 
      title="About Me"
      subtitle="Get to know the person behind the code and my learning journey"
    >
      <div className="relative">
        {/* Background effects */}
        <motion.div
          className="absolute inset-0 overflow-hidden pointer-events-none"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 1 }}
          viewport={{ once: true }}
        >
          <FloatingIcon 
            icon={Star} 
            delay={0} 
            className="top-20 left-10" 
            isDark={isDark} 
          />
          <FloatingIcon 
            icon={Zap} 
            delay={1} 
            className="top-40 right-20" 
            isDark={isDark} 
          />
          <FloatingIcon 
            icon={Heart} 
            delay={2} 
            className="bottom-32 left-20" 
            isDark={isDark} 
          />
          <FloatingIcon 
            icon={Code} 
            delay={0.5} 
            className="bottom-20 right-10" 
            isDark={isDark} 
          />
          <FloatingIcon 
            icon={Target} 
            delay={1.5} 
            className="top-1/3 left-1/4" 
            isDark={isDark} 
          />
          <FloatingIcon 
            icon={BookOpen} 
            delay={0.8} 
            className="bottom-1/3 right-1/4" 
            isDark={isDark} 
          />
          
          {/* Theme-aware gradient orbs */}
          <motion.div
            animate={{ 
              rotate: 360,
              scale: [1, 1.1, 1]
            }}
            transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
            className="absolute top-1/4 left-1/4 w-64 h-64 rounded-full blur-3xl opacity-30"
            style={{ 
              background: `radial-gradient(circle, ${
                isDark 
                  ? "rgba(99, 102, 241, 0.1) 0%, rgba(0, 0, 0, 0) 70%"
                  : "rgba(99, 102, 241, 0.15) 0%, rgba(0, 0, 0, 0) 70%"
              })` 
            }}
          />
          <motion.div
            animate={{ 
              rotate: -360,
              scale: [1, 1.2, 1]
            }}
            transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
            className="absolute bottom-1/4 right-1/4 w-80 h-80 rounded-full blur-3xl opacity-30"
            style={{ 
              background: `radial-gradient(circle, ${
                isDark 
                  ? "rgba(139, 92, 246, 0.1) 0%, rgba(0, 0, 0, 0) 70%"
                  : "rgba(139, 92, 246, 0.15) 0%, rgba(0, 0, 0, 0) 70%"
              })` 
            }}
          />
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="relative z-10 mx-auto max-w-6xl"
        >
          {/* ✅ UPDATED: Header with aspiring developer focus */}
          <motion.header
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <motion.div 
              initial={{ scale: 0.8, opacity: 0 }}
              whileInView={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.2, duration: 0.5 }}
              viewport={{ once: true }}
              className={`inline-flex items-center gap-2 px-4 py-2 rounded-full mb-6 border ${
                isDark
                  ? "bg-gradient-to-r from-indigo-500/10 to-purple-500/10 border-indigo-700/30"
                  : "bg-gradient-to-r from-indigo-500/10 to-purple-500/10 border-indigo-200/30"
              }`}
            >
              <Sparkles className={`w-4 h-4 ${isDark ? "text-indigo-400" : "text-indigo-600"}`} />
              <span className={`text-sm font-semibold uppercase tracking-wide ${
                isDark ? "text-indigo-400" : "text-indigo-600"
              }`}>
                My Journey
              </span>
            </motion.div>
            
            <h2 className="text-4xl md:text-6xl font-bold mb-6">
              <span className="bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
                Meet {(site.name || "Dhruv").split(' ')[0]}
              </span>
            </h2>
            
            <motion.p 
              className={`text-xl max-w-3xl mx-auto leading-relaxed mb-8 ${
                isDark ? "text-gray-300" : "text-gray-600"
              }`}
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ delay: 0.4, duration: 0.8 }}
              viewport={{ once: true }}
            >
              {site.summary || "Aspiring full‑stack developer with 1+ year of hands-on experience in MERN stack. Built secure, responsive applications with authentication, CRUD operations, and modern deployments through personal projects and internship experience."}
            </motion.p>

            <PersonalInfo />
          </motion.header>

          {/* ✅ UPDATED: Stats section with realistic labels */}
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
            className="grid grid-cols-3 gap-4 md:gap-8 mb-16 max-w-2xl mx-auto"
            aria-labelledby="stats-heading"
          >
            <h3 id="stats-heading" className="sr-only">Learning Statistics</h3>
            <StatsCounter 
              value={stats.projects} 
              label="Projects Built" 
              delay={0} 
            />
            <StatsCounter 
              value={stats.learning} 
              label="Year Learning" // ✅ Changed from "Years Experience"
              suffix="+" 
              delay={0.1} 
            />
            <StatsCounter 
              value={stats.technologies} 
              label="Technologies" 
              suffix="+" 
              delay={0.2} 
            />
          </motion.section>

          {/* Feature cards */}
          <motion.section 
            variants={containerVariants}
            className="grid md:grid-cols-3 gap-8 mb-16"
            aria-labelledby="features-heading"
          >
            <h3 id="features-heading" className="sr-only">Key Features and Learning Journey</h3>
            {features.map((feature, index) => (
              <motion.article
                key={feature.title}
                variants={cardVariants}
                whileHover={{ 
                  y: -12,
                  scale: 1.02,
                  transition: { duration: 0.3 }
                }}
                onHoverStart={() => setHoveredCard(index)}
                onHoverEnd={() => setHoveredCard(null)}
                className="group relative h-full cursor-default"
              >
                <div className={`absolute inset-0 rounded-2xl backdrop-blur-sm shadow-xl group-hover:shadow-2xl transition-all duration-500 border ${
                  isDark
                    ? "bg-gray-800/90 border-gray-700/60"
                    : "bg-white/90 border-gray-200/60"
                }`} />
                
                <motion.div 
                  className="absolute inset-0 rounded-2xl transition-opacity duration-500"
                  animate={{
                    backgroundColor: hoveredCard === index ? feature.bgAccent : "rgba(0, 0, 0, 0)",
                    opacity: hoveredCard === index ? 1 : 0
                  }}
                  transition={{ duration: 0.3 }}
                />
                
                <motion.div
                  className="absolute inset-0 rounded-2xl transition-opacity duration-300"
                  animate={{
                    boxShadow: hoveredCard === index 
                      ? `inset 0 0 0 1px ${feature.accent.includes('blue') ? 'rgba(59, 130, 246, 0.3)' : 
                          feature.accent.includes('purple') ? 'rgba(139, 92, 246, 0.3)' : 
                          'rgba(249, 115, 22, 0.3)'}`
                      : "inset 0 0 0 0px rgba(0, 0, 0, 0)",
                    opacity: hoveredCard === index ? 1 : 0
                  }}
                />

                {/* Card Content */}
                <div className="relative p-6 lg:p-8 h-full flex flex-col">
                  {/* Icon */}
                  <motion.div
                    whileHover={{ 
                      scale: 1.1,
                      rotate: [0, -5, 5, 0],
                      y: -2
                    }}
                    transition={{ duration: 0.4 }}
                    className="mb-6 flex justify-center"
                  >
                    <div className={`relative p-4 rounded-2xl bg-gradient-to-r ${feature.accent} shadow-lg`}>
                      <feature.icon 
                        className="w-8 h-8 text-white" 
                        aria-hidden="true" 
                      />
                      
                      <motion.div
                        className="absolute inset-0 rounded-2xl blur-xl"
                        animate={{ 
                          opacity: hoveredCard === index ? 0.4 : 0,
                          scale: hoveredCard === index ? 1.3 : 1
                        }}
                        transition={{ duration: 0.3 }}
                        style={{
                          background: `linear-gradient(135deg, ${
                            feature.accent.includes('blue') ? '#3b82f6, #06b6d4' :
                            feature.accent.includes('purple') ? '#8b5cf6, #ec4899' :
                            '#f97316, #ef4444'
                          })`
                        }}
                      />
                    </div>
                  </motion.div>

                  {/* Content */}
                  <div className="text-center flex-1 flex flex-col justify-between">
                    <div>
                      <h4 className={`text-xl lg:text-2xl font-bold mb-4 transition-colors duration-300 ${
                        isDark ? "text-white" : "text-gray-900"
                      } ${feature.hoverColor}`}>
                        {feature.title}
                      </h4>
                      <p className={`leading-relaxed ${
                        isDark ? "text-gray-300" : "text-gray-600"
                      }`}>
                        {feature.description}
                      </p>
                    </div>

                    <motion.div
                      className="mt-6"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ 
                        opacity: hoveredCard === index ? 1 : 0,
                        y: hoveredCard === index ? 0 : 10
                      }}
                      transition={{ duration: 0.3 }}
                    >
                      <div className={`inline-flex items-center gap-2 text-sm font-semibold bg-gradient-to-r ${feature.accent} bg-clip-text text-transparent`}>
                        Learn More 
                        <ArrowRight className="w-4 h-4" />
                      </div>
                    </motion.div>
                  </div>
                </div>
              </motion.article>
            ))}
          </motion.section>

          {/* Skills preview */}
          {site.skills && Object.keys(site.skills).length > 0 && (
            <motion.section
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.6 }}
              viewport={{ once: true }}
              className="mb-16 text-center"
              aria-labelledby="skills-heading"
            >
              <h3 id="skills-heading" className={`text-2xl font-bold mb-8 ${
                isDark ? "text-white" : "text-gray-900"
              }`}>
                Technologies I Work With
              </h3>
              <div className="flex flex-wrap justify-center gap-3 max-w-4xl mx-auto">
                {Object.values(site.skills)
                  .flatMap(group => group.skills || [])
                  .slice(0, 12)
                  .map((skill, index) => (
                    <motion.span
                      key={typeof skill === 'string' ? skill : skill.name}
                      initial={{ opacity: 0, scale: 0.8 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      whileHover={{ scale: 1.1, y: -2 }}
                      transition={{ delay: index * 0.05, duration: 0.3 }}
                      viewport={{ once: true }}
                      className={`px-4 py-2 rounded-full text-sm font-medium border transition-all duration-200 cursor-default ${
                        isDark
                          ? "bg-gradient-to-r from-indigo-900/30 to-purple-900/30 text-indigo-300 border-indigo-800 hover:shadow-lg hover:shadow-indigo-500/25"
                          : "bg-gradient-to-r from-indigo-50 to-purple-50 text-indigo-700 border-indigo-100 hover:shadow-lg hover:shadow-indigo-500/25"
                      }`}
                    >
                      {typeof skill === 'string' ? skill : skill.name}
                    </motion.span>
                  ))}
              </div>
            </motion.section>
          )}

          {/* ✅ UPDATED: Bottom CTA with learning focus */}
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center"
          >
            <motion.a
              href="#contact"
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
              className="inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-bold rounded-2xl shadow-xl shadow-indigo-500/25 hover:shadow-2xl hover:shadow-indigo-500/40 transition-all duration-300 group focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
            >
              <Coffee className="w-5 h-5" />
              <span>Let's connect and build something amazing</span>
              <motion.div
                animate={{ x: [0, 4, 0] }}
                transition={{ duration: 1.5, repeat: Infinity }}
                className="group-hover:translate-x-1 transition-transform duration-200"
              >
                <ArrowRight className="w-5 h-5" />
              </motion.div>
            </motion.a>
          </motion.section>
        </motion.div>
      </div>
    </Section>
  );
}
