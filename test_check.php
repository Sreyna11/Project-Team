<?php

require 'vendor/autoload.php';

$app = require_once 'bootstrap/app.php';
$kernel = $app->make(Illuminate\Contracts\Console\Kernel::class);
$kernel->bootstrap();

$payment = \App\Models\Payment::orderBy('id', 'desc')->first();

if (!$payment) {
    die("No payments found");
}

echo "Checking Payment ID: " . $payment->id . " MD5: " . $payment->md5 . " Amount: " . $payment->amount . "\n";

$token = env('BAKONG_API_TOKEN');
$response = \Illuminate\Support\Facades\Http::withHeaders([
    'Authorization' => 'Bearer ' . $token,
    'Content-Type' => 'application/json'
])->post('https://api-bakong.nbc.gov.kh/v1/check_transaction_by_md5', [
    'md5' => $payment->md5,
    'amount' => (float)$payment->amount
]);

print_r($response->json());
