<?php

namespace Database\Seeders;

use DateTime;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;
use \App\Models\User;
use Faker\Factory;

class UserSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        if (DB::table('users')->count()) return;
        DB::table('users')->insert($this->data());
    }

    public static function data() {
        $faker = Factory::create();
        return collect(range(2, 21))->map(fn($n) => [
            'id' => $n + 1,
            'person_id' => $n,
            'name' => "User$n",
            'email' => $faker->email,
            'password' => Hash::make('$P4ssw0rd'),
            'is_superuser' => false,
            'is_staff' => false,
            'is_active' => true
        ])->concat([
            [
                'id' => 2,
                'person_id' => 1,
                'name' => 'Saúl',
                'email' => 'saul7.hernandez@gmail.com',
                'password' => Hash::make('$P4ssw0rd'),
                'is_superuser' => false,
                'is_staff' => false,
                'is_active' => true
            ],
            [
                'id' => 1,
                'person_id' => 1,
                'name' => 'Saúl',
                'email' => 'saul7.hernandez@outlook.com',
                'password' => Hash::make('$P4ssw0rd'),
                'is_superuser' => true,
                'is_staff' => true,
                'is_active' => true
            ]
        ])->all();
    }
}
