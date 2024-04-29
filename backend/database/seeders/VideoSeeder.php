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
            'url' => 'archivos/videos/662fc72092200.mp4',
            'miniatura' => 'archivos/images/662fc854736a3.jpg', // Asegúrate de que esta línea exista y tenga un valor válido
            'fk_categoria' => 1,
            'fk_user' => 1,
            'estado' => null,
            'revisado' => "0"
        ]);
    }
}
