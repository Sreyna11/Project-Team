<?php
require 'vendor/autoload.php';
$app = require_once 'bootstrap/app.php';
$app->make(Illuminate\Contracts\Console\Kernel::class)->bootstrap();

use KHQR\BakongKHQR;

$res = BakongKHQR::checkBakongAccount('aok_sreyna@bkrt');
echo "Checking 'aok_sreyna@bkrt':\n";
print_r($res);
