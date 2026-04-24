<?php

require 'vendor/autoload.php';

use KHQR\BakongKHQR;

$qr = "00020101021129190015aok_sreyna@bkrt52045999530384054041.505802KH5908LearnHub6010Phnom Penh6304E377";

$decode = BakongKHQR::decode($qr);
print_r($decode);

$verify = BakongKHQR::verify($qr);
print_r($verify);
