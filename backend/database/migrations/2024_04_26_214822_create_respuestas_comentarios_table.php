<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateRespuestasComentariosTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('respuestas_comentarios', function (Blueprint $table) {
            $table->id();
            $table->string('respuesta');
            $table->integer('fk_comentario');
            $table->integer('fk_user');
            $table->timestamps();

            $table->foreign('fk_comentario')->references('id')->on('comentario');
            $table->foreign('fk_user')->references('id')->on('users');
            
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('respuestas_comentarios');
    }
}
