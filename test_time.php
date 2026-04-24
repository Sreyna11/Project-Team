<?php
$json = file_get_contents('http://worldtimeapi.org/api/timezone/Etc/UTC');
$data = json_decode($json, true);
$real_unix = $data['unixtime'];
echo "Real Time: " . $real_unix . "\n";
echo "Local Time: " . time() . "\n";
