// src/components/Skills.jsx
import { motion, useInView } from "framer-motion";
import { useMemo, useRef, useState } from "react";
import { useTheme } from "../contexts/ThemeContext";
import { site } from "../data/site";
import Section from "./Section";

// Icons imports
import { 
  FaReact, FaNodeJs, FaHtml5, FaCss3Alt, FaJs, 
  FaGitAlt, FaDocker, FaPhp, FaDatabase, FaServer, FaCog
} from 'react-icons/fa';
import { 
  SiMongodb, SiExpress, SiTypescript, SiNextdotjs,
  SiTailwindcss, SiVite, SiVercel, SiPostman, SiMysql
} from 'react-icons/si';
import { Sparkles, Zap, Code, Target } from "lucide-react";

// Skills data with proper icons and colors
const skillsData = [
  // Frontend Technologies
  { name: "React", icon: FaReact, color: "#61DAFB", category: "frontend" },
  { name: "Next.js", icon: SiNextdotjs, color: "#000000", category: "frontend" },
  { name: "TypeScript", icon: SiTypescript, color: "#3178C6", category: "frontend" },
  { name: "JavaScript", icon: FaJs, color: "#F7DF1E", category: "frontend" },
  { name: "HTML5", icon: FaHtml5, color: "#E34F26", category: "frontend" },
  { name: "CSS3", icon: FaCss3Alt, color: "#1572B6", category: "frontend" },
  { name: "Tailwind CSS", icon: SiTailwindcss, color: "#06B6D4", category: "frontend" },
  { name: "Vite", icon: SiVite, color: "#646CFF", category: "frontend" },

  // Backend Technologies
  { name: "Node.js", icon: FaNodeJs, color: "#339933", category: "backend" },
  { name: "Express.js", icon: SiExpress, color: "#000000", category: "backend" },
  { name: "PHP", icon: FaPhp, color: "#777BB4", category: "backend" },

  // Database & Tools
  { name: "MongoDB", icon: SiMongodb, color: "#47A248", category: "database" },
  { name: "MySQL", icon: SiMysql, color: "#4479A1", category: "database" },
  { name: "Git", icon: FaGitAlt, color: "#F05032", category: "tools" },
  { name: "Docker", icon: FaDocker, color: "#2496ED", category: "tools" },
  { name: "Postman", icon: SiPostman, color: "#FF6C37", category: "tools" },
  { name: "Vercel", icon: SiVercel, color: "#000000", category: "tools" },
];

// Category configurations
const categoryConfig = {
  "Frontend Development": {
    icon: FaReact,
    color: "from-blue-500 to-cyan-500",
    bgColor: "#3B82F6",
    skills: ["React", "Next.js", "TypeScript", "JavaScript", "HTML5", "CSS3", "Tailwind CSS", "Vite", "Redux/Context", "React Router"]
  },
  "Backend Development": {
    icon: FaServer,
    color: "from-green-500 to-emerald-500", 
    bgColor: "#10B981",
    skills: ["Node.js", "Express.js", "PHP", "REST APIs", "JWT", "RBAC"]
  },
  "Database & Tools": {
    icon: FaDatabase,
    color: "from-purple-500 to-pink-500",
    bgColor: "#8B5CF6",
    skills: ["MongoDB", "MongoDB Atlas", "MySQL", "Git", "GitHub", "Postman", "Docker", "Vercel/Render"]
  }
};

// Floating particles
const FloatingParticles = () => {
  const { isDark } = useTheme();
  
  const particles = useMemo(() => 
    Array.from({ length: 12 }, (_, i) => ({
      id: i,
      size: Math.floor(Math.random() * 3) + 1,
      x: Math.random() * 100,
      y: Math.random() * 100,
      delay: i * 0.5,
      duration: 6 + Math.random() * 4
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
            opacity: isDark ? [0.1, 0.6, 0.1] : [0.2, 0.8, 0.2],
            scale: [0.5, 1.5, 0.5],
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

// Skills grid component
const SkillsGrid = () => {
  const { isDark } = useTheme();

  const getIconColor = (color) => {
    if (color === "#000000") {
      return isDark ? "text-white" : "text-slate-800";
    }
    return "";
  };

  const getIconStyle = (color) => {
    if (color === "#000000") {
      return {
        color: undefined,
        filter: isDark 
          ? "drop-shadow(0 2px 8px rgba(255, 255, 255, 0.3))"
          : "drop-shadow(0 2px 8px rgba(0, 0, 0, 0.3))"
      };
    }
    return {
      color: color,
      filter: `drop-shadow(0 2px 8px ${color}40) drop-shadow(0 0 20px ${color}30)`
    };
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8, delay: 0.2 }}
      className="grid grid-cols-4 md:grid-cols-6 lg:grid-cols-8 gap-8 justify-items-center max-w-6xl mx-auto mb-20"
    >
      {skillsData.map((skill, index) => {
        const IconComponent = skill.icon;
        
        return (
          <motion.div
            key={skill.name}
            className="group relative flex flex-col items-center justify-center p-4 cursor-pointer"
            initial={{ opacity: 0, y: 30, scale: 0.8 }}
            whileInView={{ opacity: 1, y: 0, scale: 1 }}
            whileHover={{ 
              y: -8,
              scale: 1.1,
              transition: { duration: 0.3, type: "spring", stiffness: 300 }
            }}
            whileTap={{ scale: 0.95 }}
            viewport={{ once: true }}
            transition={{ 
              duration: 0.6,
              delay: index * 0.05,
              type: "spring",
              stiffness: 150,
              damping: 12
            }}
          >
            {/* Icon */}
            <motion.div
              className="relative"
              whileHover={{ 
                rotate: [0, -10, 10, 0],
                transition: { duration: 0.6 }
              }}
            >
              <IconComponent 
                className={`text-4xl md:text-5xl transition-all duration-300 ${getIconColor(skill.color)}`}
                style={getIconStyle(skill.color)}
              />
              
              {/* Glow Effect */}
              <motion.div
                className="absolute inset-0 rounded-full opacity-0 group-hover:opacity-100 blur-lg transition-opacity duration-300"
                style={{ 
                  backgroundColor: skill.color === "#000000" 
                    ? (isDark ? "#6366f1" : "#3b82f6") 
                    : skill.color,
                  transform: 'scale(1.5)'
                }}
                animate={{
                  scale: [1.5, 1.8, 1.5],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              />
            </motion.div>

            {/* Skill Name */}
            <motion.div
              className="mt-3 text-center"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ delay: index * 0.05 + 0.2 }}
            >
              <h3 className={`font-semibold text-sm md:text-base tracking-wide ${
                isDark ? "text-white" : "text-slate-800"
              }`}>
                {skill.name}
              </h3>
              
              {/* Animated Underline */}
              <motion.div
                className="h-0.5 bg-current mt-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                style={{ 
                  color: skill.color === "#000000" 
                    ? (isDark ? "#6366f1" : "#3b82f6") 
                    : skill.color 
                }}
                initial={{ scaleX: 0 }}
                whileHover={{ scaleX: 1 }}
                transition={{ duration: 0.3 }}
              />
            </motion.div>

            {/* Floating Particle */}
            <motion.div
              className="absolute w-1.5 h-1.5 rounded-full opacity-0 group-hover:opacity-100"
              style={{ 
                backgroundColor: skill.color === "#000000" 
                  ? (isDark ? "#6366f1" : "#3b82f6") 
                  : skill.color,
                left: '50%',
                top: '10%'
              }}
              animate={{
                y: [0, -20, -40],
                opacity: [0, 1, 0],
                scale: [0, 1, 0],
              }}
              transition={{
                duration: 1.5,
                repeat: Infinity,
              }}
            />
          </motion.div>
        );
      })}
    </motion.div>
  );
};

// Category sections
const CategorySections = () => {
  const { isDark } = useTheme();
  const groups = site.skills || {};

  return (
    <div className="max-w-5xl mx-auto">
      {Object.entries(groups).map(([title, data], index) => {
        const config = categoryConfig[title] || categoryConfig["Frontend Development"];
        const IconComponent = config.icon;
        
        return (
          <motion.div
            key={title}
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ 
              duration: 0.8,
              delay: index * 0.2,
            }}
            className="mb-16"
          >
            {/* Category Header */}
            <div className="flex items-center gap-6 mb-10">
              <motion.div 
                className="w-16 h-16 rounded-2xl flex items-center justify-center shadow-2xl"
                style={{ backgroundColor: config.bgColor }}
                whileHover={{ rotate: 360, scale: 1.1 }}
                transition={{ duration: 0.6 }}
              >
                <IconComponent className="w-8 h-8 text-white" />
              </motion.div>
              
              <div>
                <h3 className={`text-3xl md:text-4xl font-black mb-2 ${
                  isDark ? "text-white" : "text-slate-800"
                }`}>
                  {title}
                </h3>
                <motion.div 
                  className="h-1.5 rounded-full"
                  initial={{ scaleX: 0, opacity: 0 }}
                  whileInView={{ scaleX: 1, opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ 
                    delay: index * 0.2 + 0.3, 
                    duration: 0.8,
                    type: "spring",
                    stiffness: 100
                  }}
                  style={{ 
                    transformOrigin: 'left',
                    backgroundColor: config.bgColor,
                    width: '100px'
                  }}
                />
              </div>
            </div>
            
            {/* Technologies List */}
            <div className="flex flex-wrap gap-4">
              {(data.skills || []).map((tech, techIndex) => (
                <motion.span
                  key={tech}
                  className={`px-5 py-3 rounded-2xl text-sm font-semibold border-2 transition-all duration-300 cursor-default ${
                    isDark 
                      ? "bg-slate-800/80 text-slate-300 border-slate-700 hover:border-current" 
                      : "bg-white/80 text-slate-700 border-slate-200 hover:border-current"
                  }`}
                  initial={{ opacity: 0, scale: 0.8, y: 20 }}
                  whileInView={{ opacity: 1, scale: 1, y: 0 }}
                  viewport={{ once: true }}
                  whileHover={{ 
                    scale: 1.05,
                    y: -4,
                    borderColor: config.bgColor,
                    boxShadow: `0 8px 25px ${config.bgColor}20`
                  }}
                  transition={{ 
                    delay: index * 0.2 + techIndex * 0.05 + 0.5,
                    duration: 0.4
                  }}
                >
                  {tech}
                </motion.span>
              ))}
            </div>
          </motion.div>
        );
      })}
    </div>
  );
};

// MAIN: Skills component with Section wrapper
export default function Skills() {
  const { isDark } = useTheme();
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-20%" });

  return (
    <Section
      id="skills"
      title="Skills"
      subtitle="Technologies and tools I use to build amazing projects"
    >
      <div className="relative">
        {/* Background Effects */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <motion.div 
            className="absolute top-20 -left-20 w-96 h-96 rounded-full blur-3xl opacity-20"
            style={{ 
              background: isDark
                ? "radial-gradient(circle, rgba(99, 102, 241, 0.15) 0%, rgba(0, 0, 0, 0) 70%)"
                : "radial-gradient(circle, rgba(99, 102, 241, 0.2) 0%, rgba(0, 0, 0, 0) 70%)"
            }}
            animate={{ 
              scale: [1, 1.2, 1],
              x: [0, 30, 0],
              y: [0, -20, 0]
            }}
            transition={{ duration: 8, repeat: Infinity }}
          />
          <motion.div 
            className="absolute bottom-20 -right-20 w-[500px] h-[500px] rounded-full blur-3xl opacity-20"
            style={{ 
              background: isDark
                ? "radial-gradient(circle, rgba(139, 92, 246, 0.12) 0%, rgba(0, 0, 0, 0) 70%)"
                : "radial-gradient(circle, rgba(139, 92, 246, 0.15) 0%, rgba(0, 0, 0, 0) 70%)"
            }}
            animate={{ 
              scale: [1, 1.3, 1],
              x: [0, -30, 0],
              y: [0, 20, 0]
            }}
            transition={{ duration: 10, repeat: Infinity, delay: 2 }}
          />
        </div>

        <FloatingParticles />

        <motion.div 
          ref={ref}
          className="relative max-w-7xl mx-auto"
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
        >
          <SkillsGrid />
          <CategorySections />

          {/* CTA Section */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.5, duration: 0.8 }}
            className="text-center mt-20"
          >
            <motion.a
              href="#contact"
              whileHover={{ 
                scale: 1.05,
                y: -4,
                transition: { duration: 0.3 }
              }}
              whileTap={{ scale: 0.95 }}
              className="group inline-flex items-center gap-4 px-12 py-6 bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 text-white font-bold text-lg rounded-3xl shadow-2xl hover:shadow-4xl transition-all duration-500 relative overflow-hidden focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
            >
              <Zap className="w-6 h-6 relative z-10 group-hover:scale-110 transition-transform duration-300" />
              <span className="relative z-10">Let's Build Something Amazing</span>
              <motion.div
                animate={{ rotate: [0, 360] }}
                transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
                className="relative z-10"
              >
                <FaCog className="w-6 h-6" />
              </motion.div>
              
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-purple-600 to-pink-600"
                initial={{ x: "-100%" }}
                whileHover={{ x: 0 }}
                transition={{ duration: 0.5 }}
              />
            </motion.a>
          </motion.div>
        </motion.div>
      </div>
    </Section>
  );
}
