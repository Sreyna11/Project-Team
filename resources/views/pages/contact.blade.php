@extends('layouts.app')
@section('title', 'Contact Us')
@section('content')
<div>
    {{-- Header --}}
    <section class="bg-gray-900 py-20 text-center">
        <div class="container mx-auto px-4">
            <span class="inline-block px-4 py-2 rounded-full bg-purple-600/20 text-purple-400 text-sm font-medium mb-6">
                Get in Touch
            </span>
            <h1 class="text-5xl font-black text-white mb-4">Contact Us</h1>
            <p class="text-gray-400 text-xl max-w-xl mx-auto">Have questions? We'd love to hear from you.</p>
        </div>
    </section>

    <section class="py-20 bg-gray-50 dark:bg-gray-900">
        <div class="container mx-auto px-4">
            <div class="grid grid-cols-1 lg:grid-cols-3 gap-10">

                {{-- Contact Info --}}
                <div class="space-y-5">
                    <div class="bg-white dark:bg-gray-800 rounded-3xl p-8 border border-gray-100 dark:border-gray-700">
                        <h3 class="font-black text-xl text-gray-900 dark:text-white mb-6">Get in Touch</h3>
                        <div class="space-y-5">
                            @foreach([
                                ['icon' => 'fa-envelope', 'label' => 'Email', 'value' => 'support@learnhub.com', 'color' => 'purple'],
                                ['icon' => 'fa-phone', 'label' => 'Phone', 'value' => '+855 71 873 1025', 'color' => 'blue'],
                                ['icon' => 'fa-map-marker-alt', 'label' => 'Address', 'value' => 'St 271, Steung Mean Chey, Phnom Penh, Cambodia', 'color' => 'green'],
                                ['icon' => 'fa-clock', 'label' => 'Hours', 'value' => 'Monday - Friday, 8AM - 6PM (ICT)', 'color' => 'orange'],
                            ] as $info)
                                <div class="flex items-start gap-4">
                                    <div class="w-10 h-10 rounded-xl bg-{{ $info['color'] }}-50 dark:bg-{{ $info['color'] }}-900/30 flex items-center justify-center flex-shrink-0">
                                        <i class="fas {{ $info['icon'] }} text-{{ $info['color'] }}-600 text-sm"></i>
                                    </div>
                                    <div>
                                        <p class="text-xs text-gray-500 mb-0.5 font-medium">{{ $info['label'] }}</p>
                                        <p class="text-sm text-gray-800 dark:text-gray-200 font-medium">{{ $info['value'] }}</p>
                                    </div>
                                </div>
                            @endforeach
                        </div>
                    </div>

                    <div class="bg-white dark:bg-gray-800 rounded-3xl p-8 border border-gray-100 dark:border-gray-700">
                        <h4 class="font-black text-base text-gray-900 dark:text-white mb-5">FAQ</h4>
                        <div class="space-y-4">
                            @foreach([
                                ['q' => 'How do I access purchased courses?', 'a' => 'All purchased courses are available in your dashboard 24/7.'],
                                ['q' => 'Can I download course materials?', 'a' => 'Yes, all documents are downloadable from the document reader.'],
                                ['q' => "What's your refund policy?", 'a' => 'We offer a 30-day money-back guarantee on all courses.'],
                            ] as $faq)
                                <div class="border-b border-gray-100 dark:border-gray-700 pb-4 last:border-0 last:pb-0">
                                    <p class="text-sm font-semibold text-gray-900 dark:text-white mb-1">{{ $faq['q'] }}</p>
                                    <p class="text-xs text-gray-500 dark:text-gray-400 leading-relaxed">{{ $faq['a'] }}</p>
                                </div>
                            @endforeach
                        </div>
                    </div>
                </div>

                {{-- Contact Form --}}
                <div class="lg:col-span-2">
                    <div class="bg-white dark:bg-gray-800 rounded-3xl p-10 border border-gray-100 dark:border-gray-700">
                        <h3 class="font-black text-2xl text-gray-900 dark:text-white mb-8">Send us a message</h3>
                        @livewire('contact-form')
                    </div>
                </div>
            </div>
        </div>
    </section>
</div>
@endsection