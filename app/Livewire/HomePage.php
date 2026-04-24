<?php

namespace App\Livewire;

use App\Models\CourseItem;
use App\Models\FreeDocument;
use App\Models\User;
use Livewire\Component;

class HomePage extends Component
{
    public $featuredCourses;
    public $featuredDocuments;

    public function mount()
    {
        $this->featuredCourses = CourseItem::with(['category', 'activePromotion'])
            ->where('is_active', true)
            ->where('show_in_header', true)
            ->whereHas('videoModules', fn($q) => $q->where('is_active', true))
            ->get()
            ->map(function ($course) {
                $promo = $course->activePromotion;
                $course->final_price = $promo
                    ? $promo->finalPrice((float) $course->price)
                    : (float) $course->price;
                return $course;
            });

        $this->featuredDocuments = FreeDocument::with('category')
            ->where('show_in_header', true)
            ->get();
    }

    public function render()
    {
        return view('livewire.home-page')
            ->layout('layouts.app', ['title' => 'Home']);
    }
}