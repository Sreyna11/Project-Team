<?php
require __DIR__ . '/../vendor/autoload.php';
$app = require_once __DIR__ . '/../bootstrap/app.php';
$app->make(Illuminate\Contracts\Console\Kernel::class)->bootstrap();

$svc = app(\App\Services\KHQRService::class);
$res = $svc->generateIndividualQR(['amount' => 5.00, 'currency' => 'USD']);
echo $res['qr_string'] . PHP_EOL;
