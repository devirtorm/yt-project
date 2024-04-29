<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     *
     * @return void
     */
    public function run()
    {
        // \App\Models\User::factory(10)->create();
        $this->call(UsersSeeder::class);
        $this->call(RolSeeder::class);
        $this->call(ComentarioSeeder::class);
        $this->call(VideoSeeder::class);
        $this->call(CategoriaSeeder::class);
        $this->call(RolAsignadoSeeder::class);
    }
}
