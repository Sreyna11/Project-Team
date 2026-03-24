<?php

namespace App\Services;

use KHQR\BakongKHQR;
use KHQR\Models\IndividualInfo;
use KHQR\Helpers\KHQRData;

class BakongService
{
    protected string $token;
    protected string $bakongAccountId;
    protected string $merchantName;
    protected string $merchantCity;

    public function __construct()
    {
        $this->token = config('services.bakong.token');
        $this->bakongAccountId = config('services.bakong.account_id');
        $this->merchantName = config('services.bakong.merchant_name', 'My Store');
        $this->merchantCity = config('services.bakong.merchant_city', 'PHNOM PENH');
    }

    /**
     * Generate a KHQR for an individual payment.
     *
     * @param float $amount
     * @param string $currency (USD or KHR)
     * @param string|null $billNumber  Bill/invoice number for tracking
     * @return \KHQR\Models\KHQRResponse
     */
    public function generateQr(float $amount, string $currency = 'USD', ?string $billNumber = null)
    {
        $individualInfo = new IndividualInfo(
            bakongAccountID: $this->bakongAccountId,
            merchantName: $this->merchantName,
            merchantCity: $this->merchantCity,
            currency: $currency === 'KHR' ? KHQRData::CURRENCY_KHR : KHQRData::CURRENCY_USD,
            amount: $amount,
            billNumber: $billNumber,
            mobileNumber: config('services.bakong.phone')
        );

        return BakongKHQR::generateIndividual($individualInfo);
    }

    /**
     * Check transaction status by MD5.
     *
     * @param string $md5
     * @return object
     */
    public function checkTransaction(string $md5): array
    {
        $bakongKhqr = new BakongKHQR($this->token);
        return $bakongKhqr->checkTransactionByMD5($md5);
    }
}
