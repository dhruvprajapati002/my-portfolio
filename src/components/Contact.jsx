import { motion, AnimatePresence } from "framer-motion";
import { useState, useCallback, useMemo } from "react";
import { useTheme } from "../contexts/ThemeContext"; // ✅ Import theme context
import Section from "./Section";
import { site } from "../data/site";
import { 
  Mail, 
  Linkedin, 
  Github, 
  Phone, 
  Copy, 
  ExternalLink,
  Send,
  MessageCircle,
  MapPin,
  Calendar,
  Check,
  Sparkles,
  ArrowUpRight,
  Heart,
  Star,
  Zap,
  Clock,
  Globe,
  Coffee,
  User,
  Briefcase
} from "lucide-react";

// ✅ ENHANCED: Theme-aware contact methods with better structure
const getContactMethods = (isDark) => [
  {
    icon: Mail,
    title: "Email",
    value: site.links?.email || "contact@example.com",
    href: `mailto:${site.links?.email || "contact@example.com"}?subject=Let's%20Work%20Together!&body=Hi%20${site.name?.split(' ')[0] || 'there'},%0A%0AI'd%20love%20to%20discuss%20a%20potential%20project%20with%20you.%0A%0A`,
    description: "Drop me a line anytime - I love hearing about new projects and opportunities!",
    gradient: "from-blue-500 to-cyan-500",
    bgGradient: isDark ? "rgba(59, 130, 246, 0.08)" : "rgba(59, 130, 246, 0.12)",
    hoverBg: isDark ? "rgba(59, 130, 246, 0.15)" : "rgba(59, 130, 246, 0.20)",
    copyable: true,
    primary: true,
    responseTime: "Usually responds within 2-4 hours"
  },
  {
    icon: Linkedin,
    title: "LinkedIn",
    value: "Let's connect professionally",
    href: site.links?.linkedin || "#",
    description: "Professional networking, career opportunities & industry insights",
    gradient: "from-blue-600 to-indigo-600",
    bgGradient: isDark ? "rgba(37, 99, 235, 0.08)" : "rgba(37, 99, 235, 0.12)",
    hoverBg: isDark ? "rgba(37, 99, 235, 0.15)" : "rgba(37, 99, 235, 0.20)",
    external: true,
    responseTime: "Active daily"
  },
  {
    icon: Github,
    title: "GitHub",
    value: "Explore my repositories",
    href: site.links?.github || "#",
    description: "Open source projects, code samples & collaborative development",
    gradient: isDark 
      ? "from-gray-600 to-gray-800" 
      : "from-gray-700 to-gray-900",
    bgGradient: isDark ? "rgba(75, 85, 99, 0.08)" : "rgba(75, 85, 99, 0.12)",
    hoverBg: isDark ? "rgba(75, 85, 99, 0.15)" : "rgba(75, 85, 99, 0.20)",
    external: true,
    responseTime: "Updated regularly"
  },
  ...(site.links?.phone ? [{
    icon: Phone,
    title: "Phone",
    value: site.links.phone,
    href: `tel:${site.links.phone}`,
    description: "Direct line for urgent project discussions and consultations",
    gradient: "from-green-500 to-emerald-500",
    bgGradient: isDark ? "rgba(34, 197, 94, 0.08)" : "rgba(34, 197, 94, 0.12)",
    hoverBg: isDark ? "rgba(34, 197, 94, 0.15)" : "rgba(34, 197, 94, 0.20)",
    copyable: true,
    responseTime: "Available Mon-Fri, 9AM-6PM EST"
  }] : [])
];

// ✅ ENHANCED: Theme-aware floating icons
const FloatingIcon = ({ icon: Icon, delay = 0, className = "" }) => {
  const { isDark } = useTheme();
  
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0, rotate: -180 }}
      animate={{ 
        opacity: [0.2, 0.6, 0.2],
        scale: [0.8, 1.2, 0.8],
        rotate: [0, 360],
        y: [0, -20, 0],
        x: [0, 10, 0]
      }}
      transition={{
        duration: 8,
        delay,
        repeat: Infinity,
        ease: "easeInOut"
      }}
      className={`absolute pointer-events-none ${className}`}
      aria-hidden="true"
    >
      <Icon className={`w-6 h-6 ${
        isDark 
          ? "text-indigo-300/30" 
          : "text-indigo-400/40"
      }`} />
    </motion.div>
  );
};

// ✅ ENHANCED: Contact card with theme integration and accessibility
const ContactCard = ({ method, index }) => {
  const { isDark } = useTheme();
  const [copied, setCopied] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  const handleCopy = useCallback(async (e) => {
    e.preventDefault();
    e.stopPropagation();
    
    if (!method.copyable) return;
    
    try {
      await navigator.clipboard.writeText(method.value);
      setCopied(true);
      setTimeout(() => setCopied(false), 3000);
      
      // Announce to screen readers
      const announcement = document.createElement('div');
      announcement.setAttribute('aria-live', 'polite');
      announcement.setAttribute('aria-atomic', 'true');
      announcement.className = 'sr-only';
      announcement.textContent = `${method.title} copied to clipboard`;
      document.body.appendChild(announcement);
      setTimeout(() => document.body.removeChild(announcement), 1000);
    } catch (err) {
      console.warn('Copy failed, using fallback method');
      // Fallback for older browsers
      const textArea = document.createElement('textarea');
      textArea.value = method.value;
      textArea.style.position = 'fixed';
      textArea.style.opacity = '0';
      textArea.style.pointerEvents = 'none';
      document.body.appendChild(textArea);
      textArea.select();
      document.execCommand('copy');
      document.body.removeChild(textArea);
      setCopied(true);
      setTimeout(() => setCopied(false), 3000);
    }
  }, [method.copyable, method.value, method.title]);

  const handleCardClick = useCallback(() => {
    if (method.external) {
      window.open(method.href, '_blank', 'noopener,noreferrer');
    } else if (method.href && !method.copyable) {
      window.location.href = method.href;
    }
  }, [method.external, method.href, method.copyable]);

  const cardVariants = {
    hidden: { 
      opacity: 0, 
      y: 60,
      rotateX: 15,
      scale: 0.9
    },
    visible: { 
      opacity: 1, 
      y: 0,
      rotateX: 0,
      scale: 1,
      transition: {
        duration: 0.7,
        delay: index * 0.1,
        ease: [0.22, 1, 0.36, 1]
      }
    }
  };

  return (
    <motion.article
      variants={cardVariants}
      whileHover={{ 
        y: -8,
        scale: 1.02,
        transition: { duration: 0.3, ease: "easeOut" }
      }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      className={`group relative ${method.primary ? 'md:col-span-2 lg:col-span-1' : ''}`}
      role="article"
      aria-labelledby={`contact-${index}-title`}
    >
      {/* ✅ ENHANCED: Theme-aware card background */}
      <div className={`absolute inset-0 rounded-3xl backdrop-blur-md shadow-xl border transition-all duration-500 ${
        isDark
          ? "bg-gray-800/90 border-gray-700/60 group-hover:shadow-2xl group-hover:shadow-indigo-500/10"
          : "bg-white/90 border-gray-200/60 group-hover:shadow-2xl group-hover:shadow-indigo-500/20"
      }`} />
      
      {/* ✅ ENHANCED: Theme-aware hover background */}
      <motion.div 
        className="absolute inset-0 rounded-3xl transition-opacity duration-300"
        animate={{
          backgroundColor: isHovered ? method.hoverBg : "rgba(0, 0, 0, 0)",
          opacity: isHovered ? 1 : 0
        }}
        transition={{ duration: 0.3 }}
      />

      {/* ✅ ENHANCED: Animated border with theme awareness */}
      <motion.div
        className="absolute inset-0 rounded-3xl"
        animate={{ 
          boxShadow: isHovered 
            ? `0 0 0 2px ${method.bgGradient.replace(/0\.\d+/, '0.4')}`
            : `0 0 0 0px rgba(0, 0, 0, 0)`,
          scale: isHovered ? 1.005 : 1
        }}
        transition={{ duration: 0.3 }}
      />

      {/* ✅ ENHANCED: Glow effect with theme consideration */}
      <motion.div
        className="absolute inset-0 rounded-3xl blur-xl"
        animate={{ 
          backgroundColor: isHovered ? method.bgGradient.replace(/0\.\d+/, '0.15') : "rgba(0, 0, 0, 0)",
          scale: isHovered ? 1.05 : 1,
          opacity: isHovered ? (isDark ? 0.8 : 0.6) : 0
        }}
        transition={{ duration: 0.4 }}
      />

      {/* ✅ ENHANCED: Card content with better structure */}
      <div
        className="relative block p-6 lg:p-8 h-full rounded-3xl overflow-hidden cursor-pointer focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
        onClick={handleCardClick}
        tabIndex={method.external || method.href ? 0 : -1}
        role={method.external || method.href ? "button" : "article"}
        aria-describedby={`contact-${index}-desc`}
        onKeyDown={(e) => {
          if ((e.key === 'Enter' || e.key === ' ') && (method.external || method.href)) {
            e.preventDefault();
            handleCardClick();
          }
        }}
      >
        {/* ✅ ENHANCED: Background pattern with theme awareness */}
        <div className="absolute inset-0 opacity-3">
          <div 
            className="absolute inset-0 rounded-3xl"
            style={{
              background: `radial-gradient(circle at 70% 30%, ${method.bgGradient.replace(/0\.\d+/, '0.03')} 0%, rgba(0,0,0,0) 50%)`
            }}
          />
        </div>

        {/* Header section */}
        <div className="flex items-start justify-between mb-6">
          {/* ✅ ENHANCED: Icon with better animations */}
          <motion.div
            animate={{ 
              rotate: isHovered ? [0, -8, 8, 0] : 0,
              scale: isHovered ? 1.08 : 1
            }}
            transition={{ duration: 0.6 }}
            className={`relative p-4 rounded-2xl bg-gradient-to-r ${method.gradient} shadow-lg`}
          >
            <method.icon 
              className="w-7 h-7 text-white relative z-10" 
              aria-hidden="true" 
            />
            
            {/* ✅ ENHANCED: Icon pulse effect */}
            <motion.div
              className="absolute inset-0 rounded-2xl"
              style={{ backgroundColor: "rgba(255, 255, 255, 0.2)" }}
              animate={{ 
                scale: [1, 1.15, 1], 
                opacity: [0.3, 0.6, 0.3] 
              }}
              transition={{ duration: 3, repeat: Infinity }}
            />
          </motion.div>

          {/* ✅ ENHANCED: Action buttons with better accessibility */}
          <div className="flex gap-2">
            {method.copyable && (
              <motion.button
                onClick={handleCopy}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                className={`p-2.5 rounded-xl transition-all duration-200 shadow-md focus:outline-none focus:ring-2 focus:ring-indigo-500 ${
                  isDark
                    ? "bg-gray-700 hover:bg-gray-600 text-gray-300"
                    : "bg-gray-100 hover:bg-gray-200 text-gray-600"
                }`}
                title={`Copy ${method.title} to clipboard`}
                aria-label={`Copy ${method.title} to clipboard`}
              >
                <AnimatePresence mode="wait">
                  <motion.div
                    key={copied ? 'check' : 'copy'}
                    initial={{ scale: 0, rotate: -90 }}
                    animate={{ scale: 1, rotate: 0 }}
                    exit={{ scale: 0, rotate: 90 }}
                    transition={{ duration: 0.2 }}
                  >
                    {copied ? (
                      <Check className="w-4 h-4 text-green-600" />
                    ) : (
                      <Copy className="w-4 h-4" />
                    )}
                  </motion.div>
                </AnimatePresence>
              </motion.button>
            )}

            {method.external && (
              <motion.button
                onClick={(e) => {
                  e.stopPropagation();
                  window.open(method.href, '_blank', 'noopener,noreferrer');
                }}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                className={`p-2.5 rounded-xl transition-all duration-200 shadow-md focus:outline-none focus:ring-2 focus:ring-indigo-500 ${
                  isDark
                    ? "bg-gray-700 hover:bg-gray-600 text-gray-300"
                    : "bg-gray-100 hover:bg-gray-200 text-gray-600"
                }`}
                aria-label={`Open ${method.title} in new tab`}
              >
                <motion.div
                  animate={{ 
                    x: isHovered ? 2 : 0,
                    y: isHovered ? -2 : 0,
                    rotate: isHovered ? 12 : 0
                  }}
                  transition={{ duration: 0.3 }}
                >
                  <ArrowUpRight className="w-4 h-4" />
                </motion.div>
              </motion.button>
            )}
          </div>
        </div>

        {/* ✅ ENHANCED: Content section with better typography */}
        <div className="space-y-4">
          <div className="space-y-2">
            <motion.h3 
              id={`contact-${index}-title`}
              className={`text-xl lg:text-2xl font-bold transition-all duration-300 ${
                isDark ? "text-white" : "text-gray-900"
              }`}
              animate={{
                backgroundImage: isHovered 
                  ? "linear-gradient(135deg, rgb(99, 102, 241), rgb(139, 92, 246))"
                  : "none",
                backgroundClip: isHovered ? "text" : "unset",
                WebkitBackgroundClip: isHovered ? "text" : "unset",
                color: isHovered ? "transparent" : undefined
              }}
              transition={{ duration: 0.3 }}
            >
              {method.title}
            </motion.h3>
            
            <p className={`font-medium text-lg break-words ${
              isDark ? "text-gray-200" : "text-gray-700"
            }`}>
              {method.value}
            </p>
          </div>
          
          <p 
            id={`contact-${index}-desc`}
            className={`leading-relaxed ${
              isDark ? "text-gray-400" : "text-gray-600"
            }`}
          >
            {method.description}
          </p>

          {/* ✅ ENHANCED: Status indicator with theme awareness */}
          {method.responseTime && (
            <motion.div 
              className="flex items-center gap-2 mt-4"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
            >
              <motion.div 
                className="w-2 h-2 bg-green-500 rounded-full"
                animate={{ scale: [1, 1.2, 1], opacity: [1, 0.7, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
              />
              <span className={`text-sm font-medium flex items-center gap-1 ${
                isDark ? "text-green-400" : "text-green-600"
              }`}>
                <Clock className="w-3 h-3" />
                {method.responseTime}
              </span>
            </motion.div>
          )}
        </div>

        {/* ✅ ENHANCED: Hover call-to-action with theme awareness */}
        <motion.div
          className="mt-6 flex items-center gap-2 text-sm font-semibold"
          animate={{
            opacity: isHovered ? 1 : 0,
            y: isHovered ? 0 : 10
          }}
          transition={{ duration: 0.3 }}
        >
          <span className={`bg-gradient-to-r ${method.gradient} bg-clip-text text-transparent`}>
            {method.external ? "Visit Profile" : method.copyable ? "Click to Copy" : "Get in Touch"}
          </span>
          <motion.div
            animate={{ x: isHovered ? [0, 4, 0] : 0 }}
            transition={{ duration: 1.5, repeat: Infinity }}
          >
            {method.external ? (
              <ExternalLink className="w-4 h-4" />
            ) : method.copyable ? (
              <Copy className="w-4 h-4" />
            ) : (
              <Send className="w-4 h-4" />
            )}
          </motion.div>
        </motion.div>
      </div>

      {/* ✅ ENHANCED: Copy success notification */}
      <AnimatePresence>
        {copied && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.8 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -20, scale: 0.8 }}
            className="absolute top-6 right-6 flex items-center gap-2 px-4 py-2 bg-green-500 text-white text-sm font-semibold rounded-full shadow-lg z-20"
            role="alert"
            aria-live="polite"
          >
            <Check className="w-4 h-4" />
            <span>Copied!</span>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.article>
  );
};

// ✅ MAIN: Enhanced Contact component with theme integration
export default function Contact() {
  const { isDark } = useTheme(); // ✅ Use theme context
  
  // ✅ ENHANCED: Memoized contact methods for better performance
  const contactMethods = useMemo(() => getContactMethods(isDark), [isDark]);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.08,
        delayChildren: 0.2
      }
    }
  };

  return (
    <Section 
      id="contact" 
      title="Get In Touch"
      subtitle="Ready to bring your ideas to life? Let's start a conversation."
    >
      <div className="relative">
        {/* ✅ ENHANCED: Theme-aware background effects */}
        <motion.div
          className="absolute inset-0 overflow-hidden pointer-events-none"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 1 }}
          viewport={{ once: true }}
        >
          <FloatingIcon icon={Heart} delay={0} className="top-20 left-10" />
          <FloatingIcon icon={Star} delay={2} className="top-40 right-20" />
          <FloatingIcon icon={Zap} delay={4} className="bottom-32 left-20" />
          <FloatingIcon icon={Sparkles} delay={1} className="bottom-20 right-10" />
          <FloatingIcon icon={Coffee} delay={3} className="top-1/2 left-1/4" />
          
          {/* ✅ ENHANCED: Theme-aware gradient shapes */}
          <motion.div
            animate={{ 
              rotate: 360,
              scale: [1, 1.1, 1]
            }}
            transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
            className="absolute top-10 -left-20 w-40 h-40 rounded-full blur-3xl opacity-30"
            style={{ 
              background: `radial-gradient(circle, ${
                isDark 
                  ? "rgba(99, 102, 241, 0.08) 0%, rgba(0, 0, 0, 0) 70%"
                  : "rgba(99, 102, 241, 0.12) 0%, rgba(0, 0, 0, 0) 70%"
              })` 
            }}
          />
          <motion.div
            animate={{ 
              rotate: -360,
              scale: [1, 1.2, 1]
            }}
            transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
            className="absolute bottom-20 -right-20 w-56 h-56 rounded-full blur-3xl opacity-30"
            style={{ 
              background: `radial-gradient(circle, ${
                isDark 
                  ? "rgba(139, 92, 246, 0.08) 0%, rgba(0, 0, 0, 0) 70%"
                  : "rgba(139, 92, 246, 0.12) 0%, rgba(0, 0, 0, 0) 70%"
              })` 
            }}
          />
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          className="relative z-10 max-w-6xl mx-auto"
        >
          {/* ✅ ENHANCED: Header with theme integration */}
          <motion.header
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
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
              <MessageCircle className={`w-4 h-4 ${
                isDark ? "text-indigo-400" : "text-indigo-600"
              }`} />
              <span className={`text-sm font-semibold uppercase tracking-wide ${
                isDark ? "text-indigo-400" : "text-indigo-600"
              }`}>
                Let's Connect
              </span>
            </motion.div>
            
            <h2 className="text-4xl md:text-6xl font-bold mb-6">
              <span className="bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
                Ready to Collaborate?
              </span>
            </h2>
            
            <motion.p 
              className={`text-xl max-w-3xl mx-auto leading-relaxed ${
                isDark ? "text-gray-300" : "text-gray-600"
              }`}
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ delay: 0.4, duration: 0.8 }}
              viewport={{ once: true }}
            >
              I'm always excited to discuss new opportunities, innovative projects, or simply chat about the latest in web development. Let's build something amazing together!
            </motion.p>
          </motion.header>

          {/* ✅ ENHANCED: Contact cards grid with better responsiveness */}
          <motion.div 
            variants={containerVariants}
            className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8 mb-16"
            role="list"
            aria-label="Contact methods"
          >
            {contactMethods.map((method, index) => (
              <ContactCard
                key={method.title}
                method={method}
                index={index}
              />
            ))}
          </motion.div>

          {/* ✅ ENHANCED: Call-to-action with theme integration */}
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center space-y-8"
            aria-labelledby="cta-heading"
          >
            <h3 id="cta-heading" className="sr-only">Get started with a project</h3>
            
            {/* Primary CTA */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <motion.a
                href={`mailto:${site.links?.email || "contact@example.com"}?subject=Let's%20Work%20Together!&body=Hi%20${site.name?.split(' ')[0] || 'there'},%0A%0AI'd%20love%20to%20discuss%20a%20potential%20project%20with%20you.%0A%0AHere's%20what%20I%20have%20in%20mind:%0A%0A`}
                whileHover={{ scale: 1.05, y: -3 }}
                whileTap={{ scale: 0.95 }}
                className="group flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-bold rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 relative overflow-hidden focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
              >
                <Send className="w-5 h-5 relative z-10" />
                <span className="relative z-10">Start a Project</span>
                <motion.div
                  animate={{ rotate: [0, 360] }}
                  transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
                  className="relative z-10"
                >
                  <Sparkles className="w-5 h-5" />
                </motion.div>
                
                {/* ✅ ENHANCED: Animated background */}
                <motion.div
                  className="absolute inset-0"
                  initial={{ backgroundColor: "rgba(0, 0, 0, 0)" }}
                  whileHover={{ backgroundColor: "rgba(139, 92, 246, 1)" }}
                  transition={{ duration: 0.3 }}
                />
              </motion.a>

              <motion.div
                whileHover={{ scale: 1.02, y: -1 }}
                className={`flex items-center gap-3 px-6 py-3 backdrop-blur-sm font-semibold rounded-xl border shadow-lg ${
                  isDark
                    ? "bg-gray-800/80 text-gray-300 border-gray-700"
                    : "bg-white/80 text-gray-700 border-gray-200"
                }`}
              >
                <Calendar className="w-4 h-4 text-indigo-600" />
                <span>Available for new projects</span>
              </motion.div>
            </div>

            {/* ✅ ENHANCED: Additional info with theme awareness */}
            <div className={`flex flex-col sm:flex-row items-center justify-center gap-6 text-sm ${
              isDark ? "text-gray-400" : "text-gray-500"
            }`}>
              <div className="flex items-center gap-2">
                <MapPin className="w-4 h-4 text-indigo-500" />
                <span>Based in {site.location || "Remote"}</span>
              </div>
              <div className="hidden sm:block w-1 h-1 bg-gray-400 rounded-full" />
              <div className="flex items-center gap-2">
                <motion.div 
                  className="w-2 h-2 bg-green-500 rounded-full"
                  animate={{ scale: [1, 1.2, 1], opacity: [1, 0.7, 1] }}
                  transition={{ duration: 2, repeat: Infinity }}
                />
                <span>Open for remote opportunities</span>
              </div>
              <div className="hidden sm:block w-1 h-1 bg-gray-400 rounded-full" />
              <div className="flex items-center gap-2">
                <Globe className="w-4 h-4 text-blue-500" />
                <span>Worldwide collaborations welcome</span>
              </div>
            </div>
          </motion.section>
        </motion.div>
      </div>
    </Section>
  );
}
