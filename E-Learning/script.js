// Application state
let currentUser = null;
let purchasedCourses = [];
let transactions = [];
let allCourses = [];
let allCategories = [];
let allDocuments = [];
let currentPage = "home";
let isDarkMode = false;
let currentVideoProgress = {};

// DOM Elements
const themeToggle = document.getElementById("theme-toggle");
let themeIcon = themeToggle ? themeToggle.querySelector("i") : null;

const pages = document.querySelectorAll(".page");
const guestButtons = document.getElementById("guest-buttons");
const userMenu = document.getElementById("user-menu");
const logoutBtn = document.getElementById("logout-btn");
const mobileMenuBtn = document.getElementById("mobile-menu-btn");
const mobileMenu = document.getElementById("mobile-menu");
const navLinks = document.querySelectorAll(".nav-link");

// Course Data with real YouTube links
const courseData = [
  {
    id: 1,
    title: "Frontend Web Development",
    category: "Web Development",
    price: 29.99,
    description: "Complete frontend web development tutorial covering HTML, CSS, and JavaScript in one comprehensive video.",
    duration: "24h 14m",
    featured: true,
    image: "Images/Frontend-Development.png",
    videoUrl: "https://www.youtube.com/watch?v=zJSY8tbf_ys",
    learningPoints: [
      "Master HTML5 semantic elements",
      "Learn CSS3 Flexbox and Grid",
      "JavaScript fundamentals and DOM manipulation",
      "Responsive design principles",
      "Build a complete portfolio website",
      "Deploy your website live"
    ],
    instructor: "freeCodeCamp.org"
  },
  {
    id: 2,
    title: "Backend Development with Node.js",
    category: "Web Development",
    price: 34.99,
    description: "Build powerful backend systems with Node.js, Express, and MongoDB in this comprehensive single-video course.",
    duration: "2h 26m",
    featured: true,
    image: "Images/Backend-Web.png",
    videoUrl: "https://www.youtube.com/watch?v=KOutPbKc9UM",
    learningPoints: [
      "Node.js environment setup",
      "Express.js framework fundamentals",
      "REST API design principles",
      "MongoDB database integration",
      "Authentication and authorization",
      "Deployment to cloud servers"
    ],
    instructor: "freeCodeCamp.org"
  },
  {
    id: 3,
    title: "Full Stack Web Development",
    category: "Web Development",
    price: 49.99,
    description: "Complete full stack web development course covering both frontend and backend in one comprehensive video.",
    duration: "7h 29m",
    featured: true,
    image: "Images/full-stack.png",
    videoUrl: "https://www.youtube.com/watch?v=nu_pCVPKzTk",
    learningPoints: [
      "Frontend with React.js",
      "Backend with Express.js",
      "Database design with MongoDB",
      "User authentication system",
      "API integration",
      "Full deployment pipeline"
    ],
    instructor: "freeCodeCamp.org"
  },
  {
    id: 4,
    title: "Python Programming Complete Guide",
    category: "Programming Language",
    price: 27.99,
    description: "Learn Python programming from basics to advanced concepts in one comprehensive video tutorial.",
    duration: "12h",
    featured: true,
    image: "Images/python.png",
    videoUrl: "https://www.youtube.com/watch?v=ix9cRaBkVe0",
    learningPoints: [
      "Python syntax and basics",
      "Data structures and algorithms",
      "Object-oriented programming",
      "File handling and exceptions",
      "Web scraping basics",
      "Building simple applications"
    ],
    instructor: "Bro Code"
  },
  {
    id: 5,
    title: "JavaScript Deep Dive",
    category: "Programming Language",
    price: 24.99,
    description: "Master JavaScript from fundamentals to advanced concepts in this single comprehensive video.",
    duration: "22h 15m",
    featured: false,
    image: "Images/JS.png",
    videoUrl: "https://www.youtube.com/watch?v=EerdGm-ehJQ",
    learningPoints: [
      "ES6+ modern features",
      "Async programming with promises",
      "Closures and scope",
      "DOM manipulation techniques",
      "Event handling",
      "Modern JavaScript patterns"
    ],
    instructor: "SuperSimpleDev"
  },
  {
    id: 6,
    title: "Java Programming Fundamentals",
    category: "Programming Language",
    price: 31.99,
    description: "Complete Java programming tutorial covering core concepts and object-oriented programming.",
    duration: "12h",
    featured: false,
    image: "Images/java.png",
    videoUrl: "https://www.youtube.com/watch?v=xTtL8E4LzTQ",
    learningPoints: [
      "Java basics and syntax",
      "Object-oriented principles",
      "Collections framework",
      "Exception handling",
      "File I/O operations",
      "Basic GUI programming"
    ],
    instructor: "Bro Code"
  },
  {
    id: 7,
    title: "C++ for Beginners",
    category: "Programming Language",
    price: 26.99,
    description: "Learn C++ programming fundamentals and memory management in this comprehensive video tutorial.",
    duration: "6h",
    featured: false,
    image: "Images/c++.png",
    videoUrl: "https://www.youtube.com/watch?v=-TkoO8Z07hI",
    learningPoints: [
      "C++ basics and setup",
      "Pointers and memory management",
      "Object-oriented programming",
      "Standard Template Library",
      "Basic algorithms",
      "Building console applications"
    ],
    instructor: "Bro Code"
  },
  {
    id: 8,
    title: "Swift for iOS Development",
    category: "Programming Language",
    price: 32.99,
    description: "Master Swift programming language for iOS app development in this complete video tutorial.",
    duration: "7h 05m",
    featured: false,
    image: "Images/swift.png",
    videoUrl: "https://www.youtube.com/watch?v=8Xg7E9shq0U",
    learningPoints: [
      "Swift syntax basics",
      "UIKit fundamentals",
      "SwiftUI introduction",
      "Data persistence",
      "Networking with URLSession",
      "Building a simple iOS app"
    ],
    instructor: "freeCodeCamp.org"
  },
  {
    id: 9,
    title: "React Native Mobile App Development",
    category: "Mobile Development",
    price: 35.99,
    description: "Build cross-platform mobile applications with React Native in this comprehensive single-video course.",
    duration: "2h 06m",
    featured: true,
    image: "Images/react-native.png",
    videoUrl: "https://www.youtube.com/watch?v=0-S5a0eXPoc",
    learningPoints: [
      "React Native setup and environment",
      "Components and styling",
      "Navigation between screens",
      "State management",
      "API integration",
      "Building and deploying apps"
    ],
    instructor: "Programming with Mosh"
  },
  {
    id: 10,
    title: "Flutter App Development",
    category: "Mobile Development",
    price: 33.99,
    description: "Create beautiful native mobile applications with Flutter in this complete video tutorial.",
    duration: "36h 39m",
    featured: false,
    image: "Images/flutter.png",
    videoUrl: "https://www.youtube.com/watch?v=VPvVD8t02U8",
    learningPoints: [
      "Flutter basics and setup",
      "Widgets and layouts",
      "State management",
      "Animations",
      "API integration",
      "Building a complete app"
    ],
    instructor: "freeCodeCamp.org"
  },
  {
    id: 11,
    title: "Android Kotlin Development",
    category: "Mobile Development",
    price: 32.99,
    description: "Learn modern Android app development with Kotlin in this comprehensive single-video course.",
    duration: "60h 50m",
    featured: false,
    image: "Images/kotlin.png",
    videoUrl: "https://www.youtube.com/watch?v=blKkRoZPxLc",
    learningPoints: [
      "Kotlin basics for Android",
      "Android Studio setup",
      "UI components and layouts",
      "Room database",
      "Networking with Retrofit",
      "Play Store deployment"
    ],
    instructor: "freeCodeCamp.org"
  },
  {
    id: 12,
    title: "Data Structures & Algorithms",
    category: "Data Structures & Algorithms",
    price: 37.99,
    description: "Master essential data structures and algorithms for coding interviews in this comprehensive video.",
    duration: "4h",
    featured: true,
    image: "Images/dsa.png",
    videoUrl: "https://www.youtube.com/watch?v=CBYHwZcbD-s",
    learningPoints: [
      "Arrays and strings",
      "Linked lists implementation",
      "Stacks and queues",
      "Trees and graphs",
      "Sorting algorithms",
      "Searching algorithms"
    ],
    instructor: "Bro Code"
  },
  {
    id: 13,
    title: "Computer Networking Fundamentals",
    category: "Computer Network",
    price: 36.99,
    description: "Complete guide to computer networking concepts and protocols in one comprehensive video.",
    duration: "9h 24m",
    featured: false,
    image: "Images/computer-network.png",
    videoUrl: "https://www.youtube.com/watch?v=qiQR5rTSshw",
    learningPoints: [
      "Networking basics and OSI model",
      "TCP/IP protocol suite",
      "Routing and switching",
      "Network security principles",
      "Wireless networks",
      "Network troubleshooting"
    ],
    instructor: "freeCodeCamp.org"
  },
  {
    id: 14,
    title: "Database Management Systems",
    category: "Database Management System",
    price: 35.99,
    description: "Learn database design, SQL, and NoSQL concepts in this comprehensive single-video course.",
    duration: "17h 07m",
    featured: false,
    image: "Images/dbms.png",
    videoUrl: "https://www.youtube.com/watch?v=4cWkVbC2bNE",
    learningPoints: [
      "Database design principles",
      "SQL fundamentals",
      "Normalization techniques",
      "Indexing and optimization",
      "NoSQL databases",
      "Database security"
    ],
    instructor: "freeCodeCamp.org"
  },
  {
    id: 15,
    title: "UX/UI Design Principles",
    category: "UX/UI Design",
    price: 32.99,
    description: "Master user-centered design principles and prototyping in this comprehensive video tutorial.",
    duration: "1h 26m",
    featured: true,
    image: "Images/ux-ui.png",
    videoUrl: "https://www.youtube.com/watch?v=c9Wg6Cb_YlU",
    learningPoints: [
      "Design thinking process",
      "User research methods",
      "Wireframing techniques",
      "Prototyping tools",
      "Usability testing",
      "Design system creation"
    ],
    instructor: "freeCodeCamp.org"
  }
];

// Document Data with real PDF links and images
const documentData = [
  {
    id: 1,
    title: "C++ Programming Tutorial PDF",
    category: "Programming Language",
    description: "Comprehensive C++ tutorial covering basics to advanced concepts with examples.",
    source: "IISC Bangalore",
    url: "https://cds.iisc.ac.in/wp-content/uploads/DS286.AUG2016.Lab2_.cpp_tutorial.pdf",
    featured: true,
    image: "Images/c-plus-plus.png",
    pages: 45
  },
  {
    id: 2,
    title: "HTML & CSS Documentation",
    category: "Web Development",
    description: "Complete reference for HTML5 and CSS3 with examples and best practices.",
    source: "MDN Web Docs",
    url: "https://developer.mozilla.org/en-US/docs/Web/HTML",
    featured: true,
    image: "Images/html-css.png",
    pages: null
  },
  {
    id: 3,
    title: "JavaScript Guide",
    category: "Programming Language",
    description: "Modern JavaScript tutorial with ES6+ features and practical examples.",
    source: "MDN Web Docs",
    url: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide",
    featured: true,
    image: "Images/javaScript.png",
    pages: null
  },
  {
    id: 4,
    title: "Python Documentation",
    category: "Programming Language",
    description: "Official Python documentation and tutorial for beginners to advanced users.",
    source: "Python.org",
    url: "https://docs.python.org/3/tutorial/",
    featured: true,
    image: "Images/python1.png",
    pages: null
  },
  {
    id: 5,
    title: "React Documentation",
    category: "Web Development",
    description: "Complete React.js documentation with hooks, components, and best practices.",
    source: "React.js",
    url: "https://react.dev/learn",
    featured: false,
    image: "Images/react.png",
    pages: null
  },
  {
    id: 6,
    title: "Node.js Documentation",
    category: "Web Development",
    description: "Complete Node.js API reference and guides for backend development.",
    source: "Node.js",
    url: "https://nodejs.org/docs/latest/api/",
    featured: false,
    image: "Images/nodejs.png",
    pages: null
  },
  {
    id: 7,
    title: "Java Tutorial",
    category: "Programming Language",
    description: "Official Java tutorial covering core concepts and object-oriented programming.",
    source: "Oracle",
    url: "https://docs.oracle.com/javase/tutorial/",
    featured: false,
    image: "Images/java1.png",
    pages: null
  },
  {
    id: 8,
    title: "SQL Tutorial",
    category: "Database Management System",
    description: "Complete SQL tutorial with queries, joins, and database operations.",
    source: "W3Schools",
    url: "https://www.w3schools.com/sql/",
    featured: false,
    image: "Images/sql.png",
    pages: null
  },
  {
    id: 9,
    title: "Git & GitHub Guide",
    category: "Web Development",
    description: "Complete guide to version control with Git and collaboration on GitHub.",
    source: "GitHub",
    url: "https://docs.github.com/en/get-started",
    featured: false,
    image: "Images/git-github.png",
    pages: null
  },
  {
    id: 10,
    title: "Linux Command Line",
    category: "Computer Network",
    description: "Comprehensive Linux command line tutorial for beginners and advanced users.",
    source: "Linux Foundation",
    url: "https://linuxfoundation.org/tools/command-line/",
    featured: false,
    image: "Images/linux.png",
    pages: null
  },
  {
    id: 11,
    title: "Docker Documentation",
    category: "Web Development",
    description: "Complete Docker documentation for containerization and deployment.",
    source: "Docker",
    url: "https://docs.docker.com/get-started/",
    featured: false,
    image: "Images/docker.png",
    pages: null
  },
  {
    id: 12,
    title: "REST API Design",
    category: "Web Development",
    description: "Best practices for designing RESTful APIs with examples and patterns.",
    source: "Microsoft",
    url: "https://learn.microsoft.com/en-us/azure/architecture/best-practices/api-design",
    featured: false,
    image: "Images/rest-api.png",
    pages: null
  },
  {
    id: 13,
    title: "Data Structures PDF",
    category: "Data Structures & Algorithms",
    description: "Comprehensive guide to data structures with implementations in multiple languages.",
    source: "GeeksforGeeks",
    url: "https://www.geeksforgeeks.org/data-structures/",
    featured: false,
    image: "Images/dsa1.png",
    pages: null
  },
  {
    id: 14,
    title: "Algorithms Tutorial",
    category: "Data Structures & Algorithms",
    description: "Algorithm design and analysis with complexity explanations and examples.",
    source: "Khan Academy",
    url: "https://www.khanacademy.org/computing/computer-science/algorithms",
    featured: false,
    image: "Images/algorithm.png",
    pages: null
  },
  {
    id: 15,
    title: "Networking Basics",
    category: "Computer Network",
    description: "Introduction to computer networking concepts, protocols, and architecture.",
    source: "Cisco",
    url: "https://www.cisco.com/c/en/us/solutions/enterprise-networks/what-is-computer-networking.html",
    featured: false,
    image: "Images/network.png",
    pages: null
  },
  {
    id: 16,
    title: "Database Design",
    category: "Database Management System",
    description: "Principles of database design, normalization, and SQL optimization.",
    source: "Stanford University",
    url: "https://lagunita.stanford.edu/courses/DB/2014/SelfPaced/about",
    featured: false,
    image: "Images/database-design.png",
    pages: null
  },
  {
    id: 17,
    title: "UI Design Principles",
    category: "UX/UI Design",
    description: "User interface design principles, patterns, and best practices.",
    source: "Nielsen Norman Group",
    url: "https://www.nngroup.com/articles/usability-101-introduction-to-usability/",
    featured: false,
    image: "Images/uxui.png",
    pages: null
  },
  {
    id: 18,
    title: "Mobile App Design",
    category: "Mobile Development",
    description: "Mobile app design patterns and guidelines for iOS and Android.",
    source: "Material Design",
    url: "https://material.io/design",
    featured: false,
    image: "Images/mobile-app.png",
    pages: null
  },
  {
    id: 19,
    title: "DevOps Practices",
    category: "Web Development",
    description: "DevOps principles, practices, and tools for continuous integration.",
    source: "AWS",
    url: "https://aws.amazon.com/devops/what-is-devops/",
    featured: false,
    image: "Images/devops.png",
    pages: null
  },
  {
    id: 20,
    title: "Machine Learning Basics",
    category: "Programming Language",
    description: "Introduction to machine learning concepts and algorithms.",
    source: "Google Developers",
    url: "https://developers.google.com/machine-learning/crash-course",
    featured: false,
    image: "Images/machine-learning.png",
    pages: null
  },
  {
    id: 21,
    title: "Web Performance",
    category: "Web Development",
    description: "Web performance optimization techniques and best practices.",
    source: "Web.dev",
    url: "https://web.dev/learn/performance",
    featured: false,
    image: "Images/web.png",
    pages: null
  }
];

// Initialize application
function init() {
  // Check for saved user
  const savedUser = localStorage.getItem("learnhub_user");
  try {
    if (savedUser) {
      currentUser = JSON.parse(savedUser);
      purchasedCourses = JSON.parse(localStorage.getItem("learnhub_purchased") || "[]");
      transactions = JSON.parse(localStorage.getItem("learnhub_transactions") || "[]");
      currentVideoProgress = JSON.parse(localStorage.getItem("learnhub_video_progress") || "{}");
      updateAuthUI();
    }
  } catch {
    localStorage.removeItem("learnhub_user");
  }

  // Load data
  loadCategories();
  loadFeaturedCourses();
  loadAllCourses();
  loadFeaturedDocuments();
  loadAllDocuments();
  updateSystemStatus();

  // Set up event listeners
  setupEventListeners();

  // Set up hash change listener for navigation
  window.addEventListener("hashchange", handleHashChange);

  // Handle initial hash
  handleHashChange();

  // Load saved theme
  const savedTheme = localStorage.getItem("learnhub_theme");
  if (savedTheme === "dark") {
    document.body.classList.add("dark");
    if (themeIcon) {
      themeIcon.className = "fas fa-moon";
    }
    isDarkMode = false;
  }
}

// Handle hash changes for navigation
function handleHashChange() {
  const hash = window.location.hash.substring(1);
  const validPages = ["home", "about", "courses", "documents", "contact", "dashboard"];
  
  if (validPages.includes(hash)) {
    showPage(hash);
    if (hash === "documents") {
      showLoginNotice();
    }
  } else if (hash.startsWith("course-")) {
    const courseId = parseInt(hash.split("-")[1]);
    if (courseId) {
      showCourseDetail(courseId);
    }
  } else {
    showPage("home");
  }
}

// Set up event listeners
function setupEventListeners() {
  // Theme toggle
  if (themeToggle) {
    themeToggle.addEventListener("click", toggleTheme);
  }

  // Navigation links
  navLinks.forEach((link) => {
    link.addEventListener("click", (e) => {
      e.preventDefault();
      const page = link.getAttribute("href").substring(1);
      window.location.hash = page;
      if (mobileMenu) {
        mobileMenu.classList.add("hidden");
      }
    });
  });

  // Logout button
  if (logoutBtn) {
    logoutBtn.addEventListener("click", logout);
  }
// Mobile menu toggle
const mobileMenuBtn = document.getElementById('mobile-menu-btn');
const mobileMenu = document.getElementById('mobile-menu');

if (mobileMenuBtn && mobileMenu) {
  mobileMenuBtn.addEventListener('click', () => {
    mobileMenu.classList.toggle('hidden');
    const icon = mobileMenuBtn.querySelector('i');
    if (mobileMenu.classList.contains('hidden')) {
      icon.classList.remove('fa-times');
      icon.classList.add('fa-bars');
    } else {
      icon.classList.remove('fa-bars');
      icon.classList.add('fa-times');
    }
  });
  
  // Close mobile menu when clicking a link
  const mobileLinks = mobileMenu.querySelectorAll('a');
  mobileLinks.forEach(link => {
    link.addEventListener('click', () => {
      mobileMenu.classList.add('hidden');
      mobileMenuBtn.querySelector('i').classList.remove('fa-times');
      mobileMenuBtn.querySelector('i').classList.add('fa-bars');
    });
  });
}

// Window resize handler
let resizeTimer;
window.addEventListener('resize', () => {
  document.body.classList.add('resizing');
  clearTimeout(resizeTimer);
  resizeTimer = setTimeout(() => {
    document.body.classList.remove('resizing');
  }, 250);
});

  // Course search
  const courseSearch = document.getElementById("course-search");
  if (courseSearch) {
    courseSearch.addEventListener("input", filterCourses);
  }

  // Document search
  const documentSearch = document.getElementById("document-search");
  if (documentSearch) {
    documentSearch.addEventListener("input", filterDocuments);
  }

  // Contact form
  const contactForm = document.getElementById("contact-form");
  if (contactForm) {
    contactForm.addEventListener("submit", handleContactSubmit);
  }

  // Dashboard tabs
  const dashboardTabs = document.querySelectorAll(".tab[data-tab]");
  dashboardTabs.forEach((tab) => {
    tab.addEventListener("click", () => {
      const tabName = tab.dataset.tab;
      showDashboardTab(tabName);
    });
  });

  // Event delegation for dynamic elements
  document.addEventListener("click", (e) => {
    // View details button
    if (e.target.closest(".view-details-btn")) {
      const btn = e.target.closest(".view-details-btn");
      const courseId = parseInt(btn.dataset.courseId);
      if (courseId) {
        window.location.hash = `course-${courseId}`;
      }
    }

    // Purchase course button
    if (e.target.closest(".purchase-course-btn")) {
      const btn = e.target.closest(".purchase-course-btn");
      const courseId = parseInt(btn.dataset.courseId);
      if (courseId) {
        purchaseCourse(courseId);
      }
    }

    // Watch video button
    if (e.target.closest("#watch-video-btn")) {
      const courseId = localStorage.getItem("current_course_id");
      if (courseId) {
        playCourseVideo(parseInt(courseId));
      }
    }

    // View document button
    if (e.target.closest(".view-document-btn")) {
      const btn = e.target.closest(".view-document-btn");
      const docId = parseInt(btn.dataset.docId);
      if (docId) {
        viewDocument(docId);
      }
    }

    // Login to read button
    if (e.target.closest(".login-to-read-btn")) {
      const btn = e.target.closest(".login-to-read-btn");
      const docId = parseInt(btn.dataset.docId);
      if (docId) {
        showLoginModal();
      }
    }

    // Course category filter buttons
    if (e.target.closest("[data-category]") && e.target.closest("#course-categories-filter")) {
      const btn = e.target.closest("[data-category]");
      const category = btn.dataset.category;
      filterCoursesByCategory(category);

      // Update active state
      document.querySelectorAll("#course-categories-filter button").forEach((b) => {
        b.classList.remove("bg-primary", "text-primary-foreground");
        b.classList.add("bg-transparent", "text-foreground", "border-border");
      });
      btn.classList.add("bg-primary", "text-primary-foreground");
      btn.classList.remove("bg-transparent", "text-foreground", "border-border");
    }

    // Document category filter buttons
    if (e.target.closest("[data-category]") && e.target.closest("#document-categories-filter")) {
      const btn = e.target.closest("[data-category]");
      const category = btn.dataset.category;
      filterDocumentsByCategory(category);

      // Update active state
      document.querySelectorAll("#document-categories-filter button").forEach((b) => {
        b.classList.remove("bg-primary", "text-primary-foreground");
        b.classList.add("bg-transparent", "text-foreground", "border-border");
      });
      btn.classList.add("bg-primary", "text-primary-foreground");
      btn.classList.remove("bg-transparent", "text-foreground", "border-border");
    }

    // Course card click
    if (e.target.closest(".course-card")) {
      const card = e.target.closest(".course-card");
      const courseId = parseInt(card.dataset.courseId);
      if (courseId) {
        window.location.hash = `course-${courseId}`;
      }
    }
  });
}

// Theme functionality
function toggleTheme() {
  isDarkMode = !isDarkMode;
  document.body.classList.toggle("dark");
  if (themeIcon) {
    themeIcon.className = isDarkMode ? "fas fa-sun text-yellow-400" : "fas fa-moon text-gray-700";
  }
  localStorage.setItem("learnhub_theme", isDarkMode ? "dark" : "light");
}

// Page management
function showPage(page) {
  // Don't show dashboard if not logged in
  if (page === "dashboard" && !currentUser) {
    showLoginModal();
    return;
  }

  // Hide all pages
  pages.forEach((p) => p.classList.add("page-hidden"));

  // Show selected page
  const targetPage = document.getElementById(`${page}-page`);
  if (targetPage) {
    targetPage.classList.remove("page-hidden");
    currentPage = page;

    // Update content if needed
    if (page === "dashboard") {
      updateDashboard();
    } else if (page === "courses") {
      updateCourseFilters();
    } else if (page === "documents") {
      updateDocumentFilters();
    }
  }
}
function logout() {
  currentUser = null;
  purchasedCourses = [];
  transactions = [];
  currentVideoProgress = {};
  
  // Clear all localStorage data
  localStorage.removeItem("learnhub_user");
  localStorage.removeItem("learnhub_purchased");
  localStorage.removeItem("learnhub_transactions");
  localStorage.removeItem("learnhub_video_progress");
  localStorage.removeItem("current_course_id");
  
  // Update UI
  updateAuthUI();
  
  // Refresh documents to show "Login to Read" buttons
  loadAllDocuments();
  loadFeaturedDocuments();
  
  // Update documents page if it's active
  if (currentPage === "documents") {
    showLoginNotice();
  }
  
  // Go to home page
  window.location.hash = "home";
  showToast("Logged out successfully", "success");
}

// Show separate Login Modal
function showLoginModal() {
  // Create modal if it doesn't exist
  if (!document.getElementById("login-modal")) {
    createLoginModal();
  }

  const loginModal = document.getElementById("login-modal");
  if (loginModal) {
    loginModal.classList.add("active");
    document.body.style.overflow = "hidden";
  }
}

function createLoginModal() {
  const modalHTML = `
    <div id="login-modal" class="modal">
      <div class="modal-content">
        <div class="p-6">
          <div class="flex justify-between items-center mb-6">
            <h2 class="text-2xl font-bold">Login to LearnHub</h2>
            <button onclick="closeLoginModal()" class="p-2 hover:bg-secondary rounded-lg transition-colors">
              <i class="fas fa-times"></i>
            </button>
          </div>
          
          <form id="login-form" class="space-y-4">
            <div>
              <label class="mb-2 block text-sm font-medium">Email</label>
              <input type="email" id="login-email" class="input" placeholder="name@example.com" required>
            </div>
            <div>
              <label class="mb-2 block text-sm font-medium">Password</label>
              <div class="relative">
                <input type="password" id="login-password" class="input pr-10" placeholder="Enter your password" required>
                <button type="button" class="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground" id="toggle-login-password">
                  <i class="fas fa-eye"></i>
                </button>
              </div>
            </div>
            <button type="submit" class="btn btn-primary w-full">
              <i class="fas fa-sign-in-alt mr-2"></i> Login
            </button>
          </form>
          
          <p class="mt-4 text-center text-sm text-muted-foreground">
            Don't have an account? <button onclick="closeLoginModal(); showRegisterModal();" class="text-primary hover:underline font-medium">Register here</button>
          </p>
        </div>
      </div>
    </div>
  `;

  document.body.insertAdjacentHTML("beforeend", modalHTML);

  // Add event listeners
  const loginForm = document.getElementById("login-form");
  const togglePasswordBtn = document.getElementById("toggle-login-password");
  const passwordInput = document.getElementById("login-password");

  if (loginForm) {
    loginForm.addEventListener("submit", handleLogin);
  }

  if (togglePasswordBtn && passwordInput) {
    togglePasswordBtn.addEventListener("click", () => {
      const type = passwordInput.type === "password" ? "text" : "password";
      passwordInput.type = type;
      togglePasswordBtn.innerHTML = type === "password" ? '<i class="fas fa-eye"></i>' : '<i class="fas fa-eye-slash"></i>';
    });
  }
}

function closeLoginModal() {
  const modal = document.getElementById("login-modal");
  if (modal) {
    modal.classList.remove("active");
    document.body.style.overflow = "auto";
  }
}

// Show separate Register Modal
function showRegisterModal() {
  // Create modal if it doesn't exist
  if (!document.getElementById("register-modal")) {
    createRegisterModal();
  }

  const registerModal = document.getElementById("register-modal");
  if (registerModal) {
    registerModal.classList.add("active");
    document.body.style.overflow = "hidden";
  }
}

function createRegisterModal() {
  const modalHTML = `
    <div id="register-modal" class="modal">
      <div class="modal-content">
        <div class="p-6">
          <div class="flex justify-between items-center mb-6">
            <h2 class="text-2xl font-bold">Create Account</h2>
            <button onclick="closeRegisterModal()" class="p-2 hover:bg-secondary rounded-lg transition-colors">
              <i class="fas fa-times"></i>
            </button>
          </div>
          
          <form id="register-form" class="space-y-4">
            <div>
              <label class="mb-2 block text-sm font-medium">Full Name</label>
              <input type="text" id="register-name" class="input" placeholder="John Doe" required>
            </div>
            <div>
              <label class="mb-2 block text-sm font-medium">Email</label>
              <input type="email" id="register-email" class="input" placeholder="name@example.com" required>
            </div>
            <div>
              <label class="mb-2 block text-sm font-medium">Password</label>
              <div class="relative">
                <input type="password" id="register-password" class="input pr-10" placeholder="Create a password" required>
                <button type="button" class="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground" id="toggle-register-password">
                  <i class="fas fa-eye"></i>
                </button>
              </div>
            </div>
            <div>
              <label class="mb-2 block text-sm font-medium">Confirm Password</label>
              <input type="password" id="register-confirm-password" class="input" placeholder="Confirm your password" required>
            </div>
            <button type="submit" class="btn btn-primary w-full">
              <i class="fas fa-user-plus mr-2"></i> Create Account
            </button>
          </form>
          
          <p class="mt-4 text-center text-sm text-muted-foreground">
            Already have an account? <button onclick="closeRegisterModal(); showLoginModal();" class="text-primary hover:underline font-medium">Login here</button>
          </p>
        </div>
      </div>
    </div>
  `;

  document.body.insertAdjacentHTML("beforeend", modalHTML);

  // Add event listeners
  const registerForm = document.getElementById("register-form");
  const togglePasswordBtn = document.getElementById("toggle-register-password");
  const passwordInput = document.getElementById("register-password");

  if (registerForm) {
    registerForm.addEventListener("submit", handleRegister);
  }

  if (togglePasswordBtn && passwordInput) {
    togglePasswordBtn.addEventListener("click", () => {
      const type = passwordInput.type === "password" ? "text" : "password";
      passwordInput.type = type;
      togglePasswordBtn.innerHTML = type === "password" ? '<i class="fas fa-eye"></i>' : '<i class="fas fa-eye-slash"></i>';
    });
  }
}

function closeRegisterModal() {
  const modal = document.getElementById("register-modal");
  if (modal) {
    modal.classList.remove("active");
    document.body.style.overflow = "auto";
  }
}

// Auth handlers
function handleLogin(e) {
  e.preventDefault();
  const email = document.getElementById("login-email").value;
  const password = document.getElementById("login-password").value;

  if (!email || !password) {
    showToast("Please fill in all fields", "error");
    return;
  }

  // Mock login - In real app, you would validate against a server
  const user = {
    id: Date.now(),
    name: email.split("@")[0].charAt(0).toUpperCase() + email.split("@")[0].slice(1),
    email: email,
    createdAt: new Date().toISOString(),
  };

  currentUser = user;
  localStorage.setItem("learnhub_user", JSON.stringify(user));

  updateAuthUI();
  closeLoginModal();

  const loginForm = document.getElementById("login-form");
  if (loginForm) {
    loginForm.reset();
  }

  // Refresh documents to show "View Document" instead of "Login to Read"
  loadAllDocuments();
  loadFeaturedDocuments();

  showToast("Login successful! Welcome to LearnHub.", "success");

  // Redirect to dashboard
  window.location.hash = "dashboard";
}

function handleRegister(e) {
  e.preventDefault();
  const name = document.getElementById("register-name").value;
  const email = document.getElementById("register-email").value;
  const password = document.getElementById("register-password").value;
  const confirmPassword = document.getElementById("register-confirm-password").value;

  if (!name || !email || !password || !confirmPassword) {
    showToast("Please fill in all fields", "error");
    return;
  }

  if (password !== confirmPassword) {
    showToast("Passwords do not match", "error");
    return;
  }

  if (password.length < 6) {
    showToast("Password must be at least 6 characters", "error");
    return;
  }

  // Mock registration
  const user = {
    id: Date.now(),
    name: name,
    email: email,
    createdAt: new Date().toISOString(),
  };

  currentUser = user;
  localStorage.setItem("learnhub_user", JSON.stringify(user));

  updateAuthUI();
  closeRegisterModal();

  const registerForm = document.getElementById("register-form");
  if (registerForm) {
    registerForm.reset();
  }

  // Refresh documents to show "View Document" instead of "Login to Read"
  loadAllDocuments();
  loadFeaturedDocuments();

  showToast("Registration successful! Welcome to LearnHub.", "success");

  // Redirect to dashboard
  window.location.hash = "dashboard";
}

function logout() {
  currentUser = null;
  localStorage.removeItem("learnhub_user");
  updateAuthUI();

  // Refresh documents to show "Login to Read" buttons
  loadAllDocuments();
  loadFeaturedDocuments();

  // Update documents page if it's active
  if (currentPage === "documents") {
    showLoginNotice();
  }

  window.location.hash = "home";
  showToast("Logged out successfully", "success");
}

// Update auth UI - Show dashboard link when logged in
function updateAuthUI() {
  if (currentUser) {
    // Show user menu, hide guest buttons
    if (guestButtons) guestButtons.style.display = "none";
    if (userMenu) {
      userMenu.style.display = "flex";
      document.getElementById("user-name").textContent = currentUser.name;
    }
  } else {
    // Show guest buttons, hide user menu
    if (guestButtons) guestButtons.style.display = "flex";
    if (userMenu) userMenu.style.display = "none";
  }
}

// Load categories
function loadCategories() {
  // Extract unique categories from courses
  const uniqueCategories = [...new Set(courseData.map((course) => course.category))];
  allCategories = uniqueCategories.map((category, index) => ({
    id: index + 1,
    name: category,
    description: `Learn ${category} skills`,
  }));

  // Update counts
  const coursesCount = document.getElementById("courses-count");
  const categoriesCount = document.getElementById("categories-count");
  const documentsCount = document.getElementById("documents-count");

  if (coursesCount) coursesCount.textContent = courseData.length;
  if (categoriesCount) categoriesCount.textContent = allCategories.length;
  if (documentsCount) documentsCount.textContent = documentData.length;
}

// Load featured courses
function loadFeaturedCourses() {
  const featured = courseData.filter((course) => course.featured);
  const featuredCoursesGrid = document.getElementById("featured-courses-grid");
  if (featuredCoursesGrid) {
    featuredCoursesGrid.innerHTML = featured.map((course) => createCourseCard(course)).join("");
  }
}

// Load all courses
function loadAllCourses() {
  allCourses = [...courseData];
  const allCoursesGrid = document.getElementById("all-courses-grid");
  if (allCoursesGrid) {
    allCoursesGrid.innerHTML = allCourses.map((course) => createCourseCard(course)).join("");
  }

  const courseResultsCount = document.getElementById("course-results-count");
  const courseTotalCount = document.getElementById("course-total-count");
  if (courseResultsCount && courseTotalCount) {
    courseResultsCount.textContent = allCourses.length;
    courseTotalCount.textContent = allCourses.length;
  }
}

// Create course card HTML with images
function createCourseCard(course) {
  const isPurchased = purchasedCourses.includes(course.id);

  return `
    <div class="card card-hover course-card" data-course-id="${course.id}">
      <div class="relative aspect-video overflow-hidden rounded-t-xl">
        <img src="${course.image}" alt="${course.title}" class="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105">
        <div class="absolute bottom-4 right-4 bg-black/70 text-white text-xs px-2 py-1 rounded">
          ${course.duration}
        </div>
        <div class="absolute top-4 left-4">
          <span class="badge badge-primary text-xs">${course.category}</span>
        </div>
      </div>
      <div class="p-5">
        <h3 class="mb-2 font-bold text-lg line-clamp-2">${course.title}</h3>
        <p class="mb-4 text-sm text-muted-foreground line-clamp-2">${course.description}</p>
        <div class="flex items-center justify-between">
          <span class="font-bold text-lg text-primary">$${course.price.toFixed(2)}</span>
          <button class="btn ${isPurchased ? 'btn-outline' : 'btn-primary'} view-details-btn" data-course-id="${course.id}">
            ${isPurchased ? 'Watch Video' : 'View Details'}
          </button>
        </div>
      </div>
    </div>
  `;
}

// Update course filters
function updateCourseFilters() {
  const courseCategoriesFilter = document.getElementById("course-categories-filter");
  if (!courseCategoriesFilter) return;

  // Add "All" category
  const categoriesHtml = `
    <button class="btn border px-4 py-2 rounded-lg bg-primary text-primary-foreground" data-category="all">All</button>
    ${allCategories.map((category) => 
      `<button class="btn border px-4 py-2 rounded-lg bg-transparent text-foreground border-border hover:bg-secondary" data-category="${category.name}">${category.name}</button>`
    ).join("")}
  `;

  courseCategoriesFilter.innerHTML = categoriesHtml;
}

// Filter courses by category
function filterCoursesByCategory(category) {
  const allCoursesGrid = document.getElementById("all-courses-grid");
  const courseResultsCount = document.getElementById("course-results-count");

  if (category === "all") {
    if (allCoursesGrid) {
      allCoursesGrid.innerHTML = allCourses.map((course) => createCourseCard(course)).join("");
    }
    if (courseResultsCount) {
      courseResultsCount.textContent = allCourses.length;
    }
  } else {
    const filtered = allCourses.filter((course) => course.category === category);
    if (allCoursesGrid) {
      allCoursesGrid.innerHTML = filtered.map((course) => createCourseCard(course)).join("");
    }
    if (courseResultsCount) {
      courseResultsCount.textContent = filtered.length;
    }
  }
}

// Filter courses by search
function filterCourses() {
  const searchTerm = document.getElementById("course-search").value.toLowerCase();
  const filtered = allCourses.filter((course) =>
    course.title.toLowerCase().includes(searchTerm) ||
    course.description.toLowerCase().includes(searchTerm) ||
    course.category.toLowerCase().includes(searchTerm)
  );

  const allCoursesGrid = document.getElementById("all-courses-grid");
  const courseResultsCount = document.getElementById("course-results-count");

  if (allCoursesGrid) {
    allCoursesGrid.innerHTML = filtered.map((course) => createCourseCard(course)).join("");
  }

  if (courseResultsCount) {
    courseResultsCount.textContent = filtered.length;
  }
}

// Load featured documents
function loadFeaturedDocuments() {
  const featured = documentData.filter((doc) => doc.featured);
  const featuredDocumentsGrid = document.getElementById("featured-documents-grid");
  if (featuredDocumentsGrid) {
    featuredDocumentsGrid.innerHTML = featured.map((doc) => createDocumentCard(doc)).join("");
  }
}

// Load all documents
function loadAllDocuments() {
  allDocuments = [...documentData];
  const allDocumentsGrid = document.getElementById("all-documents-grid");
  if (allDocumentsGrid) {
    allDocumentsGrid.innerHTML = allDocuments.map((doc) => createDocumentCard(doc)).join("");
  }

  const documentResultsCount = document.getElementById("document-results-count");
  const documentTotalCount = document.getElementById("document-total-count");
  if (documentResultsCount && documentTotalCount) {
    documentResultsCount.textContent = allDocuments.length;
    documentTotalCount.textContent = allDocuments.length;
  }
}

// Create document card HTML with images
function createDocumentCard(doc) {
  const isLoggedIn = !!currentUser;

  return `
    <div class="card card-hover">
      <div class="p-5">
        <div class="flex items-center justify-between mb-4">
          <div class="h-12 w-12 rounded-lg overflow-hidden">
            <img src="${doc.image}" alt="${doc.title}" class="w-full h-full object-cover">
          </div>
          <span class="text-xs px-3 py-1 rounded-full bg-secondary text-secondary-foreground">${doc.category}</span>
        </div>
        
        <h3 class="mb-2 font-bold text-lg line-clamp-2">${doc.title}</h3>
        <p class="mb-4 text-sm text-muted-foreground line-clamp-2">${doc.description}</p>
        
        <div class="flex items-center justify-between mb-5">
          <span class="text-xs text-muted-foreground">
            <i class="fas fa-external-link-alt mr-1"></i> ${doc.source}
          </span>
          ${doc.pages ? `<span class="text-xs text-muted-foreground">${doc.pages} pages</span>` : ""}
        </div>
        
        ${isLoggedIn ? 
          `<a href="${doc.url}" target="_blank" class="btn btn-primary w-full view-document-btn" data-doc-id="${doc.id}">
            <i class="fas fa-external-link-alt mr-2"></i> View Document
          </a>` : 
          `<button class="btn btn-outline w-full login-to-read-btn" data-doc-id="${doc.id}">
            <i class="fas fa-lock mr-2"></i> Login to Read
          </button>`
        }
      </div>
    </div>
  `;
}

// Update document filters
function updateDocumentFilters() {
  const documentCategoriesFilter = document.getElementById("document-categories-filter");
  if (!documentCategoriesFilter) return;

  // Extract unique categories from documents
  const uniqueCategories = [...new Set(documentData.map((doc) => doc.category))];

  const categoriesHtml = `
    <button class="btn border px-4 py-2 rounded-lg bg-primary text-primary-foreground" data-category="all">All</button>
    ${uniqueCategories.map((category) => 
      `<button class="btn border px-4 py-2 rounded-lg bg-transparent text-foreground border-border hover:bg-secondary" data-category="${category}">${category}</button>`
    ).join("")}
  `;

  documentCategoriesFilter.innerHTML = categoriesHtml;
}

// Filter documents by category
function filterDocumentsByCategory(category) {
  const allDocumentsGrid = document.getElementById("all-documents-grid");
  const documentResultsCount = document.getElementById("document-results-count");

  if (category === "all") {
    if (allDocumentsGrid) {
      allDocumentsGrid.innerHTML = allDocuments.map((doc) => createDocumentCard(doc)).join("");
    }
    if (documentResultsCount) {
      documentResultsCount.textContent = allDocuments.length;
    }
  } else {
    const filtered = allDocuments.filter((doc) => doc.category === category);
    if (allDocumentsGrid) {
      allDocumentsGrid.innerHTML = filtered.map((doc) => createDocumentCard(doc)).join("");
    }
    if (documentResultsCount) {
      documentResultsCount.textContent = filtered.length;
    }
  }
}

// Filter documents by search
function filterDocuments() {
  const searchTerm = document.getElementById("document-search").value.toLowerCase();
  const filtered = allDocuments.filter((doc) =>
    doc.title.toLowerCase().includes(searchTerm) ||
    doc.description.toLowerCase().includes(searchTerm) ||
    doc.category.toLowerCase().includes(searchTerm) ||
    doc.source.toLowerCase().includes(searchTerm)
  );

  const allDocumentsGrid = document.getElementById("all-documents-grid");
  const documentResultsCount = document.getElementById("document-results-count");

  if (allDocumentsGrid) {
    allDocumentsGrid.innerHTML = filtered.map((doc) => createDocumentCard(doc)).join("");
  }

  if (documentResultsCount) {
    documentResultsCount.textContent = filtered.length;
  }
}

// Show login notice on documents page
function showLoginNotice() {
  const loginNotice = document.getElementById("login-notice");
  if (loginNotice) {
    if (!currentUser) {
      // Show notice if user is not logged in
      loginNotice.classList.remove("hidden");
    } else {
      // Hide notice if user is logged in
      loginNotice.classList.add("hidden");
    }
  }
}

// View document
function viewDocument(docId) {
  const doc = documentData.find((d) => d.id === docId);
  if (!doc) return;

  // Check if user is logged in
  if (!currentUser) {
    showLoginModal();
    return;
  }

  // Open in new tab
  window.open(doc.url, "_blank");
}

// Show course detail
function showCourseDetail(courseId) {
  const course = courseData.find((c) => c.id === courseId);
  if (!course) {
    window.location.hash = "courses";
    return;
  }

  // Save current course ID
  localStorage.setItem("current_course_id", courseId);

  // Update course detail page
  const courseDetailCategory = document.getElementById("course-detail-category");
  const courseDetailTitle = document.getElementById("course-detail-title");
  const courseDetailDescription = document.getElementById("course-detail-description");
  const courseDetailPrice = document.getElementById("course-detail-price");
  const courseDuration = document.getElementById("course-duration");
  const courseVideos = document.getElementById("course-videos");

  if (courseDetailCategory) courseDetailCategory.textContent = course.category;
  if (courseDetailTitle) courseDetailTitle.textContent = course.title;
  if (courseDetailDescription) courseDetailDescription.textContent = course.description;
  if (courseDetailPrice) courseDetailPrice.textContent = `$${course.price.toFixed(2)}`;
  if (courseDuration) courseDuration.textContent = course.duration;
  if (courseVideos) courseVideos.textContent = "1 Video";

  // Update learning points
  const learningPointsList = document.getElementById("course-learning-points");
  if (learningPointsList) {
    learningPointsList.innerHTML = course.learningPoints.map((point) => `
      <li class="flex items-start">
        <i class="fas fa-check text-primary mt-1 mr-3"></i>
        <span>${point}</span>
      </li>
    `).join("");
  }

  // Update system status and purchase button
  updatePurchaseButton(courseId, course);
  updateSystemStatusCard();

  // Update video player based on purchase status
  updateVideoPlayer(courseId, course, purchasedCourses.includes(courseId));

  // Show course detail page
  pages.forEach((p) => p.classList.add("page-hidden"));
  const courseDetailPage = document.getElementById("course-detail-page");
  if (courseDetailPage) {
    courseDetailPage.classList.remove("page-hidden");
  }
}

// Update purchase button
function updatePurchaseButton(courseId, course) {
  const purchaseButton = document.getElementById("purchase-button");
  const purchaseStatusText = document.getElementById("purchase-status-text");
  const isPurchased = purchasedCourses.includes(courseId);

  if (purchaseButton && purchaseStatusText) {
    if (isPurchased) {
      purchaseButton.innerHTML = '<i class="fas fa-play mr-2"></i>Watch Video Now';
      purchaseButton.disabled = false;
      purchaseButton.onclick = () => playCourseVideo(courseId);
      purchaseStatusText.textContent = "You own this course • Lifetime access";
    } else {
      const isOpen = isSystemOpen();
      if (isOpen) {
        purchaseButton.innerHTML = `<i class="fas fa-shopping-cart mr-2"></i>Purchase Video ($${course.price.toFixed(2)})`;
        purchaseButton.disabled = false;
        purchaseButton.onclick = () => purchaseCourse(courseId);
        purchaseStatusText.textContent = "One-time payment • Lifetime access";
      } else {
        purchaseButton.innerHTML = '<i class="fas fa-ban mr-2"></i>Purchase Unavailable';
        purchaseButton.disabled = true;
        purchaseStatusText.textContent = "Available 8:00 AM - 10:00 PM (EST)";
      }
    }
  }
}

// Update video player based on purchase status
function updateVideoPlayer(courseId, course, isPurchased) {
  const videoPlayer = document.getElementById("course-video-player");
  if (!videoPlayer) return;

  if (isPurchased) {
    // Show unlocked video placeholder
    videoPlayer.innerHTML = `
      <div class="video-placeholder">
        <i class="fas fa-play-circle text-5xl text-primary mb-4"></i>
        <h3 class="text-xl font-bold mb-2">Ready to Watch</h3>
        <p class="text-gray-300 mb-4">Click below to start learning</p>
        <button class="btn btn-primary" id="watch-video-btn">
          <i class="fas fa-play mr-2"></i> Watch Video Now
        </button>
      </div>
    `;
  } else {
    // Show locked video with overlay
    videoPlayer.innerHTML = `
      <div class="video-placeholder">
        <i class="fas fa-play-circle text-5xl text-primary mb-4"></i>
        <h3 class="text-xl font-bold mb-2">Course Preview</h3>
        <p class="text-gray-300 mb-4">Purchase this course to unlock the video</p>
        ${currentUser ? 
          `<button class="btn btn-primary purchase-course-btn" data-course-id="${courseId}">
            <i class="fas fa-shopping-cart mr-2"></i> Purchase to Unlock
          </button>` : 
          `<button class="btn btn-primary" onclick="showLoginModal()">
            <i class="fas fa-sign-in-alt mr-2"></i> Login to Purchase
          </button>`
        }
      </div>
      <div class="video-lock-overlay">
        <i class="fas fa-lock text-5xl text-warning mb-4"></i>
        <h3 class="text-xl font-bold mb-2">Video Locked</h3>
        <p class="text-gray-300 mb-4">Purchase this course to access the video content</p>
      </div>
    `;
  }
}

// Play course video
function playCourseVideo(courseId) {
  const course = courseData.find((c) => c.id === courseId);
  if (!course) return;

  const videoPlayer = document.getElementById("course-video-player");
  if (!videoPlayer) return;

  // Check if course is purchased
  const isPurchased = purchasedCourses.includes(courseId);
  if (!isPurchased) {
    showToast("Please purchase this course to watch the video", "error");
    return;
  }

  // Replace placeholder with YouTube iframe
  videoPlayer.innerHTML = `
    <iframe 
      src="${course.videoUrl.replace('watch?v=', 'embed/')}?autoplay=1" 
      frameborder="0" 
      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
      allowfullscreen
      style="width: 100%; height: 100%;"
    ></iframe>
  `;

  // Save video progress
  if (!currentVideoProgress[courseId]) {
    currentVideoProgress[courseId] = {
      started: new Date().toISOString(),
      progress: 0,
    };
    localStorage.setItem("learnhub_video_progress", JSON.stringify(currentVideoProgress));
  }
}

// Purchase course function - FIXED
// Purchase course function - FIXED
function purchaseCourse(courseId) {
  if (!currentUser) {
    showLoginModal();
    return;
  }

  if (!isSystemOpen()) {
    showToast("System is closed. Purchases are only available from 8:00 AM to 10:00 PM (EST).", "error");
    return;
  }

  const course = courseData.find((c) => c.id === courseId);
  if (!course) return;

  // Check if already purchased
  if (purchasedCourses.includes(courseId)) {
    showToast("You already own this course!", "success");
    return;
  }

  // Create unique transaction number
  const transactionNumber = "TXN-" + Date.now().toString().slice(-8) + "-" + Math.floor(Math.random() * 1000);

  // Create transaction with detailed receipt information
  const transactionDate = new Date();
  const transaction = {
    id: Date.now(),
    transactionNumber: transactionNumber,
    courseId: courseId,
    courseTitle: course.title,
    courseCategory: course.category,
    courseDuration: course.duration,
    courseInstructor: course.instructor,
    amount: course.price,
    date: transactionDate.toISOString(),
    userId: currentUser.id,
    userName: currentUser.name,
    userEmail: currentUser.email
  };

  // Update purchased courses
  purchasedCourses.push(courseId);
  transactions.push(transaction);

  // Save to localStorage
  localStorage.setItem("learnhub_purchased", JSON.stringify(purchasedCourses));
  localStorage.setItem("learnhub_transactions", JSON.stringify(transactions));

  // Hide any existing purchase message card
  const purchaseMessage = document.getElementById("purchase-message");
  if (purchaseMessage) {
    purchaseMessage.classList.add("hidden");
  }

  // Update purchase button and video player
  updatePurchaseButton(courseId, course);
  updateVideoPlayer(courseId, course, true);

  // Show receipt as toast
  showToast(`Purchase complete! Receipt #${transaction.transactionNumber} saved.`, "success");

  // Show general success toast
  showToast("Course purchased successfully! You can now watch the video.", "success");

  // Update dashboard stats
  updateDashboard();
}
// Show receipt as alert instead of card
// Show receipt as toast instead of card
function showReceiptAlert(transaction) {
  // Just show a toast, don't create any card
  showToast(`Purchase complete! Receipt #${transaction.transactionNumber} saved.`, "success");
}

// Update system status card
function updateSystemStatusCard() {
  const systemStatusCard = document.getElementById("system-status-card");
  if (!systemStatusCard) return;

  const isOpen = isSystemOpen();
  
  if (isOpen) {
    systemStatusCard.innerHTML = `
      <div class="flex items-center justify-between">
        <div class="flex items-center gap-3">
          <div class="h-10 w-10 rounded-full bg-green-100 dark:bg-green-900 flex items-center justify-center">
            <i class="fas fa-check-circle text-green-600 dark:text-green-400"></i>
          </div>
          <div>
            <h4 class="font-medium text-green-600 dark:text-green-400">System Open</h4>
            <p class="text-sm text-muted-foreground">Purchases are now available</p>
          </div>
        </div>
        <span class="text-sm text-muted-foreground">(08:00 - 22:00)</span>
      </div>
    `;
  } else {
    const now = new Date();
    const nextOpenHour = 8; // 08:00 AM
    let hoursUntilOpen = now.getHours() < 8 ? 8 - now.getHours() : 32 - now.getHours();
    
    systemStatusCard.innerHTML = `
      <div class="flex items-center justify-between">
        <div class="flex items-center gap-3">
          <div class="h-10 w-10 rounded-full bg-red-100 dark:bg-red-900 flex items-center justify-center">
            <i class="fas fa-ban text-red-600 dark:text-red-400"></i>
          </div>
          <div>
            <h4 class="font-medium text-red-600 dark:text-red-400">System Closed</h4>
            <p class="text-sm text-muted-foreground">Next opening in ${hoursUntilOpen} hours</p>
          </div>
        </div>
        <span class="text-sm text-muted-foreground">(08:00 - 22:00)</span>
      </div>
    `;
  }
}

// Check if system is open
function isSystemOpen() {
  const now = new Date();
  const hour = now.getHours();
  return hour >= 8 && hour < 22; // 8 AM to 10 PM
}

// Update system status
function updateSystemStatus() {
  updateSystemStatusCard();
  
  // Update course detail page if open
  if (currentPage === "course-detail" || window.location.hash.startsWith("#course-")) {
    const courseIdMatch = window.location.hash.match(/course-(\d+)/);
    if (courseIdMatch) {
      const courseId = parseInt(courseIdMatch[1]);
      const course = courseData.find(c => c.id === courseId);
      if (course) {
        updatePurchaseButton(courseId, course);
      }
    }
  }
}

// Update dashboard
function updateDashboard() {
  if (!currentUser) return;

  // Update user info
  const dashboardUserName = document.getElementById("dashboard-user-name");
  const dashboardUserEmail = document.getElementById("dashboard-user-email");
  const userNameElement = document.getElementById("user-name");
  const profileName = document.getElementById("profile-name");
  const profileEmail = document.getElementById("profile-email");

  if (dashboardUserName) dashboardUserName.textContent = currentUser.name;
  if (dashboardUserEmail) dashboardUserEmail.textContent = currentUser.email;
  if (userNameElement) userNameElement.textContent = currentUser.name;
  if (profileName) profileName.textContent = currentUser.name;
  if (profileEmail) profileEmail.textContent = currentUser.email;

  // Format join date
  const joinDate = new Date(currentUser.createdAt);
  const formattedDate = joinDate.toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric"
  });

  const profileJoined = document.getElementById("profile-joined");
  const profileCreated = document.getElementById("profile-created");

  if (profileJoined) profileJoined.textContent = `Member since ${formattedDate}`;
  if (profileCreated) profileCreated.textContent = formattedDate;

  // Update stats
  const dashboardCoursesOwned = document.getElementById("dashboard-courses-owned");
  const dashboardModulesAvailable = document.getElementById("dashboard-modules-available");
  const dashboardTransactions = document.getElementById("dashboard-transactions");
  const dashboardTotalInvested = document.getElementById("dashboard-total-invested");

  if (dashboardCoursesOwned) dashboardCoursesOwned.textContent = purchasedCourses.length;
  if (dashboardModulesAvailable) dashboardModulesAvailable.textContent = purchasedCourses.length;
  if (dashboardTransactions) dashboardTransactions.textContent = transactions.length;

  const totalInvested = transactions.reduce((sum, t) => sum + t.amount, 0);
  if (dashboardTotalInvested) dashboardTotalInvested.textContent = `$${totalInvested.toFixed(2)}`;

  // Update my courses list
  const myCoursesList = document.getElementById("my-courses-list");
  if (myCoursesList) {
    if (purchasedCourses.length === 0) {
      myCoursesList.innerHTML = `
        <div class="text-center py-12">
          <div class="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-secondary">
            <i class="fas fa-book-open text-muted-foreground text-2xl"></i>
          </div>
          <h4 class="mb-2 font-medium">No courses yet</h4>
          <p class="text-sm text-muted-foreground mb-4">Start your learning journey by purchasing your first course</p>
          <button class="btn btn-primary" onclick="window.location.hash='courses'">
            Browse Courses <i class="fas fa-arrow-right ml-2"></i>
          </button>
        </div>
      `;
    } else {
      myCoursesList.innerHTML = purchasedCourses.map((courseId) => {
        const course = courseData.find((c) => c.id === courseId);
        if (!course) return "";

        return `
          <div class="flex items-center justify-between border-b border-border py-4 last:border-b-0">
            <div class="flex items-center gap-4">
              <div class="h-12 w-12 rounded-lg overflow-hidden flex-shrink-0">
                <img src="${course.image}" alt="${course.title}" class="w-full h-full object-cover">
              </div>
              <div>
                <h4 class="font-medium">${course.title}</h4>
                <p class="text-sm text-muted-foreground">${course.category} • ${course.duration}</p>
              </div>
            </div>
            <button class="btn btn-outline view-details-btn" data-course-id="${course.id}">
              Continue Learning
            </button>
          </div>
        `;
      }).join("");
    }
  }

  // Update receipts list with alerts
  const receiptsList = document.getElementById("receipts-list");
  if (receiptsList) {
    if (transactions.length === 0) {
      receiptsList.innerHTML = `
        <div class="text-center py-12">
          <div class="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-secondary">
            <i class="fas fa-receipt text-muted-foreground text-2xl"></i>
          </div>
          <h4 class="mb-2 font-medium">No transactions yet</h4>
          <p class="text-sm text-muted-foreground">Your purchase history will appear here</p>
        </div>
      `;
    } else {
      // Sort transactions by date (newest first)
      const sortedTransactions = [...transactions].sort((a, b) => new Date(b.date) - new Date(a.date));

      receiptsList.innerHTML = sortedTransactions.map((transaction) => {
        const course = courseData.find((c) => c.id === transaction.courseId);
        const date = new Date(transaction.date);
        const formattedDate = date.toLocaleDateString("en-US", {
          year: "numeric",
          month: "short",
          day: "numeric"
        });
        const formattedTime = date.toLocaleTimeString("en-US", {
          hour: "2-digit",
          minute: "2-digit"
        });

        return `
          <div class="alert alert-info mb-4">
            <i class="fas fa-receipt"></i>
            <div class="flex-1">
              <div class="flex justify-between items-start">
                <div>
                  <h4 class="font-medium">${transaction.courseTitle}</h4>
                  <p class="text-sm">Transaction #${transaction.transactionNumber}</p>
                  <p class="text-xs text-muted-foreground mt-1">${formattedDate} at ${formattedTime}</p>
                </div>
                <span class="font-bold text-lg">$${transaction.amount.toFixed(2)}</span>
              </div>
              <div class="mt-2 text-sm">
                <span class="inline-block bg-secondary text-secondary-foreground px-2 py-1 rounded text-xs">${transaction.courseCategory}</span>
                <span class="text-muted-foreground ml-2">${transaction.courseInstructor}</span>
              </div>
            </div>
          </div>
        `;
      }).join("");
    }
  }

  // Show first tab by default
  showDashboardTab("courses");
}

// Show dashboard tab
function showDashboardTab(tabName) {
  // Update tabs
  document.querySelectorAll(".tab").forEach((tab) => {
    tab.classList.remove("active");
  });
  const activeTab = document.querySelector(`.tab[data-tab="${tabName}"]`);
  if (activeTab) {
    activeTab.classList.add("active");
  }

  // Update content
  document.querySelectorAll(".tab-content").forEach((content) => {
    content.classList.add("hidden");
  });
  const tabContent = document.getElementById(`${tabName}-tab`);
  if (tabContent) {
    tabContent.classList.remove("hidden");
  }
}

// Handle contact form submission
function handleContactSubmit(e) {
  e.preventDefault();

  const name = document.getElementById("contact-name").value;
  const email = document.getElementById("contact-email").value;
  const subject = document.getElementById("contact-subject").value;
  const message = document.getElementById("contact-message").value;

  // Mock submission
  const contactSuccess = document.getElementById("contact-success");
  if (contactSuccess) {
    contactSuccess.classList.remove("hidden");
  }

  // Reset form
  const contactForm = document.getElementById("contact-form");
  if (contactForm) {
    contactForm.reset();
  }

  showToast("Message sent successfully! We'll get back to you soon.", "success");

  // Hide success message after 5 seconds
  setTimeout(() => {
    if (contactSuccess) {
      contactSuccess.classList.add("hidden");
    }
  }, 5000);
}

// Toast notification
function showToast(message, type = "success") {
  // Remove existing toasts
  document.querySelectorAll(".toast").forEach((toast) => toast.remove());

  const icon = type === "success" ? "fa-check-circle" : type === "error" ? "fa-exclamation-circle" : "fa-info-circle";

  const toast = document.createElement("div");
  toast.className = `toast ${type === "success" ? "toast-success" : "toast-error"}`;
  toast.innerHTML = `
    <i class="fas ${icon}"></i>
    <div class="flex-1">
      <p class="text-sm font-medium">${message}</p>
    </div>
    <button class="text-muted-foreground hover:text-foreground" onclick="this.parentElement.remove()">
      <i class="fas fa-times"></i>
    </button>
  `;

  document.body.appendChild(toast);

  // Auto remove after 5 seconds
  setTimeout(() => {
    if (toast.parentElement) {
      toast.remove();
    }
  }, 5000);
}

// Initialize the application
document.addEventListener("DOMContentLoaded", init);

// Update system status every minute
setInterval(updateSystemStatus, 60000);