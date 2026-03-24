<?php

namespace App\Filament\Resources\FreeDocumentResource\Pages;

use App\Filament\Resources\FreeDocumentResource;
use Filament\Actions;
use Filament\Resources\Pages\EditRecord;

class EditFreeDocument extends EditRecord
{
    protected static string $resource = FreeDocumentResource::class;

    protected function getHeaderActions(): array
    {
        return [
            Actions\DeleteAction::make(),
        ];
    }
}
