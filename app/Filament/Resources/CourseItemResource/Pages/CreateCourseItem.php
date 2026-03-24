<?php

namespace App\Filament\Resources\CourseItemResource\Pages;

use App\Filament\Resources\CourseItemResource;
use Filament\Actions;
use Filament\Resources\Pages\CreateRecord;

class CreateCourseItem extends CreateRecord
{
    protected static string $resource = CourseItemResource::class;
}
