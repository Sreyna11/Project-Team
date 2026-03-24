<?php

namespace App\Filament\Resources;

use App\Filament\Resources\PaymentResource\Pages;
use App\Filament\Resources\PaymentResource\RelationManagers;
use App\Models\Payment;
use Filament\Forms;
use Filament\Forms\Form;
use Filament\Resources\Resource;
use Filament\Tables;
use Filament\Tables\Table;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\SoftDeletingScope;
use App\Services\BakongService;
use Filament\Notifications\Notification;
use Filament\Forms\Components\ViewField;
use Illuminate\Support\HtmlString;

class PaymentResource extends Resource
{
    protected static ?string $model = Payment::class;

    protected static ?string $navigationIcon = 'heroicon-o-banknotes';
    protected static ?string $navigationGroup = 'Billing';

    public static function getNavigationIconColor(): ?string
    {
        return 'success';
    }

    public static function form(Form $form): Form
    {
        return $form
            ->schema([
                Forms\Components\TextInput::make('user_id')
                    ->numeric(),
                Forms\Components\TextInput::make('course_item_id')
                    ->numeric(),
                Forms\Components\TextInput::make('promotion_id')
                    ->numeric(),
                Forms\Components\TextInput::make('invoice_number')
                    ->maxLength(50),
                Forms\Components\TextInput::make('amount')
                    ->required()
                    ->numeric(),
                Forms\Components\TextInput::make('status')
                    ->required()
                    ->maxLength(255)
                    ->default('unpaid'),
                Forms\Components\DateTimePicker::make('paid_at'),
            ]);
    }

    public static function table(Table $table): Table
    {
        return $table
            ->columns([
                Tables\Columns\TextColumn::make('user_id')
                    ->numeric()
                    ->sortable(),
                Tables\Columns\TextColumn::make('course_item_id')
                    ->numeric()
                    ->sortable(),
                Tables\Columns\TextColumn::make('promotion_id')
                    ->numeric()
                    ->sortable(),
                Tables\Columns\TextColumn::make('invoice_number')
                    ->searchable(),
                Tables\Columns\TextColumn::make('amount')
                    ->numeric()
                    ->sortable(),
                Tables\Columns\TextColumn::make('status')
                    ->searchable(),
                Tables\Columns\TextColumn::make('paid_at')
                    ->dateTime()
                    ->sortable(),
            ])
            ->filters([
                //
            ])
            ->actions([
                Tables\Actions\Action::make('generateKhqr')
                    ->label('Bakong KHQR')
                    ->icon('heroicon-o-qr-code')
                    ->color('success')
                    ->modalHeading('Scan to Pay')
                    ->modalSubmitAction(false)
                    ->modalContent(fn(Payment $record, BakongService $bakongService) => 
                        new HtmlString('
                            <div class="flex flex-col items-center justify-center p-4">
                                <img src="https://api.qrserver.com/v1/create-qr-code/?size=250x250&data=' . urlencode($bakongService->generateQr($record->amount)->data['qr']) . '" alt="KHQR" class="rounded-lg shadow-lg" />
                                <p class="mt-4 text-sm text-gray-500">Amount: ' . number_format($record->amount, 2) . ' USD</p>
                                <p class="text-xs text-gray-400 mt-2 break-all">' . $bakongService->generateQr($record->amount)->data['qr'] . '</p>
                            </div>
                        ')
                    ),
                Tables\Actions\EditAction::make(),
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
            'index' => Pages\ListPayments::route('/'),
            'create' => Pages\CreatePayment::route('/create'),
            'edit' => Pages\EditPayment::route('/{record}/edit'),
        ];
    }
}
