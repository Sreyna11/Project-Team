<?php

namespace App\Filament\Widgets;

use App\Models\Payment;
use Illuminate\Support\Carbon;
use Leandrocfe\FilamentApexCharts\Widgets\ApexChartWidget;
use Illuminate\Support\Facades\DB;

class MonthlyRevenueChart extends ApexChartWidget
{
    protected static ?string $chartId = 'revenueChart';
    protected static ?string $heading = 'Revenue per month';
    protected static ?int $sort = 2;
    protected int|string|array $columnSpan = 1;

    protected function getOptions(): array
    {
        $months = [];
        $revenue = [];

        for ($i = 11; $i >= 0; $i--) {
            $date = Carbon::now()->subMonths($i);
            $months[] = $date->format('M');
            $revenue[] = (float) Payment::where('status', 'paid')
                ->whereBetween('paid_at', [$date->copy()->startOfMonth(), $date->copy()->endOfMonth()])
                ->sum('amount');
        }

        return [
            'chart' => [
                'type' => 'bar',
                'height' => 300,
                'toolbar' => ['show' => false],
                'background' => 'transparent',
                'animations' => ['enabled' => true, 'speed' => 800],
                'fontFamily' => 'Inter, sans-serif',
                'dropShadow' => [
                    'enabled' => true,
                    'top' => 4,
                    'left' => 0,
                    'blur' => 6,
                    'opacity' => 0.15,
                    'color' => '#f59e0b',
                ],
            ],
            'series' => [
                [
                    'name' => 'Revenue ($)',
                    'data' => $revenue,
                ]
            ],
            'xaxis' => [
                'categories' => $months,
                'labels' => [
                    'style' => [
                        'fontFamily' => 'inherit',
                        'fontSize' => '12px',
                    ],
                ],
                'axisBorder' => ['show' => false],
                'axisTicks' => ['show' => false],
            ],
            'yaxis' => [
                'labels' => [
                    'style' => ['fontFamily' => 'inherit'],
                ],
            ],

            'colors' => ['#f59e0b'],
            'plotOptions' => [
                'bar' => [
                    'borderRadius' => 4,
                    'columnWidth' => '60%',
                ],
            ],
            'fill' => [
                'type' => 'gradient',
                'gradient' => [
                    'shade' => 'dark',
                    'type' => 'vertical',
                    'opacityFrom' => 1,
                    'opacityTo' => 0.7,
                ],
            ],
            'annotations' => [
                'yaxis' => [
                    [
                        'y' => collect($revenue)->avg(),
                        'borderColor' => '#ef4444',
                        'strokeDashArray' => 4,
                        'label' => [
                            'text' => 'Avg: $' . number_format(collect($revenue)->avg(), 0),
                            'style' => ['color' => '#fff', 'background' => '#ef4444'],
                        ],
                    ]
                ],
            ],
            'dataLabels' => ['enabled' => false],
            'grid' => [
                'borderColor' => 'rgba(255,255,255,0.1)',
                'strokeDashArray' => 4,
                'xaxis' => ['lines' => ['show' => false]],
            ],
            'tooltip' => [
                'theme' => 'light',
            ],
        ];
    }
}
