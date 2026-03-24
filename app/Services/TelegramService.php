<?php

namespace App\Services;

use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\Log;

class TelegramService
{
    protected string $botToken;
    protected string $chatId;

    public function __construct()
    {
        $this->botToken = env('TELEGRAM_BOT_TOKEN', '');
        $this->chatId = env('TELEGRAM_CHAT_ID', '');
        
        Log::info('TelegramService initialized', [
            'bot_token_exists' => !empty($this->botToken),
            'chat_id_exists' => !empty($this->chatId),
            'bot_token' => $this->botToken ? substr($this->botToken, 0, 10) . '...' : 'empty',
            'chat_id' => $this->chatId
        ]);
    }

    public function send(string $message): bool
    {
        if (empty($this->botToken) || empty($this->chatId)) {
            Log::warning('Telegram not configured', [
                'token_empty' => empty($this->botToken),
                'chat_id_empty' => empty($this->chatId)
            ]);
            return false;
        }

        try {
            Log::info('Sending Telegram message', [
                'chat_id' => $this->chatId,
                'message_length' => strlen($message)
            ]);

            $response = Http::timeout(10)->post(
                "https://api.telegram.org/bot{$this->botToken}/sendMessage",
                [
                    'chat_id' => $this->chatId,
                    'text'    => $message,
                    'parse_mode' => 'HTML',
                ]
            );

            Log::info('Telegram API response', [
                'status' => $response->status(),
                'successful' => $response->successful(),
                'body' => $response->body()
            ]);

            if (!$response->successful()) {
                Log::error('Telegram API Error: ' . $response->body());
                return false;
            }

            return true;

        } catch (\Exception $e) {
            Log::error('Telegram error: ' . $e->getMessage());
            Log::error('Telegram exception trace: ' . $e->getTraceAsString());
            return false;
        }
    }

    public function sendPaymentNotification(array $data): bool
    {
        Log::info('Preparing payment notification', $data);
        
        // Extract data with fallbacks
        $name = $data['name'] ?? $data['user_name'] ?? $data['student_name'] ?? 'N/A';
        $email = $data['email'] ?? $data['user_email'] ?? $data['student_email'] ?? 'N/A';
        $course = $data['course_title'] ?? $data['course'] ?? $data['course_name'] ?? 'N/A';
        $amount = isset($data['amount']) ? number_format($data['amount'], 2) : '0.00';
        $invoiceId = $data['order_id'] ?? $data['invoice_number'] ?? $data['invoice_id'] ?? $data['transaction_id'] ?? 'N/A';
        $currency = $data['currency'] ?? 'USD';
        
        $message = "
🎉 <b>✅ PAYMENT SUCCESSFUL</b>
<code>━━━━━━━━━━━━━━━━━━━━</code>

<b>👤 Name:</b> {$name}
<b>📧 Email:</b> {$email}
<b>📚 Course:</b> {$course}
<b>💰 Amount:</b> {$currency} {$amount}
<b>🧾 Invoice ID:</b> {$invoiceId}
<b>⏰ Time:</b> " . now()->format('d M Y H:i:s') . "

<code>━━━━━━━━━━━━━━━━━━━━</code>
✅ Payment confirmed successfully";

        Log::info('Telegram message prepared', ['message' => $message]);
        
        return $this->send(trim($message));
    }

    public function sendPurchaseAlert(
        string $userName,
        string $userEmail,
        string $courseTitle,
        float $amount,
        string $invoiceNumber
    ): bool {
        $message = "
🎉 <b>✅ NEW PURCHASE</b>
<code>━━━━━━━━━━━━━━━━━━━━</code>

<b>👤 Name:</b> {$userName}
<b>📧 Email:</b> {$userEmail}
<b>📚 Course:</b> {$courseTitle}
<b>💰 Amount:</b> $" . number_format($amount, 2) . "
<b>🧾 Invoice ID:</b> {$invoiceNumber}
<b>⏰ Time:</b> " . now()->format('d M Y H:i:s') . "

<code>━━━━━━━━━━━━━━━━━━━━</code>
✅ Payment confirmed successfully";

        Log::info('Purchase alert prepared', ['message' => $message]);
        
        return $this->send(trim($message));
    }
}