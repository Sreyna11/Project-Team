<?php
require 'vendor/autoload.php';
$app = require_once 'bootstrap/app.php';
$kernel = $app->make(Illuminate\Contracts\Console\Kernel::class);
$kernel->bootstrap();

use App\Services\KHQRService;
use KHQR\BakongKHQR;

$khqr = new KHQRService();

$prices = [1.00, 1.5, 14.99, 16.99, 15.50];

foreach ($prices as $price) {
    echo "Testing price: $price \n";
    $result = $khqr->generateIndividualQR([
        'amount' => $price,
        'currency' => 'USD'
    ]);
    
    $qr = $result['qr_string'];
    echo "QR String: " . substr($qr, 0, 50) . "...\n";
    
    $validation = BakongKHQR::verify($qr);
    echo "Validation valid? " . ($validation->isValid ? "YES" : "NO") . "\n";
    
    // Check if the qr string has the exact amount we expect
    $formatted = number_format((float)$price, 2, '.', '');
    $tag54Str = "5404" . $formatted;
    if (strpos($qr, $tag54Str) !== false || strpos($qr, "5405" . $formatted) !== false) {
        echo "- Amount $formatted found in QR!\n";
    } else {
        echo "- Amount $formatted MISSING from QR! Raw: $qr\n";
    }
    echo "--------------------------\n";
}
