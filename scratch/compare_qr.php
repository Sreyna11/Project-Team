<?php
require 'vendor/autoload.php';
$app = require_once 'bootstrap/app.php';
$kernel = $app->make(Illuminate\Contracts\Console\Kernel::class);
$kernel->bootstrap();

use App\Services\BakongService;
use App\Services\KHQRService;

$bakong = new BakongService();
$khqr = new KHQRService();

$amount = 1.00;
$billNumber = 'TEST1234';

echo "--- ADMIN PANEL QR (WORKING) ---\n";
$res1 = $bakong->generateQr($amount, 'USD', $billNumber);
$str1 = $res1->data['qr'];
echo "String: $str1\n";

echo "\n--- FRONTEND QR (INVALID) ---\n";
$res2 = $khqr->generateIndividualQR(['amount' => $amount, 'bill_number' => $billNumber]);
$str2 = $res2['qr_string'];
echo "String: $str2\n";

echo "\n--- COMPARISON ---\n";
if ($str1 === $str2) {
    echo "✅ IDENTICAL: The strings are exactly the same.\n";
} else {
    echo "❌ DIFFERENT: Found differences!\n";
    echo "Length 1: " . strlen($str1) . "\n";
    echo "Length 2: " . strlen($str2) . "\n";
    
    // Find first difference
    for ($i = 0; $i < min(strlen($str1), strlen($str2)); $i++) {
        if ($str1[$i] !== $str2[$i]) {
            echo "First mismatch at pos $i: '" . $str1[$i] . "' vs '" . $str2[$i] . "'\n";
            echo "Context 1: " . substr($str1, max(0, $i-5), 20) . "\n";
            echo "Context 2: " . substr($str2, max(0, $i-5), 20) . "\n";
            break;
        }
    }
}
