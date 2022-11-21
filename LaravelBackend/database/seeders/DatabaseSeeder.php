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
        $this->call([
            PersonSeeder::class,
            UserSeeder::class,
            RoleSeeder::class,
            FileSeeder::class,
            EventSeeder::class,
            EventFileSeeder::class,
            EventParticipantSeeder::class
        ]);
    }

    
}
