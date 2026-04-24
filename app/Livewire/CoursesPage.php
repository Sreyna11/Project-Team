<?php

namespace App\Livewire;

use App\Models\CourseItem;
use App\Models\Category;
use Livewire\Component;
use Livewire\WithPagination;
use Livewire\Attributes\Url;

class CoursesPage extends Component
{
    use WithPagination;

    #[Url]
    public $search = '';

    #[Url(as: 'category')]
    public ?int $categoryId = null;

    public function mount()
    {
        // categories moved to render
    }

    public function updatedSearch()
    {
        $this->resetPage();
    }

    public function updatedCategoryId()
    {
        $this->resetPage();
    }

    public function filterByCategory($id)
    {
        $this->categoryId = $id ? (int) $id : null;
        $this->resetPage();
    }

    public function render()
    {
        $courses = CourseItem::with(['category', 'activePromotion'])
            ->where('is_active', true)
            ->whereHas('videoModules', fn($q) => $q->where('is_active', true))
            ->when($this->search, function($q) {
                $term = "%{$this->search}%";
                $q->where(function($sq) use ($term) {
                    $sq->where('title', 'ilike', $term)
                       ->orWhere('description', 'ilike', $term);
                });
            })
            ->when($this->categoryId, function($q) {
                $q->where('category_id', $this->categoryId);
            })
            ->get()
            ->map(function ($course) {
                $promo = $course->activePromotion;
                $course->final_price = $promo
                    ? $promo->finalPrice((float) $course->price)
                    : (float) $course->price;
                return $course;
            });

        return view('livewire.courses-page', [
                'courses' => $courses,
                'categories' => Category::orderBy('name')->get()
            ])
            ->layout('layouts.app', ['title' => 'Courses']);
    }
}