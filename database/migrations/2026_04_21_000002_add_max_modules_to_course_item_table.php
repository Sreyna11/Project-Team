<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        if (! Schema::hasTable('course_item')) {
            return;
        }

        if (Schema::hasColumn('course_item', 'max_modules')) {
            return;
        }

        Schema::table('course_item', function (Blueprint $table) {
            $table->unsignedInteger('max_modules')->default(10)->after('image');
        });
    }

    public function down(): void
    {
        if (! Schema::hasTable('course_item')) {
            return;
        }

        if (! Schema::hasColumn('course_item', 'max_modules')) {
            return;
        }

        Schema::table('course_item', function (Blueprint $table) {
            $table->dropColumn('max_modules');
        });
    }
};

