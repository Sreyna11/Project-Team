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
        // Add uuid column to video_course_item (idempotent)
        try {
            if (!Schema::hasColumn('video_course_item', 'uuid')) {
                Schema::table('video_course_item', function (Blueprint $table) {
                    $table->uuid('uuid')->nullable()->unique()->after('videoCourseItem_id');
                });
            }
        } catch (\Throwable) {
            Schema::table('video_course_item', function (Blueprint $table) {
                $table->uuid('uuid')->nullable()->unique()->after('videoCourseItem_id');
            });
        }

        // Populate uuid for all existing rows
        DB::table('video_course_item')
            ->whereNull('uuid')
            ->orderBy('videoCourseItem_id')
            ->chunk(200, function ($rows) {
                foreach ($rows as $row) {
                    DB::table('video_course_item')
                        ->where('videoCourseItem_id', $row->videoCourseItem_id)
                        ->update(['uuid' => (string) Str::uuid()]);
                }
            });

        // Make it not nullable now that all rows have a value
        if (Schema::hasColumn('video_course_item', 'uuid')) {
            Schema::table('video_course_item', function (Blueprint $table) {
                $table->uuid('uuid')->nullable(false)->change();
            });
        }
    }

    public function down(): void
    {
        Schema::table('video_course_item', function (Blueprint $table) {
            $table->dropColumn('uuid');
        });
    }
};