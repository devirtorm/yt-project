<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class VideoSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        //
        DB::table('video')->insert([
            'titulo' => 'Visitante',
            'descripcion' => 'Video de visitante',
            'url' => 'URL',
            'miniatura' => 'ruta/a/la/imagen.jpg', // Asegúrate de que esta línea exista y tenga un valor válido
            'fk_categoria' => 1,
            'fk_user' => 1,
            'estado' => 1
        ]);
    }
}
