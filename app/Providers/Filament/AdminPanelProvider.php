<?php

namespace App\Providers\Filament;

use Filament\Http\Middleware\Authenticate;
use Filament\Http\Middleware\AuthenticateSession;
use Filament\Http\Middleware\DisableBladeIconComponents;
use Filament\Http\Middleware\DispatchServingFilamentEvent;
use Filament\Pages;
use Filament\Panel;
use Filament\PanelProvider;
use Filament\Support\Colors\Color;
use Filament\Widgets;
use BezhanSalleh\FilamentShield\FilamentShieldPlugin;
use Illuminate\Cookie\Middleware\AddQueuedCookiesToResponse;
use Illuminate\Cookie\Middleware\EncryptCookies;
use Illuminate\Foundation\Http\Middleware\VerifyCsrfToken;
use Illuminate\Routing\Middleware\SubstituteBindings;
use Illuminate\Session\Middleware\StartSession;
use Illuminate\View\Middleware\ShareErrorsFromSession;
use Leandrocfe\FilamentApexCharts\FilamentApexChartsPlugin;

class AdminPanelProvider extends PanelProvider
{
    public function panel(Panel $panel): Panel
    {
        return $panel
            ->default()
            ->id('admin')
            ->path('admin')
            ->login()

            // ── Brand ──────────────────────────────
            ->brandName('LearnHub')
            ->favicon(asset('favicon.ico'))

            // ── Colors ─────────────────────────────
            ->colors([
                'primary' => Color::Violet,
                'gray'    => Color::Slate,
                'info'    => Color::Sky,
                'success' => Color::Emerald,
                'warning' => Color::Amber,
                'danger'  => Color::Rose,
            ])

            // ── Font ───────────────────────────────
            ->font('Inter')
            ->renderHook(
                'panels::head.done',
                fn (): string => \Illuminate\Support\Facades\Blade::render('<link rel="stylesheet" href="{{ asset(\'css/filament/admin/theme.css\') }}">'),
            )

            // ── Sidebar ────────────────────────────
            ->sidebarCollapsibleOnDesktop()
            ->sidebarWidth('260px')
            ->collapsedSidebarWidth('72px')

            // ── Dark mode ──────────────────────────
            ->darkMode(true)

            // ── Global Search ──────────────────────
            ->globalSearch(true)
            ->globalSearchKeyBindings(['ctrl+k'])
            ->globalSearchDebounce('300ms')

            // ── Navigation Groups ──────────────────
            ->navigationGroups([
                \Filament\Navigation\NavigationGroup::make('Content')
                    ->icon('heroicon-o-squares-2x2'),
                \Filament\Navigation\NavigationGroup::make('Support')
                    ->icon('heroicon-o-chat-bubble-left-right'),
                \Filament\Navigation\NavigationGroup::make('Billing')
                    ->icon('heroicon-o-banknotes'),
                \Filament\Navigation\NavigationGroup::make('Settings')
                    ->icon('heroicon-o-cog-6-tooth')
                    ->collapsed(),
                \Filament\Navigation\NavigationGroup::make('Filament Shield')
                    ->icon('heroicon-o-shield-check')
                    ->collapsed(),
            ])

            // ── Plugins ────────────────────────────
            ->plugins([
                FilamentShieldPlugin::make(),
                FilamentApexChartsPlugin::make(),
            ])

            // ── Resources / Pages / Widgets ────────
            ->discoverResources(in: app_path('Filament/Resources'), for: 'App\\Filament\\Resources')
            ->discoverPages(in: app_path('Filament/Pages'), for: 'App\\Filament\\Pages')
            ->pages([
                Pages\Dashboard::class,
            ])
            ->discoverWidgets(in: app_path('Filament/Widgets'), for: 'App\\Filament\\Widgets')
            ->widgets([])

            // ── Middleware ─────────────────────────
            ->middleware([
                EncryptCookies::class,
                AddQueuedCookiesToResponse::class,
                StartSession::class,
                AuthenticateSession::class,
                ShareErrorsFromSession::class,
                VerifyCsrfToken::class,
                SubstituteBindings::class,
                DisableBladeIconComponents::class,
                DispatchServingFilamentEvent::class,
            ])
            ->authMiddleware([
                Authenticate::class,
            ]);
    }
}