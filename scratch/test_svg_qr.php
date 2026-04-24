<?php
require 'vendor/autoload.php';
$app = require 'bootstrap/app.php';
$app->make('Illuminate\Contracts\Console\Kernel')->bootstrap();

$svc = new App\Services\KHQRService();
$r = $svc->generateIndividualQR(['amount' => 1.00, 'currency' => 'USD', 'bill_number' => 'TEST001']);

if (isset($r['data']['qr_image'])) {
    echo "✅ SVG QR OK - data URI length: " . strlen($r['data']['qr_image']) . "\n";
    echo "✅ QR String: " . $r['data']['qr'] . "\n";
} else {
    echo "❌ FAILED: " . ($r['error'] ?? 'unknown error') . "\n";
}
