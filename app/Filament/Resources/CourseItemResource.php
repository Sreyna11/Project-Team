<?php

namespace App\Filament\Resources;

use App\Filament\Resources\CourseItemResource\Pages;
use App\Filament\Resources\CourseItemResource\RelationManagers;
use App\Models\CourseItem;
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
                        ->label('Thumbnail')
                        ->image()
                        ->disk('public')
                        ->directory('courses')
                        ->imageEditor()
                        ->columnSpanFull(),
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
                Tables\Columns\ImageColumn::make('image')
                    ->label('Thumb')
                    ->square(),

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

                Tables\Columns\TextColumn::make('price')
                    ->label('Price')
                    ->money('USD')
                    ->sortable(),

                Tables\Columns\TextColumn::make('discount')
                    ->label('Disc.')
                    ->money('USD')
                    ->color('danger')
                    ->sortable(),

                Tables\Columns\IconColumn::make('is_active')
                    ->label('Active')
                    ->boolean()
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
