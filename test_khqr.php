<?php

require 'vendor/autoload.php';

$app = require_once 'bootstrap/app.php';
$kernel = $app->make(Illuminate\Contracts\Console\Kernel::class);
$kernel->bootstrap();

$service = app(\App\Services\KHQRService::class);
$res = $service->generateIndividualQR(['amount' => 1.50, 'currency' => 'USD']);
$qrString = $res['data']['qr'];
echo "RAW STRING:\n";
echo $qrString . "\n\n";

$verify = \KHQR\BakongKHQR::verify($qrString);
$decode = \KHQR\BakongKHQR::decode($qrString);

echo "DECODED:\n";
print_r($decode);
echo "\nVERIFY:\n";
echo json_encode($verify) . "\n";
