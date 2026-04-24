<?php
require 'vendor/autoload.php';
$app = require_once 'bootstrap/app.php';
$kernel = $app->make(Illuminate\Contracts\Console\Kernel::class);
$kernel->bootstrap();

use App\Services\KHQRService;
$khqr = new KHQRService();

$prices = [1.00, 19.99, 15.50];
$html = "<html><body style='background: #333; color: white;'><h2>QR Code Tests</h2><div style='display: flex; gap: 20px;'>";

foreach ($prices as $price) {
    $result = $khqr->generateIndividualQR(['amount' => $price, 'currency' => 'USD']);
    $html .= "<div><h3>Price: \$$price</h3>";
    $html .= "<img src='{$result['qr_image']}' style='width: 256px; height: 256px; background: white; padding: 10px; border-radius: 10px;' />";
    $html .= "<p style='max-width: 256px; word-wrap: break-word; font-family: monospace; font-size: 10px;'>" . $result['qr_string'] . "</p>";
    $html .= "</div>";
}

$html .= "</div></body></html>";
file_put_contents('artifacts/qr_codes.html', $html);
echo "Generated artifacts/qr_codes.html\n";
