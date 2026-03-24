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
        Schema::create('video_course_item', function (Blueprint $table) {
            $table->increments('videoCourseItem_id');
            $table->unsignedInteger('course_item_id')->nullable();
            $table->string('title', 200);
            $table->text('description')->nullable();
            $table->string('video_url', 500)->nullable();
            $table->boolean('is_free')->default(false);
            $table->boolean('is_active')->default(true);
            $table->integer('order_num')->default(0);
            $table->jsonb('drop_list')->default('[]');

            $table->foreign('course_item_id')->references('courseItem_id')->on('course_item')->onDelete('cascade');
        });
    }
    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('video_course_items');
    }
};
