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
  // ... (your course data remains the same)
];

// Document Data with real PDF links and images
const documentData = [
  // ... (your document data remains the same)
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
            console.log('User loaded from storage:', currentUser);
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
        isDarkMode = true;
    }
    
    // Update auth UI
    updateAuthUI();
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

    // Navigation links - FIXED
    const navLinks = document.querySelectorAll(".nav-link");
    navLinks.forEach((link) => {
        link.addEventListener("click", (e) => {
            e.preventDefault();
            const href = link.getAttribute("href");
            if (href && href.startsWith("#")) {
                const page = href.substring(1);
                window.location.hash = page;
                closeMobileMenu();
            }
        });
    });

    // Logout button
    if (logoutBtn) {
        logoutBtn.addEventListener("click", logout);
    }

    // Mobile menu toggle
    if (mobileMenuBtn && mobileMenu) {
        mobileMenuBtn.addEventListener("click", toggleMobileMenu);
        
        // Close mobile menu when clicking outside
        document.addEventListener("click", (e) => {
            if (!mobileMenu.classList.contains("hidden") &&
                !mobileMenu.contains(e.target) &&
                !mobileMenuBtn.contains(e.target)) {
                closeMobileMenu();
            }
        });
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

    // Contact form - FIXED selector
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

        // Course card click - FIXED
        if (e.target.closest(".course-card")) {
            const card = e.target.closest(".course-card");
            const courseId = parseInt(card.dataset.courseId);
            if (courseId && !e.target.closest('.view-details-btn')) {
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
        themeIcon.className = isDarkMode ? "fas fa-sun" : "fas fa-moon";
    }
    localStorage.setItem("learnhub_theme", isDarkMode ? "dark" : "light");
}

// Page management - FIXED
function showPage(page) {
    // Don't show dashboard if not logged in
    if (page === "dashboard" && !currentUser) {
        showLoginModal();
        window.location.hash = "home";
        return;
    }

    // Hide all pages
    document.querySelectorAll(".page").forEach((p) => {
        p.classList.add("page-hidden");
    });

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

// Mobile menu functions - FIXED
function toggleMobileMenu() {
    if (mobileMenu) {
        mobileMenu.classList.toggle("hidden");
        const icon = mobileMenuBtn.querySelector("i");
        if (mobileMenu.classList.contains("hidden")) {
            icon.className = "fas fa-bars";
        } else {
            icon.className = "fas fa-times";
        }
    }
}

function closeMobileMenu() {
    if (mobileMenu) {
        mobileMenu.classList.add("hidden");
        const icon = mobileMenuBtn.querySelector("i");
        if (icon) {
            icon.className = "fas fa-bars";
        }
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

    // Mock login
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

    // Refresh documents
    loadAllDocuments();
    loadFeaturedDocuments();

    showToast("Login successful! Welcome to LearnHub.", "success");

    // Close mobile menu
    closeMobileMenu();

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

    // Refresh documents
    loadAllDocuments();
    loadFeaturedDocuments();

    showToast("Registration successful! Welcome to LearnHub.", "success");

    // Close mobile menu
    closeMobileMenu();

    // Redirect to dashboard
    window.location.hash = "dashboard";
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

// Update auth UI - FIXED
function updateAuthUI() {
    const guestButtons = document.getElementById('guest-buttons');
    const userMenu = document.getElementById('user-menu');
    const userInfo = userMenu ? userMenu.querySelector('.user-info') : null;
    
    // Mobile elements
    const mobileGuestButtons = document.getElementById('mobile-guest-buttons');
    const mobileUserMenu = document.getElementById('mobile-user-menu');
    const mobileUserName = mobileUserMenu ? mobileUserMenu.querySelector('#mobile-user-name') : null;
    const mobileUserEmail = mobileUserMenu ? mobileUserMenu.querySelector('#mobile-user-email') : null;
    
    if (currentUser) {
        // User IS logged in
        console.log('Showing user menu, hiding guest buttons');
        
        // Desktop
        if (guestButtons) {
            guestButtons.style.display = 'none';
        }
        
        if (userMenu) {
            userMenu.style.display = 'flex';
            
            // Update user info
            if (userInfo) {
                userInfo.innerHTML = `
                    <div class="flex items-center gap-2">
                        <div class="w-8 h-8 rounded-full bg-gradient-to-br from-primary to-purple-500 flex items-center justify-center">
                            <i class="fas fa-user text-sm text-white"></i>
                        </div>
                        <div class="hidden md:block">
                            <p class="text-sm font-medium">${currentUser.name}</p>
                            <p class="text-xs text-muted-foreground">${currentUser.email}</p>
                        </div>
                    </div>
                `;
            }
        }
        
        // Mobile
        if (mobileGuestButtons) {
            mobileGuestButtons.style.display = 'none';
        }
        
        if (mobileUserMenu) {
            mobileUserMenu.style.display = 'flex';
            
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
        console.log('Showing guest buttons, hiding user menu');
        
        // Desktop
        if (guestButtons) {
            guestButtons.style.display = 'flex';
        }
        
        if (userMenu) {
            userMenu.style.display = 'none';
        }
        
        // Mobile
        if (mobileGuestButtons) {
            mobileGuestButtons.style.display = 'block';
        }
        
        if (mobileUserMenu) {
            mobileUserMenu.style.display = 'none';
        }
    }
}

// Modal functions - FIXED
function showLoginModal() {
    // Create modal if it doesn't exist
    if (!document.getElementById("login-modal")) {
        createLoginModal();
    }

    const loginModal = document.getElementById("login-modal");
    if (loginModal) {
        loginModal.style.display = 'flex';
        document.body.style.overflow = "hidden";
    }
}

function createLoginModal() {
    const modalHTML = `
        <div id="login-modal" class="modal" style="display: none;">
            <div class="modal-content">
                <div class="p-6">
                    <div class="flex justify-between items-center mb-6">
                        <h2 class="text-2xl font-bold">Login to LearnHub</h2>
                        <button onclick="closeLoginModal()" class="p-2 hover:bg-gray-100 rounded-lg transition-colors">
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
                        Don't have an account? <button type="button" onclick="closeLoginModal(); showRegisterModal();" class="text-primary hover:underline font-medium">Register here</button>
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
        modal.style.display = 'none';
        document.body.style.overflow = "auto";
    }
}

function showRegisterModal() {
    // Create modal if it doesn't exist
    if (!document.getElementById("register-modal")) {
        createRegisterModal();
    }

    const registerModal = document.getElementById("register-modal");
    if (registerModal) {
        registerModal.style.display = 'flex';
        document.body.style.overflow = "hidden";
    }
}

function createRegisterModal() {
    const modalHTML = `
        <div id="register-modal" class="modal" style="display: none;">
            <div class="modal-content">
                <div class="p-6">
                    <div class="flex justify-between items-center mb-6">
                        <h2 class="text-2xl font-bold">Create Account</h2>
                        <button onclick="closeRegisterModal()" class="p-2 hover:bg-gray-100 rounded-lg transition-colors">
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
                        Already have an account? <button type="button" onclick="closeRegisterModal(); showLoginModal();" class="text-primary hover:underline font-medium">Login here</button>
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
        modal.style.display = 'none';
        document.body.style.overflow = "auto";
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

// Create course card HTML with images - FIXED
function createCourseCard(course) {
    const isPurchased = purchasedCourses.includes(course.id);

    return `
        <div class="card card-hover course-card" data-course-id="${course.id}">
            <div class="relative aspect-video overflow-hidden rounded-t-xl">
                <img src="${course.image}" alt="${course.title}" class="w-full h-full object-cover transition-transform duration-300 hover:scale-105">
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
        <button class="btn border px-4 py-2 rounded-lg bg-primary text-white" data-category="all">All</button>
        ${allCategories.map((category) => 
            `<button class="btn border px-4 py-2 rounded-lg bg-transparent text-foreground border-gray-300 hover:bg-gray-100" data-category="${category.name}">${category.name}</button>`
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

// Create document card HTML with images - FIXED
function createDocumentCard(doc) {
    const isLoggedIn = !!currentUser;

    return `
        <div class="card card-hover">
            <div class="p-5">
                <div class="flex items-center justify-between mb-4">
                    <div class="h-12 w-12 rounded-lg overflow-hidden">
                        <img src="${doc.image}" alt="${doc.title}" class="w-full h-full object-cover">
                    </div>
                    <span class="text-xs px-3 py-1 rounded-full bg-gray-100 dark:bg-gray-800 text-gray-800 dark:text-gray-200">${doc.category}</span>
                </div>
                
                <h3 class="mb-2 font-bold text-lg line-clamp-2">${doc.title}</h3>
                <p class="mb-4 text-sm text-gray-600 dark:text-gray-400 line-clamp-2">${doc.description}</p>
                
                <div class="flex items-center justify-between mb-5">
                    <span class="text-xs text-gray-500 dark:text-gray-400">
                        <i class="fas fa-external-link-alt mr-1"></i> ${doc.source}
                    </span>
                    ${doc.pages ? `<span class="text-xs text-gray-500 dark:text-gray-400">${doc.pages} pages</span>` : ""}
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
        <button class="btn border px-4 py-2 rounded-lg bg-primary text-white" data-category="all">All</button>
        ${uniqueCategories.map((category) => 
            `<button class="btn border px-4 py-2 rounded-lg bg-transparent text-foreground border-gray-300 hover:bg-gray-100" data-category="${category}">${category}</button>`
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

    if (courseDetailCategory) {
        courseDetailCategory.textContent = course.category;
        courseDetailCategory.className = "badge badge-primary";
    }
    if (courseDetailTitle) courseDetailTitle.textContent = course.title;
    if (courseDetailDescription) courseDetailDescription.textContent = course.description;
    if (courseDetailPrice) courseDetailPrice.textContent = `$${course.price.toFixed(2)}`;
    if (courseDuration) courseDuration.textContent = course.duration;
    if (courseVideos) courseVideos.textContent = "1 Video";

    // Update learning points
    const learningPointsList = document.getElementById("course-learning-points");
    if (learningPointsList) {
        learningPointsList.innerHTML = course.learningPoints.map((point) => `
            <li class="flex items-start mb-2">
                <i class="fas fa-check text-green-500 mt-1 mr-3"></i>
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
    document.querySelectorAll(".page").forEach((p) => p.classList.add("page-hidden"));
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
                <p class="text-gray-600 dark:text-gray-300 mb-4">Click below to start learning</p>
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
                <p class="text-gray-600 dark:text-gray-300 mb-4">Purchase this course to unlock the video</p>
                ${currentUser ? 
                    `<button class="btn btn-primary purchase-course-btn" data-course-id="${courseId}">
                        <i class="fas fa-shopping-cart mr-2"></i> Purchase to Unlock
                    </button>` : 
                    `<button class="btn btn-primary" onclick="showLoginModal()">
                        <i class="fas fa-sign-in-alt mr-2"></i> Login to Purchase
                    </button>`
                }
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

// Purchase course function
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
                        <p class="text-sm text-gray-600 dark:text-gray-400">Purchases are now available</p>
                    </div>
                </div>
                <span class="text-sm text-gray-500 dark:text-gray-400">(08:00 - 22:00)</span>
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
                        <p class="text-sm text-gray-600 dark:text-gray-400">Next opening in ${hoursUntilOpen} hours</p>
                    </div>
                </div>
                <span class="text-sm text-gray-500 dark:text-gray-400">(08:00 - 22:00)</span>
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

// Update dashboard - FIXED
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

    // Update stats - FIXED selectors
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
                    <div class="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-gray-100 dark:bg-gray-800">
                        <i class="fas fa-book-open text-gray-500 dark:text-gray-400 text-2xl"></i>
                    </div>
                    <h4 class="mb-2 font-medium">No courses yet</h4>
                    <p class="text-sm text-gray-600 dark:text-gray-400 mb-4">Start your learning journey by purchasing your first course</p>
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
                    <div class="flex items-center justify-between border-b border-gray-200 dark:border-gray-700 py-4 last:border-b-0">
                        <div class="flex items-center gap-4">
                            <div class="h-12 w-12 rounded-lg overflow-hidden flex-shrink-0">
                                <img src="${course.image}" alt="${course.title}" class="w-full h-full object-cover">
                            </div>
                            <div>
                                <h4 class="font-medium">${course.title}</h4>
                                <p class="text-sm text-gray-600 dark:text-gray-400">${course.category} • ${course.duration}</p>
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
                    <div class="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-gray-100 dark:bg-gray-800">
                        <i class="fas fa-receipt text-gray-500 dark:text-gray-400 text-2xl"></i>
                    </div>
                    <h4 class="mb-2 font-medium">No transactions yet</h4>
                    <p class="text-sm text-gray-600 dark:text-gray-400">Your purchase history will appear here</p>
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
                                    <p class="text-xs text-gray-600 dark:text-gray-400 mt-1">${formattedDate} at ${formattedTime}</p>
                                </div>
                                <span class="font-bold text-lg">$${transaction.amount.toFixed(2)}</span>
                            </div>
                            <div class="mt-2 text-sm">
                                <span class="inline-block bg-gray-100 dark:bg-gray-800 text-gray-800 dark:text-gray-200 px-2 py-1 rounded text-xs">${transaction.courseCategory}</span>
                                <span class="text-gray-600 dark:text-gray-400 ml-2">${transaction.courseInstructor}</span>
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

// Toast notification - FIXED
function showToast(message, type = "success") {
    // Remove existing toasts
    document.querySelectorAll(".toast").forEach((toast) => toast.remove());

    const icon = type === "success" ? "fa-check-circle" : type === "error" ? "fa-exclamation-circle" : "fa-info-circle";
    const bgColor = type === "success" ? "bg-green-100 border-green-300" : 
                   type === "error" ? "bg-red-100 border-red-300" : 
                   "bg-blue-100 border-blue-300";
    const textColor = type === "success" ? "text-green-800" : 
                     type === "error" ? "text-red-800" : 
                     "text-blue-800";

    const toast = document.createElement("div");
    toast.className = `toast fixed top-4 right-4 ${bgColor} border ${textColor} px-4 py-3 rounded-lg shadow-lg z-50 flex items-center gap-3`;
    toast.innerHTML = `
        <i class="fas ${icon}"></i>
        <div class="flex-1">
            <p class="text-sm font-medium">${message}</p>
        </div>
        <button class="text-gray-600 hover:text-gray-800" onclick="this.parentElement.remove()">
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
// Add these functions to your JavaScript file

function updateDashboard() {
    if (!appState.currentUser) {
        alert('Please login to access the dashboard');
        window.location.hash = 'home';
        return;
    }

    // Update welcome message
    const welcomeMessage = document.getElementById('welcome-message');
    const welcomeEmail = document.getElementById('welcome-email');
    const dashboardUserName = document.getElementById('dashboard-user-name');
    const dashboardUserEmail = document.getElementById('dashboard-user-email');
    
    if (welcomeMessage && dashboardUserName) {
        const firstName = appState.currentUser.firstName || 'User';
        welcomeMessage.textContent = `Welcome, ${appState.currentUser.firstName} ${appState.currentUser.lastName}!`;
        dashboardUserName.textContent = `${appState.currentUser.firstName} ${appState.currentUser.lastName}`;
        dashboardUserEmail.textContent = appState.currentUser.email;
        welcomeEmail.textContent = `Here are your purchased video courses.`;
    }

    // Update system status
    updateDashboardSystemStatus();

    // Load user's purchased courses
    loadUserCourses();

    // Load user's receipts
    loadUserReceipts();

    // Update stats
    updateDashboardStats();
}

function updateDashboardSystemStatus() {
    const statusBadge = document.getElementById('dashboard-system-status');
    if (statusBadge) {
        if (appState.isSystemOpen) {
            statusBadge.className = 'badge bg-success';
            statusBadge.textContent = 'Open';
        } else {
            statusBadge.className = 'badge bg-danger';
            statusBadge.textContent = 'Closed';
        }
    }
}

function loadUserCourses() {
    const coursesContainer = document.getElementById('user-courses-container');
    if (!coursesContainer || !appState.currentUser) return;

    const purchasedCourses = appState.currentUser.purchasedCourses || [];
    
    if (purchasedCourses.length === 0) {
        coursesContainer.innerHTML = `
            <div class="text-center py-4">
                <i class="fas fa-shopping-cart fa-3x text-muted mb-3"></i>
                <h5>No courses purchased yet</h5>
                <p class="text-muted">Browse our courses to get started!</p>
                <button class="btn btn-primary" onclick="window.location.hash = 'courses'">
                    Browse Courses
                </button>
            </div>
        `;
        return;
    }

    let coursesHTML = '';
    purchasedCourses.forEach(purchase => {
        const course = courses.find(c => c.id === purchase.courseId);
        if (course) {
            coursesHTML += `
                <div class="course-item card border-0 shadow-sm mb-3">
                    <div class="card-body">
                        <div class="row align-items-center">
                            <div class="col-md-2 text-center">
                                <span class="course-icon d-inline-flex align-items-center justify-content-center rounded-circle bg-primary bg-opacity-10 text-primary" 
                                      style="width: 50px; height: 50px;">
                                    <i class="${course.icon || 'fas fa-play-circle'}"></i>
                                </span>
                            </div>
                            <div class="col-md-8">
                                <h6 class="fw-bold mb-1">${course.title}</h6>
                                <p class="text-muted small mb-1">${course.category} • ${course.subCategory}</p>
                                <p class="mb-1">${course.description}</p>
                                <small class="text-success">
                                    <i class="fas fa-check-circle me-1"></i>
                                    Purchased on ${new Date(purchase.purchaseDate).toLocaleDateString()}
                                </small>
                            </div>
                            <div class="col-md-2 text-end">
                                <button class="btn btn-primary btn-sm" onclick="watchCourse(${course.id})">
                                    <i class="fas fa-play me-1"></i> Watch
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            `;
        }
    });

    coursesContainer.innerHTML = coursesHTML;
}

function loadUserReceipts() {
    const receiptsContainer = document.getElementById('receipts-container');
    if (!receiptsContainer || !appState.currentUser) return;

    const receipts = appState.currentUser.receipts || [];
    
    if (receipts.length === 0) {
        receiptsContainer.innerHTML = `
            <div class="text-center py-3">
                <i class="fas fa-file-invoice-dollar fa-2x text-muted mb-2"></i>
                <p class="text-muted small">No purchase history yet</p>
            </div>
        `;
        return;
    }

    let receiptsHTML = '';
    receipts.slice(0, 5).forEach(receipt => { // Show only latest 5 receipts
        const course = courses.find(c => c.id === receipt.courseId);
        if (course) {
            receiptsHTML += `
                <div class="receipt-item border-bottom pb-3 mb-3">
                    <div class="d-flex justify-content-between align-items-start mb-1">
                        <div>
                            <span class="badge bg-light text-dark mb-2">Receipt #${receipt.id}</span>
                            <h6 class="fw-bold mb-1">${course.title}</h6>
                        </div>
                        <div class="text-end">
                            <div class="fw-bold text-primary">$${receipt.price.toFixed(2)}</div>
                            <small class="text-muted">${new Date(receipt.date).toLocaleDateString()}</small>
                        </div>
                    </div>
                    <div class="d-flex justify-content-between align-items-center">
                        <small class="text-muted">
                            <i class="fas fa-calendar me-1"></i>
                            ${new Date(receipt.date).toLocaleString()}
                        </small>
                        <button class="btn btn-outline-primary btn-sm" onclick="viewReceipt(${receipt.id})">
                            View Receipt
                        </button>
                    </div>
                </div>
            `;
        }
    });

    // Add "View All" button if there are more than 5 receipts
    if (receipts.length > 5) {
        receiptsHTML += `
            <div class="text-center">
                <button class="btn btn-outline-secondary btn-sm" onclick="viewAllReceipts()">
                    View All Receipts (${receipts.length})
                </button>
            </div>
        `;
    }

    receiptsContainer.innerHTML = receiptsHTML;
}

function updateDashboardStats() {
    if (!appState.currentUser) return;

    const purchasedCount = document.getElementById('statsCourses');
    const documentsCount = document.getElementById('statsDocuments');
    const transactionsCount = document.getElementById('statsTransactions');
    const totalSpent = document.getElementById('statsSpent');

    const purchasedCourses = appState.currentUser.purchasedCourses || [];
    const receipts = appState.currentUser.receipts || [];

    if (purchasedCount) purchasedCount.textContent = purchasedCourses.length;
    if (documentsCount) documentsCount.textContent = '21+'; // Static for demo
    if (transactionsCount) transactionsCount.textContent = receipts.length;
    
    if (totalSpent) {
        const total = receipts.reduce((sum, receipt) => sum + receipt.price, 0);
        totalSpent.textContent = `$${total.toFixed(2)}`;
    }
}

function watchCourse(courseId) {
    // In a real app, this would redirect to the course player
    // For demo, we'll show an alert
    const course = courses.find(c => c.id === courseId);
    if (course) {
        alert(`Now playing: ${course.title}\n\nThis is a demo. In a real application, you would be redirected to the video player.`);
    }
}

function viewReceipt(receiptId) {
    const receipt = appState.currentUser?.receipts?.find(r => r.id === receiptId);
    if (!receipt) return;

    const course = courses.find(c => c.id === receipt.courseId);
    if (!course) return;

    const receiptHTML = `
        <div class="receipt-details">
            <div class="text-center mb-4">
                <h4 class="fw-bold text-primary">LearnHub</h4>
                <p class="text-muted">E-Learning Platform</p>
            </div>
            
            <div class="row mb-4">
                <div class="col">
                    <h5 class="fw-bold mb-3">Receipt Details</h5>
                    <table class="table table-bordered">
                        <tr>
                            <td><strong>Receipt ID:</strong></td>
                            <td>#${receipt.id}</td>
                        </tr>
                        <tr>
                            <td><strong>Date:</strong></td>
                            <td>${new Date(receipt.date).toLocaleString()}</td>
                        </tr>
                        <tr>
                            <td><strong>Customer:</strong></td>
                            <td>${appState.currentUser.firstName} ${appState.currentUser.lastName}</td>
                        </tr>
                        <tr>
                            <td><strong>Email:</strong></td>
                            <td>${appState.currentUser.email}</td>
                        </tr>
                    </table>
                </div>
            </div>

            <div class="row mb-4">
                <div class="col">
                    <h5 class="fw-bold mb-3">Course Details</h5>
                    <table class="table table-bordered">
                        <tr>
                            <td><strong>Course:</strong></td>
                            <td>${course.title}</td>
                        </tr>
                        <tr>
                            <td><strong>Category:</strong></td>
                            <td>${course.category}</td>
                        </tr>
                        <tr>
                            <td><strong>Price:</strong></td>
                            <td>$${receipt.price.toFixed(2)}</td>
                        </tr>
                    </table>
                </div>
            </div>

            <div class="row">
                <div class="col">
                    <div class="alert alert-info">
                        <i class="fas fa-info-circle me-2"></i>
                        This receipt is stored in your browser's localStorage. It will be cleared if you clear browser data.
                    </div>
                </div>
            </div>
        </div>
    `;

    // Create a modal to show receipt
    const modal = new bootstrap.Modal(document.createElement('div'));
    modal._element.className = 'modal fade';
    modal._element.innerHTML = `
        <div class="modal-dialog modal-lg">
            <div class="modal-content">
                <div class="modal-header bg-primary text-white">
                    <h5 class="modal-title">
                        <i class="fas fa-receipt me-2"></i> Receipt #${receipt.id}
                    </h5>
                    <button type="button" class="btn-close btn-close-white" data-bs-dismiss="modal"></button>
                </div>
                <div class="modal-body">
                    ${receiptHTML}
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                    <button type="button" class="btn btn-primary" onclick="printReceipt(${receiptId})">
                        <i class="fas fa-print me-2"></i> Print
                    </button>
                </div>
            </div>
        </div>
    `;
    
    document.body.appendChild(modal._element);
    modal.show();
    
    // Remove modal from DOM after it's hidden
    modal._element.addEventListener('hidden.bs.modal', function () {
        document.body.removeChild(modal._element);
    });
}

function printReceipt(receiptId) {
    const receipt = appState.currentUser?.receipts?.find(r => r.id === receiptId);
    if (!receipt) return;

    const course = courses.find(c => c.id === receipt.courseId);
    if (!course) return;

    const printWindow = window.open('', '_blank');
    printWindow.document.write(`
        <!DOCTYPE html>
        <html>
        <head>
            <title>Receipt #${receipt.id}</title>
            <style>
                body { font-family: Arial, sans-serif; padding: 20px; }
                .receipt { max-width: 600px; margin: 0 auto; border: 1px solid #ddd; padding: 30px; }
                .header { text-align: center; margin-bottom: 30px; }
                .header h1 { color: #4361ee; margin: 0; }
                .header p { color: #666; margin: 5px 0; }
                .divider { border-top: 2px dashed #ddd; margin: 20px 0; }
                table { width: 100%; border-collapse: collapse; margin: 10px 0; }
                td { padding: 8px; border: 1px solid #ddd; }
                .total { font-size: 1.2em; font-weight: bold; text-align: right; }
                .footer { margin-top: 30px; text-align: center; color: #666; font-size: 0.9em; }
                @media print {
                    body { padding: 0; }
                    .no-print { display: none; }
                }
            </style>
        </head>
        <body>
            <div class="receipt">
                <div class="header">
                    <h1>LearnHub</h1>
                    <p>E-Learning Platform</p>
                    <p>123 Learning Street, Tech City</p>
                </div>
                
                <div class="divider"></div>
                
                <h2>Receipt #${receipt.id}</h2>
                <p><strong>Date:</strong> ${new Date(receipt.date).toLocaleString()}</p>
                
                <div class="divider"></div>
                
                <h3>Customer Information</h3>
                <table>
                    <tr>
                        <td><strong>Name:</strong></td>
                        <td>${appState.currentUser.firstName} ${appState.currentUser.lastName}</td>
                    </tr>
                    <tr>
                        <td><strong>Email:</strong></td>
                        <td>${appState.currentUser.email}</td>
                    </tr>
                </table>
                
                <div class="divider"></div>
                
                <h3>Course Details</h3>
                <table>
                    <tr>
                        <td><strong>Course:</strong></td>
                        <td>${course.title}</td>
                    </tr>
                    <tr>
                        <td><strong>Category:</strong></td>
                        <td>${course.category}</td>
                    </tr>
                    <tr>
                        <td><strong>Sub-Category:</strong></td>
                        <td>${course.subCategory}</td>
                    </tr>
                </table>
                
                <div class="divider"></div>
                
                <table>
                    <tr>
                        <td><strong>Price:</strong></td>
                        <td>$${receipt.price.toFixed(2)}</td>
                    </tr>
                    <tr class="total">
                        <td><strong>TOTAL:</strong></td>
                        <td>$${receipt.price.toFixed(2)}</td>
                    </tr>
                </table>
                
                <div class="divider"></div>
                
                <div class="footer">
                    <p>Thank you for your purchase!</p>
                    <p>This receipt is for demonstration purposes only.</p>
                    <p>Receipt generated on ${new Date().toLocaleString()}</p>
                </div>
            </div>
            
            <div class="no-print" style="margin-top: 20px; text-align: center;">
                <button onclick="window.print()" style="padding: 10px 20px; background: #4361ee; color: white; border: none; border-radius: 5px; cursor: pointer;">
                    Print Receipt
                </button>
                <button onclick="window.close()" style="padding: 10px 20px; background: #666; color: white; border: none; border-radius: 5px; cursor: pointer; margin-left: 10px;">
                    Close
                </button>
            </div>
        </body>
        </html>
    `);
    printWindow.document.close();
}

function printAllReceipts() {
    if (!appState.currentUser || !appState.currentUser.receipts || appState.currentUser.receipts.length === 0) {
        alert('No receipts to print');
        return;
    }

    // Create a printable document with all receipts
    const printWindow = window.open('', '_blank');
    let receiptsHTML = '';
    
    appState.currentUser.receipts.forEach(receipt => {
        const course = courses.find(c => c.id === receipt.courseId);
        if (course) {
            receiptsHTML += `
                <div class="receipt" style="page-break-after: always; margin-bottom: 40px;">
                    <div class="header" style="text-align: center; margin-bottom: 30px;">
                        <h1 style="color: #4361ee; margin: 0;">LearnHub</h1>
                        <p style="color: #666; margin: 5px 0;">E-Learning Platform</p>
                        <p>123 Learning Street, Tech City</p>
                    </div>
                    
                    <div style="border-top: 2px dashed #ddd; margin: 20px 0;"></div>
                    
                    <h2>Receipt #${receipt.id}</h2>
                    <p><strong>Date:</strong> ${new Date(receipt.date).toLocaleString()}</p>
                    
                    <div style="border-top: 2px dashed #ddd; margin: 20px 0;"></div>
                    
                    <h3>Customer Information</h3>
                    <table style="width: 100%; border-collapse: collapse; margin: 10px 0;">
                        <tr>
                            <td style="padding: 8px; border: 1px solid #ddd;"><strong>Name:</strong></td>
                            <td style="padding: 8px; border: 1px solid #ddd;">${appState.currentUser.firstName} ${appState.currentUser.lastName}</td>
                        </tr>
                        <tr>
                            <td style="padding: 8px; border: 1px solid #ddd;"><strong>Email:</strong></td>
                            <td style="padding: 8px; border: 1px solid #ddd;">${appState.currentUser.email}</td>
                        </tr>
                    </table>
                    
                    <div style="border-top: 2px dashed #ddd; margin: 20px 0;"></div>
                    
                    <h3>Course Details</h3>
                    <table style="width: 100%; border-collapse: collapse; margin: 10px 0;">
                        <tr>
                            <td style="padding: 8px; border: 1px solid #ddd;"><strong>Course:</strong></td>
                            <td style="padding: 8px; border: 1px solid #ddd;">${course.title}</td>
                        </tr>
                        <tr>
                            <td style="padding: 8px; border: 1px solid #ddd;"><strong>Category:</strong></td>
                            <td style="padding: 8px; border: 1px solid #ddd;">${course.category}</td>
                        </tr>
                        <tr>
                            <td style="padding: 8px; border: 1px solid #ddd;"><strong>Price:</strong></td>
                            <td style="padding: 8px; border: 1px solid #ddd;">$${receipt.price.toFixed(2)}</td>
                        </tr>
                    </table>
                    
                    <div style="border-top: 2px dashed #ddd; margin: 20px 0;"></div>
                    
                    <div style="margin-top: 30px; text-align: center; color: #666; font-size: 0.9em;">
                        <p>Thank you for your purchase!</p>
                        <p>This receipt is for demonstration purposes only.</p>
                    </div>
                </div>
            `;
        }
    });

    printWindow.document.write(`
        <!DOCTYPE html>
        <html>
        <head>
            <title>All Receipts - ${appState.currentUser.firstName} ${appState.currentUser.lastName}</title>
            <style>
                body { font-family: Arial, sans-serif; padding: 20px; }
                @media print {
                    body { padding: 0; }
                    .no-print { display: none; }
                }
            </style>
        </head>
        <body>
            <div class="no-print" style="text-align: center; margin-bottom: 20px;">
                <h1>All Receipts - ${appState.currentUser.firstName} ${appState.currentUser.lastName}</h1>
                <p>Total Receipts: ${appState.currentUser.receipts.length}</p>
                <button onclick="window.print()" style="padding: 10px 20px; background: #4361ee; color: white; border: none; border-radius: 5px; cursor: pointer;">
                    Print All Receipts
                </button>
                <button onclick="window.close()" style="padding: 10px 20px; background: #666; color: white; border: none; border-radius: 5px; cursor: pointer; margin-left: 10px;">
                    Close
                </button>
            </div>
            ${receiptsHTML}
        </body>
        </html>
    `);
    printWindow.document.close();
}

function viewAllReceipts() {
    // Show modal with all receipts
    if (!appState.currentUser || !appState.currentUser.receipts || appState.currentUser.receipts.length === 0) {
        alert('No receipts available');
        return;
    }

    let receiptsHTML = '<div class="table-responsive"><table class="table table-hover">';
    receiptsHTML += `
        <thead>
            <tr>
                <th>Receipt ID</th>
                <th>Course</th>
                <th>Amount</th>
                <th>Date</th>
                <th>Action</th>
            </tr>
        </thead>
        <tbody>
    `;

    appState.currentUser.receipts.forEach(receipt => {
        const course = courses.find(c => c.id === receipt.courseId);
        if (course) {
            receiptsHTML += `
                <tr>
                    <td>#${receipt.id}</td>
                    <td>${course.title}</td>
                    <td>$${receipt.price.toFixed(2)}</td>
                    <td>${new Date(receipt.date).toLocaleDateString()}</td>
                    <td>
                        <button class="btn btn-sm btn-outline-primary" onclick="viewReceipt(${receipt.id})">
                            View
                        </button>
                    </td>
                </tr>
            `;
        }
    });

    receiptsHTML += '</tbody></table></div>';

    const modal = new bootstrap.Modal(document.createElement('div'));
    modal._element.className = 'modal fade';
    modal._element.innerHTML = `
        <div class="modal-dialog modal-xl">
            <div class="modal-content">
                <div class="modal-header bg-primary text-white">
                    <h5 class="modal-title">
                        <i class="fas fa-receipt me-2"></i>
                        All Receipts (${appState.currentUser.receipts.length})
                    </h5>
                    <button type="button" class="btn-close btn-close-white" data-bs-dismiss="modal"></button>
                </div>
                <div class="modal-body">
                    ${receiptsHTML}
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                    <button type="button" class="btn btn-primary" onclick="printAllReceipts()">
                        <i class="fas fa-print me-2"></i> Print All
                    </button>
                </div>
            </div>
        </div>
    `;
    
    document.body.appendChild(modal._element);
    modal.show();
    
    modal._element.addEventListener('hidden.bs.modal', function () {
        document.body.removeChild(modal._element);
    });
}

// Add event listener for logout button in dashboard
document.getElementById('logout-btn-dashboard')?.addEventListener('click', function() {
    logout();
});

// Add this to your initApp function
function initApp() {
    // ... existing code ...
    
    // Check for logged in user
    const user = localStorage.getItem('currentUser');
    if (user) {
        appState.currentUser = JSON.parse(user);
        updateAuthUI();
        
        // Update dashboard if user navigates to it
        if (window.location.hash === '#dashboard') {
            updateDashboard();
        }
    }
    
    // ... rest of init code ...
}

// Add this to your showPage function
function showPage(pageName) {
    // ... existing code ...
    
    switch(pageName) {
        case 'dashboard':
            updateDashboard();
            break;
        // ... other cases ...
    }
}
// Dashboard functionality
function loadDashboard() {
  if (!isLoggedIn) {
    showLoginModal();
    return;
  }
  
  // Update welcome message
  document.getElementById('welcome-message').textContent = `Welcome, ${currentUser.name}!`;
  document.getElementById('welcome-email').textContent = currentUser.email;
  document.getElementById('dashboard-user-name').textContent = currentUser.name;
  document.getElementById('dashboard-user-email').textContent = currentUser.email;
  
  // Load user's purchased courses
  loadUserCourses();
  
  // Load receipt history
  loadReceipts();
  
  // Update system status
  updateSystemStatus('dashboard-system-status');
}

function loadUserCourses() {
  const userCoursesContainer = document.getElementById('user-courses-container');
  const purchasedCoursesList = document.getElementById('purchased-courses-list');
  
  if (!currentUser || !currentUser.purchasedCourses || currentUser.purchasedCourses.length === 0) {
    return;
  }
  
  // Clear existing content
  userCoursesContainer.innerHTML = '';
  purchasedCoursesList.innerHTML = '';
  
  // Group courses by category
  const groupedCourses = {};
  currentUser.purchasedCourses.forEach(courseId => {
    const course = courses.find(c => c.id === courseId);
    if (course) {
      if (!groupedCourses[course.category]) {
        groupedCourses[course.category] = [];
      }
      groupedCourses[course.category].push(course);
    }
  });
  
  // Display courses in user-courses-container
  Object.keys(groupedCourses).forEach(category => {
    const categoryCourses = groupedCourses[category];
    
    categoryCourses.forEach(course => {
      const courseElement = document.createElement('div');
      courseElement.className = 'mb-4 p-4 rounded-lg bg-card border border-border';
      courseElement.innerHTML = `
        <div class="flex flex-col sm:flex-row sm:items-center justify-between">
          <div class="mb-3 sm:mb-0">
            <h6 class="font-bold">${course.title}</h6>
            <p class="text-sm text-muted-foreground">${course.category}</p>
            <p class="text-xs text-muted-foreground mt-1">${course.shortDescription}</p>
          </div>
          <button 
            class="btn btn-primary text-sm px-4 py-2"
            onclick="watchCourse('${course.id}')"
          >
            <i class="fas fa-play mr-2"></i> Watch Course
          </button>
        </div>
      `;
      userCoursesContainer.appendChild(courseElement);
    });
  });
  
  // Display courses in purchased-courses-list (similar to your image)
  currentUser.purchasedCourses.forEach(courseId => {
    const course = courses.find(c => c.id === courseId);
    if (course) {
      const courseItem = document.createElement('div');
      courseItem.className = 'mb-6';
      courseItem.innerHTML = `
        <h6 class="font-bold text-lg mb-2">${course.title}</h6>
        <p class="text-sm text-muted-foreground mb-3">${course.category}</p>
        <p class="text-sm mb-3">${course.shortDescription}</p>
        <button 
          class="btn btn-primary text-sm px-4 py-2"
          onclick="watchCourse('${course.id}')"
        >
          <i class="fas fa-play mr-2"></i> Watch Course
        </button>
      `;
      purchasedCoursesList.appendChild(courseItem);
    }
  });
}

function loadReceipts() {
  const receiptsContainer = document.getElementById('receipts-container');
  
  if (!currentUser || !currentUser.receipts || currentUser.receipts.length === 0) {
    return;
  }
  
  receiptsContainer.innerHTML = '';
  
  // Sort receipts by date (newest first)
  const sortedReceipts = [...currentUser.receipts].sort((a, b) => b.id - a.id);
  
  sortedReceipts.forEach(receipt => {
    const course = courses.find(c => c.id === receipt.courseId);
    if (!course) return;
    
    const receiptElement = document.createElement('div');
    receiptElement.className = 'mb-4 p-4 rounded-lg bg-card border border-border';
    receiptElement.innerHTML = `
      <div class="flex justify-between items-start">
        <div>
          <h6 class="font-bold">${course.title}</h6>
          <p class="text-sm text-muted-foreground">Receipt #${receipt.id}</p>
          <p class="text-sm mt-1">Paid: <span class="font-bold">$${receipt.amount}</span></p>
        </div>
        <div class="text-right">
          <p class="text-xs text-muted-foreground">${receipt.date}</p>
          <button 
            class="btn btn-outline text-xs mt-2"
            onclick="viewReceipt('${receipt.id}')"
          >
            View Receipt
          </button>
        </div>
      </div>
    `;
    receiptsContainer.appendChild(receiptElement);
  });
}

function watchCourse(courseId) {
  // Navigate to course detail page
  window.location.hash = `course/${courseId}`;
}

function viewReceipt(receiptId) {
  // Show receipt details (you can implement a modal or separate page)
  alert(`Receipt #${receiptId} details would be shown here.`);
}

function printAllReceipts() {
  if (!currentUser || !currentUser.receipts || currentUser.receipts.length === 0) {
    alert('No receipts to print.');
    return;
  }
  
  // Create printable content
  let printContent = `
    <html>
      <head>
        <title>Receipts - ${currentUser.name}</title>
        <style>
          body { font-family: Arial, sans-serif; padding: 20px; }
          .receipt { border: 1px solid #ddd; padding: 15px; margin-bottom: 15px; }
          .header { text-align: center; margin-bottom: 20px; }
          .total { font-weight: bold; font-size: 18px; margin-top: 20px; }
        </style>
      </head>
      <body>
        <div class="header">
          <h1>Receipt History</h1>
          <p>${currentUser.name} (${currentUser.email})</p>
          <p>Printed on ${new Date().toLocaleDateString()}</p>
        </div>
  `;
  
  let totalAmount = 0;
  currentUser.receipts.forEach(receipt => {
    const course = courses.find(c => c.id === receipt.courseId);
    if (course) {
      printContent += `
        <div class="receipt">
          <h3>${course.title}</h3>
          <p><strong>Receipt #:</strong> ${receipt.id}</p>
          <p><strong>Date:</strong> ${receipt.date}</p>
          <p><strong>Amount:</strong> $${receipt.amount}</p>
        </div>
      `;
      totalAmount += receipt.amount;
    }
  });
  
  printContent += `
        <div class="total">
          Total Spent: $${totalAmount.toFixed(2)}
        </div>
      </body>
    </html>
  `;
  
  // Open print window
  const printWindow = window.open('', '_blank');
  printWindow.document.write(printContent);
  printWindow.document.close();
  printWindow.focus();
  printWindow.print();
}

// Add event listeners for logout buttons
document.getElementById('logout-btn-dashboard')?.addEventListener('click', logout);
document.getElementById('logout-profile-btn')?.addEventListener('click', logout);

// Initialize the application
document.addEventListener("DOMContentLoaded", init);

// Update system status every minute
setInterval(updateSystemStatus, 60000);