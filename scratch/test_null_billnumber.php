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

echo "--- ADMIN PANEL QR (WORKING) ---\n";
// The admin panel PaymentResource passes ONLY amount:
$res1 = $bakong->generateQr($amount);
$str1 = $res1->data['qr'];
echo "String: $str1\n";
