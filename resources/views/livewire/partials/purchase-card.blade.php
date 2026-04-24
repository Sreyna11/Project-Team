<div class="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 overflow-hidden sticky top-4">

    {{-- Course Image --}}
    @if($course->image)
        <div class="aspect-video overflow-hidden">
            <img src="{{ $course->image }}" alt="{{ $course->title }}"
                 class="w-full h-full object-cover">
        </div>
    @else
        <div class="aspect-video bg-gradient-to-br from-purple-600 to-purple-800
                    flex items-center justify-center">
            <i class="fas fa-play-circle text-white text-4xl opacity-80"></i>
        </div>
    @endif

    <div class="p-5">
        {{-- Promotion Name Header --}}
        @if($course->activePromotion)
            <div class="mb-4 p-3 bg-gradient-to-r from-amber-400 to-orange-500 text-gray-900 rounded-lg text-center shadow-md">
                <p class="text-xs font-bold uppercase tracking-wider mb-1">Special Promotion</p>
                <p class="text-sm font-black">{{ $course->activePromotion->promotion_name ?? 'Special Offer' }}</p>
            </div>
        @endif

        {{-- Price Section --}}
        <div class="mb-4 p-4 bg-gradient-to-br from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20 rounded-xl border border-purple-100 dark:border-purple-800">
            <div class="flex items-end gap-3 mb-2">
                <span class="text-4xl font-black text-gray-900 dark:text-white">${{ number_format($finalPrice, 2) }}</span>
                @if($finalPrice < $course->price)
                    <span class="text-sm text-gray-400 line-through pb-1">
                        ${{ number_format($course->price, 2) }}
                    </span>
                @endif
            </div>
            @if($finalPrice < $course->price)
                <div class="inline-block px-3 py-1 bg-gradient-to-r from-red-500 to-orange-500 text-white rounded-full text-xs font-black shadow-md">
                    <i class="fas fa-tag mr-1"></i> {{ round((1 - $finalPrice / $course->price) * 100) }}% SALE
                </div>
            @endif
        </div>

        @if($course->activePromotion)
            @php
                $daysLeft = max(0, \Carbon\Carbon::parse($course->activePromotion->end_date)->diffInDays());
                $promotionName = $course->activePromotion->promotion_name ?? 'Special Offer';
                $discountValue = $course->activePromotion->discount_value;
                $discountType = $course->activePromotion->promotion_type === 'percent' ? '%' : '$';
            @endphp
            @if($daysLeft > 0)
                <div class="mb-4 bg-gradient-to-r from-red-500 to-orange-500 rounded-lg p-3 text-white shadow-md">
                    <div class="flex items-center justify-between gap-3">
                        <div class="flex-1">
                            <p class="text-xs font-bold uppercase tracking-wide opacity-90 mb-1">{{ $promotionName }}</p>
                            <div class="flex items-baseline gap-2">
                                <p class="text-base font-black">{{ $discountValue }}{{ $discountType }} OFF</p>
                                <p class="text-xs opacity-90 font-semibold">
                                    {{ $daysLeft }} {{ $daysLeft === 1 ? 'day' : 'days' }} left
                                </p>
                            </div>
                        </div>
                        <div class="flex-shrink-0">
                            <div class="bg-white/20 rounded-lg px-2 py-1 text-center backdrop-blur">
                                <p class="text-xs font-black">⚡</p>
                            </div>
                        </div>
                    </div>
                </div>
            @endif
        @endif

        @if($isOwned)
            <a href="{{ route('course.player', $course->uuid) }}"
               class="block w-full text-center py-3.5 px-4 rounded-xl font-bold text-base
                      bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 
                      text-white transition-all duration-200 shadow-lg hover:shadow-xl 
                      transform hover:scale-[1.02] active:scale-95 mb-3">
                <i class="fas fa-play mr-2"></i> Go to Course
            </a>
        @else
            <button onclick="purchaseCourse({{ $course->courseItem_id }})"
                    class="w-full py-3.5 px-4 rounded-xl font-bold text-base
                           bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-700 hover:to-purple-800
                           text-white transition-all duration-200 shadow-lg hover:shadow-xl
                           transform hover:scale-[1.02] active:scale-95 mb-3">
                <i class="fas fa-shopping-cart mr-2"></i> Purchase Course
            </button>
        @endif

        {{-- Guarantees --}}
        <div class="space-y-2 text-xs text-gray-500 dark:text-gray-400">
            <div class="flex items-center gap-2">
                <i class="fas fa-check text-green-500"></i>
                <span>30-day money-back guarantee</span>
            </div>
            <div class="flex items-center gap-2">
                <i class="fas fa-infinity text-purple-500"></i>
                <span>Full lifetime access</span>
            </div>
            <div class="flex items-center gap-2">
                <i class="fas fa-mobile-alt text-blue-500"></i>
                <span>Access on mobile and desktop</span>
            </div>
            @if($course->videoModules->count() > 0)
                <div class="flex items-center gap-2">
                    <i class="fas fa-film text-orange-500"></i>
                    <span>{{ $course->videoModules->count() }} video modules</span>
                </div>
            @endif
        </div>
    </div>
</div>