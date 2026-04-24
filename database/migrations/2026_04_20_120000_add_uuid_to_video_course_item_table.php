<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Str;

return new class extends Migration {
    public function up(): void
    {
        // Only add uuid column if it doesn't exist
        if (!Schema::hasColumn('video_course_item', 'uuid')) {
            Schema::table('video_course_item', function (Blueprint $table): void {
                $table->uuid('uuid')->nullable()->after('course_item_id');
                $table->unique('uuid');
            });
        }

        DB::table('video_course_item')
            ->whereNull('uuid')
            ->orderBy('videoCourseItem_id')
            ->chunk(100, function ($items) {
                foreach ($items as $item) {
                    DB::table('video_course_item')
                        ->where('videoCourseItem_id', $item->videoCourseItem_id)
                        ->update(['uuid' => Str::uuid()->toString()]);
                }
            });
    }

    public function down(): void
    {
        Schema::table('video_course_item', function (Blueprint $table): void {
            $table->dropUnique(['uuid']);
            $table->dropColumn('uuid');
        });
    }
};
