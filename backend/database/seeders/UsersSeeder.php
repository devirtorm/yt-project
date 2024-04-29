<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Carbon\Carbon;
use Illuminate\Support\Facades\Hash;

class UsersSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        DB::table('users')->insert([
            [
                'name' => 'irving',
                'email' => 'irtormxd@gmail.com',
                'password' => Hash::make('123'),
                'foto' => 'archivos/videos/yo.jpg',
                'nombre_canal' => 'Auron play',
                'birthdate' => Carbon::createFromDate(rand(1950, 2000), rand(1, 12), rand(1, 28))->format('Y-m-d'),
                'gender' => 'femenino'
            ],
            [
                'name' => 'Juan Carlos',
                'email' => 'juan@example.com',
                'password' => Hash::make('123'),
                'foto' => 'archivos/videos/yo.jpg',
                'nombre_canal' => 'Elrubiusomg',
                'birthdate' => Carbon::createFromDate(rand(1950, 2000), rand(1, 12), rand(1, 28))->format('Y-m-d'),
                'gender' => 'masculino'
            ],
            [
                'name' => 'Ana María',
                'email' => 'ana@example.com',
                'password' => Hash::make('123'),
                'foto' => 'archivos/videos/yo.jpg',
                'nombre_canal' => 'Fernanfloo',
                'birthdate' => Carbon::createFromDate(rand(1950, 2000), rand(1, 12), rand(1, 28))->format('Y-m-d'),
                'gender' => 'femenino'
            ],
            [
                'name' => 'Pedro Pablo',
                'email' => 'pedro@example.com',
                'password' => Hash::make('123'),
                'foto' => 'archivos/videos/yo.jpg',
                'nombre_canal' => 'Hola soy germán',
                'birthdate' => Carbon::createFromDate(rand(1950, 2000), rand(1, 12), rand(1, 28))->format('Y-m-d'),
                'gender' => 'masculino'
            ],
        ]);
    }
}
