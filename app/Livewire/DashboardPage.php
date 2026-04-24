<?php

namespace App\Livewire;

use App\Models\Payment;
use App\Models\CourseItem;
use Livewire\Component;
use Illuminate\Support\Facades\Auth;

class DashboardPage extends Component
{
    public string $activeTab = 'overview';
    public $payments;
    public $user;
    public float $totalSpent = 0;

    public function mount()
    {
        $this->user = Auth::user();
        $this->loadPayments();
    }

    public function loadPayments()
    {
        $this->payments = Payment::where('user_id', Auth::id())
            ->with(['course.category', 'course.videoModules'])
            ->where('status', 'paid')
            ->orderByDesc('paid_at')
            ->get();

        $this->totalSpent = $this->payments->sum('amount');
    }

    public function setTab(string $tab)
    {
        $this->activeTab = $tab;
    }

    public function render()
    {
        return view('livewire.dashboard-page')
            ->layout('layouts.app', ['title' => 'Dashboard']);
    }
}