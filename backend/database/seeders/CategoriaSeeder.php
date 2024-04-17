<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class CategoriaSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        DB::table('categoria')->insert([
            [
                'nombre_categoria' => 'Niños',
                'descripcion' => 'Contenido apto para niños'
            ],
            [
                'nombre_categoria' => 'Jovenes',
                'descripcion' => 'Contenido apto para jovenes'
            ],
            [
                'nombre_categoria' => 'Adultos',
                'descripcion' => 'Contenido apto para adultos'
            ]
        ]);
    }
}
