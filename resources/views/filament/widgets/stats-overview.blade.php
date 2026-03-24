<x-filament-widgets::stats-overview-widget-cmp>
    <div class="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
        @foreach ($this->getStats() as $stat)
            <div style="
                background: white;
                border-radius: 16px;
                padding: 20px;
                border: 2px solid #ede9fe;
                box-shadow: 0 4px 20px rgba(124,58,237,0.08);
                transition: all 0.3s ease;
                position: relative;
                overflow: hidden;
            "
            onmouseover="this.style.transform='translateY(-4px)';this.style.boxShadow='0 8px 30px rgba(124,58,237,0.15)';this.style.borderColor='#7c3aed';"
            onmouseout="this.style.transform='translateY(0)';this.style.boxShadow='0 4px 20px rgba(124,58,237,0.08)';this.style.borderColor='#ede9fe';">
                <div class="space-y-2">
                    <p class="text-sm font-medium text-gray-500 uppercase tracking-wider">
                        {{ $stat->getLabel() }}
                    </p>
                    <h3 class="text-2xl font-bold text-gray-900">
                        {{ $stat->getValue() }}
                    </h3>
                    @if ($description = $stat->getDescription())
                        <div @class([
                            'flex items-center gap-1 text-sm font-semibold',
                            match($stat->getColor()) {
                                'success' => 'text-emerald-600',
                                'danger' => 'text-rose-600',
                                'warning' => 'text-amber-600',
                                'info' => 'text-sky-600',
                                default => 'text-violet-600',
                            }
                        ])>
                            @if ($icon = $stat->getDescriptionIcon())
                                <x-filament::icon :icon="$icon" class="h-4 w-4" />
                            @endif
                            <span>{{ $description }}</span>
                        </div>
                    @endif
                </div>
            </div>
        @endforeach
    </div>
</x-filament-widgets::stats-overview-widget-cmp>