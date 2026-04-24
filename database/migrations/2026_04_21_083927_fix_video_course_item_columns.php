<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    public function up(): void
    {
        Schema::table('video_course_item', function (Blueprint $table) {
            if (!Schema::hasColumn('video_course_item', 'duration')) {
                $table->string('duration', 50)->nullable()->after('video_url');
            }
            if (!Schema::hasColumn('video_course_item', 'video_file')) {
                $table->string('video_file', 500)->nullable()->after('video_url');
            }
        });
    }

    public function down(): void
    {
        Schema::table('video_course_item', function (Blueprint $table) {
            $table->dropColumn(['duration', 'video_file']);
        });
    }
};