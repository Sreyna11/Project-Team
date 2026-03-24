<?php

namespace App\Filament\Resources;

use App\Filament\Resources\FreeDocumentResource\Pages;
use App\Filament\Resources\FreeDocumentResource\RelationManagers;
use App\Models\FreeDocument;
use Filament\Forms;
use Filament\Forms\Form;
use Filament\Resources\Resource;
use Filament\Tables;
use Filament\Tables\Table;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\SoftDeletingScope;

class FreeDocumentResource extends Resource
{
    protected static ?string $model = FreeDocument::class;

    protected static ?string $navigationIcon = 'heroicon-o-document-duplicate';
    protected static ?string $navigationGroup = 'Content';

    public static function getNavigationIconColor(): ?string
    {
        return 'success';
    }
    protected static ?int $navigationSort = 4;

    public static function form(Form $form): Form
    {
        return $form->schema([
            Forms\Components\Section::make('Document Info')
                ->description('Basic information about the free document.')
                ->icon('heroicon-o-document-text')
                ->schema([
                    Forms\Components\TextInput::make('title')
                        ->required()
                        ->maxLength(200)
                        ->prefixIcon('heroicon-o-pencil-square')
                        ->columnSpanFull(),

                    Forms\Components\TextInput::make('description')
                        
                        ->nullable()
                        ->columnSpanFull(),

                    Forms\Components\Grid::make(2)
                        ->schema([
                            Forms\Components\Select::make('category_id')
                                ->label('Category')
                                ->relationship('category', 'name')
                                ->nullable()
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

            Forms\Components\Section::make('Assets')
                ->description('Logo and file link for the document.')
                ->icon('heroicon-o-paper-clip')
                ->schema([
                    Forms\Components\TextInput::make('file')
                        ->label('Document Download URL')
                        ->required()
                        ->url()
                        ->maxLength(500)
                        ->prefixIcon('heroicon-o-link'),

                    Forms\Components\FileUpload::make('logo')
                        ->label('Logo / Thumbnail')
                        ->image()
                        ->disk('public')
                        ->directory('documents')
                        ->imageEditor()
                        ->columnSpanFull(),
                ]),

            Forms\Components\Section::make('Visibility')
                ->description('Control where and how this document is displayed.')
                ->icon('heroicon-o-eye')
                ->schema([
                    Forms\Components\Toggle::make('is_active')
                        ->label('Active Status')
                        ->helperText('Enable or disable this document on the site.')
                        ->default(true),

                    Forms\Components\Toggle::make('show_in_header')
                        ->label('Show in Home Header')
                        ->helperText('Feature this document in the "Free Learning Documents" section of the home page.')
                        ->default(false),
                ])->collapsible(),
        ]);
    }

    public static function table(Table $table): Table
    {
        return $table
            ->columns([
                Tables\Columns\ImageColumn::make('logo')
                    ->label('Thumb')
                    ->circular(),

                Tables\Columns\TextColumn::make('title')
                    ->label('Document Title')
                    ->searchable()
                    ->sortable()
                    ->weight('bold'),

                Tables\Columns\TextColumn::make('category.name')
                    ->label('Category')
                    ->badge()
                    ->color('info')
                    ->sortable(),

                Tables\Columns\TextColumn::make('file')
                    ->label('Link')
                    ->limit(30)
                    ->color('primary')
                    ->icon('heroicon-o-link'),

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
            'index' => Pages\ListFreeDocuments::route('/'),
            'create' => Pages\CreateFreeDocument::route('/create'),
            'edit' => Pages\EditFreeDocument::route('/{record}/edit'),
        ];
    }
}
