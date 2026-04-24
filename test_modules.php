<?php

require 'vendor/autoload.php';

$app = require_once 'bootstrap/app.php';
$app->make(\Illuminate\Contracts\Console\Kernel::class)->bootstrap();

use App\Models\CourseItem;
use App\Models\VideoCourseItem;

// Check if modules have UUIDs
$modules = VideoCourseItem::select('videoCourseItem_id', 'title', 'uuid', 'course_item_id')->limit(10)->get();

echo "=== Video Modules ===\n";
foreach ($modules as $m) {
    echo "ID: {$m->videoCourseItem_id}, Title: {$m->title}, UUID: " . ($m->uuid ?? 'NULL') . "\n";
}

// Check course UUIDs
$courses = CourseItem::select('courseItem_id', 'title', 'uuid')->limit(5)->get();
echo "\n=== Courses ===\n";
foreach ($courses as $c) {
    echo "ID: {$c->courseItem_id}, Title: {$c->title}, UUID: " . ($c->uuid ?? 'NULL') . "\n";
}
