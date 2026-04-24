<?php

require 'vendor/autoload.php';

$app = require_once 'bootstrap/app.php';
$kernel = $app->make(Illuminate\Contracts\Console\Kernel::class);
$kernel->bootstrap();

$payment = \App\Models\Payment::orderBy('id', 'desc')->first();

if (!$payment) {
    die("No payments found");
}

$khqr = new \KHQR\BakongKHQR(env('BAKONG_API_TOKEN'));
$result = $khqr->checkTransactionByShortHash($payment->md5, (float)$payment->amount, 'USD');

print_r($result);
