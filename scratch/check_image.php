<?php
require __DIR__ . '/../vendor/autoload.php';
$app = require_once __DIR__ . '/../bootstrap/app.php';
$kernel = $app->make(Illuminate\Contracts\Console\Kernel::class);
$kernel->bootstrap();

$course = \App\Models\CourseItem::whereNotNull('image')->first();
if ($course) {
    echo "Path: " . $course->image . PHP_EOL;
    $exists = \Illuminate\Support\Facades\Storage::disk('minio')->exists($course->image);
    echo "Disk exists: " . ($exists ? 'YES' : 'NO') . PHP_EOL;
    if ($exists) {
        echo "MIME: " . \Illuminate\Support\Facades\Storage::disk('minio')->mimeType($course->image) . PHP_EOL;
        echo "Size: " . \Illuminate\Support\Facades\Storage::disk('minio')->size($course->image) . " bytes" . PHP_EOL;
    }
} else {
    echo "No course found with an image." . PHP_EOL;
}
