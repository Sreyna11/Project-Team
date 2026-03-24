<?php

namespace App\Filament\Resources\CourseItemResource\RelationManagers;

use Filament\Forms;
use Filament\Forms\Form;
use Filament\Resources\RelationManagers\RelationManager;
use Filament\Tables;
use Filament\Tables\Table;

class VideoModulesRelationManager extends RelationManager
{
    protected static string $relationship = 'videoModules';

    protected static ?string $recordTitleAttribute = 'title';

    public function form(Form $form): Form
    {
        return $form
            ->schema([
                Forms\Components\TextInput::make('title')
                    ->required()
                    ->maxLength(200)
                    ->prefixIcon('heroicon-o-information-circle')
                    ->columnSpanFull(),

                Forms\Components\Textarea::make('description')
                    ->rows(3)
                    ->nullable()
                    ->columnSpanFull(),

                Forms\Components\Grid::make(2)
                    ->schema([
                        Forms\Components\TextInput::make('video_url')
                            ->label('YouTube Video URL')
                            ->url()
                            ->nullable()
                            ->placeholder('https://www.youtube.com/watch?v=...')
                            ->prefixIcon('heroicon-o-link'),

                        Forms\Components\TextInput::make('duration')
                            ->label('Duration')
                            ->nullable()
                            ->placeholder('e.g. 10 min, 1h 30min')
                            ->prefixIcon('heroicon-o-clock'),
                    ]),

                Forms\Components\Grid::make(3)
                    ->schema([
                        Forms\Components\TextInput::make('order_num')
                            ->label('Order')
                            ->numeric()
                            ->default(1)
                            ->required()
                            ->prefixIcon('heroicon-o-list-bullet'),

                        Forms\Components\Toggle::make('is_free')
                            ->label('Free Preview')
                            ->onIcon('heroicon-m-check')
                            ->offIcon('heroicon-m-x-mark')
                            ->default(false),

                        Forms\Components\Toggle::make('is_active')
                            ->label('Status')
                            ->helperText('Visible to users')
                            ->onIcon('heroicon-m-check')
                            ->offIcon('heroicon-m-x-mark')
                            ->default(true),
                    ]),
            ]);
    }

    public function table(Table $table): Table
    {
        return $table
            ->columns([
                Tables\Columns\TextColumn::make('order_num')
                    ->label('#')
                    ->sortable()
                    ->width('50px'),

                Tables\Columns\TextColumn::make('title')
                    ->label('Module Title')
                    ->searchable()
                    ->sortable()
                    ->weight('bold'),

                Tables\Columns\TextColumn::make('duration')
                    ->label('Duration')
                    ->icon('heroicon-o-clock'),

                Tables\Columns\IconColumn::make('is_free')
                    ->label('Free')
                    ->boolean(),

                Tables\Columns\IconColumn::make('is_active')
                    ->label('Active')
                    ->boolean(),
            ])
            ->filters([
                //
            ])
            ->headerActions([
                Tables\Actions\CreateAction::make()
                    ->label('Add Video Module')
                    ->icon('heroicon-o-plus'),
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
            ])
            ->defaultSort('order_num', 'asc');
    }
}
