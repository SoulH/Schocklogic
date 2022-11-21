<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class RoleSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        if (DB::table('roles')->count()) return;
        DB::table('roles')->insert($this->seeds());
    }

    private function seeds() {
        return [
            ['name' => 'Administrador'],
            ['name' => 'Participante']
        ];
    }
}
