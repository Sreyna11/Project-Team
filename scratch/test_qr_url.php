<?php
require 'vendor/autoload.php';
$app = require_once 'bootstrap/app.php';
$kernel = $app->make(Illuminate\Contracts\Console\Kernel::class);
$kernel->bootstrap();

use App\Services\BakongService;
$bakong = new BakongService();

$res = $bakong->generateQr(1.00);
$qr_string = $res->data['qr'];

$url = "https://api.qrserver.com/v1/create-qr-code/?size=300x300&data=" . urlencode($qr_string);
echo "QR URL: " . $url . "\n";
