<?php
require 'vendor/autoload.php';
$app = require_once 'bootstrap/app.php';
$kernel = $app->make(Illuminate\Contracts\Console\Kernel::class);
$kernel->bootstrap();

use App\Services\KHQRService;

$khqr = new KHQRService();

echo "=== GENERATING QR ===\n";
$result = $khqr->generateIndividualQR([
    'amount'      => 1.00,
    'currency'    => 'USD',
    'bill_number' => 'TEST001',
]);

if (isset($result['error'])) {
    echo "ERROR: " . $result['error'] . "\n";
    exit(1);
}

$qrString = $result['data']['qr'];
$md5      = $result['data']['md5'];
echo "QR String: $qrString\n";
echo "MD5: $md5\n";
echo "Length: " . strlen($qrString) . "\n";

// Validate against official Bakong API
echo "\n=== VALIDATING AGAINST BAKONG API ===\n";
$token = config('services.bakong.token');
$ch = curl_init('https://api-bakong.nbc.gov.kh/v1/check_transaction_by_md5');
curl_setopt_array($ch, [
    CURLOPT_POST           => true,
    CURLOPT_POSTFIELDS     => json_encode(['md5' => $md5]),
    CURLOPT_HTTPHEADER     => [
        'Content-Type: application/json',
        'Authorization: Bearer ' . $token,
    ],
    CURLOPT_RETURNTRANSFER => true,
    CURLOPT_TIMEOUT        => 15,
]);
$response = curl_exec($ch);
$httpCode = curl_getinfo($ch, CURLINFO_HTTP_CODE);
curl_close($ch);

echo "HTTP Status: $httpCode\n";
echo "API Response: $response\n";

// Also check with KHQR validator endpoint
echo "\n=== CHECKING QR VALIDITY (DECODE) ===\n";
$decoded = \KHQR\BakongKHQR::decode($qrString);
echo "Decoded Data: " . json_encode($decoded) . "\n";
