<?php

require 'vendor/autoload.php';

$app = require_once 'bootstrap/app.php';
$kernel = $app->make(Illuminate\Contracts\Console\Kernel::class);
$kernel->bootstrap();

$service = app(\App\Services\KHQRService::class);
$res = $service->generateIndividualQR(['amount' => 0, 'currency' => 'USD', 'bill_number' => 'LH' . strtoupper(\Illuminate\Support\Str::random(6))]);
$qr = $res['data']['qr'];
$md5 = $res['data']['md5'];

echo "QR: " . $qr . "\n";
echo "MD5: " . $md5 . "\n";

$khqr = new \KHQR\BakongKHQR(env('BAKONG_API_TOKEN'));
$result = $khqr->checkTransactionByMD5($md5);

print_r($result);
