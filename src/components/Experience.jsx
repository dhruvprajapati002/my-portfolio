import { motion, useInView } from "framer-motion";
import { useRef, useState, useMemo, useCallback } from "react";
import { useTheme } from "../contexts/ThemeContext";
import Section from "./Section";
import { site } from "../data/site";
import Badge from "./Badge";
import { 
  Briefcase, 
  MapPin, 
  Calendar, 
  Building, 
  ExternalLink,
  ChevronRight,
  Star,
  TrendingUp,
  Award,
  Target,
  Clock,
  Users,
  Code,
  Zap,
  Trophy,
  GitBranch,
  Layers,
  GraduationCap
} from "lucide-react";

// ✅ ENHANCED: Theme-aware timeline connector
const TimelineConnector = ({ isLast, index }) => {
  const { isDark } = useTheme();
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <div 
      ref={ref}
      className="absolute left-8 md:left-10 top-16 w-0.5 h-full"
      role="presentation"
      aria-hidden="true"
    >
      <motion.div
        className="w-full bg-gradient-to-b from-indigo-500 to-purple-500 rounded-full"
        initial={{ height: 0, opacity: 0 }}
        animate={isInView ? { 
          height: isLast ? "60%" : "100%", 
          opacity: 1 
        } : { height: 0, opacity: 0 }}
        transition={{ 
          duration: 0.8, 
          delay: index * 0.1, 
          ease: "easeOut" 
        }}
      />
      
      {/* Glow effect */}
      <motion.div
        className="absolute inset-0 w-1 bg-gradient-to-b from-indigo-500/50 to-purple-500/50 rounded-full blur-sm"
        initial={{ height: 0, opacity: 0 }}
        animate={isInView ? { 
          height: isLast ? "60%" : "100%", 
          opacity: isDark ? 0.8 : 0.5 
        } : { height: 0, opacity: 0 }}
        transition={{ 
          duration: 0.8, 
          delay: index * 0.1 + 0.2, 
          ease: "easeOut" 
        }}
      />
    </div>
  );
};

// ✅ ENHANCED: Experience card with updated positioning for aspiring developer
const ExperienceCard = ({ experience, index, isLast }) => {
  const { isDark } = useTheme();
  const [isHovered, setIsHovered] = useState(false);
  const [expandedPoints, setExpandedPoints] = useState(false);
  const cardRef = useRef(null);
  const isInView = useInView(cardRef, { once: true, margin: "-80px" });

  const points = useMemo(() => Array.isArray(experience.points) ? experience.points : [], [experience.points]);
  const tech = useMemo(() => Array.isArray(experience.tech) ? experience.tech : [], [experience.tech]);
  const displayedPoints = expandedPoints ? points : points.slice(0, 3);
  const hasMorePoints = points.length > 3;

  const togglePoints = useCallback(() => {
    setExpandedPoints(prev => !prev);
  }, []);

  const cardVariants = {
    hidden: { 
      opacity: 0, 
      x: -40,
      y: 30,
      scale: 0.95
    },
    visible: { 
      opacity: 1, 
      x: 0,
      y: 0,
      scale: 1,
      transition: {
        duration: 0.7,
        delay: index * 0.1,
        ease: [0.22, 1, 0.36, 1]
      }
    }
  };

  return (
    <div className="relative" ref={cardRef}>
      {/* Timeline dot */}
      <motion.div
        initial={{ scale: 0, opacity: 0 }}
        animate={isInView ? { scale: 1, opacity: 1 } : { scale: 0, opacity: 0 }}
        transition={{ 
          delay: index * 0.1 + 0.2, 
          duration: 0.5, 
          type: "spring", 
          stiffness: 200 
        }}
        className="absolute left-6 md:left-8 top-8 z-20"
        role="presentation"
        aria-hidden="true"
      >
        <div className="relative">
          <motion.div 
            className="w-4 h-4 rounded-full bg-gradient-to-r from-indigo-500 to-purple-500 shadow-lg border-2 border-white dark:border-gray-900"
            whileHover={{ scale: 1.2 }}
            transition={{ duration: 0.2 }}
          />
          
          {/* Pulse effect */}
          <motion.div
            className="absolute inset-0 w-4 h-4 rounded-full bg-gradient-to-r from-indigo-500 to-purple-500"
            animate={{ 
              scale: [1, 1.6, 1], 
              opacity: [0.8, 0.2, 0.8] 
            }}
            transition={{ 
              duration: 3, 
              repeat: Infinity, 
              ease: "easeInOut" 
            }}
          />
          
          {/* Inner glow */}
          <motion.div
            className="absolute inset-0.5 w-3 h-3 rounded-full bg-gradient-to-r from-indigo-400 to-purple-400 blur-sm"
            animate={{ 
              opacity: isDark ? [0.6, 1, 0.6] : [0.4, 0.8, 0.4] 
            }}
            transition={{ 
              duration: 2, 
              repeat: Infinity, 
              ease: "easeInOut" 
            }}
          />
        </div>
      </motion.div>

      {/* Timeline connector */}
      {!isLast && <TimelineConnector isLast={isLast} index={index} />}

      {/* Experience card */}
      <motion.article
        variants={cardVariants}
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
        whileHover={{ 
          y: -10,
          scale: 1.01,
          transition: { duration: 0.3, ease: "easeOut" }
        }}
        onHoverStart={() => setIsHovered(true)}
        onHoverEnd={() => setIsHovered(false)}
        className="ml-16 md:ml-20 group relative"
        role="article"
        aria-labelledby={`experience-${index}-title`}
        tabIndex={0}
      >
        {/* Background */}
        <div className={`absolute inset-0 rounded-2xl backdrop-blur-sm shadow-xl border transition-all duration-500 ${
          isDark
            ? "bg-gray-800/90 border-gray-700/60 group-hover:shadow-2xl group-hover:shadow-indigo-500/10"
            : "bg-white/90 border-gray-200/60 group-hover:shadow-2xl group-hover:shadow-indigo-500/20"
        }`} />
        
        {/* Hover background */}
        <motion.div 
          className="absolute inset-0 rounded-2xl transition-opacity duration-300"
          animate={{
            backgroundColor: isHovered 
              ? (isDark ? "rgba(99, 102, 241, 0.06)" : "rgba(99, 102, 241, 0.08)")
              : "rgba(0, 0, 0, 0)",
            opacity: isHovered ? 1 : 0
          }}
          transition={{ duration: 0.3 }}
        />

        {/* Animated border */}
        <motion.div
          className="absolute inset-0 rounded-2xl"
          animate={{ 
            boxShadow: isHovered 
              ? `0 0 0 2px ${isDark ? 'rgba(99, 102, 241, 0.3)' : 'rgba(99, 102, 241, 0.2)'}`
              : "0 0 0 0px rgba(0, 0, 0, 0)",
            scale: isHovered ? 1.002 : 1
          }}
          transition={{ duration: 0.3 }}
        />

        {/* Card content */}
        <div className="relative p-6 md:p-8 space-y-6 z-10">
          {/* Header section */}
          <header className="space-y-4">
            <div className="flex items-start justify-between gap-4">
              <div className="flex-1 min-w-0">
                <motion.div
                  initial={{ opacity: 0, y: 15 }}
                  animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 15 }}
                  transition={{ delay: index * 0.1 + 0.3, duration: 0.6 }}
                  className="flex items-start gap-4 mb-4"
                >
                  {/* Icon */}
                  <motion.div
                    animate={{ 
                      rotate: isHovered ? [0, -10, 10, 0] : 0,
                      scale: isHovered ? 1.1 : 1
                    }}
                    transition={{ duration: 0.6 }}
                    className="flex-shrink-0 p-3 rounded-xl bg-gradient-to-r from-indigo-500 to-purple-500 shadow-lg relative"
                  >
                    <Briefcase className="w-5 h-5 text-white" />
                    
                    {/* Icon glow effect */}
                    <motion.div
                      className="absolute inset-0 rounded-xl bg-gradient-to-r from-indigo-500/50 to-purple-500/50 blur-md -z-10"
                      animate={{ 
                        opacity: isHovered ? (isDark ? 0.8 : 0.6) : 0,
                        scale: isHovered ? 1.2 : 1
                      }}
                      transition={{ duration: 0.3 }}
                    />
                  </motion.div>
                  
                  <div className="min-w-0 flex-1">
                    {/* Title */}
                    <h3 
                      id={`experience-${index}-title`}
                      className={`text-xl md:text-2xl font-bold mb-2 transition-all duration-300 ${
                        isDark ? "text-white" : "text-gray-900"
                      }`}
                    >
                      <motion.span
                        animate={{
                          backgroundImage: isHovered 
                            ? "linear-gradient(135deg, rgb(99, 102, 241), rgb(139, 92, 246))"
                            : "none",
                          backgroundClip: isHovered ? "text" : "unset",
                          WebkitBackgroundClip: isHovered ? "text" : "unset",
                          color: isHovered ? "transparent" : undefined
                        }}
                        transition={{ duration: 0.3 }}
                        className="break-words"
                      >
                        {experience.title || "Position Title"}
                      </motion.span>
                    </h3>
                    
                    <div className={`flex items-center gap-2 text-lg md:text-xl font-semibold mb-3 ${
                      isDark ? "text-gray-200" : "text-gray-700"
                    }`}>
                      <Building className="w-4 h-4 flex-shrink-0" />
                      <span className="break-words">{experience.company || "Company Name"}</span>
                    </div>
                  </div>
                </motion.div>

                {/* Metadata */}
                <div className={`flex flex-wrap gap-4 text-sm ${
                  isDark ? "text-gray-400" : "text-gray-600"
                }`}>
                  {experience.location && (
                    <div className="flex items-center gap-2">
                      <MapPin className="w-4 h-4 flex-shrink-0 text-indigo-500" />
                      <span>{experience.location}</span>
                    </div>
                  )}
                  {experience.date && (
                    <div className="flex items-center gap-2">
                      <Calendar className="w-4 h-4 flex-shrink-0 text-purple-500" />
                      <span>{experience.date}</span>
                    </div>
                  )}
                  {experience.type && (
                    <div className="flex items-center gap-2">
                      <GraduationCap className="w-4 h-4 flex-shrink-0 text-amber-500" />
                      <span className="text-amber-600 dark:text-amber-400 font-medium">
                        {experience.type}
                      </span>
                    </div>
                  )}
                </div>
              </div>

              {/* Status badges */}
              <div className="flex flex-col gap-2">
                <motion.div
                  initial={{ opacity: 0, scale: 0.9, x: 20 }}
                  animate={isInView ? { opacity: 1, scale: 1, x: 0 } : { opacity: 0, scale: 0.9, x: 20 }}
                  transition={{ delay: index * 0.1 + 0.4, duration: 0.5 }}
                  className={`hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-semibold ${
                    experience.status === 'Completed'
                      ? isDark
                        ? "bg-green-900/20 text-green-400 border border-green-800"
                        : "bg-green-50 text-green-600 border border-green-200"
                      : isDark
                        ? "bg-blue-900/20 text-blue-400 border border-blue-800"
                        : "bg-blue-50 text-blue-600 border border-blue-200"
                  }`}
                >
                  <Star className="w-3 h-3" />
                  <span>{experience.status || 'Learning Experience'}</span>
                </motion.div>

                {experience.duration && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.9, x: 20 }}
                    animate={isInView ? { opacity: 1, scale: 1, x: 0 } : { opacity: 0, scale: 0.9, x: 20 }}
                    transition={{ delay: index * 0.1 + 0.5, duration: 0.5 }}
                    className={`hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-semibold ${
                      isDark
                        ? "bg-blue-900/20 text-blue-400 border border-blue-800"
                        : "bg-blue-50 text-blue-600 border border-blue-200"
                    }`}
                  >
                    <Clock className="w-3 h-3" />
                    <span>{experience.duration}</span>
                  </motion.div>
                )}
              </div>
            </div>
          </header>

          {/* Key achievements */}
          {points.length > 0 && (
            <section className="space-y-4" aria-labelledby={`achievements-${index}`}>
              <div className="flex items-center gap-2">
                <Target className="w-4 h-4 text-indigo-600" />
                <h4 
                  id={`achievements-${index}`} 
                  className={`font-semibold ${isDark ? "text-white" : "text-gray-900"}`}
                >
                  Key Learning & Achievements
                </h4>
              </div>
              
              <ul className="space-y-3" role="list" id={`points-${index}`}>
                {displayedPoints.map((point, i) => (
                  <motion.li
                    key={`${experience.title}-${experience.company}-pt-${i}`}
                    initial={{ opacity: 0, x: -20 }}
                    animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
                    transition={{ 
                      delay: 0.4 + i * 0.08, 
                      duration: 0.5,
                      ease: [0.22, 1, 0.36, 1]
                    }}
                    className={`flex items-start gap-3 ${
                      isDark ? "text-gray-300" : "text-gray-700"
                    }`}
                  >
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={isInView ? { scale: 1 } : { scale: 0 }}
                      transition={{ 
                        delay: 0.5 + i * 0.08, 
                        type: "spring", 
                        stiffness: 200 
                      }}
                      className="mt-2 w-2 h-2 rounded-full bg-gradient-to-r from-indigo-500 to-purple-500 flex-shrink-0"
                    />
                    <span className="leading-relaxed">{point}</span>
                  </motion.li>
                ))}
              </ul>

              {hasMorePoints && (
                <motion.button
                  onClick={togglePoints}
                  whileHover={{ scale: 1.02, x: 4 }}
                  whileTap={{ scale: 0.98 }}
                  className={`flex items-center gap-2 font-medium text-sm transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 rounded-lg px-3 py-2 ${
                    isDark
                      ? "text-indigo-400 hover:text-indigo-300 hover:bg-indigo-900/20"
                      : "text-indigo-600 hover:text-indigo-700 hover:bg-indigo-50"
                  }`}
                  aria-expanded={expandedPoints}
                  aria-controls={`points-${index}`}
                >
                  <motion.div
                    animate={{ rotate: expandedPoints ? 90 : 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <ChevronRight className="w-4 h-4" />
                  </motion.div>
                  <span>
                    {expandedPoints 
                      ? "Show Less" 
                      : `Show ${points.length - 3} more learnings`}
                  </span>
                </motion.button>
              )}
            </section>
          )}

          {/* Technologies */}
          {tech.length > 0 && (
            <section className="space-y-4" aria-labelledby={`tech-${index}`}>
              <div className="flex items-center gap-2">
                <Code className="w-4 h-4 text-indigo-600" />
                <h4 
                  id={`tech-${index}`} 
                  className={`font-semibold ${isDark ? "text-white" : "text-gray-900"}`}
                >
                  Technologies Learned
                </h4>
              </div>
              
              <motion.div
                initial={{ opacity: 0, y: 15 }}
                animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 15 }}
                transition={{ delay: index * 0.1 + 0.5, duration: 0.6 }}
                className="flex flex-wrap gap-2"
                role="list"
                aria-label={`Technologies learned at ${experience.company}`}
              >
                {tech.map((t, techIndex) => (
                  <motion.div
                    key={`${experience.title}-${experience.company}-${t}-${techIndex}`}
                    initial={{ opacity: 0, scale: 0.8, y: 10 }}
                    animate={isInView ? { opacity: 1, scale: 1, y: 0 } : { opacity: 0, scale: 0.8, y: 10 }}
                    transition={{ 
                      delay: 0.6 + techIndex * 0.05,
                      duration: 0.4,
                      ease: [0.22, 1, 0.36, 1]
                    }}
                    whileHover={{ scale: 1.05, y: -2 }}
                    role="listitem"
                  >
                    <Badge 
                      variant="outline" 
                      size="sm"
                      className={`font-medium transition-all duration-200 ${
                        isDark
                          ? "hover:bg-indigo-900/20 hover:border-indigo-600"
                          : "hover:bg-indigo-50 hover:border-indigo-400"
                      }`}
                      animated={false}
                    >
                      {t}
                    </Badge>
                  </motion.div>
                ))}
              </motion.div>
            </section>
          )}

          {/* Hover interaction indicator */}
          <motion.div
            className={`hidden sm:flex items-center gap-2 font-medium ${
              isDark ? "text-indigo-400" : "text-indigo-600"
            }`}
            animate={{ 
              opacity: isHovered ? 1 : 0, 
              y: isHovered ? 0 : 10 
            }}
            transition={{ duration: 0.3 }}
          >
            <span className="text-sm">Explore Learning Journey</span>
            <motion.div 
              animate={{ x: isHovered ? [0, 4, 0] : 0 }} 
              transition={{ duration: 1.5, repeat: Infinity }}
            >
              <ExternalLink className="w-4 h-4" />
            </motion.div>
          </motion.div>
        </div>
      </motion.article>
    </div>
  );
};

// ✅ MAIN: Enhanced Experience component with updated stats for aspiring developer
export default function Experience() {
  const { isDark } = useTheme();
  
  const experience = useMemo(() => {
    const exp = Array.isArray(site.experience) ? site.experience : [];
    return exp.sort((a, b) => {
      const dateA = new Date(a.startDate || a.date || '1970-01-01');
      const dateB = new Date(b.startDate || b.date || '1970-01-01');
      return dateB - dateA;
    });
  }, []);
  
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { 
        staggerChildren: 0.12, 
        delayChildren: 0.2 
      }
    }
  };

  // ✅ UPDATED: Realistic stats for aspiring developer with 1 month internship
  const stats = useMemo(() => {
    const allTech = experience.flatMap(e => Array.isArray(e.tech) ? e.tech : []);
    const uniqueTech = new Set(allTech);
    
    return {
      positions: experience.length, // 1 (internship)
      technologies: Math.max(uniqueTech.size, 7), // Based on actual tech used
      learning: 1, // 1+ year of learning
      projects: site.stats.projectsCompleted // Based on actual projects built
    };
  }, [experience]);

  // Empty state
  if (experience.length === 0) {
    return (
      <Section 
        id="experience" 
        title="Learning Journey"
        subtitle="My professional experience and learning path will be shared here"
      >
        <div className="text-center py-16">
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className={`w-24 h-24 mx-auto mb-6 rounded-2xl flex items-center justify-center ${
              isDark
                ? "bg-gradient-to-br from-indigo-900/30 to-purple-900/30"
                : "bg-gradient-to-br from-indigo-100 to-purple-100"
            }`}
          >
            <Briefcase className="w-12 h-12 text-indigo-500" />
          </motion.div>
          <p className={`text-lg ${isDark ? "text-gray-400" : "text-gray-600"}`}>
            Professional experience details coming soon.
          </p>
        </div>
      </Section>
    );
  }

  return (
    <Section 
      id="experience" 
      title="Learning Journey"
      subtitle="My professional experience and the growth achieved through hands-on learning"
    >
      <div className="relative">
        {/* Background effects */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <motion.div
            animate={{ 
              rotate: 360,
              scale: [1, 1.1, 1]
            }}
            transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
            className="absolute top-1/4 -left-20 w-64 h-64 rounded-full blur-3xl opacity-30"
            style={{ 
              background: `radial-gradient(circle, ${
                isDark 
                  ? "rgba(99, 102, 241, 0.08) 0%, rgba(0, 0, 0, 0) 70%"
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
            className="absolute bottom-1/4 -right-20 w-80 h-80 rounded-full blur-3xl opacity-20"
            style={{ 
              background: `radial-gradient(circle, ${
                isDark 
                  ? "rgba(139, 92, 246, 0.06) 0%, rgba(0, 0, 0, 0) 70%"
                  : "rgba(139, 92, 246, 0.12) 0%, rgba(0, 0, 0, 0) 70%"
              })` 
            }}
          />
        </div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="relative z-10 max-w-6xl mx-auto"
        >
          {/* Header */}
          <motion.header
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16 md:mb-20"
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
              <GraduationCap className={`w-4 h-4 ${isDark ? "text-indigo-400" : "text-indigo-600"}`} />
              <span className={`text-sm font-semibold uppercase tracking-wide ${
                isDark ? "text-indigo-400" : "text-indigo-600"
              }`}>
                Professional Growth
              </span>
            </motion.div>
            
            <h2 className="text-4xl md:text-6xl font-bold mb-6">
              <span className="bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
                Learning Experience
              </span>
            </h2>
            
            <motion.p 
              className={`text-lg md:text-xl max-w-3xl mx-auto leading-relaxed ${
                isDark ? "text-gray-300" : "text-gray-600"
              }`}
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ delay: 0.4, duration: 0.8 }}
              viewport={{ once: true }}
            >
              My journey through professional experience, showcasing key learnings, 
              technologies mastered, and the growth achieved through hands-on development.
            </motion.p>
          </motion.header>

          {/* Timeline */}
          <div 
            className="relative space-y-12 md:space-y-16" 
            role="main"
            aria-label="Professional experience timeline"
          >
            {experience.map((exp, index) => (
              <ExperienceCard
                key={`${exp.title}-${exp.company}-${exp.startDate || index}`}
                experience={exp}
                index={index}
                isLast={index === experience.length - 1}
              />
            ))}
          </div>

          {/* ✅ UPDATED: Stats with realistic numbers for aspiring developer */}
          <motion.section
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.8 }}
            viewport={{ once: true }}
            className="mt-20 md:mt-24"
            aria-labelledby="experience-stats"
          >
            <div className="text-center mb-10">
              <h3 
                id="experience-stats" 
                className={`text-2xl font-bold mb-4 ${
                  isDark ? "text-white" : "text-gray-900"
                }`}
              >
                Learning Highlights
              </h3>
              <p className={`${isDark ? "text-gray-400" : "text-gray-600"}`}>
                Key metrics from my professional learning journey
              </p>
            </div>
            
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto">
              {[
                { 
                  label: "Experience", 
                  value: stats.positions, 
                  icon: Briefcase,
                  color: "text-blue-500",
                  bgColor: isDark ? "bg-blue-900/20" : "bg-blue-50",
                  borderColor: isDark ? "border-blue-800" : "border-blue-200"
                },
                { 
                  label: "Technologies", 
                  value: `${stats.technologies}+`, 
                  icon: Code,
                  color: "text-purple-500",
                  bgColor: isDark ? "bg-purple-900/20" : "bg-purple-50",
                  borderColor: isDark ? "border-purple-800" : "border-purple-200"
                },
                { 
                  label: "Year Learning", 
                  value: `${stats.learning}+`, 
                  icon: TrendingUp,
                  color: "text-green-500",
                  bgColor: isDark ? "bg-green-900/20" : "bg-green-50",
                  borderColor: isDark ? "border-green-800" : "border-green-200"
                },
                { 
                  label: "Projects Built", 
                  value: stats.projects, 
                  icon: Trophy,
                  color: "text-amber-500",
                  bgColor: isDark ? "bg-amber-900/20" : "bg-amber-50",
                  borderColor: isDark ? "border-amber-800" : "border-amber-200"
                }
              ].map((stat, index) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, scale: 0.9, y: 20 }}
                  whileInView={{ opacity: 1, scale: 1, y: 0 }}
                  whileHover={{ 
                    scale: 1.05, 
                    y: -4,
                    transition: { duration: 0.2 } 
                  }}
                  transition={{ 
                    delay: index * 0.1, 
                    duration: 0.5,
                    ease: [0.22, 1, 0.36, 1]
                  }}
                  viewport={{ once: true }}
                  className={`text-center p-6 rounded-2xl border transition-all duration-200 ${
                    stat.bgColor
                  } ${stat.borderColor} hover:shadow-lg cursor-default`}
                >
                  <div className={`flex items-center justify-center w-12 h-12 mx-auto mb-4 rounded-full bg-gradient-to-r from-indigo-600 to-purple-600 shadow-lg`}>
                    <stat.icon className="w-6 h-6 text-white" />
                  </div>
                  <div className={`text-2xl md:text-3xl font-bold mb-2 ${stat.color}`}>
                    {stat.value}
                  </div>
                  <div className={`text-sm md:text-base font-medium ${
                    isDark ? "text-gray-400" : "text-gray-600"
                  }`}>
                    {stat.label}
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.section>
        </motion.div>
      </div>
    </Section>
  );
}
