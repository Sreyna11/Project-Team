<?php

namespace App\Filament\Widgets;

use App\Models\User;
use Illuminate\Support\Carbon;
use Leandrocfe\FilamentApexCharts\Widgets\ApexChartWidget;

class StudentChart extends ApexChartWidget
{
    protected static ?string $chartId      = 'studentsChart';
    protected static ?string $heading      = 'Total customers';
    protected static ?int    $sort         = 3;
    protected int|string|array $columnSpan = 1;

    protected function getOptions(): array
    {
        $months   = [];
        $students = [];
        $running  = 0;

        // Get total students before this period
        $startCount = User::where('role', 'user')
            ->where('created_at', '<', Carbon::now()->subMonths(11)->startOfMonth())
            ->count();

        $running = $startCount;

        for ($i = 11; $i >= 0; $i--) {
            $date      = Carbon::now()->subMonths($i);
            $months[]  = $date->format('M');
            $newCount  = User::where('role', 'user')
                ->whereBetween('created_at', [$date->copy()->startOfMonth(), $date->copy()->endOfMonth()])
                ->count();
            $running  += $newCount;
            $students[] = $running;
        }

        return [
            'chart' => [
                'type'       => 'line',
                'height'     => 300,
                'toolbar'    => ['show' => false],
                'background' => 'transparent',
                'animations' => ['enabled' => true, 'speed' => 800],
                'dropShadow' => [
                    'enabled' => true,
                    'blur'    => 4,
                    'opacity' => 0.2,
                    'color'   => '#f97316',
                ],
            ],
            'series' => [[
                'name' => 'Total Students',
                'data' => $students,
            ]],
            'xaxis' => [
                'categories' => $months,
                'labels'     => [
                    'style' => [
                        'fontFamily' => 'inherit',
                        'fontSize'   => '12px',
                    ],
                ],
                'axisBorder' => ['show' => false],
                'axisTicks'  => ['show' => false],
            ],
            'yaxis' => [
                'labels' => [
                    'style'     => ['fontFamily' => 'inherit'],
                ],
            ],
            'colors' => ['#f97316'],
            'stroke' => [
                'curve' => 'smooth',
                'width' => 3,
            ],
            'markers' => [
                'size'         => 5,
                'colors'       => ['#f97316'],
                'strokeColors' => '#fff',
                'strokeWidth'  => 2,
                'hover'        => ['size' => 8],
            ],
            'dataLabels' => ['enabled' => false],
            'grid'       => [
                'borderColor'     => 'rgba(255,255,255,0.1)',
                'strokeDashArray' => 4,
                'xaxis'           => ['lines' => ['show' => false]],
            ],
            'tooltip' => ['theme' => 'dark'],
        ];
    }
}