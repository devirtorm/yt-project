<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class RolSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        //
        DB::table('roles')->insert([
            [
                'nombre' => 'Visitante',
                'descripcion' => 'Puede acceder a la aplicacion pero solo para ver, no puede dar comentarios ni dar likes.',
            ],
            [
                'nombre' => 'Espectador',
                'descripcion' => 'Los espectadores pueden ver videos, interactuar con ellos (dar like, comentar, etc.), suscribirse a canales y gestionar su propia actividad en la plataforma.',
            ],
            [
                'nombre' => 'Creador de contenido',
                'descripcion' => ' Los creadores de contenido tendrían permisos adicionales para cargar, editar y gestionar sus propios videos',
            ],
            [
                'nombre' => 'Administrador',
                'descripcion' => ' acceso completo a todas las funciones y datos de la plataforma. Los administradores del sitio serían responsables de la administración del sistema, la gestión de usuarios, la seguridad y el cumplimiento de las políticas de la plataforma',
            ],
        ]);
    }
}
