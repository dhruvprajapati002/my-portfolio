// src/components/Education.jsx
import { motion, useInView } from "framer-motion";
import { 
  GraduationCap, 
  Calendar, 
  MapPin, 
  Award, 
  BookOpen, 
  Users, 
  Trophy,
  CheckCircle,
  Clock,
  Star,
  Sparkles,
  Target,
  ChevronDown,
  ExternalLink,
  Zap
} from "lucide-react";
import { useRef, useState } from "react";
import { useTheme } from "../contexts/ThemeContext";
import { site } from "../data/site";

// ✅ REDESIGNED: Modern timeline connector with animated gradient
const TimelineConnector = ({ isLast, index }) => {
  const { isDark } = useTheme();
  
  return (
    <div className="absolute left-8 top-20 w-0.5 h-full z-0">
      {!isLast && (
        <motion.div
          className="w-full rounded-full overflow-hidden"
          initial={{ height: 0 }}
          whileInView={{ height: "calc(100% - 80px)" }}
          viewport={{ once: true }}
          transition={{ duration: 1.2, delay: index * 0.3, ease: "easeOut" }}
        >
          {/* Main line */}
          <div className={`w-full h-full ${
            isDark 
              ? "bg-gradient-to-b from-indigo-500/60 via-purple-500/60 to-pink-500/60" 
              : "bg-gradient-to-b from-indigo-400/80 via-purple-400/80 to-pink-400/80"
          }`} />
          
          {/* Animated flowing effect */}
          <motion.div
            className="absolute inset-0 w-full bg-gradient-to-b from-white/40 via-white/20 to-transparent"
            animate={{ y: ["-100%", "200%"] }}
            transition={{
              duration: 3,
              repeat: Infinity,
              ease: "easeInOut",
              delay: index * 0.5
            }}
          />
        </motion.div>
      )}
    </div>
  );
};

// ✅ REDESIGNED: Enhanced education card with modern design
const EducationCard = ({ education, index, isLast }) => {
  const { isDark } = useTheme();
  const [isHovered, setIsHovered] = useState(false);
  const [showDetails, setShowDetails] = useState(false);
  const cardRef = useRef(null);
  const isInView = useInView(cardRef, { once: true, margin: "-50px" });

  const statusConfig = {
    'Completed': { 
      color: 'text-emerald-600 dark:text-emerald-400',
      bg: 'bg-emerald-50 dark:bg-emerald-900/20',
      border: 'border-emerald-200 dark:border-emerald-800',
      icon: CheckCircle,
      gradient: 'from-emerald-500 to-teal-500'
    },
    'In Progress': { 
      color: 'text-blue-600 dark:text-blue-400',
      bg: 'bg-blue-50 dark:bg-blue-900/20',
      border: 'border-blue-200 dark:border-blue-800',
      icon: Clock,
      gradient: 'from-blue-500 to-indigo-500'
    }
  };

  const currentStatus = statusConfig[education.status] || statusConfig['Completed'];

  return (
    <div className="relative pl-24 pb-20 group" ref={cardRef}>
      {/* Timeline connector */}
      <TimelineConnector isLast={isLast} index={index} />

      {/* Timeline icon */}
      <motion.div
        initial={{ scale: 0, rotate: -180 }}
        whileInView={{ scale: 1, rotate: 0 }}
        viewport={{ once: true }}
        transition={{ 
          duration: 0.8, 
          delay: index * 0.2,
          type: "spring",
          stiffness: 200
        }}
        whileHover={{ scale: 1.15, rotate: 5 }}
        className="absolute left-2 top-8 w-16 h-16 z-10"
      >
        {/* Main icon container */}
        <div className="relative w-full h-full rounded-3xl bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-600 shadow-2xl flex items-center justify-center overflow-hidden">
          <GraduationCap className="w-8 h-8 text-white relative z-10" />
          
          {/* Animated background pattern */}
          <motion.div
            className="absolute inset-0 opacity-30"
            animate={{ rotate: 360 }}
            transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          >
            <div className="w-full h-full bg-gradient-to-br from-white/20 to-transparent" />
          </motion.div>
          
          {/* Pulsing ring */}
          <motion.div
            className="absolute -inset-2 rounded-3xl border-2 border-indigo-400/50"
            animate={{
              scale: [1, 1.3, 1],
              opacity: [0.8, 0.2, 0.8]
            }}
            transition={{
              duration: 2.5,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
        </div>
      </motion.div>

      {/* Main card */}
      <motion.article
        initial={{ opacity: 0, x: -30, y: 20 }}
        whileInView={{ opacity: 1, x: 0, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ 
          duration: 0.8, 
          delay: index * 0.2,
          ease: [0.22, 1, 0.36, 1]
        }}
        whileHover={{ 
          y: -8,
          scale: 1.01,
          transition: { duration: 0.4, ease: "easeOut" }
        }}
        onHoverStart={() => setIsHovered(true)}
        onHoverEnd={() => setIsHovered(false)}
        className={`relative rounded-3xl p-8 md:p-10 backdrop-blur-xl border shadow-xl transition-all duration-500 overflow-hidden ${
          isDark
            ? "bg-gray-800/80 border-gray-700/50 hover:bg-gray-800/90 hover:border-gray-600/60"
            : "bg-white/90 border-gray-200/60 hover:bg-white/95 hover:border-gray-300/80"
        } hover:shadow-2xl hover:shadow-indigo-500/10`}
        role="article"
        aria-labelledby={`education-${index}-title`}
      >
        {/* Animated background gradient */}
        <motion.div
          className="absolute inset-0 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-700"
          style={{
            background: isDark
              ? "radial-gradient(circle at 50% 0%, rgba(99, 102, 241, 0.03), rgba(139, 92, 246, 0.03), transparent 70%)"
              : "radial-gradient(circle at 50% 0%, rgba(99, 102, 241, 0.05), rgba(139, 92, 246, 0.05), transparent 70%)"
          }}
        />

        {/* Floating particles effect */}
        <div className="absolute inset-0 overflow-hidden rounded-3xl pointer-events-none">
          {[...Array(6)].map((_, i) => (
            <motion.div
              key={i}
              className={`absolute w-1 h-1 rounded-full ${
                isDark ? "bg-indigo-400/30" : "bg-indigo-500/40"
              }`}
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
              }}
              animate={{
                y: [0, -20, 0],
                opacity: isHovered ? [0.3, 0.8, 0.3] : 0,
                scale: [0.5, 1.5, 0.5]
              }}
              transition={{
                duration: 3 + Math.random() * 2,
                repeat: Infinity,
                delay: i * 0.5,
                ease: "easeInOut"
              }}
            />
          ))}
        </div>

        {/* Header Section */}
        <div className="relative z-10 mb-8">
          <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-6">
            <div className="flex-1">
              {/* Title and Status */}
              <div className="flex flex-wrap items-center gap-4 mb-4">
                <motion.h3
                  id={`education-${index}-title`}
                  className={`text-2xl md:text-3xl font-black ${
                    isDark ? "text-white" : "text-gray-900"
                  }`}
                  animate={{
                    backgroundImage: isHovered 
                      ? "linear-gradient(135deg, rgb(99, 102, 241), rgb(139, 92, 246), rgb(236, 72, 153))"
                      : "none",
                    backgroundClip: isHovered ? "text" : "unset",
                    WebkitBackgroundClip: isHovered ? "text" : "unset",
                    color: isHovered ? "transparent" : undefined
                  }}
                  transition={{ duration: 0.5 }}
                >
                  {education.degree}
                </motion.h3>
                
                {/* Enhanced Status Badge */}
                <motion.div
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  className={`inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-bold border shadow-sm ${
                    currentStatus.bg
                  } ${currentStatus.color} ${currentStatus.border}`}
                >
                  <currentStatus.icon className="w-4 h-4" />
                  {education.status}
                  <motion.div
                    className={`w-2 h-2 rounded-full bg-gradient-to-r ${currentStatus.gradient}`}
                    animate={{
                      scale: [1, 1.5, 1],
                      opacity: [0.7, 1, 0.7]
                    }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      ease: "easeInOut"
                    }}
                  />
                </motion.div>
              </div>

              {/* Field of Study */}
              <motion.p 
                className={`text-xl font-bold mb-6 ${
                  isDark ? "text-indigo-300" : "text-indigo-600"
                }`}
                whileHover={{ x: 4 }}
                transition={{ duration: 0.2 }}
              >
                {education.field}
              </motion.p>

              {/* Institution Details */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <motion.div 
                  whileHover={{ scale: 1.05, y: -2 }}
                  className={`flex items-center gap-3 p-3 rounded-xl ${
                    isDark ? "bg-gray-700/50" : "bg-gray-100/80"
                  }`}
                >
                  <BookOpen className="w-5 h-5 text-indigo-500 flex-shrink-0" />
                  <div>
                    <div className="text-xs font-medium text-gray-500 uppercase tracking-wide">School</div>
                    <div className={`text-sm font-semibold ${
                      isDark ? "text-white" : "text-gray-900"
                    }`}>
                      {education.school}
                    </div>
                  </div>
                </motion.div>

                <motion.div 
                  whileHover={{ scale: 1.05, y: -2 }}
                  className={`flex items-center gap-3 p-3 rounded-xl ${
                    isDark ? "bg-gray-700/50" : "bg-gray-100/80"
                  }`}
                >
                  <MapPin className="w-5 h-5 text-purple-500 flex-shrink-0" />
                  <div>
                    <div className="text-xs font-medium text-gray-500 uppercase tracking-wide">Location</div>
                    <div className={`text-sm font-semibold ${
                      isDark ? "text-white" : "text-gray-900"
                    }`}>
                      {education.location}
                    </div>
                  </div>
                </motion.div>

                <motion.div 
                  whileHover={{ scale: 1.05, y: -2 }}
                  className={`flex items-center gap-3 p-3 rounded-xl ${
                    isDark ? "bg-gray-700/50" : "bg-gray-100/80"
                  }`}
                >
                  <Calendar className="w-5 h-5 text-pink-500 flex-shrink-0" />
                  <div>
                    <div className="text-xs font-medium text-gray-500 uppercase tracking-wide">Duration</div>
                    <div className={`text-sm font-semibold ${
                      isDark ? "text-white" : "text-gray-900"
                    }`}>
                      {education.date}
                    </div>
                  </div>
                </motion.div>
              </div>
            </div>

            {/* Grade/Score Display */}
            {(education.gpa || education.percentage) && (
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                whileHover={{ scale: 1.1, rotate: 3 }}
                transition={{ duration: 0.4 }}
                className={`p-6 rounded-2xl text-center border-2 ${
                  isDark 
                    ? "bg-gradient-to-br from-gray-700/50 to-gray-800/50 border-gray-600/50" 
                    : "bg-gradient-to-br from-gray-50 to-white border-gray-200/50"
                } shadow-lg backdrop-blur-sm`}
              >
                <div className={`text-3xl md:text-4xl font-black mb-2 bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent`}>
                  {education.gpa || education.percentage}
                </div>
                <div className={`text-sm font-bold uppercase tracking-widest ${
                  isDark ? "text-gray-400" : "text-gray-500"
                }`}>
                  {education.gpa ? "CGPA" : "Score"}
                </div>
              </motion.div>
            )}
          </div>
        </div>

        {/* Description */}
        <motion.p 
          className={`text-lg leading-relaxed mb-8 ${
            isDark ? "text-gray-300" : "text-gray-600"
          }`}
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.6 }}
        >
          {education.description}
        </motion.p>

        {/* Enhanced Toggle Button */}
        <motion.button
          onClick={() => setShowDetails(!showDetails)}
          whileHover={{ scale: 1.05, x: 4 }}
          whileTap={{ scale: 0.95 }}
          className={`group inline-flex items-center gap-3 px-6 py-3 rounded-xl font-semibold transition-all duration-300 ${
            showDetails 
              ? (isDark ? "bg-indigo-600 text-white" : "bg-indigo-600 text-white")
              : (isDark ? "bg-gray-700/50 text-indigo-400 hover:bg-indigo-600/20" : "bg-gray-100 text-indigo-600 hover:bg-indigo-50")
          }`}
        >
          <Target className="w-5 h-5" />
          <span>{showDetails ? "Hide Details" : "Show Details"}</span>
          <motion.div
            animate={{ rotate: showDetails ? 180 : 0 }}
            transition={{ duration: 0.3 }}
          >
            <ChevronDown className="w-4 h-4" />
          </motion.div>
        </motion.button>

        {/* Expandable Details Section */}
        <motion.div
          initial={false}
          animate={{
            height: showDetails ? "auto" : 0,
            opacity: showDetails ? 1 : 0
          }}
          transition={{ duration: 0.4, ease: "easeInOut" }}
          className="overflow-hidden"
        >
          <div className="pt-8 space-y-8">
            {/* Subjects Grid */}
            {education.subjects && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: showDetails ? 1 : 0, y: showDetails ? 0 : 20 }}
                transition={{ delay: 0.1, duration: 0.3 }}
              >
                <h4 className={`text-xl font-bold mb-6 flex items-center gap-3 ${
                  isDark ? "text-white" : "text-gray-900"
                }`}>
                  <div className="p-2 rounded-lg bg-gradient-to-r from-indigo-500 to-purple-600">
                    <BookOpen className="w-5 h-5 text-white" />
                  </div>
                  Key Subjects
                </h4>
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
                  {education.subjects.map((subject, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, scale: 0.8, y: 10 }}
                      animate={{ opacity: 1, scale: 1, y: 0 }}
                      transition={{ delay: 0.1 * i, duration: 0.3 }}
                      whileHover={{ scale: 1.05, y: -2 }}
                      className={`p-4 rounded-xl text-center font-medium text-sm border transition-all duration-200 ${
                        isDark
                          ? "bg-gray-700/60 text-gray-200 border-gray-600/50 hover:bg-gray-600/60"
                          : "bg-gray-50 text-gray-700 border-gray-200 hover:bg-white hover:shadow-md"
                      }`}
                    >
                      {subject}
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            )}

            {/* Achievements Section */}
            {education.achievements && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: showDetails ? 1 : 0, y: showDetails ? 0 : 20 }}
                transition={{ delay: 0.2, duration: 0.3 }}
              >
                <h4 className={`text-xl font-bold mb-6 flex items-center gap-3 ${
                  isDark ? "text-white" : "text-gray-900"
                }`}>
                  <div className="p-2 rounded-lg bg-gradient-to-r from-amber-500 to-orange-500">
                    <Trophy className="w-5 h-5 text-white" />
                  </div>
                  Achievements
                </h4>
                <div className="space-y-4">
                  {education.achievements.map((achievement, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.1 * i, duration: 0.4 }}
                      whileHover={{ x: 6 }}
                      className={`flex items-start gap-4 p-4 rounded-xl ${
                        isDark ? "bg-gray-700/40" : "bg-gray-50/80"
                      } group hover:shadow-md transition-all duration-200`}
                    >
                      <motion.div
                        whileHover={{ rotate: 360, scale: 1.2 }}
                        transition={{ duration: 0.5 }}
                        className="p-2 rounded-full bg-gradient-to-r from-amber-400 to-yellow-500 shadow-lg mt-0.5"
                      >
                        <Star className="w-4 h-4 text-white" />
                      </motion.div>
                      <span className={`text-base leading-relaxed ${
                        isDark ? "text-gray-300" : "text-gray-700"
                      } group-hover:text-indigo-600 transition-colors duration-200`}>
                        {achievement}
                      </span>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            )}

            {/* Related Projects */}
            {education.projects && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: showDetails ? 1 : 0, y: showDetails ? 0 : 20 }}
                transition={{ delay: 0.3, duration: 0.3 }}
              >
                <h4 className={`text-xl font-bold mb-6 flex items-center gap-3 ${
                  isDark ? "text-white" : "text-gray-900"
                }`}>
                  <div className="p-2 rounded-lg bg-gradient-to-r from-purple-500 to-pink-500">
                    <Sparkles className="w-5 h-5 text-white" />
                  </div>
                  Related Projects
                </h4>
                <div className="flex flex-wrap gap-3">
                  {education.projects.map((project, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: 0.05 * i, duration: 0.3 }}
                      whileHover={{ scale: 1.05, y: -2 }}
                      className="group relative px-5 py-3 bg-gradient-to-r from-purple-500/10 via-pink-500/10 to-purple-500/10 text-purple-600 dark:text-purple-300 rounded-xl font-semibold border border-purple-200/50 dark:border-purple-700/50 hover:shadow-lg hover:shadow-purple-500/20 transition-all duration-300 cursor-pointer"
                    >
                      <span className="flex items-center gap-2">
                        <Zap className="w-4 h-4" />
                        {project}
                      </span>
                      
                      {/* Hover effect */}
                      <motion.div
                        className="absolute inset-0 bg-gradient-to-r from-purple-500/5 to-pink-500/5 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                      />
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            )}
          </div>
        </motion.div>
      </motion.article>
    </div>
  );
};

// ✅ MAIN: Enhanced Education section with modern design
export default function Education() {
  const { isDark } = useTheme();
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });

  const education = site?.education || [];

  if (education.length === 0) {
    return (
      <section 
        id="education" 
        className={`py-24 ${isDark ? "bg-gray-900" : "bg-white"}`}
      >
        <div className="max-w-4xl mx-auto px-6 text-center">
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className={`w-32 h-32 mx-auto mb-8 rounded-3xl flex items-center justify-center ${
              isDark
                ? "bg-gradient-to-br from-indigo-900/30 to-purple-900/30"
                : "bg-gradient-to-br from-indigo-100 to-purple-100"
            }`}
          >
            <GraduationCap className="w-16 h-16 text-indigo-500" />
          </motion.div>
          <h2 className={`text-4xl font-bold mb-6 ${
            isDark ? "text-white" : "text-gray-900"
          }`}>
            Education Journey
          </h2>
          <p className={`text-xl ${isDark ? "text-gray-400" : "text-gray-600"}`}>
            Education information will be available soon.
          </p>
        </div>
      </section>
    );
  }

  return (
    <section 
      id="education" 
      ref={sectionRef}
      className={`relative py-32 overflow-hidden ${
        isDark
          ? "bg-gradient-to-br from-gray-900 via-gray-800/50 to-gray-900"
          : "bg-gradient-to-br from-gray-50 via-white to-indigo-50/30"
      }`}
      role="region"
      aria-labelledby="education-heading"
    >
      {/* Enhanced Background Effects */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Animated gradient orbs */}
        <motion.div 
          className="absolute top-20 -right-32 w-96 h-96 rounded-full blur-3xl"
          style={{ 
            background: isDark
              ? "radial-gradient(circle, rgba(99, 102, 241, 0.08) 0%, rgba(139, 92, 246, 0.08) 50%, rgba(0, 0, 0, 0) 100%)"
              : "radial-gradient(circle, rgba(99, 102, 241, 0.12) 0%, rgba(139, 92, 246, 0.12) 50%, rgba(0, 0, 0, 0) 100%)"
          }}
          animate={{ 
            scale: [1, 1.2, 1],
            x: [0, 50, 0],
            y: [0, -30, 0]
          }}
          transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
        />
        
        <motion.div 
          className="absolute bottom-32 -left-32 w-96 h-96 rounded-full blur-3xl"
          style={{ 
            background: isDark
              ? "radial-gradient(circle, rgba(236, 72, 153, 0.06) 0%, rgba(168, 85, 247, 0.06) 50%, rgba(0, 0, 0, 0) 100%)"
              : "radial-gradient(circle, rgba(236, 72, 153, 0.1) 0%, rgba(168, 85, 247, 0.1) 50%, rgba(0, 0, 0, 0) 100%)"
          }}
          animate={{ 
            scale: [1.2, 1, 1.2],
            x: [0, -30, 0],
            y: [0, 40, 0]
          }}
          transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
        />

        {/* Floating geometric shapes */}
        {[...Array(5)].map((_, i) => (
          <motion.div
            key={i}
            className={`absolute w-4 h-4 ${
              isDark ? "bg-indigo-400/20" : "bg-indigo-500/30"
            }`}
            style={{
              left: `${20 + (i * 20)}%`,
              top: `${30 + (i * 15)}%`,
              borderRadius: i % 2 === 0 ? "50%" : "0%"
            }}
            animate={{
              y: [0, -40, 0],
              rotate: [0, 180, 360],
              scale: [0.5, 1, 0.5]
            }}
            transition={{
              duration: 8 + i * 2,
              repeat: Infinity,
              delay: i * 1.2,
              ease: "easeInOut"
            }}
          />
        ))}
      </div>

      <div className="relative max-w-7xl mx-auto px-6 lg:px-8">
        {/* Enhanced Header */}
        <motion.header
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
          className="text-center mb-24"
        >
          {/* Enhanced Badge */}
          <motion.div
            initial={{ scale: 0, rotate: -180 }}
            whileInView={{ scale: 1, rotate: 0 }}
            transition={{ delay: 0.2, duration: 0.8, type: "spring", stiffness: 200 }}
            viewport={{ once: true }}
            className={`inline-flex items-center gap-3 px-8 py-4 rounded-full mb-8 border backdrop-blur-xl shadow-lg ${
              isDark
                ? "bg-gradient-to-r from-indigo-500/10 via-purple-500/10 to-pink-500/10 border-indigo-700/30"
                : "bg-gradient-to-r from-indigo-500/10 via-purple-500/10 to-pink-500/10 border-indigo-200/30"
            }`}
          >
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
            >
              <GraduationCap className={`w-6 h-6 ${
                isDark ? "text-indigo-400" : "text-indigo-600"
              }`} />
            </motion.div>
            <span className={`text-lg font-bold uppercase tracking-wider ${
              isDark ? "text-indigo-300" : "text-indigo-700"
            }`}>
              Academic Foundation
            </span>
            <Sparkles className="w-5 h-5 text-purple-500" />
          </motion.div>

          <h2 
            id="education-heading"
            className="text-5xl md:text-7xl font-black mb-8 leading-tight"
          >
            <span className="bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
              Education &
            </span>
            <br />
            <span className="bg-gradient-to-r from-purple-600 via-pink-600 to-indigo-600 bg-clip-text text-transparent">
              Learning Journey
            </span>
          </h2>

          <motion.p 
            className={`text-xl md:text-2xl max-w-4xl mx-auto leading-relaxed ${
              isDark ? "text-gray-300" : "text-gray-600"
            }`}
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.8 }}
            viewport={{ once: true }}
          >
            The academic milestones and continuous learning experiences that have shaped 
            my technical foundation and problem-solving approach.
          </motion.p>
        </motion.header>

        {/* Timeline */}
        <div className="relative">
          <div className="space-y-4">
            {education.map((edu, index) => (
              <EducationCard 
                key={`${edu.school}-${edu.degree}-${index}`}
                education={edu}
                index={index}
                isLast={index === education.length - 1}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
