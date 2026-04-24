<?php
require 'vendor/autoload.php';
$app = require_once 'bootstrap/app.php';
$app->make(Illuminate\Contracts\Console\Kernel::class)->bootstrap();

use KHQR\BakongKHQR;
use KHQR\Models\MerchantInfo;
use KHQR\Helpers\KHQRData;

try {
    $info = new MerchantInfo(
        bakongAccountID: 'aok_sreyna@bkrt',
        merchantName: 'LearnHub',
        merchantCity: 'Phnom Penh',
        merchantID: '12345678', // Random merchant ID
        acquiringBank: 'ABA', // Try ABA acquiring bank
        currency: KHQRData::CURRENCY_USD,
        amount: 1.00,
        billNumber: 'LH123',
        storeLabel: 'LearnHub',
        terminalLabel: 'T01'
    );

    $res = BakongKHQR::generateMerchant($info);
    echo "\nQR MERCHANT:\n" . $res->data['qr'] . "\n\n";
} catch (\Exception $e) {
    echo "ERROR: " . $e->getMessage() . "\n";
}
