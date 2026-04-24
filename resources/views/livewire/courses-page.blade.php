<div class="py-10">
    <div class="container mx-auto px-4">
        {{-- Header --}}
        <div class="mb-8">
            <h1 class="text-4xl font-bold text-gray-900 dark:text-white mb-2">Video Courses</h1>
            <p class="text-gray-500">Premium courses to help you master programming and development skills.</p>
        </div>

        {{-- Filters --}}
        <div class="space-y-6 mb-10">
            {{-- Search Bar Row --}}
            <div class="relative group">
                <div class="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none transition-colors group-focus-within:text-purple-500">
                    <i class="fas fa-search text-gray-400"></i>
                </div>
                <input wire:model.live.debounce.300ms="search"
                       type="text"
                       placeholder="Search for courses, technologies, or skills..."
                       class="block w-full pl-11 pr-12 py-4 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-2xl
                              text-gray-900 dark:text-white text-lg placeholder-gray-400
                              focus:ring-4 focus:ring-purple-500/10 focus:border-purple-500 transition-all shadow-sm">
                <div wire:loading wire:target="search" class="absolute inset-y-0 right-4 flex items-center">
                    <i class="fas fa-spinner fa-spin text-purple-600"></i>
                </div>
            </div>

            {{-- Categories Row --}}
            <div class="flex flex-wrap items-center gap-3">
                <span class="text-sm font-bold text-gray-400 uppercase tracking-widest mr-2">Filter by:</span>
                <button wire:click="$set('categoryId', null)"
                        wire:key="cat-all"
                        wire:loading.attr="disabled"
                        class="px-6 py-2.5 rounded-xl text-sm font-bold transition-all disabled:opacity-50
                               {{ !$categoryId 
                                  ? 'bg-purple-600 text-white shadow-lg shadow-purple-500/25' 
                                  : 'bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-gray-600 dark:text-gray-300 hover:border-purple-500 hover:text-purple-600' }}">
                    All Courses
                </button>
                @foreach($categories as $cat)
                    <button wire:click="$set('categoryId', {{ $cat->category_id }})"
                            wire:key="cat-{{ $cat->category_id }}"
                            wire:loading.attr="disabled"
                            class="px-6 py-2.5 rounded-xl text-sm font-bold transition-all disabled:opacity-50
                                   {{ $categoryId == $cat->category_id 
                                      ? 'bg-purple-600 text-white shadow-lg shadow-purple-500/25' 
                                      : 'bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-gray-600 dark:text-gray-300 hover:border-purple-500 hover:text-purple-600' }}">
                        {{ $cat->name }}
                    </button>
                @endforeach
            </div>
        </div>

        {{-- Results count --}}
        <p class="text-sm text-gray-500 mb-6">
            Showing <span class="font-semibold text-gray-900 dark:text-white">{{ $courses->count() }}</span> courses
        </p>

        {{-- Course Grid --}}
        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6" wire:loading.class="opacity-50">
            @forelse($courses as $course)
                @include('livewire.partials.course-card', ['course' => $course])
            @empty
                <div class="col-span-3 text-center py-16">
                    <i class="fas fa-search text-4xl text-gray-300 mb-4"></i>
                    <h3 class="text-lg font-semibold mb-2 text-gray-900 dark:text-white">No courses found</h3>
                    <p class="text-gray-500">Try adjusting your search or filter</p>
                </div>
            @endforelse
        </div>
    </div>
</div>