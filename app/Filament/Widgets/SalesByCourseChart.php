<?php

namespace App\Filament\Widgets;

use App\Models\CourseItem;
use Leandrocfe\FilamentApexCharts\Widgets\ApexChartWidget;

class SalesByCourseChart extends ApexChartWidget
{
    protected static ?string $chartId      = 'courseSalesChart';
    protected static ?string $heading      = '📚 Sales by Course';
    protected static ?int    $sort         = 4;
    protected int|string|array $columnSpan = 2;

    protected function getOptions(): array
    {
        $courses = CourseItem::withCount(['payments' => function($q) {
            $q->where('status', 'paid');
        }])->orderByDesc('payments_count')->limit(8)->get();

        return [
            'chart' => [
                'type' => 'donut',
                'height' => 380,
                'background' => 'transparent',
                'toolbar' => ['show' => false],
            ],
            'series' => $courses->pluck('payments_count')->map(fn($v) => (int) $v)->toArray(),
            'labels' => $courses->pluck('title')->map(fn($t) => str($t)->limit(30))->toArray(),
            'colors' => ['#7c3aed', '#f59e0b', '#10b981', '#0ea5e9', '#ef4444', '#8b5cf6'],
            'legend' => [
                'show' => true,
                'position' => 'bottom',
                'horizontalAlign' => 'center',
            ],
            'plotOptions' => [
                'pie' => [
                    'donut' => [
                        'size' => '70%',
                        'labels' => [
                            'show' => true,
                            'total' => [
                                'show' => true,
                                'label' => 'Total Sales',
                            ],
                        ],
                    ],
                ],
            ],
            'dataLabels' => [
                'enabled' => true,
            ],
        ];
    }
}