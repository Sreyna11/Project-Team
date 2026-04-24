<?php

namespace App\Livewire;

use App\Models\FreeDocument;
use App\Models\Category;
use Livewire\Component;
use Livewire\Attributes\Url;

class DocumentsPage extends Component
{
    #[Url]
    public $search = '';

    #[Url(as: 'category')]
    public ?int $categoryId = null;

    public function mount()
    {
        // Moved to render
    }

    public function filterByCategory($id)
    {
        $this->categoryId = $id ? (int) $id : null;
    }

    public function render()
    {
        $documents = FreeDocument::with('category')
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
            ->get();

        return view('livewire.documents-page', [
                'documents' => $documents,
                'categories' => Category::orderBy('name')->get()
            ])
            ->layout('layouts.app', ['title' => 'Documents']);
    }
}