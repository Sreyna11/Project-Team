<?php

namespace App\Filament\Resources\FreeDocumentResource\Pages;

use App\Filament\Resources\FreeDocumentResource;
use Filament\Actions;
use Filament\Resources\Pages\ListRecords;

class ListFreeDocuments extends ListRecords
{
    protected static string $resource = FreeDocumentResource::class;

    protected function getHeaderActions(): array
    {
        return [
            Actions\CreateAction::make(),
        ];
    }
}
