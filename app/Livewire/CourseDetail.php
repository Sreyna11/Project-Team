<?php

namespace App\Livewire;

use App\Models\CourseItem;
use App\Models\Payment;
use App\Services\KHQRService;
use App\Services\TelegramService;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Str;
use Livewire\Component;
use SimpleSoftwareIO\QrCode\Facades\QrCode;

class CourseDetail extends Component
{
    public CourseItem $course;

    public bool $isOwned = false;
    public bool $showKhqrModal = false;
    public bool $showLoginModal = false;

    // Login logic
    public string $email = '';
    public string $password = '';
    public bool $remember = false;

    public array $khqrData = [];
    public string $khqrStatus = 'pending';
    public array $expandedSections = [0]; // default expand first module

    public float $finalPrice = 0;
    public float $originalPrice = 0;
    public bool $hasDiscount = false;

    public function mount(CourseItem $course)
    {
        $this->course = $course->load(['videoModules','category','activePromotion']);

        $user = Auth::user();
        $this->isOwned = $user && (
            $user->role === 'admin' || 
            $user->hasRole('super_admin') ||
            Payment::where('user_id', $user->id)
                ->where('course_item_id', $this->course->courseItem_id)
                ->where('status', 'paid')
                ->exists()
        );

        // Calculate prices
        $this->originalPrice = (float) $this->course->price;
        $this->finalPrice    = (float) $this->course->final_price;
        $this->hasDiscount   = $this->finalPrice < $this->originalPrice;
    }

    public function purchaseCourse(KHQRService $khqrService)
    {
        try {
            if (!Auth::check()) {
                $this->showLoginModal = true;
                return;
            }
            if ($this->isOwned) return;

            // Cleanup any previous unpaid attempts for this user/course to avoid duplicates
            Payment::where('user_id', Auth::id())
                ->where('course_item_id', $this->course->courseItem_id)
                ->where('status', 'unpaid')
                ->delete();

            $transactionId = 'LH' . strtoupper(Str::random(8));

            $result = $khqrService->generateIndividualQR([
                'amount' => $this->finalPrice,
                'currency' => 'USD',
                'bill_number' => $transactionId,
            ]);

            if (isset($result['error']) || empty($result['data']['qr'])) {
                session()->flash('error', 'QR generation failed: ' . ($result['error'] ?? 'Unknown error'));
                return;
            }

            $qrString = $result['data']['qr'];
            $md5 = $result['data']['md5'];

            // Generate SVG QR
            $qrSvg = QrCode::format('svg')
                ->size(300)
                ->errorCorrection('M')
                ->generate($qrString);

            $qrImage = 'data:image/svg+xml;base64,' . base64_encode($qrSvg);

            // Calculate prices
            $this->finalPrice = (float) $this->course->final_price;
            $this->originalPrice = (float) $this->course->price;
            $this->hasDiscount = $this->finalPrice < $this->originalPrice;

            // Save payment record
            Payment::create([
                'user_id' => Auth::id(),
                'course_item_id' => $this->course->courseItem_id,
                'promotion_id' => $this->course->activePromotion?->promotion_id,
                'amount' => $this->finalPrice,
                'invoice_number' => $transactionId,
                'md5' => $md5,
                'status' => 'unpaid',
            ]);

            $this->khqrData = [
                'qr_image' => $qrImage,
                'amount'   => $this->finalPrice,
                'md5'      => $md5,
                'course_title' => $this->course->title,
            ];

            $this->khqrStatus = 'pending';
            $this->showKhqrModal = true;

        } catch (\Throwable $e) {
            Log::error('purchaseCourse error: '.$e->getMessage(), ['trace' => $e->getTraceAsString()]);
            session()->flash('error', 'Something went wrong. Please try again.');
        }
    }

    public function checkPaymentStatus()
    {
        if (!$this->showKhqrModal || empty($this->khqrData['md5'])) {
            return;
        }

        $this->verifyPayment();
    }

    public function manualCheckPayment()
    {
        Log::info('Manual payment check triggered');
        $this->verifyPayment();
        
        if ($this->khqrStatus === 'paid') {
            session()->flash('success', 'Payment verified successfully!');
        } else {
            session()->flash('error', 'Payment not found yet. Please try again in a moment.');
        }
    }

    protected function verifyPayment()
    {
        $khqrService = app(KHQRService::class);
        $telegram = app(TelegramService::class);

        try {
            $md5 = $this->khqrData['md5'];

            $payment = Payment::where('md5', $md5)
                ->where('status', 'unpaid')
                ->first();

            if (!$payment) return;

            $result = $khqrService->checkPayment($md5);

            // Detailed logging for debugging
            Log::info('Bakong Verification', [
                'md5' => $md5,
                'result' => $result
            ]);

            $responseCode = data_get($result, 'responseCode');
            $status = data_get($result, 'status');

            // Success if responseCode is 0 OR status is SUCCESS
            $isPaid = ($responseCode !== null && $responseCode == 0) || ($status === 'SUCCESS');

            if ($isPaid) {
                $payment->update([
                    'status' => 'paid',
                    'paid_at' => now(),
                ]);

                $this->khqrStatus = 'paid';
                $this->isOwned = true;
                $this->course->refresh();

                // Notify Telegram
                try {
                    $telegram->sendPurchaseAlert(
                        Auth::user()->name,
                        Auth::user()->email,
                        $this->course->title,
                        (float) $payment->amount,
                        $payment->invoice_number
                    );
                } catch (\Exception $e) {
                    Log::error('Telegram notification failed: ' . $e->getMessage());
                }

                $this->dispatch('payment-confirmed');

                Log::info('KHQR PAYMENT SUCCESS CONFIRMED', [
                    'user_id' => Auth::id(),
                    'course' => $this->course->courseItem_id,
                    'invoice' => $payment->invoice_number
                ]);
            }
        } catch (\Throwable $e) {
            Log::error('verifyPayment error: ' . $e->getMessage(), [
                'trace' => $e->getTraceAsString()
            ]);
        }
    }

    public function toggleSection($index)
    {
        if (in_array($index, $this->expandedSections)) {
            $this->expandedSections = array_diff($this->expandedSections, [$index]);
        } else {
            $this->expandedSections[] = $index;
        }
    }

    public function closeKhqrModal()
    {
        $this->showKhqrModal = false;
        $this->khqrData = [];
        $this->khqrStatus = 'pending';

        $user = Auth::user();
        $this->isOwned = $user && (
            $user->role === 'admin' || 
            $user->hasRole('super_admin') ||
            Payment::where('user_id', $user->id)
                ->where('course_item_id', $this->course->courseItem_id)
                ->where('status', 'paid')
                ->exists()
        );
    }

    public function attemptLogin()
    {
        $this->validate([
            'email' => 'required|email',
            'password' => 'required',
        ]);

        if (Auth::attempt(['email' => $this->email, 'password' => $this->password], $this->remember)) {
            session()->regenerate();
            $this->showLoginModal = false;
            $this->mount($this->course); // refresh state
            return;
        }

        $this->addError('email', 'Invalid credentials.');
    }

    public function toggleLoginModal()
    {
        $this->showLoginModal = !$this->showLoginModal;
    }

    public function render()
    {
        Log::info('CourseDetail rendering', ['id' => $this->course->id ?? 'N/A']);
        return view('livewire.course-detail', [
            'finalPrice' => $this->finalPrice,
            'originalPrice' => $this->originalPrice,
            'hasDiscount' => $this->hasDiscount,
        ])->layout('layouts.app', ['title' => $this->course->title]);
    }
}