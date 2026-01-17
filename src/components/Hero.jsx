import { motion, useScroll, useTransform } from "framer-motion";
import {
  Github,
  Linkedin,
  Mail,
  Rocket,
  Download,
  ChevronDown,
  Sparkles,
  Terminal
} from "lucide-react";
import { useState, useEffect, useRef, useMemo } from "react";
import { useTheme } from "../contexts/ThemeContext";
import { site } from "../data/site";
import { 
  FaReact, FaNodeJs, FaJs, 
  FaGitAlt, FaDocker, FaDatabase 
} from 'react-icons/fa';
import { 
  SiMongodb, SiExpress, SiTypescript, SiNextdotjs,
  SiTailwindcss, SiVite, SiVercel, SiPostman
} from 'react-icons/si';

// ✅ Skills data with official brand colors
const skillsData = [
  { name: "React", icon: FaReact, color: "#61DAFB" },
  { name: "Next.js", icon: SiNextdotjs, color: "#000000" },
  { name: "TypeScript", icon: SiTypescript, color: "#3178C6" },
  { name: "JavaScript", icon: FaJs, color: "#F7DF1E" },
  { name: "Node.js", icon: FaNodeJs, color: "#339933" },
  { name: "Express", icon: SiExpress, color: "#000000" },
  { name: "MongoDB", icon: SiMongodb, color: "#47A248" },
  { name: "Tailwind CSS", icon: SiTailwindcss, color: "#06B6D4" },
  { name: "Vite", icon: SiVite, color: "#646CFF" },
  { name: "Docker", icon: FaDocker, color: "#2496ED" },
  { name: "SQL", icon: FaDatabase, color: "#4479A1" },
  { name: "Git", icon: FaGitAlt, color: "#F05032" },
  { name: "Vercel", icon: SiVercel, color: "#ffffff" },
  { name: "Postman", icon: SiPostman, color: "#FF6C37" }
];

// ✅ Floating tech icons component
const FloatingTechIcon = ({ skill, delay, index }) => {
  const { isDark } = useTheme();
  
  if (!skill || !skill.icon || !skill.name) return null;
  
  const IconComponent = skill.icon;
  
  const getIconColor = () => {
    if (skill.color === "#000000" || skill.color === "#ffffff") {
      return isDark ? "#e5e7eb" : "#1f2937";
    }
    return skill.color;
  };
  
  const iconColor = getIconColor();
  
  return (
    <motion.div
      className="absolute pointer-events-none"
      style={{
        left: `${10 + (index % 3) * 30}%`,
        top: `${15 + Math.floor(index / 3) * 25}%`,
        zIndex: 1
      }}
      initial={{ opacity: 0, scale: 0, rotate: -180 }}
      animate={{
        opacity: isDark ? [0.15, 0.35, 0.15] : [0.2, 0.45, 0.2],
        scale: [0.8, 1.2, 0.8],
        rotate: [0, 360],
        y: [0, -20, 0],
        x: [0, Math.sin(index) * 15, 0]
      }}
      transition={{
        duration: 8 + Math.random() * 4,
        repeat: Infinity,
        delay: delay || 0,
        ease: "easeInOut"
      }}
    >
      <IconComponent 
        size={32}
        style={{
          color: iconColor,
          filter: `drop-shadow(0 2px 8px ${iconColor}40)`
        }}
      />
    </motion.div>
  );
};

// ✅ Animated Code Editor Window
const CodeEditorWindow = () => {
  const { isDark } = useTheme();
  const [displayedCode, setDisplayedCode] = useState([]);
  
  // Define code lines based on current theme
  const codeLines = [
    { 
      text: "const developer = {", 
      color: isDark ? "text-purple-400" : "text-purple-600", 
      indent: 0 
    },
    { 
      text: '  name: "Dhruv Prajapati",', 
      color: isDark ? "text-green-400" : "text-green-600", 
      indent: 1 
    },
    { 
      text: '  role: "Full Stack Developer",', 
      color: isDark ? "text-green-400" : "text-green-600", 
      indent: 1 
    },
    { 
      text: "  skills: [", 
      color: isDark ? "text-purple-400" : "text-purple-600", 
      indent: 1 
    },
    { 
      text: '    "React", "Node.js", "MongoDB",', 
      color: isDark ? "text-green-400" : "text-green-600", 
      indent: 2 
    },
    { 
      text: '    "Express", "JavaScript", "TypeScript"', 
      color: isDark ? "text-green-400" : "text-green-600", 
      indent: 2 
    },
    { 
      text: "  ],", 
      color: isDark ? "text-purple-400" : "text-purple-600", 
      indent: 1 
    },
    { 
      text: '  passion: "Building Amazing Apps",', 
      color: isDark ? "text-yellow-400" : "text-yellow-600", 
      indent: 1 
    },
    { 
      text: "  learning: true", 
      color: isDark ? "text-blue-400" : "text-blue-600", 
      indent: 1 
    },
    { 
      text: "};", 
      color: isDark ? "text-purple-400" : "text-purple-600", 
      indent: 0 
    }
  ];

  // Reset and animate code when theme changes
  useEffect(() => {
    setDisplayedCode([]);
    
    let currentLine = 0;
    const interval = setInterval(() => {
      if (currentLine < codeLines.length) {
        setDisplayedCode(prev => [...prev, codeLines[currentLine]]);
        currentLine++;
      } else {
        clearInterval(interval);
      }
    }, 200);

    return () => clearInterval(interval);
  }, [isDark]); // Dependency on isDark to reset on theme change

  return (
    <motion.div
      initial={{ opacity: 0, x: 50, rotateY: -15 }}
      animate={{ opacity: 1, x: 0, rotateY: 0 }}
      transition={{ duration: 1, delay: 0.5 }}
      className={`relative w-full max-w-2xl backdrop-blur-xl rounded-2xl overflow-hidden shadow-2xl border ${
        isDark 
          ? "bg-slate-900/90 border-slate-700/50" 
          : "bg-white/90 border-slate-200/50"
      }`}
    >
      {/* Window Header */}
      <div className={`flex items-center justify-between px-4 py-3 border-b ${
        isDark ? "bg-slate-800/90 border-slate-700" : "bg-slate-100/90 border-slate-200"
      }`}>
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-red-500" />
          <div className="w-3 h-3 rounded-full bg-yellow-500" />
          <div className="w-3 h-3 rounded-full bg-green-500" />
        </div>
        <span className={`text-sm font-semibold ${
          isDark ? "text-slate-300" : "text-slate-700"
        }`}>
          Portfolio.js
        </span>
        <Terminal className="w-4 h-4 text-slate-400" />
      </div>

      {/* Code Editor Content */}
      <div className="p-6 font-mono text-sm md:text-base overflow-x-auto min-h-[300px]">
        {displayedCode.map((line, i) => {
          if (!line || !line.text) return null;
          
          return (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.3 }}
              className={`${line.color || (isDark ? 'text-gray-300' : 'text-gray-700')} whitespace-pre`}
              style={{ paddingLeft: `${(line.indent || 0) * 1.5}rem` }}
            >
              {line.text}
              {i === displayedCode.length - 1 && (
                <motion.span
                  animate={{ opacity: [1, 0, 1] }}
                  transition={{ duration: 1, repeat: Infinity }}
                  className={`inline-block w-2 h-5 ml-1 ${
                    isDark ? "bg-indigo-500" : "bg-indigo-600"
                  }`}
                />
              )}
            </motion.div>
          );
        })}
      </div>

      {/* Floating tech icons inside code window */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {skillsData.slice(0, 6).map((skill, i) => (
          <FloatingTechIcon 
            key={skill.name} 
            skill={skill} 
            delay={i * 0.3} 
            index={i} 
          />
        ))}
      </div>
    </motion.div>
  );
};

// ✅ Typewriter Text Effect
const TypewriterText = ({ texts = [] }) => {
  const [displayText, setDisplayText] = useState("");
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isTyping, setIsTyping] = useState(true);
  
  useEffect(() => {
    if (!texts || texts.length === 0) return;
    
    let timer;
    const currentText = texts[currentIndex] || "";
    
    if (isTyping) {
      if (displayText.length < currentText.length) {
        timer = setTimeout(() => {
          setDisplayText(currentText.slice(0, displayText.length + 1));
        }, 100);
      } else {
        timer = setTimeout(() => {
          setIsTyping(false);
        }, 2000);
      }
    } else {
      if (displayText.length > 0) {
        timer = setTimeout(() => {
          setDisplayText(displayText.slice(0, -1));
        }, 50);
      } else {
        setCurrentIndex((prev) => (prev + 1) % texts.length);
        setIsTyping(true);
      }
    }
    
    return () => clearTimeout(timer);
  }, [displayText, currentIndex, isTyping, texts]);

  return (
    <>
      {displayText}
      <motion.span
        animate={{ opacity: [1, 0, 1] }}
        transition={{ duration: 0.8, repeat: Infinity }}
        className="inline-block w-1 h-8 md:h-12 bg-gradient-to-b from-indigo-600 to-purple-600 ml-2"
      />
    </>
  );
};

// ✅ MAIN Hero Component
export default function Hero() {
  const { isDark } = useTheme();
  const heroRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"]
  });

  const y = useTransform(scrollYProgress, [0, 1], [0, 150]);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

  const roles = useMemo(() => [
    "MERN Stack Enthusiast",
    "Full-Stack Developer",
    "Problem Solver",
    "Tech Learner"
  ], []);

  const socials = useMemo(() => [
    { 
      Icon: Github, 
      href: site.links?.github || "#", 
      label: "GitHub", 
      color: "hover:text-purple-400" 
    },
    { 
      Icon: Linkedin, 
      href: site.links?.linkedin || "#", 
      label: "LinkedIn", 
      color: "hover:text-blue-400" 
    },
    { 
      Icon: Mail, 
      href: `mailto:${site.links?.email || "contact@example.com"}`, 
      label: "Email", 
      color: "hover:text-red-400" 
    }
  ], [site.links]);

  return (
    <section
      ref={heroRef}
      id="hero"
      className={`relative min-h-screen flex items-center justify-center overflow-hidden pt-20 ${
        isDark
          ? "bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950"
          : "bg-gradient-to-br from-slate-50 via-white to-slate-100"
      }`}
    >
      {/* Animated Background Gradient */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div
          className="absolute inset-0"
          animate={{
            background: isDark ? [
              "radial-gradient(circle at 20% 50%, rgba(99, 102, 241, 0.1) 0%, rgba(0, 0, 0, 0) 50%)",
              "radial-gradient(circle at 80% 50%, rgba(139, 92, 246, 0.1) 0%, rgba(0, 0, 0, 0) 50%)",
              "radial-gradient(circle at 50% 50%, rgba(236, 72, 153, 0.1) 0%, rgba(0, 0, 0, 0) 50%)"
            ] : [
              "radial-gradient(circle at 20% 50%, rgba(99, 102, 241, 0.05) 0%, rgba(255, 255, 255, 0) 50%)",
              "radial-gradient(circle at 80% 50%, rgba(139, 92, 246, 0.05) 0%, rgba(255, 255, 255, 0) 50%)",
              "radial-gradient(circle at 50% 50%, rgba(236, 72, 153, 0.05) 0%, rgba(255, 255, 255, 0) 50%)"
            ]
          }}
          transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
        />
      </div>

      {/* Main Content Grid */}
      <motion.div
        style={{ y, opacity }}
        className="relative z-10 max-w-7xl mx-auto px-6 w-full"
      >
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          
          {/* Left Side - Text Content */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="space-y-8"
          >
            {/* Welcome Badge */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.3 }}
              className={`inline-flex items-center gap-2 px-4 py-2 rounded-full border ${
                isDark
                  ? "bg-indigo-500/10 border-indigo-500/30 text-indigo-300"
                  : "bg-indigo-50 border-indigo-200 text-indigo-700"
              }`}
            >
              <Sparkles className="w-4 h-4" />
              <span className="text-sm font-semibold">Welcome to my portfolio</span>
            </motion.div>

            {/* Main Heading */}
            <div>
              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="text-5xl md:text-6xl lg:text-7xl font-black leading-tight mb-4"
              >
                <span className={isDark ? "text-white" : "text-slate-900"}>
                  Hi, I'm{" "}
                </span>
                <span className="bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
                  {site.name || "Dhruv"}
                </span>
              </motion.h1>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 }}
                className="text-2xl md:text-3xl lg:text-4xl font-bold bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 bg-clip-text text-transparent"
              >
                <TypewriterText texts={roles} />
              </motion.div>
            </div>

            {/* Description */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8 }}
              className={`text-lg md:text-xl leading-relaxed max-w-xl ${
                isDark ? "text-slate-300" : "text-slate-600"
              }`}
            >
              Passionate about creating exceptional digital experiences through clean code, 
              modern design, and innovative solutions. Let's build something amazing together!
            </motion.p>

            {/* CTA Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1 }}
              className="flex flex-wrap gap-4"
            >
              <motion.a
                href="#projects"
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
                className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-bold rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300"
              >
                <Rocket className="w-5 h-5" />
                View My Work
              </motion.a>

              <motion.a
                href={site.links?.resume || "#"}
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
                className={`inline-flex items-center gap-2 px-8 py-4 font-bold rounded-xl border-2 transition-all duration-300 ${
                  isDark
                    ? "border-slate-600 text-slate-300 hover:bg-slate-800"
                    : "border-slate-300 text-slate-700 hover:bg-slate-50"
                }`}
              >
                <Download className="w-5 h-5" />
                View Resume
              </motion.a>
            </motion.div>

            {/* Social Links */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.2 }}
              className="flex items-center gap-4"
            >
              {socials.map((social) => (
                <motion.a
                  key={social.label}
                  href={social.href}
                  target={social.href.startsWith('http') ? "_blank" : undefined}
                  rel={social.href.startsWith('http') ? "noopener noreferrer" : undefined}
                  whileHover={{ scale: 1.2, y: -4 }}
                  whileTap={{ scale: 0.9 }}
                  className={`p-3 rounded-full transition-all duration-300 ${
                    isDark
                      ? "bg-slate-800 text-slate-400 hover:bg-slate-700"
                      : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                  } ${social.color}`}
                  aria-label={social.label}
                >
                  <social.Icon className="w-5 h-5" />
                </motion.a>
              ))}
            </motion.div>
          </motion.div>

          {/* Right Side - Code Editor Window */}
          <div className="hidden lg:block">
            <CodeEditorWindow />
          </div>
        </div>
      </motion.div>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
      >
        <motion.a
          href="#about"
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className={`flex flex-col items-center gap-2 transition-colors ${
            isDark ? "text-slate-400 hover:text-indigo-400" : "text-slate-600 hover:text-indigo-600"
          }`}
        >
          <span className="text-sm font-medium">Scroll Down</span>
          <ChevronDown className="w-6 h-6" />
        </motion.a>
      </motion.div>

      {/* Decorative Code Symbols */}
      <motion.div
        className={`absolute top-20 left-10 text-6xl font-mono opacity-10 pointer-events-none select-none ${
          isDark ? "text-indigo-400" : "text-indigo-600"
        }`}
        animate={{ rotate: [0, 10, -10, 0], y: [0, -10, 0] }}
        transition={{ duration: 6, repeat: Infinity }}
        aria-hidden="true"
      >
        {"</>"}
      </motion.div>

      <motion.div
        className={`absolute bottom-20 right-10 text-5xl font-mono opacity-10 pointer-events-none select-none ${
          isDark ? "text-purple-400" : "text-purple-600"
        }`}
        animate={{ rotate: [0, -10, 10, 0], x: [0, 10, 0] }}
        transition={{ duration: 8, repeat: Infinity }}
        aria-hidden="true"
      >
        {"{}"}
      </motion.div>
    </section>
  );
}
