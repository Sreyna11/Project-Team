<?php
use App\Models\CourseItem;

$courses = CourseItem::withCount(['payments' => function($q) {
    $q->where('status', 'paid');
}])->orderByDesc('payments_count')->limit(8)->get();

foreach($courses as $c) {
    echo $c->title . ': ' . $c->payments_count . "\n";
}
echo "Total: " . $courses->sum('payments_count') . "\n";
