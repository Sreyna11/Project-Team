<?php

namespace App\Livewire;

use App\Models\CourseItem;
use App\Models\VideoCourseItem;
use App\Models\UserCourseProgress;
use App\Models\Payment;
use Livewire\Component;
use Illuminate\Support\Facades\Auth;
use Livewire\WithFileUploads;
use Illuminate\Support\Facades\Storage;

class VideoPlayer extends Component
{
    public CourseItem $course;

    // Store uuid strings as state — safe to serialize
    public ?string $currentModuleUuid = null;
    public int $currentIndex = 0;
    public bool $isOwned = false;
    public array $completedModules = []; // stores videoCourseItem_id integers

    public function mount(CourseItem $course, ?VideoCourseItem $module = null)
    {
        $this->course = $course;

        $user = Auth::user();
        $this->isOwned = $user && (
            $user->hasRole(['super_admin', 'Sale']) ||
            Payment::where('user_id', $user->id)
                ->where('course_item_id', $course->courseItem_id)
                ->where('status', 'paid')
                ->exists()
        );

        $this->completedModules = UserCourseProgress::where('user_id', Auth::id())
            ->where('courseItem_id', $course->courseItem_id)
            ->where('completed', true)
            ->pluck('videoCourseItem_id')
            ->toArray();

        $modules = $this->getModules();

        if ($module) {
            // Module was passed via route {module} UUID — find its index
            $index = $modules->search(
                fn($m) => $m->videoCourseItem_id === $module->videoCourseItem_id
            );
            $this->currentModuleUuid = $module->uuid;
            $this->currentIndex = $index !== false ? $index : 0;
        } else {
            $first = $modules->first();
            $this->currentModuleUuid = $first?->uuid;
            $this->currentIndex = 0;
        }
    }

    public function getModules()
    {
        return VideoCourseItem::where('course_item_id', $this->course->courseItem_id)
            ->where('is_active', true)
            ->orderBy('order_num')
            ->get();
    }

    // Called from blade via wire:click="selectModule('uuid-here')"
    public function selectModule(string $moduleUuid): void
    {
        $modules = $this->getModules();
        $module = $modules->firstWhere('uuid', $moduleUuid);

        if (!$module)
            return;

        if (!$this->isOwned && !$module->is_free) {
            $this->dispatch('toast', message: 'Purchase this course to unlock all modules!', type: 'error');
            return;
        }

        $index = $modules->search(fn($m) => $m->uuid === $moduleUuid);

        $this->currentModuleUuid = $moduleUuid;
        $this->currentIndex = $index !== false ? $index : 0;
    }

    public function markComplete(): void
    {
        if (!$this->currentModuleUuid || !$this->isOwned)
            return;

        $modules = $this->getModules();
        $module = $modules->firstWhere('uuid', $this->currentModuleUuid);

        if (!$module)
            return;

        UserCourseProgress::updateOrCreate(
            [
                'user_id' => Auth::id(),
                'courseItem_id' => $this->course->courseItem_id,
                'videoCourseItem_id' => $module->videoCourseItem_id,
            ],
            [
                'completed' => true,
                'completed_at' => now(),
            ]
        );

        if (!in_array($module->videoCourseItem_id, $this->completedModules)) {
            $this->completedModules[] = $module->videoCourseItem_id;
        }

        $this->dispatch('toast', message: 'Module marked as complete!', type: 'success');
        $this->goNext();
    }

    public function goPrevious(): void
    {
        if ($this->currentIndex <= 0)
            return;

        $modules = $this->getModules();
        $this->currentIndex--;
        $prev = $modules->values()->get($this->currentIndex);

        if ($prev) {
            $this->currentModuleUuid = $prev->uuid;
        }
    }

    public function goNext(): void
    {
        $modules = $this->getModules();

        if ($this->currentIndex >= $modules->count() - 1)
            return;

        $this->currentIndex++;
        $next = $modules->values()->get($this->currentIndex);

        if (!$next)
            return;

        if (!$this->isOwned && !$next->is_free) {
            $this->dispatch('toast', message: 'Purchase to unlock the next module!', type: 'error');
            $this->currentIndex--;
            return;
        }

        $this->currentModuleUuid = $next->uuid;
    }
    public function render()
    {
        $modules = $this->getModules();
        $currentModule = $modules->firstWhere('uuid', $this->currentModuleUuid);

        $embedUrl = '';
        $videoFileUrl = '';

        if ($currentModule) {
            if ($currentModule->video_file) {
                // ← Signed URL — expires in 2 hours
                // Only works if user is authenticated
                if (!Auth::check()) {
                    return redirect()->route('login');
                }

                $videoFileUrl = \Illuminate\Support\Facades\Storage::disk('minio')
                    ->temporaryUrl(
                        $currentModule->video_file,
                        now()->addHours(2)
                    );

            } elseif ($currentModule->video_url) {
                $url = $currentModule->video_url;
                if (str_contains($url, 'youtube.com/watch?v=')) {
                    $videoId = explode('v=', explode('&', $url)[0])[1] ?? '';
                    $embedUrl = "https://www.youtube.com/embed/{$videoId}?autoplay=1&rel=0";
                } elseif (str_contains($url, 'youtu.be/')) {
                    $videoId = explode('?', explode('youtu.be/', $url)[1] ?? '')[0];
                    $embedUrl = "https://www.youtube.com/embed/{$videoId}?autoplay=1&rel=0";
                } else {
                    $embedUrl = $url;
                }
            }
        }

        $total = $modules->count();
        $progress = $total > 0
            ? (int) round((count($this->completedModules) / $total) * 100)
            : 0;

        return view('livewire.video-player', [
            'modules' => $modules,
            'currentModule' => $currentModule,
            'embedUrl' => $embedUrl,
            'videoFileUrl' => $videoFileUrl,
            'progress' => $progress,
            'isOwned' => $this->isOwned,
        ])->layout('layouts.app', ['title' => $this->course->title . ' — LearnHub']);
    }
}