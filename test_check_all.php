<?php

require 'vendor/autoload.php';

$app = require_once 'bootstrap/app.php';
$kernel = $app->make(Illuminate\Contracts\Console\Kernel::class);
$kernel->bootstrap();

$payment = \App\Models\Payment::orderBy('id', 'desc')->first();

$token = env('BAKONG_API_TOKEN');

// Attempt 1: short_hash
$response1 = \Illuminate\Support\Facades\Http::withHeaders([
    'Authorization' => 'Bearer ' . $token,
    'Content-Type' => 'application/json'
])->post('https://api-bakong.nbc.gov.kh/v1/check_transaction_by_short_hash', [
    'hash' => $payment->md5,
    'amount' => (float)$payment->amount,
    'currency' => 'USD',
    'accountId' => env('BAKONG_ACCOUNT_ID')
]);

echo "Short Hash Attempt:\n";
print_r($response1->json());

// Attempt 2: md5 with amount appended
$response2 = \Illuminate\Support\Facades\Http::withHeaders([
    'Authorization' => 'Bearer ' . $token,
    'Content-Type' => 'application/json'
])->post('https://api-bakong.nbc.gov.kh/v1/check_transaction_by_md5', [
    'md5' => $payment->md5,
    'amount' => (float)$payment->amount,
    'currency' => 'USD',
    'accountId' => env('BAKONG_ACCOUNT_ID')
]);

echo "\nMD5 Attempt:\n";
print_r($response2->json());

