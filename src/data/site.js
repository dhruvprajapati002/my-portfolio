import { p } from "framer-motion/client";

// ✅ Skills configuration
const skills = {
  "Frontend Development": {
    icon: "Palette",
    color: "from-blue-500 to-cyan-500",
    bgColor: "from-blue-500/10 to-cyan-500/10",
    skills: [
      "React",
      "Tailwind CSS",
      "React Router",
      "Vite",
      "HTML/CSS",
      "JavaScript",
    ],
  },
  "Backend Development": {
    icon: "Server",
    color: "from-green-500 to-emerald-500",
    bgColor: "from-green-500/10 to-emerald-500/10",
    skills: ["Node.js", "Express.js", "REST APIs", "JWT", "RBAC", "PHP"],
  },
  "Database & Tools": {
    icon: "Database",
    color: "from-purple-500 to-pink-500",
    bgColor: "from-purple-500/10 to-pink-500/10",
    skills: [
      "MongoDB",
      "MongoDB Atlas",
      "MySQL",
      "Git",
      "GitHub",
      "Postman",
      "Docker",
      "Vercel/Render",
    ],
  },
};

// ✅ Count all skills dynamically
const totalSkills = Object.values(skills)
  .reduce((sum, category) => sum + category.skills.length, 0);

console.log("Total skills:", totalSkills);

const projects = [
  {
      name: "Hotel Booking System",
      description:
        "Full‑stack booking application with user authentication, real‑time room availability checking, booking cancellations, and automated email confirmations for seamless hotel management.",
      tech: [
        "PHP",
        "MySQL",
        "HTML5",
        "CSS3",
        "JavaScript",
        "PHPMailer",
        "Bootstrap",
      ],
      links: {
        code: "https://github.com/dhruvprajapati002/HotelBooking",
      },
      image: "/hotel-booking.jpg",
      status: "completed",
      featured: true,
      category: "Full-Stack Web Development",
      date: "2024",
      demoAvailable: false, // ✅ This will trigger the modal
      features: [
        "Real-time room availability",
        "Secure booking system",
        "Email confirmations",
        "Admin dashboard",
        "Payment integration",
      ],
    },
    {
      name: "Medical Image Enhancer",
      description:
        "AI‑powered Flask application utilizing Enhanced Deep Super-Resolution (EDSR) model to enhance grayscale medical images with real-time upscaling and noise reduction capabilities.",
      tech: [
        "Python",
        "Flask",
        "TensorFlow",
        "OpenCV",
        "HTML5",
        "CSS3",
        "JavaScript",
      ],
      date: "Jun 2024 - May 2025",
      links: {
        demo: "https://huggingface.co/spaces/dhruv020/EDSR-model",
        code: "https://github.com/dhruvprajapati002/Emage_Enhancer",
      },
      image: "/medical-enhancer.png",
      status: "completed",
      featured: true,
      category: "AI/Machine Learning",
      demoAvailable: true,
      features: [
        "EDSR model integration",
        "Real-time processing",
        "Noise reduction",
        "Medical image optimization",
        "User-friendly interface",
      ],
    },
    {
      name: "Weather Dashboard",
      description:
        "Interactive React application featuring real‑time weather data, 5‑day forecasts, animated charts using Chart.js, dark mode toggle, and intelligent city search with geolocation support.",
      tech: [
        "React",
        "Node.js",
        "Express.js",
        "MongoDB",
        "Tailwind CSS",
        "Chart.js",
        "OpenWeatherMap API",
      ],
      links: {
        demo: "https://weather-dashboard-cq8s.vercel.app/",
        code: "https://github.com/dhruvprajapati002/weather-dashboard",
      },
      image: "/weather-dashboard.png",
      status: "completed",
      category: "Frontend Development",
      date: "2024",
      demoAvailable: true,
      features: [
        "Real-time weather data",
        "5-day forecasts",
        "Interactive charts",
        "Dark mode toggle",
        "Geolocation support",
      ],
    },
    {
      name: "Password Manager",
      description:
        "Secure MERN stack password management application with AES encryption, password strength analysis, secure vault storage, and modern responsive UI design.",
      tech: [
        "MongoDB",
        "Express.js",
        "React",
        "Node.js",
        "Tailwind CSS",
        "Crypto-JS",
        "JWT",
      ],
      links: {
        demo: "https://pass-guard-pink.vercel.app/",
        code: "https://github.com/dhruvprajapati002/PassGuard",
      },
      image: "/password-manager.png",
      status: "completed",
      category: "Full-Stack Security",
      date: "2024",
      demoAvailable: true,
      features: [
        "AES encryption",
        "Password strength analysis",
        "Secure vault storage",
        "Modern responsive UI",
        "JWT authentication",
      ],
    },
    {
      name: "Age Calculator",
      description:
        "Interactive React-based age calculator that computes precise age in years, months, days, hours, minutes, and seconds. Features date validation, error handling, and real-time calculations with a clean, responsive interface.",
      tech: [
        "React",
        "JavaScript",
        "Tailwind CSS",
        "Date-fns",
        "Vite",
        "HTML5",
        "CSS3",
        "Docker",
      ],
      links: {
        demo: "https://birthdaymath.vercel.app/",
        code: "https://github.com/dhruvprajapati002/age-calculator",
      },
      image: "/age-calculator.png",
      status: "completed",
      category: "Frontend Development",
      date: "2024",
      demoAvailable: true,
      features: [
        "Precise age calculation",
        "Multiple time unit display",
        "Date input validation",
        "Error handling & messages",
        "Responsive design",
        "Real-time calculation",
        "Clean modern UI",
      ],
    },
    {
  name: "MovieFlix",
  description: "Netflix-inspired React application featuring movie browsing, search functionality, favorites management, and detailed movie information. Built with TMDB API integration for real-time movie data and modern responsive design.",
  tech: [
    "React",
    "JavaScript", 
    "Tailwind CSS",
    "TMDB API",
    "Context API",
    "React Router",
    "Axios",
    "Vite"
  ],
  links: {
    demo: "https://movieflix-beta-seven.vercel.app/",
    code: "https://github.com/dhruvprajapati002/movieflix"
  },
  image: "/movieflix.png",
  status: "completed",
  featured: true,
  category: "Frontend Development",
  date: "2025",
  demoAvailable: true,
  features: [
    "TMDB API integration",
    "Movie search & filtering",
    "Favorites & watchlist",
    "Movie details & ratings", 
    "Responsive Netflix-like UI",
    "Context state management",
    "Dynamic routing"
  ]
},

];
const totalProjects = projects.length;

console.log("Total projects:", totalProjects);

// src/data/site.js
export const site = {
  name: "Dhruv Prajapati",
  role: "MERN Stack Developer",
  location: "Mahesana, India",
  summary:
    "Aspiring full‑stack developer with 1+ year of hands-on experience in MERN stack. Built secure, responsive applications with authentication, CRUD operations, and modern deployments through personal projects and internship experience.",

  avatar: "/profile-image.jpg",
  taglines: [
    "MERN Stack Developer",
    "Full-Stack Engineer",
    "Problem Solver",
    "Code Enthusiast",
  ],

  links: {
    email: "dhruvprajapati0023@gmail.com",
    phone: "+91-6351987712",
    github: "https://github.com/dhruvprajapati002/",
    linkedin: "https://www.linkedin.com/in/dhruv-prajapati-204549278/",
    resume: "/resume.pdf",
    twitter: "",
    portfolio: "",
  },

  // Skills configuration
  skills: skills,

  // ✅ UPDATED: Corrected experience duration and description
  experience: [
    {
      title: "MERN Stack Developer Intern",
      company: "CreArt Solutions Pvt. Ltd.",
      location: "Ahmedabad, Gujarat",
      date: "June 2025", // ✅ Updated to reflect 1 month duration
      duration: "1 Month",
      type: "Internship",
      status: "Completed",
      description:
        "Gained hands-on experience in full-stack development using MERN technologies during intensive 1-month internship program.",
      points: [
        "Developed Employee Management System modules using MERN stack architecture within tight deadlines",
        "Implemented JWT authentication and Role-Based Access Control (RBAC) for secure user management",
        "Built responsive UI components with React and Tailwind CSS for optimal user experience",
        "Collaborated with development team in Agile environment and participated in daily standups",
        "Learned industry best practices for code reviews, version control, and project delivery",
      ],
      tech: [
        "MongoDB",
        "Express.js",
        "React",
        "Node.js",
        "JWT",
        "Mongoose",
        "Tailwind CSS",
      ],
      achievements: [
        "Successfully completed all assigned tasks within the 1-month internship period",
        "Gained practical experience in professional development workflow",
        "Received positive feedback from supervisors on code quality and learning attitude",
      ],
    },
  ],

  projects: projects,
  // ✅ UPDATED: Corrected education details
  education: [
    {
      degree: "Bachelor of Engineering (BE)",
      field: "Computer Science and Engineering",
      school: "Saffrony Institute Of Technology", // ✅ Updated with actual university
      location: "Mahesana, Gujarat",
      startDate: "2022",
      endDate: "2026",
      date: "2022 - 2026",
      status: "In Progress",
      gpa: "8.5/10",
      description:
        "Comprehensive study of computer science fundamentals including data structures, algorithms, software engineering, database systems, and web development with focus on practical application through projects.",
      subjects: [
        "Data Structures & Algorithms",
        "Software Engineering",
        "Database Management Systems",
        "Web Development",
        "Computer Networks",
        "Operating Systems",
        "Compiler Design",
        "Artificial Intelligence",
      ],
      achievements: [
        "Maintained consistent academic performance with 8.5 CGPA",
        "Active participation in coding competitions and hackathons",
        "Completed multiple technical projects demonstrating MERN stack proficiency",
        "Self-learned advanced web development technologies beyond curriculum",
      ],
      projects: [
        "Hotel Booking System",
        "Medical Image Enhancer",
        "Weather Dashboard",
        "Password Manager",
      ],
    },
    {
      degree: "Higher Secondary Certificate (HSC)",
      field: "Science Stream (PCM + Computer Science)",
      school: "Your Higher Secondary School", // ✅ Update with actual school name
      location: "Mahesana, Gujarat",
      startDate: "2020",
      endDate: "2022",
      date: "2020 - 2022",
      status: "Completed",
      percentage: "74%",
      description:
        "Focused on Physics, Chemistry, Mathematics, and Computer Science fundamentals with strong emphasis on analytical thinking and problem-solving skills development.",
      subjects: [
        "Physics",
        "Chemistry",
        "Mathematics",
        "Computer Science",
        "English",
        "Environmental Science",
      ],
      achievements: [
        "Scored 74% in Gujarat Board examinations",
        "Developed strong foundation in Mathematics and Computer Science",
        "Started learning web development during final year",
        "Participated in school science exhibitions and coding workshops",
      ],
    },
    {
      degree: "Secondary School Certificate (SSC)",
      field: "General Studies",
      school: "Your Secondary School", // ✅ Update with actual school name
      location: "Mahesana, Gujarat",
      startDate: "2018",
      endDate: "2020",
      date: "2018 - 2020",
      status: "Completed",
      percentage: "80%",
      description:
        "Comprehensive foundation in core subjects with emphasis on analytical thinking, communication skills, and building strong academic fundamentals.",
      achievements: [
        "Scored 80% in Gujarat Board examinations",
        "Consistent academic performance across all subjects",
        "Active participation in extra-curricular activities",
        "Developed interest in technology and computer applications",
      ],
    },
  ],
  

  // ✅ UPDATED: Realistic stats reflecting actual experience
  stats: {
    projectsCompleted: totalProjects, // ✅ Based on the 4 projects listed
    yearsExperience: 1, // ✅ Updated to reflect 1+ year of learning experience
    technologiesUsed: totalSkills, // ✅ Based on the technologies across all skills
    // ✅ REMOVED: happyClients stat as requested
  },
};
