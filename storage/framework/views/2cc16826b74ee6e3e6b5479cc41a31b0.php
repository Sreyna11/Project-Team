

<?php $__env->startSection('title', 'Contact'); ?>

<?php $__env->startSection('content'); ?>
 <div id="contact-page" class="page page-hidden">
        <div class="container mx-auto px-4 py-8">
          <div class="mb-8">
            <h2 class="text-3xl font-bold mb-4">Contact Us</h2>
            <p class="text-muted-foreground">
              Have questions? We'd love to hear from you.
            </p>
          </div>

          <div class="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <!-- Contact Form -->
            <div
              class="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg border border-gray-200 dark:border-gray-700"
            >
              <h3 class="text-xl font-bold mb-6">Send us a message</h3>
              <form id="contact-form" class="space-y-6">
                <div>
                  <label class="block mb-2 font-medium text-purple-600"
                    >Full Name</label
                  >
                  <input
                    type="text"
                    id="contact-name"
                    class="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-purple-400"
                    placeholder="Your name"
                    required
                  />
                </div>

                <div>
                  <label class="block mb-2 font-medium text-purple-600"
                    >Email Address</label
                  >
                  <input
                    type="email"
                    id="contact-email"
                    class="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-purple-400"
                    placeholder="you@example.com"
                    required
                  />
                </div>

                <div>
                  <label class="block mb-2 font-medium text-purple-600"
                    >Subject</label
                  >
                  <input
                    type="text"
                    id="contact-subject"
                    class="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-purple-400"
                    placeholder="How can we help?"
                    required
                  />
                </div>

                <div>
                  <label class="block mb-2 font-medium text-purple-600"
                    >Message</label
                  >
                  <textarea
                    id="contact-message"
                    rows="5"
                    class="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-purple-400"
                    placeholder="Your message here..."
                    required
                  ></textarea>
                </div>

                <button type="submit" class="btn btn-primary w-full">
                  <i class="fas fa-paper-plane mr-2"></i> Send Message
                </button>
              </form>

              <!-- Success Message -->
              <div
                id="contact-success"
                class="hidden mt-4 p-4 bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200 rounded-lg"
              >
                <i class="fas fa-check-circle mr-2"></i>
                Message sent successfully! We'll get back to you soon.
              </div>
            </div>

            <!-- Contact Information -->
            <div class="space-y-6">
              <div
                class="bg-gradient-to-r from-purple-600 to-purple-800 rounded-xl p-6 text-white"
              >
                <h3 class="text-xl font-bold mb-4">Get in Touch</h3>
                <div class="space-y-4">
                  <div class="flex items-center gap-3">
                    <div
                      class="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center"
                    >
                      <i class="fas fa-envelope"></i>
                    </div>
                    <div>
                      <p class="font-medium">Email</p>
                      <p>support@learnhub.com</p>
                    </div>
                  </div>

                  <div class="flex items-center gap-3">
                    <div
                      class="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center"
                    >
                      <i class="fas fa-phone"></i>
                    </div>
                    <div>
                      <p class="font-medium">Phone</p>
                      <p>+1 (555) 123-4567</p>
                    </div>
                  </div>

                  <div class="flex items-center gap-3">
                    <div
                      class="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center"
                    >
                      <i class="fas fa-map-marker-alt"></i>
                    </div>
                    <div>
                      <p class="font-medium">Address</p>
                      <p>St 271, Steung Mean Chey , Mean Chey , Phnom Penh, Cambodia</p>
                    </div>
                  </div>
                </div>
              </div>

              <div
                class="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg border border-gray-200 dark:border-gray-700"
              >
                <h4 class="font-bold mb-4 text-blue-700">
                  Frequently Asked Questions
                </h4>
                <div class="space-y-3">
                  <div
                    class="border-b border-gray-200 dark:border-gray-700 pb-3"
                  >
                    <p class="font-medium mb-1 text-white-700">
                      How do I access purchased courses?
                    </p>
                    <p class="text-sm text-gray-500 dark:text-gray-400">
                      All purchased courses are available in your dashboard
                      24/7.
                    </p>
                  </div>
                  <div
                    class="border-b border-gray-200 dark:border-gray-700 pb-3"
                  >
                    <p class="font-medium mb-1 text-white-700">
                      Can I download course materials?
                    </p>
                    <p class="text-sm text-gray-500 dark:text-gray-400">
                      Yes, all documents are downloadable from your dashboard.
                    </p>
                  </div>
                  <div>
                    <p class="font-medium mb-1 text-white-700">
                      What's your refund policy?
                    </p>
                    <p class="text-sm text-gray-500 dark:text-gray-400">
                      We offer a 30-day money-back guarantee on all courses.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <?php $__env->stopSection(); ?>

<?php echo $__env->make('app', array_diff_key(get_defined_vars(), ['__data' => 1, '__path' => 1]))->render(); ?><?php /**PATH D:\Internship_ASS\Laravel\learnhub_project\resources\views/partials/pages/contact.blade.php ENDPATH**/ ?>