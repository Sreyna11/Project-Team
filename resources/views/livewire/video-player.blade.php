<div class="min-h-screen bg-gray-900 text-white">

    {{-- Top Bar --}}
    <div class="bg-gray-800 border-b border-gray-700 px-4 py-3 flex items-center justify-between">

        {{-- Back uses $course->uuid — matches getRouteKeyName() = 'uuid' and ->whereUuid('course') --}}
        <a href="{{ route('course.detail', $course->uuid) }}"
           class="inline-flex items-center gap-2 px-3 py-2 text-gray-300 hover:text-white bg-gray-700 hover:bg-gray-600 rounded-lg text-sm transition-all duration-200 group flex-shrink-0">
            <i class="fas fa-arrow-left text-xs group-hover:-translate-x-0.5 transition-transform duration-200"></i>
            <span class="hidden sm:inline">Back to course</span>
        </a>

        <h1 class="text-sm font-medium text-white truncate max-w-xs lg:max-w-lg px-4">
            {{ $course->title }}
        </h1>

        @auth
            <div class="w-8 h-8 rounded-full bg-purple-600 flex items-center justify-center text-xs font-bold flex-shrink-0">
                {{ strtoupper(substr(Auth::user()->name, 0, 2)) }}
            </div>
        @else
            <div class="w-8 h-8"></div>
        @endauth
    </div>

    {{-- Main Layout --}}
    <div class="flex" style="min-height: calc(100vh - 53px)">

        {{-- Left: Video + Info --}}
        <div class="flex-1 flex flex-col min-w-0">

{{-- Video Player --}}
<div class="bg-black" style="aspect-ratio:16/9; max-height:65vh">

    @if(!empty($videoFileUrl))
        <video
            src="{{ $videoFileUrl }}"
            class="w-full h-full"
            controls
            autoplay
            playsinline
            preload="metadata"
            controlsList="nodownload noremoteplayback"
            disablePictureInPicture
            oncontextmenu="return false">
        </video>

    @elseif(!empty($embedUrl))
        <iframe src="{{ $embedUrl }}"
                class="w-full h-full"
                frameborder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowfullscreen>
        </iframe>

    @else
        <div class="w-full h-full flex items-center justify-center text-gray-500">
            Select a module to start watching
        </div>
    @endif

</div>

            {{-- Module Info --}}
            <div class="flex-1 bg-white dark:bg-gray-800 p-5 overflow-y-auto">

                <div class="flex items-start justify-between gap-4 mb-4">
                    <h2 class="text-lg font-bold text-gray-900 dark:text-white">
                        {{ $currentModule?->title ?? 'Select a module' }}
                    </h2>
                    @if($currentModule?->is_free)
                        <span class="text-xs px-2 py-1 bg-green-100 text-green-700 rounded-full flex-shrink-0">
                            Free Preview
                        </span>
                    @endif
                </div>

                @if($currentModule?->description)
                    <div class="bg-gray-50 dark:bg-gray-700 rounded-xl p-4 mb-4">
                        <h4 class="font-medium text-sm mb-2 text-gray-900 dark:text-white">About this module</h4>
                        <p class="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
                            {{ $currentModule->description }}
                        </p>
                    </div>
                @endif

                {{-- Progress --}}
                <div class="mb-4">
                    <div class="flex justify-between text-xs text-gray-500 mb-1">
                        <span>Course progress</span>
                        <span>{{ $progress }}%</span>
                    </div>
                    <div class="h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                        <div class="h-full bg-purple-600 rounded-full transition-all duration-500"
                             style="width: {{ $progress }}%"></div>
                    </div>
                    <p class="text-xs text-gray-500 mt-1">
                        {{ count($completedModules) }} of {{ $modules->count() }} modules completed
                    </p>
                </div>

                {{-- Navigation --}}
                <div class="flex items-center justify-between gap-3 pt-4 border-t border-gray-200 dark:border-gray-700">
                    <button wire:click="goPrevious"
                            @disabled($currentIndex === 0)
                            class="flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-colors border
                                   {{ $currentIndex === 0
                                       ? 'border-gray-200 text-gray-300 cursor-not-allowed'
                                       : 'border-gray-300 text-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:text-gray-300 dark:hover:bg-gray-700' }}">
                        <i class="fas fa-chevron-left text-xs"></i>
                        Previous
                    </button>

                    @if($currentModule)
                        <button wire:click="markComplete"
                                class="flex-1 max-w-xs py-2 px-4 rounded-lg text-sm font-semibold transition-colors text-center
                                       {{ in_array($currentModule->videoCourseItem_id, $completedModules)
                                           ? 'bg-green-600 hover:bg-green-700 text-white'
                                           : 'bg-purple-600 hover:bg-purple-700 text-white' }}">
                            <span wire:loading.remove wire:target="markComplete">
                                <i class="fas {{ in_array($currentModule->videoCourseItem_id, $completedModules) ? 'fa-check-double' : 'fa-check' }} mr-2"></i>
                                {{ in_array($currentModule->videoCourseItem_id, $completedModules) ? 'Completed' : 'Mark complete' }}
                            </span>
                            <span wire:loading wire:target="markComplete">
                                <i class="fas fa-circle-notch fa-spin mr-2"></i> Saving...
                            </span>
                        </button>
                    @endif

                    <button wire:click="goNext"
                            @disabled($currentIndex >= $modules->count() - 1)
                            class="flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-colors border
                                   {{ $currentIndex >= $modules->count() - 1
                                       ? 'border-gray-200 text-gray-300 cursor-not-allowed'
                                       : 'border-gray-300 text-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:text-gray-300 dark:hover:bg-gray-700' }}">
                        Next
                        <i class="fas fa-chevron-right text-xs"></i>
                    </button>
                </div>
            </div>
        </div>

        {{-- Right: Module Sidebar --}}
        <div class="w-80 flex-shrink-0 bg-white dark:bg-gray-800 border-l border-gray-200 dark:border-gray-700 overflow-y-auto hidden lg:block">

            <div class="p-4 border-b border-gray-200 dark:border-gray-700 sticky top-0 bg-white dark:bg-gray-800 z-10">
                <h3 class="font-bold text-sm text-gray-900 dark:text-white">Course content</h3>
                <p class="text-xs text-gray-500 mt-1">{{ $modules->count() }} modules</p>
                <div class="mt-2">
                    <div class="h-1.5 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                        <div class="h-full bg-purple-600 rounded-full transition-all duration-500"
                             style="width: {{ $progress }}%"></div>
                    </div>
                </div>
            </div>

            <div>
                @foreach($modules as $index => $module)
                    @php
                        $isCompleted = in_array($module->videoCourseItem_id, $completedModules);
                        $isActive    = $currentModule?->uuid === $module->uuid;
                        $isLocked    = !$isOwned && !$module->is_free;
                    @endphp

                    {{--
                        wire:click passes the UUID string to selectModule().
                        Never use <a href> here — that would navigate away and cause 404.
                        The UUID is quoted so Livewire receives it as a string argument.
                    --}}
                    <button
                        @if(!$isLocked)wire:click="selectModule('{{ $module->uuid }}')@endif"
                        {{ $isLocked ? 'disabled' : '' }}
                        class="w-full text-left p-3 border-b border-gray-100 dark:border-gray-700 flex items-start gap-3 transition-colors border-l-4
                               {{ $isActive
                                   ? 'bg-purple-50 dark:bg-purple-900/30 border-l-purple-600'
                                   : 'hover:bg-gray-50 dark:hover:bg-gray-700 border-l-transparent' }}
                               {{ $isLocked ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer' }}">

                        <div class="flex-shrink-0 w-5 h-5 rounded-full flex items-center justify-center mt-0.5
                                    {{ $isCompleted ? 'bg-green-100' : ($isActive ? 'bg-purple-100' : 'bg-gray-100') }}">
                            @if($isLocked)
                                <i class="fas fa-lock text-gray-400" style="font-size:9px"></i>
                            @elseif($isCompleted)
                                <i class="fas fa-check text-green-600" style="font-size:9px"></i>
                            @elseif($isActive)
                                <i class="fas fa-play text-purple-600" style="font-size:9px"></i>
                            @else
                                <i class="fas fa-circle text-gray-300" style="font-size:9px"></i>
                            @endif
                        </div>

                        <div class="flex-1 min-w-0">
                            <p class="text-xs font-medium leading-tight truncate
                                       {{ $isActive
                                           ? 'text-purple-700 dark:text-purple-300'
                                           : ($isCompleted
                                               ? 'text-green-700 dark:text-green-400'
                                               : 'text-gray-900 dark:text-white') }}">
                                {{ $module->title }}
                            </p>
                            <div class="flex items-center gap-2 mt-1">
                                @if($module->duration)
                                    <span class="text-xs text-gray-400">{{ $module->duration }}</span>
                                @endif
                                @if($module->is_free && !$isOwned)
                                    <span class="text-xs px-1.5 py-0.5 bg-green-100 text-green-700 rounded">Free</span>
                                @endif
                            </div>
                        </div>
                    </button>
                @endforeach
            </div>
        </div>
    </div>
</div>
