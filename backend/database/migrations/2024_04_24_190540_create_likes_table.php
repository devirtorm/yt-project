<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateLikesTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('likes', function (Blueprint $table) {
            $table->id();
            $table->boolean('like');
            $table->unsignedBigInteger('fk_usuario');
            $table->unsignedBigInteger('fk_video');
            $table->date('fecha_like');
            $table->timestamps();

            $table->foreign('fk_usuario')->references('id')->on('users');
            $table->foreign('fk_video')->references('id')->on('video');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('likes');
    }
}
