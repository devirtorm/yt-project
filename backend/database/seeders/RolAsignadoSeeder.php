<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class RolAsignadoSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        DB::table('roles_asignados')->insert([
            [
                'user_id' => 1, // ID del usuario
                'role_id' => 3, // ID del rol de Administrador
            ],
            [
                'user_id' => 2,
                'role_id' => 2, // ID del rol de Creador de contenido
            ],
            [
                'user_id' => 3,
                'role_id' => 1, // ID del rol de Creador de contenido
            ],
            [
                'user_id' => 4,
                'role_id' => 2, // ID del rol de Creador de contenido
            ],
            // Asignar más usuarios a roles según sea necesario
        ]);
    }
}
