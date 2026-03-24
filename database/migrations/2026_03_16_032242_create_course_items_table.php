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
        Schema::create('course_item', function (Blueprint $table) {
            $table->increments('courseItem_id');
            $table->unsignedInteger('header_id')->nullable();
            $table->unsignedInteger('category_id')->nullable();
            $table->string('image', 500)->nullable();
            $table->string('title', 200);
            $table->text('description')->nullable();
            $table->decimal('price', 10, 2)->default(0.00);
            $table->decimal('discount', 5, 2)->default(0.00);
            $table->string('button', 100)->nullable();
            $table->boolean('is_active')->default(true);

            $table->foreign('header_id')->references('header_id')->on('header')->onDelete('set null');
            $table->foreign('category_id')->references('category_id')->on('category')->onDelete('set null');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('course_items');
    }
};
