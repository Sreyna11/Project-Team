<?php

namespace App\Filament\Resources\VideoCourseItemResource\Pages;

use App\Filament\Resources\VideoCourseItemResource;
use Filament\Actions;
use Filament\Resources\Pages\ListRecords;

class ListVideoCourseItems extends ListRecords
{
    protected static string $resource = VideoCourseItemResource::class;

    protected function getHeaderActions(): array
    {
        return [
            Actions\CreateAction::make(),
        ];
    }
}
