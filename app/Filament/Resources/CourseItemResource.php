<?php

namespace App\Filament\Resources;

use App\Filament\Resources\CourseItemResource\Pages;
use App\Filament\Resources\CourseItemResource\RelationManagers;
use App\Models\CourseItem;
use App\Models\VideoCourseItem;
use Filament\Forms;
use Filament\Forms\Form;
use Filament\Resources\Resource;
use Filament\Tables;
use Filament\Tables\Table;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\SoftDeletingScope;

class CourseItemResource extends Resource
{
    protected static ?string $model = CourseItem::class;

    protected static ?string $navigationIcon = 'heroicon-o-book-open';
    protected static ?string $navigationGroup = 'Content';
    
    public static function getEloquentQuery(): Builder
    {
        return parent::getEloquentQuery()->withCount('videoModules');
    }

    public static function getNavigationIconColor(): ?string
    {
        return 'primary';
    }
    protected static ?int $navigationSort = 2;

    public static function form(Form $form): Form
    {
        return $form->schema([
            Forms\Components\Section::make('Course Basics')
                ->description('Core information about the course.')
                ->icon('heroicon-o-information-circle')
                ->schema([
                    Forms\Components\TextInput::make('title')
                        ->required()
                        ->maxLength(200)
                        ->prefixIcon('heroicon-o-pencil-square')
                        ->columnSpanFull(),

                    Forms\Components\Grid::make(2)
                        ->schema([
                            Forms\Components\Select::make('category_id')
                                ->label('Category')
                                ->relationship('category', 'name')
                                ->required()
                                ->searchable()
                                ->preload()
                                ->prefixIcon('heroicon-o-tag'),

                            Forms\Components\Select::make('header_id')
                                ->label('Header Visibility')
                                ->relationship('header', 'title')
                                ->nullable()
                                ->searchable()
                                ->preload()
                                ->prefixIcon('heroicon-o-view-columns'),
                        ]),
                ]),

            Forms\Components\Section::make('Pricing & Presentation')
                ->description('Set the price and thumbnail for the course.')
                ->icon('heroicon-o-currency-dollar')
                ->schema([
                    Forms\Components\Grid::make(3)
                        ->schema([
                            Forms\Components\TextInput::make('price')
                                ->required()
                                ->numeric()
                                ->prefix('$')
                                ->minValue(0)
                                ->prefixIcon('heroicon-o-banknotes'),

                            Forms\Components\TextInput::make('discount')
                                ->numeric()
                                ->prefix('$')
                                ->default(0)
                                ->minValue(0)
                                ->prefixIcon('heroicon-o-receipt-percent'),

                            Forms\Components\TextInput::make('button')
                                ->label('Button Label')
                                ->default('Purchase Course')
                                ->prefixIcon('heroicon-o-cursor-arrow-rays'),
                        ]),

                    Forms\Components\FileUpload::make('image')
                        ->label('Course Image')
                        ->disk('minio')
                        ->directory('courses')
                        ->image()
                        ->imageEditor()
                        ->imageResizeMode('cover')
                        ->imageCropAspectRatio('16:9')
                        ->imageResizeTargetWidth('1200')
                        ->nullable()
                        ->columnSpanFull(),
                    Forms\Components\TextInput::make('max_modules')
                        ->label('Max Video Modules')
                        ->numeric()
                        ->default(10)
                        ->minValue(1)
                        ->maxValue(100)
                        ->helperText('Maximum number of video modules allowed for this course')
                        ->prefixIcon('heroicon-o-film'),
                    Forms\Components\Placeholder::make('usage')
                        ->label('Current Usage')
                        ->content(
                            fn($record) =>
                            $record ? VideoCourseItem::where('course_item_id', $record->courseItem_id)->count() . ' / ' . $record->max_modules . ' modules used' : 'Save course first'
                        ),
                ]),

            Forms\Components\Section::make('Advanced')
                ->icon('heroicon-o-cog-6-tooth')
                ->schema([
                    Forms\Components\Textarea::make('description')
                        ->rows(4)
                        ->nullable()
                        ->columnSpanFull(),

                    Forms\Components\Toggle::make('is_active')
                        ->label('Active Status')
                        ->helperText('Enable or disable this course on the frontend.')
                        ->default(true),

                    Forms\Components\Toggle::make('show_in_header')
                        ->label('Show in Home Header')
                        ->helperText('Feature this course in the top header section of the home page.')
                        ->default(false),
                ])->collapsible(),
        ]);
    }

    public static function table(Table $table): Table
    {
        return $table
            ->columns([
                Tables\Columns\TextColumn::make('thumbnail')
                    ->label('Thumb')
                    ->html()
                    ->state(fn ($record) => $record->image ? '<img src="' . url('/image/' . ltrim($record->image, '/')) . '" style="width: 40px; height: 40px; object-fit: cover; border-radius: 8px; box-shadow: 0 1px 2px rgba(0,0,0,0.1);">' : '<span class="text-gray-400 text-[10px]">No image</span>'),

                Tables\Columns\TextColumn::make('title')
                    ->label('Course Name')
                    ->searchable()
                    ->sortable()
                    ->weight('bold'),

                Tables\Columns\TextColumn::make('category.name')
                    ->label('Category')
                    ->badge()
                    ->color('info')
                    ->sortable(),

                Tables\Columns\TextColumn::make('video_modules_count')
                    ->label('Modules')
                    ->suffix(fn($record) => ' / ' . $record->max_modules)
                    ->badge()
                    ->color(fn($record) => $record->video_modules_count >= $record->max_modules ? 'danger' : 'success')
                    ->sortable(),

                Tables\Columns\IconColumn::make('show_in_header')
                    ->label('Featured')
                    ->boolean()
                    ->sortable(),
            ])
            ->filters([
                Tables\Filters\SelectFilter::make('category')
                    ->relationship('category', 'name'),
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
            ]);
    }

    public static function getRelations(): array
    {
        return [
            RelationManagers\VideoModulesRelationManager::class,
        ];
    }

    public static function getPages(): array
    {
        return [
            'index' => Pages\ListCourseItems::route('/'),
            'create' => Pages\CreateCourseItem::route('/create'),
            'edit' => Pages\EditCourseItem::route('/{record}/edit'),
        ];
    }
}
