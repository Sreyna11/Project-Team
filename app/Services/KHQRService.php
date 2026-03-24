<?php

namespace App\Services;

use KHQR\BakongKHQR;
use KHQR\Models\IndividualInfo;
use KHQR\Models\MerchantInfo;
use KHQR\Helpers\KHQRData;

class KHQRService
{
    protected string $token;
    protected string $bakongAccountId;
    protected string $merchantName;
    protected string $merchantCity;

    public function __construct()
    {
        $this->token = env('BAKONG_API_TOKEN', '');
        $this->bakongAccountId = env('BAKONG_ACCOUNT_ID', '');
        $this->merchantName = env('BAKONG_MERCHANT_NAME', 'LearnHub');
        $this->merchantCity = env('BAKONG_MERCHANT_CITY', 'Phnom Penh');
    }

    public function generateIndividualQR(array $data)
    {
        $currency = ($data['currency'] ?? 'USD') === 'KHR' ? KHQRData::CURRENCY_KHR : KHQRData::CURRENCY_USD;
        // Adjust KHR amount format and enforce Bakong minimum threshold of 100 KHR for testing
        $amount = $currency === KHQRData::CURRENCY_KHR ? max(100, round((float) $data['amount'] * 4000)) : (float) $data['amount'];

        $optionalData = [];
        if (!empty($data['amount']) && $data['amount'] > 0) {
            $optionalData['currency'] = $currency;
            $optionalData['amount']   = $amount;
        }

        if (!empty($data['bill_number'])) {
            $optionalData['billNumber'] = $data['bill_number'];
        }

        $individualInfo = IndividualInfo::withOptionalArray(
            $this->bakongAccountId,
            $this->merchantName,
            $this->merchantCity,
            $optionalData
        );

        $response = BakongKHQR::generateIndividual($individualInfo);

        if (!$response || !isset($response->data['qr'])) {
            return ['error' => 'Failed to generate Individual KHQR'];
        }

        return [
            'data' => [
                'qr' => $response->data['qr'],
                'md5' => $response->data['md5']
            ]
        ];
    }

    public function generateMerchantQR(array $data)
    {
        $currency = ($data['currency'] ?? 'USD') === 'KHR' ? KHQRData::CURRENCY_KHR : KHQRData::CURRENCY_USD;
        $amount = $currency === KHQRData::CURRENCY_KHR ? round((float) $data['amount'] * 4000) : (float) $data['amount'];

        $merchantInfo = MerchantInfo::withOptionalArray(
            $this->bakongAccountId,
            $this->merchantName,
            $this->merchantCity,
            env('BAKONG_MERCHANT_ID', 'MERCHANT'),
            env('BAKONG_ACQUIRING_BANK', 'BANK'),
            [
                'currency' => $currency,
                'amount' => $amount,
                'billNumber' => $data['bill_number'] ?? null,
                'storeLabel' => $data['store_label'] ?? null,
                'terminalLabel' => $data['terminal_label'] ?? null,
            ]
        );

        $response = BakongKHQR::generateMerchant($merchantInfo);

        if (!$response || !isset($response->data['qr'])) {
            return ['error' => 'Failed to generate Merchant KHQR'];
        }

        return [
            'data' => [
                'qr' => $response->data['qr'],
                'md5' => $response->data['md5']
            ]
        ];
    }

    public function checkPayment(string $md5)
    {
        $bakongKhqr = new BakongKHQR($this->token);
        return $bakongKhqr->checkTransactionByMD5($md5);
    }
}
