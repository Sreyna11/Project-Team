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
        Schema::create('user_course_progress', function (Blueprint $table) {
            $table->increments('progress_id');
            $table->unsignedBigInteger('user_id')->nullable();
            $table->unsignedInteger('courseItem_id')->nullable();
            $table->unsignedInteger('videoCourseItem_id')->nullable();
            $table->boolean('completed')->default(false);
            $table->timestamp('completed_at')->nullable();

            $table->unique(['user_id', 'videoCourseItem_id']);
            $table->foreign('user_id')->references('id')->on('users')->onDelete('cascade');
            $table->foreign('courseItem_id')->references('courseItem_id')->on('course_item')->onDelete('cascade');
            $table->foreign('videoCourseItem_id')->references('videoCourseItem_id')->on('video_course_item')->onDelete('cascade');
        });
    }
    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('user_course_progress');
    }
};
