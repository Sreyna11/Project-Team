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
        Schema::create('promotion', function (Blueprint $table) {
            $table->increments('promotion_id');
            $table->unsignedInteger('event_id')->nullable();
            $table->unsignedInteger('course_item_id')->nullable();
            $table->string('promotion_name', 150);
            $table->enum('promotion_type', ['percent', 'amount']);
            $table->decimal('discount_value', 10, 2);
            $table->date('start_date');
            $table->date('end_date');

            $table->foreign('event_id')->references('event_id')->on('event')->onDelete('cascade');
            $table->foreign('course_item_id')->references('courseItem_id')->on('course_item')->onDelete('cascade');
        });
    }
    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('promotions');
    }
};
