<div class="min-h-screen bg-gray-50 dark:bg-gray-900" wire:poll.2s="checkPaymentStatus">
    
    {{-- Floating Success Badge (Optional, removes if you prefer just the modal) --}}
    @if($khqrStatus === 'paid')
        <div class="fixed top-5 right-5 z-50">
            <div class="bg-emerald-500 text-white px-6 py-4 rounded-2xl shadow-xl flex items-center gap-3 animate-bounce">
                <i class="fas fa-check-circle text-xl"></i>
                <div>
                    <p class="font-bold text-sm">Payment Successful</p>
                    <p class="text-xs opacity-90">Course unlocked 🎉</p>
                </div>
            </div>
        </div>
    @endif

    {{-- Back --}}
    <div class="bg-white dark:bg-gray-950 border-b border-gray-200 dark:border-gray-800">
        <div class="max-w-7xl mx-auto px-4 py-4 lg:py-5">
            <a href="{{ route('courses') }}" class="inline-flex items-center gap-2 px-4 py-2.5 text-purple-600 dark:text-purple-400 hover:text-purple-700 dark:hover:text-purple-300 bg-purple-50 dark:bg-purple-900/20 hover:bg-purple-100 dark:hover:bg-purple-900/40 rounded-xl font-semibold text-sm lg:text-base transition-all duration-200 group">
                <i class="fas fa-arrow-left text-xs lg:text-sm group-hover:-translate-x-0.5 transition-transform duration-200"></i>
                <span>Back to Courses</span>
            </a>
        </div>
    </div>

    {{-- Dark Hero Banner --}}
    <div class="bg-gray-900 py-10 lg:py-16">
        <div class="max-w-7xl mx-auto px-4">
            <div class="max-w-3xl">
                <div class="flex flex-wrap gap-2 mb-4">
                    @if($course->is_hot)
                        <span class="text-xs px-3 py-1.5 rounded font-bold bg-yellow-400 text-yellow-900">Highest Rated</span>
                        <span class="text-xs px-3 py-1.5 rounded font-bold bg-red-500 text-white">Hot & New</span>
                    @endif
                    @if($course->category)
                        <span class="text-xs px-3 py-1.5 rounded bg-purple-600 text-white font-medium">{{ $course->category->name }}</span>
                    @endif
                    @if($course->activePromotion)
                        <span class="text-xs px-3 py-1.5 rounded font-bold bg-gradient-to-r from-amber-400 to-orange-500 text-gray-900">
                            <i class="fas fa-star mr-1"></i> {{ $course->activePromotion->promotion_name ?? 'Special Offer' }}
                        </span>
                    @endif
                </div>

                <h1 class="text-3xl lg:text-4xl font-black text-white mb-4 leading-tight">{{ $course->title }}</h1>
                <p class="text-gray-300 mb-5 leading-relaxed">{{ $course->description }}</p>

                <div class="flex flex-wrap items-center gap-4 mb-4 text-sm">
                    @if($course->rating)
                        <div class="flex items-center gap-2">
                            <div class="flex gap-0.5">
                                @for($i = 1; $i <= 5; $i++)
                                    <i class="fas fa-star text-xs {{ $i <= floor($course->rating) ? 'text-yellow-400' : 'text-gray-600' }}"></i>
                                @endfor
                            </div>
                            <span class="text-yellow-400 font-bold">{{ number_format($course->rating, 1) }}</span>
                            @if($course->total_students)
                                <span class="text-gray-400">({{ number_format($course->total_students) }} ratings) • {{ number_format($course->total_students) }} students</span>
                            @endif
                        </div>
                    @endif
                </div>

                <div class="flex flex-wrap gap-4 text-sm text-gray-400">
                    @if($course->instructor)
                        <span>Created by <span class="text-purple-400 font-medium">{{ $course->instructor }}</span></span>
                    @endif
                    @php $lastUpdated = $course->last_updated_at ?? now(); @endphp
                    <span><i class="fas fa-calendar mr-1"></i> Last updated {{ \Carbon\Carbon::parse($lastUpdated)->format('d M Y') }}</span>
                    <span><i class="fas fa-globe mr-1"></i> English</span>
                    @if($course->duration)
                        <span><i class="fas fa-clock mr-1"></i> {{ $course->duration }}</span>
                    @endif
                </div>
            </div>
        </div>
    </div>

    {{-- Main Content --}}
    <div class="max-w-7xl mx-auto px-4 py-8">
        <div class="grid grid-cols-1 lg:grid-cols-3 gap-8">

            {{-- Left --}}
            <div class="lg:col-span-2 space-y-6">

                {{-- What You'll Learn --}}
                <div class="bg-white dark:bg-gray-800 rounded-2xl border border-gray-200 dark:border-gray-700 p-6">
                    <h2 class="text-xl font-black text-gray-900 dark:text-white mb-5">What you'll learn</h2>
                    <div class="grid grid-cols-1 md:grid-cols-2 gap-3">
                        @forelse($course->videoModules as $module)
                            <div class="flex items-start gap-3">
                                <i class="fas fa-check text-green-500 text-sm mt-0.5 flex-shrink-0"></i>
                                <span class="text-sm text-gray-700 dark:text-gray-300">{{ $module->title }}</span>
                            </div>
                        @empty
                            <p class="text-gray-500 text-sm col-span-2">No learning points available yet.</p>
                        @endforelse
                    </div>
                </div>

                {{-- Course Content --}}
                <div class="bg-white dark:bg-gray-800 rounded-2xl border border-gray-200 dark:border-gray-700 p-6">
                    <div class="flex items-center justify-between mb-2">
                        <h2 class="text-xl font-black text-gray-900 dark:text-white">Course content</h2>
                        <button wire:click="$set('expandedSections', {{ json_encode(range(0, count($course->videoModules) - 1)) }})" class="text-xs text-purple-600 hover:text-purple-700 font-medium underline">
                            Expand all
                        </button>
                    </div>
                    <p class="text-sm text-gray-500 mb-5">
                        {{ $course->videoModules->count() }} modules
                        @if($course->duration) • {{ $course->duration }} total @endif
                    </p>
                    <div class="space-y-2">
                        @foreach($course->videoModules as $index => $module)
                            @php $isExpanded = in_array($index, $expandedSections); @endphp
                            <div class="border border-gray-200 dark:border-gray-700 rounded-xl overflow-hidden">
                                <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between p-4 bg-gray-50 dark:bg-gray-700/50 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors">
                                    <button wire:click="toggleSection({{ $index }})" class="w-full sm:w-auto flex items-center gap-3 text-left">
                                        <i class="fas {{ $isExpanded ? 'fa-chevron-down' : 'fa-chevron-right' }} text-xs text-gray-500 w-3"></i>
                                        <span class="text-sm font-semibold text-gray-900 dark:text-white">{{ $module->title }}</span>
                                        @if($module->is_free)
                                            <span class="text-xs px-2 py-0.5 bg-green-100 text-green-700 rounded-full">Free preview</span>
                                        @endif
                                    </button>
                                    <div class="flex items-center gap-3 mt-3 sm:mt-0 text-xs text-gray-500">
                                        @if($module->duration)<span>{{ $module->duration }}</span>@endif
                                        @if($isOwned || $module->is_free)
                                            <a href="{{ route('course.player.module', ['course' => $course->uuid, 'module' => $module->uuid]) }}" class="inline-flex items-center gap-1.5 text-purple-600 hover:text-purple-700 font-medium">
                                                <i class="fas fa-play-circle"></i> Watch now
                                            </a>
                                        @else
                                            <span class="inline-flex items-center gap-1.5 text-gray-400">
                                                <i class="fas fa-lock"></i> Locked
                                            </span>
                                        @endif
                                    </div>
                                </div>
                                @if($isExpanded && $module->description)
                                    <div class="p-4 border-t border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800">
                                        <p class="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">{{ $module->description }}</p>
                                    </div>
                                @endif
                            </div>
                        @endforeach
                    </div>
                </div>

                {{-- Instructor --}}
                @if($course->instructor)
                    <div class="bg-white dark:bg-gray-800 rounded-2xl border border-gray-200 dark:border-gray-700 p-6">
                        <h2 class="text-xl font-black text-gray-900 dark:text-white mb-5">Instructor</h2>
                        <div class="flex items-start gap-5">
                            <div class="w-16 h-16 rounded-full bg-purple-100 dark:bg-purple-900/30 flex items-center justify-center flex-shrink-0">
                                <span class="text-purple-600 font-black text-xl">{{ strtoupper(substr($course->instructor, 0, 2)) }}</span>
                            </div>
                            <div class="flex-1">
                                <h3 class="font-black text-lg text-purple-600 mb-0.5">{{ $course->instructor }}</h3>
                                <p class="text-sm text-gray-500 mb-4">Expert Instructor • LearnHub</p>
                                <div class="flex flex-wrap gap-3">
                                    @if($course->rating)
                                        <div class="text-center px-4 py-2.5 bg-gray-50 dark:bg-gray-700 rounded-xl">
                                            <div class="text-base font-black text-yellow-500">{{ $course->rating }}</div>
                                            <div class="text-xs text-gray-500">Rating</div>
                                        </div>
                                    @endif
                                    @if($course->total_students)
                                        <div class="text-center px-4 py-2.5 bg-gray-50 dark:bg-gray-700 rounded-xl">
                                            <div class="text-base font-black text-gray-900 dark:text-white">{{ number_format($course->total_students) }}</div>
                                            <div class="text-xs text-gray-500">Students</div>
                                        </div>
                                    @endif
                                    <div class="text-center px-4 py-2.5 bg-gray-50 dark:bg-gray-700 rounded-xl">
                                        <div class="text-base font-black text-gray-900 dark:text-white">{{ $course->videoModules->count() }}</div>
                                        <div class="text-xs text-gray-500">Modules</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                @endif
            </div>

            {{-- Right: Sidebar --}}
            <div class="lg:col-span-1">
                <div class="sticky top-6 space-y-3">
                    
                    {{-- Promotion Strip --}}
                    @if($course->activePromotion)
                        @php
                            $promo          = $course->activePromotion;
                            $endDate        = \Carbon\Carbon::parse($promo->end_date)->endOfDay();
                            $totalHoursLeft = max(0, (int) \Carbon\Carbon::now()->diffInHours($endDate, false));
                            $daysLeft       = (int) floor($totalHoursLeft / 24);
                            $promoName      = $promo->promotion_name ?? 'Special Offer';
                            $discVal        = $promo->discount_value;
                            $discSuffix     = ($promo->promotion_type === 'percent') ? '%' : '$';
                            $isUrgent       = $daysLeft < 3;
                        @endphp

                        @if($totalHoursLeft > 0)
                            <div class="relative overflow-hidden rounded-xl {{ $isUrgent ? 'bg-gradient-to-r from-red-500 to-orange-500' : 'bg-gradient-to-r from-amber-400 to-orange-400' }}">
                                <div class="absolute -right-4 -top-4 w-20 h-20 rounded-full bg-white/10 pointer-events-none"></div>
                                <div class="relative flex items-center justify-between gap-3 px-4 py-3">
                                    <div class="flex items-center gap-2.5 min-w-0">
                                        <div class="w-7 h-7 rounded-lg bg-black/15 flex items-center justify-center flex-shrink-0">
                                            <i class="fas {{ $isUrgent ? 'fa-fire' : 'fa-tag' }} text-white text-xs"></i>
                                        </div>
                                        <div class="min-w-0">
                                            <p class="text-white font-black text-sm leading-none truncate">
                                                {{ $discVal }}{{ $discSuffix }} OFF
                                                <span class="font-medium opacity-80 text-xs ml-1">— {{ $promoName }}</span>
                                            </p>
                                            <p class="text-white/70 text-[11px] mt-0.5">
                                                @if($daysLeft === 0) Expires in {{ $totalHoursLeft }}h
                                                @elseif($daysLeft === 1) Ends tomorrow
                                                @else {{ $daysLeft }} days left
                                                @endif
                                                · ends {{ $endDate->format('M d') }}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        @endif
                    @endif

                    {{-- Purchase Card --}}
                    <div class="bg-white dark:bg-gray-800 rounded-2xl border border-gray-200 dark:border-gray-700 overflow-hidden shadow-xl">
                        <div class="aspect-video overflow-hidden">
                            @if($course->image)
                                @php
                                    $courseImage = $course->thumbnail_url;
                                @endphp
                                <img src="{{ $courseImage }}" alt="{{ $course->title }}" class="w-full h-full object-cover">
                            @else
                                <div class="w-full h-full bg-gradient-to-br from-purple-600 to-purple-800 flex items-center justify-center">
                                    <i class="fas fa-play-circle text-white text-5xl opacity-70"></i>
                                </div>
                            @endif
                        </div>

                        <div class="p-5">
                            <div class="flex items-end gap-3 mb-4">
                                <span class="text-3xl font-black text-gray-900 dark:text-white tracking-tight">
                                    ${{ number_format($finalPrice, 2) }}
                                </span>
                                @if($hasDiscount)
                                    <div class="flex flex-col pb-0.5">
                                        <span class="text-gray-400 line-through text-sm leading-none">${{ number_format($originalPrice, 2) }}</span>
                                        <span class="text-xs font-bold text-red-500 mt-0.5">{{ round((1 - $finalPrice / $originalPrice) * 100) }}% off</span>
                                    </div>
                                @endif
                            </div>

                            @if($isOwned)
                                <button class="w-full py-3.5 rounded-xl font-black text-sm bg-emerald-100 text-emerald-700 cursor-default mb-4">
                                    <i class="fas fa-check-circle mr-2"></i> Course Purchased
                                </button>
                            @else
                                <button wire:click="purchaseCourse"
                                        class="w-full py-3.5 rounded-xl font-black text-sm bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-700 hover:to-purple-800 text-white transition-all shadow-lg hover:shadow-xl transform hover:scale-[1.02] active:scale-95 mb-4">
                                    <span wire:loading.remove wire:target="purchaseCourse">
                                        <i class="fas fa-shopping-cart mr-2"></i> Purchase Course
                                    </span>
                                    <span wire:loading wire:target="purchaseCourse">
                                        <i class="fas fa-circle-notch fa-spin mr-2"></i> Generating QR...
                                    </span>
                                </button>
                            @endif

                            <div class="space-y-2 pt-4 border-t border-gray-100 dark:border-gray-700">
                                @foreach([
                                    ['icon' => 'fa-shield-alt', 'color' => 'text-green-500',  'text' => '30-day money-back guarantee'],
                                    ['icon' => 'fa-infinity',   'color' => 'text-purple-500', 'text' => 'Full lifetime access'],
                                    ['icon' => 'fa-mobile-alt', 'color' => 'text-blue-500',   'text' => 'Access on mobile & desktop'],
                                    ['icon' => 'fa-film',       'color' => 'text-orange-500', 'text' => $course->videoModules->count() . ' video modules'],
                                ] as $g)
                                    <div class="flex items-center gap-2 text-xs text-gray-500 dark:text-gray-400">
                                        <i class="fas {{ $g['icon'] }} {{ $g['color'] }} w-4 text-center flex-shrink-0"></i>
                                        {{ $g['text'] }}
                                    </div>
                                @endforeach
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    </div>

    {{-- KHQR MODAL --}}
    @if($showKhqrModal && $khqrData)

<div
    class="fixed inset-0 bg-black/70 z-50 flex items-center justify-center p-4 backdrop-blur-sm"
    wire:click.self="closeKhqrModal"
    wire:poll.3s="checkPaymentStatus"
    x-data="{
        seconds: 300,
        redirectSeconds: 3,
        timer: null,
        redirectTimer: null,

        startTimer() {
            this.timer = setInterval(() => {
                if (this.seconds > 0) this.seconds--;
            }, 1000);
        },

        stopTimer() {
            clearInterval(this.timer);
            clearInterval(this.redirectTimer);
        },

        startRedirect() {
            this.redirectTimer = setInterval(() => {
                if (this.redirectSeconds > 0) this.redirectSeconds--;
            }, 1000);
        },

        get timeFormat() {
            return Math.floor(this.seconds / 60) + ':' + String(this.seconds % 60).padStart(2, '0');
        }
    }"
    x-init="startTimer()"

    {{-- 🔥 SUCCESS EVENT --}}
    x-on:payment-confirmed.window="
        stopTimer();
        startRedirect();

        setTimeout(() => {
            $wire.closeKhqrModal();
        }, 2500);
    "
>

    <!-- MODAL BOX -->
    <div class="bg-white rounded-3xl shadow-2xl max-w-sm w-full overflow-hidden relative">
        {{-- Close Button --}}
        <button wire:click="closeKhqrModal" class="absolute top-5 right-5 text-gray-400 hover:text-gray-600 transition-colors z-10">
            <i class="fas fa-times text-lg"></i>
        </button>

        {{-- ========================= --}}
        {{-- 🔴 PENDING STATE --}}
        {{-- ========================= --}}
        @if($khqrStatus !== 'paid')

        <div class="p-5 border-b text-center">
            <div class="bg-red-600 text-white font-black px-4 py-1 rounded-lg inline-block">
                BAKONG PAYMENT
            </div>
            <p class="text-xs text-gray-500 mt-2">Scan QR to pay</p>
            <p class="text-sm font-bold mt-1">{{ $khqrData['course_title'] }}</p>
        </div>

        <div class="p-6 text-center">

            {{-- QR IMAGE --}}
            <img src="{{ $khqrData['qr_image'] }}"
                 class="w-52 h-52 mx-auto mb-4">

            {{-- AMOUNT --}}
            <div class="bg-purple-600 text-white rounded-xl p-4 mb-4">
                <p class="text-xs opacity-80">Amount</p>
                <p class="text-3xl font-black">
                    ${{ number_format($khqrData['amount'], 2) }}
                </p>
            </div>

            {{-- STATUS --}}
            <div class="flex items-center justify-center gap-2 text-yellow-600 font-bold">
                <span class="w-2 h-2 bg-yellow-400 rounded-full animate-ping"></span>
                Waiting for payment...
            </div>

            <p class="text-xs text-gray-400 mt-3">
                Expires in <span x-text="timeFormat"></span>
            </p>

        </div>

        {{-- ========================= --}}
        {{-- 🟢 SUCCESS STATE --}}
        {{-- ========================= --}}
        @else

        <div class="p-10 text-center bg-emerald-500 text-white relative overflow-hidden">

            <div class="w-20 h-20 bg-white rounded-full mx-auto flex items-center justify-center mb-5">
                <i class="fas fa-check text-4xl text-emerald-500"></i>
            </div>

            <h2 class="text-2xl font-black mb-2">
                Payment Successful
            </h2>

            <p class="text-sm opacity-90 mb-6">
                Course unlocked successfully 🎉
            </p>

            <div class="bg-black/20 rounded-full px-4 py-2 inline-block">
                Closing in <span x-text="redirectSeconds"></span>s
            </div>

        </div>

        @endif

    </div>
</div>

@endif

    {{-- LOGIN MODAL --}}
    @if($showLoginModal)
        <div class="fixed inset-0 bg-black/70 z-[60] flex items-center justify-center p-4 backdrop-blur-sm"
             wire:click.self="toggleLoginModal">
            <div class="bg-white dark:bg-gray-800 rounded-3xl shadow-2xl max-w-md w-full overflow-hidden relative">
                {{-- Close Button --}}
                <button wire:click="toggleLoginModal" class="absolute top-5 right-5 text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 transition-colors z-10">
                    <i class="fas fa-times text-lg"></i>
                </button>

                <div class="p-8">
                    <div class="text-center mb-8">
                        <div class="w-16 h-16 bg-purple-100 dark:bg-purple-900/30 rounded-2xl flex items-center justify-center mx-auto mb-4">
                            <i class="fas fa-user-lock text-2xl text-purple-600"></i>
                        </div>
                        <h2 class="text-2xl font-black text-gray-900 dark:text-white">Sign In</h2>
                        <p class="text-sm text-gray-500 dark:text-gray-400 mt-2">Login to access courses and your progress</p>
                    </div>

                    <form wire:submit.prevent="attemptLogin" class="space-y-4">
                        <div>
                            <label class="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-1.5">Email Address</label>
                            <div class="relative">
                                <i class="fas fa-envelope absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 text-sm"></i>
                                <input type="email" wire:model="email" 
                                       class="w-full pl-11 pr-4 py-3 rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-900 focus:ring-2 focus:ring-purple-500 outline-none transition-all dark:text-white"
                                       placeholder="name@example.com">
                            </div>
                            @error('email') <span class="text-xs text-red-500 mt-1">{{ $message }}</span> @enderror
                        </div>

                        <div>
                            <label class="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-1.5">Password</label>
                            <div class="relative">
                                <i class="fas fa-lock absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 text-sm"></i>
                                <input type="password" wire:model="password" 
                                       class="w-full pl-11 pr-4 py-3 rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-900 focus:ring-2 focus:ring-purple-500 outline-none transition-all dark:text-white"
                                       placeholder="••••••••">
                            </div>
                        </div>

                        <div class="flex items-center justify-between py-2">
                            <label class="flex items-center gap-2 cursor-pointer group">
                                <input type="checkbox" wire:model="remember" class="w-4 h-4 rounded border-gray-300 text-purple-600 focus:ring-purple-500">
                                <span class="text-xs text-gray-500 dark:text-gray-400 group-hover:text-gray-700 dark:group-hover:text-gray-200 transition-colors">Remember me</span>
                            </label>
                            <a href="#" class="text-xs font-bold text-purple-600 hover:text-purple-700">Forgot?</a>
                        </div>

                        <button type="submit" 
                                class="w-full py-4 rounded-xl font-black text-sm bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-700 hover:to-purple-800 text-white transition-all shadow-lg hover:shadow-xl transform hover:scale-[1.02] active:scale-95">
                            Sign In Now
                        </button>
                    </form>

                    <div class="mt-8 text-center border-t border-gray-100 dark:border-gray-700 pt-6">
                        <p class="text-sm text-gray-500 dark:text-gray-400">
                            Don't have an account? 
                            <a href="{{ route('register') }}" class="text-purple-600 font-bold hover:underline">Register here</a>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    @endif
</div>