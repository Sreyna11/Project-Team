<?php

namespace App\Filament\Resources\VideoCourseItemResource\Pages;

use App\Filament\Resources\VideoCourseItemResource;
use App\Models\VideoCourseItem;
use App\Models\CourseItem;
use Filament\Resources\Pages\CreateRecord;
use Filament\Notifications\Notification;

class CreateVideoCourseItem extends CreateRecord
{
    protected static string $resource = VideoCourseItemResource::class;

    protected function getRedirectUrl(): string
    {
        return $this->getResource()::getUrl('index');
    }

    // ← After creating main module, also save repeater items
    protected function afterCreate(): void
    {
        $data = $this->form->getState();

        if (!empty($data['drop_list'])) {
            foreach ($data['drop_list'] as $module) {
                VideoCourseItem::create([
                    'course_item_id' => $this->record->course_item_id,
                    'title'          => $module['title'],
                    'description'    => $module['description'] ?? null,
                    'video_url'      => $module['video_url'] ?? null,
                    'duration'       => $module['duration'] ?? null,
                    'order_num'      => $module['order_num'] ?? 1,
                    'is_free'        => $module['is_free'] ?? false,
                    'is_active'      => $module['is_active'] ?? true,
                ]);
            }

            Notification::make()
                ->title(count($data['drop_list']) . ' extra modules added!')
                ->success()
                ->send();
        }
    }
     protected function mutateFormDataBeforeCreate(array $data): array
    {
         $courseId    = $data['course_item_id'];
        $course      = CourseItem::findOrFail($courseId);
        $maxModules  = $course->max_modules ?? 10;
        
        $currentCount = VideoCourseItem::where('course_item_id', $courseId)
            ->where('is_active', true)
            ->count();

        $incomingCount = 1; // The main one
        if (!empty($data['drop_list'])) {
            $incomingCount += count($data['drop_list']);
        }

        if (($currentCount + $incomingCount) > $maxModules) {
            Notification::make()
                ->title("Module limit reached!")
                ->body("Adding {$incomingCount} modules would exceed the limit of {$maxModules} (Current: {$currentCount}).")
                ->danger()
                ->persistent()
                ->send();

            $this->halt(); // ← Stop creation!
        }

        unset($data['drop_list']);
        return $data;
    }
}