<?php
require __DIR__ . '/../vendor/autoload.php';
$app = require_once __DIR__ . '/../bootstrap/app.php';
$kernel = $app->make(Illuminate\Contracts\Console\Kernel::class);
$kernel->bootstrap();

\App\Models\FreeDocument::whereNull('uuid')->chunk(100, function ($docs) {
    foreach ($docs as $doc) {
        $doc->uuid = (string) \Illuminate\Support\Str::uuid();
        $doc->save();
        echo "Updated Document ID: " . $doc->freeDocument_id . " with UUID: " . $doc->uuid . PHP_EOL;
    }
});
