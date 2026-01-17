// src/components/Chatbot.jsx
import { motion, AnimatePresence } from "framer-motion";
import { useState, useRef, useEffect } from "react";
import { useTheme } from "../contexts/ThemeContext";
import { chatWithGemini } from "../services/gemini.service";
import {
  MessageCircle,
  X,
  Send,
  Bot,
  User,
  Minimize2,
  Maximize2,
  RotateCcw,
  Sparkles,
} from "lucide-react";

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

  // Typing animation effect
  const typeMessage = async (text, callback) => {
    let displayedText = "";
    const words = text.split(" ");

    for (let i = 0; i < words.length; i++) {
      displayedText += (i > 0 ? " " : "") + words[i];
      callback(displayedText);
      await new Promise((resolve) => setTimeout(resolve, 35));
    }
  };

  // Initialize with welcome message when opened
  useEffect(() => {
    if (isOpen && messages.length === 0) {
      setIsTyping(true);

      const welcomeMessage =
        "Hey there! 👋 I'm Dhruv's AI assistant. Ask me anything about his projects, skills, or experience!";

      const tempMessage = {
        type: "bot",
        text: "",
        timestamp: new Date(),
        isTyping: true,
      };

      setMessages([tempMessage]);

      typeMessage(welcomeMessage, (currentText) => {
        setMessages([
          {
            type: "bot",
            text: currentText,
            timestamp: new Date(),
            isTyping: currentText !== welcomeMessage,
          },
        ]);
      }).then(() => {
        setIsTyping(false);
        setShowSuggestions(true);
      });
    }
  }, [isOpen]);

  // Send message using Gemini service
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
      timestamp: new Date(),
    };
    setMessages((prev) => [...prev, newUserMessage]);
    setIsTyping(true);

    try {
      // Call Gemini service directly
      const response = await chatWithGemini(userMessage);

      // Add placeholder for typing animation
      const placeholderMessage = {
        type: "bot",
        text: "",
        timestamp: new Date(),
        isTyping: true,
      };
      setMessages((prev) => [...prev, placeholderMessage]);

      // Type out the response
      await typeMessage(response, (currentText) => {
        setMessages((prev) => {
          const newMessages = [...prev];
          newMessages[newMessages.length - 1] = {
            type: "bot",
            text: currentText,
            timestamp: new Date(),
            isTyping: currentText !== response,
          };
          return newMessages;
        });
      });
    } catch (err) {
      console.error("Chat error:", err);
      setError(err.message);

      // Add error message
      const errorMessage = {
        type: "bot",
        text: "Oops! Something went wrong. Please try again in a moment! 🔄",
        timestamp: new Date(),
        isError: true,
      };
      setMessages((prev) => [...prev, errorMessage]);
    } finally {
      setIsTyping(false);
    }
  };

  const handleReset = () => {
    setMessages([]);
    setError(null);
    setShowSuggestions(false);

    if (isOpen) {
      setIsTyping(true);
      const welcomeMessage =
        "Hey there! 👋 I'm Dhruv's AI assistant. Ask me anything about his projects, skills, or experience!";

      const tempMessage = {
        type: "bot",
        text: "",
        timestamp: new Date(),
        isTyping: true,
      };

      setMessages([tempMessage]);

      typeMessage(welcomeMessage, (currentText) => {
        setMessages([
          {
            type: "bot",
            text: currentText,
            timestamp: new Date(),
            isTyping: currentText !== welcomeMessage,
          },
        ]);
      }).then(() => {
        setIsTyping(false);
        setShowSuggestions(true);
      });
    }
  };

  const handleClose = () => {
    setIsOpen(false);
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
    "How can I contact him?",
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
            className="fixed bottom-4 right-4 sm:bottom-6 sm:right-6 z-50 p-3 sm:p-4 rounded-full text-white shadow-2xl group"
            style={{
              background: "linear-gradient(135deg, #6366f1 0%, #8b5cf6 50%, #ec4899 100%)",
              boxShadow: "0 10px 40px rgba(99, 102, 241, 0.4)",
            }}
            aria-label="Open AI chatbot"
          >
            <motion.div
              animate={{
                rotate: [0, 10, -10, 0],
              }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              <MessageCircle className="w-5 h-5 sm:w-6 sm:h-6" />
            </motion.div>

            {/* Notification pulse */}
            <motion.div
              animate={{
                scale: [1, 1.4, 1],
                opacity: [1, 0.5, 1],
              }}
              transition={{ duration: 2, repeat: Infinity }}
              className="absolute -top-1 -right-1 w-3 h-3 bg-green-400 rounded-full border-2 border-white"
            />

            {/* Glow Effect */}
            <div 
              className="absolute inset-0 rounded-full blur-xl opacity-50 group-hover:opacity-75 transition-opacity -z-10"
              style={{
                background: "linear-gradient(135deg, #6366f1 0%, #ec4899 100%)",
              }}
            />
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
            }}
            exit={{ opacity: 0, y: 100, scale: 0.9 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            className="fixed z-50 overflow-hidden flex flex-col"
            style={{
              bottom: "16px",
              right: "16px",
              width: "min(380px, calc(100vw - 32px))",
              height: isMinimized ? "auto" : "min(520px, calc(100vh - 100px))",
              maxHeight: isMinimized ? "auto" : "calc(100vh - 100px)",
              borderRadius: "24px",
              background: isDark
                ? "linear-gradient(180deg, #0f0f23 0%, #1a1a2e 100%)"
                : "linear-gradient(180deg, #ffffff 0%, #f8fafc 100%)",
              border: isDark ? "1px solid rgba(139, 92, 246, 0.3)" : "1px solid rgba(99, 102, 241, 0.2)",
              boxShadow: isDark
                ? "0 25px 50px -12px rgba(0, 0, 0, 0.5), 0 0 0 1px rgba(139, 92, 246, 0.1), inset 0 1px 0 rgba(255,255,255,0.05)"
                : "0 25px 50px -12px rgba(0, 0, 0, 0.15), 0 0 0 1px rgba(99, 102, 241, 0.1)",
            }}
          >
            {/* Header */}
            <div
              className="relative p-4 flex-shrink-0"
              style={{
                background: "linear-gradient(135deg, #6366f1 0%, #8b5cf6 50%, #a855f7 100%)",
              }}
            >
              {/* Animated gradient overlay */}
              <motion.div
                animate={{
                  backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
                }}
                transition={{ duration: 5, repeat: Infinity, ease: "linear" }}
                className="absolute inset-0 opacity-30"
                style={{
                  background: "linear-gradient(90deg, transparent, rgba(255,255,255,0.3), transparent)",
                  backgroundSize: "200% 100%",
                }}
              />
              
              <div className="flex items-center justify-between relative z-10">
                <div className="flex items-center gap-3">
                  <motion.div
                    animate={{ 
                      boxShadow: [
                        "0 0 0 0 rgba(255,255,255,0.4)",
                        "0 0 0 8px rgba(255,255,255,0)",
                      ]
                    }}
                    transition={{ duration: 2, repeat: Infinity }}
                    className="w-10 h-10 rounded-full bg-white/20 backdrop-blur-xl flex items-center justify-center"
                  >
                    <Bot className="w-5 h-5 text-white" />
                  </motion.div>

                  <div>
                    <h3 className="text-white font-bold text-sm sm:text-base">AI Assistant</h3>
                    <div className="flex items-center gap-1.5 text-xs text-white/80">
                      <motion.div
                        animate={{
                          scale: [1, 1.2, 1],
                        }}
                        transition={{ duration: 2, repeat: Infinity }}
                        className="w-2 h-2 rounded-full bg-green-400"
                      />
                      <span>Online</span>
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-0.5">
                  <motion.button
                    whileHover={{ scale: 1.1, backgroundColor: "rgba(255,255,255,0.1)" }}
                    whileTap={{ scale: 0.9 }}
                    onClick={() => setIsMinimized(!isMinimized)}
                    className="p-2 rounded-lg transition-colors"
                    aria-label={isMinimized ? "Maximize" : "Minimize"}
                  >
                    {isMinimized ? (
                      <Maximize2 className="w-4 h-4 text-white" />
                    ) : (
                      <Minimize2 className="w-4 h-4 text-white" />
                    )}
                  </motion.button>

                  <motion.button
                    whileHover={{ scale: 1.1, rotate: 180, backgroundColor: "rgba(255,255,255,0.1)" }}
                    whileTap={{ scale: 0.9 }}
                    onClick={handleReset}
                    className="p-2 rounded-lg transition-colors"
                    aria-label="Reset conversation"
                  >
                    <RotateCcw className="w-4 h-4 text-white" />
                  </motion.button>

                  <motion.button
                    whileHover={{ scale: 1.1, backgroundColor: "rgba(255,255,255,0.1)" }}
                    whileTap={{ scale: 0.9 }}
                    onClick={handleClose}
                    className="p-2 rounded-lg transition-colors"
                    aria-label="Close chat"
                  >
                    <X className="w-4 h-4 text-white" />
                  </motion.button>
                </div>
              </div>
            </div>

            {/* Content Area - Flex container */}
            {!isMinimized && (
              <div className="flex flex-col flex-1 min-h-0">
                {/* Messages Area - Scrollable */}
                <div
                  className="flex-1 overflow-y-auto p-4 space-y-3"
                  style={{
                    background: isDark ? "#0f0f23" : "#f8fafc",
                  }}
                >
                  {messages.map((message, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, y: 15, scale: 0.95 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      transition={{ duration: 0.2 }}
                      className={`flex gap-2.5 ${
                        message.type === "user" ? "flex-row-reverse" : ""
                      }`}
                    >
                      {/* Avatar */}
                      <div
                        className="w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0"
                        style={{
                          background:
                            message.type === "bot"
                              ? "linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%)"
                              : "linear-gradient(135deg, #ec4899 0%, #f43f5e 100%)",
                          boxShadow:
                            message.type === "bot"
                              ? "0 4px 12px rgba(99, 102, 241, 0.3)"
                              : "0 4px 12px rgba(236, 72, 153, 0.3)",
                        }}
                      >
                        {message.type === "bot" ? (
                          <Bot className="w-4 h-4 text-white" />
                        ) : (
                          <User className="w-4 h-4 text-white" />
                        )}
                      </div>

                      {/* Message Bubble */}
                      <div
                        className="max-w-[80%] px-3.5 py-2.5"
                        style={{
                          borderRadius:
                            message.type === "user"
                              ? "18px 18px 4px 18px"
                              : "18px 18px 18px 4px",
                          background: message.isError
                            ? isDark
                              ? "rgba(239, 68, 68, 0.15)"
                              : "rgba(239, 68, 68, 0.1)"
                            : message.type === "bot"
                            ? isDark
                              ? "rgba(99, 102, 241, 0.1)"
                              : "#ffffff"
                            : "linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%)",
                          border: message.isError
                            ? "1px solid rgba(239, 68, 68, 0.3)"
                            : message.type === "bot"
                            ? isDark
                              ? "1px solid rgba(99, 102, 241, 0.2)"
                              : "1px solid rgba(99, 102, 241, 0.15)"
                            : "none",
                          boxShadow:
                            message.type === "user"
                              ? "0 4px 12px rgba(99, 102, 241, 0.25)"
                              : isDark
                              ? "none"
                              : "0 2px 8px rgba(0, 0, 0, 0.06)",
                          color:
                            message.type === "user"
                              ? "#ffffff"
                              : isDark
                              ? "#e2e8f0"
                              : "#1e293b",
                        }}
                      >
                        <p
                          className="text-sm leading-relaxed whitespace-pre-wrap"
                          style={{ lineHeight: "1.5" }}
                        >
                          {message.text}
                          {message.isTyping && (
                            <motion.span
                              animate={{ opacity: [1, 0.3, 1] }}
                              transition={{ duration: 0.6, repeat: Infinity }}
                              className="inline-block ml-0.5"
                              style={{ color: "#8b5cf6" }}
                            >
                              ▌
                            </motion.span>
                          )}
                        </p>
                        <span
                          className="text-[10px] mt-1.5 block opacity-60"
                        >
                          {message.timestamp.toLocaleTimeString([], {
                            hour: "2-digit",
                            minute: "2-digit",
                          })}
                        </span>
                      </div>
                    </motion.div>
                  ))}

                  {/* Typing Indicator */}
                  {isTyping &&
                    messages[messages.length - 1]?.type !== "bot" && (
                      <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="flex gap-2.5"
                      >
                        <div
                          className="w-8 h-8 rounded-full flex items-center justify-center"
                          style={{
                            background: "linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%)",
                          }}
                        >
                          <Bot className="w-4 h-4 text-white" />
                        </div>
                        <div
                          className="px-4 py-3"
                          style={{
                            borderRadius: "18px 18px 18px 4px",
                            background: isDark ? "rgba(99, 102, 241, 0.1)" : "#ffffff",
                            border: isDark
                              ? "1px solid rgba(99, 102, 241, 0.2)"
                              : "1px solid rgba(99, 102, 241, 0.15)",
                          }}
                        >
                          <div className="flex gap-1">
                            {[0, 1, 2].map((i) => (
                              <motion.div
                                key={i}
                                animate={{ y: [0, -6, 0] }}
                                transition={{
                                  duration: 0.5,
                                  repeat: Infinity,
                                  delay: i * 0.1,
                                }}
                                className="w-2 h-2 rounded-full"
                                style={{ backgroundColor: "#8b5cf6" }}
                              />
                            ))}
                          </div>
                        </div>
                      </motion.div>
                    )}

                  <div ref={messagesEndRef} />
                </div>

                {/* Quick Questions Suggestions */}
                <AnimatePresence>
                  {showSuggestions && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      className="px-4 py-3 flex-shrink-0"
                      style={{
                        background: isDark ? "rgba(99, 102, 241, 0.05)" : "rgba(99, 102, 241, 0.03)",
                        borderTop: isDark
                          ? "1px solid rgba(99, 102, 241, 0.15)"
                          : "1px solid rgba(99, 102, 241, 0.1)",
                      }}
                    >
                      <div className="flex items-center gap-2 mb-2">
                        <Sparkles className="w-3.5 h-3.5" style={{ color: "#8b5cf6" }} />
                        <p
                          className="text-[11px] font-semibold uppercase tracking-wider"
                          style={{ color: isDark ? "rgba(255,255,255,0.5)" : "rgba(0,0,0,0.4)" }}
                        >
                          Quick questions
                        </p>
                      </div>
                      <div className="grid grid-cols-2 gap-1.5">
                        {quickQuestions.map((question, index) => (
                          <motion.button
                            key={index}
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ delay: index * 0.05 }}
                            whileHover={{ scale: 1.02, y: -1 }}
                            whileTap={{ scale: 0.98 }}
                            onClick={() => handleQuickQuestion(question)}
                            className="text-[11px] px-2.5 py-2 text-left transition-all truncate"
                            style={{
                              borderRadius: "10px",
                              background: isDark ? "rgba(99, 102, 241, 0.1)" : "#ffffff",
                              border: isDark
                                ? "1px solid rgba(99, 102, 241, 0.2)"
                                : "1px solid rgba(99, 102, 241, 0.15)",
                              color: isDark ? "#e2e8f0" : "#475569",
                            }}
                          >
                            {question}
                          </motion.button>
                        ))}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>

                {/* Input Area - Fixed at bottom */}
                <div
                  className="p-3 flex-shrink-0"
                  style={{
                    background: isDark ? "#0f0f23" : "#ffffff",
                    borderTop: isDark
                      ? "1px solid rgba(99, 102, 241, 0.15)"
                      : "1px solid rgba(99, 102, 241, 0.1)",
                  }}
                >
                  <div className="flex gap-2">
                    <input
                      ref={inputRef}
                      type="text"
                      value={inputValue}
                      onChange={(e) => setInputValue(e.target.value)}
                      onKeyPress={(e) =>
                        e.key === "Enter" && !isTyping && handleSend()
                      }
                      placeholder="Type your message..."
                      maxLength={500}
                      disabled={isTyping}
                      className="flex-1 px-4 py-2.5 text-sm focus:outline-none transition-all disabled:opacity-50"
                      style={{
                        borderRadius: "12px",
                        background: isDark ? "rgba(99, 102, 241, 0.08)" : "#f1f5f9",
                        border: isDark
                          ? "1px solid rgba(99, 102, 241, 0.2)"
                          : "1px solid #e2e8f0",
                        color: isDark ? "#ffffff" : "#1e293b",
                      }}
                    />
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={handleSend}
                      disabled={!inputValue.trim() || isTyping}
                      className="px-4 py-2.5 disabled:opacity-40 disabled:cursor-not-allowed transition-all"
                      style={{
                        borderRadius: "12px",
                        background: "linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%)",
                        boxShadow: "0 4px 12px rgba(99, 102, 241, 0.3)",
                      }}
                    >
                      <Send className="w-4 h-4 text-white" />
                    </motion.button>
                  </div>
                </div>
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Chatbot;
