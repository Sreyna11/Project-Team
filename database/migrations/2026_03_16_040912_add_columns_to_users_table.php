<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    public function up(): void
    {
        Schema::table('users', function (Blueprint $table) {
            $table->string('photo', 500)->nullable()->after('password');
            $table->boolean('is_active')->default(true)->after('photo');
            $table->enum('role', ['user', 'admin'])->default('user')->after('is_active');
        });
    }

    public function down(): void
    {
        Schema::table('users', function (Blueprint $table) {
            $table->dropColumn(['photo', 'is_active', 'role']);
        });
    }
};