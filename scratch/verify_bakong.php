<?php
require 'vendor/autoload.php';

use KHQR\BakongKHQR;

// Initialize with a dummy token or use your real one if needed for verification
$token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHAiOjM4NDI3NDMxNDYsImlhdCI6MTY3NzgxMDExMiwiaXNzIjoiS0hRUiJ9.Szhf6L5_7Y_D6_B5_2_N_V_6_Y_E_9_C_N_A_R_M'; // Example static token

try {
    $accountId = 'aok_sreyna@bkrt';
    echo "Checking Bakong Account: $accountId...\n";
    
    // Most versions of the library allow checking account existence
    // We use the static check method from the library
    $result = BakongKHQR::checkBakongAccount($accountId);
    
    echo "Response: " . json_encode($result) . "\n";
    
    if (isset($result->data['exist']) && $result->data['exist'] === true) {
        echo "✅ SUCCESS: Account exists and is valid for KHQR.\n";
    } else {
        echo "❌ FAILED: Account does not exist or is invalid according to Bakong.\n";
        echo "Please check your .env file and make sure the ID matches exactly what is in your Bakong App.\n";
    }
} catch (\Exception $e) {
    echo "Error during verification: " . $e->getMessage() . "\n";
}
