<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;
use Illuminate\Support\Str;

return new class extends Migration
{
    public function up(): void
    {
        // Only add uuid column if it doesn't exist
        if (!Schema::hasColumn('course_item', 'uuid')) {
            Schema::table('course_item', function (Blueprint $table) {
                $table->uuid('uuid')->nullable()->unique()->after('courseItem_id');
            });
        }

        DB::table('course_item')->whereNull('uuid')->orderBy('courseItem_id')->each(function ($row) {
            DB::table('course_item')
                ->where('courseItem_id', $row->courseItem_id)
                ->update(['uuid' => (string) Str::uuid()]);
        });

        Schema::table('course_item', function (Blueprint $table) {
            $table->uuid('uuid')->nullable(false)->change();
        });
    }

    public function down(): void
    {
        Schema::table('course_item', function (Blueprint $table) {
            $table->dropColumn('uuid');
        });
    }
};