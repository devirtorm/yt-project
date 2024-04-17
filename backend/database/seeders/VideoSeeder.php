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
            [
                'titulo' => 'Visitante',
                'descripcion' => 'Video de visitante',
                'url' => 'URL',
                'estado' => '1',
                'fk_user' => '1',
                'fk_categoria' => '1',
            ]
        ]);
    }
}
