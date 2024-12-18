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
                'comentario' => 'comentario',
                'fk_user' => '1',
                'fk_video' => '1',
            ]
        ]);
    }
}
