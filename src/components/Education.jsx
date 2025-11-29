// src/components/Education.jsx
import { motion, useScroll, useTransform } from "framer-motion";
import { 
  GraduationCap, 
  Calendar, 
  MapPin, 
  BookOpen, 
  CheckCircle,
  Clock,
  Rocket,
  Code,
  Brain,
  Heart,
  Sparkles,
  TrendingUp,
  Award,
  Target
} from "lucide-react";
import { useRef, useState } from "react";
import { useTheme } from "../contexts/ThemeContext";
import Section from "./Section";
import { site } from "../data/site";

// Icon mapping
const iconMap = {
  rocket: Rocket,
  code: Code,
  brain: Brain,
  heart: Heart
};

// Enhanced color mapping with rgba values
const colorMap = {
  green: {
    primary: "from-emerald-500 to-teal-600",
    secondary: "from-emerald-400 to-teal-500",
    glow: "rgba(16, 185, 129, 0.5)",
    glowLight: "rgba(16, 185, 129, 0.3)",
    text: "text-emerald-500",
    bg: "bg-emerald-500/10"
  },
  blue: {
    primary: "from-blue-500 to-cyan-600",
    secondary: "from-blue-400 to-cyan-500",
    glow: "rgba(59, 130, 246, 0.5)",
    glowLight: "rgba(59, 130, 246, 0.3)",
    text: "text-blue-500",
    bg: "bg-blue-500/10"
  },
  purple: {
    primary: "from-purple-500 to-pink-600",
    secondary: "from-purple-400 to-pink-500",
    glow: "rgba(168, 85, 247, 0.5)",
    glowLight: "rgba(168, 85, 247, 0.3)",
    text: "text-purple-500",
    bg: "bg-purple-500/10"
  },
  red: {
    primary: "from-rose-500 to-pink-600",
    secondary: "from-rose-400 to-pink-500",
    glow: "rgba(244, 63, 94, 0.5)",
    glowLight: "rgba(244, 63, 94, 0.3)",
    text: "text-rose-500",
    bg: "bg-rose-500/10"
  }
};

// Floating particles component
const FloatingParticles = () => {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {[...Array(15)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-2 h-2 rounded-full bg-gradient-to-r from-indigo-500 to-purple-500"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
          }}
          animate={{
            y: [0, -30, 0],
            opacity: [0, 0.5, 0],
            scale: [0, 1, 0]
          }}
          transition={{
            duration: 3 + Math.random() * 2,
            repeat: Infinity,
            delay: Math.random() * 2,
            ease: "easeInOut"
          }}
        />
      ))}
    </div>
  );
};

// Enhanced Journey Timeline with parallax
const JourneyTimeline = ({ journey, isDark }) => {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  return (
    <div ref={containerRef} className="relative py-20">
      {/* Animated header */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="text-center mb-20"
      >
        <motion.div
          className="inline-flex items-center gap-3 px-6 py-3 rounded-full mb-6 backdrop-blur-xl border"
          style={{
            background: isDark
              ? "linear-gradient(135deg, rgba(99, 102, 241, 0.1), rgba(139, 92, 246, 0.1))"
              : "linear-gradient(135deg, rgba(99, 102, 241, 0.15), rgba(139, 92, 246, 0.15))",
            borderColor: isDark ? "rgba(99, 102, 241, 0.2)" : "rgba(99, 102, 241, 0.3)"
          }}
        >
          <TrendingUp className="w-5 h-5 text-indigo-500" />
          <span className={`font-bold text-sm uppercase tracking-wider ${
            isDark ? "text-indigo-300" : "text-indigo-700"
          }`}>
            Learning Journey
          </span>
          <Sparkles className="w-5 h-5 text-purple-500" />
        </motion.div>

        <h3 className="text-4xl md:text-6xl font-black mb-4">
          <span className="bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
            My Journey So Far
          </span>
        </h3>
        
        <p className={`text-lg md:text-xl max-w-2xl mx-auto ${
          isDark ? "text-gray-400" : "text-gray-600"
        }`}>
          From curious beginner to confident developer
        </p>
      </motion.div>

      {/* Timeline Container */}
      <div className="relative max-w-7xl mx-auto px-4">
        {/* Animated gradient line - Desktop */}
        <div className="absolute top-[140px] left-0 right-0 h-2 hidden lg:block">
          <motion.div
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 2, ease: "easeOut" }}
            className="h-full rounded-full bg-gradient-to-r from-emerald-500 via-blue-500 via-purple-500 to-rose-500 origin-left relative overflow-hidden"
          >
            {/* Flowing animation */}
            <motion.div
              className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent"
              animate={{ x: ["-100%", "200%"] }}
              transition={{
                duration: 3,
                repeat: Infinity,
                ease: "linear"
              }}
            />
          </motion.div>
        </div>

        {/* Timeline Items */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-16 lg:gap-8 relative">
          {journey.map((item, index) => {
            const Icon = iconMap[item.icon] || Code;
            const colors = colorMap[item.color] || colorMap.blue;
            const isLast = index === journey.length - 1;

            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 60 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ 
                  delay: index * 0.15, 
                  duration: 0.7,
                  ease: [0.22, 1, 0.36, 1]
                }}
                className="relative flex flex-col items-center"
              >
                {/* Mobile connecting line */}
                {!isLast && (
                  <div className="absolute top-[140px] left-1/2 w-2 h-full -translate-x-1/2 lg:hidden z-0">
                    <motion.div
                      initial={{ scaleY: 0 }}
                      whileInView={{ scaleY: 1 }}
                      viewport={{ once: true }}
                      transition={{ delay: index * 0.15 + 0.4, duration: 0.6 }}
                      className={`w-full h-full rounded-full bg-gradient-to-b ${colors.primary} origin-top relative overflow-hidden`}
                    >
                      <motion.div
                        className="absolute inset-0 bg-gradient-to-b from-transparent via-white/30 to-transparent"
                        animate={{ y: ["-100%", "200%"] }}
                        transition={{
                          duration: 2,
                          repeat: Infinity,
                          ease: "linear",
                          delay: index * 0.5
                        }}
                      />
                    </motion.div>
                  </div>
                )}

                {/* ✅ FIXED: Enhanced Icon Circle */}
                <motion.div
                  whileHover={{ scale: 1.2, rotate: 15 }}
                  className="relative z-10 mb-10"
                >
                  {/* Main circle */}
                  <motion.div
                    className={`w-28 h-28 rounded-full bg-gradient-to-br ${colors.primary} flex items-center justify-center relative shadow-2xl`}
                    style={{
                      boxShadow: `0 20px 60px ${colors.glow}, 0 0 0 1px rgba(255, 255, 255, 0.1)`
                    }}
                  >
                    <Icon className="w-14 h-14 text-white relative z-10" />
                    
                    {/* ✅ FIXED: Animated background - no color animation */}
                    <motion.div
                      className="absolute inset-0 rounded-full opacity-30"
                      animate={{
                        scale: [1, 1.2, 1],
                        rotate: [0, 180, 360]
                      }}
                      transition={{
                        duration: 4,
                        repeat: Infinity,
                        ease: "linear"
                      }}
                      style={{
                        background: `conic-gradient(from 0deg, transparent, ${colors.glow}, transparent)`
                      }}
                    />
                  </motion.div>

                  {/* Orbiting rings */}
                  <motion.div
                    className="absolute inset-0"
                    animate={{ rotate: 360 }}
                    transition={{
                      duration: 8,
                      repeat: Infinity,
                      ease: "linear"
                    }}
                  >
                    <div className={`absolute top-0 left-1/2 w-2 h-2 rounded-full bg-gradient-to-r ${colors.secondary} -translate-x-1/2`} />
                  </motion.div>

                  {/* ✅ FIXED: Pulsing rings with proper rgba */}
                  {[...Array(3)].map((_, i) => (
                    <motion.div
                      key={i}
                      className="absolute inset-0 rounded-full border-2"
                      style={{
                        borderColor: isDark ? 'rgba(255, 255, 255, 0.2)' : 'rgba(255, 255, 255, 0.3)'
                      }}
                      animate={{
                        scale: [1, 1.5, 1],
                        opacity: [0.6, 0, 0.6]
                      }}
                      transition={{
                        duration: 2,
                        repeat: Infinity,
                        delay: i * 0.4
                      }}
                    />
                  ))}
                </motion.div>

                {/* Enhanced Content Card */}
                <motion.div
                  whileHover={{ y: -12, scale: 1.03 }}
                  className={`relative p-8 rounded-3xl backdrop-blur-2xl border text-center w-full overflow-hidden group ${
                    isDark
                      ? "bg-gray-800/90 border-gray-700/50"
                      : "bg-white/95 border-gray-200/60"
                  } shadow-2xl hover:shadow-3xl transition-all duration-500`}
                >
                  {/* Gradient overlay */}
                  <motion.div
                    className={`absolute inset-0 bg-gradient-to-br ${colors.primary} opacity-0 group-hover:opacity-5 transition-opacity duration-500`}
                  />

                  {/* Decorative elements */}
                  <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-indigo-500 to-transparent opacity-50" />
                  
                  {/* Year Badge */}
                  <motion.div
                    whileHover={{ scale: 1.1, rotate: [-2, 2, -2] }}
                    className={`inline-flex items-center gap-2 px-5 py-2 rounded-full text-sm font-black mb-4 bg-gradient-to-r ${colors.primary} text-white shadow-lg relative overflow-hidden`}
                  >
                    <motion.div
                      className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/20 to-white/0"
                      animate={{ x: ["-100%", "200%"] }}
                      transition={{
                        duration: 2,
                        repeat: Infinity,
                        ease: "linear"
                      }}
                    />
                    <Calendar className="w-4 h-4" />
                    <span className="relative z-10">{item.year}</span>
                  </motion.div>

                  {/* Title */}
                  <h4 className={`text-2xl font-black mb-4 relative ${
                    isDark ? "text-white" : "text-gray-900"
                  }`}>
                    {item.title}
                    <motion.div
                      className={`absolute -bottom-2 left-0 right-0 h-1 rounded-full bg-gradient-to-r ${colors.secondary} mx-auto`}
                      initial={{ scaleX: 0 }}
                      whileInView={{ scaleX: 0.5 }}
                      viewport={{ once: true }}
                    />
                  </h4>

                  {/* Description */}
                  <p className={`text-base leading-relaxed ${
                    isDark ? "text-gray-300" : "text-gray-600"
                  }`}>
                    {item.description}
                  </p>

                  {/* Stats or Icon */}
                  <motion.div
                    whileHover={{ scale: 1.1, rotate: 5 }}
                    className={`mt-6 inline-flex items-center gap-2 px-4 py-2 rounded-xl ${colors.bg} ${colors.text} font-semibold text-sm`}
                  >
                    <Target className="w-4 h-4" />
                    <span>Milestone {index + 1}</span>
                  </motion.div>

                  {/* Corner decoration */}
                  <div className={`absolute bottom-0 right-0 w-20 h-20 bg-gradient-to-tl ${colors.primary} opacity-5 rounded-tl-full`} />
                </motion.div>
              </motion.div>
            );
          })}
        </div>

        {/* Floating particles */}
        <FloatingParticles />
      </div>
    </div>
  );
};

// Main Education Component
export default function Education() {
  const { isDark } = useTheme();
  const sectionRef = useRef(null);
  const [hoveredSubject, setHoveredSubject] = useState(null);

  const education = site?.education?.[0];

  if (!education) {
    return null;
  }

  const statusConfig = {
    'Completed': { 
      color: 'text-emerald-600 dark:text-emerald-400',
      bg: 'bg-emerald-50 dark:bg-emerald-900/20',
      border: 'border-emerald-200 dark:border-emerald-800',
      icon: CheckCircle,
      gradient: 'from-emerald-500 to-teal-600'
    },
    'In Progress': { 
      color: 'text-blue-600 dark:text-blue-400',
      bg: 'bg-blue-50 dark:bg-blue-900/20',
      border: 'border-blue-200 dark:border-blue-800',
      icon: Clock,
      gradient: 'from-blue-500 to-cyan-600'
    }
  };

  const currentStatus = statusConfig[education.status] || statusConfig['In Progress'];

  return (
    <Section
      id="education"
      title="Education"
      subtitle="Academic foundation and learning journey"
    >
      <div className="relative">
        {/* ✅ FIXED: Background Effects with rgba */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {/* Animated gradient orbs */}
          <motion.div 
            className="absolute top-20 -right-40 w-[500px] h-[500px] rounded-full blur-3xl opacity-20"
            style={{ 
              background: "radial-gradient(circle, rgba(99, 102, 241, 0.3), rgba(139, 92, 246, 0.2), rgba(0, 0, 0, 0))"
            }}
            animate={{ 
              scale: [1, 1.3, 1],
              x: [0, 50, 0],
              y: [0, -30, 0],
              rotate: [0, 90, 0]
            }}
            transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
          />
          
          <motion.div 
            className="absolute bottom-20 -left-40 w-[500px] h-[500px] rounded-full blur-3xl opacity-20"
            style={{ 
              background: "radial-gradient(circle, rgba(168, 85, 247, 0.3), rgba(236, 72, 153, 0.2), rgba(0, 0, 0, 0))"
            }}
            animate={{ 
              scale: [1.3, 1, 1.3],
              x: [0, -50, 0],
              y: [0, 40, 0],
              rotate: [0, -90, 0]
            }}
            transition={{ duration: 18, repeat: Infinity, ease: "easeInOut" }}
          />

          {/* Grid pattern */}
          <div 
            className="absolute inset-0 opacity-5"
            style={{
              backgroundImage: `linear-gradient(${isDark ? '#fff' : '#000'} 1px, transparent 1px), linear-gradient(90deg, ${isDark ? '#fff' : '#000'} 1px, transparent 1px)`,
              backgroundSize: '50px 50px'
            }}
          />
        </div>

        <div className="relative max-w-6xl mx-auto">
          {/* Enhanced College Info Card */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="relative mb-24 group"
          >
            <motion.div
              className={`rounded-3xl p-10 backdrop-blur-2xl border overflow-hidden ${
                isDark
                  ? "bg-gradient-to-br from-gray-800/90 via-gray-800/80 to-gray-900/90 border-gray-700/50"
                  : "bg-gradient-to-br from-white/95 via-white/90 to-gray-50/95 border-gray-200/60"
              } shadow-2xl`}
              whileHover={{ y: -4 }}
              transition={{ duration: 0.3 }}
            >
              {/* Decorative gradient overlay */}
              <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/5 via-purple-500/5 to-pink-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

              <div className="relative z-10 flex flex-col lg:flex-row lg:items-center lg:justify-between gap-8">
                <div className="flex-1">
                  <div className="flex items-center gap-4 mb-6 flex-wrap">
                    <motion.div
                      whileHover={{ rotate: 360 }}
                      transition={{ duration: 0.8 }}
                      className={`p-4 rounded-2xl bg-gradient-to-br ${currentStatus.gradient}`}
                    >
                      <GraduationCap className="w-8 h-8 text-white" />
                    </motion.div>

                    <div>
                      <h3 className={`text-3xl md:text-4xl font-black ${isDark ? "text-white" : "text-gray-900"}`}>
                        {education.degree}
                      </h3>
                      <p className={`text-lg font-bold mt-2 ${
                        isDark ? "text-indigo-300" : "text-indigo-600"
                      }`}>
                        {education.field}
                      </p>
                    </div>

                    <motion.div
                      whileHover={{ scale: 1.05 }}
                      className={`ml-auto flex items-center gap-2 px-5 py-3 rounded-full text-sm font-bold border ${
                        currentStatus.bg
                      } ${currentStatus.color} ${currentStatus.border} shadow-lg`}
                    >
                      <currentStatus.icon className="w-5 h-5" />
                      {education.status}
                    </motion.div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {[
                      { icon: BookOpen, label: "College", value: education.school, color: "text-indigo-500" },
                      { icon: MapPin, label: "Location", value: education.location, color: "text-purple-500" },
                      { icon: Calendar, label: "Duration", value: education.date, color: "text-pink-500" }
                    ].map((item, index) => (
                      <motion.div
                        key={index}
                        whileHover={{ scale: 1.05, y: -4 }}
                        className={`flex items-center gap-4 p-4 rounded-2xl ${
                          isDark ? "bg-gray-700/50" : "bg-gray-100/80"
                        } transition-all duration-300`}
                      >
                        <motion.div
                          whileHover={{ rotate: 360 }}
                          transition={{ duration: 0.6 }}
                          className={`p-3 rounded-xl ${isDark ? "bg-gray-600/50" : "bg-white"}`}
                        >
                          <item.icon className={`w-6 h-6 ${item.color}`} />
                        </motion.div>
                        <div>
                          <div className="text-xs font-bold text-gray-500 uppercase tracking-wide">{item.label}</div>
                          <div className={`text-sm font-bold ${
                            isDark ? "text-white" : "text-gray-900"
                          }`}>
                            {item.value}
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </div>

                {(education.gpa || education.percentage) && (
                  <motion.div
                    whileHover={{ scale: 1.08, rotate: [0, -3, 3, 0] }}
                    className={`relative p-8 rounded-3xl text-center border-4 ${
                      isDark 
                        ? "bg-gradient-to-br from-gray-700/80 to-gray-800/80 border-gray-600/50" 
                        : "bg-gradient-to-br from-white to-gray-50 border-gray-200/50"
                    } shadow-2xl`}
                  >
                    <motion.div
                      className="absolute inset-0 rounded-3xl bg-gradient-to-br from-indigo-500/10 to-purple-500/10"
                      animate={{
                        opacity: [0.3, 0.6, 0.3]
                      }}
                      transition={{
                        duration: 3,
                        repeat: Infinity
                      }}
                    />

                    <div className="relative z-10">
                      <Award className="w-8 h-8 mx-auto mb-3 text-amber-500" />
                      <div className="text-5xl font-black mb-2 bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
                        {education.gpa || education.percentage}
                      </div>
                      <div className={`text-sm font-black uppercase tracking-wider ${
                        isDark ? "text-gray-400" : "text-gray-500"
                      }`}>
                        {education.gpa ? "CGPA" : "Score"}
                      </div>
                    </div>
                  </motion.div>
                )}
              </div>
            </motion.div>
          </motion.div>

          {/* Journey Timeline */}
          {education.journey && education.journey.length > 0 && (
            <JourneyTimeline journey={education.journey} isDark={isDark} />
          )}

          {/* Enhanced Core Subjects */}
          {education.subjects && (
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className={`rounded-3xl p-8 mt-20 backdrop-blur-xl border ${
                isDark ? "bg-gray-800/60 border-gray-700/50" : "bg-white/80 border-gray-200/60"
              } shadow-xl`}
            >
              <div className="flex items-center gap-3 mb-8">
                <motion.div
                  whileHover={{ rotate: 360 }}
                  transition={{ duration: 0.8 }}
                  className="p-3 rounded-2xl bg-gradient-to-br from-indigo-500 to-purple-600"
                >
                  <BookOpen className="w-6 h-6 text-white" />
                </motion.div>
                <h4 className={`text-2xl font-black ${
                  isDark ? "text-white" : "text-gray-900"
                }`}>
                  Core Subjects Studied
                </h4>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
                {education.subjects.map((subject, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, scale: 0.8 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    whileHover={{ 
                      scale: 1.08, 
                      y: -4
                    }}
                    onHoverStart={() => setHoveredSubject(i)}
                    onHoverEnd={() => setHoveredSubject(null)}
                    transition={{ delay: 0.02 * i }}
                    viewport={{ once: true }}
                    className={`relative p-4 rounded-2xl text-center font-semibold text-sm border cursor-default overflow-hidden ${
                      isDark
                        ? "bg-gray-700/60 text-gray-200 border-gray-600/50"
                        : "bg-gray-50 text-gray-700 border-gray-200"
                    }`}
                    style={{
                      backgroundColor: hoveredSubject === i 
                        ? (isDark ? "rgba(99, 102, 241, 0.1)" : "rgba(99, 102, 241, 0.08)")
                        : undefined
                    }}
                  >
                    <span className="relative z-10">{subject}</span>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          )}
        </div>
      </div>
    </Section>
  );
}
