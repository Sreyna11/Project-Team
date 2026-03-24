<?php

namespace App\Filament\Resources\CourseItemResource\Pages;

use App\Filament\Resources\CourseItemResource;
use Filament\Actions;
use Filament\Resources\Pages\EditRecord;

class EditCourseItem extends EditRecord
{
    protected static string $resource = CourseItemResource::class;

    protected function getHeaderActions(): array
    {
        return [
            Actions\DeleteAction::make(),
        ];
    }
}
