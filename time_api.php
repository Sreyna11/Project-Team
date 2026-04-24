<?php
$ch = curl_init('https://timeapi.io/api/Time/current/zone?timeZone=UTC');
curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
// timeapi io expects User-Agent
curl_setopt($ch, CURLOPT_USERAGENT, 'Mozilla/5.0');
$json = curl_exec($ch);
curl_close($ch);

$data = json_decode($json, true);
$timestamp = strtotime($data['dateTime']);
echo "Real Time: " . $timestamp . " (" . $data['dateTime'] . ")\n";
