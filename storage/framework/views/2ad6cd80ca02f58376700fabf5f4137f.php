

<?php $__env->startSection('title', 'Home'); ?>

<?php $__env->startSection('content'); ?>
<div id="documents-page" class="page page-hidden">
      <div class="py-10">
        <div class="container mx-auto px-4">
          <!-- Header -->
          <div class="mb-10">
            <h1 class="text-4xl font-bold">Learning Documents</h1>
            <p>
              Free comprehensive documentation to supplement your learning
              journey.
            </p>
            <div class="mt-4">
              <button class="btn btn-primary" onclick="showLoginModal()">
                <i class="fas fa-sign-in-alt mr-2"></i> Login to Access
                Documents
              </button>
            </div>
          </div>

          <!-- Login Notice -->
          <div id="login-notice" class="alert alert-warning">
            <i class="fas fa-lock"></i>
            <div>
              <h4>Login Required to Read Documents</h4>
              <p>
                You need to
                <button onclick="showLoginModal()" class="text-link">
                  login
                </button>
                to access document content. Documents are free for all
                registered users.
              </p>
            </div>
          </div>

          <!-- Disclaimer -->
          <div class="alert alert-info">
            <i class="fas fa-info-circle"></i>
            <div>
              <h4>External Resources</h4>
              <p>
                Content accessed from external educational resources (MDN Web
                Docs, W3Schools, GeeksforGeeks, etc.) for academic
                demonstration purposes only.
              </p>
            </div>
          </div>

          <!-- Filters -->
          <div class="mb-10 flex flex-col gap-6 lg:flex-row">
            <!-- Search -->
            <div class="relative flex-1">
              <div class="search-container">
                <i class="fas fa-search search-icon"></i>
                <input type="text" id="document-search" class="search-input" placeholder="Search documents..." />
              </div>
            </div>

            <!-- Category Filter -->
            <div class="flex flex-wrap gap-2" id="document-categories-filter">
              <!-- Categories will be loaded here -->
            </div>
          </div>

          <!-- Results Count -->
          <p class="results-count">
            Showing
            <span id="document-results-count" class="font-semibold">0</span>
            of
            <span id="document-total-count" class="font-semibold">0</span>
            documents
          </p>

          <!-- Documents Grid -->
          <div class="course-grid" id="all-documents-grid">
            <!-- All documents will be loaded here -->
          </div>
        </div>
      </div>
    </div>
<?php $__env->stopSection(); ?>

<?php echo $__env->make('app', array_diff_key(get_defined_vars(), ['__data' => 1, '__path' => 1]))->render(); ?><?php /**PATH D:\Internship_ASS\Laravel\learnhub_project\resources\views/partials/pages/documents.blade.php ENDPATH**/ ?>