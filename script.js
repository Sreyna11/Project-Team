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

// Course Data
const courseData = [
  {
    id: 1,
    title: "Frontend Web Development",
    category: "Web Development",
    price: 29.99,
    description: "Complete frontend web development tutorial covering HTML, CSS, and JavaScript.",
    duration: "24h 14m",
    featured: true,
    image: "Images/Frontend-Development.png",
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
    description: "Build powerful backend systems with Node.js, Express, and MongoDB.",
    duration: "2h 26m",
    featured: true,
    image: "Images/Backend-Web.png",
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
    description: "Complete full stack web development course covering both frontend and backend.",
    duration: "7h 29m",
    featured: true,
    image: "Images/full-stack.png",
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
    description: "Learn Python programming from basics to advanced concepts.",
    duration: "12h",
    featured: true,
    image: "Images/python.png",
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
    description: "Master JavaScript from fundamentals to advanced concepts.",
    duration: "22h 15m",
    featured: false,
    image: "Images/JS.png",
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
    description: "Complete Java programming tutorial covering core concepts and OOP.",
    duration: "12h",
    featured: false,
    image: "Images/java.png",
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
    description: "Learn C++ programming fundamentals and memory management.",
    duration: "6h",
    featured: false,
    image: "Images/c++.png",
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
    description: "Master Swift programming language for iOS app development.",
    duration: "7h 05m",
    featured: false,
    image: "Images/swift.png",
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
    description: "Build cross-platform mobile applications with React Native.",
    duration: "2h 06m",
    featured: true,
    image: "Images/react-native.png",
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
    description: "Create beautiful native mobile applications with Flutter.",
    duration: "36h 39m",
    featured: false,
    image: "Images/flutter.png",
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
    description: "Learn modern Android app development with Kotlin.",
    duration: "60h 50m",
    featured: false,
    image: "Images/kotlin.png",
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
    description: "Master essential data structures and algorithms for coding interviews.",
    duration: "4h",
    featured: true,
    image: "Images/dsa.png",
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
    description: "Complete guide to computer networking concepts and protocols.",
    duration: "9h 24m",
    featured: false,
    image: "Images/computer-network.png",
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
    description: "Learn database design, SQL, and NoSQL concepts.",
    duration: "17h 07m",
    featured: false,
    image: "Images/dbms.png",
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
    description: "Master user-centered design principles and prototyping.",
    duration: "1h 26m",
    featured: true,
    image: "Images/ux-ui.png",
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

// Document Data
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
    pages: 45,
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
    pages: null,
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
    pages: null,
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
    pages: null,
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
    pages: null,
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
    pages: null,
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
    pages: null,
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
    pages: null,
  },
  {
    id: 9,
    title: "Git & GitHub Guide",
    category: "Web Development",
    description: "Complete guide to version control with Git and collaboration on GitHub.",
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
    description: "Comprehensive Linux command line tutorial for beginners and advanced users.",
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
    description: "Complete Docker documentation for containerization and deployment.",
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
    description: "Best practices for designing RESTful APIs with examples and patterns.",
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
    description: "Comprehensive guide to data structures with implementations in multiple languages.",
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
    description: "Algorithm design and analysis with complexity explanations and examples.",
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
    description: "Introduction to computer networking concepts, protocols, and architecture.",
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
    description: "Principles of database design, normalization, and SQL optimization.",
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
    description: "User interface design principles, patterns, and best practices.",
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
    description: "Mobile app design patterns and guidelines for iOS and Android.",
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
    description: "DevOps principles, practices, and tools for continuous integration.",
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

// ============================================
// Modules Data - First module FREE, others LOCKED
// ============================================

const courseModulesData = {
  1: [ // Frontend Web Development
    {
      id: 1,
      title: "Introduction to Frontend development - FREE PREVIEW",
      duration: "8 min",
      isFree: true,
      videoUrl: "https://www.youtube.com/watch?v=WG5ikvJ2TKA&t=10s&pp=ygUWaW50cm9kdWN0aW9uIGZyb250IGVuZA%3D%3D",
      description: "Get an overview of frontend development and what you'll learn in this course"
    },
    {
      id: 2,
      title: "HTML Fundamentals",
      duration: "1h 9min",
      isFree: false,
      videoUrl: "https://youtu.be/qz0aGYrrlhU",
      description: "Learn the fundamentals of HTML5 and semantic markup"
    },
    {
      id: 3,
      title: "CSS3 Fundamentals",
      duration: "1h",
      isFree: false,
      videoUrl: "https://www.youtube.com/watch?v=wRNinF7YQqQ&pp=ygUQY3NzMyBmdWxsIGNvdXJzZQ%3D%3D",
      description: "Master CSS selectors, properties, and styling techniques"
    },
    {
      id: 4,
      title: "Flexbox and Grid Layouts",
      duration: "18mn",
      isFree: false,
      videoUrl: "https://www.youtube.com/watch?v=3elGSZSWTbM&pp=ygUXZmxleGJveCBhbmQgZ3JpZCBsYXlvdXQ%3D",
      description: "Create modern responsive layouts with Flexbox and Grid"
    },
    {
      id: 5,
      title: "Master CSS Animation Property",
      duration: "8mn",
      isFree: false,
      videoUrl: "https://www.youtube.com/watch?v=Bhj4miRkSOc&pp=ygUNYW5pbWF0aW9uIGNzcw%3D%3D",
      description: "Learn to create engaging animations and transitions with CSS"
    },
    {
      id: 6,
      title: "JavaScript Basics",
      duration: "18h 37mn",
      isFree: false,
      videoUrl: "https://www.youtube.com/watch?v=EerdGm-ehJQ&t=13086s&pp=ygUWamF2YXNjcmlwdCBmdWxsIGNvdXJzZQ%3D%3D",
      description: "Variables, data types, and basic programming concepts in JavaScript"
    },
    {
      id: 7,
      title: "DOM Manipulation",
      duration: "2h 41mn",
      isFree: false,
      videoUrl: "https://www.youtube.com/watch?v=5fb2aPlgoys&pp=ygUeZG9tIG1hbmlwdWxhdGlvbiBpbiBqYXZhc2NyaXB0",
      description: "Interact with web pages using JavaScript DOM methods"
    },
    {
      id: 8,
      title: "Bootstrap CSS Framework",
      duration: "2h 46mn",
      isFree: false,
      videoUrl: "https://www.youtube.com/watch?v=-qfEOE4vtxE&t=54s&pp=ygUgYm9vdHN0cmFwIHR1dG9yaWFsIGZvciBiZWdpbm5lcnM%3D",
      description: "Build responsive websites quickly with the Bootstrap framework"
    },
    {
      id: 9,
      title: "Tailwind CSS Framework",
      duration: "54mn",
      isFree: false,
      videoUrl: "https://www.youtube.com/watch?v=6biMWgD6_JY&pp=ygUVdGFpbHdpbmQgY3NzIHR1dG9yaWFs",
      description: "Master utility-first CSS with Tailwind framework"
    },
    {
      id: 10,
      title: "Project for Front end Course",
      duration: "1h 14mn",
      isFree: false,
      videoUrl: "https://www.youtube.com/watch?v=MYFgtnKMDp4&pp=ygUvcHJvamVjdCBmcm9udCBlbmQgZGV2ZWxvcGVyIGh0bWwgY3NzIGphdmFzY3JpcHQ%3D",
      description: "Apply everything you've learned in a real frontend project"
    },
  ],
  2: [ // Backend Development with Node.js
    {
      id: 1,
      title: "Introduction to Backend Development - FREE PREVIEW",
      duration: "4 min",
      isFree: true,
      videoUrl: "https://www.youtube.com/watch?v=4r6WdaY3SOA&pp=ygUnaW50cm9kdWN0aW9uIHRvIGJhY2tlbmQgd2ViIGRldmVsb3BtZW50",
      description: "Understand backend development concepts and server-side programming"
    },
    {
      id: 2,
      title: "Node.js",
      duration: "6h 50min",
      isFree: false,
      videoUrl: "https://www.youtube.com/watch?v=f2EqECiTBL8&pp=ygUTbm9kZSBqcyBmdWxsIGNvdXJzZQ%3D%3D",
      description: "Get started with Node.js and npm for server-side JavaScript"
    },
    {
      id: 3,
      title: "Express.js Framework",
      duration: "3h 57min",
      isFree: false,
      videoUrl: "https://www.youtube.com/watch?v=fBzm9zja2Y8&pp=ygUWZXhwcmVzcyBqcyBmdWxsIGNvdXJzZQ%3D%3D",
      description: "Build web applications with Express.js framework"
    },
    {
      id: 4,
      title: "SQL Database",
      duration: "4h 19min",
      isFree: false,
      videoUrl: "https://www.youtube.com/watch?v=qw--VYLpxG4&pp=ygUKcG9zdGdyZXNxbA%3D%3D",
      description: "Learn SQL databases, queries, and relational database management"
    },
    {
      id: 5,
      title: "No-SQL Database",
      duration: "7h 50min",
      isFree: false,
      videoUrl: "https://www.youtube.com/watch?v=8eJJe4Slnik&pp=ygUTbW9uZ29kYiBmdWxsIGNvdXJzZQ%3D%3D",
      description: "Master NoSQL databases with MongoDB and document-based data storage"
    },
    {
      id: 6,
      title: "Rest API",
      duration: "51min",
      isFree: false,
      videoUrl: "https://www.youtube.com/watch?v=qbLc5a9jdXo&pp=ygULcmVzdGZ1bCBhcGnSBwkJhwoBhyohjO8%3D",
      description: "Create RESTful APIs with proper routing and middleware"
    },
    {
      id: 7,
      title: "Backend Project",
      duration: "7min",
      isFree: false,
      videoUrl: "https://www.youtube.com/watch?v=RQcsksmMYTE&pp=ygUeYmFja2VuZCBwcm9qZWN0cyBmb3IgYmVnaW5uZXJz",
      description: "Build a complete backend project applying all learned concepts"
    }
  ],
  3: [ // Full Stack Web Development
    {
      id: 1,
      title: "Course Overview - FREE PREVIEW",
      duration: "7 min",
      isFree: true,
      videoUrl: "https://www.youtube.com/watch?v=8KaJRw-rfn8&pp=ygUXZnVsbCBzdGFjayBpbnRyb2R1Y3Rpb24%3D",
      description: "Introduction to full stack development and course roadmap"
    },
    {
      id: 2,
      title: "Frontend Full Course",
      duration: "21h 14min",
      isFree: false,
      videoUrl: "https://www.youtube.com/watch?v=zJSY8tbf_ys&pp=ygUUZnJvbnRlbmQgZnVsbCBjb3Vyc2XSBwkJhwoBhyohjO8%3D",
      description: "Complete frontend development with modern frameworks and tools"
    },
    {
      id: 3,
      title: "Backend with Node.js",
      duration: "5h 17min",
      isFree: false,
      videoUrl: "https://www.youtube.com/watch?v=9BD9eK9VqXA&pp=ygUjYmFja2VuZCB3ZWIgZGV2ZWxvcG1lbnQgZnVsbCBjb3Vyc2U%3D",
      description: "Build the backend API with Node.js and Express"
    }
  ],
  4: [ // Python Programming
    {
      id: 1,
      title: "Introduction - FREE PREVIEW",
      duration: "2min",
      isFree: true,
      videoUrl: "https://www.youtube.com/watch?v=xkZMUX_oQX4&pp=ygUTcHl0aG9uIGludHJvZHVjdGlvbg%3D%3D",
      description: "Learn Python syntax and basic concepts"
    },
    {
      id: 2,
      title: "Python Fundamental",
      duration: "10min",
      isFree: false,
      videoUrl: "https://www.youtube.com/watch?v=fWjsdhR3z3c&pp=ygUTcHl0aG9uIGZ1bmRhbWVudGFsc9IHCQmHCgGHKiGM7w%3D%3D",
      description: "Master Python fundamentals including data types and operations"
    },
    {
      id: 3,
      title: "Python Variables",
      duration: "13mn",
      isFree: false,
      videoUrl: "https://www.youtube.com/watch?v=LKFrQXaoSMQ&pp=ygUZcHl0aG9uIHZhcmlhYmxlcyB0dXRvcmlhbA%3D%3D",
      description: "Understand variables, data types, and naming conventions in Python"
    },
    {
      id: 4,
      title: "Python Control Flow",
      duration: "16mn",
      isFree: false,
      videoUrl: "https://www.youtube.com/watch?v=Zp5MuPOtsSY&pp=ygUTcHl0aG9uIGNvbnRyb2wgZmxvdw%3D%3D",
      description: "Learn conditional statements and loops in Python"
    },
    {
      id: 5,
      title: "Python Data Structure & Functions",
      duration: "30mn",
      isFree: false,
      videoUrl: "https://www.youtube.com/watch?v=u-OmVr_fT4s&pp=ygUPcHl0aG9uIGZ1bmN0aW9u",
      description: "Explore lists, tuples, dictionaries, sets and function creation"
    },
    {
      id: 6,
      title: "Python Object-Oriented-Programming",
      duration: "2h 05min",
      isFree: false,
      videoUrl: "https://www.youtube.com/watch?v=IbMDCwVm63M&pp=ygULcHl0aG9uIG9vcCA%3D",
      description: "Master classes, objects, inheritance, and OOP principles in Python"
    },
    {
      id: 7,
      title: "Python Projects",
      duration: "53min",
      isFree: false,
      videoUrl: "https://www.youtube.com/watch?v=yVl_G-F7m8c&pp=ygUOcHl0aG9uIHByb2plY3Q%3D",
      description: "Build practical Python projects to apply your skills"
    }
  ],
  5: [ // JavaScript Programming
    {
      id: 1,
      title: "Introduction - FREE PREVIEW",
      duration: "2min",
      isFree: true,
      videoUrl: "https://youtu.be/zofMnllkVfI",
      description: "Get started with JavaScript and its role in web development"
    },
    {
      id: 2,
      title: "JavaScript Fundamental",
      duration: "12min",
      isFree: false,
      videoUrl: "https://youtu.be/Ihy0QziLDf0?list=PLZPZq0r_RZOO1zkgO4bIdfuLpizCeHYKv",
      description: "Learn JavaScript basics including variables, data types, and operators"
    },
    {
      id: 3,
      title: "JavaScript Control Flow & Loop",
      duration: "16min",
      isFree: false,
      videoUrl: "https://www.youtube.com/watch?v=Wc1rH4uNKIE&pp=ygUXamF2YXNjcmlwdCBjb250cm9sIGZsb3c%3D",
      description: "Master conditional statements and loops in JavaScript"
    },
    {
      id: 4,
      title: "JavaScript Function & Scope",
      duration: "12min",
      isFree: false,
      videoUrl: "https://www.youtube.com/watch?v=HFaxylC7bUc&pp=ygUUamF2YXNjcmlwdCBmdW5jdGlvbnM%3D",
      description: "Understand functions, scope, and closures in JavaScript"
    },
    {
      id: 5,
      title: "JavaScript Array & Object",
      duration: "51min",
      isFree: false,
      videoUrl: "https://www.youtube.com/watch?v=RVxuGCWZ_8E&pp=ygUXamF2YXNjcmlwdCBhcnJheSBvYmplY3Q%3D",
      description: "Work with arrays and objects for data manipulation"
    },
    {
      id: 6,
      title: "Advanced JavaScript",
      duration: "1h 04min",
      isFree: false,
      videoUrl: "https://www.youtube.com/watch?v=R9I85RhI7Cg&pp=ygUfYWR2YW5jZWQgamF2YXNjcmlwdCBmdWxsIGNvdXJzZQ%3D%3D",
      description: "Explore advanced concepts like promises, async/await, and ES6+ features"
    },
  ],
  6: [ // Java Programming
    {
      id: 1,
      title: "Introduction - FREE PREVIEW",
      duration: "6min",
      isFree: true,
      videoUrl: "https://www.youtube.com/watch?v=mG4NLNZ37y4&pp=ygURamF2YSBpbnRyb2R1Y3Rpb24%3D",
      description: "Introduction to Java programming language and its ecosystem"
    },
    {
      id: 2,
      title: "Java Basic",
      duration: "12min",
      isFree: false,
      videoUrl: "https://www.youtube.com/watch?v=so1iUWaLmKA&pp=ygUNamF2YSB2YXJpYWJsZQ%3D%3D",
      description: "Learn Java basics including variables, data types, and syntax"
    },
    {
      id: 3,
      title: "Java Control Flow",
      duration: "16min",
      isFree: false,
      videoUrl: "https://www.youtube.com/watch?v=LQsyrHJzNwA&pp=ygUcamF2YSBjb250cm9sIGZsb3cgc3RhdGVtZW50cw%3D%3D",
      description: "Master control flow statements in Java"
    },
    {
      id: 4,
      title: "Java Method & Array",
      duration: "9min",
      isFree: false,
      videoUrl: "https://www.youtube.com/watch?v=r0SewFmbCUI&pp=ygUXamF2YSBtZXRob2RzIGFuZCBhcnJheXM%3D",
      description: "Work with methods and arrays in Java"
    },
    {
      id: 5,
      title: "Java OOP",
      duration: "1h 7min",
      isFree: false,
      videoUrl: "https://www.youtube.com/watch?v=Af3s3KsxStY&pp=ygUIamF2YSBvb3A%3D",
      description: "Master Object-Oriented Programming concepts in Java"
    },
    {
      id: 6,
      title: "Java Exception Handling",
      duration: "1h 7min",
      isFree: false,
      videoUrl: "https://www.youtube.com/watch?v=1XAfapkBQjk&pp=ygUXamF2YSBleGNlcHRpb24gaGFuZGxpbmc%3D",
      description: "Learn to handle exceptions and errors in Java"
    },
    {
      id: 7,
      title: "Java Collections",
      duration: "32min",
      isFree: false,
      videoUrl: "https://www.youtube.com/watch?v=rH0winlka8A&pp=ygUlamF2YSBjb2xsZWN0aW9uIGZyYW1ld29yayBmdWxsIGNvdXJzZQ%3D%3D",
      description: "Master Java Collections Framework for data management"
    },
    {
      id: 8,
      title: "Java File I/O",
      duration: "8min",
      isFree: false,
      videoUrl: "https://www.youtube.com/watch?v=ScUJx4aWRi0&pp=ygUMamF2YSBmaWxlIGlv",
      description: "Learn file input/output operations in Java"
    },
    {
      id: 9,
      title: "Java GUI & DB Connectivity (JDBC)",
      duration: "20min",
      isFree: false,
      videoUrl: "https://www.youtube.com/watch?v=7v2OnUti2eM&t=932s&pp=ygUSamF2YSBndWkgd2l0aCBqZGJj",
      description: "Create GUI applications and connect to databases using JDBC"
    },
  ],
  7: [ // C++ Programming
    {
      id: 1,
      title: "Introduction - FREE PREVIEW",
      duration: "5min",
      isFree: true,
      videoUrl: "https://www.youtube.com/watch?v=jcYaWFhV8oY&pp=ygUQYysrIGludHJvZHVjdGlvbg%3D%3D",
      description: "Introduction to C++ programming language and its applications"
    },
    {
      id: 2,
      title: "C++ Variables & Data Types",
      duration: "19min",
      isFree: false,
      videoUrl: "https://www.youtube.com/watch?v=zgutFVxOlTY&pp=ygUcYysrIHZhcmlhYmxlcyBhbmQgZGF0YSB0eXBlcw%3D%3D",
      description: "Learn variables, data types, and type modifiers in C++"
    },
    {
      id: 3,
      title: "C++ Control Flow",
      duration: "16min",
      isFree: false,
      videoUrl: "https://www.youtube.com/watch?v=jNl5gJ_xSNQ&pp=ygUbYysrIGNvbnRyb2wgZmxvdyBzdGF0ZW1lbnRz",
      description: "Master control flow statements in C++"
    },
    {
      id: 4,
      title: "C++ Functions & Array",
      duration: "26min",
      isFree: false,
      videoUrl: "https://www.youtube.com/watch?v=C83tPpvxIJA&pp=ygUMYysrIGZ1bmN0aW9u",
      description: "Work with functions and arrays in C++"
    },
    {
      id: 5,
      title: "Pointers & Memory Management",
      duration: "15min",
      isFree: false,
      videoUrl: "https://www.youtube.com/watch?v=rtgwvkaYt1A&pp=ygUMYysrIHBvaW50ZXJz",
      description: "Understand pointers and memory management in C++"
    },
    {
      id: 6,
      title: "C++ OOP",
      duration: "1h 30min",
      isFree: false,
      videoUrl: "https://www.youtube.com/watch?v=wN0x9eZLix4&t=32s&pp=ygUHYysrIG9vcA%3D%3D",
      description: "Master Object-Oriented Programming concepts in C++"
    },
  ],
  8:[ // Swift Programming
    {
      id: 1,
      title: "Introduction-FREE PREVIEW",
      duration: "2min",
      isFree: true,
      videoUrl: "https://www.youtube.com/watch?v=nAchMctX4YA&pp=ygUSc3dpZnQgaW50cm9kdWN0aW9u",
      description: "Introduction to Swift programming language for iOS development"
    },
    {
      id: 2,
      title: "Swift Basic",
      duration: "18min",
      isFree: false,
      videoUrl: "https://www.youtube.com/watch?v=xfvdxQJj7Vw&list=PLwvDm4VfkdpiLvzZFJI6rVIBtdolrJBVB&index=2&pp=iAQB",
      description: "Learn Swift basics including syntax and fundamental concepts"
    },
    {
      id: 3,
      title: "How to use basic types in swift",
      duration: "16min",
      isFree: false,
      videoUrl: "https://youtu.be/JeoaCW9fO0w?list=PLwvDm4VfkdpiLvzZFJI6rVIBtdolrJBVB",
      description: "Master basic data types and type safety in Swift"
    },
    {
      id: 4,
      title: "How to use Variables and Constants",
      duration: "12min",
      isFree: false,
      videoUrl: "https://youtu.be/jRNa6hYTJLo?list=PLwvDm4VfkdpiLvzZFJI6rVIBtdolrJBVB",
      description: "Learn to work with variables and constants in Swift"
    },
    {
      id: 5,
      title: "How to write if-statements and use operators",
      duration: "24min",
      isFree: false,
      videoUrl: "https://youtu.be/Q0DBDJqT3Ps?list=PLwvDm4VfkdpiLvzZFJI6rVIBtdolrJBVB",
      description: "Master conditional statements and operators in Swift"
    },
    {
      id: 6,
      title: "How to use Functions in Swift",
      duration: "36min",
      isFree: false,
      videoUrl: "https://youtu.be/kr3SSplrJlw?list=PLwvDm4VfkdpiLvzZFJI6rVIBtdolrJBVB",
      description: "Learn to create and use functions in Swift"
    },
    {
      id: 7,
      title: "What is Object Oriented Programming for Swift",
      duration: "39min",
      isFree: false,
      videoUrl: "https://youtu.be/XdZUVmqIkJE?list=PLwvDm4VfkdpiLvzZFJI6rVIBtdolrJBVB",
      description: "Understand OOP concepts and their implementation in Swift"
    },
    {
      id: 8,
      title: "What is a Protocol in Swift and SwiftUI View protocol",
      duration: "9min",
      isFree: false,
      videoUrl: "https://youtu.be/nJmrkRlRu88?list=PLwvDm4VfkdpiLvzZFJI6rVIBtdolrJBVB",
      description: "Master protocols and SwiftUI View protocol"
    },
    {
      id: 9,
      title: "Learn Swift online for FREE Series Conclusion",
      duration: "3min",
      isFree: false,
      videoUrl: "https://youtu.be/3284ruY8jbg?list=PLwvDm4VfkdpiLvzZFJI6rVIBtdolrJBVB",
      description: "Review key concepts and next steps in Swift development"
    }
  ],
  9: [ // React Native
    {
      id: 1,
      title: "Introduction & Setup- FREE PREVIEW",
      duration: "20min",
      isFree: true,
      videoUrl: "https://www.youtube.com/watch?v=J2j1yk-34OY&pp=ygUScmVhY3QgbmF0aXZlIGJhc2lj",
      description: "Get started with React Native and setup development environment"
    },
    {
      id: 2,
      title: "UI Components & Layout",
      duration: "14min",
      isFree: false,
      videoUrl: "https://www.youtube.com/watch?v=UCbRTaX6i7g&list=PL4cUxeGkcC9hNTz3sxqGTfxAwU-DIHJd2&index=2&pp=iAQB",
      description: "Learn React Native core components and layout system"
    },
    {
      id: 3,
      title: "Navigation",
      duration: "16min",
      isFree: false,
      videoUrl: "https://youtu.be/3hLQURJM7ws",
      description: "Implement navigation between screens in React Native"
    },
    {
      id: 4,
      title: "Backend Setup with Appwrite",
      duration: "5min",
      isFree: false,
      videoUrl: "https://youtu.be/eMbtOh17RuQ?list=PL4cUxeGkcC9hNTz3sxqGTfxAwU-DIHJd2",
      description: "Configure backend services with Appwrite"
    },
    {
      id: 5,
      title: "Initial Auth State",
      duration: "8min",
      isFree: false,
      videoUrl: "https://youtu.be/TaQdARE8dO4?list=PL4cUxeGkcC9hNTz3sxqGTfxAwU-DIHJd2",
      description: "Implement authentication state management"
    },
    {
      id: 6,
      title: "Creating New Records",
      duration: "13min",
      isFree: false,
      videoUrl: "https://youtu.be/xh7-JVZmM6w?list=PL4cUxeGkcC9hNTz3sxqGTfxAwU-DIHJd2",
      description: "Learn to create and manage database records"
    },
    {
      id: 7,
      title: "Dynamic Routes",
      duration: "8min",
      isFree: false,
      videoUrl: "https://youtu.be/H0hk9pr9Sdg?list=PL4cUxeGkcC9hNTz3sxqGTfxAwU-DIHJd2",
      description: "Implement dynamic routing in React Native"
    },
    {
      id: 8,
      title: "Fetching Single Records",
      duration: "7min",
      isFree: false,
      videoUrl: "https://youtu.be/T5fZBjWF8U4?list=PL4cUxeGkcC9hNTz3sxqGTfxAwU-DIHJd2",
      description: "Retrieve and display individual records from database"
    },
    {
      id: 9,
      title: "React Native Async Storage",
      duration: "23min",
      isFree: false,
      videoUrl: "https://youtu.be/UQrkf0kKLTM",
      description: "Implement local data persistence with AsyncStorage"
    }
  ],
  10: [ // Flutter
    {
      id: 1,
      title: "What is Flutter? & How it's Better than its Counterparts? - FREE PREVIEW",
      duration: "2min",
      isFree: true,
      videoUrl: "https://youtu.be/jqxz7QvdWk8?list=PLjVLYmrlmjGfGLShoW0vVX_tcyT8u1Y3E",
      description: "Introduction to Flutter and its advantages over other frameworks"
    },
    {
      id: 2,
      title: "Dart Programming Fundamentals",
      duration: "1h 41min",
      isFree: false,
      videoUrl: "https://www.youtube.com/watch?v=Ej_Pcr4uC2Q&pp=ygUdZGFydCBwcm9ncmFtbWluZyBmdW5kYW1lbnRhbHM%3D",
      description: "Master Dart programming language fundamentals"
    },
    {
      id: 3,
      title: "Flutter Basic",
      duration: "12min",
      isFree: false,
      videoUrl: "https://youtu.be/1xipg02Wu8s",
      description: "Learn Flutter basics and widget fundamentals"
    },
    {
      id: 4,
      title: "Layout & UI Design",
      duration: "2h 23min",
      isFree: false,
      videoUrl: "https://www.youtube.com/watch?v=HQ_ytw58tC4&pp=ygUaZmx1dHRlciBkZXNpZ24gdWkgdHV0b3JpYWw%3D",
      description: "Create beautiful layouts and UI designs in Flutter"
    },
    {
      id: 5,
      title: "Navigation & Routing",
      duration: "14min",
      isFree: false,
      videoUrl: "https://www.youtube.com/watch?v=h92VcrPLtBM&pp=ygUbZmx1dHRlciBuYXZpZ2F0aW9uICYgcm91dGluZw%3D%3D",
      description: "Implement navigation and routing in Flutter apps"
    },
    {
      id: 6,
      title: "State Management",
      duration: "14min",
      isFree: false,
      videoUrl: "https://www.youtube.com/watch?v=3tm-R7ymwhc&pp=ygUYZmx1dHRlciBzdGF0ZSBtYW5hZ2VtZW50",
      description: "Master state management techniques in Flutter"
    },
    {
      id: 7,
      title: "Forms & User Input",
      duration: "6min",
      isFree: false,
      videoUrl: "https://www.youtube.com/watch?v=2DX0TtM9Hug&pp=ygUZZmx1dHRlciBmb3JtICYgdXNlciBpbnB1dA%3D%3D",
      description: "Handle forms and user input in Flutter applications"
    },
    {
      id: 8,
      title: "Working with APIs",
      duration: "11min",
      isFree: false,
      videoUrl: "https://www.youtube.com/watch?v=ExPFnu8Dm40&pp=ygUZZmx1dHRlciBXb3JraW5nIHdpdGggQVBJcw%3D%3D",
      description: "Integrate REST APIs in Flutter applications"
    },
    {
      id: 9,
      title: "Local Storage",
      duration: "10min",
      isFree: false,
      videoUrl: "https://www.youtube.com/watch?v=FB9GpmL0Qe0&pp=ygUVZmx1dHRlciBsb2NhbCBzdG9yYWdl",
      description: "Implement local data storage in Flutter"
    },
    {
      id: 10,
      title: "Deployment",
      duration: "10min",
      isFree: false,
      videoUrl: "https://www.youtube.com/watch?v=ZxjgV1YaOcQ&pp=ygUSZmx1dHRlciBkZXBsb3ltZW50",
      description: "Prepare and deploy Flutter apps to app stores"
    },
  ],
  11: [ // Kotlin
    {
      id: 1,
      title: "What is Kotlin?- FREE PREVIEW",
      duration: "10min",
      isFree: true,
      videoUrl: "https://www.youtube.com/watch?v=PFVKjUUZMf8&pp=ygUTa290bGluIGludHJvZHVjdGlvbg%3D%3D",
      description: "Introduction to Kotlin programming language for Android development"
    },
    {
      id: 2,
      title: "Kotlin Fundamentals",
      duration: "25min",
      isFree: false,
      videoUrl: "https://www.youtube.com/watch?v=ffPq1usEZSI&pp=ygUTa290bGluIGZ1bmRhbWVudGFscw%3D%3D",
      description: "Learn Kotlin fundamentals and basic syntax"
    },
    {
      id: 3,
      title: "Object-Oriented Programming in Kotlin",
      duration: "54min",
      isFree: false,
      videoUrl: "https://www.youtube.com/watch?v=H6Edy4o14xE&pp=ygUNb29wIGluIGtvdGxpbg%3D%3D",
      description: "Master OOP concepts in Kotlin"
    },
    {
      id: 4,
      title: "Functional Programming in Kotlin",
      duration: "15min",
      isFree: false,
      videoUrl: "https://www.youtube.com/watch?v=obN78NEd47g&pp=ygUSZnVuY3Rpb24gaW4ga290bGlu",
      description: "Explore functional programming features in Kotlin"
    },
    {
      id: 5,
      title: "Coroutines & Asynchronous Programming",
      duration: "2h 7min",
      isFree: false,
      videoUrl: "https://www.youtube.com/watch?v=lmRzRKIsn1g&pp=ygUvY29yb3V0aW5lcyAmIGFzeW5jaHJvbm91cyBwcm9ncmFtbWluZyBpbiBrb3RsaW4%3D",
      description: "Master coroutines for asynchronous programming"
    },
    {
      id: 6,
      title: "Architecture Components",
      duration: "41min",
      isFree: false,
      videoUrl: "https://www.youtube.com/watch?v=-OGxVkxV32k&pp=ygUhYXJjaGl0ZWN0dXJlIGNvbXBvbmVudHMgaW4ga290bGlu",
      description: "Learn Android architecture components in Kotlin"
    },
    {
      id: 7,
      title: "Networking",
      duration: "29min",
      isFree: false,
      videoUrl: "https://www.youtube.com/watch?v=D-KcDtvS0jE&pp=ygUUbmV0d29ya2luZyBpbiBrb3RsaW4%3D",
      description: "Implement networking in Kotlin applications"
    },
    {
      id: 8,
      title: "Firebase Integration",
      duration: "16min",
      isFree: false,
      videoUrl: "https://www.youtube.com/watch?v=idbxxkF1l6k&pp=ygUeRmlyZWJhc2UgSW50ZWdyYXRpb24gaW4ga290bGlu",
      description: "Integrate Firebase services in Kotlin apps"
    },
    {
      id: 9,
      title: "Testing & Deployment",
      duration: "12min",
      isFree: false,
      videoUrl: "https://www.youtube.com/watch?v=IIUw9pEMcKY&pp=ygUVIERlcGxveW1lbnQgaW4ga290bGlu",
      description: "Learn testing practices and deploy Kotlin applications"
    },
    {
      id: 10,
      title: "Kotlin Project",
      duration: "2h 26min",
      isFree: false,
      videoUrl: "https://www.youtube.com/watch?v=_03sTtlxHqI&pp=ygUOa290bGluIHByb2plY3Q%3D",
      description: "Build a complete Android application with Kotlin"
    },
  ],
  12: [ // Data Structures & Algorithms
    {
      id: 1,
      title: "What are data structures?- FREE PREVIEW",
      duration: "16min",
      isFree: true,
      videoUrl: "https://www.youtube.com/watch?v=bum_19loj9A&t=10s&pp=ygUuaW50cm9kdWN0aW9uIHRvIGRhdGEgc3RydWN0dXJlcyBhbmQgYWxnb3JpdGhtcw%3D%3D",
      description: "Introduction to data structures and their importance"
    },
    {
      id: 2,
      title: "Programming Foundations for DSA",
      duration: "13min",
      isFree: false,
      videoUrl: "https://youtu.be/bL-o2xBENY0?list=PLxgZQoSe9cg0df_GxVjz3DD_Gck5tMXAd",
      description: "Build programming foundations needed for DSA"
    },
    {
      id: 3,
      title: "Arrays & Strings",
      duration: "7min",
      isFree: false,
      videoUrl: "https://www.youtube.com/watch?v=0OK-kbu9Cwo&pp=ygUiYXJyYXkgYW5kIHN0cmluZyBpbiBkYXRhIHN0cnVjdHVyZQ%3D%3D",
      description: "Master arrays and string manipulation techniques"
    },
    {
      id: 4,
      title: "Linked Lists",
      duration: "13min",
      isFree: false,
      videoUrl: "https://www.youtube.com/watch?v=N6dOwBde7-M&pp=ygUeTGlua2VkIExpc3RzIGluIGRhdGEgc3RydWN0dXJl",
      description: "Understand and implement linked lists"
    },
    {
      id: 5,
      title: "Stack & Queue",
      duration: "16min",
      isFree: false,
      videoUrl: "https://www.youtube.com/watch?v=A3ZUpyrnCbM&pp=ygUhc3RhY2sgYW5kIHF1ZXVlIGluIGRhdGEgc3RydWN0dXJl",
      description: "Learn stack and queue data structures"
    },
    {
      id: 6,
      title: "Recursion & Backtracking",
      duration: "12min",
      isFree: false,
      videoUrl: "https://www.youtube.com/watch?v=L0NxT2i-LOY&pp=ygUqUmVjdXJzaW9uICYgQmFja3RyYWNraW5nIGluIGRhdGEgc3RydWN0dXJl",
      description: "Master recursion and backtracking algorithms"
    },
    {
      id: 7,
      title: "Searching & Sorting",
      duration: "9min",
      isFree: false,
      videoUrl: "https://www.youtube.com/watch?v=Lg20Q0-N5CI&list=PLC0rhPW3svhi9aTkMQxG2_0EyQkIDTBmg",
      description: "Implement various searching and sorting algorithms"
    },
    {
      id: 8,
      title: "Trees",
      duration: "10min",
      isFree: false,
      videoUrl: "https://www.youtube.com/watch?v=1-l_UOFi1Xw&pp=ygUWdHJlZSBpbiBkYXRhIHN0cnVjdHVyZQ%3D%3D",
      description: "Understand tree data structures and traversal methods"
    },
    {
      id: 9,
      title: "Heaps & Priority Queue",
      duration: "51min",
      isFree: false,
      videoUrl: "https://www.youtube.com/watch?v=HqPJF2L5h9U&pp=ygUrcHJpb3JpdHkgcXVldWUgaGVhcCBpbiBkYXRhIHN0cnVjdHVyZSB0YW1pbA%3D%3D",
      description: "Master heap data structure and priority queues"
    },
    {
      id: 10,
      title: "Graphs",
      duration: "16min",
      isFree: false,
      videoUrl: "https://www.youtube.com/watch?v=gXgEDyodOJU&pp=ygUmZ3JhcGhzIGluIGRhdGEgc3RydWN0dXJlIGFuZCBhbGdvcml0aG0%3D",
      description: "Learn graph data structures and algorithms"
    },
    {
      id: 11,
      title: "Greedy Algorithms",
      duration: "1h 53min",
      isFree: false,
      videoUrl: "https://www.youtube.com/watch?v=bC7o8P_Ste4&pp=ygUuR3JlZWR5IEFsZ29yaXRobXMgZGF0YSBzdHJ1Y3R1cmUgYW5kIGFsZ29yaXRobQ%3D%3D",
      description: "Understand and implement greedy algorithms"
    },
    {
      id: 12,
      title: "Dynamic Programming",
      duration: "14min",
      isFree: false,
      videoUrl: "https://www.youtube.com/watch?v=vYquumk4nWw&pp=ygUTRHluYW1pYyBQcm9ncmFtbWluZ9IHCQmHCgGHKiGM7w%3D%3D",
      description: "Master dynamic programming concepts and techniques"
    },
  ],
  13: [ // Computer Networks
    {
      id: 1,
      title: "Introduction to Computer Networks- FREE PREVIEW",
      duration: "8min",
      isFree: true,
      videoUrl: "https://www.youtube.com/watch?v=WO6P92v61y4&pp=ygUhSW50cm9kdWN0aW9uIHRvIENvbXB1dGVyIE5ldHdvcmtz",
      description: "Introduction to computer networks and their importance"
    },
    {
      id: 2,
      title: "OSI & TCP/IP Models",
      duration: "29min",
      isFree: false,
      videoUrl: "https://www.youtube.com/watch?v=a0UIbw1MsUM&pp=ygUTT1NJICYgVENQL0lQIE1vZGVscw%3D%3D",
      description: "Understand OSI and TCP/IP networking models"
    },
    {
      id: 3,
      title: "Physical & Data Link Layer",
      duration: "35min",
      isFree: false,
      videoUrl: "https://www.youtube.com/watch?v=eSE6drHgtyA&t=20s&pp=ygUaUGh5c2ljYWwgJiBEYXRhIExpbmsgTGF5ZXI%3D",
      description: "Learn about physical and data link layers"
    },
    {
      id: 4,
      title: "Network Layer",
      duration: "12min",
      isFree: false,
      videoUrl: "https://www.youtube.com/watch?v=rW1jPlYgp_0&pp=ygUNTmV0d29yayBMYXllcg%3D%3D",
      description: "Master network layer concepts and protocols"
    },
    {
      id: 5,
      title: "Transport Layer",
      duration: "25min",
      isFree: false,
      videoUrl: "https://www.youtube.com/watch?v=0VtGnhUze6Y&pp=ygUPVHJhbnNwb3J0IExheWVy",
      description: "Understand transport layer protocols and services"
    },
    {
      id: 6,
      title: "Application Layer Protocols",
      duration: "7min",
      isFree: false,
      videoUrl: "https://www.youtube.com/watch?v=rxdBKMDCdN0&pp=ygUbQXBwbGljYXRpb24gTGF5ZXIgUHJvdG9jb2xz",
      description: "Learn common application layer protocols"
    },
    {
      id: 7,
      title: "Network Security Basics",
      duration: "20min",
      isFree: false,
      videoUrl: "https://www.youtube.com/watch?v=VJelZrYc49c&pp=ygUXTmV0d29yayBTZWN1cml0eSBCYXNpY3PSBwkJhwoBhyohjO8%3D",
      description: "Introduction to network security fundamentals"
    },
    {
      id: 8,
      title: "Wireless & Modern Networking",
      duration: "9min",
      isFree: false,
      videoUrl: "https://www.youtube.com/watch?v=DITTo5D0hSY&pp=ygUcV2lyZWxlc3MgJiBNb2Rlcm4gTmV0d29ya2luZw%3D%3D",
      description: "Explore wireless and modern networking technologies"
    },
    {
      id: 9,
      title: "Routing & Switching (Advanced)",
      duration: "1h 26min",
      isFree: false,
      videoUrl: "https://www.youtube.com/watch?v=2dic_pDh_UI&pp=ygUeUm91dGluZyAmIFN3aXRjaGluZyAoQWR2YW5jZWQp",
      description: "Master advanced routing and switching concepts"
    },
    {
      id: 10,
      title: "Network Troubleshooting",
      duration: "15min",
      isFree: false,
      videoUrl: "https://www.youtube.com/watch?v=vgisbCjtHz4&pp=ygUXTmV0d29yayBUcm91Ymxlc2hvb3Rpbmc%3D",
      description: "Learn techniques for network troubleshooting"
    },
  ],
  14: [ // Database Management
    {
      id: 1,
      title: "Introduction to Databases- FREE PREVIEW",
      duration: "3min",
      isFree: true,
      videoUrl: "https://www.youtube.com/watch?v=X7v0O8yiUuY&pp=ygUqaW50cm9kdWN0aW9uIHRvIGRhdGFiYXNlIG1hbmFnZW1lbnQgc3lzdGVt",
      description: "Introduction to database management systems"
    },
    {
      id: 2,
      title: "Database Models",
      duration: "12min",
      isFree: false,
      videoUrl: "https://www.youtube.com/watch?v=NPT__vt-hCg&t=225s&pp=ygUPRGF0YWJhc2UgTW9kZWxz",
      description: "Understand different database models and their uses"
    },
    {
      id: 3,
      title: "Relational Database Concepts",
      duration: "10min",
      isFree: false,
      videoUrl: "https://www.youtube.com/watch?v=WI9dE8-TFAc&t=77s&pp=ygUcUmVsYXRpb25hbCBEYXRhYmFzZSBDb25jZXB0c9IHCQmHCgGHKiGM7w%3D%3D",
      description: "Master relational database concepts and principles"
    },
    {
      id: 4,
      title: "SQL Basics",
      duration: "44min",
      isFree: false,
      videoUrl: "https://www.youtube.com/watch?v=h0nxCDiD-zg&pp=ygUKU1FMIEJhc2ljcw%3D%3D",
      description: "Learn basic SQL queries and operations"
    },
    {
      id: 5,
      title: "Advanced SQL Queries",
      duration: "1h 10min",
      isFree: false,
      videoUrl: "https://www.youtube.com/watch?v=Hl4NZB1XR9c&pp=ygUUQWR2YW5jZWQgU1FMIFF1ZXJpZXM%3D",
      description: "Master advanced SQL queries and optimization"
    },
    {
      id: 6,
      title: "Indexing & Views",
      duration: "13min",
      isFree: false,
      videoUrl: "https://www.youtube.com/watch?v=lmxdf6pyZpg&pp=ygUQSW5kZXhpbmcgJiBWaWV3cw%3D%3D",
      description: "Understand indexing strategies and database views"
    },
    {
      id: 7,
      title: "Stored Procedures & Functions",
      duration: "12min",
      isFree: false,
      videoUrl: "https://www.youtube.com/watch?v=7vnxpcqmqNQ&pp=ygUdU3RvcmVkIFByb2NlZHVyZXMgJiBGdW5jdGlvbnM%3D",
      description: "Create and use stored procedures and functions"
    },
    {
      id: 8,
      title: "Transactions & Concurrency",
      duration: "45min",
      isFree: false,
      videoUrl: "https://www.youtube.com/watch?v=onYjxRcToto&pp=ygUaVHJhbnNhY3Rpb25zICYgQ29uY3VycmVuY3k%3D",
      description: "Learn about transactions and concurrency control"
    },
    {
      id: 9,
      title: "Database Design & Normalization",
      duration: "28min",
      isFree: false,
      videoUrl: "https://www.youtube.com/watch?v=GFQaEYEc8_8&pp=ygUfRGF0YWJhc2UgRGVzaWduICYgTm9ybWFsaXphdGlvbg%3D%3D",
      description: "Master database design and normalization techniques"
    },
    {
      id: 10,
      title: "Database Security & Backup",
      duration: "14min",
      isFree: false,
      videoUrl: "https://www.youtube.com/watch?v=c3YaDqvSDrQ&pp=ygUaRGF0YWJhc2UgU2VjdXJpdHkgJiBCYWNrdXA%3D",
      description: "Learn database security practices and backup strategies"
    },
  ],
  15: [ // UX/UI Design
    {
      id: 1,
      title: "Introduction to UX/UI Design- FREE PREVIEW",
      duration: "8min",
      isFree: true,
      videoUrl: "https://www.youtube.com/watch?v=ODpB9-MCa5s&pp=ygUcaW50cm9kdWN0aW9uIHRvIHV4L3VpIGRlc2lnbg%3D%3D",
      description: "Introduction to UX/UI design principles and practices"
    },
    {
      id: 2,
      title: "User Research",
      duration: "13min",
      isFree: false,
      videoUrl: "https://www.youtube.com/watch?v=TRaNiRZqXwY&pp=ygUdVXNlciBSZXNlYXJjaCBpbiB1eC91aSBkZXNpZ24%3D",
      description: "Learn user research methods and techniques"
    },
    {
      id: 3,
      title: "Information Architecture",
      duration: "17min",
      isFree: false,
      videoUrl: "https://www.youtube.com/watch?v=OJLfjgVlwDo&pp=ygUoSW5mb3JtYXRpb24gQXJjaGl0ZWN0dXJlIGluIHV4L3VpIGRlc2lnbg%3D%3D",
      description: "Master information architecture principles"
    },
    {
      id: 4,
      title: "Wireframing & Prototyping",
      duration: "4min",
      isFree: false,
      videoUrl: "https://www.youtube.com/watch?v=Dh14MmPBvZA&pp=ygUpV2lyZWZyYW1pbmcgJiBQcm90b3R5cGluZyBpbiB1eC91aSBkZXNpZ24%3D",
      description: "Create wireframes and interactive prototypes"
    },
    {
      id: 5,
      title: "Visual Design Principles",
      duration: "27min",
      isFree: false,
      videoUrl: "https://www.youtube.com/watch?v=yNDgFK2Jj1E&pp=ygUhVmlzdWFsIERlc2lnbiBQcmluY2lwbGVzIGluIHV4L3Vp",
      description: "Learn visual design principles for digital products"
    },
    {
      id: 6,
      title: "UX Principles",
      duration: "10min",
      isFree: false,
      videoUrl: "https://www.youtube.com/watch?v=08MrVhy2qk8&pp=ygUWVVggUHJpbmNpcGxlcyBpbiB1eC91aQ%3D%3D",
      description: "Master core UX principles and heuristics"
    },
    {
      id: 7,
      title: "UI Design in Practice",
      duration: "10min",
      isFree: false,
      videoUrl: "https://www.youtube.com/watch?v=f6p1ePt1Va8&pp=ygUVVUkgRGVzaWduIGluIFByYWN0aWNl0gcJCYcKAYcqIYzv",
      description: "Apply UI design principles in practical projects"
    },
    {
      id: 8,
      title: "Design Systems",
      duration: "15min",
      isFree: false,
      videoUrl: "https://www.youtube.com/watch?v=w-r6quQx0zA&pp=ygUXZGVzaWduIHN5c3RlbXMgaW4gZmlnbWE%3D",
      description: "Understand and create design systems"
    },
    {
      id: 9,
      title: "Usability Testing",
      duration: "11min",
      isFree: false,
      videoUrl: "https://www.youtube.com/watch?v=7pAOkWLW1Oo&pp=ygURVXNhYmlsaXR5IFRlc3Rpbmc%3D",
      description: "Learn usability testing methods and practices"
    },
    {
      id: 10,
      title: "Portfolio & Projects",
      duration: "17min",
      isFree: false,
      videoUrl: "https://www.youtube.com/watch?v=mmgxspm9JWs&pp=ygUaUG9ydGZvbGlvICYgUHJvamVjdHMgdXggdWk%3D",
      description: "Build a UX/UI design portfolio with real projects"
    },
  ]
};
// ============================================
// Initialize Application
// ============================================

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
      console.log("Loaded purchased courses on init:", purchasedCourses); // Debug log
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

// ============================================
// Modules Management
// ============================================

function generateCourseModules(courseId) {
  const course = courseData.find(c => c.id === courseId);
  if (!course) return;

  console.log("Generating modules for course:", courseId);
  console.log("Purchased courses:", purchasedCourses);
  console.log("Is purchased?", purchasedCourses.includes(courseId));

  // Get modules for this course
  let modules = courseModulesData[courseId];
  
  // If no modules defined, create default ones
  if (!modules) {
    modules = [];
    for (let i = 1; i <= (course.modules || 8); i++) {
      modules.push({
        id: i,
        title: i === 1 ? `Module ${i}: Introduction - FREE PREVIEW` : `Module ${i}: ${getDefaultModuleTitle(course.category, i)}`,
        duration: `${Math.floor(Math.random() * 45) + 30} min`,
        isFree: i === 1, // First module is always free
        videoUrl: getDefaultVideoUrl(course.category, i),
        description: i === 1 
          ? `Free introduction to ${course.category}` 
          : `Learn advanced ${course.category} concepts in this module`
      });
    }
  }

  // Check if course is purchased - ensure we're comparing numbers
  const isPurchased = purchasedCourses.some(id => Number(id) === Number(courseId));

  // Generate desktop modules
  generateDesktopModules(courseId, modules, isPurchased);

  // Generate mobile modules
  generateMobileModules(courseId, modules, isPurchased);

  // Update module counts and progress
  updateModuleCounts(modules.length, course, isPurchased);
  
  // Update purchase buttons
  updatePurchaseButtons(courseId, course, isPurchased);
}

function getDefaultModuleTitle(category, moduleNum) {
  const titles = {
    "Web Development": ["Introduction", "HTML", "CSS", "JavaScript", "Advanced JS", "Frameworks", "Projects", "Deployment"],
    "Programming Language": ["Introduction", "Basics", "Control Flow", "Functions", "OOP", "Advanced", "Projects", "Best Practices"],
    "Mobile Development": ["Introduction", "Setup", "UI Components", "Navigation", "State", "API", "Testing", "Deployment"]
  };
  
  const categoryTitles = titles[category] || [
    "Introduction", "Core Concepts", "Intermediate", "Advanced", "Practice", "Project", "Review", "Next Steps"
  ];
  
  return categoryTitles[(moduleNum - 1) % categoryTitles.length];
}

function getDefaultVideoUrl(category, moduleNum) {
  // Return a default YouTube embed URL based on category
  const urls = {
    "Web Development": "https://www.youtube.com/embed/zJSY8tbf_ys",
    "Programming Language": "https://www.youtube.com/embed/ix9cRaBkVe0",
    "Mobile Development": "https://www.youtube.com/embed/0-S5a0eXPoc"
  };
  
  return urls[category] || "https://www.youtube.com/embed/zJSY8tbf_ys";
}

function generateDesktopModules(courseId, modules, isPurchased) {
  const desktopModuleList = document.getElementById("desktop-module-list");
  if (!desktopModuleList) return;

  const modulesHTML = modules.map((module) => {
    const isLocked = !isPurchased && !module.isFree;

    return `
      <div class="module-item ${isLocked ? 'locked' : ''} ${module.isFree ? 'free-module' : ''}" 
           data-module-id="${module.id}" 
           data-course-id="${courseId}" 
           data-video-url="${module.videoUrl}" 
           data-is-locked="${isLocked}"
           data-is-free="${module.isFree}"
           data-watched="false">
        <div class="module-content p-3 mb-2 rounded-lg border ${isLocked ? 'border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800/50' : 'border-purple-200 dark:border-purple-800 hover:border-purple-400 dark:hover:border-purple-600 hover:bg-purple-50 dark:hover:bg-purple-900/20 cursor-pointer transition-all'}">
          <div class="flex items-start gap-3">
            <div class="module-status mt-1">
              ${isLocked ? 
                '<i class="fas fa-lock text-gray-400 dark:text-gray-500 text-sm"></i>' : 
                '<i class="fas fa-play-circle text-purple-600 dark:text-purple-400 text-sm watched-icon" style="display: none;"></i>' +
                '<i class="fas fa-check-circle text-green-500 text-sm completed-icon" style="display: none;"></i>' +
                '<i class="fas fa-play-circle text-purple-600 dark:text-purple-400 text-sm default-icon"></i>'
              }
            </div>
            <div class="flex-1 min-w-0">
              <div class="flex items-center justify-between mb-1">
                <h4 class="font-medium text-sm truncate pr-2 ${isLocked ? 'text-gray-500 dark:text-gray-400' : 'text-gray-900 dark:text-white'}">
                  ${module.title}
                </h4>
                <span class="text-xs ${isLocked ? 'text-gray-400 dark:text-gray-500' : 'text-purple-600 dark:text-purple-400'} whitespace-nowrap">
                  ${module.duration}
                </span>
              </div>
              <p class="text-xs ${isLocked ? 'text-gray-400 dark:text-gray-500' : 'text-gray-500 dark:text-gray-400'} line-clamp-2 mb-2">
                ${module.description}
              </p>
              ${module.isFree ? 
                '<span class="inline-block px-2 py-0.5 bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400 text-xs rounded-full">FREE PREVIEW</span>' : 
                isPurchased ? 
                  '<span class="inline-block px-2 py-0.5 bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-400 text-xs rounded-full">Purchased</span>' : 
                  '<span class="inline-block px-2 py-0.5 bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400 text-xs rounded-full">Locked</span>'
              }
            </div>
          </div>
        </div>
      </div>
    `;
  }).join('');

  desktopModuleList.innerHTML = modulesHTML || `
    <div class="text-center py-8">
      <i class="fas fa-video text-gray-300 dark:text-gray-600 text-3xl mb-3"></i>
      <p class="text-gray-500 dark:text-gray-400 text-sm">No modules available</p>
    </div>
  `;

  // Add click event listeners
  addModuleClickListeners(desktopModuleList, isPurchased, false, courseId);
}

function generateMobileModules(courseId, modules, isPurchased) {
  const mobileModuleList = document.getElementById("mobile-module-list");
  if (!mobileModuleList) return;

  const modulesHTML = modules.map((module) => {
    const isLocked = !isPurchased && !module.isFree;

    return `
      <div class="mobile-module-item ${isLocked ? 'locked' : ''} ${module.isFree ? 'free-module' : ''}" 
           data-module-id="${module.id}" 
           data-course-id="${courseId}" 
           data-video-url="${module.videoUrl}" 
           data-is-locked="${isLocked}"
           data-is-free="${module.isFree}"
           data-watched="false">
        <div class="module-content p-4 mb-3 rounded-xl border ${isLocked ? 'border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800/50' : 'border-purple-200 dark:border-purple-800 hover:border-purple-400 dark:hover:border-purple-600 bg-white dark:bg-gray-800 shadow-sm'}">
          <div class="flex items-start gap-4">
            <div class="module-status w-6 flex-shrink-0 mt-1">
              ${isLocked ? 
                '<i class="fas fa-lock text-gray-400 dark:text-gray-500 text-base"></i>' : 
                '<i class="fas fa-play-circle text-purple-600 dark:text-purple-400 text-lg watched-icon" style="display: none;"></i>' +
                '<i class="fas fa-check-circle text-green-500 text-lg completed-icon" style="display: none;"></i>' +
                '<i class="fas fa-play-circle text-purple-600 dark:text-purple-400 text-lg default-icon"></i>'
              }
            </div>
            <div class="flex-1 min-w-0">
              <div class="flex items-center justify-between mb-2">
                <h4 class="font-semibold text-base ${isLocked ? 'text-gray-500 dark:text-gray-400' : 'text-gray-900 dark:text-white'} line-clamp-1">
                  ${module.title}
                </h4>
                <span class="text-sm ${isLocked ? 'text-gray-400 dark:text-gray-500' : 'text-purple-600 dark:text-purple-400'} font-medium ml-2 whitespace-nowrap">
                  ${module.duration}
                </span>
              </div>
              <p class="text-sm ${isLocked ? 'text-gray-400 dark:text-gray-500' : 'text-gray-600 dark:text-gray-400'} line-clamp-2 mb-3">
                ${module.description}
              </p>
              <div class="flex items-center gap-2 flex-wrap">
                ${module.isFree ? 
                  '<span class="inline-block px-3 py-1 bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400 text-xs rounded-full font-medium">FREE PREVIEW</span>' : 
                  isPurchased ? 
                    '<span class="inline-block px-3 py-1 bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-400 text-xs rounded-full font-medium">Purchased</span>' : 
                    '<span class="inline-block px-3 py-1 bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400 text-xs rounded-full">Locked - Purchase to Unlock</span>'
                }
              </div>
            </div>
          </div>
        </div>
      </div>
    `;
  }).join('');

  mobileModuleList.innerHTML = modulesHTML || `
    <div class="text-center py-12">
      <i class="fas fa-video text-gray-300 dark:text-gray-600 text-4xl mb-3"></i>
      <p class="text-gray-500 dark:text-gray-400">No modules available</p>
    </div>
  `;

  // Add click event listeners
  addModuleClickListeners(mobileModuleList, isPurchased, true, courseId);
}

function addModuleClickListeners(container, isPurchased, isMobile = false, courseId) {
  const moduleItems = container.querySelectorAll('[data-module-id]');
  
  moduleItems.forEach(item => {
    item.addEventListener('click', (e) => {
      // Don't trigger if clicking on a button inside the module
      if (e.target.closest('button')) return;

      const moduleId = item.dataset.moduleId;
      const videoUrl = item.dataset.videoUrl;
      const isLocked = item.dataset.isLocked === 'true';

      if (isLocked) {
        showToast('This module requires course purchase', 'error');
        
        // Highlight purchase button
        const purchaseBtn = document.getElementById(isMobile ? 'mobile-purchase-button' : 'desktop-purchase-button');
        if (purchaseBtn) {
          purchaseBtn.classList.add('animate-pulse', 'bg-yellow-500');
          setTimeout(() => {
            purchaseBtn.classList.remove('animate-pulse', 'bg-yellow-500');
          }, 2000);
        }
        return;
      }

      // Play the module video
      playModuleVideo(courseId, moduleId, videoUrl);
    });
  });
}

function playModuleVideo(courseId, moduleId, videoUrl) {
  const videoPlayer = document.getElementById("course-video-player");
  if (!videoPlayer) return;

  // Get module info
  const modules = courseModulesData[courseId] || [];
  const module = modules.find(m => m.id == moduleId);

  // Convert YouTube URL to embed format
  let embedUrl = videoUrl;
  
  // Handle different YouTube URL formats
  if (videoUrl.includes('youtube.com/watch?v=')) {
    // Format: https://www.youtube.com/watch?v=VIDEO_ID
    const videoId = videoUrl.split('v=')[1]?.split('&')[0];
    embedUrl = `https://www.youtube.com/embed/${videoId}`;
  } else if (videoUrl.includes('youtu.be/')) {
    // Format: https://youtu.be/VIDEO_ID
    const videoId = videoUrl.split('youtu.be/')[1]?.split('?')[0];
    embedUrl = `https://www.youtube.com/embed/${videoId}`;
  } else if (videoUrl.includes('youtube.com/embed/')) {
    // Already in embed format
    embedUrl = videoUrl;
  }

  // Add autoplay parameter
  embedUrl += embedUrl.includes('?') ? '&autoplay=1' : '?autoplay=1';

  console.log("Playing video:", embedUrl); // Debug log

  videoPlayer.innerHTML = `
    <div class="relative w-full h-full bg-black rounded-xl overflow-hidden">
      <iframe 
        src="${embedUrl}" 
        frameborder="0" 
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
        allowfullscreen
        class="absolute top-0 left-0 w-full h-full"
        title="${module?.title || 'Course video'}"
      ></iframe>
    </div>
  `;

  // Mark module as watched/in progress
  markModuleAsWatched(courseId, moduleId);

  // Close mobile menu if open
  closeMobileModulesMenu();

  // Update active module styling
  updateActiveModule(courseId, moduleId);

  // Show success message for free preview
  if (module && module.isFree) {
    showToast('Enjoying the free preview! Purchase to unlock all modules.', 'success');
  }
}

function markModuleAsWatched(courseId, moduleId) {
  // Initialize progress for this course if not exists
  if (!currentVideoProgress[courseId]) {
    currentVideoProgress[courseId] = {
      started: new Date().toISOString(),
      watchedModules: [],
      lastModule: moduleId,
      progress: 0
    };
  }

  // Add module to watched modules if not already there
  const courseProgress = currentVideoProgress[courseId];
  if (!courseProgress.watchedModules.includes(parseInt(moduleId))) {
    courseProgress.watchedModules.push(parseInt(moduleId));
    courseProgress.lastModule = parseInt(moduleId);
    
    // Get total modules for this course
    const modules = courseModulesData[courseId] || [];
    const totalModules = modules.length;
    
    // Calculate progress percentage
    const watchedCount = courseProgress.watchedModules.length;
    const unlockedModules = modules.filter(m => m.isFree || purchasedCourses.includes(courseId)).length;
    const progress = Math.round((watchedCount / unlockedModules) * 100);
    courseProgress.progress = progress;
    
    // Save to localStorage
    if (currentUser) {
      const userProgressKey = `learnhub_video_progress_${currentUser.id}`;
      localStorage.setItem(userProgressKey, JSON.stringify(currentVideoProgress));
    }
    
    // Update UI
    updateModuleWatchedStatus(courseId, moduleId);
    updateCourseProgress(courseId, progress);
  }
}

function updateModuleWatchedStatus(courseId, moduleId) {
  // Update desktop module
  const desktopModule = document.querySelector(`#desktop-module-list [data-module-id="${moduleId}"]`);
  if (desktopModule) {
    const defaultIcon = desktopModule.querySelector('.default-icon');
    const watchedIcon = desktopModule.querySelector('.watched-icon');
    const completedIcon = desktopModule.querySelector('.completed-icon');
    
    if (defaultIcon) defaultIcon.style.display = 'none';
    if (watchedIcon) watchedIcon.style.display = 'inline-block';
  }

  // Update mobile module
  const mobileModule = document.querySelector(`#mobile-module-list [data-module-id="${moduleId}"]`);
  if (mobileModule) {
    const defaultIcon = mobileModule.querySelector('.default-icon');
    const watchedIcon = mobileModule.querySelector('.watched-icon');
    const completedIcon = mobileModule.querySelector('.completed-icon');
    
    if (defaultIcon) defaultIcon.style.display = 'none';
    if (watchedIcon) watchedIcon.style.display = 'inline-block';
  }
}

function updateCourseProgress(courseId, progress) {
  // Update desktop progress
  const sidebarProgressBar = document.getElementById("sidebar-progress-bar");
  const sidebarProgressPercentage = document.getElementById("sidebar-progress-percentage");
  const sidebarProgressText = document.getElementById("sidebar-progress-text");
  
  if (sidebarProgressBar) sidebarProgressBar.style.width = `${progress}%`;
  if (sidebarProgressPercentage) sidebarProgressPercentage.textContent = `${progress}%`;
  if (sidebarProgressText) sidebarProgressText.textContent = `${progress}% complete • Keep learning`;

  // Update mobile progress
  const mobileProgressBar = document.getElementById("mobile-progress-bar");
  const mobileProgressPercentage = document.getElementById("mobile-progress-percentage");
  const mobileProgressText = document.getElementById("mobile-progress-text");
  
  if (mobileProgressBar) mobileProgressBar.style.width = `${progress}%`;
  if (mobileProgressPercentage) mobileProgressPercentage.textContent = `${progress}%`;
  if (mobileProgressText) mobileProgressText.textContent = `${progress}% complete • Keep learning`;
}

function updateActiveModule(courseId, activeModuleId) {
  // Desktop modules
  const desktopModules = document.querySelectorAll('#desktop-module-list [data-module-id]');
  desktopModules.forEach(module => {
    const moduleContent = module.querySelector('.module-content');
    if (module.dataset.moduleId == activeModuleId) {
      moduleContent.classList.add('bg-purple-100', 'dark:bg-purple-900/40', 'border-purple-500', 'dark:border-purple-500');
    } else {
      moduleContent.classList.remove('bg-purple-100', 'dark:bg-purple-900/40', 'border-purple-500', 'dark:border-purple-500');
    }
  });

  // Mobile modules
  const mobileModules = document.querySelectorAll('#mobile-module-list [data-module-id]');
  mobileModules.forEach(module => {
    const moduleContent = module.querySelector('.module-content');
    if (module.dataset.moduleId == activeModuleId) {
      moduleContent.classList.add('bg-purple-100', 'dark:bg-purple-900/40', 'border-purple-500', 'dark:border-purple-500');
    } else {
      moduleContent.classList.remove('bg-purple-100', 'dark:bg-purple-900/40', 'border-purple-500', 'dark:border-purple-500');
    }
  });
}

function updateModuleCounts(totalModules, course, isPurchased) {
  // Update desktop sidebar
  const sidebarCourseTitle = document.getElementById("sidebar-course-title");
  const sidebarCourseModules = document.getElementById("sidebar-course-modules");
  const sidebarCoursePrice = document.getElementById("sidebar-course-price");
  const desktopPrice = document.getElementById("desktop-price");
  const mobilePrice = document.getElementById("mobile-price");
  const mobileModulesCount = document.getElementById("mobile-modules-count");
  const desktopPurchaseModulesCount = document.getElementById("desktop-purchase-modules-count");
  const mobileCoursePrice = document.getElementById("mobile-course-price");
  
  // New mobile sidebar elements
  const mobileSidebarTitle = document.getElementById("mobile-sidebar-title");
  const mobileSidebarModules = document.getElementById("mobile-sidebar-modules");
  const mobileSidebarPrice = document.getElementById("mobile-sidebar-price");
  const mobilePurchaseModulesCount = document.getElementById("mobile-purchase-modules-count");
  
  if (sidebarCourseTitle) sidebarCourseTitle.textContent = course.title;
  if (sidebarCourseModules) sidebarCourseModules.textContent = `${totalModules} modules (1 free)`;
  if (sidebarCoursePrice) sidebarCoursePrice.textContent = `$${course.price.toFixed(2)}`;
  if (desktopPrice) desktopPrice.textContent = `$${course.price.toFixed(2)}`;
  if (mobilePrice) mobilePrice.textContent = `$${course.price.toFixed(2)}`;
  if (mobileCoursePrice) mobileCoursePrice.textContent = `$${course.price.toFixed(2)}`;
  if (mobileModulesCount) mobileModulesCount.textContent = `${totalModules} modules`;
  if (desktopPurchaseModulesCount) desktopPurchaseModulesCount.textContent = totalModules;
  
  // Update mobile sidebar
  if (mobileSidebarTitle) mobileSidebarTitle.textContent = course.title;
  if (mobileSidebarModules) mobileSidebarModules.textContent = `${totalModules} modules (1 free)`;
  if (mobileSidebarPrice) mobileSidebarPrice.textContent = `$${course.price.toFixed(2)}`;
  if (mobilePurchaseModulesCount) mobilePurchaseModulesCount.textContent = totalModules;

  // Get saved progress for this course
  let progress = 0;
  if (currentVideoProgress[course.id]) {
    progress = currentVideoProgress[course.id].progress || 0;
  }

  // Update progress bars
  updateProgressBars(progress, totalModules, isPurchased);
}

function updateProgressBars(progress, totalModules, isPurchased) {
  const sidebarProgressBar = document.getElementById("sidebar-progress-bar");
  const sidebarProgressPercentage = document.getElementById("sidebar-progress-percentage");
  const sidebarProgressText = document.getElementById("sidebar-progress-text");
  const mobileProgressBar = document.getElementById("mobile-progress-bar");
  const mobileProgressPercentage = document.getElementById("mobile-progress-percentage");
  const mobileProgressText = document.getElementById("mobile-progress-text");

  const progressWidth = progress ? `${progress}%` : '0%';
  const progressPercentage = progress ? `${progress}%` : '0%';
  const progressMessage = isPurchased 
    ? (progress ? `${progress}% complete • Keep learning` : 'Start learning to track progress')
    : 'Purchase to unlock all modules';

  // Desktop
  if (sidebarProgressBar) sidebarProgressBar.style.width = progressWidth;
  if (sidebarProgressPercentage) sidebarProgressPercentage.textContent = progressPercentage;
  if (sidebarProgressText) sidebarProgressText.textContent = progressMessage;

  // Mobile
  if (mobileProgressBar) mobileProgressBar.style.width = progressWidth;
  if (mobileProgressPercentage) mobileProgressPercentage.textContent = progressPercentage;
  if (mobileProgressText) mobileProgressText.textContent = progressMessage;
}

// ============================================
// Purchase Functions
// ============================================

function updatePurchaseButtons(courseId, course, isPurchased) {
  // Desktop purchase button
  const desktopPurchaseBtn = document.getElementById("desktop-purchase-button");
  
  if (desktopPurchaseBtn) {
    if (isPurchased) {
      desktopPurchaseBtn.innerHTML = '<i class="fas fa-check mr-2"></i> Course Purchased';
      desktopPurchaseBtn.disabled = true;
      desktopPurchaseBtn.classList.add('bg-green-600', 'hover:bg-green-700');
      desktopPurchaseBtn.classList.remove('bg-purple-600', 'hover:bg-purple-700');
    } else {
      desktopPurchaseBtn.innerHTML = '<i class="fas fa-shopping-cart mr-2"></i> Purchase Course';
      desktopPurchaseBtn.disabled = false;
      desktopPurchaseBtn.classList.add('bg-purple-600', 'hover:bg-purple-700');
      desktopPurchaseBtn.classList.remove('bg-green-600', 'hover:bg-green-700');
      desktopPurchaseBtn.onclick = () => purchaseCourse(courseId);
    }
  }

  // Mobile purchase button
  const mobilePurchaseBtn = document.getElementById("mobile-purchase-button");
  if (mobilePurchaseBtn) {
    if (isPurchased) {
      mobilePurchaseBtn.innerHTML = '<i class="fas fa-check mr-2"></i> Course Purchased';
      mobilePurchaseBtn.disabled = true;
      mobilePurchaseBtn.classList.add('bg-green-600', 'hover:bg-green-700');
      mobilePurchaseBtn.classList.remove('bg-purple-600', 'hover:bg-purple-700');
    } else {
      mobilePurchaseBtn.innerHTML = '<i class="fas fa-shopping-cart mr-2"></i> Purchase Course';
      mobilePurchaseBtn.disabled = false;
      mobilePurchaseBtn.classList.add('bg-purple-600', 'hover:bg-purple-700');
      mobilePurchaseBtn.classList.remove('bg-green-600', 'hover:bg-green-700');
      mobilePurchaseBtn.onclick = () => purchaseCourse(courseId);
    }
  }

  // Update system status
  updateSystemStatusCard();
}

function purchaseCourse(courseId) {
  console.log("Purchase clicked for course:", courseId);
  
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
  if (!course) {
    showToast("Course not found", "error");
    return;
  }

  // Convert to number for comparison
  const numericCourseId = Number(courseId);
  
  if (purchasedCourses.includes(numericCourseId)) {
    showToast("You already own this course!", "success");
    return;
  }

  const timestamp = Date.now();
  const randomNum = Math.floor(Math.random() * 10000).toString().padStart(4, "0");
  const transactionNumber = `RCP-${timestamp}-${randomNum}`;

  const transactionDate = new Date();
  const transaction = {
    id: timestamp,
    transactionNumber: transactionNumber,
    courseId: numericCourseId,
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

  purchasedCourses.push(numericCourseId);
  transactions.push(transaction);

  console.log("After purchase - purchased courses:", purchasedCourses); // Debug log

  saveUserData(currentUser.id);

  // Update all course cards
  updateAllCourseCards();

  showToast(
    `Purchase complete! All ${course.modules} modules are now unlocked.`,
    "success",
  );

  updateDashboard();

  if (currentPage === "dashboard") {
    loadRecentCourses();
  }

  // If on course detail page, regenerate modules
  if (currentPage === "course-detail" && localStorage.getItem("current_course_id") == courseId) {
    // Small delay to ensure data is saved
    setTimeout(() => {
      generateCourseModules(courseId);
    }, 100);
  }
}

// ============================================
// Mobile Modules Menu
// ============================================

function initMobileModulesMenu() {
  const mobileToggle = document.getElementById("mobile-modules-toggle");
  const mobileOverlay = document.getElementById("mobile-modules-overlay");
  const closeButton = document.getElementById("close-mobile-modules");

  if (mobileToggle) {
    mobileToggle.addEventListener("click", (e) => {
      e.stopPropagation();
      if (mobileOverlay) {
        mobileOverlay.classList.remove("hidden");
        document.body.style.overflow = "hidden";
      }
    });
  }

  if (closeButton) {
    closeButton.addEventListener("click", closeMobileModulesMenu);
  }

  if (mobileOverlay) {
    mobileOverlay.addEventListener("click", (e) => {
      if (e.target === mobileOverlay) {
        closeMobileModulesMenu();
      }
    });
  }
}

function closeMobileModulesMenu() {
  const mobileOverlay = document.getElementById("mobile-modules-overlay");
  if (mobileOverlay) {
    mobileOverlay.classList.add("hidden");
    document.body.style.overflow = "auto";
  }
}

// ============================================
// Show Course Detail (Modified to include modules)
// ============================================

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
  const courseDurationValue = document.getElementById("course-duration-value");

  if (courseDetailCategory) courseDetailCategory.textContent = course.category;
  if (courseDetailTitle) courseDetailTitle.textContent = course.title;
  if (courseDetailDescription) courseDetailDescription.textContent = course.description;
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

  // Show course detail page
  pages.forEach((p) => p.classList.add("page-hidden"));
  const courseDetailPage = document.getElementById("course-detail-page");
  if (courseDetailPage) {
    courseDetailPage.classList.remove("page-hidden");
    currentPage = "course-detail";
  }

  // Generate modules
  setTimeout(() => {
    generateCourseModules(courseId);
    initMobileModulesMenu();
    
    // Restore watched module icons if any
    restoreWatchedModules(courseId);
  }, 100);
}

function restoreWatchedModules(courseId) {
  if (currentVideoProgress[courseId]) {
    const watchedModules = currentVideoProgress[courseId].watchedModules || [];
    watchedModules.forEach(moduleId => {
      updateModuleWatchedStatus(courseId, moduleId);
    });
    
    // Update progress bar
    const progress = currentVideoProgress[courseId].progress || 0;
    updateCourseProgress(courseId, progress);
  }
}

// ============================================
// Load User Data Functions
// ============================================

function loadUserData(userId) {
  try {
    const userPurchasedKey = `learnhub_purchased_${userId}`;
    const userTransactionsKey = `learnhub_transactions_${userId}`;
    const userProgressKey = `learnhub_video_progress_${userId}`;

    const savedPurchased = localStorage.getItem(userPurchasedKey);
    const savedTransactions = localStorage.getItem(userTransactionsKey);
    const savedProgress = localStorage.getItem(userProgressKey);

    purchasedCourses = savedPurchased ? JSON.parse(savedPurchased) : [];
    transactions = savedTransactions ? JSON.parse(savedTransactions) : [];
    currentVideoProgress = savedProgress ? JSON.parse(savedProgress) : {};

    // Ensure purchasedCourses is an array of numbers
    if (Array.isArray(purchasedCourses)) {
      purchasedCourses = purchasedCourses.map(id => Number(id));
    } else {
      purchasedCourses = [];
    }

    console.log("Loaded purchased courses:", purchasedCourses); // Debug log

    if (!Array.isArray(transactions)) transactions = [];
    if (typeof currentVideoProgress !== 'object') currentVideoProgress = {};

    return true;
  } catch (e) {
    console.error("Error loading user data:", e);
    purchasedCourses = [];
    transactions = [];
    currentVideoProgress = {};
    return false;
  }
}

function saveUserData(userId) {
  try {
    const userPurchasedKey = `learnhub_purchased_${userId}`;
    const userTransactionsKey = `learnhub_transactions_${userId}`;
    const userProgressKey = `learnhub_video_progress_${userId}`;

    localStorage.setItem(userPurchasedKey, JSON.stringify(purchasedCourses));
    localStorage.setItem(userTransactionsKey, JSON.stringify(transactions));
    localStorage.setItem(userProgressKey, JSON.stringify(currentVideoProgress));

    return true;
  } catch (e) {
    console.error("Error saving user data:", e);
    return false;
  }
}

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

function setupEventListeners() {
  if (themeToggle) {
    themeToggle.addEventListener("click", toggleTheme);
  }

  if (logoutBtn) {
    logoutBtn.addEventListener("click", logout);
  }

  if (mobileMenuBtn && mobileMenu) {
    mobileMenuBtn.addEventListener("click", toggleMobileMenu);
    setupClickOutsideHandler();
  }

  const courseSearch = document.getElementById("course-search");
  if (courseSearch) {
    courseSearch.addEventListener("input", filterCourses);
  }

  const documentSearch = document.getElementById("document-search");
  if (documentSearch) {
    documentSearch.addEventListener("input", filterDocuments);
  }

  const contactForm = document.getElementById("contact-form");
  if (contactForm) {
    contactForm.addEventListener("submit", handleContactSubmit);
  }

  const logoContainer = document.querySelector(".logo-container");
  if (logoContainer) {
    logoContainer.addEventListener("click", (e) => {
      e.preventDefault();
      window.location.hash = "home";
    });
  }

  setupEventDelegation();
}

function setupEventDelegation() {
  document.addEventListener("click", (e) => {
    if (e.target.closest(".view-details-btn")) {
      const btn = e.target.closest(".view-details-btn");
      const courseId = parseInt(btn.dataset.courseId);
      if (courseId) {
        window.location.hash = `course-${courseId}`;
      }
    }

    if (e.target.closest(".dashboard-watch-btn")) {
      const btn = e.target.closest(".dashboard-watch-btn");
      const courseId = parseInt(btn.dataset.courseId);
      if (courseId) {
        window.location.hash = `course-${courseId}`;
      }
    }

    if (e.target.closest(".view-document-btn")) {
      const btn = e.target.closest(".view-document-btn");
      const docId = parseInt(btn.dataset.docId);
      if (docId) {
        viewDocument(docId);
      }
    }

    if (e.target.closest(".login-to-read-btn")) {
      showLoginModal();
    }

    if (e.target.closest(".course-card") && !e.target.closest("button")) {
      const card = e.target.closest(".course-card");
      const courseId = parseInt(card.dataset.courseId);
      if (courseId) {
        window.location.hash = `course-${courseId}`;
      }
    }
  });
}

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

function handleHashChange() {
  const hash = window.location.hash.substring(1);

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

function showPage(page) {
  if (page.includes("dashboard") && !currentUser) {
    showLoginModal();
    window.location.hash = "home";
    return;
  }

  pages.forEach((p) => p.classList.add("page-hidden"));

  const targetPage = document.getElementById(`${page}-page`);
  if (targetPage) {
    targetPage.classList.remove("page-hidden");
    currentPage = page;

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

function showDashboardView(view) {
  document.querySelectorAll('.dashboard-view').forEach(view => {
    view.classList.add('hidden');
  });
  
  const targetView = document.getElementById(`dashboard-${view}-view`);
  if (targetView) {
    targetView.classList.remove('hidden');
  }
  
  if (view === 'courses') {
    loadDashboardCoursesView();
  } else if (view === 'receipts') {
    loadDashboardReceiptsView();
  } else if (view === 'main') {
    updateDashboard();
  }
}

function updateDashboard() {
  if (!currentUser) return;

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

  document.getElementById('dashboard-course-count').textContent = purchasedCourses.length;
  document.getElementById('dashboard-receipts-count').textContent = transactions.length;
  document.getElementById('purchased-courses-count').textContent = purchasedCourses.length;
  
  const totalSpent = transactions.reduce((total, t) => total + t.amount, 0);
  document.getElementById('total-spent-amount').textContent = `$${totalSpent.toFixed(2)}`;
  
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
  
  loadRecentCourses();
}

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
            <button onclick="window.location.hash = 'course-${course.id}'" class="btn btn-primary w-full py-1.5 text-sm">
              <i class="fas fa-play mr-1"></i> Watch Now
            </button>
          </div>
        </div>
      `;
    }
  });

  recentCoursesGrid.innerHTML = coursesHTML;
}

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
        // Get progress for this course
        const progress = currentVideoProgress[courseId]?.progress || 0;
        
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
              ${progress > 0 ? `
                <div class="absolute bottom-0 left-0 right-0 h-1 bg-gray-200">
                  <div class="h-full bg-green-500" style="width: ${progress}%"></div>
                </div>
              ` : ''}
            </div>
            <div class="p-4">
              <h3 class="font-bold text-lg mb-2 line-clamp-1">${course.title}</h3>
              <p class="text-gray-600 dark:text-gray-400 text-sm mb-4 line-clamp-2">${course.description}</p>
              <div class="flex justify-between items-center">
                <span class="text-sm text-gray-500">${course.duration}</span>
                <div class="flex items-center gap-2">
                  ${progress > 0 ? `<span class="text-xs text-green-600">${progress}%</span>` : ''}
                  <button onclick="window.location.hash = 'course-${course.id}'" class="btn btn-primary py-1.5 px-3 text-sm">
                    <i class="fas fa-play mr-1"></i> Watch
                  </button>
                </div>
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

function loadDashboardReceiptsView() {
  const receiptsView = document.getElementById('dashboard-receipts-view');
  if (!receiptsView) return;

  const totalPurchases = transactions.length;
  const totalSpent = transactions.reduce((total, t) => total + t.amount, 0);
  const lastPurchase = transactions.length > 0 
    ? new Date(Math.max(...transactions.map(t => new Date(t.date).getTime())))
    : null;

  let receiptsHTML = `
    <div class="mb-8">
      <div class="mb-8">
        <h2 class="text-2xl font-bold mb-2">Purchase History</h2>
        <p class="text-gray-600 dark:text-gray-400">
          View all your purchase receipts and transaction details.
        </p>
      </div>

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

function viewReceiptDetail(receiptId) {
  const transaction = transactions.find(t => t.id === receiptId);
  if (!transaction) {
    showToast("Receipt not found", "error");
    return;
  }
  
  const course = courseData.find(c => c.id === transaction.courseId);
  
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

  document.body.insertAdjacentHTML('beforeend', modalHTML);
}

function closeReceiptDetailModal() {
  const modal = document.getElementById('receipt-detail-modal');
  if (modal) {
    modal.remove();
  }
}

// ============================================
// Course Management
// ============================================

function loadCategories() {
  const uniqueCategories = [...new Set(courseData.map((course) => course.category))];
  allCategories = uniqueCategories.map((category, index) => ({
    id: index + 1,
    name: category,
    description: `Learn ${category} skills`,
  }));

  const coursesCount = document.getElementById("courses-count");
  const categoriesCount = document.getElementById("categories-count");
  const documentsCount = document.getElementById("documents-count");

  if (coursesCount) coursesCount.textContent = courseData.length;
  if (categoriesCount) categoriesCount.textContent = allCategories.length;
  if (documentsCount) documentsCount.textContent = documentData.length;
}

function loadFeaturedCourses() {
  const featured = courseData.filter((course) => course.featured);
  const featuredCoursesGrid = document.getElementById("featured-courses-grid");
  if (featuredCoursesGrid) {
    featuredCoursesGrid.innerHTML = featured
      .map((course) => createCourseCard(course))
      .join("");
  }
}

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

function createCourseCard(course) {
  const isPurchased = purchasedCourses.some(id => Number(id) === Number(course.id));

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
        ${isPurchased ? `
          <div class="absolute top-4 right-4">
            <span class="bg-green-500 text-white text-xs px-2 py-1 rounded-full">
              <i class="fas fa-check mr-1"></i> Purchased
            </span>
          </div>
        ` : ''}
      </div>
      <div class="p-5">
        <h3 class="mb-2 font-bold text-lg line-clamp-2">${course.title}</h3>
        <p class="mb-4 text-sm text-gray-600 dark:text-gray-400 line-clamp-2">${course.description}</p>
        <div class="flex items-center justify-between">
          <span class="font-bold text-lg text-purple-600 dark:text-purple-400">$${course.price.toFixed(2)}</span>
          <button class="btn ${isPurchased ? "btn-outline" : "btn-primary"} view-details-btn text-sm py-1.5 px-3" data-course-id="${course.id}">
            ${isPurchased ? '<i class="fas fa-play mr-1"></i> Watch Video' : 'View Details'}
          </button>
        </div>
      </div>
    </div>
  `;
}

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

  courseCategoriesFilter.querySelectorAll("button").forEach((button) => {
    button.addEventListener("click", (e) => {
      const category = e.target.dataset.category;
      filterCoursesByCategory(category);

      document.querySelectorAll("#course-categories-filter button").forEach((b) => {
        b.classList.remove("bg-purple-600", "text-white");
        b.classList.add("bg-transparent", "text-gray-700", "border-gray-300");
      });
      e.target.classList.add("bg-purple-600", "text-white");
      e.target.classList.remove("bg-transparent", "text-gray-700", "border-gray-300");
    });
  });
}

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

function loadFeaturedDocuments() {
  const featured = documentData.filter((doc) => doc.featured);
  const featuredDocumentsGrid = document.getElementById("featured-documents-grid");
  if (featuredDocumentsGrid) {
    featuredDocumentsGrid.innerHTML = featured
      .map((doc) => createDocumentCard(doc))
      .join("");
  }
}

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

function updateDocumentFilters() {
  const documentCategoriesFilter = document.getElementById("document-categories-filter");
  if (!documentCategoriesFilter) return;

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

  documentCategoriesFilter.querySelectorAll("button").forEach((button) => {
    button.addEventListener("click", (e) => {
      const category = e.target.dataset.category;
      filterDocumentsByCategory(category);

      document.querySelectorAll("#document-categories-filter button").forEach((b) => {
        b.classList.remove("bg-purple-600", "text-white");
        b.classList.add("bg-transparent", "text-gray-700", "border-gray-300");
      });
      e.target.classList.add("bg-purple-600", "text-white");
      e.target.classList.remove("bg-transparent", "text-gray-700", "border-gray-300");
    });
  });
}

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

function viewDocument(docId) {
  const doc = documentData.find((d) => d.id === docId);
  if (!doc) return;

  if (!currentUser) {
    showLoginModal();
    return;
  }

  window.open(doc.url, "_blank");
}

// ============================================
// Auth Functions
// ============================================

function updateAuthUI() {
  const guestButtons = document.getElementById("guest-buttons");
  const userMenu = document.getElementById("user-menu");

  const mobileGuestButtons = document.getElementById("mobile-guest-buttons");
  const mobileUserMenu = document.getElementById("mobile-user-menu");
  const mobileUserName = document.getElementById("mobile-user-name");
  const mobileUserEmail = document.getElementById("mobile-user-email");

  if (currentUser) {
    if (guestButtons) {
      guestButtons.style.display = "none";
    }

    if (userMenu) {
      userMenu.style.display = "flex";
    }

    if (mobileGuestButtons) {
      mobileGuestButtons.style.display = "none";
    }

    if (mobileUserMenu) {
      mobileUserMenu.style.display = "flex";

      if (mobileUserName) {
        mobileUserName.textContent = currentUser.name;
      }
      if (mobileUserEmail) {
        mobileUserEmail.textContent = currentUser.email;
      }
    }
  } else {
    if (guestButtons) {
      guestButtons.style.display = "flex";
    }

    if (userMenu) {
      userMenu.style.display = "none";
    }

    if (mobileGuestButtons) {
      mobileGuestButtons.style.display = "flex";
    }

    if (mobileUserMenu) {
      mobileUserMenu.style.display = "none";
    }
  }

  updateAllCourseCards();
}

function handleLogin(e) {
  e.preventDefault();
  const email = document.getElementById("login-email").value;
  const password = document.getElementById("login-password").value;

  if (!email || !password) {
    showToast("Please fill in all fields", "error");
    return;
  }

  const existingUsers = JSON.parse(localStorage.getItem("learnhub_users") || "[]");
  const existingUser = existingUsers.find((user) => user.email === email);

  if (existingUser && existingUser.password === password) {
    const user = {
      id: existingUser.id,
      name: existingUser.name,
      email: existingUser.email,
      createdAt: existingUser.createdAt,
    };

    currentUser = user;
    localStorage.setItem("learnhub_user", JSON.stringify(user));

    loadUserData(user.id);

    updateAuthUI();
    closeLoginModal();

    const loginForm = document.getElementById("login-form");
    if (loginForm) {
      loginForm.reset();
    }

    loadAllDocuments();
    loadFeaturedDocuments();

    showToast("Login successful! Welcome back.", "success");

    closeMobileMenu();

    if (currentPage.includes("dashboard")) {
      updateDashboard();
    }

    if (window.location.hash !== "#dashboard") {
      window.location.hash = "home";
    }
  } else {
    showToast("Invalid email or password", "error");
  }
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

  const existingUsers = JSON.parse(localStorage.getItem("learnhub_users") || "[]");
  if (existingUsers.some((user) => user.email === email)) {
    showToast("Email already registered. Please login instead.", "error");
    return;
  }

  const user = {
    id: Date.now(),
    name: name,
    email: email,
    password: password,
    createdAt: new Date().toISOString(),
  };

  existingUsers.push(user);
  localStorage.setItem("learnhub_users", JSON.stringify(existingUsers));

  currentUser = {
    id: user.id,
    name: user.name,
    email: user.email,
    createdAt: user.createdAt,
  };

  localStorage.setItem("learnhub_user", JSON.stringify(currentUser));

  purchasedCourses = [];
  transactions = [];
  currentVideoProgress = {};

  saveUserData(currentUser.id);

  updateAuthUI();
  closeRegisterModal();

  const registerForm = document.getElementById("register-form");
  if (registerForm) {
    registerForm.reset();
  }

  loadAllDocuments();
  loadFeaturedDocuments();

  showToast("Registration successful! Welcome to LearnHub.", "success");

  closeMobileMenu();

  window.location.hash = "dashboard";
}

function logout() {
  if (currentUser) {
    saveUserData(currentUser.id);
  }

  currentUser = null;
  purchasedCourses = [];
  transactions = [];
  currentVideoProgress = {};

  localStorage.removeItem("learnhub_user");

  updateAuthUI();

  closeMobileMenu();

  loadAllDocuments();
  loadFeaturedDocuments();

  if (currentPage === "documents") {
    showLoginNotice();
  }

  window.location.hash = "home";
  showToast("Logged out successfully", "success");
}

// ============================================
// Modal Functions
// ============================================

function showLoginModal() {
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

function closeLoginModal() {
  const modal = document.getElementById("login-modal");
  if (modal) {
    modal.classList.add("hidden");
    modal.classList.remove("flex");
    document.body.style.overflow = "auto";
  }
}

function showRegisterModal() {
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

function updateSystemStatusCard() {
  const desktopSystemStatus = document.getElementById("desktop-system-status");
  const mobileSystemStatus = document.getElementById("mobile-system-status");
  
  const isOpen = isSystemOpen();

  const statusHTML = isOpen ? `
    <div class="flex items-center">
      <div class="mr-3">
        <i class="fas fa-check-circle text-green-500 text-lg"></i>
      </div>
      <div>
        <h4 class="font-bold text-green-600 dark:text-green-400 text-sm">System Open</h4>
        <p class="text-xs text-gray-600 dark:text-gray-400">Purchases available</p>
      </div>
    </div>
  ` : `
    <div class="flex items-center">
      <div class="mr-3">
        <i class="fas fa-times-circle text-red-500 text-lg"></i>
      </div>
      <div>
        <h4 class="font-bold text-red-600 dark:text-red-400 text-sm">System Closed</h4>
        <p class="text-xs text-gray-600 dark:text-gray-400">Purchases unavailable 8AM-10PM</p>
      </div>
    </div>
  `;

  if (desktopSystemStatus) desktopSystemStatus.innerHTML = statusHTML;
  if (mobileSystemStatus) mobileSystemStatus.innerHTML = statusHTML;
}

function isSystemOpen() {
  const now = new Date();
  const hour = now.getHours();
  return hour >= 8 && hour < 22;
}

// ============================================
// Mobile Menu Functions
// ============================================

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

function toggleTheme() {
  const isDark = document.documentElement.classList.toggle("dark");
  localStorage.setItem("theme", isDark ? "dark" : "light");
  updateThemeIcon(isDark);
}

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

function handleContactSubmit(e) {
  e.preventDefault();

  const name = document.getElementById("contact-name").value;
  const email = document.getElementById("contact-email").value;
  const subject = document.getElementById("contact-subject").value;
  const message = document.getElementById("contact-message").value;

  const contactSuccess = document.getElementById("contact-success");
  if (contactSuccess) {
    contactSuccess.classList.remove("hidden");
  }

  const contactForm = document.getElementById("contact-form");
  if (contactForm) {
    contactForm.reset();
  }

  showToast(
    "Message sent successfully! We'll get back to you soon.",
    "success",
  );

  setTimeout(() => {
    if (contactSuccess) {
      contactSuccess.classList.add("hidden");
    }
  }, 5000);
}

// ============================================
// Toast Notification
// ============================================

function showToast(message, type = "success") {
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

  setTimeout(() => {
    if (toast.parentElement) {
      toast.remove();
    }
  }, 5000);
}

// ============================================
// Initialize Application
// ============================================

document.addEventListener("DOMContentLoaded", init);

setInterval(updateSystemStatusCard, 60000);

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

  .free-module .module-content {
    border-left: 3px solid #10b981;
  }

  .module-item.locked .module-content {
    opacity: 0.8;
  }

  .module-item.locked .module-content:hover {
    opacity: 0.9;
  }

  #mobile-modules-overlay {
    transition: opacity 0.3s ease;
  }

  #mobile-modules-overlay.hidden {
    opacity: 0;
    pointer-events: none;
  }

  #mobile-modules-overlay > div {
    transform: translateX(0);
    transition: transform 0.3s ease;
  }

  #mobile-modules-overlay.hidden > div {
    transform: translateX(-100%);
  }

  #desktop-module-list {
    max-height: 40vh;
    overflow-y: auto;
  }

  #mobile-module-list {
    overflow-y: auto;
    max-height: calc(100vh - 280px);
  }

  #desktop-module-list::-webkit-scrollbar,
  #mobile-module-list::-webkit-scrollbar {
    width: 6px;
  }

  #desktop-module-list::-webkit-scrollbar-track,
  #mobile-module-list::-webkit-scrollbar-track {
    background: #f1f1f1;
    border-radius: 10px;
  }

  .dark #desktop-module-list::-webkit-scrollbar-track,
  .dark #mobile-module-list::-webkit-scrollbar-track {
    background: #374151;
  }

  #desktop-module-list::-webkit-scrollbar-thumb,
  #mobile-module-list::-webkit-scrollbar-thumb {
    background: #cbd5e0;
    border-radius: 10px;
  }

  .dark #desktop-module-list::-webkit-scrollbar-thumb,
  .dark #mobile-module-list::-webkit-scrollbar-thumb {
    background: #6b7280;
  }

  #desktop-module-list::-webkit-scrollbar-thumb:hover,
  #mobile-module-list::-webkit-scrollbar-thumb:hover {
    background: #a0aec0;
  }

  .dark #desktop-module-list::-webkit-scrollbar-thumb:hover,
  .dark #mobile-module-list::-webkit-scrollbar-thumb:hover {
    background: #9ca3af;
  }

  .line-clamp-1 {
    display: -webkit-box;
    -webkit-line-clamp: 1;
    -webkit-box-orient: vertical;
    overflow: hidden;
  }

  .line-clamp-2 {
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    overflow: hidden;
  }

  @media (max-width: 768px) {
    .module-item .module-content {
      padding: 0.75rem;
    }
    
    .module-item h4 {
      font-size: 0.9375rem;
    }
    
    .module-item p {
      font-size: 0.8125rem;
    }
  }

  .btn:disabled {
    opacity: 0.7;
    cursor: not-allowed;
  }
`;
document.head.appendChild(style);