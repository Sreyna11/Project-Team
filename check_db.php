<?php
require 'vendor/autoload.php';
$app = require_once 'bootstrap/app.php';
$kernel = $app->make(Illuminate\Contracts\Console\Kernel::class);
$kernel->bootstrap();

use App\Models\VideoCourseItem;

$modules = VideoCourseItem::all(['videoCourseItem_id', 'course_item_id', 'title', 'order_num', 'drop_list', 'is_active'])->toArray();

// Also count how many modules per course
$counts = VideoCourseItem::selectRaw('course_item_id, count(*) as count')->groupBy('course_item_id')->get();

echo "MODULES IN DB:\n";
echo json_encode($modules, JSON_PRETTY_PRINT) . "\n\n";

echo "COUNTS PER COURSE:\n";
foreach ($counts as $count) {
    echo "Course ID {$count->course_item_id}: {$count->count} modules\n";
}
