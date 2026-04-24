<?php

require 'vendor/autoload.php';

$app = require_once 'bootstrap/app.php';
$kernel = $app->make(Illuminate\Contracts\Console\Kernel::class);
$kernel->bootstrap();

$payment = \App\Models\Payment::orderBy('id', 'desc')->first();

if (!$payment) {
    die("No payments found\n");
}

echo "MD5: " . $payment->md5 . "\n";
echo "Amount: " . $payment->amount . "\n";

$khqr = new \KHQR\BakongKHQR(env('BAKONG_API_TOKEN'));
$result = $khqr->checkTransactionByMD5($payment->md5);
print_r($result);
