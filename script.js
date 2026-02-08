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
const pages = document.querySelectorAll(".page");
const guestButtons = document.getElementById("guest-buttons");
const userMenu = document.getElementById("user-menu");
const logoutBtn = document.getElementById("logout-btn");
const mobileMenuBtn = document.getElementById("mobile-menu-btn");
const mobileMenu = document.getElementById("mobile-menu");

// Course Data with real YouTube links
const courseData = [
  {
    id: 1,
    title: "Frontend Web Development",
    category: "Web Development",
    price: 29.99,
    description:
      "Complete frontend web development tutorial covering HTML, CSS, and JavaScript in one comprehensive video.",
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
      "Deploy your website live",
    ],
    instructor: "freeCodeCamp.org",
    modules: 12,
  },
  {
    id: 2,
    title: "Backend Development with Node.js",
    category: "Web Development",
    price: 34.99,
    description:
      "Build powerful backend systems with Node.js, Express, and MongoDB in this comprehensive single-video course.",
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
      "Deployment to cloud servers",
    ],
    instructor: "freeCodeCamp.org",
    modules: 15,
  },
  {
    id: 3,
    title: "Full Stack Web Development",
    category: "Web Development",
    price: 49.99,
    description:
      "Complete full stack web development course covering both frontend and backend in one comprehensive video.",
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
      "Full deployment pipeline",
    ],
    instructor: "freeCodeCamp.org",
    modules: 20,
  },
  {
    id: 4,
    title: "Python Programming Complete Guide",
    category: "Programming Language",
    price: 27.99,
    description:
      "Learn Python programming from basics to advanced concepts in one comprehensive video tutorial.",
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
      "Building simple applications",
    ],
    instructor: "Bro Code",
    modules: 18,
  },
  {
    id: 5,
    title: "JavaScript Deep Dive",
    category: "Programming Language",
    price: 24.99,
    description:
      "Master JavaScript from fundamentals to advanced concepts in this single comprehensive video.",
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
      "Modern JavaScript patterns",
    ],
    instructor: "SuperSimpleDev",
    modules: 25,
  },
  {
    id: 6,
    title: "Java Programming Fundamentals",
    category: "Programming Language",
    price: 31.99,
    description:
      "Complete Java programming tutorial covering core concepts and object-oriented programming.",
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
      "Basic GUI programming",
    ],
    instructor: "Bro Code",
    modules: 22,
  },
  {
    id: 7,
    title: "C++ for Beginners",
    category: "Programming Language",
    price: 26.99,
    description:
      "Learn C++ programming fundamentals and memory management in this comprehensive video tutorial.",
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
      "Building console applications",
    ],
    instructor: "Bro Code",
    modules: 15,
  },
  {
    id: 8,
    title: "Swift for iOS Development",
    category: "Programming Language",
    price: 32.99,
    description:
      "Master Swift programming language for iOS app development in this complete video tutorial.",
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
      "Building a simple iOS app",
    ],
    instructor: "freeCodeCamp.org",
    modules: 18,
  },
  {
    id: 9,
    title: "React Native Mobile App Development",
    category: "Mobile Development",
    price: 35.99,
    description:
      "Build cross-platform mobile applications with React Native in this comprehensive single-video course.",
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
      "Building and deploying apps",
    ],
    instructor: "Programming with Mosh",
    modules: 16,
  },
  {
    id: 10,
    title: "Flutter App Development",
    category: "Mobile Development",
    price: 33.99,
    description:
      "Create beautiful native mobile applications with Flutter in this complete video tutorial.",
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
      "Building a complete app",
    ],
    instructor: "freeCodeCamp.org",
    modules: 30,
  },
  {
    id: 11,
    title: "Android Kotlin Development",
    category: "Mobile Development",
    price: 32.99,
    description:
      "Learn modern Android app development with Kotlin in this comprehensive single-video course.",
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
      "Play Store deployment",
    ],
    instructor: "freeCodeCamp.org",
    modules: 35,
  },
  {
    id: 12,
    title: "Data Structures & Algorithms",
    category: "Data Structures & Algorithms",
    price: 37.99,
    description:
      "Master essential data structures and algorithms for coding interviews in this comprehensive video.",
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
      "Searching algorithms",
    ],
    instructor: "Bro Code",
    modules: 24,
  },
  {
    id: 13,
    title: "Computer Networking Fundamentals",
    category: "Computer Network",
    price: 36.99,
    description:
      "Complete guide to computer networking concepts and protocols in one comprehensive video.",
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
      "Network troubleshooting",
    ],
    instructor: "freeCodeCamp.org",
    modules: 20,
  },
  {
    id: 14,
    title: "Database Management Systems",
    category: "Database Management System",
    price: 35.99,
    description:
      "Learn database design, SQL, and NoSQL concepts in this comprehensive single-video course.",
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
      "Database security",
    ],
    instructor: "freeCodeCamp.org",
    modules: 28,
  },
  {
    id: 15,
    title: "UX/UI Design Principles",
    category: "UX/UI Design",
    price: 32.99,
    description:
      "Master user-centered design principles and prototyping in this comprehensive video tutorial.",
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
      "Design system creation",
    ],
    instructor: "freeCodeCamp.org",
    modules: 14,
  },
];

// Document Data with real PDF links and images
const documentData = [
  {
    id: 1,
    title: "C++ Programming Tutorial PDF",
    category: "Programming Language",
    description:
      "Comprehensive C++ tutorial covering basics to advanced concepts with examples.",
    source: "IISC Bangalore",
    url: "https://cds.iisc.ac.in/wp-content/uploads/DS286.AUG2016.Lab2_.cpp_tutorial.pdf",
    featured: true,
    image: "Images/c-plus-plus.png",
    pages: 45,
  },
  {
    id: 2,
    title: "HTML & CSS Documentation",
    category: "Web Development",
    description:
      "Complete reference for HTML5 and CSS3 with examples and best practices.",
    source: "MDN Web Docs",
    url: "https://developer.mozilla.org/en-US/docs/Web/HTML",
    featured: true,
    image: "Images/html-css.png",
    pages: null,
  },
  {
    id: 3,
    title: "JavaScript Guide",
    category: "Programming Language",
    description:
      "Modern JavaScript tutorial with ES6+ features and practical examples.",
    source: "MDN Web Docs",
    url: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide",
    featured: true,
    image: "Images/javaScript.png",
    pages: null,
  },
  {
    id: 4,
    title: "Python Documentation",
    category: "Programming Language",
    description:
      "Official Python documentation and tutorial for beginners to advanced users.",
    source: "Python.org",
    url: "https://docs.python.org/3/tutorial/",
    featured: true,
    image: "Images/python1.png",
    pages: null,
  },
  {
    id: 5,
    title: "React Documentation",
    category: "Web Development",
    description:
      "Complete React.js documentation with hooks, components, and best practices.",
    source: "React.js",
    url: "https://react.dev/learn",
    featured: false,
    image: "Images/react.png",
    pages: null,
  },
  {
    id: 6,
    title: "Node.js Documentation",
    category: "Web Development",
    description:
      "Complete Node.js API reference and guides for backend development.",
    source: "Node.js",
    url: "https://nodejs.org/docs/latest/api/",
    featured: false,
    image: "Images/nodejs.png",
    pages: null,
  },
  {
    id: 7,
    title: "Java Tutorial",
    category: "Programming Language",
    description:
      "Official Java tutorial covering core concepts and object-oriented programming.",
    source: "Oracle",
    url: "https://docs.oracle.com/javase/tutorial/",
    featured: false,
    image: "Images/java1.png",
    pages: null,
  },
  {
    id: 8,
    title: "SQL Tutorial",
    category: "Database Management System",
    description:
      "Complete SQL tutorial with queries, joins, and database operations.",
    source: "W3Schools",
    url: "https://www.w3schools.com/sql/",
    featured: false,
    image: "Images/sql.png",
    pages: null,
  },
  {
    id: 9,
    title: "Git & GitHub Guide",
    category: "Web Development",
    description:
      "Complete guide to version control with Git and collaboration on GitHub.",
    source: "GitHub",
    url: "https://docs.github.com/en-get-started",
    featured: false,
    image: "Images/git-github.png",
    pages: null,
  },
  {
    id: 10,
    title: "Linux Command Line",
    category: "Computer Network",
    description:
      "Comprehensive Linux command line tutorial for beginners and advanced users.",
    source: "Linux Foundation",
    url: "https://linuxfoundation.org/tools/command-line/",
    featured: false,
    image: "Images/linux.png",
    pages: null,
  },
  {
    id: 11,
    title: "Docker Documentation",
    category: "Web Development",
    description:
      "Complete Docker documentation for containerization and deployment.",
    source: "Docker",
    url: "https://docs.docker.com/get-started/",
    featured: false,
    image: "Images/docker.png",
    pages: null,
  },
  {
    id: 12,
    title: "REST API Design",
    category: "Web Development",
    description:
      "Best practices for designing RESTful APIs with examples and patterns.",
    source: "Microsoft",
    url: "https://learn.microsoft.com/en-us/azure/architecture/best-practices/api-design",
    featured: false,
    image: "Images/rest-api.png",
    pages: null,
  },
  {
    id: 13,
    title: "Data Structures PDF",
    category: "Data Structures & Algorithms",
    description:
      "Comprehensive guide to data structures with implementations in multiple languages.",
    source: "GeeksforGeeks",
    url: "https://www.geeksforgeeks.org/data-structures/",
    featured: false,
    image: "Images/dsa1.png",
    pages: null,
  },
  {
    id: 14,
    title: "Algorithms Tutorial",
    category: "Data Structures & Algorithms",
    description:
      "Algorithm design and analysis with complexity explanations and examples.",
    source: "Khan Academy",
    url: "https://www.khanacademy.org/computing/computer-science/algorithms",
    featured: false,
    image: "Images/algorithm.png",
    pages: null,
  },
  {
    id: 15,
    title: "Networking Basics",
    category: "Computer Network",
    description:
      "Introduction to computer networking concepts, protocols, and architecture.",
    source: "Cisco",
    url: "https://www.cisco.com/c/en/us/solutions/enterprise-networks/what-is-computer-networking.html",
    featured: false,
    image: "Images/network.png",
    pages: null,
  },
  {
    id: 16,
    title: "Database Design",
    category: "Database Management System",
    description:
      "Principles of database design, normalization, and SQL optimization.",
    source: "Stanford University",
    url: "https://lagunita.stanford.edu/courses/DB/2014/SelfPaced/about",
    featured: false,
    image: "Images/database-design.png",
    pages: null,
  },
  {
    id: 17,
    title: "UI Design Principles",
    category: "UX/UI Design",
    description:
      "User interface design principles, patterns, and best practices.",
    source: "Nielsen Norman Group",
    url: "https://www.nngroup.com/articles/usability-101-introduction-to-usability/",
    featured: false,
    image: "Images/uxui.png",
    pages: null,
  },
  {
    id: 18,
    title: "Mobile App Design",
    category: "Mobile Development",
    description:
      "Mobile app design patterns and guidelines for iOS and Android.",
    source: "Material Design",
    url: "https://material.io/design",
    featured: false,
    image: "Images/mobile-app.png",
    pages: null,
  },
  {
    id: 19,
    title: "DevOps Practices",
    category: "Web Development",
    description:
      "DevOps principles, practices, and tools for continuous integration.",
    source: "AWS",
    url: "https://aws.amazon.com/devops/what-is-devops/",
    featured: false,
    image: "Images/devops.png",
    pages: null,
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
    pages: null,
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
    pages: null,
  },
];

// Initialize application
function init() {
  console.log("Initializing application...");

  // Initialize state
  currentUser = null;
  purchasedCourses = [];
  transactions = [];
  currentVideoProgress = {};

  // Check for saved user
  const savedUser = localStorage.getItem("learnhub_user");
  if (savedUser) {
    try {
      currentUser = JSON.parse(savedUser);
      loadUserData(currentUser.id);
    } catch (e) {
      console.error("Error loading user:", e);
      clearUserData();
    }
  }

  // Load all data
  loadCategories();
  loadFeaturedCourses();
  loadAllCourses();
  loadFeaturedDocuments();
  loadAllDocuments();
  updateSystemStatusCard();

  // Setup event listeners
  setupEventListeners();

  // Setup navigation
  window.addEventListener("hashchange", handleHashChange);
  handleHashChange();

  // Setup theme
  setupTheme();

  // Update UI
  updateAuthUI();

  if (currentUser) {
    updateDashboard();
  }

  console.log("Application initialized successfully");
}

// Load user data
function loadUserData(userId) {
  try {
    const userPurchasedKey = `learnhub_purchased_${userId}`;
    const userTransactionsKey = `learnhub_transactions_${userId}`;
    const userProgressKey = `learnhub_video_progress_${userId}`;

    purchasedCourses = JSON.parse(localStorage.getItem(userPurchasedKey) || "[]");
    transactions = JSON.parse(localStorage.getItem(userTransactionsKey) || "[]");
    currentVideoProgress = JSON.parse(localStorage.getItem(userProgressKey) || "{}");

    // Validate data integrity
    if (!Array.isArray(purchasedCourses)) purchasedCourses = [];
    if (!Array.isArray(transactions)) transactions = [];
    if (typeof currentVideoProgress !== 'object') currentVideoProgress = {};

    console.log(`Loaded data for user ${userId}: ${purchasedCourses.length} courses, ${transactions.length} transactions`);
    return true;
  } catch (e) {
    console.error("Error loading user data:", e);
    purchasedCourses = [];
    transactions = [];
    currentVideoProgress = {};
    return false;
  }
}

// Save user data
function saveUserData(userId) {
  try {
    const userPurchasedKey = `learnhub_purchased_${userId}`;
    const userTransactionsKey = `learnhub_transactions_${userId}`;
    const userProgressKey = `learnhub_video_progress_${userId}`;

    localStorage.setItem(userPurchasedKey, JSON.stringify(purchasedCourses));
    localStorage.setItem(userTransactionsKey, JSON.stringify(transactions));
    localStorage.setItem(userProgressKey, JSON.stringify(currentVideoProgress));

    console.log(`Saved data for user ${userId}`);
    return true;
  } catch (e) {
    console.error("Error saving user data:", e);
    return false;
  }
}

// Clear user data
function clearUserData() {
  localStorage.removeItem("learnhub_user");
  localStorage.removeItem("learnhub_purchased");
  localStorage.removeItem("learnhub_transactions");
  localStorage.removeItem("learnhub_video_progress");
  
  currentUser = null;
  purchasedCourses = [];
  transactions = [];
  currentVideoProgress = {};
}

// ============================================
// Event Listeners Setup
// ============================================

// Set up event listeners
function setupEventListeners() {
  // Theme toggle
  if (themeToggle) {
    themeToggle.addEventListener("click", toggleTheme);
  }

  // Logout button
  if (logoutBtn) {
    logoutBtn.addEventListener("click", logout);
  }

  // Mobile menu toggle
  if (mobileMenuBtn && mobileMenu) {
    mobileMenuBtn.addEventListener("click", toggleMobileMenu);
    setupClickOutsideHandler();
  }

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

  // Logo click
  const logoContainer = document.querySelector(".logo-container");
  if (logoContainer) {
    logoContainer.addEventListener("click", (e) => {
      e.preventDefault();
      window.location.hash = "home";
    });
  }

  // Setup event delegation for dynamic elements
  setupEventDelegation();
}

// Setup event delegation
function setupEventDelegation() {
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

    // Dashboard watch button
    if (e.target.closest(".dashboard-watch-btn")) {
      const btn = e.target.closest(".dashboard-watch-btn");
      const courseId = parseInt(btn.dataset.courseId);
      if (courseId) {
        playCourseVideo(courseId);
        window.location.hash = `course-${courseId}`;
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
      showLoginModal();
    }

    // Purchase video button in video area
    if (e.target.closest("#purchase-video-btn")) {
      const courseId = localStorage.getItem("current_course_id");
      if (courseId) {
        purchaseCourse(parseInt(courseId));
      }
    }

    // Course card click (excluding buttons)
    if (e.target.closest(".course-card") && !e.target.closest("button")) {
      const card = e.target.closest(".course-card");
      const courseId = parseInt(card.dataset.courseId);
      if (courseId) {
        window.location.hash = `course-${courseId}`;
      }
    }
  });
}

// Setup click outside handler for mobile menu
function setupClickOutsideHandler() {
  document.addEventListener("click", (e) => {
    if (
      !mobileMenu.classList.contains("hidden") &&
      !mobileMenu.contains(e.target) &&
      !mobileMenuBtn.contains(e.target)
    ) {
      closeMobileMenu();
    }
  });
}

// ============================================
// Navigation & Page Management
// ============================================

// Handle hash changes
function handleHashChange() {
  const hash = window.location.hash.substring(1);
  console.log("Hash changed to:", hash);

  const validPages = [
    "home",
    "about",
    "courses",
    "documents",
    "contact",
    "dashboard",
  ];

  if (validPages.includes(hash)) {
    showPage(hash);
    if (hash === "documents") {
      showLoginNotice();
    }
    if (hash === "dashboard") {
      updateDashboard();
    }
  } else if (hash.startsWith("course-")) {
    const courseId = parseInt(hash.split("-")[1]);
    if (courseId) {
      showCourseDetail(courseId);
    }
  } else {
    if (window.location.hash !== "#home") {
      window.location.hash = "home";
    } else {
      showPage("home");
    }
  }
}

// Show page
function showPage(page) {
  // Don't show dashboard if not logged in
  if (page.includes("dashboard") && !currentUser) {
    showLoginModal();
    window.location.hash = "home";
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
      showDashboardView('main');
    } else if (page === "courses") {
      updateCourseFilters();
    } else if (page === "documents") {
      updateDocumentFilters();
      showLoginNotice();
    }
  }
}

// ============================================
// Dashboard Functions
// ============================================

// Dashboard Navigation
function showDashboardView(view) {
  // Hide all dashboard views
  document.querySelectorAll('.dashboard-view').forEach(view => {
    view.classList.add('hidden');
  });
  
  // Show selected view
  const targetView = document.getElementById(`dashboard-${view}-view`);
  if (targetView) {
    targetView.classList.remove('hidden');
  }
  
  // Load content for the view
  if (view === 'courses') {
    loadDashboardCoursesView();
  } else if (view === 'receipts') {
    loadDashboardReceiptsView();
  } else if (view === 'main') {
    updateDashboard();
  }
}

// Update dashboard
function updateDashboard() {
  if (!currentUser) return;

  console.log("Updating dashboard...");

  // Update user info
  const dashboardUserName = document.getElementById('dashboard-user-name');
  const dashboardUserEmail = document.getElementById('dashboard-user-email');
  const dashboardMemberDate = document.getElementById('dashboard-member-date');
  
  if (dashboardUserName) dashboardUserName.textContent = currentUser.name || "User";
  if (dashboardUserEmail) dashboardUserEmail.textContent = currentUser.email || "No email";
  
  if (dashboardMemberDate && currentUser.createdAt) {
    const date = new Date(currentUser.createdAt);
    dashboardMemberDate.textContent = date.toLocaleDateString('en-US', {
      month: 'short',
      year: 'numeric'
    });
  }

  // Update counts
  document.getElementById('dashboard-course-count').textContent = purchasedCourses.length;
  document.getElementById('dashboard-receipts-count').textContent = transactions.length;
  document.getElementById('purchased-courses-count').textContent = purchasedCourses.length;
  
  // Update total spent
  const totalSpent = transactions.reduce((total, t) => total + t.amount, 0);
  document.getElementById('total-spent-amount').textContent = `$${totalSpent.toFixed(2)}`;
  
  // Update last purchase
  const lastPurchaseDate = document.getElementById('last-purchase-date');
  const lastPurchaseCourse = document.getElementById('last-purchase-course');
  
  if (transactions.length > 0) {
    const lastTransaction = [...transactions].sort((a, b) => new Date(b.date) - new Date(a.date))[0];
    const date = new Date(lastTransaction.date);
    lastPurchaseDate.textContent = date.toLocaleDateString('en-US', { 
      month: 'short', 
      day: 'numeric', 
      year: 'numeric' 
    });
    lastPurchaseCourse.textContent = lastTransaction.courseTitle;
  } else {
    lastPurchaseDate.textContent = '-';
    lastPurchaseCourse.textContent = 'No purchases yet';
  }
  
  // Load recent courses
  loadRecentCourses();
}

// Load recent courses for dashboard
function loadRecentCourses() {
  const recentCoursesGrid = document.getElementById('recent-courses-grid');
  if (!recentCoursesGrid) return;

  if (purchasedCourses.length === 0) {
    recentCoursesGrid.innerHTML = `
      <div class="text-center py-12 col-span-3">
        <i class="fas fa-video text-gray-300 dark:text-gray-600 text-4xl mb-4"></i>
        <h3 class="text-lg font-semibold mb-2">No Courses Purchased</h3>
        <p class="text-gray-600 dark:text-gray-400 mb-4">
          You haven't purchased any courses yet.
        </p>
        <button onclick="window.location.hash = 'courses'" class="btn btn-primary py-2 px-4">
          Browse Courses
        </button>
      </div>
    `;
    return;
  }

  // Get recent purchased courses (last 3)
  const recentCourseIds = [...purchasedCourses].reverse().slice(0, 3);
  let coursesHTML = '';

  recentCourseIds.forEach(courseId => {
    const course = courseData.find(c => c.id === courseId);
    if (course) {
      coursesHTML += `
        <div class="card">
          <div class="relative h-40 overflow-hidden rounded-t-xl">
            <img src="${course.image}" alt="${course.title}" class="w-full h-full object-cover">
            <div class="absolute top-3 left-3">
              <span class="badge badge-primary text-xs">Purchased</span>
            </div>
          </div>
          <div class="p-4">
            <h3 class="font-bold text-lg mb-2 line-clamp-1">${course.title}</h3>
            <p class="text-gray-600 dark:text-gray-400 text-sm mb-4 line-clamp-2">${course.description}</p>
            <button class="btn btn-primary w-full py-1.5 text-sm dashboard-watch-btn" data-course-id="${course.id}">
              <i class="fas fa-play mr-1"></i> Watch Now
            </button>
          </div>
        </div>
      `;
    }
  });

  recentCoursesGrid.innerHTML = coursesHTML;
}

// Load dashboard courses view
function loadDashboardCoursesView() {
  const coursesView = document.getElementById('dashboard-courses-view');
  if (!coursesView) return;

  let coursesHTML = `
    <div class="mb-8">
      <div class="flex justify-between items-center mb-6">
        <div>
          <h2 class="text-2xl font-bold mb-2">My Courses</h2>
          <p class="text-gray-600 dark:text-gray-400">All your purchased video courses in one place.</p>
        </div>
        <button onclick="window.location.hash = 'courses'" class="btn btn-outline">
          <i class="fas fa-plus mr-2"></i> Buy More Courses
        </button>
      </div>
  `;

  if (purchasedCourses.length === 0) {
    coursesHTML += `
      <div class="text-center py-12 bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700">
        <i class="fas fa-video text-gray-300 dark:text-gray-600 text-4xl mb-4"></i>
        <h3 class="text-lg font-semibold mb-2">No Courses Purchased</h3>
        <p class="text-gray-600 dark:text-gray-400 mb-4">
          You haven't purchased any courses yet.
        </p>
        <button onclick="window.location.hash = 'courses'" class="btn btn-primary">
          Browse Courses
        </button>
      </div>
    `;
  } else {
    coursesHTML += '<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">';
    
    purchasedCourses.forEach(courseId => {
      const course = courseData.find(c => c.id === courseId);
      if (course) {
        coursesHTML += `
          <div class="card">
            <div class="relative h-40 overflow-hidden rounded-t-xl">
              <img src="${course.image}" alt="${course.title}" class="w-full h-full object-cover">
              <div class="absolute top-3 left-3">
                <span class="badge badge-primary text-xs">Purchased</span>
              </div>
              <div class="absolute top-3 right-3">
                <span class="badge badge-secondary text-xs">${course.category}</span>
              </div>
            </div>
            <div class="p-4">
              <h3 class="font-bold text-lg mb-2 line-clamp-1">${course.title}</h3>
              <p class="text-gray-600 dark:text-gray-400 text-sm mb-4 line-clamp-2">${course.description}</p>
              <div class="flex justify-between items-center">
                <span class="text-sm text-gray-500">${course.duration}</span>
                <button onclick="playCourseVideo(${course.id})" class="btn btn-primary py-1.5 px-3 text-sm">
                  <i class="fas fa-play mr-1"></i> Watch
                </button>
              </div>
            </div>
          </div>
        `;
      }
    });
    
    coursesHTML += '</div>';
  }
  
  coursesHTML += '</div>';
  coursesView.innerHTML = coursesHTML;
}

// Load dashboard receipts view
function loadDashboardReceiptsView() {
  const receiptsView = document.getElementById('dashboard-receipts-view');
  if (!receiptsView) return;

  // Calculate stats
  const totalPurchases = transactions.length;
  const totalSpent = transactions.reduce((total, t) => total + t.amount, 0);
  const lastPurchase = transactions.length > 0 
    ? new Date(Math.max(...transactions.map(t => new Date(t.date).getTime())))
    : null;

  let receiptsHTML = `
    <div class="mb-8">
      <!-- Purchase History Header -->
      <div class="mb-8">
        <h2 class="text-2xl font-bold mb-2">Purchase History</h2>
        <p class="text-gray-600 dark:text-gray-400">
          View all your purchase receipts and transaction details.
        </p>
      </div>

      <!-- Stats Cards -->
      <div class="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div class="bg-white dark:bg-gray-800 rounded-xl p-6 border border-gray-200 dark:border-gray-700">
          <div class="flex items-center mb-4">
            <div class="w-10 h-10 rounded-lg bg-blue-100 dark:bg-blue-900 flex items-center justify-center mr-3">
              <i class="fas fa-shopping-cart text-blue-600 dark:text-blue-400"></i>
            </div>
            <div>
              <h3 class="font-bold">Total Purchases</h3>
            </div>
          </div>
          <div class="text-3xl font-bold">${totalPurchases}</div>
        </div>

        <div class="bg-white dark:bg-gray-800 rounded-xl p-6 border border-gray-200 dark:border-gray-700">
          <div class="flex items-center mb-4">
            <div class="w-10 h-10 rounded-lg bg-green-100 dark:bg-green-900 flex items-center justify-center mr-3">
              <i class="fas fa-dollar-sign text-green-600 dark:text-green-400"></i>
            </div>
            <div>
              <h3 class="font-bold">Total Spent</h3>
            </div>
          </div>
          <div class="text-3xl font-bold">$${totalSpent.toFixed(2)}</div>
        </div>

        <div class="bg-white dark:bg-gray-800 rounded-xl p-6 border border-gray-200 dark:border-gray-700">
          <div class="flex items-center mb-4">
            <div class="w-10 h-10 rounded-lg bg-purple-100 dark:bg-purple-900 flex items-center justify-center mr-3">
              <i class="fas fa-calendar-alt text-purple-600 dark:text-purple-400"></i>
            </div>
            <div>
              <h3 class="font-bold">Last Purchase</h3>
            </div>
          </div>
          <div class="text-xl font-bold">
            ${lastPurchase ? lastPurchase.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }) : '-'}
          </div>
        </div>
      </div>

      <!-- All Receipts Section -->
      <div>
        <div class="flex justify-between items-center mb-4">
          <h3 class="text-xl font-bold">All Receipts</h3>
          <p class="text-sm text-gray-600 dark:text-gray-400">
            Showing ${transactions.length} receipts
          </p>
        </div>
  `;

  if (transactions.length === 0) {
    receiptsHTML += `
      <div class="text-center py-12 bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700">
        <i class="fas fa-receipt text-gray-300 dark:text-gray-600 text-4xl mb-4"></i>
        <h3 class="text-lg font-semibold mb-2">No Purchase History</h3>
        <p class="text-gray-600 dark:text-gray-400 mb-4">
          You haven't made any purchases yet.
        </p>
        <button onclick="window.location.hash = 'courses'" class="btn btn-primary">
          Browse Courses
        </button>
      </div>
    `;
  } else {
    receiptsHTML += `
      <div class="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 overflow-hidden">
        <div class="overflow-x-auto">
          <table class="w-full">
            <thead class="bg-gray-50 dark:bg-gray-700">
              <tr>
                <th class="py-3 px-4 text-left text-sm font-medium text-gray-700 dark:text-gray-300">RECEIPT ID</th>
                <th class="py-3 px-4 text-left text-sm font-medium text-gray-700 dark:text-gray-300">COURSE</th>
                <th class="py-3 px-4 text-left text-sm font-medium text-gray-700 dark:text-gray-300">DATE</th>
                <th class="py-3 px-4 text-left text-sm font-medium text-gray-700 dark:text-gray-300">AMOUNT</th>
                <th class="py-3 px-4 text-left text-sm font-medium text-gray-700 dark:text-gray-300">ACTIONS</th>
              </tr>
            </thead>
            <tbody class="divide-y divide-gray-200 dark:divide-gray-700">
    `;

    // Sort by most recent first
    const sortedTransactions = [...transactions].sort((a, b) => new Date(b.date) - new Date(a.date));

    sortedTransactions.forEach(transaction => {
      const course = courseData.find(c => c.id === transaction.courseId);
      if (!course) return;

      const date = new Date(transaction.date);
      const formattedDate = date.toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric',
        year: 'numeric'
      });

      // Shorten receipt ID for display
      const shortReceiptId = `RCP-${transaction.transactionNumber?.split('-')[1]?.substring(0, 8) || 'N/A'}`;

      receiptsHTML += `
        <tr>
          <td class="py-3 px-4 text-sm">${shortReceiptId}</td>
          <td class="py-3 px-4 text-sm">${course.title}</td>
          <td class="py-3 px-4 text-sm">${formattedDate}</td>
          <td class="py-3 px-4 text-sm font-medium">$${transaction.amount.toFixed(2)}</td>
          <td class="py-3 px-4 text-sm">
            <button onclick="viewReceiptDetail(${transaction.id})" class="btn btn-outline btn-sm py-1 px-3">
              <i class="fas fa-eye mr-1 text-xs"></i> View
            </button>
          </td>
        </tr>
      `;
    });

    receiptsHTML += `
            </tbody>
          </table>
        </div>
      </div>
    `;
  }

  receiptsHTML += `
      </div>
    </div>
  `;

  receiptsView.innerHTML = receiptsHTML;
}

// View receipt detail
function viewReceiptDetail(receiptId) {
  const transaction = transactions.find(t => t.id === receiptId);
  if (!transaction) {
    showToast("Receipt not found", "error");
    return;
  }
  
  const course = courseData.find(c => c.id === transaction.courseId);
  
  // Create a modal for receipt details
  const modalHTML = `
    <div id="receipt-detail-modal" class="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
      <div class="bg-white dark:bg-gray-800 rounded-xl shadow-2xl max-w-md w-full max-h-[90vh] overflow-auto">
        <div class="p-6">
          <div class="flex justify-between items-center mb-6">
            <h3 class="text-xl font-bold text-gray-800 dark:text-white">Receipt Details</h3>
            <button onclick="closeReceiptDetailModal()" class="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors">
              <i class="fas fa-times text-gray-600 dark:text-gray-300"></i>
            </button>
          </div>
          <div class="space-y-4">
            <div class="bg-purple-50 dark:bg-purple-900/20 p-4 rounded-lg mb-4">
              <h4 class="font-bold text-purple-700 dark:text-purple-300 mb-2">Transaction Summary</h4>
              <div class="text-2xl font-bold text-gray-800 dark:text-white">$${transaction.amount.toFixed(2)}</div>
              <div class="text-sm text-gray-600 dark:text-gray-400">${transaction.transactionNumber}</div>
            </div>
            
            <div class="space-y-3">
              <div class="flex justify-between">
                <span class="text-gray-600 dark:text-gray-400">Course:</span>
                <span class="font-medium">${transaction.courseTitle}</span>
              </div>
              <div class="flex justify-between">
                <span class="text-gray-600 dark:text-gray-400">Category:</span>
                <span class="font-medium">${transaction.courseCategory}</span>
              </div>
              <div class="flex justify-between">
                <span class="text-gray-600 dark:text-gray-400">Date:</span>
                <span class="font-medium">${new Date(transaction.date).toLocaleString()}</span>
              </div>
              <div class="flex justify-between">
                <span class="text-gray-600 dark:text-gray-400">Instructor:</span>
                <span class="font-medium">${transaction.courseInstructor}</span>
              </div>
              <div class="flex justify-between">
                <span class="text-gray-600 dark:text-gray-400">Duration:</span>
                <span class="font-medium">${transaction.courseDuration}</span>
              </div>
              <div class="flex justify-between">
                <span class="text-gray-600 dark:text-gray-400">Modules:</span>
                <span class="font-medium">${transaction.courseModules}</span>
              </div>
              <div class="flex justify-between">
                <span class="text-gray-600 dark:text-gray-400">Status:</span>
                <span class="font-medium text-green-600 dark:text-green-400">Completed</span>
              </div>
            </div>
            
            <div class="pt-4 border-t border-gray-200 dark:border-gray-700">
              <p class="text-sm text-gray-600 dark:text-gray-400">
                This receipt has been saved to your account. You can access this course anytime from your dashboard.
              </p>
            </div>
          </div>
          <div class="mt-6 pt-6 border-t border-gray-200 dark:border-gray-700">
            <button onclick="closeReceiptDetailModal()" class="btn btn-primary w-full">Close</button>
          </div>
        </div>
      </div>
    </div>
  `;

  // Add modal to body
  document.body.insertAdjacentHTML('beforeend', modalHTML);
}

// Close receipt detail modal
function closeReceiptDetailModal() {
  const modal = document.getElementById('receipt-detail-modal');
  if (modal) {
    modal.remove();
  }
}

// ============================================
// Course Management
// ============================================

// Load categories
function loadCategories() {
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
    featuredCoursesGrid.innerHTML = featured
      .map((course) => createCourseCard(course))
      .join("");
  }
}

// Load all courses
function loadAllCourses() {
  allCourses = [...courseData];
  const allCoursesGrid = document.getElementById("all-courses-grid");
  if (allCoursesGrid) {
    allCoursesGrid.innerHTML = allCourses
      .map((course) => createCourseCard(course))
      .join("");
  }

  const courseResultsCount = document.getElementById("course-results-count");
  const courseTotalCount = document.getElementById("course-total-count");
  if (courseResultsCount && courseTotalCount) {
    courseResultsCount.textContent = allCourses.length;
    courseTotalCount.textContent = allCourses.length;
  }
}

// Create course card
function createCourseCard(course) {
  const isPurchased = purchasedCourses.includes(course.id);

  return `
    <div class="card course-card" data-course-id="${course.id}">
      <div class="relative aspect-video overflow-hidden rounded-t-xl">
        <img src="${course.image}" alt="${course.title}" class="w-full h-full object-cover">
        <div class="absolute bottom-4 right-4 bg-black/70 text-white text-xs px-2 py-1 rounded">
          ${course.duration}
        </div>
        <div class="absolute top-4 left-4">
          <span class="badge badge-primary text-xs">${course.category}</span>
        </div>
      </div>
      <div class="p-5">
        <h3 class="mb-2 font-bold text-lg line-clamp-2">${course.title}</h3>
        <p class="mb-4 text-sm text-gray-600 dark:text-gray-400 line-clamp-2">${course.description}</p>
        <div class="flex items-center justify-between">
          <span class="font-bold text-lg text-purple-600 dark:text-purple-400">$${course.price.toFixed(2)}</span>
          <button class="btn ${isPurchased ? "btn-outline" : "btn-primary"} view-details-btn text-sm py-1.5 px-3" data-course-id="${course.id}">
            ${isPurchased ? "Watch Video" : "View Details"}
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

  const categoriesHtml = `
    <button class="btn border border-gray-300 dark:border-gray-600 px-3 py-1.5 rounded-lg bg-purple-600 text-white text-sm" data-category="all">All</button>
    ${allCategories
      .map(
        (category) =>
          `<button class="btn border border-gray-300 dark:border-gray-600 px-3 py-1.5 rounded-lg bg-transparent text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 text-sm" data-category="${category.name}">${category.name}</button>`,
      )
      .join("")}
  `;

  courseCategoriesFilter.innerHTML = categoriesHtml;

  // Add event listeners to category buttons
  courseCategoriesFilter.querySelectorAll("button").forEach((button) => {
    button.addEventListener("click", (e) => {
      const category = e.target.dataset.category;
      filterCoursesByCategory(category);

      // Update active state
      document.querySelectorAll("#course-categories-filter button").forEach((b) => {
        b.classList.remove("bg-purple-600", "text-white");
        b.classList.add("bg-transparent", "text-gray-700", "border-gray-300");
      });
      e.target.classList.add("bg-purple-600", "text-white");
      e.target.classList.remove("bg-transparent", "text-gray-700", "border-gray-300");
    });
  });
}

// Filter courses by category
function filterCoursesByCategory(category) {
  const allCoursesGrid = document.getElementById("all-courses-grid");
  const courseResultsCount = document.getElementById("course-results-count");

  if (category === "all") {
    if (allCoursesGrid) {
      allCoursesGrid.innerHTML = allCourses
        .map((course) => createCourseCard(course))
        .join("");
    }
    if (courseResultsCount) {
      courseResultsCount.textContent = allCourses.length;
    }
  } else {
    const filtered = allCourses.filter((course) => course.category === category);
    if (allCoursesGrid) {
      allCoursesGrid.innerHTML = filtered
        .map((course) => createCourseCard(course))
        .join("");
    }
    if (courseResultsCount) {
      courseResultsCount.textContent = filtered.length;
    }
  }
}

// Filter courses by search
function filterCourses() {
  const searchTerm = document.getElementById("course-search").value.toLowerCase();
  const filtered = allCourses.filter(
    (course) =>
      course.title.toLowerCase().includes(searchTerm) ||
      course.description.toLowerCase().includes(searchTerm) ||
      course.category.toLowerCase().includes(searchTerm),
  );

  const allCoursesGrid = document.getElementById("all-courses-grid");
  const courseResultsCount = document.getElementById("course-results-count");

  if (allCoursesGrid) {
    allCoursesGrid.innerHTML = filtered
      .map((course) => createCourseCard(course))
      .join("");
  }

  if (courseResultsCount) {
    courseResultsCount.textContent = filtered.length;
  }
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
  const purchasePrice = document.getElementById("purchase-price");
  const courseDurationValue = document.getElementById("course-duration-value");

  if (courseDetailCategory) courseDetailCategory.textContent = course.category;
  if (courseDetailTitle) courseDetailTitle.textContent = course.title;
  if (courseDetailDescription) courseDetailDescription.textContent = course.description;
  if (courseDetailPrice) courseDetailPrice.textContent = `$${course.price.toFixed(2)}`;
  if (purchasePrice) purchasePrice.textContent = `$${course.price.toFixed(2)}`;
  if (courseDurationValue) courseDurationValue.textContent = course.duration;

  // Update learning points
  const learningPointsList = document.getElementById("course-learning-points");
  if (learningPointsList) {
    learningPointsList.innerHTML = course.learningPoints
      .map(
        (point) => `
          <li class="flex items-start">
            <i class="fas fa-check text-purple-600 dark:text-purple-400 mt-1 mr-3"></i>
            <span>${point}</span>
          </li>
        `,
      )
      .join("");
  }

  // Update system status and purchase button
  updateSystemStatusCard();
  updatePurchaseButton(courseId, course);

  // Update video player based on purchase status
  updateVideoPlayer(courseId, course);

  // Show course detail page
  pages.forEach((p) => p.classList.add("page-hidden"));
  const courseDetailPage = document.getElementById("course-detail-page");
  if (courseDetailPage) {
    courseDetailPage.classList.remove("page-hidden");
    currentPage = "course-detail";
  }
}

// Update purchase button
function updatePurchaseButton(courseId, course) {
  const purchaseButton = document.getElementById("purchase-button");
  const purchaseStatusText = document.getElementById("purchase-status-text");
  const isPurchased = purchasedCourses.includes(courseId);
  const isOpen = isSystemOpen();

  if (purchaseButton && purchaseStatusText) {
    if (isPurchased) {
      purchaseButton.innerHTML = '<i class="fas fa-play mr-2"></i> Watch Video Now';
      purchaseButton.disabled = false;
      purchaseButton.onclick = () => playCourseVideo(courseId);
      purchaseButton.className = "w-full bg-green-600 hover:bg-green-700 text-white font-semibold py-3 rounded-lg transition-colors";
      purchaseStatusText.textContent = "You own this course • Lifetime access";
    } else {
      if (isOpen) {
        purchaseButton.innerHTML = `<i class="fas fa-shopping-cart mr-2"></i> Purchase Video ($${course.price.toFixed(2)})`;
        purchaseButton.disabled = false;
        purchaseButton.onclick = () => purchaseCourse(courseId);
        purchaseButton.className = "w-full bg-purple-600 hover:bg-purple-700 text-white font-semibold py-3 rounded-lg transition-colors";
        purchaseStatusText.textContent = "One-time payment • Lifetime access";
      } else {
        purchaseButton.innerHTML = '<i class="fas fa-ban mr-2"></i> Purchase Unavailable';
        purchaseButton.disabled = true;
        purchaseButton.className = "w-full bg-gray-400 dark:bg-gray-600 text-gray-600 dark:text-gray-300 font-semibold py-3 rounded-lg cursor-not-allowed";
        purchaseStatusText.textContent = "Available 8:00 AM - 10:00 PM (EST)";
      }
    }
  }
}

// Update video player
function updateVideoPlayer(courseId, course) {
  const videoPlayer = document.getElementById("course-video-player");
  if (!videoPlayer) return;

  const isPurchased = purchasedCourses.includes(courseId);

  if (isPurchased) {
    videoPlayer.innerHTML = `
      <div class="text-center p-8">
        <i class="fas fa-play-circle text-6xl text-white mb-4"></i>
        <h3 class="text-2xl font-bold text-white mb-2">Ready to Watch</h3>
        <p class="text-gray-300 mb-6">Click below to start learning</p>
        <button id="watch-video-btn" class="bg-purple-600 hover:bg-purple-700 text-white font-semibold py-3 px-6 rounded-lg transition-colors">
          <i class="fas fa-play mr-2"></i> Watch Video Now
        </button>
      </div>
    `;
  } else {
    videoPlayer.innerHTML = `
      <div class="text-center p-8">
        <div class="mb-6">
          <i class="fas fa-lock text-6xl text-yellow-500 mb-4"></i>
          <h3 class="text-2xl font-bold text-white mb-2">Video Locked</h3>
          <p class="text-gray-300">Purchase this course to watch the video</p>
        </div>
        <button id="purchase-video-btn" class="bg-purple-600 hover:bg-purple-700 text-white font-semibold py-3 px-6 rounded-lg transition-colors">
          <i class="fas fa-shopping-cart mr-2"></i> Purchase to Unlock
        </button>
      </div>
    `;
  }
}

// Play course video
function playCourseVideo(courseId) {
  const course = courseData.find((c) => c.id === courseId);
  if (!course) return;

  const videoContainer = document.querySelector(".bg-gray-900.aspect-video");
  if (!videoContainer) return;

  // Check if course is purchased
  const isPurchased = purchasedCourses.includes(courseId);
  if (!isPurchased) {
    showToast("Please purchase this course to watch the video", "error");
    return;
  }

  // Replace with YouTube iframe
  videoContainer.innerHTML = `
    <div class="relative w-full h-full">
      <iframe 
        src="${course.videoUrl.replace("watch?v=", "embed/")}?autoplay=1" 
        frameborder="0" 
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
        allowfullscreen
        class="absolute top-0 left-0 w-full h-full rounded-lg"
        title="${course.title} video"
      ></iframe>
    </div>
  `;

  // Save video progress
  if (!currentVideoProgress[courseId]) {
    currentVideoProgress[courseId] = {
      started: new Date().toISOString(),
      progress: 0,
    };
    
    // Save progress for current user
    if (currentUser) {
      const userProgressKey = `learnhub_video_progress_${currentUser.id}`;
      localStorage.setItem(userProgressKey, JSON.stringify(currentVideoProgress));
    }
  }
}

// Purchase course
function purchaseCourse(courseId) {
  if (!currentUser) {
    showLoginModal();
    return;
  }

  if (!isSystemOpen()) {
    showToast(
      "System is closed. Purchases are only available from 8:00 AM to 10:00 PM (EST).",
      "error",
    );
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
  const timestamp = Date.now();
  const randomNum = Math.floor(Math.random() * 10000).toString().padStart(4, "0");
  const transactionNumber = `RCP-${timestamp}-${randomNum}`;

  // Create transaction
  const transactionDate = new Date();
  const transaction = {
    id: timestamp,
    transactionNumber: transactionNumber,
    courseId: courseId,
    courseTitle: course.title,
    courseCategory: course.category,
    courseDuration: course.duration,
    courseInstructor: course.instructor,
    courseImage: course.image,
    courseModules: course.modules || 0,
    amount: course.price,
    date: transactionDate.toISOString(),
    userId: currentUser.id,
    userName: currentUser.name,
    userEmail: currentUser.email,
    status: "completed",
    paymentMethod: "Credit Card",
    paymentDetails: "•••• 4242",
  };

  // Update purchased courses
  purchasedCourses.push(courseId);
  transactions.push(transaction);

  // Save user data
  saveUserData(currentUser.id);

  // Update UI
  updatePurchaseButton(courseId, course);
  updateVideoPlayer(courseId, course);

  // Update all course cards
  updateAllCourseCards();

  // Show success message
  showToast(
    `Purchase complete! Receipt #${transaction.transactionNumber} has been saved.`,
    "success",
  );

  // Update dashboard
  updateDashboard();

  // Update dashboard views if on dashboard
  if (currentPage === "dashboard") {
    loadRecentCourses();
  }
}

// Update all course cards
function updateAllCourseCards() {
  const allCoursesGrid = document.getElementById("all-courses-grid");
  const featuredCoursesGrid = document.getElementById("featured-courses-grid");

  if (allCoursesGrid) {
    allCoursesGrid.innerHTML = allCourses
      .map((course) => createCourseCard(course))
      .join("");
  }

  if (featuredCoursesGrid) {
    const featured = courseData.filter((course) => course.featured);
    featuredCoursesGrid.innerHTML = featured
      .map((course) => createCourseCard(course))
      .join("");
  }
}

// ============================================
// Document Management
// ============================================

// Load featured documents
function loadFeaturedDocuments() {
  const featured = documentData.filter((doc) => doc.featured);
  const featuredDocumentsGrid = document.getElementById("featured-documents-grid");
  if (featuredDocumentsGrid) {
    featuredDocumentsGrid.innerHTML = featured
      .map((doc) => createDocumentCard(doc))
      .join("");
  }
}

// Load all documents
function loadAllDocuments() {
  allDocuments = [...documentData];
  const allDocumentsGrid = document.getElementById("all-documents-grid");
  if (allDocumentsGrid) {
    allDocumentsGrid.innerHTML = allDocuments
      .map((doc) => createDocumentCard(doc))
      .join("");
  }

  const documentResultsCount = document.getElementById("document-results-count");
  const documentTotalCount = document.getElementById("document-total-count");
  if (documentResultsCount && documentTotalCount) {
    documentResultsCount.textContent = allDocuments.length;
    documentTotalCount.textContent = allDocuments.length;
  }
}

// Create document card
function createDocumentCard(doc) {
  const isLoggedIn = !!currentUser;

  return `
    <div class="card">
      <div class="p-5">
        <div class="flex items-center justify-between mb-4">
          <div class="h-12 w-12 rounded-lg overflow-hidden">
            <img src="${doc.image}" alt="${doc.title}" class="w-full h-full object-cover">
          </div>
          <span class="text-xs px-3 py-1 rounded-full bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-300">${doc.category}</span>
        </div>
        
        <h3 class="mb-2 font-bold text-lg line-clamp-2">${doc.title}</h3>
        <p class="mb-4 text-sm text-gray-600 dark:text-gray-400 line-clamp-2">${doc.description}</p>
        
        <div class="flex items-center justify-between mb-5">
          <span class="text-xs text-gray-500 dark:text-gray-400">
            <i class="fas fa-external-link-alt mr-1"></i> ${doc.source}
          </span>
          ${doc.pages ? `<span class="text-xs text-gray-500 dark:text-gray-400">${doc.pages} pages</span>` : ""}
        </div>
        
        ${
          isLoggedIn
            ? `<a href="${doc.url}" target="_blank" class="btn btn-primary w-full view-document-btn text-sm py-2" data-doc-id="${doc.id}">
                <i class="fas fa-external-link-alt mr-2"></i> View Document
              </a>`
            : `<button class="btn btn-outline w-full login-to-read-btn text-sm py-2" data-doc-id="${doc.id}">
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
    <button class="btn border border-gray-300 dark:border-gray-600 px-3 py-1.5 rounded-lg bg-purple-600 text-white text-sm" data-category="all">All</button>
    ${uniqueCategories
      .map(
        (category) =>
          `<button class="btn border border-gray-300 dark:border-gray-600 px-3 py-1.5 rounded-lg bg-transparent text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 text-sm" data-category="${category}">${category}</button>`,
      )
      .join("")}
  `;

  documentCategoriesFilter.innerHTML = categoriesHtml;

  // Add event listeners to category buttons
  documentCategoriesFilter.querySelectorAll("button").forEach((button) => {
    button.addEventListener("click", (e) => {
      const category = e.target.dataset.category;
      filterDocumentsByCategory(category);

      // Update active state
      document.querySelectorAll("#document-categories-filter button").forEach((b) => {
        b.classList.remove("bg-purple-600", "text-white");
        b.classList.add("bg-transparent", "text-gray-700", "border-gray-300");
      });
      e.target.classList.add("bg-purple-600", "text-white");
      e.target.classList.remove("bg-transparent", "text-gray-700", "border-gray-300");
    });
  });
}

// Filter documents by category
function filterDocumentsByCategory(category) {
  const allDocumentsGrid = document.getElementById("all-documents-grid");
  const documentResultsCount = document.getElementById("document-results-count");

  if (category === "all") {
    if (allDocumentsGrid) {
      allDocumentsGrid.innerHTML = allDocuments
        .map((doc) => createDocumentCard(doc))
        .join("");
    }
    if (documentResultsCount) {
      documentResultsCount.textContent = allDocuments.length;
    }
  } else {
    const filtered = allDocuments.filter((doc) => doc.category === category);
    if (allDocumentsGrid) {
      allDocumentsGrid.innerHTML = filtered
        .map((doc) => createDocumentCard(doc))
        .join("");
    }
    if (documentResultsCount) {
      documentResultsCount.textContent = filtered.length;
    }
  }
}

// Filter documents by search
function filterDocuments() {
  const searchTerm = document.getElementById("document-search").value.toLowerCase();
  const filtered = allDocuments.filter(
    (doc) =>
      doc.title.toLowerCase().includes(searchTerm) ||
      doc.description.toLowerCase().includes(searchTerm) ||
      doc.category.toLowerCase().includes(searchTerm) ||
      doc.source.toLowerCase().includes(searchTerm),
  );

  const allDocumentsGrid = document.getElementById("all-documents-grid");
  const documentResultsCount = document.getElementById("document-results-count");

  if (allDocumentsGrid) {
    allDocumentsGrid.innerHTML = filtered
      .map((doc) => createDocumentCard(doc))
      .join("");
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
      loginNotice.classList.remove("hidden");
    } else {
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

// ============================================
// Auth Functions
// ============================================

// Update auth UI
function updateAuthUI() {
  const guestButtons = document.getElementById("guest-buttons");
  const userMenu = document.getElementById("user-menu");

  // Mobile elements
  const mobileGuestButtons = document.getElementById("mobile-guest-buttons");
  const mobileUserMenu = document.getElementById("mobile-user-menu");
  const mobileUserName = document.getElementById("mobile-user-name");
  const mobileUserEmail = document.getElementById("mobile-user-email");

  if (currentUser) {
    // User IS logged in
    // Desktop
    if (guestButtons) {
      guestButtons.style.display = "none";
    }

    if (userMenu) {
      userMenu.style.display = "flex";
    }

    // Mobile
    if (mobileGuestButtons) {
      mobileGuestButtons.style.display = "none";
    }

    if (mobileUserMenu) {
      mobileUserMenu.style.display = "flex";

      // Update mobile user info
      if (mobileUserName) {
        mobileUserName.textContent = currentUser.name;
      }
      if (mobileUserEmail) {
        mobileUserEmail.textContent = currentUser.email;
      }
    }
  } else {
    // User is NOT logged in
    // Desktop
    if (guestButtons) {
      guestButtons.style.display = "flex";
    }

    if (userMenu) {
      userMenu.style.display = "none";
    }

    // Mobile
    if (mobileGuestButtons) {
      mobileGuestButtons.style.display = "flex";
    }

    if (mobileUserMenu) {
      mobileUserMenu.style.display = "none";
    }
  }

  // Update course cards based on purchase status
  updateAllCourseCards();
}

// Login handler
function handleLogin(e) {
  e.preventDefault();
  const email = document.getElementById("login-email").value;
  const password = document.getElementById("login-password").value;

  if (!email || !password) {
    showToast("Please fill in all fields", "error");
    return;
  }

  // Check if user exists in localStorage
  const existingUsers = JSON.parse(localStorage.getItem("learnhub_users") || "[]");
  const existingUser = existingUsers.find((user) => user.email === email);

  if (existingUser && existingUser.password === password) {
    // User exists, log them in
    const user = {
      id: existingUser.id,
      name: existingUser.name,
      email: existingUser.email,
      createdAt: existingUser.createdAt,
    };

    currentUser = user;
    localStorage.setItem("learnhub_user", JSON.stringify(user));

    // Load user-specific data
    loadUserData(user.id);

    updateAuthUI();
    closeLoginModal();

    const loginForm = document.getElementById("login-form");
    if (loginForm) {
      loginForm.reset();
    }

    // Refresh documents
    loadAllDocuments();
    loadFeaturedDocuments();

    showToast("Login successful! Welcome back.", "success");

    // Close mobile menu
    closeMobileMenu();

    // Update dashboard if on dashboard page
    if (currentPage.includes("dashboard")) {
      updateDashboard();
    }

    // Redirect to home if not on dashboard
    if (window.location.hash !== "#dashboard") {
      window.location.hash = "home";
    }
  } else {
    showToast("Invalid email or password", "error");
  }
}

// Register handler
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

  // Check if user already exists
  const existingUsers = JSON.parse(localStorage.getItem("learnhub_users") || "[]");
  if (existingUsers.some((user) => user.email === email)) {
    showToast("Email already registered. Please login instead.", "error");
    return;
  }

  // Create new user
  const user = {
    id: Date.now(),
    name: name,
    email: email,
    password: password,
    createdAt: new Date().toISOString(),
  };

  // Save to users list
  existingUsers.push(user);
  localStorage.setItem("learnhub_users", JSON.stringify(existingUsers));

  // Set as current user
  currentUser = {
    id: user.id,
    name: user.name,
    email: user.email,
    createdAt: user.createdAt,
  };

  localStorage.setItem("learnhub_user", JSON.stringify(currentUser));

  // Initialize empty arrays for new user
  purchasedCourses = [];
  transactions = [];
  currentVideoProgress = {};

  // Save initial user data
  saveUserData(currentUser.id);

  updateAuthUI();
  closeRegisterModal();

  const registerForm = document.getElementById("register-form");
  if (registerForm) {
    registerForm.reset();
  }

  // Refresh documents
  loadAllDocuments();
  loadFeaturedDocuments();

  showToast("Registration successful! Welcome to LearnHub.", "success");

  // Close mobile menu
  closeMobileMenu();

  // Redirect to dashboard
  window.location.hash = "dashboard";
}

// Logout
function logout() {
  // Save data before logout
  if (currentUser) {
    saveUserData(currentUser.id);
  }

  currentUser = null;
  purchasedCourses = [];
  transactions = [];
  currentVideoProgress = {};

  // Clear current user session
  localStorage.removeItem("learnhub_user");

  // Update UI
  updateAuthUI();

  // Close mobile menu
  closeMobileMenu();

  // Refresh documents
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

// ============================================
// Modal Functions
// ============================================

// Show login modal
function showLoginModal() {
  // Create modal if it doesn't exist
  let modal = document.getElementById("login-modal");
  if (!modal) {
    createLoginModal();
    modal = document.getElementById("login-modal");
  }

  if (modal) {
    modal.classList.remove("hidden");
    modal.classList.add("flex");
    document.body.style.overflow = "hidden";
  }
}

// Create login modal
function createLoginModal() {
  const modalHTML = `
    <div id="login-modal" class="hidden fixed inset-0 bg-black bg-opacity-50 z-50 items-center justify-center p-4">
      <div class="bg-white dark:bg-gray-800 rounded-xl shadow-2xl max-w-md w-full max-h-[90vh] overflow-auto">
        <div class="p-6">
          <div class="flex justify-between items-center mb-6">
            <h2 class="text-2xl font-bold text-gray-800 dark:text-white">Login to LearnHub</h2>
            <button onclick="closeLoginModal()" class="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors">
              <i class="fas fa-times text-gray-600 dark:text-gray-300"></i>
            </button>
          </div>
          
          <form id="login-form" class="space-y-4">
            <div>
              <label class="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300">Email</label>
              <input type="email" id="login-email" class="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent" placeholder="name@example.com" required>
            </div>
            <div>
              <label class="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300">Password</label>
              <div class="relative">
                <input type="password" id="login-password" class="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent pr-10" placeholder="Enter your password" required>
                <button type="button" class="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300" id="toggle-login-password">
                  <i class="fas fa-eye"></i>
                </button>
              </div>
            </div>
            <button type="submit" class="btn btn-primary w-full py-2.5">
              <i class="fas fa-sign-in-alt mr-2"></i> Login
            </button>
          </form>
          
          <p class="mt-4 text-center text-sm text-gray-600 dark:text-gray-400">
            Don't have an account? <button onclick="closeLoginModal(); showRegisterModal();" class="text-purple-600 dark:text-purple-400 hover:underline font-medium">Register here</button>
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
      togglePasswordBtn.innerHTML =
        type === "password"
          ? '<i class="fas fa-eye"></i>'
          : '<i class="fas fa-eye-slash"></i>';
    });
  }
}

// Close login modal
function closeLoginModal() {
  const modal = document.getElementById("login-modal");
  if (modal) {
    modal.classList.add("hidden");
    modal.classList.remove("flex");
    document.body.style.overflow = "auto";
  }
}

// Show register modal
function showRegisterModal() {
  // Create modal if it doesn't exist
  let modal = document.getElementById("register-modal");
  if (!modal) {
    createRegisterModal();
    modal = document.getElementById("register-modal");
  }

  if (modal) {
    modal.classList.remove("hidden");
    modal.classList.add("flex");
    document.body.style.overflow = "hidden";
  }
}

// Create register modal
function createRegisterModal() {
  const modalHTML = `
    <div id="register-modal" class="hidden fixed inset-0 bg-black bg-opacity-50 z-50 items-center justify-center p-4">
      <div class="bg-white dark:bg-gray-800 rounded-xl shadow-2xl max-w-md w-full max-h-[90vh] overflow-auto">
        <div class="p-6">
          <div class="flex justify-between items-center mb-6">
            <h2 class="text-2xl font-bold text-gray-800 dark:text-white">Create Account</h2>
            <button onclick="closeRegisterModal()" class="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors">
              <i class="fas fa-times text-gray-600 dark:text-gray-300"></i>
            </button>
          </div>
          
          <form id="register-form" class="space-y-4">
            <div>
              <label class="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300">Full Name</label>
              <input type="text" id="register-name" class="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent" placeholder="John Doe" required>
            </div>
            <div>
              <label class="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300">Email</label>
              <input type="email" id="register-email" class="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent" placeholder="name@example.com" required>
            </div>
            <div>
              <label class="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300">Password</label>
              <div class="relative">
                <input type="password" id="register-password" class="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent pr-10" placeholder="Create a password" required>
                <button type="button" class="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300" id="toggle-register-password">
                  <i class="fas fa-eye"></i>
                </button>
              </div>
            </div>
            <div>
              <label class="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300">Confirm Password</label>
              <input type="password" id="register-confirm-password" class="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent" placeholder="Confirm your password" required>
            </div>
            <button type="submit" class="btn btn-primary w-full py-2.5">
              <i class="fas fa-user-plus mr-2"></i> Create Account
            </button>
          </form>
          
          <p class="mt-4 text-center text-sm text-gray-600 dark:text-gray-400">
            Already have an account? <button onclick="closeRegisterModal(); showLoginModal();" class="text-purple-600 dark:text-purple-400 hover:underline font-medium">Login here</button>
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
      togglePasswordBtn.innerHTML =
        type === "password"
          ? '<i class="fas fa-eye"></i>'
          : '<i class="fas fa-eye-slash"></i>';
    });
  }
}

// Close register modal
function closeRegisterModal() {
  const modal = document.getElementById("register-modal");
  if (modal) {
    modal.classList.add("hidden");
    modal.classList.remove("flex");
    document.body.style.overflow = "auto";
  }
}

// ============================================
// System & Utility Functions
// ============================================

// Update system status card
function updateSystemStatusCard() {
  const systemStatusCard = document.getElementById("system-status-card");
  if (!systemStatusCard) return;

  const isOpen = isSystemOpen();

  if (isOpen) {
    systemStatusCard.innerHTML = `
      <div class="flex items-center">
        <div class="mr-3">
          <i class="fas fa-check-circle text-green-500 text-lg"></i>
        </div>
        <div>
          <h4 class="font-bold text-green-600 dark:text-green-400">System Open</h4>
          <p class="text-sm text-gray-600 dark:text-gray-400">Purchases are now available</p>
        </div>
      </div>
    `;
  } else {
    systemStatusCard.innerHTML = `
      <div class="flex items-center">
        <div class="mr-3">
          <i class="fas fa-times-circle text-red-500 text-lg"></i>
        </div>
        <div>
          <h4 class="font-bold text-red-600 dark:text-red-400">System Closed</h4>
          <p class="text-sm text-gray-600 dark:text-gray-400">Purchases unavailable</p>
        </div>
      </div>
    `;
  }
}

// Check if system is open (8 AM to 10 PM)
function isSystemOpen() {
  const now = new Date();
  const hour = now.getHours();
  return hour >= 8 && hour < 22;
}

// ============================================
// Mobile Menu Functions
// ============================================

// Toggle mobile menu
function toggleMobileMenu() {
  if (mobileMenu && mobileMenuBtn) {
    mobileMenu.classList.toggle("hidden");
    const icon = mobileMenuBtn.querySelector("i");
    if (mobileMenu.classList.contains("hidden")) {
      icon.className = "fas fa-bars text-sm";
    } else {
      icon.className = "fas fa-times text-sm";
    }
  }
}

// Close mobile menu
function closeMobileMenu() {
  if (mobileMenu && mobileMenuBtn) {
    mobileMenu.classList.add("hidden");
    const icon = mobileMenuBtn.querySelector("i");
    if (icon) {
      icon.className = "fas fa-bars text-sm";
    }
  }
}

// ============================================
// Theme Functions
// ============================================

// Setup theme
function setupTheme() {
  const savedTheme = localStorage.getItem("theme");
  if (savedTheme === "dark") {
    document.documentElement.classList.add("dark");
    updateThemeIcon(true);
  } else {
    document.documentElement.classList.remove("dark");
    localStorage.setItem("theme", "light");
  }
}

// Toggle theme
function toggleTheme() {
  const isDark = document.documentElement.classList.toggle("dark");
  localStorage.setItem("theme", isDark ? "dark" : "light");
  updateThemeIcon(isDark);
}

// Update theme icon
function updateThemeIcon(isDark) {
  const icon = document.querySelector("#theme-toggle i");
  if (icon) {
    if (isDark) {
      icon.className = "fas fa-moon text-yellow-300";
    } else {
      icon.className = "fas fa-sun text-yellow-500";
    }
  }
}

// ============================================
// Contact Form
// ============================================

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

  showToast(
    "Message sent successfully! We'll get back to you soon.",
    "success",
  );

  // Hide success message after 5 seconds
  setTimeout(() => {
    if (contactSuccess) {
      contactSuccess.classList.add("hidden");
    }
  }, 5000);
}

// ============================================
// Toast Notification
// ============================================

// Show toast notification
function showToast(message, type = "success") {
  // Remove existing toasts
  document.querySelectorAll(".toast").forEach((toast) => toast.remove());

  const icon =
    type === "success"
      ? "fa-check-circle"
      : type === "error"
        ? "fa-exclamation-circle"
        : "fa-info-circle";
  const bgColor =
    type === "success"
      ? "bg-green-500"
      : type === "error"
        ? "bg-red-500"
        : "bg-blue-500";

  const toast = document.createElement("div");
  toast.className = `toast fixed bottom-4 right-4 ${bgColor} text-white px-4 py-3 rounded-lg shadow-lg flex items-center gap-3 z-50 animate-slide-up`;
  toast.innerHTML = `
    <i class="fas ${icon}"></i>
    <div class="flex-1">
      <p class="text-sm font-medium">${message}</p>
    </div>
    <button class="text-white hover:text-gray-200" onclick="this.parentElement.remove()">
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

// ============================================
// Initialize Application
// ============================================

// Initialize the application
document.addEventListener("DOMContentLoaded", init);

// Update system status every minute
setInterval(updateSystemStatusCard, 60000);

// Add CSS animation for toast
const style = document.createElement("style");
style.textContent = `
  @keyframes slide-up {
    from {
      transform: translateY(100%);
      opacity: 0;
    }
    to {
      transform: translateY(0);
      opacity: 1;
    }
  }
  
  .animate-slide-up {
    animation: slide-up 0.3s ease-out;
  }
`;
document.head.appendChild(style);