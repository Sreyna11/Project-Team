<?php

namespace App\Filament\Resources;

use App\Filament\Resources\VideoCourseItemResource\Pages;
use App\Models\VideoCourseItem;
use App\Models\CourseItem;
use Filament\Forms;
use Filament\Forms\Form;
use Filament\Resources\Resource;
use Filament\Tables;
use Filament\Tables\Table;

class VideoCourseItemResource extends Resource
{
    protected static ?string $model = VideoCourseItem::class;
    protected static ?string $navigationIcon = 'heroicon-o-play-circle';
    protected static ?string $navigationGroup = 'Content';

    public static function getNavigationIconColor(): ?string
    {
        return 'primary';
    }
    protected static ?int $navigationSort = 3;

    public static function form(Form $form): Form
    {
        return $form->schema([
            Forms\Components\Section::make('Video Module Information')
                ->description('Specify the main video content for this module.')
                ->icon('heroicon-o-play-circle')
                ->schema([
                    Forms\Components\Select::make('course_item_id')
                        ->label('Main Course')
                        ->relationship('course', 'title')
                        ->required()
                        ->searchable()
                        ->preload()
                        ->prefixIcon('heroicon-o-book-open')
                        ->columnSpanFull(),

                    Forms\Components\TextInput::make('title')
                        ->label('Module Title')
                        ->required()
                        ->maxLength(200)
                        ->prefixIcon('heroicon-o-information-circle')
                        ->columnSpanFull(),

                    Forms\Components\TextInput::make('description')
                        ->label('Description')
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
                ]),

           Forms\Components\Section::make('Add More Modules')
                ->description('Want to add multiple modules at once? Fill in the details below and save.')
                ->icon('heroicon-o-rectangle-stack')
                ->schema([
                    Forms\Components\Repeater::make('drop_list')
                        ->label('Module List')
                        ->schema([
                            Forms\Components\TextInput::make('title')
                                ->label('Module Title')
                                ->required()
                                ->maxLength(200)
                                ->prefixIcon('heroicon-o-information-circle')
                                ->columnSpanFull(),

                            Forms\Components\TextInput::make('description')
                                ->label('Module Description')
                                
                                ->columnSpanFull(),

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

                            Forms\Components\TextInput::make('order_num')
                                ->label('Order')
                                ->numeric()
                                ->default(1)
                                ->required(),

                            

                            Forms\Components\Grid::make(2)
                                ->schema([
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
                        ])
                        ->columns(2)
                        ->collapsible()
                        ->itemLabel(fn(array $state): ?string => $state['title'] ?? 'New Module')
                        ->addActionLabel('+ Add to List'),
                ])
                ->collapsible()
                ->collapsed(),
        ]);
    }

    public static function table(Table $table): Table
    {
        return $table
            ->columns([
                Tables\Columns\TextColumn::make('order_num')
                    ->label('#')
                    ->sortable()
                    ->width('50px'),

                Tables\Columns\TextColumn::make('course.title')
                    ->label('Course')
                    ->searchable()
                    ->sortable()
                    ->badge()
                    ->color('gray'),

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
                    ->boolean()
                    ->sortable(),

                Tables\Columns\IconColumn::make('is_active')
                    ->label('Active')
                    ->boolean()
                    ->sortable(),
            ])
            ->filters([
                Tables\Filters\SelectFilter::make('course_item_id')
                    ->label('Filter by Course')
                    ->relationship('course', 'title'),
                Tables\Filters\TernaryFilter::make('is_active')
                    ->label('Active Status'),
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

    public static function getPages(): array
    {
        return [
            'index' => Pages\ListVideoCourseItems::route('/'),
            'create' => Pages\CreateVideoCourseItem::route('/create'),
            'edit' => Pages\EditVideoCourseItem::route('/{record}/edit'),
        ];
    }
}