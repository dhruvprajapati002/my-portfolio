import { motion, useScroll, useTransform } from "framer-motion";
import { 
  ArrowUp, 
  Heart, 
  Github, 
  Linkedin, 
  Mail,
  MapPin,
  Coffee,
  Code,
  Sparkles,
  Send,
  Star,
  Zap,
  Globe,
  Clock,
  Check,
  ChevronRight,
  GraduationCap,
  Users
} from "lucide-react";
import { useState, useEffect, useRef, useCallback, useMemo } from "react";
import { useTheme } from "../contexts/ThemeContext";
import { site } from "../data/site";

// ✅ FIXED: Minimal floating elements
const FloatingElement = ({ icon: Icon, delay = 0, className = "" }) => {
  const { isDark } = useTheme();
  
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.5 }}
      animate={{ 
        opacity: isDark ? 0.08 : 0.12,
        scale: [0.8, 1.2, 0.8],
        rotate: [0, 180, 360],
      }}
      transition={{
        duration: 20 + Math.random() * 10,
        delay,
        repeat: Infinity,
        ease: "linear"
      }}
      className={`absolute pointer-events-none ${className}`}
      aria-hidden="true"
    >
      <Icon className={`w-8 h-8 ${
        isDark ? "text-indigo-400/20" : "text-indigo-500/25"
      }`} />
    </motion.div>
  );
};

// ✅ FIXED: Social link cards
const SocialLink = ({ href, icon: Icon, label, count, bgGradient }) => {
  const { isDark } = useTheme();
  
  return (
    <motion.a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      whileHover={{ 
        y: -8,
        scale: 1.05,
        transition: { type: "spring", stiffness: 400, damping: 10 }
      }}
      whileTap={{ scale: 0.95 }}
      className={`group relative p-6 rounded-3xl backdrop-blur-xl border transition-all duration-500 overflow-hidden ${
        isDark
          ? "bg-gray-800/40 border-gray-700/50 hover:bg-gray-800/60"
          : "bg-white/60 border-gray-200/50 hover:bg-white/80"
      } hover:border-indigo-300 hover:shadow-2xl hover:shadow-indigo-500/10`}
      aria-label={`${label} - ${count}`}
    >
      <motion.div
        className={`absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-gradient-to-br ${bgGradient}`}
        initial={{ opacity: 0 }}
        whileHover={{ opacity: 0.05 }}
      />
      
      <div className="relative z-10 text-center">
        <motion.div
          className="mb-4 mx-auto w-fit"
          whileHover={{ rotate: [0, -15, 15, 0] }}
          transition={{ duration: 0.6 }}
        >
          <div className={`p-4 rounded-2xl ${
            isDark ? "bg-gray-700/50" : "bg-gray-100/80"
          } group-hover:bg-gradient-to-br group-hover:${bgGradient} transition-all duration-500`}>
            <Icon className={`w-7 h-7 ${
              isDark ? "text-gray-300" : "text-gray-700"
            } group-hover:text-white transition-colors duration-500`} />
          </div>
        </motion.div>
        
        <h4 className={`font-bold text-lg mb-1 ${
          isDark ? "text-white" : "text-gray-900"
        }`}>
          {label}
        </h4>
        
        <p className={`text-sm ${
          isDark ? "text-gray-400" : "text-gray-500"
        } group-hover:text-indigo-500 transition-colors duration-300`}>
          {count}
        </p>
      </div>
    </motion.a>
  );
};

// ✅ FIXED: Quick links
const QuickLink = ({ href, children, icon: Icon, description }) => {
  const { isDark } = useTheme();
  
  return (
    <motion.a
      href={href}
      whileHover={{ x: 12, backgroundColor: isDark ? "rgba(99, 102, 241, 0.05)" : "rgba(99, 102, 241, 0.08)" }}
      className={`group flex items-center gap-4 p-4 rounded-2xl transition-all duration-300 ${
        isDark ? "hover:bg-indigo-500/5" : "hover:bg-indigo-500/8"
      }`}
    >
      <motion.div
        whileHover={{ scale: 1.2, rotate: 15 }}
        className={`p-3 rounded-xl ${
          isDark ? "bg-indigo-500/10" : "bg-indigo-50"
        } group-hover:bg-indigo-500 transition-all duration-300`}
      >
        <Icon className={`w-5 h-5 ${
          isDark ? "text-indigo-400" : "text-indigo-600"
        } group-hover:text-white transition-colors duration-300`} />
      </motion.div>
      
      <div className="flex-1">
        <div className={`flex items-center gap-2 font-semibold text-lg ${
          isDark ? "text-white" : "text-gray-900"
        } group-hover:text-indigo-600 transition-colors duration-300`}>
          {children}
          <motion.div
            initial={{ x: -5, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            className="group-hover:translate-x-2 transition-transform duration-300"
          >
            <ChevronRight className="w-4 h-4" />
          </motion.div>
        </div>
        <p className={`text-sm mt-1 ${
          isDark ? "text-gray-400" : "text-gray-600"
        }`}>
          {description}
        </p>
      </div>
    </motion.a>
  );
};

// ✅ FIXED: Newsletter signup
const NewsletterSignup = () => {
  const { isDark } = useTheme();
  const [email, setEmail] = useState("");
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = useCallback(async (e) => {
    e.preventDefault();
    if (!email || isLoading) return;

    setIsLoading(true);
    await new Promise(resolve => setTimeout(resolve, 1500));
    setIsSubscribed(true);
    
    setTimeout(() => {
      setIsSubscribed(false);
      setEmail("");
    }, 5000);
    setIsLoading(false);
  }, [email, isLoading]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.6 }}
      viewport={{ once: true }}
      className={`p-8 rounded-3xl border backdrop-blur-xl ${
        isDark
          ? "bg-gradient-to-br from-indigo-900/20 via-purple-900/20 to-pink-900/20 border-indigo-800/50"
          : "bg-gradient-to-br from-indigo-50/80 via-purple-50/80 to-pink-50/80 border-indigo-200/50"
      }`}
    >
      <div className="text-center mb-6">
        <motion.div
          whileHover={{ rotate: 360 }}
          transition={{ duration: 0.8 }}
          className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-r from-indigo-500 to-purple-600 text-white mb-4 shadow-lg"
        >
          <GraduationCap className="w-8 h-8" />
        </motion.div>
        
        <h4 className={`text-2xl font-bold mb-2 ${
          isDark ? "text-white" : "text-gray-900"
        }`}>
          Follow My Journey
        </h4>
        
        <p className={`${isDark ? "text-gray-300" : "text-gray-600"}`}>
          Get updates on my learning progress, new projects, and tech discoveries
        </p>
      </div>
      
      {!isSubscribed ? (
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="relative">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email address"
              className={`w-full px-6 py-4 rounded-2xl border-2 text-lg font-medium transition-all duration-300 focus:outline-none focus:ring-4 focus:ring-indigo-500/20 ${
                isDark
                  ? "bg-gray-800/50 border-gray-600 text-white placeholder-gray-400 focus:border-indigo-400"
                  : "bg-white/80 border-gray-200 text-gray-900 placeholder-gray-500 focus:border-indigo-500"
              }`}
              required
              disabled={isLoading}
            />
          </div>
          
          <motion.button
            type="submit"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            disabled={!email || isLoading}
            className="w-full py-4 px-6 bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 text-white rounded-2xl font-bold text-lg hover:shadow-2xl hover:shadow-indigo-500/25 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300"
          >
            <div className="flex items-center justify-center gap-3">
              {isLoading ? (
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                >
                  <Sparkles className="w-6 h-6" />
                </motion.div>
              ) : (
                <Send className="w-6 h-6" />
              )}
              <span>{isLoading ? "Subscribing..." : "Subscribe Now"}</span>
            </div>
          </motion.button>
        </form>
      ) : (
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          className="text-center py-8"
        >
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: "spring", stiffness: 200, delay: 0.2 }}
            className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-gradient-to-r from-green-500 to-emerald-600 text-white mb-4"
          >
            <Check className="w-10 h-10" />
          </motion.div>
          
          <h5 className={`text-xl font-bold mb-2 ${
            isDark ? "text-white" : "text-gray-900"
          }`}>
            Welcome aboard! 🎉
          </h5>
          
          <p className={`${isDark ? "text-gray-300" : "text-gray-600"}`}>
            Thanks for joining my learning journey. You'll receive updates soon!
          </p>
        </motion.div>
      )}
    </motion.div>
  );
};

// ✅ FIXED: Stats section
const StatsSection = () => {
  const { isDark } = useTheme();
  
  const stats = [
    {
      label: "Projects Built",
      value: site.stats?.projectsCompleted || 6,
      icon: Code,
      gradient: "from-blue-500 to-cyan-500"
    },
    {
      label: "Year Learning",
      value: `${site.stats?.yearsExperience || 1}+`,
      icon: GraduationCap,
      gradient: "from-green-500 to-emerald-500"
    },
    {
      label: "Technologies",
      value: `${site.stats?.technologiesUsed || 20}+`,
      icon: Zap,
      gradient: "from-purple-500 to-pink-500"
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
      {stats.map((stat, index) => (
        <motion.div
          key={stat.label}
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          whileHover={{ y: -8, scale: 1.02 }}
          transition={{ 
            delay: index * 0.2,
            type: "spring",
            stiffness: 300,
            damping: 20
          }}
          viewport={{ once: true }}
          className={`relative p-8 rounded-3xl backdrop-blur-xl border text-center overflow-hidden group ${
            isDark
              ? "bg-gray-800/30 border-gray-700/50"
              : "bg-white/50 border-gray-200/50"
          }`}
        >
          <motion.div
            className={`absolute inset-0 bg-gradient-to-br ${stat.gradient} opacity-0 group-hover:opacity-10 transition-opacity duration-500`}
          />
          
          <motion.div
            whileHover={{ rotate: 360, scale: 1.1 }}
            transition={{ duration: 0.8 }}
            className={`inline-flex items-center justify-center w-20 h-20 rounded-2xl bg-gradient-to-r ${stat.gradient} text-white mb-6 shadow-xl`}
          >
            <stat.icon className="w-10 h-10" />
          </motion.div>
          
          <motion.div 
            className={`text-4xl font-black mb-2 bg-gradient-to-r ${stat.gradient} bg-clip-text text-transparent`}
            whileHover={{ scale: 1.1 }}
          >
            {stat.value}
          </motion.div>
          
          <div className={`text-lg font-semibold ${
            isDark ? "text-gray-300" : "text-gray-600"
          }`}>
            {stat.label}
          </div>
        </motion.div>
      ))}
    </div>
  );
};

// ✅ FIXED: Back to top button with new API
const BackToTop = () => {
  const { isDark } = useTheme();
  const [isVisible, setIsVisible] = useState(false);
  const { scrollY } = useScroll();
  
  // ✅ FIX: Use new Framer Motion API with proper cleanup
  useEffect(() => {
    const unsubscribe = scrollY.on("change", (latest) => {
      setIsVisible(latest > 500);
    });
    
    return () => unsubscribe();
  }, [scrollY]);

  const scrollToTop = useCallback(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  return (
    <motion.button
      onClick={scrollToTop}
      initial={{ opacity: 0, scale: 0 }}
      animate={{ 
        opacity: isVisible ? 1 : 0,
        scale: isVisible ? 1 : 0,
        rotate: isVisible ? 0 : 180
      }}
      whileHover={{ 
        scale: 1.15, 
        y: -5,
        boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.25)"
      }}
      whileTap={{ scale: 0.9 }}
      className="fixed bottom-8 right-8 p-4 bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 text-white rounded-full shadow-2xl z-50 group"
      style={{ backdropFilter: 'blur(12px)' }}
    >
      <ArrowUp className="w-7 h-7 group-hover:-translate-y-1 transition-transform duration-300" />
      
      <motion.div
        className="absolute inset-0 rounded-full bg-white/20"
        animate={{
          scale: [1, 2, 1],
          opacity: [0.5, 0, 0.5]
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />
    </motion.button>
  );
};

// ✅ MAIN: Fixed Footer component
export default function Footer() {
  const { isDark } = useTheme();
  const footerRef = useRef(null);
  const currentYear = new Date().getFullYear();
  
  const socialLinks = useMemo(() => [
    { 
      href: site.links?.github || "#", 
      icon: Github, 
      label: "GitHub",
      count: "Open Source",
      bgGradient: "from-gray-600 to-gray-800"
    },
    { 
      href: site.links?.linkedin || "#", 
      icon: Linkedin, 
      label: "LinkedIn",
      count: "Professional",
      bgGradient: "from-blue-600 to-blue-700"
    },
    { 
      href: `mailto:${site.links?.email || "contact@example.com"}`, 
      icon: Mail, 
      label: "Email",
      count: "Direct Contact",
      bgGradient: "from-red-500 to-red-600"
    },
  ], []);

  const quickLinks = useMemo(() => [
    { href: "#about", label: "About", icon: Users, description: "My background and journey" },
    { href: "#education", label: "Education", icon: GraduationCap, description: "Academic foundation" },
    { href: "#skills", label: "Skills", icon: Zap, description: "Technologies I work with" },
    { href: "#projects", label: "Projects", icon: Code, description: "My learning projects" },
    { href: "#contact", label: "Contact", icon: Send, description: "Let's connect" }
  ], []);

  return (
    <>
      <motion.footer
        ref={footerRef}
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        className={`relative mt-32 ${
          isDark
            ? "bg-gradient-to-b from-gray-900 via-gray-800 to-black"
            : "bg-gradient-to-b from-gray-50 via-white to-gray-100"
        }`}
      >
        {/* Subtle background pattern */}
        <div className="absolute inset-0 opacity-30">
          <div className={`absolute inset-0 ${
            isDark 
              ? "bg-[radial-gradient(circle_at_1px_1px,rgba(99,102,241,0.15)_1px,transparent_0)]" 
              : "bg-[radial-gradient(circle_at_1px_1px,rgba(99,102,241,0.08)_1px,transparent_0)]"
          }`} style={{ backgroundSize: '50px 50px' }} />
        </div>

        {/* Floating elements */}
        <div className="absolute inset-0 overflow-hidden">
          {[Code, Coffee, Sparkles, Globe, Star, Heart].map((Icon, i) => (
            <FloatingElement 
              key={i}
              icon={Icon} 
              delay={i * 2} 
              className={`
                ${i === 0 ? 'top-20 left-[10%]' : ''}
                ${i === 1 ? 'top-40 right-[15%]' : ''}
                ${i === 2 ? 'bottom-60 left-[20%]' : ''}
                ${i === 3 ? 'bottom-40 right-[25%]' : ''}
                ${i === 4 ? 'top-32 left-1/2' : ''}
                ${i === 5 ? 'bottom-20 right-[10%]' : ''}
              `}
            />
          ))}
        </div>

        <div className="relative max-w-7xl mx-auto px-6 py-24">
          {/* Header */}
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-20"
          >
            <motion.div
              initial={{ scale: 0 }}
              whileInView={{ scale: 1 }}
              transition={{ type: "spring", stiffness: 200, delay: 0.2 }}
              className={`inline-flex items-center gap-3 px-8 py-4 rounded-full border backdrop-blur-xl mb-8 ${
                isDark
                  ? "bg-indigo-500/10 border-indigo-700/50"
                  : "bg-indigo-50/80 border-indigo-200/50"
              }`}
            >
              <Sparkles className="w-6 h-6 text-indigo-600" />
              <span className={`font-bold text-lg ${
                isDark ? "text-indigo-300" : "text-indigo-700"
              }`}>
                Let's Build Something Amazing Together
              </span>
            </motion.div>
            
            <h2 className="text-5xl md:text-7xl font-black mb-8">
              <span className="bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
                Ready to Connect?
              </span>
            </h2>
            
            <p className={`text-xl md:text-2xl max-w-4xl mx-auto leading-relaxed ${
              isDark ? "text-gray-300" : "text-gray-600"
            }`}>
              Whether you have an exciting opportunity, want to collaborate on a project, 
              or just want to chat about tech – I'm always eager to connect!
            </p>
          </motion.div>

          {/* Stats */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            viewport={{ once: true }}
            className="mb-24"
          >
            <StatsSection />
          </motion.div>

          {/* Main content grid */}
          <div className="grid lg:grid-cols-12 gap-12 mb-20">
            {/* Brand section */}
            <div className="lg:col-span-5 space-y-8">
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
              >
                <h3 className="text-4xl font-black mb-6 bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
                  {site.name || "Dhruv Prajapati"}
                </h3>
                <p className={`text-xl leading-relaxed mb-8 ${
                  isDark ? "text-gray-300" : "text-gray-600"
                }`}>
                  {site.summary || "Aspiring full‑stack developer passionate about creating innovative solutions through code."}
                </p>

                {/* Contact info cards */}
                <div className="space-y-4">
                  {[
                    { icon: MapPin, label: "Location", value: site.location || "Mahesana, India", sublabel: "Open to remote work" },
                    { icon: Globe, label: "Availability", value: "Seeking Opportunities", sublabel: "Internships & Entry-level" },
                    { icon: Clock, label: "Response Time", value: "Within 24 hours", sublabel: "Usually much faster!" }
                  ].map((item, index) => (
                    <motion.div
                      key={item.label}
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 }}
                      viewport={{ once: true }}
                      className={`flex items-center gap-4 p-4 rounded-2xl backdrop-blur-sm ${
                        isDark ? "bg-gray-800/30" : "bg-white/50"
                      }`}
                    >
                      <div className={`p-3 rounded-xl ${
                        isDark ? "bg-indigo-500/20" : "bg-indigo-100"
                      }`}>
                        <item.icon className="w-5 h-5 text-indigo-600" />
                      </div>
                      <div>
                        <div className={`font-semibold ${
                          isDark ? "text-white" : "text-gray-900"
                        }`}>
                          {item.value}
                        </div>
                        <div className={`text-sm ${
                          isDark ? "text-gray-400" : "text-gray-600"
                        }`}>
                          {item.sublabel}
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            </div>

            {/* Navigation */}
            <div className="lg:col-span-3">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                viewport={{ once: true }}
              >
                <h4 className={`text-2xl font-bold mb-8 ${
                  isDark ? "text-white" : "text-gray-900"
                }`}>
                  Quick Links
                </h4>
                <nav className="space-y-2">
                  {quickLinks.map((link) => (
                    <QuickLink 
                      key={link.label}
                      href={link.href}
                      icon={link.icon}
                      description={link.description}
                    >
                      {link.label}
                    </QuickLink>
                  ))}
                </nav>
              </motion.div>
            </div>

            {/* Newsletter */}
            <div className="lg:col-span-4">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                viewport={{ once: true }}
              >
                <NewsletterSignup />
              </motion.div>
            </div>
          </div>

          {/* Social links */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            viewport={{ once: true }}
            className="mb-16"
          >
            <h4 className={`text-3xl font-bold text-center mb-12 ${
              isDark ? "text-white" : "text-gray-900"
            }`}>
              Let's Connect
            </h4>
            <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
              {socialLinks.map((social) => (
                <SocialLink
                  key={social.label}
                  href={social.href}
                  icon={social.icon}
                  label={social.label}
                  count={social.count}
                  bgGradient={social.bgGradient}
                />
              ))}
            </div>
          </motion.div>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            viewport={{ once: true }}
            className="flex flex-col sm:flex-row gap-6 justify-center items-center mb-16"
          >
            <motion.a
              href={`mailto:${site.links?.email || "contact@example.com"}`}
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
              className="flex items-center gap-4 px-10 py-5 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-2xl font-bold text-lg hover:shadow-2xl transition-all duration-300 group"
            >
              <Send className="w-6 h-6 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform duration-300" />
              <span>Send Message</span>
            </motion.a>
            
            {site.links?.resume && (
              <motion.a
                href={site.links.resume}
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
                className={`flex items-center gap-4 px-10 py-5 border-2 rounded-2xl font-bold text-lg transition-all duration-300 group ${
                  isDark
                    ? "border-gray-600 text-gray-300 hover:border-indigo-500 hover:text-indigo-400"
                    : "border-gray-300 text-gray-700 hover:border-indigo-500 hover:text-indigo-600"
                }`}
              >
                <svg className="w-6 h-6 group-hover:translate-y-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                </svg>
                <span>Download Resume</span>
              </motion.a>
            )}
          </motion.div>

          {/* Bottom */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ delay: 0.7 }}
            viewport={{ once: true }}
            className={`pt-12 border-t text-center ${
              isDark ? "border-gray-700" : "border-gray-200"
            }`}
          >
            <div className={`flex flex-col md:flex-row justify-between items-center gap-6 ${
              isDark ? "text-gray-400" : "text-gray-600"
            }`}>
              <div className="flex items-center gap-2 text-lg">
                <span>© {currentYear} {site.name || "Dhruv Prajapati"}. Made with</span>
                <motion.div
                  animate={{ scale: [1, 1.2, 1] }}
                  transition={{ duration: 1.5, repeat: Infinity }}
                >
                  <Heart className="w-5 h-5 text-red-500 fill-current" />
                </motion.div>
                <span>and</span>
                <Coffee className="w-5 h-5 text-amber-600" />
              </div>
              
              <div className="flex items-center gap-3 text-sm font-medium">
                <Code className="w-4 h-4" />
                <span>React • Tailwind • Framer Motion</span>
              </div>
            </div>
          </motion.div>
        </div>
      </motion.footer>

      
    </>
  );
}
