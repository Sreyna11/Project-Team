<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::table('free_document', function (Blueprint $table) {
            if (!Schema::hasColumn('free_document', 'category_id')) {
                $table->unsignedInteger('category_id')->nullable()->after('header_id');
$table->foreign('category_id')->references('category_id')->on('category')->onDelete('set null');
            }

            if (!Schema::hasColumn('free_document', 'is_active')) {
                $table->boolean('is_active')->default(true)->after('file');
            }

            if (!Schema::hasColumn('free_document', 'show_in_header')) {
                $table->boolean('show_in_header')->default(false)->after('is_active');
            }
        });
    }

    public function down(): void
    {
        Schema::table('free_document', function (Blueprint $table) {
            $table->dropForeign(['category_id']);
            $table->dropColumn(['category_id', 'is_active', 'show_in_header']);
        });
    }
};

