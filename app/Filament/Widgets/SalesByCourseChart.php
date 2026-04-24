<?php

namespace App\Filament\Widgets;

use App\Models\CourseItem;
use Leandrocfe\FilamentApexCharts\Widgets\ApexChartWidget;

class SalesByCourseChart extends ApexChartWidget
{
    protected static ?string $chartId = 'salesByCourse';
    protected static ?string $heading = '📊 Course Sales';
    protected static ?int $sort = 4;
    protected int|string|array $columnSpan = 2;

    protected function getOptions(): array
    {
        $courses = CourseItem::withCount('payments')
            ->orderByDesc('payments_count')
            ->limit(6)
            ->get();

        $data = $courses->pluck('payments_count')->map(fn($v) => (int) $v)->toArray();

        $labels = $courses->pluck('title')
            ->map(fn($t) => str($t)->limit(30))
            ->toArray();

        // ✅ prevent empty chart
        if (empty($data) || array_sum($data) === 0) {
            $data = [1];
            $labels = ['No Sales Data'];
        }

        return [
            'chart' => [
                'type' => 'bar',
                'height' => 380,
                'toolbar' => ['show' => false],
            ],

            'series' => [
                [
                    'name' => 'Sales',
                    'data' => $data,
                ]
            ],

            'xaxis' => [
                'categories' => $labels,
            ],
            'plotOptions' => [
                'bar' => [
                    'horizontal' => true,
                    'borderRadius' => 8,
                    'distributed' => true,
                ],
            ],

            'colors' => [
                '#6366f1',
                '#22c55e',
                '#f59e0b',
                '#ef4444',
                '#3b82f6',
                '#e988d6ff',
            ],

            'dataLabels' => [
                'enabled' => true,
            ],
        ];
    }
}