<?php

namespace Database\Seeders;

use DateTime;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;
use \App\Models\Person;
use Faker\Factory;

class PersonSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        if (DB::table('persons')->count()) return;
        DB::table('persons')->insert($this->data());
    }

    public static function data() {
        $faker = Factory::create();
        return collect(range(2, 21))->map(fn($n) => [
            'id' => $n,
            'first_name' => "User$n",
            'last_name' => 'Test',
            'birth_date' => new DateTime($faker->date)
        ])->concat([[
            'id' => 1,
            'first_name' => 'Saúl',
            'last_name' => 'Hernández',
            'birth_date' => new DateTime('1992-01-24')
        ]])->all();
        
    }
}
