// src/components/Projects.jsx
import { motion, useInView } from "framer-motion";
import { useState, useRef, useMemo } from "react";
import { useTheme } from "../contexts/ThemeContext";
import Section from "./Section";
import ProjectCard from "./ProjectCard";
import ComingSoonModal from "./ComingSoonModal";
import { site } from "../data/site";
import { 
  Filter, 
  Grid3x3, 
  List, 
  Search, 
  Sparkles, 
  Code, 
  Globe, 
  Award,
  ArrowUpRight,
  Star,
  X
} from "lucide-react";

export default function Projects() {
  const { isDark } = useTheme();
  const [viewMode, setViewMode] = useState('grid');
  const [filter, setFilter] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  
  const [modal, setModal] = useState({
    isOpen: false,
    projectName: ""
  });
  
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });

  const projects = site?.projects || [];

  const handleDemoUnavailable = (projectName) => {
    setModal({
      isOpen: true,
      projectName: projectName
    });
  };

  const closeModal = () => {
    setModal({
      isOpen: false,
      projectName: ""
    });
  };

  const filteredProjects = useMemo(() => {
    let filtered = projects;

    if (filter !== 'all') {
      filtered = filtered.filter(project => 
        project.category?.toLowerCase() === filter.toLowerCase()
      );
    }

    if (searchQuery) {
      filtered = filtered.filter(project =>
        project.name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        project.description?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        project.tech?.some(tech => 
          tech.toLowerCase().includes(searchQuery.toLowerCase())
        )
      );
    }

    return filtered;
  }, [projects, filter, searchQuery]);

  const categories = useMemo(() => {
    const cats = ['all', ...new Set(projects.map(p => p.category).filter(Boolean))];
    return cats;
  }, [projects]);

  const stats = useMemo(() => ({
    total: projects.length,
    completed: projects.filter(p => 
      p.status?.toLowerCase() === 'completed' || 
      p.status === 'Completed'
    ).length,
    technologies: new Set(projects.flatMap(p => p.tech || [])).size,
    featured: projects.filter(p => p.featured).length
  }), [projects]);

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

  const itemVariants = {
    hidden: { opacity: 0, y: 30, scale: 0.95 },
    visible: { 
      opacity: 1, 
      y: 0, 
      scale: 1,
      transition: {
        duration: 0.6,
        ease: [0.22, 1, 0.36, 1]
      }
    }
  };

  return (
    <Section
      id="projects"
      title="Projects"
      subtitle="A showcase of my learning journey through hands-on development"
    >
      <div className="relative" ref={sectionRef}>
        {/* Background effects */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div 
            className={`absolute inset-0 ${isDark ? "opacity-[0.03]" : "opacity-[0.02]"}`}
            style={{
              backgroundImage: `
                linear-gradient(rgba(99, 102, 241, ${isDark ? '0.08' : '0.1'}) 1px, transparent 1px),
                linear-gradient(90deg, rgba(99, 102, 241, ${isDark ? '0.08' : '0.1'}) 1px, transparent 1px)
              `,
              backgroundSize: '50px 50px'
            }}
          />
          
          <motion.div
            animate={{ 
              rotate: 360,
              scale: [1, 1.1, 1]
            }}
            transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
            className="absolute top-1/4 -left-20 w-96 h-96 rounded-full blur-3xl opacity-20"
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
            className="absolute bottom-1/4 -right-20 w-96 h-96 rounded-full blur-3xl opacity-20"
            style={{ 
              background: `radial-gradient(circle, ${
                isDark 
                  ? "rgba(139, 92, 246, 0.1) 0%, rgba(0, 0, 0, 0) 70%"
                  : "rgba(139, 92, 246, 0.15) 0%, rgba(0, 0, 0, 0) 70%"
              })` 
            }}
          />
        </div>

        <motion.div
          className="relative z-10 max-w-7xl mx-auto"
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
        >
          {/* Statistics */}
          <motion.div
            variants={itemVariants}
            className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-3xl mx-auto mb-16"
          >
            {[
              { icon: Code, label: "Projects", value: stats.total, color: "text-blue-500", bg: "from-blue-500 to-cyan-500" },
              { icon: Star, label: "Completed", value: stats.completed, color: "text-amber-500", bg: "from-amber-500 to-orange-500" },
              { icon: Globe, label: "Technologies", value: stats.technologies, color: "text-green-500", bg: "from-green-500 to-emerald-500" },
              { icon: Award, label: "Featured", value: stats.featured, color: "text-purple-500", bg: "from-purple-500 to-pink-500" }
            ].map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                transition={{ delay: 0.2 + index * 0.1 }}
                whileHover={{ scale: 1.05, y: -4 }}
                className={`relative p-6 backdrop-blur-xl rounded-2xl border overflow-hidden group ${
                  isDark
                    ? "bg-gray-800/80 border-gray-700/60"
                    : "bg-white/80 border-gray-200/60"
                } shadow-lg hover:shadow-xl transition-all duration-300`}
              >
                {/* Gradient overlay on hover */}
                <motion.div
                  className={`absolute inset-0 bg-gradient-to-br ${stat.bg} opacity-0 group-hover:opacity-10 transition-opacity duration-300`}
                />

                <div className="relative z-10">
                  <motion.div
                    whileHover={{ rotate: 360, scale: 1.1 }}
                    transition={{ duration: 0.6 }}
                    className={`inline-flex items-center justify-center w-12 h-12 rounded-xl mb-3 bg-gradient-to-br ${stat.bg}`}
                  >
                    <stat.icon className="w-6 h-6 text-white" />
                  </motion.div>
                  
                  <div className={`text-3xl font-black mb-1 ${
                    isDark ? "text-white" : "text-gray-900"
                  }`}>
                    {stat.value}
                  </div>
                  
                  <div className={`text-sm font-semibold uppercase tracking-wide ${
                    isDark ? "text-gray-400" : "text-gray-500"
                  }`}>
                    {stat.label}
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>

          {/* ✅ FIXED: Enhanced Controls Panel */}
          <motion.div
            variants={itemVariants}
            className={`mb-12 p-6 backdrop-blur-xl rounded-3xl border shadow-xl ${
              isDark
                ? "bg-gray-800/80 border-gray-700/60"
                : "bg-white/80 border-gray-200/60"
            }`}
          >
            {/* Search Bar */}
            <div className="mb-6">
              <div className="relative">
                <Search className={`absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 ${
                  isDark ? "text-gray-400" : "text-gray-500"
                }`} />
                <input
                  type="text"
                  placeholder="Search projects, technologies..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className={`w-full pl-12 pr-12 py-4 border-2 rounded-2xl focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-200 placeholder-gray-500 font-medium ${
                    isDark
                      ? "bg-gray-900 border-gray-700 text-white"
                      : "bg-white border-gray-200 text-gray-900"
                  }`}
                />
                {searchQuery && (
                  <motion.button
                    initial={{ opacity: 0, scale: 0 }}
                    animate={{ opacity: 1, scale: 1 }}
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={() => setSearchQuery('')}
                    className={`absolute right-4 top-1/2 transform -translate-y-1/2 p-1 rounded-lg ${
                      isDark ? "hover:bg-gray-700" : "hover:bg-gray-100"
                    }`}
                  >
                    <X className="w-5 h-5 text-gray-400" />
                  </motion.button>
                )}
              </div>
            </div>

            {/* Filter Buttons and View Toggle */}
            <div className="flex flex-col lg:flex-row gap-4 items-start lg:items-center justify-between">
              {/* Filter Buttons */}
              <div className="flex flex-wrap gap-2 flex-1">
                {categories.map((category) => (
                  <motion.button
                    key={category}
                    whileHover={{ scale: 1.05, y: -2 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setFilter(category)}
                    className={`px-5 py-2.5 rounded-xl font-semibold transition-all duration-200 ${
                      filter === category
                        ? 'bg-gradient-to-r from-indigo-600 to-purple-600 text-white shadow-lg shadow-indigo-500/30'
                        : isDark
                          ? 'bg-gray-700/80 text-gray-300 hover:bg-gray-600 border border-gray-600'
                          : 'bg-gray-100 text-gray-700 hover:bg-gray-200 border border-gray-200'
                    }`}
                  >
                    {category === 'all' ? 'All Projects' : category}
                  </motion.button>
                ))}
              </div>

              {/* View Mode Toggle */}
              <div className={`flex items-center gap-2 p-1.5 rounded-xl ${
                isDark ? "bg-gray-700/80 border border-gray-600" : "bg-gray-100 border border-gray-200"
              }`}>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setViewMode('grid')}
                  className={`p-2.5 rounded-lg transition-all duration-200 ${
                    viewMode === 'grid'
                      ? isDark
                        ? 'bg-indigo-600 text-white shadow-lg'
                        : 'bg-indigo-600 text-white shadow-lg'
                      : isDark
                        ? 'text-gray-400 hover:text-gray-200 hover:bg-gray-600'
                        : 'text-gray-600 hover:text-gray-900 hover:bg-gray-200'
                  }`}
                  aria-label="Grid view"
                >
                  <Grid3x3 className="w-5 h-5" />
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setViewMode('list')}
                  className={`p-2.5 rounded-lg transition-all duration-200 ${
                    viewMode === 'list'
                      ? isDark
                        ? 'bg-indigo-600 text-white shadow-lg'
                        : 'bg-indigo-600 text-white shadow-lg'
                      : isDark
                        ? 'text-gray-400 hover:text-gray-200 hover:bg-gray-600'
                        : 'text-gray-600 hover:text-gray-900 hover:bg-gray-200'
                  }`}
                  aria-label="List view"
                >
                  <List className="w-5 h-5" />
                </motion.button>
              </div>
            </div>
          </motion.div>

          {/* Projects grid */}
          <motion.div
            variants={containerVariants}
            className="relative"
          >
            {filteredProjects.length > 0 ? (
              <div 
                className={`grid gap-8 ${
                  viewMode === 'grid' 
                    ? 'grid-cols-1 lg:grid-cols-2 xl:grid-cols-3' 
                    : 'grid-cols-1 max-w-4xl mx-auto'
                }`}
                role="list"
                aria-label={`${filteredProjects.length} projects displayed`}
              >
                {filteredProjects.map((project, index) => (
                  <motion.div
                    key={project.name || `project-${index}`}
                    variants={itemVariants}
                    role="listitem"
                    className={viewMode === 'list' ? 'max-w-none' : ''}
                  >
                    <ProjectCard
                      {...project}
                      index={index}
                      featured={project.featured || index < 2}
                      onDemoUnavailable={handleDemoUnavailable}
                    />
                  </motion.div>
                ))}
              </div>
            ) : (
              /* Empty state */
              <motion.div
                variants={itemVariants}
                className="text-center py-20"
              >
                <motion.div
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ delay: 0.2, duration: 0.5 }}
                  className={`w-24 h-24 mx-auto mb-6 rounded-2xl flex items-center justify-center ${
                    isDark
                      ? "bg-gradient-to-br from-indigo-900/30 to-purple-900/30"
                      : "bg-gradient-to-br from-indigo-100 to-purple-100"
                  }`}
                >
                  <Search className="w-12 h-12 text-indigo-500" />
                </motion.div>
                
                <h3 className={`text-2xl font-bold mb-4 ${
                  isDark ? "text-white" : "text-gray-900"
                }`}>
                  {searchQuery || filter !== 'all' 
                    ? 'No matching projects found' 
                    : 'No projects available'}
                </h3>
                
                <p className={`mb-8 max-w-md mx-auto ${
                  isDark ? "text-gray-400" : "text-gray-600"
                }`}>
                  {searchQuery || filter !== 'all'
                    ? 'Try adjusting your search terms or filters to find what you\'re looking for.'
                    : 'Projects will be showcased here soon. Check back for exciting updates!'}
                </p>

                {(searchQuery || filter !== 'all') && (
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => {
                      setSearchQuery('');
                      setFilter('all');
                    }}
                    className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-semibold rounded-xl hover:shadow-lg transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                  >
                    Clear Filters
                    <ArrowUpRight className="w-4 h-4" />
                  </motion.button>
                )}
              </motion.div>
            )}
          </motion.div>

          {/* CTA section */}
          {projects.length > 0 && (
            <motion.div
              variants={itemVariants}
              className="mt-20 text-center"
            >
              <div className={`p-8 rounded-3xl border backdrop-blur-xl ${
                isDark
                  ? "bg-gradient-to-r from-indigo-900/20 to-purple-900/20 border-indigo-700/30"
                  : "bg-gradient-to-r from-indigo-50 to-purple-50 border-indigo-200/30"
              }`}>
                <h3 className={`text-2xl font-bold mb-4 ${
                  isDark ? "text-white" : "text-gray-900"
                }`}>
                  Want to collaborate on a project?
                </h3>
                <p className={`mb-6 max-w-2xl mx-auto ${
                  isDark ? "text-gray-300" : "text-gray-600"
                }`}>
                  I'm always eager to work on new projects and learn from experienced developers. 
                  Let's connect and build something amazing together!
                </p>
                <motion.a
                  href="#contact"
                  whileHover={{ scale: 1.05, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-bold rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                >
                  <Sparkles className="w-5 h-5" />
                  <span>Let's Connect</span>
                  <ArrowUpRight className="w-5 h-5" />
                </motion.a>
              </div>
            </motion.div>
          )}

          {/* Results summary */}
          {filteredProjects.length > 0 && filteredProjects.length !== projects.length && (
            <motion.div
              variants={itemVariants}
              className="mt-8 text-center"
            >
              <p className={`text-sm ${
                isDark ? "text-gray-400" : "text-gray-500"
              }`}>
                Showing {filteredProjects.length} of {projects.length} projects
                {searchQuery && ` for "${searchQuery}"`}
                {filter !== 'all' && ` in ${filter}`}
              </p>
            </motion.div>
          )}
        </motion.div>

        {/* Coming Soon Modal */}
        <ComingSoonModal
          isOpen={modal.isOpen}
          onClose={closeModal}
          projectName={modal.projectName}
        />
      </div>
    </Section>
  );
}
