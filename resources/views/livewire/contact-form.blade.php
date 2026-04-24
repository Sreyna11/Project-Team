<div>
    @if($submitted)
        <div class="flex flex-col items-center justify-center py-16 text-center">
            <div class="w-20 h-20 rounded-full bg-green-100 dark:bg-green-900/30 flex items-center justify-center mb-5">
                <i class="fas fa-check text-green-600 text-3xl"></i>
            </div>
            <h3 class="text-2xl font-black text-gray-900 dark:text-white mb-3">Message Sent!</h3>
            <p class="text-gray-500 dark:text-gray-400 mb-6">We'll get back to you within 24 hours.</p>
            <button wire:click="$set('submitted', false)"
                    class="px-6 py-2.5 rounded-xl bg-purple-600 hover:bg-purple-700 text-white font-semibold text-sm transition-colors">
                Send another message
            </button>
        </div>
    @else
        <form wire:submit="submit" class="space-y-5">
            <div class="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div>
                    <label class="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">Full Name</label>
                    <input wire:model="full_name" type="text" placeholder="Your name"
                           class="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-gray-700
                                  bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-white text-sm
                                  focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all">
                    @error('full_name') <p class="mt-1 text-xs text-red-500">{{ $message }}</p> @enderror
                </div>
                <div>
                    <label class="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">Email Address</label>
                    <input wire:model="email" type="email" placeholder="you@example.com"
                           class="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-gray-700
                                  bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-white text-sm
                                  focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all">
                    @error('email') <p class="mt-1 text-xs text-red-500">{{ $message }}</p> @enderror
                </div>
            </div>

            <div>
                <label class="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">Subject</label>
                <input wire:model="subject" type="text" placeholder="How can we help?"
                       class="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-gray-700
                              bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-white text-sm
                              focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all">
                @error('subject') <p class="mt-1 text-xs text-red-500">{{ $message }}</p> @enderror
            </div>

            <div>
                <label class="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">Message</label>
                <textarea wire:model="message" rows="6" placeholder="Your message here..."
                          class="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-gray-700
                                 bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-white text-sm
                                 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all resize-none"></textarea>
                @error('message') <p class="mt-1 text-xs text-red-500">{{ $message }}</p> @enderror
            </div>

            <button type="submit"
                    class="w-full py-4 rounded-xl bg-purple-600 hover:bg-purple-700 text-white font-black text-base transition-all hover:scale-[1.02]">
                <span wire:loading.remove><i class="fas fa-paper-plane mr-2"></i> Send Message</span>
                <span wire:loading><i class="fas fa-spinner fa-spin mr-2"></i> Sending...</span>
            </button>
        </form>
    @endif
</div>