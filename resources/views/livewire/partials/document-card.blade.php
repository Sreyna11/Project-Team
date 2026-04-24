<div class="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700
            p-5 hover:shadow-lg transition-shadow duration-300">

    {{-- Header --}}
    <div class="flex items-start justify-between mb-3">
        <div class="flex items-center gap-3">
            <div class="w-12 h-12 rounded-xl bg-purple-50 dark:bg-purple-900/30
                        flex items-center justify-center flex-shrink-0 border border-purple-100 dark:border-purple-800">
                @if($doc->logo)
                    @php
                        $imageUrl = $doc->logo_url;
                    @endphp
                    <img src="{{ $imageUrl }}" alt="{{ $doc->title }}" class="w-full h-full object-cover rounded-xl">
                @else
                    <i class="fas fa-file-alt text-purple-600"></i>
                @endif
            </div>
        </div>
        <div>
            <div class="flex flex-wrap gap-1 justify-end">
                <span class="text-xs px-2 py-0.5 rounded-full font-medium"
                      style="background:#EEEDFE;color:#3C3489">
                    {{ $doc->category?->name ?? 'General' }}
                </span>
            </div>
        </div>
    </div>

    {{-- Title --}}
    <h3 class="font-bold text-base line-clamp-2 mb-2 text-gray-900 dark:text-white">
        {{ $doc->title }}
    </h3>

    {{-- Description --}}
    <p class="text-xs text-gray-500 line-clamp-2 mb-4 leading-relaxed">
        {{ $doc->description }}
    </p>

    {{-- Buttons --}}
    @auth
        @if($doc->file)
            <div class="flex gap-2">
                <a href="{{ route('document.read', $doc) }}" target="_blank"
                   class="flex-1 text-center py-2 text-xs font-semibold rounded-lg
                          bg-purple-600 hover:bg-purple-700 text-white transition-colors">
                    <i class="fas fa-book-open mr-1"></i> Read
                </a>
                <a href="{{ route('document.download', $doc) }}"
                   class="flex-1 text-center py-2 text-xs font-semibold rounded-lg
                          border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300
                          hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
                    <i class="fas fa-download mr-1"></i> Download
                </a>
            </div>
        @endif
    @else
        <a href="{{ route('login') }}"
           class="block w-full text-center py-2 text-xs font-semibold rounded-lg
                  border border-gray-300 dark:border-gray-600 text-gray-600 dark:text-gray-400
                  hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
            <i class="fas fa-lock mr-1"></i> Login to Read
        </a>
    @endauth
</div>