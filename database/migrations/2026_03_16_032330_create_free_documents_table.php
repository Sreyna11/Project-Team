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
        Schema::create('free_document', function (Blueprint $table) {
            $table->increments('freeDocument_id');
            $table->unsignedInteger('header_id')->nullable();
            $table->string('logo', 500)->nullable();
            $table->string('title', 200);
            $table->text('description')->nullable();
            $table->string('file', 500);

            $table->foreign('header_id')->references('header_id')->on('header')->onDelete('set null');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('free_documents');
    }
};
