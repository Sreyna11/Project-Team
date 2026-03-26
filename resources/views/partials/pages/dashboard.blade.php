@extends('app')

@section('title', 'Course Detail')

@section('content')
<div id="dashboard-page" class="page page-hidden">
        <div class="py-10">
          <div class="container mx-auto px-4">
            <!-- Header -->
            <div class="mb-10">
              <h1 class="text-3xl font-bold mb-2">My Dashboard</h1>
              <p class="text-gray-600 dark:text-gray-400">
                Manage your courses, documents, and account from your dashboard.
              </p>
            </div>

            <div class="grid grid-cols-1 lg:grid-cols-4 gap-6">
              <!-- Sidebar - User Profile & Navigation -->
              <div class="lg:col-span-1">
                <div
                  class="bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 p-6 mb-6"
                >
                  <!-- User Profile -->
                  <div class="text-center">
                    <div
                      class="w-20 h-20 rounded-full bg-gradient-to-br from-purple-600 to-purple-500 mx-auto mb-4 flex items-center justify-center"
                    >
                      <i class="fas fa-user text-3xl text-white"></i>
                    </div>
                    <h2 id="dashboard-user-name" class="text-xl font-bold mb-1">
                      Aok Sreyna
                    </h2>
                    <p
                      id="dashboard-user-email"
                      class="text-gray-600 dark:text-gray-400 text-sm mb-3"
                    >
                      aoksreyna@gmail.com
                    </p>
                    <p class="text-xs text-gray-500 dark:text-gray-400">
                      <i class="fas fa-calendar-alt mr-1"></i>
                      Member Since:
                      <span id="dashboard-member-date">Feb 2026</span>
                    </p>
                  </div>

                  <!-- Navigation Menu -->
                  <div
                    class="mt-6 pt-6 border-t border-gray-200 dark:border-gray-700"
                  >
                    <h3
                      class="font-bold mb-4 text-purple-600 dark:text-gray-300"
                    >
                      Quick Access
                    </h3>

                    <!-- Navigation Links -->
                    <nav class="space-y-2">
                      <!-- My Courses Link -->
                      <button
                        onclick="showDashboardView('courses')"
                        class="w-full flex items-center gap-3 p-3 rounded-lg hover:bg-purple-100 dark:hover:bg-gray-700 transition-colors text-left"
                      >
                        <div
                          class="w-10 h-10 rounded-lg bg-purple-100 dark:bg-purple-900 flex items-center justify-center"
                        >
                          <i
                            class="fas fa-video text-purple-600 dark:text-purple-400"
                          ></i>
                        </div>
                        <div>
                          <p class="font-medium">My Courses</p>
                          <p class="text-xs text-gray-500 dark:text-gray-400">
                            <span id="dashboard-course-count">0</span> purchased
                          </p>
                        </div>
                      </button>

                      <!-- Receipts Link -->
                      <button
                        onclick="showDashboardView('receipts')"
                        class="w-full flex items-center gap-3 p-3 rounded-lg hover:bg-blue-100 dark:hover:bg-gray-700 transition-colors text-left"
                      >
                        <div
                          class="w-10 h-10 rounded-lg bg-blue-100 dark:bg-blue-900 flex items-center justify-center"
                        >
                          <i
                            class="fas fa-receipt text-blue-600 dark:text-blue-400"
                          ></i>
                        </div>
                        <div>
                          <p class="font-medium">View Receipts</p>
                          <p class="text-xs text-gray-500 dark:text-gray-400">
                            <span id="dashboard-receipts-count">0</span>
                            transactions
                          </p>
                        </div>
                      </button>

                      <!-- Browse Documents Link -->
                      <button
                        onclick="window.location.hash = 'documents'"
                        class="w-full flex items-center gap-3 p-3 rounded-lg hover:bg-green-100 dark:hover:bg-gray-700 transition-colors text-left"
                      >
                        <div
                          class="w-10 h-10 rounded-lg bg-green-100 dark:bg-green-900 flex items-center justify-center"
                        >
                          <i
                            class="fas fa-book-open text-green-600 dark:text-green-400"
                          ></i>
                        </div>
                        <div>
                          <p class="font-medium">Browse Documents</p>
                          <p class="text-xs text-gray-500 dark:text-gray-400">
                            21 available
                          </p>
                        </div>
                      </button>
                    </nav>

                    <!-- Logout Button -->
                    <button
                      onclick="logout()"
                      class="w-full flex items-center gap-3 p-3 rounded-lg hover:bg-red-100 dark:hover:bg-red-900/20 transition-colors text-left text-red-600 dark:text-red-400 mt-4"
                    >
                      <div
                        class="w-10 h-10 rounded-lg bg-red-100 dark:bg-red-900 flex items-center justify-center"
                      >
                        <i class="fas fa-sign-out-alt"></i>
                      </div>
                      <div>
                        <p class="font-medium">Logout</p>
                        <p class="text-xs">Sign out of your account</p>
                      </div>
                    </button>
                  </div>
                </div>
              </div>

              <!-- Main Content Area -->
              <div class="lg:col-span-3">
                <!-- Content will be loaded here based on navigation -->
                <div id="dashboard-content">
                  <!-- Dashboard Main View (Default) -->
                  <div id="dashboard-main-view" class="dashboard-view">
                    <!-- Quick Stats -->
                    <div class="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                      <div
                        class="bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 p-6"
                      >
                        <h3 class="font-bold text-lg mb-4 text-purple-600">
                          Purchased Courses
                        </h3>
                        <div class="flex items-end gap-2">
                          <span
                            class="text-4xl font-bold text-gray-900 dark:text-white"
                            id="purchased-courses-count"
                            >0</span
                          >
                          <span class="text-gray-500 dark:text-gray-400 mb-2"
                            >courses</span
                          >
                        </div>
                        <button
                          onclick="showDashboardView('courses')"
                          class="mt-4 text-purple-600 hover:text-purple-700 font-medium"
                        >
                          View All →
                        </button>
                      </div>

                      <div
                        class="bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 p-6"
                      >
                        <h3 class="font-bold text-lg mb-4 text-green-600">
                          Total Spent
                        </h3>
                        <div class="flex items-end gap-2">
                          <span
                            class="text-4xl font-bold text-gray-900 dark:text-white"
                            id="total-spent-amount"
                            >$0.00</span
                          >
                        </div>
                        <button
                          onclick="showDashboardView('receipts')"
                          class="mt-4 text-green-400 hover:text-purple-700 font-medium"
                        >
                          View Receipts →
                        </button>
                      </div>

                      <div
                        class="bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 p-6"
                      >
                        <h3 class="font-bold text-lg mb-4 text-blue-600">
                          Last Purchase
                        </h3>
                        <div class="flex items-end gap-2">
                          <span
                            class="text-2xl font-bold text-gray-900 dark:text-white"
                            id="last-purchase-date"
                            >-</span
                          >
                        </div>
                        <p
                          class="text-blue-400 dark:text-gray-400 mt-2"
                          id="last-purchase-course"
                        >
                          No purchases yet
                        </p>
                      </div>
                    </div>

                    <!-- Recent Courses (Show 3) -->
                    <div
                      class="bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 mb-6"
                    >
                      <div
                        class="p-6 border-b border-gray-200 dark:border-gray-700"
                      >
                        <h2 class="text-xl font-bold">My Recent Courses</h2>
                        <p class="text-gray-600 dark:text-gray-400 text-sm">
                          Recently purchased courses
                        </p>
                      </div>
                      <div class="p-6">
                        <div
                          class="grid grid-cols-1 md:grid-cols-3 gap-6"
                          id="recent-courses-grid"
                        >
                          <!-- Will be populated by JavaScript -->
                          <div class="text-center py-12 col-span-3">
                            <i
                              class="fas fa-video text-gray-300 dark:text-gray-600 text-4xl mb-4"
                            ></i>
                            <h3 class="text-lg font-semibold mb-2">
                              No Courses Purchased
                            </h3>
                            <p class="text-gray-600 dark:text-gray-400 mb-4">
                              You haven't purchased any courses yet.
                            </p>
                            <button
                              onclick="window.location.hash = 'courses'"
                              class="btn btn-primary py-2 px-4"
                            >
                              Browse Courses
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <!-- My Courses View (Hidden by default) -->
                  <div
                    id="dashboard-courses-view"
                    class="dashboard-view hidden"
                  >
                    <!-- Courses content will be loaded here -->
                  </div>

                  <!-- Receipts View (Hidden by default) -->
                  <div
                    id="dashboard-receipts-view"
                    class="dashboard-view hidden"
                  >
                    <!-- Receipts content will be loaded here -->
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      @endsection
