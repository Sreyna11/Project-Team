<div class="py-10">
    <div class="container mx-auto px-4">
        <div class="mb-8">
            <h1 class="text-3xl font-bold text-gray-900 dark:text-white mb-1">My Dashboard</h1>
            <p class="text-gray-500">Manage your courses and account</p>
        </div>

        <div class="grid grid-cols-1 lg:grid-cols-4 gap-6">

            {{-- Sidebar --}}
            <div class="lg:col-span-1">
                <div class="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-6">
                    {{-- Profile --}}
                    <div class="text-center mb-6">
                        <div class="w-20 h-20 rounded-full bg-purple-100 dark:bg-purple-900
                                    mx-auto mb-3 flex items-center justify-center">
                            <span class="text-purple-600 font-bold text-2xl">
                                {{ strtoupper(substr($user->name, 0, 2)) }}
                            </span>
                        </div>
                        <h2 class="font-bold text-lg text-gray-900 dark:text-white">{{ $user->name }}</h2>
                        <p class="text-gray-500 text-sm">{{ $user->email }}</p>
                        <p class="text-xs text-gray-400 mt-1">
                            Member since {{ $user->created_at->format('M Y') }}
                        </p>
                    </div>

                    {{-- Nav --}}
                    <nav class="space-y-1">
                        <button wire:click="setTab('overview')"
                                class="w-full flex items-center gap-3 p-3 rounded-lg text-left transition-colors text-sm font-medium
                                       {{ $activeTab === 'overview' ? 'bg-purple-50 dark:bg-purple-900/30 text-purple-700 dark:text-purple-300' : 'text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700' }}">
                            <i class="fas fa-home w-5 text-center"></i> Overview
                        </button>
                        <button wire:click="setTab('courses')"
                                class="w-full flex items-center gap-3 p-3 rounded-lg text-left transition-colors text-sm font-medium
                                       {{ $activeTab === 'courses' ? 'bg-purple-50 dark:bg-purple-900/30 text-purple-700 dark:text-purple-300' : 'text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700' }}">
                            <i class="fas fa-video w-5 text-center"></i> My Courses
                            <span class="ml-auto text-xs bg-purple-100 dark:bg-purple-900 text-purple-600 dark:text-purple-400 px-2 py-0.5 rounded-full">
                                {{ $payments->count() }}
                            </span>
                        </button>
                        <button wire:click="setTab('receipts')"
                                class="w-full flex items-center gap-3 p-3 rounded-lg text-left transition-colors text-sm font-medium
                                       {{ $activeTab === 'receipts' ? 'bg-purple-50 dark:bg-purple-900/30 text-purple-700 dark:text-purple-300' : 'text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700' }}">
                            <i class="fas fa-receipt w-5 text-center"></i> Receipts
                        </button>
                        <a href="{{ route('documents') }}"
                           class="flex items-center gap-3 p-3 rounded-lg text-left transition-colors text-sm font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700">
                            <i class="fas fa-book-open w-5 text-center"></i> Documents
                        </a>
                        <form method="POST" action="{{ route('logout') }}">
                            @csrf
                            <button type="submit"
                                    class="w-full flex items-center gap-3 p-3 rounded-lg text-left text-sm font-medium text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors">
                                <i class="fas fa-sign-out-alt w-5 text-center"></i> Logout
                            </button>
                        </form>
                    </nav>
                </div>
            </div>

            {{-- Main Content --}}
            <div class="lg:col-span-3">

                {{-- Overview --}}
                @if($activeTab === 'overview')
                    <div class="space-y-6">
                        {{-- Stats --}}
                        <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
                            <div class="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-5">
                                <p class="text-sm text-gray-500 mb-1">Purchased Courses</p>
                                <p class="text-3xl font-bold text-gray-900 dark:text-white">{{ $payments->count() }}</p>
                            </div>
                            <div class="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-5">
                                <p class="text-sm text-gray-500 mb-1">Total Spent</p>
                                <p class="text-3xl font-bold text-green-600">${{ number_format($totalSpent, 2) }}</p>
                            </div>
                            <div class="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-5">
                                <p class="text-sm text-gray-500 mb-1">Last Purchase</p>
                                <p class="text-lg font-bold text-gray-900 dark:text-white">
                                    {{ $payments->first()?->paid_at?->format('M d, Y') ?? '-' }}
                                </p>
                            </div>
                        </div>

                        {{-- Recent Courses --}}
                        <div class="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700">
                            <div class="p-5 border-b border-gray-200 dark:border-gray-700">
                                <h2 class="font-bold text-lg text-gray-900 dark:text-white">Recent Courses</h2>
                            </div>
                            <div class="p-5">
                                @if($payments->isEmpty())
                                    <div class="text-center py-8">
                                        <i class="fas fa-video text-gray-300 text-4xl mb-3"></i>
                                        <p class="text-gray-500 mb-4">No courses purchased yet</p>
                                        <a href="{{ route('courses') }}"
                                           class="px-4 py-2 rounded-lg bg-purple-600 text-white text-sm font-medium">
                                            Browse Courses
                                        </a>
                                    </div>
                                @else
                                    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                                        @foreach($payments->take(3) as $payment)
                                            <div class="border border-gray-200 dark:border-gray-700 rounded-xl overflow-hidden hover:shadow-md transition-shadow">
                                                <div class="h-32 overflow-hidden bg-purple-100">
                                                    @if($payment->course?->thumbnail_url)
                                                        <img src="{{ $payment->course->thumbnail_url }}" alt=""
                                                             class="w-full h-full object-cover">
                                                    @else
                                                        <div class="w-full h-full bg-gradient-to-br from-purple-600 to-purple-800 flex items-center justify-center">
                                                            <i class="fas fa-play-circle text-white text-3xl opacity-70"></i>
                                                        </div>
                                                    @endif
                                                </div>
                                                <div class="p-3">
                                                    <h4 class="font-semibold text-sm line-clamp-1 mb-2 text-gray-900 dark:text-white">
                                                        {{ $payment->course?->title }}
                                                    </h4>
                                                    <a href="{{ route('course.player', $payment->course?->uuid) }}"
                                                       class="block text-center py-1.5 text-xs font-semibold rounded-lg
                                                              bg-purple-600 hover:bg-purple-700 text-white transition-colors">
                                                        <i class="fas fa-play mr-1"></i> Watch Now
                                                    </a>
                                                </div>
                                            </div>
                                        @endforeach
                                    </div>
                                @endif
                            </div>
                        </div>
                    </div>

                {{-- My Courses --}}
                @elseif($activeTab === 'courses')
                    <div class="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700">
                        <div class="p-5 border-b border-gray-200 dark:border-gray-700 flex items-center justify-between">
                            <h2 class="font-bold text-lg text-gray-900 dark:text-white">My Courses</h2>
                            <a href="{{ route('courses') }}"
                               class="text-sm text-purple-600 hover:text-purple-700 font-medium">
                                + Buy more
                            </a>
                        </div>
                        <div class="p-5">
                            @if($payments->isEmpty())
                                <div class="text-center py-12">
                                    <i class="fas fa-video text-gray-300 text-4xl mb-3"></i>
                                    <p class="text-gray-500 mb-4">No courses purchased yet</p>
                                    <a href="{{ route('courses') }}"
                                       class="px-4 py-2 rounded-lg bg-purple-600 text-white text-sm">Browse Courses</a>
                                </div>
                            @else
                                <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    @foreach($payments as $payment)
                                        <div class="border border-gray-200 dark:border-gray-700 rounded-xl overflow-hidden">
                                            <div class="h-36 overflow-hidden">
                                                @if($payment->course?->thumbnail_url)
                                                    <img src="{{ $payment->course->thumbnail_url }}" alt=""
                                                         class="w-full h-full object-cover">
                                                @else
                                                    <div class="w-full h-full bg-gradient-to-br from-purple-600 to-purple-800 flex items-center justify-center">
                                                        <i class="fas fa-play-circle text-white text-3xl opacity-70"></i>
                                                    </div>
                                                @endif
                                            </div>
                                            <div class="p-4">
                                                <h4 class="font-semibold text-sm mb-1 text-gray-900 dark:text-white line-clamp-2">
                                                    {{ $payment->course?->title }}
                                                </h4>
                                                <p class="text-xs text-gray-500 mb-3">
                                                    {{ $payment->course?->videoModules?->count() ?? 0 }} modules
                                                    • Purchased {{ $payment->paid_at?->format('M d, Y') }}
                                                </p>
                                                <a href="{{ route('course.player', $payment->course?->uuid) }}"
                                                   class="block text-center py-2 text-xs font-semibold rounded-lg
                                                          bg-purple-600 hover:bg-purple-700 text-white transition-colors">
                                                    <i class="fas fa-play mr-1"></i> Continue Learning
                                                </a>
                                            </div>
                                        </div>
                                    @endforeach
                                </div>
                            @endif
                        </div>
                    </div>

                {{-- Receipts --}}
                @elseif($activeTab === 'receipts')
                    <div class="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700">
                        <div class="p-5 border-b border-gray-200 dark:border-gray-700">
                            <h2 class="font-bold text-lg text-gray-900 dark:text-white">Purchase History</h2>
                        </div>
                        <div class="p-5">
                            {{-- Stats --}}
                            <div class="grid grid-cols-3 gap-4 mb-6">
                                <div class="bg-gray-50 dark:bg-gray-700 rounded-xl p-4 text-center">
                                    <p class="text-2xl font-bold text-gray-900 dark:text-white">{{ $payments->count() }}</p>
                                    <p class="text-xs text-gray-500 mt-1">Total purchases</p>
                                </div>
                                <div class="bg-gray-50 dark:bg-gray-700 rounded-xl p-4 text-center">
                                    <p class="text-2xl font-bold text-green-600">${{ number_format($totalSpent, 2) }}</p>
                                    <p class="text-xs text-gray-500 mt-1">Total spent</p>
                                </div>
                                <div class="bg-gray-50 dark:bg-gray-700 rounded-xl p-4 text-center">
                                    <p class="text-lg font-bold text-gray-900 dark:text-white">
                                        {{ $payments->first()?->paid_at?->format('M d') ?? '-' }}
                                    </p>
                                    <p class="text-xs text-gray-500 mt-1">Last purchase</p>
                                </div>
                            </div>

                            @if($payments->isEmpty())
                                <div class="text-center py-8 text-gray-500">No purchase history</div>
                            @else
                                <div class="overflow-x-auto">
                                    <table class="w-full text-sm">
                                        <thead>
                                            <tr class="border-b border-gray-200 dark:border-gray-700">
                                                <th class="text-left py-3 px-4 text-xs font-semibold text-gray-500 uppercase">Invoice</th>
                                                <th class="text-left py-3 px-4 text-xs font-semibold text-gray-500 uppercase">Course</th>
                                                <th class="text-left py-3 px-4 text-xs font-semibold text-gray-500 uppercase">Date</th>
                                                <th class="text-left py-3 px-4 text-xs font-semibold text-gray-500 uppercase">Amount</th>
                                                <th class="text-left py-3 px-4 text-xs font-semibold text-gray-500 uppercase">Status</th>
                                            </tr>
                                        </thead>
                                        <tbody class="divide-y divide-gray-100 dark:divide-gray-700">
                                            @foreach($payments as $payment)
                                                <tr class="hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors">
                                                    <td class="py-3 px-4 text-xs font-mono text-gray-500">
                                                        {{ $payment->invoice_number }}
                                                    </td>
                                                    <td class="py-3 px-4">
                                                        <p class="font-medium text-gray-900 dark:text-white text-xs line-clamp-1">
                                                            {{ $payment->course?->title }}
                                                        </p>
                                                    </td>
                                                    <td class="py-3 px-4 text-xs text-gray-500">
                                                        {{ $payment->paid_at?->format('M d, Y') }}
                                                    </td>
                                                    <td class="py-3 px-4 text-xs font-bold text-gray-900 dark:text-white">
                                                        ${{ number_format($payment->amount, 2) }}
                                                    </td>
                                                    <td class="py-3 px-4">
                                                        <span class="text-xs px-2 py-1 rounded-full bg-green-100 text-green-700 font-medium">
                                                            Paid
                                                        </span>
                                                    </td>
                                                </tr>
                                            @endforeach
                                        </tbody>
                                    </table>
                                </div>
                            @endif
                        </div>
                    </div>
                @endif
            </div>
        </div>
    </div>
</div>