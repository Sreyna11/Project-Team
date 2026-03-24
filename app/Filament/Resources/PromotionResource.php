<?php

namespace App\Filament\Resources;

use App\Filament\Resources\PromotionResource\Pages;
use App\Filament\Resources\PromotionResource\RelationManagers;
use App\Models\Promotion;
use Filament\Forms;
use Filament\Forms\Form;
use Filament\Resources\Resource;
use Filament\Tables;
use Filament\Tables\Table;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\SoftDeletingScope;

class PromotionResource extends Resource
{
    protected static ?string $model = Promotion::class;

    protected static ?string $navigationIcon = 'heroicon-o-ticket';
    protected static ?string $navigationGroup = 'Marketing';

    public static function getNavigationIconColor(): ?string
    {
        return 'danger';
    }

    public static function form(Form $form): Form
    {
        return $form->schema([
            Forms\Components\Section::make('Promotion Details')
                ->description('Configure the promotion settings.')
                ->icon('heroicon-o-ticket')
                ->schema([
                    Forms\Components\Grid::make(2)
                        ->schema([
                            Forms\Components\Select::make('event_id')
                                ->label('Linked Event')
                                ->relationship('event', 'name')
                                ->searchable()
                                ->preload()
                                ->prefixIcon('heroicon-o-calendar')
                                ->live()
                                ->afterStateUpdated(function ($state, Forms\Set $set) {
                                    if ($state) {
                                        $event = \App\Models\Event::find($state);
                                        if ($event) {
                                            $set('start_date', $event->start_date);
                                            $set('end_date', $event->end_date);
                                        }
                                    }
                                }),

                            Forms\Components\Select::make('course_item_id')
                                ->label('Linked Course')
                                ->relationship('course', 'title')
                                ->required()
                                ->searchable()
                                ->preload()
                                ->prefixIcon('heroicon-o-book-open'),
                        ]),

                    Forms\Components\TextInput::make('promotion_name')
                        ->label('Promotion Name')
                        ->required()
                        ->maxLength(150)
                        ->prefixIcon('heroicon-o-tag')
                        ->columnSpanFull(),

                    Forms\Components\Grid::make(2)
                        ->schema([
                            Forms\Components\Select::make('promotion_type')
                                ->label('Discount Type')
                                ->options([
                                    'percent' => 'Percent (%) off',
                                    'amount' => 'Amount ($) off',
                                ])
                                ->required()
                                ->prefixIcon('heroicon-o-variable'),

                            Forms\Components\TextInput::make('discount_value')
                                ->label('Discount Value')
                                ->numeric()
                                ->required()
                                ->minValue(0)
                                ->prefixIcon('heroicon-o-banknotes'),
                        ]),

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
                Tables\Columns\TextColumn::make('promotion_name')
                    ->label('Promotion')
                    ->searchable()
                    ->sortable()
                    ->weight('bold'),
                
                Tables\Columns\TextColumn::make('event.name')
                    ->label('Event')
                    ->badge()
                    ->color('info')
                    ->sortable(),

                Tables\Columns\TextColumn::make('course.title')
                    ->label('Course')
                    ->limit(30)
                    ->sortable(),

                Tables\Columns\TextColumn::make('promotion_type')
                    ->label('Type')
                    ->badge()
                    ->formatStateUsing(fn (string $state): string => ucfirst($state))
                    ->color(fn (string $state): string => match ($state) {
                        'percent' => 'success',
                        'amount' => 'warning',
                        default => 'gray',
                    }),

                Tables\Columns\TextColumn::make('discount_value')
                    ->label('Discount')
                    ->money('USD') // or whatever currency is appropriate
                    ->sortable(),

                Tables\Columns\TextColumn::make('start_date')
                    ->label('Duration')
                    ->description(fn ($record) => $record->start_date . ' to ' . $record->end_date)
                    ->date('M d, Y')
                    ->sortable(),
            ])
            ->filters([
                Tables\Filters\SelectFilter::make('event')
                    ->relationship('event', 'name'),
                Tables\Filters\SelectFilter::make('course')
                    ->relationship('course', 'title'),
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
            'index' => Pages\ListPromotions::route('/'),
            'create' => Pages\CreatePromotion::route('/create'),
            'edit' => Pages\EditPromotion::route('/{record}/edit'),
        ];
    }
}
