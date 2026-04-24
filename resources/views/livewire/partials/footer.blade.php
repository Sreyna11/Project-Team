<footer
    class="bg-gray-900 text-gray-400 border-t border-gray-800 pt-8 flex flex-col sm:flex-row items-center justify-between gap-4">
    <div class="container mx-auto px-4 py-16">
        <div class="grid grid-cols-1 md:grid-cols-4 gap-10 mb-12">
            {{-- Brand --}}
            <div class="md:col-span-1">
                <div class="flex items-center gap-2 mb-4">
                    <div class="w-10 h-10 rounded-xl bg-purple-600 flex items-center justify-center">
                        <i class="fas fa-graduation-cap text-white"></i>
                    </div>
                    <span class="text-xl font-black text-white">LearnHub</span>
                </div>
                <p class="text-sm leading-relaxed mb-6">
                    Empowering learners with quality tech education through expert-led video courses.
                </p>
                <div class="flex gap-3">
                    <a href="#"
                        class="w-9 h-9 rounded-xl bg-gray-800 hover:bg-purple-600 flex items-center justify-center transition-colors">
                        <i class="fab fa-facebook-f text-sm"></i>
                    </a>
                    <a href="#"
                        class="w-9 h-9 rounded-xl bg-gray-800 hover:bg-purple-600 flex items-center justify-center transition-colors">
                        <i class="fab fa-twitter text-sm"></i>
                    </a>
                    <a href="#"
                        class="w-9 h-9 rounded-xl bg-gray-800 hover:bg-purple-600 flex items-center justify-center transition-colors">
                        <i class="fab fa-youtube text-sm"></i>
                    </a>
                    <a href="#"
                        class="w-9 h-9 rounded-xl bg-gray-800 hover:bg-purple-600 flex items-center justify-center transition-colors">
                        <i class="fab fa-telegram-plane text-sm"></i>
                    </a>
                </div>
            </div>

            {{-- Quick Links --}}
            <div>
                <h4 class="font-bold text-white text-sm uppercase tracking-wider mb-5">Quick Links</h4>
                <ul class="space-y-3 text-sm">
                    <li><a href="{{ route('home') }}" class="hover:text-purple-400 transition-colors">Home</a></li>
                    <li><a href="{{ route('courses') }}" class="hover:text-purple-400 transition-colors">Courses</a>
                    </li>
                    <li><a href="{{ route('documents') }}" class="hover:text-purple-400 transition-colors">Documents</a>
                    </li>
                    <li><a href="{{ route('about') }}" class="hover:text-purple-400 transition-colors">About</a></li>
                    <li><a href="{{ route('contact') }}" class="hover:text-purple-400 transition-colors">Contact</a>
                    </li>
                </ul>
            </div>

            {{-- Support --}}
            <div>
                <h4 class="font-bold text-white text-sm uppercase tracking-wider mb-5">Support</h4>
                <ul class="space-y-3 text-sm">
                    <li><a href="{{ route('contact') }}" class="hover:text-purple-400 transition-colors">Help Center</a>
                    </li>
                    <li><a href="#" class="hover:text-purple-400 transition-colors">Privacy Policy</a></li>
                    <li><a href="#" class="hover:text-purple-400 transition-colors">Terms of Service</a></li>
                    <li><a href="#" class="hover:text-purple-400 transition-colors">Refund Policy</a></li>
                </ul>
            </div>

            {{-- Contact --}}
            <div>
                <h4 class="font-bold text-white text-sm uppercase tracking-wider mb-5">Contact Us</h4>
                <div class="space-y-3 text-sm">
                    <div class="flex items-center gap-3">
                        <i class="fas fa-envelope text-purple-400 w-4"></i>
                        <span>support@learnhub.com</span>
                    </div>
                    <div class="flex items-center gap-3">
                        <i class="fas fa-phone text-purple-400 w-4"></i>
                        <span>+855 71 873 1025</span>
                    </div>
                    <div class="flex items-start gap-3">
                        <i class="fas fa-map-marker-alt text-purple-400 w-4 mt-1"></i>
                        <span>St 271, Steung Mean Chey, Phnom Penh, Cambodia</span>
                    </div>
                </div>
            </div>
        </div>

        <div class="border-t border-gray-800 pt-8 flex flex-col sm:flex-row items-center justify-between gap-4">
            <p class="text-sm">© {{ date('Y') }} LearnHub. All rights reserved.</p>
            <div class="flex items-center gap-2 text-sm">
                <span>Payment:</span>
                <span class="px-2 py-0.5 bg-red-600 text-white text-xs font-bold rounded">BAKONG</span>
                <span class="px-2 py-0.5 bg-blue-600 text-white text-xs font-bold rounded">KHQR</span>
            </div>
        </div>
    </div>
</footer>