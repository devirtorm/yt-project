<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateSuscripcionesTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('suscripciones', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('user_fk'); // ID del usuario que publica los videos
            $table->unsignedBigInteger('suscriptor_fk'); // ID del usuario que sigue al usuario
            $table->timestamps();

            // Definir las claves foráneas
            $table->foreign('user_fk')->references('id')->on('users')->onDelete('cascade');
            $table->foreign('suscriptor_fk')->references('id')->on('users')->onDelete('cascade');

            // Asegurarse de que no se pueda suscribir más de una vez al mismo usuario
            $table->unique(['user_fk', 'suscriptor_fk']);
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('suscripciones');
    }
}
