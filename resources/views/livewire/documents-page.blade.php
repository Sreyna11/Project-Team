<div class="py-10">
    <div class="container mx-auto px-4">
        <div class="mb-8">
            <h1 class="text-4xl font-bold text-gray-900 dark:text-white mb-2">Learning Documents</h1>
            <p class="text-gray-500">Free comprehensive documentation to supplement your learning journey.</p>
        </div>

        @guest
            <div class="flex items-start gap-3 p-4 bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-xl mb-6">
                <i class="fas fa-lock text-yellow-500 mt-0.5"></i>
                <div>
                    <h4 class="font-semibold text-yellow-800 dark:text-yellow-200 text-sm">Login required</h4>
                    <p class="text-sm text-yellow-700 dark:text-yellow-300">
                        <a href="{{ route('login') }}" class="underline font-medium">Login</a> to access document content. Documents are free for all registered users.
                    </p>
                </div>
            </div>
        @endguest

        {{-- Filters --}}
        <div class="space-y-6 mb-10">
            {{-- Search Bar Row --}}
            <div class="relative group">
                <div class="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none transition-colors group-focus-within:text-purple-500">
                    <i class="fas fa-search text-gray-400"></i>
                </div>
                <input wire:model.live.debounce.300ms="search"
                       type="text"
                       placeholder="Search for documentation, guides, or manuals..."
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
                        wire:key="doc-cat-all"
                        wire:loading.attr="disabled"
                        class="px-6 py-2.5 rounded-xl text-sm font-bold transition-all disabled:opacity-50
                               {{ !$categoryId 
                                  ? 'bg-purple-600 text-white shadow-lg shadow-purple-500/25' 
                                  : 'bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-gray-600 dark:text-gray-300 hover:border-purple-500 hover:text-purple-600' }}">
                    All Documents
                </button>
                @foreach($categories as $cat)
                    <button wire:click="$set('categoryId', {{ $cat->category_id }})"
                            wire:key="doc-cat-{{ $cat->category_id }}"
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

        <p class="text-sm text-gray-500 mb-6">
            Showing <span class="font-semibold text-gray-900 dark:text-white">{{ $documents->count() }}</span> documents
        </p>

        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            @forelse($documents as $doc)
                @include('livewire.partials.document-card', ['doc' => $doc])
            @empty
                <div class="col-span-3 text-center py-16">
                    <i class="fas fa-file-alt text-4xl text-gray-300 mb-4"></i>
                    <h3 class="text-lg font-semibold mb-2 text-gray-900 dark:text-white">No documents found</h3>
                    <p class="text-gray-500">Try adjusting your search</p>
                </div>
            @endforelse
        </div>
    </div>
</div>