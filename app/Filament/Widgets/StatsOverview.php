<?php

namespace App\Filament\Widgets;

use App\Models\User;
use App\Models\CourseItem;
use App\Models\FreeDocument;
use App\Models\Payment;
use App\Models\Contact;
use Filament\Widgets\StatsOverviewWidget as BaseWidget;
use Filament\Widgets\StatsOverviewWidget\Stat;

class StatsOverview extends BaseWidget
{
    protected static ?int $sort = 1;
    protected static bool $isLazy = false;
    protected static ?string $pollingInterval = '30s';

    protected function getColumns(): int
    {
        return 3;
    }

    protected function getStats(): array
    {
        $totalRevenue = Payment::where('status', 'paid')->sum('amount');
        $todayRevenue = Payment::where('status', 'paid')
            ->whereDate('paid_at', today())->sum('amount');
        $totalStudents = User::where('role', 'user')->count();
        $newStudents = User::where('role', 'user')
            ->whereDate('created_at', today())->count();
        $totalPayments = Payment::where('status', 'paid')->count();
        $todayPayments = Payment::where('status', 'paid')
            ->whereDate('paid_at', today())->count();
        $totalCourses = CourseItem::where('is_active', true)->count();
        $featuredCourses = CourseItem::where('is_active', true)
            ->where('show_in_header', true)->count();
        $totalDocuments = FreeDocument::count();
        $featuredDocuments = FreeDocument::where('show_in_header', true)->count();
        $totalContacts = Contact::count();

        // Last 7 days chart data
        $revenueChart = [];
        $studentsChart = [];
        $paymentsChart = [];
        $coursesChart = [];
        $docsChart = [];

        for ($i = 6; $i >= 0; $i--) {
            $revenueChart[] = (float) Payment::where('status', 'paid')
                ->whereDate('paid_at', today()->subDays($i))
                ->sum('amount');
            $studentsChart[] = User::where('role', 'user')
                ->whereDate('created_at', today()->subDays($i))
                ->count();
            $paymentsChart[] = Payment::where('status', 'paid')
                ->whereDate('paid_at', today()->subDays($i))
                ->count();
        }

        return [

            // ── Revenue ─────────────────────────────
            Stat::make('💰 Total Revenue', '$' . number_format($totalRevenue, 2))
                ->description('$' . number_format($todayRevenue, 2) . ' earned today')
                ->descriptionIcon('heroicon-m-arrow-trending-up')
                ->chart($revenueChart)
                ->color('success')
                ->extraAttributes([
                    'style' => '
                        border: 2px solid #bbf7d0 !important;
                        border-radius: 16px !important;
                        box-shadow: 0 4px 20px rgba(16,185,129,0.12) !important;
                        transition: all 0.3s ease !important;
                    ',
                    'onmouseover' => "this.style.borderColor='#10b981';this.style.boxShadow='0 8px 28px rgba(16,185,129,0.22)';this.style.transform='translateY(-3px)';",
                    'onmouseout' => "this.style.borderColor='#bbf7d0';this.style.boxShadow='0 4px 20px rgba(16,185,129,0.12)';this.style.transform='translateY(0)';",
                ]),

            // ── Students ────────────────────────────
            Stat::make('👥 Total Students', number_format($totalStudents))
                ->description($newStudents > 0
                    ? $newStudents . ' new today'
                    : 'No new students today')
                ->descriptionIcon($newStudents > 0
                    ? 'heroicon-m-arrow-trending-up'
                    : 'heroicon-m-minus')
                ->chart($studentsChart)
                ->color('primary')
                ->extraAttributes([
                    'style' => '
                        border: 2px solid #ddd6fe !important;
                        border-radius: 16px !important;
                        box-shadow: 0 4px 20px rgba(124,58,237,0.12) !important;
                        transition: all 0.3s ease !important;
                    ',
                    'onmouseover' => "this.style.borderColor='#7c3aed';this.style.boxShadow='0 8px 28px rgba(124,58,237,0.22)';this.style.transform='translateY(-3px)';",
                    'onmouseout' => "this.style.borderColor='#ddd6fe';this.style.boxShadow='0 4px 20px rgba(124,58,237,0.12)';this.style.transform='translateY(0)';",
                ]),

            // ── Purchases ───────────────────────────
            Stat::make('🛒 Total Purchases', number_format($totalPayments))
                ->description($todayPayments > 0
                    ? $todayPayments . ' purchases today'
                    : 'No purchases today')
                ->descriptionIcon($todayPayments > 0
                    ? 'heroicon-m-arrow-trending-up'
                    : 'heroicon-m-minus')
                ->chart($paymentsChart)
                ->color('warning')
                ->extraAttributes([
                    'style' => '
                        border: 2px solid #fde68a !important;
                        border-radius: 16px !important;
                        box-shadow: 0 4px 20px rgba(245,158,11,0.12) !important;
                        transition: all 0.3s ease !important;
                    ',
                    'onmouseover' => "this.style.borderColor='#f59e0b';this.style.boxShadow='0 8px 28px rgba(245,158,11,0.22)';this.style.transform='translateY(-3px)';",
                    'onmouseout' => "this.style.borderColor='#fde68a';this.style.boxShadow='0 4px 20px rgba(245,158,11,0.12)';this.style.transform='translateY(0)';",
                ]),

            // ── Courses ─────────────────────────────
            Stat::make('📚 Active Courses', $totalCourses)
                ->description($featuredCourses . ' featured on home page')
                ->descriptionIcon('heroicon-m-book-open')
                ->color('info')
                ->extraAttributes([
                    'style' => '
                        border: 2px solid #bae6fd !important;
                        border-radius: 16px !important;
                        box-shadow: 0 4px 20px rgba(14,165,233,0.12) !important;
                        transition: all 0.3s ease !important;
                    ',
                    'onmouseover' => "this.style.borderColor='#0ea5e9';this.style.boxShadow='0 8px 28px rgba(14,165,233,0.22)';this.style.transform='translateY(-3px)';",
                    'onmouseout' => "this.style.borderColor='#bae6fd';this.style.boxShadow='0 4px 20px rgba(14,165,233,0.12)';this.style.transform='translateY(0)';",
                ]),

            // ── Documents ───────────────────────────
            Stat::make('📄 Free Documents', $totalDocuments)
                ->description($featuredDocuments . ' featured on home page')
                ->descriptionIcon('heroicon-m-document-text')
                ->color('success')
                ->extraAttributes([
                    'style' => '
        border: 2px solid #fbcfe8 !important;
        border-radius: 16px !important;
        box-shadow: 0 4px 20px rgba(236,72,153,0.12) !important;
        transition: all 0.3s ease !important;
    ',
                    'onmouseover' => "this.style.borderColor='#ec4899';this.style.boxShadow='0 8px 28px rgba(236,72,153,0.22)';this.style.transform='translateY(-3px)';",
                    'onmouseout' => "this.style.borderColor='#fbcfe8';this.style.boxShadow='0 4px 20px rgba(236,72,153,0.12)';this.style.transform='translateY(0)';",
                ]),

            // ── Contacts ────────────────────────────
            Stat::make('✉️ Total Contacts', $totalContacts)
                ->description('Messages received')
                ->descriptionIcon('heroicon-m-envelope')
                ->color('danger')
                ->extraAttributes([
                    'style' => '
                        border: 2px solid #fecaca !important;
                        border-radius: 16px !important;
                        box-shadow: 0 4px 20px rgba(239,68,68,0.12) !important;
                        transition: all 0.3s ease !important;
                    ',
                    'onmouseover' => "this.style.borderColor='#ef4444';this.style.boxShadow='0 8px 28px rgba(239,68,68,0.22)';this.style.transform='translateY(-3px)';",
                    'onmouseout' => "this.style.borderColor='#fecaca';this.style.boxShadow='0 4px 20px rgba(239,68,68,0.12)';this.style.transform='translateY(0)';",
                ]),
        ];
    }
}