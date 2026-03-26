// ============================================
// API Configuration
// ============================================
const API_URL = "/api";

// ============================================
// Strong Encryption for IDs (UUID v4 style)
// ============================================

function generateUUID() {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
    const r = Math.random() * 16 | 0;
    const v = c === 'x' ? r : (r & 0x3 | 0x8);
    return v.toString(16);
  });
}

const encryptionMap = new Map();

function encryptId(id) {
  if (encryptionMap.has(id)) return encryptionMap.get(id);
  const encrypted = generateUUID();
  encryptionMap.set(id, encrypted);
  localStorage.setItem(`encrypt_${id}`, encrypted);
  return encrypted;
}

function decryptId(encryptedId) {
  for (let [key, value] of encryptionMap.entries()) {
    if (value === encryptedId) return key;
  }
  const keys = Object.keys(localStorage);
  for (let key of keys) {
    if (key.startsWith('encrypt_') && localStorage.getItem(key) === encryptedId) {
      const id = parseInt(key.replace('encrypt_', ''));
      encryptionMap.set(id, encryptedId);
      return id;
    }
  }
  return null;
}

async function apiFetch(endpoint, options = {}) {
  const token = localStorage.getItem("learnhub_token");
  const headers = {
    "Content-Type": "application/json",
    Accept: "application/json",
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
    ...options.headers,
  };
  try {
    const res = await fetch(`${API_URL}${endpoint}`, { ...options, headers });
    const data = await res.json();
    if (!res.ok) throw new Error(data.message || "Request failed");
    return data;
  } catch (err) {
    console.error(`API error [${endpoint}]:`, err.message);
    throw err;
  }
}

// ============================================
// Application state
// ============================================
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

// ============================================
// Initialize Application
// ============================================
function init() {
  console.log("Initializing application...");
  currentUser = null;
  purchasedCourses = [];
  transactions = [];
  currentVideoProgress = {};

  const savedUser = localStorage.getItem("learnhub_user");
  const savedToken = localStorage.getItem("learnhub_token");

  if (savedUser && savedToken) {
    try {
      currentUser = JSON.parse(savedUser);
      loadUserDataFromAPI().then(() => {
        updateAuthUI();
        if (currentUser) updateDashboard();
      });
    } catch (e) {
      console.error("Error loading user:", e);
      clearUserData();
    }
  }

  loadCategories();
  loadFeaturedCourses();
  loadAllCourses();
  loadFeaturedDocuments();
  loadAllDocuments();
  updateSystemStatusCard();
  setupEventListeners();

  // Handle both hash and real URL navigation
  handleInitialNavigation();

  window.addEventListener("hashchange", handleHashChange);
  window.addEventListener("popstate", handleInitialNavigation);

  setupTheme();
  updateAuthUI();
  console.log("Application initialized successfully");
}

function handleInitialNavigation() {
  const path = window.location.pathname;

  if (path === '/' || path === '/home') {
    showPage('home');
  } else if (path === '/courses') {
    showPage('courses');
    loadAllCourses();
  } else if (path === '/documents') {
    showPage('documents');
    loadAllDocuments();
  } else if (path === '/about') {
    showPage('about');
  } else if (path === '/contact') {
    showPage('contact');
  } else if (path === '/dashboard') {
    if (currentUser) {
      showPage('dashboard');
      updateDashboard();
    } else {
      showLoginModal();
      window.location.href = '/';
    }
  } else if (path.startsWith('/course/')) {
    const encryptedId = path.split('/course/')[1];
    if (encryptedId) showCourseDetail(encryptedId);
  } else {
    showPage('home');
  }
}

function navigateTo(page) {
  if (page === 'home') {
    window.location.href = '/';
  } else {
    window.location.href = `/${page}`;
  }
}

function escapeHtml(str) {
  if (!str) return '';
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

// ============================================
// API Data Loading
// ============================================
async function loadUserDataFromAPI() {
  try {
    const data = await apiFetch("/dashboard");
    purchasedCourses = data.courses.map((c) => Number(c.course.courseItem_id));
    transactions = data.courses.map((c) => ({
      id: c.payment.payment_id,
      transactionNumber: c.invoice_number,
      courseId: Number(c.course.courseItem_id),
      courseTitle: c.course.title,
      courseCategory: c.course.category?.name || "",
      courseImage: c.course.image,
      courseModules: c.course.video_modules?.length || 0,
      amount: c.amount_paid,
      date: c.paid_at,
      status: "completed",
    }));
    console.log("Loaded from API - purchased:", purchasedCourses);
  } catch (e) {
    console.error("Failed to load user data from API:", e);
    purchasedCourses = [];
    transactions = [];
  }
}

async function loadFeaturedCourses() {
  try {
    const data = await apiFetch("/courses?featured=1");
    const courses = data.courses || [];
    const featuredCoursesGrid = document.getElementById("featured-courses-grid");
    if (featuredCoursesGrid) {
      featuredCoursesGrid.innerHTML =
        courses.length > 0
          ? courses.map((course) => createCourseCardFromAPI(course)).join("")
          : '<div class="col-span-3 text-center py-8 text-gray-500">No featured courses yet</div>';
    }
  } catch (err) {
    console.error("Failed to load featured courses:", err);
  }
}

async function loadAllCourses() {
  try {
    const data = await apiFetch("/courses");
    allCourses = data.courses || [];
    const allCoursesGrid = document.getElementById("all-courses-grid");
    if (allCoursesGrid) {
      allCoursesGrid.innerHTML =
        allCourses.length > 0
          ? allCourses.map((course) => createCourseCardFromAPI(course)).join("")
          : '<div class="text-center py-12 col-span-3"><p class="text-gray-500">No courses available</p></div>';
    }
    const courseResultsCount = document.getElementById("course-results-count");
    const courseTotalCount = document.getElementById("course-total-count");
    if (courseResultsCount) courseResultsCount.textContent = allCourses.length;
    if (courseTotalCount) courseTotalCount.textContent = allCourses.length;
  } catch (err) {
    console.error("Failed to load courses:", err);
    const allCoursesGrid = document.getElementById("all-courses-grid");
    if (allCoursesGrid) {
      allCoursesGrid.innerHTML = '<div class="text-center py-12 col-span-3"><p class="text-red-500">Error loading courses</p></div>';
    }
  }
}

async function loadFeaturedDocuments() {
  try {
    const token = localStorage.getItem("learnhub_token");
    if (!token) return;
    const data = await apiFetch("/documents?featured=1");
    const featured = data.documents || [];
    const featuredDocumentsGrid = document.getElementById("featured-documents-grid");
    if (featuredDocumentsGrid) {
      featuredDocumentsGrid.innerHTML =
        featured.length > 0
          ? featured.map((doc) => createDocumentCardFromAPI(doc)).join("")
          : '<div class="col-span-3 text-center py-8 text-gray-500">No featured documents yet</div>';
    }
  } catch (err) {
    console.error("Failed to load featured documents:", err);
  }
}

async function loadAllDocuments() {
  try {
    const data = await apiFetch("/documents");
    allDocuments = data.documents || [];
    const allDocumentsGrid = document.getElementById("all-documents-grid");
    if (allDocumentsGrid) {
      allDocumentsGrid.innerHTML =
        allDocuments.length > 0
          ? allDocuments.map((doc) => createDocumentCardFromAPI(doc)).join("")
          : '<div class="text-center py-12 col-span-3"><i class="fas fa-file-alt text-gray-300 text-4xl mb-4"></i><p class="text-gray-500">No documents available</p></div>';
    }
    const documentResultsCount = document.getElementById("document-results-count");
    const documentTotalCount = document.getElementById("document-total-count");
    if (documentResultsCount) documentResultsCount.textContent = allDocuments.length;
    if (documentTotalCount) documentTotalCount.textContent = allDocuments.length;

    const loginNotice = document.getElementById("login-notice");
    if (loginNotice) {
      if (currentUser) {
        loginNotice.classList.add("hidden");
      } else {
        loginNotice.classList.remove("hidden");
      }
    }
  } catch (err) {
    console.error("Failed to load documents:", err);
    const allDocumentsGrid = document.getElementById("all-documents-grid");
    if (allDocumentsGrid) {
      allDocumentsGrid.innerHTML = '<div class="text-center py-12 col-span-3"><p class="text-red-500">Error loading documents</p></div>';
    }
  }
}

// ============================================
// Course Card Templates (with encrypted IDs)
// ============================================
function createCourseCardFromAPI(course) {
  const courseId = course.courseItem_id;
  const encryptedId = encryptId(courseId);
  const isPurchased = purchasedCourses.some((id) => Number(id) === Number(courseId));
  const originalPrice = Number(course.price);
  const finalPrice = Number(course.final_price ?? course.price);
  const hasDiscount = finalPrice < originalPrice;
  const promotion = course.active_promotion;

  return `
    <div class="card course-card" data-course-id="${encryptedId}">
      <div class="relative aspect-video overflow-hidden rounded-t-xl">
        <img src="${course.image || "Images/default-course.png"}" alt="${course.title}" class="w-full h-full object-cover">
        <div class="absolute top-4 left-4">
          <span class="badge badge-primary text-xs">${course.category?.name || "General"}</span>
        </div>
        ${isPurchased ? `
          <div class="absolute top-4 right-4">
            <span class="bg-green-500 text-white text-xs px-2 py-1 rounded-full">
              <i class="fas fa-check mr-1"></i> Purchased
            </span>
          </div>` : ''}
        ${hasDiscount ? `
          <div class="absolute bottom-4 left-4">
            <span class="bg-red-500 text-white text-xs px-2 py-1 rounded-full animate-pulse">
              🎉 ${promotion?.promotion_name || "SALE!"}
            </span>
          </div>` : ''}
      </div>
      <div class="p-5">
        <h3 class="mb-2 font-bold text-lg line-clamp-2">${course.title}</h3>
        <p class="mb-4 text-sm text-gray-600 dark:text-gray-400 line-clamp-2">${course.description || ""}</p>
        <div class="flex items-center justify-between">
          <div>
            ${hasDiscount ? `
              <div class="flex items-center gap-2">
                <span class="text-gray-400 line-through text-sm">$${originalPrice.toFixed(2)}</span>
                <span class="bg-red-100 text-red-600 text-xs px-2 py-0.5 rounded-full font-bold">
                  ${promotion?.promotion_type === "percent" ? `-${promotion.discount_value}%` : `-$${promotion?.discount_value}`}
                </span>
              </div>
              <span class="font-bold text-xl text-red-500">$${finalPrice.toFixed(2)}</span>
            ` : `
              <span class="font-bold text-lg text-purple-600 dark:text-purple-400">$${originalPrice.toFixed(2)}</span>
            `}
          </div>
          <button class="btn ${isPurchased ? "btn-outline" : "btn-primary"} view-details-btn text-sm py-1.5 px-3" data-course-id="${encryptedId}" onclick="window.location.href='/course/${encryptedId}'">
            ${isPurchased ? '<i class="fas fa-play mr-1"></i> Watch Video' : "View Details"}
          </button>
        </div>
      </div>
    </div>
  `;
}

function createCourseCard(course) {
  const encryptedId = encryptId(course.id);
  const isPurchased = purchasedCourses.some((id) => Number(id) === Number(course.id));
  return `
    <div class="card course-card" data-course-id="${encryptedId}">
      <div class="relative aspect-video overflow-hidden rounded-t-xl">
        <img src="${course.image}" alt="${course.title}" class="w-full h-full object-cover">
        <div class="absolute bottom-4 right-4 bg-black/70 text-white text-xs px-2 py-1 rounded">${course.duration}</div>
        <div class="absolute top-4 left-4">
          <span class="badge badge-primary text-xs">${course.category}</span>
        </div>
        ${isPurchased ? `<div class="absolute top-4 right-4"><span class="bg-green-500 text-white text-xs px-2 py-1 rounded-full"><i class="fas fa-check mr-1"></i> Purchased</span></div>` : ""}
      </div>
      <div class="p-5">
        <h3 class="mb-2 font-bold text-lg line-clamp-2">${course.title}</h3>
        <p class="mb-4 text-sm text-gray-600 dark:text-gray-400 line-clamp-2">${course.description}</p>
        <div class="flex items-center justify-between">
          <span class="font-bold text-lg text-purple-600 dark:text-purple-400">$${course.price.toFixed(2)}</span>
          <button class="btn ${isPurchased ? "btn-outline" : "btn-primary"} view-details-btn text-sm py-1.5 px-3" data-course-id="${encryptedId}" onclick="window.location.href='/course/${encryptedId}'">
            ${isPurchased ? '<i class="fas fa-play mr-1"></i> Watch Video' : "View Details"}
          </button>
        </div>
      </div>
    </div>
  `;
}

// ============================================
// Document Card Templates (with encrypted IDs)
// ============================================
function createDocumentCardFromAPI(doc) {
  const docId = doc.freeDocument_id;
  const encryptedId = encryptId(docId);
  const isLoggedIn = !!currentUser;
  const hasFile = doc.file && doc.file.trim() !== '';

  return `
    <div class="card">
      <div class="p-5">
        <div class="flex items-center justify-between mb-4">
          <div class="h-12 w-12 rounded-lg overflow-hidden bg-purple-100 flex items-center justify-center">
            ${doc.logo ? `<img src="${doc.logo}" alt="${doc.title}" class="w-full h-full object-cover">` : `<i class="fas fa-file-alt text-purple-600 text-xl"></i>`}
          </div>
          <span class="text-xs px-3 py-1 rounded-full bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-300">
            ${doc.category?.name || "General"}
          </span>
        </div>
        <h3 class="mb-2 font-bold text-lg line-clamp-2">${doc.title}</h3>
        <p class="mb-4 text-sm text-gray-600 dark:text-gray-400 line-clamp-2">${doc.description || ""}</p>
        <div class="flex items-center justify-between mb-4">
          <span class="text-xs text-gray-500 dark:text-gray-400">
            <i class="fas fa-external-link-alt mr-1"></i> External Resource
          </span>
        </div>
        ${isLoggedIn
      ? hasFile
        ? `<a href="${doc.file}" target="_blank" class="btn btn-primary w-full text-sm py-2 block text-center"><i class="fas fa-external-link-alt mr-2"></i> View Document</a>`
        : `<button class="btn btn-outline w-full text-sm py-2" disabled>No file available</button>`
      : `<button class="btn btn-outline w-full login-to-read-btn text-sm py-2" onclick="showLoginModal()"><i class="fas fa-lock mr-2"></i> Login to Read</button>`
    }
      </div>
    </div>
  `;
}

function createDocumentCard(doc) {
  const encryptedId = encryptId(doc.id);
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
          <span class="text-xs text-gray-500 dark:text-gray-400"><i class="fas fa-external-link-alt mr-1"></i> ${doc.source}</span>
          ${doc.pages ? `<span class="text-xs text-gray-500 dark:text-gray-400">${doc.pages} pages</span>` : ""}
        </div>
        ${isLoggedIn
      ? `<a href="${doc.url}" target="_blank" class="btn btn-primary w-full view-document-btn text-sm py-2" data-doc-id="${encryptedId}"><i class="fas fa-external-link-alt mr-2"></i> View Document</a>`
      : `<button class="btn btn-outline w-full login-to-read-btn text-sm py-2" onclick="showLoginModal()"><i class="fas fa-lock mr-2"></i> Login to Read</button>`
    }
      </div>
    </div>
  `;
}

// ============================================
// Course Detail Page (with encrypted ID handling)
// ============================================
async function showCourseDetail(encryptedId) {
  const courseId = decryptId(encryptedId);
  if (!courseId) {
    showToast("Invalid course", "error");
    navigateTo('courses');
    return;
  }

  try {
    const data = await apiFetch(`/courses/${courseId}`);
    const course = data.course;
    const owned = data.owned;

    localStorage.setItem("current_course_id", courseId);

    if (window.location.pathname !== `/course/${encryptedId}`) {
      window.history.pushState({}, '', `/course/${encryptedId}`);
    }

    const finalPrice = Number(course.final_price ?? course.price);
    const category = course.category?.name || "";

    const els = {
      category: document.getElementById("course-detail-category"),
      title: document.getElementById("course-detail-title"),
      description: document.getElementById("course-detail-description"),
      desktopPrice: document.getElementById("desktop-price"),
      mobilePrice: document.getElementById("mobile-price"),
    };

    if (els.category) els.category.textContent = category;
    if (els.title) els.title.textContent = course.title;
    if (els.description) els.description.textContent = course.description || "No description available.";
    if (els.desktopPrice) els.desktopPrice.textContent = `$${finalPrice.toFixed(2)}`;
    if (els.mobilePrice) els.mobilePrice.textContent = `$${finalPrice.toFixed(2)}`;

    const oldBanner = document.getElementById("promotion-banner");
    if (oldBanner) oldBanner.remove();

    if (course.active_promotion && finalPrice < Number(course.price)) {
      const promo = course.active_promotion;
      const savings = Number(course.price) - finalPrice;
      const discount = promo.promotion_type === "percent" ? `${promo.discount_value}% OFF` : `$${promo.discount_value} OFF`;
      const endDate = new Date(promo.end_date).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" });

      const banner = document.createElement("div");
      banner.id = "promotion-banner";
      banner.className = "mb-6";
      banner.innerHTML = `
        <div style="background: linear-gradient(135deg, #667eea 0%, #764ba2 50%, #f093fb 100%); border-radius: 16px; padding: 20px 24px;">
          <div style="display:flex;align-items:center;gap:16px;flex-wrap:wrap;">
            <div style="background:rgba(255,255,255,0.2);border-radius:14px;width:56px;height:56px;display:flex;align-items:center;justify-content:center;font-size:28px;">🎉</div>
            <div style="flex:1;">
              <div><span style="background:rgba(255,255,255,0.25);padding:3px 10px;border-radius:20px;">🔥 Limited Offer</span> <span>⏰ Ends ${endDate}</span></div>
              <p style="font-weight:800;font-size:18px;margin:4px 0;">${promo.promotion_name}</p>
              <p>You save <strong>$${savings.toFixed(2)}</strong> • ${discount} applied automatically</p>
            </div>
            <div style="text-align:right;">
              <div style="font-size:11px;">Now only</div>
              <div style="font-weight:900;font-size:26px;">$${finalPrice.toFixed(2)}</div>
              <div style="text-decoration:line-through;font-size:13px;">$${Number(course.price).toFixed(2)}</div>
            </div>
          </div>
        </div>
      `;
      const titleEl = document.getElementById("course-detail-title");
      if (titleEl) titleEl.parentNode.insertBefore(banner, titleEl);
    }

    const learningPointsList = document.getElementById("course-learning-points");
    if (learningPointsList) {
      const modules = course.video_modules || [];
      learningPointsList.innerHTML = modules.length > 0
        ? modules.map(mod => `
          <li class="flex items-start">
            <i class="fas fa-check-circle text-purple-600 text-sm mt-0.5 mr-3"></i>
            <span>${escapeHtml(mod.title)}</span>
          </li>
        `).join("")
        : '<li class="text-gray-500">No learning points available</li>';
    }

    pages.forEach((p) => p.classList.add("page-hidden"));
    const courseDetailPage = document.getElementById("course-detail-page");
    if (courseDetailPage) {
      courseDetailPage.classList.remove("page-hidden");
      currentPage = "course-detail";
    }

    generateCourseModulesFromAPI(courseId, course, owned);
    initMobileModulesMenu();
    restoreWatchedModules(courseId);

    showToast("Course loaded successfully!", "success");

  } catch (err) {
    console.error("Failed to load course detail:", err);
    showToast("Failed to load course details: " + err.message, "error");
    navigateTo('courses');
  }
}

// ============================================
// Generate Modules Functions
// ============================================
function generateCourseModulesFromAPI(courseId, course, owned) {
  const modules = course.video_modules || [];
  const finalPrice = Number(course.final_price ?? course.price);

  const sidebarTitle = document.getElementById("sidebar-course-title");
  const sidebarModules = document.getElementById("sidebar-course-modules");
  const sidebarPrice = document.getElementById("sidebar-course-price");
  const mobileSidebarTitle = document.getElementById("mobile-sidebar-title");
  const mobileSidebarModules = document.getElementById("mobile-sidebar-modules");
  const mobileSidebarPrice = document.getElementById("mobile-sidebar-price");

  if (sidebarTitle) sidebarTitle.textContent = course.title;
  if (sidebarModules) sidebarModules.textContent = `${modules.length} modules`;
  if (sidebarPrice) sidebarPrice.textContent = `$${finalPrice.toFixed(2)}`;
  if (mobileSidebarTitle) mobileSidebarTitle.textContent = course.title;
  if (mobileSidebarModules) mobileSidebarModules.textContent = `${modules.length} modules`;
  if (mobileSidebarPrice) mobileSidebarPrice.textContent = `$${finalPrice.toFixed(2)}`;

  const desktopModuleList = document.getElementById("desktop-module-list");
  const mobileModuleList = document.getElementById("mobile-module-list");

  if (desktopModuleList) {
    desktopModuleList.innerHTML = modules.map(mod => `
      <div class="module-item ${!owned && !mod.is_free ? 'locked' : ''}" 
           data-module-id="${mod.videoCourseItem_id}"
           data-course-id="${courseId}"
           data-video-url="${mod.video_url || ''}"
           data-is-locked="${!owned && !mod.is_free}"
           data-is-free="${mod.is_free}">
        <div class="module-content p-3 mb-2 rounded-lg border ${!owned && !mod.is_free ? 'border-gray-200 bg-gray-50' : 'border-purple-200 hover:border-purple-400 cursor-pointer'}">
          <div class="flex items-start gap-3">
            <div class="module-status mt-1">
              ${!owned && !mod.is_free ? '<i class="fas fa-lock text-gray-400"></i>' : '<i class="fas fa-play-circle text-purple-600 default-icon"></i>'}
            </div>
            <div class="flex-1">
              <h4 class="font-medium text-sm ${!owned && !mod.is_free ? 'text-gray-500' : 'text-gray-900'}">${mod.title}</h4>
              <p class="text-xs text-gray-500">${mod.duration || ''}</p>
              ${mod.is_free ? '<span class="inline-block px-2 py-0.5 bg-green-100 text-green-700 text-xs rounded-full mt-1">FREE PREVIEW</span>' : ''}
              ${owned ? '<span class="inline-block px-2 py-0.5 bg-purple-100 text-purple-700 text-xs rounded-full mt-1">Purchased</span>' : ''}
              ${!owned && !mod.is_free ? '<span class="inline-block px-2 py-0.5 bg-gray-100 text-gray-600 text-xs rounded-full mt-1">Locked</span>' : ''}
            </div>
          </div>
        </div>
      </div>
    `).join('');

    addModuleClickListeners(desktopModuleList, owned, false, courseId);
  }

  if (mobileModuleList) {
    mobileModuleList.innerHTML = modules.map(mod => `
      <div class="mobile-module-item ${!owned && !mod.is_free ? 'locked' : ''}" 
           data-module-id="${mod.videoCourseItem_id}"
           data-course-id="${courseId}"
           data-video-url="${mod.video_url || ''}"
           data-is-locked="${!owned && !mod.is_free}"
           data-is-free="${mod.is_free}">
        <div class="module-content p-4 mb-3 rounded-xl border ${!owned && !mod.is_free ? 'border-gray-200 bg-gray-50' : 'border-purple-200 bg-white shadow-sm'}">
          <div class="flex items-start gap-4">
            <div class="module-status mt-1">
              ${!owned && !mod.is_free ? '<i class="fas fa-lock text-gray-400 text-base"></i>' : '<i class="fas fa-play-circle text-purple-600 text-lg default-icon"></i>'}
            </div>
            <div class="flex-1">
              <h4 class="font-semibold text-base ${!owned && !mod.is_free ? 'text-gray-500' : 'text-gray-900'}">${mod.title}</h4>
              <p class="text-sm text-gray-500">${mod.duration || ''}</p>
              <div class="flex items-center gap-2 flex-wrap mt-2">
                ${mod.is_free ? '<span class="inline-block px-3 py-1 bg-green-100 text-green-700 text-xs rounded-full font-medium">FREE PREVIEW</span>' : ''}
                ${owned ? '<span class="inline-block px-3 py-1 bg-purple-100 text-purple-700 text-xs rounded-full font-medium">Purchased</span>' : ''}
                ${!owned && !mod.is_free ? '<span class="inline-block px-3 py-1 bg-gray-100 text-gray-600 text-xs rounded-full">Locked - Purchase to Unlock</span>' : ''}
              </div>
            </div>
          </div>
        </div>
      </div>
    `).join('');

    addModuleClickListeners(mobileModuleList, owned, true, courseId);
  }

  updatePurchaseButtons(courseId, { price: finalPrice, modules: modules.length }, owned);
  updateProgressBars(0, modules.length, owned);
}

function addModuleClickListeners(container, isPurchased, isMobile, courseId) {
  const moduleItems = container.querySelectorAll("[data-module-id]");
  moduleItems.forEach((item) => {
    item.style.cursor = item.dataset.isLocked === "true" ? "not-allowed" : "pointer";
    item.addEventListener("click", (e) => {
      if (e.target.closest("button") || e.target.closest("a")) return;

      const moduleId = item.dataset.moduleId;
      const videoUrl = item.dataset.videoUrl;
      const isLocked = item.dataset.isLocked === "true";

      if (isLocked) {
        showToast("This module requires course purchase to watch.", "error");
        ["desktop-purchase-button", "mobile-purchase-button"].forEach((btnId) => {
          const purchaseBtn = document.getElementById(btnId);
          if (purchaseBtn && !purchaseBtn.disabled) {
            purchaseBtn.classList.add("animate-pulse");
            setTimeout(() => purchaseBtn.classList.remove("animate-pulse"), 2000);
          }
        });
        return;
      }

      if (!videoUrl || videoUrl.trim() === "") {
        showToast("No video available for this module.", "error");
        return;
      }

      playModuleVideo(courseId, moduleId, videoUrl);
    });
  });
}

function playModuleVideo(courseId, moduleId, videoUrl) {
  const videoPlayer = document.getElementById("course-video-player");
  if (!videoPlayer) return;

  let embedUrl = videoUrl;
  if (videoUrl.includes("youtube.com/watch?v=")) {
    const videoId = videoUrl.split("v=")[1]?.split("&")[0];
    if (videoId) embedUrl = `https://www.youtube.com/embed/${videoId}`;
  } else if (videoUrl.includes("youtu.be/")) {
    const videoId = videoUrl.split("youtu.be/")[1]?.split("?")[0];
    if (videoId) embedUrl = `https://www.youtube.com/embed/${videoId}`;
  }
  embedUrl += embedUrl.includes("?") ? "&autoplay=1" : "?autoplay=1";

  videoPlayer.innerHTML = `
    <div class="relative w-full h-full bg-black rounded-xl overflow-hidden">
      <iframe src="${embedUrl}" frameborder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowfullscreen class="absolute top-0 left-0 w-full h-full"
        title="Course Video"></iframe>
    </div>`;

  markModuleAsWatched(courseId, moduleId);
  closeMobileModulesMenu();
  updateActiveModule(courseId, moduleId);
}

function markModuleAsWatched(courseId, moduleId) {
  if (!currentVideoProgress[courseId]) {
    currentVideoProgress[courseId] = {
      started: new Date().toISOString(),
      watchedModules: [],
      lastModule: moduleId,
      progress: 0,
    };
  }

  const courseProgress = currentVideoProgress[courseId];

  if (!courseProgress.watchedModules.includes(parseInt(moduleId))) {
    courseProgress.watchedModules.push(parseInt(moduleId));
    courseProgress.lastModule = parseInt(moduleId);

    const totalModules = document.querySelectorAll("#desktop-module-list [data-module-id]").length || 1;
    const watchedCount = courseProgress.watchedModules.length;
    const progress = Math.min(Math.round((watchedCount / totalModules) * 100), 100);
    courseProgress.progress = progress;

    if (currentUser) {
      localStorage.setItem(`learnhub_video_progress_${currentUser.id}`, JSON.stringify(currentVideoProgress));
    }

    updateModuleWatchedStatus(courseId, moduleId);
    updateCourseProgress(courseId, progress);
  }
}

function updateModuleWatchedStatus(courseId, moduleId) {
  ["desktop-module-list", "mobile-module-list"].forEach((listId) => {
    const mod = document.querySelector(`#${listId} [data-module-id="${moduleId}"]`);
    if (mod) {
      const defaultIcon = mod.querySelector(".default-icon");
      const watchedIcon = mod.querySelector(".watched-icon");
      if (defaultIcon) defaultIcon.style.display = "none";
      if (watchedIcon) watchedIcon.style.display = "inline-block";
    }
  });
}

function updateCourseProgress(courseId, progress) {
  const sidebarBar = document.getElementById("sidebar-progress-bar");
  const sidebarPct = document.getElementById("sidebar-progress-percentage");
  const sidebarTxt = document.getElementById("sidebar-progress-text");
  const mobileBar = document.getElementById("mobile-progress-bar");
  const mobilePct = document.getElementById("mobile-progress-percentage");
  const mobileTxt = document.getElementById("mobile-progress-text");

  if (sidebarBar) sidebarBar.style.width = `${progress}%`;
  if (sidebarPct) sidebarPct.textContent = `${progress}%`;
  if (sidebarTxt) sidebarTxt.textContent = `${progress}% complete • Keep learning`;
  if (mobileBar) mobileBar.style.width = `${progress}%`;
  if (mobilePct) mobilePct.textContent = `${progress}%`;
  if (mobileTxt) mobileTxt.textContent = `${progress}% complete • Keep learning`;
}

function updateActiveModule(courseId, activeModuleId) {
  ["desktop-module-list", "mobile-module-list"].forEach((listId) => {
    document.querySelectorAll(`#${listId} [data-module-id]`).forEach((module) => {
      const moduleContent = module.querySelector(".module-content");
      if (!moduleContent) return;
      if (module.dataset.moduleId == activeModuleId) {
        moduleContent.classList.add("bg-purple-100", "border-purple-500");
      } else {
        moduleContent.classList.remove("bg-purple-100", "border-purple-500");
      }
    });
  });
}

function updateProgressBars(progress, totalModules, isPurchased) {
  const progressWidth = `${progress || 0}%`;
  const progressPercentage = `${progress || 0}%`;
  const progressMessage = isPurchased
    ? progress ? `${progress}% complete • Keep learning` : "Start learning to track progress"
    : "Purchase to unlock all modules";

  const sidebarBar = document.getElementById("sidebar-progress-bar");
  const sidebarPct = document.getElementById("sidebar-progress-percentage");
  const sidebarTxt = document.getElementById("sidebar-progress-text");
  const mobileBar = document.getElementById("mobile-progress-bar");
  const mobilePct = document.getElementById("mobile-progress-percentage");
  const mobileTxt = document.getElementById("mobile-progress-text");

  if (sidebarBar) sidebarBar.style.width = progressWidth;
  if (sidebarPct) sidebarPct.textContent = progressPercentage;
  if (sidebarTxt) sidebarTxt.textContent = progressMessage;
  if (mobileBar) mobileBar.style.width = progressWidth;
  if (mobilePct) mobilePct.textContent = progressPercentage;
  if (mobileTxt) mobileTxt.textContent = progressMessage;
}

function initMobileModulesMenu() {
  const mobileToggle = document.getElementById("mobile-modules-toggle");
  const mobileOverlay = document.getElementById("mobile-modules-overlay");
  const closeButton = document.getElementById("close-mobile-modules");

  if (mobileToggle) {
    mobileToggle.addEventListener("click", (e) => {
      e.stopPropagation();
      if (mobileOverlay) mobileOverlay.classList.remove("hidden");
      document.body.style.overflow = "hidden";
    });
  }
  if (closeButton) closeButton.addEventListener("click", closeMobileModulesMenu);
  if (mobileOverlay) {
    mobileOverlay.addEventListener("click", (e) => {
      if (e.target === mobileOverlay) closeMobileModulesMenu();
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

function restoreWatchedModules(courseId) {
  if (currentVideoProgress[courseId]) {
    const watchedModules = currentVideoProgress[courseId].watchedModules || [];
    watchedModules.forEach((moduleId) => updateModuleWatchedStatus(courseId, moduleId));
    updateCourseProgress(courseId, currentVideoProgress[courseId].progress || 0);
  }
}

// ============================================
// Navigation & Page Management
// ============================================
function handleHashChange() {
  const hash = window.location.hash.substring(1);
  const validPages = ["home", "about", "courses", "documents", "contact", "dashboard"];

  if (validPages.includes(hash)) {
    showPage(hash);
    if (hash === "documents") showLoginNotice();
    if (hash === "dashboard") updateDashboard();
  } else if (hash.startsWith("course-")) {
    const encryptedId = hash.split("-")[1];
    if (encryptedId) showCourseDetail(encryptedId);
  } else {
    if (window.location.hash !== "#home") window.location.hash = "home";
    else showPage("home");
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
      showDashboardView("main");
    } else if (page === "courses") updateCourseFilters();
    else if (page === "documents") {
      updateDocumentFilters();
      showLoginNotice();
    }
  }
}

// ============================================
// Dashboard Functions
// ============================================
function showDashboardView(view) {
  document.querySelectorAll(".dashboard-view").forEach((v) => v.classList.add("hidden"));
  const targetView = document.getElementById(`dashboard-${view}-view`);
  if (targetView) targetView.classList.remove("hidden");
  if (view === "courses") loadDashboardCoursesView();
  else if (view === "receipts") loadDashboardReceiptsView();
  else if (view === "main") updateDashboard();
}

async function updateDashboard() {
  if (!currentUser) return;
  try {
    const data = await apiFetch("/dashboard");
    const els = {
      name: document.getElementById("dashboard-user-name"),
      email: document.getElementById("dashboard-user-email"),
      memberDate: document.getElementById("dashboard-member-date"),
      courseCount: document.getElementById("dashboard-course-count"),
      receiptsCount: document.getElementById("dashboard-receipts-count"),
      purchasedCount: document.getElementById("purchased-courses-count"),
      totalSpent: document.getElementById("total-spent-amount"),
      lastPurchaseDate: document.getElementById("last-purchase-date"),
      lastPurchaseCourse: document.getElementById("last-purchase-course"),
    };
    if (els.name) els.name.textContent = data.user.name || "User";
    if (els.email) els.email.textContent = data.user.email || "";
    if (els.memberDate && data.user.created_at) {
      els.memberDate.textContent = new Date(data.user.created_at).toLocaleDateString("en-US", { month: "short", year: "numeric" });
    }
    if (els.courseCount) els.courseCount.textContent = data.total_courses;
    if (els.receiptsCount) els.receiptsCount.textContent = data.total_courses;
    if (els.purchasedCount) els.purchasedCount.textContent = data.total_courses;
    if (els.totalSpent) els.totalSpent.textContent = `$${Number(data.total_spent).toFixed(2)}`;

    if (data.courses.length > 0) {
      const last = data.courses[0];
      if (els.lastPurchaseDate) els.lastPurchaseDate.textContent = new Date(last.paid_at).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" });
      if (els.lastPurchaseCourse) els.lastPurchaseCourse.textContent = last.course.title;
    } else {
      if (els.lastPurchaseDate) els.lastPurchaseDate.textContent = "-";
      if (els.lastPurchaseCourse) els.lastPurchaseCourse.textContent = "No purchases yet";
    }

    purchasedCourses = data.courses.map((c) => Number(c.course.courseItem_id));
    transactions = data.courses.map((c) => ({
      id: c.payment.payment_id,
      transactionNumber: c.invoice_number,
      courseId: Number(c.course.courseItem_id),
      courseTitle: c.course.title,
      courseCategory: c.course.category?.name || "",
      courseImage: c.course.image,
      courseModules: c.course.video_modules?.length || 0,
      amount: c.amount_paid,
      date: c.paid_at,
      status: "completed",
    }));

    loadRecentCoursesFromAPI(data.courses);
  } catch (err) {
    console.error("Dashboard load failed:", err);
  }
}

function loadRecentCoursesFromAPI(courses) {
  const recentCoursesGrid = document.getElementById("recent-courses-grid");
  if (!recentCoursesGrid) return;
  if (courses.length === 0) {
    recentCoursesGrid.innerHTML = `
      <div class="text-center py-12 col-span-3">
        <i class="fas fa-video text-gray-300 text-4xl mb-4"></i>
        <h3 class="text-lg font-semibold mb-2">No Courses Purchased</h3>
        <p class="text-gray-600 mb-4">You haven't purchased any courses yet.</p>
        <button onclick="navigateTo('courses')" class="btn btn-primary py-2 px-4">Browse Courses</button>
      </div>`;
    return;
  }
  recentCoursesGrid.innerHTML = courses.slice(0, 3).map((c) => `
    <div class="card">
      <div class="relative h-40 overflow-hidden rounded-t-xl">
        <img src="${c.course.image || "Images/default-course.png"}" alt="${c.course.title}" class="w-full h-full object-cover">
        <div class="absolute top-3 left-3"><span class="badge badge-primary text-xs">Purchased</span></div>
      </div>
      <div class="p-4">
        <h3 class="font-bold text-lg mb-2 line-clamp-1">${c.course.title}</h3>
        <div class="mb-3">
          <div class="flex justify-between text-sm mb-1">
            <span class="text-gray-600">Progress</span>
            <span class="font-medium text-purple-600">${c.progress_percent}%</span>
          </div>
          <div class="h-2 bg-gray-200 rounded-full">
            <div class="h-full bg-purple-600 rounded-full" style="width:${c.progress_percent}%"></div>
          </div>
        </div>
        <button onclick="window.location.href='/course/${encryptId(c.course.courseItem_id)}'" class="btn btn-primary w-full py-1.5 text-sm">
          <i class="fas fa-play mr-1"></i> Watch Now
        </button>
      </div>
    </div>
  `).join("");
}

function loadRecentCourses() {
  const recentCoursesGrid = document.getElementById("recent-courses-grid");
  if (!recentCoursesGrid) return;
  if (purchasedCourses.length === 0) {
    recentCoursesGrid.innerHTML = `
      <div class="text-center py-12 col-span-3">
        <i class="fas fa-video text-gray-300 text-4xl mb-4"></i>
        <h3 class="text-lg font-semibold mb-2">No Courses Purchased</h3>
        <p class="text-gray-600 mb-4">You haven't purchased any courses yet.</p>
        <button onclick="navigateTo('courses')" class="btn btn-primary py-2 px-4">Browse Courses</button>
      </div>`;
    return;
  }
  const recentCourseIds = [...purchasedCourses].reverse().slice(0, 3);
  recentCoursesGrid.innerHTML = recentCourseIds
    .map((courseId) => {
      const course = allCourses.find((c) => Number(c.courseItem_id) === Number(courseId));
      if (!course) return "";
      return `
        <div class="card">
          <div class="relative h-40 overflow-hidden rounded-t-xl">
            <img src="${course.image}" alt="${course.title}" class="w-full h-full object-cover">
            <div class="absolute top-3 left-3"><span class="badge badge-primary text-xs">Purchased</span></div>
          </div>
          <div class="p-4">
            <h3 class="font-bold text-lg mb-2 line-clamp-1">${course.title}</h3>
            <p class="text-gray-600 text-sm mb-4 line-clamp-2">${course.description}</p>
            <button onclick="window.location.href='/course/${encryptId(course.courseItem_id)}'" class="btn btn-primary w-full py-1.5 text-sm">
              <i class="fas fa-play mr-1"></i> Watch Now
            </button>
          </div>
        </div>`;
    })
    .join("");
}

function loadDashboardCoursesView() {
  const coursesView = document.getElementById("dashboard-courses-view");
  if (!coursesView) return;
  let html = `
    <div class="mb-8">
      <div class="flex justify-between items-center mb-6">
        <div><h2 class="text-2xl font-bold mb-2">My Courses</h2><p class="text-gray-600">All your purchased video courses.</p></div>
        <button onclick="navigateTo('courses')" class="btn btn-outline"><i class="fas fa-plus mr-2"></i> Buy More Courses</button>
      </div>`;
  if (purchasedCourses.length === 0) {
    html += `<div class="text-center py-12 bg-white rounded-xl border border-gray-200">
      <i class="fas fa-video text-gray-300 text-4xl mb-4"></i>
      <h3 class="text-lg font-semibold mb-2">No Courses Purchased</h3>
      <button onclick="navigateTo('courses')" class="btn btn-primary">Browse Courses</button>
    </div>`;
  } else {
    html += '<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">';
    purchasedCourses.forEach((courseId) => {
      const course = allCourses.find((c) => Number(c.courseItem_id) === Number(courseId));
      if (!course) return;
      const progress = currentVideoProgress[courseId]?.progress || 0;
      html += `
        <div class="card">
          <div class="relative h-40 overflow-hidden rounded-t-xl">
            <img src="${course.image}" alt="${course.title}" class="w-full h-full object-cover">
            <div class="absolute top-3 left-3"><span class="badge badge-primary text-xs">Purchased</span></div>
            ${progress > 0 ? `<div class="absolute bottom-0 left-0 right-0 h-1 bg-gray-200"><div class="h-full bg-green-500" style="width:${progress}%"></div></div>` : ""}
          </div>
          <div class="p-4">
            <h3 class="font-bold text-lg mb-2 line-clamp-1">${course.title}</h3>
            <p class="text-gray-600 text-sm mb-4 line-clamp-2">${course.description}</p>
            <div class="flex justify-between items-center">
              <span class="text-sm text-gray-500">${course.duration || "N/A"}</span>
              <button onclick="window.location.href='/course/${encryptId(course.courseItem_id)}'" class="btn btn-primary py-1.5 px-3 text-sm">
                <i class="fas fa-play mr-1"></i> Watch
              </button>
            </div>
          </div>
        </div>`;
    });
    html += "</div>";
  }
  html += "</div>";
  coursesView.innerHTML = html;
}

function loadDashboardReceiptsView() {
  const receiptsView = document.getElementById("dashboard-receipts-view");
  if (!receiptsView) return;
  const totalSpent = transactions.reduce((total, t) => total + t.amount, 0);
  const lastPurchase = transactions.length > 0 ? new Date(Math.max(...transactions.map((t) => new Date(t.date).getTime()))) : null;

  let html = `
    <div class="mb-8">
      <div class="mb-8"><h2 class="text-2xl font-bold mb-2">Purchase History</h2></div>
      <div class="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div class="bg-white rounded-xl p-6 border border-gray-200">
          <h3 class="font-bold mb-4 text-blue-600">Total Purchases</h3>
          <div class="text-3xl font-bold">${transactions.length}</div>
        </div>
        <div class="bg-white rounded-xl p-6 border border-gray-200">
          <h3 class="font-bold mb-4 text-green-600">Total Spent</h3>
          <div class="text-3xl font-bold">$${totalSpent.toFixed(2)}</div>
        </div>
        <div class="bg-white rounded-xl p-6 border border-gray-200">
          <h3 class="font-bold mb-4 text-purple-600">Last Purchase</h3>
          <div class="text-xl font-bold">${lastPurchase ? lastPurchase.toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" }) : "-"}</div>
        </div>
      </div>`;

  if (transactions.length === 0) {
    html += `<div class="text-center py-12 bg-white rounded-xl border border-gray-200">
      <i class="fas fa-receipt text-gray-300 text-4xl mb-4"></i>
      <h3 class="text-lg font-semibold mb-2">No Purchase History</h3>
      <button onclick="navigateTo('courses')" class="btn btn-primary">Browse Courses</button>
    </div>`;
  } else {
    html += `<div class="bg-white rounded-xl border border-gray-200 overflow-hidden"><div class="overflow-x-auto"><table class="w-full">
      <thead class="bg-gray-50"> <th class="py-3 px-4 text-left text-sm font-medium text-gray-700">RECEIPT ID</th><th class="py-3 px-4 text-left text-sm font-medium text-gray-700">COURSE</th><th class="py-3 px-4 text-left text-sm font-medium text-gray-700">DATE</th><th class="py-3 px-4 text-left text-sm font-medium text-gray-700">AMOUNT</th><th class="py-3 px-4 text-left text-sm font-medium text-gray-700">ACTIONS</th> </thead>
      <tbody class="divide-y divide-gray-200">`;

    [...transactions].sort((a, b) => new Date(b.date) - new Date(a.date)).forEach((transaction) => {
      const date = new Date(transaction.date);
      const formattedDate = date.toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" });
      const shortId = transaction.transactionNumber || `RCP-${transaction.id}`;
      html += ` <td class="py-3 px-4 text-sm">${shortId} <td class="py-3 px-4 text-sm">${transaction.courseTitle} <td class="py-3 px-4 text-sm">${formattedDate} <td class="py-3 px-4 text-sm font-medium">$${Number(transaction.amount).toFixed(2)} <td class="py-3 px-4 text-sm"><button onclick="viewReceiptDetail(${transaction.id})" class="btn btn-outline btn-sm py-1 px-3"><i class="fas fa-eye mr-1 text-xs"></i> View</button> `;
    });
    html += `</tbody> </table></div></div>`;
  }
  html += "</div>";
  receiptsView.innerHTML = html;
}

function viewReceiptDetail(receiptId) {
  const transaction = transactions.find((t) => t.id === receiptId);
  if (!transaction) {
    showToast("Receipt not found", "error");
    return;
  }

  const modalHTML = `
    <div id="receipt-detail-modal" class="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
      <div class="bg-white dark:bg-gray-800 rounded-xl shadow-2xl max-w-md w-full max-h-[90vh] overflow-auto">
        <div class="p-6">
          <div class="flex justify-between items-center mb-6">
            <h3 class="text-xl font-bold">Receipt Details</h3>
            <button onclick="closeReceiptDetailModal()" class="p-2 hover:bg-gray-100 rounded-lg"><i class="fas fa-times text-gray-600"></i></button>
          </div>
          <div class="bg-purple-50 p-4 rounded-lg mb-4">
            <div class="text-2xl font-bold">$${Number(transaction.amount).toFixed(2)}</div>
            <div class="text-sm text-gray-600">${transaction.transactionNumber || "N/A"}</div>
          </div>
          <div class="space-y-3">
            <div class="flex justify-between"><span class="text-gray-600">Course:</span><span class="font-medium">${transaction.courseTitle}</span></div>
            <div class="flex justify-between"><span class="text-gray-600">Category:</span><span class="font-medium">${transaction.courseCategory}</span></div>
            <div class="flex justify-between"><span class="text-gray-600">Date:</span><span class="font-medium">${new Date(transaction.date).toLocaleString()}</span></div>
            <div class="flex justify-between"><span class="text-gray-600">Status:</span><span class="font-medium text-green-600">Completed</span></div>
          </div>
          <div class="mt-6 pt-6 border-t border-gray-200">
            <button onclick="closeReceiptDetailModal()" class="btn btn-primary w-full">Close</button>
          </div>
        </div>
      </div>
    </div>`;
  document.body.insertAdjacentHTML("beforeend", modalHTML);
}

function closeReceiptDetailModal() {
  const modal = document.getElementById("receipt-detail-modal");
  if (modal) modal.remove();
}

// ============================================
// Categories & Filters
// ============================================
async function loadCategories() {
  try {
    const data = await apiFetch("/categories");
    allCategories = data.categories || [];
  } catch (err) {
    console.error("Failed to load categories:", err);
    allCategories = [];
  }
  const els = {
    coursesCount: document.getElementById("courses-count"),
    categoriesCount: document.getElementById("categories-count"),
    documentsCount: document.getElementById("documents-count"),
  };
  if (els.coursesCount) els.coursesCount.textContent = allCourses.length;
  if (els.categoriesCount) els.categoriesCount.textContent = allCategories.length;
  if (els.documentsCount) els.documentsCount.textContent = allDocuments.length;
}

async function updateCourseFilters() {
  const courseCategoriesFilter = document.getElementById("course-categories-filter");
  if (!courseCategoriesFilter) return;
  try {
    const data = await apiFetch("/categories");
    allCategories = data.categories || [];
  } catch (err) {
    console.error("Failed to load categories:", err);
  }

  courseCategoriesFilter.innerHTML = `
    <button class="btn border border-gray-300 px-3 py-1.5 rounded-lg bg-purple-600 text-white text-sm" data-category="all">All</button>
    ${allCategories.map((cat) => `
      <button class="btn border border-gray-300 px-3 py-1.5 rounded-lg bg-transparent text-gray-700 hover:bg-gray-100 text-sm" data-category="${cat.category_id}" onclick="filterCoursesByCategory('${cat.category_id}')">${cat.name}</button>
    `).join("")}`;
}

async function filterCoursesByCategory(categoryId) {
  try {
    const url = categoryId === "all" ? "/courses" : `/courses?category_id=${categoryId}`;
    const data = await apiFetch(url);
    const allCoursesGrid = document.getElementById("all-courses-grid");
    if (allCoursesGrid) {
      allCoursesGrid.innerHTML = data.courses.map((c) => createCourseCardFromAPI(c)).join("");
    }
  } catch (err) {
    console.error("Failed to filter courses:", err);
  }
}

async function filterCourses() {
  const searchTerm = document.getElementById("course-search")?.value || "";
  try {
    const data = await apiFetch(`/courses?search=${searchTerm}`);
    const allCoursesGrid = document.getElementById("all-courses-grid");
    if (allCoursesGrid) {
      allCoursesGrid.innerHTML = data.courses.map((c) => createCourseCardFromAPI(c)).join("");
    }
  } catch (err) {
    console.error("Search failed:", err);
  }
}

async function updateDocumentFilters() {
  const documentCategoriesFilter = document.getElementById("document-categories-filter");
  if (!documentCategoriesFilter) return;
  try {
    const data = await apiFetch("/categories");
    allCategories = data.categories || [];
  } catch (err) {
    console.error("Failed to load categories:", err);
  }

  documentCategoriesFilter.innerHTML = `
    <button class="btn border border-gray-300 px-3 py-1.5 rounded-lg bg-purple-600 text-white text-sm" data-category="all" onclick="filterDocumentsByCategory('all')">All</button>
    ${allCategories.map((cat) => `
      <button class="btn border border-gray-300 px-3 py-1.5 rounded-lg bg-transparent text-gray-700 hover:bg-gray-100 text-sm" data-category="${cat.category_id}" onclick="filterDocumentsByCategory('${cat.category_id}')">${cat.name}</button>
    `).join("")}`;
}

async function filterDocumentsByCategory(categoryId) {
  try {
    const url = categoryId === "all" ? "/documents" : `/documents?category_id=${categoryId}`;
    const data = await apiFetch(url);
    const allDocumentsGrid = document.getElementById("all-documents-grid");
    if (allDocumentsGrid) {
      allDocumentsGrid.innerHTML = data.documents.length > 0
        ? data.documents.map((doc) => createDocumentCardFromAPI(doc)).join("")
        : '<div class="text-center py-12 col-span-3"><p class="text-gray-500">No documents in this category</p></div>';
    }
  } catch (err) {
    console.error("Failed to filter documents:", err);
  }
}

async function filterDocuments() {
  const searchTerm = document.getElementById("document-search")?.value || "";
  try {
    const url = searchTerm ? `/documents?search=${searchTerm}` : "/documents";
    const data = await apiFetch(url);
    const allDocumentsGrid = document.getElementById("all-documents-grid");
    if (allDocumentsGrid) {
      allDocumentsGrid.innerHTML = data.documents.length > 0
        ? data.documents.map((doc) => createDocumentCardFromAPI(doc)).join("")
        : '<div class="text-center py-12 col-span-3"><p class="text-gray-500">No documents found</p></div>';
    }
  } catch (err) {
    console.error("Search failed:", err);
  }
}

function updateAllCourseCards() {
  const allCoursesGrid = document.getElementById("all-courses-grid");
  const featuredCoursesGrid = document.getElementById("featured-courses-grid");
  if (allCoursesGrid && allCourses.length > 0) {
    allCoursesGrid.innerHTML = allCourses.map((c) => createCourseCardFromAPI(c)).join("");
  }
  if (featuredCoursesGrid && allCourses.length > 0) {
    featuredCoursesGrid.innerHTML = allCourses.slice(0, 6).map((c) => createCourseCardFromAPI(c)).join("");
  }
}

function showLoginNotice() {
  const loginNotice = document.getElementById("login-notice");
  if (loginNotice) {
    if (!currentUser) loginNotice.classList.remove("hidden");
    else loginNotice.classList.add("hidden");
  }
}

// ============================================
// Auth Functions
// ============================================
function updateAuthUI() {
  const els = {
    guestButtons: document.getElementById("guest-buttons"),
    userMenu: document.getElementById("user-menu"),
    mobileGuestButtons: document.getElementById("mobile-guest-buttons"),
    mobileUserMenu: document.getElementById("mobile-user-menu"),
    mobileUserName: document.getElementById("mobile-user-name"),
    mobileUserEmail: document.getElementById("mobile-user-email"),
  };
  if (currentUser) {
    if (els.guestButtons) els.guestButtons.style.display = "none";
    if (els.userMenu) els.userMenu.style.display = "flex";
    if (els.mobileGuestButtons) els.mobileGuestButtons.style.display = "none";
    if (els.mobileUserMenu) {
      els.mobileUserMenu.style.display = "flex";
      if (els.mobileUserName) els.mobileUserName.textContent = currentUser.name;
      if (els.mobileUserEmail) els.mobileUserEmail.textContent = currentUser.email;
    }
  } else {
    if (els.guestButtons) els.guestButtons.style.display = "flex";
    if (els.userMenu) els.userMenu.style.display = "none";
    if (els.mobileGuestButtons) els.mobileGuestButtons.style.display = "flex";
    if (els.mobileUserMenu) els.mobileUserMenu.style.display = "none";
  }
  updateAllCourseCards();

  if (currentPage === 'documents') {
    loadAllDocuments();
  }
}

async function handleLogin(e) {
  e.preventDefault();
  const email = document.getElementById("login-email").value;
  const password = document.getElementById("login-password").value;
  if (!email || !password) {
    showToast("Please fill in all fields", "error");
    return;
  }

  const btn = e.target.querySelector('button[type="submit"]');
  if (btn) {
    btn.disabled = true;
    btn.textContent = "Logging in...";
  }
  try {
    const data = await apiFetch("/login", {
      method: "POST",
      body: JSON.stringify({ email, password }),
    });
    localStorage.setItem("learnhub_token", data.token);
    currentUser = {
      id: data.user.id,
      name: data.user.name,
      email: data.user.email,
      createdAt: data.user.created_at,
      photo: data.user.photo,
    };
    localStorage.setItem("learnhub_user", JSON.stringify(currentUser));
    await loadUserDataFromAPI();
    updateAuthUI();
    closeLoginModal();
    const loginForm = document.getElementById("login-form");
    if (loginForm) loginForm.reset();
    loadAllDocuments();
    loadFeaturedDocuments();
    showToast("Login successful! Welcome back.", "success");
    closeMobileMenu();
    if (currentPage.includes("dashboard")) updateDashboard();
    navigateTo('dashboard');
  } catch (err) {
    showToast(err.message || "Invalid email or password", "error");
  } finally {
    if (btn) {
      btn.disabled = false;
      btn.textContent = "Login";
    }
  }
}

async function handleRegister(e) {
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

  const btn = e.target.querySelector('button[type="submit"]');
  if (btn) {
    btn.disabled = true;
    btn.textContent = "Registering...";
  }
  try {
    const data = await apiFetch("/register", {
      method: "POST",
      body: JSON.stringify({
        name,
        email,
        password,
        password_confirmation: confirmPassword,
      }),
    });
    localStorage.setItem("learnhub_token", data.token);
    currentUser = {
      id: data.user.id,
      name: data.user.name,
      email: data.user.email,
      createdAt: data.user.created_at,
      photo: data.user.photo,
    };
    localStorage.setItem("learnhub_user", JSON.stringify(currentUser));
    purchasedCourses = [];
    transactions = [];
    currentVideoProgress = {};
    updateAuthUI();
    closeRegisterModal();
    const registerForm = document.getElementById("register-form");
    if (registerForm) registerForm.reset();
    loadAllDocuments();
    loadFeaturedDocuments();
    showToast("Registration successful! Welcome to LearnHub.", "success");
    closeMobileMenu();
    navigateTo('dashboard');
  } catch (err) {
    showToast(err.message || "Registration failed. Please try again.", "error");
  } finally {
    if (btn) {
      btn.disabled = false;
      btn.textContent = "Create Account";
    }
  }
}

async function logout() {
  try {
    await apiFetch("/logout", { method: "POST" });
  } catch (e) { }
  currentUser = null;
  purchasedCourses = [];
  transactions = [];
  currentVideoProgress = {};
  localStorage.removeItem("learnhub_user");
  localStorage.removeItem("learnhub_token");
  updateAuthUI();
  closeMobileMenu();
  loadAllDocuments();
  loadFeaturedDocuments();
  if (currentPage === "documents") showLoginNotice();
  navigateTo('home');
  showToast("Logged out successfully", "success");
}

// ============================================
// Purchase Functions (Full QR Payment)
// ============================================
// ============================================
// Purchase Functions (Full QR Payment with Paid Modal)
// ============================================
function updatePurchaseButtons(courseId, course, isPurchased) {
  ["desktop-purchase-button", "mobile-purchase-button"].forEach((btnId) => {
    const btn = document.getElementById(btnId);
    if (!btn) return;
    if (isPurchased) {
      btn.innerHTML = '<i class="fas fa-check mr-2"></i> Course Purchased';
      btn.disabled = true;
      btn.style.cssText = "background:#16a34a;color:white;cursor:not-allowed;opacity:1;";
      btn.onclick = null;
    } else {
      btn.innerHTML = '<i class="fas fa-shopping-cart mr-2"></i> Purchase Course';
      btn.disabled = false;
      btn.style.cssText = "background:#7c3aed;color:white;width:100%;padding:12px;border-radius:8px;border:none;font-size:16px;font-weight:600;cursor:pointer;";
      btn.onclick = () => purchaseCourse(courseId);
    }
  });
  updateSystemStatusCard();
}

async function purchaseCourse(courseId) {
  if (!currentUser) {
    showLoginModal();
    return;
  }

  if (!isSystemOpen()) {
    showToast("System is closed. Purchases only available 8AM-10PM.", "error");
    return;
  }

  const numericCourseId = Number(courseId);

  if (purchasedCourses.includes(numericCourseId)) {
    showToast("You already own this course!", "success");
    return;
  }

  // Show loading
  ["desktop-purchase-button", "mobile-purchase-button"].forEach((btnId) => {
    const btn = document.getElementById(btnId);
    if (btn) {
      btn.disabled = true;
      btn.innerHTML = '<i class="fas fa-spinner fa-spin mr-2"></i> Generating QR...';
      btn.style.cssText = "opacity:0.8;cursor:not-allowed;background:#7c3aed;color:white;width:100%;padding:12px;border-radius:8px;border:none;font-size:16px;font-weight:600;";
    }
  });

  try {
    const data = await apiFetch("/khqr/generate", {
      method: "POST",
      body: JSON.stringify({ course_item_id: numericCourseId }),
    });

    // ✅ Check if user already paid FIRST
    if (data.status === "paid") {
      // Add to purchased courses if not already there
      if (!purchasedCourses.includes(numericCourseId)) {
        purchasedCourses.push(numericCourseId);
      }

      // Re-enable buttons
      ["desktop-purchase-button", "mobile-purchase-button"].forEach((btnId) => {
        const btn = document.getElementById(btnId);
        if (btn) {
          btn.disabled = false;
          btn.innerHTML = '<i class="fas fa-shopping-cart mr-2"></i> Purchase Course';
          btn.style.cssText = "background:#7c3aed;color:white;width:100%;padding:12px;border-radius:8px;border:none;font-size:16px;font-weight:600;cursor:pointer;";
        }
      });

      // Show the paid modal (this will show the "already paid" status)
      showKhqrModal(data, numericCourseId);
      return; // Don't proceed further
    }

    // Re-enable buttons before showing QR
    ["desktop-purchase-button", "mobile-purchase-button"].forEach((btnId) => {
      const btn = document.getElementById(btnId);
      if (btn) {
        btn.disabled = false;
        btn.innerHTML = '<i class="fas fa-shopping-cart mr-2"></i> Purchase Course';
        btn.style.cssText = "background:#7c3aed;color:white;width:100%;padding:12px;border-radius:8px;border:none;font-size:16px;font-weight:600;cursor:pointer;";
      }
    });

    // Show QR modal for unpaid purchase
    showKhqrModal(data, numericCourseId);

  } catch (err) {
    showToast(err.message || "Failed to generate QR. Please try again.", "error");

    // Re-enable buttons on error
    ["desktop-purchase-button", "mobile-purchase-button"].forEach((btnId) => {
      const btn = document.getElementById(btnId);
      if (btn) {
        btn.disabled = false;
        btn.innerHTML = '<i class="fas fa-shopping-cart mr-2"></i> Purchase Course';
        btn.style.cssText = "background:#7c3aed;color:white;width:100%;padding:12px;border-radius:8px;border:none;font-size:16px;font-weight:600;cursor:pointer;";
      }
    });
  }
}

function showPaidModal(courseTitle) {
  // Remove existing modal
  const existing = document.getElementById("khqr-modal");
  if (existing) existing.remove();

  const modal = document.createElement("div");
  modal.id = "khqr-modal";
  modal.style.cssText = `
    position: fixed;
    inset: 0;
    background: rgba(0, 0, 0, 0.7);
    z-index: 9999;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 20px;
    backdrop-filter: blur(4px);
    animation: fadeIn 0.3s ease-out;
  `;

  modal.innerHTML = `
    <div style="
      background: white;
      border-radius: 28px;
      padding: 40px 32px;
      max-width: 450px;
      width: 90%;
      box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.25);
      text-align: center;
      position: relative;
      animation: slideUp 0.4s ease-out;
    ">
      <button onclick="closeKhqrModal()" style="
        position: absolute;
        top: 20px;
        right: 20px;
        background: #f1f5f9;
        border: none;
        border-radius: 50%;
        width: 36px;
        height: 36px;
        cursor: pointer;
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 18px;
        color: #64748b;
        transition: all 0.2s;
      " onmouseover="this.style.background='#e2e8f0'" onmouseout="this.style.background='#f1f5f9'">✕</button>

      <div style="
        width: 80px;
        height: 80px;
        background: linear-gradient(135deg, #10b981, #059669);
        border-radius: 50%;
        display: flex;
        align-items: center;
        justify-content: center;
        margin: 0 auto 24px;
      ">
        <svg style="width: 48px; height: 48px; color: white;" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M5 13l4 4L19 7"></path>
        </svg>
      </div>

      <h2 style="
        color: #065f46;
        font-size: 28px;
        font-weight: 800;
        margin: 0 0 12px 0;
      ">✅ Payment Completed!</h2>
      
      <p style="
        margin: 0 0 8px 0;
        color: #1f2937;
        font-size: 18px;
        font-weight: 500;
      ">You have already paid for:</p>
      
      <p style="
        margin: 0 0 24px 0;
        color: #7c3aed;
        font-size: 20px;
        font-weight: 700;
        background: #f3f4f6;
        padding: 12px;
        border-radius: 12px;
      ">${courseTitle}</p>
      
      <button onclick="closeKhqrModal()" style="
        background: linear-gradient(135deg, #7c3aed, #6d28d9);
        color: white;
        border: none;
        border-radius: 12px;
        padding: 12px 24px;
        font-size: 16px;
        font-weight: 600;
        cursor: pointer;
        transition: transform 0.2s;
        width: 100%;
      " onmouseover="this.style.transform='translateY(-2px)'" onmouseout="this.style.transform='translateY(0)'">
        Continue Learning
      </button>
    </div>
    
    <style>
      @keyframes fadeIn {
        from {
          opacity: 0;
        }
        to {
          opacity: 1;
        }
      }
      
      @keyframes slideUp {
        from {
          opacity: 0;
          transform: translateY(30px);
        }
        to {
          opacity: 1;
          transform: translateY(0);
        }
      }
      
      @keyframes fadeOut {
        from {
          opacity: 1;
        }
        to {
          opacity: 0;
        }
      }
    </style>
  `;

  document.body.appendChild(modal);
  document.body.style.overflow = "hidden";

  // Auto close after 4 seconds (optional)
  setTimeout(() => {
    if (document.getElementById("khqr-modal")) {
      modal.style.animation = "fadeOut 0.3s ease-out forwards";
      setTimeout(() => {
        closeKhqrModal();
      }, 300);
    }
  }, 4000);
}

let khqrPollingInterval = null;

function showKhqrModal(data, courseId) {
  // Remove existing modal
  const existing = document.getElementById("khqr-modal");
  if (existing) existing.remove();

  const modal = document.createElement("div");
  modal.id = "khqr-modal";
  modal.style.cssText =
    "position:fixed;inset:0;background:rgba(0,0,0,0.6);z-index:9999;display:flex;align-items:center;justify-content:center;padding:16px;backdrop-filter:blur(4px);";

  // Check if user already paid
  const isPaid = data.status === "paid";

  modal.innerHTML = `
    <div style="
        background:white;
        border-radius:24px;
        padding:32px;
        max-width:400px;
        width:100%;
        box-shadow:0 20px 60px rgba(0,0,0,0.3);
        text-align:center;
        position:relative;
    ">
        <!-- Close button -->
        <button onclick="closeKhqrModal()" style="
            position:absolute;top:16px;right:16px;
            background:#f1f5f9;border:none;border-radius:50%;
            width:32px;height:32px;cursor:pointer;
            display:flex;align-items:center;justify-content:center;
            font-size:16px;color:#64748b;
        ">✕</button>

        <!-- Bakong Logo -->
        <div style="margin-bottom:16px;">
            <div style="
                background:linear-gradient(135deg,#e31837,#c41230);
                border-radius:16px;
                padding:12px 24px;
                display:inline-block;
                margin-bottom:8px;
            ">
                <span style="color:white;font-weight:800;font-size:20px;letter-spacing:1px;">BAKONG</span>
            </div>
            <p style="color:#64748b;font-size:13px;margin:0;">
                ${isPaid ? "Payment already completed" : "Scan with Bakong app to pay"}
            </p>
        </div>

        <!-- Course Info -->
        <div style="
            background:#f8fafc;
            border-radius:12px;
            padding:12px 16px;
            margin-bottom:16px;
            text-align:left;
        ">
            <p style="margin:0;font-size:13px;color:#64748b;">Course</p>
            <p style="margin:4px 0 0;font-weight:600;font-size:14px;color:#1e293b;">${data.course_title}</p>
        </div>

        ${!isPaid
      ? `
            <!-- QR Code - Only shown if NOT paid -->
            <div style="
                border:3px solid #e2e8f0;
                border-radius:16px;
                padding:16px;
                margin-bottom:16px;
                display:inline-block;
            ">
                <img src="https://api.qrserver.com/v1/create-qr-code/?size=250x250&data=${encodeURIComponent(data.qr_string)}" 
                    alt="KHQR Code" 
                    style="width:220px;height:220px;display:block;"
                    onerror="this.src='data:image/svg+xml,<svg xmlns=\'http://www.w3.org/2000/svg\' width=\'220\' height=\'220\'><text y=\'110\' x=\'50%\' text-anchor=\'middle\' font-size=\'14\'>QR Load Failed</text></svg>'">
            </div>

            <!-- Amount - Only shown if NOT paid -->
            <div style="
                background:linear-gradient(135deg,#7c3aed,#6d28d9);
                border-radius:12px;
                padding:12px 24px;
                margin-bottom:20px;
                display:inline-block;
            ">
                <p style="margin:0;color:rgba(255,255,255,0.8);font-size:12px;">Amount to Pay</p>
                <p style="margin:4px 0 0;color:white;font-weight:800;font-size:28px;">
                    $${Number(data.amount).toFixed(2)}
                </p>
            </div>

            <!-- Status - Pending payment -->
            <div id="khqr-status" style="
                display:flex;align-items:center;justify-content:center;
                gap:8px;margin-bottom:16px;
                background:#fef9c3;
                border-radius:10px;padding:10px 16px;
            ">
                <div style="
                    width:8px;height:8px;border-radius:50%;
                    background:#f59e0b;
                    animation:pulse 1.5s infinite;
                "></div>
                <span id="khqr-status-text" style="font-size:13px;color:#92400e;font-weight:500;">
                    Waiting for payment...
                </span>
            </div>

            <p style="color:#94a3b8;font-size:12px;margin:0;">
                QR expires in <span id="khqr-timer" style="font-weight:600;color:#ef4444;">5:00</span>
            </p>
            `
      : `
            <!-- Paid Status - Only shown if PAID -->
            <div style="
                background:linear-gradient(135deg,#10b981,#059669);
                border-radius:16px;
                padding:24px;
                margin-bottom:16px;
                text-align:center;
            ">
                <div style="font-size:48px;margin-bottom:12px;">✅</div>
                <p style="margin:0;color:white;font-size:18px;font-weight:700;">Payment Completed!</p>
                <p style="margin:8px 0 0;color:rgba(255,255,255,0.9);font-size:14px;">
                    You have already paid for this course.
                </p>
            </div>
            `
    }

        <style>
            @keyframes pulse {
                0%, 100% { opacity: 1; transform: scale(1); }
                50% { opacity: 0.5; transform: scale(1.3); }
            }
        </style>
    </div>
  `;

  document.body.appendChild(modal);
  document.body.style.overflow = "hidden";

  // Only start polling and timer if NOT paid
  if (!isPaid) {
    startKhqrPolling(data.payment_id, courseId);
    startKhqrTimer(300);
  }
}

function startKhqrPolling(paymentId, courseId) {
  clearInterval(khqrPollingInterval);
  khqrPollingInterval = setInterval(async () => {
    try {
      const result = await apiFetch("/khqr/check-status", {
        method: "POST",
        body: JSON.stringify({ payment_id: paymentId }),
      });

      // Check if payment is successful
      if (result.status === "SUCCESS" || result.status === "paid") {
        // Clear the polling interval immediately
        clearInterval(khqrPollingInterval);
        khqrPollingInterval = null;

        // Add course to purchased list
        if (!purchasedCourses.includes(courseId)) {
          purchasedCourses.push(courseId);
        }

        // Close the QR modal
        closeKhqrModal();

        // Show a large, centered success modal
        showSuccessModal("Payment Confirmed! 🎉", "Your course has been unlocked successfully!");

        // Optional: Refresh the page after 3 seconds to update UI
        setTimeout(() => {
          window.location.reload();
        }, 3000);
      }
    } catch (e) {
      console.error("Polling error:", e);
      // Keep polling on error, don't close modal
    }
  }, 3000); // Check every 3 seconds
}

// New function to show a large success modal
function showSuccessModal(title, message) {
  // Remove any existing success modal
  const existing = document.getElementById("success-modal");
  if (existing) existing.remove();

  const modal = document.createElement("div");
  modal.id = "success-modal";
  modal.style.cssText = `
    position: fixed;
    inset: 0;
    background: rgba(0, 0, 0, 0.8);
    z-index: 10000;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 20px;
    backdrop-filter: blur(8px);
    animation: fadeIn 0.3s ease-out;
  `;

  modal.innerHTML = `
    <div style="
      background: linear-gradient(135deg, #10b981, #059669);
      border-radius: 32px;
      padding: 48px 32px;
      max-width: 500px;
      width: 90%;
      text-align: center;
      box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.5);
      transform: scale(1);
      animation: bounceIn 0.5s ease-out;
    ">
      <div style="
        width: 80px;
        height: 80px;
        background: white;
        border-radius: 50%;
        display: flex;
        align-items: center;
        justify-content: center;
        margin: 0 auto 24px;
        animation: checkmark 0.5s ease-out 0.2s both;
      ">
        <svg style="width: 48px; height: 48px; color: #10b981;" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="3" d="M5 13l4 4L19 7"></path>
        </svg>
      </div>
      
      <h2 style="
        color: white;
        font-size: 32px;
        font-weight: 800;
        margin: 0 0 12px 0;
        letter-spacing: -0.5px;
      ">${title}</h2>
      
      <p style="
        color: rgba(255, 255, 255, 0.95);
        font-size: 18px;
        margin: 0 0 32px 0;
        line-height: 1.5;
      ">${message}</p>
      
      <div style="
        display: inline-block;
        background: rgba(255, 255, 255, 0.2);
        border-radius: 12px;
        padding: 8px 20px;
        margin-top: 8px;
      ">
        <span style="
          color: white;
          font-size: 14px;
          font-weight: 500;
        ">Redirecting in 3 seconds...</span>
      </div>
    </div>
    
    <style>
      @keyframes fadeIn {
        from {
          opacity: 0;
        }
        to {
          opacity: 1;
        }
      }
      
      @keyframes bounceIn {
        0% {
          opacity: 0;
          transform: scale(0.3);
        }
        50% {
          opacity: 1;
          transform: scale(1.05);
        }
        70% {
          transform: scale(0.9);
        }
        100% {
          transform: scale(1);
        }
      }
      
      @keyframes checkmark {
        0% {
          opacity: 0;
          transform: scale(0.5);
        }
        50% {
          opacity: 1;
          transform: scale(1.2);
        }
        100% {
          opacity: 1;
          transform: scale(1);
        }
      }
    </style>
  `;

  document.body.appendChild(modal);
  document.body.style.overflow = "hidden";

  // Auto close after 3 seconds (with redirect)
  setTimeout(() => {
    const successModal = document.getElementById("success-modal");
    if (successModal) {
      successModal.style.animation = "fadeOut 0.3s ease-out forwards";
      setTimeout(() => {
        successModal.remove();
        document.body.style.overflow = "";
      }, 300);
    }
  }, 3000);
}
function startKhqrTimer(seconds) {
  const timerEl = document.getElementById("khqr-timer");
  let remainingSeconds = seconds;

  const timerInterval = setInterval(() => {
    remainingSeconds--;

    if (!timerEl || remainingSeconds <= 0) {
      // Timer expired
      clearInterval(timerInterval);
      clearInterval(khqrPollingInterval);
      khqrPollingInterval = null;

      // Close modal if it's still open
      if (document.getElementById("khqr-modal")) {
        closeKhqrModal();
        showToast("QR code expired. Please try again.", "error");
      }
      return;
    }

    const mins = Math.floor(remainingSeconds / 60);
    const secs = remainingSeconds % 60;
    if (timerEl) {
      timerEl.textContent = `${mins}:${secs.toString().padStart(2, "0")}`;
    }

    // Update status text for last 30 seconds
    if (remainingSeconds <= 30) {
      const statusText = document.getElementById("khqr-status-text");
      if (statusText) {
        statusText.textContent = "⏰ QR expiring soon...";
        statusText.style.color = "#dc2626";
      }
    }
  }, 1000);
}

function closeKhqrModal() {
  // Clear any running intervals
  if (khqrPollingInterval) {
    clearInterval(khqrPollingInterval);
    khqrPollingInterval = null;
  }

  // Remove modal from DOM
  const modal = document.getElementById("khqr-modal");
  if (modal) {
    modal.remove();
  }

  // Re-enable scrolling
  document.body.style.overflow = "";

  // Optional: Re-enable purchase buttons if they were disabled
  ["desktop-purchase-button", "mobile-purchase-button"].forEach((btnId) => {
    const btn = document.getElementById(btnId);
    if (btn && btn.disabled) {
      btn.disabled = false;
      btn.innerHTML = '<i class="fas fa-shopping-cart mr-2"></i> Purchase Course';
      btn.style.cssText = "background:#7c3aed;color:white;width:100%;padding:12px;border-radius:8px;border:none;font-size:16px;font-weight:600;cursor:pointer;";
    }
  });
}
// ============================================
// System & Utility
// ============================================
function updateSystemStatusCard() {
  const isOpen = isSystemOpen();
  const statusHTML = isOpen
    ? `<div class="flex items-center"><div class="mr-3"><i class="fas fa-check-circle text-green-500 text-lg"></i></div><div><h4 class="font-bold text-green-600 text-sm">System Open</h4><p class="text-xs text-gray-600">Purchases available 24/7</p></div></div>`
    : `<div class="flex items-center"><div class="mr-3"><i class="fas fa-times-circle text-red-500 text-lg"></i></div><div><h4 class="font-bold text-red-600 text-sm">System Closed</h4><p class="text-xs text-gray-600">Purchases unavailable</p></div></div>`;
  const desktopStatus = document.getElementById("desktop-system-status");
  const mobileStatus = document.getElementById("mobile-system-status");
  if (desktopStatus) desktopStatus.innerHTML = statusHTML;
  if (mobileStatus) mobileStatus.innerHTML = statusHTML;
}

function isSystemOpen() {
  return true;
}

// ============================================
// Mobile Menu
// ============================================
function toggleMobileMenu() {
  if (mobileMenu && mobileMenuBtn) {
    mobileMenu.classList.toggle("hidden");
    const icon = mobileMenuBtn.querySelector("i");
    if (icon) icon.className = mobileMenu.classList.contains("hidden") ? "fas fa-bars text-sm" : "fas fa-times text-sm";
  }
}

function closeMobileMenu() {
  if (mobileMenu && mobileMenuBtn) {
    mobileMenu.classList.add("hidden");
    const icon = mobileMenuBtn.querySelector("i");
    if (icon) icon.className = "fas fa-bars text-sm";
  }
}

// ============================================
// Theme
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
  if (icon) icon.className = isDark ? "fas fa-moon text-yellow-300" : "fas fa-sun text-yellow-500";
}

// ============================================
// Toast Notification
// ============================================
function showToast(message, type = "success") {
  document.querySelectorAll(".toast").forEach((toast) => toast.remove());
  const icon = type === "success" ? "fa-check-circle" : type === "error" ? "fa-exclamation-circle" : "fa-info-circle";
  const bgColor = type === "success" ? "bg-green-500" : type === "error" ? "bg-red-500" : "bg-blue-500";
  const toast = document.createElement("div");
  toast.className = `toast fixed bottom-4 right-4 ${bgColor} text-white px-4 py-3 rounded-lg shadow-lg flex items-center gap-3 z-50 animate-slide-up`;
  toast.innerHTML = `
    <i class="fas ${icon}"></i>
    <div class="flex-1"><p class="text-sm font-medium">${message}</p></div>
    <button class="text-white hover:text-gray-200" onclick="this.parentElement.remove()"><i class="fas fa-times"></i></button>`;
  document.body.appendChild(toast);
  setTimeout(() => {
    if (toast.parentElement) toast.remove();
  }, 5000);
}

// ============================================
// Contact Form
// ============================================
async function handleContactSubmit(e) {
  e.preventDefault();
  const full_name = document.getElementById("contact-name")?.value;
  const email = document.getElementById("contact-email")?.value;
  const subject = document.getElementById("contact-subject")?.value;
  const message = document.getElementById("contact-message")?.value;
  try {
    await apiFetch("/contact", {
      method: "POST",
      body: JSON.stringify({ full_name, email, subject, message }),
    });
    showToast("Message sent successfully!", "success");
    e.target.reset();
  } catch (err) {
    showToast(err.message || "Failed to send message", "error");
  }
}

// ============================================
// Event Listeners
// ============================================
function setupEventListeners() {
  if (themeToggle) themeToggle.addEventListener("click", toggleTheme);
  if (logoutBtn) logoutBtn.addEventListener("click", logout);
  if (mobileMenuBtn && mobileMenu) {
    mobileMenuBtn.addEventListener("click", toggleMobileMenu);
    document.addEventListener("click", (e) => {
      if (!mobileMenu.classList.contains("hidden") && !mobileMenu.contains(e.target) && !mobileMenuBtn.contains(e.target)) {
        closeMobileMenu();
      }
    });
  }

  const courseSearch = document.getElementById("course-search");
  if (courseSearch) courseSearch.addEventListener("input", filterCourses);

  const documentSearch = document.getElementById("document-search");
  if (documentSearch) documentSearch.addEventListener("input", filterDocuments);

  const contactForm = document.getElementById("contact-form");
  if (contactForm) contactForm.addEventListener("submit", handleContactSubmit);

  const logoContainer = document.querySelector(".logo-container");
  if (logoContainer) {
    logoContainer.addEventListener("click", (e) => {
      e.preventDefault();
      navigateTo('home');
    });
  }

  document.addEventListener("click", (e) => {
    if (e.target.closest(".view-details-btn")) {
      const btn = e.target.closest(".view-details-btn");
      const encryptedId = btn.dataset.courseId;
      if (encryptedId) window.location.href = `/course/${encryptedId}`;
    }
    if (e.target.closest(".dashboard-watch-btn")) {
      const btn = e.target.closest(".dashboard-watch-btn");
      const encryptedId = btn.dataset.courseId;
      if (encryptedId) window.location.href = `/course/${encryptedId}`;
    }
    if (e.target.closest(".course-card") && !e.target.closest("button")) {
      const card = e.target.closest(".course-card");
      const encryptedId = card.dataset.courseId;
      if (encryptedId) window.location.href = `/course/${encryptedId}`;
    }
  });
}

// ============================================
// Modals
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
  document.body.insertAdjacentHTML("beforeend", `
    <div id="login-modal" class="hidden fixed inset-0 bg-black bg-opacity-50 z-50 items-center justify-center p-4">
      <div class="bg-white dark:bg-gray-800 rounded-xl shadow-2xl max-w-md w-full max-h-[90vh] overflow-auto">
        <div class="p-6">
          <div class="flex justify-between items-center mb-6">
            <h2 class="text-2xl font-bold">Login to LearnHub</h2>
            <button onclick="closeLoginModal()" class="p-2 hover:bg-gray-100 rounded-lg"><i class="fas fa-times text-gray-600"></i></button>
          </div>
          <form id="login-form" class="space-y-4">
            <div><label class="mb-2 block text-sm font-medium text-gray-700">Email</label><input type="email" id="login-email" class="w-full px-3 py-2 border border-gray-300 rounded-md" placeholder="name@example.com" required></div>
            <div><label class="mb-2 block text-sm font-medium text-gray-700">Password</label><input type="password" id="login-password" class="w-full px-3 py-2 border border-gray-300 rounded-md" placeholder="Enter your password" required></div>
            <button type="submit" class="btn btn-primary w-full py-2.5">Login</button>
          </form>
          <p class="mt-4 text-center text-sm text-gray-600">Don't have an account? <button onclick="closeLoginModal();showRegisterModal();" class="text-purple-600 hover:underline">Register here</button></p>
        </div>
      </div>
    </div>
  `);
  const loginForm = document.getElementById("login-form");
  if (loginForm) loginForm.addEventListener("submit", handleLogin);
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
  document.body.insertAdjacentHTML("beforeend", `
    <div id="register-modal" class="hidden fixed inset-0 bg-black bg-opacity-50 z-50 items-center justify-center p-4">
      <div class="bg-white dark:bg-gray-800 rounded-xl shadow-2xl max-w-md w-full max-h-[90vh] overflow-auto">
        <div class="p-6">
          <div class="flex justify-between items-center mb-6">
            <h2 class="text-2xl font-bold">Create Account</h2>
            <button onclick="closeRegisterModal()" class="p-2 hover:bg-gray-100 rounded-lg"><i class="fas fa-times text-gray-600"></i></button>
          </div>
          <form id="register-form" class="space-y-4">
            <div><label class="mb-2 block text-sm font-medium text-gray-700">Full Name</label><input type="text" id="register-name" class="w-full px-3 py-2 border border-gray-300 rounded-md" placeholder="John Doe" required></div>
            <div><label class="mb-2 block text-sm font-medium text-gray-700">Email</label><input type="email" id="register-email" class="w-full px-3 py-2 border border-gray-300 rounded-md" placeholder="name@example.com" required></div>
            <div><label class="mb-2 block text-sm font-medium text-gray-700">Password</label><input type="password" id="register-password" class="w-full px-3 py-2 border border-gray-300 rounded-md" placeholder="Create a password" required></div>
            <div><label class="mb-2 block text-sm font-medium text-gray-700">Confirm Password</label><input type="password" id="register-confirm-password" class="w-full px-3 py-2 border border-gray-300 rounded-md" placeholder="Confirm your password" required></div>
            <button type="submit" class="btn btn-primary w-full py-2.5">Create Account</button>
          </form>
          <p class="mt-4 text-center text-sm text-gray-600">Already have an account? <button onclick="closeRegisterModal();showLoginModal();" class="text-purple-600 hover:underline">Login here</button></p>
        </div>
      </div>
    </div>
  `);
  const registerForm = document.getElementById("register-form");
  if (registerForm) registerForm.addEventListener("submit", handleRegister);
}

function closeRegisterModal() {
  const modal = document.getElementById("register-modal");
  if (modal) {
    modal.classList.add("hidden");
    modal.classList.remove("flex");
    document.body.style.overflow = "auto";
  }
}

function clearUserData() {
  localStorage.removeItem("learnhub_user");
  localStorage.removeItem("learnhub_token");
  currentUser = null;
  purchasedCourses = [];
  transactions = [];
  currentVideoProgress = {};
}

// ============================================
// Initialize
// ============================================
document.addEventListener("DOMContentLoaded", init);
setInterval(updateSystemStatusCard, 60000);

// CSS
const style = document.createElement("style");
style.textContent = `
  @keyframes slide-up { from { transform: translateY(100%); opacity: 0; } to { transform: translateY(0); opacity: 1; } }
  .animate-slide-up { animation: slide-up 0.3s ease-out; }
  .page-hidden { display: none !important; }
  .btn:disabled { opacity: 0.7; cursor: not-allowed; }
`;
document.head.appendChild(style);