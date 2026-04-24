@php
    $isPurchased = auth()->check()
        ? \App\Models\Payment::where('user_id', auth()->id())
            ->where('course_item_id', $course->courseItem_id)
            ->where('status', 'paid')
            ->exists()
        : false;
    $finalPrice    = $course->final_price ?? $course->price;
    $originalPrice = $course->price;
    $hasDiscount   = $finalPrice < $originalPrice;
    $rating        = $course->rating ?? 4.5;
    $fullStars     = floor($rating);

    $imageUrl = $course->thumbnail_url;
@endphp

<div class="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700
            overflow-hidden hover:shadow-lg transition-shadow duration-300 cursor-pointer group"
     onclick="window.location.href='{{ route('course.detail', $course) }}'">

    {{-- Image --}}
    <div class="relative aspect-video overflow-hidden">
        @if($imageUrl)
            <img src="{{ $imageUrl }}" alt="{{ $course->title }}"
                 class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300">
        @else
            <div class="w-full h-full bg-gradient-to-br from-purple-600 to-purple-800
                        flex items-center justify-center">
                <i class="fas fa-play-circle text-white text-4xl opacity-70"></i>
            </div>
        @endif

        {{-- Category badge --}}
        <div class="absolute top-3 left-3">
            <span class="text-xs px-2 py-1 rounded-full font-medium bg-purple-600 text-white">
                {{ $course->category?->name ?? 'General' }}
            </span>
        </div>

        {{-- HOT badge --}}
        @if($course->is_hot)
            <div class="absolute top-3 right-3">
                <span class="text-xs px-2 py-1 rounded-full font-bold bg-orange-500 text-white">
                    HOT
                </span>
            </div>
        @endif

        {{-- Purchased badge --}}
        @if($isPurchased)
            <div class="absolute top-3 right-3">
                <span class="text-xs px-2 py-1 rounded-full bg-green-500 text-white">
                    <i class="fas fa-check mr-1"></i> Purchased
                </span>
            </div>
        @endif

        {{-- Duration --}}
        @if($course->duration)
            <div class="absolute bottom-3 right-3">
                <span class="text-xs px-2 py-1 rounded bg-black/70 text-white">
                    <i class="fas fa-clock mr-1"></i>{{ $course->duration }}
                </span>
            </div>
        @endif
    </div>

    {{-- Content --}}
    <div class="p-4">
        <h3 class="font-bold text-base line-clamp-2 mb-1 text-gray-900 dark:text-white
                   group-hover:text-purple-600 transition-colors">
            {{ $course->title }}
        </h3>

        @if($course->instructor)
            <p class="text-xs text-gray-500 mb-2">
                <i class="fas fa-user-tie mr-1 text-purple-400"></i>{{ $course->instructor }}
            </p>
        @endif

        {{-- Description --}}
        <p class="text-xs text-gray-500 dark:text-gray-400 line-clamp-2 mb-4 leading-relaxed">
            {{ $course->description }}
        </p>

        {{-- Price + Button --}}
        <div class="flex items-center justify-between">
            <div>
                <div class="flex items-center gap-2">
                    <span class="font-black text-xl text-gray-900 dark:text-white">
                        ${{ number_format($finalPrice, 2) }}
                    </span>
                    @if($hasDiscount)
                        <span class="text-xs px-2 py-0.5 rounded border border-pink-200 bg-pink-100 text-pink-700 font-bold shadow-sm">
                            -{{ round((1 - $finalPrice / $originalPrice) * 100) }}%
                        </span>
                    @endif
                </div>
                @if($hasDiscount)
                    <div class="text-sm text-gray-400 line-through font-medium">
                        ${{ number_format($originalPrice, 2) }}
                    </div>
                @endif
            </div>
            <a href="{{ route('course.detail', $course) }}"
               onclick="event.stopPropagation()"
               class="text-xs px-3 py-1.5 rounded-lg font-medium transition-colors
                      {{ $isPurchased
                          ? 'bg-green-100 text-green-700 hover:bg-green-200'
                          : 'bg-purple-600 text-white hover:bg-purple-700' }}">
                {{ $isPurchased ? 'Watch' : 'Enroll →' }}
            </a>
        </div>
    </div>
</div>