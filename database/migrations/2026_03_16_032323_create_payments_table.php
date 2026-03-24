<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('payments', function (Blueprint $table) {
            $table->id();

            $table->unsignedBigInteger('user_id')->nullable();
            $table->unsignedInteger('course_item_id')->nullable();
            $table->unsignedInteger('promotion_id')->nullable();

            $table->string('invoice_number')->unique()->nullable();
            $table->string('md5')->unique();

            $table->decimal('amount', 10, 2);
            $table->enum('status', ['paid', 'unpaid'])->default('unpaid');

            $table->timestamp('paid_at')->nullable();
            $table->timestamps();

            $table->foreign('user_id')->references('id')->on('users')->onDelete('cascade');
            $table->foreign('course_item_id')->references('courseItem_id')->on('course_item')->onDelete('cascade');
            $table->foreign('promotion_id')->references('promotion_id')->on('promotion')->onDelete('set null');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('payments');
    }
};
