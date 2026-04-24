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

        Forms\Components\TextInput::make('title')
            ->required()
            ->maxLength(200),

        Forms\Components\Textarea::make('description')
            ->nullable()
            ->columnSpanFull(),

        Forms\Components\Select::make('category_id')
            ->label('Category')
            ->options(\App\Models\Category::all()->pluck('name', 'category_id'))
            ->nullable()
            ->searchable(),

        Forms\Components\Select::make('header_id')
            ->label('Header')
            ->options(\App\Models\Header::all()->pluck('title', 'header_id'))
            ->nullable(),

        // ← Upload logo/image from computer
        Forms\Components\FileUpload::make('logo')
            ->label('Cover Image')
            ->image()
            ->imageEditor()
            ->imageResizeMode('cover')
            ->imageCropAspectRatio('3:4')
            ->imageResizeTargetWidth('800')
            ->disk('minio')
            ->directory('documents/logos')
            ->nullable(),

        // ← Upload actual document file from computer
        Forms\Components\FileUpload::make('file')
            ->label('Document File (PDF)')
            ->disk('public')
            ->directory('documents/files')
            ->acceptedFileTypes(['application/pdf', 'application/msword',
                'application/vnd.openxmlformats-officedocument.wordprocessingml.document'])
            ->nullable()
            ->columnSpanFull(),

        Forms\Components\Toggle::make('is_active')
            ->label('Active')
            ->default(true),

        Forms\Components\Toggle::make('show_in_header')
            ->label('Show on Home Page')
            ->default(false),

    ]);
}

    public static function table(Table $table): Table
    {
        return $table
            ->columns([
                Tables\Columns\TextColumn::make('thumbnail')
                    ->label('Thumb')
                    ->html()
                    ->state(fn ($record) => $record->logo ? '<img src="' . (\Illuminate\Support\Facades\Storage::disk('public')->exists($record->logo) ? \Illuminate\Support\Facades\Storage::disk('public')->url($record->logo) : url('/image/' . ltrim($record->logo, '/'))) . '" style="width: 40px; height: 40px; object-fit: cover; border-radius: 8px; box-shadow: 0 1px 2px rgba(0,0,0,0.1);">' : '<span class="text-gray-400 text-[10px]">No image</span>'),

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
