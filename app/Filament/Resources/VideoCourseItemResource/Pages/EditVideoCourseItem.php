<?php

namespace App\Filament\Resources\VideoCourseItemResource\Pages;

use App\Filament\Resources\VideoCourseItemResource;
use App\Models\VideoCourseItem;
use Filament\Actions;
use Filament\Resources\Pages\EditRecord;
use Filament\Notifications\Notification;

class EditVideoCourseItem extends EditRecord
{
    protected static string $resource = VideoCourseItemResource::class;

    protected function getHeaderActions(): array
    {
        return [
            Actions\DeleteAction::make(),
        ];
    }

    protected function getRedirectUrl(): string
    {
        return $this->getResource()::getUrl('index');
    }

    // ← Save each repeater item as separate DB row
    protected function afterSave(): void
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

            // ← Clear drop_list after saving so it doesn't save to DB
            $this->record->update(['drop_list' => '[]']);

            Notification::make()
                ->title(count($data['drop_list']) . ' modules added successfully!')
                ->success()
                ->send();
        }
    }
}