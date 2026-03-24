<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::table('free_document', function (Blueprint $table) {
            $table->boolean('is_active')->default(true)->after('description');
            $table->boolean('show_in_header')->default(false)->after('is_active');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('free_document', function (Blueprint $table) {
            $table->dropColumn(['is_active', 'show_in_header']);
        });
    }
};
