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
            $table->integer('fk_respuesta_padre')->nullable(); // Columna para almacenar el ID de la respuesta padre
            $table->timestamps();
            
            $table->foreign('fk_comentario')->references('id')->on('comentario');
            $table->foreign('fk_user')->references('id')->on('users');
            $table->foreign('fk_respuesta_padre')->references('id')->on('respuestas_comentarios'); // Clave foránea para la respuesta padre
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
