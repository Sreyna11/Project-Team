<?php
require __DIR__.'/../vendor/autoload.php';
$app = require_once __DIR__.'/../bootstrap/app.php';
$kernel = $app->make(Illuminate\Contracts\Console\Kernel::class);
$kernel->bootstrap();

use App\Services\KHQRService;

try {
    $service = new KHQRService();
    $result = $service->generateIndividualQR([
        'amount' => 1.0,
        'currency' => 'USD',
        'bill_number' => 'TEST1234'
    ]);
    echo "QR STRING: " . $result['qr_string'] . "\n";
    echo "QR IMAGE (SVG) PRESENT: " . (isset($result['qr_image']) ? 'YES (' . strlen($result['qr_image']) . ' bytes)' : 'NO') . "\n";
    echo "MD5: " . $result['md5'] . "\n";
} catch (\Exception $e) {
    echo "ERROR: " . $e->getMessage() . "\n";
}
