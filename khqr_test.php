<?php
require __DIR__.'/vendor/autoload.php';

use KHQR\BakongKHQR;

$dotenv = Dotenv\Dotenv::createImmutable(__DIR__);
$dotenv->load();

$account = $_ENV['BAKONG_ACCOUNT_ID'] ?? 'aok_sreyna@bkrt';

try {
    echo "Checking Account: $account\n";
    // Usually Bakong check requires internet. $isTest = false
    $response = BakongKHQR::checkBakongAccount($account, false);
    echo "Check Status: " . print_r($response->status, true) . "\n";
    echo "Check Data: " . print_r($response->data, true) . "\n";

} catch (\Exception $e) {
    echo "Exception: " . $e->getMessage() . "\n";
}
