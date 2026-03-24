<?php

require __DIR__.'/vendor/autoload.php';

$app = require_once __DIR__.'/bootstrap/app.php';
$app->make(Illuminate\Contracts\Console\Kernel::class)->bootstrap();

try {
    $service = new \App\Services\TelegramService();
    $service->sendPaymentNotification([
        'order_id' => 'LHDEMO82',
        'amount'   => 50.00,
        'currency' => 'USD',
        'status'   => 'success'
    ]);
    echo "Done.\n";
} catch (\Exception $e) {
    echo "Error: " . $e->getMessage() . "\n";
}
