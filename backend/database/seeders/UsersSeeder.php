<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Carbon\Carbon;

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
                'email' => 'irtormxd@gamil.com',
                'password' => '123',
                'birthdate' => Carbon::createFromFormat('Y-m-d', rand(1950, 2000) . '-' . rand(1, 12) . '-' . rand(1, 28)),
                'gender' => 'femenino',
            ],
            [
                'name' => 'Juan Carlos',
                'email' => 'juan@example.com',
                'password' => '123',
                'birthdate' => Carbon::createFromFormat('Y-m-d', rand(1950, 2000) . '-' . rand(1, 12) . '-' . rand(1, 28)),
                'gender' => 'masculino',
            ],
            [
                'name' => 'Ana María',
                'email' => 'ana@example.com',
                'password' => '123',
                'birthdate' => Carbon::createFromFormat('Y-m-d', rand(1950, 2000) . '-' . rand(1, 12) . '-' . rand(1, 28)),
                'gender' => 'femenino',
            ],
            [
                'name' => 'Pedro Pablo',
                'email' => 'pedro@example.com',
                'password' => '123',
                'birthdate' => Carbon::createFromFormat('Y-m-d', rand(1950, 2000) . '-' . rand(1, 12) . '-' . rand(1, 28)),
                'gender' => 'masculino',
            ],
        ]);
    }
}
