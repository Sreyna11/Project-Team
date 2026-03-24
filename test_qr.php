<?php
require __DIR__.'/vendor/autoload.php';

$app = require_once __DIR__.'/bootstrap/app.php';
$app->make(Illuminate\Contracts\Console\Kernel::class)->bootstrap();

$service = app(App\Services\KHQRService::class);
$res = $service->generateMerchantQR(['amount' => 0.1, 'currency' => 'USD']);
echo "QR: " . $res['data']['qr'] . "\n";
$decode = \KHQR\BakongKHQR::decode($res['data']['qr']);
echo "Decoded:\n";
print_r($decode->data);
