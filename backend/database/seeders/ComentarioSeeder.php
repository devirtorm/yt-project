<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class ComentarioSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        DB::table('comentario')->insert([
            [
                'nombre' => 'Visitante',
                'descripcion' => 'Puede acceder a la aplicacion pero solo para ver, no puede dar comentarios ni dar likes.',
            ]
        ]);
    }
}
