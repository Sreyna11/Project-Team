<?php
require __DIR__.'/vendor/autoload.php';
$app = require_once __DIR__.'/bootstrap/app.php';
$kernel = $app->make(Illuminate\Contracts\Console\Kernel::class);
$kernel->bootstrap();

try {
    Illuminate\Support\Facades\Storage::disk('minio')->exists('test_script.txt');
    echo "Success! Exists checked.\n";
} catch (\Exception $e) {
    echo "ERROR: " . get_class($e) . "\n";
    echo $e->getMessage() . "\n";
    if ($e->getPrevious()) {
        echo "INNER ERROR: " . get_class($e->getPrevious()) . "\n";
        echo $e->getPrevious()->getMessage() . "\n";
        
        if ($e->getPrevious()->getPrevious()) {
            echo "DEEPER ERROR: " . get_class($e->getPrevious()->getPrevious()) . "\n";
            echo $e->getPrevious()->getPrevious()->getMessage() . "\n";
        }
    }
}
