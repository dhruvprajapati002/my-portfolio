// src/components/Chatbot.jsx
import { motion, AnimatePresence } from "framer-motion";
import { useState, useRef, useEffect } from "react";
import { useTheme } from "../contexts/ThemeContext";
import {
  MessageCircle,
  X,
  Send,
  Bot,
  User,
  Minimize2,
  Maximize2,
  RotateCcw,
  AlertCircle,
  Sparkles
} from "lucide-react";

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';

const Chatbot = () => {
  const { isDark } = useTheme();
  const [isOpen, setIsOpen] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [messages, setMessages] = useState([]);
  const [inputValue, setInputValue] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [error, setError] = useState(null);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const messagesEndRef = useRef(null);
  const inputRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // ✨ Typing animation effect
  const typeMessage = async (text, callback) => {
    let displayedText = "";
    const words = text.split(" ");
    
    for (let i = 0; i < words.length; i++) {
      displayedText += (i > 0 ? " " : "") + words[i];
      callback(displayedText);
      await new Promise(resolve => setTimeout(resolve, 50)); // Speed of typing
    }
  };

  // ✨ Initialize with typing animation when opened
  useEffect(() => {
    if (isOpen && messages.length === 0) {
      setIsTyping(true);
      
      const welcomeMessage = "👋 Hi! I'm Dhruv's AI assistant. Ask me anything about his projects, skills, or experience!";
      
      const tempMessage = {
        type: "bot",
        text: "",
        timestamp: new Date(),
        isTyping: true
      };
      
      setMessages([tempMessage]);

      // Type out the welcome message
      typeMessage(welcomeMessage, (currentText) => {
        setMessages([{
          type: "bot",
          text: currentText,
          timestamp: new Date(),
          isTyping: currentText !== welcomeMessage
        }]);
      }).then(() => {
        setIsTyping(false);
        setShowSuggestions(true);
      });
    }
  }, [isOpen]);

  // Send message to AI backend
  const handleSend = async () => {
    if (!inputValue.trim()) return;

    const userMessage = inputValue.trim();
    setInputValue("");
    setError(null);
    setShowSuggestions(false);

    // Add user message
    const newUserMessage = {
      type: "user",
      text: userMessage,
      timestamp: new Date()
    };
    setMessages(prev => [...prev, newUserMessage]);
    setIsTyping(true);

    try {
      // Call backend API
      const response = await fetch(`${API_URL}/api/chat`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          message: userMessage
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to get response');
      }

      const data = await response.json();

      // Add placeholder for typing animation
      const placeholderMessage = {
        type: "bot",
        text: "",
        timestamp: new Date(),
        isTyping: true
      };
      setMessages(prev => [...prev, placeholderMessage]);

      // Type out the response
      await typeMessage(data.response, (currentText) => {
        setMessages(prev => {
          const newMessages = [...prev];
          newMessages[newMessages.length - 1] = {
            type: "bot",
            text: currentText,
            timestamp: new Date(),
            isTyping: currentText !== data.response
          };
          return newMessages;
        });
      });

    } catch (err) {
      console.error('Chat error:', err);
      setError(err.message);
      
      // Add error message
      const errorMessage = {
        type: "bot",
        text: "😔 Sorry, I'm having trouble connecting. Please try again in a moment!",
        timestamp: new Date(),
        isError: true
      };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsTyping(false);
    }
  };

  const handleReset = () => {
    setMessages([]);
    setError(null);
    setShowSuggestions(false);
    
    // Re-trigger welcome message
    if (isOpen) {
      setIsTyping(true);
      const welcomeMessage = "👋 Hi! I'm Dhruv's AI assistant. Ask me anything about his projects, skills, or experience!";
      
      const tempMessage = {
        type: "bot",
        text: "",
        timestamp: new Date(),
        isTyping: true
      };
      
      setMessages([tempMessage]);

      typeMessage(welcomeMessage, (currentText) => {
        setMessages([{
          type: "bot",
          text: currentText,
          timestamp: new Date(),
          isTyping: currentText !== welcomeMessage
        }]);
      }).then(() => {
        setIsTyping(false);
        setShowSuggestions(true);
      });
    }
  };

  const handleClose = () => {
    setIsOpen(false);
    // Reset after animation
    setTimeout(() => {
      setMessages([]);
      setShowSuggestions(false);
      setIsMinimized(false);
    }, 300);
  };

  const quickQuestions = [
    "What projects has Dhruv built?",
    "Tell me about his skills",
    "What's his experience?",
    "How can I contact him?"
  ];

  const handleQuickQuestion = (question) => {
    setInputValue(question);
    setShowSuggestions(false);
    inputRef.current?.focus();
  };

  return (
    <>
      {/* Floating Chat Button */}
      <AnimatePresence>
        {!isOpen && (
          <motion.button
            initial={{ scale: 0, rotate: -180 }}
            animate={{ scale: 1, rotate: 0 }}
            exit={{ scale: 0, rotate: 180 }}
            whileHover={{ scale: 1.1, y: -4 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => setIsOpen(true)}
            className="fixed bottom-6 right-6 z-50 p-4 rounded-full bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 text-white shadow-2xl group"
            aria-label="Open AI chatbot"
          >
            <motion.div
              animate={{
                rotate: [0, 10, -10, 0],
              }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              <MessageCircle className="w-6 h-6" />
            </motion.div>

            {/* Notification pulse */}
            <motion.div
              animate={{
                scale: [1, 1.2, 1],
                opacity: [1, 0.5, 1],
              }}
              transition={{ duration: 2, repeat: Infinity }}
              className="absolute -top-1 -right-1 w-3 h-3 bg-green-400 rounded-full border-2 border-white"
            />

            {/* Glow Effect */}
            <div className="absolute inset-0 rounded-full bg-gradient-to-r from-indigo-600 to-pink-600 blur-xl opacity-50 group-hover:opacity-75 transition-opacity" />
          </motion.button>
        )}
      </AnimatePresence>

      {/* Chat Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 100, scale: 0.9 }}
            animate={{ 
              opacity: 1, 
              y: 0, 
              scale: 1,
              height: isMinimized ? "auto" : "600px"
            }}
            exit={{ opacity: 0, y: 100, scale: 0.9 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            className={`fixed bottom-6 right-6 z-50 w-[380px] rounded-3xl shadow-2xl overflow-hidden ${
              isDark
                ? "bg-gray-900 border border-gray-700"
                : "bg-white border border-gray-200"
            }`}
          >
            {/* Header */}
            <div className="relative bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 p-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                    className="w-10 h-10 rounded-full bg-white/20 backdrop-blur-xl flex items-center justify-center"
                  >
                    <Bot className="w-6 h-6 text-white" />
                  </motion.div>
                  
                  <div>
                    <h3 className="text-white font-bold">AI Assistant</h3>
                    <div className="flex items-center gap-1 text-xs text-white/80">
                      <motion.div
                        animate={{
                          scale: [1, 1.2, 1],
                          opacity: [1, 0.5, 1],
                        }}
                        transition={{ duration: 2, repeat: Infinity }}
                        className="w-2 h-2 rounded-full bg-green-400"
                      />
                      <span>Always Online</span>
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-1">
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={() => setIsMinimized(!isMinimized)}
                    className="p-2 rounded-lg hover:bg-white/10 transition-colors"
                    aria-label={isMinimized ? "Maximize" : "Minimize"}
                  >
                    {isMinimized ? (
                      <Maximize2 className="w-4 h-4 text-white" />
                    ) : (
                      <Minimize2 className="w-4 h-4 text-white" />
                    )}
                  </motion.button>

                  <motion.button
                    whileHover={{ scale: 1.1, rotate: 180 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={handleReset}
                    className="p-2 rounded-lg hover:bg-white/10 transition-colors"
                    aria-label="Reset conversation"
                  >
                    <RotateCcw className="w-4 h-4 text-white" />
                  </motion.button>

                  {/* ✨ Close Button */}
                  <motion.button
                    whileHover={{ scale: 1.1, rotate: 90 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={handleClose}
                    className="p-2 rounded-lg hover:bg-white/10 transition-colors"
                    aria-label="Close chat"
                  >
                    <X className="w-4 h-4 text-white" />
                  </motion.button>
                </div>
              </div>
            </div>

            {/* Messages Area */}
            {!isMinimized && (
              <>
                <div className={`h-[400px] overflow-y-auto p-4 space-y-4 ${
                  isDark ? "bg-gray-900" : "bg-gray-50"
                }`}>
                  {messages.map((message, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3 }}
                      className={`flex gap-3 ${
                        message.type === "user" ? "flex-row-reverse" : ""
                      }`}
                    >
                      {/* Avatar */}
                      <div
                        className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${
                          message.type === "bot"
                            ? "bg-gradient-to-r from-indigo-500 to-purple-500"
                            : "bg-gradient-to-r from-pink-500 to-orange-500"
                        }`}
                      >
                        {message.type === "bot" ? (
                          <Bot className="w-5 h-5 text-white" />
                        ) : (
                          <User className="w-5 h-5 text-white" />
                        )}
                      </div>

                      {/* Message Bubble */}
                      <div
                        className={`max-w-[75%] px-4 py-3 rounded-2xl ${
                          message.isError
                            ? "bg-red-500/10 border border-red-500/30"
                            : message.type === "bot"
                            ? isDark
                              ? "bg-gray-800 text-gray-200"
                              : "bg-white text-gray-800 shadow-sm"
                            : "bg-gradient-to-r from-indigo-600 to-purple-600 text-white"
                        }`}
                      >
                        <p className="text-sm leading-relaxed whitespace-pre-wrap">
                          {message.text}
                          {message.isTyping && (
                            <motion.span
                              animate={{ opacity: [1, 0.3, 1] }}
                              transition={{ duration: 0.8, repeat: Infinity }}
                              className="inline-block ml-1"
                            >
                              ▋
                            </motion.span>
                          )}
                        </p>
                        <span className={`text-xs mt-1 block ${
                          message.type === "bot"
                            ? isDark ? "text-gray-500" : "text-gray-400"
                            : "text-white/70"
                        }`}>
                          {message.timestamp.toLocaleTimeString([], { 
                            hour: '2-digit', 
                            minute: '2-digit' 
                          })}
                        </span>
                      </div>
                    </motion.div>
                  ))}

                  {/* Typing Indicator */}
                  {isTyping && messages[messages.length - 1]?.type !== "bot" && (
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="flex gap-3"
                    >
                      <div className="w-8 h-8 rounded-full bg-gradient-to-r from-indigo-500 to-purple-500 flex items-center justify-center">
                        <Bot className="w-5 h-5 text-white" />
                      </div>
                      <div className={`px-4 py-3 rounded-2xl ${
                        isDark ? "bg-gray-800" : "bg-white shadow-sm"
                      }`}>
                        <div className="flex gap-1">
                          {[0, 1, 2].map((i) => (
                            <motion.div
                              key={i}
                              animate={{ y: [0, -8, 0] }}
                              transition={{
                                duration: 0.6,
                                repeat: Infinity,
                                delay: i * 0.1,
                              }}
                              className="w-2 h-2 rounded-full bg-indigo-500"
                            />
                          ))}
                        </div>
                      </div>
                    </motion.div>
                  )}

                  <div ref={messagesEndRef} />
                </div>

                {/* ✨ Quick Questions Suggestions */}
                <AnimatePresence>
                  {showSuggestions && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      className={`px-4 py-3 border-t ${
                        isDark ? "border-gray-700 bg-gray-800/50" : "border-gray-200 bg-white"
                      }`}
                    >
                      <div className="flex items-center gap-2 mb-2">
                        <Sparkles className="w-4 h-4 text-indigo-500" />
                        <p className={`text-xs font-semibold ${
                          isDark ? "text-gray-300" : "text-gray-600"
                        }`}>
                          Quick questions:
                        </p>
                      </div>
                      <div className="grid grid-cols-2 gap-2">
                        {quickQuestions.map((question, index) => (
                          <motion.button
                            key={index}
                            initial={{ opacity: 0, scale: 0.8 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ delay: index * 0.1 }}
                            whileHover={{ scale: 1.05, y: -2 }}
                            whileTap={{ scale: 0.95 }}
                            onClick={() => handleQuickQuestion(question)}
                            className={`text-xs px-3 py-2 rounded-lg border text-left ${
                              isDark
                                ? "bg-gray-700 text-gray-300 border-gray-600 hover:bg-gray-600"
                                : "bg-gray-100 text-gray-700 border-gray-200 hover:bg-gray-200"
                            }`}
                          >
                            {question}
                          </motion.button>
                        ))}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>

                {/* Input Area */}
                <div className={`p-4 border-t ${
                  isDark ? "border-gray-700 bg-gray-800" : "border-gray-200 bg-white"
                }`}>
                  <div className="flex gap-2">
                    <input
                      ref={inputRef}
                      type="text"
                      value={inputValue}
                      onChange={(e) => setInputValue(e.target.value)}
                      onKeyPress={(e) => e.key === "Enter" && !isTyping && handleSend()}
                      placeholder="Ask me anything..."
                      maxLength={500}
                      disabled={isTyping}
                      className={`flex-1 px-4 py-3 rounded-xl border-2 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all disabled:opacity-50 ${
                        isDark
                          ? "bg-gray-900 border-gray-700 text-white placeholder-gray-500"
                          : "bg-gray-50 border-gray-200 text-gray-900 placeholder-gray-400"
                      }`}
                    />
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={handleSend}
                      disabled={!inputValue.trim() || isTyping}
                      className="px-4 py-3 rounded-xl bg-gradient-to-r from-indigo-600 to-purple-600 text-white disabled:opacity-50 disabled:cursor-not-allowed shadow-lg hover:shadow-xl transition-all"
                    >
                      <Send className="w-5 h-5" />
                    </motion.button>
                  </div>
                  <p className={`text-xs mt-2 ${isDark ? "text-gray-500" : "text-gray-400"}`}>
                    {inputValue.length}/500 characters
                  </p>
                </div>
              </>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Chatbot;
