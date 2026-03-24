<?php

namespace App\Filament\Resources;

use App\Filament\Resources\EventResource\Pages;
use App\Filament\Resources\EventResource\RelationManagers;
use App\Models\Event;
use Filament\Forms;
use Filament\Forms\Form;
use Filament\Resources\Resource;
use Filament\Tables;
use Filament\Tables\Table;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\SoftDeletingScope;

class EventResource extends Resource
{
    protected static ?string $model = Event::class;

    protected static ?string $navigationIcon = 'heroicon-o-calendar';
    protected static ?string $navigationGroup = 'Marketing';

    public static function getNavigationIconColor(): ?string
    {
        return 'warning';
    }
    protected static ?int $navigationSort = 1;

    public static function form(Form $form): Form
    {
        return $form->schema([
            Forms\Components\Section::make('Event Details')
                ->description('Provide the base information for the event.')
                ->icon('heroicon-o-calendar')
                ->schema([
                    Forms\Components\TextInput::make('name')
                        ->label('Event Name')
                        ->required()
                        ->maxLength(200)
                        ->prefixIcon('heroicon-o-information-circle')
                        ->columnSpanFull(),

                    Forms\Components\Grid::make(2)
                        ->schema([
                            Forms\Components\DatePicker::make('start_date')
                                ->label('Start Date')
                                ->required()
                                ->prefixIcon('heroicon-o-calendar-days'),

                            Forms\Components\DatePicker::make('end_date')
                                ->label('End Date')
                                ->required()
                                ->after('start_date')
                                ->prefixIcon('heroicon-o-calendar-days'),
                        ]),
                ]),
        ]);
    }

    public static function table(Table $table): Table
    {
        return $table
            ->columns([
                Tables\Columns\TextColumn::make('event_id')
                    ->label('ID')
                    ->sortable(),

                Tables\Columns\TextColumn::make('name')
                    ->label('Event Name')
                    ->searchable()
                    ->sortable()
                    ->weight('bold'),

                Tables\Columns\TextColumn::make('start_date')
                    ->label('Start')
                    ->date('M d, Y')
                    ->sortable()
                    ->icon('heroicon-o-calendar'),

                Tables\Columns\TextColumn::make('end_date')
                    ->label('End')
                    ->date('M d, Y')
                    ->sortable()
                    ->icon('heroicon-o-calendar'),
                
                Tables\Columns\TextColumn::make('promotions_count')
                    ->counts('promotions')
                    ->label('Promotions')
                    ->badge()
                    ->color('info'),
            ])
            ->filters([
                Tables\Filters\Filter::make('active')
                    ->query(fn (Builder $query): Builder => $query->where('end_date', '>=', now())),
            ])
            ->actions([
                Tables\Actions\ViewAction::make(),
                Tables\Actions\EditAction::make(),
                Tables\Actions\DeleteAction::make(),
            ])
            ->bulkActions([
                Tables\Actions\BulkActionGroup::make([
                    Tables\Actions\DeleteBulkAction::make(),
                ]),
            ]);
    }
    public static function getRelations(): array
    {
        return [
            //
        ];
    }

    public static function getPages(): array
    {
        return [
            'index' => Pages\ListEvents::route('/'),
            'create' => Pages\CreateEvent::route('/create'),
            'edit' => Pages\EditEvent::route('/{record}/edit'),
        ];
    }
}
